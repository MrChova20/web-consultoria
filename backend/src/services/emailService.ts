import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

interface EmailData {
  to: string;
  cc?: string;
  subject: string;
  text?: string;  // ahora opcional
  html?: string;  // nuevo soporte HTML
  context?: Record<string, string>; // para placeholders (ej: { nombre: "Juan" })
}

// función para reemplazar placeholders tipo {{nombre}}
const personalize = (tpl: string, ctx: Record<string, string> = {}) =>
  tpl.replace(/{{\s*(\w+)\s*}}/g, (_, key) => ctx[key] ?? "");

export const sendEmail = async ({ to, cc, subject, text, html, context = {} }: EmailData) => {
  // si el usuario pasa text o html con placeholders, los sustituimos
  const finalText = text ? personalize(text, context) : undefined;
  const finalHtml = html ? personalize(html, context) : undefined;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    cc,
    subject: personalize(subject, context), // también soporta {{nombre}} en asunto
    text: finalText,
    html: finalHtml,
  });
};
