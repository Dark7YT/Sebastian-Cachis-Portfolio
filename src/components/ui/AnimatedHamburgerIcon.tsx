// src/components/ui/AnimatedHamburgerIcon.tsx
import { motion, type Variants } from 'framer-motion';

interface AnimatedHamburgerIconProps {
  isOpen: boolean;
  color?: string;
  strokeWidth?: number;
  className?: string;
  transitionDuration?: number;
}

export const AnimatedHamburgerIcon: React.FC<AnimatedHamburgerIconProps> = ({
  isOpen,
  color = "currentColor",
  strokeWidth = 3,
  className = "h-6 w-6", 
  transitionDuration = 0.3,
}) => {
  const viewBoxSize = 24; 
  const lineSeparationClosed = 7; 

  const yTopClosed = viewBoxSize / 2 - lineSeparationClosed / 2;
  const yBottomClosed = viewBoxSize / 2 + lineSeparationClosed / 2;
  const translateYForX = lineSeparationClosed / 2;

  const topVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    open: { 
      rotate: 45, 
      translateY: translateYForX 
    },
  };
  
  const bottomVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    open: { 
      rotate: -45, 
      translateY: -translateYForX
    },
  };

  const lineProps = {
    stroke: color,
    strokeWidth: strokeWidth, 
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: isOpen ? "open" : "closed",
    transition: { duration: transitionDuration, ease: "easeInOut" },
  };

  const lineMargin = 2; 
  const x1 = lineMargin;
  const x2 = viewBoxSize - lineMargin;

  return (
    <motion.svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      overflow="visible"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* Línea superior */}
      <motion.line
        x1={x1}
        x2={x2}
        y1={yTopClosed} 
        y2={yTopClosed}
        variants={topVariants}
        {...lineProps} // strokeWidth se aplica aquí
      />
      {/* Línea inferior */}
      <motion.line
        x1={x1}
        x2={x2}
        y1={yBottomClosed}
        y2={yBottomClosed}
        variants={bottomVariants}
        {...lineProps} // strokeWidth se aplica aquí
      />
    </motion.svg>
  );
};