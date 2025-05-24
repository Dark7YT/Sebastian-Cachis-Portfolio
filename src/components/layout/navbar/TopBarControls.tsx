import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../../../components/ui/Button'; 
import { Moon, Sun, Languages } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

export const TopBarControls = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const isSpanish = i18n.language === 'es';
  const currentLanguageCode = isSpanish ? 'ES' : 'EN';
  const langButtonLabel = t(isSpanish ? 'toggle_language_en' : 'toggle_language_es');
  const themeButtonLabel = t(theme === 'light' ? 'toggle_theme_dark' : 'toggle_theme_light');

  const themeIconSwitchVariants: Variants = prefersReducedMotion ? {} : {
    enter: (direction: number) => ({
      y: direction > 0 ? 10 : -10,
      x: direction > 0 ? -10 : 10,
      opacity: 0,
      scale: 0.7,
      rotateZ: direction * -90,
    }),
    center: {
      zIndex: 1,
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.35,
        ease: [0.215, 0.610, 0.355, 1.000],
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? -10 : 10,
      x: direction > 0 ? 10 : -10,
      opacity: 0,
      scale: 0.7,
      rotateZ: direction * 90,
      transition: {
        duration: 0.3,
        ease: [0.550, 0.055, 0.675, 0.190],
      },
    }),
  };
  
  const iconWrapperHoverVariants = prefersReducedMotion ? undefined : {
    rest: { scale: 1 },
    hover: { scale: 1.15, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  const languageButtonHoverProps = prefersReducedMotion ? {} : {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  const themeChangeDirection = theme === 'light' ? 1 : -1;

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <motion.div
        variants={iconWrapperHoverVariants}
        initial="rest"
        whileHover="hover"
      >
        <Button
          variant="icon" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label={themeButtonLabel} 
          title={themeButtonLabel}
          className="relative overflow-hidden flex items-center justify-center text-slate-700 dark:text-neutral-300 w-8 h-8 sm:w-9 sm:h-9"
        >
          <AnimatePresence mode="wait" initial={false} custom={themeChangeDirection}>
            {theme === 'light' ? (
              <motion.div
                key="moon" 
                custom={themeChangeDirection}
                variants={themeIconSwitchVariants}
                initial="enter" 
                animate="center" 
                exit="exit"
                className="absolute flex items-center justify-center"
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                custom={themeChangeDirection * -1}
                variants={themeIconSwitchVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute flex items-center justify-center"
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

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