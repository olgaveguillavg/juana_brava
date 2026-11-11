import { useRef } from "react";
import { projects } from "../data/projects.js";
import {
  PortfolioFlight,
  arcCardImages,
  clearPortfolioFlight,
  isPlainLeftClick,
  readPortfolioFlight,
} from "../lib/portfolioFlight.js";
import { useRouter } from "../lib/router.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";

export function PortfolioTransitions() {
  let t = useRouter(),
    e = useRef(t);
  return (
    (e.current = t),
    useIsomorphicLayoutEffect(() => {
      let a = null,
        l = false,
        n = [],
        i = matchMedia("(prefers-reduced-motion: reduce)"),
        u = typeof HTMLElement.prototype.animate == "function",
        c = () =>
          e.current.push("/proyectos", {
            scroll: true,
          }),
        o = () => {
          if (!l) {
            l = true;
            try {
              Promise.resolve(e.current.prefetch("/proyectos")).catch(() => {});
            } catch {}
            for (let s of projects) {
              let r = new Image();
              (r.src = s.image), n.push(r);
            }
          }
        },
        f = (s, r) => {
          (a = s),
            r
              .catch(() => s.cancel())
              .finally(() => {
                a === s && (a = null);
              });
        },
        p = (s) => {
          let r = s.target?.closest?.("a.arc-more-projects");
          if (!r || !isPlainLeftClick(s) || r.target === "_blank" || r.hasAttribute("download")) return;
          if (a) {
            s.preventDefault();
            return;
          }
          if (i.matches || !u) return;
          let h = arcCardImages();
          if (!h.length) return;
          s.preventDefault();
          globalThis.JB_ARCHIVE_PREFS = {
            view: "grid",
            filter: "all",
            preview: projects[0].slug,
          };
          o();
          let g = r.getBoundingClientRect(),
            O = new PortfolioFlight(c, r.getAttribute("href") || "/proyectos", {
              x: g.left + 12,
              y: g.top + g.height / 2,
            });
          f(O, O.run(h));
        },
        v = (s) => {
          s.target?.closest?.("a.arc-more-projects") && o();
        },
        d = (s) => {
          s.key === "Escape" && a && (s.preventDefault(), a.skip());
        },
        m = () => a?.resized(),
        S = () => {
          (location.hash.startsWith("#!") ? location.hash.slice(2).split("?")[0] : location.pathname).replace(
            /\/$/,
            "",
          ) !== "/proyectos" && (a?.cancel(), (a = null));
        },
        A = () => {
          i.matches && a?.skip();
        },
        N = readPortfolioFlight();
      if (N && !i.matches && u && document.querySelector(".archive-grid")) {
        let s = new PortfolioFlight(c, "/proyectos", {
          x: N.x * window.innerWidth,
          y: N.y * window.innerHeight,
        });
        f(s, s.resume());
      } else clearPortfolioFlight(), delete document.documentElement.dataset.projectTransition;
      return (
        document.addEventListener("click", p),
        document.addEventListener("pointerover", v, {
          passive: true,
        }),
        document.addEventListener("focusin", v),
        document.addEventListener("keydown", d),
        window.addEventListener("resize", m),
        window.addEventListener("popstate", S),
        i.addEventListener("change", A),
        () => {
          a?.dispose(),
            (a = null),
            (n.length = 0),
            document.removeEventListener("click", p),
            document.removeEventListener("pointerover", v),
            document.removeEventListener("focusin", v),
            document.removeEventListener("keydown", d),
            window.removeEventListener("resize", m),
            window.removeEventListener("popstate", S),
            i.removeEventListener("change", A);
        }
      );
    }, []),
    null
  );
}
