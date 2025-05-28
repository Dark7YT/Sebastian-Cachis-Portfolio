export const APP_CONFIG = {
  // Dimensiones y offsets
  NAVBAR: {
    HEIGHT_MOBILE: 64,
    HEIGHT_DESKTOP: 80,
    SCROLL_THRESHOLD: 20,
  },
  
  // Duraciones de animación normalizadas
  ANIMATION: {
    THEME_TRANSITION: 650,
    HOVER_FAST: 200,
    HOVER_NORMAL: 300,
    SCROLL_DURATION: 800,
    FOOTER_SCROLL_DURATION: 1000,
  },
  
  // Terminal configuración
  TERMINAL: {
    TYPING_SPEEDS: {
      HEADER: 60,
      COMMAND: 35,
      OUTPUT: 25,
    },
    DELAYS: {
      HEADER: 300,
      COMMAND: 400,
      OUTPUT: 200,
    },
  },
  
  // Breakpoints consistentes
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;