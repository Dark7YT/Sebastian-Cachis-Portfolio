import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useTheme } from '../../hooks/useTheme';

import { DesktopNavLinks } from './navbar/DesktopNavLinks';
import { TopBarControls } from './navbar/TopBarControls';
import { MobileNavPanel } from './navbar/MobileNavPanel';
import { ProfileTerminalCard } from './navbar/ProfileTerminalCard';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const nameRef = useRef<HTMLSpanElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  // Memoiza los colores para evitar recreación
  const nameColors = useMemo(() => ({
    light: "text-emerald-500",
    dark: "text-emerald-400",
    hoverLight: "text-emerald-600",
    hoverDark: "text-emerald-300"
  }), []);

  // Calcula el color actual y hover según el tema
  const getNameColor = useCallback(
    (isHover = false) => {
      if (theme === 'dark') return isHover ? nameColors.hoverDark : nameColors.dark;
      return isHover ? nameColors.hoverLight : nameColors.light;
    },
    [theme, nameColors]
  );

  const [currentNameColorClass, setCurrentNameColorClass] = useState(getNameColor());

  // Cierra el card de perfil al hacer click fuera
  useOnClickOutside([nameRef, profileCardRef], () => {
    if (isProfileCardOpen) setIsProfileCardOpen(false);
  });

  // Handler para navegación
  const handleNavLinkClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsProfileCardOpen(false);
  }, []);

  // Efecto para cerrar el card de perfil al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isProfileCardOpen) setIsProfileCardOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProfileCardOpen]);

  // Efecto para observar secciones y actualizar la sección activa
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Efecto para actualizar el color del nombre según el tema
  useEffect(() => {
    setCurrentNameColorClass(getNameColor());
  }, [theme, getNameColor]);

  const menuButtonLabel = isMenuOpen ? t('navbar_close_menu') : t('navbar_open_menu');

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full",
        isScrolled || isMenuOpen || isProfileCardOpen
          ? "bg-slate-100/90 dark:bg-neutral-950/90 backdrop-blur-lg shadow-md"
          : "bg-transparent",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Nombre y card de perfil */}
          <div className="flex-shrink-0 relative">
            <motion.span
              ref={nameRef}
              onClick={() => setIsProfileCardOpen(prev => !prev)}
              onHoverStart={() => {
                if (!prefersReducedMotion) setCurrentNameColorClass(getNameColor(true));
              }}
              onHoverEnd={() => {
                setCurrentNameColorClass(getNameColor());
              }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              className={cn(
                "font-montserrat font-extrabold",
                currentNameColorClass,
                "text-xl sm:text-2xl",
                "cursor-pointer select-none transition-colors duration-200 ease-out"
              )}
            >
              Sebastian Cachis
            </motion.span>
            <div ref={profileCardRef}>
              <AnimatePresence>
                {isProfileCardOpen && <ProfileTerminalCard isOpen={isProfileCardOpen} />}
              </AnimatePresence>
            </div>
          </div>

          {/* Navegación de escritorio */}
          <div className="hidden md:flex items-center">
            <DesktopNavLinks
              activeSection={activeSection}
              onNavLinkClick={handleNavLinkClick}
            />
          </div>

          {/* Controles y menú móvil */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="flex">
              <TopBarControls />
            </div>
            <div className="md:hidden">
              <Button
                variant="icon"
                size="icon"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsProfileCardOpen(false);
                }}
                aria-label={menuButtonLabel}
                title={menuButtonLabel}
                className="text-slate-700 dark:text-neutral-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de navegación móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileNavPanel
            activeSection={activeSection}
            onNavLinkClick={(sectionId) => {
              handleNavLinkClick(sectionId);
              setIsMenuOpen(false);
            }}
            closeMenu={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};