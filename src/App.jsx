import { useEffect } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import Project from "./pages/Project.jsx";
import Estudio from "./pages/Estudio.jsx";
import Thinking from "./pages/Thinking.jsx";
import Contacto from "./pages/Contacto.jsx";
import { projectBySlug } from "./data/content.js";
import { useRoute } from "./lib/route.js";
import { useReveal } from "./lib/useReveal.js";

// Tono del encabezado (claro sobre fotografía, oscuro sobre fondo blanco).
const PAGES = [
  { match: (path) => path === "/", title: "Juana Brava — Ideas sin permiso", tone: "light", footer: true, render: () => <Home /> },
  { match: (path) => path === "/proyectos", title: "Proyectos — Juana Brava", tone: "dark", footer: true, render: () => <Archive /> },
  { match: (path) => path === "/estudio", title: "Estudio — Juana Brava", tone: "light", footer: true, render: () => <Estudio /> },
  { match: (path) => path === "/thinking", title: "Thinking — Juana Brava", tone: "dark", footer: false, render: () => <Thinking /> },
  { match: (path) => path === "/contacto", title: "Contacto — Juana Brava", tone: "dark", footer: true, render: () => <Contacto /> },
];

function resolvePage(path) {
  const slug = path.match(/^\/proyectos\/([a-z0-9-]+)$/)?.[1];
  const project = slug && projectBySlug(slug);
  if (project) {
    return {
      title: `${project.name} — Juana Brava`,
      tone: "light",
      footer: true,
      render: () => <Project project={project} />,
    };
  }
  return PAGES.find((page) => page.match(path)) ?? PAGES[0];
}

export default function App() {
  const route = useRoute();
  const page = resolvePage(route.path);
  const section = route.params.get("section");

  useEffect(() => {
    document.title = page.title;
  }, [page.title]);

  // Al cambiar de página vuelve arriba; con ?section=… baja hasta esa sección.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = section && document.getElementById(section);
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [route.path, section]);

  useReveal([route.path]);

  return (
    <>
      <a className="skip-link" href={`#!${route.path}?section=contenido`}>
        Saltar al contenido
      </a>
      <SiteHeader tone={page.tone} path={route.path} />
      {page.render()}
      {page.footer && <SiteFooter />}
    </>
  );
}
