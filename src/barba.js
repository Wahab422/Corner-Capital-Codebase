import barba from '@barba/core';
import { getCurrentPage, clearPageCache, initPage, runPageCleanup } from './index';
import { initGlobal } from './global';
import { getLenis, stopLenis, startLenis } from './global/lenis';
import { ensureGSAPLoaded, refreshScrollTrigger, resetGSAPForNewPage } from './components/gsap';
import { logger } from './utils/logger';

const WRAPPER_SELECTOR = '[data-barba="wrapper"]';
const html = document.documentElement;

/** Webflow nav: links inside [nav] or [data-navbar], or with data-nav-link; w--current goes on parent li */
const NAV_LINK_SELECTOR = '[nav] a[href], [data-navbar] a[href], a[data-nav-link]';
const CURRENT_CLASS = 'w--current';

let cachedWrapper = null;

/**
 * Updates Webflow nav state after page change: sets data-current-page on body,
 * and ensures exactly one nav item (link + its parent li) has w--current + aria-current="page".
 * Webflow expects these on the <li> (e.g. .menu-list-item.w--current), so we update both link and parent.
 */
function updateNavCurrentState(pageName) {
  if (typeof document === 'undefined') return;

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const pathNorm = pathname.replace(/\/$/, '') || '/';

  document.body.setAttribute('data-current-page', pageName || '');

  // Clear from all elements that might have current state (both <li> and <a> in nav)
  document.querySelectorAll('li.w--current, a.w--current').forEach((el) => {
    el.classList.remove(CURRENT_CLASS);
    el.removeAttribute('aria-current');
  });

  const allNavLinks = document.querySelectorAll(NAV_LINK_SELECTOR);

  function setCurrent(el) {
    if (!el) return;
    el.classList.add(CURRENT_CLASS);
    el.setAttribute('aria-current', 'page');
  }

  // Prefer match by data-nav-link (must match data-page, e.g. "about")
  let currentLink = pageName ? document.querySelector(`a[data-nav-link="${pageName}"]`) : null;

  if (!currentLink) {
    for (const link of allNavLinks) {
      const href = link.getAttribute('href');
      if (href === pathname || href === pathNorm) {
        currentLink = link;
        break;
      }
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.pathname.replace(/\/$/, '') === pathNorm) {
          currentLink = link;
          break;
        }
      } catch (_) {}
    }
  }

  if (currentLink) {
    setCurrent(currentLink);
    const parent = currentLink.closest('li') || currentLink.parentElement;
    if (parent) setCurrent(parent);
  }
}

function getWrapper() {
  if (cachedWrapper && document.contains(cachedWrapper)) return cachedWrapper;
  cachedWrapper = document.querySelector(WRAPPER_SELECTOR);
  return cachedWrapper;
}

function animationEnter(container) {
  const gsap = window.gsap;
  if (!gsap || !container) return Promise.resolve();
  return gsap
    .from(container, {
      rotationZ: '-90deg',
      y: '10vh',
      duration: 1,
      ease: 'power2.inOut',
      clearProps: 'all',
      transformOrigin: 'top right',
    })
    .then(() => {
      const lenis = getLenis();
      if (lenis && typeof lenis.resize === 'function') {
        lenis.resize();
      }
      refreshScrollTrigger();
    });
}

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

async function runInitAfterTransition(container, options = {}) {
  const { isPageTransition = false } = options;

  const pageName = container ? container.getAttribute('data-page') : null;
  if (pageName) {
    document.body.setAttribute('data-page', pageName);
  }
  clearPageCache();

  updateNavCurrentState(pageName || document.body.getAttribute('data-page'));

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
    // Scroll to top at the start of every transition so the new page always lands at top
    window.scrollTo(0, 0);
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
