/**
 * Footer Component
 * Runs on every page
 * Performance optimized with cleanup and throttling
 */

import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

// Store cleanup functions for footer
const cleanupFunctions = [];

/** Cleanup for clip-slider-section (interval + timeouts). Run before re-init. */
let footerLocationsCleanup = null;

export function initFooter() {
  logger.log('🦶 Footer initialized');

  handleLocationsection();
}

/**
 * Cleanup function for footer
 * Called before re-initialization or page unload
 */
export function cleanupFooter() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Footer Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}

export function handleLocationsection() {
  const section = document.querySelector('#clip-slider-section');
  if (!section) return;

  if (footerLocationsCleanup) {
    footerLocationsCleanup();
    footerLocationsCleanup = null;
  }

  const slides = Array.from(section.querySelectorAll('.clip-slide'));

  const locationNames = [...section.querySelectorAll('.location-texts .rotation-text')];
  const locationTexts = [...section.querySelectorAll('.location-texts-wrap .rotation-text')];
  const locationTimes = [...section.querySelectorAll('.location-times-wrap .rotation-text')];
  const dayIcon = section.querySelector('[location-time-comp_icon="day"]');
  const nightIcon = section.querySelector('[location-time-comp_icon="night"]');
  const timeIcons = [dayIcon, nightIcon].filter(Boolean);

  const rotateDelayMs = 50;
  const iconClassDelayMs = 50;
  const textStaggerMs = 80;

  let textStaggerIds = [];
  let iconDelayId = null;
  let iconClassDelayId = null;
  let iconRotation = 0;

  const STATE_CLASSES = ['is-passed', 'is-active', 'is-next', 'is-incoming'];

  let activeIndex = slides.findIndex((s) => s.classList.contains('is-active'));
  if (activeIndex === -1) activeIndex = 0;

  let zIndexCounter = 10;
  let zTimeout;

  function updateTextGroup(list, prev, next) {
    if (!list.length) return;
    list.forEach((el, i) => {
      if (i === next) {
        el.classList.add('in');
        el.classList.remove('out');
      } else if (i === prev) {
        el.classList.remove('in');
        el.classList.add('out');
      } else {
        el.classList.remove('in', 'out');
      }
    });
  }

  function runLocationAnimations(prevIndex, nextIndex) {
    textStaggerIds.forEach((id) => clearTimeout(id));
    textStaggerIds = [];
    textStaggerIds.push(setTimeout(() => updateTextGroup(locationTexts, prevIndex, nextIndex), 0));
    textStaggerIds.push(
      setTimeout(() => updateTextGroup(locationNames, prevIndex, nextIndex), textStaggerMs)
    );
    textStaggerIds.push(
      setTimeout(() => updateTextGroup(locationTimes, prevIndex, nextIndex), textStaggerMs * 2)
    );

    const activeTimeEl = locationTimes[nextIndex];
    const dayNight = activeTimeEl?.getAttribute('data-daynight') || 'day';
    clearTimeout(iconClassDelayId);
    iconClassDelayId = setTimeout(() => {
      if (dayIcon) {
        dayIcon.classList.toggle('in', dayNight === 'day');
        dayIcon.classList.toggle('out', dayNight !== 'day');
      }
      if (nightIcon) {
        nightIcon.classList.toggle('in', dayNight === 'night');
        nightIcon.classList.toggle('out', dayNight !== 'night');
      }
    }, iconClassDelayMs);

    clearTimeout(iconDelayId);
    iconDelayId = setTimeout(() => {
      if (!timeIcons.length) return;
      iconRotation += 30;
      timeIcons.forEach((icon) => {
        icon.style.transition = 'transform 0.6s ease';
        icon.style.transform = `rotate(${iconRotation}deg)`;
      });
    }, rotateDelayMs);
  }

  function updateStates(prevIndexForAnim = null) {
    const prevIndex = prevIndexForAnim ?? (activeIndex - 1 + slides.length) % slides.length;

    slides.forEach((slide) => slide.classList.remove(...STATE_CLASSES));

    const total = slides.length;
    const passed = (activeIndex - 1 + total) % total;
    const active = activeIndex;
    const next = (activeIndex + 1) % total;
    const incoming = (activeIndex + 2) % total;

    slides[passed].classList.add('is-passed');
    slides[active].classList.add('is-active');
    slides[next].classList.add('is-next');
    slides[incoming].classList.add('is-incoming');

    clearTimeout(zTimeout);
    zTimeout = setTimeout(() => {
      slides[incoming].style.zIndex = ++zIndexCounter;
    }, 1600);

    runLocationAnimations(prevIndex, activeIndex);
  }

  const intervalId = setInterval(() => {
    const prev = activeIndex;
    activeIndex = (activeIndex + 1) % slides.length;
    updateStates(prev);
  }, 5000);

  updateStates();

  footerLocationsCleanup = () => {
    clearInterval(intervalId);
    textStaggerIds.forEach((id) => clearTimeout(id));
    textStaggerIds = [];
    if (iconDelayId) clearTimeout(iconDelayId);
    iconDelayId = null;
    if (iconClassDelayId) clearTimeout(iconClassDelayId);
    iconClassDelayId = null;
    if (zTimeout) clearTimeout(zTimeout);
    zTimeout = null;
  };
  cleanupFunctions.push(footerLocationsCleanup);
}
