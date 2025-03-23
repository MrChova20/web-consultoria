// backend/src/controllers/emailController.ts
import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

export const sendAppointmentEmail = async (req: Request, res: Response) => {
  const { name, email, phone, company, date, time, mode, topic } = req.body;

  if (!name || !email || !phone || !company || !date || !time || !topic) {
    return res.status(400).json({ error: 'Faltan datos obligatorios en el formulario.' });
  }

  const isPast = new Date(`${date}T${time}`) < new Date();
  const isWeekend = [0, 6].includes(new Date(`${date}T${time}`).getDay());
  const hour = new Date(`${date}T${time}`).getHours();
  const isOutOfBusinessHours = !((hour >= 9 && hour < 14) || (hour >= 16 && hour < 19));

  if (isPast || isWeekend || isOutOfBusinessHours) {
    return res.status(400).json({ error: 'La cita debe estar en horario comercial y no puede ser en el pasado.' });
  }

  const location = mode === 'online' ? 'https://meet.google.com/new' : 'Carrer Rausell 6, 1º, Gandia, Valencia';
  const formattedMode = mode === 'online' ? '🔗 Enlace: ' + location : '📍 Dirección: ' + location;

  const message = `Hola ${name},

Tu cita ha sido confirmada:

📅 Fecha: ${date}
🕒 Hora: ${time}
📞 Teléfono: ${phone}
🏢 Empresa: ${company}
📌 Tema: ${topic}
${formattedMode}

Gracias por confiar en Gandia Software.`;

  try {
    await sendEmail({
      to: email,
      cc: 'softwaregandia@gmail.com',
      subject: 'Confirmación de Cita - Gandia Software',
      text: message
    });
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
