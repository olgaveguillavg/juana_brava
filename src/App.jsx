import { Fragment, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { PortfolioTransitions } from "./components/PortfolioTransitions.jsx";
import { RevealMotion } from "./components/RevealMotion.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { projects } from "./data/projects.js";
import { parseRoute } from "./lib/router.js";
import { CasePage } from "./pages/CasePage.jsx";
import { JBContactPage } from "./pages/ContactPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";
import { JBStudioPage } from "./pages/StudioPage.jsx";
import { JBThinkingPage } from "./pages/ThinkingPage.jsx";

const PAGE_TITLES = {
  "/proyectos": "Proyectos — Juana Brava",
  "/thinking": "Thinking — Juana Brava",
  "/estudio": "Estudio — Juana Brava",
  "/contacto": "Contacto — Juana Brava",
};

// La cabecera es única y permanente: cambia de color y de enlace activo, pero nunca se vuelve a montar
// ni se anima al cambiar de página (como en basicagency.com).
function headerFor(path) {
  if (path === "/") return { tone: "light", active: "" };
  if (path === "/estudio") return { tone: "dark", active: "studio" };
  if (path === "/thinking") return { tone: "light", active: "thinking" };
  if (path === "/contacto") return { tone: "dark", active: "contact" };
  if (path === "/proyectos" || path.startsWith("/proyectos/")) return { tone: "dark", active: "projects" };
  return { tone: "dark", active: "" };
}

function scrollToRoute(route, animated) {
  const target = route.section ? document.getElementById(route.section) : null;
  if (target) {
    target.scrollIntoView({ block: "start", behavior: animated ? "smooth" : "instant" });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

export function App({ initialRoute }) {
  const [route, setRoute] = useState(() => initialRoute ?? parseRoute(window.location.hash));
  const current = useRef(route);
  current.current = route;
  const shown = useRef(null); // ruta cuya posición de scroll ya está aplicada

  useEffect(() => {
    const onHashChange = () => {
      const next = parseRoute(window.location.hash);
      const previous = current.current;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const samePage = next.path === previous.path;

      /* Do not interfere with the unique photo-flight and project-opening animations. */
      const special = !!(
        document.documentElement.dataset.projectTransition || document.documentElement.dataset.caseOpening
      );
      if (!special && !reduced && !samePage) {
        if (next.path === "/proyectos" && previous.path.startsWith("/proyectos/")) {
          window.JBHistoryZoomOut?.(previous.path);
        } else if (previous.path === "/proyectos" && next.path.startsWith("/proyectos/")) {
          window.JBHistoryZoomIn?.(next.path);
        }
      }

      // El contenido cambia al instante; la entrada (titulares, fundidos) la resuelve el CSS.
      flushSync(() => setRoute(next));
      scrollToRoute(next, samePage && !reduced);
      shown.current = next;
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const project = projects.find((item) => route.path === "/proyectos/" + item.slug);
    document.title = project
      ? project.name + " — Juana Brava"
      : (PAGE_TITLES[route.path] ?? "Juana Brava — Ideas sin permiso");

    // Carga inicial con #!/…?section=…: coloca la página en su sección.
    if (shown.current === null) {
      const frame = requestAnimationFrame(() => scrollToRoute(route, false));
      shown.current = route;
      return () => cancelAnimationFrame(frame);
    }
  }, [route.path, route.section]);

  const project = projects.find((item) => route.path === "/proyectos/" + item.slug);
  const page =
    route.path === "/" ? (
      <HomePage />
    ) : route.path === "/proyectos" ? (
      <ProjectsPage />
    ) : route.path === "/thinking" ? (
      <JBThinkingPage />
    ) : route.path === "/estudio" ? (
      <JBStudioPage />
    ) : route.path === "/contacto" ? (
      <JBContactPage />
    ) : project ? (
      <CasePage params={{ slug: project.slug }} />
    ) : (
      <>
        <main className="archive-page wrap" id="contenido">
          <h1>Esta página no existe.</h1>
          <a className="all-work-link" href="/proyectos">
            Explorar los proyectos ↗
          </a>
        </main>
        <SiteFooter />
      </>
    );

  return (
    <>
      <SiteHeader {...headerFor(route.path)} />
      <Fragment key={route.path}>{page}</Fragment>
      <RevealMotion key={route.path + "-motion"} />
      <PortfolioTransitions />
    </>
  );
}
