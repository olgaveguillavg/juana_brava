const ARCHIVE_FILTERS = [
  {
    id: "all",
    label: "Todo",
  },
  {
    id: "digital",
    label: "Web y producto",
  },
  {
    id: "identity",
    label: "Identidad",
  },
  {
    id: "campaign",
    label: "Campañas e IA",
  },
];

export const projects = [
  {
    slug: "juana-brava",
    name: "Juana Brava",
    sector: "Agencia creativa",
    discipline: "Identidad / Web / Campañas / Contenido / Dirección de arte",
    categories: ["identity","digital","campaign"],
    type: "own",
    image: "/casos/juana-brava/a07.jpg",
    wide: "/casos/juana-brava/a07.jpg",
    alt: "Juana Brava: gafas rojas, chaqueta roja y blanca y cielo azul",
    accent: "#9c2425",
    background: "#bad5e3",
    lead: "Nuestro primer cliente difícil.",
    challenge: "Ser nuestro propio cliente, y el más exigente.",
    idea: "Rojo, azul y flash directo.",
    scope: ["Identidad","Manual","Web","Herramientas","Lanzamiento"],
    ficha: true,
    decisions: [],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "vyrk-r01",
    name: "VYRK R01",
    sector: "Calzado deportivo",
    discipline: "Estrategia / Dirección de arte / Campaña / IA",
    categories: ["identity","campaign"],
    type: "concept",
    image: "/casos/vyrk-r01/a11.jpg",
    wide: "/casos/vyrk-r01/a11.jpg",
    alt: "Campaña de la zapatilla VYRK R01 entre grandes inflables transparentes",
    accent: "#1f3fd8",
    background: "#d8f23a",
    lead: "Pressure to move. Una marca nos dio una zapatilla y libertad total. Le construimos un mundo.",
    challenge: "Una marca sin historia frente a los gigantes.",
    idea: "Pressure to move.",
    scope: ["Estrategia","Concepto","Dirección de arte","Campaña","Producción visual con IA"],
    ficha: true,
    decisions: [],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "nacar",
    name: "Nácar",
    sector: "Belleza",
    discipline: "E-commerce / Imagen de marca",
    categories: ["digital", "identity", "campaign"],
    type: "concept",
    image: "/brand/nacar.webp",
    wide: "/brand/campaign-nacar.webp",
    alt: "Propuesta de tienda digital y campaña para una colección de belleza",
    accent: "#2539b1",
    background: "#c6c9f2",
    lead: "La misma identidad, desde una campaña hasta la ficha de producto.",
    challenge:
      "Dar presencia a una colección pequeña sin complicar la compra. La imagen debe atraer, pero también ayudar a entender qué se está mirando y cómo se organiza la gama.",
    idea: "Construimos una propuesta de tienda en torno a un azul reconocible, fotografía de producto y composiciones que dejan respirar a cada pieza.",
    decisions: [
      {
        title: "Una colección fácil de recorrer",
        text: "La portada presenta el universo de la marca y abre el acceso a la colección. El diseño usa pocos niveles de información y una jerarquía estable.",
      },
      {
        title: "El producto lleva el peso",
        text: "Los fondos, la escala y los espacios alrededor de los envases permiten ver el producto con claridad. El color articula la identidad sin competir con la fotografía.",
      },
      {
        title: "Continuidad entre formatos",
        text: "Campaña, tienda y móvil parten de la misma dirección visual. La propuesta muestra cómo cambia la composición al cambiar de soporte.",
      },
    ],
    scope: ["Dirección de arte", "Concepto de e-commerce", "Diseño de colección", "Composición de campaña"],
    views: ["Portada", "Colección", "Móvil"],
  },
  {
    slug: "soy-de-moto",
    name: "Soy de Moto",
    sector: "Taller de motos",
    discipline: "Diseño web / Dirección de arte / Desarrollo digital / IA",
    categories: ["digital"],
    type: "client",
    image: "/casos/soy-de-moto/a11.jpg",
    wide: "/casos/soy-de-moto/a11.jpg",
    alt: "Moto naranja y negra en el taller de Soy de Moto",
    accent: "#9c2425",
    background: "#26201d",
    lead: "Soy de Moto acababa de abrir. Diseñamos su web desde cero y la publicamos en menos de una semana.",
    challenge: "El encargo tenía más recorrido del que parecía.",
    idea: "Una web que se sintiera parte del taller.",
    scope: ["Arquitectura de la web","Dirección de arte","Prototipado","Producción visual","Desarrollo y publicación"],
    ficha: true,
    decisions: [],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "mara",
    name: "Mara",
    sector: "Personaje virtual",
    discipline: "IA / Dirección creativa / Contenido",
    categories: ["campaign"],
    type: "concept",
    image: "/brand/mara.webp",
    wide: "/brand/mara.webp",
    alt: "Mara, personaje virtual ficticio, en una propuesta de dirección de arte",
    accent: "#941d31",
    background: "#401822",
    lead: "Una identidad reconocible que puede contar muchas historias.",
    challenge:
      "Explorar cómo un personaje virtual puede mantener una personalidad visual a través de piezas y formatos distintos, con una dirección de arte que dé unidad al conjunto.",
    idea: "Mara es un personaje ficticio. El estudio parte de un retrato y desarrolla una forma de encuadrarlo, acompañarlo con texto y adaptarlo a una campaña.",
    decisions: [
      {
        title: "Primero, una presencia",
        text: "El retrato funciona como punto de partida de la identidad. Luz, gesto y encuadre definen una presencia que pueda reconocerse sin depender de un logotipo.",
      },
      {
        title: "Una dirección, varios formatos",
        text: "Exploramos una pieza de campaña y una composición vertical a partir de la misma imagen. El cambio de formato modifica la jerarquía, no la personalidad del personaje.",
      },
      {
        title: "La idea dirige la herramienta",
        text: "La IA forma parte del proceso de imagen. La selección, el montaje y el relato responden a decisiones creativas, que son lo que da sentido a la propuesta.",
      },
    ],
    scope: ["Concepto de personaje", "Dirección visual", "Composición de campaña", "Adaptación de formatos"],
    views: ["Retrato", "Campaña", "Vertical"],
  },
  {
    slug: "marcen-gt",
    name: "MARCÉN GT",
    sector: "Automoción",
    discipline: "Estrategia / Copy / Dirección de arte / Campaña",
    categories: ["campaign","identity"],
    type: "concept",
    image: "/casos/marcen-gt/a07.jpg",
    wide: "/casos/marcen-gt/a07.jpg",
    alt: "MARCÉN GT, gran turismo eléctrico en color burdeos",
    accent: "#641f30",
    background: "#ffffff",
    lead: "Un gran turismo eléctrico que nadie había visto, en un mercado lleno de SUV. Le buscamos un sitio: delante.",
    challenge: "Vender un coupé a quien ya tiene un SUV.",
    idea: "Delante se está mejor.",
    scope: ["Estrategia","Territorios creativos","Copy","Dirección de arte","Exterior","Lanzamiento"],
    ficha: true,
    decisions: [],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "segundo-telon",
    name: "Segundo Telón",
    sector: "Alquiler de atrezo",
    discipline: "Identidad / Web / Catálogo con reserva / Dosier",
    categories: ["identity","digital"],
    type: "concept",
    image: "/casos/segundo-telon/a06.jpg",
    wide: "/casos/segundo-telon/a06.jpg",
    alt: "Escritorio de madera con teléfono de disco, máquina de escribir y lámpara",
    accent: "#d92819",
    background: "#ffffff",
    lead: "Un almacén de atrezo que solo se podía conocer por fotos de móvil. Le hicimos una marca y una tienda de alquiler online.",
    challenge: "Que una productora entienda el fondo sin visitar la nave.",
    idea: "Una tienda online en la que no se compra nada: se busca, se elige y se reserva.",
    scope: ["Identidad visual","Diseño y desarrollo web","Catálogo con reserva por fechas","Versión móvil","Dosier para productoras"],
    ficha: true,
    decisions: [],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "pulso",
    name: "Pulso",
    sector: "Música y cultura",
    discipline: "Identidad / Campaña / Web",
    categories: ["identity", "campaign", "digital"],
    type: "concept",
    image: "/brand/pulso.webp",
    wide: "/brand/pulso.webp",
    alt: "Carteles de Pulso en amarillo ácido, negro y burdeos sobre una pared azul",
    accent: "#561f28",
    background: "#dde154",
    lead: "Una identidad que se escucha antes de sonar.",
    challenge:
      "Crear un concepto visual para un festival de música y cultura contemporánea. La identidad debe funcionar en la calle y convertirse en una programación digital fácil de recorrer.",
    idea: "Tipografía rotunda, imagen impresa y contrastes de color. El sistema parte del cartel y se abre a una web donde artistas, horarios y escenarios comparten el mismo pulso.",
    decisions: [
      {
        title: "La calle como primer escenario",
        text: "Los carteles construyen una presencia inmediata con pocos elementos. La textura de impresión y los cambios de escala dan carácter al sistema.",
      },
      {
        title: "Una programación que se entiende",
        text: "La propuesta digital organiza artistas, días y escenarios. La información práctica convive con la imagen del festival y resulta fácil de consultar.",
      },
      {
        title: "Un lenguaje que cambia de formato",
        text: "El cartel, la campaña y la web comparten tipografía y color. Las composiciones se ajustan a cada soporte sin depender de una única pieza.",
      },
    ],
    scope: ["Sistema de identidad", "Cartelería conceptual", "Campaña visual", "Propuesta web"],
    views: ["Web", "Cartel", "Móvil"],
  },
];

