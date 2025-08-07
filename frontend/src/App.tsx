import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScheduleAppointment from './ScheduleAppointment';
import Footer from './components/ui/Footer';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Gandia Software LegalTech | Peritajes Informáticos y Soporte ICAV";
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
                {/* Hero con fondo profesional */}
                <section
                  className="min-h-screen bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/6/6f/Palau_de_Just%C3%ADcia_Barcelona.jpg')" }}
                >
                  <div className="bg-black/70 p-10 rounded-xl text-center max-w-3xl">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-blue-400">
                      LegalTech para Abogados del ICAV
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-6 text-lg text-gray-300">
                      Peritaje informático, ciberseguridad, recuperación de pruebas, y soporte IT para despachos jurídicos.
                    </motion.p>
                    <a href="/schedule-appointment#form" className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold text-white">
                      Solicita una consultoría
                    </a>
                  </div>
                </section>

                {/* Imagen del ICAV */}
                <section className="px-6 md:px-20 text-center">
                  <img
                    src="https://www.icav.es/uploads/galerias/galeria_1/foto_6379.jpg"
                    alt="Sede ICAV"
                    className="rounded-xl shadow-xl mx-auto max-w-4xl"
                  />
                  <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
                    Contamos con experiencia trabajando directamente con el ICAV, incluyendo soporte en migraciones de correo y sistemas como AKA, así como colaboraciones con despachos jurídicos.
                  </p>
                </section>

                {/* Servicios Especializados */}
                <section className="px-6 md:px-20 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Servicios Especializados para Abogados</h2>
                  <div className="grid md:grid-cols-3 gap-10">
                    <ServiceCard title="Peritaje Informático Judicial" description="Ratificación en sala, informes técnicos claros." />
                    <ServiceCard title="Ciberseguridad Jurídica" description="Análisis forense y recuperación de datos." />
                    <ServiceCard title="Migración de Correo y Soporte ICAV" description="Experiencia con AKA y correo colegial." />
                    <ServiceCard title="Recuperación de Evidencias Digitales" description="WhatsApp, correos, historial, archivos eliminados." />
                    <ServiceCard title="Consultoría RGPD y LegalTech" description="Adecuación al RGPD y soluciones legales tecnológicas." />
                    <ServiceCard title="Desarrollo a Medida para Despachos" description="Automatización, gestión documental y e-firma." />
                  </div>
                  <p className="mt-10 text-gray-400 max-w-3xl mx-auto">
                    Ayudamos a abogados y procuradores a aprovechar la tecnología con informes claros, respaldo técnico y comunicación directa.
                  </p>
                </section>

                {/* Ejemplos de Periciales Informáticas */}
                <section className="bg-gray-900 py-20 px-6 md:px-20">
                  <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Ejemplos de Periciales Informáticas</h3>
                  <ul className="text-lg text-gray-300 list-disc max-w-4xl mx-auto space-y-4">
                    <li>Autenticación y autoría de correos electrónicos.</li>
                    <li>Demostración de accesos no autorizados.</li>
                    <li>Recuperación de mensajes eliminados.</li>
                    <li>Análisis de navegación o descargas desde un dispositivo.</li>
                    <li>Verificación de manipulación de documentos digitales.</li>
                    <li>Extracción de evidencias de móviles o discos duros.</li>
                  </ul>
                </section>

                {/* CTA final */}
                <section className="bg-blue-600 py-16 px-6 md:px-20 text-center text-white">
                  <h3 className="text-3xl md:text-4xl font-bold">¿Eres abogado del ICAV y necesitas soporte técnico?</h3>
                  <p className="mt-4 text-lg">Colaboramos con despachos y peritos oficiales. Habla con un consultor especializado hoy mismo.</p>
                  <a href="/schedule-appointment#form" className="mt-6 inline-block px-6 py-3 bg-black hover:bg-gray-800 rounded-lg text-lg font-semibold text-white">
                    Solicita una reunión personalizada
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

const ServiceCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
    <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default App;
