import { useEffect, useState } from "react";
import { coversBySlug, projects } from "../data/content.js";
import { pad } from "../lib/route.js";

const CLOSING = {
  concept:
    "Este caso es una exploración de estudio: una forma de mostrar cómo pensamos, diseñamos y conectamos una experiencia. La propuesta visual no representa un encargo de cliente publicado.",
  own: "Juana Brava es un proyecto propio en desarrollo. La identidad original y su aplicación digital evolucionan como un mismo sistema.",
};

export default function Project({ project }) {
  const { slug, name } = project;
  const typeLabel = project.type === "own" ? "Proyecto propio" : "Concepto de estudio";
  const tabs = Object.values(coversBySlug[slug] ?? {}); // vistas: { label, html }
  const [tab, setTab] = useState(0);

  // Cada proyecto llega al principio de su página.
  useEffect(() => setTab(0), [slug]);

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const current = tabs[tab] ?? tabs[0];

  return (
    <main id="contenido" className={`case-page case-${slug}`}>
      <section className="case-hero case-hero-editorial" aria-labelledby="case-hero-title">
        <img className="case-hero-image" alt={project.alt} loading="eager" fetchPriority="high" src={project.wide} />
        <div className="case-hero-shade" aria-hidden="true" />
        <a href="#!/proyectos" className="case-return-link">
          <span aria-hidden="true">←</span> Volver a proyectos
        </a>
        <div className="case-hero-content wrap">
          <div className="case-hero-editorial-layout">
            <div className="case-hero-title-block">
              <h1 id="case-hero-title" tabIndex={-1}>
                {name}
              </h1>
            </div>
            <div className="case-hero-side">
              <span className="case-hero-focus-label">Project Focus</span>
              <p className="case-hero-focus">{`${project.sector} · ${project.discipline}`.toUpperCase()}</p>
              <p className="case-hero-lead">{project.lead}</p>
              <a href={`#!/proyectos/${slug}?section=reto`} className="case-hero-scroll">
                DESLIZA PARA DESCUBRIR
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="case-story wrap" id="reto">
        <aside className="case-summary">
          <span className="eyebrow">01 / EL PUNTO DE PARTIDA</span>
          <dl>
            <dt>Proyecto</dt>
            <dd>{name}</dd>
            <dt>Tipo</dt>
            <dd>{typeLabel}</dd>
            <dt>Alcance explorado</dt>
            <dd>
              {project.scope.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </dl>
          <a href={`#!/proyectos/${slug}?section=experiencia`} className="case-link">
            Explorar las vistas <span aria-hidden="true">↓</span>
          </a>
        </aside>
        <div className="case-story-copy reveal">
          <h2>El reto.</h2>
          <p>{project.challenge}</p>
          <h2>La idea.</h2>
          <p>{project.idea}</p>
        </div>
      </section>

      <section className="case-decisions wrap" id="propuesta">
        <div className="section-label">
          <h2>02 / DECISIONES DE DISEÑO</h2>
          <span>Qué da sentido a la propuesta</span>
        </div>
        <div className="decisions-grid">
          {project.decisions.map((decision, i) => (
            <article className="decision reveal" key={decision.title}>
              <span>{pad(i + 1)}</span>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </article>
          ))}
        </div>
      </section>

      <figure className="case-campaign">
        <img alt={project.alt} width="1900" height="760" loading="lazy" src={project.wide} />
        <figcaption>
          <span>{name} / Dirección visual</span>
          <span>{typeLabel}</span>
        </figcaption>
      </figure>

      <section className="case-experience" id="experiencia" aria-labelledby="experience-title">
        <div className="experience-heading wrap reveal">
          <span className="eyebrow">03 / EXPLORA LA PROPUESTA</span>
          <h2 id="experience-title">
            Una idea.
            <br />
            Distintas formas de vivirla.
          </h2>
          <p>Cambia de vista para explorar las composiciones y su adaptación a cada formato.</p>
        </div>

        <div className="experience-controls wrap">
          <div role="tablist" aria-label={`Explorar las vistas de ${name}`} className="experience-tabs">
            {tabs.map((view, i) => (
              <button
                key={view.label}
                type="button"
                role="tab"
                id={`${slug}-tab-${i}`}
                tabIndex={i === tab ? 0 : -1}
                aria-selected={i === tab}
                aria-controls={`${slug}-experience`}
                onClick={() => setTab(i)}
              >
                {view.label}
              </button>
            ))}
          </div>
          <span>
            {pad(tab + 1)} / {pad(tabs.length)}
          </span>
        </div>

        <div
          id={`${slug}-experience`}
          className="experience-stage"
          role="tabpanel"
          aria-labelledby={`${slug}-tab-${tab}`}
          tabIndex={0}
        >
          {/* Composiciones de cada vista, tal como estaban en la web original. Pendiente: convertirlas en componentes. */}
          <div className="experience-view" dangerouslySetInnerHTML={{ __html: current?.html ?? "" }} />
        </div>

        <p className="experience-caption wrap">
          <span>{name} / Exploración visual interactiva</span>
          <span>
            {current?.label} · {typeLabel}
          </span>
        </p>
      </section>

      <section className="case-close wrap">
        <div>
          <span className="eyebrow">EL SIGUIENTE PASO</span>
          <p>{CLOSING[project.type === "own" ? "own" : "concept"]}</p>
        </div>
        <a className="outline-link" href="#!/contacto">
          Hablemos de tu proyecto <span aria-hidden="true">↗</span>
        </a>
      </section>

      <a className="next-case" href={`#!/proyectos/${next.slug}`}>
        <div className="wrap next-case-inner">
          <div>
            <span className="eyebrow">SIGUIENTE PROYECTO</span>
            <h2>
              {next.name}
              <span aria-hidden="true">↗</span>
            </h2>
            <p>{next.discipline}</p>
          </div>
          <div className="next-case-media">
            <img alt={next.alt} loading="lazy" src={next.image} />
          </div>
        </div>
      </a>

      <a className="back-to-work wrap case-return-footer" href="#!/proyectos">
        ← Volver a todos los proyectos
      </a>
    </main>
  );
}
