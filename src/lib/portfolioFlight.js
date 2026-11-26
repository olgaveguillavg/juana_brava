import { projects } from "../data/projects.js";

export const PORTFOLIO_LEAVE_EVENT = "jb:portfolio-leave";

export const PORTFOLIO_END_EVENT = "jb:portfolio-end";

const PORTFOLIO_FLIGHT_KEY = "jb-portfolio-flight-v4";

function portfolioFlightBoot(t) {
  try {
    let e = JSON.parse(sessionStorage.getItem(t) || "null"),
      a = /^(vyrk-r01|nacar|soy-de-moto|mara|marcen-gt|segundo-telon|pulso)$/;
    if (
      e?.version !== 4 ||
      !Array.isArray(e.slugs) ||
      !e.slugs.length ||
      e.slugs.length > 7 ||
      !e.slugs.every((n) => a.test(n)) ||
      !Number.isFinite(e.x) ||
      !Number.isFinite(e.y) ||
      !(Date.now() >= e.time && Date.now() - e.time < 8e3) ||
      !["/proyectos", "/proyectos/"].includes(location.pathname) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sessionStorage.removeItem(t);
      return;
    }
    let l = document.documentElement;
    (l.dataset.projectTransition = "waiting"),
      setTimeout(() => {
        l.dataset.projectTransition === "waiting" && (delete l.dataset.projectTransition, sessionStorage.removeItem(t));
      }, 7e3);
  } catch {}
}

const portfolioFlightBootScript =
  "(" + portfolioFlightBoot.toString() + ")(" + JSON.stringify(PORTFOLIO_FLIGHT_KEY) + ")";

const lerp = (t, e, a) => t + (e - t) * a;

const smoothstep = (t) => t * t * (3 - 2 * t);

export function isPlainLeftClick(t) {
  return t.button === 0 && !t.metaKey && !t.ctrlKey && !t.shiftKey && !t.altKey && !t.defaultPrevented;
}

function collapsedPose(t) {
  return {
    ...t,
    width: 6,
    height: 6,
    angle: 0,
    round: 50,
    opacity: 0,
  };
}

/*
 * Recogida hacia «+ proyectos», en dos tiempos:
 *  1. (0–72 %) cada foto viaja en arco hasta el enlace y se queda del tamaño de un «paquete»
 *     (64–110 px, como medían las fotos de la ruleta al juntarse), apilada sobre las demás con un
 *     pequeño giro, como un mazo de cartas;
 *  2. (72–100 %) el paquete se reduce a un punto y se desvanece; después llega la página de Proyectos.
 * Antes el tamaño bajaba de forma continua hasta el punto, y con fotos pequeñas no llegaba a verse el
 * paquete: parecía que se juntaban «en uno» directamente.
 */
const PILE_AT = 0.72;
function flightPose(t, e, a, l) {
  if (l === 1) return e;
  let p = smoothstep(Math.min(1, l / PILE_AT)),
    i = 1 - p,
    u = t.x + t.width / 2,
    c = t.y + t.height / 2,
    o = lerp(u, e.x, 0.58) - 45 - a * 8,
    f = Math.min(c, e.y) - 90 - a * 10,
    pile = Math.max(64, Math.min(110, (typeof window !== "undefined" ? window.innerWidth : 1440) * 0.065)),
    shrink = l <= PILE_AT ? 0 : smoothstep((l - PILE_AT) / (1 - PILE_AT)),
    size = (from) => (l <= PILE_AT ? lerp(from, pile, p) : lerp(pile, e.width, shrink)),
    tilt = (a % 2 ? 1 : -1) * (3 + (a % 4) * 2.5);
  return {
    x: i * i * u + 2 * i * p * o + p * p * e.x,
    y: i * i * c + 2 * i * p * f + p * p * e.y,
    width: size(t.width),
    height: size(t.height),
    angle: lerp(0, tilt, p) * (1 - shrink),
    // Las fotos de la ruleta ya eran círculos (round 50); las rectangulares se redondean poco a poco.
    round: lerp(t.round ?? 50, 50, Math.min(1, p * 1.4)),
    opacity: 1 - Math.max(0, Math.min(1, (l - 0.9) / 0.1)),
  };
}

