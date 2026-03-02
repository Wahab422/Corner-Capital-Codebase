/**
 * GSAP Animation Component (Shared Utility)
 * Lazy-loads GSAP + ScrollTrigger via jsDelivr and wires Webflow data-attributes to scroll animations.
 * Not global: import only on pages that need GSAP-driven effects.
 *
 * Usage:
 * 1) Import: import { initGSAP, ensureGSAPLoaded, handleGlobalAnimation, refreshScrollTrigger } from '../components/gsap';
 * 2) Call initGSAP() or handleGlobalAnimation() once after DOM is ready. The loader prevents duplicate inits and reuses any already-loaded GSAP/ScrollTrigger.
 * 3) Add data attributes in Webflow:
 *    - [anim-scale] -> scale-in on scroll
 *    - [anim-stagger=".child"] -> batch stagger children (from-y, data-delay, data-duration, data-easing, stagger-from, stagger-amount, scrollTrigger-start, anim-markers)
 *    - [anim-element] or .anim-element -> simple fade/slide (from-x/from-y, data-delay, data-duration, data-easing)
 *    - [parallax-element] -> desktop-only parallax
 *    - .bg-lines .bg-line -> background line drift
 *    - .content-divider -> content divider animation on scroll
 *    - [data-split-text="char|word|line"] -> SplitText helper (set window.GSAP_SPLIT_TEXT_URL to override CDN path)
 *    - [data-anim-scramble-text] -> scramble text (chars cycle then reveal); optional value = stagger amount (e.g. "0.02")
 *
 * SplitText eager (per page): Add data-split-text-script="eager" on <html> or <body> to load
 * SplitText as part of ensureGSAPLoaded (before GSAP when eager) so it is ready before any animations run.
 *
 * Extras:
 * - animate(), createTimeline(), createScrollTrigger() are exported for custom animations after ensureGSAPLoaded().
 * - Call refreshScrollTrigger() after DOM/layout changes; killAllScrollTriggers() on teardown.
 * - Safe to call initGSAP() multiple times; the loader guards against double-loading.
 */

import { handleError, loadScript, rafThrottle } from '../utils/helpers';
import { logger } from '../utils/logger';
import { loadLibrary, isLibraryLoaded } from '../utils/jsdelivr';

let gsapLoaded = false;
let scrollTriggerLoaded = false;
let splitTextLoaded = false;
let splitTextLoadPromise = null;
let customEaseLoaded = false;
let animationsInitialized = false;
/** Set by applySplitTextAnimation; called by resetGSAPForNewPage to remove resize listener and SplitText state. */
let splitTextCleanupRef = null;
const SPLIT_TEXT_FALLBACK_URL = 'https://cdn.prod.website-files.com/gsap/3.13.0/SplitText.min.js';

/**
 * True if the current page should have SplitText loaded as part of ensureGSAPLoaded (before animations).
 * Checks: data-split-text-script="eager" on <html> or <body>.
 */
function shouldLoadSplitTextFirst() {
  if (typeof document === 'undefined') return false;
  const attr =
    document.documentElement.getAttribute('data-split-text-script') ??
    document.body?.getAttribute('data-split-text-script');
  return attr != null && String(attr).toLowerCase().trim() === 'eager';
}

/**
 * Wait for a global variable to be available
 */
