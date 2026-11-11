import { useState } from "react";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { projects } from "../data/projects.js";

const JB_CONTACT_DETAILS = {
  newBusinessEmail: "",
  phoneNewBusiness: "",
  phoneGeneral: "",
  socials: [
    {
      label: "Instagram",
      url: "",
    },
    {
      label: "LinkedIn",
      url: "",
    },
    {
      label: "Behance",
      url: "",
    },
  ],
};

export function JBContactPage() {
  const [message, setMessage] = useState("");
  function submit(ev) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget),
      name = String(data.get("name") || "").trim(),
      email = String(data.get("email") || "").trim(),
      topic = String(data.get("subject") || "").trim(),
      description = String(data.get("description") || "").trim();
    if (!name || !email || !description) {
      setMessage("Completa tu nombre, correo y mensaje.");
      return;
    }
    const subject = "Nuevo proyecto para Juana Brava — " + (topic || name);
    const body = [
      "JUANA BRAVA / NUEVA CONSULTA",
      "",
      "Nombre: " + name,
      "Email: " + email,
      "Asunto: " + (topic || "Proyecto sin especificar"),
      "",
      "Mensaje:",
      description,
    ].join("\n");
    if (JB_CONTACT_DETAILS.newBusinessEmail) {
      window.location.href =
        "mailto:" +
        JB_CONTACT_DETAILS.newBusinessEmail +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      setMessage("Se ha preparado tu mensaje en la aplicación de correo. Revísalo y envíalo desde allí.");
    } else {
      const blob = new Blob([subject + "\n\n" + body], {
          type: "text/plain;charset=utf-8",
        }),
        url = URL.createObjectURL(blob),
        link = document.createElement("a");
      link.href = url;
      link.download = "Juana-Brava-Consulta.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(
        "Hemos preparado tu mensaje en un archivo de texto. El envío directo estará disponible cuando se configure el correo receptor.",
      );
    }
  }
  function detail(label, value, type) {
    return (
      <div className="jbce-detail">
        <span className="jbce-detail-label">{label}</span>
        {value ? (
          <a href={type === "email" ? "mailto:" + value : "tel:" + value.replace(/[^+\d]/g, "")}>{value}</a>
        ) : (
          <span className="jbce-detail-pending">
            {type === "email" ? "Correo pendiente de configurar" : "Teléfono pendiente de configurar"}
          </span>
        )}
      </div>
    );
  }
  return (
    <>
      <SiteHeader tone="dark" active="contact" />
      <main id="contenido" className="jbce-page">
        <div className="jbce-sheet">
          <div className="jbce-intro">
            <div>
              <span className="jbce-overline">[ Contacto ]</span>
              <h1>Trabajemos juntos.</h1>
            </div>
            <p>
              ¿Tienes una idea, una marca que necesita evolucionar o un proyecto por empezar? Nos encantará escucharte.
            </p>
          </div>
          <section className="jbce-columns" aria-label="Formulario y vías de contacto">
            <div className="jbce-form-column">
              <form className="jbce-form" onSubmit={submit}>
                <div className="jbce-form-row">
                  <label>
                    <span>Nombre *</span>
                    <input
                      name="name"
                      autoComplete="name"
                      type="text"
                      placeholder="Tu nombre"
                      maxLength={100}
                      required
                    />
                  </label>
                  <label>
                    <span>Email *</span>
                    <input
                      name="email"
                      autoComplete="email"
                      type="email"
                      placeholder="tu@email.com"
                      maxLength={254}
                      required
                    />
                  </label>
                </div>
                <label>
                  <span>Asunto</span>
                  <input name="subject" type="text" placeholder="¿Qué tienes en mente?" maxLength={150} />
                </label>
                <label>
                  <span>Mensaje *</span>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Cuéntanos un poco sobre tu idea…"
                    maxLength={5000}
                    required
                  />
                </label>
                <div className="jbce-form-send">
                  <p>
                    {JB_CONTACT_DETAILS.newBusinessEmail
                      ? "* Campos obligatorios. Al continuar se abrirá tu aplicación de correo."
                      : "* Campos obligatorios. El envío directo estará disponible al configurar nuestro correo de contacto."}
                  </p>
                  <button type="submit">
                    {JB_CONTACT_DETAILS.newBusinessEmail ? "Preparar correo" : "Preparar consulta"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
                {message ? (
                  <p className="jbce-status" role="status">
                    {message}
                  </p>
                ) : null}
              </form>
            </div>
            <aside className="jbce-aside">
              <figure className="jbce-aside-photo">
                <img
                  src={projects[0].image}
                  alt="Imagen editorial del universo creativo de Juana Brava"
                  loading="eager"
                />
              </figure>
              <div className="jbce-aside-details">
                {detail("New Business · Email", JB_CONTACT_DETAILS.newBusinessEmail, "email")}
                {detail("Teléfono · New Business", JB_CONTACT_DETAILS.phoneNewBusiness, "tel")}
                {detail("Teléfono · Contacto", JB_CONTACT_DETAILS.phoneGeneral, "tel")}
                <div className="jbce-detail jbce-social">
                  <span className="jbce-detail-label">Social</span>
                  <div className="jbce-social-links">
                    {JB_CONTACT_DETAILS.socials.map((s) =>
                      s.url ? (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      ) : (
                        <span key={s.label} className="jbce-social-pending">
                          {s.label}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </section>
          <section className="jbce-visual-end" aria-label="Universo visual de Juana Brava">
            <div className="jbce-endline">
              <span>Ideas sin permiso.</span>
              <span>Juana Brava / Estudio creativo</span>
            </div>
            <div className="jbce-panorama">
              <img
                src="/brand/hero.png"
                alt="Imagen editorial de Juana Brava con estilismo rojo y cielo azul"
                loading="lazy"
              />
            </div>
          </section>
          <footer className="jbce-footer">
            <a href="/" className="jbce-footer-logo" aria-label="Juana Brava, volver al inicio">
              <img src="/brand/logo-horizontal-clean.svg" alt="Juana Brava" loading="lazy" />
            </a>
            <div className="jbce-footer-meta">
              <span>© 2026 JUANA BRAVA</span>
              <nav aria-label="Navegación de pie de página">
                <a href="/">Inicio</a>
                <a href="/proyectos">Proyectos</a>
                <a href="/estudio">Estudio</a>
                <a href="/thinking">Thinking</a>
                <a href="/contacto">Contacto</a>
              </nav>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
