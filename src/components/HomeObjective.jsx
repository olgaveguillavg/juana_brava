import { useEffect, useRef } from "react";

/*
 * Portada, justo después del lema: el manifiesto a escala gigante, sin párrafo. Fondo claro y las dos
 * frases centradas, de borde a borde. El bloque se queda fijo mientras se hace scroll y las palabras pasan
 * de negro a rojo, una tras otra. Con «reducir movimiento», la frase se ve directamente en rojo y el
 * bloque no se fija.
 */
const LINES = ["Hay demasiadas marcas que se parecen.", "Nosotras hacemos las que no."];

// Tramo del recorrido en el que se colorean las palabras (0 = el bloque llega arriba, 1 = se suelta).
const FILL_RANGE = [0.08, 0.78];

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export function HomeObjective() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.static = "";
      return undefined;
    }
    const list = [...section.querySelectorAll(".manifesto__word")];
    const [from, to] = FILL_RANGE;
    const step = (to - from) / list.length;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = section.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const travel = box.height - window.innerHeight;
      const p = travel > 0 ? clamp01(-box.top / travel) : 1;
      // Cada palabra cambia de color en su parte del tramo, con un pequeño solape para que fluya.
      list.forEach((w, i) => w.style.setProperty("--on", clamp01((p - (from + i * step)) / (step * 1.8)).toFixed(3)));
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

  return (
    <section ref={sectionRef} className="manifesto" id="objetivo" aria-labelledby="manifesto-title">
      <div className="manifesto__stage">
        <h2 id="manifesto-title" className="manifesto__title">
          {LINES.map((line) => (
            <span key={line} className="manifesto__line">
              {line.split(" ").map((w, i) => (
                <span key={i} className="manifesto__word">
                  {w}{" "}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
