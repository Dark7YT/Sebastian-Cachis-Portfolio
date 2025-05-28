import { type MotionProps, type Variants } from 'framer-motion';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

// Tipos base para componentes
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
}

// Tipos para navegación
export interface NavLink {
  id: string;
  href: string;
  labelKey: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
}

// Tipos para animaciones
export interface AnimationConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
}

export interface CircleOrigin {
  x: string;
  y: string;
}

export interface HamburgerPosition {
  x: number;
  y: number;
}

// Tipos para responsive
export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

// Tipos para tema
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

// Tipos para terminal
export interface TerminalCommand {
  command: string;
  output: string;
}

export interface TerminalLineProps {
  text: string;
  startTyping: boolean;
  onFinished?: () => void;
  isCommand?: boolean;
  isOutput?: boolean;
  isHeader?: boolean;
  isLast?: boolean;
  promptUser?: string;
  promptHost?: string;
  lineRef?: React.RefObject<HTMLParagraphElement>;
  delay?: number;
}

// Tipos para tecnologías
export interface TechStack {
  name: string;
  href: string;
  className: string;
}

// Tipos para redes sociales
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabelKey: string;
}

// Tipos utilitarios
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;