function waitForGlobal(name, timeout = 5000) {
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

/**
 * Load GSAP library
 */
async function loadGSAP() {
  if (gsapLoaded || isLibraryLoaded('gsap')) {
    // If already marked as loaded, verify it's actually available
    if (typeof window.gsap === 'undefined') {
      await waitForGlobal('gsap');
    }
    return;
  }

  try {
    await loadLibrary('gsap', { loadCSS: false });
    // Wait for GSAP to be available on window
    await waitForGlobal('gsap');
    gsapLoaded = true;
  } catch (error) {
    handleError(error, 'GSAP Loader');
    throw error;
  }
}

/**
 * Load ScrollTrigger plugin
 */
async function loadScrollTrigger() {
  if (scrollTriggerLoaded || isLibraryLoaded('scrollTrigger')) {
    // If already marked as loaded, verify it's actually available
    if (typeof window.ScrollTrigger === 'undefined') {
      await waitForGlobal('ScrollTrigger');
    }
    return;
  }

  try {
    // loadLibrary will automatically load GSAP first (dependency)
    await loadLibrary('scrollTrigger', { loadCSS: false });

    // Wait for both GSAP and ScrollTrigger to be available
    await waitForGlobal('gsap');
    await waitForGlobal('ScrollTrigger');

    if (typeof window.gsap !== 'undefined' && window.gsap.registerPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      scrollTriggerLoaded = true;
    } else {
      throw new Error('GSAP registerPlugin not available');
    }
  } catch (error) {
    handleError(error, 'ScrollTrigger Loader');
    throw error;
  }
}

/**
 * Load SplitText plugin
 * Uses a shared in-flight promise so concurrent callers (e.g. ensureGSAPLoaded + applySplitTextAnimation) only load once.
 */
async function loadSplitText() {
  if (splitTextLoaded || isLibraryLoaded('splitText')) {
    if (typeof window.SplitText === 'undefined') {
      await waitForGlobal('SplitText');
    }
    splitTextLoaded = true;
    logger.log('[SplitText] SplitText already loaded.');
    return true;
  }

  if (splitTextLoadPromise) {
    await splitTextLoadPromise;
    return true;
  }

  splitTextLoadPromise = (async () => {
    try {
      const customUrl = typeof window !== 'undefined' ? window.GSAP_SPLIT_TEXT_URL : null;
      const urlToLoad = customUrl || SPLIT_TEXT_FALLBACK_URL;

      if (!customUrl) {
        logger.warn(
          `[SplitText] Using fallback SplitText URL. For control, set window.GSAP_SPLIT_TEXT_URL to your hosted SplitText.min.js path.`
        );
      }

      await loadScript(urlToLoad, { id: 'split-text-custom' });
      await waitForGlobal('SplitText');
      splitTextLoaded = true;
      logger.log('[SplitText] SplitText loaded.');
      return true;
    } catch (error) {
      handleError(error, 'SplitText Loader');
      return false;
    } finally {
      splitTextLoadPromise = null;
    }
  })();

  return splitTextLoadPromise;
}

/**
 * Load CustomEase plugin
 */
async function loadCustomEase() {
  if (customEaseLoaded || isLibraryLoaded('customEase')) {
    if (typeof window.CustomEase === 'undefined') {
      await waitForGlobal('CustomEase');
    }
    if (window.gsap && window.gsap.registerPlugin && window.CustomEase) {
      window.gsap.registerPlugin(window.CustomEase);
    }
    customEaseLoaded = true;
    return;
  }

  try {
    await loadLibrary('customEase', { loadCSS: false });
    await waitForGlobal('CustomEase');
    if (window.gsap && window.gsap.registerPlugin && window.CustomEase) {
      window.gsap.registerPlugin(window.CustomEase);
    }
    customEaseLoaded = true;
  } catch (error) {
    handleError(error, 'CustomEase Loader');
    throw error;
  }
}

/**
 * Ensure GSAP and ScrollTrigger are loaded
 * Exported for use in global initialization
 * Syncs flags if GSAP was already loaded elsewhere
 */
export async function ensureGSAPLoaded() {
  // When eager, load SplitText before GSAP so it's available as early as possible
  if (shouldLoadSplitTextFirst()) {
    await loadSplitText();
  }

  // Check if GSAP is already loaded globally (from another source)
  if (typeof window.gsap !== 'undefined' && !gsapLoaded) {
    gsapLoaded = true;
  }
  if (typeof window.ScrollTrigger !== 'undefined' && !scrollTriggerLoaded) {
    scrollTriggerLoaded = true;
  }
  if (typeof window.CustomEase !== 'undefined' && !customEaseLoaded) {
    customEaseLoaded = true;
  }

  // Load if not already loaded
  if (!gsapLoaded) {
    await loadGSAP();
  }
  if (!scrollTriggerLoaded) {
    await loadScrollTrigger();
  }
  if (!customEaseLoaded) {
    await loadCustomEase();
  }

  // Final verification - wait a bit if needed
  if (typeof window.gsap === 'undefined') {
    try {
      await waitForGlobal('gsap', 2000);
    } catch (error) {
      throw new Error('GSAP failed to load: Script loaded but gsap object not available');
    }
  }

  if (typeof window.ScrollTrigger === 'undefined') {
    try {
      await waitForGlobal('ScrollTrigger', 2000);
    } catch (error) {
      throw new Error(
        'ScrollTrigger failed to load: Script loaded but ScrollTrigger object not available'
      );
    }
  }

  // Ensure ScrollTrigger is registered with GSAP
  if (window.gsap && window.gsap.registerPlugin && !window.gsap.plugins.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
  if (
    window.gsap &&
    window.gsap.registerPlugin &&
    window.CustomEase &&
    !window.gsap.plugins.CustomEase
  ) {
    window.gsap.registerPlugin(window.CustomEase);
  }
}

/**
 * Initialize GSAP (backward compatibility)
 * Ensures GSAP is loaded and initializes global animations
 * Can be called from page-specific code if needed
 */
export async function initGSAP() {
  try {
    await ensureGSAPLoaded();
    await handleGlobalAnimation();
  } catch (error) {
    handleError(error, 'GSAP Initialization');
  }
}

export function getDefaultEase(name = 'tokenz-default') {
  return window.CustomEase && window.CustomEase.create
    ? window.CustomEase.create(name, 'M0,0 C0.22,0.6 0.36,1 1,1')
    : 'cubic-bezier(.22,.6,.36,1)';
}

/**
 * Handle Global Animations
 * Sets up all GSAP animations for the page
 * Prevents duplicate initialization
 */
export async function handleGlobalAnimation() {
  // Prevent duplicate initialization
  if (animationsInitialized) {
    return;
  }

  // Ensure GSAP is loaded before proceeding
  try {
    await ensureGSAPLoaded();
  } catch (error) {
    handleError(error, 'GSAP Global Animation');
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // Shared Animation Configurations
  const defaultEase =
    window.CustomEase && window.CustomEase.create
      ? window.CustomEase.create('tokenz-default', 'M0,0 C0.22,0.6 0.36,1 1,1')
      : 'cubic-bezier(.22,.6,.36,1)';
  const defaultConfig = {
    duration: 0.75,
    ease: defaultEase,
  };

  // Utility to setup GSAP ScrollTrigger animations
  function setupScrollTrigger(elements, animationSettings, triggerSettings) {
    elements.forEach((element) => {
      gsap.fromTo(element, animationSettings.from, {
        ...animationSettings.to,
        scrollTrigger: {
          trigger: element,
          ...triggerSettings,
        },
      });
    });
  }

  // Scale Animation
  function applyScaleAnimation() {
    const elements = document.querySelectorAll('[anim-scale]');
    if (elements.length === 0) return;

    setupScrollTrigger(
      elements,
      { from: { scale: 1.1 }, to: { scale: 1, duration: 1.5 } },
      { start: 'top 95%' }
    );
    elements.forEach((el) => el.classList.add('gsap-ready'));
  }

  // Stagger Animation
  function applyStaggerAnimation() {
    const staggerElements = document.querySelectorAll('[anim-stagger]:not([modal] [anim-stagger])');
    if (staggerElements.length === 0) return;

    staggerElements.forEach((element) => {
      const childrenSelector = element.getAttribute('anim-stagger');
      const children = element.querySelectorAll(childrenSelector);

      if (children.length === 0) return;

      gsap.set(children, {
        y: element.getAttribute('from-y') || '0.75rem',
        opacity: 0,
      });

      ScrollTrigger.batch(children, {
        onEnter: (target) => {
          gsap.to(target, {
            autoAlpha: 1,
            duration: element.getAttribute('data-duration') || defaultConfig.duration,
            y: '0rem',
            opacity: 1,
            stagger: {
              from: element.getAttribute('stagger-from') || 'start',
              each: element.getAttribute('stagger-amount') || 0.1,
            },
            ease: element.getAttribute('data-easing') || defaultConfig.ease,
            scrollTrigger: {
              trigger: element,
              start: element.getAttribute('scrollTrigger-start') || 'top 95%',
              markers: element.getAttribute('anim-markers') || false,
            },
            delay: element.getAttribute('data-delay') || 0.25,
            clearProps: 'all',
          });
        },
      });
      element.classList.add('gsap-ready');
    });
  }

  // General Element Animation
  function applyElementAnimation() {
    const elements = document.querySelectorAll(
      '[anim-element]:not([modal] [anim-element]), .anim-element:not([modal] .anim-element), .w-pagination-next:not([modal] .w-pagination-next)'
    );
    if (elements.length === 0) return;

    elements.forEach((element) => {
      const fromConfig = {
        y: element.getAttribute('from-y') || '0.25rem',
        x: element.getAttribute('from-x') || 0,
        filter: `blur(6px)`,
        opacity: 0,
        scale: 0.98,
      };

      const toConfig = {
        y: '0%',
        x: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: element.getAttribute('data-duration') || defaultConfig.duration,
        ease: element.getAttribute('data-easing') || defaultConfig.ease,
        delay: element.getAttribute('data-delay') || 0.25,
        scale: 1,
        clearProps: 'all',
      };

      setupScrollTrigger([element], { from: fromConfig, to: toConfig }, { start: 'top 97%' });
      element.classList.add('gsap-ready');
    });
  }

  function applyHeadingAnimation() {
    const elements = document.querySelectorAll('[anim-heading], .anim-heading');
    if (elements.length === 0) return;

    elements.forEach((element) => {
      const fromConfig = {
        y: element.getAttribute('from-y') || '1.75rem',
        x: element.getAttribute('from-x') || 0,
        skewY: `4deg`,
        opacity: 0,
        scale: 0.98,
      };

      const toConfig = {
        y: '0%',
        x: '0%',
        opacity: 1,
        skewY: '0deg',
        duration: element.getAttribute('data-duration') || 1.5,
        ease: element.getAttribute('data-easing') || defaultConfig.ease,
        delay: element.getAttribute('data-delay') || 0.25,
        scale: 1,
        clearProps: 'all',
      };

      setupScrollTrigger([element], { from: fromConfig, to: toConfig }, { start: 'top 97%' });
      element.classList.add('gsap-ready');
    });
  }

  // Parallax Animation
  function applyParallaxAnimation() {
    if (window.innerWidth <= 768) return;

    const elements = document.querySelectorAll('[parallax-element]');
    if (elements.length === 0) return;

    setupScrollTrigger(
      elements,
      { from: { y: '-10%', scale: 1.1 }, to: { y: '10%', scale: 1.1 } },
      { start: 'top bottom', end: 'bottom -50%', scrub: 0.2 }
    );
    elements.forEach((el) => el.classList.add('gsap-ready'));
  }

  // Background Lines Animation
  function applyBackgroundLinesAnimation() {
    const lines = document.querySelectorAll('.bg-lines .bg-line');
    if (lines.length === 0) return;

    setupScrollTrigger(
      lines,
      { from: { y: 400 }, to: { y: -100, duration: 2 } },
      { start: 'top bottom', end: 'bottom top', scrub: 1 }
    );
    document.querySelectorAll('.bg-lines').forEach((el) => el.classList.add('gsap-ready'));
  }

  // SplitText Animation (text splitting only; animations can be added separately)
  async function applySplitTextAnimation() {
    const elements = document.querySelectorAll('[data-split-text]');
    if (elements.length === 0) return;

    const loaded = await loadSplitText();
    if (!loaded || typeof window.SplitText === 'undefined') {
      // Loader already logged the reason; skip to avoid runtime errors.
      return;
    }

    /**
     * Animates elements with data-split-text="lines, chars": chars reveal per line with stagger on scroll.
     * Runs after split is applied. Uses gsap/ScrollTrigger from closure.
     */
    function animateSplitTextLinesChars(element) {
      const lineWraps = element.querySelectorAll('.line-wrap');
      const chars = element.querySelectorAll('.char');
      if (!lineWraps.length || !chars.length) return;

      gsap.set(lineWraps, { overflow: 'hidden' });
      gsap.set(chars, { opacity: 0, y: '0.4em' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      if (tl.scrollTrigger) activeLinesCharsTriggers.push(tl.scrollTrigger);

      lineWraps.forEach((wrap, i) => {
        const lineChars = wrap.querySelectorAll('.char');
        if (!lineChars.length) return;
        tl.to(
          lineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.01,
            ease: 'power3.out',
          },
          i === 0 ? 0 : '<0.25'
        );
      });
    }

    /**
     * Animates elements with data-split-text="lines" only: each line reveals with stagger on scroll.
     */
    function animateSplitTextLinesOnly(element) {
      const lineWraps = element.querySelectorAll('.line-wrap');
      const lines = element.querySelectorAll('.line-wrap .line');
      if (!lineWraps.length || !lines.length) return;

      gsap.set(lineWraps, { overflow: 'hidden' });
      gsap.set(lines, { opacity: 0, y: '0.4em' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      if (tl.scrollTrigger) activeLinesCharsTriggers.push(tl.scrollTrigger);

      tl.to(lines, {
        delay: 0.25,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }

    /** Characters used during scramble effect (before revealing final char) */
    const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    /**
     * Scramble text animation: Split into chars with SplitText, then on scroll cycle random chars and reveal final text.
     * Use on elements with data-anim-scramble-text (value optional, e.g. data-anim-scramble-text="0.02" for stagger amount).
     */
    function applyScrambleText(element) {
      const split = new window.SplitText(element, { type: 'chars' });
      activeSplits.push(split);
      split.chars.forEach((node) => node.classList?.add('char'));

      const chars = split.chars;
      const finalChars = chars.map((el) => el.textContent);
      const staggerAmount = parseFloat(element.getAttribute('data-anim-scramble-text')) || 0.02;
      const scrambleDuration = 0.45;
      const cycleInterval = 45;

      function randomChar() {
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }

      function runScrambleForChar(charEl, finalChar, delay) {
        gsap.delayedCall(delay, () => {
          const start = performance.now();
          const id = setInterval(() => {
            charEl.textContent = randomChar();
            if (performance.now() - start >= scrambleDuration * 1000) {
              clearInterval(id);
              charEl.textContent = finalChar;
            }
          }, cycleInterval);
        });
      }

      const st = ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
        onEnter: () => {
          chars.forEach((charEl, i) => {
            runScrambleForChar(charEl, finalChars[i], i * staggerAmount);
          });
        },
      });
      activeScrambleTriggers.push(st);
      element.classList.add('split-text-ready');
    }

    const splitTypeMap = {
      char: 'chars',
      chars: 'chars',
      word: 'words',
      words: 'words',
      line: 'lines',
      lines: 'lines',
    };

    let initialWindowWidth = window.innerWidth;
    let activeSplits = [];
    const lineWrapContainers = new Set();
    const activeLinesCharsTriggers = [];
    const activeScrambleTriggers = [];

    const resizeHandler = rafThrottle(() => {
      if (window.innerWidth !== initialWindowWidth) {
        splitText();
        initialWindowWidth = window.innerWidth;
      }
    });

    const cleanup = () => {
      window.removeEventListener('resize', resizeHandler);
      activeScrambleTriggers.forEach((t) => t?.kill?.());
      activeScrambleTriggers.length = 0;
      activeLinesCharsTriggers.forEach((t) => t?.kill?.());
      activeLinesCharsTriggers.length = 0;
      lineWrapContainers.forEach((el) => el.classList.remove('line-wrap'));
      lineWrapContainers.clear();
      document.querySelectorAll('[data-split-text], [data-anim-scramble-text]').forEach((el) => {
        el.classList.remove('split-text-ready');
      });
      // Remove any previously added standalone line wrapper divs (legacy).
      document.querySelectorAll('.line-wrap').forEach((wrap) => {
        if (wrap.hasAttribute('data-split-text')) return;
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

      document.querySelectorAll('[data-split-text]').forEach((element) => {
        const attrValue = (element.getAttribute('data-split-text') || '').trim().toLowerCase();
        const tokens = attrValue.split(/[,\s]+/).filter(Boolean);
        const splitKeys = tokens.map((t) => splitTypeMap[t.trim()]).filter(Boolean);
        const splitKey =
          splitKeys.length === 0 ? null : splitKeys.length === 1 ? splitKeys[0] : splitKeys;

        if (!splitKey) {
          logger.warn(
            `[SplitText] Invalid data-split-text value "${attrValue}". Use "char", "word", "line", or comma-separated combinations (e.g. "words, chars").`,
            element
          );
          return;
        }

        const split = new window.SplitText(element, { type: splitKey });
        activeSplits.push(split);

        // Add semantic classes to split parts
        if (split.chars && Array.isArray(split.chars)) {
          split.chars.forEach((node) => node.classList?.add('char'));
        }
        if (split.words && Array.isArray(split.words)) {
          split.words.forEach((node) => node.classList?.add('word'));
        }

        // Lines: add .line-wrap to the container; each line is a direct child with class .line (no extra wrapper div).
        if (split.lines && Array.isArray(split.lines)) {
          lineWrapContainers.add(element);
          split.lines.forEach((lineNode) => {
            const lineWrap = document.createElement('div');
            lineWrap.classList.add('line-wrap');
            lineWrap.setAttribute('aria-hidden', 'true');
            lineNode.parentNode.insertBefore(lineWrap, lineNode);
            lineWrap.appendChild(lineNode);
            const singleChild =
              lineNode.childNodes.length === 1 && lineNode.firstChild?.nodeType === 1
                ? lineNode.firstChild
                : null;
            const lineEl = singleChild ?? lineNode;
            lineEl.classList.add('line');
            if (singleChild) {
              lineNode.parentNode.insertBefore(singleChild, lineNode);
              lineNode.remove();
            }
          });
        }

        if (element.hasAttribute('data-color-to')) {
          animateSplitTextColor(element);
        }

        // Animate "lines, chars" split: stagger lines and chars on scroll
        if (split.lines?.length && split.chars?.length) {
          animateSplitTextLinesChars(element);
        }
        // Animate "lines" only: stagger each line on scroll
        else if (split.lines?.length) {
          animateSplitTextLinesOnly(element);
        }

        element.classList.add('split-text-ready');
      });

      document.querySelectorAll('[data-anim-scramble-text]').forEach((element) => {
        applyScrambleText(element);
      });
    };

    splitText();
    window.addEventListener('resize', resizeHandler);
    splitTextCleanupRef = cleanup;
  }

  // Apply all animations
  applyScaleAnimation();
  applyStaggerAnimation();
  applyElementAnimation();
  applyHeadingAnimation();
  applyParallaxAnimation();
  applyBackgroundLinesAnimation();
  await applySplitTextAnimation();
  // Mark as initialized to prevent duplicates
  animationsInitialized = true;
}

/**
 * Create custom GSAP animation
 * Use this for custom animations in your page code
 *
 * @param {string|HTMLElement} target - Element or selector
 * @param {Object} vars - GSAP animation properties
 * @returns {Object} - GSAP animation
 */
export async function animate(target, vars) {
  await ensureGSAPLoaded();
  return window.gsap.to(target, vars);
}

/**
 * Create GSAP timeline
 * Use this for complex animation sequences
 *
 * @param {Object} vars - Timeline configuration
 * @returns {Object} - GSAP timeline
 */
export async function createTimeline(vars = {}) {
  await ensureGSAPLoaded();
  return window.gsap.timeline(vars);
}

/**
 * Create ScrollTrigger animation
 * Use this for custom scroll-based animations
 *
 * @param {Object} config - ScrollTrigger configuration
 * @returns {Object} - ScrollTrigger instance
 */
export async function createScrollTrigger(config) {
  await ensureGSAPLoaded();
  return window.ScrollTrigger.create(config);
}

/**
 * Refresh ScrollTrigger
 * Call this after DOM changes or layout shifts
 */
export function refreshScrollTrigger() {
  if (scrollTriggerLoaded && typeof window.ScrollTrigger !== 'undefined') {
    window.ScrollTrigger.refresh();
  }
}

/**
 * Get GSAP instance
 * @returns {Object|null} - GSAP object
 */
export function getGSAP() {
  return gsapLoaded && typeof window.gsap !== 'undefined' ? window.gsap : null;
}

/**
 * Get ScrollTrigger instance
 * @returns {Object|null} - ScrollTrigger object
 */
export function getScrollTrigger() {
  return scrollTriggerLoaded && typeof window.ScrollTrigger !== 'undefined'
    ? window.ScrollTrigger
    : null;
}

/**
 * Kill all ScrollTrigger instances (cleanup)
 */
export function killAllScrollTriggers() {
  if (scrollTriggerLoaded && typeof window.ScrollTrigger !== 'undefined') {
    window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

/**
 * Reset GSAP global animation state so handleGlobalAnimation() runs again.
 * Call this after a Barba.js page transition so SplitText and other animations
 * are applied to the new container (they are skipped when animationsInitialized is true).
 */
export function resetGSAPForNewPage() {
  if (splitTextCleanupRef) {
    try {
      splitTextCleanupRef();
    } catch (_) {}
    splitTextCleanupRef = null;
  }
  killAllScrollTriggers();
  animationsInitialized = false;
}

/**
 * Animates split text chars from dim to full color on scroll.
 * @param {Element} [element] - The heading element (or use selector from splitKey).
 * @param {string} [splitKey] - Optional data attribute key, e.g. "data-split-text"; used to find heading if element not passed.
 */
export function animateSplitTextColor(element) {
  const heading = element;
  const chars = heading?.querySelectorAll('.char');
  const colorTo = element.getAttribute('data-color-to');
  if (heading && chars?.length) {
    gsap.to(chars, {
      color: colorTo,
      stagger: 0.02,
      ease: 'none',
      scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        end: 'bottom 90%',
        scrub: 1.2,
      },
    });
  }
}
