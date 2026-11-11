import { Children, Fragment } from "react";

/*
 * Titular que sube desde una máscara, palabra por palabra (la misma entrada que usa basicagency.com).
 * Cada palabra va en una caja con overflow oculto y su texto se desliza de abajo a arriba, con un pequeño
 * retraso escalonado. Los saltos de línea (<br />) y otros elementos se dejan tal cual.
 */
export function SlideText({ children, delay = 0.12, step = 0.06 }) {
  let index = 0;

  const words = (text) =>
    text.split(/(\s+)/).map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const wordDelay = delay + index++ * step;
      return (
        <span className="slide-word" key={i}>
          <span style={{ animationDelay: wordDelay.toFixed(3) + "s" }}>{part}</span>
        </span>
      );
    });

  return Children.map(children, (child, i) =>
    typeof child === "string" ? <Fragment key={i}>{words(child)}</Fragment> : child,
  );
}
