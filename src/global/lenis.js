import { logger } from '../utils/logger';

/**
 * Lenis Smooth Scroll
 * Premium smooth scroll library for buttery-smooth scrolling
 * Performance optimized: Loads only on first user interaction
 * Documentation: https://github.com/studio-freight/lenis
 */

let lenis = null;
let lenisLoaded = false;
let lenisImport = null;

/**
 * Actually initialize Lenis (called after first interaction)
 */
async function actuallyInitLenis() {
  if (lenisLoaded) return;
  lenisLoaded = true;

  try {
    // Dynamically import Lenis only when needed
    const { default: Lenis } = await import('@studio-freight/lenis');
    logger.log('🎯 Lenis smooth scroll loading...');

    // Create Lenis instance with optimized configuration
    lenis = new Lenis({
      duration: 1.2, // Animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical', // 'vertical' or 'horizontal'
      gestureOrientation: 'vertical', // 'vertical', 'horizontal', or 'both'
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disabled for better mobile performance
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Infinite scrolling
      autoResize: true, // Auto resize on window resize
      lerp: 0.1, // Lower = smoother but slower, higher = faster but less smooth
    });

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    logger.log('✅ Lenis smooth scroll ready');

    // Handle anchor links (Performance optimized with event delegation)
    document.addEventListener(
      'click',
      (e) => {
        if (!lenis) return;
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');

        // Skip empty anchors
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Get navbar height for offset (cached if navbar exists)
          const navbar = document.querySelector('[data-navbar]');
          const offset = navbar ? navbar.offsetHeight : 0;

          // Scroll to target with Lenis
          lenis.scrollTo(target, {
            offset: -offset,
            duration: 1.2,
          });
        }
      },
      { passive: false } // Can't be passive because we preventDefault
    );

    // Handle data-scroll-to buttons (Performance optimized with event delegation)
    document.addEventListener(
      'click',
      (e) => {
        if (!lenis) return;
        const button = e.target.closest('[data-scroll-to]');
        if (!button) return;

        e.preventDefault();
        const target = button.getAttribute('data-scroll-to');

        if (target === 'top') {
          lenis.scrollTo(0, { duration: 1.2 });
        } else if (target === 'bottom') {
          lenis.scrollTo(document.body.scrollHeight, { duration: 1.5 });
        } else if (target.startsWith('#')) {
          const element = document.querySelector(target);
          if (element) {
            const navbar = document.querySelector('[data-navbar]');
            const offset = navbar ? navbar.offsetHeight : 0;
            lenis.scrollTo(element, {
              offset: -offset,
              duration: 1.2,
            });
          }
        }
      },
      { passive: false } // Can't be passive because we preventDefault
    );
  } catch (error) {
    logger.error('Error loading Lenis:', error);
  }
}

/**
 * Initialize Lenis on first user interaction (Performance optimized!)
 * Loads library only when user actually interacts with the page
 */
export function initLenis() {
  if (lenisImport) return; // Already set up

  logger.log('⏳ Lenis will load on first interaction...');

  // List of events that indicate user interaction
  const interactionEvents = ['scroll', 'wheel', 'touchstart', 'click', 'mousemove'];
  let hasInteracted = false;

  const loadOnInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;

    // Remove all listeners
    interactionEvents.forEach((event) => {
      window.removeEventListener(event, loadOnInteraction, { passive: true });
    });

    // Load Lenis
    actuallyInitLenis();
  };

  // Add listeners for first interaction
  interactionEvents.forEach((event) => {
    window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
  });

  lenisImport = true;
}

/**
 * Get the Lenis instance
 * @returns {Lenis} The Lenis instance
 */
export function getLenis() {
  return lenis;
}

/**
 * Scroll to a specific element
 * @param {string|HTMLElement} target - The target element or selector
 * @param {Object} options - Lenis scroll options
 */
export function scrollTo(target, options = {}) {
  if (!lenis) {
    logger.warn('Lenis is not initialized');
    return;
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (element) {
    const navbar = document.querySelector('[data-navbar]');
    const defaultOffset = navbar ? -navbar.offsetHeight : 0;

    lenis.scrollTo(element, {
      offset: defaultOffset,
      duration: 1.2,
      ...options,
    });
  }
}

/**
 * Scroll to top
 */
export function scrollToTop() {
  if (!lenis) {
    logger.warn('Lenis is not initialized');
    return;
  }
  lenis.scrollTo(0, { duration: 1.2 });
}

/**
 * Scroll to bottom
 */
export function scrollToBottom() {
  if (!lenis) {
    logger.warn('Lenis is not initialized');
    return;
  }
  lenis.scrollTo(document.body.scrollHeight, { duration: 1.5 });
}

/**
 * Stop/Start Lenis
 * Useful for modals or when you need to disable scrolling
 */
export function stopLenis() {
  if (lenis) lenis.stop();
}

export function startLenis() {
  if (lenis) lenis.start();
}
