import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { motion, type   Variants } from 'framer-motion'; 
import { cn } from '../../../lib/utils';

interface MobileNavPanelProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
  closeMenu: () => void;
  animationDuration?: number;
  exitAnimationDuration?: number;
  circleOriginX?: string;
  circleOriginY?: string;
}

export const MobileNavPanel: React.FC<MobileNavPanelProps> = ({
  activeSection,
  onNavLinkClick,
  closeMenu,
  animationDuration = 0.4,
  exitAnimationDuration = 0.3,
  circleOriginX = "90%",  
  circleOriginY = "20px",   
}) => {
  const { t } = useTranslation();

  const circleRadius = "150vmax"; 

  const panelVariants: Variants = { 
    hidden: {
      clipPath: `circle(0px at ${circleOriginX} ${circleOriginY})`,
      opacity: 0.8, 
      transition: {
        type: "tween", 
        duration: exitAnimationDuration, 
        ease: "easeIn",
        when: "afterChildren", 
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    },
    visible: {
      clipPath: `circle(${circleRadius} at ${circleOriginX} ${circleOriginY})`,
      opacity: 1,
      transition: {
        type: "tween",
        duration: animationDuration,
        ease: "easeOut",
        when: "beforeChildren", 
        staggerChildren: 0.05, 
      }
    },
  };

  const itemVariants: Variants = { // Tipar con Variants
    hidden: { opacity: 0, y: 20, transition: { type: "tween", ease: "easeIn", duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
    };

  const isInternalHref = (href: string) => /^\/|^#/.test(href);

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="md:hidden absolute left-0 right-0 top-full bg-slate-100/90 dark:bg-neutral-950/90 backdrop-blur-lg shadow-xl pb-4 border-t border-slate-200/50 dark:border-neutral-800/50"
    >
      <div className="px-2 pt-4 pb-6 space-y-1 sm:px-3">
        {NAV_LINKS.map((link: NavLinkType) => {
          const isActive = activeSection === link.id;
          const isInternal = isInternalHref(link.href);
          return (
            <motion.a
              key={link.id}
              href={isInternal ? link.href : "#"} 
              onClick={e => {
                if (isInternal) {
                  e.preventDefault(); 
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  onNavLinkClick(link.id);
                  closeMenu();
                }
              }}
              variants={itemVariants}
              className={cn(
                "block px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-neutral-950",
                isActive
                  ? "bg-sky-100 text-sky-600 dark:bg-sky-700/30 dark:text-sky-400"
                  : "text-slate-700 hover:bg-slate-200/70 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {t(link.labelKey)}
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};