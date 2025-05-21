// src/components/ui/Button.tsx
import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils'; // O la ruta relativa: '../../lib/utils'

// Define las props del botón, incluyendo variantes y tamaños
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean; // Para composición con Slot (opcional avanzado)
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Clases base para todos los botones
    const baseClasses =
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    // Clases específicas para cada variante
    const variantClasses = {
      primary: 'bg-sky-600 text-primary-foreground hover:bg-sky-600/90 dark:bg-sky-500 dark:hover:bg-sky-500/90 text-white',
      secondary: 'bg-slate-200 text-secondary-foreground hover:bg-slate-200/80 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700/80',
      ghost: 'hover:bg-slate-100 hover:text-accent-foreground dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
      icon: 'hover:bg-slate-100 hover:text-accent-foreground dark:hover:bg-neutral-800 dark:hover:text-neutral-100', // Variante para botones solo con icono
      destructive: 'bg-red-600 text-destructive-foreground hover:bg-red-600/90 dark:bg-red-700 dark:hover:bg-red-700/90 text-white',
      link: 'text-primary underline-offset-4 hover:underline dark:text-sky-400',
    };

    // Clases específicas para cada tamaño
    const sizeClasses = {
      sm: 'h-9 px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10', // Tamaño para botones solo con icono
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant || 'primary'], // Fallback a primary si no se especifica
          sizeClasses[size || 'md'],       // Fallback a md si no se especifica
          className // Permite pasar clases adicionales
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };