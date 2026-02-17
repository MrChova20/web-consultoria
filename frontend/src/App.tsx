import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Bot,
  ArrowRight,
  Check,
  Building2,
  Cpu,
  Menu,
  X,
  PhoneCall,
  CalendarCheck,
  MessageCircle,
  Zap,
  Stethoscope,
  Briefcase,
  UtensilsCrossed,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import ScheduleAppointment from './ScheduleAppointment';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-brand-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Gandia<span className="text-cyan-400">Software</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/#servicios" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              Servicios
            </Link>
            <Link to="/#solucion" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              Solución
            </Link>
            <Link to="/#sectores" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              Sectores
            </Link>
            <Link
              to="/agendar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 hover:border-cyan-400/50 font-semibold transition-all"
            >
              Agendar cita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
          <button
            type="button"
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden pb-6 flex flex-col gap-4 border-t border-white/5 pt-4">
            <Link to="/#servicios" className="text-slate-300 hover:text-cyan-400 font-medium" onClick={() => setMobileOpen(false)}>Servicios</Link>
            <Link to="/#solucion" className="text-slate-300 hover:text-cyan-400 font-medium" onClick={() => setMobileOpen(false)}>Solución</Link>
            <Link to="/#sectores" className="text-slate-300 hover:text-cyan-400 font-medium" onClick={() => setMobileOpen(false)}>Sectores</Link>
            <Link to="/agendar" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold w-fit" onClick={() => setMobileOpen(false)}>
              Agendar cita <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-brand-600 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">GandiaSoftware</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automatización con IA para empresas. Soluciones tecnológicas que escalan tu negocio.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li><Link to="/#servicios" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Servicios</Link></li>
              <li><Link to="/#solucion" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Solución</Link></li>
              <li><Link to="/#sectores" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Sectores</Link></li>
              <li><Link to="/agendar" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Agendar cita</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>Gandía, Valencia</li>
              <li><a href="mailto:softwaregandia@gmail.com" className="hover:text-cyan-400 transition-colors">softwaregandia@gmail.com</a></li>
              <li><a href="tel:+34601745344" className="hover:text-cyan-400 transition-colors">+34 601 745 344</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Gandia Software. Todos los derechos reservados.</p>
          <p className="text-slate-600 text-sm font-medium">Automatización con IA · Empresa tecnológica</p>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-975">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow bg-slate-975" />
        <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Automatización con IA para empresas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
              Nunca más pierdas
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-brand-400">una llamada</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              IA que atiende tu teléfono como tu mejor empleado. Respuesta 24/7, voz humana, citas automáticas y procesos inteligentes para tu negocio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow-glow hover:shadow-glow-lg hover:bg-cyan-400 transition-all"
              >
                Solicitar demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#solucion"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Ver cómo funciona
              </a>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 text-slate-500">
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-500" /> Sin compromiso</span>
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-500" /> Setup en días</span>
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-500" /> Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">Qué hacemos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Tecnología de IA al servicio de tu empresa
            </h2>
            <p className="text-slate-400 text-lg">
              Automatización inteligente de llamadas, procesos y datos para que tu equipo se enfoque en lo que importa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: PhoneCall, title: 'IA telefónica', desc: 'Atiende llamadas 24/7 con voz natural y agenda citas al instante.', color: 'from-cyan-500 to-brand-600' },
              { icon: CalendarCheck, title: 'Gestión de citas', desc: 'Reservas, confirmaciones y recordatorios automáticos.', color: 'from-emerald-500 to-teal-600' },
              { icon: MessageCircle, title: 'Conversaciones humanas', desc: 'Respuestas empáticas y resolución de dudas frecuentes.', color: 'from-violet-500 to-purple-600' },
              { icon: Zap, title: 'Integraciones', desc: 'Google Calendar, CRM, APIs. Se adapta a tu flujo.', color: 'from-amber-500 to-orange-600' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solución */}
      <section id="solucion" className="relative py-24 lg:py-32 border-t border-white/5 bg-gradient-to-b from-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">La solución</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Una IA que actúa (y suena) como una persona real
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                No es un robot. Es una voz inteligente entrenada para tu negocio: atiende llamadas, agenda citas, responde dudas y deriva solo lo importante.
              </p>
              <ul className="space-y-4">
                {['Atiende llamadas automáticamente', 'Habla de forma natural y empática', 'Agenda citas en tu calendario', 'Funciona 24/7 sin descanso'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50">
                <img
                  src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/4b74307a-cbc1-4aab-2aa6-d37a4be94e00/public"
                  alt="IA y automatización para empresas"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/90 backdrop-blur border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">IA operativa 24/7</p>
                    <p className="text-slate-400 text-sm">Respuesta inmediata, cero llamadas perdidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores */}
      <section id="sectores" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">Sectores</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Diseñado para tu sector
            </h2>
            <p className="text-slate-400 text-lg">
              Automatización especializada para clínicas, inmobiliarias, despachos, hostelería y más.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: 'Clínicas y centros médicos', tag: 'Citas y confirmaciones' },
              { icon: Building2, title: 'Inmobiliarias', tag: 'Visitas y leads' },
              { icon: Briefcase, title: 'Despachos profesionales', tag: 'Reuniones y consultas' },
              { icon: UtensilsCrossed, title: 'Restaurantes y hostelería', tag: 'Reservas y pedidos' },
              { icon: Wrench, title: 'Talleres y servicios', tag: 'Revisiones y presupuestos' },
              { icon: Calendar, title: 'Cualquier negocio con citas', tag: 'Automatización total' },
            ].map(({ icon: Icon, title, tag }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-0.5">{title}</h3>
                  <p className="text-slate-500 text-sm">{tag}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 ml-auto transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-brand-600/10 border border-cyan-500/20 p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                ¿Listo para automatizar con IA?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Agenda una demo gratuita. Sin compromiso. Te mostramos cómo la IA puede transformar tu atención al cliente.
              </p>
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow-glow hover:shadow-glow-lg hover:bg-cyan-400 transition-all"
              >
                Agendar demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
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
