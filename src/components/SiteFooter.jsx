export default function SiteFooter() {
  return (
    <footer className="footer" id="contacto">
      <div className="wrap">
        <div className="footer-main">
          <a className="footer-brand" href="#!/" aria-label="Juana Brava, inicio">
            <img alt="Juana Brava" width="1569" height="1836" loading="lazy" src="/brand/logo-integrado-clean.svg" />
          </a>
          <div className="footer-contact">
            <h2>
              ¿Tienes algo en mente?
              <br />
              Démosle forma.
            </h2>
            <a className="outline-link" href="#!/contacto">
              Cuéntanos tu proyecto <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 JUANA BRAVA</span>
          <a href="#!/proyectos">Explorar proyectos ↗</a>
          <a href="#!/?section=inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
