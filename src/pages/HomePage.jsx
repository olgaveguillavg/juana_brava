import { Arrow } from "../components/Arrow.jsx";
import { FeaturedWork } from "../components/FeaturedWork.jsx";
import { ProjectSheet } from "../components/ProjectSheet.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { services } from "../data/projects.js";

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
          <a className="hero-link" href="#trabajo">
            <span>
              EXPLORAR
              <br />
              EL TRABAJO
            </span>
          </a>
          <div className="hero-copy">
            <h1 id="intro-title">Diseñamos lo que una marca cuenta y cómo se ve.</h1>
            <span className="hero-place">BARCELONA 2026</span>
          </div>
        </section>
        <FeaturedWork />
        <section className="services wrap" id="servicios" aria-labelledby="services-title">
          <div className="section-top reveal">
            <h2 id="services-title">Qué hacemos.</h2>
            <p>
              De la idea a su puesta en marcha.
              <br />
              Diseño, contenido y tecnología en el mismo equipo.
            </p>
          </div>
          <div className="services-grid">
            {services.map((t, e) => (
              <article key={t.name} className="service reveal">
                <h3>{t.name}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="studio wrap" id="estudio" aria-labelledby="studio-title">
          <div className="studio-art reveal">
            <img
              src="/brand/patrona-clean.svg"
              alt="Ilustración original de la patrona de Juana Brava"
              width="757"
              height="681"
              loading="lazy"
            />
            <span>JUANA BRAVA / ESTUDIO INDEPENDIENTE</span>
          </div>
          <div className="studio-copy reveal">
            <h2 id="studio-title">Cómo trabajamos.</h2>
            <p>
              Trabajamos juntas desde la primera idea hasta que sale al mundo. Unimos diseño digital, dirección visual,
              estrategia editorial y producción audiovisual.
            </p>
            <div className="people">
              <div>
                <h3>Olga Veguilla</h3>
                <p>Diseño digital y dirección visual.</p>
              </div>
              <div>
                <h3>Saray Cruz</h3>
                <p>Estrategia editorial y contenido.</p>
              </div>
            </div>
            <p className="studio-approach">
              La IA amplía nuestras herramientas.
              <br />
              La dirección creativa la ponemos nosotras.
            </p>
            <a href="/estudio" className="case-link studio-case-link">
              {"Conoce el estudio "}
              <Arrow />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ProjectSheet />
    </>
  );
}
