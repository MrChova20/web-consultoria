import { Request, Response } from "express";
// backend/src/controllers/emailController.ts
import { startBulk } from "../worker/bulkWorker";   // 👈 correcto

export const runBulkEmails = (req: Request, res: Response) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: "Falta asunto o mensaje." });
  }

  startBulk(subject, message);
  res.json({ message: "Proceso de envío masivo iniciado en servidor." });
};
