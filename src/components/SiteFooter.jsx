import { Arrow } from "./Arrow.jsx";
import { useRef, useState } from "react";
import { services } from "../data/projects.js";

export function SiteFooter() {
  let t = useRef(null),
    [e, a] = useState(false);
  function l(n) {
    n.preventDefault();
    let i = new FormData(n.currentTarget),
      u = String(i.get("name") ?? "").trim(),
      c = String(i.get("message") ?? "").trim();
    if (!u || !c) return;
    let o = ["JUANA BRAVA / BRIEFING", "Nombre o marca", u, "Tipo de proyecto", String(i.get("service")), "La idea", c]
        .join(`

`),
      f = URL.createObjectURL(
        new Blob([o], {
          type: "text/plain;charset=utf-8",
        }),
      ),
      p = document.createElement("a");
    (p.href = f),
      (p.download = "Juana-Brava-briefing.txt"),
      p.click(),
      setTimeout(() => URL.revokeObjectURL(f), 1e3),
      a(true);
  }
  return (
    <>
      <footer className="footer" id="contacto">
        <div className="wrap">
          <div className="footer-main">
            <a className="footer-brand" href="/" aria-label="Juana Brava, inicio">
              <img src="/brand/logo-integrado-clean.svg" alt="Juana Brava" width="1569" height="1836" loading="lazy" />
            </a>
            <div className="footer-contact">
              <h2>
                ¿Tienes algo en mente?
                <br />
                Démosle forma.
              </h2>
              <a className="outline-link" href="/contacto">
                {"Cuéntanos tu proyecto "}
                <Arrow />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 JUANA BRAVA</span>
            <a href="#inicio">Volver arriba{" "}<Arrow dir="n" /></a>
          </div>
        </div>
      </footer>
      <dialog
        ref={t}
        className="brief-dialog"
        aria-labelledby="brief-title"
        onClick={(n) => {
          n.target === n.currentTarget && t.current?.close();
        }}
      >
        <div className="dialog-bar">
          <span>JUANA BRAVA / BRIEFING</span>
          <button
            className="close-dialog"
            type="button"
            aria-label="Cerrar briefing"
            onClick={() => t.current?.close()}
          >
            ×
          </button>
        </div>
        <div className="brief-inner">
          <h2 id="brief-title">Empecemos por tu idea.</h2>
          <p>
            Prepara un resumen para descargar y compartir con nosotras. Este formulario no lo envía automáticamente.
          </p>
          <form onSubmit={l}>
            <label htmlFor="brief-name">Tu nombre o marca</label>
            <input id="brief-name" name="name" required maxLength={100} autoComplete="organization" />
            <label htmlFor="brief-service">¿Qué tienes en mente?</label>
            <select id="brief-service" name="service" required defaultValue="">
              <option value="" disabled>
                Selecciona una opción
              </option>
              {services.map((n) => (
                <option key={n.name}>{n.name}</option>
              ))}
              <option>Un proyecto que combina varias cosas</option>
            </select>
            <label htmlFor="brief-message">Cuéntanos un poco más</label>
            <textarea
              id="brief-message"
              name="message"
              rows={5}
              required
              maxLength={3e3}
              placeholder="Qué quieres hacer y qué te gustaría conseguir…"
            />
            <button className="solid-link" type="submit">
              {"Descargar briefing "}
              <Arrow dir="s" />
            </button>
            <p className="brief-status" role="status">
              {e ? "Briefing preparado. Puedes compartir el archivo con nosotras." : ""}
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
