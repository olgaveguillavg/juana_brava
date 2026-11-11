import { useEffect, useRef, useState } from "react";
import { services } from "../data/projects.js";

/* Studio-only editorial motion. All effects use existing assets and respect reduced motion. */
function JBStudioMotion() {
  useEffect(() => {
    const page = document.querySelector(".jb-about-page");
    if (!page) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const html = document.documentElement;
    const targets = [
      ...page.querySelectorAll(
        [
          ".jb-about-sectionmeta",
          ".jb-about-statement-grid > h2",
          ".jb-about-statement-grid > div",
          ".jb-about-principle",
          ".jb-about-people-content > .jb-about-kicker",
          ".jb-about-people-content > h2",
          ".jb-about-people-content > p",
          ".jb-about-team > div",
          ".jb-about-people-content > .jb-about-textlink",
          ".jb-about-capabilities-intro > h2",
          ".jb-about-capabilities-intro > p",
          ".jb-about-service",
          ".jb-about-approach h2",
          ".jb-about-steps article",
          ".jb-about-brava > .jb-about-kicker",
          ".jb-about-brava > p",
          ".jb-about-brava > a",
          ".jb-about-close h2",
          ".jb-about-close-links > a",
        ].join(","),
      ),
    ];
    targets.forEach((el, i) => {
      // Keep the old generic intersection animation from fighting with this one.
      el.classList.remove("reveal", "is-revealed");
      el.classList.add("jb-studio-reveal");
      if (el.matches("h2,.jb-about-principle h3")) el.classList.add("jb-studio-title-reveal");
      if (el.matches(".jb-about-service")) el.classList.add("jb-studio-service-reveal");
      el.style.setProperty("--studio-delay", ((i % 3) * 0.105).toFixed(3) + "s");
    });
    html.dataset.jbStudioMotion = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("jb-is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -7% 0px",
      },
    );
    targets.forEach((el) => observer.observe(el));
    const visual = page.querySelector(".jb-about-full-visual img");
    const hero = page.querySelector(".jb-about-hero-grid");
    const teamImage = page.querySelector(".jb-about-people-image img");
    const teamContainer = page.querySelector(".jb-about-people");
    let ticking = false;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const update = () => {
      ticking = false;
      if (!page.isConnected) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (hero)
        hero.style.setProperty("--studio-hero-scroll", (-Math.min(70, Math.max(0, y) * 0.09)).toFixed(1) + "px");
      if (visual) {
        const r = visual.getBoundingClientRect();
        if (r.top < vh * 1.2 && r.bottom > -r.height * 0.25) {
          const p = clamp((vh * 1.05 - r.top) / (vh * 0.95), 0, 1);
          visual.style.clipPath = `inset(${((1 - p) * 8).toFixed(2)}% ${((1 - p) * 5).toFixed(2)}% ${((1 - p) * 4).toFixed(2)}% ${((1 - p) * 5).toFixed(2)}%)`;
          visual.style.transform = `translate3d(0,${((0.5 - p) * 22).toFixed(2)}px,0) scale(${(1.09 - p * 0.09).toFixed(4)})`;
        }
      }
      if (teamImage && teamContainer) {
        const r = teamContainer.getBoundingClientRect();
        if (r.top < vh * 1.2 && r.bottom > 0) {
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          teamImage.style.transform = `translate3d(0,${((0.5 - p) * 34).toFixed(1)}px,0) scale(${(1.065 - p * 0.065).toFixed(3)})`;
        }
      }
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", request, {
      passive: true,
    });
    window.addEventListener("resize", request, {
      passive: true,
    });
    request();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      delete html.dataset.jbStudioMotion;
      targets.forEach((el) => {
        el.classList.remove("jb-studio-reveal", "jb-is-visible", "jb-studio-title-reveal", "jb-studio-service-reveal");
        el.style.removeProperty("--studio-delay");
      });
      if (visual) {
        visual.style.removeProperty("clip-path");
        visual.style.removeProperty("transform");
      }
      if (hero) hero.style.removeProperty("--studio-hero-scroll");
      if (teamImage) teamImage.style.removeProperty("transform");
    };
  }, []);
  return null;
}

const JB_STUDIO_VISUALS = [
  "/brand/extra/estudio-film-1.webp",
  "/brand/extra/lab-art.webp",
  "/brand/extra/estudio-equipo.webp",
];

