import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from './Button';
import { useTranslation } from 'react-i18next';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { t } = useTranslation();
  const scrollingRef = useRef(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
      setIsExiting(false);
    } else if (window.pageYOffset === 0 && isVisible) {
      setIsExiting(true);
      setIsVisible(false);
    } else if (window.pageYOffset < 300) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    scrollingRef.current = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  // Si el usuario hace click y el scroll termina, dispara la animación de salida
  useEffect(() => {
    if (!isVisible && scrollingRef.current && window.pageYOffset === 0) {
      setIsExiting(true);
      scrollingRef.current = false;
    }
  }, [isVisible]);

  const buttonVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.4 } 
    },
    exitEpic: {
      opacity: 0,
      y: -60,
      scale: 0.8,
      transition: { duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  const shouldRenderButton = isVisible || isExiting;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsExiting(false);
      }}
    >
      {shouldRenderButton && (
        <motion.div
          key="scrollToTopButton"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exitEpic"
          className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={handleClick}
            aria-label={t('footer_scroll_top')}
            title={t('footer_scroll_top')}
            className="p-3 shadow-xl bg-slate-100/70 dark:bg-neutral-800/70 hover:bg-slate-200/90 dark:hover:bg-neutral-700/90 backdrop-blur-md rounded-lg text-slate-700 dark:text-neutral-200"
          >
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};