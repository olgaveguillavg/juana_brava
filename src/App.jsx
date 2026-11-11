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

export function App({ initialRoute: t }) {
  let [e, a] = useState(() => t ?? parseRoute(window.location.hash)),
    l = useRef(e);
  (l.current = e),
    useEffect(() => {
      let u = () => {
        let c = parseRoute(window.location.hash),
          prev = l.current,
          o = () => {
            flushSync(() => a(c));
            let f = c.section ? document.getElementById(c.section) : null;
            f
              ? f.scrollIntoView({
                  block: "start",
                  behavior: "instant",
                })
              : window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
          };
        /* Do not interfere with the unique photo-flight and project-opening animations. */
        let special = !!(
            document.documentElement.dataset.projectTransition || document.documentElement.dataset.caseOpening
          ),
          reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        let changed = c.path !== prev.path || c.section !== prev.section;
        if (!changed) {
          o();
          return;
        }
        if (!special && !reduce) {
          const historyZoom =
            c.path === "/proyectos" && prev.path.startsWith("/proyectos/")
              ? window.JBHistoryZoomOut?.(prev.path)
              : prev.path === "/proyectos" && c.path.startsWith("/proyectos/")
                ? window.JBHistoryZoomIn?.(c.path)
                : false;
          if (historyZoom) {
            o();
            return;
          }
        }
        if (special || reduce || typeof document.startViewTransition !== "function") {
          o();
          return;
        }
        let root = document.documentElement,
          kind =
            c.path === "/" && !c.section
              ? "home"
              : c.path === "/estudio"
                ? "studio-in"
                : prev.path === "/estudio"
                  ? "studio-out"
                  : c.path === prev.path
                    ? "section"
                    : "page";
        let prior = window.__JB_ROUTE_VT__;
        if (prior)
          try {
            prior.skipTransition();
          } catch {}
        root.dataset.jbRouteTransition = kind;
        root.dataset.jbInternalNav = "";
        let vt;
        try {
          vt = document.startViewTransition(o);
          window.__JB_ROUTE_VT__ = vt;
          vt.finished
            .catch(() => {})
            .finally(() => {
              if (window.__JB_ROUTE_VT__ === vt) {
                delete root.dataset.jbRouteTransition;
                window.__JB_ROUTE_VT__ = null;
              }
            });
        } catch (err) {
          delete root.dataset.jbRouteTransition;
          o();
        }
      };
      return window.addEventListener("hashchange", u), () => window.removeEventListener("hashchange", u);
    }, []),
    useEffect(() => {
      let u = projects.find((o) => e.path === "/proyectos/" + o.slug);
      document.title = u
        ? u.name + " — Juana Brava"
        : e.path === "/proyectos"
          ? "Proyectos — Juana Brava"
          : e.path === "/thinking"
            ? "Thinking — Juana Brava"
            : e.path === "/estudio"
              ? "Estudio — Juana Brava"
              : e.path === "/contacto"
                ? "Contacto — Juana Brava"
                : "Juana Brava — Ideas sin permiso";
      let c = requestAnimationFrame(() => {
        if (document.documentElement.dataset.jbRouteTransition) return;
        let o = e.section ? document.getElementById(e.section) : null;
        o
          ? o.scrollIntoView({
              block: "start",
              behavior: "instant",
            })
          : window.scrollTo({
              top: 0,
              behavior: "instant",
            });
      });
      return () => cancelAnimationFrame(c);
    }, [e.path, e.section]);
  let n = projects.find((u) => e.path === "/proyectos/" + u.slug),
    i =
      e.path === "/" ? (
        <HomePage />
      ) : e.path === "/proyectos" ? (
        <ProjectsPage />
      ) : e.path === "/thinking" ? (
        <JBThinkingPage />
      ) : e.path === "/estudio" ? (
        <JBStudioPage />
      ) : e.path === "/contacto" ? (
        <JBContactPage />
      ) : n ? (
        <CasePage
          params={{
            slug: n.slug,
          }}
        />
      ) : (
        <>
          <SiteHeader tone="dark" />
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
      <Fragment key={e.path}>{i}</Fragment>
      <RevealMotion key={e.path + "-motion"} />
      <PortfolioTransitions />
    </>
  );
}