/* Studio story: independent parallax photographs + accessible scroll reveals. */
function JBStudioStageMotion() {
  useEffect(() => {
    const root = document.querySelector(".jbv2-page");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = root.querySelector(".jbv2-hero");
    const items = [...root.querySelectorAll(".jbv2-film figure")];
    const headline = root.querySelector(".jbv2-hero-heading");
    const teamPhoto = root.querySelector(".jbv2-team-photo img");
    const teamBox = root.querySelector(".jbv2-team-photo");
    const reveal = [...root.querySelectorAll(".jbv2-reveal")];
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    let observer = null,
      tick = 0;
    if (!reduce.matches && "IntersectionObserver" in window) {
      root.dataset.motion = "on";
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08,
        },
      );
      for (const el of reveal) observer.observe(el);
    } else {
      reveal.forEach((el) => el.classList.add("is-visible"));
    }
    function update() {
      tick = 0;
      if (reduce.matches || !root.isConnected) return;
      if (hero && items.length) {
        const rect = hero.getBoundingClientRect();
        const vh = innerHeight;
        // Move the old composition out as the next section physically enters.
        // Do not fade a full screen of content before the manifesto reaches the viewport.
        const p = clamp(-rect.top / (vh * 0.75), 0, 1);
        const rises = [190, 250, 220, 310, 265, 200, 290];
        const shift = [-12, 13, -8, 11, -6, 15, -9];
        items.forEach((el, i) => {
          el.style.transform = `translate3d(${(p * shift[i % shift.length]).toFixed(1)}px,${(-p * rises[i % rises.length]).toFixed(1)}px,0)`;
          el.style.opacity = (1 - clamp((p - 0.38) / 0.59, 0, 1)).toFixed(3);
        });
        if (headline) {
          headline.style.transform = `translate3d(0,${(-p * 155).toFixed(1)}px,0)`;
          headline.style.opacity = (1 - clamp((p - 0.52) / 0.46, 0, 1)).toFixed(3);
        }
      }
      if (teamBox && teamPhoto) {
        const r = teamBox.getBoundingClientRect(),
          vh = innerHeight;
        if (r.top < vh * 1.2 && r.bottom > 0) {
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          teamPhoto.style.transform = `translate3d(0,${((0.5 - p) * 38).toFixed(1)}px,0) scale(1.055)`;
        }
      }
    }
    const schedule = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, {
      passive: true,
    });
    addEventListener("resize", schedule, {
      passive: true,
    });
    schedule();
    return () => {
      observer?.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(tick);
      delete root.dataset.motion;
      items.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
      if (headline) {
        headline.style.transform = "";
        headline.style.opacity = "";
      }
      if (teamPhoto) teamPhoto.style.transform = "";
    };
  }, []);
  return null;
}

function JBStudioProfileModal({ person, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!person) return;
    const d = dialog.current;
    if (!d) return;
    try {
      d.showModal();
    } catch {}
    const closed = () => onClose();
    d.addEventListener("close", closed);
    return () => {
      d.removeEventListener("close", closed);
      if (d.open) d.close();
    };
  }, [person]);
  if (!person) return null;
  return (
    <dialog
      ref={dialog}
      className="jbv3-person-dialog"
      aria-label={"Ficha de " + person.name}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="jbv3-person-dialog-head">
        <button type="button" aria-label="Cerrar ficha" onClick={onClose}>
          Cerrar ×
        </button>
      </div>
      <div className="jbv3-person-dialog-grid">
        <div className="jbv3-person-dialog-copy">
          <h2>{person.name}</h2>
          <h3>{person.role}</h3>
          <p>{person.intro}</p>
          <h4>Áreas de trabajo</h4>
          <ul>
            {person.specialties.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <figure className="jbv3-person-dialog-figure">
          <img src={person.image} alt={person.imageAlt} loading="eager" />
          <figcaption>IMAGEN CONCEPTUAL / RETRATO REAL PENDIENTE</figcaption>
        </figure>
      </div>
    </dialog>
  );
}

