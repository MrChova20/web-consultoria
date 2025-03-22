import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ScheduleAppointment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    time: '',
    mode: 'online',
    topic: ''
  });

  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const isBusinessHour = (dateStr: string, timeStr: string) => {
    const datetime = new Date(`${dateStr}T${timeStr}`);
    const day = datetime.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const hour = datetime.getHours();
    return day >= 1 && day <= 5 && ((hour >= 9 && hour < 14) || (hour >= 16 && hour < 19));
  };

  const isPastDate = (dateStr: string, timeStr: string) => {
    const now = new Date();
    const selected = new Date(`${dateStr}T${timeStr}`);
    return selected < now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPastDate(formData.date, formData.time)) {
      setError('❌ No puedes agendar una cita en el pasado.');
      return;
    }

    if (!isBusinessHour(formData.date, formData.time)) {
      setError('❌ Solo puedes agendar citas de lunes a viernes, entre 9-14h y 16-19h.');
      return;
    }

    let meetLink = null;
    if (formData.mode === 'online') {
      meetLink = 'https://meet.google.com/new';
      setMeetingLink(meetLink);
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      date: formData.date,
      time: formData.time,
      mode: formData.mode,
      topic: formData.topic
    };

    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Error desconocido');
      }

      setSubmitted(true);
      console.log('Correo enviado correctamente');
    } catch (err: any) {
      console.error('Error enviando correo:', err);
      setError(`❌ ${err.message}`);
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
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
  <div>
    <label htmlFor="name" className="block mb-1 text-gray-300">Nombre</label>
    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
  </div>

  <div>
    <label htmlFor="email" className="block mb-1 text-gray-300">Correo Electrónico</label>
    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
  </div>

  <div>
    <label htmlFor="company" className="block mb-1 text-gray-300">Empresa</label>
    <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
  </div>

  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1">
      <label htmlFor="date" className="block mb-1 text-gray-300">Fecha</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        min={new Date().toISOString().split('T')[0]}
      />
    </div>

    <div className="flex-1">
      <label htmlFor="time" className="block mb-1 text-gray-300">Hora</label>
      <input
        type="time"
        name="time"
        id="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
        step="1800"
        list="availableHours"
      />
      <datalist id="availableHours">
        <option value="09:00" />
        <option value="09:30" />
        <option value="10:00" />
        <option value="10:30" />
        <option value="11:00" />
        <option value="11:30" />
        <option value="12:00" />
        <option value="12:30" />
        <option value="13:00" />
        <option value="13:30" />
        <option value="16:00" />
        <option value="16:30" />
        <option value="17:00" />
        <option value="17:30" />
        <option value="18:00" />
        <option value="18:30" />
      </datalist>
    </div>
  </div>

  <div>
    <label htmlFor="mode" className="block mb-1 text-gray-300">Modo</label>
    <select name="mode" id="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded">
      <option value="online">Reunión Online</option>
      <option value="presencial">Reunión Presencial</option>
    </select>
  </div>

  <div>
    <label htmlFor="topic" className="block mb-1 text-gray-300">Tema a tratar</label>
    <textarea name="topic" id="topic" value={formData.topic} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
  </div>

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
