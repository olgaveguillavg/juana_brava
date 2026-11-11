import { ArcWheel } from "./ArcWheel.jsx";
import { featuredProjects, projectPath, projects } from "../data/projects.js";

const wheelItems = featuredProjects.map((t) => ({
  id: t.slug,
  src: t.image,
  alt: t.alt,
  title: t.name,
  sector: t.sector,
  description: t.lead,
  meta: t.discipline + " · 2026",
  href: projectPath(t),
}));

export function FeaturedWork() {
  return (
    <section className="featured-work arc-featured" id="trabajo" aria-labelledby="featured-title">
      <ArcWheel items={wheelItems} archiveCount={projects.length} ariaLabel="Rueda de siete proyectos de Juana Brava" />
    </section>
  );
}
