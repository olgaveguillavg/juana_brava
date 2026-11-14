import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";

/*
 * Entrada de los textos al hacer scroll. Se repite cada vez que un elemento vuelve a aparecer, al bajar y
 * al subir. Se decide por la posición real del elemento en pantalla y no con IntersectionObserver: un
 * elemento con opacidad 0 cuenta como "no visible" para el navegador y eso creaba un bucle (se mostraba, se
 * medía como visible, se ocultaba...). Con un margen de histéresis no parpadea en los bordes de la pantalla:
 *  - se muestra en cuanto asoma por la pantalla (algo más del 6 % de la altura desde el borde inferior);
 *  - se oculta de nuevo solo cuando está del todo fuera, a más de un 25 % de pantalla de distancia.
 */
export function RevealMotion() {
  return (
    useIsomorphicLayoutEffect(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = [...document.querySelectorAll(".reveal")];
      let frame = 0;

      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        for (const el of items) {
          const r = el.getBoundingClientRect();
          const shown = el.classList.contains("is-revealed");
          if (!shown && r.top < vh * 0.94 && r.bottom > 0) el.classList.add("is-revealed");
          else if (shown && (r.bottom < -vh * 0.25 || r.top > vh * 1.25)) el.classList.remove("is-revealed");
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      document.documentElement.dataset.motion = "ready";
      document.documentElement.dataset.pageEntry = "ready";
      // La entrada de la página solo vale unos instantes: así los cambios posteriores (vista lista, filtros…) no repiten el fundido.
      const entryTimer = setTimeout(() => delete document.documentElement.dataset.pageEntry, 2400);
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);

      let l = document.querySelector(".hero"),
        n = 0;
      function i() {
        if (!l) return;
        let c = Math.min(window.scrollY, l.offsetHeight);
        l.style.setProperty("--hero-drift", (c * 0.11).toFixed(1) + "px"), (n = 0);
      }
      let u = () => {
        !n && l && (n = requestAnimationFrame(i));
      };
      window.addEventListener("scroll", u, { passive: true });
      i();

      return () => {
        clearTimeout(entryTimer);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("scroll", u);
        cancelAnimationFrame(frame);
        cancelAnimationFrame(n);
        delete document.documentElement.dataset.motion;
        delete document.documentElement.dataset.pageEntry;
      };
    }, []),
    null
  );
}
