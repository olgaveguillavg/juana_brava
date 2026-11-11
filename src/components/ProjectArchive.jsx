import { useState } from "react";
import { JBDisciplinePanel } from "./DisciplinePanel.jsx";
import { EditorialCover } from "./ProjectCover.jsx";
import { projectPath, projects } from "../data/projects.js";

export function ProjectArchive() {
  let [a, l] = useState(globalThis.JB_ARCHIVE_PREFS?.view || "grid"),
    [n, i] = useState(globalThis.JB_ARCHIVE_PREFS?.preview || projects[0].slug),
    [f, k] = useState(globalThis.JB_ARCHIVE_PREFS?.filter || "all"),
    [p, b] = useState(false);
  let options = [
    {
      id: "all",
      name: "Todos",
      stage: "Todo",
    },
    {
      id: "identity",
      name: "Identidad",
      stage: "Identidad",
    },
    {
      id: "art",
      name: "Dirección de arte",
      stage: "Dirección de arte",
    },
    {
      id: "digital",
      name: "Web y producto",
      stage: "Web y producto",
    },
    {
      id: "campaign",
      name: "Campaña e IA",
      stage: "Campaña e IA",
    },
  ];
  let matching = (o, g) =>
    g === "all" ||
    (g === "identity" && (/identidad|imagen de marca/i.test(o.discipline) || o.categories.includes("identity"))) ||
    (g === "art" && /dirección de arte|dirección creativa/i.test(o.discipline)) ||
    (g === "digital" &&
      (/web|producto digital|e-commerce|ui\/ux/i.test(o.discipline) || o.categories.includes("digital"))) ||
    (g === "campaign" && (/campaña|contenido|\bIA\b/i.test(o.discipline) || o.categories.includes("campaign")));
  let u = projects.filter((o) => matching(o, f)),
    c = u.find((o) => o.slug === n) ?? u[0];
  let choose = (g) => {
    k(g);
    globalThis.JB_ARCHIVE_PREFS = {
      ...globalThis.JB_ARCHIVE_PREFS,
      filter: g,
    };
    b(false);
  };
  return (
    <>
      <div className="archive-catalog-layout archive-catalog-compact">
        <div className="archive-catalog-content">
          <div className="archive-tools archive-tools-editorial">
            <button
              type="button"
              className="jb-filter-trigger"
              data-active={f !== "all"}
              aria-label="Abrir filtro visual de proyectos"
              aria-haspopup="dialog"
              aria-expanded={p}
              onClick={() => b(true)}
              title="Explorar por disciplina"
            >
              <span className="jb-filter-labwrap" aria-hidden="true">
                <span className="jb-filter-lab">Lab</span>
                <span className="jb-filter-labmark" />
              </span>
            </button>
            <div className="archive-views editorial-view-toggle" role="group" aria-label="Cambiar vista de proyectos">
              <button
                type="button"
                aria-label="Vista en cuadrícula"
                aria-pressed={a === "grid"}
                onClick={() => {
                  l("grid");
                  globalThis.JB_ARCHIVE_PREFS = {
                    ...globalThis.JB_ARCHIVE_PREFS,
                    view: "grid",
                  };
                }}
              >
                Cuadrícula
              </button>
              <button
                type="button"
                aria-label="Vista en lista"
                aria-pressed={a === "list"}
                onClick={() => {
                  l("list");
                  globalThis.JB_ARCHIVE_PREFS = {
                    ...globalThis.JB_ARCHIVE_PREFS,
                    view: "list",
                  };
                }}
              >
                Lista
              </button>
            </div>
          </div>
          {u.length === 0 ? (
            <p className="archive-filter-empty">No hay proyectos para esta disciplina.</p>
          ) : a === "grid" ? (
            <div className="archive-grid archive-grid-editorial">
              {u.map((o, g) => (
                <article
                  key={o.slug}
                  className={"archive-card" + (f === "all" && (g === 0 || g === 5) ? " archive-featured" : "")}
                  id={o.slug}
                >
                  <a href={projectPath(o)} className="archive-card-link">
                    <EditorialCover project={o} />
                    <div className="archive-card-title">
                      <h2>{o.name}</h2>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="archive-index archive-index-editorial">
              <div className="archive-rows">
                {u.map((o, g) => (
                  <a
                    key={o.slug}
                    href={projectPath(o)}
                    className="archive-row"
                    onMouseEnter={() => {
                      i(o.slug);
                      globalThis.JB_ARCHIVE_PREFS = {
                        ...globalThis.JB_ARCHIVE_PREFS,
                        preview: o.slug,
                      };
                    }}
                    onFocus={() => {
                      i(o.slug);
                      globalThis.JB_ARCHIVE_PREFS = {
                        ...globalThis.JB_ARCHIVE_PREFS,
                        preview: o.slug,
                      };
                    }}
                    onClick={() => {
                      globalThis.JB_ARCHIVE_PREFS = {
                        ...globalThis.JB_ARCHIVE_PREFS,
                        preview: o.slug,
                      };
                    }}
                  >
                    <span className="archive-row-name">{o.name}</span>
                    <span className="archive-row-type">{o.discipline}</span>
                  </a>
                ))}
              </div>
              <div className="index-preview">
                <EditorialCover project={c} />
              </div>
            </div>
          )}
        </div>
      </div>
      {p ? (
        <JBDisciplinePanel
          options={options}
          matching={matching}
          selected={f}
          onChoose={choose}
          onDismiss={() => b(false)}
        />
      ) : null}
    </>
  );
}
