import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

interface EmailData {
  to: string;
  cc?: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, cc, subject, text }: EmailData) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    cc,
    subject,
    text
  });
};
