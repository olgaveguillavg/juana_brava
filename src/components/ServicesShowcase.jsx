import { useEffect, useState } from "react";
import { services } from "../data/projects.js";

/*
 * «Qué hacemos», en formato editorial: una sola frase («Hacemos identidad y dirección de arte ● …»)
 * con los servicios separados por un punto rojo, y a la derecha un carrusel de imágenes del estudio que se funden una tras
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
          {/* Una sola frase en lugar de título + titular (a la manera de BASIC): así no compiten dos
              niveles. Los servicios se separan con el punto rojo de la marca. */}
          <h2 id="services-title" className="services-edit__headline reveal">
            Hacemos{" "}
            {services.map((s, i) => (
              <span key={s.name}>
                {/* En minúscula dentro de la frase, salvo siglas como «IA». En gris; rojo al pasar el ratón. */}
                <span className="services-edit__service">
                  {/^[A-ZÁÉÍÓÚ]{2}/.test(s.name) ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1)}
                </span>
                {i < services.length - 1 ? <span className="services-edit__dot" aria-hidden="true" /> : "."}{" "}
              </span>
            ))}
          </h2>
          <p className="services-edit__lead reveal">
            De la primera idea a que esté funcionando, sin pasar de mano en mano.
          </p>
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
