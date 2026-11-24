/*
 * Se ejecuta después de `vite build` (la web sigue siendo React). Prepara la web para buscadores e IA:
 *  - Texto de cada página dentro del HTML, con los mismos componentes de React. Quien tiene JavaScript no
 *    lo ve: React pinta la web como siempre. Los lectores que no ejecutan JavaScript (muchas IA) lo leen.
 *  - Cada página con su dirección propia (/estudio, /proyectos/mara…), título, descripción, enlace
 *    canónico, tarjeta para compartir (Open Graph) y datos estructurados (schema.org).
 *  - sitemap.xml y llms.txt (resumen de la agencia pensado para las IA).
 *  - Incluye las notas publicadas desde el CMS en el momento de compilar.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { AGENCY, PAGES, SITE, organizationSchema } from "./seo-data.mjs";

const vite = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const absolute = (url) => (!url ? SITE + "/og.jpg" : url.startsWith("http") ? url : SITE + url);
const jsonLd = (data) => '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, "\\u003c") + "</script>";
const today = new Date().toISOString().slice(0, 10);

try {
  const { App } = await vite.ssrLoadModule("/src/App.jsx");
  const { ideas } = await vite.ssrLoadModule("/src/data/ideas.js");
  const { projects, projectTypeLabel } = await vite.ssrLoadModule("/src/data/projects.js");
  const { addPublishedIdeas } = await vite.ssrLoadModule("/src/data/cloudIdeas.js");
  await addPublishedIdeas();

  const org = { "@id": SITE + "/#organizacion" };
  const breadcrumb = (items) => ({
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: SITE + item.path,
    })),
  });

  const pages = [
    ...PAGES.map((p) => ({
      ...p,
      schema:
        p.path === "/"
          ? [organizationSchema(), { "@type": "WebSite", "@id": SITE + "/#web", url: SITE + "/", name: AGENCY.name, inLanguage: "es-ES", publisher: org }]
          : [{ "@type": p.kind || "WebPage", "@id": SITE + p.path, url: SITE + p.path, name: p.title, description: p.description, inLanguage: "es-ES", isPartOf: { "@id": SITE + "/#web" }, about: org }, breadcrumb([{ name: p.name, path: p.path }])],
    })),
    ...projects.map((p) => {
      const description = (p.lead + " " + p.sector + ": " + p.discipline.replace(/ \/ /g, ", ") + ". " + projectTypeLabel(p) + " de Juana Brava, agencia creativa en Barcelona.").replace(/\s+/g, " ");
      return {
        path: "/proyectos/" + p.slug,
        title: p.name + " — Juana Brava",
        description,
        image: p.image,
        llms: p.sector + " · " + p.discipline + ". " + p.lead,
        schema: [
          { "@type": "CreativeWork", "@id": SITE + "/proyectos/" + p.slug, url: SITE + "/proyectos/" + p.slug, name: p.name, headline: p.lead, description, genre: p.discipline, keywords: [p.sector, ...p.discipline.split(" / "), ...(p.scope || [])].join(", "), image: absolute(p.image), creator: org, inLanguage: "es-ES" },
          breadcrumb([{ name: "Proyectos", path: "/proyectos" }, { name: p.name, path: "/proyectos/" + p.slug }]),
        ],
      };
    }),
    ...ideas.map((n) => ({
      path: "/ideas/" + n.slug,
      title: n.title.replace(/\.$/, "") + " — Juana Brava",
      description: n.excerpt,
      image: n.image,
      type: "article",
      llms: n.excerpt,
      schema: [
        { "@type": "BlogPosting", "@id": SITE + "/ideas/" + n.slug, url: SITE + "/ideas/" + n.slug, headline: n.title.replace(/\.$/, ""), description: n.excerpt, datePublished: n.iso, image: absolute(n.image), author: org, publisher: org, articleSection: n.topic, inLanguage: "es-ES" },
        breadcrumb([{ name: "Ideas", path: "/ideas" }, { name: n.title.replace(/\.$/, ""), path: "/ideas/" + n.slug }]),
      ],
    })),
  ];

  const template = await readFile("dist/index.html", "utf8");
  const nav =
    '<nav aria-label="Mapa de la web"><ul>' +
    pages.map((p) => '<li><a href="' + p.path + '">' + escapeHtml(p.title) + "</a></li>").join("") +
    "</ul></nav>";

  for (const page of pages) {
    const markup = renderToStaticMarkup(createElement(App, { initialRoute: { path: page.path, section: "" } }))
      // Las fotos de esta copia no deben descargarse para quien sí ve la web.
      .replace(/ loading="eager"/g, "")
      .replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" ')
      .replace(/<link rel="preload"[^>]*>/g, "");
    const url = SITE + page.path;
    const head = [
      "<script>document.documentElement.classList.add('js')</script>",
      "<style>.js #app>.static{display:none}</style>",
      '<link rel="canonical" href="' + url + '" />',
      '<meta name="robots" content="index, follow, max-image-preview:large" />',
      '<meta property="og:site_name" content="' + AGENCY.name + '" />',
      '<meta property="og:locale" content="es_ES" />',
      '<meta property="og:type" content="' + (page.type || "website") + '" />',
      '<meta property="og:url" content="' + url + '" />',
      '<meta property="og:title" content="' + escapeHtml(page.title) + '" />',
      '<meta property="og:description" content="' + escapeHtml(page.description) + '" />',
      '<meta property="og:image" content="' + escapeHtml(absolute(page.image)) + '" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      jsonLd({ "@context": "https://schema.org", "@graph": page.schema }),
    ].join("\n    ");
    const html = template
      .replace(/<title>[^<]*<\/title>/, () => "<title>" + escapeHtml(page.title) + "</title>")
      .replace(/(<meta name="description" content=")[^"]*"/, (m, start) => start + escapeHtml(page.description) + '"')
      .replace("</head>", () => "    " + head + "\n  </head>")
      .replace('<div id="app"></div>', () => '<div id="app"><div class="static">' + markup + nav + "</div></div>");
    const dir = "dist" + (page.path === "/" ? "" : page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(dir + "/index.html", html);
  }

  await writeFile(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
      pages
        .map(
          (p) =>
            "  <url><loc>" + SITE + p.path + "</loc><lastmod>" + today + "</lastmod>" +
            (p.image ? "<image:image><image:loc>" + escapeHtml(absolute(p.image)) + "</image:loc></image:image>" : "") +
            "</url>",
        )
        .join("\n") +
      "\n</urlset>\n",
  );

  const section = (title, items) => "\n## " + title + "\n\n" + items.map((p) => "- [" + p.title.replace(/ — Juana Brava$/, "") + "](" + SITE + p.path + "): " + p.llms).join("\n") + "\n";
  await writeFile(
    "dist/llms.txt",
    "# " + AGENCY.name + "\n\n> " + AGENCY.summary + "\n\n" + AGENCY.about + "\n" +
      "\n## Datos\n\n" +
      "- Ubicación: " + AGENCY.city + ", España. Trabajamos con marcas de toda España y en remoto.\n" +
      "- Equipo: " + AGENCY.founders.map((f) => f.name + " (" + f.role.toLowerCase() + ")").join(" y ") + ".\n" +
      "- Contacto: " + AGENCY.email + " · " + AGENCY.phones.join(" · ") + " · " + SITE + "/contacto\n" +
      "- Redes: " + AGENCY.sameAs.join(" · ") + "\n" +
      "\n## Servicios\n\n" + AGENCY.services.map((s) => "- " + s.name + ": " + s.text).join("\n") + "\n" +
      "\n## Páginas\n\n" + PAGES.map((p) => "- [" + p.name + "](" + SITE + p.path + "): " + p.description).join("\n") + "\n" +
      section("Proyectos", pages.filter((p) => p.path.startsWith("/proyectos/"))) +
      section("Ideas (artículos)", pages.filter((p) => p.path.startsWith("/ideas/"))),
  );
  console.log("SEO generado para " + pages.length + " páginas.");
} finally {
  await vite.close();
}
