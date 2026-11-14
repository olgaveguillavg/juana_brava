import { Arrow } from "../components/Arrow.jsx";
import { FooterBar } from "../components/FooterBar.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { projects } from "../data/projects.js";

const JB_THINKING_ITEMS = [
  {
    slug: "culture-systems",
    label: "Práctica",
    date: "11 oct 2026", iso: "2026-10-11",
    title: "Una identidad no termina en el logo.",
    excerpt: "Cómo pensar sistemas visuales que pasan del tono a la interfaz y de la campaña al producto.",
    image: projects[0].image,
    topic: "Identidad / Sistemas",
  },
  {
    slug: "ai-direction",
    label: "Notas",
    date: "8 oct 2026", iso: "2026-10-08",
    title: "IA, criterio y dirección de arte.",
    excerpt: "La herramienta acelera, pero la mirada editorial sigue marcando qué entra, qué no y por qué.",
    image: projects[1].image,
    topic: "Campaña e IA",
  },
  {
    slug: "web-stories",
    label: "Opinión",
    date: "2 oct 2026", iso: "2026-10-02",
    title: "Webs que cuentan antes de vender.",
    excerpt:
      "Estructuras, ritmo y jerarquía para que una web se sienta como una publicación y no como un catálogo sin intención.",
    image: projects[2].image,
    topic: "Web y producto",
  },
  {
    slug: "brand-motion",
    label: "Proceso",
    date: "24 sept 2026", iso: "2026-09-24",
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
            <SlideText>Ideas</SlideText>
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
                  <time dateTime={t.iso}>{t.date}</time>
                </div>
                <h3>{t.title}</h3>
                <p>{t.excerpt}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
              <section className="thinking-cta">
          <div>
            <h2>Conversaciones, procesos y referencias del estudio.</h2>          </div>
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
/* Contact configuration: insert verified details here before publishing. */
