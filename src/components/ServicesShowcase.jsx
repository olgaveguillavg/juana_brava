import { useEffect, useState } from "react";
import { Arrow } from "./Arrow.jsx";
import { services } from "../data/projects.js";

/*
 * «Qué hacemos», en formato editorial: los cuatro servicios escritos como un solo titular grande,
 * separados por un punto rojo, y a la derecha un carrusel de imágenes del estudio que se funden una tras
 * otra (sin desplazamientos). Con «reducir movimiento» se queda en la primera imagen.
 * Las imágenes se cambian en SLIDES.
 */
const SLIDES = [
  {
    src: "/brand/extra/estudio-equipo.webp",
    alt: "Manos que eligen fotografías, muestras de color y papeles rojos sobre una mesa de trabajo",
  },
  {
    src: "/brand/extra/lab-art.webp",
    alt: "Una mujer con abrigo rojo pasa junto a carteles rojos y en blanco y negro pegados en una pared",
  },
  {
    src: "/brand/extra/estudio-film-1.webp",
    alt: "Una persona con chaqueta roja camina frente a una fachada blanca con un gran círculo rojo",
  },
  {
    src: "/brand/pulso.webp",
    alt: "Carteles de Pulso en amarillo ácido, negro y burdeos sobre una pared azul",
  },
];
const SLIDE_MS = 4200;

function useCarousel(count) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || count < 2) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [count]);
  return [index, setIndex];
}

export function ServicesShowcase() {
  const [index, setIndex] = useCarousel(SLIDES.length);
  return (
    <section className="services services-index services-edit wrap" id="servicios" aria-labelledby="services-title">
      <div className="services-edit__grid">
        <div className="services-edit__copy">
          <h2 id="services-title" className="reveal">
            Qué hacemos
          </h2>
          <p className="services-edit__headline reveal">
            {services.map((s, i) => (
              <span key={s.name}>
                {s.name}
                {i < services.length - 1 && <span className="services-edit__dot" aria-hidden="true" />}{" "}
              </span>
            ))}
          </p>
          <p className="services-edit__lead reveal">
            De la idea a su puesta en marcha.
            <br />
            Diseño, contenido y tecnología en el mismo equipo.
          </p>
          <p className="services-edit__tag reveal">Juana Brava, agencia creativa</p>
          <a className="case-link studio-case-link services-edit__cta reveal" href="/proyectos">
            {"Ver proyectos "}
            <Arrow />
          </a>
        </div>
        <figure className="services-edit__photo services-carousel reveal" aria-roledescription="carrusel" aria-label="Imágenes del estudio">
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "lazy" : "lazy"}
              aria-hidden={i !== index}
              data-on={i === index ? "" : undefined}
            />
          ))}
          <div className="services-carousel__dots" role="group" aria-label="Elegir imagen">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={"Imagen " + (i + 1) + " de " + SLIDES.length}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
