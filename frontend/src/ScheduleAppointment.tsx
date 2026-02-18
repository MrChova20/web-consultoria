import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ArrowLeft, Calendar, CheckCircle, Copy, Mail, MapPin } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const ScheduleAppointment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    const day = datetime.getDay();
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
      setError('No puedes agendar una cita en el pasado.');
      return;
    }

    if (!isBusinessHour(formData.date, formData.time)) {
      setError('Solo puedes agendar citas de lunes a viernes, entre 9-14h y 16-19h.');
      return;
    }

    let meetLink = null;
    if (formData.mode === 'online') {
      meetLink = 'https://meet.google.com/new';
      setMeetingLink(meetLink);
    }

    const payload = { ...formData };

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al enviar';
      setError(message);
    }
  };

  const handleCopyLink = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      alert('Link copiado al portapapeles.');
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-2';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-600 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-slate-900">Reserva tu demo</h1>
                <p className="text-slate-600 text-sm">Para tu clínica de medicina estética · Sin compromiso</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="tu@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Teléfono</label>
                <PhoneInput
                  international
                  defaultCountry="ES"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value || '' })}
                  className={`${inputClass} [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-slate-900`}
                />
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>Clínica / Centro</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Nombre de tu clínica o centro"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className={labelClass}>Fecha</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>Hora</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    step="1800"
                    list="availableHours"
                  />
                  <datalist id="availableHours">
                    {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'].map((t) => (
                      <option key={t} value={t} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label htmlFor="mode" className={labelClass}>Modo</label>
                <select
                  name="mode"
                  id="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="online">Reunión online</option>
                  <option value="presencial">Reunión presencial</option>
                </select>
              </div>

              <div>
                <label htmlFor="topic" className={labelClass}>Tema a tratar</label>
                <textarea
                  name="topic"
                  id="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={inputClass}
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                Agendar cita
                <CheckCircle className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Cita agendada</h2>
            <p className="text-slate-600 mb-8">Revisa tu correo para más detalles.</p>

            <div className="text-left space-y-3 text-slate-700 mb-8 p-6 rounded-xl bg-slate-50 border border-slate-200">
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-600" /> <strong>Fecha:</strong> {formData.date}</p>
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-600" /> <strong>Hora:</strong> {formData.time}</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-600" /> <strong>Empresa:</strong> {formData.company}</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-600" /> <strong>Tema:</strong> {formData.topic}</p>
            </div>

            {formData.mode === 'online' && meetingLink ? (
              <div className="space-y-3">
                <p className="text-slate-600 text-sm">Reunión online:</p>
                <a
                  href={meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-brand-600 hover:text-brand-700 text-sm break-all"
                >
                  {meetingLink}
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copiar link
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-slate-600 text-sm justify-center">
                <MapPin className="w-4 h-4 text-brand-600" />
                Carrer Rausell 6, 1º, Gandia, Valencia
              </p>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-8 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAppointment;
