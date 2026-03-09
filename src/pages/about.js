import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';
import { initCarousel, getCarouselInstance } from '../components/carousel';
import { ensureGSAPLoaded } from '../components/gsap';
import { initRive } from '../components/rive';

const cleanupFunctions = [];

export async function initAboutPage() {
  logger.log('📄 About page initialized');

  try {
    initCarousel();
    await initStickySliderScrollLock();
    const riveCleanup = initRive({ onInteraction: false });
    if (typeof riveCleanup === 'function') cleanupFunctions.push(riveCleanup);

    // Initialize tooltip
    (() => {
      const tooltip = document.createElement('div');
      tooltip.classList.add('location-tooltip-text');

      Object.assign(tooltip.style, {
        position: 'fixed',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        opacity: '0',
        transition: 'opacity 0.15s ease',
        zIndex: '999999',
      });

      document.body.appendChild(tooltip);

      const ensurePinsHoverable = () => {
        document.querySelectorAll('svg [location-pin]').forEach((pin) => {
          pin.style.pointerEvents = 'all';
          pin.style.cursor = 'pointer';
        });
      };

      ensurePinsHoverable();

      document.addEventListener('mouseover', (e) => {
        const pin = e.target.closest?.('[location-pin]');
        if (!pin) return;

        const text = pin.getAttribute('location-pin');
        if (!text) return;

        tooltip.textContent = text;
        tooltip.style.opacity = '1';

        const rect = pin.getBoundingClientRect();

        // Top center positioning
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 8}px`;
        tooltip.style.transform = 'translate(-50%, -100%)';
      });

      document.addEventListener('mouseout', (e) => {
        const pin = e.target.closest?.('[location-pin]');
        if (!pin) return;
        tooltip.style.opacity = '0';
      });

      // Re-check briefly in case SVG loads late (Webflow safe)
      let tries = 0;
      const interval = setInterval(() => {
        ensurePinsHoverable();
        tries++;
        if (tries > 20) clearInterval(interval);
      }, 100);
    })();
  } catch (error) {
    handleError(error, 'About Page Initialization');
  }
}

export function cleanupAboutPage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'About Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}

async function initStickySliderScrollLock() {
  const track = document.querySelector('#stickySliderTrack');
  if (!track) return;
  const section = track.querySelector('section');
  if (!section) return;

  const sliderOuter = section.querySelector('.slider-outer.for-sticky-slider');
  if (!sliderOuter) return;

  const carouselEl = sliderOuter.querySelector('[carousel]');
  const slides = carouselEl ? Array.from(carouselEl.querySelectorAll('.slide')) : [];
  const slideCount = slides.length;
  if (slideCount === 0) return;

  const dataSlideUpdate = document.querySelector('[data-slide-update]');
  await ensureGSAPLoaded();
  const ScrollTrigger = window.ScrollTrigger;
  if (!ScrollTrigger) return;

  const iconWraps = section.querySelectorAll('.sticky-slider-icon-wrap');

  const scrollHeightVh = slideCount * 70;
  track.style.minHeight = `${scrollHeightVh}vh`;

  const trigger = ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate(self) {
      const progress = self.progress;
      const index = Math.min(slideCount - 1, Math.floor(progress * slideCount));
      dataSlideUpdate.setAttribute('data-slide-update', index + 1);
      const emblaApi = getCarouselInstance(sliderOuter);
      if (emblaApi && typeof emblaApi.scrollTo === 'function') {
        emblaApi.scrollTo(index, false);
      }
      iconWraps.forEach((wrap, i) => wrap.classList.toggle('is-active', i === index));
    },
  });

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);

  cleanupFunctions.push(() => {
    trigger.kill();
    window.removeEventListener('resize', onResize);
  });

  logger.log(`✅ Sticky slider scroll-lock: ${slideCount} slides`);
}