function flightTiming(t) {
  return {
    delay: 140 + t * 210,
    duration: 1320 + ((t * 23) % 140),
    easing: "linear",
  };
}

function landingPose(t, e, a, l) {
  let n = e.x + e.width / 2,
    i = e.y + e.height / 2;
  if (l === 1)
    return {
      ...e,
      x: n,
      y: i,
      angle: 0,
      round: 0,
      opacity: 1,
    };
  let u = t.x - n,
    c = t.y - i,
    o = Math.hypot(u, c) || 1,
    f = Math.min(26, Math.max(14, e.width * 0.055)),
    p = n + (u / o) * f,
    v = i + (c / o) * f,
    d = (a % 2 ? 1 : -1) * (0.15 + (a % 3) * 0.06),
    m = 0.14;
  if (l < m) {
    let s = smoothstep(l / m);
    return {
      x: lerp(t.x, p, s),
      y: lerp(t.y, v, s),
      width: lerp(t.width, e.width * 0.965, s),
      height: lerp(t.height, e.height * 0.965, s),
      angle: lerp(0, d, s),
      round: lerp(t.round, 0, s),
      opacity: 0,
    };
  }
  let S = (l - m) / (1 - m),
    A = (1 - S) ** 3,
    N = 1 - 0.035 * A;
  return {
    x: n + (p - n) * A,
    y: i + (v - i) * A,
    width: e.width * N,
    height: e.height * N,
    angle: d * A,
    round: 0,
    opacity: smoothstep(Math.min(1, S / 0.36)),
  };
}

function poseStyle(t, e) {
  return {
    transform: `translate(${t.x - e.width / 2}px,${t.y - e.height / 2}px) rotate(${t.angle}deg) scale(${t.width / e.width},${t.height / e.height})`,
    borderRadius: t.round + "%",
    opacity: t.opacity ?? 1,
  };
}

function poseKeyframes(t, e, a = 64) {
  return Array.from(
    {
      length: a + 1,
    },
    (l, n) => ({
      ...poseStyle(t(n / a), e),
      offset: n / a,
    }),
  );
}

export function readPortfolioFlight() {
  try {
    let t = JSON.parse(sessionStorage.getItem(PORTFOLIO_FLIGHT_KEY) || "null");
    return t?.version === 4 &&
      Array.isArray(t.slugs) &&
      t.slugs.length > 0 &&
      t.slugs.every((e) => projects.some((a) => a.slug === e)) &&
      Date.now() >= t.time &&
      Date.now() - t.time < 8e3 &&
      Number.isFinite(t.x) &&
      Number.isFinite(t.y)
      ? t
      : null;
  } catch {
    return null;
  }
}

export function clearPortfolioFlight() {
  try {
    sessionStorage.removeItem(PORTFOLIO_FLIGHT_KEY);
  } catch {}
}

function rectOf(t) {
  let e = t.getBoundingClientRect();
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height,
  };
}

/*
 * Fotos que se recogen en el paquete al pulsar «+ proyectos»: las de la ruleta antigua (círculos) y las de
 * la selección de trabajos de la portada (rectangulares, dentro de un marco que las recorta: se parte del
 * marco, que es lo que se ve). Cada foto necesita un contenedor con `data-project`.
 */
export function arcCardImages() {
  return [...document.querySelectorAll(".arc-card .arc-circle-link > img, .work-pick__img")]
    .map((t) => {
      const editorial = t.classList.contains("work-pick__img");
      return {
        image: t,
        rect: { ...rectOf(editorial ? t.parentElement : t), round: editorial ? 0 : 50 },
      };
    })
    .filter((t) => t.rect.width > 0 && t.rect.height > 0);
}

