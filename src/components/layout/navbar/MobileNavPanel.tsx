import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface CircleOrigin {
  x: string;
  y: string;
}

interface AnimationTiming {
  panelEntry: number;
  panelExit: number;
  hamburger: number;
  items: number;
}

interface HamburgerPosition {
  x: number;
  y: number;
}

interface MobileNavPanelProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
  closeMenu: () => void;
  circleOrigin: CircleOrigin;
  animationTiming: AnimationTiming;
  hamburgerPosition: HamburgerPosition;
}

export const MobileNavPanel: React.FC<MobileNavPanelProps> = ({
  activeSection,
  onNavLinkClick,
  circleOrigin,
  animationTiming,
  hamburgerPosition
}) => {
  const { t } = useTranslation();

  const circleRadius = "150vmax";

  // Overlay con transiciones del CSS
  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: animationTiming.panelExit,
        ease: "easeIn"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: animationTiming.panelEntry * 0.8,
        ease: "easeOut"
      }
    }
  };

  // Panel principal
  const panelVariants: Variants = {
    hidden: {
      clipPath: `circle(0px at ${circleOrigin.x} ${circleOrigin.y})`,
      opacity: 0,
      transition: {
        type: "tween",
        duration: animationTiming.panelExit,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1,
        delayChildren: 0
      }
    },
    visible: {
      clipPath: `circle(${circleRadius} at ${circleOrigin.x} ${circleOrigin.y})`,
      opacity: 1,
      transition: {
        type: "tween",
        duration: animationTiming.panelEntry,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren",
        staggerChildren: 0.06,
        delayChildren: animationTiming.panelEntry * 0.4
      }
    }
  };

  // Items con animaciones optimizadas
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: 20,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: animationTiming.items * 0.6
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: animationTiming.items * 1.2
      }
    }
  };

  const isInternalHref = (href: string) => /^\/|^#/.test(href);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Overlay - usando z-index del CSS */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-mobile-overlay bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Panel principal */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={cn(
          "fixed inset-0 z-mobile-panel md:hidden min-h-screen",
          "flex flex-col items-center",
          "bg-secondary",
          "transition-theme-ultra" // ✅ CAMBIAR a transición ultra suave
        )}
        style={{
          transformOrigin: `${circleOrigin.x} ${circleOrigin.y}`
        }}
      >
        <div 
          className="w-full max-w-xs mx-auto px-6 flex flex-col justify-center"
          style={{
            marginTop: hamburgerPosition.y < 100 ? '120px' : '80px',
            minHeight: 'auto'
          }}
        >
          <nav className="space-y-5 pt-8">
            {NAV_LINKS.map((link: NavLinkType, index) => {
              const isActive = activeSection === link.id;
              const isInternal = isInternalHref(link.href);
              const Icon = link.icon;

              return (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <motion.a
                    href={isInternal ? link.href : "#"}
                    onClick={e => {
                      if (isInternal) {
                        e.preventDefault();
                        onNavLinkClick(link.id); // ✅ Esto ahora incluye scroll suave
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "group flex items-center space-x-4 px-6 py-5 rounded-2xl",
                      "text-lg font-semibold shadow-sm transition-smooth",
                      
                      isActive ? [
                        "bg-accent-100 text-accent-700", // Rojo en lugar de emerald
                        "dark:bg-accent-900/40 dark:text-accent-400"
                      ] : [
                        "text-primary hover:text-primary", // Clases semánticas
                        "hover:bg-tertiary hover:shadow-md"
                      ]
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6 transition-colors duration-200",
                        isActive
                          ? "text-brand-600 dark:text-brand-400"
                          : "text-slate-500 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-neutral-300"
                      )}
                    />
                    <span className="flex-1">{t(link.labelKey)}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-2.5 h-2.5 bg-brand-500 rounded-full"
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30 
                        }}
                      />
                    )}
                  </motion.a>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
};