import { Arrow } from "../components/Arrow.jsx";
import { FooterBar } from "../components/FooterBar.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { ideaPath, ideas } from "../data/ideas.js";

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
          {ideas.map((t) => (
            <article key={t.slug} className="thinking-card reveal">
              <a className="thinking-card-hit" href={ideaPath(t)} aria-label={"Leer: " + t.title.replace(/\.$/, "")}>
                <div className="thinking-card-media">
                  <img src={t.image} alt="" loading="lazy" />
                </div>
                <div className="thinking-card-copy">
                  <div className="thinking-card-meta">
                    <span>{t.label}</span>
                    <span>{t.topic}</span>
                    <time dateTime={t.iso}>{t.date}</time>
                  </div>
                  <h3>{t.title.replace(/\.$/, "")}</h3>
                  <p>{t.excerpt}</p>
                  <span className="thinking-card-read">
                    {"Leer nota "}
                    <Arrow />
                  </span>
                </div>
              </a>
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
