import { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/app.config';

interface ResponsiveInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  navbarHeight: number;
}

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState<ResponsiveInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1200,
        height: 800,
        navbarHeight: APP_CONFIG.NAVBAR.HEIGHT_DESKTOP,
      };
    }

    const width = window.innerWidth;
    const isMobile = width < APP_CONFIG.BREAKPOINTS.MOBILE;
    const isTablet = width >= APP_CONFIG.BREAKPOINTS.MOBILE && width < APP_CONFIG.BREAKPOINTS.TABLET;
    const isDesktop = width >= APP_CONFIG.BREAKPOINTS.DESKTOP;

    return {
      isMobile,
      isTablet,
      isDesktop,
      width,
      height: window.innerHeight,
      navbarHeight: isMobile ? APP_CONFIG.NAVBAR.HEIGHT_MOBILE : APP_CONFIG.NAVBAR.HEIGHT_DESKTOP,
    };
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const isMobile = width < APP_CONFIG.BREAKPOINTS.MOBILE;
        const isTablet = width >= APP_CONFIG.BREAKPOINTS.MOBILE && width < APP_CONFIG.BREAKPOINTS.TABLET;
        const isDesktop = width >= APP_CONFIG.BREAKPOINTS.DESKTOP;

        setDimensions({
          isMobile,
          isTablet,
          isDesktop,
          width,
          height: window.innerHeight,
          navbarHeight: isMobile ? APP_CONFIG.NAVBAR.HEIGHT_MOBILE : APP_CONFIG.NAVBAR.HEIGHT_DESKTOP,
        });
      }, 100); // Debounce
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
};