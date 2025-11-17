// backend/src/controllers/emailController.ts
import { Request, Response } from "express";
import { startBulk } from "../worker/bulkWorker";
import { DEFAULT_SUBJECT, DEFAULT_HTML } from "../config/emailTemplate";

export const runBulkEmails = (_req: Request, res: Response) => {
  // Ignora totalmente lo que venga del frontend y usa SIEMPRE los defaults
  startBulk(DEFAULT_SUBJECT, DEFAULT_HTML);
  return res.json({
    ok: true,
    message: "Proceso de envío masivo iniciado con la plantilla por defecto (asunto + HTML en código).",
    usingDefaults: true,
  });
};
