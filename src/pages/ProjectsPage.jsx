import { ProjectArchive } from "../components/ProjectArchive.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

export function ProjectsPage() {
  return (
    <>
      <SiteHeader tone="dark" active="projects" />
      <main id="contenido" className="archive-page wrap">
        <section className="archive-intro archive-intro-editorial">
          <h1>Proyectos</h1>
        </section>
        <ProjectArchive />
      </main>
      <SiteFooter />
    </>
  );
}
