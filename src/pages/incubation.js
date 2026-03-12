import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';
import { initTabs } from '../components/tabs/tabsComp1';
import { initModalBasic, cleanupModalBasic } from '../components/modal-basic';
import { initDropdown, cleanupDropdown } from '../components/dropdown';
import { initAccordionCSS } from '../components/accordion';
import { initRive } from '../components/rive';
import { initCarousel } from '../components/carousel';
import { stopLenis, startLenis } from '../global/lenis';

const INVESTMENT_MODAL_NAME = 'investment-modal';
const TRIGGER_SELECTOR = '[data-investment-item]';
const MODAL_SELECTOR = `#${INVESTMENT_MODAL_NAME}, [data-modal-name="${INVESTMENT_MODAL_NAME}"]`;

const CONTENT_WRAP_SELECTORS = '.content.for-porf-modal, [data-modal-content]';
const DETAIL_LINE_CLASS = 'porf-detail-line';
const EMPTY_CLASS = 'hide';

const FIELD_MAPPING = [
  { trigger: 'data-item-name', modal: '[data-item-name]', setter: 'text' },
  { trigger: 'data-item-description', modal: '[data-item-description]', setter: 'text' },
  {
    trigger: 'data-item-sector',
    modal: '[data-item-sector]',
    setter: 'text',
    hideLineWhenEmpty: true,
  },
  {
    trigger: 'data-investment-date',
    modal: '[data-investment-date]',
    setter: 'text',
    hideLineWhenEmpty: true,
  },
  {
    trigger: 'data-acquired-by',
    modal: '[data-acquired-by]',
    setter: 'text',
    hideLineWhenEmpty: true,
  },
  {
    trigger: 'data-item-founder',
    modal: '[data-item-founder]',
    setter: 'text',
    hideLineWhenEmpty: true,
  },
  {
    trigger: 'data-website-link',
    modal: '[data-website-link]',
    setter: 'href',
    hideLineWhenEmpty: true,
  },
];

const cleanupFunctions = [];
const cleanupFns = [];

function getFieldValue(card, attr) {
  const direct = card.getAttribute(attr);
  if (direct != null && direct !== '') return direct;

  const el = card.querySelector(`[${attr}]`);
  return el ? (el.textContent?.trim() ?? el.getAttribute(attr) ?? '') : '';
}

function getInvestmentCard(trigger) {
  return trigger.closest(TRIGGER_SELECTOR) || trigger;
}

function syncModalImage(modal, trigger) {
  const card = getInvestmentCard(trigger);
  const sourceImgEl = card.querySelector('[data-item-img]');
  const sourceImg =
    sourceImgEl?.tagName === 'IMG' ? sourceImgEl : sourceImgEl?.querySelector('img');

  const srcAttr = sourceImg?.getAttribute('src')?.trim() ?? '';
  const hasImage = srcAttr !== '' && !sourceImg?.classList.contains('w-dyn-bind-empty');

  const content = modal.querySelector('[data-modal-content]');
  const modalLogoWrap = content?.querySelector('[data-item-img]');
  const modalImg = modalLogoWrap?.querySelector('img');

  if (!modalLogoWrap || !modalImg) return;

  if (hasImage) {
    modalImg.setAttribute('src', srcAttr);
    modalImg.removeAttribute('srcset');
    modalImg.alt = getFieldValue(card, 'data-item-name') || 'Company logo';

    const colorEffect = sourceImg.getAttribute('color-effect');
    if (colorEffect) {
      modalImg.setAttribute('color-effect', colorEffect);
    } else {
      modalImg.removeAttribute('color-effect');
    }

    modalLogoWrap.classList.remove('no-image');
  } else {
    modalImg.removeAttribute('src');
    modalImg.removeAttribute('srcset');
    modalImg.removeAttribute('color-effect');
    modalLogoWrap.classList.add('no-image');
  }
}

function updateField(modal, card, { trigger: attr, modal: selector, setter, hideLineWhenEmpty }) {
  const value = getFieldValue(card, attr);

  modal.querySelectorAll(selector).forEach((el) => {
    if (setter === 'text') {
      el.textContent = value;
    } else if (setter === 'href') {
      el.href = value || '#';
      el.toggleAttribute('aria-disabled', !value);
    }

    if (hideLineWhenEmpty) {
      const line = el.closest(`.${DETAIL_LINE_CLASS}`);
      if (line) {
        const isEmpty = !value || String(value).trim() === '';
        line.classList.toggle(EMPTY_CLASS, isEmpty);
      }
    }
  });
}

