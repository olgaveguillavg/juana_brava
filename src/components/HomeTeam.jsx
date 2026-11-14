import { Arrow } from "./Arrow.jsx";

/*
 * Portada: quiénes somos (a la manera del «Leader team» de anonima.es): una frase de presentación y una
 * ficha por persona con imagen, nombre, especialidad y una línea sobre su forma de trabajar.
 * Las imágenes son las mismas conceptuales que usa Estudio, hasta tener retratos reales.
 */
const TEAM = [
  {
    name: "Olga Veguilla",
    role: "Diseño digital y dirección visual",
    text: "Ideas que se construyen desde lo visual, con atención al concepto y al detalle.",
    image: "/brand/umbral.webp",
    alt: "Arquitectura de tonos cálidos; imagen conceptual del universo visual del estudio",
  },
  {
    name: "Saray Cruz",
    role: "Estrategia editorial y contenido",
    text: "Encontrar la historia, darle estructura y llevarla a formatos que conecten con las personas.",
    image: "/brand/bruma.webp",
    alt: "Arquitectura mediterránea y mar; imagen conceptual del universo visual del estudio",
  },
];

export function HomeTeam() {
  return (
    <section className="home-team wrap" id="equipo" aria-labelledby="team-title">
      <div className="home-team__top">
        <h2 id="team-title" className="reveal">
          Quiénes somos
        </h2>
        <p className="home-team__lead reveal">
          Somos Olga y Saray. Dos miradas complementarias que encuentran sentido en juntar lo visual, lo digital y
          las buenas historias.
        </p>
      </div>
      <ul className="home-team__list">
        {TEAM.map((p) => (
          <li key={p.name} className="home-team__person reveal">
            <h3>{p.name}</h3>
            <figure>
              <img src={p.image} alt={p.alt} loading="lazy" />
            </figure>
            <p className="home-team__role">{p.role}</p>
            <p className="home-team__text">{p.text}</p>
          </li>
        ))}
      </ul>
      <a className="case-link studio-case-link home-team__cta reveal" href="/estudio">
        {"Conoce más sobre nosotras "}
        <Arrow />
      </a>
    </section>
  );
}
