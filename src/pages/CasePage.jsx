import { CaseExperience } from "../components/CaseExperience.jsx";
import { CaseDecisions, CaseReturn, CaseStory, NextCase } from "../components/CaseSections.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { findProject, projectTypeLabel } from "../data/projects.js";
import { notFound } from "../lib/router.js";

export function CasePage({ params: t }) {
  let e = findProject(t.slug);
  e || notFound();
  let l = [e.sector, e.discipline].filter(Boolean).join(" / ").toUpperCase();
  return (
    <>
      <main id="contenido" className={"case-page case-" + e.slug}>
        {/* En móvil esta cabecera se coloca como una nota de Ideas (ver site.css); en escritorio, foto a pantalla completa. */}
        <section className="case-hero case-hero-editorial" aria-labelledby="case-hero-title">
          <img className="case-hero-image" src={e.image} alt={e.alt} loading="eager" fetchPriority="high" />
          <div className="case-hero-shade" aria-hidden="true" />
          <CaseReturn />
          <div className="case-hero-content wrap">
            <div className="case-hero-editorial-layout">
              <div className="case-hero-title-block">
                <h1 id="case-hero-title" tabIndex={-1}>
                  <SlideText>{e.name}</SlideText>
                </h1>
              </div>
              <div className="case-hero-side">
                <span className="case-hero-focus-label">{projectTypeLabel(e)}</span>
                <p className="case-hero-focus">{l}</p>
                <p className="case-hero-lead">{e.lead}</p>
              </div>
            </div>
          </div>
        </section>
        <CaseStory project={e} />
        <CaseDecisions project={e} note="Qué da sentido a la propuesta" />
        <figure className="case-campaign">
          <img src={e.wide} alt={e.alt} width="1900" height="760" loading="lazy" />
        </figure>
        <CaseExperience project={e} />
        <NextCase project={e} />
      </main>
      <SiteFooter />
    </>
  );
}
