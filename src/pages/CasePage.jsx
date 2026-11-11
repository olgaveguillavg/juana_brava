import { Arrow } from "../components/Arrow.jsx";
import { CaseExperience } from "../components/CaseExperience.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { findProject, nextProject, projectPath, projectTypeLabel } from "../data/projects.js";
import { notFound } from "../lib/router.js";

export function CasePage({ params: t }) {
  let e = findProject(t.slug);
  e || notFound();
  let a = nextProject(e.slug),
    l = [e.sector, e.discipline].filter(Boolean).join(" / ").toUpperCase();
  return (
    <>
      <main id="contenido" className={"case-page case-" + e.slug}>
        <section className="case-hero case-hero-editorial" aria-labelledby="case-hero-title">
          <img className="case-hero-image" src={e.image} alt={e.alt} loading="eager" fetchPriority="high" />
          <div className="case-hero-shade" aria-hidden="true" />
          <a href="/proyectos" className="case-return-link" aria-label="Volver a proyectos">
            <span className="case-return-skin">
              <Arrow dir="w" />
            </span>
            <span className="case-return-label">Proyectos</span>
          </a>
          <div className="case-hero-content wrap">
            <div className="case-hero-editorial-layout">
              <div className="case-hero-title-block">
                <h1 id="case-hero-title" tabIndex={-1}>
                  <SlideText>{e.name}</SlideText>
                </h1>
              </div>
              <div className="case-hero-side">
                <span className="case-hero-focus-label">{projectTypeLabel(e)}</span>
                <p className="case-hero-focus">{l}</p>
                <p className="case-hero-lead">{e.lead}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="case-story wrap" id="reto">
          <aside className="case-summary">
            <span className="eyebrow">EL PUNTO DE PARTIDA</span>
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
            <h2>DECISIONES DE DISEÑO</h2>
            <span>Qué da sentido a la propuesta</span>
          </div>
          <div className="decisions-grid">
            {e.decisions.map((n, i) => (
              <article key={n.title} className="decision reveal">
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </article>
            ))}
          </div>
        </section>
        <figure className="case-campaign">
          <img src={e.wide} alt={e.alt} width="1900" height="760" loading="lazy" />
        </figure>
        <CaseExperience project={e} />
        <a className="next-case" href={projectPath(a)}>
          <div className="wrap next-case-inner">
            <div>
              <span className="eyebrow">SIGUIENTE PROYECTO</span>
              <h2>
                {a.name}
                <Arrow />
              </h2>
              <p>{a.discipline}</p>
            </div>
            <div className="next-case-media">
              <img src={a.image} alt={a.alt} loading="lazy" />
            </div>
          </div>
        </a>
        <a className="back-to-work wrap case-return-footer" href="/proyectos">
          <Arrow dir="w" />{" "}Volver a todos los proyectos
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