function updateWebsiteLinkVisibility(modal) {
  modal.querySelectorAll('[data-website-link]').forEach((el) => {
    const hasLink = el.href && el.href !== '#' && !el.hasAttribute('aria-disabled');
    el.classList.toggle(EMPTY_CLASS, !hasLink);
  });
}

function populateModal(modal, trigger) {
  const card = getInvestmentCard(trigger);

  FIELD_MAPPING.forEach((mapping) => updateField(modal, card, mapping));
  updateWebsiteLinkVisibility(modal);
  syncModalImage(modal, trigger);
}

function setupModal(modal) {
  modal.setAttribute('data-modal-name', INVESTMENT_MODAL_NAME);
  modal.setAttribute('data-modal-group-status', 'not-active');
  modal.setAttribute('data-modal-close-outside', '');
  modal.setAttribute('data-modal-label', 'Investment details');

  const contentWrap = modal.querySelector(CONTENT_WRAP_SELECTORS);
  if (contentWrap && !contentWrap.hasAttribute('data-modal-content')) {
    contentWrap.setAttribute('data-modal-content', '');
  }

  modal.querySelectorAll('[modal-close-btn]').forEach((btn) => {
    btn.setAttribute('data-modal-close', '');
  });

  const onOpen = (e) => {
    const { trigger } = e.detail || {};
    if (trigger) populateModal(modal, trigger);
    stopLenis();
  };

  modal.addEventListener('modal:open', onOpen);
  cleanupFns.push(() => modal.removeEventListener('modal:open', onOpen));

  const onClose = () => startLenis();
  modal.addEventListener('modal:close', onClose);
  cleanupFns.push(() => modal.removeEventListener('modal:close', onClose));
}

function setupTriggers() {
  const cards = document.querySelectorAll(TRIGGER_SELECTOR);
  console.log(cards);
  cards.forEach((card) => {
    if (!card.hasAttribute('data-modal-target')) {
      card.setAttribute('data-modal-target', INVESTMENT_MODAL_NAME);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
    }
  });

  const onKeyDown = (e) => {
    const card = e.target.closest(TRIGGER_SELECTOR);
    if (!card || card.getAttribute('data-modal-target') !== INVESTMENT_MODAL_NAME) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  };

  document.addEventListener('keydown', onKeyDown);
  cleanupFns.push(() => document.removeEventListener('keydown', onKeyDown));
}

/**
 * Registers a Finsweet list callback to sync the clear button's is-list-active
 * class with the radio filter state. Runs when Finsweet's list attribute loads.
 */
function setupFinsweetListClear() {
  if (typeof window === 'undefined') return;

  const clearBtn = document.querySelector('[fs-list-element="clear"]');
  const radio = document.querySelector('#exited-radio');

  const updateClearState = () => {
    const isChecked = radio?.checked && radio.getAttribute('fs-list-field');
    if (isChecked) {
      clearBtn?.classList.remove('is-list-active');
    } else {
      clearBtn?.classList.add('is-list-active');
    }
  };

  window.FinsweetAttributes = window.FinsweetAttributes || [];
  window.FinsweetAttributes.push([
    'list',
    (listInstances) => {
      if (!listInstances?.length) return;

      const [listInstance] = listInstances;
      listInstance.addHook('filter', updateClearState);
      updateClearState();
    },
  ]);
}

export async function initIncubationPage() {
  logger.log('🌱 Incubation page initialized');

  try {
    const modal = document.querySelector(MODAL_SELECTOR);
    if (modal) setupModal(modal);

    setupTriggers();

    const riveCleanup = initRive({ onInteraction: false });
    if (typeof riveCleanup === 'function') cleanupFunctions.push(riveCleanup);

    setupFinsweetListClear();
    initDropdown();
    initModalBasic();
    initAccordionCSS();
    initTabs();
    initCarousel();
  } catch (error) {
    handleError(error, 'Incubation Page Initialization');
  }
}

export function cleanupIncubationPage() {
  cleanupDropdown();
  cleanupModalBasic();
  cleanupFns.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      handleError(error, 'Incubation Page Cleanup');
    }
  });
  cleanupFns.length = 0;
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Incubation Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
