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
  strokeWidth = 2.5,
  className = "h-6 w-6",
  transitionDuration = 0.3,
}) => {
  const viewBoxSize = 24;
  const lineSeparationClosed = 7;

  const yTopClosed = viewBoxSize / 2 - lineSeparationClosed / 2;
  const yBottomClosed = viewBoxSize / 2 + lineSeparationClosed / 2;
  const translateYForX = lineSeparationClosed / 2;

  const topVariants: Variants = {
    closed: { 
      rotate: 0, 
      translateY: 0,
      transition: { duration: transitionDuration, ease: "easeInOut" }
    },
    open: {
      rotate: 45,
      translateY: translateYForX,
      transition: { duration: transitionDuration, ease: "easeInOut" }
    },
  };

  const bottomVariants: Variants = {
    closed: { 
      rotate: 0, 
      translateY: 0,
      transition: { duration: transitionDuration, ease: "easeInOut" }
    },
    open: {
      rotate: -45,
      translateY: -translateYForX,
      transition: { duration: transitionDuration, ease: "easeInOut" }
    },
  };

  const lineProps = {
    stroke: color, // USAR SIEMPRE EL COLOR PASADO
    strokeWidth: strokeWidth,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    initial: "closed",
    animate: isOpen ? "open" : "closed",
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
      initial={false}
    >
      {/* Línea superior */}
      <motion.line
        x1={x1}
        x2={x2}
        y1={yTopClosed}
        y2={yTopClosed}
        variants={topVariants}
        {...lineProps}
      />
      {/* Línea inferior */}
      <motion.line
        x1={x1}
        x2={x2}
        y1={yBottomClosed}
        y2={yBottomClosed}
        variants={bottomVariants}
        {...lineProps}
      />
    </motion.svg>
  );
};