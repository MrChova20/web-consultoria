import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Play,
} from 'lucide-react';
import ScheduleAppointment from './ScheduleAppointment';

// ============ HEADER ============
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              Gandia<span className="text-brand-600">Software</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/#servicios" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Producto</Link>
            <Link to="/#casos-exito" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Casos de éxito</Link>
            <Link to="/#industrias" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Para tu clínica</Link>
            <Link to="/#integraciones" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Integraciones</Link>
            <Link to="/#pricing" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Pricing</Link>
            <Link to="/#faq" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">FAQ</Link>
            <Link to="/#calculadora" className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-100 text-brand-700 text-sm font-semibold hover:bg-brand-200 transition-colors">
              Calcula tu ahorro
            </Link>
            <Link to="/agendar" className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
              Reservar demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
          <button type="button" className="lg:hidden p-2 text-slate-600 hover:text-slate-900" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden pb-5 flex flex-col gap-1 border-t border-slate-200 pt-4">
            <Link to="/#calculadora" onClick={() => setMobileOpen(false)} className="py-3 px-2 rounded-lg bg-brand-100 text-brand-700 font-semibold mb-2 text-center">
              Calcula tu ahorro
            </Link>
            <Link to="/#pricing" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">Pricing</Link>
            <Link to="/#servicios" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">Producto</Link>
            <Link to="/#casos-exito" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">Casos de éxito</Link>
            <Link to="/#industrias" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">Para tu clínica</Link>
            <Link to="/#integraciones" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">Integraciones</Link>
            <Link to="/#faq" onClick={() => setMobileOpen(false)} className="py-2 text-slate-600 hover:text-brand-600 font-medium">FAQ</Link>
            <Link to="/agendar" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-brand-600 text-white font-semibold w-fit">
              Reservar demo
              <ArrowRight className="w-4 h-4" />
            </Link>
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
              <li><Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/#plataforma" className="hover:text-white transition-colors">Analíticas</Link></li>
              <li><Link to="/#como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><Link to="/#servicios" className="hover:text-white transition-colors">Control de calidad</Link></li>
              <li><Link to="/#integraciones" className="hover:text-white transition-colors">API e integraciones</Link></li>
              <li><Link to="/#compania" className="hover:text-white transition-colors">Implementación</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Compañía</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/#compania" className="hover:text-white transition-colors">Novedades</Link></li>
              <li><Link to="/#compania" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">Seguridad y RGPD</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">Base de conocimiento</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/#compania" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Comienza ahora</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/#calculadora" className="hover:text-white transition-colors">Calcula tu ahorro</Link></li>
              <li><Link to="/agendar" className="hover:text-white transition-colors">Inicia sesión</Link></li>
              <li><Link to="/agendar" className="hover:text-white transition-colors">Habla con ventas</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-slate-400 text-sm">Powered by Gandia Software</p>
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-400">
            <Link to="/#faq" className="hover:text-brand-300 transition-colors">Política de privacidad</Link>
            <Link to="/#faq" className="hover:text-brand-300 transition-colors">Política de cookies</Link>
            <Link to="/#faq" className="hover:text-brand-300 transition-colors">Aviso Legal</Link>
            <Link to="/#faq" className="hover:text-brand-300 transition-colors">Seguridad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  const location = useLocation();
  const prevHash = useRef<string | null>(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && hash !== prevHash.current) {
      prevHash.current = hash;
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
    if (!hash) prevHash.current = null;
  }, [location.pathname, location.hash]);

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

const PRECIO_POR_MINUTO = 0.25;

