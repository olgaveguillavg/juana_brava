import { FeaturedWork } from "../components/FeaturedWork.jsx";
import { HomeObjective } from "../components/HomeObjective.jsx";
import { HomeTeam } from "../components/HomeTeam.jsx";
import { ProjectSheet } from "../components/ProjectSheet.jsx";
import { ServicesShowcase } from "../components/ServicesShowcase.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";

/*
 * Orden de la portada (inspirado en anonima.es):
 * lema → nuestro objetivo → qué hacemos → casos de éxito → quiénes somos → cierre (pie rojo).
 */
export function HomePage() {
  return (
    <>
      <main id="contenido">
        <section className="hero" aria-label="El universo visual de Juana Brava">
          <img
            className="hero-image"
            src="/brand/hero.png"
            alt="Campaña conceptual de Juana Brava: gafas rojas, chaqueta roja y blanca y cielo azul"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <h1 id="intro-title">Diseñamos lo que una marca cuenta y cómo se ve.</h1>
            <span className="hero-place">BARCELONA 2026</span>
          </div>
        </section>
        <HomeObjective />
        <ServicesShowcase />
        <FeaturedWork />
        <HomeTeam />
      </main>
      <SiteFooter />
      <ProjectSheet />
    </>
  );
}
