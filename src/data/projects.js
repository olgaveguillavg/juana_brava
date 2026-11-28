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
    challengeMore: [
      "Juana Brava nació porque queríamos hacer algo juntas. Nos gusta diseñar webs, crear contenido y trabajar una idea hasta encontrar la forma que mejor le sienta, y quisimos llevarlo un paso más allá: montar una agencia creativa.",
      "No había nadie a quien preguntar ni ningún briefing que firmar. Teníamos que decidir solas qué queríamos ser, sin caer en la tentación de cambiarlo todo cada semana.",
      {"list":["Una marca que se reconociera de un vistazo y no se pareciera a ninguna otra agencia.","Un sistema para aplicarla igual en una web, un cartel o una publicación.","Una web que contara cómo pensamos, no solo qué hacemos.","Herramientas para trabajar dos personas como si fuéramos más."]},
    ],
    idea: "Una marca con actitud, que se reconozca de un vistazo.",
    ideaMore: [
      "El primer encargo fuimos nosotras. Y es el más difícil: le tenemos tanto cariño y le vemos tantas posibilidades que siempre hay algo más que nos apetece hacer con ella.",
    ],
    scope: ["Identidad","Manual","Web","Herramientas","Lanzamiento"],
    ficha: true,
    decisions: [
      { title: "El logo no se reescribe", text: "El lettering es una pieza gráfica propia. Se usa en sus versiones originales y nunca se reconstruye con una fuente parecida." },
      { title: "Un código propio", text: "La patrona, el monograma JB y la mirilla firman las piezas sin tomar prestados símbolos de otras marcas." },
      { title: "Actitud antes que decoración", text: "Rojo vivo, cielos limpios, objetos con carácter y encuadres recortados. Cada imagen funciona sola y junto a las demás." },
    ],
    views: ["Identidad","Web","Móvil"],
  },
  {
    slug: "vyrk-r01",
    name: "VYRK R01",
    sector: "Calzado deportivo",
    discipline: "Estrategia / Dirección de arte / Campaña / IA",
    categories: ["identity","campaign"],
    type: "concept",
    image: "/casos/vyrk-r01/a06.jpg",
    wide: "/casos/vyrk-r01/a06.jpg",
    alt: "La atleta de VYRK saltando entre inflables transparentes con las R01",
    accent: "#1f3fd8",
    background: "#d8f23a",
    lead: "Pressure to move. Una marca nos dio una zapatilla y libertad total. Le construimos un mundo.",
    challenge: "Una marca sin historia frente a los gigantes.",
    challengeMore: [
      "Nos imaginamos un encargo: una marca nueva de zapatillas, VYRK, llega con su primer modelo terminado, la R01, y con su identidad ya hecha. Nada más. Ni idea de campaña, ni claim, ni imágenes, ni plan. Solo una frase: «Haced lo que haríais si fuera vuestra».",
      "VYRK llegaba con una zapatilla terminada y nada más. Una marca que nadie conoce, una primera referencia y un mercado donde Nike, Adidas y New Balance lo ocupan todo. Sin atletas famosos, sin historia y sin un presupuesto de gigante.",
      "Además, la R01 no es fácil. Su suela de cápsulas de aire es enorme y muy marcada: o la entiendes o te parece rara. El cliente solo puso una condición: que nadie la confundiera con otra.",
      "Revisamos cómo se anuncian las zapatillas deportivas y casi todo se parecía: ciudad de noche, sudor, cámara lenta y fondo negro. Si hacíamos eso, VYRK desaparecía entre los grandes.",
    ],
    idea: "Pressure to move.",
    ideaMore: [
      "Así que hicimos todo lo demás: la estrategia, el concepto, el mundo visual, la atleta, los carteles, el exterior, el packaging, las redes y una activación en la calle.",
    ],
    scope: ["Estrategia","Concepto","Dirección de arte","Campaña","Producción visual con IA"],
    ficha: true,
    decisions: [
      { title: "La suela, convertida en mundo", text: "Tubos, burbujas y cápsulas transparentes llevan el aire de la R01 a la escala de una arquitectura." },
      { title: "Luz de día y aire", text: "Lo contrario del anuncio deportivo habitual, para que nadie confunda VYRK con las grandes." },
      { title: "El color es de la zapatilla", text: "Si un color no estaba en la R01, no entraba en la campaña." },
    ],
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
    accent: "#c94b00",
    background: "#0f0d0c",
    lead: "Soy de Moto acababa de abrir. Diseñamos su web desde cero y la publicamos en menos de una semana.",
    challenge: "Una web nueva para un taller que acababa de abrir, en menos de una semana.",
    challengeMore: [
      "Cuando el propietario de Soy de Moto nos contactó, acababa de abrir el taller. Quería que la gente pudiera conocer el negocio, ver qué servicios ofrecían y pedir cita. También tenía planes para vender motos de segunda mano y lanzar merchandising. Nos pidió que construyéramos esas partes desde el principio, aunque todavía no fueran a estar disponibles para el público. Y había que hacerlo rápido: la web tenía que estar lista en menos de una semana.",
    ],
    idea: "Primero el taller. Lo demás, preparado para cuando toque.",
    ideaMore: [
      "Una web que presenta quiénes son antes de pedir nada, con los servicios en primer plano y la cita siempre al alcance.",
    ],
    scope: ["Arquitectura de la web","Dirección de arte","Prototipado","Producción visual","Desarrollo y publicación"],
    ficha: true,
    decisions: [
      { title: "Pensar en quien llega nuevo", text: "Qué hacen, quién atiende, cómo trabajan y cómo pedir cita: esas preguntas ordenan lo que se ve primero." },
      { title: "Un universo propio", text: "Fotografía, textos y composición hablan del mismo negocio que alguien encuentra al cruzar la puerta." },
      { title: "Preparado para crecer", text: "La compraventa y el merchandising quedaron desarrollados y ocultos hasta que el cliente quiera activarlos." },
    ],
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
    image: "/casos/marcen-gt/a06.jpg",
    wide: "/casos/marcen-gt/a06.jpg",
    alt: "El MARCÉN GT tapado con una funda de satén burdeos",
    accent: "#641f30",
    background: "#ffffff",
    lead: "Un gran turismo eléctrico que nadie había visto, en un mercado lleno de SUV. Le buscamos un sitio: delante.",
    challenge: "Vender un coupé a quien ya tiene un SUV.",
    challengeMore: [
      "Nos imaginamos un encargo: MARCÉN, una marca nueva, lanza su primer modelo, el MARCÉN GT, un gran turismo eléctrico de dos puertas en burdeos. El coche ya estaba diseñado. Nos pedían todo lo demás: qué decir, a quién y cómo presentarlo.",
      "El comprador tiene entre 35 y 55 años y viene del coche familiar. Sabe lo que es práctico. Lo que no sabe es que echa de menos conducir algo que le apetezca.",
      "El MARCÉN GT tiene dos puertas y cuatro plazas justas. No gana en maletero ni en asientos. Así que no podíamos venderlo por lo que tiene, sino por cómo te hace sentir: un poco por delante del resto.",
    ],
    idea: "Delante se está mejor.",
    ideaMore: [
      "Trabajamos dos territorios creativos, los llevamos a cartel y, al final, le dimos la vuelta a la campaña: antes de enseñar el coche, lo tapamos.",
    ],
    scope: ["Estrategia","Territorios creativos","Copy","Dirección de arte","Exterior","Lanzamiento"],
    ficha: true,
    decisions: [
      { title: "El punto débil, a favor", text: "Dos puertas y plazas justas: en lugar de disimularlo, la campaña habla de ir delante." },
      { title: "Antes de enseñarlo, taparlo", text: "El lanzamiento empieza con el coche bajo satén burdeos, el piloto encendido y una fecha." },
      { title: "Un solo coche en cada imagen", text: "Fijamos unas vistas de estudio como referencia y descartamos las pruebas que lo convertían en otro." },
    ],
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
    challengeMore: [
      "Nos imaginamos a Inés, que lleva con dos personas más una nave con unas 3.000 piezas de atrezo. Hasta ahora, cada productora conocía el fondo por fotos sueltas enviadas por el móvil.",
      {"quote":"«Quiero que una productora que no nos conoce entienda qué tenemos antes de comprar todo el atrezo para usarlo dos días. Y dejar claro que alquilamos.»"},
      "Había una condición más: la web no podía dar más trabajo del que quitara. Y tenía que estar lista en diez semanas, antes de una ronda de visitas a productoras.",
    ],
    idea: "Una tienda online en la que no se compra nada.",
    ideaMore: [
      "Se busca, se elige, se marcan las fechas y se envía la solicitud, como al reservar un hotel. La marca nace del nombre: un II que es a la vez un segundo, un telón que se abre y una pausa para cambiar el decorado.",
    ],
    scope: ["Identidad visual","Diseño y desarrollo web","Catálogo con reserva por fechas","Versión móvil","Dosier para productoras"],
    ficha: true,
    decisions: [
      { title: "Alquilar, no vender", text: "El botón dice «Reservar» y abre un calendario, como el de un hotel. En ningún sitio aparece un precio de compra." },
      { title: "Fechas por pieza", text: "El teléfono se va cuatro días y la lámpara una semana. La solicitud las resume juntas, sin llenarse de calendarios." },
      { title: "Una consulta que llega completa", text: "Proyecto, logística, piezas y referencias, en cuatro pasos. Menos correos de ida y vuelta." },
      { title: "Una selección que lo dice", text: "El catálogo enseña una parte del fondo y termina invitando a preguntar por lo que no aparece." },
    ],
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
