import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../constants/navigation';
import { FlagText } from '../ui/FlagText';
import { useState } from 'react';
import { useScrollToSection } from '../../hooks/useScrollToSection';

// Arrays estáticos fuera del componente para evitar recreación
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Dark7YT', icon: Github, ariaLabelKey: 'footer_github_aria' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastian-nicolas-cachis-gonzales-667b23308/', icon: Linkedin, ariaLabelKey: 'footer_linkedin_aria' },
  { name: 'Twitter', href: 'https://x.com/Dark7YT', icon: Twitter, ariaLabelKey: 'footer_twitter_aria' },
  { name: 'Email', href: 'mailto:sebastianjae21@gmail.com', icon: Mail, ariaLabelKey: 'footer_email_aria' },
];

// ✅ TECNOLOGÍAS SIN HOVER ROJO - mantienen sus gradientes originales
const portfolioTechStack = [
  {
    name: 'React',
    href: 'https://react.dev/',
    className: 'bg-gradient-to-br from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white hover:shadow-lg hover:shadow-sky-500/30'
  },
  {
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org/docs/',
    className: 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white hover:shadow-lg hover:shadow-blue-500/30'
  },
  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com/docs',
    className: 'bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white hover:shadow-lg hover:shadow-cyan-500/30'
  },
  {
    name: 'Vite',
    href: 'https://vitejs.dev/guide/',
    className: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
  },
  {
    name: 'Framer Motion',
    href: 'https://www.framer.com/motion/',
    className: 'bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 hover:from-pink-600 hover:via-purple-700 hover:to-fuchsia-700 text-white hover:shadow-lg hover:shadow-pink-500/30'
  }
];

// ✅ CLASES BASE MEJORADAS para tecnologías
const techLinkBaseClass = cn(
  "text-xs font-medium px-3 py-1.5 rounded-full transition-smooth !text-white",
  "hover:scale-105", // ✅ Solo escalado sutil
  "active:scale-95", // ✅ Efecto al hacer clic
  "transform transition-all duration-300 ease-out" // ✅ Transición suave
);

// ✅ Agregar al inicio del componente Footer, después de las otras variantes:

const letterHoverVariants = {
  initial: { y: 0 },
  hover: { y: -2 },
};

