import React, { useState } from 'react';

const ScheduleAppointment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    time: '',
    mode: 'online', // Online por defecto
    topic: ''
  });

  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateGoogleMeetLink = () => {
    return 'https://meet.google.com/new';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let meetLink = null;

    if (formData.mode === 'online') {
      meetLink = generateGoogleMeetLink();
      setMeetingLink(meetLink);
    }

    setSubmitted(true);

    const emailBody = `Hola ${formData.name},\n\nTu reunión ha sido agendada:\n\n` +
      `📅 Fecha: ${formData.date}\n🕒 Hora: ${formData.time}\n🏢 Empresa: ${formData.company}\n📌 Tema: ${formData.topic}\n\n` +
      (formData.mode === 'online'
        ? `🔗 Link de reunión: ${meetLink}\n`
        : `📍 Dirección: Carrer Rausell 6, 1º, Gandia, Valencia\n`) +
      `\nSi necesitas modificar la cita, contáctanos.\n\nSaludos,\nSoftware Gandia`;

    try {
      await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email, // Se envía al usuario
          cc: 'softwaregandia@gmail.com', // Se envía una copia a softwaregandia
          subject: 'Confirmación de Cita - Software Gandia',
          text: emailBody
        })
      });

      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error enviando correo:', error);
    }
  };

  const handleCopyLink = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      alert('¡Link copiado al portapapeles!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Agenda tu Cita</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Empresa" required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded">
                <option value="online">Reunión Online</option>
                <option value="presencial">Reunión Presencial</option>
              </select>
              <textarea name="topic" value={formData.topic} onChange={handleChange} placeholder="Descripción del tema a tratar" required className="w-full p-2 bg-gray-700 border border-gray-600 rounded"></textarea>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
                Agendar Cita
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¡Tu cita ha sido agendada!</h2>
            <p>📅 <strong>Fecha:</strong> {formData.date}</p>
            <p>🕒 <strong>Hora:</strong> {formData.time}</p>
            <p>🏢 <strong>Empresa:</strong> {formData.company}</p>
            <p>📌 <strong>Tema:</strong> {formData.topic}</p>
            
            {formData.mode === 'online' ? (
              <>
                <p>🔗 <strong>Reunión Online:</strong></p>
                <a href={meetingLink!} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{meetingLink}</a>
                <button onClick={handleCopyLink} className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
                  Copiar Link
                </button>
              </>
            ) : (
              <p>📍 <strong>Dirección:</strong> Carrer Rausell 6, 1º, Gandia, Valencia</p>
            )}

            <p className="mt-4">📩 Revisa tu correo para más detalles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAppointment;
