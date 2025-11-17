import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT || 465),
  secure: (process.env.MAIL_SECURE || "true") === "true",
  pool: true,
  maxConnections: 1,
  maxMessages: Infinity,
  rateDelta: Number(process.env.MAIL_RATE_DELTA || 1000),
  rateLimit: Number(process.env.MAIL_RATE_LIMIT || 1),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail({
  to, cc, subject, html, text,
}: {
  to: string; cc?: string; subject: string; html?: string; text?: string;
}) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    cc,
    subject,
    html,
    text,
  });
}

export async function verifySmtp() {
  await transporter.verify();
  console.log("📮 SMTP listo");
}
