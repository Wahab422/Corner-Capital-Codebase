/**
 * Global Code - Runs on Every Page
 * Add code here that should execute on all pages (navbar, footer, etc.)
 */

import { initLenis } from './lenis';
import { initNavbar, cleanupNavbar } from './navbar';
import { initFooter, cleanupFooter } from './footer';
import { handleGlobalAnimation, ensureGSAPLoaded } from '../components/gsap';
import { logger } from '../utils/logger';

/**
 * Initialize all global components
 * This runs on every page before page-specific code
 */
export async function initGlobal() {
  logger.log('🌐 Initializing global components...');

  // Cleanup previous instances if re-initializing
  cleanupNavbar();
  cleanupFooter();

  // Initialize Lenis smooth scroll (should be first)
  initLenis();

  // Initialize navbar
  initNavbar();

  // Initialize footer
  initFooter();

  // Load GSAP and ScrollTrigger globally (Performance optimized - non-blocking)
  // Loads after critical components to avoid blocking page initialization
  loadGSAPLazy();

  // Add any other global initializations here
  // Example: Cookie consent, analytics, chat widgets, etc.
}

/**
 * Lazy load GSAP and ScrollTrigger (Performance optimized)
 * Loads on first user interaction to avoid blocking initial page load
 * Uses the centralized loading functions from gsap.js to prevent duplicate loads
 */
function loadGSAPLazy() {
  // Don't load if GSAP is already loaded
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    // GSAP already loaded, just initialize animations
    handleGlobalAnimation().catch((error) => {
      logger.error('Error initializing GSAP animations:', error);
    });
    gsapGlobalAnimations();
    return;
  }

  let isLoaded = false;

  const loadGSAP = async () => {
    if (isLoaded) return;
    isLoaded = true;

    try {
      // Use the centralized loading function from gsap.js
      // This ensures proper tracking and prevents duplicate loads
      await ensureGSAPLoaded();

      logger.log('✅ GSAP and ScrollTrigger loaded globally');

      // Initialize global animations after GSAP is loaded
      // Small delay to ensure Lenis is ready if it loads first
      await new Promise((resolve) => setTimeout(resolve, 100));
      await handleGlobalAnimation();
      gsapGlobalAnimations();
    } catch (error) {
      logger.error('Error loading GSAP:', error);
      isLoaded = false; // Allow retry on error
    }
  };

  // Strategy 1: Load on first user interaction (most performant)
  const interactionEvents = ['scroll', 'wheel', 'touchstart', 'click', 'mousemove', 'keydown'];
  let hasInteracted = false;

  const loadOnInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;

    // Remove all listeners
    interactionEvents.forEach((event) => {
      window.removeEventListener(event, loadOnInteraction, { passive: true });
    });

    // Load GSAP on interaction
    loadGSAP();
  };

  // Add listeners for first interaction
  interactionEvents.forEach((event) => {
    window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
  });

  // Strategy 2: Fallback - Load during idle time or after delay
  // This ensures GSAP loads even if user doesn't interact
  if (window.requestIdleCallback) {
    requestIdleCallback(
      () => {
        // Load during idle time if not already loaded
        if (!hasInteracted) {
          loadGSAP();
        }
      },
      { timeout: 3000 } // Max 3 seconds wait
    );
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      if (!hasInteracted) {
        loadGSAP();
      }
    }, 2000); // Load after 2 seconds if no interaction
  }
}

/**
 * Additional GSAP global animations
 * Custom GSAP animations that run globally
 */
let footerScrollTriggerInstance = null;

function gsapGlobalAnimations() {
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !ScrollTrigger) return;

  footerScroll(gsap, ScrollTrigger);
}

function footerScroll(gsap, ScrollTrigger) {
  if (footerScrollTriggerInstance) {
    footerScrollTriggerInstance.kill();
    footerScrollTriggerInstance = null;
  }

  const footer2row = document.querySelector('.footer-row-2');
  if (!footer2row || window.innerWidth <= 991) return;

  const footerAnimation = gsap.fromTo(
    footer2row,
    { y: '-100%' },
    {
      y: '0%',
      ease: 'linear',
    }
  );

  footerScrollTriggerInstance = ScrollTrigger.create({
    trigger: '.footer-row-2',
    start: `70% ${window.innerHeight - footer2row.scrollHeight + 200}`,
    end: `10% ${window.innerHeight - footer2row.scrollHeight - footer2row.scrollHeight}`,
    animation: footerAnimation,
    scrub: 2,
    onStart: () => {
      ScrollTrigger.refresh();
    },
  });
}