export const featuredProjects = ["vyrk-r01", "nacar", "soy-de-moto", "mara", "marcen-gt", "segundo-telon", "pulso"].map((t) =>
  projects.find((e) => e.slug === t),
);

export const projectTypeLabel = (t) =>
  t.type === "own" ? "Proyecto propio" : t.type === "client" ? "Proyecto de cliente" : "Concepto de estudio";

export const projectPath = (t) => "/proyectos/" + t.slug;

export const findProject = (t) => projects.find((e) => e.slug === t);

export const nextProject = (t) => projects[(projects.findIndex((e) => e.slug === t) + 1) % projects.length];

export const services = [
  {
    name: "Identidad y dirección de arte",
    work: ["pulso", "marcen-gt", "segundo-telon"],
    text: "Concepto, identidad visual y campañas. Damos forma a la marca y al lenguaje que conecta todas sus piezas.",
  },
  {
    name: "Web y producto digital",
    work: ["soy-de-moto", "segundo-telon", "nacar"],
    text: "Arquitectura, diseño y desarrollo de webs, tiendas y experiencias digitales. De la primera idea a la puesta en marcha.",
  },
  {
    name: "Contenido y posicionamiento",
    work: ["nacar", "vyrk-r01"],
    text: "Estrategia editorial, textos y producción audiovisual. Contenidos conectados con SEO, búsqueda y campañas.",
  },
  {
    name: "IA y automatización",
    work: ["mara"],
    text: "Imagen generativa, personajes virtuales y asistentes. Conectamos las herramientas digitales con el trabajo diario.",
  },
];
