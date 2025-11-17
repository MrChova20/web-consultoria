// backend/src/routes.ts
import { Router, Request, Response } from "express";
import { runBulkEmails } from "./controllers/emailController";
import { getState, getLogs, onLog, offLog } from "./worker/bulkWorker";
import { DEFAULT_SUBJECT, DEFAULT_HTML } from "./config/emailTemplate"; // 👈 importa la plantilla

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true, service: "email-api" }));

// Iniciar proceso masivo (usa SIEMPRE la plantilla fija del código)
router.post("/email/run-bulk", runBulkEmails);

// Estado actual
router.get("/email/status", (_req, res) => {
  const s = getState();
  res.json({ ok: true, ...s });
});

// Stream de logs (Server-Sent Events)
router.get("/email/stream", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Enviar logs previos
  for (const line of getLogs()) res.write(`data: ${line}\n\n`);

  // Suscripción en vivo
  const handler = (line: string) => res.write(`data: ${line}\n\n`);
  onLog(handler);

  // Limpieza al cerrar
  req.on("close", () => offLog(handler));
});

// 🔎 1) Ver plantilla (JSON)
router.get("/email/template", (_req, res) => {
  res.json({ subject: DEFAULT_SUBJECT, html: DEFAULT_HTML });
});

// 🖼️ 2) Previsualizar HTML de la plantilla en navegador
router.get("/email/template/preview", (_req, res) => {
  // Sustituye un {{nombre}} de ejemplo para vista previa
  const preview = DEFAULT_HTML.replace(/{{\s*(nombre|name)\s*}}/g, "Ejemplo");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(preview);
});

export default router;
