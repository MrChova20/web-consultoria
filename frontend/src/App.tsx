import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScheduleAppointment from './ScheduleAppointment';
import Footer from './components/ui/Footer';
import BulkEmailDashboard from './BulkEmailDashboard';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title =
      'Gandia Software | Peritajes Informáticos y Soporte Informático Jurídico';
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-slate-800/60">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-amber-400"
          >
            Gandia Software
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-amber-300 transition-colors">Inicio</Link>
            <Link to="/schedule-appointment#form" className="hover:text-amber-300 transition-colors">Contacto</Link>
        {/*    <Link to="/envios" className="hover:text-amber-300 transition-colors">Envío masivo</Link>*/}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </header>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="fixed top-16 left-0 w-full bg-slate-900/95 z-40 flex flex-col items-center py-6 space-y-4 text-lg border-b border-slate-800">
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/schedule-appointment#form" onClick={() => setMenuOpen(false)}>Contacto</Link>
          {/* MOBILE MENU   <Link to="/envios" onClick={() => setMenuOpen(false)}>Envío masivo</Link> */}
          </div>
        )}

        <main className="pt-20">
          <Routes>
            {/* LANDING */}
            <Route
              path="/"
              element={
                <div className="space-y-28 md:space-y-32">
                  {/* HERO */}
                  <section
                    className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "url('https://lexsasabogadas.com/wp-content/uploads/2024/03/fotografos_20191010_163331.jpg')",
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/70" />
                    <div className="relative z-10 bg-slate-950/50 p-8 md:p-10 rounded-2xl text-center max-w-3xl shadow-2xl ring-1 ring-slate-800/60">
                      <motion.h1
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight"
                      >
                        <span className="text-amber-400">Peritaje Informático</span> y
                        Servicios IT para Abogados
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75 }}
                        className="mt-5 text-base md:text-lg text-slate-300"
                      >
                        Informes periciales, ciberseguridad, recuperación de evidencias y
                        soporte técnico integral para despachos jurídicos.
                      </motion.p>
                      <div className="mt-8 flex items-center justify-center gap-4">
                        <a
                          href="/schedule-appointment#form"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          Solicita una consultoría
                        </a>
                        <a
                          href="#servicios"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-transparent border border-slate-700 hover:border-amber-500 hover:text-amber-300 font-semibold transition-colors"
                        >
                          Ver servicios
                        </a>
                      </div>
                    </div>
                  </section>

                  {/* LOGO / SELLO ICAV */}
                  <section className="px-6 md:px-20 text-center">
                    <div className="mx-auto w-full max-w-xs">
                      <img
                        src="https://www.icav.es/bd/imagenes/imagen3737g.jpg"
                        alt="ICAV"
                        className="mx-auto h-14 sm:h-16 md:h-20 w-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="text-slate-300 mt-5 max-w-3xl mx-auto text-sm md:text-base">
                      Experiencia directa con entornos jurídicos: migraciones de correo,
                      soporte a despachos y trabajo con sistemas como <strong>AKA</strong>.
                    </p>
                  </section>

                  {/* SERVICIOS */}
                  <section id="servicios" className="px-6 md:px-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-10">
                      Servicios Especializados para Abogados
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                      <ServiceCard
                        title="Peritaje Informático Judicial"
                        description="Informes claros y ratificación en sala. Metodología forense y cadena de custodia."
                      />
                      <ServiceCard
                        title="Ciberseguridad Jurídica"
                        description="Análisis forense, detección de brechas, respuesta a incidentes y endurecimiento."
                      />
                      <ServiceCard
                        title="Migración de Correo en Despachos"
                        description="Planificación, ejecución segura y soporte post-migración. Experiencia con AKA."
                      />
                      <ServiceCard
                        title="Recuperación de Evidencias Digitales"
                        description="WhatsApp, email, navegación, metadatos y archivos eliminados."
                      />
                      <ServiceCard
                        title="Consultoría RGPD y LegalTech"
                        description="Evaluaciones de impacto, política de privacidad y soluciones tecnológicas."
                      />
                      <ServiceCard
                        title="Software a Medida para Despachos"
                        description="Automatización de tareas, gestión documental, flujos y firma electrónica."
                      />
                    </div>
                    <p className="mt-10 text-slate-300 max-w-3xl mx-auto">
                      Traducimos lo técnico a lenguaje jurídico, entregando evidencias robustas
                      y accionables.
                    </p>
                  </section>

                  {/* CTA FINAL */}
                  <section className="py-16 px-6 md:px-20 text-center">
                    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/50 p-8 md:p-10 shadow-xl">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        ¿Necesitas soporte técnico o un peritaje para tu caso?
                      </h3>
                      <p className="mt-4 text-slate-300">
                        Agenda una llamada y cuéntanos tu situación. Te orientamos sin compromiso.
                      </p>

                      <div className="mt-7 flex items-center justify-center gap-4">
                        <a
                          href="/schedule-appointment#form"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          Solicitar reunión
                        </a>

                        {/* Botón nuevo que lleva al panel de envíos */}
                        <Link
                          to="/envios"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-transparent border border-slate-700 hover:border-amber-500 hover:text-amber-300 font-semibold transition-colors"
                        >
                          Envío masivo
                        </Link>
                      </div>
                    </div>
                  </section>
                </div>
              }
            />

            {/* RUTAS */}
            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
            <Route path="/envios" element={<BulkEmailDashboard />} />
          </Routes>
        </main>

        <Footer contactEmail="softwaregandia@gmail.com" />
      </div>
    </Router>
  );
};

const ServiceCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/40 hover:-translate-y-0.5 transition-all">
    <h4 className="text-lg font-semibold text-slate-100 mb-2">{title}</h4>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </div>
);

export default App;
