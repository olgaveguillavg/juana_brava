import { Arrow } from "./Arrow.jsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  // Al abrir o cerrar el menú la cabecera pasa de moverse con la página a quedarse fija arriba (y al
  // revés). Si la página estaba un poco bajada, el logo daba un salto: ahora se desliza hasta su sitio.
  let headerRef = useRef(null),
    lastTop = useRef(null);
  let toggle = () => {
    lastTop.current = headerRef.current?.getBoundingClientRect().top ?? null;
    l(!a);
  };
  useLayoutEffect(() => {
    let el = headerRef.current;
    if (!el || lastTop.current === null) return;
    let delta = lastTop.current - el.getBoundingClientRect().top;
    lastTop.current = null;
    if (Math.abs(delta) < 1 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate([{ transform: `translateY(${delta}px)` }, { transform: "none" }], {
      duration: 450,
      easing: "cubic-bezier(.2,.7,.2,1)",
    });
  }, [a]);
  let i = [
      ["Proyectos", "/proyectos"],
      ["Estudio", "/estudio"],
      ["Ideas", "/ideas"],
      ["Contacto", "/contacto"],
    ],
    u = (o, c) => e === o && c;
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header ref={headerRef} id="inicio" className={"site-header header-" + t + (a ? " menu-is-open" : "")}>
        <a href="/" className="brand" aria-label="Juana Brava, inicio">
          <img src="/brand/logo-horizontal-clean.svg" alt="Juana Brava, agencia creativa" width="1901" height="728" />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {[["Inicio", "/"], ...i.slice(0, 3)].map(([o, c]) => (
            <a
              key={c}
              href={c}
              data-active={
                u("home", c === "/") || u("projects", c === "/proyectos") || u("studio", c === "/estudio") || u("thinking", c === "/ideas")
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
          onClick={toggle}
        >
          <span />
          <span />
        </button>
      </header>
      <nav id="mobile-nav" className={"mobile-nav" + (a ? " is-open" : "")} aria-label="Navegación móvil" inert={!a}>
        {[["Inicio", "/"], ...i].map(([o, c]) => (
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
