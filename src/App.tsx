import React from 'react';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';


const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-black to-gray-800 bg-opacity-90 backdrop-blur-lg z-50 flex items-center justify-between px-12 py-5 shadow-lg">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">SOFTWARE GANDIA</h1>
        </motion.div>
        <nav className="hidden md:flex space-x-10 text-lg font-medium">
          <a href="#services" className="hover:text-blue-400 transition">Servicios</a>
          <a href="#about" className="hover:text-blue-400 transition">Sobre Nosotros</a>
          <a href="#clients" className="hover:text-blue-400 transition">Clientes</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contacto</a>
        </nav>
        <div className="md:hidden">
          <Menu className="w-8 h-8 cursor-pointer" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-screen h-screen flex items-center justify-center text-center bg-cover bg-center snap-start" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="bg-black bg-opacity-70 p-12 rounded-xl max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl font-extrabold leading-tight text-blue-400">
            Soluciones Tecnológicas Innovadoras
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-2xl mt-6 text-gray-300">
            Impulsamos el crecimiento de tu empresa con tecnología avanzada
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-screen h-screen flex flex-col justify-center items-center text-center bg-cover bg-center snap-start" style={{ backgroundImage: "url('https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="bg-black bg-opacity-70 p-12 rounded-xl max-w-3xl">
          <h2 className="text-5xl font-bold text-blue-400">Nuestros Servicios</h2>
          <p className="text-xl mt-4 text-gray-300">Desarrollo de software, consultoría IT y ciberseguridad.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-screen h-screen flex flex-col justify-center items-center text-center bg-cover bg-center snap-start" style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/D4D22AQG8SO9FvoyzZQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1733763583420?e=1743638400&v=beta&t=MnMTQLv2IbUHWkbv_BUyFMZglHICL_K8zRCAiZTK7Ec')" }}>
        <div className="bg-black bg-opacity-70 p-12 rounded-xl max-w-3xl">
          <h2 className="text-5xl font-bold text-blue-400">Sobre Nosotros</h2>
          <p className="text-xl mt-4 text-gray-300">Expertos en tecnología y transformación digital.</p>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="w-screen h-screen flex flex-col justify-center items-center text-center bg-cover bg-center snap-start" style={{ backgroundImage: "url('/images/clients.jpg')" }}>
        <div className="bg-black bg-opacity-70 p-12 rounded-xl max-w-3xl">
          <h2 className="text-5xl font-bold text-blue-400">Nuestros Clientes</h2>
          <p className="text-xl mt-4 text-gray-300">Empresas que confían en nuestras soluciones tecnológicas.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-screen h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-900 to-gray-900 snap-start p-10">
        <div className="text-center max-w-3xl mb-10">
          <h2 className="text-5xl font-bold text-white">Contáctanos</h2>
          <p className="text-xl mt-4 text-gray-300">Hablemos sobre tu próximo proyecto tecnológico.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
          <div className="text-left">
            <h3 className="text-3xl font-semibold text-blue-300">Pablo Chova Aparisi</h3>
            <p className="text-lg mt-2 text-gray-300">Teléfono: +34 601 745 344</p>
            <p className="text-lg text-gray-300">Email: pablochova02@gmail.com</p>
          </div>
          <img src="https://media.licdn.com/dms/image/v2/D4D03AQERfL01zhUluA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727361699136?e=1746057600&v=beta&t=x6lXIhCnRk5y2AxfpQXZOMFFdwf6hkfUUWMBh1RfsT4" alt="Pablo Chova Aparisi" className="w-48 h-48 rounded-full object-cover border-4 border-blue-400" />
        </div>
        <div className="w-full max-w-4xl h-96 mt-10 border-4 border-blue-400">
        <iframe
  width="100%"
  height="100%"
  frameBorder="0"
  scrolling="no"
  marginHeight={0}
  marginWidth={0}
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDBZ2i_bLUQbwjgWnLyIajw-QLZuOMv9Vg&q=Carrer+Rausell+6,+Gandia,+Valencia,+Spain"
  allowFullScreen
></iframe>


</div>

      </section>
    </div>
  );
};

export default Home;

