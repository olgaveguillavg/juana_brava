import { CaseExperience } from "../components/CaseExperience.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { findProject, nextProject, projectPath, projectTypeLabel } from "../data/projects.js";
import { notFound } from "../lib/router.js";

export function CasePage({ params: t }) {
  let e = findProject(t.slug);
  e || notFound();
  let a = nextProject(e.slug),
    l = [e.sector, e.discipline].filter(Boolean).join(" · ").toUpperCase();
  return (
    <>
      <SiteHeader tone="dark" active="projects" />
      <main id="contenido" className={"case-page case-" + e.slug}>
        <section className="case-hero case-hero-editorial" aria-labelledby="case-hero-title">
          <img className="case-hero-image" src={e.image} alt={e.alt} loading="eager" fetchPriority="high" />
          <div className="case-hero-shade" aria-hidden="true" />
          <a href="/proyectos" className="case-return-link">
            <span aria-hidden="true">←</span>
            {" Volver a proyectos"}
          </a>
          <div className="case-hero-content wrap">
            <div className="case-hero-editorial-layout">
              <div className="case-hero-title-block">
                <h1 id="case-hero-title" tabIndex={-1}>
                  {e.name}
                </h1>
              </div>
              <div className="case-hero-side">
                <span className="case-hero-focus-label">Project Focus</span>
                <p className="case-hero-focus">{l}</p>
                <p className="case-hero-lead">{e.lead}</p>
                <a href="#reto" className="case-hero-scroll">
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
              <dd>{e.name}</dd>
              <dt>Tipo</dt>
              <dd>{projectTypeLabel(e)}</dd>
              <dt>Alcance explorado</dt>
              <dd>
                {e.scope.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </dd>
            </dl>
            <a href="#experiencia" className="case-link">
              {"Explorar las vistas "}
              <span aria-hidden="true">↓</span>
            </a>
          </aside>
          <div className="case-story-copy reveal">
            <h2>El reto.</h2>
            <p>{e.challenge}</p>
            <h2>La idea.</h2>
            <p>{e.idea}</p>
          </div>
        </section>
        <section className="case-decisions wrap" id="propuesta">
          <div className="section-label">
            <h2>02 / DECISIONES DE DISEÑO</h2>
            <span>Qué da sentido a la propuesta</span>
          </div>
          <div className="decisions-grid">
            {e.decisions.map((n, i) => (
              <article key={n.title} className="decision reveal">
                <span>0{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </article>
            ))}
          </div>
        </section>
        <figure className="case-campaign">
          <img src={e.wide} alt={e.alt} width="1900" height="760" loading="lazy" />
          <figcaption>
            <span>
              {e.name}
              {" / Dirección visual"}
            </span>
            <span>{projectTypeLabel(e)}</span>
          </figcaption>
        </figure>
        <CaseExperience project={e} />
        <section className="case-close wrap">
          <div>
            <span className="eyebrow">EL SIGUIENTE PASO</span>
            <p>
              {e.type === "concept"
                ? "Este caso es una exploración de estudio: una forma de mostrar cómo pensamos, diseñamos y conectamos una experiencia. La propuesta visual no representa un encargo de cliente publicado."
                : "Juana Brava es un proyecto propio en desarrollo. La identidad original y su aplicación digital evolucionan como un mismo sistema."}
            </p>
          </div>
          <a className="outline-link" href="/contacto">
            {"Hablemos de tu proyecto "}
            <span aria-hidden="true">↗</span>
          </a>
        </section>
        <a className="next-case" href={projectPath(a)}>
          <div className="wrap next-case-inner">
            <div>
              <span className="eyebrow">SIGUIENTE PROYECTO</span>
              <h2>
                {a.name}
                <span aria-hidden="true">↗</span>
              </h2>
              <p>{a.discipline}</p>
            </div>
            <div className="next-case-media">
              <img src={a.image} alt={a.alt} loading="lazy" />
            </div>
          </div>
        </a>
        <a className="back-to-work wrap case-return-footer" href="/proyectos">
          ← Volver a todos los proyectos
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
