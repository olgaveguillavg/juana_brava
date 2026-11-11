import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { JBEditorialOpening } from "./lib/editorialOpening.js";
import { normalizeHref, parseRoute } from "./lib/router.js";
import "./styles/site.css";

const appRoot = document.getElementById("app");

const normalizeAnchorHref = (t) => {
  let e = t.getAttribute("href") || "",
    a = normalizeHref(e, parseRoute(window.location.hash).path);
  a !== e && t.setAttribute("href", a);
};

const anchorObserver = new MutationObserver((t) => {
  for (let e of t) {
    e.type === "attributes" && e.target instanceof HTMLAnchorElement && normalizeAnchorHref(e.target);
    for (let a of e.addedNodes)
      a instanceof HTMLAnchorElement && normalizeAnchorHref(a),
        a instanceof Element && a.querySelectorAll("a[href]").forEach(normalizeAnchorHref);
  }
});

anchorObserver.observe(appRoot, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["href"],
});

"scrollRestoration" in history && (history.scrollRestoration = "manual");

document.addEventListener(
  "click",
  (t) => {
    let e = t.target?.closest?.("a[href]");
    if (!e || e.download || t.button !== 0) return;
    normalizeAnchorHref(e);
    let a = e.getAttribute("href") || "";
    if (!(!a.startsWith("#!") || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey) && a === window.location.hash) {
      t.preventDefault();
      let l = parseRoute(a),
        n = l.section ? document.getElementById(l.section) : null;
      n
        ? n.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          })
        : window.scrollTo({
            top: 0,
            behavior: "instant",
          });
    }
  },
  true,
);
// A single image connects the gallery and the fully prepared project hero.

JBEditorialOpening();

createRoot(appRoot).render(<App />);
