import { Arrow } from "../components/Arrow.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { projects } from "../data/projects.js";

const JB_THINKING_ITEMS = [
  {
    slug: "culture-systems",
    label: "Applied",
    date: "11.10.26",
    title: "Una identidad no termina en el logo.",
    excerpt: "Cómo pensar sistemas visuales que pasan del tono a la interfaz y de la campaña al producto.",
    image: projects[0].image,
    topic: "Identidad / Sistemas",
  },
  {
    slug: "ai-direction",
    label: "Notes",
    date: "08.10.26",
    title: "IA, criterio y dirección de arte.",
    excerpt: "La herramienta acelera, pero la mirada editorial sigue marcando qué entra, qué no y por qué.",
    image: projects[1].image,
    topic: "Campaña e IA",
  },
  {
    slug: "web-stories",
    label: "Thinking",
    date: "02.10.26",
    title: "Webs que cuentan antes de vender.",
    excerpt:
      "Estructuras, ritmo y jerarquía para que una web se sienta como una publicación y no como un catálogo sin intención.",
    image: projects[2].image,
    topic: "Web y producto",
  },
  {
    slug: "brand-motion",
    label: "Process",
    date: "24.09.26",
    title: "Diseñar movimiento con intención.",
    excerpt: "Microtransiciones, continuidad visual y decisiones de timing para que una navegación se sienta natural.",
    image: projects[3].image,
    topic: "Dirección de arte",
  },
];

export function JBThinkingPage() {
  return (
    <>
      <main id="contenido" className="thinking-page wrap">
        <section className="thinking-intro">
          <h1>
            <SlideText>Thinking</SlideText>
          </h1>
        </section>
        <section className="thinking-list">
          {JB_THINKING_ITEMS.map((t) => (
            <article key={t.slug} className="thinking-card reveal">
              <div className="thinking-card-media">
                <img src={t.image} alt={t.title} loading="lazy" />
              </div>
              <div className="thinking-card-copy">
                <div className="thinking-card-meta">
                  <span>{t.label}</span>
                  <span>{t.topic}</span>
                  <span>{t.date}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.excerpt}</p>
                <span className="thinking-card-link">
                  {"Leer nota "}
                  <Arrow />
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>
              <section className="thinking-cta">
          <div>
            <h2>Conversaciones, procesos y referencias del estudio.</h2>
            <p>La idea es que Thinking crezca como un archivo vivo: una mezcla de artículos, apuntes y materiales de trabajo.</p>
          </div>
          <a className="outline-link" href="/contacto">
            {"Hablemos de una idea "}
            <Arrow />
          </a>
        </section>
        <div className="thinking-foot">
          <span>© 2026 JUANA BRAVA</span>
          <a href="/proyectos">
            {"Explorar proyectos "}
            <Arrow />
          </a>
          <a href="#inicio">
            {"Volver arriba "}
            <Arrow dir="n" />
          </a>
        </div>
    </>
  );
}
/* Contact configuration: insert verified details here before publishing. */
