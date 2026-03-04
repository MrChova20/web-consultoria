/**
 * API del CRM de calendario clínica.
 * Replica la lógica del n8n "Programa agendar2": Cal.com v2 (slots, bookings, cancel).
 * Incluye BBDD de clientes, doctores, sedes y metadata de citas (doctor/sede por reserva).
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const DATA_DIR = path.join(__dirname, 'data');
const CLIENTES_FILE = path.join(DATA_DIR, 'clientes.json');
const CITAS_LOCALES_FILE = path.join(DATA_DIR, 'citas_locales.json');

const DEFAULT_DOCTORES = ['Dr. García', 'Dra. Martínez', 'Dr. López', 'Dra. Sánchez'];
const DEFAULT_SEDES = ['Clínica Centro', 'Clínica Norte', 'Clínica Sur'];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CLIENTES_FILE)) fs.writeFileSync(CLIENTES_FILE, '[]');
  if (!fs.existsSync(CITAS_LOCALES_FILE)) fs.writeFileSync(CITAS_LOCALES_FILE, '[]');
}
function readClientes() {
  ensureDataDir();
  const raw = fs.readFileSync(CLIENTES_FILE, 'utf8');
  try { return JSON.parse(raw); } catch { return []; }
}
function writeClientes(arr) {
  ensureDataDir();
  fs.writeFileSync(CLIENTES_FILE, JSON.stringify(arr, null, 2));
}
function readCitasLocales() {
  ensureDataDir();
  const raw = fs.readFileSync(CITAS_LOCALES_FILE, 'utf8');
  try { return JSON.parse(raw); } catch { return []; }
}
function writeCitasLocales(arr) {
  ensureDataDir();
  fs.writeFileSync(CITAS_LOCALES_FILE, JSON.stringify(arr, null, 2));
}
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const CALCOM_API = 'https://api.cal.com/v2';
const CALCOM_KEY = process.env.CALCOM_API_KEY;
const USERNAME = process.env.CALCOM_USERNAME || 'softwaregandia-1zc1b2';
const EVENT_TYPE_SLUG = process.env.CALCOM_EVENT_TYPE_SLUG || 'calendario-clinica-1';
const TZ = 'Europe/Madrid';

function calHeaders(version = '2024-08-13') {
  return {
    'Content-Type': 'application/json',
    'cal-api-version': version,
    ...(CALCOM_KEY ? { Authorization: `Bearer ${CALCOM_KEY}` } : {}),
  };
}

// ——— URL del calendario Cal.com para embeber ———
app.get('/api/cal-embed-url', (req, res) => {
  const base = 'https://cal.com';
  const embedPath = [USERNAME, EVENT_TYPE_SLUG].filter(Boolean).join('/');
  res.json({ url: embedPath ? `${base}/${embedPath}` : base });
});

// ——— Doctores y sedes (configuración clínica) ———
app.get('/api/doctores', (req, res) => {
  res.json(DEFAULT_DOCTORES);
});
app.get('/api/sedes', (req, res) => {
  res.json(DEFAULT_SEDES);
});

// ——— Clientes (BBDD CRM) ———
app.get('/api/clientes', (req, res) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    let list = readClientes();
    if (q) {
      list = list.filter(c => {
        const nombre = ((c.nombre || '') + ' ' + (c.apellidos || '')).toLowerCase();
        const telefono = (c.telefono || '').replace(/\s/g, '');
        const email = (c.email || '').toLowerCase();
        return nombre.includes(q) || telefono.includes(q.replace(/\s/g, '')) || email.includes(q);
      });
    }
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/clientes', (req, res) => {
  try {
    const body = req.body || {};
    const nombre = (body.nombre || '').trim();
    const telefono = (body.telefono != null ? String(body.telefono) : '').trim().replace(/\s/g, '');
    if (!nombre) return res.status(400).json({ error: 'Introduzca el nombre del cliente.' });
    if (!telefono || !/\d/.test(telefono)) return res.status(400).json({ error: 'Introduzca un teléfono válido.' });
    const list = readClientes();
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const cliente = {
      id,
      nombre,
      apellidos: (body.apellidos || '').trim(),
      telefono,
      email: (body.email || '').trim(),
      createdAt: new Date().toISOString(),
    };
    list.push(cliente);
    writeClientes(list);
    res.status(201).json(cliente);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/clientes/:id', (req, res) => {
  try {
    const list = readClientes();
    const c = list.find(x => x.id === req.params.id);
    if (!c) return res.status(404).json({ error: 'Cliente no encontrado.' });
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/clientes/:id', (req, res) => {
  try {
    const body = req.body || {};
    const list = readClientes();
    const idx = list.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Cliente no encontrado.' });
    const nombre = (body.nombre || list[idx].nombre || '').trim();
    const telefono = (body.telefono != null ? String(body.telefono) : list[idx].telefono || '').trim().replace(/\s/g, '');
    if (!nombre) return res.status(400).json({ error: 'El nombre no puede estar vacío.' });
    if (!telefono || !/\d/.test(telefono)) return res.status(400).json({ error: 'Introduzca un teléfono válido.' });
    list[idx] = {
      ...list[idx],
      nombre,
      apellidos: (body.apellidos != null ? body.apellidos : list[idx].apellidos || '').trim(),
      telefono,
      email: (body.email != null ? body.email : list[idx].email || '').trim(),
      updatedAt: new Date().toISOString(),
    };
    writeClientes(list);
    res.json(list[idx]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Slots (disponibilidad) ———
app.get('/api/slots', async (req, res) => {
  try {
    const { start, end, timeZone = TZ } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Faltan start y end (ISO)' });
    }
    const q = new URLSearchParams({
      username: USERNAME,
      eventTypeSlug: EVENT_TYPE_SLUG,
      start: String(start),
      end: String(end),
      timeZone,
      format: 'range',
    });
    const r = await fetch(`${CALCOM_API}/slots?${q}`, {
      headers: calHeaders('2024-09-04'),
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Listar reservas por rango de fechas (para el calendario visual) ———
app.get('/api/bookings-range', async (req, res) => {
  try {
    const { start: startParam, end: endParam } = req.query;
    if (!startParam || !endParam) {
      return res.status(400).json({ error: 'Faltan start y end (ISO) para el rango.' });
    }
    const q = new URLSearchParams({
      afterStart: String(startParam),
      beforeEnd: String(endParam),
    });
    const r = await fetch(`${CALCOM_API}/bookings?${q}`, {
      headers: calHeaders(),
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    // Normalizar: Cal.com devuelve { data: [...] } o { bookings: [...] }; enviar siempre array
    let list = Array.isArray(data) ? data : (data.data || data.bookings || []);
    list = Array.isArray(list) ? list : [];
    const citasLocales = readCitasLocales();
    const byUid = {};
    citasLocales.forEach(cl => { byUid[cl.bookingUid] = cl; });
    list = list.map(b => {
      const uid = b.uid || b.id;
      const meta = uid ? byUid[uid] : null;
      return { ...b, doctor: meta ? meta.doctor : null, sede: meta ? meta.sede : null, clientId: meta ? meta.clientId : null };
    });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Listar reservas por teléfono ———
app.get('/api/bookings', async (req, res) => {
  try {
    const raw = req.query.telefono != null ? String(req.query.telefono) : '';
    const telefono = raw.trim().replace(/\s/g, '');
    if (!telefono || !/\d/.test(telefono)) {
      return res.status(400).json({ error: 'Introduzca el teléfono del paciente.' });
    }
    const q = new URLSearchParams({ telefono });
    const r = await fetch(`${CALCOM_API}/bookings?${q}`, {
      headers: calHeaders(),
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Crear reserva (agendar) ———
app.post('/api/bookings', async (req, res) => {
  try {
    const body = req.body || {};
    const nombre = (body.nombre || '').trim();
    const rawPhone = body.telefono != null ? String(body.telefono) : '';
    const telefono = rawPhone.trim().replace(/\s/g, '');
    const start = body.start;
    const timeZone = body.timeZone || TZ;
    if (!nombre) {
      return res.status(400).json({ error: 'Introduzca el nombre del paciente.' });
    }
    if (!telefono || !/\d/.test(telefono)) {
      return res.status(400).json({ error: 'Introduzca el teléfono del paciente.' });
    }
    if (!start) {
      return res.status(400).json({ error: 'Seleccione la fecha y hora de la cita.' });
    }
    const startUtc = new Date(start).toISOString();
    const payload = {
      attendee: {
        language: 'es',
        name: nombre,
        timeZone,
        phoneNumber: normalizarTelefono(telefono),
      },
      start: startUtc,
      eventTypeSlug: EVENT_TYPE_SLUG,
      username: USERNAME,
    };
    const r = await fetch(`${CALCOM_API}/bookings`, {
      method: 'POST',
      headers: calHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    const bookingUid = data.uid || (data.data && data.data.uid) || data.id;
    if (bookingUid && (body.clientId || body.doctor || body.sede)) {
      const citas = readCitasLocales();
      citas.push({
        bookingUid,
        clientId: body.clientId || null,
        doctor: body.doctor || null,
        sede: body.sede || null,
        createdAt: new Date().toISOString(),
      });
      writeCitasLocales(citas);
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Cancelar reserva ———
app.post('/api/bookings/:uid/cancel', async (req, res) => {
  try {
    const { uid } = req.params;
    const { reason = 'Solicitud del cliente' } = req.body || {};
    const r = await fetch(`${CALCOM_API}/bookings/${uid}/cancel`, {
      method: 'POST',
      headers: calHeaders(),
      body: JSON.stringify({ cancellationReason: reason }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(r.status).json(data);
    }
    const citas = readCitasLocales().filter(c => c.bookingUid !== uid);
    writeCitasLocales(citas);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

function normalizarTelefono(t) {
  const s = (t || '').replace(/\s/g, '').replace(/^00/, '+');
  if (/^\+\d+$/.test(s)) return s;
  if (/^34\d{9}$/.test(s)) return '+' + s;
  if (/^[67]\d{8}$/.test(s)) return '+34' + s;
  return s;
}

// Sirve el front estático
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CRM Calendario Clínica: http://localhost:${PORT}`);
  console.log('API: /api/cal-embed-url, /api/doctores, /api/sedes, /api/clientes, /api/slots, /api/bookings-range, /api/bookings, /api/bookings/:uid/cancel');
});
