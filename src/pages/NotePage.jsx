import { useEffect, useRef, useState } from "react";
import { Arrow } from "../components/Arrow.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { ideaPath, ideas, readingMinutes } from "../data/ideas.js";

/*
 * Ficha de una nota de «Ideas».
 *  - Empieza con el color de su tipo (negro para identidad, rojo para opinión, azul claro para notas y
 *    rosa para procesos): titular y fecha en Anton, una línea con tipo, firma y lectura, y la portada.
 *  - Cuando el texto llega a la mitad de la pantalla, la página entera se funde al blanco de la web.
 *  - Entradilla fija a la izquierda (Syne) y texto a la derecha. Las fotos, parejas, colores, pasos y la
 *    frase gigante de opinión ocupan todo el ancho.
 *  - «Más ideas» al final: en móvil se recorre deslizando hacia los lados.
 */
const light = { fg: "#26201d", muted: "rgb(38 32 29 / 72%)", line: "rgb(38 32 29 / 24%)", dark: false };
const dark = { fg: "#ffffff", muted: "rgb(255 255 255 / 74%)", line: "rgb(255 255 255 / 28%)", dark: true };
const TYPES = {
  identity: { label: "Identidad", bg: "#26201d", ...dark },
  opinion: { label: "Opinión", bg: "#9c2425", ...dark },
  note: { label: "Notas", bg: "#bad5e3", ...light },
  process: { label: "Procesos", bg: "#e5c8c8", ...light },
};

// "2026-10-11" -> "11.10.26"
const shortDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return day + "." + month + "." + String(year).slice(2);
};

// El texto va en la columna de lectura; el resto de bloques ocupa todo el ancho.
const isText = (block, type) =>
  block.type === "p" || block.type === "h2" || (block.type === "quote" && type !== "opinion");

function groupBlocks(body, type) {
  const groups = [];
  for (const block of body) {
    const last = groups[groups.length - 1];
    if (!isText(block, type)) groups.push({ wide: block });
    else if (last?.text) last.text.push(block);
    else groups.push({ text: [block] });
  }
  return groups;
}

function Photo({ src, alt = "", caption, eager = false }) {
  return (
    <figure className="nf-figure reveal">
      <div className="nf-photo">
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function TextBlock({ block }) {
  if (block.type === "h2") return <h2 className="reveal">{block.text}</h2>;
  if (block.type === "quote")
    return (
      <blockquote className="nf-aside-quote reveal">
        <p>{block.text}</p>
      </blockquote>
    );
  // `html` llega ya saneado desde cloudIdeas.js (solo negrita, cursiva, enlaces y saltos de línea).
  if (block.html) return <p className="reveal" dangerouslySetInnerHTML={{ __html: block.html }} />;
  return <p className="reveal">{block.text}</p>;
}

function WideBlock({ block }) {
  if (block.type === "quote") return <blockquote className="nf-quote reveal">{block.text}.</blockquote>;
  if (block.type === "figure")
    return (
      <div className="nf-full wrap">
        <Photo src={block.src} alt={block.alt} caption={block.caption} />
      </div>
    );
  if (block.type === "video")
    return (
      <figure className="nf-figure nf-full wrap">
        <video src={block.src} controls playsInline preload="metadata" style={{ width: "100%" }} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  if (block.type === "link")
    return (
      <p className="nf-full wrap">
        <a href={block.href} target="_blank" rel="noopener noreferrer">
          Ver la publicación original <Arrow />
        </a>
      </p>
    );
  if (block.type === "duo")
    return (
      <div className="nf-duo wrap">
        {block.images.map((image) => (
          <Photo key={image.src} {...image} />
        ))}
      </div>
    );
  if (block.type === "swatches")
    return (
      <ul className="nf-swatches wrap" aria-label="Colores">
        {block.colors.map((c) => (
          <li key={c.hex} style={{ background: c.hex, color: c.ink }}>
            <span>{c.name}</span>
            <span>{c.hex}</span>
          </li>
        ))}
      </ul>
    );
  if (block.type === "steps")
    return (
      <ol className="nf-steps wrap">
        {block.steps.map((step, i) => (
          <li key={step.title} className="nf-step">
            <div className="reveal">
              <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            {step.src && <Photo src={step.src} alt={step.alt} />}
          </li>
        ))}
      </ol>
    );
  return null;
}

function Share({ title }) {
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true));
  return (
    <div className="nf-share">
      <a
        href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(window.location.href)}
        target="_blank"
        rel="noreferrer"
        aria-label={"Compartir en LinkedIn: " + title}
      >
        in
      </a>
      <button type="button" onClick={copy} aria-label="Copiar enlace" title="Copiar enlace">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
        </svg>
      </button>
      <span role="status">{copied ? "Enlace copiado" : ""}</span>
    </div>
  );
}

