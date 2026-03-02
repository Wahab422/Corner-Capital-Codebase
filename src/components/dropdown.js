/**
 * Generic Dropdown Component
 * Smoothly animated dropdown driven by the "open" class.
 *
 * Usage:
 * 1. Import: import { initDropdown, cleanupDropdown } from '../components/dropdown';
 * 2. Call initDropdown() in page init; cleanupDropdown() on teardown.
 *
 * HTML structure:
 * <div data-dropdown data-dropdown-group="menu">
 *   <div data-dropdown-toggle>Trigger</div>
 *   <div data-dropdown-body>Content</div>
 * </div>
 *
 * - "open" class on the container makes it open (toggled by this module).
 * - data-dropdown-close-outside (default: true) - close when clicking outside.
 * - data-dropdown-group="name" - only one dropdown in the group open at a time.
 */

import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

const OPEN_CLASS = 'open';
const SELECTORS = {
  dropdown: '[data-dropdown]',
  toggle: '[data-dropdown-toggle]',
  body: '[data-dropdown-body]',
};

const initialized = new Set();
const cleanupFns = [];

function setupDropdown(dropdown) {
  if (initialized.has(dropdown)) return;
  initialized.add(dropdown);

  const toggle = dropdown.querySelector(SELECTORS.toggle);
  const body = dropdown.querySelector(SELECTORS.body);

  if (!toggle || !body) {
    logger.warn('[Dropdown] Missing data-dropdown-toggle or data-dropdown-body', dropdown);
    return;
  }

  const closeOutside = dropdown.getAttribute('data-dropdown-close-outside') !== 'false';
  const group = dropdown.getAttribute('data-dropdown-group');

  const contentId =
    body.id || `dropdown-body-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const toggleId =
    toggle.id || `dropdown-toggle-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  body.id = contentId;
  toggle.id = toggleId;

  dropdown.setAttribute('role', 'combobox');
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('aria-expanded', dropdown.classList.contains(OPEN_CLASS));
  toggle.setAttribute('aria-controls', contentId);
  toggle.setAttribute('aria-haspopup', 'listbox');
  toggle.setAttribute('tabindex', '0');
  body.setAttribute('role', 'listbox');
  body.setAttribute('aria-labelledby', toggleId);

  const scrollContent = body.firstElementChild;
  if (scrollContent) {
    scrollContent.setAttribute('data-lenis-prevent', '');
  }

  function setOpen(open) {
    dropdown.classList.toggle(OPEN_CLASS, open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    dropdown.dispatchEvent(new CustomEvent('dropdown:toggle', { detail: { open }, bubbles: true }));
  }

  function closeOthersInGroup() {
    if (!group) return;
    document.querySelectorAll(`[data-dropdown-group="${group}"]`).forEach((el) => {
      if (el !== dropdown) {
        el.classList.remove(OPEN_CLASS);
        const t = el.querySelector(SELECTORS.toggle);
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    const willOpen = !dropdown.classList.contains(OPEN_CLASS);
    if (willOpen) closeOthersInGroup();
    setOpen(willOpen);
  }

  function handleCloseOutside(e) {
    if (!dropdown.contains(e.target)) {
      setOpen(false);
    }
  }

  toggle.addEventListener('click', handleToggle);

  const handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(e);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  toggle.addEventListener('keydown', handleKeydown);

  if (closeOutside) {
    document.addEventListener('click', handleCloseOutside);
    cleanupFns.push(() => document.removeEventListener('click', handleCloseOutside));
  }

  cleanupFns.push(() => {
    toggle.removeEventListener('click', handleToggle);
    toggle.removeEventListener('keydown', handleKeydown);
    initialized.delete(dropdown);
  });
}

/**
 * Initialize all dropdowns on the page.
 */
export function initDropdown() {
  const dropdowns = document.querySelectorAll(SELECTORS.dropdown);
  if (!dropdowns.length) return;

  logger.log(`📂 Initializing ${dropdowns.length} dropdown(s)`);
  dropdowns.forEach(setupDropdown);
}

/**
 * Cleanup dropdown listeners. Call on page teardown.
 */
export function cleanupDropdown() {
  cleanupFns.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      handleError(err, 'Dropdown cleanup');
    }
  });
  cleanupFns.length = 0;
  initialized.clear();
}
