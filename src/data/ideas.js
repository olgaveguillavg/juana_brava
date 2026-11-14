/*
 * Notas de «Ideas»: lo que pensamos sobre marca, diseño, contenido y tecnología.
 *
 * Cada nota tiene sus datos de listado (etiqueta, tema, fecha, titular, entradilla e imagen) y un
 * cuerpo hecho de bloques, en orden:
 *   { type: "p", text }                     párrafo
 *   { type: "h2", text }                    subtítulo
 *   { type: "quote", text }                 cita destacada (termina con el punto rojo de la marca)
 *   { type: "figure", src, alt, caption }   imagen intercalada con pie de foto
 *
 * Para añadir una nota nueva basta con copiar una de estas y cambiar el contenido; la ficha, el
 * listado de Ideas y «Más ideas» se actualizan solos.
 */
export const ideas = [
  {
    slug: "una-identidad-no-termina-en-el-logo",
    label: "Práctica",
    topic: "Identidad / Sistemas",
    date: "11 oct 2026",
    iso: "2026-10-11",
    title: "Una identidad no termina en el logo.",
    excerpt: "Cómo pensar sistemas visuales que pasan del tono a la interfaz y de la campaña al producto.",
    image: "/brand/hero.png",
    imageAlt: "Universo visual de Juana Brava: gafas rojas, chaqueta roja y blanca y cielo azul",
    caption: "Juana Brava: la identidad aplicada a su propio universo visual.",
    body: [
      {
        type: "p",
        text: "Cuando una marca nos llega con un logo recién hecho, casi siempre trae la misma pregunta: ¿y ahora qué? El logo es la firma, pero una marca se reconoce por muchas más cosas: cómo habla, qué colores repite, cómo coloca una foto o cómo responde un botón.",
      },
      {
        type: "p",
        text: "Por eso, cuando trabajamos una identidad, pensamos en sistemas y no en piezas sueltas. Un sistema es un conjunto pequeño de reglas que permite tomar decisiones sin empezar de cero cada vez: una paleta con jerarquía, una tipografía con dos o tres tamaños claros, una forma de componer y un tono de voz.",
      },
      { type: "h2", text: "Del tono a la interfaz" },
      {
        type: "p",
        text: "Las reglas tienen que viajar. Lo que funciona en un cartel debe sobrevivir en una pantalla de móvil, en una ficha de producto o en una historia de Instagram. Si el sistema solo vive en el manual, no es un sistema: es un documento.",
      },
      { type: "quote", text: "Una marca se reconoce antes de leer su nombre" },
      {
        type: "p",
        text: "En Pulso, por ejemplo, el cartel marcó el ritmo: tipografía rotunda, imagen impresa y contrastes de color. A partir de ahí, la web y la programación digital heredaron ese mismo pulso sin copiar el cartel, adaptando la composición a cada formato.",
      },
      {
        type: "figure",
        src: "/brand/pulso.webp",
        alt: "Carteles de Pulso en amarillo ácido, negro y burdeos sobre una pared azul",
        caption: "Pulso: el sistema parte del cartel y se abre a la web. Concepto de estudio.",
      },
      { type: "h2", text: "Menos reglas, mejor usadas" },
      {
        type: "p",
        text: "Un error frecuente es querer controlarlo todo. Cuantas más reglas, más fácil es romperlas. Preferimos pocas reglas, bien explicadas, y ejemplos reales de cómo aplicarlas. Así el equipo de la marca puede crear sin depender siempre de nosotras.",
      },
      {
        type: "p",
        text: "La pregunta que nos hacemos al cerrar una identidad es sencilla: si quitamos el logo, ¿se sigue reconociendo? Si la respuesta es sí, el sistema funciona.",
      },
    ],
  },
  {
    slug: "ia-criterio-y-direccion-de-arte",
    label: "Notas",
    topic: "Campaña e IA",
    date: "8 oct 2026",
    iso: "2026-10-08",
    title: "IA, criterio y dirección de arte.",
    excerpt: "La herramienta acelera, pero la mirada editorial sigue marcando qué entra, qué no y por qué.",
    image: "/brand/mara.webp",
    imageAlt: "Mara, personaje virtual ficticio, en una propuesta de dirección de arte",
    caption: "Mara, personaje virtual ficticio. Concepto de estudio.",
    body: [
      {
        type: "p",
        text: "La inteligencia artificial ha cambiado nuestra forma de trabajar. Hoy podemos explorar diez direcciones visuales en una mañana, probar escenarios imposibles o crear personajes que no existen. La herramienta acelera; lo que no hace es decidir.",
      },
      {
        type: "p",
        text: "Ahí está el trabajo de la dirección de arte: elegir qué entra, qué no y por qué. Generar imágenes es fácil. Generar las imágenes correctas para una marca concreta, con una intención clara, sigue siendo un trabajo de criterio.",
      },
      { type: "h2", text: "Generar no es dirigir" },
      {
        type: "p",
        text: "Cuando trabajamos con IA empezamos igual que siempre: con una idea, unas referencias y unas reglas. Definimos la luz, la paleta, el encuadre y el tono antes de abrir ninguna herramienta. Sin esa base, los resultados se parecen a todo y a nada.",
      },
      { type: "quote", text: "La herramienta propone. La mirada decide" },
      {
        type: "p",
        text: "Con Mara, un personaje virtual creado como concepto de estudio, la dificultad no fue generar una cara, sino mantenerla coherente: la misma identidad en distintas escenas, formatos y campañas. Eso exige un sistema de dirección tan cuidado como el de una sesión de fotos.",
      },
      { type: "h2", text: "Lo que no delegamos" },
      {
        type: "p",
        text: "Usamos la IA para explorar, producir más rápido y automatizar tareas repetitivas. No la usamos para sustituir la conversación con la marca, la idea de partida ni la última revisión. La IA amplía nuestras herramientas; la dirección creativa la ponemos nosotras.",
      },
    ],
  },
  {
    slug: "webs-que-cuentan-antes-de-vender",
    label: "Opinión",
    topic: "Web y producto",
    date: "2 oct 2026",
    iso: "2026-10-02",
    title: "Webs que cuentan antes de vender.",
    excerpt:
      "Estructuras, ritmo y jerarquía para que una web se sienta como una publicación y no como un catálogo sin intención.",
    image: "/brand/nacar.webp",
    imageAlt: "Propuesta de tienda digital y campaña para una colección de belleza",
    caption: "Nácar: tienda digital y campaña para una colección de belleza. Concepto de estudio.",
    body: [
      {
        type: "p",
        text: "Muchas webs se parecen a un catálogo: una cuadrícula de productos, un botón de comprar y poco más. Funcionan, pero no se recuerdan. Nosotras pensamos las webs como una publicación: algo que se recorre, que tiene ritmo y que cuenta una historia antes de pedir nada.",
      },
      { type: "h2", text: "Ritmo y jerarquía" },
      {
        type: "p",
        text: "Una buena web alterna momentos: una imagen que respira, un titular que se lee de un vistazo, un bloque de información práctica y, después, otra pausa. Esa alternancia es la que hace que alguien siga bajando. Si todo pesa lo mismo, nada destaca.",
      },
      { type: "quote", text: "Primero se cuenta. Después se vende" },
      {
        type: "p",
        text: "En Nácar, la tienda de una colección de belleza, la campaña no se queda en la portada: entra en la ficha de producto. La misma luz azul, la misma composición y el mismo tono acompañan a quien compra desde la primera imagen hasta el carrito.",
      },
      {
        type: "figure",
        src: "/brand/campaign-nacar.webp",
        alt: "Campaña de Nácar aplicada a la tienda digital",
        caption: "Nácar: la campaña entra en la tienda. Concepto de estudio.",
      },
      { type: "h2", text: "Contar no es alargar" },
      {
        type: "p",
        text: "Contar una historia no significa escribir más. A menudo es al revés: quitar secciones que están por costumbre, ordenar lo que queda y dejar espacio. Una web clara se lee más rápido y vende mejor, porque quien la visita entiende antes qué le ofreces y por qué le importa.",
      },
    ],
  },
  {
    slug: "disenar-movimiento-con-intencion",
    label: "Proceso",
    topic: "Dirección de arte",
    date: "24 sept 2026",
    iso: "2026-09-24",
    title: "Diseñar movimiento con intención.",
    excerpt: "Microtransiciones, continuidad visual y decisiones de timing para que una navegación se sienta natural.",
    image: "/brand/umbral.webp",
    imageAlt: "Propuesta de agenda e itinerarios para un espacio cultural",
    caption: "Umbral: agenda e itinerarios para un espacio cultural. Concepto de estudio.",
    body: [
      {
        type: "p",
        text: "El movimiento es una de las partes más visibles de una web y una de las más fáciles de estropear. Una transición bien pensada ayuda a entender dónde estás y a dónde vas. Una transición gratuita marea, distrae y hace esperar.",
      },
      { type: "h2", text: "Cada animación responde a una pregunta" },
      {
        type: "p",
        text: "Antes de animar algo nos preguntamos para qué sirve. ¿Ayuda a entender que una página se abre desde otra? ¿Marca que algo ha cambiado? ¿Da continuidad entre una imagen pequeña y la misma imagen en grande? Si no responde a nada, lo quitamos.",
      },
      { type: "quote", text: "Si una animación no explica nada, sobra" },
      {
        type: "p",
        text: "En Umbral, una agenda cultural, el recorrido se organiza con dos preguntas: qué puedo ver y por dónde empiezo. Las transiciones acompañan ese recorrido: las imágenes crecen desde donde estaban y el texto entra en el mismo orden en que se lee.",
      },
      { type: "h2", text: "Tiempo, curva y calma" },
      {
        type: "p",
        text: "Los detalles marcan la diferencia: la duración, la curva de aceleración y el orden en que aparecen los elementos. Preferimos movimientos cortos y suaves, que terminen antes de que nadie tenga que esperar, y siempre respetamos a quien prefiere reducir el movimiento en su dispositivo.",
      },
    ],
  },
];

export const findIdea = (slug) => ideas.find((n) => n.slug === slug);
export const ideaPath = (n) => "/ideas/" + n.slug;

/* Minutos de lectura (unas 200 palabras por minuto), redondeado hacia arriba. */
export function readingMinutes(note) {
  const words = [note.excerpt, ...note.body.map((b) => b.text || b.caption || "")]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