// ✅ Componente para texto con efecto letra por letra
const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterHoverVariants}
          initial="initial"
          animate={hoveredIndex === index ? "hover" : "initial"}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 15,
            mass: 0.5
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block"
          style={{ 
            transformOrigin: 'bottom center',
            // ✅ Mantener espacios normales
            minWidth: char === ' ' ? '0.25em' : 'auto'
          }}
        >
          {char === ' ' ? '\u00A0' : char} {/* ✅ Espacio no rompible */}
        </motion.span>
      ))}
    </span>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  
  // ✅ AGREGAR hook de scroll suave
  const { scrollTo } = useScrollToSection({
    duration: 1000, // ✅ Scroll más lento desde el footer
    easing: 'ease-out'
  });

  // ✅ FUNCIÓN para manejar clicks en enlaces rápidos
  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollTo(sectionId);
  };

  // Variantes de animación
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2, when: "beforeChildren", staggerChildren: 0.1 }
    },
  };

  const columnContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const iconItemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1, scale: 1,
      transition: { delay: prefersReducedMotion ? 0 : i * 0.05, type: "spring", stiffness: 200, damping: 12 }
    }),
  };

  const iconHoverEffect = prefersReducedMotion ? {} : {
    y: -3, scale: 1.15,
    transition: { type: 'spring', stiffness: 300, damping: 8 }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        "py-12 md:py-16 px-4 sm:px-6 lg:px-8",
        "bg-tertiary",
        "border-t border-default",
        "text-secondary text-sm",
        "transition-theme-ultra" // ✅ CAMBIAR a transición ultra suave
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] lg:grid-cols-[2.5fr_1fr_1.5fr] gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 text-left">
          
          {/* Bio y redes */}
          <motion.div variants={columnContentVariants} className="space-y-4 md:pr-6 lg:pr-8">
            {/* ✅ NOMBRE CON HOVER AGREGADO */}
            <h2 className="text-xl font-montserrat font-bold text-primary hover:text-red-600 dark:hover:text-red-400 transition-smooth cursor-pointer">
              Sebastian Cachis
            </h2>
            <p className="text-sm leading-relaxed text-secondary">
              {t('footer_bio_placeholder')}
            </p>
            {/* Redes sociales */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(link.ariaLabelKey, link.name)}
                  custom={index}
                  variants={iconItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "relative overflow-hidden", // ✅ CLAVE: relative + overflow-hidden
                    "text-muted transition-smooth p-2 rounded-full",
                    "group" // ✅ Para efectos de grupo
                  )}
                >
                  {/* ✅ FONDO HOVER QUE SIGUE LA TRANSFORMACIÓN */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full",
                      "bg-red-50 dark:bg-red-950/30",
                      "opacity-0 group-hover:opacity-100",
                      "transition-all duration-300 ease-out",
                      "shadow-lg shadow-red-500/20 group-hover:shadow-red-500/30"
                    )}
                  />
                  
                  {/* ✅ BORDE HOVER QUE SIGUE LA TRANSFORMACIÓN */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full border",
                      "border-transparent group-hover:border-red-200 dark:group-hover:border-red-800/50",
                      "transition-all duration-300 ease-out"
                    )}
                  />
                  
                  {/* ✅ ICONO CON TRANSFORMACIÓN DE COLOR */}
                  <link.icon 
                    className={cn(
                      "w-6 h-6 relative z-10",
                      "text-muted group-hover:text-red-600 dark:group-hover:text-red-400",
                      "transition-colors duration-300 ease-out"
                    )}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div variants={columnContentVariants} className="space-y-4">
            {/* ✅ TÍTULO CON HOVER AGREGADO */}
            <h3 className="text-base font-montserrat font-semibold text-primary hover:text-red-600 dark:hover:text-red-400 transition-smooth cursor-pointer">
              {t('footer_quick_links')}
            </h3>
            {/* ✅ ENLACES RÁPIDOS con hover rojo mejorado */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {NAV_LINKS.map((link: NavLinkType, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleQuickLinkClick(e, link.href)}
                  aria-label={t(link.labelKey)}
                  title={t(link.labelKey)}
                  custom={index + socialLinks.length}
                  variants={iconItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.1,
                    rotate: -2,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "relative overflow-hidden", // ✅ CLAVE: relative + overflow-hidden
                    "p-2.5 rounded-full transition-smooth",
                    "group" // ✅ Para efectos de grupo
                  )}
                >
                  {/* ✅ FONDO HOVER QUE SIGUE LA TRANSFORMACIÓN */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full",
                      "bg-red-50 dark:bg-red-950/30",
                      "opacity-0 group-hover:opacity-100",
                      "transition-all duration-300 ease-out",
                      "shadow-lg shadow-red-500/20 group-hover:shadow-red-500/30"
                    )}
                  />
                  
                  {/* ✅ BORDE HOVER QUE SIGUE LA TRANSFORMACIÓN */}
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full border",
                      "border-transparent group-hover:border-red-200 dark:group-hover:border-red-800/50",
                      "transition-all duration-300 ease-out"
                    )}
                  />
                  
                  {/* ✅ ICONO CON TRANSFORMACIÓN DE COLOR */}
                  <link.icon 
                    className={cn(
                      "w-5 h-5 relative z-10",
                      "text-muted group-hover:text-red-600 dark:group-hover:text-red-400",
                      "transition-colors duration-300 ease-out"
                    )}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Stack tecnológico */}
          <motion.div variants={columnContentVariants} className="space-y-4">
            {/* ✅ TÍTULO CON HOVER AGREGADO */}
            <h3 className="text-base font-montserrat font-semibold text-primary hover:text-red-600 dark:hover:text-red-400 transition-smooth cursor-pointer">
              {t('footer_technologies_used')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolioTechStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    techLinkBaseClass,
                    tech.className,
                    !prefersReducedMotion && "hover:scale-105"
                  )}
                  title={tech.name}
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pie de página */}
        <motion.div variants={columnContentVariants} className="pt-8 border-t border-subtle">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs">
            {/* ✅ COPYRIGHT CON ELEVACIÓN SUTIL */}
            <motion.p 
              className="text-muted hover:text-red-600 dark:hover:text-red-400 transition-all duration-500 mb-2 sm:mb-0 cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  staggerChildren: 0.02,
                  delayChildren: 0.1
                }
              }}
            >
              <motion.span className="inline-block">
                {`© ${currentYear} Sebastian Cachis. ${t('footer_rights_reserved')}`.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                      hover: { 
                        y: -2,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 15,
                          delay: index * 0.01 // ✅ Retraso progresivo
                        }
                      }
                    }}
                    style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.p>
            
            {/* ✅ "HECHO EN PE" CON ELEVACIÓN SUTIL */}
            <motion.p 
              className="text-muted hover:text-red-600 dark:hover:text-red-400 transition-all duration-500 cursor-pointer flex items-center gap-1"
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  staggerChildren: 0.02,
                  delayChildren: 0.1
                }
              }}
            >
              {/* ✅ TEXTO "HECHO EN" CON EFECTO LETRA POR LETRA */}
              <motion.span className="inline-block">
                {t('footer_built_with').split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                      hover: { 
                        y: -2,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 15,
                          delay: index * 0.01 // ✅ Retraso progresivo
                        }
                      }
                    }}
                    style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
              
              {/* ✅ BANDERA CON EFECTO ESPECIAL */}
              <motion.span 
                className="text-accent"
                variants={{
                  hover: { 
                    y: -3,
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15,
                      delay: t('footer_built_with').length * 0.01 + 0.05 // ✅ Después del texto
                    }
                  }
                }}
              >
                <FlagText countryCode="PE" flagSize="sm" textClassName="text-accent" />
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};