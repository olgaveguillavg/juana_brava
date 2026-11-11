import { useState } from "react";
import { ProjectCover } from "./ProjectCover.jsx";

export function CaseExperience({ project: t }) {
  let [e, a] = useState(0);
  function l(n, i = false) {
    let u = (n + t.views.length) % t.views.length;
    a(u), i && requestAnimationFrame(() => document.getElementById(t.slug + "-tab-" + u)?.focus());
  }
  return (
    <section className="case-experience" id="experiencia" aria-labelledby="experience-title">
      <div className="experience-heading wrap reveal">
        <span className="eyebrow">EXPLORA LA PROPUESTA</span>
        <h2 id="experience-title">
          Una idea.
          <br />
          Distintas formas de vivirla.
        </h2>
        <p>Cambia de vista para explorar las composiciones y su adaptación a cada formato.</p>
      </div>
      <div className="experience-controls wrap">
        <div
          role="tablist"
          aria-label={"Explorar las vistas de " + t.name}
          className="experience-tabs"
          onKeyDown={(n) => {
            ["ArrowLeft", "ArrowRight", "Home", "End"].includes(n.key) &&
              (n.preventDefault(),
              l(
                n.key === "Home" ? 0 : n.key === "End" ? t.views.length - 1 : e + (n.key === "ArrowRight" ? 1 : -1),
                true,
              ));
          }}
        >
          {t.views.map((n, i) => (
            <button
              key={n}
              type="button"
              role="tab"
              id={t.slug + "-tab-" + i}
              tabIndex={e === i ? 0 : -1}
              aria-selected={e === i}
              aria-controls={t.slug + "-experience"}
              onClick={() => l(i)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div
        id={t.slug + "-experience"}
        className="experience-stage"
        role="tabpanel"
        aria-labelledby={t.slug + "-tab-" + e}
        tabIndex={0}
      >
        <div key={e} className="experience-view">
          <ProjectCover project={t} mode={e} />
        </div>
      </div>
    </section>
  );
}
