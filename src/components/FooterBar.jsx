import { Arrow } from "./Arrow.jsx";

const LINKS = [
  ["Inicio", "/"],
  ["Proyectos", "/proyectos"],
  ["Estudio", "/estudio"],
  ["Ideas", "/ideas"],
  ["Contacto", "/contacto"],
];

function currentPath() {
  if (typeof window === "undefined") return "/";
  const match = window.location.hash.match(/^#!([^?]*)/);
  return (match && match[1].replace(/\/+$/, "")) || "/";
}

/*
 * Barra inferior común a todas las páginas: copyright, navegación y «Volver arriba».
 * Toma el color del bloque en el que está (blanco sobre rojo u oscuro, tinta sobre blanco).
 */
export function FooterBar() {
  const path = currentPath();
  const isCurrent = (href) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
  return (
    <div className="footer-bar">
      <span className="footer-bar__copy">© 2026 JUANA BRAVA</span>
      <nav className="footer-bar__nav" aria-label="Navegación de pie de página">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined}>
            {label}
          </a>
        ))}
      </nav>
      <a className="footer-bar__top" href="#inicio">
        {"Volver arriba "}
        <Arrow dir="n" />
      </a>
    </div>
  );
}
