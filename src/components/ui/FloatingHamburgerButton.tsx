import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { AnimatedHamburgerIcon } from './AnimatedHamburgerIcon';

interface FloatingHamburgerButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
  onPositionCalculated: (position: { x: number; y: number }) => void;
  animationDuration: number;
}

export const FloatingHamburgerButton: React.FC<FloatingHamburgerButtonProps> = ({
  isMenuOpen,
  onToggle,
  onPositionCalculated,
  animationDuration
}) => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuButtonLabel = isMenuOpen ? t('navbar_close_menu') : t('navbar_open_menu');

  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      onPositionCalculated({ x: centerX, y: centerY });
    }
  };

  useEffect(() => {
    calculatePosition();
    
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    calculatePosition();
  }, [isMenuOpen]);

  return (
    <Button
      ref={buttonRef}
      variant="icon"
      size="icon"
      onClick={onToggle}
      aria-label={menuButtonLabel}
      title={menuButtonLabel}
      className={cn(
        // Base styles usando variables CSS
        "relative z-hamburger w-8 h-8 sm:w-9 sm:h-9",
        "transition-smooth", // Nueva clase
        
        // Colores base - tema adaptativo
        "text-primary hover:text-accent",
        
        // Estados condicionales
        isMenuOpen ? [
          "scale-110 shadow-lg",
          "bg-accent-50/80 dark:bg-accent-900/20", // Rojo en lugar de emerald
          "ring-2 ring-accent/20",
          "text-accent"
        ] : [
          "hover:scale-105",
          "hover:bg-tertiary", // Clase semántica
          "focus-visible:ring-2 focus-visible:ring-accent/50"
        ],
        
        // Focus states
        "focus-visible:outline-none focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
      )}
    >
      <AnimatedHamburgerIcon
        isOpen={isMenuOpen}
        transitionDuration={animationDuration}
        className="h-5 w-5"
      />
    </Button>
  );
};