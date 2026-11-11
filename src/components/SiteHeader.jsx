import { Arrow } from "./Arrow.jsx";
import { useEffect, useRef, useState } from "react";

export function SiteHeader({ tone: t = "light", active: e = "" }) {
  let [a, l] = useState(false),
    n = useRef(null);
  useEffect(() => {
    document.body.classList.toggle("navigation-open", a);
    let u = document.querySelector("main");
    u && (u.inert = a), a && document.querySelector("#mobile-nav a")?.focus();
    let c = (o) => {
      o.key === "Escape" && a && (l(false), n.current?.focus());
    };
    return (
      document.addEventListener("keydown", c),
      () => {
        document.body.classList.remove("navigation-open"),
          u && (u.inert = false),
          document.removeEventListener("keydown", c);
      }
    );
  }, [a]);
  let i = [
      ["Proyectos", "/proyectos"],
      ["Estudio", "/estudio"],
      ["Thinking", "/thinking"],
      ["Contacto", "/contacto"],
    ],
    u = (o, c) => e === o && c;
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header id="inicio" className={"site-header header-" + t + (a ? " menu-is-open" : "")}>
        <a href="/" className="brand" aria-label="Juana Brava, inicio">
          <img src="/brand/logo-horizontal-clean.svg" alt="Juana Brava, agencia creativa" width="1901" height="728" />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {[["Home", "/"], ...i.slice(0, 3)].map(([o, c]) => (
            <a
              key={c}
              href={c}
              data-active={
                u("home", c === "/") || u("projects", c === "/proyectos") || u("studio", c === "/estudio") || u("thinking", c === "/thinking")
              }
            >
              {o}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="/contacto" data-active={e === "contact" ? "true" : "false"}>
          Contacto
        </a>
        <button
          ref={n}
          type="button"
          className="menu-toggle"
          aria-label={a ? "Cerrar menú" : "Abrir menú"}
          aria-controls="mobile-nav"
          aria-expanded={a}
          onClick={() => l(!a)}
        >
          <span />
          <span />
        </button>
      </header>
      <nav id="mobile-nav" className={"mobile-nav" + (a ? " is-open" : "")} aria-label="Navegación móvil" inert={!a}>
        {[["Home", "/"], ...i].map(([o, c]) => (
          <a key={c} href={c} onClick={() => l(false)}>
            {o}
          </a>
        ))}
        <span className="menu-foot">
          Ideas sin permiso.
          <br />
          Barcelona.
        </span>
      </nav>
    </>
  );
}
