// TopBarControls.tsx
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../../../components/ui/Button'; 
import { Moon, Sun, Languages } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const TopBarControls = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  // Determina idioma y textos
  const isSpanish = i18n.language === 'es';
  const currentLanguageCode = isSpanish ? 'ES' : 'EN';
  const langButtonLabel = t(isSpanish ? 'toggle_language_en' : 'toggle_language_es');
  const themeButtonLabel = t(theme === 'light' ? 'toggle_theme_dark' : 'toggle_theme_light');

  // Animaciones solo si no hay reduced motion
  const themeIconVariants = prefersReducedMotion ? undefined : {
    enter: { rotateY: -180, opacity: 0, scale: 0.8 },
    center: { rotateY: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" }},
    exit: { rotateY: 180, opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" }},
  };
  const iconHoverVariants = prefersReducedMotion ? undefined : {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 15, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 }}
  };
  const languageButtonHoverProps = prefersReducedMotion ? {} : {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      {/* Botón de tema */}
      <Button
        variant="icon" 
        size="icon" 
        onClick={toggleTheme} 
        aria-label={themeButtonLabel} 
        title={themeButtonLabel}
        className="relative overflow-hidden flex items-center justify-center text-slate-700 dark:text-neutral-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={theme} 
            variants={themeIconVariants}
            initial="enter" 
            animate="center" 
            exit="exit"
            whileHover="hover" 
          >
            <motion.div 
              variants={iconHoverVariants} 
              className="flex items-center justify-center"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Button>

      {/* Botón de idioma */}
      <motion.div 
        whileHover={languageButtonHoverProps}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="icon" 
          size="icon" 
          onClick={() => i18n.changeLanguage(isSpanish ? 'en' : 'es')}
          aria-label={langButtonLabel} 
          title={langButtonLabel}
          className="overflow-hidden relative flex items-center justify-center text-slate-700 dark:text-neutral-300 px-0.5 sm:px-1"
        >
          <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 flex-shrink-0" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span 
              key={currentLanguageCode} 
              initial={{ y: 8, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -8, opacity: 0 }} 
              transition={{ duration: 0.2, ease: "easeInOut" }} 
              className="inline-block text-xs font-semibold"
            >
              {currentLanguageCode}
            </motion.span>
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};