import { useEffect, useState } from "react";

// Rutas con hash (#!/proyectos/mara?section=reto), igual que la web original,
// así los enlaces existentes siguen funcionando sin configurar el servidor.
export function parseHash(hash) {
  const raw = hash.startsWith("#!") ? hash.slice(2) : "/";
  const [pathPart, query = ""] = raw.split("?");
  const path = pathPart.replace(/\/+$/, "") || "/";
  return { path, params: new URLSearchParams(query) };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export const pad = (n) => String(n).padStart(2, "0");
