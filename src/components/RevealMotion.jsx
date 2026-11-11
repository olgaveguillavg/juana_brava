import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";

export function RevealMotion() {
  return (
    useIsomorphicLayoutEffect(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let e = [...document.querySelectorAll(".reveal")],
        a = new IntersectionObserver(
          (c) => {
            c.forEach((o) => {
              o.isIntersecting && (o.target.classList.add("is-revealed"), a.unobserve(o.target));
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -3% 0px",
          },
        );
      e.forEach((c) => a.observe(c)),
        (document.documentElement.dataset.motion = "ready"),
        (document.documentElement.dataset.pageEntry = "ready");
      // La entrada de la página solo vale unos instantes: así los cambios posteriores (vista lista, filtros…) no repiten el fundido.
      const entryTimer = setTimeout(() => delete document.documentElement.dataset.pageEntry, 2400);
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
      return (
        window.addEventListener("scroll", u, {
          passive: true,
        }),
        i(),
        () => {
          a.disconnect(),
            clearTimeout(entryTimer),
            window.removeEventListener("scroll", u),
            cancelAnimationFrame(n),
            delete document.documentElement.dataset.motion,
            delete document.documentElement.dataset.pageEntry;
        }
      );
    }, []),
    null
  );
}