function waitForArchiveCards(t) {
  return new Promise((e, a) => {
    let l,
      n,
      i = () => {
        l?.disconnect(), clearTimeout(n), t.removeEventListener("abort", u);
      },
      u = () => {
        i(), a(new DOMException("Cancelled", "AbortError"));
      },
      c = () => {
        let o = document.querySelector(".archive-grid");
        return o?.querySelector(".project-cover") ? (i(), e(o), true) : false;
      };
    if (t.aborted) {
      u();
      return;
    }
    c() ||
      ((l = new MutationObserver(c)),
      l.observe(document.body, {
        childList: true,
        subtree: true,
      }),
      t.addEventListener("abort", u, {
        once: true,
      }),
      (n = setTimeout(() => {
        i(), a(new Error("Projects did not become ready"));
      }, 5e3)));
  });
}

function nextFrame(t) {
  return new Promise((e, a) => {
    let l = requestAnimationFrame(() => {
        t.removeEventListener("abort", n), e();
      }),
      n = () => {
        cancelAnimationFrame(l), a(new DOMException("Cancelled", "AbortError"));
      };
    t.aborted
      ? n()
      : t.addEventListener("abort", n, {
          once: true,
        });
  });
}

async function decodeImages(t, e) {
  let a = t.flatMap((n) => [...n.querySelectorAll("img")]),
    l;
  try {
    if (
      (await Promise.race([
        Promise.allSettled(a.map((n) => ((n.loading = "eager"), n.decode?.()))),
        new Promise((n) => {
          l = setTimeout(n, 450);
        }),
      ]),
      e.aborted)
    )
      throw new DOMException("Cancelled", "AbortError");
  } finally {
    clearTimeout(l);
  }
}

