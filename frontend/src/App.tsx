import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Play,
  Check,
} from 'lucide-react';
import ScheduleAppointment from './ScheduleAppointment';

// ============ HEADER (igual que Ringr) ============
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur border-b border-brand-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-cta-gradient flex items-center justify-center shadow-brand-sm">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
              Gandia<span className="text-brand-600">Software</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/#servicios" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Producto</Link>
            <Link to="/#casos-exito" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Casos de éxito</Link>
            <Link to="/#industrias" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Para tu clínica</Link>
            <Link to="/#integraciones" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Integraciones</Link>
            <Link to="/#compania" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Compañía</Link>
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-slate-600 hover:text-brand-600 font-medium">
                Select Language <span className="text-xs">Español</span> <ChevronDown className="w-4 h-4" />
              </button>
              {langOpen && <div className="absolute top-full mt-1 py-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200">Español</div>}
            </div>
            <Link to="/agendar" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Iniciar sesión</Link>
            <Link to="/agendar" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cta-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg transition-all">
              Prueba ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
          <button type="button" className="lg:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden pb-6 flex flex-col gap-4 border-t border-slate-200 pt-4">
            <Link to="/#servicios" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-brand-600 font-medium">Producto</Link>
            <Link to="/#casos-exito" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-brand-600 font-medium">Casos de éxito</Link>
            <Link to="/#industrias" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-brand-600 font-medium">Para tu clínica</Link>
            <Link to="/#integraciones" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-brand-600 font-medium">Integraciones</Link>
            <Link to="/#compania" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-brand-600 font-medium">Compañía</Link>
            <Link to="/agendar" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold w-fit">Prueba ahora <ArrowRight className="w-4 h-4" /></Link>
          </nav>
        )}
      </div>
    </header>
  );
}

