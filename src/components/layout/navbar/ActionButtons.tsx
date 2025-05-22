import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../../../components/ui/Button';
import { Moon, Sun, Languages } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ActionButtonsProps {

}

export const ActionButtons: React.FC<ActionButtonsProps> = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const themeButtonLabel = theme === 'light' ? t('toggle_theme_dark') : t('toggle_theme_light');
  const currentLanguageCode = i18n.language === 'es' ? 'ES' : 'EN';
  const langButtonLabel = i18n.language === 'es' ? t('toggle_language_en') : t('toggle_language_es');

  const changeLanguage = (lng: 'en' | 'es') => {
    i18n.changeLanguage(lng);
  };

  const themeIconVariants = {
    enter: { rotateY: -180, opacity: 0, scale: 0.8 },
    center: { rotateY: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" }},
    exit: { rotateY: 180, opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" }},
  };
  const iconHoverVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: prefersReducedMotion ? 0 : 15, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 }}
  };

  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button
        variant="icon" size="icon" onClick={toggleTheme} aria-label={themeButtonLabel} title={themeButtonLabel}
        className="relative overflow-hidden flex items-center justify-center text-slate-700 dark:text-neutral-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={theme} variants={prefersReducedMotion ? {} : themeIconVariants} initial="enter" animate="center" exit="exit"
            whileHover="hover"
          >
            <motion.div variants={iconHoverVariants} className="flex items-center justify-center">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Button>
      <Button
        variant="icon" size="icon" onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')} aria-label={langButtonLabel} title={langButtonLabel}
        className="overflow-hidden relative flex items-center justify-center text-slate-700 dark:text-neutral-300 px-1" style={{ minWidth: 'auto' }}
      >
        <Languages className="h-4 w-4 mr-1 flex-shrink-0 md:hidden lg:inline-block" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={currentLanguageCode} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="inline-block text-xs font-semibold">
            {currentLanguageCode}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  );
};