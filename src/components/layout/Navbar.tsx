import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useTheme } from '../../hooks/useTheme';

import { DesktopNavLinks } from './navbar/DesktopNavLinks';
import { TopBarControls } from './navbar/TopBarControls';
import { MobileNavPanel } from './navbar/MobileNavPanel';
import { ProfileTerminalCard } from './navbar/ProfileTerminalCard';
import { AnimatedHamburgerIcon } from '../ui/AnimatedHamburgerIcon'; 

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const nameRef = useRef<HTMLSpanElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null); 
  const navRef = useRef<HTMLElement>(null); 
  const [isClient, setIsClient] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const nameColors = useMemo(() => ({
    light: "text-emerald-500",
    dark: "text-emerald-400",
    hoverLight: "text-emerald-600",
    hoverDark: "text-emerald-300"
  }), []);

  const getNameColor = useCallback(
    (isHover = false) => {
      if (theme === 'dark') return isHover ? nameColors.hoverDark : nameColors.dark;
      return isHover ? nameColors.hoverLight : nameColors.light;
    },
    [theme, nameColors]
  );

  const [currentNameColorClass, setCurrentNameColorClass] = useState(getNameColor());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useOnClickOutside([nameRef, profileCardRef], () => {
    if (isProfileCardOpen) setIsProfileCardOpen(false);
  });

  const handleNavLinkClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsProfileCardOpen(false); 
  }, []);

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

  useEffect(() => {
    setCurrentNameColorClass(getNameColor());
  }, [theme, getNameColor]);

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

  const menuButtonLabel = isMenuOpen ? t('navbar_close_menu') : t('navbar_open_menu');
  
  const mobilePanelAnimationDuration = 0.4; 
  const mobilePanelExitDuration = 0.3; 

  const [circleOrigin, setCircleOrigin] = useState({ x: "92%", y: "25px" }); // Valores por defecto ajustables

  useEffect(() => {
    if (hamburgerButtonRef.current && navRef.current && isClient && isMenuOpen) { // Calcular solo cuando se abre
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = hamburgerButtonRef.current.getBoundingClientRect();

      const btnCenterXViewport = btnRect.left + btnRect.width / 2;
      
      const panelOriginX = btnCenterXViewport - navRect.left;
    
      const panelWidthApproximation = window.innerWidth; 

      setCircleOrigin({
        x: `${(panelOriginX / panelWidthApproximation) * 100}%`,
        y: `25px`
      });
    } else if (!isClient) {
        setCircleOrigin({ x: "92%", y: "25px" });
    }
  }, [isClient, isMenuOpen]);

  return (
    <motion.nav
      ref={navRef} 
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

          <div className="hidden md:flex items-center">
            <DesktopNavLinks
              activeSection={activeSection}
              onNavLinkClick={handleNavLinkClick}
            />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="flex">
              <TopBarControls />
            </div>
            <div className="md:hidden">
              <Button
                ref={hamburgerButtonRef} 
                variant="icon"
                size="icon"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsProfileCardOpen(false);
                }}
                aria-label={menuButtonLabel}
                title={menuButtonLabel}
                className="text-slate-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              >
                <AnimatedHamburgerIcon 
                  isOpen={isMenuOpen}
                  transitionDuration={isMenuOpen ? mobilePanelAnimationDuration : mobilePanelExitDuration} 
                  className="h-5 w-5" 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MobileNavPanel
            activeSection={activeSection}
            onNavLinkClick={(sectionId) => {
              handleNavLinkClick(sectionId);
              setIsMenuOpen(false); 
            }}
            closeMenu={() => setIsMenuOpen(false)}
            animationDuration={mobilePanelAnimationDuration}
            exitAnimationDuration={mobilePanelExitDuration}
            circleOriginX={circleOrigin.x} 
            circleOriginY={circleOrigin.y} 
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};