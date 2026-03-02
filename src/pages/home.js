import { handleError, getCookie, setCookie } from '../utils/helpers';
import { logger } from '../utils/logger';
import { initCarousel, getCarouselInstance } from '../components/carousel';
import { ensureGSAPLoaded } from '../components/gsap';
import { initRive } from '../components/rive';
import { initTabs } from '../components/tabs/tabsComp1';

const cleanupFunctions = [];

export async function initHomePage() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 10);
  });

  logger.log('🏠 Home page initialized');

  try {
    initHeroAnimation();
    initCarousel();
    await initGlobalChampionScrollLock();

    const riveCleanup = initRive({ onInteraction: false });
    if (typeof riveCleanup === 'function') cleanupFunctions.push(riveCleanup);

    initTabs();
  } catch (error) {
    handleError(error, 'Home Page Initialization');
  }
}

export function cleanupHomePage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Home Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}

async function initGlobalChampionScrollLock() {
  const section = document.querySelector('.section.is-global-champion');
  const sliderOuter = document.querySelector('.slider-outer.for-gc');
  const track = sliderOuter?.querySelector('[carousel], .slider');
  const slides = track ? Array.from(track.querySelectorAll('.text-huge')) : [];

  if (!section || !sliderOuter || !slides.length) {
    logger.log('⏳ Global champion scroll-lock: section or .text-huge slider not found');
    return;
  }

  await ensureGSAPLoaded();
  const ScrollTrigger = window.ScrollTrigger;
  const slideCount = slides.length;

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${slideCount * 30}%`,
    scrub: false,
    onUpdate(self) {
      const progress = self.progress;
      const index = Math.min(slideCount - 1, Math.floor(progress * slideCount));
      const emblaApi = getCarouselInstance(sliderOuter);
      if (emblaApi && typeof emblaApi.scrollTo === 'function') {
        emblaApi.scrollTo(index, false);
      }
    },
  });

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);

  cleanupFunctions.push(() => {
    trigger.kill();
    window.removeEventListener('resize', onResize);
  });

  logger.log(`✅ Global champion scroll-lock: ${slideCount} slides (Embla)`);
}

const HERO_SEEN_COOKIE = 'corner_hero_seen';

//
async function initHeroAnimation() {
  const homeHeroSection = document.querySelector('#home-hero-section');
  if (!homeHeroSection) {
    return;
  }
  const homeHeroRiveAnimation = homeHeroSection.querySelector('#home-hero-rive-animation');
  const hText1 = homeHeroSection.querySelector('[hh_text1] ');
  const hText2 = homeHeroSection.querySelector('[hh_text2] ');
  const hText3 = homeHeroSection.querySelector('[hh_text3] ');
  const hText4 = homeHeroSection.querySelector('[hh_text4] ');
  const hText5 = homeHeroSection.querySelector('[hh_text5] ');

  const hasSeenHero = getCookie(HERO_SEEN_COOKIE);
  if (hasSeenHero) {
    hText1?.classList.add('out');
    hText2?.classList.add('out');
    setTimeout(() => {
      hText3?.classList.add('in');
      document.querySelector('.nav')?.classList.remove('hidden-top');
    }, 500);
    setTimeout(() => hText4?.classList.add('in'), 800);
    setTimeout(() => hText5?.classList.add('in'), 1100);

    if (homeHeroRiveAnimation) {
      const riveAttrs = homeHeroRiveAnimation
        .getAttributeNames()
        .filter((n) => n.startsWith('data-rive'));
      riveAttrs.forEach((name) => homeHeroRiveAnimation.removeAttribute(name));
      homeHeroRiveAnimation.setAttribute(
        'data-rive-src',
        'https://cdn.prod.website-files.com/698c6383e6bfa7b525ef0e68/69a051cd39f89520df06cd6c_homepage_(bigger).riv'
      );
      homeHeroRiveAnimation.setAttribute('data-rive-animation', '2, 3');
      homeHeroRiveAnimation.setAttribute('data-rive-scrub-animation', '3');
      homeHeroRiveAnimation.setAttribute('data-rive-autoplay', '');
      homeHeroRiveAnimation.setAttribute('data-rive-duration', '2.4, 2');
      homeHeroRiveAnimation.setAttribute('data-rive-scrub-end', 'bottom 30%');
      homeHeroRiveAnimation.setAttribute('data-rive-autoplay-animation', '2');
    }
    return;
  }

  setTimeout(() => {
    hText1?.classList.add('out');
  }, 2000);
  setTimeout(() => {
    hText2?.classList.add('out');
  }, 2300);
  setTimeout(() => {
    hText3?.classList.add('in');
    document.querySelector('.nav')?.classList.remove('hidden-top');
  }, 3600);
  setTimeout(() => {
    hText4?.classList.add('in');
  }, 3900);
  setTimeout(() => {
    hText5?.classList.add('in');
    setCookie(HERO_SEEN_COOKIE, '1');
  }, 4200);
}
