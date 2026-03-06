/**
 * Rive scroll-scrub component
 * Uses GSAP ScrollTrigger + data-scrub-element so scroll progress (0–100%) drives the
 * Rive animation 1:1. When 100% of the scrub element is scrolled, the animation completes.
 *
 * Markup:
 *   <section data-scrub-element>
 *     <div data-rive data-rive-src="/path/to/file.riv" data-rive-animation="Timeline 1, Timeline 2">
 *       <canvas></canvas>
 *     </div>
 *   </section>
 *   Optional data-rive-scrub="selector" overrides the scrub element.
 *   Use data-rive-cover to fit the animation so it fills the container (Fit.cover; may crop). Default is Fit.cover. Use data-rive-contain for Fit.contain.
 *   Use data-rive-animation="First, Second" to play multiple timelines in sequence (scroll 0–50% = first, 50–100% = second).
 *   Optional data-rive-duration: one value "5.2" or multiple "3.3, 2.2" (seconds per timeline for scrub).
 *   Add data-rive-autoplay to play the animation normally (no scrub, loops by default).
 *
 * Hybrid (autoplay + scroll on same element):
 *   - data-rive-autoplay-animation="1, 2" — timelines 1 and 2 play in sequence on load (scroll locked).
 *   - data-rive-scroll-animation="3" — when the user scrolls, animation 3 plays on its own (autoplay-style over its duration).
 *   - data-rive-scrub-animation="4" — animation 4 is driven by scroll position (scrub: 0→1 scroll = 0→1 progress).
 *   You can use one or both of scroll-animation and scrub-animation. Use data-rive-animation="1, 2, 3, 4" and data-rive-duration as needed.
 *   Add data-rive-scrub-markers to show GSAP ScrollTrigger start/end markers for the scrub range (for debugging).
 *   Use data-rive-scrub-start and data-rive-scrub-end to set the marker range (GSAP syntax, e.g. "top top", "bottom bottom", "center center", "80% top").
 *   Defaults: start="top top", end="bottom bottom".
 *
 * Options:
 *   - onInteraction: if true, only start after first user interaction (default false for hero).
 */

import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';
import { ensureGSAPLoaded } from './gsap';

const RIVE_VERSION = '2.35.0';
const RIVE_CDN = `https://cdn.jsdelivr.net/npm/@rive-app/canvas-advanced@${RIVE_VERSION}`;

// Package ships rive.wasm / rive_fallback.wasm; loader requests canvas_advanced.wasm
const WASM_FILE_MAP = {
  'canvas_advanced.wasm': 'rive.wasm',
};

let riveRuntime = null;

async function getRiveRuntime() {
  if (riveRuntime) return riveRuntime;
  const RiveCanvas = (await import('@rive-app/canvas-advanced')).default;
  riveRuntime = await RiveCanvas({
    locateFile: (file) => {
      const name = WASM_FILE_MAP[file] || file;
      return `${RIVE_CDN}/${name}`;
    },
  });
  return riveRuntime;
}

/** Clamp and snap to 1 when near end so animation completes at 100% scroll. */
function normalizeProgress(p) {
  const progress = Math.max(0, Math.min(1, p));
  return progress >= 0.9995 ? 1 : progress;
}

/** Ease-in-out so each segment starts and ends smoothly. */
function easeInOutCubic(t) {
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
}

/**
 * Get safe duration for one instance (durationOverride wins, else instance duration, else 3.5).
 * durationOverride: number (single) or undefined.
 */
function getSafeDuration(animationInstance, durationOverride) {
  const duration = animationInstance.duration;
  if (Number.isFinite(durationOverride) && durationOverride > 0) return durationOverride;
  return Number.isFinite(duration) && duration > 0 ? duration : 3.5;
}

/**
 * Resolve per-animation duration override. durationOverride can be:
 * - null/undefined: use instance duration for all
 * - number: use for all
 * - number[]: use durationOverride[i] for the i-th animation
 */
