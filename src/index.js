/**
 * Webflow Page Router
 * This script automatically loads page-specific code based on the data-page attribute
 * Performance optimized: Uses dynamic imports for code splitting
 */

import { config } from './config';
import { initGlobal } from './global';
import { logger } from './utils/logger';

// Page registry - map page names to their dynamic import functions
// This enables code splitting - only the current page's code is loaded
const pageRegistry = {
  home: () => import('./pages/home').then((m) => m.initHomePage),
  about: () => import('./pages/about').then((m) => m.initAboutPage),
  contact: () => import('./pages/contact').then((m) => m.initContactPage),
  solutions: () => import('./pages/solutions').then((m) => m.initSolutionsPage),
  incubation: () => import('./pages/incubation').then((m) => m.initIncubationPage),
  investmentApproach: () =>
    import('./pages/InvestmentApproach').then((m) => m.initInvestmentApproachPage),
};

// Cleanup registry - map page names to their cleanup functions (for Barba transitions)
const pageCleanupRegistry = {
  home: () => import('./pages/home').then((m) => m.cleanupHomePage),
  about: () => import('./pages/about').then((m) => m.cleanupAboutPage),
  contact: () => import('./pages/contact').then((m) => m.cleanupContactPage),
  solutions: () => import('./pages/solutions').then((m) => m.cleanupSolutionsPage),
  incubation: () => import('./pages/incubation').then((m) => m.cleanupIncubationPage),
  investmentApproach: () =>
    import('./pages/InvestmentApproach').then((m) => m.cleanupInvestmentApproachPage),
};

// Dev-time check: ensure every page has both init and cleanup registered
const registryKeys = Object.keys(pageRegistry);
const cleanupKeys = Object.keys(pageCleanupRegistry);
if (
  registryKeys.some((k) => !(k in pageCleanupRegistry)) ||
  cleanupKeys.some((k) => !(k in pageRegistry))
) {
  logger.warn(
    '[Webflow Router] Page registry mismatch: every page in pageRegistry should exist in pageCleanupRegistry and vice versa.'
  );
}

let cachedPageName = null;

/**
 * Clear the cached page name (used by Barba before/after transitions)
 */
export function clearPageCache() {
  cachedPageName = null;
}

/**
 * Get the current page name from the data-page attribute
 * When Barba container exists, reads from it; otherwise checks body and html
 * Performance: Cache the result to avoid repeated queries
 */
export function getCurrentPage() {
  if (cachedPageName !== null) return cachedPageName;
  if (typeof document === 'undefined' || !document.body) return null;
  const container = document.querySelector('[data-barba="container"]');
  if (container) {
    const containerPage = container.getAttribute('data-page');
    if (containerPage) {
      cachedPageName = containerPage;
      return cachedPageName;
    }
  }
  const bodyPage = document.body.getAttribute('data-page');
  const htmlPage = document.documentElement.getAttribute('data-page');
  cachedPageName = bodyPage || htmlPage || null;
  return cachedPageName;
}

/**
 * Run cleanup for a given page (used by Barba on leave)
 * @param {string} pageName - Page name from getCurrentPage()
 */
export async function runPageCleanup(pageName) {
  if (!pageName) return;
  const cleanupLoader = pageCleanupRegistry[pageName];
  if (!cleanupLoader || typeof cleanupLoader !== 'function') return;
  try {
    const cleanupFn = await cleanupLoader();
    if (cleanupFn && typeof cleanupFn === 'function') {
      cleanupFn();
    }
  } catch (error) {
    logger.error(`[Webflow Router] Error cleaning up page "${pageName}":`, error);
  }
}

/**
 * Initialize the current page
 * Performance optimized: Uses dynamic imports for code splitting
 * @param {string} [pageNameOverride] - When provided (e.g. from Barba afterEnter), use this page name so the correct page init always runs
 * @param {{ skipGlobal?: boolean }} [options] - When skipGlobal is true, skip initGlobal (caller already ran it, e.g. Barba afterEnter)
 */
export async function initPage(pageNameOverride, options = {}) {
  const { skipGlobal = false } = options;

  if (!skipGlobal) {
    try {
      await initGlobal();
    } catch (error) {
      logger.error('[Webflow Router] Error initializing global components:', error);
    }
  }

  const pageName =
    pageNameOverride !== undefined ? String(pageNameOverride).trim() || null : getCurrentPage();

  if (pageNameOverride !== undefined && pageName) {
    cachedPageName = pageName;
  }

  if (!pageName) {
    logger.warn('[Webflow Router] No data-page attribute found on <html> or <body> tag');
    logger.log('[Webflow Router] Global components loaded, but no page-specific code will run');
    return;
  }

  const pageInit = pageRegistry[pageName];

  if (pageInit && typeof pageInit === 'function') {
    try {
      const initFn = await pageInit();
      if (initFn && typeof initFn === 'function') {
        const result = initFn();
        if (result != null && typeof result.then === 'function') {
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
      import('./barba')
        .then((m) => m.initBarba())
        .catch((err) => {
          logger.error('[Webflow Router] Failed to load Barba:', err);
          document.documentElement.classList.remove('is-transitioning');
          document.documentElement.classList.add('ready');
          initPage();
        });
      return;
    }
    logger.warn(
      '[Webflow Router] Barba enabled but wrapper/container not found; running static mode'
    );
  }
  // Static mode or Barba markup missing: run init once
  initPage()
    .then(() => {
      document.documentElement.classList.remove('is-transitioning');
      document.documentElement.classList.add('ready');
    })
    .catch((err) => {
      logger.error('[Webflow Router] Error in static init:', err);
      document.documentElement.classList.remove('is-transitioning');
      document.documentElement.classList.add('ready');
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
