import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Footer from './components/ui/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScheduleAppointment from './ScheduleAppointment.tsx'; // Importa la nueva página

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Software Gandia | Soluciones Tecnológicas para Empresas";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Software Gandia ofrece soluciones tecnológicas innovadoras para empresas: desarrollo web, aplicaciones móviles, consultoría IT y más. Impulsa tu negocio con tecnología de vanguardia.";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <Router>
      <div className="w-screen min-h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gray-900 text-white flex flex-col">
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-black to-gray-800 bg-opacity-90 backdrop-blur-lg z-50 flex items-center justify-between px-6 md:px-12 py-5 shadow-lg">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">Software Gandia</h1>
          </motion.div>
          <nav className="hidden md:flex space-x-10 text-lg font-medium">
            <a href="#services" className="hover:text-blue-400 transition">Servicios</a>
            <a href="#about" className="hover:text-blue-400 transition">Sobre Nosotros</a>
            <a href="#clients" className="hover:text-blue-400 transition">Clientes</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contacto</a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-8 h-8 cursor-pointer" /> : <Menu className="w-8 h-8 cursor-pointer" />}
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-6 z-50">
            <a href="#services" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#about" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Sobre Nosotros</a>
            <a href="#clients" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Clientes</a>
            <a href="#contact" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Contacto</a>
          </div>
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <section className="w-screen h-screen flex items-center justify-center text-center bg-cover bg-center snap-start" style={{ backgroundImage: "url('/images/hero.webp')" }}>
                <div className="bg-black bg-opacity-70 p-12 rounded-xl max-w-4xl">
                  <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl font-extrabold leading-tight text-blue-400">
                    Transformamos tu Empresa con Tecnología
                  </motion.h1>
                  <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-2xl mt-6 text-gray-300">
                    Desarrollamos soluciones digitales para optimizar y hacer crecer tu negocio.
                  </motion.p>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
                    <Link to="/schedule-appointment" className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition">
                      Solicita una Consultoría Gratuita
                    </Link>
                  </motion.div>
                </div>
              </section>
            } />
            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
