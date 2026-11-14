import { useEffect, useRef, useState } from "react";
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
/*
 * Cambio de color al hacer scroll (como en basicagency.com): la nota empieza en oscuro, igual que el
 * listado de Ideas del que viene, y cuando el texto llega a la mitad de la pantalla todo pasa a claro con
 * un fundido (0,65 s). Al volver arriba, vuelve a oscuro. La cabecera cambia de color con la página.
 */
function useScrollTheme(ref) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      setTheme(el.getBoundingClientRect().top < window.innerHeight * 0.55 ? "light" : "dark");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.noteTheme;
    };
  }, [ref]);
  useEffect(() => {
    document.documentElement.dataset.noteTheme = theme;
  }, [theme]);
  return theme;
}

export function NotePage({ note }) {
  const bodyRef = useRef(null);
  const theme = useScrollTheme(bodyRef);
  const others = ideas.filter((n) => n.slug !== note.slug).slice(0, 3);
  const minutes = readingMinutes(note);

  return (
    <>
      <main id="contenido" className="note-page" data-theme={theme}>
        <header className="note-head wrap">
          <nav className="note-crumbs" aria-label="Volver">
            <a href="/ideas" className="note-back">
              <Arrow dir="w" />
              {" Ideas"}
            </a>
          </nav>
          <h1 className="note-title">
            <SlideText delay={0.35} step={0.07}>{note.title.replace(/\.$/, "")}</SlideText>
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

        <article className="note-body" ref={bodyRef}>
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