// ============ FOOTER (igual que Ringr) ============
function Footer() {
  return (
    <footer className="bg-[#1e1b4b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-semibold text-white mb-4">Para tu clínica</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/#industrias" className="hover:text-white transition-colors">Medicina estética</Link></li>
              <li><Link to="/#industrias" className="hover:text-white transition-colors">Dermatología estética</Link></li>
              <li><Link to="/#industrias" className="hover:text-white transition-colors">Centros de estética</Link></li>
              <li><Link to="/#industrias" className="hover:text-white transition-colors">Medical spa</Link></li>
              <li><Link to="/#integraciones" className="hover:text-white transition-colors">Integraciones CRM/ERP</Link></li>
              <li><Link to="/#casos-exito" className="hover:text-white transition-colors">Casos de éxito</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Producto</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/#servicios" className="hover:text-white transition-colors">Plataforma</Link></li>
              <li><Link to="/#plataforma" className="hover:text-white transition-colors">Analíticas</Link></li>
              <li><Link to="/#como-funciona" className="hover:text-white transition-colors">Campañas</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Control de calidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orquestador</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Modelos propios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Pública</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Implementación</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Compañía</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Novedades</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Base de conocimiento</a></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Comienza ahora</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/agendar" className="hover:text-white transition-colors">Inicia sesión</Link></li>
              <li><Link to="/agendar" className="hover:text-white transition-colors">Habla con ventas</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-slate-400 text-sm">Powered by Gandia Software</p>
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-400">
            <a href="#" className="hover:text-brand-300 transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Política de cookies</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Política de Seguridad de la Información</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-ringr-bg/30">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <>
      {/* ========== HERO (idéntico a Ringr) ========== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-gradient pt-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.06),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link to="/agendar" className="inline-block px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-8 hover:bg-brand-200 transition-colors border border-brand-200/60">
            IA para clínicas de medicina estética
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Llamadas con IA para clínicas de medicina estética.
          </h1>
          <p className="text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-10 font-medium">
            Atiende el teléfono 24/7, confirma citas, reduce no-shows e integra con tu CRM y ERP. Ingeniería conversacional pensada para tu clínica.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/agendar" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand-lg hover:shadow-brand hover:opacity-95 transition-all">
              Prueba ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#integraciones" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-brand-300 text-brand-700 font-semibold hover:bg-brand-50 hover:border-brand-400 transition-colors">
              Ver integraciones
            </a>
            <a href="#como-funciona" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-brand-300 text-brand-700 font-semibold hover:bg-brand-50 hover:border-brand-400 transition-colors">
              <Play className="w-5 h-5" />
              Cómo funciona
            </a>
          </div>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Pensado para centros de estética, medicina estética y wellness. Cumplimiento RGPD y LOPD. Integración total con los CRMs y ERPs del sector.
          </p>
        </div>
      </section>

      {/* ========== LOGOS STRIP ========== */}
      <section className="py-12 border-y border-brand-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-slate-800 font-semibold text-lg mb-8">
            Pensado para clínicas de medicina estética
          </h2>
          <Link to="/#casos-exito" className="block text-center text-brand-600 font-semibold hover:text-brand-700 mb-8">
            Ver casos de éxito
          </Link>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-600 text-sm font-medium">
            {['Medicina estética', 'Dermatología estética', 'Centros de estética', 'Medical spa', 'Clínicas facial y corporal', 'Tratamientos médico-estéticos'].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SEGURO | NATURAL | ENTERPRISE + STATS ========== */}
      <section id="servicios" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Seguro | Natural | Especializado en medicina estética
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 text-center max-w-4xl mx-auto mb-16">
            IA con voz que atiende a tus pacientes 24/7, confirma citas y se integra con tu CRM y agenda.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">75</p>
              <p className="text-2xl font-bold text-brand-600">%</p>
              <p className="text-slate-600 text-sm mt-2">menos no-shows con recordatorios por voz.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">24/7</p>
              <p className="text-slate-600 text-sm mt-2">recepción telefónica automática.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold text-brand-500">+</p>
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">100%</p>
              <p className="text-slate-600 text-sm mt-2">integrado con tu CRM y ERP del sector.</p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/agendar" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand hover:shadow-brand-lg transition-all">
              Prueba ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CASOS DE ÉXITO ========== */}
      <section id="casos-exito" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-6">Casos de éxito en medicina estética</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Clínica de medicina estética en Valencia', stat: '75%', desc: 'menos no-shows tras confirmaciones automáticas por voz.' },
              { title: 'Centro multisede de dermatología estética', stat: '82%', desc: 'de las llamadas gestionadas sin pasar por recepción.' },
              { title: 'Medical spa con alta demanda', stat: '+40%', desc: 'ocupación de agenda con recordatorios y reagendamiento por IA.' },
              { title: 'Clínica con tratamientos facial y corporal', stat: '+60%', desc: 'menos tiempo de la recepcionista en el teléfono.' },
              { title: 'Centro de estética con CRM integrado', stat: '100%', desc: 'citas confirmadas sincronizadas con NetClinicas en tiempo real.' },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-white border border-brand-100 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all">
                <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">{c.stat}</p>
                <p className="text-slate-600 text-sm mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== UNA SOLUCIÓN HORIZONTAL ========== */}
      <section id="industrias" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Para tu clínica
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 text-center max-w-3xl mx-auto mb-4">
            Solución integral para clínicas de medicina estética.
          </h2>
          <p className="text-center text-slate-600 text-lg max-w-2xl mx-auto mb-4">
            Confirmación de citas, recordatorios por voz, recepción 24/7 e integración total con los CRMs y ERPs que ya utilizas en la industria.
          </p>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Menos no-shows, agenda más ocupada y equipo liberado para lo que importa: tus pacientes.
          </p>
          <div className="text-center mb-12">
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Conocer más</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Confirmación y recordatorio de citas',
              'Recepción telefónica 24/7',
              'Reagendamiento automático',
              'Integración con agenda y CRM',
              'Recordatorios pre y post tratamiento',
              'Información de tratamientos',
              'Gestión de listas de espera',
              'Múltiples sedes y horarios',
              'Cumplimiento RGPD y LOPD',
            ].map((s) => (
              <div key={s} className="p-6 rounded-2xl bg-white border border-brand-100 shadow-card hover:shadow-card-hover hover:border-brand-200 hover:bg-card-hover transition-all">
                <h3 className="font-bold text-slate-900">{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CÓMO FUNCIONA ========== */}
      <section id="como-funciona" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Cómo funciona
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center max-w-3xl mx-auto mb-16">
            La IA atiende cada llamada, confirma o reagenda citas y sincroniza todo con tu CRM y agenda.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Atiende la llamada', desc: 'Recepción 24/7: el paciente llama, la IA responde, consulta disponibilidad y horarios de tu clínica en tiempo real.' },
              { num: '02', title: 'Confirma o reagenda', desc: 'Recordatorios por voz, confirmación de asistencia y reagendamiento automático según tu agenda.' },
              { num: '03', title: 'Sincroniza con tu CRM', desc: 'Cada cita confirmada o modificada se refleja al instante en NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro y el resto de integraciones.' },
              { num: '04', title: 'Menos no-shows', desc: 'Menos huecos en la agenda y más ocupación gracias a recordatorios y confirmaciones automatizadas.' },
            ].map((s) => (
              <div key={s.num} className="p-6 rounded-2xl border border-brand-100 bg-brand-50/30 hover:border-brand-200 transition-colors">
                <p className="text-4xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent mb-2">{s.num}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INFRAESTRUCTURA CONVERSACIONAL ========== */}
      <section id="infraestructura" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            Infraestructura conversacional para clínicas de medicina estética.
          </h2>
          <div className="flex justify-center gap-4 mb-16">
            <Link to="/agendar" className="px-6 py-3 rounded-lg bg-white border border-brand-200 text-brand-700 font-semibold hover:bg-brand-50 shadow-card">Calcula tu ahorro</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">+</p>
              <p className="text-5xl font-bold text-slate-900">75</p>
              <p className="text-2xl font-bold text-slate-900">%</p>
              <p className="text-slate-600 mt-2">menos no-shows en clínicas que confirman con nuestra IA.</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">24/7</p>
              <p className="text-slate-600 mt-2">recepción telefónica sin ampliar plantilla.</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-slate-900">100</p>
              <p className="text-2xl font-bold text-slate-900">%</p>
              <p className="text-slate-600 mt-2">integrado con los CRMs y ERPs del sector estético.</p>
            </div>
          </div>
          <blockquote className="max-w-2xl mx-auto text-center border border-brand-100 border-l-4 border-l-brand-500 pl-6 py-4 bg-white/80 rounded-r-xl shadow-card">
            <p className="text-slate-700 italic">"Desde que confirmamos las citas con la IA de Gandia Software, hemos reducido los no-shows más de un 70% y la recepción puede dedicarse por completo al paciente en consulta."</p>
            <footer className="text-brand-600 text-sm mt-2 font-medium">— Directora de clínica de medicina estética, Valencia</footer>
          </blockquote>
        </div>
      </section>

      {/* ========== INTEGRACIÓN CRMs y ERPs MEDICINA ESTÉTICA ========== */}
      <section id="integraciones" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Integración total
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center max-w-3xl mx-auto mb-4">
            Con los CRMs y ERPs que usan las clínicas de medicina estética.
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
            Conectamos con el software de gestión que ya tienes: agenda, historial de pacientes, facturación y cumplimiento normativo. Sin duplicar datos ni cambiar de proveedor.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'NetClinicas', desc: 'Software gestión clínicas estética' },
              { name: 'HeaBea', desc: 'ERP salud y belleza' },
              { name: 'MN Program', desc: 'Gestión 360 clínicas' },
              { name: 'ClinicApp', desc: 'Agenda y estética' },
              { name: 'AgendaPro', desc: 'Salones, spas y clínicas' },
              { name: 'Proclinica', desc: 'Agenda y historial' },
              { name: 'Estetical', desc: 'Centros de estética' },
              { name: 'Odoo ERP', desc: 'ERP y gestión' },
            ].map((item) => (
              <div key={item.name} className="p-4 rounded-xl border border-brand-100 bg-brand-50/30 text-center hover:border-brand-200 hover:shadow-card transition-all">
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-8">
            ¿Usas otro CRM o ERP? Nuestra API e integraciones a medida permiten conectar con prácticamente cualquier sistema de gestión de clínicas.
          </p>
          <div className="text-center">
            <Link to="/agendar" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand hover:shadow-brand-lg transition-all">
              Prueba ahora <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TUS CLIENTES ODIAN EL MAL SERVICIO ========== */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            Tus pacientes valoran que no se pierda ninguna cita.
          </h2>
          <p className="text-xl text-slate-600 text-center mb-4">
            Todo conectado: teléfono, agenda y CRM en un solo flujo.
          </p>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
            Llamada entrante o saliente, confirmación o reagendamiento: la IA actualiza tu CRM, envía recordatorios y mantiene la agenda al día sin intervención manual.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm text-slate-600">
            <span>Llamada entrante</span>
            <span>→</span>
            <span>Consulta disponibilidad</span>
            <span>→</span>
            <span>Reserva o reagenda</span>
            <span>→</span>
            <span>Actualización en CRM</span>
            <span>→</span>
            <span>Recordatorio por voz</span>
            <span>→</span>
            <span>Confirmación de asistencia</span>
            <span>→</span>
            <span>Menos no-shows</span>
          </div>
        </div>
      </section>

      {/* ========== PLATAFORMA ========== */}
      <section id="plataforma" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Plataforma
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            Una plataforma diseñada para ofrecer fiabilidad, pensada para escalar sin límites.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
            Las llamadas son solo el comienzo. Los insights y las recomendaciones, lo cambian todo.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Conocer más</Link>
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Ver plataforma</Link>
          </div>
        </div>
      </section>

      {/* ========== NO ES UN BOT ========== */}
      <section id="solucion" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Lo que nos distingue
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            No es un bot. Es una infraestructura conversacional.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-4">
            Diseñada para entornos donde la fiabilidad, el control y la escala no son opcionales.
          </p>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Va más allá de un bot tradicional. Ejecuta conversaciones con IA conversacional con lógica, contexto y reglas de negocio en tiempo real.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-brand-100 bg-brand-50/20 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all">
              <h3 className="font-bold text-slate-900 mb-2">Orquestador conversacional propio</h3>
            </div>
            <div className="p-6 rounded-2xl border border-brand-100 bg-brand-50/20 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all">
              <h3 className="font-bold text-slate-900 mb-2">Modelos de ML propios</h3>
              <p className="text-slate-600 text-sm mt-2">Creados específicamente para conversaciones telefónicas: voz, contexto, intención y toma de decisiones en tiempo real.</p>
            </div>
            <div className="p-6 rounded-2xl border border-brand-100 bg-brand-50/20 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all">
              <h3 className="font-bold text-slate-900 mb-2">Mejoras continuas</h3>
              <p className="text-slate-600 text-sm mt-2">Cada llamada mejora tu agente. A más volumen, más calidad y más eficiencia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SEGURIDAD ENTERPRISE ========== */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Seguridad Enterprise
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            Llamadas con IA seguras y cumplimiento para tu clínica.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Protección de datos de pacientes (RGPD/LOPD), servidores en la UE y buenas prácticas para el sector sanitario y estético.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Certificación ISO 27001', desc: 'Cumplimos los estándares ISO 27001 para asegurar tus datos con procesos auditados y controlados.' },
              { title: 'Pen-Test regulares', desc: 'Simulamos ciberataques para detectar fallos y mantener tus sistemas protegidos frente a nuevas amenazas.' },
              { title: 'GDPR: Servidores en la Unión Europea', desc: 'Cumplimos todas las regulaciones marcadas por la UE en términos de privacidad y RGPD.' },
              { title: 'Ciberseguro, RCP y RCG', desc: 'Tu negocio está protegido frente a riesgos digitales con cobertura por siniestro.' },
            ].map((s) => (
              <div key={s.title} className="p-6 rounded-2xl bg-white border border-brand-100 shadow-card hover:border-brand-200 transition-colors">
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Conocer más</Link>
          </div>
        </div>
      </section>

      {/* ========== NUESTRA IMPLEMENTACIÓN ========== */}
      <section id="compania" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-4">
            Tu agente de voz para la clínica, listo en 3 semanas.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Conectamos con tu CRM y agenda, configuramos horarios y mensajes y te formamos. Sin sustituir tu software actual.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Conocemos tu clínica', desc: 'Hablamos contigo: agenda, CRM, flujo de citas y qué quieres automatizar (confirmaciones, recordatorios, recepción).' },
              { num: '2', title: 'Configuramos el agente', desc: 'Diseñamos los mensajes de voz, horarios y reglas (tratamientos, sedes) adaptados a tu forma de trabajar.' },
              { num: '3', title: 'Integración con tu CRM', desc: 'Conectamos con NetClinicas, AgendaPro, Zenoti u otro. Las citas se sincronizan solas con tu agenda.' },
              { num: '4', title: 'Lanzamiento y mejora', desc: 'Activamos el agente, medimos no-shows y ocupación y afinamos según los resultados de tu clínica.' },
            ].map((s) => (
              <div key={s.num}>
                <p className="text-2xl font-bold text-brand-600 mb-2">{s.num}.</p>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/agendar" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand hover:shadow-brand-lg transition-all">
              Prueba ahora <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-slate-900 text-center mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-center text-slate-600 mb-12">
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Contacta con nosotros para saber más</Link>
          </p>
          <div className="space-y-2">
            {[
              '¿Cumple con RGPD y LOPD para datos de pacientes?',
              '¿Qué planes ofrece para clínicas?',
              '¿Qué incluye el coste de la integración inicial?',
              '¿Se integra con mi CRM o software de agenda?',
              '¿Cómo puedo ver una demo para mi clínica?',
              '¿Funciona con varios profesionales o sedes?',
            ].map((q, i) => (
              <div key={i} className="bg-white rounded-lg border border-brand-100 shadow-card overflow-hidden">
                <button
                  type="button"
                  className="w-full px-6 py-4 text-left font-medium text-slate-900 flex justify-between items-center"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  {q}
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-4 text-slate-600 text-sm">
                    Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link to="/agendar" className="text-brand-600 font-semibold hover:text-brand-700">Ver más</Link>
          </p>
        </div>
      </section>

      {/* ========== PRUÉBALO TÚ MISMO (FORM CTA) ========== */}
      <section className="py-20 lg:py-28 bg-hero-gradient border-t border-brand-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            Pruébalo tú mismo.
          </h2>
          <p className="text-slate-600 mb-8">
            Diseñado a medida, listo en 3 semanas, desde 600 € al mes.
          </p>
          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand-lg hover:shadow-brand transition-all text-lg"
          >
            Probar ahora
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-6 max-w-md mx-auto">
            Acepto recibir comunicaciones comerciales y novedades por correo electrónico. Acepto la Política de Privacidad y el Aviso Legal.
          </p>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agendar" element={<ScheduleAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
