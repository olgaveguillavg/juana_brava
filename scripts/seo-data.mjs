/*
 * Datos de la agencia para buscadores e IA: títulos y descripciones de cada página, y la ficha de
 * Juana Brava en schema.org. Si cambia algo (teléfono, redes, servicios…), se cambia aquí.
 */
export const SITE = "https://www.juanabrava.com";

export const AGENCY = {
  name: "Juana Brava",
  summary:
    "Juana Brava es una agencia creativa en Barcelona especializada en identidad de marca, dirección de arte, diseño web, contenido e inteligencia artificial.",
  about:
    "Estudio creativo formado por Olga Veguilla y Saray Cruz. Creamos marcas con carácter y las llevamos a todos sus puntos de contacto: identidad visual, webs y tiendas online, campañas, contenidos y herramientas con IA.",
  city: "Barcelona",
  email: "juanabrava.agencia@gmail.com",
  phones: ["+34 635 706 837", "+34 696 859 131"],
  sameAs: ["https://www.instagram.com/agenciajuanabrava/", "https://www.linkedin.com/company/juana-brava/"],
  founders: [
    { name: "Olga Veguilla", role: "Diseño digital y dirección visual" },
    { name: "Saray Cruz", role: "Estrategia editorial y contenido" },
  ],
  services: [
    { name: "Identidad y dirección de arte", text: "Concepto, identidad visual, branding y campañas." },
    { name: "Diseño web y producto digital", text: "Arquitectura, diseño y desarrollo de webs, tiendas online y experiencias digitales." },
    { name: "Contenido y posicionamiento", text: "Estrategia editorial, textos, producción audiovisual y SEO." },
    { name: "IA y automatización", text: "Imagen generativa, personajes virtuales y asistentes con inteligencia artificial." },
  ],
};

export const PAGES = [
  {
    path: "/",
    name: "Inicio",
    title: "Juana Brava. Agencia creativa",
    description:
      "Juana Brava es una agencia creativa en Barcelona: identidad de marca, dirección de arte, diseño web, contenido e IA para marcas que quieren diferenciarse.",
  },
  {
    path: "/proyectos",
    name: "Proyectos",
    kind: "CollectionPage",
    title: "Proyectos — Juana Brava",
    description:
      "Proyectos de Juana Brava, agencia creativa en Barcelona: identidad visual, webs, e-commerce, campañas, contenido y dirección de arte.",
  },
  {
    path: "/estudio",
    name: "Estudio",
    kind: "AboutPage",
    title: "Estudio — Juana Brava",
    description:
      "Conoce Juana Brava, estudio creativo en Barcelona formado por Olga Veguilla y Saray Cruz: identidad, diseño web, contenido e IA.",
  },
  {
    path: "/ideas",
    name: "Ideas",
    kind: "CollectionPage",
    title: "Ideas — Juana Brava",
    description:
      "Ideas de Juana Brava: notas, procesos y opiniones sobre marca, diseño web, contenido e inteligencia artificial.",
  },
  {
    path: "/contacto",
    name: "Contacto",
    kind: "ContactPage",
    title: "Contacto — Juana Brava",
    description:
      "Contacta con Juana Brava, agencia creativa en Barcelona. Cuéntanos tu proyecto de marca, web, contenido o IA.",
  },
];

// Ficha de la agencia (schema.org): qué es, dónde está, quién la forma, qué hace y cómo contactar.
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": SITE + "/#organizacion",
    name: AGENCY.name,
    alternateName: "Juana Brava Agencia Creativa",
    description: AGENCY.summary,
    slogan: "Agencia creativa",
    url: SITE + "/",
    logo: SITE + "/brand/logo-horizontal.png",
    image: SITE + "/og.jpg",
    email: AGENCY.email,
    telephone: AGENCY.phones[0],
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressRegion: "Cataluña", addressCountry: "ES" },
    areaServed: [{ "@type": "City", name: "Barcelona" }, { "@type": "Country", name: "España" }],
    founder: AGENCY.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    knowsAbout: [
      "Agencia creativa",
      "Branding",
      "Identidad visual",
      "Dirección de arte",
      "Diseño web",
      "Desarrollo web",
      "E-commerce",
      "Contenido de marca",
      "SEO",
      "Inteligencia artificial generativa",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: AGENCY.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.text, areaServed: "Barcelona" },
      })),
    },
    contactPoint: { "@type": "ContactPoint", contactType: "new business", email: AGENCY.email, telephone: AGENCY.phones[0], availableLanguage: ["es", "ca", "en"] },
    sameAs: AGENCY.sameAs,
  };
}
