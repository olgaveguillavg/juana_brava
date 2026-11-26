/*
 * Ficha de proyecto con diseño propio (las de `src/casos`). Cada una trae su cabecera, su pie, sus estilos
 * y su comportamiento, y se monta dentro de un «shadow root» para verse exactamente igual que su diseño
 * original: ni los estilos de la web la tocan ni los suyos se escapan al resto de páginas.
 * Al compilar (sin navegador) se pinta el contenido directamente, para buscadores e IA.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../casos/fonts.css";

const useBrowserLayoutEffect = typeof window === "undefined" ? () => {} : useLayoutEffect;

export function Ficha({ slug, Content, css, run, anchorOffset = 0 }) {
  const hostRef = useRef(null);
  const [root, setRoot] = useState(null);

  useBrowserLayoutEffect(() => {
    const host = hostRef.current;
    setRoot(host.shadowRoot ?? host.attachShadow({ mode: "open" }));
  }, []);

  useEffect(() => {
    if (!root) return undefined;
    const body = root.querySelector(".ficha-body");
    const controller = new AbortController();
    const { signal } = controller;
    const observers = [];
    const intervals = [];
    document.documentElement.classList.add("has-ficha");

    // Enlaces internos de la ficha (#apartado): la web usa el # para sus páginas, así que se resuelven aquí.
    root.addEventListener(
      "click",
      (event) => {
        const link = event.target.closest?.('a[href^="#"]');
        const href = link?.getAttribute("href");
        if (!href || href.startsWith("#!")) return;
        event.preventDefault();
        const target = root.getElementById(href.slice(1));
        if (!target) return;
        // `anchorOffset` deja libre la cabecera fija, como el scroll-padding-top del diseño original.
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - anchorOffset);
        if (window.__jbLenis) window.__jbLenis.scrollTo(top, { force: true });
        else window.scrollTo({ top, behavior: "smooth" });
      },
      { signal },
    );

    // En el HTML original el script corría al final de la página: aquí, tras el primer pintado.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        root.querySelectorAll("video[muted], video").forEach((video) => {
          video.defaultMuted = true;
          video.muted = true;
        });
        run({
          root,
          body,
          // Lo que la ficha registra en la ventana se retira al salir de ella.
          addEventListener: (type, handler, options) =>
            window.addEventListener(type, handler, { ...(typeof options === "object" ? options : {}), signal }),
          IntersectionObserver: class extends window.IntersectionObserver {
            constructor(...args) {
              super(...args);
              observers.push(this);
            }
          },
          setInterval: (handler, delay) => {
            const id = window.setInterval(handler, delay);
            intervals.push(id);
            return id;
          },
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      controller.abort();
      observers.forEach((observer) => observer.disconnect());
      intervals.forEach((id) => window.clearInterval(id));
      root.querySelectorAll("video").forEach((video) => video.pause());
      document.documentElement.classList.remove("has-ficha");
    };
  }, [root, run, anchorOffset]);

  if (typeof window === "undefined") {
    return (
      <div className="jb-ficha" data-ficha={slug}>
        <Content />
      </div>
    );
  }

  return (
    <div ref={hostRef} className="jb-ficha" data-ficha={slug}>
      {root &&
        createPortal(
          <>
            <style>{css}</style>
            <div className="ficha-body" lang="es">
              <Content />
            </div>
          </>,
          root,
        )}
    </div>
  );
}