export class PortfolioFlight {
  constructor(e, a, l) {
    this.navigate = e;
    this.fallbackHref = a;
    this.abort = new AbortController();
    this.layer = undefined;
    this.stage = undefined;
    this.wash = undefined;
    this.stack = new Map();
    this.skipButton = undefined;
    this.animations = new Set();
    this.inert = new Map();
    this.previousFocus = undefined;
    this.oldOverflow = undefined;
    this.oldPadding = undefined;
    this.oldScrollBehavior = undefined;
    this.done = false;
    this.navigated = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.origin = undefined;
    (this.origin = l),
      (this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null),
      (this.oldOverflow = document.body.style.overflow),
      (this.oldPadding = document.body.style.paddingRight),
      (this.oldScrollBehavior = document.documentElement.style.scrollBehavior);
    let n = Math.max(0, window.innerWidth - document.documentElement.clientWidth),
      i = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    (document.body.style.paddingRight = i + n + "px"),
      (document.body.style.overflow = "hidden"),
      (document.documentElement.style.scrollBehavior = "auto"),
      (this.layer = document.createElement("div")),
      (this.layer.className = "project-flight-layer"),
      this.layer.setAttribute("role", "dialog"),
      this.layer.setAttribute("aria-modal", "true"),
      this.layer.setAttribute("aria-label", "Abriendo proyectos"),
      (this.layer.tabIndex = -1),
      (this.wash = document.createElement("div")),
      (this.wash.className = "project-flight-wash"),
      (this.stage = document.createElement("div")),
      (this.stage.className = "project-flight-stage"),
      this.stage.setAttribute("aria-hidden", "true"),
      (this.stage.style.opacity = "0"),
      (this.skipButton = document.createElement("button")),
      (this.skipButton.type = "button"),
      (this.skipButton.className = "project-flight-skip"),
      (this.skipButton.textContent = "Omitir animación"),
      this.skipButton.addEventListener("click", () => this.skip());
    for (let u of [this.wash, this.stage, this.skipButton]) this.layer.appendChild(u);
    document.body.appendChild(this.layer),
      this.lockContent(),
      // La animación nunca bloquea al usuario: cualquier clic, toque, rueda o tecla (salvo Tab) la termina.
      (this.interrupt = (event) => {
        if (event.type === "keydown" && event.key === "Tab") return;
        this.skip();
      }),
      ["pointerdown", "touchstart", "wheel", "keydown"].forEach((type) =>
        window.addEventListener(type, this.interrupt, { passive: true, capture: true }),
      ),
      // Tope de seguridad: si algo tarda demasiado, la página se libera igualmente.
      (this.safety = setTimeout(() => this.skip(), 3200)),
      this.layer.focus({
        preventScroll: true,
      }),
      this.layer.addEventListener("keydown", (u) => {
        u.key === "Tab" && (u.preventDefault(), this.skipButton.focus());
      });
  }
  lockContent() {
    for (let e of document.body.children)
      !(e instanceof HTMLElement) ||
        e === this.layer ||
        this.inert.has(e) ||
        (this.inert.set(e, e.inert), (e.inert = true));
  }
  animate(e, a, l, n) {
    if (this.abort.signal.aborted) return Promise.reject(new DOMException("Cancelled", "AbortError"));
    let i = e.animate(a, {
      fill: "both",
      ...l,
    });
    return (
      n !== undefined && (i.startTime = n),
      this.animations.add(i),
      i.finished.then(() => {
        this.animations.delete(i);
      })
    );
  }
  figure(e) {
    let a = document.createElement("div");
    return (
      (a.className = "project-flight-card"),
      (a.style.width = e.width + "px"),
      (a.style.height = e.height + "px"),
      this.stage.appendChild(a),
      a
    );
  }
  move() {
    if (!this.navigated) {
      this.navigated = true;
      try {
        sessionStorage.setItem(
          PORTFOLIO_FLIGHT_KEY,
          JSON.stringify({
            version: 4,
            slugs: [...this.stack.keys()],
            time: Date.now(),
            x: this.origin.x / this.width,
            y: this.origin.y / this.height,
          }),
        );
      } catch {}
      this.navigate();
    }
  }
  async run(e) {
    try {
      window.dispatchEvent(new Event(PORTFOLIO_LEAVE_EVENT));
      let l = [...e]
        .sort(
          (o, f) =>
            Math.hypot(o.rect.x - this.origin.x, o.rect.y - this.origin.y) -
            Math.hypot(f.rect.x - this.origin.x, f.rect.y - this.origin.y),
        )
        .map((o, f) => {
          let p = this.figure(o.rect),
            v = o.image.cloneNode();
          // La copia no conserva las clases ni los estilos de la foto original: los de las fotos flotantes
          // (opacidad 0 fuera de su bloque, ancho propio) la dejaban invisible durante todo el vuelo.
          v.removeAttribute("id"), v.removeAttribute("class"), v.removeAttribute("style"), v.removeAttribute("loading"), (v.alt = ""), p.appendChild(v);
          let d = o.image.closest(".arc-card, .work-pick").dataset.project,
            m = collapsedPose(this.origin);
          return (
            this.stack.set(d, {
              node: p,
              base: o.rect,
              pose: m,
            }),
            Object.assign(p.style, poseStyle(flightPose(o.rect, m, f, 0), o.rect)),
            {
              node: p,
              base: o.rect,
              pose: m,
            }
          );
        });
      await decodeImages(
        l.map((o) => o.node),
        this.abort.signal,
      ),
        (this.stage.style.opacity = "1"),
        (document.documentElement.dataset.projectTransition = "gathering");
      let n = document.querySelector(".arc-art")?.getBoundingClientRect(),
        i = n
          ? this.animate(
              this.stage,
              [
                {
                  clipPath: `inset(${Math.max(0, n.top)}px ${Math.max(0, this.width - n.right)}px ${Math.max(0, this.height - n.bottom)}px ${Math.max(0, n.left)}px)`,
                },
                {
                  clipPath: "inset(0px 0px 0px 0px)",
                },
              ],
              {
                duration: 160,
                easing: "ease-out",
              },
            )
          : Promise.resolve(),
        u = Number(document.timeline?.currentTime ?? Date.now());
      if (
        (await Promise.all([
          i,
          ...l.map(({ node: o, base: f, pose: p }, v) =>
            this.animate(
              o,
              poseKeyframes((d) => flightPose(f, p, v, d), f, 48),
              {
                // Algo más larga que antes para que el «paquete» se vea antes de reducirse.
                duration: 820,
                delay: v * 12,
                easing: "linear",
              },
              u,
            ),
          ),
          this.animate(
            this.wash,
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
              },
            ],
            {
              duration: 260,
              delay: 520,
              easing: "ease",
            },
            u,
          ),
        ]),
        this.abort.signal.aborted)
      )
        return;
      this.stage.getAnimations().forEach((o) => o.cancel()),
        (document.documentElement.dataset.projectTransition = "waiting"),
        this.move();
      let c = await waitForArchiveCards(this.abort.signal);
      await this.arrive(c);
    } catch (a) {
      this.recover(a);
    } finally {
      this.cleanup();
    }
  }
  async resume() {
    (this.navigated = true),
      (this.wash.style.opacity = "1"),
      (this.stage.style.opacity = "1"),
      (document.documentElement.dataset.projectTransition = "waiting");
    try {
      let e = readPortfolioFlight()?.slugs || [];
      for (let a of e) {
        let l = projects.find((o) => o.slug === a);
        if (!l) continue;
        let n = collapsedPose(this.origin),
          i = {
            x: 0,
            y: 0,
            width: n.width,
            height: n.height,
          },
          u = this.figure(i),
          c = document.createElement("img");
        (c.src = l.image),
          (c.alt = ""),
          (c.style.objectPosition = a === "mara" ? "center 32%" : "center"),
          u.appendChild(c),
          Object.assign(u.style, poseStyle(n, i)),
          this.stack.set(a, {
            node: u,
            base: i,
            pose: n,
          });
      }
      await this.arrive(await waitForArchiveCards(this.abort.signal));
    } catch (e) {
      this.recover(e);
    } finally {
      this.cleanup();
    }
  }
  async arrive(e) {
    clearPortfolioFlight(),
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      }),
      (e.dataset.flightLanded = ""),
      this.lockContent(),
      await nextFrame(this.abort.signal),
      await nextFrame(this.abort.signal);
    let a = [...e.querySelectorAll(".project-cover")],
      l = a.map(rectOf),
      n = a.map((o, f) => {
        let p = o.closest(".archive-card"),
          v = l[f],
          d = this.stack.get(p.id),
          m = d?.base ?? v,
          S = d?.pose ?? collapsedPose(this.origin),
          A = d?.node ?? this.figure(m),
          N = o.cloneNode(true);
        return (
          N.removeAttribute("id"),
          N.querySelectorAll("[id]").forEach((s) => s.removeAttribute("id")),
          Object.assign(N.style, {
            position: "absolute",
            left: "0",
            top: "0",
            width: v.width + "px",
            height: v.height + "px",
            transformOrigin: "0 0",
            transform: `scale(${m.width / v.width},${m.height / v.height})`,
          }),
          A.appendChild(N),
          d || Object.assign(A.style, poseStyle(S, m)),
          d || (A.style.zIndex = "-1"),
          {
            node: A,
            copy: N,
            article: p,
            source: d,
            pose: S,
            dest: v,
            base: m,
            index: f,
          }
        );
      });
    await decodeImages(
      n.map((o) => o.copy),
      this.abort.signal,
    ),
      (document.documentElement.dataset.projectTransition = "arriving");
    // El tope de seguridad se renueva al empezar la llegada: si no, cortaba las últimas fotos antes de posarse.
    clearTimeout(this.safety), (this.safety = setTimeout(() => this.skip(), 4200));
    let i = document.timeline?.currentTime,
      u = typeof i == "number" ? i : undefined;
    if (
      (await Promise.all([
        this.animate(
          this.wash,
          [
            {
              opacity: 1,
              clipPath: "inset(0)",
            },
            {
              opacity: 1,
              clipPath: "inset(50% 0 50% 0)",
            },
          ],
          {
            duration: 320,
            easing: "cubic-bezier(.65,0,.35,1)",
          },
          u,
        ),
        ...n.map(async ({ node: o, article: f, pose: p, dest: v, base: d, index: m }) => {
          let S = flightTiming(m),
            A = poseKeyframes((N) => landingPose(p, v, m, N), d, 120);
          if (
            (await Promise.all([
              this.animate(
                o,
                A,
                {
                  ...S,
                  fill: "forwards",
                },
                u,
              ),
              this.animate(
                o,
                [
                  {
                    clipPath: "inset(0 0 100% 0)",
                  },
                  {
                    clipPath: "inset(0)",
                  },
                ],
                {
                  duration: S.duration * 0.6,
                  delay: S.delay + S.duration * 0.14,
                  easing: "cubic-bezier(.22,1,.36,1)",
                },
                u,
              ),
            ]),
            !this.abort.signal.aborted)
          ) {
            (f.dataset.photoLanded = ""), o.remove();
            for (let N of f.querySelectorAll(".archive-card-title,.archive-card-caption"))
              N.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  },
                ],
                {
                  duration: 230,
                  easing: "ease-out",
                },
              );
          }
        }),
      ]),
      this.abort.signal.aborted)
    )
      return;
    this.cleanup();
    let c = document.querySelector(".archive-intro h1");
    c &&
      ((c.tabIndex = -1),
      c.focus({
        preventScroll: true,
      }));
  }
  skip() {
    if (!this.done) {
      this.abort.abort(), clearPortfolioFlight();
      try {
        this.move();
      } catch {
        window.location.assign(this.fallbackHref);
      }
      clearPortfolioFlight(), this.cleanup();
    }
  }
  cancel() {
    this.abort.abort(), clearPortfolioFlight(), this.cleanup(true);
  }
  dispose() {
    this.abort.abort(), this.cleanup();
  }
  resized() {
    window.innerWidth !== this.width && this.skip();
  }
  recover(e) {
    if (!this.abort.signal.aborted && (clearPortfolioFlight(), !document.querySelector(".archive-grid"))) {
      let a = new URL(this.fallbackHref, window.location.href).href;
      a === window.location.href ? window.location.reload() : window.location.assign(a);
    }
  }
  cleanup(e = false) {
    this.done ||
      ((this.done = true),
      clearTimeout(this.safety),
      ["pointerdown", "touchstart", "wheel", "keydown"].forEach((type) =>
        window.removeEventListener(type, this.interrupt, { capture: true }),
      ),
      this.animations.forEach((a) => a.cancel()),
      this.animations.clear(),
      this.layer.remove(),
      delete document.documentElement.dataset.projectTransition,
      document.querySelectorAll(".archive-card[data-photo-landed]").forEach((a) => {
        delete a.dataset.photoLanded;
      }),
      (document.body.style.overflow = this.oldOverflow),
      (document.body.style.paddingRight = this.oldPadding),
      (document.documentElement.style.scrollBehavior = this.oldScrollBehavior),
      this.inert.forEach((a, l) => {
        l.inert = a;
      }),
      this.inert.clear(),
      window.dispatchEvent(new Event(PORTFOLIO_END_EVENT)),
      e &&
        this.previousFocus?.isConnected &&
        this.previousFocus.focus({
          preventScroll: true,
        }));
  }
}
