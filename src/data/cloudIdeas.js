/*
 * Trae de Supabase las notas publicadas desde el CMS y las suma a las de `ideas.js`.
 * La vista `ideas_publicas` solo contiene lo publicado (y lo programado cuya hora ya ha llegado).
 * La clave "publishable" es pública por diseño: los permisos están en la base de datos.
 */
import { ideas } from "./ideas.js";

const CLOUD_URL = "https://jkksnyueshgqnjaodukj.supabase.co";
const CLOUD_KEY = "sb_publishable_63Uodmg8t0ADdV3jplKUKg_CxjcztNW";
const ZONE = "Europe/Madrid";

const fileUrl = (id) => (id ? CLOUD_URL + "/storage/v1/object/public/ideas/" + encodeURIComponent(id) : "");

const safeUrl = (raw) => {
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const parse = (html) => new DOMParser().parseFromString(html || "", "text/html").body;

// Fuera del navegador (al compilar) solo se necesita el texto, sin formato.
const plainBlocks = (block) =>
  String(block.html || "")
    .replace(/<br\s*\/?>|<\/(div|p|li)>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .split("\n")
    .filter((line) => line.trim())
    .map((text) => ({ type: block.style === "h2" || block.style === "h3" ? "h2" : block.style === "quote" ? "quote" : "p", text }));

// Solo se conserva el formato que ofrece el editor: negrita, cursiva, enlaces y saltos de línea.
function clean(node) {
  if (node.nodeType === 3) return escapeHtml(node.textContent);
  if (node.nodeType !== 1 || ["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"].includes(node.tagName)) return "";
  const tag = node.tagName.toLowerCase();
  const inner = [...node.childNodes].map(clean).join("");
  if (tag === "br") return "<br>";
  if (tag === "a") {
    const href = safeUrl(node.getAttribute("href"));
    return href ? '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + inner + "</a>" : inner;
  }
  if (["strong", "b", "em", "i", "u"].includes(tag)) return "<" + tag + ">" + inner + "</" + tag + ">";
  if (["div", "p", "li"].includes(tag)) return inner + "<br>";
  return inner;
}

function textBlocks(block) {
  if (typeof DOMParser === "undefined") return plainBlocks(block);
  const body = parse(block.html);
  const text = body.textContent.trim();
  if (!text) return [];
  if (block.style === "quote") return [{ type: "quote", text: text.replace(/\.$/, "") }];
  if (block.style === "h2" || block.style === "h3") return [{ type: "h2", text }];
  const html = [...body.childNodes].map(clean).join("");
  const parts = block.style === "list" ? html.split(/<br>/) : html.split(/(?:<br>){2,}/);
  const lines = parts.map((part) => part.replace(/^(<br>)+|(<br>)+$/g, "")).filter((part) => parse(part).textContent.trim());
  return lines.map((part) => ({
    type: "p",
    html: (block.style === "list" ? "• " : "") + part,
    text: parse(part).textContent,
  }));
}

function convertBlocks(blocks) {
  const result = [];
  for (const b of blocks || []) {
    if (b.kind === "text") result.push(...textBlocks(b));
    if (b.kind === "image" && b.asset) result.push({ type: "figure", src: fileUrl(b.asset), alt: b.alt, caption: b.caption });
    if (b.kind === "video" && b.asset) result.push({ type: "video", src: fileUrl(b.asset), caption: b.caption });
    if (b.kind === "embed" && safeUrl(b.url)) result.push({ type: "link", href: safeUrl(b.url) });
    if (b.kind === "duo" && b.asset && b.asset2)
      result.push({
        type: "duo",
        images: [
          { src: fileUrl(b.asset), alt: b.alt, caption: b.caption },
          { src: fileUrl(b.asset2), alt: b.alt2, caption: b.caption2 },
        ],
      });
    if (b.kind === "colors") {
      const colors = b.colors
        .filter((c) => /^#[0-9a-f]{6}$/i.test(c.hex.trim()))
        .map((c) => {
          const n = parseInt(c.hex.trim().slice(1), 16);
          const light = ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150;
          return { name: c.name, hex: c.hex.trim().toUpperCase(), ink: light ? "#111111" : "#ffffff" };
        });
      if (colors.length) result.push({ type: "swatches", colors });
    }
    if (b.kind === "step" && b.title) {
      const step = { title: b.title, text: b.text, src: fileUrl(b.asset), alt: b.alt };
      const last = result[result.length - 1];
      if (last?.type === "steps") last.steps.push(step);
      else result.push({ type: "steps", steps: [step] });
    }
  }
  return result;
}

function toNote(row) {
  const c = row.contenido;
  const at = new Date(row.publicada_el || Date.now());
  return {
    slug: c.slug,
    type: c.type,
    label: c.category,
    topic: c.category,
    iso: new Intl.DateTimeFormat("en-CA", { timeZone: ZONE }).format(at),
    date: new Intl.DateTimeFormat("es-ES", { timeZone: ZONE, day: "numeric", month: "short", year: "numeric" }).format(at),
    title: c.title,
    excerpt: c.deck,
    image: fileUrl(c.cover),
    imageAlt: c.coverAlt,
    caption: c.coverCaption,
    body: convertBlocks(c.blocks),
  };
}

// `ideas` se actualiza en su sitio. Devuelve true si había notas publicadas.
export async function addPublishedIdeas() {
  try {
    const res = await fetch(CLOUD_URL + "/rest/v1/ideas_publicas?select=*", { headers: { apikey: CLOUD_KEY } });
    if (!res.ok) return false;
    const notes = (await res.json()).filter((row) => row.contenido?.slug).map(toNote);
    if (!notes.length) return false;
    const merged = [...notes, ...ideas.filter((local) => !notes.some((n) => n.slug === local.slug))];
    merged.sort((a, b) => b.iso.localeCompare(a.iso));
    ideas.splice(0, ideas.length, ...merged);
    return true;
  } catch {
    // Sin conexión, la web sigue mostrando las notas incluidas en el código.
    return false;
  }
}

// Avisa a la aplicación para que vuelva a pintar.
export async function loadCloudIdeas(onChange) {
  if (await addPublishedIdeas()) onChange();
}
