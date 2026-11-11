import Lenis from "lenis";

// Scroll suave con inercia, como en basicagency.com. El scroll sigue siendo el nativo del navegador
// (así funcionan bien las ruletas, las secciones fijadas y las animaciones al entrar en pantalla);
// solo se suaviza la rueda y el trackpad.
export function startSmoothScroll() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });
  window.__jbLenis = lenis;

  let frame = 0;
  let paused = false;
  const loop = (time) => {
    // Mientras se anima una transición de proyecto, la página no debe moverse por su cuenta.
    const busy = !!(document.documentElement.dataset.projectTransition || document.documentElement.dataset.caseOpening);
    if (busy !== paused) {
      paused = busy;
      busy ? lenis.stop() : lenis.start();
    }
    lenis.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    delete window.__jbLenis;
  };
}
