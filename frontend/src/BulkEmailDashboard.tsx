import React, { useState, useEffect } from "react";

export default function BulkEmailDashboard() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<any>(null);

  const start = async () => {
    const res = await fetch("http://localhost:5000/api/email/run-bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });
    const data = await res.json();
    alert(data.message || "Error");
  };

  const refresh = async () => {
    const res = await fetch("http://localhost:5000/api/email/status");
    const data = await res.json();
    setStatus(data);
  };

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 5000); // refresca cada 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Panel de envíos masivos</h1>

      <input
        className="border p-2 w-full"
        placeholder="Asunto"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-32"
        placeholder="Mensaje (puedes usar {{nombre}})"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={start}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Iniciar envío
      </button>

      <div className="border p-3 bg-gray-50 rounded">
        <h2 className="font-semibold">Estado</h2>
        {status ? (
          <ul className="text-sm space-y-1">
            <li>Ejecutando: {status.running ? "Sí" : "No"}</li>
            <li>Progreso: {status.index}/{status.total}</li>
            <li>Enviados hoy: {status.sentToday}</li>
            <li>Último reset: {status.lastReset}</li>
          </ul>
        ) : (
          <p>Cargando estado...</p>
        )}
      </div>
    </div>
  );
}
