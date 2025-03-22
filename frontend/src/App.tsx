import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScheduleAppointment from './ScheduleAppointment';
import Footer from './components/ui/Footer';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Software Gandia | Expertos en Blockchain y Desarrollo a Medida";
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-950 text-white flex flex-col">
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-12 py-4 shadow-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-400">Software Gandia</h1>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed top-16 left-0 w-full bg-gray-800 z-40 flex flex-col items-center py-6 space-y-4 text-lg">
            <Link to="/schedule-appointment" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        )}

        <main className="pt-20">
          <Routes>
            <Route path="/" element={
              <div className="space-y-32">
                {/* Hero */}
                <section
                  className="min-h-screen bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/D4D22AQG8SO9FvoyzZQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1733763583420?e=1745452800&v=beta&t=HAgc_C1GqFTM-qpm3nAFgdudnaYEUnetNFyjXaKJp6s')" }}
                >
                  <div className="bg-black/70 p-10 rounded-xl text-center max-w-3xl">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-blue-400">
                      Soluciones Tecnológicas a tu Medida
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-6 text-lg text-gray-300">
                      Especialistas en blockchain, software a medida, y proyectos de innovación tecnológica.
                    </motion.p>
                    <Link to="/schedule-appointment" className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold">
                      Contáctanos
                    </Link>
                  </div>
                </section>

                {/* Servicios */}
                <section className="px-6 md:px-20 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">¿Qué hacemos?</h2>
                  <div className="grid md:grid-cols-3 gap-10">
                    <ServiceCard title="Blockchain y Smart Contracts" />
                    <ServiceCard title="Software Personalizado (ERPs, CRMs)" />
                    <ServiceCard title="Webs, Tiendas Online y Apps" />
                    <ServiceCard title="IA, Big Data y Sistemas Predictivos" />
                    <ServiceCard title="Realidad Virtual y Aumentada" />
                    <ServiceCard title="Sistemas de Sensorización IoT" />
                  </div>
                </section>

                {/* Sobre Pablo */}
                <section className="bg-gray-800 py-16 px-6 md:px-20 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Quién está detrás?</h3>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Soy Pablo Chova Aparisi, Ingeniero de Software y Consultor en I+D+I. En Software Gandia lidero el desarrollo de soluciones digitales innovadoras para empresas de todos los sectores. Nos especializamos en blockchain, pero también diseñamos sistemas a medida: desde ERPs y CRMs, hasta videojuegos, soluciones en realidad virtual, tiendas online y sistemas de sensorización industrial.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/pablo-chova-aparisi-771993153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 justify-center mt-6 text-blue-400 hover:text-blue-300 text-lg"
                  >
                  </a>
                </section>

                {/* CTA */}
                <section className="bg-blue-600 py-16 px-6 md:px-20 text-center text-white">
                  <h3 className="text-3xl md:text-4xl font-bold">¿Tienes un proyecto en mente?</h3>
                  <p className="mt-4 text-lg">Hablemos y te ayudamos a hacerlo realidad.</p>
                  <Link to="/schedule-appointment" className="mt-6 inline-block px-6 py-3 bg-black hover:bg-gray-800 rounded-lg text-lg font-semibold">
                    Solicita una consultoría gratuita
                  </Link>
                </section>
              </div>
            } />

            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
          </Routes>
        </main>

        <Footer />
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
