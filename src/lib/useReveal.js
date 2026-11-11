import { useEffect } from "react";

const SELECTOR = ".reveal, .jbv2-reveal, .jbv3-text-reveal";

// Activa las animaciones de entrada (CSS: [data-motion=ready] .reveal)
// y marca como visibles los bloques al entrar en pantalla.
export function useReveal(deps) {
  useEffect(() => {
    document.documentElement.dataset.motion = "ready";

    const elements = [...document.querySelectorAll(SELECTOR)];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reduced) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -3% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}
