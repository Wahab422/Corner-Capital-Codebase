/**
 * Webflow + Barba.js integration
 *
 * After each Barba page transition:
 * - Reinitialize Webflow (destroy + ready) so forms and core engine rebind to the new DOM
 * - Reinitialize Webflow interactions (IX2) so animations work on the new content
 * - Restart Finsweet Attributes modules so they re-scan the new DOM
 * - Refresh GSAP ScrollTrigger
 *
 * Finsweet: when we inject the script dynamically, we call load() for each solution
 * because document.currentScript has no attributes on dynamically added scripts.
 * All APIs use optional chaining so missing modules do not throw.
 */

import { refreshScrollTrigger } from '../components/gsap';
import { logger } from '../utils/logger';

/** Solution keys supported in Attributes V2. Filter, sort, load are part of "list". */
const FINSWEET_MODULE_KEYS = ['list'];

const FINSWEET_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js';

let finsweetLoadPromise = null;

function loadFinsweetSolutions(keys) {
  if (typeof window === 'undefined') return;
  const fa = window.FinsweetAttributes;
  if (!fa || typeof fa.load !== 'function') return;
  for (const key of keys) {
    try {
      fa.load(key);
    } catch (e) {
      logger.warn(`[Webflow Barba] Finsweet load("${key}") skipped:`, e?.message ?? e);
    }
  }
}

function waitForFinsweetReady(timeoutMs = 5000) {
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

export function ensureFinsweetLoaded() {
  if (typeof window === 'undefined') return Promise.resolve();

  const existing = document.querySelector(
    `script[src*="finsweet"][src*="attributes"], script[src*="@finsweet/attributes"]`
  );
  if (existing) return Promise.resolve();

  if (window.FinsweetAttributes?.load) {
    loadFinsweetSolutions(FINSWEET_MODULE_KEYS);
    return Promise.resolve();
  }

  if (finsweetLoadPromise) return finsweetLoadPromise;

  finsweetLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = FINSWEET_SCRIPT_URL;
    script.async = true;
    script.type = 'module';
    script.onload = () => {
      waitForFinsweetReady()
        .then(() => {
          loadFinsweetSolutions(FINSWEET_MODULE_KEYS);
          resolve();
        })
        .catch(resolve);
    };
    script.onerror = () => {
      finsweetLoadPromise = null;
      reject(new Error('Finsweet Attributes script failed to load'));
    };
    document.head?.appendChild(script);
  });

  return finsweetLoadPromise;
}

export function reinitWebflowInteractions() {
  if (typeof window === 'undefined') return;
  try {
    const wf = window.Webflow;
    if (!wf) return;

    if (typeof wf.destroy === 'function') {
      wf.destroy();
    }

    const runIx2 = () => {
      const ix2 = wf.require?.('ix2');
      if (ix2) {
        if (typeof ix2.destroy === 'function') ix2.destroy();
        if (typeof ix2.init === 'function') ix2.init();
        logger.log('[Webflow Barba] Webflow + IX2 reinitialized (forms, animations)');
      } else {
        logger.log('[Webflow Barba] Webflow reinitialized (forms)');
      }
    };

    if (typeof wf.ready === 'function') {
      wf.ready(runIx2);
    } else {
      runIx2();
    }
  } catch (e) {
    logger.warn('[Webflow Barba] Webflow/IX2 reinit skipped or failed:', e?.message ?? e);
  }
}

export function restartFinsweetModules(keys = FINSWEET_MODULE_KEYS) {
  if (typeof window === 'undefined') return;
  const modules = window.FinsweetAttributes?.modules;
  if (!modules || typeof modules !== 'object') return;
  const toRestart = Array.isArray(keys) ? keys : FINSWEET_MODULE_KEYS;
  for (const key of toRestart) {
    try {
      const mod = modules[key];
      if (mod && typeof mod.restart === 'function') {
        mod.restart();
        logger.log(`[Webflow Barba] Finsweet module restarted: ${key}`);
      }
    } catch (e) {
      logger.warn(`[Webflow Barba] Finsweet restart failed for "${key}":`, e?.message ?? e);
    }
  }
}

export function refreshGSAPScrollTrigger() {
  try {
    refreshScrollTrigger();
  } catch (e) {
    logger.warn('[Webflow Barba] ScrollTrigger refresh skipped:', e?.message ?? e);
  }
}

export function runPostTransitionReinit(options = {}) {
  const { finsweetKeys } = options ?? {};
  reinitWebflowInteractions();
  restartFinsweetModules(finsweetKeys);
  refreshGSAPScrollTrigger();
}
