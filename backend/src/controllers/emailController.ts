// backend/src/controllers/emailController.ts
import { Request, Response } from "express";
import { startBulk } from "../worker/bulkWorker";
import { DEFAULT_SUBJECT, DEFAULT_HTML } from "../config/emailTemplate";
import { sendEmail } from "../services/emailService";

const APPOINTMENT_TO = process.env.APPOINTMENT_EMAIL_TO || process.env.MAIL_USER || "softwaregandia@gmail.com";

export const runBulkEmails = (_req: Request, res: Response) => {
  startBulk(DEFAULT_SUBJECT, DEFAULT_HTML);
  return res.json({
    ok: true,
    message: "Proceso de envío masivo iniciado con la plantilla por defecto (asunto + HTML en código).",
    usingDefaults: true,
  });
};

/** POST /api/send-email — formulario de agendar cita (landing) */
export const sendAppointmentEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, date, time, mode, topic } = req.body;
    if (!name || !email || !company || !date || !time || !topic) {
      return res.status(400).json({ error: "Faltan campos obligatorios: name, email, company, date, time, topic." });
    }
    const subject = `[Web] Cita agendada: ${company} - ${date} ${time}`;
    const html = `
      <h2>Nueva cita agendada</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || "-"}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Hora:</strong> ${time}</p>
      <p><strong>Modo:</strong> ${mode === "online" ? "Online" : "Presencial"}</p>
      <p><strong>Tema:</strong> ${topic}</p>
    `;
    await sendEmail({ to: APPOINTMENT_TO, subject, html });
    return res.json({ ok: true, message: "Correo enviado correctamente." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al enviar el correo.";
    return res.status(500).json({ error: message });
  }
};
