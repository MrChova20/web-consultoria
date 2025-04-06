import { useEffect } from "react";

useEffect(() => {
  document.title = "Gandia Software | Informática en Gandia | Desarrollo Blockchain y Web";

  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content = "Empresa de informática en Gandia especializada en desarrollo de software a medida, soluciones blockchain, diseño web, tiendas online y sistemas inteligentes. Expertos en tecnología en la Safor.";
  document.head.appendChild(meta);

  const keywords = document.createElement("meta");
  keywords.name = "keywords";
  keywords.content = "informática Gandia, desarrollo software Gandia, blockchain Gandia, empresa informática La Safor, desarrollo web Gandia, software a medida Valencia";
  document.head.appendChild(keywords);
}, []);
