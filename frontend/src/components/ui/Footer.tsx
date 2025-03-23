import React from 'react';

interface FooterProps {
  contactEmail?: string;
}

const Footer: React.FC<FooterProps> = ({ contactEmail = "softwaregandia@gmail.com" }) => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        
        {/* Columna 1 - Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Gandia Software</h2>
          <p className="mt-3 text-sm">
            Innovación y tecnología para transformar tu negocio. Expertos en desarrollo de software y consultoría IT.
          </p>
        </div>

        {/* Columna 2 - Contacto */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contacto</h3>
          <p className="mt-3 text-sm">📍 Gandia, Valencia</p>
          <p className="text-sm">📧 <a href={`mailto:${contactEmail}`} className="hover:text-blue-400">{contactEmail}</a></p>
          <p className="text-sm">📞 +34 601 745 344</p>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 mt-10 text-center text-sm py-4">
        © {new Date().getFullYear()} Gandia Software. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
