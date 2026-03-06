
(function() {
  const source = new EventSource('http://localhost:35729/esbuild');
  source.addEventListener('change', () => {
    location.reload();
  });
  source.addEventListener('error', (e) => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('[Live Reload] Connection closed');
    }
  });
  console.log('[Live Reload] Listening for changes...');
})();

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/config.js
  var config;
  var init_config = __esm({
    "src/config.js"() {
      config = {
        enableBarba: true
      };
    }
  });

  // src/utils/logger.js
  var windowOverride, isDev, logger;
  var init_logger = __esm({
    "src/utils/logger.js"() {
      windowOverride = typeof window !== "undefined" && typeof window.__APP_DEBUG_LOGS__ !== "undefined" ? Boolean(window.__APP_DEBUG_LOGS__) : void 0;
      isDev = windowOverride ?? (typeof process === "undefined" || true);
      logger = {
        /**
         * Log message (only in development)
         * @param {...any} args - Arguments to log
         */
        log: (...args) => {
          if (isDev) {
            console.log(...args);
          }
        },
        /**
         * Log warning (only in development)
         * @param {...any} args - Arguments to log
         */
        warn: (...args) => {
          if (isDev) {
            console.warn(...args);
          }
        },
        /**
         * Log error (always logged, even in production)
         * @param {...any} args - Arguments to log
         */
        error: (...args) => {
          console.error(...args);
        },
        /**
         * Log info (only in development)
         * @param {...any} args - Arguments to log
         */
        info: (...args) => {
          if (isDev) {
            console.info(...args);
          }
        }
      };
    }
  });

  // node_modules/.pnpm/@studio-freight+lenis@1.0.42/node_modules/@studio-freight/lenis/dist/lenis.mjs
  var lenis_exports = {};
  __export(lenis_exports, {
    default: () => Lenis
  });
  function t(t2, e2, i) {
    return Math.max(t2, Math.min(e2, i));
  }
  var Animate, Dimensions, Emitter, e, VirtualScroll, Lenis;
  var init_lenis = __esm({
    "node_modules/.pnpm/@studio-freight+lenis@1.0.42/node_modules/@studio-freight/lenis/dist/lenis.mjs"() {
      Animate = class {
        advance(e2) {
          if (!this.isRunning)
            return;
          let i = false;
          if (this.lerp)
            this.value = (s = this.value, o = this.to, n = 60 * this.lerp, r = e2, function(t2, e3, i2) {
              return (1 - i2) * t2 + i2 * e3;
            }(s, o, 1 - Math.exp(-n * r))), Math.round(this.value) === this.to && (this.value = this.to, i = true);
          else {
            this.currentTime += e2;
            const s2 = t(0, this.currentTime / this.duration, 1);
            i = s2 >= 1;
            const o2 = i ? 1 : this.easing(s2);
            this.value = this.from + (this.to - this.from) * o2;
          }
          var s, o, n, r;
          this.onUpdate?.(this.value, i), i && this.stop();
        }
        stop() {
          this.isRunning = false;
        }
        fromTo(t2, e2, { lerp: i = 0.1, duration: s = 1, easing: o = (t3) => t3, onStart: n, onUpdate: r }) {
          this.from = this.value = t2, this.to = e2, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, n?.(), this.onUpdate = r;
        }
      };
      Dimensions = class {
        constructor({ wrapper: t2, content: e2, autoResize: i = true, debounce: s = 250 } = {}) {
          __publicField(this, "resize", () => {
            this.onWrapperResize(), this.onContentResize();
          });
          __publicField(this, "onWrapperResize", () => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
          });
          __publicField(this, "onContentResize", () => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
          });
          this.wrapper = t2, this.content = e2, i && (this.debouncedResize = /* @__PURE__ */ function(t3, e3) {
            let i2;
            return function() {
              let s2 = arguments, o = this;
              clearTimeout(i2), i2 = setTimeout(function() {
                t3.apply(o, s2);
              }, e3);
            };
          }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
        }
        destroy() {
          this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
        }
        get limit() {
          return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
        }
      };
      Emitter = class {
        constructor() {
          this.events = {};
        }
        emit(t2, ...e2) {
          let i = this.events[t2] || [];
          for (let t3 = 0, s = i.length; t3 < s; t3++)
            i[t3](...e2);
        }
        on(t2, e2) {
          return this.events[t2]?.push(e2) || (this.events[t2] = [e2]), () => {
            this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
          };
        }
        off(t2, e2) {
          this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
        }
        destroy() {
          this.events = {};
        }
      };
      e = 100 / 6;
      VirtualScroll = class {
        constructor(t2, { wheelMultiplier: e2 = 1, touchMultiplier: i = 1 }) {
          __publicField(this, "onTouchStart", (t2) => {
            const { clientX: e2, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2;
            this.touchStart.x = e2, this.touchStart.y = i, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
          });
          __publicField(this, "onTouchMove", (t2) => {
            const { clientX: e2, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2, s = -(e2 - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = e2, this.touchStart.y = i, this.lastDelta = { x: s, y: o }, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: t2 });
          });
          __publicField(this, "onTouchEnd", (t2) => {
            this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
          });
          __publicField(this, "onWheel", (t2) => {
            let { deltaX: i, deltaY: s, deltaMode: o } = t2;
            i *= 1 === o ? e : 2 === o ? this.windowWidth : 1, s *= 1 === o ? e : 2 === o ? this.windowHeight : 1, i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: i, deltaY: s, event: t2 });
          });
          __publicField(this, "onWindowResize", () => {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
          });
          this.element = t2, this.wheelMultiplier = e2, this.touchMultiplier = i, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
        }
        on(t2, e2) {
          return this.emitter.on(t2, e2);
        }
        destroy() {
          this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
        }
      };
      Lenis = class {
        constructor({ wrapper: t2 = window, content: e2 = document.documentElement, wheelEventsTarget: i = t2, eventsTarget: s = i, smoothWheel: o = true, syncTouch: n = false, syncTouchLerp: r = 0.075, touchInertiaMultiplier: l = 35, duration: h, easing: a = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c = !h && 0.1, infinite: d = false, orientation: p = "vertical", gestureOrientation: u = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, __experimental__naiveDimensions: S = false } = {}) {
          this.__isSmooth = false, this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.onVirtualScroll = ({ deltaX: t3, deltaY: e3, event: i2 }) => {
            if (i2.ctrlKey)
              return;
            const s2 = i2.type.includes("touch"), o2 = i2.type.includes("wheel");
            if (this.options.syncTouch && s2 && "touchstart" === i2.type && !this.isStopped && !this.isLocked)
              return void this.reset();
            const n2 = 0 === t3 && 0 === e3, r2 = "vertical" === this.options.gestureOrientation && 0 === e3 || "horizontal" === this.options.gestureOrientation && 0 === t3;
            if (n2 || r2)
              return;
            let l2 = i2.composedPath();
            if (l2 = l2.slice(0, l2.indexOf(this.rootElement)), l2.find((t4) => {
              var e4, i3, n3, r3, l3;
              return (null === (e4 = t4.hasAttribute) || void 0 === e4 ? void 0 : e4.call(t4, "data-lenis-prevent")) || s2 && (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent-touch")) || o2 && (null === (n3 = t4.hasAttribute) || void 0 === n3 ? void 0 : n3.call(t4, "data-lenis-prevent-wheel")) || (null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis")) && !(null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis-stopped"));
            }))
              return;
            if (this.isStopped || this.isLocked)
              return void i2.preventDefault();
            if (this.isSmooth = this.options.syncTouch && s2 || this.options.smoothWheel && o2, !this.isSmooth)
              return this.isScrolling = false, void this.animate.stop();
            i2.preventDefault();
            let h2 = e3;
            "both" === this.options.gestureOrientation ? h2 = Math.abs(e3) > Math.abs(t3) ? e3 : t3 : "horizontal" === this.options.gestureOrientation && (h2 = t3);
            const a2 = s2 && this.options.syncTouch, c2 = s2 && "touchend" === i2.type && Math.abs(h2) > 5;
            c2 && (h2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h2, Object.assign({ programmatic: false }, a2 ? { lerp: c2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
          }, this.onNativeScroll = () => {
            if (!this.__preventNextScrollEvent && !this.isScrolling) {
              const t3 = this.animatedScroll;
              this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t3), this.emit();
            }
          }, window.lenisVersion = "1.0.42", t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: e2, wheelEventsTarget: i, eventsTarget: s, smoothWheel: o, syncTouch: n, syncTouchLerp: r, touchInertiaMultiplier: l, duration: h, easing: a, lerp: c, infinite: d, gestureOrientation: u, orientation: p, touchMultiplier: m, wheelMultiplier: v, autoResize: g, __experimental__naiveDimensions: S }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: e2, autoResize: g }), this.toggleClassName("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = n || o, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.virtualScroll = new VirtualScroll(s, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
        }
        destroy() {
          this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", false), this.toggleClassName("lenis-smooth", false), this.toggleClassName("lenis-scrolling", false), this.toggleClassName("lenis-stopped", false), this.toggleClassName("lenis-locked", false);
        }
        on(t2, e2) {
          return this.emitter.on(t2, e2);
        }
        off(t2, e2) {
          return this.emitter.off(t2, e2);
        }
        setScroll(t2) {
          this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
        }
        resize() {
          this.dimensions.resize();
        }
        emit() {
          this.emitter.emit("scroll", this);
        }
        reset() {
          this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
        }
        start() {
          this.isStopped && (this.isStopped = false, this.reset());
        }
        stop() {
          this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
        }
        raf(t2) {
          const e2 = t2 - (this.time || t2);
          this.time = t2, this.animate.advance(1e-3 * e2);
        }
        scrollTo(e2, { offset: i = 0, immediate: s = false, lock: o = false, duration: n = this.options.duration, easing: r = this.options.easing, lerp: l = !n && this.options.lerp, onComplete: h, force: a = false, programmatic: c = true } = {}) {
          if (!this.isStopped && !this.isLocked || a) {
            if (["top", "left", "start"].includes(e2))
              e2 = 0;
            else if (["bottom", "right", "end"].includes(e2))
              e2 = this.limit;
            else {
              let t2;
              if ("string" == typeof e2 ? t2 = document.querySelector(e2) : (null == e2 ? void 0 : e2.nodeType) && (t2 = e2), t2) {
                if (this.options.wrapper !== window) {
                  const t3 = this.options.wrapper.getBoundingClientRect();
                  i -= this.isHorizontal ? t3.left : t3.top;
                }
                const s2 = t2.getBoundingClientRect();
                e2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
              }
            }
            if ("number" == typeof e2) {
              if (e2 += i, e2 = Math.round(e2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : e2 = t(0, e2, this.limit), s)
                return this.animatedScroll = this.targetScroll = e2, this.setScroll(this.scroll), this.reset(), void (null == h || h(this));
              if (!c) {
                if (e2 === this.targetScroll)
                  return;
                this.targetScroll = e2;
              }
              this.animate.fromTo(this.animatedScroll, e2, { duration: n, easing: r, lerp: l, onStart: () => {
                o && (this.isLocked = true), this.isScrolling = true;
              }, onUpdate: (t2, e3) => {
                this.isScrolling = true, this.velocity = t2 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t2, this.setScroll(this.scroll), c && (this.targetScroll = t2), e3 || this.emit(), e3 && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = true, requestAnimationFrame(() => {
                  delete this.__preventNextScrollEvent;
                }));
              } });
            }
          }
        }
        get rootElement() {
          return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
        }
        get limit() {
          return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
        }
        get isHorizontal() {
          return "horizontal" === this.options.orientation;
        }
        get actualScroll() {
          return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
        }
        get scroll() {
          return this.options.infinite ? (t2 = this.animatedScroll, e2 = this.limit, (t2 % e2 + e2) % e2) : this.animatedScroll;
          var t2, e2;
        }
        get progress() {
          return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
        get isSmooth() {
          return this.__isSmooth;
        }
        set isSmooth(t2) {
          this.__isSmooth !== t2 && (this.__isSmooth = t2, this.toggleClassName("lenis-smooth", t2));
        }
        get isScrolling() {
          return this.__isScrolling;
        }
        set isScrolling(t2) {
          this.__isScrolling !== t2 && (this.__isScrolling = t2, this.toggleClassName("lenis-scrolling", t2));
        }
        get isStopped() {
          return this.__isStopped;
        }
        set isStopped(t2) {
          this.__isStopped !== t2 && (this.__isStopped = t2, this.toggleClassName("lenis-stopped", t2));
        }
        get isLocked() {
          return this.__isLocked;
        }
        set isLocked(t2) {
          this.__isLocked !== t2 && (this.__isLocked = t2, this.toggleClassName("lenis-locked", t2));
        }
        get className() {
          let t2 = "lenis";
          return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
        }
        toggleClassName(t2, e2) {
          this.rootElement.classList.toggle(t2, e2), this.emitter.emit("className change", this);
        }
      };
    }
  });

  // src/global/lenis.js
  async function actuallyInitLenis() {
    if (lenisLoaded)
      return;
    lenisLoaded = true;
    try {
      let raf = function(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      const { default: Lenis2 } = await Promise.resolve().then(() => (init_lenis(), lenis_exports));
      logger.log("\u{1F3AF} Lenis smooth scroll loading...");
      lenis = new Lenis2({
        duration: 1.2,
        // Animation duration in seconds
        easing: (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)),
        // Easing function
        orientation: "vertical",
        // 'vertical' or 'horizontal'
        gestureOrientation: "vertical",
        // 'vertical', 'horizontal', or 'both'
        smoothWheel: true,
        // Enable smooth scrolling for mouse wheel
        wheelMultiplier: 1,
        // Mouse wheel sensitivity
        smoothTouch: false,
        // Disabled for better mobile performance
        touchMultiplier: 2,
        // Touch sensitivity
        infinite: false,
        // Infinite scrolling
        autoResize: true,
        // Auto resize on window resize
        lerp: 0.1
        // Lower = smoother but slower, higher = faster but less smooth
      });
      requestAnimationFrame(raf);
      logger.log("\u2705 Lenis smooth scroll ready");
      document.addEventListener(
        "click",
        (e2) => {
          if (!lenis)
            return;
          const anchor = e2.target.closest('a[href^="#"]');
          if (!anchor)
            return;
          const href = anchor.getAttribute("href");
          if (href === "#" || href === "#!")
            return;
          const target = document.querySelector(href);
          if (target) {
            e2.preventDefault();
            const navbar = document.querySelector("[data-navbar]");
            const offset = navbar ? navbar.offsetHeight : 0;
            lenis.scrollTo(target, {
              offset: -offset,
              duration: 1.2
            });
          }
        },
        { passive: false }
        // Can't be passive because we preventDefault
      );
      document.addEventListener(
        "click",
        (e2) => {
          if (!lenis)
            return;
          const button = e2.target.closest("[data-scroll-to]");
          if (!button)
            return;
          e2.preventDefault();
          const target = button.getAttribute("data-scroll-to");
          if (target === "top") {
            lenis.scrollTo(0, { duration: 1.2 });
          } else if (target === "bottom") {
            lenis.scrollTo(document.body.scrollHeight, { duration: 1.5 });
          } else if (target.startsWith("#")) {
            const element = document.querySelector(target);
            if (element) {
              const navbar = document.querySelector("[data-navbar]");
              const offset = navbar ? navbar.offsetHeight : 0;
              lenis.scrollTo(element, {
                offset: -offset,
                duration: 1.2
              });
            }
          }
        },
        { passive: false }
        // Can't be passive because we preventDefault
      );
    } catch (error) {
      logger.error("Error loading Lenis:", error);
    }
  }
  function initLenis() {
    if (lenisImport)
      return;
    logger.log("\u23F3 Lenis will load on first interaction...");
    const interactionEvents = ["scroll", "wheel", "touchstart", "click", "mousemove"];
    let hasInteracted = false;
    const loadOnInteraction = () => {
      if (hasInteracted)
        return;
      hasInteracted = true;
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadOnInteraction, { passive: true });
      });
      actuallyInitLenis();
    };
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });
    lenisImport = true;
  }
  function getLenis() {
    return lenis;
  }
  function stopLenis() {
    if (lenis)
      lenis.stop();
  }
  function startLenis() {
    if (lenis)
      lenis.start();
  }
  var lenis, lenisLoaded, lenisImport;
  var init_lenis2 = __esm({
    "src/global/lenis.js"() {
      init_logger();
      lenis = null;
      lenisLoaded = false;
      lenisImport = null;
    }
  });

  // src/utils/helpers.js
  function rafThrottle(func) {
    let ticking = false;
    return function executedFunction(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          func(...args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }
  function handleStagger() {
    if (!document.querySelector("[data-stagger]"))
      return;
    document.querySelectorAll("[data-stagger]").forEach((t2) => {
      const staggerValue = t2.getAttribute("data-stagger");
      const hasDelayAttribute = t2.hasAttribute("data-stagger-delay");
      const delayValue = t2.getAttribute("data-stagger-delay");
      const effectiveStagger = staggerValue && Number(staggerValue) > 1 ? Number(staggerValue) : 100;
      let currentDelay;
      if (hasDelayAttribute) {
        currentDelay = delayValue && delayValue !== "" ? Number(delayValue) : effectiveStagger;
      } else {
        currentDelay = 0;
      }
      Array.from(t2.querySelectorAll("[data-anim], .data-anim")).forEach((child) => {
        if (currentDelay > 0) {
          child.style.transitionDelay = currentDelay + "ms";
        }
        currentDelay += effectiveStagger;
      });
    });
  }
  function resolveElement(ref) {
    if (!ref || typeof document === "undefined")
      return null;
    if (typeof ref === "string") {
      return document.querySelector(ref);
    }
    if (ref === window || ref === document || ref === document.documentElement) {
      return document.documentElement;
    }
    if (isDomElement(ref)) {
      return ref;
    }
    return null;
  }
  function resolveElementList(ref) {
    if (!ref || typeof document === "undefined")
      return [];
    if (typeof ref === "string") {
      return Array.from(document.querySelectorAll(ref));
    }
    if (isDomElement(ref)) {
      return [ref];
    }
    if (typeof NodeList !== "undefined" && ref instanceof NodeList) {
      return Array.from(ref).filter(isDomElement);
    }
    if (Array.isArray(ref)) {
      return ref.filter(isDomElement);
    }
    return [];
  }
  function isDomElement(node) {
    return typeof Element !== "undefined" && node instanceof Element;
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }
  function setCookie(name, value, days = 365) {
    const expires = /* @__PURE__ */ new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1e3);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
  function mirrorClick(from, to, options = {}) {
    if (typeof document === "undefined") {
      return () => {
      };
    }
    const sources = resolveElementList(from);
    const target = resolveElement(to);
    if (!sources.length) {
      logger.warn("[mirrorClick] No source element(s) found:", from);
      return () => {
      };
    }
    if (!target) {
      logger.warn("[mirrorClick] Target element not found:", to);
      return () => {
      };
    }
    const { preventOriginal = false } = options;
    const handler = (e2) => {
      if (preventOriginal) {
        e2.preventDefault();
        e2.stopPropagation();
      }
      target.click();
    };
    sources.forEach((el) => el.addEventListener("click", handler));
    return () => {
      sources.forEach((el) => el.removeEventListener("click", handler));
    };
  }
  function handleError(error, context = "Application", silent = true) {
    const errorMessage = `[${context}] ${error.message || "Unknown error"}`;
    logger.error(errorMessage, error);
    if (!silent && typeof window !== "undefined") {
      logger.warn("Error occurred:", errorMessage);
    }
    return error;
  }
  function loadScript(src, options = {}) {
    return new Promise((resolve, reject) => {
      const existingBySrc = document.querySelector(`script[src="${src}"]`);
      if (existingBySrc) {
        resolve();
        return;
      }
      if (options.id && document.querySelector(`script#${CSS.escape(options.id)}`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = options.async !== false;
      script.defer = options.defer || false;
      if (options.id) {
        script.id = options.id;
      }
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }
  var init_helpers = __esm({
    "src/utils/helpers.js"() {
      init_logger();
      init_lenis2();
    }
  });

  // src/global/footer.js
  function initFooter() {
    logger.log("\u{1F9B6} Footer initialized");
    handleLocationsection();
  }
  function cleanupFooter() {
    cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Footer Cleanup");
      }
    });
    cleanupFunctions.length = 0;
  }
  function handleLocationsection() {
    const section = document.querySelector("#clip-slider-section");
    if (!section)
      return;
    const slides = Array.from(section.querySelectorAll(".clip-slide"));
    const locationNames = [...section.querySelectorAll(".location-texts .rotation-text")];
    const locationTexts = [...section.querySelectorAll(".location-texts-wrap .rotation-text")];
    const locationTimes = [...section.querySelectorAll(".location-times-wrap .rotation-text")];
    const dayIcon = section.querySelector('[location-time-comp_icon="day"]');
    const nightIcon = section.querySelector('[location-time-comp_icon="night"]');
    const timeIcons = [dayIcon, nightIcon].filter(Boolean);
    const rotateDelayMs = 50;
    const iconClassDelayMs = 50;
    const textStaggerMs = 80;
    let textStaggerIds = [];
    let iconDelayId = null;
    let iconClassDelayId = null;
    let iconRotation = 0;
    const STATE_CLASSES = ["is-passed", "is-active", "is-next", "is-incoming"];
    let activeIndex = slides.findIndex((s) => s.classList.contains("is-active"));
    if (activeIndex === -1)
      activeIndex = 0;
    let zIndexCounter = 10;
    let zTimeout;
    function updateTextGroup(list, prev, next) {
      if (!list.length)
        return;
      list.forEach((el, i) => {
        if (i === next) {
          el.classList.add("in");
          el.classList.remove("out");
        } else if (i === prev) {
          el.classList.remove("in");
          el.classList.add("out");
        } else {
          el.classList.remove("in", "out");
        }
      });
    }
    function runLocationAnimations(prevIndex, nextIndex) {
      textStaggerIds.forEach((id) => clearTimeout(id));
      textStaggerIds = [];
      textStaggerIds.push(setTimeout(() => updateTextGroup(locationTexts, prevIndex, nextIndex), 0));
      textStaggerIds.push(
        setTimeout(() => updateTextGroup(locationNames, prevIndex, nextIndex), textStaggerMs)
      );
      textStaggerIds.push(
        setTimeout(() => updateTextGroup(locationTimes, prevIndex, nextIndex), textStaggerMs * 2)
      );
      const activeTimeEl = locationTimes[nextIndex];
      const dayNight = activeTimeEl?.getAttribute("data-daynight") || "day";
      clearTimeout(iconClassDelayId);
      iconClassDelayId = setTimeout(() => {
        if (dayIcon) {
          dayIcon.classList.toggle("in", dayNight === "day");
          dayIcon.classList.toggle("out", dayNight !== "day");
        }
        if (nightIcon) {
          nightIcon.classList.toggle("in", dayNight === "night");
          nightIcon.classList.toggle("out", dayNight !== "night");
        }
      }, iconClassDelayMs);
      clearTimeout(iconDelayId);
      iconDelayId = setTimeout(() => {
        if (!timeIcons.length)
          return;
        iconRotation += 30;
        timeIcons.forEach((icon) => {
          icon.style.transition = "transform 0.6s ease";
          icon.style.transform = `rotate(${iconRotation}deg)`;
        });
      }, rotateDelayMs);
    }
    function updateStates(prevIndexForAnim = null) {
      const prevIndex = prevIndexForAnim ?? (activeIndex - 1 + slides.length) % slides.length;
      slides.forEach((slide) => slide.classList.remove(...STATE_CLASSES));
      const total = slides.length;
      const passed = (activeIndex - 1 + total) % total;
      const active = activeIndex;
      const next = (activeIndex + 1) % total;
      const incoming = (activeIndex + 2) % total;
      slides[passed].classList.add("is-passed");
      slides[active].classList.add("is-active");
      slides[next].classList.add("is-next");
      slides[incoming].classList.add("is-incoming");
      clearTimeout(zTimeout);
      zTimeout = setTimeout(() => {
        slides[incoming].style.zIndex = ++zIndexCounter;
      }, 1600);
      runLocationAnimations(prevIndex, activeIndex);
    }
    setInterval(() => {
      const prev = activeIndex;
      activeIndex = (activeIndex + 1) % slides.length;
      updateStates(prev);
    }, 5e3);
    updateStates();
  }
  var cleanupFunctions;
  var init_footer = __esm({
    "src/global/footer.js"() {
      init_helpers();
      init_logger();
      cleanupFunctions = [];
    }
  });

  // src/utils/jsdelivr.js
  function loadCSS(cssUrl, id = null) {
    return new Promise((resolve, reject) => {
      const existingLink = id ? document.querySelector(`link#${id}`) : document.querySelector(`link[href="${cssUrl}"]`);
      if (existingLink) {
        resolve();
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      if (id) {
        link.id = id;
      }
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${cssUrl}`));
      document.head.appendChild(link);
    });
  }
  async function loadLibrary(libraryName, options = {}) {
    const { loadCSS: shouldLoadCSS = true, forceReload = false } = options;
    const library = jsDelivrLibraries[libraryName];
    if (!library) {
      throw new Error(`Library "${libraryName}" not found in jsDelivrLibraries configuration`);
    }
    if (!forceReload && loadedLibraries.has(libraryName)) {
      return;
    }
    const inFlight = loadingPromises.get(libraryName);
    if (inFlight) {
      await inFlight;
      return;
    }
    const promise = (async () => {
      try {
        if (library.dependsOn && Array.isArray(library.dependsOn)) {
          for (const dep of library.dependsOn) {
            await loadLibrary(dep, { loadCSS: shouldLoadCSS, forceReload });
          }
        }
        if (shouldLoadCSS && library.css) {
          await loadCSS(library.css, `jsdelivr-${libraryName}-css`);
        }
        if (library.js) {
          await loadScript(library.js, { id: `jsdelivr-${libraryName}-js` });
        }
        loadedLibraries.add(libraryName);
        logger.log(`\u2705 ${libraryName}@${library.version} loaded from jsDelivr`);
      } catch (error) {
        handleError(error, `jsDelivr Loader (${libraryName})`);
        throw error;
      } finally {
        loadingPromises.delete(libraryName);
      }
    })();
    loadingPromises.set(libraryName, promise);
    await promise;
  }
  function isLibraryLoaded(libraryName) {
    return loadedLibraries.has(libraryName);
  }
  var jsDelivrLibraries, loadedLibraries, loadingPromises;
  var init_jsdelivr = __esm({
    "src/utils/jsdelivr.js"() {
      init_helpers();
      init_logger();
      jsDelivrLibraries = {
        // Animation Libraries
        gsap: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js",
          css: null
        },
        scrollTrigger: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js",
          css: null,
          dependsOn: ["gsap"]
        },
        splitText: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js",
          css: null,
          dependsOn: ["gsap"]
        },
        customEase: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js",
          css: null,
          dependsOn: ["gsap"]
        },
        // Carousel/Slider Libraries
        swiper: {
          version: "11",
          js: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          // css: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        },
        embla: {
          version: "latest",
          js: "https://cdn.jsdelivr.net/npm/embla-carousel/embla-carousel.umd.js",
          css: null
        }
        // Add more libraries as needed
        // Example:
        // lodash: {
        //   version: '4.17.21',
        //   js: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
        //   css: null,
        // },
      };
      loadedLibraries = /* @__PURE__ */ new Set();
      loadingPromises = /* @__PURE__ */ new Map();
    }
  });

  // src/components/gsap.js
  function shouldLoadSplitTextFirst() {
    if (typeof document === "undefined")
      return false;
    const attr = document.documentElement.getAttribute("data-split-text-script") ?? document.body?.getAttribute("data-split-text-script");
    return attr != null && String(attr).toLowerCase().trim() === "eager";
  }
  function waitForGlobal(name, timeout = 5e3) {
    return new Promise((resolve, reject) => {
      if (window[name]) {
        resolve(window[name]);
        return;
      }
      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (window[name]) {
          clearInterval(checkInterval);
          resolve(window[name]);
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error(`Timeout waiting for ${name} to load`));
        }
      }, 50);
    });
  }
  async function loadGSAP() {
    if (gsapLoaded || isLibraryLoaded("gsap")) {
      if (typeof window.gsap === "undefined") {
        await waitForGlobal("gsap");
      }
      return;
    }
    try {
      await loadLibrary("gsap", { loadCSS: false });
      await waitForGlobal("gsap");
      gsapLoaded = true;
    } catch (error) {
      handleError(error, "GSAP Loader");
      throw error;
    }
  }
  async function loadScrollTrigger() {
    if (scrollTriggerLoaded || isLibraryLoaded("scrollTrigger")) {
      if (typeof window.ScrollTrigger === "undefined") {
        await waitForGlobal("ScrollTrigger");
      }
      return;
    }
    try {
      await loadLibrary("scrollTrigger", { loadCSS: false });
      await waitForGlobal("gsap");
      await waitForGlobal("ScrollTrigger");
      if (typeof window.gsap !== "undefined" && window.gsap.registerPlugin) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        scrollTriggerLoaded = true;
      } else {
        throw new Error("GSAP registerPlugin not available");
      }
    } catch (error) {
      handleError(error, "ScrollTrigger Loader");
      throw error;
    }
  }
  async function loadSplitText() {
    if (typeof document !== "undefined" && document.fonts && typeof document.fonts.ready === "object" && typeof document.fonts.ready.then === "function") {
      await document.fonts.ready;
    }
    if (splitTextLoaded || isLibraryLoaded("splitText")) {
      if (typeof window.SplitText === "undefined") {
        await waitForGlobal("SplitText");
      }
      splitTextLoaded = true;
      logger.log("[SplitText] SplitText already loaded.");
      return true;
    }
    if (splitTextLoadPromise) {
      await splitTextLoadPromise;
      return true;
    }
    splitTextLoadPromise = (async () => {
      try {
        const customUrl = typeof window !== "undefined" ? window.GSAP_SPLIT_TEXT_URL : null;
        const urlToLoad = customUrl || SPLIT_TEXT_FALLBACK_URL;
        if (!customUrl) {
          logger.warn(
            `[SplitText] Using fallback SplitText URL. For control, set window.GSAP_SPLIT_TEXT_URL to your hosted SplitText.min.js path.`
          );
        }
        await loadScript(urlToLoad, { id: "split-text-custom" });
        await waitForGlobal("SplitText");
        splitTextLoaded = true;
        logger.log("[SplitText] SplitText loaded.");
        return true;
      } catch (error) {
        handleError(error, "SplitText Loader");
        return false;
      } finally {
        splitTextLoadPromise = null;
      }
    })();
    return splitTextLoadPromise;
  }
  async function loadCustomEase() {
    if (customEaseLoaded || isLibraryLoaded("customEase")) {
      if (typeof window.CustomEase === "undefined") {
        await waitForGlobal("CustomEase");
      }
      if (window.gsap && window.gsap.registerPlugin && window.CustomEase) {
        window.gsap.registerPlugin(window.CustomEase);
      }
      customEaseLoaded = true;
      return;
    }
    try {
      await loadLibrary("customEase", { loadCSS: false });
      await waitForGlobal("CustomEase");
      if (window.gsap && window.gsap.registerPlugin && window.CustomEase) {
        window.gsap.registerPlugin(window.CustomEase);
      }
      customEaseLoaded = true;
    } catch (error) {
      handleError(error, "CustomEase Loader");
      throw error;
    }
  }
  async function ensureGSAPLoaded() {
    if (shouldLoadSplitTextFirst()) {
      await loadSplitText();
    }
    if (typeof window.gsap !== "undefined" && !gsapLoaded) {
      gsapLoaded = true;
    }
    if (typeof window.ScrollTrigger !== "undefined" && !scrollTriggerLoaded) {
      scrollTriggerLoaded = true;
    }
    if (typeof window.CustomEase !== "undefined" && !customEaseLoaded) {
      customEaseLoaded = true;
    }
    if (!gsapLoaded) {
      await loadGSAP();
    }
    if (!scrollTriggerLoaded) {
      await loadScrollTrigger();
    }
    if (!customEaseLoaded) {
      await loadCustomEase();
    }
    if (typeof window.gsap === "undefined") {
      try {
        await waitForGlobal("gsap", 2e3);
      } catch (error) {
        throw new Error("GSAP failed to load: Script loaded but gsap object not available");
      }
    }
    if (typeof window.ScrollTrigger === "undefined") {
      try {
        await waitForGlobal("ScrollTrigger", 2e3);
      } catch (error) {
        throw new Error(
          "ScrollTrigger failed to load: Script loaded but ScrollTrigger object not available"
        );
      }
    }
    if (window.gsap && window.gsap.registerPlugin && !window.gsap.plugins.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
    if (window.gsap && window.gsap.registerPlugin && window.CustomEase && !window.gsap.plugins.CustomEase) {
      window.gsap.registerPlugin(window.CustomEase);
    }
  }
  async function handleGlobalAnimation() {
    if (animationsInitialized) {
      return;
    }
    try {
      await ensureGSAPLoaded();
    } catch (error) {
      handleError(error, "GSAP Global Animation");
      return;
    }
    handleStagger();
    const gsap2 = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const defaultEase = window.CustomEase && window.CustomEase.create ? window.CustomEase.create("tokenz-default", "M0,0 C0.22,0.6 0.36,1 1,1") : "cubic-bezier(.22,.6,.36,1)";
    const defaultConfig = {
      duration: 0.75,
      ease: defaultEase
    };
    function setupScrollTrigger(elements, animationSettings, triggerSettings) {
      elements.forEach((element) => {
        gsap2.fromTo(element, animationSettings.from, {
          ...animationSettings.to,
          scrollTrigger: {
            trigger: element,
            ...triggerSettings
          }
        });
      });
    }
    function applyScaleAnimation() {
      const elements = document.querySelectorAll("[anim-scale]");
      if (elements.length === 0)
        return;
      setupScrollTrigger(
        elements,
        { from: { scale: 1.1 }, to: { scale: 1, duration: 1.5 } },
        { start: "top 95%" }
      );
      elements.forEach((el) => el.classList.add("gsap-ready"));
    }
    function applyStaggerAnimation() {
      const staggerElements = document.querySelectorAll("[anim-stagger]:not([modal] [anim-stagger])");
      if (staggerElements.length === 0)
        return;
      staggerElements.forEach((element) => {
        const childrenSelector = element.getAttribute("anim-stagger");
        const children = element.querySelectorAll(childrenSelector);
        if (children.length === 0)
          return;
        gsap2.set(children, {
          y: element.getAttribute("from-y") || "0.75rem",
          opacity: 0
        });
        ScrollTrigger.batch(children, {
          onEnter: (target) => {
            gsap2.to(target, {
              autoAlpha: 1,
              duration: element.getAttribute("data-duration") || defaultConfig.duration,
              y: "0rem",
              opacity: 1,
              stagger: {
                from: element.getAttribute("stagger-from") || "start",
                each: element.getAttribute("stagger-amount") || 0.1
              },
              ease: element.getAttribute("data-easing") || defaultConfig.ease,
              scrollTrigger: {
                trigger: element,
                start: element.getAttribute("scrollTrigger-start") || "top 95%",
                markers: element.getAttribute("anim-markers") || false
              },
              delay: element.getAttribute("data-delay") || 0.25,
              clearProps: "all"
            });
          }
        });
        element.classList.add("gsap-ready");
      });
    }
    function applyElementAnimation() {
      const elements = document.querySelectorAll(
        "[anim-element]:not([modal] [anim-element]), .anim-element:not([modal] .anim-element), .w-pagination-next:not([modal] .w-pagination-next)"
      );
      if (elements.length === 0)
        return;
      elements.forEach((element) => {
        const fromConfig = {
          y: element.getAttribute("from-y") || "0.25rem",
          x: element.getAttribute("from-x") || 0,
          filter: `blur(6px)`,
          opacity: 0,
          scale: 0.98
        };
        const toConfig = {
          y: "0%",
          x: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: element.getAttribute("data-duration") || defaultConfig.duration,
          ease: element.getAttribute("data-easing") || defaultConfig.ease,
          delay: element.getAttribute("data-delay") || 0.25,
          scale: 1,
          clearProps: "all"
        };
        setupScrollTrigger([element], { from: fromConfig, to: toConfig }, { start: "top 97%" });
        element.classList.add("gsap-ready");
      });
    }
    function applyHeadingAnimation() {
      const elements = document.querySelectorAll("[anim-heading], .anim-heading");
      if (elements.length === 0)
        return;
      elements.forEach((element) => {
        const fromConfig = {
          y: element.getAttribute("from-y") || "1.75rem",
          x: element.getAttribute("from-x") || 0,
          skewY: `4deg`,
          opacity: 0,
          scale: 0.98
        };
        const toConfig = {
          y: "0%",
          x: "0%",
          opacity: 1,
          skewY: "0deg",
          duration: element.getAttribute("data-duration") || 1.5,
          ease: element.getAttribute("data-easing") || defaultConfig.ease,
          delay: element.getAttribute("data-delay") || 0.25,
          scale: 1,
          clearProps: "all"
        };
        setupScrollTrigger([element], { from: fromConfig, to: toConfig }, { start: "top 97%" });
        element.classList.add("gsap-ready");
      });
    }
    function applyParallaxAnimation() {
      if (window.innerWidth <= 768)
        return;
      const elements = document.querySelectorAll("[parallax-element]");
      if (elements.length === 0)
        return;
      setupScrollTrigger(
        elements,
        { from: { y: "-10%", scale: 1.1 }, to: { y: "10%", scale: 1.1 } },
        { start: "top bottom", end: "bottom -50%", scrub: 0.2 }
      );
      elements.forEach((el) => el.classList.add("gsap-ready"));
    }
    function applyBackgroundLinesAnimation() {
      const lines = document.querySelectorAll(".bg-lines .bg-line");
      if (lines.length === 0)
        return;
      setupScrollTrigger(
        lines,
        { from: { y: 400 }, to: { y: -100, duration: 2 } },
        { start: "top bottom", end: "bottom top", scrub: 1 }
      );
      document.querySelectorAll(".bg-lines").forEach((el) => el.classList.add("gsap-ready"));
    }
    async function applySplitTextAnimation() {
      const elements = document.querySelectorAll("[data-split-text]");
      if (elements.length === 0)
        return;
      const loaded = await loadSplitText();
      if (!loaded || typeof window.SplitText === "undefined") {
        return;
      }
      function animateSplitTextLinesChars(element) {
        const lineWraps = element.querySelectorAll(".line-wrap");
        const chars = element.querySelectorAll(".char");
        if (!lineWraps.length || !chars.length)
          return;
        gsap2.set(lineWraps, { overflow: "hidden" });
        gsap2.set(chars, { opacity: 0, y: "0.4em" });
        const tl = gsap2.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
        if (tl.scrollTrigger)
          activeLinesCharsTriggers.push(tl.scrollTrigger);
        lineWraps.forEach((wrap, i) => {
          const lineChars = wrap.querySelectorAll(".char");
          if (!lineChars.length)
            return;
          tl.to(
            lineChars,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.01,
              ease: "power3.out"
            },
            i === 0 ? 0 : "<0.25"
          );
        });
      }
      function animateSplitTextLinesOnly(element) {
        const lineWraps = element.querySelectorAll(".line-wrap");
        const lines = element.querySelectorAll(".line-wrap .line");
        if (!lineWraps.length || !lines.length)
          return;
        gsap2.set(lineWraps, { overflow: "hidden" });
        gsap2.set(lines, { opacity: 0, y: "0.4em" });
        const tl = gsap2.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
        if (tl.scrollTrigger)
          activeLinesCharsTriggers.push(tl.scrollTrigger);
        tl.to(lines, {
          delay: 0.25,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        });
      }
      const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      function applyScrambleText(element) {
        const split = new window.SplitText(element, { type: "chars" });
        activeSplits.push(split);
        split.chars.forEach((node) => node.classList?.add("char"));
        const chars = split.chars;
        const finalChars = chars.map((el) => el.textContent);
        const staggerAmount = parseFloat(element.getAttribute("data-anim-scramble-text")) || 0.02;
        const scrambleDuration = 0.45;
        const cycleInterval = 45;
        function randomChar() {
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        function runScrambleForChar(charEl, finalChar, delay) {
          gsap2.delayedCall(delay, () => {
            const start = performance.now();
            const id = setInterval(() => {
              charEl.textContent = randomChar();
              if (performance.now() - start >= scrambleDuration * 1e3) {
                clearInterval(id);
                charEl.textContent = finalChar;
              }
            }, cycleInterval);
          });
        }
        const st = ScrollTrigger.create({
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
          onEnter: () => {
            chars.forEach((charEl, i) => {
              runScrambleForChar(charEl, finalChars[i], i * staggerAmount);
            });
          }
        });
        activeScrambleTriggers.push(st);
        element.classList.add("split-text-ready");
      }
      const splitTypeMap = {
        char: "chars",
        chars: "chars",
        word: "words",
        words: "words",
        line: "lines",
        lines: "lines"
      };
      let initialWindowWidth = window.innerWidth;
      let activeSplits = [];
      const lineWrapContainers = /* @__PURE__ */ new Set();
      const activeLinesCharsTriggers = [];
      const activeScrambleTriggers = [];
      const resizeHandler = rafThrottle(() => {
        if (window.innerWidth !== initialWindowWidth) {
          splitText();
          initialWindowWidth = window.innerWidth;
        }
      });
      const cleanup = () => {
        window.removeEventListener("resize", resizeHandler);
        activeScrambleTriggers.forEach((t2) => t2?.kill?.());
        activeScrambleTriggers.length = 0;
        activeLinesCharsTriggers.forEach((t2) => t2?.kill?.());
        activeLinesCharsTriggers.length = 0;
        lineWrapContainers.forEach((el) => el.classList.remove("line-wrap"));
        lineWrapContainers.clear();
        document.querySelectorAll("[data-split-text], [data-anim-scramble-text]").forEach((el) => {
          el.classList.remove("split-text-ready");
        });
        document.querySelectorAll(".line-wrap").forEach((wrap) => {
          if (wrap.hasAttribute("data-split-text"))
            return;
          while (wrap.firstChild) {
            wrap.parentNode.insertBefore(wrap.firstChild, wrap);
          }
          wrap.remove();
        });
        activeSplits.forEach((split) => split?.revert?.());
        activeSplits = [];
      };
      const splitText = () => {
        cleanup();
        document.querySelectorAll("[data-split-text]").forEach((element) => {
          const attrValue = (element.getAttribute("data-split-text") || "").trim().toLowerCase();
          const tokens = attrValue.split(/[,\s]+/).filter(Boolean);
          const splitKeys = tokens.map((t2) => splitTypeMap[t2.trim()]).filter(Boolean);
          const splitKey = splitKeys.length === 0 ? null : splitKeys.length === 1 ? splitKeys[0] : splitKeys;
          if (!splitKey) {
            logger.warn(
              `[SplitText] Invalid data-split-text value "${attrValue}". Use "char", "word", "line", or comma-separated combinations (e.g. "words, chars").`,
              element
            );
            return;
          }
          const split = new window.SplitText(element, { type: splitKey });
          activeSplits.push(split);
          if (split.chars && Array.isArray(split.chars)) {
            split.chars.forEach((node) => node.classList?.add("char"));
          }
          if (split.words && Array.isArray(split.words)) {
            split.words.forEach((node) => node.classList?.add("word"));
          }
          if (split.lines && Array.isArray(split.lines)) {
            lineWrapContainers.add(element);
            split.lines.forEach((lineNode) => {
              const lineWrap = document.createElement("div");
              lineWrap.classList.add("line-wrap");
              lineWrap.setAttribute("aria-hidden", "true");
              lineNode.parentNode.insertBefore(lineWrap, lineNode);
              lineWrap.appendChild(lineNode);
              const singleChild = lineNode.childNodes.length === 1 && lineNode.firstChild?.nodeType === 1 ? lineNode.firstChild : null;
              const lineEl = singleChild ?? lineNode;
              lineEl.classList.add("line");
              if (singleChild) {
                lineNode.parentNode.insertBefore(singleChild, lineNode);
                lineNode.remove();
              }
            });
          }
          if (element.hasAttribute("data-color-to")) {
            animateSplitTextColor(element);
          }
          if (split.lines?.length && split.chars?.length) {
            animateSplitTextLinesChars(element);
          } else if (split.lines?.length) {
            animateSplitTextLinesOnly(element);
          }
          element.classList.add("split-text-ready");
        });
        document.querySelectorAll("[data-anim-scramble-text]").forEach((element) => {
          applyScrambleText(element);
        });
      };
      splitText();
      window.addEventListener("resize", resizeHandler);
      splitTextCleanupRef = cleanup;
    }
    applyStaggerAnimation();
    applyElementAnimation();
    await applySplitTextAnimation();
    animationsInitialized = true;
  }
  function refreshScrollTrigger() {
    if (scrollTriggerLoaded && typeof window.ScrollTrigger !== "undefined") {
      window.ScrollTrigger.refresh();
    }
  }
  function killAllScrollTriggers() {
    if (scrollTriggerLoaded && typeof window.ScrollTrigger !== "undefined") {
      window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }
  function resetGSAPForNewPage() {
    if (splitTextCleanupRef) {
      try {
        splitTextCleanupRef();
      } catch (_) {
      }
      splitTextCleanupRef = null;
    }
    killAllScrollTriggers();
    animationsInitialized = false;
  }
  function animateSplitTextColor(element) {
    const heading = element;
    const chars = heading?.querySelectorAll(".char");
    const colorTo = element.getAttribute("data-color-to");
    if (heading && chars?.length) {
      gsap.to(chars, {
        color: colorTo,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          end: "bottom 90%",
          scrub: 1.2
        }
      });
    }
  }
  var gsapLoaded, scrollTriggerLoaded, splitTextLoaded, splitTextLoadPromise, customEaseLoaded, animationsInitialized, splitTextCleanupRef, SPLIT_TEXT_FALLBACK_URL;
  var init_gsap = __esm({
    "src/components/gsap.js"() {
      init_helpers();
      init_logger();
      init_jsdelivr();
      gsapLoaded = false;
      scrollTriggerLoaded = false;
      splitTextLoaded = false;
      splitTextLoadPromise = null;
      customEaseLoaded = false;
      animationsInitialized = false;
      splitTextCleanupRef = null;
      SPLIT_TEXT_FALLBACK_URL = "https://cdn.prod.website-files.com/gsap/3.13.0/SplitText.min.js";
    }
  });

  // src/global/index.js
  function initNavbar() {
    logger.log("\u{1F4F1} Navbar initialized");
    try {
      (() => {
        const menuBtn = document.querySelector("[menu-btn]");
        const nav = document.querySelector("[nav]");
        if (menuBtn && nav) {
          const menuLinksList = document.querySelector(".menu-links-list");
          const closeMenu = () => {
            nav.classList.remove("open");
          };
          const handleMenuBtnClick = () => {
            nav.classList.toggle("open");
          };
          menuBtn.addEventListener("click", handleMenuBtnClick);
          navbarCleanupFunctions.push(() => {
            menuBtn.removeEventListener("click", handleMenuBtnClick);
          });
          if (menuLinksList) {
            const menuLinks = menuLinksList.querySelectorAll("a");
            const handleMenuLinkClick = () => closeMenu();
            menuLinks.forEach((link) => link.addEventListener("click", handleMenuLinkClick));
            navbarCleanupFunctions.push(() => {
              menuLinks.forEach((link) => link.removeEventListener("click", handleMenuLinkClick));
            });
          }
        }
      })();
    } catch (error) {
      handleError(error, "Navbar Initialization");
    }
  }
  function cleanupNavbar() {
    navbarCleanupFunctions.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Navbar Cleanup");
      }
    });
    navbarCleanupFunctions.length = 0;
  }
  async function initGlobal() {
    logger.log("\u{1F310} Initializing global components...");
    cleanupNavbar();
    cleanupFooter();
    initLenis();
    initNavbar();
    initLocationsTabs();
    initFooter();
    loadGSAPLazy();
    (() => {
      const timedEls = [...document.querySelectorAll("[data-time]")];
      if (!timedEls.length)
        return;
      const timezones = {
        NY: "America/New_York",
        SF: "America/Los_Angeles",
        TE: "Asia/Jerusalem",
        TK: "Asia/Tokyo",
        TO: "Asia/Tokyo"
      };
      const timeRefreshMs = 3e4;
      let timeRefreshId = null;
      const updateTimes = () => {
        timedEls.forEach((el) => {
          const code = el.dataset.time;
          const tz = timezones[code];
          if (!tz)
            return;
          const localDate = new Date((/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: tz }));
          const hours = localDate.getHours();
          const minutes = localDate.getMinutes();
          const hh = String(hours).padStart(2, "0");
          const mm = String(minutes).padStart(2, "0");
          el.textContent = `${hh}:${mm}`;
          const isDay = hours >= 6 && hours < 18;
          el.setAttribute("data-daynight", isDay ? "day" : "night");
        });
      };
      const startTimeRefresh = () => {
        clearInterval(timeRefreshId);
        timeRefreshId = setInterval(updateTimes, timeRefreshMs);
      };
      window.addEventListener("data-time:refresh", updateTimes);
      updateTimes();
      startTimeRefresh();
    })();
  }
  function loadGSAPLazy() {
    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      handleGlobalAnimation().catch((error) => {
        logger.error("Error initializing GSAP animations:", error);
      });
      return;
    }
    let isLoaded = false;
    const loadGSAP2 = async () => {
      if (isLoaded)
        return;
      isLoaded = true;
      try {
        await ensureGSAPLoaded();
        logger.log("\u2705 GSAP and ScrollTrigger loaded globally");
        await new Promise((resolve) => setTimeout(resolve, 100));
        await handleGlobalAnimation();
      } catch (error) {
        logger.error("Error loading GSAP:", error);
        isLoaded = false;
      }
    };
    const interactionEvents = ["scroll", "wheel", "touchstart", "click", "mousemove", "keydown"];
    let hasInteracted = false;
    const loadOnInteraction = () => {
      if (hasInteracted)
        return;
      hasInteracted = true;
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadOnInteraction, { passive: true });
      });
      loadGSAP2();
    };
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });
    if (window.requestIdleCallback) {
      requestIdleCallback(
        () => {
          if (!hasInteracted) {
            loadGSAP2();
          }
        },
        { timeout: 3e3 }
      );
    } else {
      setTimeout(() => {
        if (!hasInteracted) {
          loadGSAP2();
        }
      }, 2e3);
    }
  }
  function initLocationsTabs() {
    const section = document.querySelector("[locations-home-tabs]");
    if (!section)
      return;
    const desktopTabBtns = [...section.querySelectorAll("[tab-btn]")];
    const mobileTabBtns = [
      ...section.querySelectorAll(
        "[for-mobile] .contact-grid-locations .contact-grid-locations-text"
      )
    ];
    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const tabBtns = isMobile && mobileTabBtns.length > 0 ? mobileTabBtns : desktopTabBtns.length > 0 ? desktopTabBtns : mobileTabBtns;
    const tabImgs = section.querySelectorAll("[tab-img]");
    const progressLines = section.querySelectorAll(".tabs-progress-line");
    const locationNames = [...section.querySelectorAll(".location-texts .rotation-text")];
    const locationTexts = [...section.querySelectorAll(".location-texts-wrap .rotation-text")];
    const locationTimes = [...section.querySelectorAll(".location-times-wrap .rotation-text")];
    const dayIcon = section.querySelector('[location-time-comp_icon="day"]');
    const nightIcon = section.querySelector('[location-time-comp_icon="night"]');
    const timeIcons = [dayIcon, nightIcon].filter(Boolean);
    const intervalMs = 5e3;
    const rotateDelayMs = 50;
    const iconClassDelayMs = 50;
    const textStaggerMs = 80;
    let activeIndex = 0;
    let timerId = null;
    let textStaggerIds = [];
    let iconDelayId = null;
    let iconClassDelayId = null;
    let iconRotation = 0;
    const resetProgress = () => {
      if (!progressLines.length)
        return;
      progressLines.forEach((line) => {
        line.style.transition = "none";
        line.style.width = "0%";
      });
      void progressLines[0].offsetWidth;
      progressLines.forEach((line) => {
        line.style.transition = `width ${intervalMs}ms linear`;
      });
      requestAnimationFrame(() => {
        progressLines.forEach((line) => {
          line.style.width = "100%";
        });
      });
    };
    const updateTextGroup = (list, prev, next) => {
      if (!list.length)
        return;
      list.forEach((el, i) => {
        if (i === next) {
          el.classList.add("in");
          el.classList.remove("out");
        } else if (i === prev) {
          el.classList.remove("in");
          el.classList.add("out");
        } else {
          el.classList.remove("in", "out");
        }
      });
    };
    const setActive = (index) => {
      if (!tabBtns.length)
        return;
      const prevIndex = activeIndex;
      activeIndex = (index + tabBtns.length) % tabBtns.length;
      desktopTabBtns.forEach((btn, i) => btn.classList.toggle("active", i === activeIndex));
      mobileTabBtns.forEach((btn, i) => btn.classList.toggle("active", i === activeIndex));
      if (tabImgs.length) {
        tabImgs.forEach((img) => {
          img.classList.remove("active");
        });
        tabImgs[activeIndex].classList.add("active");
      }
      textStaggerIds.forEach((id) => clearTimeout(id));
      textStaggerIds = [];
      textStaggerIds.push(
        setTimeout(() => updateTextGroup(locationTexts, prevIndex, activeIndex), 0)
      );
      textStaggerIds.push(
        setTimeout(() => updateTextGroup(locationNames, prevIndex, activeIndex), textStaggerMs)
      );
      textStaggerIds.push(
        setTimeout(() => updateTextGroup(locationTimes, prevIndex, activeIndex), textStaggerMs * 2)
      );
      const activeTimeEl = locationTimes[activeIndex];
      const dayNight = activeTimeEl?.getAttribute("data-daynight") || "day";
      clearTimeout(iconClassDelayId);
      iconClassDelayId = setTimeout(() => {
        if (dayIcon) {
          dayIcon.classList.toggle("in", dayNight === "day");
          dayIcon.classList.toggle("out", dayNight !== "day");
        }
        if (nightIcon) {
          nightIcon.classList.toggle("in", dayNight === "night");
          nightIcon.classList.toggle("out", dayNight !== "night");
        }
      }, iconClassDelayMs);
      clearTimeout(iconDelayId);
      iconDelayId = setTimeout(() => {
        if (!timeIcons.length)
          return;
        iconRotation += 30;
        timeIcons.forEach((icon) => {
          icon.style.transition = "transform 0.6s ease";
          icon.style.transform = `rotate(${iconRotation}deg)`;
        });
      }, rotateDelayMs);
      window.dispatchEvent(new Event("data-time:refresh"));
      resetProgress();
    };
    const startAutoplay = () => {
      clearInterval(timerId);
      timerId = setInterval(() => setActive(activeIndex + 1), intervalMs);
    };
    const bindTabClicks = (btns) => {
      btns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          setActive(index);
          startAutoplay();
        });
      });
    };
    bindTabClicks(desktopTabBtns);
    bindTabClicks(mobileTabBtns);
    setActive(0);
    startAutoplay();
  }
  var navbarCleanupFunctions;
  var init_global = __esm({
    "src/global/index.js"() {
      init_lenis2();
      init_footer();
      init_gsap();
      init_helpers();
      init_logger();
      navbarCleanupFunctions = [];
    }
  });

  // src/components/carousel.js
  async function loadCarouselLibrary() {
    if (carouselLibraryLoaded || isLibraryLoaded("embla")) {
      return Promise.resolve();
    }
    if (loadPromise) {
      return loadPromise;
    }
    loadPromise = (async () => {
      try {
        await loadLibrary("embla", { loadCSS: false });
        if (typeof window.EmblaCarousel === "undefined") {
          throw new Error("Carousel library failed to load");
        }
        carouselLibraryLoaded = true;
        if (pendingSliders.length > 0) {
          logger.log(`Initializing ${pendingSliders.length} pending carousel(s)...`);
          initializeCarousels(pendingSliders);
          pendingSliders = [];
        }
        return true;
      } catch (error) {
        handleError(error, "Carousel Library Loader");
        loadPromise = null;
        throw error;
      }
    })();
    return loadPromise;
  }
  async function loadAndInitSlider(slider) {
    if (!carouselLibraryLoaded && !pendingSliders.includes(slider)) {
      pendingSliders.push(slider);
    }
    if (!carouselLibraryLoaded) {
      await loadCarouselLibrary();
    }
    if (carouselLibraryLoaded && !slider._carouselInitialized) {
      initializeCarousels([slider]);
    }
  }
  function initCarousel() {
    const sliders = document.querySelectorAll("[data-carousel]");
    if (!sliders.length)
      return;
    logger.log(`\u23F3 Found ${sliders.length} carousel(s) - will load when visible...`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slider = entry.target;
            observer.unobserve(slider);
            slider.setAttribute("data-carousel-observed", "true");
            loadAndInitSlider(slider);
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0
      }
    );
    sliders.forEach((slider) => {
      observer.observe(slider);
    });
  }
  function initializeCarousels(sliderList) {
    if (!sliderList || !sliderList.length)
      return;
    sliderList.forEach((slider) => {
      if (slider._carouselInitialized)
        return;
      slider._carouselInitialized = true;
      const carouselRoot = slider.querySelector(VIEWPORT_SELECTOR) || slider;
      const carouselViewport = slider.querySelector(VIEWPORT_SELECTOR) || carouselRoot;
      const carouselContainer = slider.querySelector(CONTAINER_SELECTOR);
      if (!carouselViewport) {
        logger.warn("Carousel viewport not found in slider:", slider);
        return;
      }
      const nextBtn = slider.querySelector("[slider-next-btn]") || slider.querySelector("[carousel-next-btn]") || slider.querySelector('.carousel-btns .btn[aria-label="Next slide"]');
      const prevBtn = slider.querySelector("[slider-prev-btn]") || slider.querySelector("[carousel-prev-btn]") || slider.querySelector('.carousel-btns .btn[aria-label="Previous slide"]');
      let slideButtons = [];
      const customProgressBar = slider.querySelector(".carousel-progress-bar");
      const syncId = slider.getAttribute("data-sync");
      const centerMode = slider.hasAttribute("data-center");
      const centerBounds = slider.hasAttribute("data-center-bounds");
      const clickToCenter = slider.hasAttribute("data-click-center");
      const loopMode = slider.hasAttribute("data-loop");
      const disableDrag = slider.hasAttribute("data-no-drag");
      const dragFree = slider.hasAttribute("data-drag-free");
      const autoplayEnabled = slider.hasAttribute("data-autoplay");
      const autoplayStopOnInteraction = slider.hasAttribute("data-autoplay-stop-on-interaction");
      const fadeMode = slider.hasAttribute("data-fade") || slider.getAttribute("data-effect") === "fade" || slider.getAttribute("data-carousel") === "fade";
      const slideClassesEnabled = slider.hasAttribute("data-slide-classes");
      const alignAttr = slider.getAttribute("data-align");
      const autoplayDelayAttr = slider.getAttribute("data-autoplay-delay");
      const autoplayDelay = Number.isFinite(Number.parseInt(autoplayDelayAttr, 10)) ? Number.parseInt(autoplayDelayAttr, 10) : 8e3;
      const fadeDurationAttr = slider.getAttribute("data-fade-duration");
      const fadeDuration = Number.isFinite(Number.parseInt(fadeDurationAttr, 10)) ? Math.max(150, Number.parseInt(fadeDurationAttr, 10)) : 650;
      const fadeEase = slider.getAttribute("data-fade-ease") || "cubic-bezier(0.22, 1, 0.36, 1)";
      const axisAttr = slider.getAttribute("data-axis");
      const isVertical = axisAttr === "y" || slider.hasAttribute("data-vertical");
      const durationAttr = slider.getAttribute("data-slide-duration");
      const slideDuration = Number.isFinite(Number.parseInt(durationAttr, 10)) ? Math.max(20, Math.min(60, Number.parseInt(durationAttr, 10))) : 25;
      const slideEase = slider.getAttribute("data-slide-ease") || "cubic-bezier(0.25, 0.1, 0.25, 1)";
      const showSlidesAttr = slider.getAttribute("data-show-slides");
      const showSlides = showSlidesAttr != null && Number.isFinite(Number.parseFloat(showSlidesAttr)) && Number.parseFloat(showSlidesAttr) >= 1 ? Number.parseFloat(showSlidesAttr) : null;
      const arrowStepAttr = slider.getAttribute("data-arrow-step");
      const arrowStepParsed = Number.parseInt(arrowStepAttr, 10);
      const arrowStep = Number.isFinite(arrowStepParsed) && arrowStepParsed > 0 ? arrowStepParsed : 1;
      const carouselOptions = {
        axis: isVertical ? "y" : "x",
        align: alignAttr || (centerMode ? "center" : "start"),
        containScroll: centerBounds ? "trimSnaps" : false,
        loop: loopMode,
        draggable: fadeMode ? false : !disableDrag,
        dragFree: fadeMode ? false : dragFree,
        duration: slideDuration
      };
      let carouselApi = null;
      let autoplayTimer = null;
      const cleanupTasks = [];
      let scrollToIndex = () => {
      };
      let restartAutoplay = null;
      function getSlides() {
        if (carouselContainer) {
          return Array.from(carouselContainer.children);
        }
        return Array.from(slider.querySelectorAll(".carousel-item"));
      }
      function applyShowSlidesLayout() {
        if (!showSlides || fadeMode || !carouselContainer)
          return;
        const slides = getSlides();
        if (!slides.length)
          return;
        const basisPercent = 100 / showSlides;
        carouselContainer.style.display = "flex";
        carouselContainer.style.flexDirection = isVertical ? "column" : "row";
        carouselContainer.style.flexWrap = "nowrap";
        slides.forEach((slide) => {
          slide.style.flex = `0 0 ${basisPercent}%`;
          slide.style.boxSizing = "border-box";
        });
      }
      function applyFadeLayout() {
        if (!fadeMode || !carouselContainer)
          return;
        const slides = getSlides();
        if (!slides.length)
          return;
        const maxHeight = slides.reduce((max, slide) => Math.max(max, slide.offsetHeight), 0);
        carouselViewport.style.overflow = "hidden";
        carouselContainer.style.position = "relative";
        carouselContainer.style.display = "block";
        carouselContainer.style.transform = "none";
        carouselContainer.style.transition = "none";
        if (maxHeight > 0) {
          carouselContainer.style.height = `${maxHeight}px`;
        }
        slides.forEach((slide) => {
          slide.style.position = "absolute";
          slide.style.inset = "0";
          slide.style.width = "100%";
          slide.style.willChange = "opacity, transform";
          slide.style.backfaceVisibility = "hidden";
          slide.style.transformOrigin = "center center";
          slide.style.transition = `opacity ${fadeDuration}ms ${fadeEase}, transform ${Math.round(
            fadeDuration * 1.2
          )}ms ${fadeEase}`;
        });
      }
      function ensureDots() {
        const dotsContainer = slider.querySelector("[carousel-dots]") || slider.querySelector(".carousel-dots");
        const slides = getSlides();
        if (!slides.length)
          return;
        if (dotsContainer) {
          const existingDots = dotsContainer.querySelectorAll("[data-slide-btn]");
          if (existingDots.length > 0) {
            if (existingDots.length !== slides.length) {
              logger.warn(
                `Carousel has ${slides.length} slides but ${existingDots.length} dot buttons. Button count should match slide count.`
              );
            }
          } else {
            dotsContainer.innerHTML = "";
            const fragment = document.createDocumentFragment();
            slides.forEach((_, index) => {
              const dot = document.createElement("button");
              dot.type = "button";
              dot.className = "carousel-dot";
              dot.setAttribute("data-slide-btn", "");
              dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
              fragment.appendChild(dot);
            });
            dotsContainer.appendChild(fragment);
          }
        }
        slideButtons = Array.from(slider.querySelectorAll("[data-slide-btn]"));
        slideButtons.sort((a, b) => {
          const aIndex = a.hasAttribute("data-slide-index") ? Number.parseInt(a.getAttribute("data-slide-index"), 10) : null;
          const bIndex = b.hasAttribute("data-slide-index") ? Number.parseInt(b.getAttribute("data-slide-index"), 10) : null;
          if (aIndex !== null && bIndex !== null) {
            return aIndex - bIndex;
          }
          if (aIndex !== null)
            return -1;
          if (bIndex !== null)
            return 1;
          const position = a.compareDocumentPosition(b);
          return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });
        slideButtons = slideButtons.slice(0, slides.length);
      }
      function updateActiveSlides() {
        if (!carouselApi)
          return;
        const slides = getSlides();
        if (!slides.length)
          return;
        if (fadeMode) {
          if (!carouselContainer) {
            logger.warn("Fade mode requires a carousel container inside the slider.");
            return;
          }
          applyFadeLayout();
        }
        const activeIndex = carouselApi.selectedScrollSnap();
        slides.forEach((slide, index) => {
          Array.from(slide.classList).forEach((className) => {
            if (/^(upcoming|upcomming|passed)-\d+$/.test(className)) {
              slide.classList.remove(className);
            }
          });
          slide.classList.toggle("is-active", index === activeIndex);
          if (fadeMode) {
            slide.style.opacity = index === activeIndex ? "1" : "0";
            slide.style.transform = index === activeIndex ? "scale(1)" : "scale(1.02)";
            slide.style.zIndex = index === activeIndex ? "2" : "1";
            slide.style.pointerEvents = index === activeIndex ? "auto" : "none";
          }
          if (!slideClassesEnabled)
            return;
          slide.classList.toggle("is-passed", index < activeIndex);
          slide.classList.toggle("is-upcoming", index > activeIndex);
          slide.classList.toggle("is-prev", index === activeIndex - 1);
          slide.classList.toggle("is-next", index === activeIndex + 1);
          if (index > activeIndex) {
            const distance = index - activeIndex;
            slide.classList.add(`upcoming-${distance}`);
          } else if (index < activeIndex) {
            const distance = activeIndex - index;
            slide.classList.add(`passed-${distance}`);
          }
        });
        updateSlideButtons(activeIndex);
      }
      function updateSlideButtons(activeIndex) {
        if (!slideButtons.length)
          return;
        slideButtons.forEach((button, arrayIndex) => {
          const buttonIndex = button.hasAttribute("data-slide-index") ? Number.parseInt(button.getAttribute("data-slide-index"), 10) : arrayIndex;
          const isActive = buttonIndex === activeIndex;
          button.classList.toggle("is-active", isActive);
          if (isActive) {
            button.setAttribute("aria-current", "true");
          } else {
            button.removeAttribute("aria-current");
          }
        });
      }
      function updateButtonStates() {
        if (!carouselApi)
          return;
        const canPrev = carouselApi.canScrollPrev();
        const canNext = carouselApi.canScrollNext();
        const bothDisabled = !canPrev && !canNext;
        if (prevBtn) {
          prevBtn.style.pointerEvents = canPrev ? "auto" : "none";
          prevBtn.style.opacity = canPrev ? "1" : "0.5";
          prevBtn.style.display = bothDisabled ? "none" : "";
          prevBtn.setAttribute("aria-disabled", String(!canPrev));
        }
        if (nextBtn) {
          nextBtn.style.pointerEvents = canNext ? "auto" : "none";
          nextBtn.style.opacity = canNext ? "1" : "0.5";
          nextBtn.style.display = bothDisabled ? "none" : "";
          nextBtn.setAttribute("aria-disabled", String(!canNext));
        }
      }
      function updateCustomProgressBar() {
        if (!customProgressBar || !carouselApi)
          return;
        const totalSlides = carouselApi.scrollSnapList().length;
        const currentIndex = carouselApi.selectedScrollSnap();
        const progress = Math.max(0, Math.min(1, carouselApi.scrollProgress())) * 100;
        const progressFill = customProgressBar.querySelector(".carousel-progress-fill");
        if (progressFill) {
          if (isVertical) {
            progressFill.style.height = `${progress}%`;
            progressFill.style.width = "";
          } else {
            progressFill.style.width = `${progress}%`;
            progressFill.style.height = "";
          }
          customProgressBar.setAttribute("data-progress", progress.toFixed(1));
          customProgressBar.setAttribute("data-current-slide", currentIndex + 1);
          customProgressBar.setAttribute("data-total-slides", totalSlides);
        }
      }
      try {
        applyShowSlidesLayout();
        if (!fadeMode) {
          slider.style.setProperty("--carousel-slide-ease", slideEase);
        }
        carouselApi = window.EmblaCarousel(carouselViewport, carouselOptions);
        carouselViewport._carousel = carouselApi;
        slider._carouselInstance = carouselApi;
        scrollToIndex = (index, jump = false) => {
          if (!carouselApi)
            return;
          carouselApi.scrollTo(index, jump);
        };
        ensureDots();
        const slides = getSlides();
        if (slideButtons.length !== slides.length && slideButtons.length > 0) {
          logger.warn(
            `Carousel has ${slides.length} slides but ${slideButtons.length} slide buttons. Button indices may not match slide indices.`
          );
        }
        updateButtonStates();
        updateCustomProgressBar();
        updateActiveSlides();
        if (autoplayEnabled) {
          const startAutoplay = () => {
            if (autoplayTimer)
              return;
            autoplayTimer = window.setInterval(() => {
              if (!carouselApi)
                return;
              if (fadeMode) {
                const currentIndex = carouselApi.selectedScrollSnap();
                const totalSlides = carouselApi.scrollSnapList().length;
                const nextIndex = currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1;
                scrollToIndex(nextIndex, true);
                return;
              }
              if (carouselApi.canScrollNext()) {
                carouselApi.scrollNext();
              } else {
                carouselApi.scrollTo(0);
              }
            }, autoplayDelay);
          };
          const stopAutoplay = () => {
            if (autoplayTimer) {
              window.clearInterval(autoplayTimer);
              autoplayTimer = null;
            }
          };
          restartAutoplay = () => {
            if (autoplayStopOnInteraction)
              return;
            stopAutoplay();
            startAutoplay();
          };
          startAutoplay();
          if (autoplayStopOnInteraction) {
            const stopHandler = () => stopAutoplay();
            slider.addEventListener("pointerdown", stopHandler);
            slider.addEventListener("keydown", stopHandler);
            cleanupTasks.push(() => {
              slider.removeEventListener("pointerdown", stopHandler);
              slider.removeEventListener("keydown", stopHandler);
            });
          }
          cleanupTasks.push(() => stopAutoplay());
        }
        const onSelect = () => {
          updateButtonStates();
          updateCustomProgressBar();
          updateActiveSlides();
        };
        const onScroll = () => {
          if (fadeMode) {
            applyFadeLayout();
          }
          updateCustomProgressBar();
        };
        const onReInit = () => {
          ensureDots();
          updateButtonStates();
          updateCustomProgressBar();
          updateActiveSlides();
        };
        carouselApi.on("select", onSelect);
        carouselApi.on("scroll", onScroll);
        carouselApi.on("reInit", onReInit);
        cleanupTasks.push(() => {
          carouselApi.off("select", onSelect);
          carouselApi.off("scroll", onScroll);
          carouselApi.off("reInit", onReInit);
        });
        const resizeHandler = () => {
          if (fadeMode) {
            applyFadeLayout();
          }
          updateCustomProgressBar();
        };
        window.addEventListener("resize", resizeHandler);
        cleanupTasks.push(() => window.removeEventListener("resize", resizeHandler));
        if (nextBtn) {
          const nextHandler = () => {
            if (!carouselApi)
              return;
            const currentIndex = carouselApi.selectedScrollSnap();
            const totalSlides = carouselApi.scrollSnapList().length;
            if (!totalSlides)
              return;
            if (fadeMode) {
              let targetIndex2 = currentIndex + arrowStep;
              if (targetIndex2 >= totalSlides) {
                targetIndex2 = targetIndex2 % totalSlides;
              }
              scrollToIndex(targetIndex2, true);
              return;
            }
            if (arrowStep === 1) {
              carouselApi.scrollNext();
              return;
            }
            let targetIndex = currentIndex + arrowStep;
            if (!loopMode) {
              targetIndex = Math.min(totalSlides - 1, targetIndex);
            } else if (targetIndex >= totalSlides) {
              targetIndex = targetIndex % totalSlides;
            }
            scrollToIndex(targetIndex, false);
          };
          nextBtn.addEventListener("click", nextHandler);
          nextBtn.setAttribute("aria-label", "Next slide");
          nextBtn.setAttribute("role", "button");
          cleanupTasks.push(() => nextBtn.removeEventListener("click", nextHandler));
        }
        if (prevBtn) {
          const prevHandler = () => {
            if (!carouselApi)
              return;
            const currentIndex = carouselApi.selectedScrollSnap();
            const totalSlides = carouselApi.scrollSnapList().length;
            if (!totalSlides)
              return;
            if (fadeMode) {
              let targetIndex2 = currentIndex - arrowStep;
              if (targetIndex2 < 0) {
                targetIndex2 = (targetIndex2 % totalSlides + totalSlides) % totalSlides;
              }
              scrollToIndex(targetIndex2, true);
              return;
            }
            if (arrowStep === 1) {
              carouselApi.scrollPrev();
              return;
            }
            let targetIndex = currentIndex - arrowStep;
            if (!loopMode) {
              targetIndex = Math.max(0, targetIndex);
            } else if (targetIndex < 0) {
              targetIndex = (targetIndex % totalSlides + totalSlides) % totalSlides;
            }
            scrollToIndex(targetIndex, false);
          };
          prevBtn.addEventListener("click", prevHandler);
          prevBtn.setAttribute("aria-label", "Previous slide");
          prevBtn.setAttribute("role", "button");
          cleanupTasks.push(() => prevBtn.removeEventListener("click", prevHandler));
        }
        if (slideButtons.length) {
          slideButtons.forEach((button, index) => {
            const explicitIndex = button.hasAttribute("data-slide-index") ? Number.parseInt(button.getAttribute("data-slide-index"), 10) : index;
            const targetIndex = Math.max(0, Math.min(explicitIndex, slides.length - 1));
            const clickHandler = () => {
              scrollToIndex(targetIndex, fadeMode);
              if (restartAutoplay) {
                restartAutoplay();
              }
            };
            button.addEventListener("click", clickHandler);
            button.setAttribute("type", "button");
            button.setAttribute("role", "button");
            if (!button.hasAttribute("aria-label")) {
              button.setAttribute("aria-label", `Go to slide ${targetIndex + 1}`);
            }
            cleanupTasks.push(() => button.removeEventListener("click", clickHandler));
          });
        }
        if (clickToCenter) {
          const slides2 = getSlides();
          slides2.forEach((slide, index) => {
            const slideHandler = () => scrollToIndex(index, fadeMode);
            slide.addEventListener("click", slideHandler);
            cleanupTasks.push(() => slide.removeEventListener("click", slideHandler));
          });
        }
        if (!slider._keyboardSetup) {
          const keyboardHandler = (event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              if (fadeMode) {
                const currentIndex = carouselApi.selectedScrollSnap();
                const totalSlides = carouselApi.scrollSnapList().length;
                const nextIndex = currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1;
                scrollToIndex(nextIndex, true);
              } else {
                carouselApi.scrollNext();
              }
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              if (fadeMode) {
                const currentIndex = carouselApi.selectedScrollSnap();
                const totalSlides = carouselApi.scrollSnapList().length;
                const prevIndex = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
                scrollToIndex(prevIndex, true);
              } else {
                carouselApi.scrollPrev();
              }
            }
          };
          slider.addEventListener("keydown", keyboardHandler);
          slider.tabIndex = 0;
          slider.setAttribute("role", "region");
          slider.setAttribute("aria-label", "Carousel");
          slider._keyboardSetup = true;
          cleanupTasks.push(() => slider.removeEventListener("keydown", keyboardHandler));
        }
        registerSyncedSlider(syncId, carouselApi);
        slider._carouselCleanup = cleanupTasks;
      } catch (error) {
        handleError(error, "Carousel Initialization");
      }
    });
    logger.log(`\u2705 ${sliderList.length} carousel(s) initialized`);
  }
  function getCarouselInstance(selector) {
    const element = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!element)
      return null;
    return element._carouselInstance || element._carousel || element.querySelector?.(VIEWPORT_SELECTOR)?._carousel || null;
  }
  function registerSyncedSlider(syncId, carouselApi) {
    if (!syncId || !carouselApi)
      return;
    if (!syncedSliderGroups.has(syncId)) {
      syncedSliderGroups.set(syncId, /* @__PURE__ */ new Set());
    }
    const group = syncedSliderGroups.get(syncId);
    group.add(carouselApi);
    const syncHandler = () => {
      const targetIndex = carouselApi.selectedScrollSnap();
      group.forEach((otherCarousel) => {
        if (otherCarousel === carouselApi)
          return;
        otherCarousel.scrollTo(targetIndex);
      });
    };
    carouselApi.on("select", syncHandler);
    carouselApi.on("reInit", syncHandler);
    carouselApi.on("destroy", () => {
      carouselApi.off("select", syncHandler);
      carouselApi.off("reInit", syncHandler);
      group.delete(carouselApi);
      if (group.size === 0) {
        syncedSliderGroups.delete(syncId);
      }
    });
  }
  var carouselLibraryLoaded, loadPromise, pendingSliders, syncedSliderGroups, VIEWPORT_SELECTOR, CONTAINER_SELECTOR;
  var init_carousel = __esm({
    "src/components/carousel.js"() {
      init_helpers();
      init_jsdelivr();
      init_logger();
      carouselLibraryLoaded = false;
      loadPromise = null;
      pendingSliders = [];
      syncedSliderGroups = /* @__PURE__ */ new Map();
      VIEWPORT_SELECTOR = ".carousel-wrapper, [carousel-wrapper]";
      CONTAINER_SELECTOR = ".carousel, [carousel]";
    }
  });

  // node_modules/.pnpm/@rive-app+canvas-advanced@2.35.0/node_modules/@rive-app/canvas-advanced/canvas_advanced.mjs
  var canvas_advanced_exports = {};
  __export(canvas_advanced_exports, {
    default: () => canvas_advanced_default
  });
  var Rive, canvas_advanced_default;
  var init_canvas_advanced = __esm({
    "node_modules/.pnpm/@rive-app+canvas-advanced@2.35.0/node_modules/@rive-app/canvas-advanced/canvas_advanced.mjs"() {
      Rive = (() => {
        var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
        return function(moduleArg = {}) {
          var moduleRtn;
          var m = moduleArg, ba, ca, da = new Promise((a, b) => {
            ba = a;
            ca = b;
          }), ea = "object" == typeof window, fa = "function" == typeof importScripts;
          function ha() {
            function a(g) {
              const k = d;
              c = b = 0;
              d = /* @__PURE__ */ new Map();
              k.forEach((p) => {
                try {
                  p(g);
                } catch (n) {
                  console.error(n);
                }
              });
              this.ob();
              e2 && e2.Qb();
            }
            let b = 0, c = 0, d = /* @__PURE__ */ new Map(), e2 = null, f = null;
            this.requestAnimationFrame = function(g) {
              b || (b = requestAnimationFrame(a.bind(this)));
              const k = ++c;
              d.set(k, g);
              return k;
            };
            this.cancelAnimationFrame = function(g) {
              d.delete(g);
              b && 0 == d.size && (cancelAnimationFrame(b), b = 0);
            };
            this.Ob = function(g) {
              f && (document.body.remove(f), f = null);
              g || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", g = function(k) {
                f.innerHTML = "RIVE FPS " + k.toFixed(1);
              }, document.body.appendChild(f));
              e2 = new function() {
                let k = 0, p = 0;
                this.Qb = function() {
                  var n = performance.now();
                  p ? (++k, n -= p, 1e3 < n && (g(1e3 * k / n), k = p = 0)) : (p = n, k = 0);
                };
              }();
            };
            this.Lb = function() {
              f && (document.body.remove(f), f = null);
              e2 = null;
            };
            this.ob = function() {
            };
          }
          function ia(a) {
            console.assert(true);
            const b = /* @__PURE__ */ new Map();
            let c = -Infinity;
            this.push = function(d) {
              d = d + ((1 << a) - 1) >> a;
              b.has(d) && clearTimeout(b.get(d));
              b.set(d, setTimeout(function() {
                b.delete(d);
                0 == b.length ? c = -Infinity : d == c && (c = Math.max(...b.keys()), console.assert(c < d));
              }, 1e3));
              c = Math.max(d, c);
              return c << a;
            };
          }
          const ja = m.onRuntimeInitialized;
          m.onRuntimeInitialized = function() {
            ja && ja();
            let a = m.decodeAudio;
            m.decodeAudio = function(e2, f) {
              e2 = a(e2);
              f(e2);
            };
            let b = m.decodeFont;
            m.decodeFont = function(e2, f) {
              e2 = b(e2);
              f(e2);
            };
            const c = m.FileAssetLoader;
            m.ptrToAsset = (e2) => {
              let f = m.ptrToFileAsset(e2);
              return f.isImage ? m.ptrToImageAsset(e2) : f.isFont ? m.ptrToFontAsset(e2) : f.isAudio ? m.ptrToAudioAsset(e2) : f;
            };
            m.CustomFileAssetLoader = c.extend("CustomFileAssetLoader", { __construct: function({ loadContents: e2 }) {
              this.__parent.__construct.call(this);
              this.Eb = e2;
            }, loadContents: function(e2, f) {
              e2 = m.ptrToAsset(e2);
              return this.Eb(e2, f);
            } });
            m.CDNFileAssetLoader = c.extend("CDNFileAssetLoader", { __construct: function() {
              this.__parent.__construct.call(this);
            }, loadContents: function(e2) {
              let f = m.ptrToAsset(e2);
              e2 = f.cdnUuid;
              if ("" === e2) {
                return false;
              }
              (function(g, k) {
                var p = new XMLHttpRequest();
                p.responseType = "arraybuffer";
                p.onreadystatechange = function() {
                  4 == p.readyState && 200 == p.status && k(p);
                };
                p.open("GET", g, true);
                p.send(null);
              })(f.cdnBaseUrl + "/" + e2, (g) => {
                f.decode(new Uint8Array(g.response));
              });
              return true;
            } });
            m.FallbackFileAssetLoader = c.extend("FallbackFileAssetLoader", { __construct: function() {
              this.__parent.__construct.call(this);
              this.kb = [];
            }, addLoader: function(e2) {
              this.kb.push(e2);
            }, loadContents: function(e2, f) {
              for (let g of this.kb) {
                if (g.loadContents(e2, f)) {
                  return true;
                }
              }
              return false;
            } });
            let d = m.computeAlignment;
            m.computeAlignment = function(e2, f, g, k, p = 1) {
              return d.call(this, e2, f, g, k, p);
            };
          };
          const ka = "createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "), la = new function() {
            function a() {
              if (!b) {
                let C = function(G, w, M) {
                  w = r.createShader(w);
                  r.shaderSource(w, M);
                  r.compileShader(w);
                  M = r.getShaderInfoLog(w);
                  if (0 < (M || "").length) {
                    throw M;
                  }
                  r.attachShader(G, w);
                };
                var l = document.createElement("canvas"), u = { alpha: 1, depth: 0, stencil: 0, antialias: 0, premultipliedAlpha: 1, preserveDrawingBuffer: 0, powerPreference: "high-performance", failIfMajorPerformanceCaveat: 0, enableExtensionsByDefault: 1, explicitSwapControl: 1, renderViaOffscreenBackBuffer: 1 };
                let r;
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                  if (r = l.getContext("webgl", u), c = 1, !r) {
                    return console.log("No WebGL support. Image mesh will not be drawn."), false;
                  }
                } else {
                  if (r = l.getContext("webgl2", u)) {
                    c = 2;
                  } else {
                    if (r = l.getContext("webgl", u)) {
                      c = 1;
                    } else {
                      return console.log("No WebGL support. Image mesh will not be drawn."), false;
                    }
                  }
                }
                r = new Proxy(r, { get(G, w) {
                  if (G.isContextLost()) {
                    if (p || (console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ", w), p = true), "function" === typeof G[w]) {
                      return function() {
                      };
                    }
                  } else {
                    return "function" === typeof G[w] ? function(...M) {
                      return G[w].apply(G, M);
                    } : G[w];
                  }
                }, set(G, w, M) {
                  if (G.isContextLost()) {
                    p || (console.error("Cannot render the mesh because the GL Context was lost. Tried to set property " + w), p = true);
                  } else {
                    return G[w] = M, true;
                  }
                } });
                d = Math.min(r.getParameter(r.MAX_RENDERBUFFER_SIZE), r.getParameter(r.MAX_TEXTURE_SIZE));
                l = r.createProgram();
                C(l, r.VERTEX_SHADER, "attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }");
                C(l, r.FRAGMENT_SHADER, "precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }");
                r.bindAttribLocation(l, 0, "vertex");
                r.bindAttribLocation(l, 1, "uv");
                r.linkProgram(l);
                u = r.getProgramInfoLog(l);
                if (0 < (u || "").trim().length) {
                  throw u;
                }
                e2 = r.getUniformLocation(l, "mat");
                f = r.getUniformLocation(l, "translate");
                r.useProgram(l);
                r.bindBuffer(r.ARRAY_BUFFER, r.createBuffer());
                r.enableVertexAttribArray(0);
                r.enableVertexAttribArray(1);
                r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, r.createBuffer());
                r.uniform1i(r.getUniformLocation(l, "image"), 0);
                r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                b = r;
              }
              return true;
            }
            let b = null, c = 0, d = 0, e2 = null, f = null, g = 0, k = 0, p = false;
            a();
            this.bc = function() {
              a();
              return d;
            };
            this.Kb = function(l) {
              b.deleteTexture && b.deleteTexture(l);
            };
            this.Jb = function(l) {
              if (!a()) {
                return null;
              }
              const u = b.createTexture();
              if (!u) {
                return null;
              }
              b.bindTexture(b.TEXTURE_2D, u);
              b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, l);
              b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
              b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
              b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
              2 == c ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR_MIPMAP_LINEAR), b.generateMipmap(b.TEXTURE_2D)) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
              return u;
            };
            const n = new ia(8), t2 = new ia(8), x = new ia(10), y = new ia(10);
            this.Nb = function(l, u, r, C, G) {
              if (a()) {
                var w = n.push(l), M = t2.push(u);
                if (b.canvas) {
                  if (b.canvas.width != w || b.canvas.height != M) {
                    b.canvas.width = w, b.canvas.height = M;
                  }
                  b.viewport(0, M - u, l, u);
                  b.disable(b.SCISSOR_TEST);
                  b.clearColor(0, 0, 0, 0);
                  b.clear(b.COLOR_BUFFER_BIT);
                  b.enable(b.SCISSOR_TEST);
                  r.sort((J, Z) => Z.vb - J.vb);
                  w = x.push(C);
                  g != w && (b.bufferData(b.ARRAY_BUFFER, 8 * w, b.DYNAMIC_DRAW), g = w);
                  w = 0;
                  for (var T of r) {
                    b.bufferSubData(b.ARRAY_BUFFER, w, T.Ta), w += 4 * T.Ta.length;
                  }
                  console.assert(w == 4 * C);
                  for (var W of r) {
                    b.bufferSubData(b.ARRAY_BUFFER, w, W.Bb), w += 4 * W.Bb.length;
                  }
                  console.assert(w == 8 * C);
                  w = y.push(G);
                  k != w && (b.bufferData(b.ELEMENT_ARRAY_BUFFER, 2 * w, b.DYNAMIC_DRAW), k = w);
                  T = 0;
                  for (var pa of r) {
                    b.bufferSubData(b.ELEMENT_ARRAY_BUFFER, T, pa.indices), T += 2 * pa.indices.length;
                  }
                  console.assert(T == 2 * G);
                  pa = 0;
                  W = true;
                  w = T = 0;
                  for (const J of r) {
                    J.image.Ja != pa && (b.bindTexture(b.TEXTURE_2D, J.image.Ia || null), pa = J.image.Ja);
                    J.hc ? (b.scissor(J.Za, M - J.$a - J.jb, J.uc, J.jb), W = true) : W && (b.scissor(0, M - u, l, u), W = false);
                    r = 2 / l;
                    const Z = -2 / u;
                    b.uniform4f(e2, J.ha[0] * r * J.Aa, J.ha[1] * Z * J.Ba, J.ha[2] * r * J.Aa, J.ha[3] * Z * J.Ba);
                    b.uniform2f(f, J.ha[4] * r * J.Aa + r * (J.Za - J.cc * J.Aa) - 1, J.ha[5] * Z * J.Ba + Z * (J.$a - J.dc * J.Ba) + 1);
                    b.vertexAttribPointer(0, 2, b.FLOAT, false, 0, w);
                    b.vertexAttribPointer(1, 2, b.FLOAT, false, 0, w + 4 * C);
                    b.drawElements(b.TRIANGLES, J.indices.length, b.UNSIGNED_SHORT, T);
                    w += 4 * J.Ta.length;
                    T += 2 * J.indices.length;
                  }
                  console.assert(w == 4 * C);
                  console.assert(T == 2 * G);
                }
              }
            };
            this.canvas = function() {
              return a() && b.canvas;
            };
          }(), ma = m.onRuntimeInitialized;
          m.onRuntimeInitialized = function() {
            function a(q) {
              switch (q) {
                case n.srcOver:
                  return "source-over";
                case n.screen:
                  return "screen";
                case n.overlay:
                  return "overlay";
                case n.darken:
                  return "darken";
                case n.lighten:
                  return "lighten";
                case n.colorDodge:
                  return "color-dodge";
                case n.colorBurn:
                  return "color-burn";
                case n.hardLight:
                  return "hard-light";
                case n.softLight:
                  return "soft-light";
                case n.difference:
                  return "difference";
                case n.exclusion:
                  return "exclusion";
                case n.multiply:
                  return "multiply";
                case n.hue:
                  return "hue";
                case n.saturation:
                  return "saturation";
                case n.color:
                  return "color";
                case n.luminosity:
                  return "luminosity";
              }
            }
            function b(q) {
              return "rgba(" + ((16711680 & q) >>> 16) + "," + ((65280 & q) >>> 8) + "," + ((255 & q) >>> 0) + "," + ((4278190080 & q) >>> 24) / 255 + ")";
            }
            function c() {
              0 < M.length && (la.Nb(w.drawWidth(), w.drawHeight(), M, T, W), M = [], W = T = 0, w.reset(512, 512));
              for (const q of G) {
                for (const v of q.I) {
                  v();
                }
                q.I = [];
              }
              G.clear();
            }
            ma && ma();
            var d = m.RenderPaintStyle;
            const e2 = m.RenderPath, f = m.RenderPaint, g = m.Renderer, k = m.StrokeCap, p = m.StrokeJoin, n = m.BlendMode, t2 = d.fill, x = d.stroke, y = m.FillRule.evenOdd;
            let l = 1;
            var u = m.RenderImage.extend("CanvasRenderImage", { __construct: function({ la: q, wa: v } = {}) {
              this.__parent.__construct.call(this);
              this.Ja = l;
              l = l + 1 & 2147483647 || 1;
              this.la = q;
              this.wa = v;
            }, __destruct: function() {
              this.Ia && (la.Kb(this.Ia), URL.revokeObjectURL(this.Wa));
              this.__parent.__destruct.call(this);
            }, decode: function(q) {
              var v = this;
              v.wa && v.wa(v);
              var H = new Image();
              v.Wa = URL.createObjectURL(new Blob([q], { type: "image/png" }));
              H.onload = function() {
                v.Db = H;
                v.Ia = la.Jb(H);
                v.size(H.width, H.height);
                v.la && v.la(v);
              };
              H.src = v.Wa;
            } }), r = e2.extend("CanvasRenderPath", { __construct: function() {
              this.__parent.__construct.call(this);
              this.U = new Path2D();
            }, rewind: function() {
              this.U = new Path2D();
            }, addPath: function(q, v, H, E, K, I, F) {
              var L = this.U, aa = L.addPath;
              q = q.U;
              const R = new DOMMatrix();
              R.a = v;
              R.b = H;
              R.c = E;
              R.d = K;
              R.e = I;
              R.f = F;
              aa.call(L, q, R);
            }, fillRule: function(q) {
              this.Va = q;
            }, moveTo: function(q, v) {
              this.U.moveTo(q, v);
            }, lineTo: function(q, v) {
              this.U.lineTo(q, v);
            }, cubicTo: function(q, v, H, E, K, I) {
              this.U.bezierCurveTo(q, v, H, E, K, I);
            }, close: function() {
              this.U.closePath();
            } }), C = f.extend("CanvasRenderPaint", { color: function(q) {
              this.Xa = b(q);
            }, thickness: function(q) {
              this.Gb = q;
            }, join: function(q) {
              switch (q) {
                case p.miter:
                  this.Ha = "miter";
                  break;
                case p.round:
                  this.Ha = "round";
                  break;
                case p.bevel:
                  this.Ha = "bevel";
              }
            }, cap: function(q) {
              switch (q) {
                case k.butt:
                  this.Ga = "butt";
                  break;
                case k.round:
                  this.Ga = "round";
                  break;
                case k.square:
                  this.Ga = "square";
              }
            }, style: function(q) {
              this.Fb = q;
            }, blendMode: function(q) {
              this.Cb = a(q);
            }, clearGradient: function() {
              this.ja = null;
            }, linearGradient: function(q, v, H, E) {
              this.ja = { xb: q, yb: v, cb: H, eb: E, Qa: [] };
            }, radialGradient: function(q, v, H, E) {
              this.ja = { xb: q, yb: v, cb: H, eb: E, Qa: [], ac: true };
            }, addStop: function(q, v) {
              this.ja.Qa.push({ color: q, stop: v });
            }, completeGradient: function() {
            }, draw: function(q, v, H, E) {
              let K = this.Fb;
              var I = this.Xa, F = this.ja;
              const L = q.globalCompositeOperation, aa = q.globalAlpha;
              q.globalCompositeOperation = this.Cb;
              q.globalAlpha = E;
              if (null != F) {
                I = F.xb;
                const X = F.yb, S = F.cb;
                var R = F.eb;
                E = F.Qa;
                F.ac ? (F = S - I, R -= X, I = q.createRadialGradient(I, X, 0, I, X, Math.sqrt(F * F + R * R))) : I = q.createLinearGradient(I, X, S, R);
                for (let xa = 0, Ya = E.length; xa < Ya; xa++) {
                  F = E[xa], I.addColorStop(F.stop, b(F.color));
                }
                this.Xa = I;
                this.ja = null;
              }
              switch (K) {
                case x:
                  q.strokeStyle = I;
                  q.lineWidth = this.Gb;
                  q.lineCap = this.Ga;
                  q.lineJoin = this.Ha;
                  q.stroke(v);
                  break;
                case t2:
                  q.fillStyle = I, q.fill(v, H);
              }
              q.globalCompositeOperation = L;
              q.globalAlpha = aa;
            } });
            const G = /* @__PURE__ */ new Set();
            let w = null, M = [], T = 0, W = 0;
            var pa = m.CanvasRenderer = g.extend("Renderer", { __construct: function(q) {
              this.__parent.__construct.call(this);
              this.T = [1, 0, 0, 1, 0, 0];
              this.G = [1];
              this.B = q.getContext("2d");
              this.Ua = q;
              this.I = [];
            }, save: function() {
              this.T.push(...this.T.slice(this.T.length - 6));
              this.G.push(this.G[this.G.length - 1]);
              this.I.push(this.B.save.bind(this.B));
            }, restore: function() {
              const q = this.T.length - 6;
              if (6 > q) {
                throw "restore() called without matching save().";
              }
              this.T.splice(q);
              this.G.pop();
              this.I.push(this.B.restore.bind(this.B));
            }, transform: function(q, v, H, E, K, I) {
              const F = this.T, L = F.length - 6;
              F.splice(L, 6, F[L] * q + F[L + 2] * v, F[L + 1] * q + F[L + 3] * v, F[L] * H + F[L + 2] * E, F[L + 1] * H + F[L + 3] * E, F[L] * K + F[L + 2] * I + F[L + 4], F[L + 1] * K + F[L + 3] * I + F[L + 5]);
              this.I.push(this.B.transform.bind(this.B, q, v, H, E, K, I));
            }, rotate: function(q) {
              const v = Math.sin(q);
              q = Math.cos(q);
              this.transform(q, v, -v, q, 0, 0);
            }, modulateOpacity: function(q) {
              this.G[this.G.length - 1] *= q;
            }, _drawPath: function(q, v) {
              this.I.push(v.draw.bind(v, this.B, q.U, q.Va === y ? "evenodd" : "nonzero", Math.max(0, this.G[this.G.length - 1])));
            }, _drawRiveImage: function(q, v, H, E) {
              var K = q.Db;
              if (K) {
                var I = this.B, F = a(H), L = Math.max(0, E * this.G[this.G.length - 1]);
                this.I.push(function() {
                  I.globalCompositeOperation = F;
                  I.globalAlpha = L;
                  I.drawImage(K, 0, 0);
                  I.globalAlpha = 1;
                });
              }
            }, _getMatrix: function(q) {
              const v = this.T, H = v.length - 6;
              for (let E = 0; 6 > E; ++E) {
                q[E] = v[H + E];
              }
            }, _drawImageMesh: function(q, v, H, E, K, I, F, L, aa, R, X) {
              v = this.B.canvas.width;
              var S = this.B.canvas.height;
              const xa = R - L, Ya = X - aa;
              L = Math.max(L, 0);
              aa = Math.max(aa, 0);
              R = Math.min(R, v);
              X = Math.min(X, S);
              const Fa = R - L, Ga = X - aa;
              console.assert(Fa <= Math.min(xa, v));
              console.assert(Ga <= Math.min(Ya, S));
              if (!(0 >= Fa || 0 >= Ga)) {
                R = Fa < xa || Ga < Ya;
                v = X = 1;
                var qa = Math.ceil(Fa * X), ra = Math.ceil(Ga * v);
                S = la.bc();
                qa > S && (X *= S / qa, qa = S);
                ra > S && (v *= S / ra, ra = S);
                w || (w = new m.DynamicRectanizer(S), w.reset(512, 512));
                S = w.addRect(qa, ra);
                0 > S && (c(), G.add(this), S = w.addRect(qa, ra), console.assert(0 <= S));
                var $b = S & 65535, ac = S >> 16;
                M.push({ ha: this.T.slice(this.T.length - 6), image: q, Za: $b, $a: ac, cc: L, dc: aa, uc: qa, jb: ra, Aa: X, Ba: v, Ta: new Float32Array(K), Bb: new Float32Array(I), indices: new Uint16Array(F), hc: R, vb: q.Ja << 1 | (R ? 1 : 0) });
                T += K.length;
                W += F.length;
                var ya = this.B, od = a(H), pd = Math.max(0, E * this.G[this.G.length - 1]);
                this.I.push(function() {
                  ya.save();
                  ya.resetTransform();
                  ya.globalCompositeOperation = od;
                  ya.globalAlpha = pd;
                  const bc = la.canvas();
                  bc && ya.drawImage(bc, $b, ac, qa, ra, L, aa, Fa, Ga);
                  ya.restore();
                });
              }
            }, _clipPath: function(q) {
              this.I.push(this.B.clip.bind(this.B, q.U, q.Va === y ? "evenodd" : "nonzero"));
            }, clear: function() {
              G.add(this);
              this.I.push(this.B.clearRect.bind(this.B, 0, 0, this.Ua.width, this.Ua.height));
            }, flush: function() {
            }, translate: function(q, v) {
              this.transform(1, 0, 0, 1, q, v);
            } });
            m.makeRenderer = function(q) {
              const v = new pa(q), H = v.B;
              return new Proxy(v, { get(E, K) {
                if ("function" === typeof E[K]) {
                  return function(...I) {
                    return E[K].apply(E, I);
                  };
                }
                if ("function" === typeof H[K]) {
                  if (-1 < ka.indexOf(K)) {
                    throw Error("RiveException: Method call to '" + K + "()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");
                  }
                  return function(...I) {
                    v.I.push(H[K].bind(H, ...I));
                  };
                }
                return E[K];
              }, set(E, K, I) {
                if (K in H) {
                  return v.I.push(() => {
                    H[K] = I;
                  }), true;
                }
              } });
            };
            m.decodeImage = function(q, v) {
              new u({ la: v }).decode(q);
            };
            m.renderFactory = { makeRenderPaint: function() {
              return new C();
            }, makeRenderPath: function() {
              return new r();
            }, makeRenderImage: function() {
              let q = Z;
              return new u({ wa: () => {
                q.total++;
              }, la: () => {
                q.loaded++;
                if (q.loaded === q.total) {
                  const v = q.ready;
                  v && (v(), q.ready = null);
                }
              } });
            } };
            let J = m.load, Z = null;
            m.load = function(q, v, H = true) {
              const E = new m.FallbackFileAssetLoader();
              void 0 !== v && E.addLoader(v);
              H && (v = new m.CDNFileAssetLoader(), E.addLoader(v));
              return new Promise(function(K) {
                let I = null;
                Z = { total: 0, loaded: 0, ready: function() {
                  K(I);
                } };
                I = J(q, E);
                0 == Z.total && K(I);
              });
            };
            let qd = m.RendererWrapper.prototype.align;
            m.RendererWrapper.prototype.align = function(q, v, H, E, K = 1) {
              qd.call(this, q, v, H, E, K);
            };
            d = new ha();
            m.requestAnimationFrame = d.requestAnimationFrame.bind(d);
            m.cancelAnimationFrame = d.cancelAnimationFrame.bind(d);
            m.enableFPSCounter = d.Ob.bind(d);
            m.disableFPSCounter = d.Lb;
            d.ob = c;
            m.resolveAnimationFrame = c;
            m.cleanup = function() {
              w && w.delete();
            };
          };
          var na = Object.assign({}, m), oa = "./this.program", sa = "", ta, ua;
          if (ea || fa) {
            fa ? sa = self.location.href : "undefined" != typeof document && document.currentScript && (sa = document.currentScript.src), _scriptName && (sa = _scriptName), sa.startsWith("blob:") ? sa = "" : sa = sa.substr(0, sa.replace(/[?#].*/, "").lastIndexOf("/") + 1), fa && (ua = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response);
            }), ta = (a, b, c) => {
              if (va(a)) {
                var d = new XMLHttpRequest();
                d.open("GET", a, true);
                d.responseType = "arraybuffer";
                d.onload = () => {
                  200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
                };
                d.onerror = c;
                d.send(null);
              } else {
                fetch(a, { credentials: "same-origin" }).then((e2) => e2.ok ? e2.arrayBuffer() : Promise.reject(Error(e2.status + " : " + e2.url))).then(b, c);
              }
            };
          }
          var wa = m.print || console.log.bind(console), za = m.printErr || console.error.bind(console);
          Object.assign(m, na);
          na = null;
          m.thisProgram && (oa = m.thisProgram);
          var Aa;
          m.wasmBinary && (Aa = m.wasmBinary);
          var Ba, Ca = false, z, A, Da, Ea, B, D, Ha, Ia;
          function Ja() {
            var a = Ba.buffer;
            m.HEAP8 = z = new Int8Array(a);
            m.HEAP16 = Da = new Int16Array(a);
            m.HEAPU8 = A = new Uint8Array(a);
            m.HEAPU16 = Ea = new Uint16Array(a);
            m.HEAP32 = B = new Int32Array(a);
            m.HEAPU32 = D = new Uint32Array(a);
            m.HEAPF32 = Ha = new Float32Array(a);
            m.HEAPF64 = Ia = new Float64Array(a);
          }
          var Ka = [], La = [], Ma = [];
          function Na() {
            var a = m.preRun.shift();
            Ka.unshift(a);
          }
          var Oa = 0, Pa = null, Qa = null;
          function Ra(a) {
            m.onAbort?.(a);
            a = "Aborted(" + a + ")";
            za(a);
            Ca = true;
            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
            ca(a);
            throw a;
          }
          var Sa = (a) => a.startsWith("data:application/octet-stream;base64,"), va = (a) => a.startsWith("file://"), Ta;
          function Ua(a) {
            if (a == Ta && Aa) {
              return new Uint8Array(Aa);
            }
            if (ua) {
              return ua(a);
            }
            throw "both async and sync fetching of the wasm failed";
          }
          function Va(a) {
            return Aa ? Promise.resolve().then(() => Ua(a)) : new Promise((b, c) => {
              ta(a, (d) => b(new Uint8Array(d)), () => {
                try {
                  b(Ua(a));
                } catch (d) {
                  c(d);
                }
              });
            });
          }
          function Wa(a, b, c) {
            return Va(a).then((d) => WebAssembly.instantiate(d, b)).then(c, (d) => {
              za(`failed to asynchronously prepare wasm: ${d}`);
              Ra(d);
            });
          }
          function Xa(a, b) {
            var c = Ta;
            return Aa || "function" != typeof WebAssembly.instantiateStreaming || Sa(c) || va(c) || "function" != typeof fetch ? Wa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e2) {
              za(`wasm streaming compile failed: ${e2}`);
              za("falling back to ArrayBuffer instantiation");
              return Wa(c, a, b);
            }));
          }
          var Za, $a, db = { 491138: (a, b, c, d, e2) => {
            if ("undefined" === typeof window || void 0 === (window.AudioContext || window.webkitAudioContext)) {
              return 0;
            }
            if ("undefined" === typeof window.h) {
              window.h = { za: 0 };
              window.h.J = {};
              window.h.J.xa = a;
              window.h.J.capture = b;
              window.h.J.Ka = c;
              window.h.ga = {};
              window.h.ga.stopped = d;
              window.h.ga.wb = e2;
              let f = window.h;
              f.D = [];
              f.sc = function(g) {
                for (var k = 0; k < f.D.length; ++k) {
                  if (null == f.D[k]) {
                    return f.D[k] = g, k;
                  }
                }
                f.D.push(g);
                return f.D.length - 1;
              };
              f.Ab = function(g) {
                for (f.D[g] = null; 0 < f.D.length; ) {
                  if (null == f.D[f.D.length - 1]) {
                    f.D.pop();
                  } else {
                    break;
                  }
                }
              };
              f.Pc = function(g) {
                for (var k = 0; k < f.D.length; ++k) {
                  if (f.D[k] == g) {
                    return f.Ab(k);
                  }
                }
              };
              f.qa = function(g) {
                return f.D[g];
              };
              f.Sa = ["touchend", "click"];
              f.unlock = function() {
                for (var g = 0; g < f.D.length; ++g) {
                  var k = f.D[g];
                  null != k && null != k.L && k.state === f.ga.wb && k.L.resume().then(() => {
                    ab(k.pb);
                  }, (p) => {
                    console.error("Failed to resume audiocontext", p);
                  });
                }
                f.Sa.map(function(p) {
                  document.removeEventListener(p, f.unlock, true);
                });
              };
              f.Sa.map(function(g) {
                document.addEventListener(g, f.unlock, true);
              });
            }
            window.h.za += 1;
            return 1;
          }, 493316: () => {
            "undefined" !== typeof window.h && (window.h.Sa.map(function(a) {
              document.removeEventListener(a, window.h.unlock, true);
            }), --window.h.za, 0 === window.h.za && delete window.h);
          }, 493620: () => void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia, 493724: () => {
            try {
              var a = new (window.AudioContext || window.webkitAudioContext)(), b = a.sampleRate;
              a.close();
              return b;
            } catch (c) {
              return 0;
            }
          }, 493895: (a, b, c, d, e2, f) => {
            if ("undefined" === typeof window.h) {
              return -1;
            }
            var g = {}, k = {};
            a == window.h.J.xa && 0 != c && (k.sampleRate = c);
            g.L = new (window.AudioContext || window.webkitAudioContext)(k);
            g.L.suspend();
            g.state = window.h.ga.stopped;
            c = 0;
            a != window.h.J.xa && (c = b);
            g.Z = g.L.createScriptProcessor(d, c, b);
            g.Z.onaudioprocess = function(p) {
              if (null == g.ra || 0 == g.ra.length) {
                g.ra = new Float32Array(Ha.buffer, e2, d * b);
              }
              if (a == window.h.J.capture || a == window.h.J.Ka) {
                for (var n = 0; n < b; n += 1) {
                  for (var t2 = p.inputBuffer.getChannelData(n), x = g.ra, y = 0; y < d; y += 1) {
                    x[y * b + n] = t2[y];
                  }
                }
                bb(f, d, e2);
              }
              if (a == window.h.J.xa || a == window.h.J.Ka) {
                for (cb(f, d, e2), n = 0; n < p.outputBuffer.numberOfChannels; ++n) {
                  for (t2 = p.outputBuffer.getChannelData(n), x = g.ra, y = 0; y < d; y += 1) {
                    t2[y] = x[y * b + n];
                  }
                }
              } else {
                for (n = 0; n < p.outputBuffer.numberOfChannels; ++n) {
                  p.outputBuffer.getChannelData(n).fill(0);
                }
              }
            };
            a != window.h.J.capture && a != window.h.J.Ka || navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(p) {
              g.Ca = g.L.createMediaStreamSource(p);
              g.Ca.connect(g.Z);
              g.Z.connect(g.L.destination);
            }).catch(function(p) {
              console.log("Failed to get user media: " + p);
            });
            a == window.h.J.xa && g.Z.connect(g.L.destination);
            g.pb = f;
            return window.h.sc(g);
          }, 496772: (a) => window.h.qa(a).L.sampleRate, 496845: (a) => {
            a = window.h.qa(a);
            void 0 !== a.Z && (a.Z.onaudioprocess = function() {
            }, a.Z.disconnect(), a.Z = void 0);
            void 0 !== a.Ca && (a.Ca.disconnect(), a.Ca = void 0);
            a.L.close();
            a.L = void 0;
            a.pb = void 0;
          }, 497245: (a) => {
            window.h.Ab(a);
          }, 497295: (a) => {
            a = window.h.qa(a);
            a.L.resume();
            a.state = window.h.ga.wb;
          }, 497434: (a) => {
            a = window.h.qa(a);
            a.L.suspend();
            a.state = window.h.ga.stopped;
          } }, eb = (a) => {
            for (; 0 < a.length; ) {
              a.shift()(m);
            }
          };
          function fb() {
            var a = B[+gb >> 2];
            gb += 4;
            return a;
          }
          var hb = (a, b) => {
            for (var c = 0, d = a.length - 1; 0 <= d; d--) {
              var e2 = a[d];
              "." === e2 ? a.splice(d, 1) : ".." === e2 ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
            }
            if (b) {
              for (; c; c--) {
                a.unshift("..");
              }
            }
            return a;
          }, ib = (a) => {
            var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
            (a = hb(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
            a && c && (a += "/");
            return (b ? "/" : "") + a;
          }, jb = (a) => {
            var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
            a = b[0];
            b = b[1];
            if (!a && !b) {
              return ".";
            }
            b && (b = b.substr(0, b.length - 1));
            return a + b;
          }, kb = (a) => {
            if ("/" === a) {
              return "/";
            }
            a = ib(a);
            a = a.replace(/\/$/, "");
            var b = a.lastIndexOf("/");
            return -1 === b ? a : a.substr(b + 1);
          }, lb = () => {
            if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
              return (a) => crypto.getRandomValues(a);
            }
            Ra("initRandomDevice");
          }, mb = (a) => (mb = lb())(a), nb = (...a) => {
            for (var b = "", c = false, d = a.length - 1; -1 <= d && !c; d--) {
              c = 0 <= d ? a[d] : "/";
              if ("string" != typeof c) {
                throw new TypeError("Arguments to path.resolve must be strings");
              }
              if (!c) {
                return "";
              }
              b = c + "/" + b;
              c = "/" === c.charAt(0);
            }
            b = hb(b.split("/").filter((e2) => !!e2), !c).join("/");
            return (c ? "/" : "") + b || ".";
          }, ob = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, pb = (a, b, c) => {
            var d = b + c;
            for (c = b; a[c] && !(c >= d); ) {
              ++c;
            }
            if (16 < c - b && a.buffer && ob) {
              return ob.decode(a.subarray(b, c));
            }
            for (d = ""; b < c; ) {
              var e2 = a[b++];
              if (e2 & 128) {
                var f = a[b++] & 63;
                if (192 == (e2 & 224)) {
                  d += String.fromCharCode((e2 & 31) << 6 | f);
                } else {
                  var g = a[b++] & 63;
                  e2 = 224 == (e2 & 240) ? (e2 & 15) << 12 | f << 6 | g : (e2 & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                  65536 > e2 ? d += String.fromCharCode(e2) : (e2 -= 65536, d += String.fromCharCode(55296 | e2 >> 10, 56320 | e2 & 1023));
                }
              } else {
                d += String.fromCharCode(e2);
              }
            }
            return d;
          }, qb = [], rb = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
            }
            return b;
          }, sb = (a, b, c, d) => {
            if (!(0 < d)) {
              return 0;
            }
            var e2 = c;
            d = c + d - 1;
            for (var f = 0; f < a.length; ++f) {
              var g = a.charCodeAt(f);
              if (55296 <= g && 57343 >= g) {
                var k = a.charCodeAt(++f);
                g = 65536 + ((g & 1023) << 10) | k & 1023;
              }
              if (127 >= g) {
                if (c >= d) {
                  break;
                }
                b[c++] = g;
              } else {
                if (2047 >= g) {
                  if (c + 1 >= d) {
                    break;
                  }
                  b[c++] = 192 | g >> 6;
                } else {
                  if (65535 >= g) {
                    if (c + 2 >= d) {
                      break;
                    }
                    b[c++] = 224 | g >> 12;
                  } else {
                    if (c + 3 >= d) {
                      break;
                    }
                    b[c++] = 240 | g >> 18;
                    b[c++] = 128 | g >> 12 & 63;
                  }
                  b[c++] = 128 | g >> 6 & 63;
                }
                b[c++] = 128 | g & 63;
              }
            }
            b[c] = 0;
            return c - e2;
          };
          function tb(a, b) {
            var c = Array(rb(a) + 1);
            a = sb(a, c, 0, c.length);
            b && (c.length = a);
            return c;
          }
          var ub = [];
          function vb(a, b) {
            ub[a] = { input: [], H: [], W: b };
            wb(a, xb);
          }
          var xb = { open(a) {
            var b = ub[a.node.ya];
            if (!b) {
              throw new N(43);
            }
            a.s = b;
            a.seekable = false;
          }, close(a) {
            a.s.W.pa(a.s);
          }, pa(a) {
            a.s.W.pa(a.s);
          }, read(a, b, c, d) {
            if (!a.s || !a.s.W.ib) {
              throw new N(60);
            }
            for (var e2 = 0, f = 0; f < d; f++) {
              try {
                var g = a.s.W.ib(a.s);
              } catch (k) {
                throw new N(29);
              }
              if (void 0 === g && 0 === e2) {
                throw new N(6);
              }
              if (null === g || void 0 === g) {
                break;
              }
              e2++;
              b[c + f] = g;
            }
            e2 && (a.node.timestamp = Date.now());
            return e2;
          }, write(a, b, c, d) {
            if (!a.s || !a.s.W.Na) {
              throw new N(60);
            }
            try {
              for (var e2 = 0; e2 < d; e2++) {
                a.s.W.Na(a.s, b[c + e2]);
              }
            } catch (f) {
              throw new N(29);
            }
            d && (a.node.timestamp = Date.now());
            return e2;
          } }, yb = { ib() {
            a: {
              if (!qb.length) {
                var a = null;
                "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
                if (!a) {
                  a = null;
                  break a;
                }
                qb = tb(a, true);
              }
              a = qb.shift();
            }
            return a;
          }, Na(a, b) {
            null === b || 10 === b ? (wa(pb(a.H, 0)), a.H = []) : 0 != b && a.H.push(b);
          }, pa(a) {
            a.H && 0 < a.H.length && (wa(pb(a.H, 0)), a.H = []);
          }, Yb() {
            return { Ac: 25856, Cc: 5, zc: 191, Bc: 35387, yc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
          }, Zb() {
            return 0;
          }, $b() {
            return [24, 80];
          } }, zb = { Na(a, b) {
            null === b || 10 === b ? (za(pb(a.H, 0)), a.H = []) : 0 != b && a.H.push(b);
          }, pa(a) {
            a.H && 0 < a.H.length && (za(pb(a.H, 0)), a.H = []);
          } };
          function Ab(a, b) {
            var c = a.l ? a.l.length : 0;
            c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.l, a.l = new Uint8Array(b), 0 < a.v && a.l.set(c.subarray(0, a.v), 0));
          }
          var O = { O: null, V() {
            return O.createNode(null, "/", 16895, 0);
          }, createNode(a, b, c, d) {
            if (24576 === (c & 61440) || 4096 === (c & 61440)) {
              throw new N(63);
            }
            O.O || (O.O = { dir: { node: { Y: O.j.Y, R: O.j.R, ka: O.j.ka, ua: O.j.ua, tb: O.j.tb, zb: O.j.zb, ub: O.j.ub, sb: O.j.sb, Da: O.j.Da }, stream: { ba: O.m.ba } }, file: { node: { Y: O.j.Y, R: O.j.R }, stream: { ba: O.m.ba, read: O.m.read, write: O.m.write, Ya: O.m.Ya, lb: O.m.lb, nb: O.m.nb } }, link: { node: { Y: O.j.Y, R: O.j.R, ma: O.j.ma }, stream: {} }, ab: { node: { Y: O.j.Y, R: O.j.R }, stream: Bb } });
            c = Cb(a, b, c, d);
            16384 === (c.mode & 61440) ? (c.j = O.O.dir.node, c.m = O.O.dir.stream, c.l = {}) : 32768 === (c.mode & 61440) ? (c.j = O.O.file.node, c.m = O.O.file.stream, c.v = 0, c.l = null) : 40960 === (c.mode & 61440) ? (c.j = O.O.link.node, c.m = O.O.link.stream) : 8192 === (c.mode & 61440) && (c.j = O.O.ab.node, c.m = O.O.ab.stream);
            c.timestamp = Date.now();
            a && (a.l[b] = c, a.timestamp = c.timestamp);
            return c;
          }, Gc(a) {
            return a.l ? a.l.subarray ? a.l.subarray(0, a.v) : new Uint8Array(a.l) : new Uint8Array(0);
          }, j: { Y(a) {
            var b = {};
            b.Ec = 8192 === (a.mode & 61440) ? a.id : 1;
            b.Ic = a.id;
            b.mode = a.mode;
            b.Lc = 1;
            b.uid = 0;
            b.Hc = 0;
            b.ya = a.ya;
            16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
            b.wc = new Date(a.timestamp);
            b.Kc = new Date(a.timestamp);
            b.Dc = new Date(a.timestamp);
            b.Hb = 4096;
            b.xc = Math.ceil(b.size / b.Hb);
            return b;
          }, R(a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            if (void 0 !== b.size && (b = b.size, a.v != b)) {
              if (0 == b) {
                a.l = null, a.v = 0;
              } else {
                var c = a.l;
                a.l = new Uint8Array(b);
                c && a.l.set(c.subarray(0, Math.min(b, a.v)));
                a.v = b;
              }
            }
          }, ka() {
            throw Db[44];
          }, ua(a, b, c, d) {
            return O.createNode(a, b, c, d);
          }, tb(a, b, c) {
            if (16384 === (a.mode & 61440)) {
              try {
                var d = Eb(b, c);
              } catch (f) {
              }
              if (d) {
                for (var e2 in d.l) {
                  throw new N(55);
                }
              }
            }
            delete a.parent.l[a.name];
            a.parent.timestamp = Date.now();
            a.name = c;
            b.l[c] = a;
            b.timestamp = a.parent.timestamp;
          }, zb(a, b) {
            delete a.l[b];
            a.timestamp = Date.now();
          }, ub(a, b) {
            var c = Eb(a, b), d;
            for (d in c.l) {
              throw new N(55);
            }
            delete a.l[b];
            a.timestamp = Date.now();
          }, sb(a) {
            var b = [".", ".."], c;
            for (c of Object.keys(a.l)) {
              b.push(c);
            }
            return b;
          }, Da(a, b, c) {
            a = O.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          }, ma(a) {
            if (40960 !== (a.mode & 61440)) {
              throw new N(28);
            }
            return a.link;
          } }, m: { read(a, b, c, d, e2) {
            var f = a.node.l;
            if (e2 >= a.node.v) {
              return 0;
            }
            a = Math.min(a.node.v - e2, d);
            if (8 < a && f.subarray) {
              b.set(f.subarray(e2, e2 + a), c);
            } else {
              for (d = 0; d < a; d++) {
                b[c + d] = f[e2 + d];
              }
            }
            return a;
          }, write(a, b, c, d, e2, f) {
            b.buffer === z.buffer && (f = false);
            if (!d) {
              return 0;
            }
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.l || a.l.subarray)) {
              if (f) {
                return a.l = b.subarray(c, c + d), a.v = d;
              }
              if (0 === a.v && 0 === e2) {
                return a.l = b.slice(c, c + d), a.v = d;
              }
              if (e2 + d <= a.v) {
                return a.l.set(b.subarray(c, c + d), e2), d;
              }
            }
            Ab(a, e2 + d);
            if (a.l.subarray && b.subarray) {
              a.l.set(b.subarray(c, c + d), e2);
            } else {
              for (f = 0; f < d; f++) {
                a.l[e2 + f] = b[c + f];
              }
            }
            a.v = Math.max(a.v, e2 + d);
            return d;
          }, ba(a, b, c) {
            1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
            if (0 > b) {
              throw new N(28);
            }
            return b;
          }, Ya(a, b, c) {
            Ab(a.node, b + c);
            a.node.v = Math.max(a.node.v, b + c);
          }, lb(a, b, c, d, e2) {
            if (32768 !== (a.node.mode & 61440)) {
              throw new N(43);
            }
            a = a.node.l;
            if (e2 & 2 || a.buffer !== z.buffer) {
              if (0 < c || c + b < a.length) {
                a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
              }
              c = true;
              Ra();
              b = void 0;
              if (!b) {
                throw new N(48);
              }
              z.set(a, b);
            } else {
              c = false, b = a.byteOffset;
            }
            return { o: b, vc: c };
          }, nb(a, b, c, d) {
            O.m.write(a, b, 0, d, c, false);
            return 0;
          } } }, Fb = (a, b) => {
            var c = 0;
            a && (c |= 365);
            b && (c |= 146);
            return c;
          }, Gb = null, Hb = {}, Ib = [], Jb = 1, Kb = null, Lb = true, N = class {
            constructor(a) {
              this.name = "ErrnoError";
              this.aa = a;
            }
          }, Db = {}, Mb = class {
            constructor() {
              this.h = {};
              this.node = null;
            }
            get flags() {
              return this.h.flags;
            }
            set flags(a) {
              this.h.flags = a;
            }
            get position() {
              return this.h.position;
            }
            set position(a) {
              this.h.position = a;
            }
          }, Nb = class {
            constructor(a, b, c, d) {
              a || (a = this);
              this.parent = a;
              this.V = a.V;
              this.va = null;
              this.id = Jb++;
              this.name = b;
              this.mode = c;
              this.j = {};
              this.m = {};
              this.ya = d;
            }
            get read() {
              return 365 === (this.mode & 365);
            }
            set read(a) {
              a ? this.mode |= 365 : this.mode &= -366;
            }
            get write() {
              return 146 === (this.mode & 146);
            }
            set write(a) {
              a ? this.mode |= 146 : this.mode &= -147;
            }
          };
          function Ob(a, b = {}) {
            a = nb(a);
            if (!a) {
              return { path: "", node: null };
            }
            b = Object.assign({ hb: true, Pa: 0 }, b);
            if (8 < b.Pa) {
              throw new N(32);
            }
            a = a.split("/").filter((g) => !!g);
            for (var c = Gb, d = "/", e2 = 0; e2 < a.length; e2++) {
              var f = e2 === a.length - 1;
              if (f && b.parent) {
                break;
              }
              c = Eb(c, a[e2]);
              d = ib(d + "/" + a[e2]);
              c.va && (!f || f && b.hb) && (c = c.va.root);
              if (!f || b.gb) {
                for (f = 0; 40960 === (c.mode & 61440); ) {
                  if (c = Pb(d), d = nb(jb(d), c), c = Ob(d, { Pa: b.Pa + 1 }).node, 40 < f++) {
                    throw new N(32);
                  }
                }
              }
            }
            return { path: d, node: c };
          }
          function Qb(a) {
            for (var b; ; ) {
              if (a === a.parent) {
                return a = a.V.mb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
              }
              b = b ? `${a.name}/${b}` : a.name;
              a = a.parent;
            }
          }
          function Rb(a, b) {
            for (var c = 0, d = 0; d < b.length; d++) {
              c = (c << 5) - c + b.charCodeAt(d) | 0;
            }
            return (a + c >>> 0) % Kb.length;
          }
          function Eb(a, b) {
            var c = 16384 === (a.mode & 61440) ? (c = Sb(a, "x")) ? c : a.j.ka ? 0 : 2 : 54;
            if (c) {
              throw new N(c);
            }
            for (c = Kb[Rb(a.id, b)]; c; c = c.fc) {
              var d = c.name;
              if (c.parent.id === a.id && d === b) {
                return c;
              }
            }
            return a.j.ka(a, b);
          }
          function Cb(a, b, c, d) {
            a = new Nb(a, b, c, d);
            b = Rb(a.parent.id, a.name);
            a.fc = Kb[b];
            return Kb[b] = a;
          }
          function Tb(a) {
            var b = ["r", "w", "rw"][a & 3];
            a & 512 && (b += "w");
            return b;
          }
          function Sb(a, b) {
            if (Lb) {
              return 0;
            }
            if (!b.includes("r") || a.mode & 292) {
              if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
                return 2;
              }
            } else {
              return 2;
            }
            return 0;
          }
          function Ub(a, b) {
            try {
              return Eb(a, b), 20;
            } catch (c) {
            }
            return Sb(a, "wx");
          }
          function Vb(a) {
            a = Ib[a];
            if (!a) {
              throw new N(8);
            }
            return a;
          }
          function Wb(a, b = -1) {
            a = Object.assign(new Mb(), a);
            if (-1 == b) {
              a: {
                for (b = 0; 4096 >= b; b++) {
                  if (!Ib[b]) {
                    break a;
                  }
                }
                throw new N(33);
              }
            }
            a.X = b;
            return Ib[b] = a;
          }
          function Xb(a, b = -1) {
            a = Wb(a, b);
            a.m?.Fc?.(a);
            return a;
          }
          var Bb = { open(a) {
            a.m = Hb[a.node.ya].m;
            a.m.open?.(a);
          }, ba() {
            throw new N(70);
          } };
          function wb(a, b) {
            Hb[a] = { m: b };
          }
          function Yb(a, b) {
            var c = "/" === b;
            if (c && Gb) {
              throw new N(10);
            }
            if (!c && b) {
              var d = Ob(b, { hb: false });
              b = d.path;
              d = d.node;
              if (d.va) {
                throw new N(10);
              }
              if (16384 !== (d.mode & 61440)) {
                throw new N(54);
              }
            }
            b = { type: a, Nc: {}, mb: b, ec: [] };
            a = a.V(b);
            a.V = b;
            b.root = a;
            c ? Gb = a : d && (d.va = b, d.V && d.V.ec.push(b));
          }
          function Zb(a, b, c) {
            var d = Ob(a, { parent: true }).node;
            a = kb(a);
            if (!a || "." === a || ".." === a) {
              throw new N(28);
            }
            var e2 = Ub(d, a);
            if (e2) {
              throw new N(e2);
            }
            if (!d.j.ua) {
              throw new N(63);
            }
            return d.j.ua(d, a, b, c);
          }
          function cc(a) {
            return Zb(a, 16895, 0);
          }
          function dc(a, b, c) {
            "undefined" == typeof c && (c = b, b = 438);
            Zb(a, b | 8192, c);
          }
          function ec(a, b) {
            if (!nb(a)) {
              throw new N(44);
            }
            var c = Ob(b, { parent: true }).node;
            if (!c) {
              throw new N(44);
            }
            b = kb(b);
            var d = Ub(c, b);
            if (d) {
              throw new N(d);
            }
            if (!c.j.Da) {
              throw new N(63);
            }
            c.j.Da(c, b, a);
          }
          function Pb(a) {
            a = Ob(a).node;
            if (!a) {
              throw new N(44);
            }
            if (!a.j.ma) {
              throw new N(28);
            }
            return nb(Qb(a.parent), a.j.ma(a));
          }
          function fc(a, b, c) {
            if ("" === a) {
              throw new N(44);
            }
            if ("string" == typeof b) {
              var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
              if ("undefined" == typeof d) {
                throw Error(`Unknown file open mode: ${b}`);
              }
              b = d;
            }
            c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
            if ("object" == typeof a) {
              var e2 = a;
            } else {
              a = ib(a);
              try {
                e2 = Ob(a, { gb: !(b & 131072) }).node;
              } catch (f) {
              }
            }
            d = false;
            if (b & 64) {
              if (e2) {
                if (b & 128) {
                  throw new N(20);
                }
              } else {
                e2 = Zb(a, c, 0), d = true;
              }
            }
            if (!e2) {
              throw new N(44);
            }
            8192 === (e2.mode & 61440) && (b &= -513);
            if (b & 65536 && 16384 !== (e2.mode & 61440)) {
              throw new N(54);
            }
            if (!d && (c = e2 ? 40960 === (e2.mode & 61440) ? 32 : 16384 === (e2.mode & 61440) && ("r" !== Tb(b) || b & 512) ? 31 : Sb(e2, Tb(b)) : 44)) {
              throw new N(c);
            }
            if (b & 512 && !d) {
              c = e2;
              c = "string" == typeof c ? Ob(c, { gb: true }).node : c;
              if (!c.j.R) {
                throw new N(63);
              }
              if (16384 === (c.mode & 61440)) {
                throw new N(31);
              }
              if (32768 !== (c.mode & 61440)) {
                throw new N(28);
              }
              if (d = Sb(c, "w")) {
                throw new N(d);
              }
              c.j.R(c, { size: 0, timestamp: Date.now() });
            }
            b &= -131713;
            e2 = Wb({ node: e2, path: Qb(e2), flags: b, seekable: true, position: 0, m: e2.m, tc: [], error: false });
            e2.m.open && e2.m.open(e2);
            !m.logReadFiles || b & 1 || (gc || (gc = {}), a in gc || (gc[a] = 1));
            return e2;
          }
          function hc(a, b, c) {
            if (null === a.X) {
              throw new N(8);
            }
            if (!a.seekable || !a.m.ba) {
              throw new N(70);
            }
            if (0 != c && 1 != c && 2 != c) {
              throw new N(28);
            }
            a.position = a.m.ba(a, b, c);
            a.tc = [];
          }
          var ic;
          function jc(a, b, c) {
            a = ib("/dev/" + a);
            var d = Fb(!!b, !!c);
            kc || (kc = 64);
            var e2 = kc++ << 8 | 0;
            wb(e2, { open(f) {
              f.seekable = false;
            }, close() {
              c?.buffer?.length && c(10);
            }, read(f, g, k, p) {
              for (var n = 0, t2 = 0; t2 < p; t2++) {
                try {
                  var x = b();
                } catch (y) {
                  throw new N(29);
                }
                if (void 0 === x && 0 === n) {
                  throw new N(6);
                }
                if (null === x || void 0 === x) {
                  break;
                }
                n++;
                g[k + t2] = x;
              }
              n && (f.node.timestamp = Date.now());
              return n;
            }, write(f, g, k, p) {
              for (var n = 0; n < p; n++) {
                try {
                  c(g[k + n]);
                } catch (t2) {
                  throw new N(29);
                }
              }
              p && (f.node.timestamp = Date.now());
              return n;
            } });
            dc(a, d, e2);
          }
          var kc, lc = {}, gc, gb = void 0, mc = (a, b) => Object.defineProperty(b, "name", { value: a }), nc = [], oc = [], P, pc = (a) => {
            if (!a) {
              throw new P("Cannot use deleted val. handle = " + a);
            }
            return oc[a];
          }, qc = (a) => {
            switch (a) {
              case void 0:
                return 2;
              case null:
                return 4;
              case true:
                return 6;
              case false:
                return 8;
              default:
                const b = nc.pop() || oc.length;
                oc[b] = a;
                oc[b + 1] = 1;
                return b;
            }
          }, rc = (a) => {
            var b = Error, c = mc(a, function(d) {
              this.name = a;
              this.message = d;
              d = Error(d).stack;
              void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
            });
            c.prototype = Object.create(b.prototype);
            c.prototype.constructor = c;
            c.prototype.toString = function() {
              return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
            };
            return c;
          }, sc, tc, Q = (a) => {
            for (var b = ""; A[a]; ) {
              b += tc[A[a++]];
            }
            return b;
          }, uc = [], vc = () => {
            for (; uc.length; ) {
              var a = uc.pop();
              a.g.fa = false;
              a["delete"]();
            }
          }, wc, xc = {}, yc = (a, b) => {
            if (void 0 === b) {
              throw new P("ptr should not be undefined");
            }
            for (; a.C; ) {
              b = a.na(b), a = a.C;
            }
            return b;
          }, zc = {}, Cc = (a) => {
            a = Ac(a);
            var b = Q(a);
            Bc(a);
            return b;
          }, Dc = (a, b) => {
            var c = zc[a];
            if (void 0 === c) {
              throw a = `${b} has unknown type ${Cc(a)}`, new P(a);
            }
            return c;
          }, Ec = () => {
          }, Fc = false, Gc = (a, b, c) => {
            if (b === c) {
              return a;
            }
            if (void 0 === c.C) {
              return null;
            }
            a = Gc(a, b, c.C);
            return null === a ? null : c.Mb(a);
          }, Hc = {}, Ic = (a, b) => {
            b = yc(a, b);
            return xc[b];
          }, Jc, Lc = (a, b) => {
            if (!b.u || !b.o) {
              throw new Jc("makeClassHandle requires ptr and ptrType");
            }
            if (!!b.K !== !!b.F) {
              throw new Jc("Both smartPtrType and smartPtr must be specified");
            }
            b.count = { value: 1 };
            return Kc(Object.create(a, { g: { value: b, writable: true } }));
          }, Kc = (a) => {
            if ("undefined" === typeof FinalizationRegistry) {
              return Kc = (b) => b, a;
            }
            Fc = new FinalizationRegistry((b) => {
              b = b.g;
              --b.count.value;
              0 === b.count.value && (b.F ? b.K.P(b.F) : b.u.i.P(b.o));
            });
            Kc = (b) => {
              var c = b.g;
              c.F && Fc.register(b, { g: c }, b);
              return b;
            };
            Ec = (b) => {
              Fc.unregister(b);
            };
            return Kc(a);
          }, Mc = {}, Nc = (a) => {
            for (; a.length; ) {
              var b = a.pop();
              a.pop()(b);
            }
          };
          function Oc(a) {
            return this.fromWireType(D[a >> 2]);
          }
          var Pc = {}, Qc = {}, U = (a, b, c) => {
            function d(k) {
              k = c(k);
              if (k.length !== a.length) {
                throw new Jc("Mismatched type converter count");
              }
              for (var p = 0; p < a.length; ++p) {
                Rc(a[p], k[p]);
              }
            }
            a.forEach(function(k) {
              Qc[k] = b;
            });
            var e2 = Array(b.length), f = [], g = 0;
            b.forEach((k, p) => {
              zc.hasOwnProperty(k) ? e2[p] = zc[k] : (f.push(k), Pc.hasOwnProperty(k) || (Pc[k] = []), Pc[k].push(() => {
                e2[p] = zc[k];
                ++g;
                g === f.length && d(e2);
              }));
            });
            0 === f.length && d(e2);
          };
          function Sc(a, b, c = {}) {
            var d = b.name;
            if (!a) {
              throw new P(`type "${d}" must have a positive integer typeid pointer`);
            }
            if (zc.hasOwnProperty(a)) {
              if (c.Wb) {
                return;
              }
              throw new P(`Cannot register type '${d}' twice`);
            }
            zc[a] = b;
            delete Qc[a];
            Pc.hasOwnProperty(a) && (b = Pc[a], delete Pc[a], b.forEach((e2) => e2()));
          }
          function Rc(a, b, c = {}) {
            if (!("argPackAdvance" in b)) {
              throw new TypeError("registerType registeredInstance requires argPackAdvance");
            }
            return Sc(a, b, c);
          }
          var Tc = (a) => {
            throw new P(a.g.u.i.name + " instance already deleted");
          };
          function Uc() {
          }
          var Vc = (a, b, c) => {
            if (void 0 === a[b].A) {
              var d = a[b];
              a[b] = function(...e2) {
                if (!a[b].A.hasOwnProperty(e2.length)) {
                  throw new P(`Function '${c}' called with an invalid number of arguments (${e2.length}) - expects one of (${a[b].A})!`);
                }
                return a[b].A[e2.length].apply(this, e2);
              };
              a[b].A = [];
              a[b].A[d.ea] = d;
            }
          }, Wc = (a, b, c) => {
            if (m.hasOwnProperty(a)) {
              if (void 0 === c || void 0 !== m[a].A && void 0 !== m[a].A[c]) {
                throw new P(`Cannot register public name '${a}' twice`);
              }
              Vc(m, a, a);
              if (m.hasOwnProperty(c)) {
                throw new P(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
              }
              m[a].A[c] = b;
            } else {
              m[a] = b, void 0 !== c && (m[a].Mc = c);
            }
          }, Xc = (a) => {
            if (void 0 === a) {
              return "_unknown";
            }
            a = a.replace(/[^a-zA-Z0-9_]/g, "$");
            var b = a.charCodeAt(0);
            return 48 <= b && 57 >= b ? `_${a}` : a;
          };
          function Yc(a, b, c, d, e2, f, g, k) {
            this.name = a;
            this.constructor = b;
            this.N = c;
            this.P = d;
            this.C = e2;
            this.Rb = f;
            this.na = g;
            this.Mb = k;
            this.qb = [];
          }
          var Zc = (a, b, c) => {
            for (; b !== c; ) {
              if (!b.na) {
                throw new P(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
              }
              a = b.na(a);
              b = b.C;
            }
            return a;
          };
          function $c(a, b) {
            if (null === b) {
              if (this.Ma) {
                throw new P(`null is not a valid ${this.name}`);
              }
              return 0;
            }
            if (!b.g) {
              throw new P(`Cannot pass "${ad(b)}" as a ${this.name}`);
            }
            if (!b.g.o) {
              throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
            }
            return Zc(b.g.o, b.g.u.i, this.i);
          }
          function bd(a, b) {
            if (null === b) {
              if (this.Ma) {
                throw new P(`null is not a valid ${this.name}`);
              }
              if (this.ta) {
                var c = this.Oa();
                null !== a && a.push(this.P, c);
                return c;
              }
              return 0;
            }
            if (!b || !b.g) {
              throw new P(`Cannot pass "${ad(b)}" as a ${this.name}`);
            }
            if (!b.g.o) {
              throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
            }
            if (!this.sa && b.g.u.sa) {
              throw new P(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
            }
            c = Zc(b.g.o, b.g.u.i, this.i);
            if (this.ta) {
              if (void 0 === b.g.F) {
                throw new P("Passing raw pointer to smart pointer is illegal");
              }
              switch (this.nc) {
                case 0:
                  if (b.g.K === this) {
                    c = b.g.F;
                  } else {
                    throw new P(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
                  }
                  break;
                case 1:
                  c = b.g.F;
                  break;
                case 2:
                  if (b.g.K === this) {
                    c = b.g.F;
                  } else {
                    var d = b.clone();
                    c = this.jc(c, qc(() => d["delete"]()));
                    null !== a && a.push(this.P, c);
                  }
                  break;
                default:
                  throw new P("Unsupporting sharing policy");
              }
            }
            return c;
          }
          function cd(a, b) {
            if (null === b) {
              if (this.Ma) {
                throw new P(`null is not a valid ${this.name}`);
              }
              return 0;
            }
            if (!b.g) {
              throw new P(`Cannot pass "${ad(b)}" as a ${this.name}`);
            }
            if (!b.g.o) {
              throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
            }
            if (b.g.u.sa) {
              throw new P(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
            }
            return Zc(b.g.o, b.g.u.i, this.i);
          }
          function dd(a, b, c, d, e2, f, g, k, p, n, t2) {
            this.name = a;
            this.i = b;
            this.Ma = c;
            this.sa = d;
            this.ta = e2;
            this.ic = f;
            this.nc = g;
            this.rb = k;
            this.Oa = p;
            this.jc = n;
            this.P = t2;
            e2 || void 0 !== b.C ? this.toWireType = bd : (this.toWireType = d ? $c : cd, this.M = null);
          }
          var ed = (a, b, c) => {
            if (!m.hasOwnProperty(a)) {
              throw new Jc("Replacing nonexistent public symbol");
            }
            void 0 !== m[a].A && void 0 !== c ? m[a].A[c] = b : (m[a] = b, m[a].ea = c);
          }, fd = [], gd, hd = (a) => {
            var b = fd[a];
            b || (a >= fd.length && (fd.length = a + 1), fd[a] = b = gd.get(a));
            return b;
          }, jd = (a, b, c = []) => {
            a.includes("j") ? (a = a.replace(/p/g, "i"), b = (0, m["dynCall_" + a])(b, ...c)) : b = hd(b)(...c);
            return b;
          }, kd = (a, b) => (...c) => jd(a, b, c), V = (a, b) => {
            a = Q(a);
            var c = a.includes("j") ? kd(a, b) : hd(b);
            if ("function" != typeof c) {
              throw new P(`unknown function pointer with signature ${a}: ${b}`);
            }
            return c;
          }, ld, md = (a, b) => {
            function c(f) {
              e2[f] || zc[f] || (Qc[f] ? Qc[f].forEach(c) : (d.push(f), e2[f] = true));
            }
            var d = [], e2 = {};
            b.forEach(c);
            throw new ld(`${a}: ` + d.map(Cc).join([", "]));
          };
          function nd(a) {
            for (var b = 1; b < a.length; ++b) {
              if (null !== a[b] && void 0 === a[b].M) {
                return true;
              }
            }
            return false;
          }
          function rd(a, b, c, d, e2) {
            var f = b.length;
            if (2 > f) {
              throw new P("argTypes array size mismatch! Must at least get return value and 'this' types!");
            }
            var g = null !== b[1] && null !== c, k = nd(b), p = "void" !== b[0].name, n = f - 2, t2 = Array(n), x = [], y = [];
            return mc(a, function(...l) {
              if (l.length !== n) {
                throw new P(`function ${a} called with ${l.length} arguments, expected ${n}`);
              }
              y.length = 0;
              x.length = g ? 2 : 1;
              x[0] = e2;
              if (g) {
                var u = b[1].toWireType(y, this);
                x[1] = u;
              }
              for (var r = 0; r < n; ++r) {
                t2[r] = b[r + 2].toWireType(y, l[r]), x.push(t2[r]);
              }
              l = d(...x);
              if (k) {
                Nc(y);
              } else {
                for (r = g ? 1 : 2; r < b.length; r++) {
                  var C = 1 === r ? u : t2[r - 2];
                  null !== b[r].M && b[r].M(C);
                }
              }
              u = p ? b[0].fromWireType(l) : void 0;
              return u;
            });
          }
          var sd = (a, b) => {
            for (var c = [], d = 0; d < a; d++) {
              c.push(D[b + 4 * d >> 2]);
            }
            return c;
          }, td = (a) => {
            a = a.trim();
            const b = a.indexOf("(");
            return -1 !== b ? a.substr(0, b) : a;
          }, ud = (a, b, c) => {
            if (!(a instanceof Object)) {
              throw new P(`${c} with invalid "this": ${a}`);
            }
            if (!(a instanceof b.i.constructor)) {
              throw new P(`${c} incompatible with "this" of type ${a.constructor.name}`);
            }
            if (!a.g.o) {
              throw new P(`cannot call emscripten binding method ${c} on deleted object`);
            }
            return Zc(a.g.o, a.g.u.i, b.i);
          }, vd = (a) => {
            9 < a && 0 === --oc[a + 1] && (oc[a] = void 0, nc.push(a));
          }, wd = { name: "emscripten::val", fromWireType: (a) => {
            var b = pc(a);
            vd(a);
            return b;
          }, toWireType: (a, b) => qc(b), argPackAdvance: 8, readValueFromPointer: Oc, M: null }, xd = (a, b, c) => {
            switch (b) {
              case 1:
                return c ? function(d) {
                  return this.fromWireType(z[d]);
                } : function(d) {
                  return this.fromWireType(A[d]);
                };
              case 2:
                return c ? function(d) {
                  return this.fromWireType(Da[d >> 1]);
                } : function(d) {
                  return this.fromWireType(Ea[d >> 1]);
                };
              case 4:
                return c ? function(d) {
                  return this.fromWireType(B[d >> 2]);
                } : function(d) {
                  return this.fromWireType(D[d >> 2]);
                };
              default:
                throw new TypeError(`invalid integer width (${b}): ${a}`);
            }
          }, ad = (a) => {
            if (null === a) {
              return "null";
            }
            var b = typeof a;
            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
          }, yd = (a, b) => {
            switch (b) {
              case 4:
                return function(c) {
                  return this.fromWireType(Ha[c >> 2]);
                };
              case 8:
                return function(c) {
                  return this.fromWireType(Ia[c >> 3]);
                };
              default:
                throw new TypeError(`invalid float width (${b}): ${a}`);
            }
          }, zd = (a, b, c) => {
            switch (b) {
              case 1:
                return c ? (d) => z[d] : (d) => A[d];
              case 2:
                return c ? (d) => Da[d >> 1] : (d) => Ea[d >> 1];
              case 4:
                return c ? (d) => B[d >> 2] : (d) => D[d >> 2];
              default:
                throw new TypeError(`invalid integer width (${b}): ${a}`);
            }
          }, Ad = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Bd = (a, b) => {
            var c = a >> 1;
            for (var d = c + b / 2; !(c >= d) && Ea[c]; ) {
              ++c;
            }
            c <<= 1;
            if (32 < c - a && Ad) {
              return Ad.decode(A.subarray(a, c));
            }
            c = "";
            for (d = 0; !(d >= b / 2); ++d) {
              var e2 = Da[a + 2 * d >> 1];
              if (0 == e2) {
                break;
              }
              c += String.fromCharCode(e2);
            }
            return c;
          }, Cd = (a, b, c) => {
            c ?? (c = 2147483647);
            if (2 > c) {
              return 0;
            }
            c -= 2;
            var d = b;
            c = c < 2 * a.length ? c / 2 : a.length;
            for (var e2 = 0; e2 < c; ++e2) {
              Da[b >> 1] = a.charCodeAt(e2), b += 2;
            }
            Da[b >> 1] = 0;
            return b - d;
          }, Dd = (a) => 2 * a.length, Ed = (a, b) => {
            for (var c = 0, d = ""; !(c >= b / 4); ) {
              var e2 = B[a + 4 * c >> 2];
              if (0 == e2) {
                break;
              }
              ++c;
              65536 <= e2 ? (e2 -= 65536, d += String.fromCharCode(55296 | e2 >> 10, 56320 | e2 & 1023)) : d += String.fromCharCode(e2);
            }
            return d;
          }, Fd = (a, b, c) => {
            c ?? (c = 2147483647);
            if (4 > c) {
              return 0;
            }
            var d = b;
            c = d + c - 4;
            for (var e2 = 0; e2 < a.length; ++e2) {
              var f = a.charCodeAt(e2);
              if (55296 <= f && 57343 >= f) {
                var g = a.charCodeAt(++e2);
                f = 65536 + ((f & 1023) << 10) | g & 1023;
              }
              B[b >> 2] = f;
              b += 4;
              if (b + 4 > c) {
                break;
              }
            }
            B[b >> 2] = 0;
            return b - d;
          }, Gd = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              55296 <= d && 57343 >= d && ++c;
              b += 4;
            }
            return b;
          }, Hd = (a, b, c) => {
            var d = [];
            a = a.toWireType(d, c);
            d.length && (D[b >> 2] = qc(d));
            return a;
          }, Id = {}, Jd = (a) => {
            var b = Id[a];
            return void 0 === b ? Q(a) : b;
          }, Kd = [], Ld = (a) => {
            var b = Kd.length;
            Kd.push(a);
            return b;
          }, Md = (a, b) => {
            for (var c = Array(a), d = 0; d < a; ++d) {
              c[d] = Dc(D[b + 4 * d >> 2], "parameter " + d);
            }
            return c;
          }, Nd = Reflect.construct, Od = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), Pd = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Qd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Rd = [], Sd = {}, Ud = () => {
            if (!Td) {
              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: oa || "./this.program" }, b;
              for (b in Sd) {
                void 0 === Sd[b] ? delete a[b] : a[b] = Sd[b];
              }
              var c = [];
              for (b in a) {
                c.push(`${b}=${a[b]}`);
              }
              Td = c;
            }
            return Td;
          }, Td, Vd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Wd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Xd = (a, b, c, d) => {
            function e2(l, u, r) {
              for (l = "number" == typeof l ? l.toString() : l || ""; l.length < u; ) {
                l = r[0] + l;
              }
              return l;
            }
            function f(l, u) {
              return e2(l, u, "0");
            }
            function g(l, u) {
              function r(G) {
                return 0 > G ? -1 : 0 < G ? 1 : 0;
              }
              var C;
              0 === (C = r(l.getFullYear() - u.getFullYear())) && 0 === (C = r(l.getMonth() - u.getMonth())) && (C = r(l.getDate() - u.getDate()));
              return C;
            }
            function k(l) {
              switch (l.getDay()) {
                case 0:
                  return new Date(l.getFullYear() - 1, 11, 29);
                case 1:
                  return l;
                case 2:
                  return new Date(l.getFullYear(), 0, 3);
                case 3:
                  return new Date(l.getFullYear(), 0, 2);
                case 4:
                  return new Date(l.getFullYear(), 0, 1);
                case 5:
                  return new Date(l.getFullYear() - 1, 11, 31);
                case 6:
                  return new Date(l.getFullYear() - 1, 11, 30);
              }
            }
            function p(l) {
              var u = l.ca;
              for (l = new Date(new Date(l.da + 1900, 0, 1).getTime()); 0 < u; ) {
                var r = l.getMonth(), C = (Od(l.getFullYear()) ? Vd : Wd)[r];
                if (u > C - l.getDate()) {
                  u -= C - l.getDate() + 1, l.setDate(1), 11 > r ? l.setMonth(r + 1) : (l.setMonth(0), l.setFullYear(l.getFullYear() + 1));
                } else {
                  l.setDate(l.getDate() + u);
                  break;
                }
              }
              r = new Date(l.getFullYear() + 1, 0, 4);
              u = k(new Date(l.getFullYear(), 0, 4));
              r = k(r);
              return 0 >= g(u, l) ? 0 >= g(r, l) ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1;
            }
            var n = D[d + 40 >> 2];
            d = { qc: B[d >> 2], pc: B[d + 4 >> 2], Ea: B[d + 8 >> 2], Ra: B[d + 12 >> 2], Fa: B[d + 16 >> 2], da: B[d + 20 >> 2], S: B[d + 24 >> 2], ca: B[d + 28 >> 2], Oc: B[d + 32 >> 2], oc: B[d + 36 >> 2], rc: n ? n ? pb(A, n) : "" : "" };
            c = c ? pb(A, c) : "";
            n = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
            for (var t2 in n) {
              c = c.replace(new RegExp(t2, "g"), n[t2]);
            }
            var x = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), y = "January February March April May June July August September October November December".split(" ");
            n = { "%a": (l) => x[l.S].substring(0, 3), "%A": (l) => x[l.S], "%b": (l) => y[l.Fa].substring(0, 3), "%B": (l) => y[l.Fa], "%C": (l) => f((l.da + 1900) / 100 | 0, 2), "%d": (l) => f(l.Ra, 2), "%e": (l) => e2(l.Ra, 2, " "), "%g": (l) => p(l).toString().substring(2), "%G": p, "%H": (l) => f(l.Ea, 2), "%I": (l) => {
              l = l.Ea;
              0 == l ? l = 12 : 12 < l && (l -= 12);
              return f(l, 2);
            }, "%j": (l) => {
              for (var u = 0, r = 0; r <= l.Fa - 1; u += (Od(l.da + 1900) ? Vd : Wd)[r++]) {
              }
              return f(l.Ra + u, 3);
            }, "%m": (l) => f(l.Fa + 1, 2), "%M": (l) => f(l.pc, 2), "%n": () => "\n", "%p": (l) => 0 <= l.Ea && 12 > l.Ea ? "AM" : "PM", "%S": (l) => f(l.qc, 2), "%t": () => "	", "%u": (l) => l.S || 7, "%U": (l) => f(Math.floor((l.ca + 7 - l.S) / 7), 2), "%V": (l) => {
              var u = Math.floor((l.ca + 7 - (l.S + 6) % 7) / 7);
              2 >= (l.S + 371 - l.ca - 2) % 7 && u++;
              if (u) {
                53 == u && (r = (l.S + 371 - l.ca) % 7, 4 == r || 3 == r && Od(l.da) || (u = 1));
              } else {
                u = 52;
                var r = (l.S + 7 - l.ca - 1) % 7;
                (4 == r || 5 == r && Od(l.da % 400 - 1)) && u++;
              }
              return f(u, 2);
            }, "%w": (l) => l.S, "%W": (l) => f(Math.floor((l.ca + 7 - (l.S + 6) % 7) / 7), 2), "%y": (l) => (l.da + 1900).toString().substring(2), "%Y": (l) => l.da + 1900, "%z": (l) => {
              l = l.oc;
              var u = 0 <= l;
              l = Math.abs(l) / 60;
              return (u ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4);
            }, "%Z": (l) => l.rc, "%%": () => "%" };
            c = c.replace(/%%/g, "\0\0");
            for (t2 in n) {
              c.includes(t2) && (c = c.replace(new RegExp(t2, "g"), n[t2](d)));
            }
            c = c.replace(/\0\0/g, "%");
            t2 = tb(c, false);
            if (t2.length > b) {
              return 0;
            }
            z.set(t2, a);
            return t2.length - 1;
          };
          [44].forEach((a) => {
            Db[a] = new N(a);
            Db[a].stack = "<generic error, no stack>";
          });
          Kb = Array(4096);
          Yb(O, "/");
          cc("/tmp");
          cc("/home");
          cc("/home/web_user");
          (function() {
            cc("/dev");
            wb(259, { read: () => 0, write: (d, e2, f, g) => g });
            dc("/dev/null", 259);
            vb(1280, yb);
            vb(1536, zb);
            dc("/dev/tty", 1280);
            dc("/dev/tty1", 1536);
            var a = new Uint8Array(1024), b = 0, c = () => {
              0 === b && (b = mb(a).byteLength);
              return a[--b];
            };
            jc("random", c);
            jc("urandom", c);
            cc("/dev/shm");
            cc("/dev/shm/tmp");
          })();
          (function() {
            cc("/proc");
            var a = cc("/proc/self");
            cc("/proc/self/fd");
            Yb({ V() {
              var b = Cb(a, "fd", 16895, 73);
              b.j = { ka(c, d) {
                var e2 = Vb(+d);
                c = { parent: null, V: { mb: "fake" }, j: { ma: () => e2.path } };
                return c.parent = c;
              } };
              return b;
            } }, "/proc/self/fd");
          })();
          P = m.BindingError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "BindingError";
            }
          };
          oc.push(0, 1, void 0, 1, null, 1, true, 1, false, 1);
          m.count_emval_handles = () => oc.length / 2 - 5 - nc.length;
          sc = m.PureVirtualError = rc("PureVirtualError");
          for (var Yd = Array(256), Zd = 0; 256 > Zd; ++Zd) {
            Yd[Zd] = String.fromCharCode(Zd);
          }
          tc = Yd;
          m.getInheritedInstanceCount = () => Object.keys(xc).length;
          m.getLiveInheritedInstances = () => {
            var a = [], b;
            for (b in xc) {
              xc.hasOwnProperty(b) && a.push(xc[b]);
            }
            return a;
          };
          m.flushPendingDeletes = vc;
          m.setDelayFunction = (a) => {
            wc = a;
            uc.length && wc && wc(vc);
          };
          Jc = m.InternalError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "InternalError";
            }
          };
          Object.assign(Uc.prototype, { isAliasOf: function(a) {
            if (!(this instanceof Uc && a instanceof Uc)) {
              return false;
            }
            var b = this.g.u.i, c = this.g.o;
            a.g = a.g;
            var d = a.g.u.i;
            for (a = a.g.o; b.C; ) {
              c = b.na(c), b = b.C;
            }
            for (; d.C; ) {
              a = d.na(a), d = d.C;
            }
            return b === d && c === a;
          }, clone: function() {
            this.g.o || Tc(this);
            if (this.g.ia) {
              return this.g.count.value += 1, this;
            }
            var a = Kc, b = Object, c = b.create, d = Object.getPrototypeOf(this), e2 = this.g;
            a = a(c.call(b, d, { g: { value: { count: e2.count, fa: e2.fa, ia: e2.ia, o: e2.o, u: e2.u, F: e2.F, K: e2.K } } }));
            a.g.count.value += 1;
            a.g.fa = false;
            return a;
          }, ["delete"]() {
            this.g.o || Tc(this);
            if (this.g.fa && !this.g.ia) {
              throw new P("Object already scheduled for deletion");
            }
            Ec(this);
            var a = this.g;
            --a.count.value;
            0 === a.count.value && (a.F ? a.K.P(a.F) : a.u.i.P(a.o));
            this.g.ia || (this.g.F = void 0, this.g.o = void 0);
          }, isDeleted: function() {
            return !this.g.o;
          }, deleteLater: function() {
            this.g.o || Tc(this);
            if (this.g.fa && !this.g.ia) {
              throw new P("Object already scheduled for deletion");
            }
            uc.push(this);
            1 === uc.length && wc && wc(vc);
            this.g.fa = true;
            return this;
          } });
          Object.assign(dd.prototype, { Sb(a) {
            this.rb && (a = this.rb(a));
            return a;
          }, bb(a) {
            this.P?.(a);
          }, argPackAdvance: 8, readValueFromPointer: Oc, fromWireType: function(a) {
            function b() {
              return this.ta ? Lc(this.i.N, { u: this.ic, o: c, K: this, F: a }) : Lc(this.i.N, { u: this, o: a });
            }
            var c = this.Sb(a);
            if (!c) {
              return this.bb(a), null;
            }
            var d = Ic(this.i, c);
            if (void 0 !== d) {
              if (0 === d.g.count.value) {
                return d.g.o = c, d.g.F = a, d.clone();
              }
              d = d.clone();
              this.bb(a);
              return d;
            }
            d = this.i.Rb(c);
            d = Hc[d];
            if (!d) {
              return b.call(this);
            }
            d = this.sa ? d.Ib : d.pointerType;
            var e2 = Gc(c, this.i, d.i);
            return null === e2 ? b.call(this) : this.ta ? Lc(d.i.N, { u: d, o: e2, K: this, F: a }) : Lc(d.i.N, { u: d, o: e2 });
          } });
          ld = m.UnboundTypeError = rc("UnboundTypeError");
          var be = { __syscall_fcntl64: function(a, b, c) {
            gb = c;
            try {
              var d = Vb(a);
              switch (b) {
                case 0:
                  var e2 = fb();
                  if (0 > e2) {
                    break;
                  }
                  for (; Ib[e2]; ) {
                    e2++;
                  }
                  return Xb(d, e2).X;
                case 1:
                case 2:
                  return 0;
                case 3:
                  return d.flags;
                case 4:
                  return e2 = fb(), d.flags |= e2, 0;
                case 12:
                  return e2 = fb(), Da[e2 + 0 >> 1] = 2, 0;
                case 13:
                case 14:
                  return 0;
              }
              return -28;
            } catch (f) {
              if ("undefined" == typeof lc || "ErrnoError" !== f.name) {
                throw f;
              }
              return -f.aa;
            }
          }, __syscall_ioctl: function(a, b, c) {
            gb = c;
            try {
              var d = Vb(a);
              switch (b) {
                case 21509:
                  return d.s ? 0 : -59;
                case 21505:
                  if (!d.s) {
                    return -59;
                  }
                  if (d.s.W.Yb) {
                    a = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    var e2 = fb();
                    B[e2 >> 2] = 25856;
                    B[e2 + 4 >> 2] = 5;
                    B[e2 + 8 >> 2] = 191;
                    B[e2 + 12 >> 2] = 35387;
                    for (var f = 0; 32 > f; f++) {
                      z[e2 + f + 17] = a[f] || 0;
                    }
                  }
                  return 0;
                case 21510:
                case 21511:
                case 21512:
                  return d.s ? 0 : -59;
                case 21506:
                case 21507:
                case 21508:
                  if (!d.s) {
                    return -59;
                  }
                  if (d.s.W.Zb) {
                    for (e2 = fb(), a = [], f = 0; 32 > f; f++) {
                      a.push(z[e2 + f + 17]);
                    }
                  }
                  return 0;
                case 21519:
                  if (!d.s) {
                    return -59;
                  }
                  e2 = fb();
                  return B[e2 >> 2] = 0;
                case 21520:
                  return d.s ? -28 : -59;
                case 21531:
                  e2 = fb();
                  if (!d.m.Xb) {
                    throw new N(59);
                  }
                  return d.m.Xb(d, b, e2);
                case 21523:
                  if (!d.s) {
                    return -59;
                  }
                  d.s.W.$b && (f = [24, 80], e2 = fb(), Da[e2 >> 1] = f[0], Da[e2 + 2 >> 1] = f[1]);
                  return 0;
                case 21524:
                  return d.s ? 0 : -59;
                case 21515:
                  return d.s ? 0 : -59;
                default:
                  return -28;
              }
            } catch (g) {
              if ("undefined" == typeof lc || "ErrnoError" !== g.name) {
                throw g;
              }
              return -g.aa;
            }
          }, __syscall_openat: function(a, b, c, d) {
            gb = d;
            try {
              b = b ? pb(A, b) : "";
              var e2 = b;
              if ("/" === e2.charAt(0)) {
                b = e2;
              } else {
                var f = -100 === a ? "/" : Vb(a).path;
                if (0 == e2.length) {
                  throw new N(44);
                }
                b = ib(f + "/" + e2);
              }
              var g = d ? fb() : 0;
              return fc(b, c, g).X;
            } catch (k) {
              if ("undefined" == typeof lc || "ErrnoError" !== k.name) {
                throw k;
              }
              return -k.aa;
            }
          }, _abort_js: () => {
            Ra("");
          }, _embind_create_inheriting_constructor: (a, b, c) => {
            a = Q(a);
            b = Dc(b, "wrapper");
            c = pc(c);
            var d = b.i, e2 = d.N, f = d.C.N, g = d.C.constructor;
            a = mc(a, function(...k) {
              d.C.qb.forEach(function(p) {
                if (this[p] === f[p]) {
                  throw new sc(`Pure virtual function ${p} must be implemented in JavaScript`);
                }
              }.bind(this));
              Object.defineProperty(this, "__parent", { value: e2 });
              this.__construct(...k);
            });
            e2.__construct = function(...k) {
              if (this === e2) {
                throw new P("Pass correct 'this' to __construct");
              }
              k = g.implement(this, ...k);
              Ec(k);
              var p = k.g;
              k.notifyOnDestruction();
              p.ia = true;
              Object.defineProperties(this, { g: { value: p } });
              Kc(this);
              k = p.o;
              k = yc(d, k);
              if (xc.hasOwnProperty(k)) {
                throw new P(`Tried to register registered instance: ${k}`);
              }
              xc[k] = this;
            };
            e2.__destruct = function() {
              if (this === e2) {
                throw new P("Pass correct 'this' to __destruct");
              }
              Ec(this);
              var k = this.g.o;
              k = yc(d, k);
              if (xc.hasOwnProperty(k)) {
                delete xc[k];
              } else {
                throw new P(`Tried to unregister unregistered instance: ${k}`);
              }
            };
            a.prototype = Object.create(e2);
            Object.assign(a.prototype, c);
            return qc(a);
          }, _embind_finalize_value_object: (a) => {
            var b = Mc[a];
            delete Mc[a];
            var c = b.Oa, d = b.P, e2 = b.fb, f = e2.map((g) => g.Vb).concat(e2.map((g) => g.lc));
            U([a], f, (g) => {
              var k = {};
              e2.forEach((p, n) => {
                var t2 = g[n], x = p.Tb, y = p.Ub, l = g[n + e2.length], u = p.kc, r = p.mc;
                k[p.Pb] = { read: (C) => t2.fromWireType(x(y, C)), write: (C, G) => {
                  var w = [];
                  u(r, C, l.toWireType(w, G));
                  Nc(w);
                } };
              });
              return [{ name: b.name, fromWireType: (p) => {
                var n = {}, t2;
                for (t2 in k) {
                  n[t2] = k[t2].read(p);
                }
                d(p);
                return n;
              }, toWireType: (p, n) => {
                for (var t2 in k) {
                  if (!(t2 in n)) {
                    throw new TypeError(`Missing field: "${t2}"`);
                  }
                }
                var x = c();
                for (t2 in k) {
                  k[t2].write(x, n[t2]);
                }
                null !== p && p.push(d, x);
                return x;
              }, argPackAdvance: 8, readValueFromPointer: Oc, M: d }];
            });
          }, _embind_register_bigint: () => {
          }, _embind_register_bool: (a, b, c, d) => {
            b = Q(b);
            Rc(a, { name: b, fromWireType: function(e2) {
              return !!e2;
            }, toWireType: function(e2, f) {
              return f ? c : d;
            }, argPackAdvance: 8, readValueFromPointer: function(e2) {
              return this.fromWireType(A[e2]);
            }, M: null });
          }, _embind_register_class: (a, b, c, d, e2, f, g, k, p, n, t2, x, y) => {
            t2 = Q(t2);
            f = V(e2, f);
            k && (k = V(g, k));
            n && (n = V(p, n));
            y = V(x, y);
            var l = Xc(t2);
            Wc(l, function() {
              md(`Cannot construct ${t2} due to unbound types`, [d]);
            });
            U([a, b, c], d ? [d] : [], (u) => {
              u = u[0];
              if (d) {
                var r = u.i;
                var C = r.N;
              } else {
                C = Uc.prototype;
              }
              u = mc(t2, function(...T) {
                if (Object.getPrototypeOf(this) !== G) {
                  throw new P("Use 'new' to construct " + t2);
                }
                if (void 0 === w.$) {
                  throw new P(t2 + " has no accessible constructor");
                }
                var W = w.$[T.length];
                if (void 0 === W) {
                  throw new P(`Tried to invoke ctor of ${t2} with invalid number of parameters (${T.length}) - expected (${Object.keys(w.$).toString()}) parameters instead!`);
                }
                return W.apply(this, T);
              });
              var G = Object.create(C, { constructor: { value: u } });
              u.prototype = G;
              var w = new Yc(t2, u, G, y, r, f, k, n);
              if (w.C) {
                var M;
                (M = w.C).oa ?? (M.oa = []);
                w.C.oa.push(w);
              }
              r = new dd(t2, w, true, false, false);
              M = new dd(t2 + "*", w, false, false, false);
              C = new dd(t2 + " const*", w, false, true, false);
              Hc[a] = { pointerType: M, Ib: C };
              ed(l, u);
              return [r, M, C];
            });
          }, _embind_register_class_class_function: (a, b, c, d, e2, f, g) => {
            var k = sd(c, d);
            b = Q(b);
            b = td(b);
            f = V(e2, f);
            U([], [a], (p) => {
              function n() {
                md(`Cannot call ${t2} due to unbound types`, k);
              }
              p = p[0];
              var t2 = `${p.name}.${b}`;
              b.startsWith("@@") && (b = Symbol[b.substring(2)]);
              var x = p.i.constructor;
              void 0 === x[b] ? (n.ea = c - 1, x[b] = n) : (Vc(x, b, t2), x[b].A[c - 1] = n);
              U([], k, (y) => {
                y = rd(t2, [y[0], null].concat(y.slice(1)), null, f, g);
                void 0 === x[b].A ? (y.ea = c - 1, x[b] = y) : x[b].A[c - 1] = y;
                if (p.i.oa) {
                  for (const l of p.i.oa) {
                    l.constructor.hasOwnProperty(b) || (l.constructor[b] = y);
                  }
                }
                return [];
              });
              return [];
            });
          }, _embind_register_class_class_property: (a, b, c, d, e2, f, g, k) => {
            b = Q(b);
            f = V(e2, f);
            U([], [a], (p) => {
              p = p[0];
              var n = `${p.name}.${b}`, t2 = { get() {
                md(`Cannot access ${n} due to unbound types`, [c]);
              }, enumerable: true, configurable: true };
              t2.set = k ? () => {
                md(`Cannot access ${n} due to unbound types`, [c]);
              } : () => {
                throw new P(`${n} is a read-only property`);
              };
              Object.defineProperty(p.i.constructor, b, t2);
              U([], [c], (x) => {
                x = x[0];
                var y = { get() {
                  return x.fromWireType(f(d));
                }, enumerable: true };
                k && (k = V(g, k), y.set = (l) => {
                  var u = [];
                  k(d, x.toWireType(u, l));
                  Nc(u);
                });
                Object.defineProperty(p.i.constructor, b, y);
                return [];
              });
              return [];
            });
          }, _embind_register_class_constructor: (a, b, c, d, e2, f) => {
            var g = sd(b, c);
            e2 = V(d, e2);
            U([], [a], (k) => {
              k = k[0];
              var p = `constructor ${k.name}`;
              void 0 === k.i.$ && (k.i.$ = []);
              if (void 0 !== k.i.$[b - 1]) {
                throw new P(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
              }
              k.i.$[b - 1] = () => {
                md(`Cannot construct ${k.name} due to unbound types`, g);
              };
              U([], g, (n) => {
                n.splice(1, 0, null);
                k.i.$[b - 1] = rd(p, n, null, e2, f);
                return [];
              });
              return [];
            });
          }, _embind_register_class_function: (a, b, c, d, e2, f, g, k) => {
            var p = sd(c, d);
            b = Q(b);
            b = td(b);
            f = V(e2, f);
            U([], [a], (n) => {
              function t2() {
                md(`Cannot call ${x} due to unbound types`, p);
              }
              n = n[0];
              var x = `${n.name}.${b}`;
              b.startsWith("@@") && (b = Symbol[b.substring(2)]);
              k && n.i.qb.push(b);
              var y = n.i.N, l = y[b];
              void 0 === l || void 0 === l.A && l.className !== n.name && l.ea === c - 2 ? (t2.ea = c - 2, t2.className = n.name, y[b] = t2) : (Vc(y, b, x), y[b].A[c - 2] = t2);
              U([], p, (u) => {
                u = rd(x, u, n, f, g);
                void 0 === y[b].A ? (u.ea = c - 2, y[b] = u) : y[b].A[c - 2] = u;
                return [];
              });
              return [];
            });
          }, _embind_register_class_property: (a, b, c, d, e2, f, g, k, p, n) => {
            b = Q(b);
            e2 = V(d, e2);
            U([], [a], (t2) => {
              t2 = t2[0];
              var x = `${t2.name}.${b}`, y = { get() {
                md(`Cannot access ${x} due to unbound types`, [c, g]);
              }, enumerable: true, configurable: true };
              y.set = p ? () => md(`Cannot access ${x} due to unbound types`, [c, g]) : () => {
                throw new P(x + " is a read-only property");
              };
              Object.defineProperty(t2.i.N, b, y);
              U([], p ? [c, g] : [c], (l) => {
                var u = l[0], r = { get() {
                  var G = ud(this, t2, x + " getter");
                  return u.fromWireType(e2(f, G));
                }, enumerable: true };
                if (p) {
                  p = V(k, p);
                  var C = l[1];
                  r.set = function(G) {
                    var w = ud(this, t2, x + " setter"), M = [];
                    p(n, w, C.toWireType(M, G));
                    Nc(M);
                  };
                }
                Object.defineProperty(t2.i.N, b, r);
                return [];
              });
              return [];
            });
          }, _embind_register_emval: (a) => Rc(a, wd), _embind_register_enum: (a, b, c, d) => {
            function e2() {
            }
            b = Q(b);
            e2.values = {};
            Rc(a, { name: b, constructor: e2, fromWireType: function(f) {
              return this.constructor.values[f];
            }, toWireType: (f, g) => g.value, argPackAdvance: 8, readValueFromPointer: xd(b, c, d), M: null });
            Wc(b, e2);
          }, _embind_register_enum_value: (a, b, c) => {
            var d = Dc(a, "enum");
            b = Q(b);
            a = d.constructor;
            d = Object.create(d.constructor.prototype, { value: { value: c }, constructor: { value: mc(`${d.name}_${b}`, function() {
            }) } });
            a.values[c] = d;
            a[b] = d;
          }, _embind_register_float: (a, b, c) => {
            b = Q(b);
            Rc(a, { name: b, fromWireType: (d) => d, toWireType: (d, e2) => e2, argPackAdvance: 8, readValueFromPointer: yd(b, c), M: null });
          }, _embind_register_function: (a, b, c, d, e2, f) => {
            var g = sd(b, c);
            a = Q(a);
            a = td(a);
            e2 = V(d, e2);
            Wc(a, function() {
              md(`Cannot call ${a} due to unbound types`, g);
            }, b - 1);
            U([], g, (k) => {
              ed(a, rd(a, [k[0], null].concat(k.slice(1)), null, e2, f), b - 1);
              return [];
            });
          }, _embind_register_integer: (a, b, c, d, e2) => {
            b = Q(b);
            -1 === e2 && (e2 = 4294967295);
            e2 = (k) => k;
            if (0 === d) {
              var f = 32 - 8 * c;
              e2 = (k) => k << f >>> f;
            }
            var g = b.includes("unsigned") ? function(k, p) {
              return p >>> 0;
            } : function(k, p) {
              return p;
            };
            Rc(a, { name: b, fromWireType: e2, toWireType: g, argPackAdvance: 8, readValueFromPointer: zd(b, c, 0 !== d), M: null });
          }, _embind_register_memory_view: (a, b, c) => {
            function d(f) {
              return new e2(z.buffer, D[f + 4 >> 2], D[f >> 2]);
            }
            var e2 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
            c = Q(c);
            Rc(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Wb: true });
          }, _embind_register_std_string: (a, b) => {
            b = Q(b);
            var c = "std::string" === b;
            Rc(a, { name: b, fromWireType: function(d) {
              var e2 = D[d >> 2], f = d + 4;
              if (c) {
                for (var g = f, k = 0; k <= e2; ++k) {
                  var p = f + k;
                  if (k == e2 || 0 == A[p]) {
                    g = g ? pb(A, g, p - g) : "";
                    if (void 0 === n) {
                      var n = g;
                    } else {
                      n += String.fromCharCode(0), n += g;
                    }
                    g = p + 1;
                  }
                }
              } else {
                n = Array(e2);
                for (k = 0; k < e2; ++k) {
                  n[k] = String.fromCharCode(A[f + k]);
                }
                n = n.join("");
              }
              Bc(d);
              return n;
            }, toWireType: function(d, e2) {
              e2 instanceof ArrayBuffer && (e2 = new Uint8Array(e2));
              var f = "string" == typeof e2;
              if (!(f || e2 instanceof Uint8Array || e2 instanceof Uint8ClampedArray || e2 instanceof Int8Array)) {
                throw new P("Cannot pass non-string to std::string");
              }
              var g = c && f ? rb(e2) : e2.length;
              var k = $d(4 + g + 1), p = k + 4;
              D[k >> 2] = g;
              if (c && f) {
                sb(e2, A, p, g + 1);
              } else {
                if (f) {
                  for (f = 0; f < g; ++f) {
                    var n = e2.charCodeAt(f);
                    if (255 < n) {
                      throw Bc(p), new P("String has UTF-16 code units that do not fit in 8 bits");
                    }
                    A[p + f] = n;
                  }
                } else {
                  for (f = 0; f < g; ++f) {
                    A[p + f] = e2[f];
                  }
                }
              }
              null !== d && d.push(Bc, k);
              return k;
            }, argPackAdvance: 8, readValueFromPointer: Oc, M(d) {
              Bc(d);
            } });
          }, _embind_register_std_wstring: (a, b, c) => {
            c = Q(c);
            if (2 === b) {
              var d = Bd;
              var e2 = Cd;
              var f = Dd;
              var g = (k) => Ea[k >> 1];
            } else {
              4 === b && (d = Ed, e2 = Fd, f = Gd, g = (k) => D[k >> 2]);
            }
            Rc(a, { name: c, fromWireType: (k) => {
              for (var p = D[k >> 2], n, t2 = k + 4, x = 0; x <= p; ++x) {
                var y = k + 4 + x * b;
                if (x == p || 0 == g(y)) {
                  t2 = d(t2, y - t2), void 0 === n ? n = t2 : (n += String.fromCharCode(0), n += t2), t2 = y + b;
                }
              }
              Bc(k);
              return n;
            }, toWireType: (k, p) => {
              if ("string" != typeof p) {
                throw new P(`Cannot pass non-string to C++ string type ${c}`);
              }
              var n = f(p), t2 = $d(4 + n + b);
              D[t2 >> 2] = n / b;
              e2(p, t2 + 4, n + b);
              null !== k && k.push(Bc, t2);
              return t2;
            }, argPackAdvance: 8, readValueFromPointer: Oc, M(k) {
              Bc(k);
            } });
          }, _embind_register_value_object: (a, b, c, d, e2, f) => {
            Mc[a] = { name: Q(b), Oa: V(c, d), P: V(e2, f), fb: [] };
          }, _embind_register_value_object_field: (a, b, c, d, e2, f, g, k, p, n) => {
            Mc[a].fb.push({ Pb: Q(b), Vb: c, Tb: V(d, e2), Ub: f, lc: g, kc: V(k, p), mc: n });
          }, _embind_register_void: (a, b) => {
            b = Q(b);
            Rc(a, { Jc: true, name: b, argPackAdvance: 0, fromWireType: () => {
            }, toWireType: () => {
            } });
          }, _emscripten_get_now_is_monotonic: () => 1, _emscripten_memcpy_js: (a, b, c) => A.copyWithin(a, b, b + c), _emscripten_throw_longjmp: () => {
            throw Infinity;
          }, _emval_as: (a, b, c) => {
            a = pc(a);
            b = Dc(b, "emval::as");
            return Hd(b, c, a);
          }, _emval_call_method: (a, b, c, d, e2) => {
            a = Kd[a];
            b = pc(b);
            c = Jd(c);
            return a(b, b[c], d, e2);
          }, _emval_decref: vd, _emval_get_method_caller: (a, b, c) => {
            var d = Md(a, b), e2 = d.shift();
            a--;
            var f = Array(a);
            b = `methodCaller<(${d.map((g) => g.name).join(", ")}) => ${e2.name}>`;
            return Ld(mc(b, (g, k, p, n) => {
              for (var t2 = 0, x = 0; x < a; ++x) {
                f[x] = d[x].readValueFromPointer(n + t2), t2 += d[x].argPackAdvance;
              }
              g = 1 === c ? Nd(k, f) : k.apply(g, f);
              return Hd(e2, p, g);
            }));
          }, _emval_get_module_property: (a) => {
            a = Jd(a);
            return qc(m[a]);
          }, _emval_get_property: (a, b) => {
            a = pc(a);
            b = pc(b);
            return qc(a[b]);
          }, _emval_incref: (a) => {
            9 < a && (oc[a + 1] += 1);
          }, _emval_new_array: () => qc([]), _emval_new_cstring: (a) => qc(Jd(a)), _emval_new_object: () => qc({}), _emval_run_destructors: (a) => {
            var b = pc(a);
            Nc(b);
            vd(a);
          }, _emval_set_property: (a, b, c) => {
            a = pc(a);
            b = pc(b);
            c = pc(c);
            a[b] = c;
          }, _emval_take_value: (a, b) => {
            a = Dc(a, "_emval_take_value");
            a = a.readValueFromPointer(b);
            return qc(a);
          }, _gmtime_js: function(a, b, c) {
            a = new Date(1e3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
            B[c >> 2] = a.getUTCSeconds();
            B[c + 4 >> 2] = a.getUTCMinutes();
            B[c + 8 >> 2] = a.getUTCHours();
            B[c + 12 >> 2] = a.getUTCDate();
            B[c + 16 >> 2] = a.getUTCMonth();
            B[c + 20 >> 2] = a.getUTCFullYear() - 1900;
            B[c + 24 >> 2] = a.getUTCDay();
            B[c + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
          }, _localtime_js: function(a, b, c) {
            a = new Date(1e3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
            B[c >> 2] = a.getSeconds();
            B[c + 4 >> 2] = a.getMinutes();
            B[c + 8 >> 2] = a.getHours();
            B[c + 12 >> 2] = a.getDate();
            B[c + 16 >> 2] = a.getMonth();
            B[c + 20 >> 2] = a.getFullYear() - 1900;
            B[c + 24 >> 2] = a.getDay();
            B[c + 28 >> 2] = (Od(a.getFullYear()) ? Pd : Qd)[a.getMonth()] + a.getDate() - 1 | 0;
            B[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
            b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            B[c + 32 >> 2] = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
          }, _tzset_js: (a, b, c, d) => {
            var e2 = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e2, 0, 1), g = new Date(e2, 6, 1);
            e2 = f.getTimezoneOffset();
            var k = g.getTimezoneOffset();
            D[a >> 2] = 60 * Math.max(e2, k);
            B[b >> 2] = Number(e2 != k);
            a = (p) => p.toLocaleTimeString(void 0, { hour12: false, timeZoneName: "short" }).split(" ")[1];
            f = a(f);
            g = a(g);
            k < e2 ? (sb(f, A, c, 17), sb(g, A, d, 17)) : (sb(f, A, d, 17), sb(g, A, c, 17));
          }, emscripten_asm_const_int: (a, b, c) => {
            Rd.length = 0;
            for (var d; d = A[b++]; ) {
              var e2 = 105 != d;
              e2 &= 112 != d;
              c += e2 && c % 8 ? 4 : 0;
              Rd.push(112 == d ? D[c >> 2] : 105 == d ? B[c >> 2] : Ia[c >> 3]);
              c += e2 ? 8 : 4;
            }
            return db[a](...Rd);
          }, emscripten_date_now: () => Date.now(), emscripten_get_now: () => performance.now(), emscripten_resize_heap: (a) => {
            var b = A.length;
            a >>>= 0;
            if (2147483648 < a) {
              return false;
            }
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              var e2 = Math;
              d = Math.max(a, d);
              a: {
                e2 = (e2.min.call(e2, 2147483648, d + (65536 - d % 65536) % 65536) - Ba.buffer.byteLength + 65535) / 65536;
                try {
                  Ba.grow(e2);
                  Ja();
                  var f = 1;
                  break a;
                } catch (g) {
                }
                f = void 0;
              }
              if (f) {
                return true;
              }
            }
            return false;
          }, environ_get: (a, b) => {
            var c = 0;
            Ud().forEach((d, e2) => {
              var f = b + c;
              e2 = D[a + 4 * e2 >> 2] = f;
              for (f = 0; f < d.length; ++f) {
                z[e2++] = d.charCodeAt(f);
              }
              z[e2] = 0;
              c += d.length + 1;
            });
            return 0;
          }, environ_sizes_get: (a, b) => {
            var c = Ud();
            D[a >> 2] = c.length;
            var d = 0;
            c.forEach((e2) => d += e2.length + 1);
            D[b >> 2] = d;
            return 0;
          }, fd_close: function(a) {
            try {
              var b = Vb(a);
              if (null === b.X) {
                throw new N(8);
              }
              b.La && (b.La = null);
              try {
                b.m.close && b.m.close(b);
              } catch (c) {
                throw c;
              } finally {
                Ib[b.X] = null;
              }
              b.X = null;
              return 0;
            } catch (c) {
              if ("undefined" == typeof lc || "ErrnoError" !== c.name) {
                throw c;
              }
              return c.aa;
            }
          }, fd_read: function(a, b, c, d) {
            try {
              a: {
                var e2 = Vb(a);
                a = b;
                for (var f, g = b = 0; g < c; g++) {
                  var k = D[a >> 2], p = D[a + 4 >> 2];
                  a += 8;
                  var n = e2, t2 = f, x = z;
                  if (0 > p || 0 > t2) {
                    throw new N(28);
                  }
                  if (null === n.X) {
                    throw new N(8);
                  }
                  if (1 === (n.flags & 2097155)) {
                    throw new N(8);
                  }
                  if (16384 === (n.node.mode & 61440)) {
                    throw new N(31);
                  }
                  if (!n.m.read) {
                    throw new N(28);
                  }
                  var y = "undefined" != typeof t2;
                  if (!y) {
                    t2 = n.position;
                  } else if (!n.seekable) {
                    throw new N(70);
                  }
                  var l = n.m.read(n, x, k, p, t2);
                  y || (n.position += l);
                  var u = l;
                  if (0 > u) {
                    var r = -1;
                    break a;
                  }
                  b += u;
                  if (u < p) {
                    break;
                  }
                  "undefined" != typeof f && (f += u);
                }
                r = b;
              }
              D[d >> 2] = r;
              return 0;
            } catch (C) {
              if ("undefined" == typeof lc || "ErrnoError" !== C.name) {
                throw C;
              }
              return C.aa;
            }
          }, fd_seek: function(a, b, c, d, e2) {
            b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
            try {
              if (isNaN(b)) {
                return 61;
              }
              var f = Vb(a);
              hc(f, b, d);
              $a = [f.position >>> 0, (Za = f.position, 1 <= +Math.abs(Za) ? 0 < Za ? +Math.floor(Za / 4294967296) >>> 0 : ~~+Math.ceil((Za - +(~~Za >>> 0)) / 4294967296) >>> 0 : 0)];
              B[e2 >> 2] = $a[0];
              B[e2 + 4 >> 2] = $a[1];
              f.La && 0 === b && 0 === d && (f.La = null);
              return 0;
            } catch (g) {
              if ("undefined" == typeof lc || "ErrnoError" !== g.name) {
                throw g;
              }
              return g.aa;
            }
          }, fd_write: function(a, b, c, d) {
            try {
              a: {
                var e2 = Vb(a);
                a = b;
                for (var f, g = b = 0; g < c; g++) {
                  var k = D[a >> 2], p = D[a + 4 >> 2];
                  a += 8;
                  var n = e2, t2 = k, x = p, y = f, l = z;
                  if (0 > x || 0 > y) {
                    throw new N(28);
                  }
                  if (null === n.X) {
                    throw new N(8);
                  }
                  if (0 === (n.flags & 2097155)) {
                    throw new N(8);
                  }
                  if (16384 === (n.node.mode & 61440)) {
                    throw new N(31);
                  }
                  if (!n.m.write) {
                    throw new N(28);
                  }
                  n.seekable && n.flags & 1024 && hc(n, 0, 2);
                  var u = "undefined" != typeof y;
                  if (!u) {
                    y = n.position;
                  } else if (!n.seekable) {
                    throw new N(70);
                  }
                  var r = n.m.write(n, l, t2, x, y, void 0);
                  u || (n.position += r);
                  var C = r;
                  if (0 > C) {
                    var G = -1;
                    break a;
                  }
                  b += C;
                  "undefined" != typeof f && (f += C);
                }
                G = b;
              }
              D[d >> 2] = G;
              return 0;
            } catch (w) {
              if ("undefined" == typeof lc || "ErrnoError" !== w.name) {
                throw w;
              }
              return w.aa;
            }
          }, invoke_vii: ae, isWindowsBrowser: function() {
            return -1 < navigator.platform.indexOf("Win");
          }, strftime: Xd, strftime_l: (a, b, c, d) => Xd(a, b, c, d) }, Y = function() {
            function a(c) {
              Y = c.exports;
              Ba = Y.memory;
              Ja();
              gd = Y.__indirect_function_table;
              La.unshift(Y.__wasm_call_ctors);
              Oa--;
              m.monitorRunDependencies?.(Oa);
              0 == Oa && (null !== Pa && (clearInterval(Pa), Pa = null), Qa && (c = Qa, Qa = null, c()));
              return Y;
            }
            var b = { env: be, wasi_snapshot_preview1: be };
            Oa++;
            m.monitorRunDependencies?.(Oa);
            if (m.instantiateWasm) {
              try {
                return m.instantiateWasm(b, a);
              } catch (c) {
                za(`Module.instantiateWasm callback failed with error: ${c}`), ca(c);
              }
            }
            Ta || (Ta = Sa("canvas_advanced.wasm") ? "canvas_advanced.wasm" : m.locateFile ? m.locateFile("canvas_advanced.wasm", sa) : sa + "canvas_advanced.wasm");
            Xa(b, function(c) {
              a(c.instance);
            }).catch(ca);
            return {};
          }(), Bc = (a) => (Bc = Y.free)(a), $d = (a) => ($d = Y.malloc)(a), Ac = (a) => (Ac = Y.__getTypeName)(a), ab = m._ma_device__on_notification_unlocked = (a) => (ab = m._ma_device__on_notification_unlocked = Y.ma_device__on_notification_unlocked)(a);
          m._ma_malloc_emscripten = (a, b) => (m._ma_malloc_emscripten = Y.ma_malloc_emscripten)(a, b);
          m._ma_free_emscripten = (a, b) => (m._ma_free_emscripten = Y.ma_free_emscripten)(a, b);
          var bb = m._ma_device_process_pcm_frames_capture__webaudio = (a, b, c) => (bb = m._ma_device_process_pcm_frames_capture__webaudio = Y.ma_device_process_pcm_frames_capture__webaudio)(a, b, c), cb = m._ma_device_process_pcm_frames_playback__webaudio = (a, b, c) => (cb = m._ma_device_process_pcm_frames_playback__webaudio = Y.ma_device_process_pcm_frames_playback__webaudio)(a, b, c), ce = (a, b) => (ce = Y.setThrew)(a, b), de = (a) => (de = Y._emscripten_stack_restore)(a), ee = () => (ee = Y.emscripten_stack_get_current)();
          m.dynCall_iiji = (a, b, c, d, e2) => (m.dynCall_iiji = Y.dynCall_iiji)(a, b, c, d, e2);
          m.dynCall_jiji = (a, b, c, d, e2) => (m.dynCall_jiji = Y.dynCall_jiji)(a, b, c, d, e2);
          m.dynCall_iiiji = (a, b, c, d, e2, f) => (m.dynCall_iiiji = Y.dynCall_iiiji)(a, b, c, d, e2, f);
          m.dynCall_iij = (a, b, c, d) => (m.dynCall_iij = Y.dynCall_iij)(a, b, c, d);
          m.dynCall_jii = (a, b, c) => (m.dynCall_jii = Y.dynCall_jii)(a, b, c);
          m.dynCall_viijii = (a, b, c, d, e2, f, g) => (m.dynCall_viijii = Y.dynCall_viijii)(a, b, c, d, e2, f, g);
          m.dynCall_iiiiij = (a, b, c, d, e2, f, g) => (m.dynCall_iiiiij = Y.dynCall_iiiiij)(a, b, c, d, e2, f, g);
          m.dynCall_iiiiijj = (a, b, c, d, e2, f, g, k, p) => (m.dynCall_iiiiijj = Y.dynCall_iiiiijj)(a, b, c, d, e2, f, g, k, p);
          m.dynCall_iiiiiijj = (a, b, c, d, e2, f, g, k, p, n) => (m.dynCall_iiiiiijj = Y.dynCall_iiiiiijj)(a, b, c, d, e2, f, g, k, p, n);
          function ae(a, b, c) {
            var d = ee();
            try {
              hd(a)(b, c);
            } catch (e2) {
              de(d);
              if (e2 !== e2 + 0) {
                throw e2;
              }
              ce(1, 0);
            }
          }
          var fe;
          Qa = function ge() {
            fe || he();
            fe || (Qa = ge);
          };
          function he() {
            function a() {
              if (!fe && (fe = true, m.calledRun = true, !Ca)) {
                m.noFSInit || ic || (ic = true, m.stdin = m.stdin, m.stdout = m.stdout, m.stderr = m.stderr, m.stdin ? jc("stdin", m.stdin) : ec("/dev/tty", "/dev/stdin"), m.stdout ? jc("stdout", null, m.stdout) : ec("/dev/tty", "/dev/stdout"), m.stderr ? jc("stderr", null, m.stderr) : ec("/dev/tty1", "/dev/stderr"), fc("/dev/stdin", 0), fc("/dev/stdout", 1), fc("/dev/stderr", 1));
                Lb = false;
                eb(La);
                ba(m);
                if (m.onRuntimeInitialized) {
                  m.onRuntimeInitialized();
                }
                if (m.postRun) {
                  for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length; ) {
                    var b = m.postRun.shift();
                    Ma.unshift(b);
                  }
                }
                eb(Ma);
              }
            }
            if (!(0 < Oa)) {
              if (m.preRun) {
                for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length; ) {
                  Na();
                }
              }
              eb(Ka);
              0 < Oa || (m.setStatus ? (m.setStatus("Running..."), setTimeout(function() {
                setTimeout(function() {
                  m.setStatus("");
                }, 1);
                a();
              }, 1)) : a());
            }
          }
          if (m.preInit) {
            for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length; ) {
              m.preInit.pop()();
            }
          }
          he();
          moduleRtn = da;
          return moduleRtn;
        };
      })();
      canvas_advanced_default = Rive;
    }
  });

  // src/components/rive.js
  async function getRiveRuntime() {
    if (riveRuntime)
      return riveRuntime;
    const RiveCanvas = (await Promise.resolve().then(() => (init_canvas_advanced(), canvas_advanced_exports))).default;
    riveRuntime = await RiveCanvas({
      locateFile: (file) => {
        const name = WASM_FILE_MAP[file] || file;
        return `${RIVE_CDN}/${name}`;
      }
    });
    return riveRuntime;
  }
  function normalizeProgress(p) {
    const progress = Math.max(0, Math.min(1, p));
    return progress >= 0.9995 ? 1 : progress;
  }
  function easeInOutCubic(t2) {
    return t2 <= 0 ? 0 : t2 >= 1 ? 1 : t2 * t2 * (3 - 2 * t2);
  }
  function getSafeDuration(animationInstance, durationOverride) {
    const duration = animationInstance.duration;
    if (Number.isFinite(durationOverride) && durationOverride > 0)
      return durationOverride;
    return Number.isFinite(duration) && duration > 0 ? duration : 3.5;
  }
  function getDurationForIndex(durationOverride, index) {
    if (durationOverride == null)
      return null;
    if (Array.isArray(durationOverride)) {
      const v = durationOverride[index];
      return Number.isFinite(v) && v > 0 ? v : null;
    }
    return Number.isFinite(durationOverride) && durationOverride > 0 ? durationOverride : null;
  }
  function setTimePercentage(animationInstance, artboard, progress, durationOverride) {
    const safeDuration = getSafeDuration(animationInstance, durationOverride);
    const workStart = Number.isFinite(animationInstance.workStart) ? animationInstance.workStart : 0;
    const rangeStart = workStart;
    const rangeEnd = workStart + safeDuration;
    const rangeDuration = Math.max(1e-3, rangeEnd - rangeStart);
    const endTime = progress >= 1 ? rangeEnd : rangeStart + progress * rangeDuration;
    const targetTime = Math.max(rangeStart, Math.min(rangeEnd, endTime));
    const currentTime = animationInstance.time;
    const delta = targetTime - currentTime;
    animationInstance.advance(delta);
    animationInstance.apply(1);
    artboard.advance(0);
  }
  function setTimePercentageSequence(animationInstances, artboard, progress, durationOverride) {
    const n = animationInstances.length;
    if (n === 0)
      return;
    if (n === 1) {
      const override = getDurationForIndex(durationOverride, 0);
      setTimePercentage(animationInstances[0], artboard, progress, override);
      return;
    }
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const durations = animationInstances.map(
      (inst, i) => getSafeDuration(inst, getDurationForIndex(durationOverride, i))
    );
    const totalDuration = durations.reduce((a, b) => a + b, 0);
    if (totalDuration <= 0)
      return;
    const segmentStarts = [];
    let cum = 0;
    for (let i = 0; i < n; i++) {
      segmentStarts.push(cum / totalDuration);
      cum += durations[i];
    }
    segmentStarts.push(1);
    let segmentIndex = 0;
    for (let i = 0; i < n; i++) {
      if (clampedProgress < segmentStarts[i + 1]) {
        segmentIndex = i;
        break;
      }
      segmentIndex = n - 1;
    }
    const segStart = segmentStarts[segmentIndex];
    const segEnd = segmentStarts[segmentIndex + 1];
    const segSpan = Math.max(1e-3, segEnd - segStart);
    let localProgress = progress >= 1 ? 1 : Math.max(0, Math.min(1, (clampedProgress - segStart) / segSpan));
    if (localProgress >= 0.9995)
      localProgress = 1;
    const easedLocal = easeInOutCubic(localProgress);
    const intoSegment = clampedProgress - segStart;
    const inBlendZone = segmentIndex > 0 && intoSegment < SEGMENT_BLEND_ZONE && segSpan > 0;
    const blend = inBlendZone ? Math.min(1, intoSegment / SEGMENT_BLEND_ZONE) : 1;
    const prevMix = inBlendZone ? 1 - blend : 0;
    const currMix = inBlendZone ? blend : 1;
    for (let i = 0; i < n; i++) {
      const inst = animationInstances[i];
      const override = getDurationForIndex(durationOverride, i);
      const safeDuration = getSafeDuration(inst, override);
      const workStart = Number.isFinite(inst.workStart) ? inst.workStart : 0;
      const rangeEnd = workStart + safeDuration;
      const rangeDuration = Math.max(1e-3, rangeEnd - workStart);
      const targetTime = i < segmentIndex ? rangeEnd : i > segmentIndex ? workStart : workStart + easedLocal * rangeDuration;
      const currentTime = inst.time;
      inst.advance(targetTime - currentTime);
      if (inBlendZone && (i === segmentIndex - 1 || i === segmentIndex)) {
        inst.apply(i === segmentIndex - 1 ? prevMix : currMix);
      } else {
        inst.apply(i === segmentIndex ? 1 : 0);
      }
    }
    artboard.advance(0);
  }
  function drawFrame(rive, renderer, canvas, artboard, fit = null) {
    const w = Math.max(1, canvas.width);
    const h = Math.max(1, canvas.height);
    renderer.clear();
    renderer.save();
    const fitMode = fit ?? rive.Fit.contain;
    const alignment = rive.Alignment.center;
    const frame = { minX: 0, minY: 0, maxX: w, maxY: h };
    renderer.align(fitMode, alignment, frame, artboard.bounds);
    artboard.draw(renderer);
    renderer.restore();
  }
  function advanceByTime(animationInstance, artboard, deltaSec) {
    animationInstance.advance(deltaSec);
    animationInstance.apply(1);
    artboard.advance(deltaSec);
  }
  async function initRiveScrub(el) {
    const src = el.getAttribute("data-rive-src");
    const animationName = el.getAttribute("data-rive-animation") || null;
    const artboardName = el.getAttribute("data-rive-artboard") || null;
    const useCoverFit = !el.hasAttribute("data-rive-contain");
    const durationAttr = el.getAttribute("data-rive-duration");
    const durationOverride = durationAttr != null && durationAttr !== "" ? durationAttr.includes(",") ? durationAttr.split(",").map((s) => parseFloat(s.trim(), 10)).filter((n) => Number.isFinite(n) && n > 0) : parseFloat(durationAttr, 10) : null;
    const isAutoplay = el.hasAttribute("data-rive-autoplay");
    const autoplayAnimAttr = el.getAttribute("data-rive-autoplay-animation");
    const scrollAnimAttr = el.getAttribute("data-rive-scroll-animation");
    const scrubAnimAttr = el.getAttribute("data-rive-scrub-animation");
    const isHybrid = isAutoplay && autoplayAnimAttr != null && autoplayAnimAttr.trim() !== "" && (scrollAnimAttr != null && scrollAnimAttr.trim() !== "" || scrubAnimAttr != null && scrubAnimAttr.trim() !== "");
    const scrubSelector = el.getAttribute("data-rive-scrub");
    const scrubMarkers = el.hasAttribute("data-rive-scrub-markers");
    const scrubStartRaw = el.getAttribute("data-rive-scrub-start");
    const scrubEndRaw = el.getAttribute("data-rive-scrub-end");
    const scrubStart = scrubStartRaw != null && scrubStartRaw.trim() !== "" ? scrubStartRaw.trim() : "top top";
    const scrubEnd = scrubEndRaw != null && scrubEndRaw.trim() !== "" ? scrubEndRaw.trim() : "bottom bottom";
    const scrubEl = scrubSelector ? document.querySelector(scrubSelector) : document.querySelector("[data-scrub-element]") || el.closest("[data-scrub-element]") || el.closest("section") || el;
    let canvas = el.tagName === "CANVAS" ? el : el.querySelector("canvas");
    if (!canvas && el.tagName !== "CANVAS") {
      canvas = document.createElement("canvas");
      el.appendChild(canvas);
    }
    if (!src || !canvas) {
      logger.warn("[Rive] Missing data-rive-src or canvas", el);
      return () => {
      };
    }
    if (!canvas.style.width)
      canvas.style.width = "100%";
    if (!canvas.style.height)
      canvas.style.height = "100%";
    const DEFAULT_CANVAS_WIDTH = 300;
    const DEFAULT_CANVAS_HEIGHT = 150;
    let rive = null;
    let renderer = null;
    let file = null;
    let artboard = null;
    let animationInstances = [];
    let rafId = null;
    let scrollProgress = 0;
    let scrubScrollProgress = 0;
    let scrollTriggerInstance = null;
    let lastTime = 0;
    let autoplayElapsed = 0;
    let autoplayDone = false;
    let scrollLockHandler = null;
    let keyLockHandler = null;
    let scrollTriggered = false;
    let scrollAnimElapsed = 0;
    let scrollAnimDuration = 0;
    let intersectionObserver = null;
    const SCROLL_TRIGGER_THRESHOLD = 0.05;
    const SCRUB_DRAW_INTERVAL_MS = 33;
    const SCRUB_PROGRESS_EPSILON = 2e-3;
    let lastScrubDrawTime = 0;
    let lastScrubProgress = -1;
    let lastHybridScrollProgress = -1;
    const onResize = () => {
      if (!canvas || !renderer)
        return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cappedDpr = typeof window.matchMedia !== "undefined" && window.matchMedia("(max-width: 1024px)").matches ? Math.min(dpr, 2) : dpr;
      const w = Math.max(1, Math.round(rect.width * cappedDpr) || DEFAULT_CANVAS_WIDTH);
      const h = Math.max(1, Math.round(rect.height * cappedDpr) || DEFAULT_CANVAS_HEIGHT);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    const ensureCanvasSize = () => {
      if (canvas && (canvas.width < 1 || canvas.height < 1))
        onResize();
    };
    let autoplayIndices = [];
    let scrollIndices = [];
    let scrubIndices = [];
    try {
      if (!isAutoplay && !isHybrid) {
        await ensureGSAPLoaded();
        if (!window.ScrollTrigger)
          throw new Error("ScrollTrigger not available");
      }
      if (isHybrid) {
        await ensureGSAPLoaded();
        if (!window.ScrollTrigger)
          throw new Error("ScrollTrigger not available");
      }
      rive = await getRiveRuntime();
      const res = await fetch(src);
      if (!res.ok)
        throw new Error(`Failed to fetch Rive file: ${src}`);
      const buffer = await res.arrayBuffer();
      file = await rive.load(new Uint8Array(buffer));
      artboard = artboardName ? file.artboardByName(artboardName) : file.defaultArtboard();
      const names = animationName ? animationName.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const animNames = names.length > 0 ? names : null;
      if (animNames && animNames.length > 0) {
        for (const name of animNames) {
          const anim = artboard.animationByName(name);
          if (!anim)
            throw new Error(`[Rive] Animation not found: ${name}`);
          animationInstances.push(new rive.LinearAnimationInstance(anim, artboard));
        }
      } else {
        if (artboard.animationCount() === 0)
          throw new Error("[Rive] No animations on artboard");
        animationInstances.push(
          new rive.LinearAnimationInstance(artboard.animationByIndex(0), artboard)
        );
      }
      if (isHybrid && animNames && animNames.length > 0) {
        const toNames = (attr) => (attr || "").split(",").map((s) => s.trim()).filter(Boolean);
        const autoplayNames = toNames(autoplayAnimAttr);
        const scrollNames = toNames(scrollAnimAttr);
        const scrubNames = toNames(scrubAnimAttr);
        autoplayIndices = autoplayNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
        scrollIndices = scrollNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
        scrubIndices = scrubNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
        const hasScrollOrScrub = scrollIndices.length > 0 || scrubIndices.length > 0;
        if (autoplayIndices.length === 0 || !hasScrollOrScrub) {
          logger.warn(
            "[Rive] Hybrid mode: need autoplay-animation and at least one of scroll-animation or scrub-animation",
            el
          );
        }
      }
      renderer = rive.makeRenderer(canvas);
      onResize();
      window.addEventListener("resize", onResize);
      if (isHybrid) {
        const autoplayInstances = autoplayIndices.map((i) => animationInstances[i]);
        const totalAutoplayDuration = autoplayInstances.reduce(
          (sum, inst, idx) => sum + getSafeDuration(inst, getDurationForIndex(durationOverride, autoplayIndices[idx])),
          0
        );
        scrollTriggerInstance = window.ScrollTrigger.create({
          trigger: scrubEl,
          start: scrubStart,
          end: scrubEnd,
          markers: scrubMarkers,
          onUpdate: (self2) => {
            scrollProgress = normalizeProgress(self2.progress);
            scrubScrollProgress = scrollProgress;
          }
        });
        scrollLockHandler = (e2) => {
          if (!autoplayDone)
            e2.preventDefault();
        };
        keyLockHandler = (e2) => {
          if (autoplayDone)
            return;
          if (["Space", "ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e2.key)) {
            e2.preventDefault();
          }
        };
        window.addEventListener("wheel", scrollLockHandler, { passive: false });
        window.addEventListener("touchmove", scrollLockHandler, { passive: false });
        window.addEventListener("keydown", keyLockHandler);
        const tick = (time) => {
          ensureCanvasSize();
          if (canvas.width < 1 || canvas.height < 1) {
            rafId = rive.requestAnimationFrame(tick);
            return;
          }
          const deltaSec = lastTime ? (time - lastTime) / 1e3 : 0;
          lastTime = time;
          if (!autoplayDone) {
            autoplayElapsed += deltaSec;
            const totalDur = Math.max(1e-3, totalAutoplayDuration);
            const progress = Math.min(1, autoplayElapsed / totalDur);
            const autoplayDurationOverride = autoplayIndices.map(
              (i) => getDurationForIndex(durationOverride, i)
            );
            setTimePercentageSequence(
              autoplayInstances,
              artboard,
              progress,
              autoplayDurationOverride.length ? autoplayDurationOverride : null
            );
            for (const i of scrollIndices) {
              const inst = animationInstances[i];
              const workStart = Number.isFinite(inst.workStart) ? inst.workStart : 0;
              inst.advance(workStart - inst.time);
              inst.apply(0);
            }
            for (const i of scrubIndices) {
              const inst = animationInstances[i];
              const workStart = Number.isFinite(inst.workStart) ? inst.workStart : 0;
              inst.advance(workStart - inst.time);
              inst.apply(0);
            }
            artboard.advance(0);
            if (progress >= 1) {
              autoplayDone = true;
              if (scrollLockHandler) {
                window.removeEventListener("wheel", scrollLockHandler);
                window.removeEventListener("touchmove", scrollLockHandler);
                scrollLockHandler = null;
              }
              if (keyLockHandler) {
                window.removeEventListener("keydown", keyLockHandler);
                keyLockHandler = null;
              }
            }
          } else {
            const scrubProgress = scrubScrollProgress;
            if (!scrollTriggered && scrubProgress >= SCROLL_TRIGGER_THRESHOLD) {
              scrollTriggered = true;
              if (scrollIndices.length > 0) {
                scrollAnimDuration = scrollIndices.reduce(
                  (sum, i) => sum + getSafeDuration(animationInstances[i], getDurationForIndex(durationOverride, i)),
                  0
                );
              }
            }
            if (scrollTriggered && scrollIndices.length > 0 && scrollAnimDuration > 0) {
              scrollAnimElapsed += deltaSec;
              scrollProgress = Math.min(1, scrollAnimElapsed / scrollAnimDuration);
            } else {
              scrollProgress = 0;
            }
            const now = typeof performance !== "undefined" ? performance.now() : Date.now();
            const scrubChanged = Math.abs(scrubProgress - lastScrubProgress) > SCRUB_PROGRESS_EPSILON;
            const scrollChanged = scrollIndices.length > 0 && Math.abs(scrollProgress - lastHybridScrollProgress) > SCRUB_PROGRESS_EPSILON;
            const throttleElapsed = now - lastScrubDrawTime >= SCRUB_DRAW_INTERVAL_MS;
            const shouldDraw = throttleElapsed || scrubChanged || scrollChanged || lastScrubProgress < 0;
            if (shouldDraw) {
              lastScrubDrawTime = now;
              lastScrubProgress = scrubProgress;
              lastHybridScrollProgress = scrollProgress;
              for (const i of autoplayIndices) {
                const inst = animationInstances[i];
                const override = getDurationForIndex(durationOverride, i);
                setTimePercentage(inst, artboard, 1, override);
              }
              if (scrollIndices.length === 1) {
                const i = scrollIndices[0];
                setTimePercentage(
                  animationInstances[i],
                  artboard,
                  scrollProgress,
                  getDurationForIndex(durationOverride, i)
                );
              } else if (scrollIndices.length > 1) {
                const scrollInstances = scrollIndices.map((i) => animationInstances[i]);
                const scrollDurationOverride = scrollIndices.map(
                  (i) => getDurationForIndex(durationOverride, i)
                );
                setTimePercentageSequence(
                  scrollInstances,
                  artboard,
                  scrollProgress,
                  scrollDurationOverride.length ? scrollDurationOverride : null
                );
              }
              if (scrubIndices.length === 1) {
                const i = scrubIndices[0];
                setTimePercentage(
                  animationInstances[i],
                  artboard,
                  scrubProgress,
                  getDurationForIndex(durationOverride, i)
                );
              } else if (scrubIndices.length > 1) {
                const scrubInstances = scrubIndices.map((i) => animationInstances[i]);
                const scrubDurationOverride = scrubIndices.map(
                  (i) => getDurationForIndex(durationOverride, i)
                );
                setTimePercentageSequence(
                  scrubInstances,
                  artboard,
                  scrubProgress,
                  scrubDurationOverride.length ? scrubDurationOverride : null
                );
              }
              drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : void 0);
            }
          }
          if (!autoplayDone) {
            drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : void 0);
          }
          rafId = rive.requestAnimationFrame(tick);
        };
        rafId = rive.requestAnimationFrame(tick);
      } else if (isAutoplay) {
        const totalAutoplayDuration = (() => {
          const durs = animationInstances.map(
            (inst, i) => getSafeDuration(inst, getDurationForIndex(durationOverride, i))
          );
          return durs.reduce((a, b) => a + b, 0);
        })();
        let isInView = false;
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.target !== el)
                continue;
              isInView = entry.isIntersecting;
              break;
            }
          },
          { root: null, rootMargin: "0px", threshold: 0.01 }
        );
        intersectionObserver.observe(el);
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        isInView = rect.top < vh && rect.bottom > 0;
        const tick = (time) => {
          ensureCanvasSize();
          if (canvas.width < 1 || canvas.height < 1) {
            rafId = rive.requestAnimationFrame(tick);
            return;
          }
          if (!isInView) {
            lastTime = 0;
            rafId = rive.requestAnimationFrame(tick);
            return;
          }
          const deltaSec = lastTime ? (time - lastTime) / 1e3 : 0;
          lastTime = time;
          if (animationInstances.length === 1) {
            advanceByTime(animationInstances[0], artboard, deltaSec);
          } else {
            autoplayElapsed += deltaSec;
            const totalDur = Math.max(1e-3, totalAutoplayDuration);
            const progress = totalDur > 0 ? Math.min(1, autoplayElapsed / totalDur) : 0;
            setTimePercentageSequence(animationInstances, artboard, progress, durationOverride);
            if (progress >= 1) {
              drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : void 0);
              return;
            }
          }
          drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : void 0);
          rafId = rive.requestAnimationFrame(tick);
        };
        rafId = rive.requestAnimationFrame(tick);
      } else {
        scrollTriggerInstance = window.ScrollTrigger.create({
          trigger: scrubEl,
          start: scrubStart,
          end: scrubEnd,
          markers: scrubMarkers,
          onUpdate: (self2) => {
            scrollProgress = normalizeProgress(self2.progress);
          }
        });
        const scrubTick = () => {
          ensureCanvasSize();
          if (canvas.width < 1 || canvas.height < 1) {
            rafId = rive.requestAnimationFrame(scrubTick);
            return;
          }
          const now = typeof performance !== "undefined" ? performance.now() : Date.now();
          const progressChanged = Math.abs(scrollProgress - lastScrubProgress) > SCRUB_PROGRESS_EPSILON;
          const throttleElapsed = now - lastScrubDrawTime >= SCRUB_DRAW_INTERVAL_MS;
          if (progressChanged || throttleElapsed || lastScrubProgress < 0) {
            lastScrubDrawTime = now;
            lastScrubProgress = scrollProgress;
            if (animationInstances.length === 1) {
              const singleOverride = getDurationForIndex(durationOverride, 0);
              setTimePercentage(animationInstances[0], artboard, scrollProgress, singleOverride);
            } else {
              setTimePercentageSequence(
                animationInstances,
                artboard,
                scrollProgress,
                durationOverride
              );
            }
            drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : void 0);
          }
          rafId = rive.requestAnimationFrame(scrubTick);
        };
        rafId = rive.requestAnimationFrame(scrubTick);
      }
      const cleanup = () => {
        if (intersectionObserver) {
          intersectionObserver.disconnect();
          intersectionObserver = null;
        }
        if (scrollTriggerInstance)
          scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
        lastTime = 0;
        if (rafId != null)
          rive.cancelAnimationFrame(rafId);
        rafId = null;
        if (isHybrid) {
          if (scrollLockHandler) {
            window.removeEventListener("wheel", scrollLockHandler);
            window.removeEventListener("touchmove", scrollLockHandler);
            scrollLockHandler = null;
          }
          if (keyLockHandler) {
            window.removeEventListener("keydown", keyLockHandler);
            keyLockHandler = null;
          }
        }
        window.removeEventListener("resize", onResize);
        try {
          animationInstances.forEach((inst) => inst.delete());
          animationInstances = [];
          if (artboard)
            artboard.delete();
          if (file)
            file.unref?.();
          if (renderer)
            renderer.delete?.();
        } catch (e2) {
          handleError(e2, "Rive cleanup");
        }
      };
      logger.log(
        isHybrid ? "[Rive] Hybrid (autoplay + scroll) initialized" : isAutoplay ? "[Rive] Autoplay initialized" : "[Rive] Scroll-scrub initialized",
        src
      );
      return cleanup;
    } catch (err) {
      handleError(err, "Rive init");
      return () => {
      };
    }
  }
  function initRive(options = {}) {
    const { onInteraction = false } = options;
    const containers = document.querySelectorAll("[data-rive-src]");
    if (!containers.length)
      return () => {
      };
    const cleanups = [];
    const run = () => {
      containers.forEach((el) => {
        initRiveScrub(el).then((cleanup2) => {
          if (typeof cleanup2 === "function")
            cleanups.push(cleanup2);
        });
      });
    };
    const cleanup = () => {
      cleanups.forEach((c) => c());
      cleanups.length = 0;
    };
    if (onInteraction) {
      const start = () => {
        ["scroll", "touchstart", "click", "keydown"].forEach((ev) => {
          window.removeEventListener(ev, start);
        });
        run();
      };
      window.addEventListener("scroll", start, { passive: true });
      window.addEventListener("touchstart", start, { passive: true });
      window.addEventListener("click", start);
      window.addEventListener("keydown", start);
    } else {
      run();
    }
    return cleanup;
  }
  var RIVE_VERSION, RIVE_CDN, WASM_FILE_MAP, riveRuntime, SEGMENT_BLEND_ZONE;
  var init_rive = __esm({
    "src/components/rive.js"() {
      init_helpers();
      init_logger();
      init_gsap();
      RIVE_VERSION = "2.35.0";
      RIVE_CDN = `https://cdn.jsdelivr.net/npm/@rive-app/canvas-advanced@${RIVE_VERSION}`;
      WASM_FILE_MAP = {
        "canvas_advanced.wasm": "rive.wasm"
      };
      riveRuntime = null;
      SEGMENT_BLEND_ZONE = 0.03;
    }
  });

  // src/components/tabs/tabsComp1.js
  function initTabs(options = {}) {
    if (typeof document === "undefined") {
      logger.warn("[Tabs] document is undefined (SSR) - skipping init.");
      return () => {
      };
    }
    const roots = options.rootElements || Array.from(document.querySelectorAll(options.rootSelector || SELECTORS.root));
    if (!roots.length) {
      logger.info("[Tabs] No tabs found on the page - nothing to initialize.");
      return () => {
      };
    }
    let initializedCount = 0;
    roots.forEach((root) => {
      if (instances.has(root))
        return;
      const cleanup = createTabsInstance(root);
      if (cleanup) {
        instances.set(root, cleanup);
        initializedCount += 1;
      }
    });
    if (initializedCount > 0) {
      logger.log(`\u{1F9ED} Tabs ready (${initializedCount} instance${initializedCount > 1 ? "s" : ""})`);
    }
    return () => cleanupTabs();
  }
  function cleanupTabs() {
    instances.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Tabs Cleanup");
      }
    });
    instances.clear();
  }
  function createTabsInstance(root) {
    const buttons = Array.from(root.querySelectorAll(SELECTORS.button));
    const panels = Array.from(root.querySelectorAll(SELECTORS.panel));
    if (!buttons.length || buttons.length !== panels.length)
      return null;
    instanceCounter += 1;
    const instanceId = instanceCounter;
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoplayEnabled = getBooleanAttr(root, "data-tabs-autoplay", true);
    const autoplayMs = getNumberAttr(root, "data-tabs-autoplay-delay", DEFAULT_AUTOPLAY_MS);
    const pauseOnHover = getBooleanAttr(root, "data-tabs-autoplay-pause-on-hover", false);
    const pauseOnFocus = getBooleanAttr(root, "data-tabs-autoplay-pause-on-focus", false);
    const pauseOnHidden = getBooleanAttr(root, "data-tabs-autoplay-pause-on-hidden", true);
    const scrollActive = getBooleanAttr(root, "data-tabs-scroll-active", true);
    const animateContent = getBooleanAttr(root, "data-tabs-animate", true);
    const loopTabs = getBooleanAttr(root, "data-tabs-loop", true);
    const activateOn = root.getAttribute("data-tabs-activate-on") || "click";
    const activeClass = root.getAttribute("data-tabs-active-class") || "active";
    const stopAutoplayOnFirstInteraction = getBooleanAttr(
      root,
      "data-stop-autoplay-on-first-interaction",
      false
    );
    const presetIndex = findPresetIndex(buttons, activeClass);
    let activeIndex = presetIndex > -1 ? presetIndex : 0;
    let hasInitialized = false;
    const observerSupported = typeof IntersectionObserver !== "undefined";
    let isInView = false;
    let isPaused = false;
    let isAutoplayStopped = false;
    let hasUserInteracted = false;
    let timerId = null;
    let remainingMs = autoplayMs;
    let cycleStartTs = 0;
    const cleanupHandlers = [];
    const now = () => window.performance ? performance.now() : Date.now();
    const hideClass = root.getAttribute("data-tabs-hide-class") || "hide";
    const panelsParent = panels[0]?.parentElement;
    if (panelsParent) {
      panelsParent.classList.add("tabs-panels-stack");
      cleanupHandlers.push(() => panelsParent.classList.remove("tabs-panels-stack"));
    }
    const setPanelVisibility = (panel, isVisible) => {
      if (!panel)
        return;
      panel.setAttribute("aria-hidden", isVisible ? "false" : "true");
      if (panelsParent?.classList.contains("tabs-panels-stack")) {
        panel.hidden = false;
        panel.style.display = "";
        panel.style.visibility = isVisible ? "visible" : "hidden";
        panel.style.pointerEvents = isVisible ? "" : "none";
      } else {
        panel.hidden = !isVisible;
        panel.style.display = isVisible ? "" : "none";
        panel.style.visibility = "";
        panel.style.pointerEvents = "";
      }
      panel.classList.toggle(hideClass, !isVisible);
    };
    const getAnimatedItems = (panel) => {
      const items = Array.from(panel.querySelectorAll(SELECTORS.panelElement));
      if (items.length)
        return items;
      const first = panel.firstElementChild;
      return first ? [first] : [];
    };
    panels.forEach((panel, idx) => {
      setPanelVisibility(panel, false);
      panel.classList.remove(activeClass);
      if (animateContent) {
        getAnimatedItems(panel).forEach((el) => {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        });
      }
      if (idx === activeIndex) {
        setPanelVisibility(panel, true);
        panel.classList.add(activeClass);
      }
    });
    const getProgressEl = (idx) => buttons[idx]?.querySelector(SELECTORS.progress) || null;
    const setProgressInstant = (idx, percent) => {
      const progress = getProgressEl(idx);
      if (!progress)
        return;
      progress.style.transition = "none";
      progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
      void progress.offsetWidth;
    };
    const animateProgressToEnd = (idx, ms) => {
      const progress = getProgressEl(idx);
      if (!progress)
        return;
      progress.style.transition = "none";
      void progress.offsetWidth;
      progress.style.transition = `width ${ms}ms linear`;
      progress.style.width = "100%";
    };
    const getTabsScroller = () => {
      const explicit = root.querySelector(SELECTORS.scrollWrap);
      if (explicit)
        return explicit;
      const btn0 = buttons[0];
      if (!btn0)
        return null;
      let el = btn0.parentElement;
      while (el && el !== root) {
        const cs = window.getComputedStyle(el);
        const ox = cs.overflowX;
        const canScroll = (ox === "auto" || ox === "scroll") && el.scrollWidth > el.clientWidth + 2;
        if (canScroll)
          return el;
        el = el.parentElement;
      }
      return null;
    };
    const scrollActiveTabIntoView = (idx) => {
      if (!scrollActive)
        return;
      const scroller = getTabsScroller();
      const btn = buttons[idx];
      if (!scroller || !btn)
        return;
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      const scrollerRect = scroller.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const btnCenter = btnRect.left - scrollerRect.left + btnRect.width / 2;
      const desiredLeft = btnCenter - scroller.clientWidth / 2;
      const nextScrollLeft = Math.max(
        0,
        Math.min(scroller.scrollWidth - scroller.clientWidth, scroller.scrollLeft + desiredLeft)
      );
      scroller.scrollTo({ left: nextScrollLeft, behavior });
    };
    const pauseAutoplayAndProgress = () => {
      if (!autoplayEnabled)
        return;
      if (isAutoplayStopped) {
        setProgressInstant(activeIndex, 100);
        return;
      }
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (cycleStartTs) {
        const elapsed = now() - cycleStartTs;
        remainingMs = Math.max(0, remainingMs - elapsed);
      }
      cycleStartTs = 0;
      const percent = 100 * (1 - remainingMs / autoplayMs);
      setProgressInstant(activeIndex, percent);
    };
    const startAutoplayAndProgress = () => {
      if (!autoplayEnabled || !isInView || isPaused || isAutoplayStopped)
        return;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (remainingMs <= 0) {
        remainingMs = autoplayMs;
        setActive(getNextIndex(activeIndex, buttons.length, loopTabs), false);
        return;
      }
      const percent = 100 * (1 - remainingMs / autoplayMs);
      setProgressInstant(activeIndex, percent);
      animateProgressToEnd(activeIndex, remainingMs);
      cycleStartTs = now();
      timerId = window.setTimeout(() => {
        remainingMs = autoplayMs;
        setActive(getNextIndex(activeIndex, buttons.length, loopTabs), false);
      }, remainingMs);
    };
    const resetCycle = () => {
      remainingMs = autoplayMs;
      cycleStartTs = 0;
    };
    const animateInContentElements = (panel) => {
      if (!panel || !animateContent)
        return;
      const items = getAnimatedItems(panel);
      if (!items.length)
        return;
      const useGSAP = typeof window !== "undefined" && window.gsap;
      const duration = prefersReducedMotion ? 0.25 : 0.5;
      const stagger = prefersReducedMotion ? 0.02 : 0.05;
      const fromY = prefersReducedMotion ? 0 : 20;
      const fromBlur = prefersReducedMotion ? 0 : 8;
      const fromScale = prefersReducedMotion ? 1 : 0.98;
      if (useGSAP) {
        window.gsap.timeline().set(items, {
          opacity: 0,
          y: fromY,
          pointerEvents: "auto",
          filter: `blur(${fromBlur}px)`,
          scale: fromScale
        }).to(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration,
          stagger,
          ease: "power2.out"
        });
        return;
      }
      items.forEach((el, idx) => {
        el.style.transition = "opacity 300ms ease, transform 300ms ease, filter 300ms ease";
        el.style.opacity = "0";
        el.style.transform = `translateY(${fromY}px) scale(${fromScale})`;
        el.style.filter = `blur(${fromBlur}px)`;
        el.style.transitionDelay = `${idx * 60}ms`;
        el.style.pointerEvents = "auto";
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
          el.style.filter = "blur(0px)";
        });
      });
    };
    const setActive = (index, userTriggered) => {
      if (index < 0 || index >= buttons.length)
        return Promise.resolve();
      if (index === activeIndex && hasInitialized)
        return Promise.resolve();
      if (userTriggered && stopAutoplayOnFirstInteraction && !hasUserInteracted) {
        hasUserInteracted = true;
        isAutoplayStopped = true;
        isPaused = true;
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
        remainingMs = autoplayMs;
        cycleStartTs = 0;
      }
      pauseAutoplayAndProgress();
      resetCycle();
      const prevIndex = activeIndex;
      const prevPanel = hasInitialized ? panels[prevIndex] : null;
      const nextPanel = panels[index];
      if (!nextPanel)
        return Promise.resolve();
      activeIndex = index;
      buttons.forEach((btn, i) => {
        const isActive = i === index;
        btn.classList.toggle(activeClass, isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
        const progress = btn.querySelector(SELECTORS.progress);
        if (progress) {
          progress.style.transition = "none";
          progress.style.width = "0%";
          void progress.offsetWidth;
        }
      });
      scrollActiveTabIntoView(index);
      if (prevPanel && prevPanel !== nextPanel) {
        setPanelVisibility(prevPanel, false);
        prevPanel.classList.remove(activeClass);
      }
      panels.forEach((panel) => {
        if (panel !== nextPanel && panel !== prevPanel) {
          setPanelVisibility(panel, false);
          panel.classList.remove(activeClass);
        }
      });
      setPanelVisibility(nextPanel, true);
      nextPanel.classList.add(activeClass);
      animateInContentElements(nextPanel);
      hasInitialized = true;
      if (autoplayEnabled && isInView && !isPaused && !isAutoplayStopped) {
        startAutoplayAndProgress();
      } else if (isAutoplayStopped) {
        setProgressInstant(activeIndex, 100);
      }
      root.dispatchEvent(
        new CustomEvent("tabs:change", {
          detail: {
            index,
            button: buttons[index],
            panel: nextPanel,
            reason: userTriggered ? "user" : "auto"
          },
          bubbles: true
        })
      );
      return Promise.resolve();
    };
    const focusButton = (idx) => {
      const btn = buttons[idx];
      if (!btn)
        return;
      try {
        btn.focus({ preventScroll: true });
      } catch (error) {
        btn.focus();
      }
    };
    const onButtonKeydown = (event, idx) => {
      const key = event.key;
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        setActive(idx, true);
        return;
      }
      if (key === "ArrowRight" || key === "ArrowLeft" || key === "Home" || key === "End") {
        event.preventDefault();
        let nextIndex = idx;
        if (key === "ArrowRight")
          nextIndex = getNextIndex(idx, buttons.length, loopTabs);
        if (key === "ArrowLeft")
          nextIndex = getPrevIndex(idx, buttons.length, loopTabs);
        if (key === "Home")
          nextIndex = 0;
        if (key === "End")
          nextIndex = buttons.length - 1;
        setActive(nextIndex, true).then(() => focusButton(nextIndex));
      }
    };
    const listElement = root.querySelector(SELECTORS.list) || buttons[0].parentElement;
    if (listElement && !listElement.hasAttribute("role")) {
      listElement.setAttribute("role", "tablist");
    }
    buttons.forEach((btn, i) => {
      const btnId = `tabs-btn-${instanceId}-${i}`;
      const panelId = `tabs-panel-${instanceId}-${i}`;
      const isActive = i === activeIndex;
      btn.id = btn.id || btnId;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-controls", panelId);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.setAttribute("tabindex", isActive ? "0" : "-1");
      btn.classList.toggle(activeClass, isActive);
      panels[i].id = panels[i].id || panelId;
      panels[i].setAttribute("role", "tabpanel");
      panels[i].setAttribute("aria-labelledby", btn.id);
      panels[i].setAttribute("aria-hidden", isActive ? "false" : "true");
      const onClick = (evt) => {
        evt.preventDefault();
        setActive(i, true);
      };
      const onHover = () => {
        if (activateOn === "hover")
          setActive(i, true);
      };
      const onKeydown = (evt) => onButtonKeydown(evt, i);
      btn.addEventListener("click", onClick);
      btn.addEventListener("keydown", onKeydown);
      cleanupHandlers.push(() => btn.removeEventListener("click", onClick));
      cleanupHandlers.push(() => btn.removeEventListener("keydown", onKeydown));
      if (activateOn === "hover") {
        btn.addEventListener("mouseenter", onHover);
        cleanupHandlers.push(() => btn.removeEventListener("mouseenter", onHover));
      }
    });
    if (pauseOnHover) {
      const onEnter = () => {
        isPaused = true;
        pauseAutoplayAndProgress();
      };
      const onLeave = () => {
        isPaused = false;
        startAutoplayAndProgress();
      };
      root.addEventListener("mouseenter", onEnter);
      root.addEventListener("mouseleave", onLeave);
      cleanupHandlers.push(() => root.removeEventListener("mouseenter", onEnter));
      cleanupHandlers.push(() => root.removeEventListener("mouseleave", onLeave));
    }
    if (pauseOnFocus) {
      const onFocusIn = () => {
        isPaused = true;
        pauseAutoplayAndProgress();
      };
      const onFocusOut = () => {
        isPaused = false;
        startAutoplayAndProgress();
      };
      root.addEventListener("focusin", onFocusIn);
      root.addEventListener("focusout", onFocusOut);
      cleanupHandlers.push(() => root.removeEventListener("focusin", onFocusIn));
      cleanupHandlers.push(() => root.removeEventListener("focusout", onFocusOut));
    }
    if (pauseOnHidden) {
      const onVisibility = () => {
        if (document.hidden) {
          pauseAutoplayAndProgress();
        } else {
          startAutoplayAndProgress();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanupHandlers.push(() => document.removeEventListener("visibilitychange", onVisibility));
    }
    const observer = observerSupported ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== root)
            return;
          if (entry.isIntersecting) {
            isInView = true;
            if (hasInitialized) {
              scrollActiveTabIntoView(activeIndex);
              startAutoplayAndProgress();
            } else {
              setActive(activeIndex, false).then(() => {
                startAutoplayAndProgress();
              });
            }
          } else {
            isInView = false;
            pauseAutoplayAndProgress();
          }
        });
      },
      { threshold: 0.2 }
    ) : null;
    if (observer) {
      observer.observe(root);
    } else {
      isInView = true;
      setActive(activeIndex, false).then(() => {
        startAutoplayAndProgress();
      });
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (observer)
        observer.disconnect();
      cleanupHandlers.forEach((cleanup) => cleanup());
      cleanupHandlers.length = 0;
    };
  }
  function getBooleanAttr(element, attr, fallback) {
    if (!element || !element.hasAttribute(attr))
      return fallback;
    const value = element.getAttribute(attr);
    if (value === "" || value === "true")
      return true;
    if (value === "false")
      return false;
    return Boolean(value);
  }
  function getNumberAttr(element, attr, fallback) {
    if (!element || !element.hasAttribute(attr))
      return fallback;
    const value = Number(element.getAttribute(attr));
    return Number.isFinite(value) ? value : fallback;
  }
  function findPresetIndex(buttons, activeClass) {
    const byActive = buttons.findIndex((btn) => btn.classList.contains(activeClass));
    if (byActive > -1)
      return byActive;
    const byIsActive = buttons.findIndex((btn) => btn.classList.contains("is-active"));
    if (byIsActive > -1)
      return byIsActive;
    return -1;
  }
  function getNextIndex(current, total, loop) {
    if (current + 1 < total)
      return current + 1;
    return loop ? 0 : total - 1;
  }
  function getPrevIndex(current, total, loop) {
    if (current - 1 >= 0)
      return current - 1;
    return loop ? total - 1 : 0;
  }
  var DEFAULT_AUTOPLAY_MS, instances, instanceCounter, SELECTORS;
  var init_tabsComp1 = __esm({
    "src/components/tabs/tabsComp1.js"() {
      init_helpers();
      init_logger();
      DEFAULT_AUTOPLAY_MS = 5e3;
      instances = /* @__PURE__ */ new Map();
      instanceCounter = 0;
      SELECTORS = {
        root: "[tabs-comp]",
        list: "[tabs-list]",
        button: "[tabs-btn]",
        panel: "[tabs-content]",
        panelElement: "[tabs-content-element]",
        scrollWrap: "[tabs-scroll-wrap]",
        progress: ".tab-btn-progress, [tab-btn-progress]"
      };
    }
  });

  // src/pages/home.js
  var home_exports = {};
  __export(home_exports, {
    cleanupHomePage: () => cleanupHomePage,
    initHomePage: () => initHomePage
  });
  async function initHomePage() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0 });
      }, 10);
    });
    logger.log("\u{1F3E0} Home page initialized");
    try {
      await ensureGSAPLoaded();
      const gsap2 = window.gsap;
      if (gsap2) {
        gsap2.to(".home-hero-body", {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#home-hero-section",
            start: "70% 20%",
            end: "bottom 20%",
            scrub: true
          }
        });
      }
      initHeroAnimation();
      initCarousel();
      await initGlobalChampionScrollLock();
      const riveCleanup = initRive({ onInteraction: false });
      if (typeof riveCleanup === "function")
        cleanupFunctions2.push(riveCleanup);
      initTabs();
    } catch (error) {
      handleError(error, "Home Page Initialization");
    }
  }
  function cleanupHomePage() {
    cleanupFunctions2.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Home Page Cleanup");
      }
    });
    cleanupFunctions2.length = 0;
  }
  async function initGlobalChampionScrollLock() {
    const section = document.querySelector(".section.is-global-champion");
    const sliderOuter = document.querySelector(".slider-outer.for-gc");
    const track = sliderOuter?.querySelector("[carousel], .slider");
    const slides = track ? Array.from(track.querySelectorAll(".text-huge")) : [];
    if (!section || !sliderOuter || !slides.length) {
      logger.log("\u23F3 Global champion scroll-lock: section or .text-huge slider not found");
      return;
    }
    await ensureGSAPLoaded();
    const ScrollTrigger = window.ScrollTrigger;
    const slideCount = slides.length;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${slideCount * 30}%`,
      scrub: false,
      onUpdate(self2) {
        const progress = self2.progress;
        const index = Math.min(slideCount - 1, Math.floor(progress * slideCount));
        const emblaApi = getCarouselInstance(sliderOuter);
        if (emblaApi && typeof emblaApi.scrollTo === "function") {
          emblaApi.scrollTo(index, false);
        }
      }
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    cleanupFunctions2.push(() => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    });
    logger.log(`\u2705 Global champion scroll-lock: ${slideCount} slides (Embla)`);
  }
  async function initHeroAnimation() {
    const homeHeroSection = document.querySelector("#home-hero-section");
    if (!homeHeroSection) {
      return;
    }
    const homeHeroRiveAnimation = homeHeroSection.querySelector("#home-hero-rive-animation");
    const hText1 = homeHeroSection.querySelector("[hh_text1] ");
    const hText2 = homeHeroSection.querySelector("[hh_text2] ");
    const hText3 = homeHeroSection.querySelector("[hh_text3] ");
    const hText4 = homeHeroSection.querySelector("[hh_text4] ");
    const hText5 = homeHeroSection.querySelector("[hh_text5] ");
    const hasSeenHero = getCookie(HERO_SEEN_COOKIE);
    if (hasSeenHero) {
      hText1?.classList.add("out");
      hText2?.classList.add("out");
      setTimeout(() => {
        hText3?.classList.add("in");
        document.querySelector(".nav")?.classList.remove("hidden-top");
      }, 500);
      setTimeout(() => hText4?.classList.add("in"), 800);
      setTimeout(() => hText5?.classList.add("in"), 1100);
      if (homeHeroRiveAnimation) {
        const riveAttrs = homeHeroRiveAnimation.getAttributeNames().filter((n) => n.startsWith("data-rive"));
        riveAttrs.forEach((name) => homeHeroRiveAnimation.removeAttribute(name));
        homeHeroRiveAnimation.setAttribute(
          "data-rive-src",
          "https://cdn.prod.website-files.com/698c6383e6bfa7b525ef0e68/69a051cd39f89520df06cd6c_homepage_(bigger).riv"
        );
        homeHeroRiveAnimation.setAttribute("data-rive-animation", "2, 3");
        homeHeroRiveAnimation.setAttribute("data-rive-scrub-animation", "3");
        homeHeroRiveAnimation.setAttribute("data-rive-autoplay", "");
        homeHeroRiveAnimation.setAttribute("data-rive-duration", "2.4, 2");
        homeHeroRiveAnimation.setAttribute("data-rive-scrub-end", "bottom 30%");
        homeHeroRiveAnimation.setAttribute("data-rive-autoplay-animation", "2");
      }
      return;
    }
    setTimeout(() => {
      hText1?.classList.add("out");
    }, 2e3);
    setTimeout(() => {
      hText2?.classList.add("out");
    }, 2300);
    setTimeout(() => {
      hText3?.classList.add("in");
      document.querySelector(".nav")?.classList.remove("hidden-top");
    }, 3600);
    setTimeout(() => {
      hText4?.classList.add("in");
    }, 3900);
    setTimeout(() => {
      hText5?.classList.add("in");
      setCookie(HERO_SEEN_COOKIE, "1");
    }, 4200);
  }
  var cleanupFunctions2, HERO_SEEN_COOKIE;
  var init_home = __esm({
    "src/pages/home.js"() {
      init_helpers();
      init_logger();
      init_carousel();
      init_gsap();
      init_rive();
      init_tabsComp1();
      cleanupFunctions2 = [];
      HERO_SEEN_COOKIE = "corner_hero_seen";
    }
  });

  // src/pages/about.js
  var about_exports = {};
  __export(about_exports, {
    cleanupAboutPage: () => cleanupAboutPage,
    initAboutPage: () => initAboutPage
  });
  async function initAboutPage() {
    logger.log("\u{1F4C4} About page initialized");
    try {
      initCarousel();
      await initStickySliderScrollLock();
      const riveCleanup = initRive({ onInteraction: false });
      if (typeof riveCleanup === "function")
        cleanupFunctions3.push(riveCleanup);
      (() => {
        const tooltip = document.createElement("div");
        tooltip.classList.add("location-tooltip-text");
        Object.assign(tooltip.style, {
          position: "fixed",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          opacity: "0",
          transition: "opacity 0.15s ease",
          zIndex: "999999"
        });
        document.body.appendChild(tooltip);
        const ensurePinsHoverable = () => {
          document.querySelectorAll("svg [location-pin]").forEach((pin) => {
            pin.style.pointerEvents = "all";
            pin.style.cursor = "pointer";
          });
        };
        ensurePinsHoverable();
        document.addEventListener("mouseover", (e2) => {
          const pin = e2.target.closest?.("[location-pin]");
          if (!pin)
            return;
          const text = pin.getAttribute("location-pin");
          if (!text)
            return;
          tooltip.textContent = text;
          tooltip.style.opacity = "1";
          const rect = pin.getBoundingClientRect();
          tooltip.style.left = `${rect.left + rect.width / 2}px`;
          tooltip.style.top = `${rect.top - 8}px`;
          tooltip.style.transform = "translate(-50%, -100%)";
        });
        document.addEventListener("mouseout", (e2) => {
          const pin = e2.target.closest?.("[location-pin]");
          if (!pin)
            return;
          tooltip.style.opacity = "0";
        });
        let tries = 0;
        const interval = setInterval(() => {
          ensurePinsHoverable();
          tries++;
          if (tries > 20)
            clearInterval(interval);
        }, 100);
      })();
    } catch (error) {
      handleError(error, "About Page Initialization");
    }
  }
  function cleanupAboutPage() {
    cleanupFunctions3.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "About Page Cleanup");
      }
    });
    cleanupFunctions3.length = 0;
  }
  async function initStickySliderScrollLock() {
    const track = document.querySelector("#stickySliderTrack");
    if (!track)
      return;
    const section = track.querySelector("section");
    if (!section)
      return;
    const sliderOuter = section.querySelector(".slider-outer.for-sticky-slider");
    if (!sliderOuter)
      return;
    const carouselEl = sliderOuter.querySelector("[carousel]");
    const slides = carouselEl ? Array.from(carouselEl.querySelectorAll(".slide")) : [];
    const slideCount = slides.length;
    if (slideCount === 0)
      return;
    const dataSlideUpdate = document.querySelector("[data-slide-update]");
    await ensureGSAPLoaded();
    const ScrollTrigger = window.ScrollTrigger;
    if (!ScrollTrigger)
      return;
    const iconWraps = section.querySelectorAll(".sticky-slider-icon-wrap");
    const scrollHeightVh = slideCount * 70;
    track.style.minHeight = `${scrollHeightVh}vh`;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate(self2) {
        const progress = self2.progress;
        const index = Math.min(slideCount - 1, Math.floor(progress * slideCount));
        dataSlideUpdate.setAttribute("data-slide-update", index + 1);
        const emblaApi = getCarouselInstance(sliderOuter);
        if (emblaApi && typeof emblaApi.scrollTo === "function") {
          emblaApi.scrollTo(index, false);
        }
        iconWraps.forEach((wrap, i) => wrap.classList.toggle("is-active", i === index));
      }
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    cleanupFunctions3.push(() => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    });
    logger.log(`\u2705 Sticky slider scroll-lock: ${slideCount} slides`);
  }
  var cleanupFunctions3;
  var init_about = __esm({
    "src/pages/about.js"() {
      init_helpers();
      init_logger();
      init_carousel();
      init_gsap();
      init_rive();
      cleanupFunctions3 = [];
    }
  });

  // src/pages/contact.js
  var contact_exports = {};
  __export(contact_exports, {
    cleanupContactPage: () => cleanupContactPage,
    initContactPage: () => initContactPage
  });
  async function initContactPage() {
    logger.log("\u{1F4E7} Contact page initialized");
    try {
      mirrorClick("#contact-form-btn", "#contact-form-btn-hidden");
    } catch (error) {
      handleError(error, "Contact Page Initialization");
    }
  }
  function cleanupContactPage() {
    cleanupFunctions4.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Contact Page Cleanup");
      }
    });
    cleanupFunctions4.length = 0;
  }
  var cleanupFunctions4;
  var init_contact = __esm({
    "src/pages/contact.js"() {
      init_helpers();
      init_logger();
      init_helpers();
      cleanupFunctions4 = [];
    }
  });

  // src/pages/solutions.js
  var solutions_exports = {};
  __export(solutions_exports, {
    cleanupSolutionsPage: () => cleanupSolutionsPage,
    initSolutionsPage: () => initSolutionsPage
  });
  async function initSolutionsPage() {
    logger.log("\u{1F4CB} Solutions page initialized");
    try {
      initCarousel();
      await initStickySliderScrollLock2();
      initTabs();
      const riveCleanup = initRive({ onInteraction: false });
      if (typeof riveCleanup === "function")
        cleanupFunctions5.push(riveCleanup);
    } catch (error) {
      handleError(error, "Solutions Page Initialization");
    }
  }
  function cleanupSolutionsPage() {
    cleanupFunctions5.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Solutions Page Cleanup");
      }
    });
    cleanupFunctions5.length = 0;
  }
  async function initStickySliderScrollLock2() {
    const track = document.querySelector("#stickySliderTrack");
    if (!track)
      return;
    const section = track.querySelector("section");
    if (!section)
      return;
    const sliderOuter = section.querySelector(".slider-outer.for-sticky-slider");
    if (!sliderOuter)
      return;
    const carouselEl = sliderOuter.querySelector("[carousel]");
    const slides = carouselEl ? Array.from(carouselEl.querySelectorAll(".slide")) : [];
    const slideCount = slides.length;
    if (slideCount === 0)
      return;
    const dataSlideUpdate = document.querySelector("[data-slide-update]");
    await ensureGSAPLoaded();
    const ScrollTrigger = window.ScrollTrigger;
    if (!ScrollTrigger)
      return;
    const iconWraps = section.querySelectorAll(".sticky-slider-icon-wrap");
    const scrollHeightVh = slideCount * 70;
    track.style.minHeight = `${scrollHeightVh}vh`;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate(self2) {
        const progress = self2.progress;
        const index = Math.min(slideCount - 1, Math.floor(progress * slideCount));
        dataSlideUpdate.setAttribute("data-slide-update", index + 1);
        const emblaApi = getCarouselInstance(sliderOuter);
        if (emblaApi && typeof emblaApi.scrollTo === "function") {
          emblaApi.scrollTo(index, false);
        }
        iconWraps.forEach((wrap, i) => wrap.classList.toggle("is-active", i === index));
      }
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    cleanupFunctions5.push(() => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    });
    logger.log(`\u2705 Sticky slider scroll-lock: ${slideCount} slides`);
  }
  var cleanupFunctions5;
  var init_solutions = __esm({
    "src/pages/solutions.js"() {
      init_helpers();
      init_logger();
      init_gsap();
      init_carousel();
      init_tabsComp1();
      init_rive();
      cleanupFunctions5 = [];
    }
  });

  // src/components/modal-basic.js
  function initModalBasic() {
    if (typeof document === "undefined") {
      logger.warn("[ModalBasic] document is undefined (SSR) - skipping init.");
      return;
    }
    try {
      const modals = document.querySelectorAll(SELECTORS2.modal);
      if (!modals.length) {
        if (!listenersAttached) {
          logger.info("[ModalBasic] No modals found on the page - nothing to initialize.");
        }
        return;
      }
      modals.forEach(enhanceModalAccessibility);
      enhanceTargetAccessibility();
      if (listenersAttached) {
        return;
      }
      const clickHandler = (event) => {
        const trigger = event.target.closest(SELECTORS2.trigger);
        if (trigger) {
          const modalName = trigger.getAttribute("data-modal-target");
          if (!modalName) {
            return;
          }
          event.preventDefault();
          const currentActiveName = activeModal?.getAttribute("data-modal-name");
          if (currentActiveName === modalName) {
            closeAllModals("toggle");
            return;
          }
          try {
            openModal(modalName, trigger);
          } catch (error) {
            handleError(error, "Modal Basic Open");
          }
          return;
        }
        const closeBtn = event.target.closest(SELECTORS2.close);
        if (closeBtn) {
          event.preventDefault();
          closeAllModals("button");
          return;
        }
        const modalRoot = activeModal && document.body.contains(activeModal) ? activeModal : null;
        if (modalRoot && allowOutsideClose(modalRoot) && shouldCloseOnOutsideClick(event, modalRoot)) {
          closeAllModals("overlay");
        }
      };
      const keydownHandler = (event) => {
        if (!activeModal || activeModal && !document.body.contains(activeModal)) {
          activeModal = null;
        }
        if (event.key === "Escape") {
          if (activeModal && allowEscapeClose(activeModal)) {
            event.preventDefault();
            closeAllModals("escape");
          }
          return;
        }
        if (event.key === "Tab" && activeModal) {
          trapFocus(event);
        }
      };
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keydownHandler);
      cleanupCallbacks.push(() => document.removeEventListener("click", clickHandler));
      cleanupCallbacks.push(() => document.removeEventListener("keydown", keydownHandler));
      listenersAttached = true;
      logger.log(`\u{1FA9F} ModalBasic ready (${modals.length} modal${modals.length > 1 ? "s" : ""})`);
    } catch (error) {
      handleError(error, "Modal Basic Initialization");
    }
  }
  function cleanupModalBasic() {
    if (!listenersAttached && !activeModal)
      return;
    try {
      closeAllModals("cleanup", { skipFocusRestore: true });
      const callbacks = cleanupCallbacks.splice(0);
      callbacks.forEach((cleanup) => {
        try {
          cleanup();
        } catch (error) {
          handleError(error, "Modal Basic Cleanup");
        }
      });
    } finally {
      listenersAttached = false;
    }
  }
  function openModal(modalName, trigger) {
    const modalSelector = getSafeSelector("data-modal-name", modalName);
    if (!modalSelector) {
      logger.warn("[ModalBasic] Invalid modal name provided.");
      return;
    }
    const modal = document.querySelector(modalSelector);
    if (!modal) {
      logger.warn(`[ModalBasic] Modal "${modalName}" not found in the DOM.`);
      return;
    }
    if (activeModal === modal) {
      return;
    }
    closeAllModals("switch", { skipFocusRestore: true });
    previouslyFocusedElement = trigger && typeof trigger.focus === "function" && trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    modal.setAttribute("data-modal-status", STATUS_ACTIVE);
    modal.setAttribute("aria-hidden", "false");
    updateTriggerState(modalName, STATUS_ACTIVE);
    const group = findModalGroup(modal, trigger);
    if (group) {
      group.setAttribute("data-modal-group-status", STATUS_ACTIVE);
    }
    activeModal = modal;
    modal.dispatchEvent(
      new CustomEvent("modal:open", {
        detail: {
          name: modalName,
          trigger
        },
        bubbles: true
      })
    );
    focusModal(modal);
  }
  function closeAllModals(reason = "manual", options = {}) {
    if (typeof document === "undefined")
      return;
    const { skipFocusRestore = false } = options;
    resetAllTriggers();
    document.querySelectorAll(SELECTORS2.modal).forEach((modal) => {
      const wasActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
      modal.setAttribute("data-modal-status", STATUS_INACTIVE);
      modal.setAttribute("aria-hidden", "true");
      if (modal.getAttribute("data-modal-temp-tabindex") === "true") {
        modal.removeAttribute("tabindex");
        modal.removeAttribute("data-modal-temp-tabindex");
      }
      if (wasActive) {
        modal.dispatchEvent(
          new CustomEvent("modal:close", {
            detail: {
              name: modal.getAttribute("data-modal-name"),
              reason
            },
            bubbles: true
          })
        );
      }
    });
    document.querySelectorAll(SELECTORS2.group).forEach((group) => {
      group.setAttribute("data-modal-group-status", STATUS_INACTIVE);
    });
    if (!skipFocusRestore && previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function" && document.contains(previouslyFocusedElement)) {
      try {
        previouslyFocusedElement.focus({ preventScroll: true });
      } catch (error) {
        previouslyFocusedElement.focus();
      }
    }
    previouslyFocusedElement = null;
    activeModal = null;
  }
  function enhanceModalAccessibility(modal) {
    ensureModalId(modal);
    if (!modal.hasAttribute("role")) {
      modal.setAttribute("role", "dialog");
    }
    modal.setAttribute("aria-modal", "true");
    if (!modal.hasAttribute("data-modal-status")) {
      modal.setAttribute("data-modal-status", STATUS_INACTIVE);
    }
    const isActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
    modal.setAttribute("aria-hidden", isActive ? "false" : "true");
    if (!modal.hasAttribute("aria-labelledby")) {
      const heading = modal.querySelector("[data-modal-heading]");
      if (heading) {
        if (!heading.id) {
          headingIdCounter += 1;
          heading.id = `modal-heading-${headingIdCounter}`;
        }
        modal.setAttribute("aria-labelledby", heading.id);
      }
    }
    if (!modal.hasAttribute("aria-label") && !modal.hasAttribute("aria-labelledby")) {
      modal.setAttribute("aria-label", modal.getAttribute("data-modal-label") || "Modal dialog");
    }
  }
  function enhanceTargetAccessibility() {
    const triggers = document.querySelectorAll(SELECTORS2.trigger);
    if (!triggers.length)
      return;
    triggers.forEach((trigger) => {
      const modalName = trigger.getAttribute("data-modal-target");
      if (!modalName)
        return;
      const modalSelector = getSafeSelector("data-modal-name", modalName);
      if (!modalSelector)
        return;
      const modal = document.querySelector(modalSelector);
      if (!modal) {
        logger.warn(`[ModalBasic] Trigger found for unknown modal "${modalName}"`);
        return;
      }
      const modalId = ensureModalId(modal);
      trigger.setAttribute("aria-controls", modalId);
      trigger.setAttribute("aria-haspopup", "dialog");
      if (!trigger.hasAttribute("data-modal-status")) {
        trigger.setAttribute("data-modal-status", STATUS_INACTIVE);
      }
      const isActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
      trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }
  function focusModal(modal) {
    const focusable = getFocusableElements(modal);
    const target = focusable[0] || modal;
    requestAnimationFrame(() => {
      if (target === modal && !modal.hasAttribute("tabindex")) {
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("data-modal-temp-tabindex", "true");
      }
      if (typeof target.focus === "function") {
        try {
          target.focus({ preventScroll: true });
        } catch (error) {
          target.focus();
        }
      }
    });
  }
  function trapFocus(event) {
    if (!activeModal)
      return;
    const focusableElements = getFocusableElements(activeModal);
    if (!focusableElements.length) {
      event.preventDefault();
      focusModal(activeModal);
      return;
    }
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const isShiftPressed = event.shiftKey;
    const activeElement = document.activeElement;
    if (isShiftPressed && activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }
    if (!isShiftPressed && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function getFocusableElements(container) {
    if (!container)
      return [];
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
      const isHidden = element.getAttribute("aria-hidden") === "true";
      const isDisabled = element.hasAttribute("disabled");
      return !isHidden && !isDisabled;
    });
  }
  function shouldCloseOnOutsideClick(event, modal) {
    if (!modal.contains(event.target))
      return false;
    const content = modal.querySelector(SELECTORS2.content);
    if (!content) {
      return event.target === modal;
    }
    return !content.contains(event.target);
  }
  function allowOutsideClose(modal) {
    if (!modal)
      return false;
    if (!modal.hasAttribute("data-modal-close-outside"))
      return false;
    return modal.getAttribute("data-modal-close-outside") !== "false";
  }
  function allowEscapeClose(modal) {
    return modal.getAttribute("data-modal-escape") !== "false";
  }
  function findModalGroup(modal, trigger) {
    return modal.closest(SELECTORS2.group) || trigger?.closest(SELECTORS2.group) || null;
  }
  function resetAllTriggers() {
    document.querySelectorAll(SELECTORS2.trigger).forEach((trigger) => {
      trigger.setAttribute("data-modal-status", STATUS_INACTIVE);
      trigger.setAttribute("aria-pressed", "false");
      trigger.setAttribute("aria-expanded", "false");
    });
  }
  function updateTriggerState(modalName, status) {
    const selector = getSafeSelector("data-modal-target", modalName);
    if (!selector)
      return;
    document.querySelectorAll(selector).forEach((trigger) => {
      trigger.setAttribute("data-modal-status", status);
      const isActive = status === STATUS_ACTIVE;
      trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }
  function ensureModalId(modal) {
    if (modal.id)
      return modal.id;
    modalIdCounter += 1;
    const newId = `modal-${modalIdCounter}`;
    modal.id = newId;
    return newId;
  }
  function getSafeSelector(attribute, value) {
    if (!attribute || value === null || typeof value === "undefined") {
      return "";
    }
    const valueAsString = String(value);
    const escaped = typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(valueAsString) : valueAsString.replace(/"/g, '\\"');
    return `[${attribute}="${escaped}"]`;
  }
  var SELECTORS2, STATUS_ACTIVE, STATUS_INACTIVE, FOCUSABLE_SELECTOR, listenersAttached, activeModal, previouslyFocusedElement, headingIdCounter, modalIdCounter, cleanupCallbacks;
  var init_modal_basic = __esm({
    "src/components/modal-basic.js"() {
      init_helpers();
      init_logger();
      SELECTORS2 = {
        modal: "[data-modal-name]",
        trigger: "[data-modal-target]",
        close: "[data-modal-close]",
        group: "[data-modal-group-status]",
        content: "[data-modal-content]"
      };
      STATUS_ACTIVE = "active";
      STATUS_INACTIVE = "not-active";
      FOCUSABLE_SELECTOR = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(", ");
      listenersAttached = false;
      activeModal = null;
      previouslyFocusedElement = null;
      headingIdCounter = 0;
      modalIdCounter = 0;
      cleanupCallbacks = [];
    }
  });

  // src/components/dropdown.js
  function setupDropdown(dropdown) {
    if (initialized.has(dropdown))
      return;
    initialized.add(dropdown);
    const toggle = dropdown.querySelector(SELECTORS3.toggle);
    const body = dropdown.querySelector(SELECTORS3.body);
    if (!toggle || !body) {
      logger.warn("[Dropdown] Missing data-dropdown-toggle or data-dropdown-body", dropdown);
      return;
    }
    const closeOutside = dropdown.getAttribute("data-dropdown-close-outside") !== "false";
    const group = dropdown.getAttribute("data-dropdown-group");
    const contentId = body.id || `dropdown-body-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const toggleId = toggle.id || `dropdown-toggle-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    body.id = contentId;
    toggle.id = toggleId;
    dropdown.setAttribute("role", "combobox");
    toggle.setAttribute("role", "button");
    toggle.setAttribute("aria-expanded", dropdown.classList.contains(OPEN_CLASS));
    toggle.setAttribute("aria-controls", contentId);
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("tabindex", "0");
    body.setAttribute("role", "listbox");
    body.setAttribute("aria-labelledby", toggleId);
    const scrollContent = body.firstElementChild;
    if (scrollContent) {
      scrollContent.setAttribute("data-lenis-prevent", "");
    }
    function setOpen(open) {
      dropdown.classList.toggle(OPEN_CLASS, open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      dropdown.dispatchEvent(new CustomEvent("dropdown:toggle", { detail: { open }, bubbles: true }));
    }
    function closeOthersInGroup() {
      if (!group)
        return;
      document.querySelectorAll(`[data-dropdown-group="${group}"]`).forEach((el) => {
        if (el !== dropdown) {
          el.classList.remove(OPEN_CLASS);
          const t2 = el.querySelector(SELECTORS3.toggle);
          if (t2)
            t2.setAttribute("aria-expanded", "false");
        }
      });
    }
    function handleToggle(e2) {
      e2.preventDefault();
      e2.stopPropagation();
      const willOpen = !dropdown.classList.contains(OPEN_CLASS);
      if (willOpen)
        closeOthersInGroup();
      setOpen(willOpen);
    }
    function handleCloseOutside(e2) {
      if (!dropdown.contains(e2.target)) {
        setOpen(false);
      }
    }
    toggle.addEventListener("click", handleToggle);
    const handleKeydown = (e2) => {
      if (e2.key === "Enter" || e2.key === " ") {
        e2.preventDefault();
        handleToggle(e2);
      }
      if (e2.key === "Escape") {
        setOpen(false);
      }
    };
    toggle.addEventListener("keydown", handleKeydown);
    if (closeOutside) {
      document.addEventListener("click", handleCloseOutside);
      cleanupFns.push(() => document.removeEventListener("click", handleCloseOutside));
    }
    cleanupFns.push(() => {
      toggle.removeEventListener("click", handleToggle);
      toggle.removeEventListener("keydown", handleKeydown);
      initialized.delete(dropdown);
    });
  }
  function initDropdown() {
    const dropdowns = document.querySelectorAll(SELECTORS3.dropdown);
    if (!dropdowns.length)
      return;
    logger.log(`\u{1F4C2} Initializing ${dropdowns.length} dropdown(s)`);
    dropdowns.forEach(setupDropdown);
  }
  function cleanupDropdown() {
    cleanupFns.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        handleError(err, "Dropdown cleanup");
      }
    });
    cleanupFns.length = 0;
    initialized.clear();
  }
  var OPEN_CLASS, SELECTORS3, initialized, cleanupFns;
  var init_dropdown = __esm({
    "src/components/dropdown.js"() {
      init_helpers();
      init_logger();
      OPEN_CLASS = "open";
      SELECTORS3 = {
        dropdown: "[data-dropdown]",
        toggle: "[data-dropdown-toggle]",
        body: "[data-dropdown-body]"
      };
      initialized = /* @__PURE__ */ new Set();
      cleanupFns = [];
    }
  });

  // src/components/accordion.js
  function actuallyInitAccordion(accordion) {
    if (accordionInitialized.has(accordion))
      return;
    accordionInitialized.add(accordion);
    logger.log("\u{1F3B5} Accordion initializing...");
    try {
      let toggleItem = function(item, open) {
        if (!open && !collapsible) {
          const activeCount = accordion.querySelectorAll('[data-accordion="active"]').length;
          if (activeCount <= 1)
            return;
        }
        item.setAttribute("data-accordion", open ? "active" : "not-active");
        const toggle = item.querySelector("[data-accordion-toggle]");
        if (toggle) {
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }
        item.dispatchEvent(
          new CustomEvent("accordion:toggle", {
            detail: { open },
            bubbles: true
          })
        );
        if (closeSiblings && open) {
          accordion.querySelectorAll('[data-accordion="active"]').forEach((sib) => {
            if (sib !== item) {
              sib.setAttribute("data-accordion", "not-active");
              const sibToggle = sib.querySelector("[data-accordion-toggle]");
              if (sibToggle) {
                sibToggle.setAttribute("aria-expanded", "false");
              }
              sib.dispatchEvent(
                new CustomEvent("accordion:toggle", {
                  detail: { open: false },
                  bubbles: true
                })
              );
            }
          });
        }
      };
      const closeSiblings = accordion.getAttribute("data-accordion-close-siblings") === "true";
      const firstActive = accordion.getAttribute("data-accordion-first-active") === "true";
      const collapsible = accordion.getAttribute("data-accordion-collapsible") !== "false";
      const eventType = accordion.getAttribute("data-accordion-event") || "click";
      accordion.setAttribute("role", "region");
      if (!accordion.hasAttribute("aria-label")) {
        accordion.setAttribute("aria-label", "Accordion");
      }
      const items = accordion.querySelectorAll("[data-accordion]");
      items.forEach((item, index) => {
        const toggle = item.querySelector("[data-accordion-toggle]");
        const content = item.querySelector("[data-accordion-content]");
        if (toggle && content) {
          const contentId = content.id || `accordion-content-${Date.now()}-${index}`;
          const toggleId = toggle.id || `accordion-toggle-${Date.now()}-${index}`;
          content.id = contentId;
          toggle.id = toggleId;
          toggle.setAttribute("role", "button");
          toggle.setAttribute("aria-controls", contentId);
          toggle.setAttribute("aria-expanded", item.getAttribute("data-accordion") === "active");
          toggle.setAttribute("tabindex", "0");
          content.setAttribute("role", "region");
          content.setAttribute("aria-labelledby", toggleId);
        }
      });
      if (firstActive) {
        const first = accordion.querySelector("[data-accordion]");
        if (first) {
          first.setAttribute("data-accordion", "active");
          const toggle = first.querySelector("[data-accordion-toggle]");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "true");
          }
          first.dispatchEvent(
            new CustomEvent("accordion:toggle", {
              detail: { open: true },
              bubbles: true
            })
          );
        }
      }
      if (eventType === "hover") {
        accordion.querySelectorAll("[data-accordion-toggle]").forEach((toggle) => {
          const item = toggle.closest("[data-accordion]");
          if (!item)
            return;
          toggle.addEventListener("mouseenter", () => {
            toggleItem(item, true);
          });
        });
      } else {
        accordion.addEventListener("click", (e2) => {
          const toggle = e2.target.closest("[data-accordion-toggle]");
          if (!toggle)
            return;
          const item = toggle.closest("[data-accordion]");
          if (!item)
            return;
          const isActive = item.getAttribute("data-accordion") === "active";
          toggleItem(item, !isActive);
        });
        accordion.addEventListener("keydown", (e2) => {
          const toggle = e2.target.closest("[data-accordion-toggle]");
          if (!toggle)
            return;
          if (e2.key === "Enter" || e2.key === " ") {
            e2.preventDefault();
            const item = toggle.closest("[data-accordion]");
            if (!item)
              return;
            const isActive = item.getAttribute("data-accordion") === "active";
            toggleItem(item, !isActive);
          }
        });
      }
    } catch (error) {
      handleError(error, "Accordion Initialization");
    }
  }
  function initAccordionCSS() {
    const accordions = document.querySelectorAll('[data-accordion-list="css"]');
    if (!accordions.length)
      return;
    logger.log(`\u23F3 Found ${accordions.length} accordion(s) - will initialize when visible...`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const accordion = entry.target;
            observer.unobserve(accordion);
            accordion.setAttribute("data-accordion-observed", "true");
            actuallyInitAccordion(accordion);
          }
        });
      },
      {
        root: null,
        rootMargin: "100px",
        // Initialize 100px before accordion enters viewport
        threshold: 0
      }
    );
    accordions.forEach((accordion) => {
      observer.observe(accordion);
    });
  }
  var accordionInitialized;
  var init_accordion = __esm({
    "src/components/accordion.js"() {
      init_helpers();
      init_logger();
      accordionInitialized = /* @__PURE__ */ new Set();
    }
  });

  // src/pages/incubation.js
  var incubation_exports = {};
  __export(incubation_exports, {
    cleanupIncubationPage: () => cleanupIncubationPage,
    initIncubationPage: () => initIncubationPage
  });
  function getFieldValue(card, attr) {
    const direct = card.getAttribute(attr);
    if (direct != null && direct !== "")
      return direct;
    const el = card.querySelector(`[${attr}]`);
    return el ? el.textContent?.trim() ?? el.getAttribute(attr) ?? "" : "";
  }
  function getInvestmentCard(trigger) {
    return trigger.closest(TRIGGER_SELECTOR) || trigger;
  }
  function syncModalImage(modal, trigger) {
    const card = getInvestmentCard(trigger);
    const sourceImgEl = card.querySelector("[data-item-img]");
    const sourceImg = sourceImgEl?.tagName === "IMG" ? sourceImgEl : sourceImgEl?.querySelector("img");
    const srcAttr = sourceImg?.getAttribute("src")?.trim() ?? "";
    const hasImage = srcAttr !== "" && !sourceImg?.classList.contains("w-dyn-bind-empty");
    const content = modal.querySelector("[data-modal-content]");
    const modalLogoWrap = content?.querySelector("[data-item-img]");
    const modalImg = modalLogoWrap?.querySelector("img");
    if (!modalLogoWrap || !modalImg)
      return;
    if (hasImage) {
      modalImg.setAttribute("src", srcAttr);
      modalImg.removeAttribute("srcset");
      modalImg.alt = getFieldValue(card, "data-item-name") || "Company logo";
      const colorEffect = sourceImg.getAttribute("color-effect");
      if (colorEffect) {
        modalImg.setAttribute("color-effect", colorEffect);
      } else {
        modalImg.removeAttribute("color-effect");
      }
      modalLogoWrap.classList.remove("no-image");
    } else {
      modalImg.removeAttribute("src");
      modalImg.removeAttribute("srcset");
      modalImg.removeAttribute("color-effect");
      modalLogoWrap.classList.add("no-image");
    }
  }
  function updateField(modal, card, { trigger: attr, modal: selector, setter, hideLineWhenEmpty }) {
    const value = getFieldValue(card, attr);
    modal.querySelectorAll(selector).forEach((el) => {
      if (setter === "text") {
        el.textContent = value;
      } else if (setter === "href") {
        el.href = value || "#";
        el.toggleAttribute("aria-disabled", !value);
      }
      if (hideLineWhenEmpty) {
        const line = el.closest(`.${DETAIL_LINE_CLASS}`);
        if (line) {
          const isEmpty = !value || String(value).trim() === "";
          line.classList.toggle(EMPTY_CLASS, isEmpty);
        }
      }
    });
  }
  function updateWebsiteLinkVisibility(modal) {
    modal.querySelectorAll("[data-website-link]").forEach((el) => {
      const hasLink = el.href && el.href !== "#" && !el.hasAttribute("aria-disabled");
      el.classList.toggle(EMPTY_CLASS, !hasLink);
    });
  }
  function populateModal(modal, trigger) {
    const card = getInvestmentCard(trigger);
    FIELD_MAPPING.forEach((mapping) => updateField(modal, card, mapping));
    updateWebsiteLinkVisibility(modal);
    syncModalImage(modal, trigger);
  }
  function setupModal(modal) {
    modal.setAttribute("data-modal-name", INVESTMENT_MODAL_NAME);
    modal.setAttribute("data-modal-group-status", "not-active");
    modal.setAttribute("data-modal-close-outside", "");
    modal.setAttribute("data-modal-label", "Investment details");
    const contentWrap = modal.querySelector(CONTENT_WRAP_SELECTORS);
    if (contentWrap && !contentWrap.hasAttribute("data-modal-content")) {
      contentWrap.setAttribute("data-modal-content", "");
    }
    modal.querySelectorAll("[modal-close-btn]").forEach((btn) => {
      btn.setAttribute("data-modal-close", "");
    });
    const onOpen = (e2) => {
      const { trigger } = e2.detail || {};
      if (trigger)
        populateModal(modal, trigger);
    };
    modal.addEventListener("modal:open", onOpen);
    cleanupFns2.push(() => modal.removeEventListener("modal:open", onOpen));
  }
  function setupTriggers() {
    const cards = document.querySelectorAll(TRIGGER_SELECTOR);
    console.log(cards);
    cards.forEach((card) => {
      if (!card.hasAttribute("data-modal-target")) {
        card.setAttribute("data-modal-target", INVESTMENT_MODAL_NAME);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
      }
    });
    const onKeyDown = (e2) => {
      const card = e2.target.closest(TRIGGER_SELECTOR);
      if (!card || card.getAttribute("data-modal-target") !== INVESTMENT_MODAL_NAME)
        return;
      if (e2.key === "Enter" || e2.key === " ") {
        e2.preventDefault();
        card.click();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    cleanupFns2.push(() => document.removeEventListener("keydown", onKeyDown));
  }
  function setupFinsweetListClear() {
    if (typeof window === "undefined")
      return;
    const clearBtn = document.querySelector('[fs-list-element="clear"]');
    const radio = document.querySelector("#exited-radio");
    const updateClearState = () => {
      const isChecked = radio?.checked && radio.getAttribute("fs-list-field");
      if (isChecked) {
        clearBtn?.classList.remove("is-list-active");
      } else {
        clearBtn?.classList.add("is-list-active");
      }
    };
    window.FinsweetAttributes = window.FinsweetAttributes || [];
    window.FinsweetAttributes.push([
      "list",
      (listInstances) => {
        if (!listInstances?.length)
          return;
        const [listInstance] = listInstances;
        listInstance.addHook("filter", updateClearState);
        updateClearState();
      }
    ]);
  }
  async function initIncubationPage() {
    logger.log("\u{1F331} Incubation page initialized");
    try {
      const modal = document.querySelector(MODAL_SELECTOR);
      if (modal)
        setupModal(modal);
      setupTriggers();
      const riveCleanup = initRive({ onInteraction: false });
      if (typeof riveCleanup === "function")
        cleanupFunctions6.push(riveCleanup);
      setupFinsweetListClear();
      initDropdown();
      initModalBasic();
      initAccordionCSS();
      initTabs();
    } catch (error) {
      handleError(error, "Incubation Page Initialization");
    }
  }
  function cleanupIncubationPage() {
    cleanupDropdown();
    cleanupModalBasic();
    cleanupFns2.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        handleError(error, "Incubation Page Cleanup");
      }
    });
    cleanupFns2.length = 0;
    cleanupFunctions6.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Incubation Page Cleanup");
      }
    });
    cleanupFunctions6.length = 0;
  }
  var INVESTMENT_MODAL_NAME, TRIGGER_SELECTOR, MODAL_SELECTOR, CONTENT_WRAP_SELECTORS, DETAIL_LINE_CLASS, EMPTY_CLASS, FIELD_MAPPING, cleanupFunctions6, cleanupFns2;
  var init_incubation = __esm({
    "src/pages/incubation.js"() {
      init_helpers();
      init_logger();
      init_tabsComp1();
      init_modal_basic();
      init_dropdown();
      init_accordion();
      init_rive();
      INVESTMENT_MODAL_NAME = "investment-modal";
      TRIGGER_SELECTOR = "[data-investment-item]";
      MODAL_SELECTOR = `#${INVESTMENT_MODAL_NAME}, [data-modal-name="${INVESTMENT_MODAL_NAME}"]`;
      CONTENT_WRAP_SELECTORS = ".content.for-porf-modal, [data-modal-content]";
      DETAIL_LINE_CLASS = "porf-detail-line";
      EMPTY_CLASS = "is-empty";
      FIELD_MAPPING = [
        { trigger: "data-item-name", modal: "[data-item-name]", setter: "text" },
        { trigger: "data-item-description", modal: "[data-item-description]", setter: "text" },
        {
          trigger: "data-item-sector",
          modal: "[data-item-sector]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        {
          trigger: "data-investment-date",
          modal: "[data-investment-date]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        {
          trigger: "data-acquired-by",
          modal: "[data-acquired-by]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        { trigger: "data-website-link", modal: "[data-website-link]", setter: "href" }
      ];
      cleanupFunctions6 = [];
      cleanupFns2 = [];
    }
  });

  // src/pages/InvestmentApproach.js
  var InvestmentApproach_exports = {};
  __export(InvestmentApproach_exports, {
    cleanupInvestmentApproachPage: () => cleanupInvestmentApproachPage,
    initInvestmentApproachPage: () => initInvestmentApproachPage
  });
  function getFieldValue2(card, attr) {
    const direct = card.getAttribute(attr);
    if (direct != null && direct !== "")
      return direct;
    const el = card.querySelector(`[${attr}]`);
    return el ? el.textContent?.trim() ?? el.getAttribute(attr) ?? "" : "";
  }
  function getInvestmentCard2(trigger) {
    return trigger.closest(TRIGGER_SELECTOR2) || trigger;
  }
  function syncModalImage2(modal, trigger) {
    const card = getInvestmentCard2(trigger);
    const sourceImgEl = card.querySelector("[data-item-img]");
    const sourceImg = sourceImgEl?.tagName === "IMG" ? sourceImgEl : sourceImgEl?.querySelector("img");
    const srcAttr = sourceImg?.getAttribute("src")?.trim() ?? "";
    const hasImage = srcAttr !== "" && !sourceImg?.classList.contains("w-dyn-bind-empty");
    const content = modal.querySelector("[data-modal-content]");
    const modalLogoWrap = content?.querySelector("[data-item-img]");
    const modalImg = modalLogoWrap?.querySelector("img");
    if (!modalLogoWrap || !modalImg)
      return;
    if (hasImage) {
      modalImg.setAttribute("src", srcAttr);
      modalImg.removeAttribute("srcset");
      modalImg.alt = getFieldValue2(card, "data-item-name") || "Company logo";
      const colorEffect = sourceImg.getAttribute("color-effect");
      if (colorEffect) {
        modalImg.setAttribute("color-effect", colorEffect);
      } else {
        modalImg.removeAttribute("color-effect");
      }
      modalLogoWrap.classList.remove("no-image");
    } else {
      modalImg.removeAttribute("src");
      modalImg.removeAttribute("srcset");
      modalImg.removeAttribute("color-effect");
      modalLogoWrap.classList.add("no-image");
    }
  }
  function updateField2(modal, card, { trigger: attr, modal: selector, setter, hideLineWhenEmpty }) {
    const value = getFieldValue2(card, attr);
    modal.querySelectorAll(selector).forEach((el) => {
      if (setter === "text") {
        el.textContent = value;
      } else if (setter === "href") {
        el.href = value || "#";
        el.toggleAttribute("aria-disabled", !value);
      }
      if (hideLineWhenEmpty) {
        const line = el.closest(`.${DETAIL_LINE_CLASS2}`);
        if (line) {
          const isEmpty = !value || String(value).trim() === "";
          line.classList.toggle(EMPTY_CLASS2, isEmpty);
        }
      }
    });
  }
  function updateWebsiteLinkVisibility2(modal) {
    modal.querySelectorAll("[data-website-link]").forEach((el) => {
      const hasLink = el.href && el.href !== "#" && !el.hasAttribute("aria-disabled");
      el.classList.toggle(EMPTY_CLASS2, !hasLink);
    });
  }
  function populateModal2(modal, trigger) {
    const card = getInvestmentCard2(trigger);
    FIELD_MAPPING2.forEach((mapping) => updateField2(modal, card, mapping));
    updateWebsiteLinkVisibility2(modal);
    syncModalImage2(modal, trigger);
  }
  function setupModal2(modal) {
    modal.setAttribute("data-modal-name", INVESTMENT_MODAL_NAME2);
    modal.setAttribute("data-modal-group-status", "not-active");
    modal.setAttribute("data-modal-close-outside", "");
    modal.setAttribute("data-modal-label", "Investment details");
    const contentWrap = modal.querySelector(CONTENT_WRAP_SELECTORS2);
    if (contentWrap && !contentWrap.hasAttribute("data-modal-content")) {
      contentWrap.setAttribute("data-modal-content", "");
    }
    modal.querySelectorAll("[modal-close-btn]").forEach((btn) => {
      btn.setAttribute("data-modal-close", "");
    });
    const onOpen = (e2) => {
      const { trigger } = e2.detail || {};
      if (trigger)
        populateModal2(modal, trigger);
    };
    modal.addEventListener("modal:open", onOpen);
    cleanupFns3.push(() => modal.removeEventListener("modal:open", onOpen));
  }
  function setupTriggers2() {
    const cards = document.querySelectorAll(TRIGGER_SELECTOR2);
    cards.forEach((card) => {
      if (!card.hasAttribute("data-modal-target")) {
        card.setAttribute("data-modal-target", INVESTMENT_MODAL_NAME2);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
      }
    });
    const onKeyDown = (e2) => {
      const card = e2.target.closest(TRIGGER_SELECTOR2);
      if (!card || card.getAttribute("data-modal-target") !== INVESTMENT_MODAL_NAME2)
        return;
      if (e2.key === "Enter" || e2.key === " ") {
        e2.preventDefault();
        card.click();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    cleanupFns3.push(() => document.removeEventListener("keydown", onKeyDown));
  }
  async function initInvestmentApproachPage() {
    logger.log("\u{1F4CA} Investment Approach page initialized");
    try {
      const modal = document.querySelector(MODAL_SELECTOR2);
      if (modal)
        setupModal2(modal);
      setupTriggers2();
      const riveCleanup = initRive({ onInteraction: false });
      if (typeof riveCleanup === "function")
        cleanupFns3.push(riveCleanup);
      initDropdown();
      initModalBasic();
      initAccordionCSS();
      (() => {
        const sectorsDropdown = document.querySelector("#sectors-dropdown");
        const filtersBtns = sectorsDropdown.querySelectorAll(".filter-btn");
        const sectorsDropdownHead = sectorsDropdown.querySelector("[dropdown-head-text]");
        filtersBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            if (btn.textContent === "All") {
              sectorsDropdownHead.textContent = "Sectors";
            } else {
              sectorsDropdownHead.textContent = btn.textContent;
            }
          });
        });
      })();
    } catch (error) {
      handleError(error, "Investment Approach Page Initialization");
    }
  }
  function cleanupInvestmentApproachPage() {
    cleanupDropdown();
    cleanupModalBasic();
    cleanupFns3.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        handleError(error, "Investment Approach Page Cleanup");
      }
    });
    cleanupFns3.length = 0;
  }
  var INVESTMENT_MODAL_NAME2, TRIGGER_SELECTOR2, MODAL_SELECTOR2, CONTENT_WRAP_SELECTORS2, DETAIL_LINE_CLASS2, EMPTY_CLASS2, FIELD_MAPPING2, cleanupFns3;
  var init_InvestmentApproach = __esm({
    "src/pages/InvestmentApproach.js"() {
      init_helpers();
      init_logger();
      init_modal_basic();
      init_dropdown();
      init_accordion();
      init_rive();
      INVESTMENT_MODAL_NAME2 = "investment-modal";
      TRIGGER_SELECTOR2 = "[data-investment-item]";
      MODAL_SELECTOR2 = `#${INVESTMENT_MODAL_NAME2}, [data-modal-name="${INVESTMENT_MODAL_NAME2}"]`;
      CONTENT_WRAP_SELECTORS2 = ".content.for-porf-modal, [data-modal-content]";
      DETAIL_LINE_CLASS2 = "porf-detail-line";
      EMPTY_CLASS2 = "is-empty";
      FIELD_MAPPING2 = [
        { trigger: "data-item-name", modal: "[data-item-name]", setter: "text" },
        { trigger: "data-item-description", modal: "[data-item-description]", setter: "text" },
        {
          trigger: "data-item-sector",
          modal: "[data-item-sector]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        {
          trigger: "data-investment-date",
          modal: "[data-investment-date]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        {
          trigger: "data-acquired-by",
          modal: "[data-acquired-by]",
          setter: "text",
          hideLineWhenEmpty: true
        },
        { trigger: "data-website-link", modal: "[data-website-link]", setter: "href" }
      ];
      cleanupFns3 = [];
    }
  });

  // node_modules/.pnpm/@barba+core@2.10.3/node_modules/@barba/core/dist/barba.umd.js
  var require_barba_umd = __commonJS({
    "node_modules/.pnpm/@barba+core@2.10.3/node_modules/@barba/core/dist/barba.umd.js"(exports, module) {
      !function(t2, n) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t2 || self).barba = n();
      }(exports, function() {
        function t2(t3, n2) {
          for (var r2 = 0; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t3, "symbol" == typeof (e3 = function(t4, n3) {
              if ("object" != typeof t4 || null === t4)
                return t4;
              var r3 = t4[Symbol.toPrimitive];
              if (void 0 !== r3) {
                var i3 = r3.call(t4, "string");
                if ("object" != typeof i3)
                  return i3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return String(t4);
            }(i2.key)) ? e3 : String(e3), i2);
          }
          var e3;
        }
        function n(n2, r2, i2) {
          return r2 && t2(n2.prototype, r2), i2 && t2(n2, i2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
        }
        function r() {
          return r = Object.assign ? Object.assign.bind() : function(t3) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var r2 = arguments[n2];
              for (var i2 in r2)
                Object.prototype.hasOwnProperty.call(r2, i2) && (t3[i2] = r2[i2]);
            }
            return t3;
          }, r.apply(this, arguments);
        }
        function i(t3, n2) {
          t3.prototype = Object.create(n2.prototype), t3.prototype.constructor = t3, o(t3, n2);
        }
        function e2(t3) {
          return e2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t4) {
            return t4.__proto__ || Object.getPrototypeOf(t4);
          }, e2(t3);
        }
        function o(t3, n2) {
          return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t4, n3) {
            return t4.__proto__ = n3, t4;
          }, o(t3, n2);
        }
        function u() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if ("function" == typeof Proxy)
            return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (t3) {
            return false;
          }
        }
        function s(t3, n2, r2) {
          return s = u() ? Reflect.construct.bind() : function(t4, n3, r3) {
            var i2 = [null];
            i2.push.apply(i2, n3);
            var e3 = new (Function.bind.apply(t4, i2))();
            return r3 && o(e3, r3.prototype), e3;
          }, s.apply(null, arguments);
        }
        function f(t3) {
          var n2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return f = function(t4) {
            if (null === t4 || -1 === Function.toString.call(t4).indexOf("[native code]"))
              return t4;
            if ("function" != typeof t4)
              throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== n2) {
              if (n2.has(t4))
                return n2.get(t4);
              n2.set(t4, r2);
            }
            function r2() {
              return s(t4, arguments, e2(this).constructor);
            }
            return r2.prototype = Object.create(t4.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }), o(r2, t4);
          }, f(t3);
        }
        function c(t3) {
          if (void 0 === t3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        var a, h = function() {
          this.before = void 0, this.beforeLeave = void 0, this.leave = void 0, this.afterLeave = void 0, this.beforeEnter = void 0, this.enter = void 0, this.afterEnter = void 0, this.after = void 0;
        };
        !function(t3) {
          t3[t3.off = 0] = "off", t3[t3.error = 1] = "error", t3[t3.warning = 2] = "warning", t3[t3.info = 3] = "info", t3[t3.debug = 4] = "debug";
        }(a || (a = {}));
        var v = a.off, d = /* @__PURE__ */ function() {
          function t3(t4) {
            this.t = void 0, this.t = t4;
          }
          t3.getLevel = function() {
            return v;
          }, t3.setLevel = function(t4) {
            return v = a[t4];
          };
          var n2 = t3.prototype;
          return n2.error = function() {
            this.i(console.error, a.error, [].slice.call(arguments));
          }, n2.warn = function() {
            this.i(console.warn, a.warning, [].slice.call(arguments));
          }, n2.info = function() {
            this.i(console.info, a.info, [].slice.call(arguments));
          }, n2.debug = function() {
            this.i(console.log, a.debug, [].slice.call(arguments));
          }, n2.i = function(n3, r2, i2) {
            r2 <= t3.getLevel() && n3.apply(console, ["[" + this.t + "] "].concat(i2));
          }, t3;
        }();
        function l(t3) {
          return t3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function p(t3) {
          return t3 && t3.sensitive ? "" : "i";
        }
        var m = { container: "container", history: "history", namespace: "namespace", prefix: "data-barba", prevent: "prevent", wrapper: "wrapper" }, w = /* @__PURE__ */ function() {
          function t3() {
            this.o = m, this.u = void 0, this.h = { after: null, before: null, parent: null };
          }
          var n2 = t3.prototype;
          return n2.toString = function(t4) {
            return t4.outerHTML;
          }, n2.toDocument = function(t4) {
            return this.u || (this.u = new DOMParser()), this.u.parseFromString(t4, "text/html");
          }, n2.toElement = function(t4) {
            var n3 = document.createElement("div");
            return n3.innerHTML = t4, n3;
          }, n2.getHtml = function(t4) {
            return void 0 === t4 && (t4 = document), this.toString(t4.documentElement);
          }, n2.getWrapper = function(t4) {
            return void 0 === t4 && (t4 = document), t4.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
          }, n2.getContainer = function(t4) {
            return void 0 === t4 && (t4 = document), t4.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
          }, n2.removeContainer = function(t4) {
            document.body.contains(t4) && (this.v(t4), t4.parentNode.removeChild(t4));
          }, n2.addContainer = function(t4, n3) {
            var r2 = this.getContainer() || this.h.before;
            r2 ? this.l(t4, r2) : this.h.after ? this.h.after.parentNode.insertBefore(t4, this.h.after) : this.h.parent ? this.h.parent.appendChild(t4) : n3.appendChild(t4);
          }, n2.getSibling = function() {
            return this.h;
          }, n2.getNamespace = function(t4) {
            void 0 === t4 && (t4 = document);
            var n3 = t4.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return n3 ? n3.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
          }, n2.getHref = function(t4) {
            if (t4.tagName && "a" === t4.tagName.toLowerCase()) {
              if ("string" == typeof t4.href)
                return t4.href;
              var n3 = t4.getAttribute("href") || t4.getAttribute("xlink:href");
              if (n3)
                return this.resolveUrl(n3.baseVal || n3);
            }
            return null;
          }, n2.resolveUrl = function() {
            var t4 = [].slice.call(arguments).length;
            if (0 === t4)
              throw new Error("resolveUrl requires at least one argument; got none.");
            var n3 = document.createElement("base");
            if (n3.href = arguments[0], 1 === t4)
              return n3.href;
            var r2 = document.getElementsByTagName("head")[0];
            r2.insertBefore(n3, r2.firstChild);
            for (var i2, e3 = document.createElement("a"), o2 = 1; o2 < t4; o2++)
              e3.href = arguments[o2], n3.href = i2 = e3.href;
            return r2.removeChild(n3), i2;
          }, n2.l = function(t4, n3) {
            n3.parentNode.insertBefore(t4, n3.nextSibling);
          }, n2.v = function(t4) {
            return this.h = { after: t4.nextElementSibling, before: t4.previousElementSibling, parent: t4.parentElement }, this.h;
          }, t3;
        }(), b = new w(), y = /* @__PURE__ */ function() {
          function t3() {
            this.p = void 0, this.m = [], this.P = -1;
          }
          var i2 = t3.prototype;
          return i2.init = function(t4, n2) {
            this.p = "barba";
            var r2 = { data: {}, ns: n2, scroll: { x: window.scrollX, y: window.scrollY }, url: t4 };
            this.P = 0, this.m.push(r2);
            var i3 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history && window.history.replaceState(i3, "", t4);
          }, i2.change = function(t4, n2, r2) {
            if (r2 && r2.state) {
              var i3 = r2.state, e3 = i3.index;
              n2 = this.g(this.P - e3), this.replace(i3.states), this.P = e3;
            } else
              this.add(t4, n2);
            return n2;
          }, i2.add = function(t4, n2, r2, i3) {
            var e3 = null != r2 ? r2 : this.R(n2), o2 = { data: null != i3 ? i3 : {}, ns: "tmp", scroll: { x: window.scrollX, y: window.scrollY }, url: t4 };
            switch (e3) {
              case "push":
                this.P = this.size, this.m.push(o2);
                break;
              case "replace":
                this.set(this.P, o2);
            }
            var u2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            switch (e3) {
              case "push":
                window.history && window.history.pushState(u2, "", t4);
                break;
              case "replace":
                window.history && window.history.replaceState(u2, "", t4);
            }
          }, i2.store = function(t4, n2) {
            var i3 = n2 || this.P, e3 = this.get(i3);
            e3.data = r({}, e3.data, t4), this.set(i3, e3);
            var o2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history.replaceState(o2, "");
          }, i2.update = function(t4, n2) {
            var i3 = n2 || this.P, e3 = r({}, this.get(i3), t4);
            this.set(i3, e3);
          }, i2.remove = function(t4) {
            t4 ? this.m.splice(t4, 1) : this.m.pop(), this.P--;
          }, i2.clear = function() {
            this.m = [], this.P = -1;
          }, i2.replace = function(t4) {
            this.m = t4;
          }, i2.get = function(t4) {
            return this.m[t4];
          }, i2.set = function(t4, n2) {
            return this.m[t4] = n2;
          }, i2.R = function(t4) {
            var n2 = "push", r2 = t4, i3 = m.prefix + "-" + m.history;
            return r2.hasAttribute && r2.hasAttribute(i3) && (n2 = r2.getAttribute(i3)), n2;
          }, i2.g = function(t4) {
            return Math.abs(t4) > 1 ? t4 > 0 ? "forward" : "back" : 0 === t4 ? "popstate" : t4 > 0 ? "back" : "forward";
          }, n(t3, [{ key: "current", get: function() {
            return this.m[this.P];
          } }, { key: "previous", get: function() {
            return this.P < 1 ? null : this.m[this.P - 1];
          } }, { key: "size", get: function() {
            return this.m.length;
          } }]), t3;
        }(), P = new y(), g = function(t3, n2) {
          try {
            var r2 = function() {
              if (!n2.next.html)
                return Promise.resolve(t3).then(function(t4) {
                  var r3 = n2.next;
                  if (t4) {
                    var i2 = b.toElement(t4.html);
                    r3.namespace = b.getNamespace(i2), r3.container = b.getContainer(i2), r3.url = t4.url, r3.html = t4.html, P.update({ ns: r3.namespace });
                    var e3 = b.toDocument(t4.html);
                    document.title = e3.title;
                  }
                });
            }();
            return Promise.resolve(r2 && r2.then ? r2.then(function() {
            }) : void 0);
          } catch (t4) {
            return Promise.reject(t4);
          }
        }, E = function t3(n2, r2, i2) {
          return n2 instanceof RegExp ? function(t4, n3) {
            if (!n3)
              return t4;
            for (var r3 = /\((?:\?<(.*?)>)?(?!\?)/g, i3 = 0, e3 = r3.exec(t4.source); e3; )
              n3.push({ name: e3[1] || i3++, prefix: "", suffix: "", modifier: "", pattern: "" }), e3 = r3.exec(t4.source);
            return t4;
          }(n2, r2) : Array.isArray(n2) ? function(n3, r3, i3) {
            var e3 = n3.map(function(n4) {
              return t3(n4, r3, i3).source;
            });
            return new RegExp("(?:".concat(e3.join("|"), ")"), p(i3));
          }(n2, r2, i2) : function(t4, n3, r3) {
            return function(t5, n4, r4) {
              void 0 === r4 && (r4 = {});
              for (var i3 = r4.strict, e3 = void 0 !== i3 && i3, o2 = r4.start, u2 = void 0 === o2 || o2, s2 = r4.end, f2 = void 0 === s2 || s2, c2 = r4.encode, a2 = void 0 === c2 ? function(t6) {
                return t6;
              } : c2, h2 = r4.delimiter, v2 = void 0 === h2 ? "/#?" : h2, d2 = r4.endsWith, m2 = "[".concat(l(void 0 === d2 ? "" : d2), "]|$"), w2 = "[".concat(l(v2), "]"), b2 = u2 ? "^" : "", y2 = 0, P2 = t5; y2 < P2.length; y2++) {
                var g2 = P2[y2];
                if ("string" == typeof g2)
                  b2 += l(a2(g2));
                else {
                  var E2 = l(a2(g2.prefix)), x2 = l(a2(g2.suffix));
                  if (g2.pattern)
                    if (n4 && n4.push(g2), E2 || x2)
                      if ("+" === g2.modifier || "*" === g2.modifier) {
                        var R2 = "*" === g2.modifier ? "?" : "";
                        b2 += "(?:".concat(E2, "((?:").concat(g2.pattern, ")(?:").concat(x2).concat(E2, "(?:").concat(g2.pattern, "))*)").concat(x2, ")").concat(R2);
                      } else
                        b2 += "(?:".concat(E2, "(").concat(g2.pattern, ")").concat(x2, ")").concat(g2.modifier);
                    else
                      b2 += "+" === g2.modifier || "*" === g2.modifier ? "((?:".concat(g2.pattern, ")").concat(g2.modifier, ")") : "(".concat(g2.pattern, ")").concat(g2.modifier);
                  else
                    b2 += "(?:".concat(E2).concat(x2, ")").concat(g2.modifier);
                }
              }
              if (f2)
                e3 || (b2 += "".concat(w2, "?")), b2 += r4.endsWith ? "(?=".concat(m2, ")") : "$";
              else {
                var k2 = t5[t5.length - 1], O2 = "string" == typeof k2 ? w2.indexOf(k2[k2.length - 1]) > -1 : void 0 === k2;
                e3 || (b2 += "(?:".concat(w2, "(?=").concat(m2, "))?")), O2 || (b2 += "(?=".concat(w2, "|").concat(m2, ")"));
              }
              return new RegExp(b2, p(r4));
            }(function(t5, n4) {
              void 0 === n4 && (n4 = {});
              for (var r4 = function(t6) {
                for (var n5 = [], r5 = 0; r5 < t6.length; ) {
                  var i4 = t6[r5];
                  if ("*" !== i4 && "+" !== i4 && "?" !== i4)
                    if ("\\" !== i4)
                      if ("{" !== i4)
                        if ("}" !== i4)
                          if (":" !== i4)
                            if ("(" !== i4)
                              n5.push({ type: "CHAR", index: r5, value: t6[r5++] });
                            else {
                              var e4 = 1, o3 = "";
                              if ("?" === t6[s3 = r5 + 1])
                                throw new TypeError('Pattern cannot start with "?" at '.concat(s3));
                              for (; s3 < t6.length; )
                                if ("\\" !== t6[s3]) {
                                  if (")" === t6[s3]) {
                                    if (0 == --e4) {
                                      s3++;
                                      break;
                                    }
                                  } else if ("(" === t6[s3] && (e4++, "?" !== t6[s3 + 1]))
                                    throw new TypeError("Capturing groups are not allowed at ".concat(s3));
                                  o3 += t6[s3++];
                                } else
                                  o3 += t6[s3++] + t6[s3++];
                              if (e4)
                                throw new TypeError("Unbalanced pattern at ".concat(r5));
                              if (!o3)
                                throw new TypeError("Missing pattern at ".concat(r5));
                              n5.push({ type: "PATTERN", index: r5, value: o3 }), r5 = s3;
                            }
                          else {
                            for (var u3 = "", s3 = r5 + 1; s3 < t6.length; ) {
                              var f3 = t6.charCodeAt(s3);
                              if (!(f3 >= 48 && f3 <= 57 || f3 >= 65 && f3 <= 90 || f3 >= 97 && f3 <= 122 || 95 === f3))
                                break;
                              u3 += t6[s3++];
                            }
                            if (!u3)
                              throw new TypeError("Missing parameter name at ".concat(r5));
                            n5.push({ type: "NAME", index: r5, value: u3 }), r5 = s3;
                          }
                        else
                          n5.push({ type: "CLOSE", index: r5, value: t6[r5++] });
                      else
                        n5.push({ type: "OPEN", index: r5, value: t6[r5++] });
                    else
                      n5.push({ type: "ESCAPED_CHAR", index: r5++, value: t6[r5++] });
                  else
                    n5.push({ type: "MODIFIER", index: r5, value: t6[r5++] });
                }
                return n5.push({ type: "END", index: r5, value: "" }), n5;
              }(t5), i3 = n4.prefixes, e3 = void 0 === i3 ? "./" : i3, o2 = "[^".concat(l(n4.delimiter || "/#?"), "]+?"), u2 = [], s2 = 0, f2 = 0, c2 = "", a2 = function(t6) {
                if (f2 < r4.length && r4[f2].type === t6)
                  return r4[f2++].value;
              }, h2 = function(t6) {
                var n5 = a2(t6);
                if (void 0 !== n5)
                  return n5;
                var i4 = r4[f2], e4 = i4.index;
                throw new TypeError("Unexpected ".concat(i4.type, " at ").concat(e4, ", expected ").concat(t6));
              }, v2 = function() {
                for (var t6, n5 = ""; t6 = a2("CHAR") || a2("ESCAPED_CHAR"); )
                  n5 += t6;
                return n5;
              }; f2 < r4.length; ) {
                var d2 = a2("CHAR"), p2 = a2("NAME"), m2 = a2("PATTERN");
                if (p2 || m2)
                  -1 === e3.indexOf(b2 = d2 || "") && (c2 += b2, b2 = ""), c2 && (u2.push(c2), c2 = ""), u2.push({ name: p2 || s2++, prefix: b2, suffix: "", pattern: m2 || o2, modifier: a2("MODIFIER") || "" });
                else {
                  var w2 = d2 || a2("ESCAPED_CHAR");
                  if (w2)
                    c2 += w2;
                  else if (c2 && (u2.push(c2), c2 = ""), a2("OPEN")) {
                    var b2 = v2(), y2 = a2("NAME") || "", P2 = a2("PATTERN") || "", g2 = v2();
                    h2("CLOSE"), u2.push({ name: y2 || (P2 ? s2++ : ""), pattern: y2 && !P2 ? o2 : P2, prefix: b2, suffix: g2, modifier: a2("MODIFIER") || "" });
                  } else
                    h2("END");
                }
              }
              return u2;
            }(t4, r3), n3, r3);
          }(n2, r2, i2);
        }, x = { __proto__: null, update: g, nextTick: function() {
          return new Promise(function(t3) {
            window.requestAnimationFrame(t3);
          });
        }, pathToRegexp: E }, R = function() {
          return window.location.origin;
        }, k = function(t3) {
          return void 0 === t3 && (t3 = window.location.href), O(t3).port;
        }, O = function(t3) {
          var n2, r2 = t3.match(/:\d+/);
          if (null === r2)
            /^http/.test(t3) && (n2 = 80), /^https/.test(t3) && (n2 = 443);
          else {
            var i2 = r2[0].substring(1);
            n2 = parseInt(i2, 10);
          }
          var e3, o2 = t3.replace(R(), ""), u2 = {}, s2 = o2.indexOf("#");
          s2 >= 0 && (e3 = o2.slice(s2 + 1), o2 = o2.slice(0, s2));
          var f2 = o2.indexOf("?");
          return f2 >= 0 && (u2 = T(o2.slice(f2 + 1)), o2 = o2.slice(0, f2)), { hash: e3, path: o2, port: n2, query: u2 };
        }, T = function(t3) {
          return t3.split("&").reduce(function(t4, n2) {
            var r2 = n2.split("=");
            return t4[r2[0]] = r2[1], t4;
          }, {});
        }, A = function(t3) {
          return void 0 === t3 && (t3 = window.location.href), t3.replace(/(\/#.*|\/|#.*)$/, "");
        }, j = { __proto__: null, getHref: function() {
          return window.location.href;
        }, getAbsoluteHref: function(t3, n2) {
          return void 0 === n2 && (n2 = document.baseURI), new URL(t3, n2).href;
        }, getOrigin: R, getPort: k, getPath: function(t3) {
          return void 0 === t3 && (t3 = window.location.href), O(t3).path;
        }, getQuery: function(t3, n2) {
          return void 0 === n2 && (n2 = false), n2 ? JSON.stringify(O(t3).query) : O(t3).query;
        }, getHash: function(t3) {
          return O(t3).hash;
        }, parse: O, parseQuery: T, clean: A };
        function M(t3, n2, i2, e3, o2) {
          return void 0 === n2 && (n2 = 2e3), new Promise(function(u2, s2) {
            var f2 = new XMLHttpRequest();
            f2.onreadystatechange = function() {
              if (f2.readyState === XMLHttpRequest.DONE) {
                if (200 === f2.status) {
                  var n3 = "" !== f2.responseURL && f2.responseURL !== t3 ? f2.responseURL : t3;
                  u2({ html: f2.responseText, url: r({ href: n3 }, O(n3)) }), e3.update(t3, { status: "fulfilled", target: n3 });
                } else if (f2.status) {
                  var o3 = { status: f2.status, statusText: f2.statusText };
                  i2(t3, o3), s2(o3), e3.update(t3, { status: "rejected" });
                }
              }
            }, f2.ontimeout = function() {
              var r2 = new Error("Timeout error [" + n2 + "]");
              i2(t3, r2), s2(r2), e3.update(t3, { status: "rejected" });
            }, f2.onerror = function() {
              var n3 = new Error("Fetch error");
              i2(t3, n3), s2(n3), e3.update(t3, { status: "rejected" });
            }, f2.open("GET", t3), f2.timeout = n2, f2.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), f2.setRequestHeader("x-barba", "yes"), o2.all().forEach(function(t4, n3) {
              f2.setRequestHeader(n3, t4);
            }), f2.send();
          });
        }
        function N(t3) {
          return !!t3 && ("object" == typeof t3 || "function" == typeof t3) && "function" == typeof t3.then;
        }
        function S(t3, n2) {
          return void 0 === n2 && (n2 = {}), function() {
            var r2 = arguments, i2 = false, e3 = new Promise(function(e4, o2) {
              n2.async = function() {
                return i2 = true, function(t4, n3) {
                  t4 ? o2(t4) : e4(n3);
                };
              };
              var u2 = t3.apply(n2, [].slice.call(r2));
              i2 || (N(u2) ? u2.then(e4, o2) : e4(u2));
            });
            return e3;
          };
        }
        var C = /* @__PURE__ */ function(t3) {
          function n2() {
            var n3;
            return (n3 = t3.call(this) || this).logger = new d("@barba/core"), n3.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], n3.registered = /* @__PURE__ */ new Map(), n3.init(), n3;
          }
          i(n2, t3);
          var r2 = n2.prototype;
          return r2.init = function() {
            var t4 = this;
            this.registered.clear(), this.all.forEach(function(n3) {
              t4[n3] || (t4[n3] = function(r3, i2) {
                t4.registered.has(n3) || t4.registered.set(n3, /* @__PURE__ */ new Set()), t4.registered.get(n3).add({ ctx: i2 || {}, fn: r3 });
              });
            });
          }, r2.do = function(t4) {
            var n3 = arguments, r3 = this;
            if (this.registered.has(t4)) {
              var i2 = Promise.resolve();
              return this.registered.get(t4).forEach(function(t5) {
                i2 = i2.then(function() {
                  return S(t5.fn, t5.ctx).apply(void 0, [].slice.call(n3, 1));
                });
              }), i2.catch(function(n4) {
                r3.logger.debug("Hook error [" + t4 + "]"), r3.logger.error(n4);
              });
            }
            return Promise.resolve();
          }, r2.clear = function() {
            var t4 = this;
            this.all.forEach(function(n3) {
              delete t4[n3];
            }), this.init();
          }, r2.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var t4 = [];
            this.registered.forEach(function(n3, r3) {
              return t4.push(r3);
            }), this.logger.info("Registered hooks: " + t4.join(","));
          }, n2;
        }(h), L = new C(), H = /* @__PURE__ */ function() {
          function t3(t4) {
            if (this.k = void 0, this.O = [], "boolean" == typeof t4)
              this.k = t4;
            else {
              var n2 = Array.isArray(t4) ? t4 : [t4];
              this.O = n2.map(function(t5) {
                return E(t5);
              });
            }
          }
          return t3.prototype.checkHref = function(t4) {
            if ("boolean" == typeof this.k)
              return this.k;
            var n2 = O(t4).path;
            return this.O.some(function(t5) {
              return null !== t5.exec(n2);
            });
          }, t3;
        }(), _ = /* @__PURE__ */ function(t3) {
          function n2(n3) {
            var r2;
            return (r2 = t3.call(this, n3) || this).T = /* @__PURE__ */ new Map(), r2;
          }
          i(n2, t3);
          var e3 = n2.prototype;
          return e3.set = function(t4, n3, r2, i2, e4) {
            return this.T.set(t4, { action: r2, request: n3, status: i2, target: null != e4 ? e4 : t4 }), { action: r2, request: n3, status: i2, target: e4 };
          }, e3.get = function(t4) {
            return this.T.get(t4);
          }, e3.getRequest = function(t4) {
            return this.T.get(t4).request;
          }, e3.getAction = function(t4) {
            return this.T.get(t4).action;
          }, e3.getStatus = function(t4) {
            return this.T.get(t4).status;
          }, e3.getTarget = function(t4) {
            return this.T.get(t4).target;
          }, e3.has = function(t4) {
            return !this.checkHref(t4) && this.T.has(t4);
          }, e3.delete = function(t4) {
            return this.T.delete(t4);
          }, e3.update = function(t4, n3) {
            var i2 = r({}, this.T.get(t4), n3);
            return this.T.set(t4, i2), i2;
          }, n2;
        }(H), D = /* @__PURE__ */ function() {
          function t3() {
            this.A = /* @__PURE__ */ new Map();
          }
          var n2 = t3.prototype;
          return n2.set = function(t4, n3) {
            return this.A.set(t4, n3), { name: n3 };
          }, n2.get = function(t4) {
            return this.A.get(t4);
          }, n2.all = function() {
            return this.A;
          }, n2.has = function(t4) {
            return this.A.has(t4);
          }, n2.delete = function(t4) {
            return this.A.delete(t4);
          }, n2.clear = function() {
            return this.A.clear();
          }, t3;
        }(), B = function() {
          return !window.history.pushState;
        }, q = function(t3) {
          return !t3.el || !t3.href;
        }, F = function(t3) {
          var n2 = t3.event;
          return n2.which > 1 || n2.metaKey || n2.ctrlKey || n2.shiftKey || n2.altKey;
        }, I = function(t3) {
          var n2 = t3.el;
          return n2.hasAttribute("target") && "_blank" === n2.target;
        }, U = function(t3) {
          var n2 = t3.el;
          return void 0 !== n2.protocol && window.location.protocol !== n2.protocol || void 0 !== n2.hostname && window.location.hostname !== n2.hostname;
        }, $ = function(t3) {
          var n2 = t3.el;
          return void 0 !== n2.port && k() !== k(n2.href);
        }, Q = function(t3) {
          var n2 = t3.el;
          return n2.getAttribute && "string" == typeof n2.getAttribute("download");
        }, X = function(t3) {
          return t3.el.hasAttribute(m.prefix + "-" + m.prevent);
        }, z = function(t3) {
          return Boolean(t3.el.closest("[" + m.prefix + "-" + m.prevent + '="all"]'));
        }, G = function(t3) {
          var n2 = t3.href;
          return A(n2) === A() && k(n2) === k();
        }, J = /* @__PURE__ */ function(t3) {
          function n2(n3) {
            var r3;
            return (r3 = t3.call(this, n3) || this).suite = [], r3.tests = /* @__PURE__ */ new Map(), r3.init(), r3;
          }
          i(n2, t3);
          var r2 = n2.prototype;
          return r2.init = function() {
            this.add("pushState", B), this.add("exists", q), this.add("newTab", F), this.add("blank", I), this.add("corsDomain", U), this.add("corsPort", $), this.add("download", Q), this.add("preventSelf", X), this.add("preventAll", z), this.add("sameUrl", G, false);
          }, r2.add = function(t4, n3, r3) {
            void 0 === r3 && (r3 = true), this.tests.set(t4, n3), r3 && this.suite.push(t4);
          }, r2.run = function(t4, n3, r3, i2) {
            return this.tests.get(t4)({ el: n3, event: r3, href: i2 });
          }, r2.checkLink = function(t4, n3, r3) {
            var i2 = this;
            return this.suite.some(function(e3) {
              return i2.run(e3, t4, n3, r3);
            });
          }, n2;
        }(H), W = /* @__PURE__ */ function(t3) {
          function n2(r2, i2) {
            var e3;
            return void 0 === i2 && (i2 = "Barba error"), (e3 = t3.call.apply(t3, [this].concat([].slice.call(arguments, 2))) || this).error = void 0, e3.label = void 0, e3.error = r2, e3.label = i2, Error.captureStackTrace && Error.captureStackTrace(c(e3), n2), e3.name = "BarbaError", e3;
          }
          return i(n2, t3), n2;
        }(/* @__PURE__ */ f(Error)), K = /* @__PURE__ */ function() {
          function t3(t4) {
            void 0 === t4 && (t4 = []), this.logger = new d("@barba/core"), this.all = [], this.page = [], this.once = [], this.j = [{ name: "namespace", type: "strings" }, { name: "custom", type: "function" }], t4 && (this.all = this.all.concat(t4)), this.update();
          }
          var n2 = t3.prototype;
          return n2.add = function(t4, n3) {
            "rule" === t4 ? this.j.splice(n3.position || 0, 0, n3.value) : this.all.push(n3), this.update();
          }, n2.resolve = function(t4, n3) {
            var r2 = this;
            void 0 === n3 && (n3 = {});
            var i2 = n3.once ? this.once : this.page;
            i2 = i2.filter(n3.self ? function(t5) {
              return t5.name && "self" === t5.name;
            } : function(t5) {
              return !t5.name || "self" !== t5.name;
            });
            var e3 = /* @__PURE__ */ new Map(), o2 = i2.find(function(i3) {
              var o3 = true, u3 = {};
              return n3.self && "self" === i3.name ? (e3.set(i3, u3), true) : (r2.j.reverse().forEach(function(n4) {
                o3 && (o3 = r2.M(i3, n4, t4, u3), i3.from && i3.to && (o3 = r2.M(i3, n4, t4, u3, "from") && r2.M(i3, n4, t4, u3, "to")), i3.from && !i3.to && (o3 = r2.M(i3, n4, t4, u3, "from")), !i3.from && i3.to && (o3 = r2.M(i3, n4, t4, u3, "to")));
              }), e3.set(i3, u3), o3);
            }), u2 = e3.get(o2), s2 = [];
            if (s2.push(n3.once ? "once" : "page"), n3.self && s2.push("self"), u2) {
              var f2, c2 = [o2];
              Object.keys(u2).length > 0 && c2.push(u2), (f2 = this.logger).info.apply(f2, ["Transition found [" + s2.join(",") + "]"].concat(c2));
            } else
              this.logger.info("No transition found [" + s2.join(",") + "]");
            return o2;
          }, n2.update = function() {
            var t4 = this;
            this.all = this.all.map(function(n3) {
              return t4.N(n3);
            }).sort(function(t5, n3) {
              return t5.priority - n3.priority;
            }).reverse().map(function(t5) {
              return delete t5.priority, t5;
            }), this.page = this.all.filter(function(t5) {
              return void 0 !== t5.leave || void 0 !== t5.enter;
            }), this.once = this.all.filter(function(t5) {
              return void 0 !== t5.once;
            });
          }, n2.M = function(t4, n3, r2, i2, e3) {
            var o2 = true, u2 = false, s2 = t4, f2 = n3.name, c2 = f2, a2 = f2, h2 = f2, v2 = e3 ? s2[e3] : s2, d2 = "to" === e3 ? r2.next : r2.current;
            if (e3 ? v2 && v2[f2] : v2[f2]) {
              switch (n3.type) {
                case "strings":
                default:
                  var l2 = Array.isArray(v2[c2]) ? v2[c2] : [v2[c2]];
                  d2[c2] && -1 !== l2.indexOf(d2[c2]) && (u2 = true), -1 === l2.indexOf(d2[c2]) && (o2 = false);
                  break;
                case "object":
                  var p2 = Array.isArray(v2[a2]) ? v2[a2] : [v2[a2]];
                  d2[a2] ? (d2[a2].name && -1 !== p2.indexOf(d2[a2].name) && (u2 = true), -1 === p2.indexOf(d2[a2].name) && (o2 = false)) : o2 = false;
                  break;
                case "function":
                  v2[h2](r2) ? u2 = true : o2 = false;
              }
              u2 && (e3 ? (i2[e3] = i2[e3] || {}, i2[e3][f2] = s2[e3][f2]) : i2[f2] = s2[f2]);
            }
            return o2;
          }, n2.S = function(t4, n3, r2) {
            var i2 = 0;
            return (t4[n3] || t4.from && t4.from[n3] || t4.to && t4.to[n3]) && (i2 += Math.pow(10, r2), t4.from && t4.from[n3] && (i2 += 1), t4.to && t4.to[n3] && (i2 += 2)), i2;
          }, n2.N = function(t4) {
            var n3 = this;
            t4.priority = 0;
            var r2 = 0;
            return this.j.forEach(function(i2, e3) {
              r2 += n3.S(t4, i2.name, e3 + 1);
            }), t4.priority = r2, t4;
          }, t3;
        }();
        function V(t3, n2) {
          try {
            var r2 = t3();
          } catch (t4) {
            return n2(t4);
          }
          return r2 && r2.then ? r2.then(void 0, n2) : r2;
        }
        var Y = /* @__PURE__ */ function() {
          function t3(t4) {
            void 0 === t4 && (t4 = []), this.logger = new d("@barba/core"), this.store = void 0, this.C = false, this.store = new K(t4);
          }
          var r2 = t3.prototype;
          return r2.get = function(t4, n2) {
            return this.store.resolve(t4, n2);
          }, r2.doOnce = function(t4) {
            var n2 = t4.data, r3 = t4.transition;
            try {
              var i2 = function() {
                e3.C = false;
              }, e3 = this, o2 = r3 || {};
              e3.C = true;
              var u2 = V(function() {
                return Promise.resolve(e3.L("beforeOnce", n2, o2)).then(function() {
                  return Promise.resolve(e3.once(n2, o2)).then(function() {
                    return Promise.resolve(e3.L("afterOnce", n2, o2)).then(function() {
                    });
                  });
                });
              }, function(t5) {
                e3.C = false, e3.logger.debug("Transition error [before/after/once]"), e3.logger.error(t5);
              });
              return Promise.resolve(u2 && u2.then ? u2.then(i2) : i2());
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.doPage = function(t4) {
            var n2 = t4.data, r3 = t4.transition, i2 = t4.page, e3 = t4.wrapper;
            try {
              var o2 = function(t5) {
                u2.C = false;
              }, u2 = this, s2 = r3 || {}, f2 = true === s2.sync || false;
              u2.C = true;
              var c2 = V(function() {
                function t5() {
                  return Promise.resolve(u2.L("before", n2, s2)).then(function() {
                    function t6(t7) {
                      return Promise.resolve(u2.remove(n2)).then(function() {
                        return Promise.resolve(u2.L("after", n2, s2)).then(function() {
                        });
                      });
                    }
                    var r5 = function() {
                      if (f2)
                        return V(function() {
                          return Promise.resolve(u2.add(n2, e3)).then(function() {
                            return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                              return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                                return Promise.resolve(Promise.all([u2.leave(n2, s2), u2.enter(n2, s2)])).then(function() {
                                  return Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                                    return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }, function(t8) {
                          if (u2.H(t8))
                            throw new W(t8, "Transition error [sync]");
                        });
                      var t7 = function(t8) {
                        return V(function() {
                          var t9 = function() {
                            if (false !== r6)
                              return Promise.resolve(u2.add(n2, e3)).then(function() {
                                return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                                  return Promise.resolve(u2.enter(n2, s2, r6)).then(function() {
                                    return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                    });
                                  });
                                });
                              });
                          }();
                          if (t9 && t9.then)
                            return t9.then(function() {
                            });
                        }, function(t9) {
                          if (u2.H(t9))
                            throw new W(t9, "Transition error [before/after/enter]");
                        });
                      }, r6 = false, o3 = V(function() {
                        return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                          return Promise.resolve(Promise.all([u2.leave(n2, s2), g(i2, n2)]).then(function(t8) {
                            return t8[0];
                          })).then(function(t8) {
                            return r6 = t8, Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                            });
                          });
                        });
                      }, function(t8) {
                        if (u2.H(t8))
                          throw new W(t8, "Transition error [before/after/leave]");
                      });
                      return o3 && o3.then ? o3.then(t7) : t7();
                    }();
                    return r5 && r5.then ? r5.then(t6) : t6();
                  });
                }
                var r4 = function() {
                  if (f2)
                    return Promise.resolve(g(i2, n2)).then(function() {
                    });
                }();
                return r4 && r4.then ? r4.then(t5) : t5();
              }, function(t5) {
                if (u2.C = false, t5.name && "BarbaError" === t5.name)
                  throw u2.logger.debug(t5.label), u2.logger.error(t5.error), t5;
                throw u2.logger.debug("Transition error [page]"), u2.logger.error(t5), t5;
              });
              return Promise.resolve(c2 && c2.then ? c2.then(o2) : o2());
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.once = function(t4, n2) {
            try {
              return Promise.resolve(L.do("once", t4, n2)).then(function() {
                return n2.once ? S(n2.once, n2)(t4) : Promise.resolve();
              });
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.leave = function(t4, n2) {
            try {
              return Promise.resolve(L.do("leave", t4, n2)).then(function() {
                return n2.leave ? S(n2.leave, n2)(t4) : Promise.resolve();
              });
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.enter = function(t4, n2, r3) {
            try {
              return Promise.resolve(L.do("enter", t4, n2)).then(function() {
                return n2.enter ? S(n2.enter, n2)(t4, r3) : Promise.resolve();
              });
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.add = function(t4, n2) {
            try {
              return b.addContainer(t4.next.container, n2), L.do("nextAdded", t4), Promise.resolve();
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.remove = function(t4) {
            try {
              return b.removeContainer(t4.current.container), L.do("currentRemoved", t4), Promise.resolve();
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, r2.H = function(t4) {
            return t4.message ? !/Timeout error|Fetch error/.test(t4.message) : !t4.status;
          }, r2.L = function(t4, n2, r3) {
            try {
              return Promise.resolve(L.do(t4, n2, r3)).then(function() {
                return r3[t4] ? S(r3[t4], r3)(n2) : Promise.resolve();
              });
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, n(t3, [{ key: "isRunning", get: function() {
            return this.C;
          }, set: function(t4) {
            this.C = t4;
          } }, { key: "hasOnce", get: function() {
            return this.store.once.length > 0;
          } }, { key: "hasSelf", get: function() {
            return this.store.all.some(function(t4) {
              return "self" === t4.name;
            });
          } }, { key: "shouldWait", get: function() {
            return this.store.all.some(function(t4) {
              return t4.to && !t4.to.route || t4.sync;
            });
          } }]), t3;
        }(), Z = /* @__PURE__ */ function() {
          function t3(t4) {
            var n2 = this;
            this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = /* @__PURE__ */ new Map(), 0 !== t4.length && (t4.forEach(function(t5) {
              n2.byNamespace.set(t5.namespace, t5);
            }), this.names.forEach(function(t5) {
              L[t5](n2._(t5));
            }));
          }
          return t3.prototype._ = function(t4) {
            var n2 = this;
            return function(r2) {
              var i2 = t4.match(/enter/i) ? r2.next : r2.current, e3 = n2.byNamespace.get(i2.namespace);
              return e3 && e3[t4] ? S(e3[t4], e3)(r2) : Promise.resolve();
            };
          }, t3;
        }();
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t3) {
          var n2 = this;
          do {
            if (n2.matches(t3))
              return n2;
            n2 = n2.parentElement || n2.parentNode;
          } while (null !== n2 && 1 === n2.nodeType);
          return null;
        });
        var tt = { container: null, html: "", namespace: "", url: { hash: "", href: "", path: "", port: null, query: {} } }, nt = /* @__PURE__ */ function() {
          function t3() {
            this.version = "2.10.3", this.schemaPage = tt, this.Logger = d, this.logger = new d("@barba/core"), this.plugins = [], this.timeout = void 0, this.cacheIgnore = void 0, this.cacheFirstPage = void 0, this.prefetchIgnore = void 0, this.preventRunning = void 0, this.hooks = L, this.cache = void 0, this.headers = void 0, this.prevent = void 0, this.transitions = void 0, this.views = void 0, this.dom = b, this.helpers = x, this.history = P, this.request = M, this.url = j, this.D = void 0, this.B = void 0, this.q = void 0, this.F = void 0;
          }
          var i2 = t3.prototype;
          return i2.use = function(t4, n2) {
            var r2 = this.plugins;
            r2.indexOf(t4) > -1 ? this.logger.warn("Plugin [" + t4.name + "] already installed.") : "function" == typeof t4.install ? (t4.install(this, n2), r2.push(t4)) : this.logger.warn("Plugin [" + t4.name + '] has no "install" method.');
          }, i2.init = function(t4) {
            var n2 = void 0 === t4 ? {} : t4, i3 = n2.transitions, e3 = void 0 === i3 ? [] : i3, o2 = n2.views, u2 = void 0 === o2 ? [] : o2, s2 = n2.schema, f2 = void 0 === s2 ? m : s2, c2 = n2.requestError, a2 = n2.timeout, h2 = void 0 === a2 ? 2e3 : a2, v2 = n2.cacheIgnore, l2 = void 0 !== v2 && v2, p2 = n2.cacheFirstPage, w2 = void 0 !== p2 && p2, b2 = n2.prefetchIgnore, y2 = void 0 !== b2 && b2, P2 = n2.preventRunning, g2 = void 0 !== P2 && P2, E2 = n2.prevent, x2 = void 0 === E2 ? null : E2, R2 = n2.debug, k2 = n2.logLevel;
            if (d.setLevel(true === (void 0 !== R2 && R2) ? "debug" : void 0 === k2 ? "off" : k2), this.logger.info(this.version), Object.keys(f2).forEach(function(t5) {
              m[t5] && (m[t5] = f2[t5]);
            }), this.B = c2, this.timeout = h2, this.cacheIgnore = l2, this.cacheFirstPage = w2, this.prefetchIgnore = y2, this.preventRunning = g2, this.q = this.dom.getWrapper(), !this.q)
              throw new Error("[@barba/core] No Barba wrapper found");
            this.I();
            var O2 = this.data.current;
            if (!O2.container)
              throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new _(l2), this.headers = new D(), this.prevent = new J(y2), this.transitions = new Y(e3), this.views = new Z(u2), null !== x2) {
              if ("function" != typeof x2)
                throw new Error("[@barba/core] Prevent should be a function");
              this.prevent.add("preventCustom", x2);
            }
            this.history.init(O2.url.href, O2.namespace), w2 && this.cache.set(O2.url.href, Promise.resolve({ html: O2.html, url: O2.url }), "init", "fulfilled"), this.U = this.U.bind(this), this.$ = this.$.bind(this), this.X = this.X.bind(this), this.G(), this.plugins.forEach(function(t5) {
              return t5.init();
            });
            var T2 = this.data;
            T2.trigger = "barba", T2.next = T2.current, T2.current = r({}, this.schemaPage), this.hooks.do("ready", T2), this.once(T2), this.I();
          }, i2.destroy = function() {
            this.I(), this.J(), this.history.clear(), this.hooks.clear(), this.plugins = [];
          }, i2.force = function(t4) {
            window.location.assign(t4);
          }, i2.go = function(t4, n2, r2) {
            var i3;
            if (void 0 === n2 && (n2 = "barba"), this.F = null, this.transitions.isRunning)
              this.force(t4);
            else if (!(i3 = "popstate" === n2 ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t4) && this.url.getQuery(this.history.current.url, true) === this.url.getQuery(t4, true) : this.prevent.run("sameUrl", null, null, t4)) || this.transitions.hasSelf)
              return n2 = this.history.change(this.cache.has(t4) ? this.cache.get(t4).target : t4, n2, r2), r2 && (r2.stopPropagation(), r2.preventDefault()), this.page(t4, n2, null != r2 ? r2 : void 0, i3);
          }, i2.once = function(t4) {
            try {
              var n2 = this;
              return Promise.resolve(n2.hooks.do("beforeEnter", t4)).then(function() {
                function r2() {
                  return Promise.resolve(n2.hooks.do("afterEnter", t4)).then(function() {
                  });
                }
                var i3 = function() {
                  if (n2.transitions.hasOnce) {
                    var r3 = n2.transitions.get(t4, { once: true });
                    return Promise.resolve(n2.transitions.doOnce({ transition: r3, data: t4 })).then(function() {
                    });
                  }
                }();
                return i3 && i3.then ? i3.then(r2) : r2();
              });
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, i2.page = function(t4, n2, i3, e3) {
            try {
              var o2, u2 = function() {
                var t5 = s2.data;
                return Promise.resolve(s2.hooks.do("page", t5)).then(function() {
                  var n3 = function(n4, r2) {
                    try {
                      var i4 = (u3 = s2.transitions.get(t5, { once: false, self: e3 }), Promise.resolve(s2.transitions.doPage({ data: t5, page: o2, transition: u3, wrapper: s2.q })).then(function() {
                        s2.I();
                      }));
                    } catch (t6) {
                      return r2();
                    }
                    var u3;
                    return i4 && i4.then ? i4.then(void 0, r2) : i4;
                  }(0, function() {
                    0 === d.getLevel() && s2.force(t5.next.url.href);
                  });
                  if (n3 && n3.then)
                    return n3.then(function() {
                    });
                });
              }, s2 = this;
              if (s2.data.next.url = r({ href: t4 }, s2.url.parse(t4)), s2.data.trigger = n2, s2.data.event = i3, s2.cache.has(t4))
                o2 = s2.cache.update(t4, { action: "click" }).request;
              else {
                var f2 = s2.request(t4, s2.timeout, s2.onRequestError.bind(s2, n2), s2.cache, s2.headers);
                f2.then(function(r2) {
                  r2.url.href !== t4 && s2.history.add(r2.url.href, n2, "replace");
                }), o2 = s2.cache.set(t4, f2, "click", "pending").request;
              }
              var c2 = function() {
                if (s2.transitions.shouldWait)
                  return Promise.resolve(g(o2, s2.data)).then(function() {
                  });
              }();
              return Promise.resolve(c2 && c2.then ? c2.then(u2) : u2());
            } catch (t5) {
              return Promise.reject(t5);
            }
          }, i2.onRequestError = function(t4) {
            this.transitions.isRunning = false;
            var n2 = [].slice.call(arguments, 1), r2 = n2[0], i3 = n2[1], e3 = this.cache.getAction(r2);
            return this.cache.delete(r2), this.B && false === this.B(t4, e3, r2, i3) || "click" === e3 && this.force(r2), false;
          }, i2.prefetch = function(t4) {
            var n2 = this;
            t4 = this.url.getAbsoluteHref(t4), this.cache.has(t4) || this.cache.set(t4, this.request(t4, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(t5) {
              n2.logger.error(t5);
            }), "prefetch", "pending");
          }, i2.G = function() {
            true !== this.prefetchIgnore && (document.addEventListener("mouseover", this.U), document.addEventListener("touchstart", this.U)), document.addEventListener("click", this.$), window.addEventListener("popstate", this.X);
          }, i2.J = function() {
            true !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.U), document.removeEventListener("touchstart", this.U)), document.removeEventListener("click", this.$), window.removeEventListener("popstate", this.X);
          }, i2.U = function(t4) {
            var n2 = this, r2 = this.W(t4);
            if (r2) {
              var i3 = this.url.getAbsoluteHref(this.dom.getHref(r2));
              this.prevent.checkHref(i3) || this.cache.has(i3) || this.cache.set(i3, this.request(i3, this.timeout, this.onRequestError.bind(this, r2), this.cache, this.headers).catch(function(t5) {
                n2.logger.error(t5);
              }), "enter", "pending");
            }
          }, i2.$ = function(t4) {
            var n2 = this.W(t4);
            if (n2) {
              if (this.transitions.isRunning && this.preventRunning)
                return t4.preventDefault(), void t4.stopPropagation();
              this.F = t4, this.go(this.dom.getHref(n2), n2, t4);
            }
          }, i2.X = function(t4) {
            this.go(this.url.getHref(), "popstate", t4);
          }, i2.W = function(t4) {
            for (var n2 = t4.target; n2 && !this.dom.getHref(n2); )
              n2 = n2.parentNode;
            if (n2 && !this.prevent.checkLink(n2, t4, this.dom.getHref(n2)))
              return n2;
          }, i2.I = function() {
            var t4 = this.url.getHref(), n2 = { container: this.dom.getContainer(), html: this.dom.getHtml(), namespace: this.dom.getNamespace(), url: r({ href: t4 }, this.url.parse(t4)) };
            this.D = { current: n2, event: void 0, next: r({}, this.schemaPage), trigger: void 0 }, this.hooks.do("reset", this.data);
          }, n(t3, [{ key: "data", get: function() {
            return this.D;
          } }, { key: "wrapper", get: function() {
            return this.q;
          } }]), t3;
        }();
        return new nt();
      });
    }
  });

  // src/integrations/webflow-barba.js
  function loadFinsweetSolutions(keys) {
    if (typeof window === "undefined")
      return;
    const fa = window.FinsweetAttributes;
    if (!fa || typeof fa.load !== "function")
      return;
    for (const key of keys) {
      try {
        fa.load(key);
      } catch (e2) {
        logger.warn(`[Webflow Barba] Finsweet load("${key}") skipped:`, e2?.message ?? e2);
      }
    }
  }
  function waitForFinsweetReady(timeoutMs = 5e3) {
    return new Promise((resolve) => {
      if (window.FinsweetAttributes?.load) {
        resolve();
        return;
      }
      const start = Date.now();
      const check = () => {
        if (Date.now() - start > timeoutMs) {
          resolve();
          return;
        }
        if (window.FinsweetAttributes?.load) {
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }
  function ensureFinsweetLoaded() {
    if (typeof window === "undefined")
      return Promise.resolve();
    const existing = document.querySelector(
      `script[src*="finsweet"][src*="attributes"], script[src*="@finsweet/attributes"]`
    );
    if (existing)
      return Promise.resolve();
    if (window.FinsweetAttributes?.load) {
      loadFinsweetSolutions(FINSWEET_MODULE_KEYS);
      return Promise.resolve();
    }
    if (finsweetLoadPromise)
      return finsweetLoadPromise;
    finsweetLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = FINSWEET_SCRIPT_URL;
      script.async = true;
      script.type = "module";
      script.onload = () => {
        waitForFinsweetReady().then(() => {
          loadFinsweetSolutions(FINSWEET_MODULE_KEYS);
          resolve();
        }).catch(resolve);
      };
      script.onerror = () => {
        finsweetLoadPromise = null;
        reject(new Error("Finsweet Attributes script failed to load"));
      };
      document.head?.appendChild(script);
    });
    return finsweetLoadPromise;
  }
  function reinitWebflowInteractions() {
    if (typeof window === "undefined")
      return;
    try {
      const wf = window.Webflow;
      if (!wf)
        return;
      if (typeof wf.destroy === "function") {
        wf.destroy();
      }
      const runIx2 = () => {
        const ix2 = wf.require?.("ix2");
        if (ix2) {
          if (typeof ix2.destroy === "function")
            ix2.destroy();
          if (typeof ix2.init === "function")
            ix2.init();
          logger.log("[Webflow Barba] Webflow + IX2 reinitialized (forms, animations)");
        } else {
          logger.log("[Webflow Barba] Webflow reinitialized (forms)");
        }
      };
      if (typeof wf.ready === "function") {
        wf.ready(runIx2);
      } else {
        runIx2();
      }
    } catch (e2) {
      logger.warn("[Webflow Barba] Webflow/IX2 reinit skipped or failed:", e2?.message ?? e2);
    }
  }
  function restartFinsweetModules(keys = FINSWEET_MODULE_KEYS) {
    if (typeof window === "undefined")
      return;
    const modules = window.FinsweetAttributes?.modules;
    if (!modules || typeof modules !== "object")
      return;
    const toRestart = Array.isArray(keys) ? keys : FINSWEET_MODULE_KEYS;
    for (const key of toRestart) {
      try {
        const mod = modules[key];
        if (mod && typeof mod.restart === "function") {
          mod.restart();
          logger.log(`[Webflow Barba] Finsweet module restarted: ${key}`);
        }
      } catch (e2) {
        logger.warn(`[Webflow Barba] Finsweet restart failed for "${key}":`, e2?.message ?? e2);
      }
    }
  }
  function refreshGSAPScrollTrigger() {
    try {
      refreshScrollTrigger();
    } catch (e2) {
      logger.warn("[Webflow Barba] ScrollTrigger refresh skipped:", e2?.message ?? e2);
    }
  }
  function runPostTransitionReinit(options = {}) {
    const { finsweetKeys } = options ?? {};
    reinitWebflowInteractions();
    restartFinsweetModules(finsweetKeys);
    refreshGSAPScrollTrigger();
  }
  var FINSWEET_MODULE_KEYS, FINSWEET_SCRIPT_URL, finsweetLoadPromise;
  var init_webflow_barba = __esm({
    "src/integrations/webflow-barba.js"() {
      init_gsap();
      init_logger();
      FINSWEET_MODULE_KEYS = ["list"];
      FINSWEET_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js";
      finsweetLoadPromise = null;
    }
  });

  // src/barba.js
  var barba_exports = {};
  __export(barba_exports, {
    initBarba: () => initBarba
  });
  function updateNavCurrentState(pageName) {
    if (typeof document === "undefined")
      return;
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    const pathNorm = pathname.replace(/\/$/, "") || "/";
    document.body.setAttribute("data-current-page", pageName || "");
    document.querySelectorAll("li.w--current, a.w--current").forEach((el) => {
      el.classList.remove(CURRENT_CLASS);
      el.removeAttribute("aria-current");
    });
    const allNavLinks = document.querySelectorAll(NAV_LINK_SELECTOR);
    function setCurrent(el) {
      if (!el)
        return;
      el.classList.add(CURRENT_CLASS);
      el.setAttribute("aria-current", "page");
    }
    let currentLink = pageName ? document.querySelector(`a[data-nav-link="${pageName}"]`) : null;
    if (!currentLink) {
      for (const link of allNavLinks) {
        const href = link.getAttribute("href");
        if (href === pathname || href === pathNorm) {
          currentLink = link;
          break;
        }
        try {
          const url = new URL(link.href, window.location.origin);
          if (url.pathname.replace(/\/$/, "") === pathNorm) {
            currentLink = link;
            break;
          }
        } catch (_) {
        }
      }
    }
    if (currentLink) {
      setCurrent(currentLink);
      const parent = currentLink.closest("li") || currentLink.parentElement;
      if (parent)
        setCurrent(parent);
    }
  }
  function getWrapper() {
    if (cachedWrapper && document.contains(cachedWrapper))
      return cachedWrapper;
    cachedWrapper = document.querySelector(WRAPPER_SELECTOR);
    return cachedWrapper;
  }
  function animationEnter(container) {
    const gsap2 = window.gsap;
    if (!gsap2 || !container)
      return Promise.resolve();
    return gsap2.from(container, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      clearProps: "all",
      transformOrigin: "top right"
    }).then(() => {
      const lenis2 = getLenis();
      if (lenis2 && typeof lenis2.resize === "function") {
        lenis2.resize();
      }
      refreshScrollTrigger();
    });
  }
  function animationLeave(container) {
    const gsap2 = window.gsap;
    if (!gsap2 || !container)
      return Promise.resolve();
    return gsap2.to(container, {
      opacity: 0,
      duration: 0.2,
      ease: "none",
      clearProps: "all"
    });
  }
  async function runInitAfterTransition(container, options = {}) {
    const { isPageTransition = false } = options;
    const pageName = container ? container.getAttribute("data-page") : null;
    if (pageName) {
      document.body.setAttribute("data-page", pageName);
    }
    clearPageCache();
    updateNavCurrentState(pageName || document.body.getAttribute("data-page"));
    if (isPageTransition) {
      resetGSAPForNewPage();
    }
    try {
      await initGlobal();
      const lenis2 = getLenis();
      if (lenis2) {
        if (typeof lenis2.resize === "function") {
          lenis2.resize();
        }
        lenis2.scrollTo(0, { duration: 0 });
      }
      await initPage(pageName || void 0, { skipGlobal: true });
      runPostTransitionReinit();
    } catch (err) {
      logger.error("[Barba] Error in runInitAfterTransition:", err);
    } finally {
      const wrapper = getWrapper();
      if (wrapper)
        wrapper.style.overflow = "";
      window.scrollTo(0, 0);
      html.classList.remove("is-transitioning");
      html.classList.add("ready");
      startLenis();
    }
  }
  function initBarba() {
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    import_core.default.init({
      preventRunning: true,
      prevent: ({ el }) => Boolean(el?.closest?.(".w-pagination-wrapper")),
      transitions: [
        {
          name: "default-transition",
          async once(data) {
            document.body.style.opacity = "0";
            await ensureGSAPLoaded();
            const gsap2 = window.gsap;
            if (gsap2) {
              gsap2.to(document.body, {
                duration: 0.6,
                opacity: 1,
                ease: "none",
                clearProps: "all"
              });
            }
            await animationEnter(data.next.container);
            await runInitAfterTransition(data.next.container);
          },
          async leave(data) {
            const pageName = getCurrentPage();
            await runPageCleanup(pageName);
            clearPageCache();
            await ensureGSAPLoaded();
            await animationLeave(data.current.container);
          },
          enter(data) {
            ensureGSAPLoaded().then(() => {
              animationEnter(data.next.container);
            });
          }
        }
      ]
    });
    import_core.default.hooks.before(() => {
      html.classList.add("is-transitioning");
      const wrapper = getWrapper();
      if (wrapper)
        wrapper.style.overflow = "hidden";
      stopLenis();
      window.scrollTo(0, 0);
    });
    import_core.default.hooks.afterLeave(() => {
      html.classList.remove("ready");
    });
    import_core.default.hooks.after(async (data) => {
      const wrapper = getWrapper();
      if (wrapper)
        wrapper.style.overflow = "";
      const container = data?.next?.container;
      if (container) {
        await runInitAfterTransition(container, { isPageTransition: true });
      } else {
        window.scrollTo(0, 0);
        html.classList.remove("is-transitioning");
        html.classList.add("ready");
        startLenis();
      }
    });
    ensureFinsweetLoaded().catch(() => {
    });
    logger.log("[Barba] Page transitions enabled");
  }
  var import_core, WRAPPER_SELECTOR, html, NAV_LINK_SELECTOR, CURRENT_CLASS, cachedWrapper;
  var init_barba = __esm({
    "src/barba.js"() {
      import_core = __toESM(require_barba_umd());
      init_src();
      init_global();
      init_lenis2();
      init_gsap();
      init_webflow_barba();
      init_logger();
      WRAPPER_SELECTOR = '[data-barba="wrapper"]';
      html = document.documentElement;
      NAV_LINK_SELECTOR = "[nav] a[href], [data-navbar] a[href], a[data-nav-link]";
      CURRENT_CLASS = "w--current";
      cachedWrapper = null;
    }
  });

  // src/index.js
  function clearPageCache() {
    cachedPageName = null;
  }
  function getCurrentPage() {
    if (cachedPageName !== null)
      return cachedPageName;
    if (typeof document === "undefined" || !document.body)
      return null;
    const container = document.querySelector('[data-barba="container"]');
    if (container) {
      const containerPage = container.getAttribute("data-page");
      if (containerPage) {
        cachedPageName = containerPage;
        return cachedPageName;
      }
    }
    const bodyPage = document.body.getAttribute("data-page");
    const htmlPage = document.documentElement.getAttribute("data-page");
    cachedPageName = bodyPage || htmlPage || null;
    return cachedPageName;
  }
  async function runPageCleanup(pageName) {
    if (!pageName)
      return;
    const cleanupLoader = pageCleanupRegistry[pageName];
    if (!cleanupLoader || typeof cleanupLoader !== "function")
      return;
    try {
      const cleanupFn = await cleanupLoader();
      if (cleanupFn && typeof cleanupFn === "function") {
        cleanupFn();
      }
    } catch (error) {
      logger.error(`[Webflow Router] Error cleaning up page "${pageName}":`, error);
    }
  }
  async function initPage(pageNameOverride, options = {}) {
    const { skipGlobal = false } = options;
    if (!skipGlobal) {
      try {
        await initGlobal();
      } catch (error) {
        logger.error("[Webflow Router] Error initializing global components:", error);
      }
    }
    const pageName = pageNameOverride !== void 0 ? String(pageNameOverride).trim() || null : getCurrentPage();
    if (pageNameOverride !== void 0 && pageName) {
      cachedPageName = pageName;
    }
    if (!pageName) {
      logger.warn("[Webflow Router] No data-page attribute found on <html> or <body> tag");
      logger.log("[Webflow Router] Global components loaded, but no page-specific code will run");
      return;
    }
    const pageInit = pageRegistry[pageName];
    if (pageInit && typeof pageInit === "function") {
      try {
        const initFn = await pageInit();
        if (initFn && typeof initFn === "function") {
          const result = initFn();
          if (result != null && typeof result.then === "function") {
            await result;
          }
        }
      } catch (error) {
        logger.error(`[Webflow Router] Error initializing page "${pageName}":`, error);
      }
    } else {
      logger.warn(`[Webflow Router] No initialization function found for page: ${pageName}`);
    }
  }
  function bootstrap() {
    if (config.enableBarba) {
      const wrapper = document.querySelector('[data-barba="wrapper"]');
      const container = document.querySelector('[data-barba="container"]');
      if (wrapper && container) {
        document.body.style.opacity = "0";
        Promise.resolve().then(() => (init_barba(), barba_exports)).then((m) => m.initBarba()).catch((err) => {
          logger.error("[Webflow Router] Failed to load Barba:", err);
          document.body.style.opacity = "";
          document.documentElement.classList.remove("is-transitioning");
          document.documentElement.classList.add("ready");
          initPage();
        });
        return;
      }
      logger.warn(
        "[Webflow Router] Barba enabled but wrapper/container not found; running static mode"
      );
    }
    initPage().then(() => {
      document.documentElement.classList.remove("is-transitioning");
      document.documentElement.classList.add("ready");
    }).catch((err) => {
      logger.error("[Webflow Router] Error in static init:", err);
      document.documentElement.classList.remove("is-transitioning");
      document.documentElement.classList.add("ready");
    });
  }
  var pageRegistry, pageCleanupRegistry, registryKeys, cleanupKeys, cachedPageName;
  var init_src = __esm({
    "src/index.js"() {
      init_config();
      init_global();
      init_logger();
      pageRegistry = {
        home: () => Promise.resolve().then(() => (init_home(), home_exports)).then((m) => m.initHomePage),
        about: () => Promise.resolve().then(() => (init_about(), about_exports)).then((m) => m.initAboutPage),
        contact: () => Promise.resolve().then(() => (init_contact(), contact_exports)).then((m) => m.initContactPage),
        solutions: () => Promise.resolve().then(() => (init_solutions(), solutions_exports)).then((m) => m.initSolutionsPage),
        incubation: () => Promise.resolve().then(() => (init_incubation(), incubation_exports)).then((m) => m.initIncubationPage),
        investmentApproach: () => Promise.resolve().then(() => (init_InvestmentApproach(), InvestmentApproach_exports)).then((m) => m.initInvestmentApproachPage)
      };
      pageCleanupRegistry = {
        home: () => Promise.resolve().then(() => (init_home(), home_exports)).then((m) => m.cleanupHomePage),
        about: () => Promise.resolve().then(() => (init_about(), about_exports)).then((m) => m.cleanupAboutPage),
        contact: () => Promise.resolve().then(() => (init_contact(), contact_exports)).then((m) => m.cleanupContactPage),
        solutions: () => Promise.resolve().then(() => (init_solutions(), solutions_exports)).then((m) => m.cleanupSolutionsPage),
        incubation: () => Promise.resolve().then(() => (init_incubation(), incubation_exports)).then((m) => m.cleanupIncubationPage),
        investmentApproach: () => Promise.resolve().then(() => (init_InvestmentApproach(), InvestmentApproach_exports)).then((m) => m.cleanupInvestmentApproachPage)
      };
      registryKeys = Object.keys(pageRegistry);
      cleanupKeys = Object.keys(pageCleanupRegistry);
      if (registryKeys.some((k) => !(k in pageCleanupRegistry)) || cleanupKeys.some((k) => !(k in pageRegistry))) {
        logger.warn(
          "[Webflow Router] Page registry mismatch: every page in pageRegistry should exist in pageCleanupRegistry and vice versa."
        );
      }
      cachedPageName = null;
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrap);
      } else {
        bootstrap();
      }
    }
  });
  init_src();
})();
//# sourceMappingURL=index.js.map
