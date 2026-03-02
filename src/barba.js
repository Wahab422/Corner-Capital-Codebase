/**
 * Barba.js integration for SPA-like page transitions
 * Matches reference: init in hooks.after, enter/once fire-and-forget, same animation style.
 */

import barba from '@barba/core';
import { getCurrentPage, clearPageCache, initPage, runPageCleanup } from './index';
import { initGlobal } from './global';
import { getLenis, stopLenis, startLenis } from './global/lenis';
import { ensureGSAPLoaded, refreshScrollTrigger, resetGSAPForNewPage } from './components/gsap';
import { logger } from './utils/logger';

const WRAPPER_SELECTOR = '[data-barba="wrapper"]';
const html = document.documentElement;

/** Cached wrapper element (same node across transitions; avoids repeated querySelector) */
let cachedWrapper = null;

function getWrapper() {
  if (cachedWrapper && document.contains(cachedWrapper)) return cachedWrapper;
  cachedWrapper = document.querySelector(WRAPPER_SELECTOR);
  return cachedWrapper;
}

/**
 * Enter: fade in new container (reference pattern – gsap.from, then resize + refresh)
 */
function animationEnter(container) {
  const gsap = window.gsap;
  if (!gsap || !container) return Promise.resolve();
  return gsap
    .from(container, {
      duration: 0.2,
      opacity: 0,
      ease: 'none',
      clearProps: 'all',
    })
    .then(() => {
      const lenis = getLenis();
      if (lenis && typeof lenis.resize === 'function') {
        lenis.resize();
      }
      refreshScrollTrigger();
    });
}

/**
 * Leave: fade out current container (reference pattern)
 */
function animationLeave(container) {
  const gsap = window.gsap;
  if (!gsap || !container) return Promise.resolve();
  return gsap.to(container, {
    opacity: 0,
    duration: 0.2,
    ease: 'none',
    clearProps: 'all',
  });
}

/**
 * Run full init after transition: set page, initGlobal, initPage, scroll, classes, Lenis.
 * Used both on initial load (once) and after page-to-page transitions (hooks.after).
 * @param {Element} container - The new page container (data-barba="container")
 * @param {{ isPageTransition?: boolean }} [options] - Set isPageTransition: true when called from hooks.after so SplitText/GSAP re-run on the new container
 */
async function runInitAfterTransition(container, options = {}) {
  const { isPageTransition = false } = options;

  const pageName = container ? container.getAttribute('data-page') : null;
  if (pageName) {
    document.body.setAttribute('data-page', pageName);
  }
  clearPageCache();

  if (isPageTransition) {
    resetGSAPForNewPage();
  }

  try {
    await initGlobal();
    const lenis = getLenis();
    if (lenis) {
      if (typeof lenis.resize === 'function') {
        lenis.resize();
      }
      lenis.scrollTo(0, { duration: 0 });
    }
    await initPage(pageName || undefined, { skipGlobal: true });
    refreshScrollTrigger();
  } catch (err) {
    logger.error('[Barba] Error in runInitAfterTransition:', err);
  } finally {
    const wrapper = getWrapper();
    if (wrapper) wrapper.style.overflow = '';
    window.scrollTo(0, 0);
    html.classList.remove('is-transitioning');
    html.classList.add('ready');
    startLenis();
  }
}

export function initBarba() {
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  barba.init({
    preventRunning: true,

    transitions: [
      {
        name: 'default-transition',

        async once(data) {
          document.body.style.opacity = '0';
          await ensureGSAPLoaded();
          const gsap = window.gsap;
          if (gsap) {
            gsap.to(document.body, {
              duration: 0.6,
              opacity: 1,
              ease: 'none',
              clearProps: 'all',
            });
          }
          await animationEnter(data.next.container);
          // Run init on initial load so reload works (hooks.after may not run after once)
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
        },
      },
    ],
  });

  barba.hooks.before(() => {
    html.classList.add('is-transitioning');
    const wrapper = getWrapper();
    if (wrapper) wrapper.style.overflow = 'hidden';
    stopLenis();
  });

  barba.hooks.afterLeave(() => {
    html.classList.remove('ready');
  });

  barba.hooks.after(async (data) => {
    const wrapper = getWrapper();
    if (wrapper) wrapper.style.overflow = '';

    const container = data?.next?.container;
    if (container) {
      await runInitAfterTransition(container, { isPageTransition: true });
    } else {
      window.scrollTo(0, 0);
      html.classList.remove('is-transitioning');
      html.classList.add('ready');
      startLenis();
    }
  });

  logger.log('[Barba] Page transitions enabled');
}
