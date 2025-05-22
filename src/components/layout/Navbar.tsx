import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils'; // Ajusta la ruta si no usas alias
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button'; // Ajusta la ruta
import { useTranslation } from 'react-i18next';

// Importa los sub-componentes de la carpeta ./navbar/
import { DesktopNavLinks } from './navbar/DesktopNavLinks';
import { TopBarControls } from './navbar/TopBarControls';
import { MobileNavPanel } from './navbar/MobileNavPanel';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home'); // 'home' como valor inicial
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation(); // Para el aria-label del botón de menú

  const handleNavLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // El cierre del menú móvil se maneja dentro de MobileNavPanel al hacer clic en un enlace
  };
  
  // Efecto para manejar el fondo de la navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para Scroll Spy (marcar sección activa)
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-50% 0px -50% 0px', // Activa cuando el centro de la sección está en el centro del viewport
      threshold: 0, // Se activa apenas un pixel es visible con ese rootMargin
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]'); // Asume que tus secciones tienen id
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []); // Se ejecuta una vez al montar

  const menuButtonLabel = isMenuOpen ? t('navbar_close_menu') : t('navbar_open_menu');

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        // El fondo cambia si está scrolleado O si el menú móvil está abierto
        isScrolled || isMenuOpen ? "bg-slate-100/90 dark:bg-neutral-950/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Izquierda: Nombre */}
          <div className="flex-shrink-0">
            <span
              className={cn(
                "font-montserrat font-bold hover:opacity-80 transition-opacity",
                "text-xl sm:text-2xl", // Móvil: text-xl, sm y mayores: text-2xl
                "text-slate-800 dark:text-neutral-50",
                "cursor-default" 
              )}
            >
              Sebastian Cachis
            </span>
          </div>

          {/* Centro (Desktop): Enlaces de Navegación */}
          <div className="hidden md:flex items-center">
            <DesktopNavLinks 
              activeSection={activeSection} 
              onNavLinkClick={handleNavLinkClick} 
            />
          </div>
          
          {/* Derecha (Controles y Menú Hamburguesa) */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Botones de Tema e Idioma (Visibles en Desktop y en Móvil ANTES del hamburguesa) */}
            <div className="hidden md:flex"> {/* Solo en Desktop, junto a los nav links */}
                <TopBarControls />
            </div>
            <div className="flex items-center md:hidden"> {/* Solo en Móvil, antes del hamburguesa */}
                <TopBarControls />
            </div>

            {/* Botón de Menú Hamburguesa (Solo Móvil) */}
            <div className="md:hidden">
              <Button
                variant="icon"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={menuButtonLabel}
                title={menuButtonLabel}
                className="text-slate-700 dark:text-neutral-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity:0 }} animate={{ rotate: 0, opacity:1 }} exit={{ rotate: 90, opacity:0 }} transition={{duration: 0.2}}>
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity:0 }} animate={{ rotate: 0, opacity:1 }} exit={{ rotate: -90, opacity:0 }} transition={{duration: 0.2}}>
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Menú Móvil (se renderiza debajo de la barra principal) */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileNavPanel 
            activeSection={activeSection}
            onNavLinkClick={(sectionId) => { // Asegura que el menú se cierre
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