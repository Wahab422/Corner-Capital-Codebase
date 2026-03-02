/**
 * Navbar Component
 * Runs on every page
 * Performance optimized with RAF and passive listeners
 */

import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

// Store cleanup functions for global components
const cleanupFunctions = [];

export function initNavbar() {
  logger.log('📱 Navbar initialized');

  try {
    // Cache DOM queries
    const menuButton = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const navbar = document.querySelector('[data-navbar]');
    const navLinks = document.querySelectorAll('[data-nav-link]');

    // Mobile menu toggle
    if (menuButton && mobileMenu) {
      const handleMenuToggle = () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        menuButton.classList.toggle('is-active');
        menuButton.setAttribute('aria-expanded', isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };

      menuButton.addEventListener('click', handleMenuToggle, { passive: true });

      // Store cleanup
      cleanupFunctions.push(() => {
        menuButton.removeEventListener('click', handleMenuToggle);
        // Reset body overflow on cleanup
        document.body.style.overflow = '';
      });
    }

    // Active link highlighting (runs once on init)
    // Performance: Cache the page name to avoid repeated queries
    const currentPage =
      document.body.getAttribute('data-page') || document.documentElement.getAttribute('data-page');

    if (currentPage && navLinks.length) {
      navLinks.forEach((link) => {
        if (link.getAttribute('data-nav-link') === currentPage) {
          link.classList.add('is-active', 'current-page');
        }
      });
    }

    // Sticky navbar on scroll with throttling (Performance optimized!)
    if (navbar) {
      let lastScroll = 0;
      let ticking = false;
      const threshold = 100;

      const updateNavbar = () => {
        const currentScroll = window.pageYOffset;

        // Add/remove shadow
        navbar.classList.toggle('is-scrolled', currentScroll > 10);

        // Show/hide navbar
        if (currentScroll > lastScroll && currentScroll > threshold) {
          navbar.classList.add('is-hidden');
        } else {
          navbar.classList.remove('is-hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      };

      // Use requestAnimationFrame for scroll performance
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateNavbar);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });

      // Store cleanup
      cleanupFunctions.push(() => {
        window.removeEventListener('scroll', requestTick);
      });
    }

    // Close mobile menu when clicking nav links
    if (navLinks.length && mobileMenu) {
      const handleLinkClick = () => {
        if (mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          if (menuButton) menuButton.classList.remove('is-active');
          document.body.style.overflow = '';
        }
      };

      navLinks.forEach((link) => {
        link.addEventListener('click', handleLinkClick, { passive: true });

        // Store cleanup per link
        cleanupFunctions.push(() => {
          link.removeEventListener('click', handleLinkClick);
        });
      });
    }
  } catch (error) {
    handleError(error, 'Navbar Initialization');
  }
}

/**
 * Cleanup function for navbar
 * Called before re-initialization or page unload
 */
export function cleanupNavbar() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Navbar Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
