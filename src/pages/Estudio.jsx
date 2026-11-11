import { useState } from "react";
import { disciplines, services } from "../data/content.js";
import { pad } from "../lib/route.js";

const FILM = [
  { src: "/brand/extra/estudio-film-1.webp", alt: "Composición conceptual con arquitectura roja y figura en movimiento" },
  { src: "/brand/bruma.webp", alt: "Arquitectura de piedra frente al mar" },
  { src: "/brand/nacar.webp", alt: "Composición azul y violeta de un producto de belleza" },
  { src: "/brand/pulso.webp", alt: "Cartel amarillo y negro de una campaña gráfica" },
  { src: "/brand/umbral.webp", alt: "Arquitectura de arcilla con luz cálida" },
  { src: "/brand/campaign-nacar.webp", alt: "Composición editorial de producto y reflejos azules" },
  { src: "/brand/extra/estudio-equipo.webp", alt: "Exploración conceptual de dirección de arte con papeles y muestras" },
];

const PEOPLE = [
  { name: "Olga Veguilla", role: "Diseño digital y dirección visual" },
  { name: "Saray Cruz", role: "Estrategia editorial y contenido" },
];

const METHOD = [
  { title: "Escuchamos", text: "Entender la historia, las personas y el contexto antes de dibujar la primera línea." },
  { title: "Encontramos la idea", text: "Conectar concepto, dirección creativa y lenguaje para que todo tenga sentido." },
  { title: "Lo hacemos real", text: "Diseñar, producir y poner en marcha. Sin perder de vista los pequeños detalles." },
];

