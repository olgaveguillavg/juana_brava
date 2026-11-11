export function arcLayoutFor(t, e) {
  return t >= 1180 && t >= e * 1.25
    ? "wide"
    : (t >= 720 && t >= e * 0.9) || (t >= 600 && e < 500)
      ? "split"
      : "compact";
}

export function wrapOffset(t, e, a) {
  if (a <= 0) return 0;
  let l = (((t - e) % a) + a) % a;
  return l >= a / 2 ? l - a : l;
}

export function nonNegative(t) {
  return Math.max(0, t);
}

export function wrapIndex(t, e) {
  return e > 0 ? ((Math.round(t) % e) + e) % e : 0;
}

export function arcGeometry(t, e, a, l = 7) {
  let n = arcLayoutFor(t, e),
    i = 360 / Math.max(2, l),
    u = 2 * Math.sin(Math.PI / Math.max(2, l)) * 0.8;
  if (n !== "wide") {
    let d = a?.width ?? (n === "split" ? t * 0.48 - 32 : t - 40),
      m = a?.height ?? (n === "split" ? e - 120 : Math.max(210, e - 320)),
      // Tablet y móvil: la rueda se ve por su parte superior. El proyecto activo queda centrado arriba y
      // los demás giran hacia los lados y salen por los bordes de la pantalla, nunca por arriba ni por abajo.
      S = Math.max(1, Math.min(d * 0.62, (m - 16) / 1.62, 420)),
      A = S / (2 * Math.sin(Math.PI / Math.max(2, l)) * 0.72);
    return {
      layout: n,
      frameW: d,
      frameH: m,
      cardW: S,
      cardH: S,
      radius: A,
      hubX: d / 2,
      hubY: 8 + S / 2 + A,
      orient: "top",
      // Ángulo máximo con el que un círculo cabe entero por abajo; a partir de ahí se desvanece al salir por el lado.
      maxAngle: (Math.acos(Math.max(-1, Math.min(1, 1 - (m - 16 - S) / A))) * 180) / Math.PI,
      step: i,
      artHeight: m,
      artTop: 0,
      captionLeft: 24,
    };
  }
  let c = Math.min(e * 1.05, t * 0.68),
    o = c * 0.98 * 1.3 * 2 * Math.sin(Math.PI / 14) * 0.8 * 0.92,
    // Más separación entre proyectos: cada círculo ocupa el 72 % del hueco entre posiciones (antes el 80 %).
    f = o / (2 * Math.sin(Math.PI / Math.max(2, l)) * 0.72),
    p = c * 0.64 - f,
    v = Math.min(e, c) * 1.9; // escena más alta que la ventana: la ruleta cabe entera y no se corta
  return {
    layout: n,
    frameW: t,
    frameH: v,
    cardW: o,
    cardH: o,
    radius: f,
    hubX: p,
    hubY: v / 2,
    step: i,
    artHeight: v,
    artTop: 0,
    captionLeft: Math.max(p + f + o / 2 + Math.max(36, t * 0.035), t * 0.58),
  };
}

export function arcPoint(t, e) {
  let a = (t * e.step * Math.PI) / 180;
  if (e.orient === "top") {
    // Arco superior: x hacia los lados, y hacia abajo; los que quedan muy atrás no se muestran.
    return {
      x: e.hubX + e.radius * Math.sin(a),
      y: e.hubY - e.radius * Math.cos(a),
      rotation: 0,
      scale: 1,
      opacity: Math.max(0, Math.min(1, (e.maxAngle - Math.abs(t * e.step)) / 8)),
    };
  }
  return {
    x: e.hubX + e.radius * Math.cos(a),
    y: e.hubY + e.radius * (e.ry ?? 1) * Math.sin(a),
    rotation: 0,
    scale: 1,
    opacity: 1,
  };
}

export function arcScrollDistance(t, e) {
  return Math.max(0, e - 1) * Math.max(180, Math.min(300, t * 0.3));
}

export function arcProgressPosition(t, e, a) {
  return e > 0 ? Math.max(0, Math.min(1, t / e)) * Math.max(0, a - 1) : 0;
}

