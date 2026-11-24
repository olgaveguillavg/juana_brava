/*
 * Notas de «Ideas». Se escriben y se borran desde el panel (/cms.html) y se guardan en Supabase;
 * `cloudIdeas.js` las carga en esta lista al abrir la web y al compilarla.
 *
 * Cada nota tiene sus datos de listado (tipo, tema, fecha, titular, entradilla e imagen) y un cuerpo
 * hecho de bloques, en orden:
 *   { type: "p", text }                     párrafo
 *   { type: "h2", text }                    subtítulo
 *   { type: "quote", text }                 cita (en las notas de opinión, frase gigante)
 *   { type: "figure", src, alt, caption }   imagen a todo el ancho con pie de foto
 *   { type: "duo", images }                 pareja de fotos escalonadas ({ src, alt, caption })
 *   { type: "swatches", colors }            muestrario de colores ({ name, hex, ink })
 *   { type: "steps", steps }                pasos numerados ({ title, text, src, alt })
 */
export const ideas = [];

export const findIdea = (slug) => ideas.find((n) => n.slug === slug);
export const ideaPath = (n) => "/ideas/" + n.slug;

/* Minutos de lectura (unas 200 palabras por minuto), redondeado hacia arriba. */
export function readingMinutes(note) {
  const words = [note.excerpt, ...note.body.map((b) => b.text || b.caption || "")]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
