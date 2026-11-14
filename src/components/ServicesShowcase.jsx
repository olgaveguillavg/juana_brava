import { Arrow } from "./Arrow.jsx";
import { services } from "../data/projects.js";

/*
 * «Qué hacemos», en formato editorial (a la manera de la portada de basicagency.com): los cuatro
 * servicios escritos como un solo titular grande, separados por un punto rojo, y una foto a la derecha.
 * Sin descripciones, sin enlaces y sin movimiento. La foto es de archivo del propio estudio (un proyecto):
 * se puede cambiar por otra en SERVICES_PHOTO.
 */
const SERVICES_PHOTO = {
  src: "/brand/bruma.webp",
  alt: "Concepto de hotel frente al mar: piedra clara, piscina verde y una cortina de lino al viento",
};

export function ServicesShowcase() {
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
          <a className="case-link studio-case-link services-edit__cta reveal" href="/estudio">
            {"Conoce más sobre nosotras "}
            <Arrow />
          </a>
        </div>
        <figure className="services-edit__photo reveal">
          <img src={SERVICES_PHOTO.src} alt={SERVICES_PHOTO.alt} width="900" height="1125" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
