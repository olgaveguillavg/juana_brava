import { useEffect, useRef, useState } from "react";

// Geometría tomada de la rueda original (medida a 1440×900):
// diámetro de tarjeta ≈ 0.477 H, radio ≈ 0.686 H, centro en (−0.014 H, 0.5 H).
const CARD = 0.4767;
const RADIUS = 0.6861;
const CENTER_X = -0.0139;
const CENTER_Y = 0.5;
const CAPTION_LEFT = 0.603; // fracción del ancho donde empieza el texto
const AUTOPLAY_MS = 5200;

export default function ArcWheel({ items, totalCount }) {
  const pinRef = useRef(null);
  const artRef = useRef(null);
  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));
  const [turn, setTurn] = useState(0); // giros acumulados (sin saltos al dar la vuelta)
  const [paused, setPaused] = useState(false);
  const wheelDelta = useRef(0);

  const count = items.length;
  const step = (Math.PI * 2) / count;
  const active = ((turn % count) + count) % count;
  const current = items[active];

  // Mide el contenedor (anchura para el texto, altura del área de la rueda).
  useEffect(() => {
    const pin = pinRef.current;
    const art = artRef.current;
    if (!pin || !art) return undefined;
    const measure = () => setSize({ w: pin.clientWidth, h: art.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(pin);
    observer.observe(art);
    return () => observer.disconnect();
  }, []);

  // Como en la web original: escritorio = rueda y texto superpuestos;
  // tablet y móvil = rueda y texto en columnas o apilados.
  const layout = size.w < 760 ? "compact" : size.w < 1100 ? "split" : undefined;

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setTurn((t) => t + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const { w, h } = size;
  const diameter = h * CARD;
  const radius = h * RADIUS;
  const cx = h * CENTER_X;
  const cy = h * CENTER_Y;

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setTurn((t) => t + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setTurn((t) => t - 1);
    }
  };

  // Rueda del ratón sobre la rueda: cada ~90px de desplazamiento gira una posición.
  const onWheel = (event) => {
    wheelDelta.current += event.deltaY;
    if (Math.abs(wheelDelta.current) >= 90) {
      setTurn((t) => t + Math.sign(wheelDelta.current));
      wheelDelta.current = 0;
    }
  };

  return (
    <section className="featured-work arc-featured" id="trabajo" aria-labelledby="featured-title">
      <div className="arc-scroll-track" role="region" aria-roledescription="carrusel" aria-label={`Rueda de ${count} proyectos de Juana Brava`}>
        <div className="arc-pin" data-layout={layout} ref={pinRef} style={{ "--arc-caption-left": `${w * CAPTION_LEFT}px` }}>
          <header className="arc-toolbar">
            <h2 id="featured-title">Casos de éxito</h2>
            <a className="arc-more-projects" href="#!/proyectos" aria-label={`Ver más proyectos, ${totalCount} casos`}>
              <span aria-hidden="true">+</span> proyectos
            </a>
          </header>

          <button
            type="button"
            className="arc-motion-access"
            aria-pressed={paused}
            aria-label={paused ? "Reanudar movimiento" : "Pausar movimiento"}
            onClick={() => setPaused((value) => !value)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Reanudar" : "Pausar"}
          </button>

          <div
            className="arc-stage"
            tabIndex={0}
            aria-label="Rueda de proyectos, explora con scroll o las teclas arriba y abajo"
            onKeyDown={onKeyDown}
            onWheel={onWheel}
          >
            <div className="arc-art" ref={artRef}>
              <div className="arc-wheel">
                {items.map((project, index) => {
                  const angle = (index - turn) * step;
                  const x = cx + radius * Math.cos(angle);
                  const y = cy + radius * Math.sin(angle);
                  const isActive = index === active;
                  return (
                    <div
                      key={project.slug}
                      className="arc-card"
                      data-project={project.slug}
                      data-active={isActive ? "" : undefined}
                      style={{
                        width: diameter,
                        height: diameter,
                        zIndex: Math.round(Math.cos(angle) * 100) + 100,
                        transform: `translate3d(${x - diameter / 2}px, ${y - diameter / 2}px, 0)`,
                        transition: "transform .9s cubic-bezier(.2,.7,.2,1)",
                      }}
                    >
                      <a
                        href={`#!/proyectos/${project.slug}`}
                        className="arc-circle-link"
                        aria-label={`Explorar el caso de ${project.name}`}
                        tabIndex={isActive ? 0 : -1}
                        aria-hidden={!isActive}
                        draggable="false"
                      >
                        <img alt="" draggable="false" decoding="async" loading="lazy" src={project.image} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="arc-caption">
              <div className="arc-caption-body" data-project={current.slug}>
                <p className="arc-category">{current.sector}</p>
                <h3>
                  {current.name}
                  <span>.</span>
                </h3>
                <p className="arc-lead">{current.lead}</p>
                <p className="arc-meta">{current.discipline} · 2026</p>
                <a
                  className="case-link arc-explore"
                  href={`#!/proyectos/${current.slug}`}
                  aria-label={`Explorar el caso de ${current.name}`}
                >
                  Explorar el caso <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <p className="arc-sr" id="arc-description">
              Gira con el scroll o utiliza las teclas arriba y abajo. El control de pausa está disponible con el teclado.
            </p>
            <p className="arc-sr" role="status" aria-live="polite" aria-atomic="true">
              {current.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
