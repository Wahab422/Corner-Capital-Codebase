  
import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

const cleanupFunctions = [];

export function initNavbar() {
  logger.log('📱 Navbar initialized');

  try {
    const menuBtn = document.querySelector('[menu-btn]');
    const nav = document.querySelector('[nav]');
    if (menuBtn && nav) {
      const handleMenuBtnClick = () => {
        nav.classList.toggle('open');
      };
      menuBtn.addEventListener('click', handleMenuBtnClick);
      cleanupFunctions.push(() => {
        menuBtn.removeEventListener('click', handleMenuBtnClick);
      });
    }
  } catch (error) {
    handleError(error, 'Navbar Initialization');
  }
}

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
