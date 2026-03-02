import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';
import { ensureGSAPLoaded } from '../components/gsap';
import { initCarousel, getCarouselInstance } from '../components/carousel';
import { initTabs } from '../components/tabs/tabsComp1';

const cleanupFunctions = [];

export async function initSolutionsPage() {
  logger.log('📋 Solutions page initialized');

  try {
    initCarousel();
    await initStickySliderScrollLock();
    initTabs();
  } catch (error) {
    handleError(error, 'Solutions Page Initialization');
  }
}

export function cleanupSolutionsPage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Solutions Page Cleanup');
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
