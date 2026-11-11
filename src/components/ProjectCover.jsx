export function ProjectCover({ project: t, mode: e = 0, compact: a = false }) {
  let l = e === 2,
    n = {
      "--case-accent": t.accent,
      "--case-ground": t.background,
    };
  return (
    <div
      className={
        "project-cover cover-" + t.slug + (l ? " cover-mobile" : "") + (a ? " cover-compact" : "") + " cover-mode-" + e
      }
      style={n}
      role="img"
      aria-label={t.alt + " · " + t.views[e]}
    >
      <div className="cover-composition" aria-hidden="true">
        {t.slug === "sobremesa" && (
          <div className={"design-screen restaurant-screen" + (l ? " design-phone" : "")}>
            <div className="screen-bar">
              <i />
              <i />
              <i />
              <span>SOBREMESA / PROPUESTA WEB</span>
            </div>
            <div className="restaurant-header">
              <b>Sobremesa</b>
              <span>Carta   El espacio   Reservas</span>
            </div>
            {e === 1 ? (
              <div className="restaurant-menu">
                <span>EL GUSTO DE QUEDARSE.</span>
                <h3>A la mesa.</h3>
                <div>
                  <b>Para empezar</b>
                  <p>Platos para abrir la conversación.</p>
                </div>
                <div>
                  <b>De temporada</b>
                  <p>Una carta que cambia con el momento.</p>
                </div>
                <div>
                  <b>El final</b>
                  <p>Siempre queda sitio para algo más.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="restaurant-hero">
                  <img src={t.image} alt="" />
                  <h3>
                    El tiempo,
                    <br />a tu mesa.
                  </h3>
                </div>
                <div className="restaurant-caption">
                  <span>COCINA, CONVERSACIÓN Y SOBREMESA.</span>
                  <span>Descubre la carta ↗</span>
                </div>
              </>
            )}
          </div>
        )}
        {t.slug === "nacar" && (
          <div className={"design-screen beauty-screen" + (l ? " design-phone" : "")}>
            <div className="screen-bar">
              <i />
              <i />
              <i />
              <span>NÁCAR / E-COMMERCE CONCEPTUAL</span>
            </div>
            <div className="beauty-header">
              <b>NÁCAR</b>
              <span>Colección   Universo   Bolsa (0)</span>
            </div>
            {e === 1 ? (
              <div className="beauty-collection">
                <span>LA COLECCIÓN</span>
                <h3>Esencia propia.</h3>
                <img src={t.wide} alt="" />
                <div>
                  <span>Una misma dirección.</span>
                  <span>Una colección completa. ↗</span>
                </div>
              </div>
            ) : (
              <div className="beauty-hero">
                <div>
                  <span>EL VALOR DE LO ESENCIAL.</span>
                  <h3>
                    Un ritual.
                    <br />
                    Tu momento.
                  </h3>
                  <span className="mock-link">Explorar la colección ↗</span>
                </div>
                <img src={t.image} alt="" />
              </div>
            )}
            <div className="beauty-foot">IDENTIDAD · PRODUCTO · EXPERIENCIA</div>
          </div>
        )}
        {t.slug === "umbral" && (
          <div className={"design-screen culture-screen" + (l ? " design-phone" : "")}>
            <div className="screen-bar">
              <i />
              <i />
              <i />
              <span>UMBRAL / PRODUCTO DIGITAL</span>
            </div>
            <div className="culture-header">
              <b>
                umbral<span>●</span>
              </b>
              <span>Agenda   Recorridos   El espacio</span>
            </div>
            <div className="culture-body">
              <div className="culture-visual">
                <img src={t.image} alt="" />
                <span>
                  OTRA FORMA
                  <br />
                  DE MIRAR.
                </span>
              </div>
              <div className="culture-agenda">
                <span>DESCUBRE EL ESPACIO</span>
                <h3>{e === 1 ? "Tu recorrido." : "Lo que pasa."}</h3>
                {(e === 1
                  ? [
                      ["01", "Mirar despacio", "Un recorrido por los detalles"],
                      ["02", "Fuera del marco", "Otra lectura del espacio"],
                      ["03", "Entre piezas", "Un punto de partida propio"],
                    ]
                  : [
                      ["EXPOSICIÓN", "Lo que deja la luz", "Imagen y memoria"],
                      ["ARCHIVO", "Materia en movimiento", "Una mirada al proceso"],
                      ["ENCUENTRO", "El borde de la ciudad", "Conversaciones abiertas"],
                    ]
                ).map(([i, u, c]) => (
                  <div key={u} className="culture-event">
                    <span>{i}</span>
                    <b>{u}</b>
                    <small>
                      {c}
                      {" ↗"}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {t.slug === "mara" && (
          <div className={"mara-artwork" + (l ? " mara-vertical" : "")}>
            <img src={t.image} alt="" />
            <div className="mara-art-top">
              <span>PERSONAJE VIRTUAL / ESTUDIO CONCEPTUAL</span>
              <span>JUANA BRAVA</span>
            </div>
            {e === 1 ? (
              <div className="mara-campaign">
                <span>UNA VOZ.</span>
                <span>
                  MUCHAS
                  <br />
                  HISTORIAS.
                </span>
              </div>
            ) : (
              <strong>MARA.</strong>
            )}
            <div className="mara-art-bottom">
              <span>DIRECCIÓN CREATIVA + IA</span>
              <span>IDENTIDAD EN MOVIMIENTO.</span>
            </div>
          </div>
        )}
        {["bruma", "fuga", "pulso"].includes(t.slug) &&
          (e === 1 ? (
            <div className="concept-poster">
              <img src={t.wide} alt="" />
              <span>
                {t.name.toUpperCase()}
                {" / DIRECCIÓN VISUAL"}
              </span>
            </div>
          ) : (
            <div className={"design-screen concept-screen" + (l ? " design-phone" : "")}>
              <div className="screen-bar">
                <i />
                <i />
                <i />
                <span>
                  {t.name.toUpperCase()}
                  {" / PROPUESTA DIGITAL"}
                </span>
              </div>
              <div className="concept-header">
                <b>{t.name.toUpperCase()}</b>
                <span>
                  {t.slug === "bruma"
                    ? "El lugar · Estancias · Descubrir"
                    : t.slug === "fuga"
                      ? "Colección · Universo · Explorar"
                      : "Artistas · Programa · El festival"}
                </span>
              </div>
              <div className="concept-visual">
                <img src={t.image} alt="" />
                <div>
                  <h3>
                    {t.slug === "bruma"
                      ? "El tiempo, a otro ritmo."
                      : t.slug === "fuga"
                        ? "Sal. Muévete. Repite."
                        : "Lo que viene suena fuerte."}
                  </h3>
                  <p>{t.lead}</p>
                </div>
              </div>
            </div>
          ))}
        {t.slug === "juana-brava" &&
          (e === 0 ? (
            <div className="jb-identity">
              <img className="jb-identity-logo" src="/brand/logo-horizontal.png" alt="" />
              <div className="jb-identity-line">
                <span>IDEAS SIN PERMISO.</span>
                <img src="/brand/monograma.png" alt="" />
              </div>
              <div className="jb-swatches">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <div className={"design-screen agency-screen" + (l ? " design-phone" : "")}>
              <div className="screen-bar">
                <i />
                <i />
                <i />
                <span>JUANA BRAVA / UNIVERSO DIGITAL</span>
              </div>
              <div className="agency-screen-header">
                <img src="/brand/logo-horizontal.png" alt="" />
                <span>Proyectos   Servicios   Estudio</span>
              </div>
              <div className="agency-screen-hero">
                <img src="/brand/hero.png" alt="" />
                <span>
                  VER
                  <br />
                  TRABAJO
                </span>
              </div>
              <div className="agency-screen-copy">
                Diseño, contenido y tecnología.
                <br />
                <b>Una misma idea.</b>
              </div>
            </div>
          ))}
      </div>
      <span className="cover-corner">{t.type === "own" ? "IDENTIDAD PROPIA" : "EXPLORACIÓN CONCEPTUAL"}</span>
    </div>
  );
}

export function EditorialCover({ project: t }) {
  return (
    <div
      className="project-cover editorial-cover"
      style={{
        "--case-ground": t.background,
      }}
    >
      <img src={t.image} alt={t.alt} loading="lazy" decoding="async" />
    </div>
  );
}
