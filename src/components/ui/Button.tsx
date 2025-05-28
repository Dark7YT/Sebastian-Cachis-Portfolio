import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'destructive' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    // Clases base para todos los botones
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium",
      "transition-smooth", // Usando nuestra clase personalizada
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "focus-visible:ring-accent/50 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950",
      "disabled:pointer-events-none disabled:opacity-50"
    );

    // Variantes usando las nuevas clases semánticas
    const variantClasses = {
      primary: cn(
        "bg-accent text-white",
        "hover:bg-accent-hover",
        "shadow-sm"
      ),
      secondary: cn(
        "bg-tertiary text-primary border border-default",
        "hover:bg-secondary hover:text-primary",
        "shadow-sm"
      ),
      outline: cn(
        "border border-accent text-accent bg-transparent",
        "hover:bg-accent hover:text-white",
        "shadow-sm"
      ),
      ghost: cn(
        "text-primary bg-transparent",
        "hover:bg-tertiary hover:text-accent"
      ),
      icon: cn(
        "text-primary bg-transparent",
        "hover:bg-tertiary hover:text-accent",
        "rounded-lg" // Un poco más redondeado para iconos
      ),
      destructive: cn(
        "bg-red-600 text-white",
        "hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
        "shadow-sm"
      ),
      link: cn(
        "text-accent bg-transparent p-0 h-auto",
        "hover:text-accent-hover hover:underline",
        "underline-offset-4"
      )
    };

    // Tamaños
    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
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