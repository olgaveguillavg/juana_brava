import { Arrow } from "../components/Arrow.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { ideaPath, ideas, readingMinutes } from "../data/ideas.js";

/*
 * Ficha de una nota de «Ideas».
 * Tomada de cómo lo resuelven varias agencias (BASIC/DEPT, Pentagram, Koto, Instrument) y llevada al
 * lenguaje de Juana Brava:
 *  - Cabecera: miga de pan para volver a Ideas, etiqueta, tema, fecha y minutos de lectura, el titular,
 *    la entradilla y la firma.
 *  - Foto de portada a todo el ancho con su pie.
 *  - Una sola columna de lectura (unos 65 caracteres por línea), con subtítulos, una cita destacada que
 *    termina en el punto rojo de la marca e imágenes algo más anchas que el texto.
 *  - Al final, «Más ideas» con el resto de notas y el pie común.
 */
export function NotePage({ note }) {
  const others = ideas.filter((n) => n.slug !== note.slug).slice(0, 3);
  const minutes = readingMinutes(note);

  return (
    <>
      <main id="contenido" className="note-page">
        <header className="note-head wrap">
          <nav className="note-crumbs" aria-label="Estás en">
            <a href="/ideas" className="note-back">
              <Arrow dir="w" />
              {" Ideas"}
            </a>
            <span aria-hidden="true">/</span>
            <span>{note.label}</span>
          </nav>
          <h1 className="note-title">
            <SlideText>{note.title.replace(/\.$/, "")}</SlideText>
          </h1>
          <p className="note-lead reveal">{note.excerpt}</p>
          <div className="note-meta reveal">
            <span>{note.topic}</span>
            <time dateTime={note.iso}>{note.date}</time>
            <span>{minutes} min de lectura</span>
            <span>Por Juana Brava</span>
          </div>
        </header>

        <figure className="note-cover wrap reveal">
          <img src={note.image} alt={note.imageAlt} />
          <figcaption>{note.caption}</figcaption>
        </figure>

        <article className="note-body">
          {note.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="reveal">{block.text}</h2>;
            if (block.type === "quote")
              return (
                <blockquote key={i} className="note-quote reveal">
                  <p>
                    {block.text}
                    <span className="note-dot" aria-hidden="true" />
                  </p>
                </blockquote>
              );
            if (block.type === "figure")
              return (
                <figure key={i} className="note-figure reveal">
                  <img src={block.src} alt={block.alt} loading="lazy" />
                  <figcaption>{block.caption}</figcaption>
                </figure>
              );
            return (
              <p key={i} className="reveal">
                {block.text}
              </p>
            );
          })}
          <p className="note-sign reveal">
            Escrito por <strong>Juana Brava</strong>. Olga Veguilla y Saray Cruz, estudio creativo en Barcelona.
          </p>
        </article>

        <section className="note-more wrap" aria-labelledby="note-more-title">
          <div className="note-more__top">
            <h2 id="note-more-title">Más ideas</h2>
            <a className="note-more__all" href="/ideas">
              {"Ver todas "}
              <Arrow />
            </a>
          </div>
          <ul className="note-more__list">
            {others.map((n) => (
              <li key={n.slug} className="reveal">
                <a className="note-card" href={ideaPath(n)}>
                  <span className="note-card__media">
                    <img src={n.image} alt="" loading="lazy" />
                  </span>
                  <span className="note-card__meta">
                    {n.label} · {n.date}
                  </span>
                  <span className="note-card__title">{n.title.replace(/\.$/, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
