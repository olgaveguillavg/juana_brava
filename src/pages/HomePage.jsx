import { HomeObjective } from "../components/HomeObjective.jsx";
import { HomeTeam } from "../components/HomeTeam.jsx";
import { ServicesShowcase } from "../components/ServicesShowcase.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { WorkSelection } from "../components/WorkSelection.jsx";

/*
 * Orden de la portada (inspirado en anonima.es):
 * portada → manifiesto (rojo, a pantalla completa) → trabajos → qué hacemos → quiénes somos → cierre (rojo).
 * Cada bloque tiene una composición distinta para que la página no parezca hecha con una sola plantilla.
 */
export function HomePage() {
  return (
    <>
      <main id="contenido">
        <section className="hero" aria-label="El universo visual de Juana Brava">
          <img
            className="hero-image"
            src="/brand/hero.jpg"
            alt="Campaña conceptual de Juana Brava: gafas rojas, chaqueta roja y blanca y cielo azul"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <h1 id="intro-title" className="sr-only">Juana Brava, agencia creativa en Barcelona</h1>
            <p className="hero-sub">
              Agencia creativa en Barcelona. Diseñamos lo que una marca cuenta y cómo se ve.
            </p>
          </div>
        </section>
        <HomeObjective />
        <WorkSelection />
        <ServicesShowcase />
        <HomeTeam />
      </main>
      <SiteFooter />
    </>
  );
}
