import { thinkingPosts } from "../data/content.js";

export default function Thinking() {
  const [highlight, ...posts] = thinkingPosts;

  return (
    <main id="contenido" className="thinking-page wrap">
      <section className="thinking-intro">
        <span className="eyebrow">Archivo editorial</span>
        <h1>Thinking</h1>
        <p>Ideas, observaciones y piezas de proceso sobre identidad, dirección de arte, tecnología y cultura visual.</p>
      </section>

      <section className="thinking-highlight reveal">
        <div className="thinking-highlight-media">
          <img alt="Identidad original de Juana Brava aplicada a su universo digital" loading="eager" src="/brand/hero.png" />
        </div>
        <div className="thinking-highlight-copy">
          <span className="eyebrow">Thinking / destacado</span>
          <h2>Una sección para compartir cómo pensamos antes, durante y después de cada proyecto.</h2>
          <p>
            Textos breves, referencias, procesos y hallazgos que amplían el trabajo del estudio sin romper la estética
            general de Juana Brava.
          </p>
        </div>
      </section>

      <section className="thinking-list">
        {[highlight, ...posts].map((post) => (
          <article className="thinking-card reveal" key={post.title}>
            <div className="thinking-card-media">
              <img alt={post.title} loading="lazy" src={post.image} />
            </div>
            <div className="thinking-card-copy">
              <div className="thinking-card-meta">
                <span>{post.kind}</span>
                <span>{post.topic}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <span className="thinking-card-link">
                Leer nota <span aria-hidden="true">↗</span>
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="thinking-cta">
        <div>
          <span className="eyebrow">Próximamente</span>
          <h2>Conversaciones, procesos y referencias del estudio.</h2>
          <p>La idea es que Thinking crezca como un archivo vivo: una mezcla de artículos, apuntes y materiales de trabajo.</p>
        </div>
        <a className="outline-link" href="#!/contacto">
          Hablemos de una idea <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
