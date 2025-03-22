import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import { isValidAppointment } from '../utils/timeValidation';

export const sendAppointmentEmail = async (req: Request, res: Response) => {
  const { name, email, company, date, time, topic, mode } = req.body;

  // Validar que los campos requeridos existen
  if (!name || !email || !company || !date || !time || !topic || !mode) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  // Validar que la cita es válida (dentro del horario y no en el pasado)
  if (!isValidAppointment(date, time)) {
    return res.status(400).json({ error: 'La cita debe ser en horario comercial y no en el pasado.' });
  }

  const locationInfo =
    mode === 'online'
      ? `🔗 Enlace: https://meet.google.com/new`
      : `📍 Dirección: Carrer Rausell 6, 1º, Gandia, Valencia`;

  const message = `
Hola ${name},

Tu cita ha sido confirmada:

📅 Fecha: ${date}
🕒 Hora: ${time}
🏢 Empresa: ${company}
📌 Tema: ${topic}
${locationInfo}

Gracias por confiar en Software Gandia.
`;

  try {
    await sendEmail({
      to: email,
      cc: 'softwaregandia@gmail.com',
      subject: 'Confirmación de Cita - Software Gandia',
      text: message
    });

    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
