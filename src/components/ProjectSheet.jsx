import { useCallback, useEffect, useRef, useState } from "react";
import { findProject } from "../data/projects.js";
import { SlideText } from "./SlideText.jsx";

const CLOSE_MS = 560;
const WHEEL_LINKS = '.arc-featured a[href*="proyectos/"]';

/*
 * Ficha de proyecto que se abre desde la ruleta de Home.
 * - No sale de Home: abre un panel lateral con el reto, la idea y «Saber más».
 * - Atrás en el navegador cierra la ficha (se guarda como una entrada del historial con la misma URL).
 * - «Saber más» lleva al caso completo, y al volver atrás se aterriza en la ruleta (#trabajo), no en Proyectos.
 */
export function ProjectSheet() {
  const [slug, setSlug] = useState(() => history.state?.jbSheet ?? null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(0);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  const project = slug ? findProject(slug) : null;

  const show = useCallback((nextSlug) => {
    clearTimeout(closeTimer.current);
    setClosing(false);
    setSlug(nextSlug);
  }, []);

  const hide = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSlug(null);
      return;
    }
    setClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setSlug(null);
      setClosing(false);
      trigger.current?.isConnected && trigger.current.focus({ preventScroll: true });
    }, CLOSE_MS);
  }, []);

  // Los proyectos de la ruleta abren la ficha en lugar de navegar.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target?.closest?.(WHEEL_LINKS);
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const match = (link.getAttribute("href") || "").match(/proyectos\/([a-z0-9-]+)/);
      if (!match || !findProject(match[1])) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      trigger.current = link;
      history.pushState({ ...(history.state || {}), jbSheet: match[1] }, "");
      show(match[1]);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  // Atrás / adelante del navegador.
  useEffect(() => {
    const onPopState = (event) => {
      const next = event.state?.jbSheet;
      if (next && findProject(next)) show(next);
      else hide();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [show, hide]);

  // Mientras está abierta: sin scroll de fondo, Esc para cerrar y foco en «Cerrar».
  useEffect(() => {
    if (!slug) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [slug]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function close() {
    if (history.state?.jbSheet) history.back();
    else hide();
  }

  function openCase(event) {
    event.preventDefault();
    // La entrada de la ficha pasa a apuntar a la ruleta: al volver del caso se aterriza ahí.
    history.replaceState(null, "", "#!/?section=trabajo");
    window.location.hash = "#!/proyectos/" + project.slug;
  }

  if (!project) return null;

  return (
    <div className="project-sheet" data-state={closing ? "closing" : "open"}>
      <button type="button" className="project-sheet__backdrop" aria-label="Cerrar ficha" tabIndex={-1} onClick={close} />
      <section
        className="project-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-sheet-title"
        key={project.slug}
      >
        <div className="project-sheet__bar">
          <span>{project.sector}</span>
          <button type="button" ref={closeButton} className="project-sheet__close" onClick={close}>
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>
        <figure className="project-sheet__media">
          <img src={project.image} alt={project.alt} />
        </figure>
        <div className="project-sheet__body">
          <p className="project-sheet__meta">{project.discipline} / 2026</p>
          <h2 id="project-sheet-title" className="project-sheet__title">
            <SlideText delay={0.38}>{project.name}</SlideText>
            <span className="project-sheet__dot">.</span>
          </h2>
          <p className="project-sheet__lead">{project.lead}</p>
          <div className="project-sheet__story">
            <div>
              <h3>El reto.</h3>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h3>La idea.</h3>
              <p>{project.idea}</p>
            </div>
          </div>
          <a className="project-sheet__more" href={"#!/proyectos/" + project.slug} onClick={openCase}>
            Saber más <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
