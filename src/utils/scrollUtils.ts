export const smoothScrollToSection = (
  sectionId: string, 
  options?: {
    offset?: number;
    duration?: number;
    easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  }
) => {
  const { 
    offset = 80, // Altura del navbar
    duration = 800,
    easing = 'ease-in-out'
  } = options || {};

  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Element with id "${sectionId}" not found`);
    return;
  }

  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  
  // ✅ USAR scroll-behavior nativo si está disponible
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } else {
    // ✅ FALLBACK con animación manual para navegadores antiguos
    const startTime = performance.now();
    
    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // ✅ FUNCIONES DE EASING
      const easingFunctions = {
        'ease': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        'ease-in': (t: number) => t * t,
        'ease-out': (t: number) => t * (2 - t),
        'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      };
      
      const easedProgress = easingFunctions[easing](progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }
};