// MobileNavPanel.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { motion, type   Variants } from 'framer-motion'; // Asegúrate de importar Variants
import { cn } from '../../../lib/utils';

interface MobileNavPanelProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
  closeMenu: () => void;
  animationDuration?: number;
  exitAnimationDuration?: number; // Nueva prop para la duración de salida
  circleOriginX?: string;       // Prop para el origen X del círculo
  circleOriginY?: string;       // Prop para el origen Y del círculo
}

export const MobileNavPanel: React.FC<MobileNavPanelProps> = ({
  activeSection,
  onNavLinkClick,
  closeMenu,
  animationDuration = 0.4, // Duración por defecto si no se provee
  exitAnimationDuration = 0.3,
  circleOriginX = "90%",   // Origen por defecto X (cerca de la derecha)
  circleOriginY = "20px",   // Origen por defecto Y (cerca del tope)
}) => {
  const { t } = useTranslation();

  // Radio suficientemente grande para cubrir el panel.
  // 150% de la dimensión mayor suele funcionar. Si el panel es alto, usa vh/vw.
  const circleRadius = "150vmax"; // O "200%" o un cálculo más preciso si es necesario

  const panelVariants: Variants = { // Tipar con Variants
    hidden: {
      clipPath: `circle(0px at ${circleOriginX} ${circleOriginY})`,
      opacity: 0.8, // Puede empezar ligeramente visible o totalmente invisible
      transition: {
        type: "tween", // O "spring"
        duration: exitAnimationDuration, // Usar duración de salida
        ease: "easeIn",
        when: "afterChildren", // Animar hijos antes de que el panel se cierre
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    },
    visible: {
      clipPath: `circle(${circleRadius} at ${circleOriginX} ${circleOriginY})`,
      opacity: 1,
      transition: {
        type: "tween", // "spring" puede dar un buen efecto también
        // stiffness: 100, // Si es spring
        // damping: 20,    // Si es spring
        duration: animationDuration,
        ease: "easeOut",
        when: "beforeChildren", // Revelar panel antes que los items
        staggerChildren: 0.05, // Stagger para los items
      }
    },
  };

  const itemVariants: Variants = { // Tipar con Variants
    hidden: { opacity: 0, y: 20, transition: { type: "tween", ease: "easeIn", duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
    // Alternativa con spring:
    // visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 15, delay: 0.05 } },
  };

  const isInternalHref = (href: string) => /^\/|^#/.test(href);

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="md:hidden absolute left-0 right-0 top-full bg-slate-100/90 dark:bg-neutral-950/90 backdrop-blur-lg shadow-xl pb-4 border-t border-slate-200/50 dark:border-neutral-800/50"
      // style={{
      //   // Para ver el origen del clip-path durante el desarrollo (¡quitar en producción!):
      // '--origin-x': circleOriginX,
      // '--origin-y': circleOriginY,
      // background: `radial-gradient(circle at var(--origin-x) var(--origin-y), red, transparent 20px)`
      // }}
    >
      {/* El contenido interno también puede tener su propio motion.div si es necesario para el stagger,
          pero el staggerChildren en el panel principal debería afectar a los motion.a directamente. */}
      <div className="px-2 pt-4 pb-6 space-y-1 sm:px-3">
        {NAV_LINKS.map((link: NavLinkType) => { // index no se usa en custom para itemVariants aquí
          const isActive = activeSection === link.id;
          const isInternal = isInternalHref(link.href);
          return (
            <motion.a
              key={link.id}
              href={isInternal ? link.href : "#"} // Evitar ancla vacía si no es interna
              onClick={e => {
                if (isInternal) {
                  e.preventDefault(); // Prevenir navegación si es scroll a sección
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  onNavLinkClick(link.id); // Para actualizar estado activo
                  closeMenu();
                } else {
                   // Para enlaces externos, el comportamiento por defecto del navegador es suficiente
                   // o podrías querer cerrarlo también. Por ahora lo dejo así.
                }
              }}
              variants={itemVariants} // Los items se animarán debido al staggerChildren del padre
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