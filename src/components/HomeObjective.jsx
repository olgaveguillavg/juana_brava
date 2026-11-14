/*
 * Portada, justo después del lema: el objetivo del estudio (a la manera de anonima.es, donde el titular
 * va seguido de «Nuestro objetivo es…»). Una frase de intención y tres objetivos con el punto rojo de la
 * marca, sin números.
 */
const GOALS = [
  { title: "Que se entienda", text: "Una idea clara de quién eres y qué ofreces, contada sin rodeos." },
  { title: "Que se recuerde", text: "Una imagen propia y coherente en cada formato, del logo a la pantalla." },
  { title: "Que se elija", text: "Una presencia digital que convierte el interés en clientes." },
];

export function HomeObjective() {
  return (
    <section className="home-goal wrap" id="objetivo" aria-labelledby="goal-title">
      <div className="home-goal__top">
        <h2 id="goal-title" className="reveal">
          Nuestro objetivo
        </h2>
        <p className="home-goal__lead reveal">
          Que tu marca se entienda, se recuerde y se elija. Trabajamos la idea, la imagen y la presencia digital
          como una sola cosa, para que cada pieza sume en la misma dirección.
        </p>
      </div>
      <ul className="home-goal__list">
        {GOALS.map((g) => (
          <li key={g.title} className="reveal">
            <span className="home-goal__dot" aria-hidden="true" />
            <h3>{g.title}</h3>
            <p>{g.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
