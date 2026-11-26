import { useEffect, useRef } from "react";
import { projectPath, projects } from "../data/projects.js";
import { PORTFOLIO_END_EVENT, PORTFOLIO_LEAVE_EVENT } from "../lib/portfolioFlight.js";

/*
 * Portada: selección de trabajos en formato editorial (sustituye a las fotos flotantes alrededor de
 * «Conoce nuestros casos de éxito», que parecían de plantilla y no encajaban con el resto de la web).
 *
 * Va justo después del manifiesto. Cuatro proyectos grandes en dos columnas asimétricas, alineados a la
 * izquierda como el resto de la página, cada uno con su nombre, lo que hicimos y el sector. Paralaje contenido, como en las webs de
 * estudio de referencia:
 *  - cada foto se desliza un poco dentro de su marco al hacer scroll;
 *  - la columna derecha avanza algo más rápido que la izquierda.
 *
 * «+ proyectos» mantiene SIEMPRE la transición de la portada: las fotos se recogen en un paquete junto al
 * enlace y vuelan a su sitio en Proyectos (PortfolioTransitions + portfolioFlight.js, que reconocen
 * `.work-pick__img` y el `data-project` de cada `.work-pick`). Con «reducir movimiento» no hay paralaje.
 */
const LEFT = [
  { slug: "vyrk-r01", variant: "wide" },
  { slug: "mara", variant: "tall" },
];
const RIGHT = [
  { slug: "pulso", variant: "portrait" },
  { slug: "nacar", variant: "square" },
];
// Desplazamiento de la columna derecha respecto a la izquierda (px por pantalla de scroll).
const COLUMN_SPEED = 70;
// Recorrido de cada foto dentro de su marco (% de su alto). La foto está ampliada para no dejar huecos.
const IMAGE_TRAVEL = 6;

function Pick({ slug, variant }) {
  const p = projects.find((item) => item.slug === slug);
  if (!p) return null;
  return (
    <li className={"work-pick work-pick--" + variant} data-project={p.slug}>
      <a className="work-pick__link" href={projectPath(p)}>
        <div className="work-pick__frame reveal">
          <img className="work-pick__img" src={p.image} alt={p.alt || p.name} loading="lazy" />
        </div>
        <div className="work-pick__caption reveal">
          <h3>{p.name}</h3>
          <p>{p.discipline}</p>
          <span>{p.sector}</span>
        </div>
      </a>
    </li>
  );
}

export function WorkSelection() {
  const sectionRef = useRef(null);

  // Paralaje con el scroll: solo transform, calculado una vez por fotograma y solo con el bloque cerca.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const right = section.querySelector(".work-sel__col--right");
    const images = [...section.querySelectorAll(".work-pick__img")];
    const narrow = matchMedia("(max-width: 760px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const box = section.getBoundingClientRect();
      if (box.bottom < -vh || box.top > vh * 2) return;
      // Columna derecha: algo más rápida que la página (en móvil, una sola columna, no se mueve).
      const sectionProgress = (box.top + box.height / 2 - vh / 2) / vh;
      right.style.transform = narrow.matches ? "" : `translate3d(0, ${(sectionProgress * COLUMN_SPEED).toFixed(1)}px, 0)`;
      // Cada foto, dentro de su marco: de -recorrido a +recorrido mientras cruza la pantalla.
      for (const img of images) {
        const r = img.parentElement.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        img.style.transform = `translate3d(0, ${(p * -IMAGE_TRAVEL).toFixed(2)}%, 0) scale(1.16)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
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
    <section ref={sectionRef} className="work-sel wrap" id="trabajo" aria-labelledby="work-title">
      <h2 id="work-title" className="work-sel__title reveal">
        Lo último que hemos hecho
      </h2>
      <div className="work-sel__cols">
        <ul className="work-sel__col work-sel__col--left">
          {LEFT.map((item) => (
            <Pick key={item.slug} {...item} />
          ))}
        </ul>
        <ul className="work-sel__col work-sel__col--right">
          {RIGHT.map((item) => (
            <Pick key={item.slug} {...item} />
          ))}
        </ul>
      </div>
      <div className="work-sel__more">
        <a className="arc-more-projects" href="/proyectos" aria-label={"Ver más proyectos, " + projects.length + " casos"}>
          <span aria-hidden="true">+</span>
          {" proyectos"}
        </a>
      </div>
    </section>
  );
}
