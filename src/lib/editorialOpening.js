import { projects } from "../data/projects.js";

// En el HTML original las fotos eran data URIs; ahora son archivos, y img.src devuelve la URL absoluta.
const absoluteUrl = (url) => (url ? new URL(url, document.baseURI).href : url);

export // A single image connects the gallery and the fully prepared project hero.
function JBEditorialOpening() {
  const initialPath = location.pathname?.replace(/\/$/, "") || "/";
  if (
    !location.hash.startsWith("#!") &&
    (initialPath === "/proyectos" || projects.some((project) => initialPath === "/proyectos/" + project.slug))
  ) {
    const section = location.hash.slice(1);
    history.replaceState(null, "", "/#!" + initialPath + (section ? "?section=" + encodeURIComponent(section) : ""));
  }
  let current = null;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function nextFrame(signal) {
    return new Promise((resolve, reject) => {
      const frame = requestAnimationFrame(() => {
        signal.removeEventListener("abort", cancel);
        resolve();
      });
      const cancel = () => {
        cancelAnimationFrame(frame);
        reject(new DOMException("Cancelled", "AbortError"));
      };
      if (signal.aborted) cancel();
      else
        signal.addEventListener("abort", cancel, {
          once: true,
        });
    });
  }
  function readyImage(image, signal, timeout = 2200) {
    return new Promise((resolve, reject) => {
      let timer;
      const stop = () => {
        clearTimeout(timer);
        image.removeEventListener("load", loaded);
        image.removeEventListener("error", failed);
        signal.removeEventListener("abort", cancelled);
      };
      const finish = (error) => {
        stop();
        error ? reject(error) : resolve();
      };
      const failed = () => finish(new Error("The project image could not load"));
      const cancelled = () => finish(new DOMException("Cancelled", "AbortError"));
      const loaded = () => {
        if (!image.naturalWidth) {
          failed();
          return;
        }
        Promise.resolve(image.decode?.())
          .catch(() => {})
          .then(() => finish());
      };
      if (signal.aborted) {
        cancelled();
        return;
      }
      signal.addEventListener("abort", cancelled, {
        once: true,
      });
      timer = setTimeout(() => finish(new Error("Project image preparation timed out")), timeout);
      if (image.complete) loaded();
      else {
        image.addEventListener("load", loaded, {
          once: true,
        });
        image.addEventListener("error", failed, {
          once: true,
        });
      }
    });
  }
  function waitForHero(slug, signal) {
    return new Promise((resolve, reject) => {
      let observer, timer;
      const stop = () => {
        observer?.disconnect();
        clearTimeout(timer);
        signal.removeEventListener("abort", cancel);
      };
      const cancel = () => {
        stop();
        reject(new DOMException("Cancelled", "AbortError"));
      };
      const check = () => {
        const hero = document.getElementById("app")?.querySelector(".case-" + slug + " .case-hero-image");
        if (!hero) return false;
        stop();
        readyImage(hero, signal).then(() => resolve(hero), reject);
        return true;
      };
      if (signal.aborted) {
        cancel();
        return;
      }
      if (check()) return;
      observer = new MutationObserver(check);
      observer.observe(document.getElementById("app"), {
        childList: true,
        subtree: true,
      });
      signal.addEventListener("abort", cancel, {
        once: true,
      });
      timer = setTimeout(() => {
        stop();
        reject(new Error("The project page did not become ready"));
      }, 4000);
    });
  }

  // Cover fitting at both ends uses a uniform image scale and the actual rendered crop.
  function fittedImage(image, rect) {
    const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
    const position = getComputedStyle(image).objectPosition.split(" ");
    const fraction = (value) => (value?.endsWith("%") ? parseFloat(value) / 100 : 0.5);
    return {
      x: rect.left + (rect.width - image.naturalWidth * scale) * fraction(position[0]),
      y: rect.top + (rect.height - image.naturalHeight * scale) * fraction(position[1]),
      scale,
    };
  }
  function imageTransform(pose) {
    return `translate(${pose.x}px,${pose.y}px) scale(${pose.scale})`;
  }
  function crop(rect, width, height) {
    return `inset(${Math.max(0, rect.top)}px ${Math.max(0, width - rect.right)}px ${Math.max(0, height - rect.bottom)}px ${Math.max(0, rect.left)}px)`;
  }
  document.addEventListener(
    "click",
    function (event) {
      const link = event.target?.closest?.(".archive-card-link,.archive-row,.next-case");
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      )
        return;
      if (current) {
        event.preventDefault();
        return;
      }
      if (reduced.matches || typeof HTMLElement.prototype.animate !== "function") return;
      const raw = link.getAttribute("href") || "";
      const target = raw.startsWith("#!") ? raw : "#!" + new URL(raw, location.href).pathname;
      const slug = target.match(/^#!\/proyectos\/([a-z0-9-]+)\/?$/)?.[1];
      const project = projects.find((item) => item.slug === slug);
      if (!project || target === location.hash) return;
      event.preventDefault();
      const abort = new AbortController(),
        effects = new Set();
      const app = document.getElementById("app");
      const previousFocus = document.activeElement;
      const oldOverflow = document.body.style.overflow,
        oldPadding = document.body.style.paddingRight;
      const oldScrollBehavior = document.documentElement.style.scrollBehavior,
        oldInert = app.inert;
      let overlay,
        backdrop,
        locked = false,
        navigated = false,
        skipped = false,
        done = false;
      current = abort;
      function animate(node, frames, options) {
        const animation = node.animate(frames, {
          fill: "both",
          ...options,
        });
        effects.add(animation);
        return animation.finished;
      }
      function navigate() {
        if (!navigated) {
          navigated = true;
          window.location.hash = target;
        }
      }
      function cleanup() {
        if (done) return;
        done = true;
        effects.forEach((effect) => effect.cancel());
        effects.clear();
        overlay?.remove();
        backdrop?.remove();
        delete document.documentElement.dataset.caseOpening;
        if (locked) {
          document.body.style.overflow = oldOverflow;
          document.body.style.paddingRight = oldPadding;
          document.documentElement.style.scrollBehavior = oldScrollBehavior;
          app.inert = oldInert;
        }
        document.removeEventListener("keydown", key);
        window.removeEventListener("hashchange", routeChanged);
        window.removeEventListener("resize", resized);
        reduced.removeEventListener("change", preferenceChanged);
        if (current === abort) current = null;
      }
      function skip() {
        skipped = true;
        navigate();
        effects.forEach((effect) => {
          try {
            effect.finish();
          } catch {}
        });
      }
      function key(event) {
        if (event.key === "Escape") {
          event.preventDefault();
          skip();
        }
      }
      function routeChanged() {
        if (navigated && location.hash !== target) abort.abort();
      }
      function resized() {
        abort.abort();
        navigate();
      }
      function preferenceChanged() {
        if (reduced.matches) skip();
      }
      document.addEventListener("keydown", key);
      window.addEventListener("hashchange", routeChanged);
      window.addEventListener("resize", resized);
      reduced.addEventListener("change", preferenceChanged);
      abort.signal.addEventListener("abort", cleanup, {
        once: true,
      });
      async function open() {
        let source =
          link.querySelector(".editorial-cover img,.next-case-media img") ||
          app.querySelector(".archive-index .index-preview .editorial-cover img");
        const sameImage = source && source.src === absoluteUrl(project.image) && source.complete && source.naturalWidth;
        if (!sameImage) {
          source = new Image();
          source.src = project.image;
          await readyImage(source, abort.signal);
        }
        if (abort.signal.aborted) return;
        if (skipped) {
          await waitForHero(slug, abort.signal);
          return;
        }
        const sourceCover = sameImage ? source.closest(".editorial-cover,.next-case-media") : null;
        const sourceRect = sourceCover?.getBoundingClientRect();
        const hasVisibleSource = sourceRect && sourceRect.width > 0 && sourceRect.height > 0;
        const width = window.innerWidth,
          height = window.innerHeight;
        const fullRect = {
          left: 0,
          top: 0,
          right: document.documentElement.clientWidth,
          bottom: height,
          width: document.documentElement.clientWidth,
          height,
        };
        const originRect = hasVisibleSource ? sourceRect : fullRect;
        const origin = hasVisibleSource
          ? fittedImage(source, source.getBoundingClientRect())
          : fittedImage(source, fullRect);
        const main = app.querySelector("main"),
          mainRect = main.getBoundingClientRect();
        backdrop = document.createElement("div");
        backdrop.className = "jb-case-transition-backdrop";
        backdrop.setAttribute("aria-hidden", "true");
        backdrop.inert = true;
        const frozen = main.cloneNode(true);
        frozen.removeAttribute("id");
        frozen.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
        Object.assign(frozen.style, {
          position: "absolute",
          left: mainRect.left + "px",
          top: mainRect.top + "px",
          width: mainRect.width + "px",
          margin: "0",
        });
        backdrop.appendChild(frozen);
        document.body.appendChild(backdrop);
        overlay = document.createElement("div");
        overlay.className = "jb-case-transition-overlay";
        overlay.setAttribute("aria-label", "Abriendo " + project.name);
        overlay.tabIndex = -1;
        const image = source.cloneNode(false);
        image.removeAttribute("id");
        image.removeAttribute("loading");
        image.alt = "";
        image.className = "jb-case-transition-image";
        Object.assign(image.style, {
          width: source.naturalWidth + "px",
          height: source.naturalHeight + "px",
          transform: imageTransform(origin),
        });
        const shade = document.createElement("div");
        shade.className = "jb-case-transition-shade";
        shade.style.opacity = "0";
        overlay.appendChild(image);
        overlay.appendChild(shade);
        overlay.style.clipPath = crop(originRect, width, height);
        document.body.appendChild(overlay);
        const gap = Math.max(0, width - document.documentElement.clientWidth);
        document.body.style.paddingRight = (parseFloat(getComputedStyle(document.body).paddingRight) || 0) + gap + "px";
        document.body.style.overflow = "hidden";
        document.documentElement.style.scrollBehavior = "auto";
        app.inert = true;
        locked = true;
        document.documentElement.dataset.caseOpening = "preparing";
        overlay.focus({
          preventScroll: true,
        });
        await nextFrame(abort.signal);
        navigate();
        const hero = await waitForHero(slug, abort.signal);
        if (abort.signal.aborted) return;
        const heroSection = hero.closest(".case-hero"),
          targetRect = heroSection.getBoundingClientRect();
        const destination = fittedImage(hero, hero.getBoundingClientRect());
        const heroShade = heroSection.querySelector(".case-hero-shade");
        shade.style.backgroundImage = getComputedStyle(heroShade).backgroundImage;
        document.documentElement.dataset.caseOpening = "moving";
        const duration = skipped ? 1 : 1050;
        await Promise.all([
          animate(
            overlay,
            [
              {
                clipPath: crop(originRect, width, height),
              },
              {
                clipPath: crop(targetRect, width, height),
              },
            ],
            {
              duration,
              easing: "cubic-bezier(.65,0,.18,1)",
            },
          ),
          animate(
            image,
            [
              {
                transform: imageTransform(origin),
                opacity: hasVisibleSource ? 1 : 0,
              },
              {
                transform: imageTransform(destination),
                opacity: 1,
              },
            ],
            {
              duration,
              easing: "cubic-bezier(.65,0,.18,1)",
            },
          ),
          animate(
            shade,
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
              },
            ],
            {
              duration: duration * 0.38,
              delay: duration * 0.62,
              easing: "ease-in-out",
            },
          ),
        ]);
        await nextFrame(abort.signal);
        if (abort.signal.aborted) return;
        for (const [index, node] of [
          ...heroSection.querySelectorAll(".case-hero-title-block,.case-hero-side"),
        ].entries()) {
          node
            .animate(
              [
                {
                  opacity: 0,
                  transform: "translateY(14px)",
                  clipPath: "inset(0 0 100% 0)",
                },
                {
                  opacity: 1,
                  transform: "none",
                  clipPath: "inset(0)",
                },
              ],
              {
                duration: skipped ? 1 : 650,
                delay: skipped ? 0 : index * 90,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "both",
              },
            )
            .finished.catch(() => {});
        }
        cleanup();
        document.getElementById("case-hero-title")?.focus({
          preventScroll: true,
        });
      }
      open()
        .catch((error) => {
          if (!abort.signal.aborted) navigate();
        })
        .finally(() => {
          cleanup();
          if (abort.signal.aborted && previousFocus?.isConnected)
            previousFocus.focus({
              preventScroll: true,
            });
        });
    },
    true,
  );

  // One reversible photographic transition shared by UI control and browser history.
  function JBReverseCase(slug, historyMode = false) {
    if (current || reduced.matches || typeof HTMLElement.prototype.animate !== "function") return false;
    const hero = document.querySelector(".case-" + slug + " .case-hero-image");
    if (!hero?.naturalWidth) return false;
    const controller = new AbortController(),
      signal = controller.signal;
    current = controller;
    const app = document.getElementById("app");
    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPadding = document.body.style.paddingRight;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousInert = app.inert;
    let overlay,
      shade,
      copy,
      running = [],
      done = false,
      routeStarted = false;
    const target = "#!/proyectos";
    function navigate() {
      if (!routeStarted) {
        routeStarted = true;
        if (!historyMode) location.hash = target;
      }
    }
    function cleanup() {
      if (done) return;
      done = true;
      running.forEach((anim) => {
        try {
          anim.cancel();
        } catch {}
      });
      overlay?.remove();
      delete root.dataset.caseOpening;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPadding;
      root.style.scrollBehavior = previousScrollBehavior;
      app.inert = previousInert;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
      reduced.removeEventListener("change", onPreference);
      if (current === controller) current = null;
      const destinationLink = document.getElementById(slug)?.querySelector(".archive-card-link");
      if (destinationLink) {
        destinationLink.focus({
          preventScroll: true,
        });
      }
    }
    function fastFinish() {
      navigate();
      cleanup();
    }
    function onKey(ev) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        fastFinish();
      }
    }
    function onResize() {
      fastFinish();
    }
    function onPreference() {
      if (reduced.matches) fastFinish();
    }
    function onHashChange() {
      if (routeStarted && location.hash !== target) {
        controller.abort();
        cleanup();
      }
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);
    reduced.addEventListener("change", onPreference);
    signal.addEventListener("abort", cleanup, {
      once: true,
    });
    async function waitForCard() {
      let card;
      for (let attempt = 0; attempt < 35; attempt++) {
        if (signal.aborted) return null;
        card =
          document.getElementById(slug)?.querySelector(".editorial-cover img") ||
          [...document.querySelectorAll(".archive-index .index-preview .editorial-cover img")].find(
            (img) => img.src === absoluteUrl(projects.find((x) => x.slug === slug)?.image),
          );
        if (card) return card;
        await nextFrame(signal);
      }
      return null;
    }
    async function close() {
      // If returning from the footer, bring the original hero into view first.
      // This makes the zoom-out the true inverse of the opening, rather than
      // suddenly showing a fullscreen photo over unrelated case-study copy.
      if (historyMode && window.scrollY > 0) {
        root.style.scrollBehavior = "auto";
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
      if (!historyMode && window.scrollY > Math.max(100, window.innerHeight * 0.2)) {
        root.style.scrollBehavior = "auto";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (signal.aborted) return;
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
      const vw = document.documentElement.clientWidth,
        vh = window.innerHeight;
      const fullRect = {
        left: 0,
        top: 0,
        right: vw,
        bottom: vh,
        width: vw,
        height: vh,
      };
      const startPose = fittedImage(hero, hero.getBoundingClientRect());
      overlay = document.createElement("div");
      overlay.className = "jb-case-transition-overlay jb-case-transition-reverse";
      Object.assign(overlay.style, {
        zIndex: "80",
        clipPath: "inset(0)",
        background: "transparent",
      });
      overlay.setAttribute("aria-label", "Volviendo a proyectos");
      overlay.setAttribute("role", "status");
      copy = hero.cloneNode(false);
      copy.className = "jb-case-transition-image";
      copy.removeAttribute("loading");
      copy.alt = "";
      Object.assign(copy.style, {
        width: hero.naturalWidth + "px",
        height: hero.naturalHeight + "px",
        transform: imageTransform(startPose),
      });
      shade = document.createElement("div");
      shade.className = "jb-case-transition-shade";
      shade.style.backgroundImage = getComputedStyle(
        hero.closest(".case-hero").querySelector(".case-hero-shade"),
      ).backgroundImage;
      overlay.appendChild(copy);
      overlay.appendChild(shade);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      app.inert = true;
      root.dataset.caseOpening = "closing";
      await nextFrame(signal);
      navigate();
      const targetImage = await waitForCard();
      if (!targetImage || signal.aborted) {
        cleanup();
        return;
      }
      const article = targetImage.closest(".archive-card");
      // Make the corresponding item visible before computing the reverse FLIP.
      article?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
      await nextFrame(signal);
      await readyImage(targetImage, signal, 1800).catch(() => {});
      if (signal.aborted) return;
      const cover = targetImage.closest(".editorial-cover");
      if (!cover) {
        cleanup();
        return;
      }
      const r = cover.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) {
        cleanup();
        return;
      }
      const endPose = fittedImage(targetImage, r);
      const destinationClip = crop(r, vw, vh);
      const duration = 1050,
        ease = "cubic-bezier(.65,0,.18,1)";
      running = [
        overlay.animate(
          [
            {
              clipPath: "inset(0)",
            },
            {
              clipPath: destinationClip,
            },
          ],
          {
            duration,
            easing: ease,
            fill: "both",
          },
        ),
        copy.animate(
          [
            {
              transform: imageTransform(startPose),
            },
            {
              transform: imageTransform(endPose),
            },
          ],
          {
            duration,
            easing: ease,
            fill: "both",
          },
        ),
        shade.animate(
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: duration * 0.6,
            delay: duration * 0.15,
            easing: "ease-in-out",
            fill: "both",
          },
        ),
      ];
      await Promise.allSettled(running.map((anim) => anim.finished));
      if (signal.aborted) return;
      // The final frame shares the target cover's exact geometry and crop.
      await nextFrame(signal);
      cleanup();
    }
    close()
      .catch(() => {
        if (!signal.aborted) navigate();
      })
      .finally(cleanup);
    return true;
  }
  window.JBHistoryZoomOut = function (fromPath) {
    const slug = fromPath?.match(/^\/proyectos\/([a-z0-9-]+)\/?$/)?.[1];
    if (!slug || location.hash !== "#!/proyectos") return false;
    return JBReverseCase(slug, true);
  };
  document.addEventListener(
    "click",
    function (event) {
      const link = event.target?.closest?.(".case-return-link,.case-return-footer");
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank"
      )
        return;
      const slug = location.hash.match(/^#!\/proyectos\/([a-z0-9-]+)\/?(?:\?.*)?$/)?.[1];
      if (!slug || !projects.some((item) => item.slug === slug)) return;
      if (JBReverseCase(slug, false)) event.preventDefault();
    },
    true,
  );

  // If browser Forward re-opens a project, use the same image-to-viewport motion.
  window.JBHistoryZoomIn = function (toPath) {
    const slug = toPath?.match(/^\/proyectos\/([a-z0-9-]+)\/?$/)?.[1];
    if (!slug || current || reduced.matches || typeof HTMLElement.prototype.animate !== "function") return false;
    const source = document.getElementById(slug)?.querySelector(".editorial-cover img");
    if (!source?.naturalWidth) return false;
    const cover = source.closest(".editorial-cover"),
      originRect = cover?.getBoundingClientRect();
    if (!originRect || originRect.width < 30 || originRect.height < 30) return false;
    const controller = new AbortController(),
      signal = controller.signal;
    current = controller;
    const root = document.documentElement,
      app = document.getElementById("app");
    const width = innerWidth,
      height = innerHeight;
    const origin = fittedImage(source, source.getBoundingClientRect());
    const backdrop = document.createElement("div");
    backdrop.className = "jb-case-transition-backdrop";
    const main = app.querySelector("main"),
      mainRect = main.getBoundingClientRect();
    const frozen = main.cloneNode(true);
    frozen.removeAttribute("id");
    frozen.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    Object.assign(frozen.style, {
      position: "absolute",
      left: mainRect.left + "px",
      top: mainRect.top + "px",
      width: mainRect.width + "px",
      margin: "0",
    });
    backdrop.appendChild(frozen);
    document.body.appendChild(backdrop);
    const overlay = document.createElement("div");
    overlay.className = "jb-case-transition-overlay";
    const image = source.cloneNode(false);
    image.className = "jb-case-transition-image";
    image.alt = "";
    image.removeAttribute("loading");
    Object.assign(image.style, {
      width: source.naturalWidth + "px",
      height: source.naturalHeight + "px",
      transform: imageTransform(origin),
    });
    const shade = document.createElement("div");
    shade.className = "jb-case-transition-shade";
    shade.style.opacity = "0";
    overlay.appendChild(image);
    overlay.appendChild(shade);
    overlay.style.clipPath = crop(originRect, width, height);
    document.body.appendChild(overlay);
    root.dataset.caseOpening = "history-opening";
    let finished = false;
    function cleanup() {
      if (finished) return;
      finished = true;
      overlay.remove();
      backdrop.remove();
      delete root.dataset.caseOpening;
      if (current === controller) current = null;
    }
    async function animateOpening() {
      try {
        const hero = await waitForHero(slug, signal);
        const heroSection = hero.closest(".case-hero"),
          targetRect = heroSection.getBoundingClientRect(),
          target = fittedImage(hero, hero.getBoundingClientRect());
        shade.style.backgroundImage = getComputedStyle(heroSection.querySelector(".case-hero-shade")).backgroundImage;
        await Promise.all([
          overlay.animate(
            [
              {
                clipPath: crop(originRect, width, height),
              },
              {
                clipPath: crop(targetRect, width, height),
              },
            ],
            {
              duration: 1050,
              easing: "cubic-bezier(.65,0,.18,1)",
              fill: "both",
            },
          ).finished,
          image.animate(
            [
              {
                transform: imageTransform(origin),
              },
              {
                transform: imageTransform(target),
              },
            ],
            {
              duration: 1050,
              easing: "cubic-bezier(.65,0,.18,1)",
              fill: "both",
            },
          ).finished,
          shade.animate(
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
              },
            ],
            {
              duration: 350,
              delay: 700,
              easing: "ease-in-out",
              fill: "both",
            },
          ).finished,
        ]);
      } catch (e) {
      } finally {
        cleanup();
      }
    }
    animateOpening();
    setTimeout(cleanup, 3300);
    return true;
  };
}