function getDurationForIndex(durationOverride, index) {
  if (durationOverride == null) return null;
  if (Array.isArray(durationOverride)) {
    const v = durationOverride[index];
    return Number.isFinite(v) && v > 0 ? v : null;
  }
  return Number.isFinite(durationOverride) && durationOverride > 0 ? durationOverride : null;
}

/**
 * Set one animation to a given time percentage (0–1). When progress >= 1, lands at end.
 * Order per Rive docs: advance animation -> apply(1) -> advance artboard.
 */
function setTimePercentage(animationInstance, artboard, progress, durationOverride) {
  const safeDuration = getSafeDuration(animationInstance, durationOverride);
  const workStart = Number.isFinite(animationInstance.workStart) ? animationInstance.workStart : 0;
  const rangeStart = workStart;
  const rangeEnd = workStart + safeDuration;
  const rangeDuration = Math.max(0.001, rangeEnd - rangeStart);
  const endTime = progress >= 1 ? rangeEnd : rangeStart + progress * rangeDuration;
  const targetTime = Math.max(rangeStart, Math.min(rangeEnd, endTime));
  const currentTime = animationInstance.time;
  const delta = targetTime - currentTime;
  animationInstance.advance(delta);
  animationInstance.apply(1);
  artboard.advance(0);
}

/**
 * Blend zone at segment boundaries (fraction of total scroll 0–1). Crossfade over this range.
 */
const SEGMENT_BLEND_ZONE = 0.03;

/**
 * Set multiple animations in sequence: scroll 0–1 is split by each timeline's duration so that
 * we only switch to the next timeline when the current one has completed. Each segment's
 * scroll range is proportional to that timeline's duration. Uses eased progress and a short
 * crossfade at boundaries for a smooth, complete transition.
 */
