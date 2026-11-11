import { useEffect, useState } from "react";

const NAV = [
  { href: "#!/proyectos", label: "Proyectos", match: "/proyectos" },
  { href: "#!/estudio", label: "Estudio", match: "/estudio" },
  { href: "#!/thinking", label: "Thinking", match: "/thinking" },
];

export default function SiteHeader({ tone, path }) {
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil al cambiar de página.
  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.classList.toggle("navigation-open", open);
    return () => document.body.classList.remove("navigation-open");
  }, [open]);

  const isActive = (match) => path === match || path.startsWith(match + "/");

  return (
    <>
      <header
        id="inicio"
        className={`site-header header-${tone}${open ? " menu-is-open" : ""}`}
      >
        <a href="#!/" className="brand" aria-label="Juana Brava, inicio">
          <img
            alt="Juana Brava, agencia creativa"
            width="1901"
            height="728"
            src="/brand/logo-horizontal-clean.svg"
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} data-active={isActive(item.match) ? "true" : "false"}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href="#!/contacto">
          Contacto <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Navegación móvil"
        inert={!open}
      >
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="#!/contacto">Contacto</a>
        <span className="menu-foot">
          Ideas sin permiso.
          <br />
          Barcelona.
        </span>
      </nav>
    </>
  );
}
