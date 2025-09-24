import fs from "fs";
import path from "path";
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

export function loadRecipients() {
  recipients = JSON.parse(fs.readFileSync(recipientsFile, "utf-8"));
  if (fs.existsSync(progressFile)) {
    const saved = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
    index = saved.index || 0;
    sentToday = saved.sentToday || 0;
    lastReset = saved.lastReset || new Date().toDateString();
  }
}

function saveProgress() {
  fs.writeFileSync(
    progressFile,
    JSON.stringify({ index, sentToday, lastReset }, null, 2)
  );
}

export function startBulk(subject: string, message: string) {
  if (isRunning) {
    console.log("⚠️ Ya hay un envío en curso.");
    return;
  }
  loadRecipients();

  console.log(`▶️ Iniciando envío masivo desde posición ${index}/${recipients.length}`);

  isRunning = true;
  const interval = setInterval(async () => {
    const today = new Date().toDateString();
    if (today !== lastReset) {
      sentToday = 0;
      lastReset = today;
    }

    if (sentToday >= 499) {
      console.log("⏸ Límite diario alcanzado, continuará mañana.");
      saveProgress();
      return;
    }

    if (index >= recipients.length) {
      console.log("✅ Todos los correos enviados.");
      clearInterval(interval);
      isRunning = false;
      saveProgress();
      return;
    }

    const r = recipients[index];
    try {
      await sendEmail({
        to: r.email,
        subject,
        text: message,
        html: message,
        context: {
          nombre: r.nombre ?? r.name ?? "",
          name: r.name ?? r.nombre ?? "",
        },
      });
      sentToday++;
      index++;
      console.log(`✔ Enviado ${index}/${recipients.length} → ${r.email}`);
    } catch (err: any) {
      console.error(`✖ Error con ${r.email}: ${err.message}`);
      index++;
    }

    saveProgress();
  }, 1000);
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
