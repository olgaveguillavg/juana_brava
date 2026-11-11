import projectsData from "./projects.json";
import coversData from "./covers.json";

// Proyectos completos (datos del HTML original).
export const projects = projectsData;
export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const coversBySlug = coversData; // { slug: { "0": { label, html }, ... } }

// Proyectos que aparecen en la rueda de la home (sin el proyecto propio).
export const wheelProjects = projects.filter((p) => p.type !== "own");

// Filtros del selector "Lab" del archivo de proyectos.
export const labChoices = [
  { id: "all", label: "Todo", preview: "/brand/hero.png", matches: () => true },
  {
    id: "identity",
    label: "Identidad",
    preview: "/brand/hero.png",
    matches: (p) => p.categories.includes("identity"),
  },
  {
    id: "art",
    label: "Dirección de arte",
    preview: "/brand/extra/lab-art.webp",
    matches: (p) => /arte|creativa/i.test(p.discipline),
  },
  {
    id: "digital",
    label: "Web y producto",
    preview: "/brand/sobremesa.webp",
    matches: (p) => p.categories.includes("digital"),
  },
  {
    id: "campaign",
    label: "Campañas e IA",
    preview: "/brand/mara.webp",
    matches: (p) => p.categories.includes("campaign"),
  },
];

export const services = [
  {
    title: "Identidad y dirección de arte",
    text: "Concepto, identidad visual y campañas. Damos forma a la marca y al lenguaje que conecta todas sus piezas.",
  },
  {
    title: "Web y producto digital",
    text: "Arquitectura, diseño y desarrollo de webs, tiendas y experiencias digitales. De la primera idea a la puesta en marcha.",
  },
  {
    title: "Contenido y posicionamiento",
    text: "Estrategia editorial, textos y producción audiovisual. Contenidos conectados con SEO, búsqueda y campañas.",
  },
  {
    title: "IA y automatización",
    text: "Imagen generativa, personajes virtuales y asistentes. Conectamos las herramientas digitales con el trabajo diario.",
  },
];

export const thinkingPosts = [
  {
    kind: "Applied",
    topic: "Identidad · Sistemas",
    date: "11.10.26",
    image: "/brand/hero.png",
    title: "Una identidad no termina en el logo.",
    text: "Cómo pensar sistemas visuales que pasan del tono a la interfaz y de la campaña al producto.",
  },
  {
    kind: "Notes",
    topic: "Campaña e IA",
    date: "08.10.26",
    image: "/brand/sobremesa.webp",
    title: "IA, criterio y dirección de arte.",
    text: "La herramienta acelera, pero la mirada editorial sigue marcando qué entra, qué no y por qué.",
  },
  {
    kind: "Thinking",
    topic: "Web y producto",
    date: "02.10.26",
    image: "/brand/nacar.webp",
    title: "Webs que cuentan antes de vender.",
    text: "Estructuras, ritmo y jerarquía para que una web se sienta como una publicación y no como un catálogo sin intención.",
  },
  {
    kind: "Process",
    topic: "Dirección de arte",
    date: "24.09.26",
    image: "/brand/umbral.webp",
    title: "Diseñar movimiento con intención.",
    text: "Microtransiciones, continuidad visual y decisiones de timing para que una navegación se sienta natural.",
  },
];

export const studioPeople = [
  { name: "Olga Veguilla", role: "Diseño digital y dirección visual" },
  { name: "Saray Cruz", role: "Estrategia editorial y contenido" },
];

// Disciplinas de la sección "Qué hacemos" de la página Estudio.
export const disciplines = [
  {
    title: "Identidad y dirección de arte",
    photo: "/brand/pulso.webp",
    photoAlt: "Cartelería gráfica amarilla y negra del proyecto Pulso",
    heading: "Que tu marca tenga algo propio que decir. Y una manera inconfundible de decirlo.",
    explore: ["Concepto", "Identidad visual", "Dirección de arte", "Campañas"],
  },
  {
    title: "Web y producto digital",
    photo: "/brand/sobremesa.webp",
    photoAlt: "Interior cálido del proyecto Sobremesa",
    heading: "Experiencias que se sienten tan bien como funcionan.",
    explore: ["Diseño web", "Producto digital", "E-commerce", "Desarrollo"],
  },
  {
    title: "Contenido y posicionamiento",
    photo: "/brand/campaign-nacar.webp",
    photoAlt: "Composición editorial de frascos sobre un fondo azul del proyecto Nácar",
    heading: "Ideas que toman forma en palabras, imágenes y movimiento.",
    explore: ["Estrategia editorial", "Contenido", "Producción audiovisual", "SEO"],
  },
  {
    title: "IA y automatización",
    photo: "/brand/nacar.webp",
    photoAlt: "Naturaleza muerta azul y violeta del proyecto Nácar",
    heading: "Nuevas herramientas. El criterio sigue siendo nuestro.",
    explore: ["Imagen generativa", "Experimentación", "Asistentes", "Automatización"],
  },
];
