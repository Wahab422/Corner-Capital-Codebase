import { initGSAP } from '../components/gsap';
import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

/** Push any init that returns a cleanup here so cleanupAboutPage runs it (Barba/SPA). */
const cleanupFunctions = [];

export async function initAboutPage() {
  logger.log('📄 About page initialized');

  try {
    await initGSAP();
  } catch (error) {
    handleError(error, 'About Page Initialization');
  }
}

export function cleanupAboutPage() {
  // Component cleanups (call for every component you init on this page)
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'About Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
