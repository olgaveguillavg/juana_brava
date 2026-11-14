import { Arrow } from "./Arrow.jsx";

/*
 * Portada: quiénes somos. Una presentación grande en primera persona y una ficha por persona con imagen,
 * nombre, especialidad y una línea sobre lo que hace.
 * Las imágenes son las mismas conceptuales que usa Estudio, hasta tener retratos reales.
 */
const TEAM = [
  {
    name: "Olga Veguilla",
    role: "Diseño digital y dirección visual",
    text: "Da forma visual a las ideas: identidad, dirección de arte y webs que se reconocen de un vistazo.",
    image: "/brand/umbral.webp",
    alt: "Arquitectura de tonos cálidos; imagen conceptual del universo visual del estudio",
  },
  {
    name: "Saray Cruz",
    role: "Estrategia editorial y contenido",
    text: "Busca la historia que tiene cada marca, la ordena y la lleva a los formatos donde la gente la va a leer.",
    image: "/brand/bruma.webp",
    alt: "Arquitectura mediterránea y mar; imagen conceptual del universo visual del estudio",
  },
];

export function HomeTeam() {
  return (
    <section className="home-team wrap" id="equipo" aria-labelledby="team-title">
      {/* Presentación en primera persona, a todo el ancho (no el esquema «título a un lado, texto al otro»). */}
      <h2 id="team-title" className="home-team__title reveal">
        Somos Olga y Saray.
      </h2>
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
