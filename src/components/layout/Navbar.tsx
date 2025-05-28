import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useTheme } from '../../hooks/useTheme';
import { useScrollToSection } from '../../hooks/useScrollToSection';

import { DesktopNavLinks } from './navbar/DesktopNavLinks';
import { TopBarControls } from './navbar/TopBarControls';
import { MobileNavPanel } from './navbar/MobileNavPanel';
import { ProfileTerminalCard } from './navbar/ProfileTerminalCard';
import { FloatingHamburgerButton } from '../ui/FloatingHamburgerButton';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hamburgerPosition, setHamburgerPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const { t } = useTranslation();
  const nameRef = useRef<HTMLSpanElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const { scrollTo } = useScrollToSection();

  // Duración de animaciones - Optimizado para la nueva secuencia
  const animationTiming = useMemo(() => ({
    panelEntry: 0.5,     // Círculo se expande (un poco más lento para suavidad)
    panelExit: 0.45,     // Círculo se contrae (coordinado con items)
    hamburger: 0.3,      // Hamburguesa ↔ X
    items: 0.28          // Items aparecen/desaparecen
  }), []);

  // Calcular origen del círculo relativo al viewport
  const circleOrigin = useMemo(() => {
    if (!isClient || hamburgerPosition.x === 0) {
      return { x: "92%", y: "25px" };
    }

    const viewportWidth = window.innerWidth;
    const originX = (hamburgerPosition.x / viewportWidth) * 100;
    const originY = hamburgerPosition.y;

    return {
      x: `${Math.min(Math.max(originX, 5), 95)}%`,
      y: `${Math.min(Math.max(originY, 10), 100)}px`
    };
  }, [hamburgerPosition, isClient]);

  // Efectos
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useOnClickOutside([nameRef, profileCardRef], () => {
    if (isProfileCardOpen) setIsProfileCardOpen(false);
  });

  const handleNavLinkClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsProfileCardOpen(false);
    
    // ✅ AGREGAR scroll suave
    scrollTo(sectionId);
    
    // ✅ CERRAR menú móvil si está abierto
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [scrollTo, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isProfileCardOpen) setIsProfileCardOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProfileCardOpen]);

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

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setIsProfileCardOpen(false);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleHamburgerPositionCalculated = useCallback((position: { x: number; y: number }) => {
    setHamburgerPosition(position);
  }, []);

  return (
    <>
      {/* Navbar Principal - Z-index normal */}
      <motion.nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-navbar w-full",
          
          // Estados del fondo con Tailwind v4.1
          isScrolled || isMenuOpen || isProfileCardOpen ? [
            "bg-primary/90 backdrop-blur-lg shadow-md" // Clase semántica
          ] : "bg-transparent",
          
          // Transición suave usando nuestra utilidad
          "transition-theme-ultra" // ✅ CAMBIAR a transición ultra suave
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Nombre con transiciones */}
            <div className="flex-shrink-0 relative">
              <motion.span
                ref={nameRef}
                onClick={() => setIsProfileCardOpen(prev => !prev)}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05, // ✅ Verificar preferencias
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20,
                    duration: 0.2
                  }
                }}
                whileTap={{ 
                  scale: prefersReducedMotion ? 1 : 0.98 // ✅ Efecto al hacer clic
                }}
                className={cn(
                  "font-montserrat font-extrabold text-xl sm:text-2xl",
                  "cursor-pointer select-none inline-block", // ✅ AGREGAR inline-block
                  "text-accent-600 dark:text-accent-400", // Color fijo
                  "transform-gpu" // ✅ OPTIMIZACIÓN para GPU
                )}
                style={{
                  transformOrigin: "center center" // ✅ ASEGURAR origen de transformación
                }}
              >
                Sebastian Cachis
              </motion.span>
              
              {/* Profile card */}
              <div ref={profileCardRef}>
                <AnimatePresence>
                  {isProfileCardOpen && <ProfileTerminalCard isOpen={isProfileCardOpen} />}
                </AnimatePresence>
              </div>
            </div>

            {/* Navegación Desktop */}
            <div className="hidden md:flex items-center">
              <DesktopNavLinks
                activeSection={activeSection}
                onNavLinkClick={handleNavLinkClick}
              />
            </div>

            {/* Controles - perfectamente alineados */}
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-4">
              {/* Controles de tema e idioma */}
              <TopBarControls />
              
              {/* Botón Hamburguesa - Con más separación hacia la izquierda */}
              <div className="md:hidden ml-2 sm:ml-3">
                <FloatingHamburgerButton
                  isMenuOpen={isMenuOpen}
                  onToggle={handleMenuToggle}
                  onPositionCalculated={handleHamburgerPositionCalculated}
                  animationDuration={animationTiming.hamburger}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Panel Móvil con Revelación Circular - POR DEBAJO DE LA HAMBURGUESA */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MobileNavPanel
            activeSection={activeSection}
            onNavLinkClick={(sectionId) => {
              handleNavLinkClick(sectionId);
              handleMenuClose();
            }}
            closeMenu={handleMenuClose}
            circleOrigin={circleOrigin}
            animationTiming={animationTiming}
            hamburgerPosition={hamburgerPosition}
          />
        )}
      </AnimatePresence>
    </>
  );
};