function BackLink() {
  return (
    <a href="/ideas" className="nf-back">
      <Arrow dir="w" />
      {" Volver a Ideas"}
    </a>
  );
}

export function NotePage({ note }) {
  const bodyRef = useRef(null);
  const [faded, setFaded] = useState(false);
  const type = TYPES[note.type] ?? TYPES.note;
  const title = note.title.replace(/\.$/, "");
  const others = ideas.filter((n) => n.slug !== note.slug).slice(0, 3);
  const groups = groupBlocks(note.body, note.type);
  // Sin texto en el cuerpo, la entradilla necesita igualmente su bloque.
  if (!groups.some((g) => g.text)) groups.unshift({ text: [] });
  const firstText = groups.findIndex((g) => g.text);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = bodyRef.current;
      if (el) setFaded(el.getBoundingClientRect().top < window.innerHeight * 0.55);
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
    };
  }, [note.slug]);

  // La cabecera de la web va en blanco sobre los colores oscuros y en tinta sobre los claros y el blanco.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.noteHead = type.dark && !faded ? "light" : "ink";
    return () => {
      delete root.dataset.noteHead;
    };
  }, [type.dark, faded]);

  // Mientras no se ha fundido, los colores de la ficha son los de su tipo; después, los de la hoja blanca.
  const theme = faded
    ? {}
    : {
        "--note-bg": type.bg,
        "--note-fg": type.fg,
        "--note-muted": type.muted,
        "--note-line": type.line,
        "--note-accent": type.fg,
      };

  return (
    <>
      <main id="contenido" className="note-page" style={{ ...theme, "--note-type": type.bg }}>
        <header className="nf-hero wrap">
          <BackLink />
          <h1 className="nf-title">
            <SlideText delay={0.1} step={0.05}>{title}</SlideText>
          </h1>
          <div>
            <time className="nf-date" dateTime={note.iso}>
              {shortDate(note.iso)}
            </time>
            <div className="nf-rule">
              <span>{type.label}</span>
              <span>Por Juana Brava</span>
              <span>Lectura {readingMinutes(note)} min</span>
            </div>
          </div>
        </header>

        {note.image && (
          <div className="nf-cover wrap">
            <Photo src={note.image} alt={note.imageAlt} caption={note.caption} eager />
          </div>
        )}

        <article>
          {groups.map((group, i) =>
            group.wide ? (
              <WideBlock key={i} block={group.wide} />
            ) : (
              <div key={i} className="nf-body wrap" ref={i === firstText ? bodyRef : undefined}>
                <div className="nf-side">
                  {i === firstText && (
                    <>
                      <p className="nf-lead">{note.excerpt}</p>
                      <p className="nf-who">
                        {type.label}
                        <br />
                        {note.topic}
                        <br />({shortDate(note.iso)})
                      </p>
                      <Share title={title} />
                    </>
                  )}
                </div>
                <div className="nf-text">
                  {group.text.map((block, n) => (
                    <TextBlock key={n} block={block} />
                  ))}
                </div>
              </div>
            ),
          )}
          <p className="nf-sign wrap reveal">
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
                  <span className="note-card__meta">{n.date}</span>
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
