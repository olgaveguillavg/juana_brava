import { useState } from "react";

const EMPTY = { name: "", email: "", subject: "", description: "" };

export default function Contacto() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("");

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  // De momento no se envía nada: el correo de contacto aún no está configurado.
  const onSubmit = (event) => {
    event.preventDefault();
    setStatus("Consulta preparada. El envío directo estará disponible al configurar nuestro correo de contacto.");
  };

  return (
    <main id="contenido" className="jbce-page">
      <div className="jbce-sheet">
        <div className="jbce-intro">
          <div>
            <span className="jbce-overline">[ Contacto ]</span>
            <h1>Trabajemos juntos.</h1>
          </div>
          <p>¿Tienes una idea, una marca que necesita evolucionar o un proyecto por empezar? Nos encantará escucharte.</p>
        </div>

        <section className="jbce-columns" aria-label="Formulario y vías de contacto">
          <div className="jbce-form-column">
            <form className="jbce-form" onSubmit={onSubmit}>
              <div className="jbce-form-row">
                <label>
                  <span>Nombre *</span>
                  <input autoComplete="name" placeholder="Tu nombre" maxLength={100} required type="text" name="name" value={form.name} onChange={update("name")} />
                </label>
                <label>
                  <span>Email *</span>
                  <input autoComplete="email" placeholder="tu@email.com" maxLength={254} required type="email" name="email" value={form.email} onChange={update("email")} />
                </label>
              </div>
              <label>
                <span>Asunto</span>
                <input placeholder="¿Qué tienes en mente?" maxLength={150} type="text" name="subject" value={form.subject} onChange={update("subject")} />
              </label>
              <label>
                <span>Mensaje *</span>
                <textarea name="description" rows={4} placeholder="Cuéntanos un poco sobre tu idea…" maxLength={5000} required value={form.description} onChange={update("description")} />
              </label>
              <div className="jbce-form-send">
                <p>* Campos obligatorios. El envío directo estará disponible al configurar nuestro correo de contacto.</p>
                <button type="submit">
                  Preparar consulta<span aria-hidden="true">↗</span>
                </button>
              </div>
              {status && <p role="status">{status}</p>}
            </form>
          </div>

          <aside className="jbce-aside">
            <figure className="jbce-aside-photo">
              <img alt="Imagen editorial del universo creativo de Juana Brava" loading="eager" src="/brand/hero.png" />
            </figure>
            <div className="jbce-aside-details">
              <div className="jbce-detail">
                <span className="jbce-detail-label">New Business · Email</span>
                <span className="jbce-detail-pending">Correo pendiente de configurar</span>
              </div>
              <div className="jbce-detail">
                <span className="jbce-detail-label">Teléfono · New Business</span>
                <span className="jbce-detail-pending">Teléfono pendiente de configurar</span>
              </div>
              <div className="jbce-detail">
                <span className="jbce-detail-label">Teléfono · Contacto</span>
                <span className="jbce-detail-pending">Teléfono pendiente de configurar</span>
              </div>
              <div className="jbce-detail jbce-social">
                <span className="jbce-detail-label">Social</span>
                <div className="jbce-social-links">
                  <span className="jbce-social-pending">Instagram</span>
                  <span className="jbce-social-pending">LinkedIn</span>
                  <span className="jbce-social-pending">Behance</span>
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
            <img alt="Imagen editorial de Juana Brava con estilismo rojo y cielo azul" loading="lazy" src="/brand/hero.png" />
          </div>
        </section>

        <footer className="jbce-footer">
          <a href="#!/" className="jbce-footer-logo" aria-label="Juana Brava, volver al inicio">
            <img alt="Juana Brava" loading="lazy" src="/brand/logo-integrado-clean.svg" />
          </a>
          <div className="jbce-footer-meta">
            <span>© 2026 JUANA BRAVA</span>
            <nav aria-label="Navegación de pie de página">
              <a href="#!/">Inicio</a>
              <a href="#!/proyectos">Proyectos</a>
              <a href="#!/estudio">Estudio</a>
              <a href="#!/thinking">Thinking</a>
              <a href="#!/contacto">Contacto</a>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  );
}