function Home() {
  const location = useLocation();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [calculadoraAbierta, setCalculadoraAbierta] = useState(false);
  const [minutosMes, setMinutosMes] = useState('500');
  const [costePersonalMes, setCostePersonalMes] = useState('2000');

  useEffect(() => {
    if (location.hash === '#calculadora') setCalculadoraAbierta(true);
  }, [location.hash]);

  const min = Math.max(0, Number(minutosMes) || 0);
  const costeActual = Math.max(0, Number(costePersonalMes) || 0);
  const costeUsoMes = PRECIO_POR_MINUTO * min;
  const ahorro = Math.max(0, costeActual - costeUsoMes);
  const ahorroPorcentaje = costeActual > 0 ? Math.round((ahorro / costeActual) * 100) : 0;

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
            La recepción que nunca se satura.
          </h1>
          <p className="text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-6 font-medium">
            Todas las llamadas simultáneas que necesites. Línea siempre libre. Atiende el teléfono 24/7, confirma citas, reduce no-shows e integra con tu CRM y ERP.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            <strong className="text-slate-800">Agente de voz en todos los idiomas:</strong> tu recepción atiende a pacientes en español, inglés, francés, alemán y más, sin límite de idiomas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">Llamadas simultáneas ilimitadas</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">Línea nunca saturada</span>
            <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-800">Agente en todos los idiomas</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/agendar" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cta-gradient text-white font-bold shadow-brand-lg hover:shadow-brand hover:opacity-95 transition-all">
              Prueba ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/#calculadora" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-brand-300 text-brand-700 font-semibold hover:bg-brand-50 hover:border-brand-400 transition-colors shadow-card">
              Calcula tu ahorro
            </Link>
            <a href="#integraciones" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-brand-300 text-brand-700 font-semibold hover:bg-brand-50 hover:border-brand-400 transition-colors">
              Ver integraciones
            </a>
            <a href="#como-funciona" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-brand-300 text-brand-700 font-semibold hover:bg-brand-50 hover:border-brand-400 transition-colors">
              <Play className="w-5 h-5" />
              Cómo funciona
            </a>
          </div>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-2">
            Pensado para centros de estética, medicina estética y wellness. Cumplimiento RGPD y LOPD. Integración total con los CRMs y ERPs del sector.
          </p>
          <p className="text-slate-500 text-xs">Demo gratuita. Sin compromiso.</p>
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
            Infraestructura que escala contigo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 text-center max-w-4xl mx-auto mb-4">
            Todas las llamadas que quieras. La línea nunca saturada.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Múltiples pacientes pueden llamar a la vez. Sin colas, sin esperas, sin perder una sola llamada. IA con voz 24/7 integrada con tu CRM y agenda. <strong className="text-slate-700">El agente habla todos los idiomas:</strong> ideal para clínicas con pacientes internacionales.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">∞</p>
              <p className="text-slate-600 text-sm mt-2 font-medium">Llamadas simultáneas. Línea nunca saturada.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">24/7</p>
              <p className="text-slate-600 text-sm mt-2">Recepción automática. Sin ampliar plantilla.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-4xl font-bold text-brand-600 mt-1">Todos los idiomas</p>
              <p className="text-slate-600 text-sm mt-2">Agente de voz multilingüe. Atiende en español, inglés, francés, alemán y más.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 border border-brand-100 shadow-card">
              <p className="text-5xl lg:text-6xl font-bold text-brand-500">+</p>
              <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent">75%</p>
              <p className="text-slate-600 text-sm mt-2">menos no-shows con confirmaciones por voz.</p>
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
              'Agente de voz en todos los idiomas',
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
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center max-w-3xl mx-auto mb-4">
            La IA atiende cada llamada, confirma o reagenda citas y sincroniza todo con tu CRM y agenda.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Varias llamadas a la vez, sin colas: la línea nunca se satura. Cada paciente es atendido al momento.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Atiende la llamada', desc: 'Recepción 24/7: el paciente llama, la IA responde al instante. Llamadas simultáneas ilimitadas, línea nunca saturada.' },
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

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Precio
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-12">
            Precio por minuto, sin cuota fija
          </h2>
          <div className="max-w-2xl mx-auto flex items-center justify-center px-6 py-8 rounded-2xl bg-brand-50/50 border-2 border-brand-200">
            <span className="text-3xl sm:text-4xl font-bold text-brand-600">0,25 €/min</span>
          </div>
          <div className="text-center mt-8">
            <Link to="/#calculadora" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-card">
              Calcula tu ahorro
            </Link>
          </div>
        </div>
      </section>

      {/* ========== INFRAESTRUCTURA CONVERSACIONAL ========== */}
      <section id="infraestructura" className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center mb-2">
            Llamadas simultáneas ilimitadas. Línea nunca saturada.
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
            No importa cuántos pacientes llamen a la vez: nuestra infraestructura atiende todas las llamadas. Sin colas ni líneas ocupadas.
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <Link to="/#calculadora" className="px-6 py-3 rounded-lg bg-white border border-brand-200 text-brand-700 font-semibold hover:bg-brand-50 shadow-card">
              Calcula tu ahorro
            </Link>
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
            Conecta con lo que ya usas
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 text-center max-w-3xl mx-auto mb-4">
            Integraciones con los CRMs y ERPs de medicina estética.
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
            Una sola infraestructura: todas tus llamadas atendidas, nunca saturada. <strong className="text-slate-700">Agente de voz multilingüe</strong> para atender a pacientes en cualquier idioma. Conectamos con tu agenda, historial y facturación. API disponible para integraciones a medida.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl border border-brand-100 bg-brand-50/20 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all">
              <h3 className="font-bold text-slate-900 mb-2">Voz en todos los idiomas</h3>
              <p className="text-slate-600 text-sm mt-2">El agente habla español, inglés, francés, alemán y más. Ideal para clínicas con pacientes internacionales o turismo médico.</p>
            </div>
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
              { q: '¿El agente de voz habla otros idiomas?', a: 'Sí. Nuestro agente de voz está implementado para hablar todos los idiomas: español, inglés, francés, alemán y muchos más. Ideal para clínicas con pacientes internacionales o turismo médico. Sin configuración extra.' },
              { q: '¿Cumple con RGPD y LOPD para datos de pacientes?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
              { q: '¿Qué planes ofrece para clínicas?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
              { q: '¿Qué incluye el coste de la integración inicial?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
              { q: '¿Se integra con mi CRM o software de agenda?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
              { q: '¿Cómo puedo ver una demo para mi clínica?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
              { q: '¿Funciona con varios profesionales o sedes?', a: 'Sí. Nuestra solución cumple RGPD y LOPD y está pensada para el sector sanitario y estético. Nos integramos con NetClinicas, HeaBea, MN Program, ClinicApp, AgendaPro, Proclinica, Estetical, Odoo y otros. Contacta con nosotros para una demo adaptada a tu clínica.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-brand-100 shadow-card overflow-hidden">
                <button
                  type="button"
                  className="w-full px-6 py-4 text-left font-medium text-slate-900 flex justify-between items-center"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-4 text-slate-600 text-sm">
                    {item.a}
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

      {/* Modal Calculadora de ahorro */}
      {calculadoraAbierta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setCalculadoraAbierta(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-display font-bold text-slate-900">Calcula tu ahorro</h3>
              <button type="button" onClick={() => setCalculadoraAbierta(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Cerrar">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4 mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-1">Precio de uso</p>
              <p className="text-lg font-bold text-brand-700">0,25 €/min</p>
              <p className="text-xs text-slate-600 mt-1">Solo pagas por los minutos de llamada cada mes. Compara con lo que te cuesta tener a personas atendiendo el teléfono.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="calc-minutos" className="block text-sm font-medium text-slate-700 mb-1">
                  Minutos de llamadas al mes (estimado)
                </label>
                <input
                  id="calc-minutos"
                  type="number"
                  min={0}
                  step={50}
                  value={minutosMes}
                  onChange={e => setMinutosMes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label htmlFor="calc-coste" className="block text-sm font-medium text-slate-700 mb-1">
                  Coste actual (€/mes) — personas atendiendo el teléfono
                </label>
                <input
                  id="calc-coste"
                  type="number"
                  min={0}
                  step={100}
                  value={costePersonalMes}
                  onChange={e => setCostePersonalMes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Ej. 2000"
                />
                <p className="text-xs text-slate-500 mt-1">Salarios, horas dedicadas o coste externalizado de recepción.</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Coste con nosotros este mes (0,25 €/min):</p>
              <p className="text-2xl font-bold text-slate-900">{costeUsoMes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
              <p className="text-sm text-slate-600 mt-3 mb-1">Tu ahorro estimado al mes:</p>
              <p className="text-2xl font-bold text-green-600">{ahorro.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
              {ahorro > 0 && costeActual > 0 && (
                <>
                  <p className="text-xl font-bold text-green-600 mt-1">{ahorroPorcentaje} % de ahorro</p>
                  <p className="text-xs text-slate-500 mt-2">Ahorro anual aproximado: <strong>{ (ahorro * 12).toLocaleString('es-ES', { maximumFractionDigits: 0 }) } €</strong></p>
                </>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <Link to="/agendar" className="flex-1 text-center px-4 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors">
                Reservar demo
              </Link>
              <button type="button" onClick={() => setCalculadoraAbierta(false)} className="px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
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
