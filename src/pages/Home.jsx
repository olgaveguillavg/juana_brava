import ArcWheel from "../components/ArcWheel.jsx";
import { services, studioPeople, wheelProjects, projects } from "../data/content.js";
import { pad } from "../lib/route.js";

export default function Home() {
  return (
    <main id="contenido">
      <section className="hero" aria-label="El universo visual de Juana Brava">
        <img
          className="hero-image"
          alt="Campaña conceptual de Juana Brava: gafas rojas, chaqueta roja y blanca y cielo azul"
          width="1672"
          height="941"
          fetchPriority="high"
          src="/brand/hero.png"
        />
        <div className="hero-shade" />
        <a className="hero-link" href="#!/?section=trabajo">
          <span>
            EXPLORAR
            <br />
            EL TRABAJO
          </span>
        </a>
        <div className="hero-caption">
          <span>JUANA BRAVA · ESTUDIO CREATIVO Y DIGITAL</span>
          <span>BARCELONA / 2026</span>
        </div>
      </section>

      <section className="intro wrap" aria-labelledby="intro-title">
        <div className="intro-copy reveal">
          <h1 id="intro-title">
            Diseñamos lo que una marca cuenta, cómo se ve y cómo se usa. Identidad, webs y contenidos que nacen de una
            misma idea.
          </h1>
          <a className="outline-link" href="#!/proyectos">
            Explorar proyectos <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="intro-brand reveal">
          <img alt="Monograma JB de Juana Brava" width="1592" height="1190" loading="lazy" src="/brand/monograma-clean.svg" />
          <span className="brand-claim">IDEAS SIN PERMISO.</span>
        </div>
      </section>

      <ArcWheel items={wheelProjects} totalCount={projects.length} />

      <section className="services wrap" id="servicios" aria-labelledby="services-title">
        <div className="section-top reveal">
          <h2 id="services-title">Qué hacemos.</h2>
          <p>
            De la idea a su puesta en marcha.
            <br />
            Diseño, contenido y tecnología en el mismo equipo.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service reveal" key={service.title}>
              <span className="service-index">{pad(index + 1)}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="thinking wrap" id="que-pensamos" aria-labelledby="thinking-title">
        <div className="section-top reveal">
          <h2 id="thinking-title">Qué pensamos.</h2>
          <p>
            Publicidad, creatividad y cultura digital.
            <br />
            Una mirada propia sobre lo que nos mueve.
          </p>
        </div>
        <div className="thinking-body reveal">
          <h3>Las ideas también se piensan en voz alta.</h3>
          <div>
            <p>
              Un espacio para compartir referencias, cuestionar lo de siempre y hablar de las ideas que hacen avanzar a
              las marcas.
            </p>
            <span className="eyebrow thinking-status">El blog de Juana Brava · Próximamente</span>
          </div>
        </div>
      </section>

      <section className="studio wrap" id="estudio" aria-labelledby="studio-title">
        <div className="studio-art reveal">
          <img
            alt="Ilustración original de la patrona de Juana Brava"
            width="757"
            height="681"
            loading="lazy"
            src="/brand/patrona-clean.svg"
          />
          <span>JUANA BRAVA / ESTUDIO INDEPENDIENTE</span>
        </div>
        <div className="studio-copy reveal">
          <span className="eyebrow">Olga y Saray / Juana Brava</span>
          <h2 id="studio-title">Cómo trabajamos.</h2>
          <p>
            Trabajamos juntas desde la primera idea hasta que sale al mundo. Unimos diseño digital, dirección visual,
            estrategia editorial y producción audiovisual.
          </p>
          <p>
            Creemos en las ideas con intención, el diseño que se entiende y la tecnología que ayuda a avanzar.
            Escuchamos, cuestionamos y damos forma a una dirección propia para cada marca.
          </p>
          <div className="people">
            {studioPeople.map((person) => (
              <div key={person.name}>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
          <p className="studio-approach">
            La IA amplía nuestras herramientas.
            <br />
            La dirección creativa la ponemos nosotras.
          </p>
          <a href="#!/proyectos/juana-brava" className="case-link studio-case-link">
            Así construimos nuestra identidad <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
