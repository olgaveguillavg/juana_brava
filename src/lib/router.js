const hashRouter = {
  push(t) {
    window.location.hash = "!" + t;
  },
  prefetch() {},
};

export function useRouter() {
  return hashRouter;
}

export function notFound() {
  throw new Error("404");
}

export function parseRoute(t) {
  if (!t.startsWith("#!"))
    return {
      path: "/",
      section: t.replace(/^#/, ""),
    };
  let e = t.slice(2),
    a = e.indexOf("?"),
    l = (a < 0 ? e : e.slice(0, a)).replace(/\/+$/, "") || "/",
    n = a < 0 ? "" : new URLSearchParams(e.slice(a + 1)).get("section") || "";
  return {
    path: l.startsWith("/") ? l : "/",
    section: n,
  };
}

function formatRoute(t) {
  return "#!" + t.path + (t.section ? "?section=" + encodeURIComponent(t.section) : "");
}

export function normalizeHref(t, e) {
  if (t.startsWith("#!") || (!t.startsWith("/") && !t.startsWith("#"))) return t;
  let a = t.indexOf("#");
  return formatRoute({
    path: (a < 0 ? t : t.slice(0, a)) || e,
    section: a < 0 ? "" : t.slice(a + 1),
  });
}
