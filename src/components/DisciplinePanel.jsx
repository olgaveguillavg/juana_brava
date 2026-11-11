import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects.js";

export function JBDisciplinePanel({ options: t, matching: e, selected: a, onChoose: l, onDismiss: n }) {
  let [i, u] = useState(
      Math.max(
        0,
        t.findIndex((r) => r.id === a),
      ),
    ),
    f = useRef(0),
    k = useRef(0),
    v = useRef(null),
    y = useRef(null),
    [P, H] = useState({
      x: 0.64,
      y: 0.49,
    }),
    [V, F] = useState(false),
    [C, U] = useState(false),
    Q = useRef(false),
    T = useRef(null);
  let exit = (selectedId) => {
    if (Q.current) return;
    Q.current = true;
    F(false);
    U(true);
    T.current = setTimeout(() => (selectedId === null ? n() : l(selectedId)), 650);
  };
  useEffect(() => {
    let r = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let d = (o) => {
      if (o.key === "Escape") {
        o.preventDefault();
        exit(null);
      } else if (["ArrowDown", "ArrowRight", "PageDown"].includes(o.key)) {
        o.preventDefault();
        F(false);
        u((x) => (x + 1) % t.length);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(o.key)) {
        o.preventDefault();
        F(false);
        u((x) => (x - 1 + t.length) % t.length);
      } else if (o.key === "Home") {
        o.preventDefault();
        F(false);
        u(0);
      } else if (o.key === "End") {
        o.preventDefault();
        F(false);
        u(t.length - 1);
      } else if (o.key === "Tab") {
        let z = [...document.querySelectorAll(".jb-filter-panel button")];
        if (!z.length) return;
        let h = z[0],
          q = z[z.length - 1];
        if (o.shiftKey && document.activeElement === h) {
          o.preventDefault();
          q.focus();
        } else if (!o.shiftKey && document.activeElement === q) {
          o.preventDefault();
          h.focus();
        }
      }
    };
    document.addEventListener("keydown", d);
    requestAnimationFrame(() => v.current?.focus());
    return () => {
      clearTimeout(T.current);
      document.body.style.overflow = r;
      document.removeEventListener("keydown", d);
    };
  }, []);
  let c = t[i],
    m = projects.filter((r) => e(r, c.id)),
    h = {
      all: "juana-brava",
      identity: "juana-brava",
      art: "mara",
      digital: "sobremesa",
      campaign: "mara",
    },
    g = m.find((r) => r.slug === h[c.id]) || m[0] || projects[0];
  let move = (r) => {
    let d = y.current?.getBoundingClientRect();
    if (!d) return;
    H({
      x: Math.max(0.13, Math.min(0.83, (r.clientX - d.left) / d.width)),
      y: Math.max(0.2, Math.min(0.8, (r.clientY - d.top) / d.height)),
    });
  };
  let point = (r, d) => {
    u(d);
    if (r.pointerType === "mouse" || r.pointerType === "pen") {
      F(true);
      move(r);
    }
  };
  return (
    <>
      <div
        className="jb-filter-backdrop"
        data-state={C ? "closing" : "open"}
        onClick={() => exit(null)}
        aria-hidden="true"
      />
      <section
        className="jb-filter-panel"
        data-state={C ? "closing" : "open"}
        role="dialog"
        aria-modal
        aria-label="Explorar proyectos por disciplina"
        onWheel={(r) => {
          if (C) return;
          F(false);
          let d = Date.now();
          if (Math.abs(r.deltaY) < 5 || d - f.current < 260) return;
          f.current = d;
          u((x) => (x + (r.deltaY > 0 ? 1 : -1) + t.length) % t.length);
        }}
        onTouchStart={(r) => {
          k.current = r.touches[0]?.clientY ?? 0;
        }}
        onTouchEnd={(r) => {
          if (C) return;
          F(false);
          let d = (r.changedTouches[0]?.clientY ?? 0) - k.current;
          if (Math.abs(d) > 35) u((x) => (x + (d < 0 ? 1 : -1) + t.length) % t.length);
        }}
      >
        <div className="jb-filter-head jb-filter-head-minimal">
          <button
            type="button"
            className="jb-filter-close"
            onClick={() => exit(null)}
            ref={v}
            aria-label="Cerrar selector"
          >
            ×
          </button>
        </div>
        <div className="jb-filter-stage" ref={y} onPointerLeave={() => F(false)}>
          <div className="jb-filter-list" role="group" aria-label="Disciplinas" onPointerLeave={() => F(false)}>
            {t.map((r, d) => (
              <button
                key={r.id}
                type="button"
                className="jb-filter-choice"
                data-current={i === d}
                aria-pressed={a === r.id}
                onPointerEnter={(o) => point(o, d)}
                onPointerMove={(o) => point(o, d)}
                onPointerLeave={() => F(false)}
                onFocus={(o) => {
                  u(d);
                  F(true);
                  let x = o.currentTarget.getBoundingClientRect(),
                    B = y.current?.getBoundingClientRect();
                  B &&
                    H({
                      x: Math.max(0.15, Math.min(0.82, (x.left + x.width * 0.65 - B.left) / B.width)),
                      y: Math.max(0.2, Math.min(0.8, (x.top + x.height * 0.5 - B.top) / B.height)),
                    });
                }}
                onBlur={() => F(false)}
                onClick={() => exit(r.id)}
              >
                {r.stage}
              </button>
            ))}
          </div>
          <img
            className="jb-filter-photo"
            data-visible={V && !C ? "true" : "false"}
            key={g.slug + "-" + c.id}
            src={g.image}
            alt=""
            decoding="async"
            style={{
              left: P.x * 100 + "%",
              top: P.y * 100 + "%",
            }}
          />
        </div>
        <div className="jb-filter-foot jb-filter-foot-minimal">
          <button type="button" className="jb-filter-apply" onClick={() => exit(c.id)}>
            {"Ver proyectos "}
          </button>
        </div>
      </section>
    </>
  );
}
