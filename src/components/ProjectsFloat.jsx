import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { projects } from "../data/projects.js";
import { PORTFOLIO_END_EVENT, PORTFOLIO_LEAVE_EVENT } from "../lib/portfolioFlight.js";

/*
 * «Casos de éxito» en la portada: las fotos de los proyectos flotan alrededor de la frase central y se
 * mueven con el ratón, cada una con una profundidad distinta (paralaje). Adaptado del componente
 * «parallax-floating» (21st.dev) a este proyecto: React con JavaScript y CSS propio, sin Tailwind ni
 * dependencias nuevas.
 *
 * Al pulsar «+ proyectos» se usa la transición de siempre (PortfolioTransitions): las fotos se recogen en
 * el enlace y vuelan hasta su sitio en la página de Proyectos. Con «reducir movimiento» no hay paralaje ni
 * vuelo: se va directamente.
 */

const FloatingContext = createContext(null);

function useMousePositionRef(containerRef) {
  const position = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (event) => {
      const box = containerRef.current?.getBoundingClientRect();
      if (!box) return;
      // Posición respecto al centro del bloque, para que las fotos se muevan alrededor de su sitio.
      // Se limita al propio bloque: fuera de él, las fotos se quedan en el borde de su recorrido.
      const clamp = (v, max) => Math.max(-max, Math.min(max, v));
      position.current = {
        x: clamp(event.clientX - box.left - box.width / 2, box.width / 2),
        y: clamp(event.clientY - box.top - box.height / 2, box.height / 2),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [containerRef]);
  return position;
}

function Floating({ children, sensitivity = 1, easing = 0.05, className = "" }) {
  const containerRef = useRef(null);
  const elements = useRef(new Map());
  const mouse = useMousePositionRef(containerRef);

  const register = useCallback((id, element, depth) => {
    elements.current.set(id, { element, depth, x: 0, y: 0 });
  }, []);
  const unregister = useCallback((id) => elements.current.delete(id), []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    const tick = () => {
      elements.current.forEach((data) => {
        const strength = (data.depth * sensitivity) / 20;
        data.x += (mouse.current.x * strength - data.x) * easing;
        data.y += (mouse.current.y * strength - data.y) * easing;
        data.element.style.transform = `translate3d(${data.x.toFixed(2)}px, ${data.y.toFixed(2)}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [sensitivity, easing, mouse]);

  return (
    <FloatingContext.Provider value={{ register, unregister }}>
      <div ref={containerRef} className={"floating " + className}>
        {children}
      </div>
    </FloatingContext.Provider>
  );
}

function FloatingElement({ children, depth = 1, style, project }) {
  const ref = useRef(null);
  const id = useRef(Math.random().toString(36).slice(2));
  const context = useContext(FloatingContext);
  useEffect(() => {
    if (!ref.current || !context) return undefined;
    context.register(id.current, ref.current, depth || 0.01);
    return () => context.unregister(id.current);
  }, [context, depth]);
  return (
    <div ref={ref} className="floating__el" style={style} data-project={project}>
      {children}
    </div>
  );
}

/*
 * Posición (en % del bloque), tamaño y profundidad de cada foto.
 * Los tamaños son el menor entre un ancho (vw) y un alto (svh), así que no invaden la frase central en
 * pantallas muy anchas ni muy bajas. Fila de arriba y de abajo: por encima y por debajo del texto;
 * laterales: fuera de la columna central (del 30 % al 70 % del ancho).
 */
const LAYOUT = [
  { mt: "3%", ml: "4%", top: "5%", left: "4%", w: "min(12vw, 24svh)", ratio: "1", depth: 0.5 },
  { mt: "4%", ml: "40%", top: "8%", left: "18%", w: "min(13vw, 26svh)", ratio: "1", depth: 1 },
  { mt: "2%", ml: "72%", top: "3%", left: "52%", w: "min(15.5vw, 19.5svh)", ratio: "3 / 4", depth: 2 },
  { mt: "22%", ml: "20%", top: "6%", left: "80%", w: "min(13vw, 26svh)", ratio: "1", depth: 1 },
  { mt: "23%", ml: "52%", top: "40%", left: "1%", w: "min(14vw, 24svh)", ratio: "1", depth: 1 },
  { mt: "72%", ml: "4%", top: "44%", left: "83%", w: "min(12vw, 19svh)", ratio: "3 / 4", depth: 2 },
  { mt: "74%", ml: "66%", top: "70%", left: "8%", w: "min(18vw, 30svh)", ratio: "4 / 3", depth: 3 },
  { mt: "82%", ml: "34%", top: "72%", left: "58%", w: "min(13vw, 22svh)", ratio: "1", depth: 1 },
];

export function ProjectsFloat() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const images = projects.slice(0, LAYOUT.length);

  // Las fotos aparecen escalonadas cada vez que el bloque entra en pantalla (al bajar y al subir).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return setVisible(true);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Durante el vuelo a Proyectos las fotos del bloque se ocultan: las que se ven son sus copias.
  useEffect(() => {
    const el = sectionRef.current;
    const leave = () => el?.setAttribute("data-flying", "");
    const end = () => el?.removeAttribute("data-flying");
    window.addEventListener(PORTFOLIO_LEAVE_EVENT, leave);
    window.addEventListener(PORTFOLIO_END_EVENT, end);
    return () => {
      window.removeEventListener(PORTFOLIO_LEAVE_EVENT, leave);
      window.removeEventListener(PORTFOLIO_END_EVENT, end);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="projects-float"
      id="trabajo"
      aria-labelledby="projects-float-title"
      data-visible={visible ? "" : undefined}
    >
      <div className="projects-float__center">
        <h2 id="projects-float-title">
          Conoce nuestros
          <br />
          casos de éxito
        </h2>
        <a className="arc-more-projects projects-float__cta" href="/proyectos" aria-label={"Ver más proyectos, " + projects.length + " casos"}>
          <span aria-hidden="true">+</span>
          {" proyectos"}
        </a>
      </div>
      <Floating sensitivity={-0.6} className="projects-float__layer">
        {images.map((p, i) => {
          const l = LAYOUT[i];
          return (
            <FloatingElement key={p.slug} project={p.slug} depth={l.depth} style={{ "--t": l.top, "--l": l.left, "--tm": l.mt, "--lm": l.ml }}>
              <img
                className="floating__photo"
                src={p.image}
                alt=""
                loading="lazy"
                style={{ width: l.w, aspectRatio: l.ratio, "--i": i }}
              />
            </FloatingElement>
          );
        })}
      </Floating>
    </section>
  );
}
