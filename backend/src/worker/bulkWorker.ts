// backend/src/worker/bulkWorker.ts
import fs from "fs";
import path from "path";
import { EventEmitter } from "events";
import { sendEmail } from "../services/emailService";

interface Recipient {
  email: string;
  nombre?: string;
  name?: string;
}

const recipientsFile = path.join(__dirname, "../data/abogados.json");
const progressFile = path.join(__dirname, "../data/progress.json");

let recipients: Recipient[] = [];
let index = 0;
let sentToday = 0;
let lastReset = new Date().toDateString();
let isRunning = false;
let interval: NodeJS.Timeout | null = null;

// cooldown: cada 50 envíos, parar 5 minutos
let sentSinceCooldown = 0;

// ---- LOGS EN MEMORIA + EMISOR ----
const emitter = new EventEmitter();
const LOG_LIMIT = 1000;
let logs: string[] = [];

function pushLog(line: string) {
  logs.push(line);
  if (logs.length > LOG_LIMIT) logs = logs.slice(-LOG_LIMIT);
  emitter.emit("log", line);
  console.log(line);
}

export function getLogs() {
  return logs;
}

export function onLog(listener: (line: string) => void) {
  emitter.on("log", listener);
}

export function offLog(listener: (line: string) => void) {
  emitter.off("log", listener);
}

export function loadRecipients() {
  const raw: Recipient[] = JSON.parse(
    fs.readFileSync(recipientsFile, "utf-8")
  );

  // DEDUPE por email (case-insensitive)
  const seen = new Set<string>();
  recipients = raw.filter((r) => {
    const key = (r.email || "").trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (fs.existsSync(progressFile)) {
    const saved = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
    index = Number(saved.index || 0);
    sentToday = Number(saved.sentToday || 0);
    lastReset = saved.lastReset || new Date().toDateString();
  }
}

function saveProgress() {
  fs.writeFileSync(
    progressFile,
    JSON.stringify({ index, sentToday, lastReset }, null, 2)
  );
}

export function stopBulk(reason = "Parado manualmente") {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  if (isRunning) pushLog(`⏹ ${reason}`);
  isRunning = false;
  saveProgress();
}

// caché del asunto/mensaje actuales (los pasa startBulk)
let currentSubject = "";
let currentMessage = "";

// Helper opcional para personalizar el HTML si usas placeholders tipo {{nombre}}
function personalizeMessage(
  html: string,
  recipient: Recipient
): string {
  const nombre = recipient.nombre != null ? recipient.nombre : (recipient.name != null ? recipient.name : "");
  const name = recipient.name != null ? recipient.name : (recipient.nombre != null ? recipient.nombre : "");

  return html
    .replace(/{{\s*nombre\s*}}/gi, nombre)
    .replace(/{{\s*name\s*}}/gi, name);
}

// función que procesa un tick (un intento por segundo)
const processTick = async () => {
  const today = new Date().toDateString();
  if (today !== lastReset) {
    sentToday = 0;
    lastReset = today;
  }

  if (sentToday >= 5000) {
    pushLog("⏸ Límite diario alcanzado, continuará mañana.");
    saveProgress();
    return; // dejamos el interval activo para que, al cambiar de día, continúe
  }

  if (index >= recipients.length) {
    pushLog("✅ Todos los correos enviados.");
    stopBulk();
    return;
  }

  const r = recipients[index];

  try {
    // Personalizamos el HTML si el usuario ha usado {{nombre}} o {{name}}
    const personalizedHtml = personalizeMessage(currentMessage, r);

    await sendEmail({
      to: r.email,
      subject: currentSubject,
      // text: currentMessage, // si quieres, puedes preparar también una versión en texto plano
      html: personalizedHtml,
    });

    sentToday++;
    index++;
    sentSinceCooldown++;
    pushLog(`✔ Enviado ${index}/${recipients.length} → ${r.email}`);

    // --- COOLDOWN cada 50 envíos: pausa 5 minutos ---
    if (sentSinceCooldown > 0 && sentSinceCooldown % 50 === 0) {
      pushLog(
        "🛀 Cooldown: pausa de 5 minutos tras 50 envíos para reducir riesgo de bloqueo."
      );
      saveProgress();
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      setTimeout(() => {
        if (!isRunning) return;
        if (index >= recipients.length) {
          stopBulk("Finalizado durante cooldown");
          return;
        }
        interval = setInterval(processTick, 1000);
      }, 5 * 60 * 1000); // 5 minutos
      return;
    }
  } catch (err: any) {
    const msg = String((err && err.message) || err);

    // 535 / EAUTH → credenciales incorrectas: pausar completamente
    if (msg.includes("535") || (err && err.code) === "EAUTH") {
      pushLog(
        "⛔ Error de autenticación SMTP (535/EAUTH). Envío pausado. Revisa MAIL_USER/MAIL_PASS (App Password en Gmail)."
      );
      stopBulk("Pausado por error de autenticación");
      return;
    }

    // 454 → demasiados logins: backoff 30 min y reintento automático
    if (msg.includes("454")) {
      pushLog(
        "⏳ Gmail 454 Too many login attempts. Pausa 30 minutos antes de reintentar."
      );
      saveProgress();
      stopBulk("Backoff por 454");
      setTimeout(() => {
        if (!isRunning) startBulk(currentSubject, currentMessage); // retomará por 'index'
      }, 30 * 60 * 1000);
      return;
    }

    // Otros errores: log y continuar
    index++;
    pushLog(`✖ Error con ${r.email}: ${msg}`);
  }

  saveProgress();
};

export function startBulk(subject: string, message: string) {
  if (isRunning) {
    pushLog("⚠️ Ya hay un envío en curso.");
    return;
  }
  loadRecipients();

  // Reset si no hay destinatarios o el índice está fuera de rango
  if (!Array.isArray(recipients) || recipients.length === 0) {
    pushLog("ℹ️ No hay destinatarios en el archivo JSON.");
    return;
  }
  if (index >= recipients.length) {
    pushLog(
      `ℹ️ Progreso fuera de rango (index=${index}, total=${recipients.length}). Reinicio a 0.`
    );
    index = 0;
    saveProgress();
  }

  currentSubject = subject;
  currentMessage = message;
  sentSinceCooldown = 0;

  pushLog(`▶️ Iniciando envío masivo desde ${index}/${recipients.length}`);
  isRunning = true;

  interval = setInterval(processTick, 1000); // 1 email/segundo
}

export function getState() {
  return {
    running: isRunning,
    index,
    total: recipients.length || 0,
    sentToday,
    lastReset,
  };
}
