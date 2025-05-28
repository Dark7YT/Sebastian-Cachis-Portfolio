// Variantes base reutilizables
export const BASE_VARIANTS = {
  // Fade básico
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Slide desde abajo
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  },

  // Slide desde la derecha
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  },

  // Scale suave
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  },
} as const;

// Variantes específicas de componentes
export const COMPONENT_VARIANTS = {
  navbar: {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  },

  footer: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], 
        delay: 0.2, 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    },
  },

  mobilePanel: {
    hidden: {
      clipPath: "circle(0% at var(--origin-x, 95%) var(--origin-y, 25px))",
      opacity: 0,
    },
    visible: {
      clipPath: "circle(150vmax at var(--origin-x, 95%) var(--origin-y, 25px))",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren",
        staggerChildren: 0.06,
        delayChildren: 0.2,
      }
    },
  },

  terminalCard: {
    hidden: { opacity: 0, scale: 0.3, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 35,
        mass: 0.9,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  },
} as const;

// Hover effects reutilizables
export const HOVER_VARIANTS = {
  scale: {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  },

  scaleRotate: {
    hover: { 
      scale: 1.1,
      rotate: 3,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  },

  lift: {
    hover: { 
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  },
} as const;