

import { initLenis } from './lenis';
import { initNavbar, cleanupNavbar } from './navbar';
import { initFooter, cleanupFooter } from './footer';
import { handleGlobalAnimation, ensureGSAPLoaded } from '../components/gsap';
import { logger } from '../utils/logger';

export async function initGlobal() {
  logger.log('🌐 Initializing global components...');

  cleanupNavbar();
  cleanupFooter();

  initLenis();

  initNavbar();
  initLocationsTabs();
  initFooter();

  loadGSAPLazy();

  (() => {
    const timedEls = [...document.querySelectorAll('[data-time]')];
    if (!timedEls.length) return;

    const timezones = {
      NY: 'America/New_York',
      SF: 'America/Los_Angeles',
      TE: 'Asia/Jerusalem',
      TK: 'Asia/Tokyo',
      TO: 'Asia/Tokyo',
    };

    const timeRefreshMs = 30_000;
    let timeRefreshId = null;

    const updateTimes = () => {
      timedEls.forEach((el) => {
        const code = el.dataset.time;
        const tz = timezones[code];
        if (!tz) return;

        const localDate = new Date(new Date().toLocaleString('en-US', { timeZone: tz }));
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();
        const hh = String(hours).padStart(2, '0');
        const mm = String(minutes).padStart(2, '0');
        el.textContent = `${hh}:${mm}`;

        const isDay = hours >= 6 && hours < 18;
        el.setAttribute('data-daynight', isDay ? 'day' : 'night');
      });
    };

    const startTimeRefresh = () => {
      clearInterval(timeRefreshId);
      timeRefreshId = setInterval(updateTimes, timeRefreshMs);
    };

    window.addEventListener('data-time:refresh', updateTimes);

    updateTimes();
    startTimeRefresh();
  })();
}

function loadGSAPLazy() {
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    handleGlobalAnimation().catch((error) => {
      logger.error('Error initializing GSAP animations:', error);
    });
    return;
  }

  let isLoaded = false;

  const loadGSAP = async () => {
    if (isLoaded) return;
    isLoaded = true;

    try {
      await ensureGSAPLoaded();

      logger.log('✅ GSAP and ScrollTrigger loaded globally');

      await new Promise((resolve) => setTimeout(resolve, 100));
      await handleGlobalAnimation();
    } catch (error) {
      logger.error('Error loading GSAP:', error);
      isLoaded = false;
    }
  };

  const interactionEvents = ['scroll', 'wheel', 'touchstart', 'click', 'mousemove', 'keydown'];
  let hasInteracted = false;

  const loadOnInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;

    interactionEvents.forEach((event) => {
      window.removeEventListener(event, loadOnInteraction, { passive: true });
    });

    loadGSAP();
  };

  interactionEvents.forEach((event) => {
    window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
  });

  if (window.requestIdleCallback) {
    requestIdleCallback(
      () => {
        if (!hasInteracted) {
          loadGSAP();
        }
      },
      { timeout: 3000 }
    );
  } else {
    setTimeout(() => {
      if (!hasInteracted) {
        loadGSAP();
      }
    }, 2000);
  }
}

function initLocationsTabs() {
  const section = document.querySelector('[locations-home-tabs]');
  if (!section) return;

  const desktopTabBtns = [...section.querySelectorAll('[tab-btn]')];
  const mobileTabBtns = [
    ...section.querySelectorAll(
      '[for-mobile] .contact-grid-locations .contact-grid-locations-text'
    ),
  ];
  const isMobile = window.matchMedia('(max-width: 991px)').matches;
  const tabBtns =
    isMobile && mobileTabBtns.length > 0
      ? mobileTabBtns
      : desktopTabBtns.length > 0
        ? desktopTabBtns
        : mobileTabBtns;

  const tabImgs = section.querySelectorAll('[tab-img]');
  const progressLines = section.querySelectorAll('.tabs-progress-line');
  const locationNames = [...section.querySelectorAll('.location-texts .rotation-text')];
  const locationTexts = [...section.querySelectorAll('.location-texts-wrap .rotation-text')];
  const locationTimes = [...section.querySelectorAll('.location-times-wrap .rotation-text')];
  const dayIcon = section.querySelector('[location-time-comp_icon="day"]');
  const nightIcon = section.querySelector('[location-time-comp_icon="night"]');
  const timeIcons = [dayIcon, nightIcon].filter(Boolean);

  const intervalMs = 5000;
  const rotateDelayMs = 50;
  const iconClassDelayMs = 50;
  const textStaggerMs = 80;

  let activeIndex = 0;
  let timerId = null;
  let textStaggerIds = [];
  let iconDelayId = null;
  let iconClassDelayId = null;
  let iconRotation = 0;

  const resetProgress = () => {
    if (!progressLines.length) return;
    progressLines.forEach((line) => {
      line.style.transition = 'none';
      line.style.width = '0%';
    });
    void progressLines[0].offsetWidth; // reflow
    progressLines.forEach((line) => {
      line.style.transition = `width ${intervalMs}ms linear`;
    });
    requestAnimationFrame(() => {
      progressLines.forEach((line) => {
        line.style.width = '100%';
      });
    });
  };

  const updateTextGroup = (list, prev, next) => {
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
  };

  const setActive = (index) => {
    if (!tabBtns.length) return;
    const prevIndex = activeIndex;
    activeIndex = (index + tabBtns.length) % tabBtns.length;

    desktopTabBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    mobileTabBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));

    if (tabImgs.length) {
      tabImgs.forEach((img) => {
        img.classList.remove('active');
      });
      tabImgs[activeIndex].classList.add('active');
    }

    textStaggerIds.forEach((id) => clearTimeout(id));
    textStaggerIds = [];
    textStaggerIds.push(
      setTimeout(() => updateTextGroup(locationTexts, prevIndex, activeIndex), 0)
    );
    textStaggerIds.push(
      setTimeout(() => updateTextGroup(locationNames, prevIndex, activeIndex), textStaggerMs)
    );
    textStaggerIds.push(
      setTimeout(() => updateTextGroup(locationTimes, prevIndex, activeIndex), textStaggerMs * 2)
    );

    const activeTimeEl = locationTimes[activeIndex];
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

    window.dispatchEvent(new Event('data-time:refresh'));
    resetProgress();
  };

  const startAutoplay = () => {
    clearInterval(timerId);
    timerId = setInterval(() => setActive(activeIndex + 1), intervalMs);
  };

  const bindTabClicks = (btns) => {
    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        setActive(index);
        startAutoplay();
      });
    });
  };
  bindTabClicks(desktopTabBtns);
  bindTabClicks(mobileTabBtns);

  setActive(0);
  startAutoplay();
}
