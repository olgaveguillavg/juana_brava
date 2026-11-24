/*
 * Se ejecuta después de `vite build`. La web se pinta con JavaScript, y las IA y muchos lectores no lo
 * ejecutan: recibían una página vacía. Aquí se genera el texto de cada página dentro del propio HTML,
 * con los mismos componentes de React.
 *  - Quien tiene JavaScript no ve ese texto: React pinta la web como siempre.
 *  - Cada página tiene además una dirección propia (/estudio, /proyectos/mara…). Una persona que la abra
 *    pasa a la web normal; un lector sin JavaScript se queda con el texto.
 *  - Incluye las notas publicadas desde el CMS en el momento de compilar.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const SITE = "https://www.juanabrava.com";
const vite = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

try {
  const { App } = await vite.ssrLoadModule("/src/App.jsx");
  const { ideas } = await vite.ssrLoadModule("/src/data/ideas.js");
  const { projects } = await vite.ssrLoadModule("/src/data/projects.js");
  const { addPublishedIdeas } = await vite.ssrLoadModule("/src/data/cloudIdeas.js");
  await addPublishedIdeas();

  const pages = [
    { path: "/", title: "Juana Brava — Ideas sin permiso" },
    { path: "/proyectos", title: "Proyectos — Juana Brava" },
    { path: "/estudio", title: "Estudio — Juana Brava" },
    { path: "/ideas", title: "Ideas — Juana Brava" },
    { path: "/contacto", title: "Contacto — Juana Brava" },
    ...projects.map((p) => ({ path: "/proyectos/" + p.slug, title: p.name + " — Juana Brava" })),
    ...ideas.map((n) => ({
      path: "/ideas/" + n.slug,
      title: n.title.replace(/\.$/, "") + " — Juana Brava",
      description: n.excerpt,
    })),
  ];

  const template = await readFile("dist/index.html", "utf8");
  const nav =
    "<nav><ul>" +
    pages.map((p) => '<li><a href="' + p.path + '">' + escapeHtml(p.title) + "</a></li>").join("") +
    "</ul></nav>";

  for (const page of pages) {
    const markup = renderToStaticMarkup(createElement(App, { initialRoute: { path: page.path, section: "" } }))
      // Las fotos de esta copia no deben descargarse para quien sí ve la web.
      .replace(/ loading="eager"/g, "")
      .replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" ')
      .replace(/<link rel="preload"[^>]*>/g, "");
    const redirect =
      page.path === "/" ? "" : "if(!location.hash)location.replace('/#!'+location.pathname.replace(/\\/$/,''));";
    let html = template
      .replace(/<title>[^<]*<\/title>/, () => "<title>" + escapeHtml(page.title) + "</title>")
      .replace(
        "<head>",
        () =>
          "<head>\n    <script>document.documentElement.classList.add('js');" +
          redirect +
          "</script>\n    <style>.js #app>.static{display:none}</style>\n    <link rel=\"canonical\" href=\"" +
          SITE +
          page.path +
          '" />',
      )
      .replace('<div id="app"></div>', () => '<div id="app"><div class="static">' + markup + nav + "</div></div>");
    if (page.description)
      html = html.replace(/(<meta name="description" content=")[^"]*"/, (m, start) => start + escapeHtml(page.description) + '"');
    const dir = "dist" + (page.path === "/" ? "" : page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(dir + "/index.html", html);
  }

  await writeFile(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      pages.map((p) => "  <url><loc>" + SITE + p.path + "</loc></url>").join("\n") +
      "\n</urlset>\n",
  );
  await writeFile(
    "dist/llms.txt",
    "# Juana Brava\n\n> Agencia creativa en Barcelona: identidad, diseño web, contenido y tecnología.\n\n## Páginas\n\n" +
      pages.map((p) => "- [" + p.title + "](" + SITE + p.path + ")").join("\n") +
      "\n",
  );
  console.log("Texto generado para " + pages.length + " páginas.");
} finally {
  await vite.close();
}
