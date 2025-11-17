import React, { useEffect, useRef, useState } from "react";

type Status = { ok?: boolean; running: boolean; index: number; total: number; sentToday: number; lastReset: string };

export default function BulkEmailDashboard() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const start = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Rellena asunto y mensaje (puedes usar {{nombre}}).");
      return;
    }
    const res = await fetch("/api/email/run-bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });
    const data = await res.json();
    alert(data.message || "Hecho");
    refresh();
  };

  const refresh = async () => {
    const res = await fetch("/api/email/status");
    const data = await res.json();
    setStatus(data);
  };

  useEffect(() => {
    // Estado cada 5s
    refresh();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Suscripción a logs en tiempo real (SSE)
    const es = new EventSource("/api/email/stream");
    es.onmessage = (e) => setLogs((prev) => [...prev, e.data].slice(-1000));
    es.onerror = () => { es.close(); };
    return () => es.close();
  }, []);

  useEffect(() => {
    // Autoscroll del área de logs
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const pct = status && status.total ? Math.round((status.index / status.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panel de envíos masivos</h1>

      <div className="grid gap-3">
        <input
          className="border rounded p-2"
          placeholder="Asunto (ej: Hola {{nombre}}, te escribimos...)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="border rounded p-2 h-40"
          placeholder="Mensaje (HTML o texto). Puedes usar {{nombre}}"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-3">
          <button onClick={start} className="bg-blue-600 text-white px-4 py-2 rounded">
            Iniciar envío
          </button>
          <button onClick={refresh} className="bg-gray-200 px-4 py-2 rounded">
            Refrescar estado
          </button>
        </div>
      </div>

      <div className="border rounded p-3 bg-gray-50">
        <h2 className="font-semibold mb-2">Estado</h2>
        {status ? (
          <ul className="text-sm space-y-1">
            <li>Ejecutando: <b>{status.running ? "Sí" : "No"}</b></li>
            <li>Progreso total: <b>{status.index}/{status.total}</b> ({pct}%)</li>
            <li>Enviados hoy: <b>{status.sentToday}</b></li>
            <li>Último reset: {status.lastReset}</li>
            <div className="w-full h-3 bg-white border rounded mt-2">
              <div style={{ width: `${pct}%` }} className="h-3 bg-blue-600 rounded"></div>
            </div>
          </ul>
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      <div className="border rounded p-3">
        <h2 className="font-semibold mb-2">Logs en vivo</h2>
        <div ref={logRef} className="h-64 overflow-auto font-mono text-sm bg-black text-green-300 p-2 rounded">
          {logs.map((l, i) => (<div key={i}>{l}</div>))}
        </div>
      </div>
    </div>
  );
}