function setTimePercentageSequence(animationInstances, artboard, progress, durationOverride) {
  const n = animationInstances.length;
  if (n === 0) return;
  if (n === 1) {
    const override = getDurationForIndex(durationOverride, 0);
    setTimePercentage(animationInstances[0], artboard, progress, override);
    return;
  }
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Build duration-weighted segment boundaries so switch happens only when current timeline completes
  const durations = animationInstances.map((inst, i) =>
    getSafeDuration(inst, getDurationForIndex(durationOverride, i))
  );
  const totalDuration = durations.reduce((a, b) => a + b, 0);
  if (totalDuration <= 0) return;
  const segmentStarts = [];
  let cum = 0;
  for (let i = 0; i < n; i++) {
    segmentStarts.push(cum / totalDuration);
    cum += durations[i];
  }
  segmentStarts.push(1);

  // Find which segment we're in
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
  const segSpan = Math.max(0.001, segEnd - segStart);
  let localProgress =
    progress >= 1 ? 1 : Math.max(0, Math.min(1, (clampedProgress - segStart) / segSpan));
  // Snap to 1 when very close so the segment reaches its exact end frame
  if (localProgress >= 0.9995) localProgress = 1;
  // Ease so each segment starts and ends smoothly
  const easedLocal = easeInOutCubic(localProgress);

  // Crossfade: at the start of segment 1+, blend from previous animation to current over SEGMENT_BLEND_ZONE
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
    const rangeDuration = Math.max(0.001, rangeEnd - workStart);
    const targetTime =
      i < segmentIndex
        ? rangeEnd
        : i > segmentIndex
          ? workStart
          : workStart + easedLocal * rangeDuration;
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

/**
 * Advance animation by elapsed time (normal playback). Order: advance -> apply -> advance artboard.
 */
function advanceByTime(animationInstance, artboard, deltaSec) {
  animationInstance.advance(deltaSec);
  animationInstance.apply(1);
  artboard.advance(deltaSec);
}

/**
 * Initialize a single Rive instance (scrub or autoplay).
 */
async function initRiveScrub(el) {
  const src = el.getAttribute('data-rive-src');
  const animationName = el.getAttribute('data-rive-animation') || null;
  const artboardName = el.getAttribute('data-rive-artboard') || null;
  const useCoverFit = !el.hasAttribute('data-rive-contain');
  const durationAttr = el.getAttribute('data-rive-duration');
  const durationOverride =
    durationAttr != null && durationAttr !== ''
      ? durationAttr.includes(',')
        ? durationAttr
            .split(',')
            .map((s) => parseFloat(s.trim(), 10))
            .filter((n) => Number.isFinite(n) && n > 0)
        : parseFloat(durationAttr, 10)
      : null;
  const isAutoplay = el.hasAttribute('data-rive-autoplay');
  const autoplayAnimAttr = el.getAttribute('data-rive-autoplay-animation');
  const scrollAnimAttr = el.getAttribute('data-rive-scroll-animation');
  const scrubAnimAttr = el.getAttribute('data-rive-scrub-animation');
  const isHybrid =
    isAutoplay &&
    autoplayAnimAttr != null &&
    autoplayAnimAttr.trim() !== '' &&
    ((scrollAnimAttr != null && scrollAnimAttr.trim() !== '') ||
      (scrubAnimAttr != null && scrubAnimAttr.trim() !== ''));
  const scrubSelector = el.getAttribute('data-rive-scrub');
  const scrubMarkers = el.hasAttribute('data-rive-scrub-markers');
  const scrubStartRaw = el.getAttribute('data-rive-scrub-start');
  const scrubEndRaw = el.getAttribute('data-rive-scrub-end');
  const scrubStart =
    scrubStartRaw != null && scrubStartRaw.trim() !== '' ? scrubStartRaw.trim() : 'top top';
  const scrubEnd =
    scrubEndRaw != null && scrubEndRaw.trim() !== '' ? scrubEndRaw.trim() : 'bottom bottom';
  const scrubEl = scrubSelector
    ? document.querySelector(scrubSelector)
    : document.querySelector('[data-scrub-element]') ||
      el.closest('[data-scrub-element]') ||
      el.closest('section') ||
      el;

  let canvas = el.tagName === 'CANVAS' ? el : el.querySelector('canvas');
  if (!canvas && el.tagName !== 'CANVAS') {
    canvas = document.createElement('canvas');
    el.appendChild(canvas);
  }
  if (!src || !canvas) {
    logger.warn('[Rive] Missing data-rive-src or canvas', el);
    return () => {};
  }
  // Ensure canvas can receive size from container (Rive needs non-zero dimensions to draw)
  if (!canvas.style.width) canvas.style.width = '100%';
  if (!canvas.style.height) canvas.style.height = '100%';
  const DEFAULT_CANVAS_WIDTH = 300;
  const DEFAULT_CANVAS_HEIGHT = 150;

  let rive = null;
  let renderer = null;
  let file = null;
  let artboard = null;
  /** @type {import('@rive-app/canvas-advanced').LinearAnimationInstance[]} */
  let animationInstances = [];
  let rafId = null;
  let scrollProgress = 0;
  /** ScrollTrigger progress (0–1) for scrub when using custom start/end; used in hybrid for scrub-animation */
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
  /** @type {IntersectionObserver | null} */
  let intersectionObserver = null;

  const SCROLL_TRIGGER_THRESHOLD = 0.05;
  /** Throttle scrub draws to ~30fps and skip when progress unchanged to reduce lag */
  const SCRUB_DRAW_INTERVAL_MS = 33;
  const SCRUB_PROGRESS_EPSILON = 0.002;
  let lastScrubDrawTime = 0;
  let lastScrubProgress = -1;
  let lastHybridScrollProgress = -1;

  const onResize = () => {
    if (!canvas || !renderer) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Cap DPR on mobile to reduce GPU load and jitter (many devices report 2–3)
    const cappedDpr =
      typeof window.matchMedia !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches
        ? Math.min(dpr, 2)
        : dpr;
    const w = Math.max(1, Math.round(rect.width * cappedDpr) || DEFAULT_CANVAS_WIDTH);
    const h = Math.max(1, Math.round(rect.height * cappedDpr) || DEFAULT_CANVAS_HEIGHT);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  /** Call onResize only when canvas has no valid size (e.g. initial layout). Avoid calling every frame to prevent mobile jitter. */
  const ensureCanvasSize = () => {
    if (canvas && (canvas.width < 1 || canvas.height < 1)) onResize();
  };

  /** @type {number[]} */
  let autoplayIndices = [];
  /** @type {number[]} */
  let scrollIndices = [];
  /** @type {number[]} */
  let scrubIndices = [];

  try {
    if (!isAutoplay && !isHybrid) {
      await ensureGSAPLoaded();
      if (!window.ScrollTrigger) throw new Error('ScrollTrigger not available');
    }
    if (isHybrid) {
      await ensureGSAPLoaded();
      if (!window.ScrollTrigger) throw new Error('ScrollTrigger not available');
    }

    rive = await getRiveRuntime();
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Failed to fetch Rive file: ${src}`);
    const buffer = await res.arrayBuffer();
    file = await rive.load(new Uint8Array(buffer));
    artboard = artboardName ? file.artboardByName(artboardName) : file.defaultArtboard();
    const names = animationName
      ? animationName
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const animNames = names.length > 0 ? names : null;
    if (animNames && animNames.length > 0) {
      for (const name of animNames) {
        const anim = artboard.animationByName(name);
        if (!anim) throw new Error(`[Rive] Animation not found: ${name}`);
        animationInstances.push(new rive.LinearAnimationInstance(anim, artboard));
      }
    } else {
      if (artboard.animationCount() === 0) throw new Error('[Rive] No animations on artboard');
      animationInstances.push(
        new rive.LinearAnimationInstance(artboard.animationByIndex(0), artboard)
      );
    }

    if (isHybrid && animNames && animNames.length > 0) {
      const toNames = (attr) =>
        (attr || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      const autoplayNames = toNames(autoplayAnimAttr);
      const scrollNames = toNames(scrollAnimAttr);
      const scrubNames = toNames(scrubAnimAttr);
      autoplayIndices = autoplayNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
      scrollIndices = scrollNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
      scrubIndices = scrubNames.map((name) => animNames.indexOf(name)).filter((i) => i >= 0);
      const hasScrollOrScrub = scrollIndices.length > 0 || scrubIndices.length > 0;
      if (autoplayIndices.length === 0 || !hasScrollOrScrub) {
        logger.warn(
          '[Rive] Hybrid mode: need autoplay-animation and at least one of scroll-animation or scrub-animation',
          el
        );
      }
    }

    renderer = rive.makeRenderer(canvas);
    onResize();
    window.addEventListener('resize', onResize);

    if (isHybrid) {
      const autoplayInstances = autoplayIndices.map((i) => animationInstances[i]);
      const totalAutoplayDuration = autoplayInstances.reduce(
        (sum, inst, idx) =>
          sum + getSafeDuration(inst, getDurationForIndex(durationOverride, autoplayIndices[idx])),
        0
      );
      scrollTriggerInstance = window.ScrollTrigger.create({
        trigger: scrubEl,
        start: scrubStart,
        end: scrubEnd,
        markers: scrubMarkers,
        onUpdate: (self) => {
          scrollProgress = normalizeProgress(self.progress);
          scrubScrollProgress = scrollProgress;
        },
      });

      scrollLockHandler = (e) => {
        if (!autoplayDone) e.preventDefault();
      };
      keyLockHandler = (e) => {
        if (autoplayDone) return;
        if (['Space', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
          e.preventDefault();
        }
      };
      window.addEventListener('wheel', scrollLockHandler, { passive: false });
      window.addEventListener('touchmove', scrollLockHandler, { passive: false });
      window.addEventListener('keydown', keyLockHandler);

      const tick = (time) => {
        ensureCanvasSize();
        if (canvas.width < 1 || canvas.height < 1) {
          rafId = rive.requestAnimationFrame(tick);
          return;
        }
        const deltaSec = lastTime ? (time - lastTime) / 1000 : 0;
        lastTime = time;

        if (!autoplayDone) {
          autoplayElapsed += deltaSec;
          const totalDur = Math.max(0.001, totalAutoplayDuration);
          const progress = Math.min(1, autoplayElapsed / totalDur);
          const autoplayDurationOverride = autoplayIndices.map((i) =>
            getDurationForIndex(durationOverride, i)
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
              window.removeEventListener('wheel', scrollLockHandler);
              window.removeEventListener('touchmove', scrollLockHandler);
              scrollLockHandler = null;
            }
            if (keyLockHandler) {
              window.removeEventListener('keydown', keyLockHandler);
              keyLockHandler = null;
            }
          }
        } else {
          // After autoplay: scroll-animation = time-based when user scrolls; scrub-animation = position-based
          const scrubProgress = scrubScrollProgress;
          if (!scrollTriggered && scrubProgress >= SCROLL_TRIGGER_THRESHOLD) {
            scrollTriggered = true;
            if (scrollIndices.length > 0) {
              scrollAnimDuration = scrollIndices.reduce(
                (sum, i) =>
                  sum +
                  getSafeDuration(animationInstances[i], getDurationForIndex(durationOverride, i)),
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

          const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
          const scrubChanged = Math.abs(scrubProgress - lastScrubProgress) > SCRUB_PROGRESS_EPSILON;
          const scrollChanged =
            scrollIndices.length > 0 &&
            Math.abs(scrollProgress - lastHybridScrollProgress) > SCRUB_PROGRESS_EPSILON;
          const throttleElapsed = now - lastScrubDrawTime >= SCRUB_DRAW_INTERVAL_MS;
          const shouldDraw =
            throttleElapsed || scrubChanged || scrollChanged || lastScrubProgress < 0;

          if (shouldDraw) {
            lastScrubDrawTime = now;
            lastScrubProgress = scrubProgress;
            lastHybridScrollProgress = scrollProgress;

            for (const i of autoplayIndices) {
              const inst = animationInstances[i];
              const override = getDurationForIndex(durationOverride, i);
              setTimePercentage(inst, artboard, 1, override);
            }
            // data-rive-scroll-animation: play over time when user scrolls
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
              const scrollDurationOverride = scrollIndices.map((i) =>
                getDurationForIndex(durationOverride, i)
              );
              setTimePercentageSequence(
                scrollInstances,
                artboard,
                scrollProgress,
                scrollDurationOverride.length ? scrollDurationOverride : null
              );
            }
            // data-rive-scrub-animation: driven by scroll position
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
              const scrubDurationOverride = scrubIndices.map((i) =>
                getDurationForIndex(durationOverride, i)
              );
              setTimePercentageSequence(
                scrubInstances,
                artboard,
                scrubProgress,
                scrubDurationOverride.length ? scrubDurationOverride : null
              );
            }
            drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : undefined);
          }
        }
        if (!autoplayDone) {
          drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : undefined);
        }
        rafId = rive.requestAnimationFrame(tick);
      };
      rafId = rive.requestAnimationFrame(tick);
    } else if (isAutoplay) {
      const totalAutoplayDuration = (() => {
        const durs = animationInstances.map((inst, i) =>
          getSafeDuration(inst, getDurationForIndex(durationOverride, i))
        );
        return durs.reduce((a, b) => a + b, 0);
      })();

      let isInView = false;
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target !== el) continue;
            isInView = entry.isIntersecting;
            break;
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.01 }
      );
      intersectionObserver.observe(el);
      // Initial visibility in case observer callback hasn't run yet
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
        const deltaSec = lastTime ? (time - lastTime) / 1000 : 0;
        lastTime = time;

        if (animationInstances.length === 1) {
          advanceByTime(animationInstances[0], artboard, deltaSec);
        } else {
          autoplayElapsed += deltaSec;
          const totalDur = Math.max(0.001, totalAutoplayDuration);
          const progress = totalDur > 0 ? Math.min(1, autoplayElapsed / totalDur) : 0;
          setTimePercentageSequence(animationInstances, artboard, progress, durationOverride);
          if (progress >= 1) {
            drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : undefined);
            return;
          }
        }
        drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : undefined);
        rafId = rive.requestAnimationFrame(tick);
      };
      rafId = rive.requestAnimationFrame(tick);
    } else {
      // Pure scrub: no autoplay, scroll drives animation
      scrollTriggerInstance = window.ScrollTrigger.create({
        trigger: scrubEl,
        start: scrubStart,
        end: scrubEnd,
        markers: scrubMarkers,
        onUpdate: (self) => {
          scrollProgress = normalizeProgress(self.progress);
        },
      });

      const scrubTick = () => {
        ensureCanvasSize();
        if (canvas.width < 1 || canvas.height < 1) {
          rafId = rive.requestAnimationFrame(scrubTick);
          return;
        }
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        const progressChanged =
          Math.abs(scrollProgress - lastScrubProgress) > SCRUB_PROGRESS_EPSILON;
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
          drawFrame(rive, renderer, canvas, artboard, useCoverFit ? rive.Fit.cover : undefined);
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
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
      lastTime = 0;
      if (rafId != null) rive.cancelAnimationFrame(rafId);
      rafId = null;
      if (isHybrid) {
        if (scrollLockHandler) {
          window.removeEventListener('wheel', scrollLockHandler);
          window.removeEventListener('touchmove', scrollLockHandler);
          scrollLockHandler = null;
        }
        if (keyLockHandler) {
          window.removeEventListener('keydown', keyLockHandler);
          keyLockHandler = null;
        }
      }
      window.removeEventListener('resize', onResize);
      try {
        animationInstances.forEach((inst) => inst.delete());
        animationInstances = [];
        if (artboard) artboard.delete();
        if (file) file.unref?.();
        if (renderer) renderer.delete?.();
      } catch (e) {
        handleError(e, 'Rive cleanup');
      }
    };

    logger.log(
      isHybrid
        ? '[Rive] Hybrid (autoplay + scroll) initialized'
        : isAutoplay
          ? '[Rive] Autoplay initialized'
          : '[Rive] Scroll-scrub initialized',
      src
    );
    return cleanup;
  } catch (err) {
    handleError(err, 'Rive init');
    return () => {};
  }
}

/**
 * Initialize all [data-rive] elements and optionally wait for first interaction.
 * @returns {Function} Cleanup function to stop rendering and free resources (for page teardown).
 */
export function initRive(options = {}) {
  const { onInteraction = false } = options;
  // Support both [data-rive] and bare [data-rive-src] (e.g. data-rive-autoplay + data-rive-src)
  const containers = document.querySelectorAll('[data-rive-src]');
  if (!containers.length) return () => {};

  const cleanups = [];

  const run = () => {
    containers.forEach((el) => {
      initRiveScrub(el).then((cleanup) => {
        if (typeof cleanup === 'function') cleanups.push(cleanup);
      });
    });
  };

  const cleanup = () => {
    cleanups.forEach((c) => c());
    cleanups.length = 0;
  };

  if (onInteraction) {
    const start = () => {
      ['scroll', 'touchstart', 'click', 'keydown'].forEach((ev) => {
        window.removeEventListener(ev, start);
      });
      run();
    };
    window.addEventListener('scroll', start, { passive: true });
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('click', start);
    window.addEventListener('keydown', start);
  } else {
    run();
  }

  return cleanup;
}
