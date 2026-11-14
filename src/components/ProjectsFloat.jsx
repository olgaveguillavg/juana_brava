import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { projectPath, projects } from "../data/projects.js";
import { PORTFOLIO_END_EVENT, PORTFOLIO_LEAVE_EVENT } from "../lib/portfolioFlight.js";

/*
 * «Casos de éxito» en la portada: las fotos de los proyectos flotan alrededor de la frase central y se
 * mueven con el ratón, cada una con una profundidad distinta (paralaje). Adaptado del componente
 * «parallax-floating» (21st.dev) a este proyecto: React con JavaScript y CSS propio, sin Tailwind ni
 * dependencias nuevas.
 *
 * Además del ratón, las fotos se mueven con el scroll a distintas velocidades. Cada foto lleva a su
 * proyecto; al pasar el ratón por una, se ve su nombre y las demás se apagan.
 *
 * Al pulsar «+ proyectos» se usa la transición de siempre (PortfolioTransitions): las fotos se recogen en
 * un paquete junto al enlace y vuelan hasta su sitio en la página de Proyectos. Esta transición debe
 * mantenerse en cualquier cambio de este bloque. Con «reducir movimiento» no hay paralaje ni vuelo: se va
 * directamente.
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

function Floating({ children, sensitivity = 1, easing = 0.05, scrollStrength = 22, className = "" }) {
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
      // Paralaje con el scroll: con el bloque centrado en pantalla las fotos están en su sitio; al
      // entrar y salir, las de delante (más profundidad) se desplazan más que las del fondo.
      const box = containerRef.current?.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = box ? Math.max(-1.5, Math.min(1.5, (box.top + box.height / 2 - vh / 2) / vh)) : 0;
      elements.current.forEach((data) => {
        const strength = (data.depth * sensitivity) / 20;
        const scrollY = progress * data.depth * scrollStrength;
        data.x += (mouse.current.x * strength - data.x) * easing;
        data.y += (mouse.current.y * strength + scrollY - data.y) * easing * 2;
        data.element.style.transform = `translate3d(${data.x.toFixed(2)}px, ${data.y.toFixed(2)}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [sensitivity, easing, scrollStrength, mouse]);

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
 * Como en las composiciones de referencia, el tamaño va con la profundidad: las fotos de delante son las
 * más grandes y las que más se mueven; las del fondo, pequeñas y casi quietas. Las de los lados se salen
 * de la pantalla, como en un editorial. Los tamaños son el menor entre un ancho (vw) y un alto (svh), y
 * la zona central (del 28 % al 72 % de ancho y del 35 % al 65 % de alto) queda libre para la frase.
 * Ordenador: top/left/w. Móvil: mt/ml/wm (fotos arriba y abajo de la frase).
 */
const LAYOUT = [
  { top: "6%", left: "-4%", w: "min(23vw, 40svh)", mt: "3%", ml: "-8%", wm: "42vw", ratio: "4 / 5", depth: 2 },
  { top: "5%", left: "25%", w: "min(11vw, 20svh)", mt: "6%", ml: "40%", wm: "22vw", ratio: "1", depth: 0.6 },
  { top: "3%", left: "45%", w: "min(15vw, 26svh)", mt: "2%", ml: "70%", wm: "38vw", ratio: "3 / 4", depth: 1.4 },
  { top: "2%", left: "76%", w: "min(26vw, 46svh)", mt: "24%", ml: "34%", wm: "26vw", ratio: "1", depth: 3 },
  { top: "56%", left: "6%", w: "min(14vw, 24svh)", mt: "64%", ml: "-6%", wm: "36vw", ratio: "1", depth: 1 },
  { top: "50%", left: "74%", w: "min(19vw, 34svh)", mt: "62%", ml: "60%", wm: "46vw", ratio: "3 / 4", depth: 2 },
  { top: "66%", left: "22%", w: "min(28vw, 48svh)", mt: "84%", ml: "12%", wm: "44vw", ratio: "4 / 3", depth: 4 },
  { top: "74%", left: "55%", w: "min(12vw, 21svh)", mt: "27%", ml: "72%", wm: "24vw", ratio: "1", depth: 0.8 },
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
            <FloatingElement
              key={p.slug}
              project={p.slug}
              depth={l.depth}
              style={{
                "--t": l.top,
                "--l": l.left,
                "--tm": l.mt,
                "--lm": l.ml,
                "--w": l.w,
                "--wm": l.wm,
                "--r": l.ratio,
                "--i": i,
                // Las de delante, por encima de las del fondo.
                zIndex: Math.round(l.depth * 10),
              }}
            >
              <a className="floating__link" href={projectPath(p)}>
                <img className="floating__photo" src={p.image} alt={p.alt || p.name} loading="lazy" />
                <span className="floating__caption" aria-hidden="true">
                  {p.name}
                  <small>{p.sector}</small>
                </span>
              </a>
            </FloatingElement>
          );
        })}
      </Floating>
    </section>
  );
}