export default function Estudio() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main id="contenido" className="jbv2-page" data-motion="on">
      <section className="jbv2-hero" aria-labelledby="jbv2-title">
        <div className="jbv2-hero-sticky">
          <div className="jbv2-hero-heading wrap">
            <div className="jbv2-eyeline">
              <span>ESTUDIO CREATIVO / BARCELONA</span>
              <span>01 — 04</span>
            </div>
            <h1 id="jbv2-title">El estudio.</h1>
            <div className="jbv2-hero-sub">
              <span>IDEAS SIN PERMISO.</span>
              <a href="#!/estudio?section=manifiesto">DESLIZA PARA CONOCERNOS ↓</a>
            </div>
          </div>
          <div className="jbv2-film">
            {FILM.map((frame, i) => (
              <figure key={frame.src} className={`jbv2-film-item jbv2-film-${i + 1}`}>
                <img alt={frame.alt} loading="eager" decoding="async" src={frame.src} />
              </figure>
            ))}
          </div>
          <span className="jbv2-film-caption">UNA MIRADA EN MOVIMIENTO / IMÁGENES DE EXPLORACIÓN Y PROYECTOS</span>
        </div>
      </section>

      <section className="jbv2-manifesto" id="manifiesto">
        <div className="wrap">
          <div className="jbv2-meta jbv2-reveal">
            <span>01 / MANIFIESTO</span>
            <span>NUESTRA FORMA DE VERLO</span>
          </div>
          <div className="jbv2-manifesto-grid">
            <h2 className="jbv2-reveal jbv3-text-reveal">Bonito no basta.</h2>
            <div className="jbv2-manifesto-copy jbv2-reveal">
              <p className="jbv2-manifesto-lead">
                Nos gustan las ideas que tienen algo que decir. Que no se quedan en una pantalla y que se reconocen incluso
                cuando cambian de formato.
              </p>
              <p>
                Unimos identidad, dirección de arte, contenido y tecnología porque una marca no vive en departamentos
                separados. Vive en cada cosa que hace.
              </p>
              <p>Y creemos que el carácter no está reñido con la claridad. Al contrario: es lo que hace que todo tenga sentido.</p>
            </div>
          </div>
          <div className="jbv2-manifesto-sign jbv2-reveal">
            <span>NO REPETIR. ENCONTRAR.</span>
            <span>JUANA BRAVA © 2026</span>
          </div>
        </div>
      </section>

      <section className="jbv2-services" id="capacidades">
        <div className="wrap">
          <div className="jbv2-meta jbv2-reveal">
            <span>02 / LO QUE HACEMOS</span>
            <span>CUATRO FORMAS DE LLEVAR UNA IDEA MÁS LEJOS</span>
          </div>
          <div className="jbv2-services-intro jbv2-reveal">
            <h2>Hacemos que pase.</h2>
            <p>
              No ofrecemos una lista interminable. Combinamos las disciplinas que cada idea necesita, de la estrategia a su
              puesta en marcha.
            </p>
          </div>

          <div className="jbv2-accordion">
            {disciplines.map((discipline, i) => {
              const open = openIndex === i;
              const button = `jbv2-service-button-${i}`;
              const panel = `jbv2-service-panel-${i}`;
              return (
                <article key={discipline.title} className="jbv2-accordion-item" data-open={open ? "true" : "false"}>
                  <button
                    type="button"
                    className="jbv2-service-toggle"
                    id={button}
                    aria-expanded={open}
                    aria-controls={panel}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span className="jbv2-service-num">{pad(i + 1)}</span>
                    <span className="jbv2-service-title">{discipline.title}</span>
                    <span className="jbv2-service-symbol" aria-hidden="true" />
                  </button>
                  <div
                    className="jbv2-service-panel"
                    id={panel}
                    role="region"
                    aria-labelledby={button}
                    aria-hidden={!open}
                    inert={!open}
                  >
                    <div className="jbv2-service-panel-inner">
                      <div className="jbv2-service-photo">
                        <img alt={discipline.photoAlt} loading="lazy" src={discipline.photo} />
                        <div className="jbv2-service-image-shade" aria-hidden="true" />
                        <div className="jbv2-service-photo-content">
                          <span>JUANA BRAVA / DISCIPLINA {pad(i + 1)}</span>
                          <h3>{discipline.heading}</h3>
                          <p>{services[i].text}</p>
                        </div>
                      </div>
                      <div className="jbv2-service-bottom">
                        <span>LO QUE EXPLORAMOS</span>
                        <div>
                          {discipline.explore.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="jbv2-people jbv3-people" id="nosotras">
        <div className="wrap">
          <div className="jbv2-meta jbv2-reveal">
            <span>03 / QUIÉNES SOMOS</span>
            <span>CONOCE A LAS PERSONAS TRAS EL ESTUDIO</span>
          </div>
          <div className="jbv2-people-head jbv2-reveal">
            <h2>Detrás de las ideas estamos nosotras.</h2>
            <p>
              Somos Olga y Saray. Dos miradas complementarias que encuentran sentido en juntar lo visual, lo digital y las
              buenas historias. Nos implicamos personalmente en cada proyecto.
            </p>
          </div>
          <div className="jbv3-team-layout">
            <figure className="jbv3-team-lead-photo jbv2-reveal">
              <img alt="Manos seleccionando muestras y referencias creativas en una mesa de trabajo" loading="lazy" src="/brand/extra/estudio-equipo.webp" />
              <figcaption>DESDE LAS IDEAS HASTA EL ÚLTIMO DETALLE · IMAGEN CONCEPTUAL</figcaption>
            </figure>
            <div className="jbv3-profile-directory">
              {PEOPLE.map((person, i) => (
                <button key={person.name} type="button" className="jbv3-profile-card jbv2-reveal" aria-label={`Conocer a ${person.name}`}>
                  <span className="jbv3-profile-index">{pad(i + 1)}</span>
                  <span className="jbv3-profile-card-content">
                    <span className="jbv3-profile-name">{person.name}</span>
                    <span className="jbv3-profile-role">{person.role}</span>
                  </span>
                  <span className="jbv3-profile-arrow" aria-hidden="true">+</span>
                </button>
              ))}
            </div>
          </div>
          <p className="jbv3-people-footnote jbv2-reveal">
            Dos personas, una forma de trabajar: escuchar, pensar y hacer con criterio.{" "}
            <span>
              Las fotografías de equipo actuales son conceptuales; sustituiremos los retratos por los reales cuando los
              tengamos.
            </span>
          </p>
        </div>
      </section>

      <section className="jbv2-method" id="metodo">
        <div className="wrap">
          <div className="jbv2-meta jbv2-reveal">
            <span>04 / CÓMO TRABAJAMOS</span>
            <span>DE LA IDEA AL MUNDO REAL</span>
          </div>
          <h2 className="jbv2-reveal jbv3-text-reveal">Pensar bien. Hacerlo mejor.</h2>
          <div className="jbv2-method-grid">
            {METHOD.map((step, i) => (
              <article className="jbv2-reveal" key={step.title}>
                <span>{pad(i + 1)}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="jbv2-finale">
        <div className="wrap jbv2-finale-inner">
          <span className="jbv2-reveal">IDEAS SIN PERMISO.</span>
          <h2 className="jbv2-reveal jbv3-text-reveal">¿Y si hacemos algo que merezca la pena recordar?</h2>
          <div className="jbv2-finale-actions">
            <a href="#!/contacto">Cuéntanos tu proyecto ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
