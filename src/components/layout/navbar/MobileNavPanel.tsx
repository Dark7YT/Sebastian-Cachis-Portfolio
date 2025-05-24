import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface MobileNavPanelProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
  closeMenu: () => void;
  animationDuration?: number;
}

export const MobileNavPanel: React.FC<MobileNavPanelProps> = ({
  activeSection,
  onNavLinkClick,
  closeMenu
}) => {
  const { t } = useTranslation();

  const panelVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeIn",
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, transition: { type: "tween", ease: "easeIn", duration: 0.2 } },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.05 } },
  };

  // Permite solo rutas internas (empiezan con "/" o "#")
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
        {NAV_LINKS.map((link: NavLinkType, index) => {
          const isActive = activeSection === link.id;
          const isInternal = isInternalHref(link.href);
          return (
            <motion.a
              key={link.id}
              href={isInternal ? link.href : "#"}
              onClick={e => {
                if (isInternal) {
                  onNavLinkClick(link.id);
                  closeMenu();
                } else {
                  e.preventDefault();
                  // Opcional: mostrar advertencia o registrar intento de redirección externa
                }
              }}
              custom={index}
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