export function JBStudioPage() {
  const [open, setOpen] = useState(-1),
    [person, setPerson] = useState(null);
  const serviceData = [
    {
      number: "01",
      name: "Identidad y dirección de arte",
      short: "Que tu marca tenga algo propio que decir. Y una manera inconfundible de decirlo.",
      detail: services[0].text,
      labels: ["Concepto", "Identidad visual", "Dirección de arte", "Campañas"],
      image: "/brand/pulso.webp",
      alt: "Cartelería gráfica amarilla y negra del proyecto Pulso",
    },
    {
      number: "02",
      name: "Web y producto digital",
      short: "Experiencias que se sienten tan bien como funcionan.",
      detail: services[1].text,
      labels: ["Diseño web", "Producto digital", "E-commerce", "Desarrollo"],
      image: "/brand/sobremesa.webp",
      alt: "Interior cálido del proyecto Sobremesa",
    },
    {
      number: "03",
      name: "Contenido y posicionamiento",
      short: "Ideas que toman forma en palabras, imágenes y movimiento.",
      detail: services[2].text,
      labels: ["Estrategia editorial", "Contenido", "Producción audiovisual", "SEO"],
      image: "/brand/campaign-nacar.webp",
      alt: "Composición editorial de frascos sobre un fondo azul del proyecto Nácar",
    },
    {
      number: "04",
      name: "IA y automatización",
      short: "Nuevas herramientas. El criterio sigue siendo nuestro.",
      detail: services[3].text,
      labels: ["Imagen generativa", "Experimentación", "Asistentes", "Automatización"],
      image: "/brand/nacar.webp",
      alt: "Naturaleza muerta azul y violeta del proyecto Nácar",
    },
  ];
  const process = [
    {
      name: "Escuchamos",
      text: "Entender la historia, las personas y el contexto antes de dibujar la primera línea.",
    },
    {
      name: "Encontramos la idea",
      text: "Conectar concepto, dirección creativa y lenguaje para que todo tenga sentido.",
    },
    {
      name: "Lo hacemos real",
      text: "Diseñar, producir y poner en marcha. Sin perder de vista los pequeños detalles.",
    },
  ];
  const teamProfiles = [
    {
      name: "Olga Veguilla",
      role: "Diseño digital y dirección visual",
      number: "01",
      intro: "Ideas que se construyen desde lo visual, con atención al concepto y al detalle.",
      specialties: ["Diseño digital", "Identidad visual", "Dirección de arte", "Experiencia de marca"],
      image: "/brand/umbral.webp",
      imageAlt: "Arquitectura de tonos cálidos; imagen conceptual del universo visual del estudio",
    },
    {
      name: "Saray Cruz",
      role: "Estrategia editorial y contenido",
      number: "02",
      intro: "Encontrar la historia, darle estructura y llevarla a formatos que conecten con las personas.",
      specialties: ["Estrategia editorial", "Narrativa de marca", "Contenido", "Coordinación creativa"],
      image: "/brand/bruma.webp",
      imageAlt: "Arquitectura mediterránea y mar; imagen conceptual del universo visual del estudio",
    },
  ];
  const heroImages = [
    {
      src: JB_STUDIO_VISUALS[0],
      alt: "Composición conceptual con arquitectura roja y figura en movimiento",
    },
    {
      src: "/brand/bruma.webp",
      alt: "Arquitectura de piedra frente al mar",
    },
    {
      src: "/brand/nacar.webp",
      alt: "Composición azul y violeta de un producto de belleza",
    },
    {
      src: "/brand/pulso.webp",
      alt: "Cartel amarillo y negro de una campaña gráfica",
    },
    {
      src: "/brand/umbral.webp",
      alt: "Arquitectura de arcilla con luz cálida",
    },
    {
      src: "/brand/campaign-nacar.webp",
      alt: "Composición editorial de producto y reflejos azules",
    },
    {
      src: JB_STUDIO_VISUALS[2],
      alt: "Exploración conceptual de dirección de arte con papeles y muestras",
    },
  ];
  return (
    <>
      <main id="contenido" className="jbv2-page">
        <section className="jbv2-hero" aria-labelledby="jbv2-title">
          <div className="jbv2-hero-sticky">
            <div className="jbv2-hero-heading wrap">
              <h1 id="jbv2-title">El estudio.</h1>
            </div>
            <div className="jbv2-film">
              {heroImages.map((photo, i) => (
                <figure key={i} className={"jbv2-film-item jbv2-film-" + (i + 1)}>
                  <img src={photo.src} alt={photo.alt} loading="eager" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section className="jbv2-manifesto" id="manifiesto">
          <div className="wrap">
            <div className="jbv2-manifesto-grid">
              <h2 className="jbv2-reveal jbv3-text-reveal">Bonito no basta.</h2>
              <div className="jbv2-manifesto-copy jbv2-reveal">
                <p className="jbv2-manifesto-lead">
                  Nos gustan las ideas que tienen algo que decir. Que no se quedan en una pantalla y que se reconocen
                  incluso cuando cambian de formato.
                </p>
                <p>
                  Unimos identidad, dirección de arte, contenido y tecnología porque una marca no vive en departamentos
                  separados. Vive en cada cosa que hace.
                </p>
                <p>
                  Y creemos que el carácter no está reñido con la claridad. Al contrario: es lo que hace que todo tenga
                  sentido.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="jbv2-services" id="capacidades">
          <div className="wrap">
            <div className="jbv2-services-intro">
              <h2 className="jbv2-reveal jbv3-text-reveal">Hacemos que pase.</h2>
              <p className="jbv2-reveal">
                No ofrecemos una lista interminable. Combinamos las disciplinas que cada idea necesita, de la estrategia
                a su puesta en marcha.
              </p>
            </div>
            <div className="jbv2-accordion">
              {serviceData.map((item, j) => (
                <article key={item.name} className="jbv2-accordion-item" data-open={open === j}>
                  <button
                    type="button"
                    className="jbv2-service-toggle"
                    id={"jbv2-service-button-" + j}
                    aria-expanded={open === j}
                    aria-controls={"jbv2-service-panel-" + j}
                    onClick={() => setOpen((x) => (x === j ? -1 : j))}
                  >
                    <span className="jbv2-service-title">{item.name}</span>
                    <span className="jbv2-service-symbol" aria-hidden="true" />
                  </button>
                  <div
                    className="jbv2-service-panel"
                    id={"jbv2-service-panel-" + j}
                    role="region"
                    aria-labelledby={"jbv2-service-button-" + j}
                    aria-hidden={open !== j}
                    inert={open !== j}
                  >
                    <div className="jbv2-service-panel-inner">
                      <div className="jbv2-service-photo">
                        <img src={item.image} alt={item.alt} loading="lazy" />
                        <div className="jbv2-service-image-shade" aria-hidden="true" />
                        <div className="jbv2-service-photo-content">
                          <h3>{item.short}</h3>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                      <div className="jbv2-service-bottom">
                        <span>LO QUE EXPLORAMOS</span>
                        <div>
                          {item.labels.map((x) => (
                            <span key={x}>{x}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="jbv2-people jbv3-people" id="nosotras">
          <div className="wrap">
            <div className="jbv2-people-head jbv2-reveal">
              <h2>Detrás de las ideas estamos nosotras.</h2>
              <p>
                Somos Olga y Saray. Dos miradas complementarias que encuentran sentido en juntar lo visual, lo digital y
                las buenas historias. Nos implicamos personalmente en cada proyecto.
              </p>
            </div>
            <div className="jbv3-team-layout">
              <figure className="jbv3-team-lead-photo jbv2-reveal">
                <img
                  src={JB_STUDIO_VISUALS[2]}
                  alt="Manos seleccionando muestras y referencias creativas en una mesa de trabajo"
                  loading="lazy"
                />
                <figcaption>DESDE LAS IDEAS HASTA EL ÚLTIMO DETALLE / IMAGEN CONCEPTUAL</figcaption>
              </figure>
              <div className="jbv3-profile-directory">
                {teamProfiles.map((personInfo, i) => (
                  <button
                    key={personInfo.name}
                    type="button"
                    className="jbv3-profile-card jbv2-reveal"
                    onClick={() => setPerson(personInfo)}
                    aria-label={"Conocer a " + personInfo.name}
                  >
                    <span className="jbv3-profile-card-content">
                      <span className="jbv3-profile-name">{personInfo.name}</span>
                      <span className="jbv3-profile-role">{personInfo.role}</span>
                    </span>
                    <span className="jbv3-profile-arrow" aria-hidden="true">
                      +
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <p className="jbv3-people-footnote jbv2-reveal">
              {"Dos personas, una forma de trabajar: escuchar, pensar y hacer con criterio. "}
              <span>
                Las fotografías de equipo actuales son conceptuales; sustituiremos los retratos por los reales cuando
                los tengamos.
              </span>
            </p>
          </div>
        </section>
        <section className="jbv2-method" id="metodo">
          <div className="wrap">
            <h2 className="jbv2-reveal jbv3-text-reveal">Pensar bien. Hacerlo mejor.</h2>
            <div className="jbv2-method-grid">
              {process.map((step, j) => (
                <article key={step.name} className="jbv2-reveal">
                  <h3>{step.name}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="jbv2-finale">
          <div className="wrap jbv2-finale-inner">
            <span className="jbv2-reveal jbv3-text-reveal">IDEAS SIN PERMISO.</span>
            <h2 className="jbv2-reveal jbv3-text-reveal">¿Y si hacemos algo que merezca la pena recordar?</h2>
            <div className="jbv2-finale-actions">
              <a href="/contacto">Cuéntanos tu proyecto ↗</a>
            </div>
          </div>
        </section>
      </main>
      <JBStudioStageMotion />
      <JBStudioProfileModal person={person} onClose={() => setPerson(null)} />
      <footer className="jbv3-min-footer">
        <div className="wrap">
          <span>© 2026 JUANA BRAVA</span>
          <a href="/proyectos">Proyectos</a>
          <a href="/thinking">Thinking</a>
          <a href="/contacto">Contacto</a>
        </div>
      </footer>
    </>
  );
}
