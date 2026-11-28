/*
 * Estructura común de las páginas de proyecto: volver a proyectos, punto de partida con el reto y la idea,
 * decisiones de diseño y siguiente proyecto. La usan los casos (`pages/CasePage.jsx`) y las fichas con
 * diseño propio (`casos/`), para que todos los proyectos se lean igual.
 */
import { Arrow } from "./Arrow.jsx";
import { nextProject, projectPath, projectTypeLabel } from "../data/projects.js";

export function CaseReturn() {
  return (
    <a href="/proyectos" className="case-return-link" aria-label="Volver a proyectos">
      <span className="case-return-skin">
        <Arrow dir="w" />
      </span>
      <span className="case-return-label">Proyectos</span>
    </a>
  );
}

// Párrafos de apoyo bajo la frase principal: texto, cita (`quote`) o lista (`list`).
function Detail({ items = [] }) {
  return items.map((item, i) =>
    typeof item === "string" ? (
      <p key={i} className="case-story-more">
        {item}
      </p>
    ) : item.quote ? (
      <blockquote key={i} className="case-story-quote">
        {item.quote}
      </blockquote>
    ) : (
      <ul key={i} className="case-story-list">
        {item.list.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    ),
  );
}

export function CaseStory({ project }) {
  return (
    <section className="case-story wrap" id="reto">
      <aside className="case-summary">
        <span className="eyebrow">EL PUNTO DE PARTIDA</span>
        <dl>
          <dt>Proyecto</dt>
          <dd>{project.name}</dd>
          <dt>Tipo</dt>
          <dd>{projectTypeLabel(project)}</dd>
          <dt>Alcance explorado</dt>
          <dd>
            {project.scope.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </dd>
        </dl>
      </aside>
      <div className="case-story-copy reveal">
        <h2>El reto</h2>
        <p>{project.challenge}</p>
        <Detail items={project.challengeMore} />
        <h2>La idea</h2>
        <p>{project.idea}</p>
        <Detail items={project.ideaMore} />
      </div>
    </section>
  );
}

// `note` es la línea que acompaña al título en los casos; las fichas no la llevan.
export function CaseDecisions({ project, note }) {
  return (
    <section className="case-decisions wrap" id="propuesta">
      <div className="section-label">
        <h2>Decisiones de diseño</h2>
        {note && <span>{note}</span>}
      </div>
      <div className="decisions-grid" data-count={project.decisions.length}>
        {project.decisions.map((n) => (
          <article key={n.title} className="decision reveal">
            <h3>{n.title}</h3>
            <p>{n.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function NextCase({ project }) {
  const next = nextProject(project.slug);
  return (
    <a className="next-case" href={projectPath(next)}>
      <div className="wrap next-case-inner">
        <div>
          <span className="eyebrow">SIGUIENTE PROYECTO</span>
          <h2>
            {next.name}
            <Arrow />
          </h2>
          <p>{next.discipline}</p>
        </div>
        <div className="next-case-media">
          <img src={next.image} alt={next.alt} loading="lazy" />
        </div>
      </div>
    </a>
  );
}
