import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface MobileNavPanelProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
  closeMenu: () => void;
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
      y: "-100%", // Comienza completamente fuera de la vista, arriba
      transition: { 
        type: "tween", // Usaremos tween para más control en la salida
        duration: 0.3, // Más rápido
        ease: "easeIn",
        when: "afterChildren",
        staggerChildren: 0.03, // Los hijos se animan más rápido al salir
        staggerDirection: -1,
      } 
    },
    visible: { 
      opacity: 1,
      y: "0%", // Desliza hacia abajo a su posición
      transition: { 
        type: "spring", // Spring para una entrada más natural
        stiffness: 260,
        damping: 25,
        duration: 0.4, // Duración general de la entrada del panel
        when: "beforeChildren",
        staggerChildren: 0.05, // Los hijos entran escalonadamente
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, transition: { type: "tween", ease:"easeIn", duration: 0.2 } },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.05 } },
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      // El fondo de la navbar ya tiene backdrop-blur, así que el panel lo heredará si el fondo es semitransparente
      className="md:hidden absolute left-0 right-0 top-full bg-slate-100/90 dark:bg-neutral-950/90 backdrop-blur-lg shadow-xl pb-4 border-t border-slate-200/50 dark:border-neutral-800/50"
      // Aumentado el blur y la opacidad del fondo para mayor efecto
    >
      <div className="px-2 pt-4 pb-6 space-y-1 sm:px-3">
        {NAV_LINKS.map((link: NavLinkType, index) => ( // Añadido index para posible delay escalonado
          <motion.a
            key={link.id}
            href={link.href}
            onClick={() => { onNavLinkClick(link.id); closeMenu(); }}
            custom={index} // Para animaciones escalonadas si se usa en las variantes
            variants={itemVariants} 
            // initial="hidden" animate="visible" exit="hidden" // AnimatePresence maneja esto para el panel
            className={cn(
              "block px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-neutral-950",
              activeSection === link.id
                ? "bg-sky-100 text-sky-600 dark:bg-sky-700/30 dark:text-sky-400"
                : "text-slate-700 hover:bg-slate-200/70 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
            )}
          >
            {t(link.labelKey)}
          </motion.a>
        ))}
      </div>
      {/* Los botones de tema e idioma ya no están aquí, están en la barra superior */}
    </motion.div>
  );
};