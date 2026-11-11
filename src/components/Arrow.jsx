// Flecha vectorial: el mismo aspecto en todos los dispositivos (los caracteres ↗ ↓ ← ↑ se ven
// como emoji en muchos móviles). Hereda el color y el tamaño del texto que la rodea.
const ANGLE = { ne: 0, e: 45, se: 90, s: 135, sw: 180, w: 225, nw: 270, n: 315 };

export function Arrow({ dir = "ne", className = "" }) {
  return (
    <svg
      className={"jb-arrow " + className}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      style={{ transform: "rotate(" + ANGLE[dir] + "deg)" }}
    >
      <path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}
