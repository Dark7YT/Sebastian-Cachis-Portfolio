import { useCallback, useRef } from 'react';
import { useResponsive } from './useResponsive';
import { APP_CONFIG } from '../config/app.config';

interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export const useScrollToSection = (defaultOptions?: ScrollOptions) => {
  const { navbarHeight } = useResponsive();
  const isScrollingRef = useRef(false);

  const scrollTo = useCallback((sectionId: string, options?: ScrollOptions) => {
    // Prevenir múltiples scrolls simultáneos
    if (isScrollingRef.current) return;

    const finalOptions = {
      offset: navbarHeight + 20, // Offset dinámico + padding
      duration: APP_CONFIG.ANIMATION.SCROLL_DURATION,
      easing: 'ease-in-out' as const,
      ...defaultOptions,
      ...options,
    };

    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`[useScrollToSection] Element with id "${sectionId}" not found`);
      return;
    }

    isScrollingRef.current = true;
    const targetPosition = element.offsetTop - finalOptions.offset;

    // Usar scroll nativo si está disponible
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Reset flag después de la animación estimada
      setTimeout(() => {
        isScrollingRef.current = false;
      }, finalOptions.duration);
    } else {
      // Fallback con requestAnimationFrame
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const easingFunctions = {
        'ease': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        'ease-in': (t: number) => t * t,
        'ease-out': (t: number) => t * (2 - t),
        'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      };

      const animateScroll = (currentTime: number) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / finalOptions.duration, 1);
        const easedProgress = easingFunctions[finalOptions.easing](progress);
        const currentPosition = startPosition + (distance * easedProgress);

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [navbarHeight, defaultOptions]);

  return { scrollTo, isScrolling: isScrollingRef.current };
};