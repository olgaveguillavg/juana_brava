import { useState } from "react";
import { Arrow } from "../components/Arrow.jsx";
import { FooterBar } from "../components/FooterBar.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { ideaPath, ideas } from "../data/ideas.js";

// Tipos de nota (guía «Tinta»): etiqueta, nombre del filtro y color del punto.
const TYPES = {
  opinion: { label: "Opinión", filter: "Opinión", color: "#9c2425" },
  note: { label: "Nota", filter: "Notas", color: "#bad5e3" },
  identity: { label: "Identidad", filter: "Identidad", color: "#26201d" },
  process: { label: "Proceso", filter: "Procesos", color: "#e5c8c8" },
};

function IdeaRow({ idea }) {
  const title = idea.title.replace(/\.$/, "");
  if (idea.type === "opinion") {
    const quote = idea.body.find((block) => block.type === "quote")?.text ?? idea.excerpt;
    return (
      <a className="idx-opinion reveal" href={ideaPath(idea)}>
        <span className="idx-opinion__media">
          <img src={idea.image} alt="" loading="lazy" />
        </span>
        <span className="idx-opinion__copy">
          <span className="idx-title idx-title--big">{title}</span>
          <span className="idx-text">{"“" + quote + ".”"}</span>
          <span className="idx-more">
            {"Leer la entrada "}
            <Arrow />
          </span>
        </span>
      </a>
    );
  }
  return (
    <a className="idx-row reveal" href={ideaPath(idea)}>
      <span className="idx-row__head">
        <span className="idx-title">{title}</span>
      </span>
      <span className="idx-row__media">
        <img src={idea.image} alt="" loading="lazy" />
      </span>
      <span className="idx-row__copy">
        <span className="idx-text">{idea.excerpt}</span>
        <span className="idx-more">
          {"Leer "}
          <Arrow />
        </span>
      </span>
    </a>
  );
}

export function JBThinkingPage() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? ideas : ideas.filter((idea) => idea.type === filter);
  // Solo aparecen los filtros de tipos que tienen alguna nota.
  const presentTypes = Object.keys(TYPES).filter((key) => ideas.some((idea) => idea.type === key));
  const filters = [["all", "Todo"], ...presentTypes.map((key) => [key, TYPES[key].filter])];

  return (
    <>
      <main id="contenido" className="thinking-page wrap">
        <section className="thinking-intro">
          <h1>
            <SlideText>Ideas</SlideText>
          </h1>
        </section>
        <div className="idx-filters" role="group" aria-label="Tipo de publicación">
          {filters.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="idx-filter"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <section className="idx-list" aria-label="Entradas de Ideas">
          {list.map((idea) => (
            <IdeaRow key={idea.slug} idea={idea} />
          ))}
        </section>
      </main>
      <section className="thinking-cta">
        <div>
          <h2>Conversaciones, procesos y referencias del estudio.</h2>
        </div>
        <a className="outline-link" href="/contacto">
          {"Hablemos de una idea "}
          <Arrow />
        </a>
      </section>
      <footer className="thinking-foot">
        <FooterBar />
      </footer>
    </>
  );
}
