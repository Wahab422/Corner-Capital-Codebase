import { initGSAP } from '../components/gsap';
import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';
import { initVideoPlayer, cleanupVideoPlayer } from '../components/videoPlayer';
import { initSwiper, destroySwipers } from '../components/swiper';

/** Push any init that returns a cleanup here so cleanupHomePage runs it (Barba/SPA). */
const cleanupFunctions = [];

export async function initHomePage() {
  logger.log('🏠 Home page initialized');

  try {
    await initGSAP();
    if (document.querySelector('video-source-player')) {
      initVideoPlayer();
    }
    if (document.querySelector('[swiper-slider]')) {
      initSwiper();
    }
  } catch (error) {
    handleError(error, 'Home Page Initialization');
  }
}

export function cleanupHomePage() {
  // Component cleanups (call for every component you init on this page)
  cleanupVideoPlayer();
  destroySwipers();
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Home Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
