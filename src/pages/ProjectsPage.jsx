import { ProjectArchive } from "../components/ProjectArchive.jsx";
import { SlideText } from "../components/SlideText.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";

export function ProjectsPage() {
  return (
    <>
      <main id="contenido" className="archive-page wrap">
        <section className="archive-intro archive-intro-editorial">
          <h1>
            <SlideText>Proyectos</SlideText>
          </h1>
        </section>
        <ProjectArchive />
      </main>
      <SiteFooter />
    </>
  );
}