export class ArcMotion {
  constructor(e = 7, a = 7) {
    this.count = e;
    this.secondsPerCard = a;
    this.position = 0;
    this.target = 0;
    this.visible = false;
    this.hidden = false;
    this.paused = false;
    this.reduced = false;
    this.focused = false;
    this.intent = false;
    this.stepped = false;
    this.manual = false;
    this.idleUntil = 0;
    this.nextStepAt = 0;
    this.scrollRemainder = 0;
  }
  setPresentation(e, a) {
    this.stepped !== e &&
      ((this.stepped = e),
      (this.scrollRemainder = 0),
      (this.target = e ? Math.round(this.position) : this.position),
      this.interact(a, 200),
      (this.nextStepAt = a + 500));
  }
  enter(e) {
    this.interact(e, 200), (this.nextStepAt = e + 500);
  }
  interact(e, a = 1400) {
    (this.idleUntil = e + a), (this.nextStepAt = e + Math.max(2200, a));
  }
  scroll(e, a) {
    this.manual || ((this.target = Math.round(this.position)), (this.scrollRemainder = 0)),
      (this.manual = true),
      (this.scrollRemainder += e);
    let l = Math.round(this.scrollRemainder);
    l && ((this.target = Math.round(this.target) + l), (this.scrollRemainder -= l)), this.interact(a, 2200);
  }
  select(e, a) {
    (this.manual = true),
      (this.scrollRemainder = 0),
      (this.target = this.position + wrapOffset(e, this.position, this.count)),
      this.interact(a, 2200);
  }
  advance(e, a) {
    (this.manual = true),
      (this.scrollRemainder = 0),
      (this.target = Math.round(this.target) + e),
      this.interact(a, 2200);
  }
  get canAutoplay() {
    return (
      this.count > 1 && this.visible && !this.hidden && !this.paused && !this.reduced && !this.focused && !this.intent
    );
  }
  get destination() {
    return this.reduced || this.stepped || this.manual ? Math.round(this.target) : this.target;
  }
  get aligned() {
    return this.position === this.destination && Number.isInteger(this.position);
  }
  get needsFrame() {
    return this.visible && !this.hidden && (this.canAutoplay || Math.abs(this.destination - this.position) > 1e-5);
  }
  tick(e, a) {
    let l = Math.max(0, Math.min(48, e));
    this.canAutoplay &&
      a >= this.idleUntil &&
      (this.manual && this.aligned && ((this.manual = false), (this.target = this.position)),
      this.manual ||
        (this.stepped
          ? a >= this.nextStepAt &&
            ((this.target = Math.round(this.target) + 1), (this.scrollRemainder = 0), (this.nextStepAt = a + 6e3))
          : (this.target += l / (Math.max(5, this.secondsPerCard) * 1e3))));
    let n =
      this.position +
      (this.destination - this.position) *
        (this.reduced ? 1 : 1 - Math.exp(-l / (this.stepped || this.manual ? 140 : 110)));
    this.position =
      Math.abs(this.destination - n) < (this.stepped || this.manual ? 0.006 : 3e-5) ? this.destination : n;
  }
}

export function liftPreviewRect(t, e, a, l) {
  let n = Math.min(t.w * 1.7, e - 32),
    i = Math.min(n / 1.55, a - 110),
    u = Math.max(76, Math.min(a - i - 20, t.y + t.h / 2 - i / 2));
  return {
    x: Math.max(16, Math.min(e - n - 16, t.x + t.w / 2 - n / 2)),
    y: l ? Math.max(16, Math.min(u, l.y - 12)) : u,
    w: n,
    h: i,
    radius: 5,
  };
}

export class LiftPreview {
  constructor() {
    this.index = -1;
    this.returning = false;
    this.rect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      radius: 0,
    };
    this.target = {
      ...this.rect,
    };
    this.velocity = {
      ...this.rect,
    };
    this.returnStart = {
      ...this.rect,
    };
    this.returnElapsed = 0;
  }
  reset() {
    (this.index = -1), (this.returning = false), (this.returnElapsed = 0);
  }
  get moving() {
    return Object.keys(this.rect).some(
      (e) => Math.abs(this.rect[e] - this.target[e]) > 0.05 || Math.abs(this.velocity[e]) > 0.05,
    );
  }
  open(e, a, l) {
    this.index !== e &&
      ((this.rect = {
        ...a,
      }),
      (this.velocity = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        radius: 0,
      })),
      (this.index = e),
      (this.returning = false),
      (this.target = {
        ...l,
      });
  }
  close() {
    this.index >= 0 &&
      !this.returning &&
      ((this.returning = true),
      (this.returnStart = {
        ...this.rect,
      }),
      (this.returnElapsed = 0));
  }
  tick(e, a, l) {
    if (this.index < 0) return;
    if (this.returning) {
      this.returnElapsed += Math.min(48, e);
      let u = l ? 1 : Math.min(1, this.returnElapsed / 560),
        c = 1 - (1 - u) ** 4;
      for (let o of ["x", "y", "w", "h", "radius"])
        this.rect[o] = this.returnStart[o] + (a[o] - this.returnStart[o]) * c;
      u === 1 && this.reset();
      return;
    }
    let n = Math.max(1, Math.ceil(Math.min(48, e) / 8)),
      i = Math.min(48, e) / n / 1e3;
    for (let u = 0; u < n; u++)
      for (let c of ["x", "y", "w", "h", "radius"]) {
        if (l) {
          (this.rect[c] = this.target[c]), (this.velocity[c] = 0);
          continue;
        }
        (this.velocity[c] += ((this.target[c] - this.rect[c]) * 240 - this.velocity[c] * 31) * i),
          (this.rect[c] += this.velocity[c] * i);
      }
  }
}

export const DEFAULT_ARC_GEOMETRY = arcGeometry(1500, 900);
