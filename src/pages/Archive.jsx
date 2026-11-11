import { useEffect, useState } from "react";
import { labChoices, projects } from "../data/content.js";
import { pad } from "../lib/route.js";

const FEATURED = new Set(["juana-brava", "bruma"]);

export default function Archive() {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [labOpen, setLabOpen] = useState(false);
  const [draft, setDraft] = useState(filter);
  const [preview, setPreview] = useState(projects[0]);

  const choice = labChoices.find((c) => c.id === filter) ?? labChoices[0];
  const visible = projects.filter(choice.matches);
  const draftChoice = labChoices.find((c) => c.id === draft) ?? labChoices[0];
  const draftCount = projects.filter(draftChoice.matches).length;

  const openLab = () => {
    setDraft(filter);
    setLabOpen(true);
  };
  const closeLab = () => setLabOpen(false);
  const applyLab = () => {
    setFilter(draft);
    setLabOpen(false);
  };

  useEffect(() => {
    if (!labOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && closeLab();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [labOpen]);

  return (
    <main id="contenido" className="archive-page wrap">
      <section className="archive-intro archive-intro-editorial">
        <h1>Proyectos</h1>
      </section>

      <div className="archive-catalog-layout archive-catalog-compact">
        <div className="archive-catalog-content">
          <div className="archive-tools archive-tools-editorial">
            <button
              type="button"
              className="jb-filter-trigger"
              data-active={filter !== "all" ? "true" : "false"}
              aria-label="Abrir filtro visual de proyectos"
              aria-haspopup="dialog"
              aria-expanded={labOpen}
              title="Explorar por disciplina"
              onClick={openLab}
            >
              <span className="jb-filter-labwrap" aria-hidden="true">
                <span className="jb-filter-lab">Lab</span>
                <span className="jb-filter-labmark" />
              </span>
            </button>

            <div className="archive-views editorial-view-toggle" role="group" aria-label="Cambiar vista de proyectos">
              <button type="button" aria-label="Vista en cuadrícula" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
                Cuadrícula
              </button>
              <button type="button" aria-label="Vista en lista" aria-pressed={view === "list"} onClick={() => setView("list")}>
                Lista
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="archive-grid archive-grid-editorial">
              {visible.map((project) => {
                const index = projects.indexOf(project);
                return (
                  <article
                    key={project.slug}
                    className={`archive-card${FEATURED.has(project.slug) ? " archive-featured" : ""}`}
                    id={project.slug}
                  >
                    <a href={`#!/proyectos/${project.slug}`} className="archive-card-link">
                      <div className="project-cover editorial-cover">
                        <img alt={project.alt} loading="lazy" decoding="async" src={project.image} />
                      </div>
                      <div className="archive-card-title">
                        <h2>{project.name}</h2>
                        <span className="archive-card-number">{pad(index + 1)}</span>
                      </div>
                      <div className="archive-card-caption">
                        <span>{project.discipline}</span>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="archive-index archive-index-editorial">
              <div className="archive-rows">
                {visible.map((project) => (
                  <a
                    key={project.slug}
                    href={`#!/proyectos/${project.slug}`}
                    className="archive-row"
                    onMouseEnter={() => setPreview(project)}
                    onFocus={() => setPreview(project)}
                  >
                    <span className="archive-row-number">{pad(projects.indexOf(project) + 1)}</span>
                    <span className="archive-row-name">{project.name}</span>
                    <span className="archive-row-type">{project.discipline}</span>
                  </a>
                ))}
              </div>
              <div className="index-preview">
                <div className="project-cover editorial-cover">
                  <img alt={preview.alt} src={preview.image} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {labOpen && (
        <>
          <div className="jb-filter-backdrop" onClick={closeLab} />
          <section className="jb-filter-panel" data-state="open" role="dialog" aria-modal="true" aria-label="Explorar proyectos por disciplina">
            <div className="jb-filter-head jb-filter-head-minimal">
              <button type="button" className="jb-filter-close" aria-label="Cerrar selector" onClick={closeLab}>
                ×
              </button>
            </div>
            <div className="jb-filter-stage">
              <div className="jb-filter-list" role="group" aria-label="Disciplinas">
                {labChoices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="jb-filter-choice"
                    data-current={draft === item.id ? "true" : "false"}
                    aria-pressed={draft === item.id}
                    onMouseEnter={() => setDraft(item.id)}
                    onClick={() => setDraft(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <img className="jb-filter-photo" data-visible="true" alt="" src={draftChoice.preview} />
            </div>
            <div className="jb-filter-foot jb-filter-foot-minimal">
              <button type="button" className="jb-filter-apply" onClick={applyLab}>
                Ver proyectos <span className="jb-filter-count">{pad(draftCount)}</span>
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
