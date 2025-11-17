import React from "react";

const SoftwareGandiaLanding: React.FC = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">

      {/* NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400 flex items-center justify-center font-bold text-blue-300 text-lg">
              SG
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">
                Software Gandía
              </div>
              <div className="text-[11px] text-slate-400 leading-none">
                Peritaje • Software • Hostelería
              </div>
            </div>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#peritaje" className="hover:text-blue-300">Peritaje informático</a>
            <a href="#software" className="hover:text-blue-300">Software empresarial</a>
            <a href="#hosteleria" className="hover:text-blue-300">Hostelería</a>
            <a href="#verifactu" className="hover:text-blue-300">Verifactu</a>
          </nav>

          <a
            href="#contacto"
            className="text-xs md:text-sm px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
          >
            Solicitar presupuesto
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="w-full border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Tecnología profesional,{" "}
              <span className="text-blue-400">peritaje informático</span> y
              software a medida para empresas.
            </h1>

            <p className="text-sm md:text-base text-slate-300 mb-8 max-w-xl">
              En <strong>Software Gandía</strong> diseñamos soluciones digitales avanzadas:
              peritaje informático con validez judicial, CRM y ERP a medida, 
              control de stock, sistemas para hostelería con kioscos por mesa 
              e implantación de Verifactu. Tecnología diseñada para hacer crecer su empresa.
            </p>

            {/* BOTONES ACTUALIZADOS */}
            <div className="flex flex-wrap gap-3 mb-6">

              {/* PRINCIPAL */}
              <a
                href="#contacto"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white shadow-sm shadow-blue-900/50"
              >
                Solicitar presupuesto sin compromiso
              </a>

              {/* SECUNDARIO */}
              <a
                href="#servicios"
                className="px-5 py-2.5 rounded-full border border-blue-400 text-white hover:bg-blue-600 hover:border-blue-600 text-sm font-medium transition"
              >
                Ver servicios
              </a>

            </div>

            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Enfoque empresarial y resultados medibles</li>
              <li>• Trato directo, sin intermediarios</li>
              <li>• Proyectos llave en mano y soporte continuo</li>
            </ul>
          </div>

          {/* FEATURES BOX */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <div className="text-xs font-semibold text-slate-300 mb-3">
              Principales áreas de trabajo
            </div>

            <div className="space-y-4 text-xs">
              <Feature
                title="Peritaje informático judicial"
                subtitle="Informes válidos en juzgado · Análisis forense · Ratificación"
              />
              <Feature
                title="CRM y ERP a medida"
                subtitle="Procesos internos · clientes · finanzas en un solo sistema"
              />
              <Feature
                title="Hostelería digital"
                subtitle="Kioscos por mesa · TPV · comandas automáticas"
              />
              <Feature
                title="Verifactu & cumplimiento"
                subtitle="Integración total con su sistema de facturación"
              />
            </div>

            <div className="mt-4 text-[11px] text-slate-500">
              Tecnología desarrollada en Gandía, para empresas de toda España.
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="w-full border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-8">
            ¿Qué hacemos en Software Gandía?
          </h2>

          <div className="grid md:grid-cols-4 gap-5 text-sm">
            <Service
              title="Peritaje informático"
              text="Informes periciales, evidencias y análisis forense válidos en juzgado."
            />
            <Service
              title="Software empresarial"
              text="CRM, ERP, control de stock e integraciones avanzadas."
            />
            <Service
              title="Soluciones para hostelería"
              text="Digitalización de restaurantes: kioscos, TPV y comandas."
            />
            <Service
              title="Verifactu y normativa"
              text="Implantación, integración y soporte continuo."
            />
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-3">
            Solicite información o presupuesto.
          </h2>

          <p className="text-sm text-slate-300 mb-8 max-w-lg">
            Cuéntenos brevemente qué necesita y le responderemos en menos de 24 horas.
          </p>

          <form className="grid md:grid-cols-2 gap-4 text-sm">
            <Input label="Nombre" placeholder="Nombre y apellidos" />
            <Input label="Empresa" placeholder="Nombre de su empresa" />
            <Input label="Email" type="email" placeholder="correo@ejemplo.com" />
            <Input label="Teléfono" placeholder="+34 ..." />

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-slate-300">Servicio de interés</label>
              <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-sm outline-none focus:border-blue-400">
                <option>Peritaje informático</option>
                <option>Software empresarial (CRM / ERP / Stock)</option>
                <option>Soluciones para hostelería</option>
                <option>Verifactu</option>
                <option>Otro / Consultoría</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-slate-300">Mensaje</label>
              <textarea
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-sm outline-none focus:border-blue-400 min-h-[120px]"
                placeholder="Explíquenos brevemente qué necesita."
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white"
              >
                Enviar solicitud
              </button>
              <p className="text-[11px] text-slate-500 mt-2">
                Nos pondremos en contacto con usted muy pronto.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Software Gandía — Todos los derechos reservados.</p>
          <p>Consultoría tecnológica, peritaje informático y software empresarial.</p>
        </div>
      </footer>
    </div>
  );
};

/* ---------------------------------- */
/* COMPONENTES REUTILIZABLES */
/* ---------------------------------- */

const Feature = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="border border-slate-800 rounded-xl px-4 py-3 bg-slate-900/40">
    <div className="text-xs font-semibold text-slate-100">{title}</div>
    <div className="text-[11px] text-slate-400">{subtitle}</div>
  </div>
);

const Service = ({ title, text }: { title: string; text: string }) => (
  <div className="border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
    <div className="text-sm font-semibold mb-1 text-slate-100">{title}</div>
    <div className="text-xs text-slate-400">{text}</div>
  </div>
);

const Input = ({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-slate-300">{label}</label>
    <input
      type={type}
      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-sm outline-none focus:border-blue-400"
      placeholder={placeholder}
    />
  </div>
);

export default SoftwareGandiaLanding;
