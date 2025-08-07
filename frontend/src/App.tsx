import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScheduleAppointment from './ScheduleAppointment';
import Footer from './components/ui/Footer';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Gandia Software LegalTech | Peritaje Informático y Consultoría Jurídica";
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-950 text-white flex flex-col">
        <header className="fixed top-0 left-0 w-full bg-black backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-12 py-4 shadow-xl">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-blue-400">Gandia Software</Link>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed top-16 left-0 w-full bg-black z-40 flex flex-col items-center py-6 space-y-4 text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/schedule-appointment#form" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        )}

        <main className="pt-20">
          <Routes>
            <Route path="/" element={
              <div className="space-y-32">
                {/* Hero */}
                <section
                  className="min-h-screen bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091215367-5fe95b6b835c?q=80')" }}
                >
                  <div className="bg-black/70 p-10 rounded-xl text-center max-w-3xl">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-blue-400">
                      Expertos en Peritaje Informático y LegalTech
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-6 text-lg text-gray-300">
                      Asistimos a despachos y abogados del ICAV en casos tecnológicos complejos: peritajes, ciberseguridad, propiedad intelectual, protección de datos y más.
                    </motion.p>
                    <a href="/schedule-appointment#form" className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold text-white">
                      Solicita una reunión
                    </a>
                  </div>
                </section>

                {/* Servicios */}
                <section className="px-6 md:px-20 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Servicios Especializados</h2>
                  <div className="grid md:grid-cols-3 gap-10">
                    <ServiceCard title="Peritaje Informático Judicial (Ratificación en Sala)" />
                    <ServiceCard title="Consultoría LegalTech para Abogados del ICAV" />
                    <ServiceCard title="Ciberseguridad y Análisis Forense" />
                    <ServiceCard title="Recuperación de Evidencias Digitales" />
                    <ServiceCard title="Protección de Datos y Adaptación al RGPD" />
                    <ServiceCard title="Blockchain Legal y Custodia de Pruebas" />
                    <ServiceCard title="Automatización Legal con IA y Smart Contracts" />
                    <ServiceCard title="Software a Medida para Despachos Jurídicos" />
                  </div>
                  <p className="mt-8 text-gray-400 max-w-3xl mx-auto">
                    En todos nuestros servicios, contamos con un equipo técnico y jurídico que garantiza resultados legalmente válidos y técnicamente sólidos.
                  </p>
                </section>

                {/* Por qué nosotros */}
                <section className="bg-gray-900 py-16 px-6 md:px-20 text-center text-white">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">¿Por qué trabajar con Gandia Software LegalTech?</h3>
                  <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                    Porque entendemos tanto de software como de derecho. Hemos trabajado con abogados, jueces y empresas tecnológicas. Dominamos los procesos judiciales, sabemos cómo presentar un informe técnico ante un tribunal y lo traducimos al lenguaje jurídico necesario.
                  </p>
                </section>

                {/* Sobre Pablo */}
                <section className="bg-gray-800 py-16 px-6 md:px-20 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Quién está detrás?</h3>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Gandia Software está liderada por Pablo Chova Aparisi, Ingeniero de Software, Perito Informático y Consultor LegalTech. Contamos con un equipo multidisciplinar especializado en derecho, tecnología y ciberseguridad.
                  </p>
                </section>

                {/* CTA final */}
                <section className="bg-blue-600 py-16 px-6 md:px-20 text-center text-white">
                  <h3 className="text-3xl md:text-4xl font-bold">¿Eres abogado y necesitas soporte técnico en un caso?</h3>
                  <p className="mt-4 text-lg">Hablemos sin compromiso. Somos expertos en derecho tecnológico.</p>
                  <a href="/schedule-appointment#form" className="mt-6 inline-block px-6 py-3 bg-black hover:bg-gray-800 rounded-lg text-lg font-semibold text-white">
                    Solicita una consultoría gratuita
                  </a>
                </section>
              </div>
            } />

            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
          </Routes>
        </main>

        <Footer contactEmail="legaltech@gandiasoftware.com" />
      </div>
    </Router>
  );
};

const ServiceCard = ({ title }: { title: string }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
    <h4 className="text-xl font-semibold text-white">{title}</h4>
  </div>
);

export default App;
