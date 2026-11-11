import { Arrow } from "./Arrow.jsx";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import {
  ArcMotion,
  DEFAULT_ARC_GEOMETRY,
  LiftPreview,
  arcGeometry,
  arcLayoutFor,
  arcPoint,
  arcProgressPosition,
  arcScrollDistance,
  liftPreviewRect,
  nonNegative,
  wrapIndex,
  wrapOffset,
} from "../lib/arc.js";
import { PORTFOLIO_END_EVENT, PORTFOLIO_LEAVE_EVENT } from "../lib/portfolioFlight.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";

export function ArcWheel({ items: t, archiveCount: e, ariaLabel: a = "Proyectos de Juana Brava" }) {
  let l = t.length,
    n = nonNegative(l),
    i = useRef(null),
    u = useRef(null),
    c = useRef(null),
    o = useRef(null),
    f = useRef([]),
    p = useRef([]),
    v = useRef([]),
    d = useRef(null),
    m = useRef(new LiftPreview()),
    S = useRef({
      x: 0,
      y: 0,
    }),
    A = useRef(DEFAULT_ARC_GEOMETRY),
    N = useRef(new ArcMotion(l, 7)),
    s = useRef(() => {}),
    [r, h] = useState(false),
    [g, O] = useState(false),
    [X, M] = useState(""),
    R = useId(),
    B = useMemo(
      () =>
        Array.from(
          {
            length: n,
          },
          (T, q) => t[q % l],
        ),
      [t, n, l],
    ),
    C = useCallback(() => {
      let T = N.current,
        q = A.current,
        Q = T.position,
        I = wrapIndex(Q, n);
      u.current?.toggleAttribute("data-preview-open", m.current.index >= 0 && !m.current.returning),
        p.current.forEach((ct, dt) => {
          if (!ct) return;
          let Pe = wrapOffset(dt, Q, n),
            Jt = arcPoint(Pe, q);
          (ct.style.transform =
            "translate3d(" +
            (Jt.x - q.cardW / 2).toFixed(2) +
            "px," +
            (Jt.y - q.cardH / 2).toFixed(2) +
            "px,0) rotate(" +
            Jt.rotation.toFixed(3) +
            "deg) scale(" +
            Jt.scale.toFixed(4) +
            ")"),
            (ct.style.opacity = Jt.opacity.toFixed(3)),
            ct.toggleAttribute("data-extracted", m.current.index === dt),
            (ct.style.visibility = Jt.opacity > 0.001 ? "visible" : "hidden"),
            (ct.style.zIndex = String(dt === I ? 120 : 100 - Math.round(Math.abs(Pe) * 10))),
            ct.toggleAttribute("data-active", dt === I);
          let Re = v.current[dt];
          Re && ((Re.tabIndex = dt === I ? 0 : -1), Re.setAttribute("aria-hidden", dt === I ? "false" : "true"));
        });
      let V = m.current.index >= 0 ? m.current.index % l : wrapIndex(Q, l);
      f.current.forEach((ct, dt) => {
        ct && (ct.hidden = dt !== V);
      });
    }, [l, n, t]),
    le = useCallback(
      (T) => {
        let q = A.current,
          Q = arcPoint(wrapOffset(T, N.current.position, n), q);
        return {
          x: S.current.x + Q.x - q.cardW / 2,
          y: S.current.y + Q.y - q.cardH / 2,
          w: q.cardW,
          h: q.cardH,
          radius: q.cardW / 2,
        };
      },
      [n],
    ),
    Ha = () => {
      m.current.close(), s.current();
    },
    ar = (T, q) => {
      let Q = d.current,
        I = u.current;
      if (!Q || !I) return;
      let V = le(T),
        ct = t[T % l],
        dt = A.current,
        Pe =
          dt.layout === "wide" ? dt.captionLeft - 24 : dt.layout === "split" ? S.current.x + dt.frameW : I.clientWidth,
        Jt = dt.layout === "wide" ? I.clientHeight : S.current.y + dt.frameH;
      m.current.open(T, V, liftPreviewRect(V, Pe, Jt, q)),
        (Q.href = ct.href),
        Q.setAttribute("aria-label", "Explorar el caso de " + ct.title);
      let Re = Q.querySelector("img");
      (Re.src = ct.src),
        (Re.style.objectPosition = ct.id === "mara" ? "center 32%" : "center"),
        (Q.querySelector("span").textContent = ct.title),
        s.current();
    };
  useIsomorphicLayoutEffect(() => {
    let T = c.current,
      q = i.current,
      Q = u.current,
      I = o.current;
    if (!T || !q || !Q || !I || l < 1) return;
    let V = N.current;
    (V.count = l), V.interact(performance.now(), 200);
    let ct = 0,
      dt = 0,
      Pe = arcScrollDistance(900, l),
      Jt = 0,
      Re = false,
      Fu = false,
      $u,
      nr = (pe) => {
        let ve = dt ? pe - dt : 16;
        V.tick(ve, pe), (dt = pe);
        let rt = m.current,
          ye = d.current;
        if (
          (rt.index >= 0 && rt.tick(ve, le(rt.index), V.reduced),
          ye && ((ye.hidden = rt.index < 0), ye.toggleAttribute("data-returning", rt.returning), !ye.hidden))
        ) {
          let ta = rt.rect;
          (ye.style.transform = "translate3d(" + ta.x + "px," + ta.y + "px,0)"),
            (ye.style.width = ta.w + "px"),
            (ye.style.height = ta.h + "px"),
            (ye.style.borderRadius = ta.radius + "px");
        }
        C(),
          (ct = V.needsFrame || (rt.index >= 0 && (rt.returning || rt.moving)) ? requestAnimationFrame(nr) : 0),
          ct || (dt = 0);
      },
      Ca = () => {
        !Fu &&
          !ct &&
          (V.needsFrame || (m.current.index >= 0 && (m.current.returning || m.current.moving))) &&
          (ct = requestAnimationFrame(nr));
      };
    s.current = Ca;
    let ir = () => {
        (Fu = true),
          cancelAnimationFrame(ct),
          (ct = dt = 0),
          m.current.reset(),
          d.current && (d.current.hidden = true),
          C();
      },
      ur = () => {
        (Fu = false), V.interact(performance.now(), 200), C(), Ca();
      };
    window.addEventListener(PORTFOLIO_LEAVE_EVENT, ir), window.addEventListener(PORTFOLIO_END_EVENT, ur);
    let cr = () => arcProgressPosition(-q.getBoundingClientRect().top, Pe, l),
      or = () => {
        let pe = cr(),
          ve = pe - Jt;
        (Jt = pe),
          !(Math.abs(ve) < 1e-5) &&
            (m.current.close(),
            V.scroll(ve, performance.now()),
            Ca(),
            clearTimeout($u),
            ($u = setTimeout(() => {
              let rt = wrapIndex(V.target, l);
              M("Proyecto " + (rt + 1) + " de " + l + ": " + t[rt].title);
            }, 220)));
      },
      si = () => {
        let pe = arcLayoutFor(Q.clientWidth, window.innerHeight);
        (Q.dataset.layout = pe),
          Q.toggleAttribute("data-short", window.innerHeight < 680),
          Q.removeAttribute("data-flow"),
          q.removeAttribute("data-flow");
        let ve = pe === "compact" && (window.innerHeight < 640 || T.scrollHeight > T.clientHeight + 2);
        Q.toggleAttribute("data-flow", ve), q.toggleAttribute("data-flow", ve);
        let rt = arcGeometry(
          Q.clientWidth,
          window.innerHeight,
          {
            width: I.clientWidth,
            height: I.clientHeight,
          },
          n,
        );
        A.current = rt;
        let ye = I.getBoundingClientRect(),
          ta = Q.getBoundingClientRect();
        (S.current = {
          x: ye.left - ta.left,
          y: ye.top - ta.top,
        }),
          m.current.close(),
          V.setPresentation(false, performance.now()),
          p.current.forEach((ec) => {
            ec && ((ec.style.width = rt.cardW + "px"), (ec.style.height = rt.cardH + "px"));
          }),
          Q.style.setProperty("--arc-equator", rt.artTop + rt.hubY + "px"),
          Q.style.setProperty("--arc-art-top", rt.artTop + "px"),
          Q.style.setProperty("--arc-art-height", rt.artHeight + "px"),
          Q.style.setProperty("--arc-caption-left", rt.captionLeft + "px"),
          (Pe = arcScrollDistance(Q.clientHeight, l)),
          q.style.setProperty("--arc-distance", Pe + "px"),
          q.style.setProperty("--arc-scene-height", Q.clientHeight + "px"),
          (Jt = cr()),
          Re || ((V.position = V.target = V.stepped ? Math.round(Jt) : Jt), (Re = true)),
          C(),
          Ca();
      },
      Il = matchMedia("(prefers-reduced-motion: reduce)"),
      Iu = () => {
        (V.reduced = Il.matches),
          O(Il.matches),
          Il.matches && ((V.target = Math.round(V.position)), V.tick(0, performance.now()), C()),
          Ca();
      };
    Iu(), Il.addEventListener("change", Iu);
    let Pu = new ResizeObserver(si);
    Pu.observe(T), Pu.observe(I), si();
    let sr = new IntersectionObserver(
      (pe) => {
        let ve = pe[0],
          rt = V.visible;
        (V.visible =
          ve.isIntersecting && ve.intersectionRect.height >= Math.min(Q.clientHeight, window.innerHeight) * 0.45),
          V.visible && !rt && V.enter(performance.now()),
          V.visible || (m.current.reset(), d.current && (d.current.hidden = true), C()),
          Ca();
      },
      {
        threshold: [0, 0.1, 0.2, 0.35, 0.45, 0.6, 0.8],
      },
    );
    sr.observe(Q);
    let tc = () => {
      (V.hidden = document.hidden), V.hidden && (m.current.reset(), d.current && (d.current.hidden = true), C()), Ca();
    };
    return (
      document.addEventListener("visibilitychange", tc),
      tc(),
      window.addEventListener("scroll", or, {
        passive: true,
      }),
      window.addEventListener("resize", si),
      () => {
        cancelAnimationFrame(ct),
          clearTimeout($u),
          (s.current = () => {}),
          Pu.disconnect(),
          sr.disconnect(),
          Il.removeEventListener("change", Iu),
          document.removeEventListener("visibilitychange", tc),
          window.removeEventListener("scroll", or),
          window.removeEventListener("resize", si),
          window.removeEventListener(PORTFOLIO_LEAVE_EVENT, ir),
          window.removeEventListener(PORTFOLIO_END_EVENT, ur);
      }
    );
  }, [l, t, C, le]);
  let lr = () => {
      let T = wrapIndex(N.current.target, l);
      M("Proyecto " + (T + 1) + " de " + l + ": " + t[T].title);
    },
    _p = (T) => {
      N.current.select(T, performance.now()), lr(), s.current();
    };
  return t.length ? (
    <div
      ref={i}
      className="arc-scroll-track"
      style={{
        "--arc-distance": arcScrollDistance(900, l) + "px",
      }}
      role="region"
      aria-roledescription="carrusel"
      aria-label={a}
      onPointerDownCapture={(T) => {
        T.pointerType === "mouse" && ((N.current.focused = false), s.current());
      }}
      onPointerLeave={() => {
        (N.current.intent = false), Ha();
      }}
      onKeyDownCapture={(T) => {
        T.key === "Escape" && Ha();
      }}
      onFocusCapture={(T) => {
        let q = T.target;
        (N.current.focused = !q.closest("[data-autoplay-toggle]") && q.matches(":focus-visible")), s.current();
      }}
      onBlurCapture={(T) => {
        T.currentTarget.contains(T.relatedTarget) ||
          ((N.current.focused = false), N.current.interact(performance.now(), 1200), s.current());
      }}
    >
      <div ref={u} className="arc-pin">
        <header className="arc-toolbar">
          <h2 id="featured-title">Casos de éxito</h2>
          <a className="arc-more-projects" href="/proyectos" aria-label={"Ver más proyectos, " + e + " casos"}>
            <span aria-hidden="true">+</span>
            {" proyectos"}
          </a>
        </header>
        <button
          type="button"
          className="arc-motion-access"
          data-autoplay-toggle
          aria-pressed={r || g}
          aria-label={g ? "Activar movimiento" : r ? "Reanudar movimiento" : "Pausar movimiento"}
          onClick={() => {
            let T = N.current;
            T.reduced
              ? ((T.reduced = false), O(false), (T.paused = false), h(false))
              : ((T.paused = !T.paused), h(T.paused)),
              (T.target = T.position),
              T.interact(performance.now(), 180),
              s.current();
          }}
        >
          <span aria-hidden="true">
            {r || g ? (
              <svg viewBox="0 0 10 12" width="10" height="12" focusable="false">
                <path d="M0 0L10 6L0 12Z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 12" width="10" height="12" focusable="false">
                <rect x="0" y="0" width="3" height="12" fill="currentColor" />
                <rect x="7" y="0" width="3" height="12" fill="currentColor" />
              </svg>
            )}
          </span>
          {g ? "Activar" : r ? "Reanudar" : "Pausar"}
        </button>
        <div
          ref={c}
          className="arc-stage"
          tabIndex={0}
          aria-label="Rueda de proyectos, explora con scroll o las teclas arriba y abajo"
          aria-describedby={R + "-description"}
          onPointerDown={(T) => {
            T.pointerType === "mouse" && !T.target.closest("a,button") && T.preventDefault();
          }}
          onKeyDown={(T) => {
            T.target === T.currentTarget &&
              (T.key === "Home" || T.key === "End"
                ? (T.preventDefault(), _p(T.key === "Home" ? 0 : l - 1))
                : (T.key === "ArrowDown" || T.key === "ArrowUp") &&
                  (T.preventDefault(),
                  N.current.advance(T.key === "ArrowDown" ? 1 : -1, performance.now()),
                  lr(),
                  s.current()));
          }}
        >
          <div ref={o} className="arc-art">
            <div className="arc-wheel">
              {B.map((T, q) => {
                let Q = arcPoint(wrapOffset(q, 0, n), DEFAULT_ARC_GEOMETRY);
                return (
                  <div
                    key={q}
                    ref={(I) => {
                      p.current[q] = I;
                    }}
                    className="arc-card"
                    data-project={T.id}
                    data-active={q === 0 ? "" : undefined}
                    style={{
                      width: DEFAULT_ARC_GEOMETRY.cardW,
                      height: DEFAULT_ARC_GEOMETRY.cardH,
                      transform:
                        "translate3d(" +
                        (Q.x - DEFAULT_ARC_GEOMETRY.cardW / 2) +
                        "px," +
                        (Q.y - DEFAULT_ARC_GEOMETRY.cardH / 2) +
                        "px,0)",
                    }}
                  >
                    <a
                      href={T.href}
                      ref={(I) => {
                        v.current[q] = I;
                      }}
                      className="arc-circle-link"
                      aria-label={"Explorar el caso de " + T.title}
                      tabIndex={q === 0 ? 0 : -1}
                      aria-hidden={q !== 0}
                      draggable={false}
                      onPointerEnter={(I) => {
                        if (I.pointerType === "mouse" || I.pointerType === "pen") {
                          let V = u.current.getBoundingClientRect();
                          ar(q, {
                            x: I.clientX - V.left,
                            y: I.clientY - V.top,
                          });
                        }
                      }}
                      onPointerLeave={(I) => {
                        (I.relatedTarget instanceof Element && I.relatedTarget.closest("[data-lift-preview]")) || Ha();
                      }}
                      onFocus={(I) => {
                        I.currentTarget.matches(":focus-visible") && ar(q);
                      }}
                      onBlur={Ha}
                    >
                      <img
                        src={T.src}
                        alt=""
                        draggable={false}
                        decoding="async"
                        loading="lazy"
                        style={{
                          objectPosition: T.id === "mara" ? "center 32%" : "center",
                        }}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arc-caption">
            {t.map((T, q) => (
              <div
                key={T.id}
                ref={(Q) => {
                  f.current[q] = Q;
                }}
                hidden={q !== 0}
                className="arc-caption-body"
                data-project={T.id}
              >
                <p className="arc-category">{T.sector}</p>
                <h3>
                  {T.title}
                  <span>.</span>
                </h3>
                <p className="arc-lead">{T.description}</p>
                <a
                  className="case-link arc-explore"
                  href={T.href}
                  aria-label={"Explorar el caso de " + T.title}
                  onPointerEnter={() => {
                    (N.current.intent = true), (N.current.target = N.current.position);
                  }}
                  onPointerLeave={() => {
                    (N.current.intent = false), N.current.interact(performance.now(), 900), s.current();
                  }}
                >
                  {"Explorar el caso "}
                  <Arrow />
                </a>
              </div>
            ))}
          </div>
        </div>
        <a
          ref={d}
          className="arc-lift-preview"
          data-lift-preview
          hidden
          href={t[0].href}
          tabIndex={-1}
          aria-label={"Explorar el caso de " + t[0].title}
          onPointerLeave={Ha}
        >
          <img src={t[0].src} alt="" draggable={false} />
          <span aria-hidden="true">
            {t[0].title}
            {" "}<Arrow />
          </span>
        </a>
      </div>
      <p className="arc-sr" id={R + "-description"}>
        Gira con el scroll o utiliza las teclas arriba y abajo. El control de pausa está disponible con el teclado.
      </p>
      <p className="arc-sr" role="status" aria-live="polite" aria-atomic="true">
        {X}
      </p>
    </div>
  ) : null;
}
