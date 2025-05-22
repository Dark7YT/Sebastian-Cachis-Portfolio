import React, { useEffect, useState, useRef } from 'react';
import { motion, type Variants } from 'framer-motion'; // Importar Variants
import { useTranslation } from 'react-i18next';
import { useAge } from '../../../hooks/useAge';
import { useTypedText } from '../../../hooks/useTypedText';
import { cn } from '../../../lib/utils';

interface ProfileTerminalCardProps {
  isOpen: boolean;
}

const TerminalLine: React.FC<{ 
  text: string; 
  isLast?: boolean;
  startTyping: boolean;
  onFinished?: () => void;
  lineRef?: React.RefObject<HTMLParagraphElement | null>;
}> = ({ text, isLast = false, startTyping, onFinished, lineRef }) => {
  const prompt = "$ ";
  const textToType = startTyping ? text : '';
  const typedContent = useTypedText(textToType, 50, 0); 

  const cursorIsVisibleAfterTyping = isLast && typedContent.length === text.length;
  const showCursor = startTyping && (typedContent.length < text.length || cursorIsVisibleAfterTyping);

  useEffect(() => {
    if (startTyping && typedContent.length === text.length && onFinished) {
      onFinished();
    }
  }, [typedContent, text, startTyping, onFinished]);

  // Variantes para la animación de cada línea
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    // Envolver la línea en un motion.p para animarla individualmente
    <motion.p 
      ref={lineRef as React.RefObject<HTMLParagraphElement>}
      variants={lineVariants} // Aplicar variantes
      className="font-mono text-xs sm:text-sm leading-normal sm:leading-relaxed whitespace-nowrap"
    >
      {startTyping && <span className="text-emerald-400 select-none">{prompt}</span>}
      <span className="text-neutral-200">{typedContent}</span>
      {showCursor && <span className="bg-emerald-400 w-[0.5em] h-[1em] inline-block animate-caret-blink ml-0.5 align-middle"></span>}
    </motion.p>
  );
};

const MacWindowControls: React.FC = () => (
  <div className="flex space-x-1.5 sm:space-x-2">
    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
  </div>
);

export const ProfileTerminalCard: React.FC<ProfileTerminalCardProps> = ({ isOpen }) => {
  const { t } = useTranslation();
  const age = useAge('2004-10-07');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [cardDimensions, setCardDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLParagraphElement | null>(null); 

  const linesData = [
    { labelKey: "terminal_name", value: "Sebastian Cachis" },
    { labelKey: "terminal_career", value: t('terminal_software_engineer')},
    { labelKey: "terminal_age", value: age, valueSuffixKey: "terminal_years_old" },
    { labelKey: "terminal_location", value: t('terminal_city_country')},
    { labelKey: "terminal_status", value: t('terminal_availability')},
    { labelKey: "terminal_interests", value: t('terminal_tech_art_music')},
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isOpen && linesContainerRef.current && titleBarRef.current && firstLineRef.current && isClient) {
      let currentCalculatedWidth = 0;
      const tempSpan = document.createElement('span');
      const pElementStyle = getComputedStyle(firstLineRef.current);
      tempSpan.style.fontFamily = pElementStyle.fontFamily;
      tempSpan.style.fontSize = pElementStyle.fontSize;
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      document.body.appendChild(tempSpan);

      linesData.forEach(line => {
        const fullText = `$ ${t(line.labelKey)}: ${line.value}${line.valueSuffixKey ? ` ${t(line.valueSuffixKey)}` : ''}`;
        tempSpan.textContent = fullText;
        if (tempSpan.offsetWidth > currentCalculatedWidth) {
          currentCalculatedWidth = tempSpan.offsetWidth;
        }
      });
      document.body.removeChild(tempSpan);

      const linesContainerStyle = getComputedStyle(linesContainerRef.current);
      const paddingLeft = parseFloat(linesContainerStyle.paddingLeft);
      const paddingRight = parseFloat(linesContainerStyle.paddingRight);
      const horizontalPadding = paddingLeft + paddingRight;
      
      const additionalPaddingForLooks = window.innerWidth < 768 ? 10 : 15; 
      const baseWidth = currentCalculatedWidth + horizontalPadding + additionalPaddingForLooks;
      
      const additionalWidthFactor = window.innerWidth < 768 ? 1.03 : 1.05;
      const minAdditionalWidth = window.innerWidth < 768 ? 10 : 20;    

      let newCalculatedWidth = Math.max(baseWidth * additionalWidthFactor, baseWidth + minAdditionalWidth);
      const overallMinWidth = window.innerWidth < 768 ? 260 : 300; 
      newCalculatedWidth = Math.max(newCalculatedWidth, overallMinWidth);

      const extraWidthForScroll = 30; 
      let finalWidth = newCalculatedWidth + extraWidthForScroll;

      const titleBarHeight = titleBarRef.current.offsetHeight;
      const singleLineHeight = firstLineRef.current.offsetHeight; 
      
      const linesContainerPaddingTop = parseFloat(linesContainerStyle.paddingTop);
      const linesContainerPaddingBottom = parseFloat(linesContainerStyle.paddingBottom);

      const gapBetweenLines = window.innerWidth < 768 ? 
        (linesData.length > 1 ? 4 : 0) : 
        (linesData.length > 1 ? 6 : 0); 
      
      const linesContentNaturalHeight = (linesData.length * singleLineHeight) + 
                                      (linesData.length > 1 ? (linesData.length - 1) * gapBetweenLines : 0);

      let totalCalculatedHeight = titleBarHeight + linesContainerPaddingTop + linesContentNaturalHeight + linesContainerPaddingBottom;
      const extraHeightPadding = 10; 
      totalCalculatedHeight += extraHeightPadding;
      
      setCardDimensions({ width: finalWidth, height: totalCalculatedHeight });
    }
  }, [isOpen, linesData, t, isClient]);

  useEffect(() => {
    if (isOpen) {
      setCurrentLineIndex(0);
    } else {
      setCurrentLineIndex(-1);
    }
  }, [isOpen]);

  const handleLineFinished = () => {
    setCurrentLineIndex(prevIndex => prevIndex < linesData.length - 1 ? prevIndex + 1 : prevIndex);
  };

  // --- NUEVAS VARIANTES DE ANIMACIÓN ---
  const terminalCardOverallVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, // Comienza un poco más pequeña
      y: -20,     // Y un poco más arriba
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3, // Duración de la animación principal de la tarjeta
        ease: "easeOut",
        // Importante para coordinar animaciones hijas:
        when: "beforeChildren", // Anima este contenedor ANTES que sus hijos
        staggerChildren: 0.07, // Cada hijo animado comenzará 0.07s después del anterior
      },
    },
    exit: { // Animación de salida
      opacity: 0,
      scale: 0.95,
      y: -15,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1], // Curva de ease-in para la salida
        when: "afterChildren", // Anima este contenedor DESPUÉS que sus hijos (si los hijos también tienen 'exit')
      }
    }
  };

  const titleBarVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  // linesContainerVariants es opcional si ya estamos haciendo stagger en las TerminalLine
  // Pero puede ser útil para un fade-in general del área de contenido.
  const linesContainerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  // (TerminalLine ya tiene sus propias `lineVariants` definidas dentro de su componente)
  
  if (!isOpen) return null;

  const terminalTitle = "sebas -- zsh";
  const leftOffsetValue = "1rem"; 
  const triangleRelativeOffset = "25px"; 

  const parseOffsetToPx = (offset: string): number => {
    if (!isClient) return 0;
    const value = parseFloat(offset.match(/(\d*\.?\d+)/)?.[0] || '0');
    if (offset.includes('rem')) return value * 16;
    if (offset.includes('px')) return value;
    return value;
  };
  const currentLeftOffsetPx = parseOffsetToPx(leftOffsetValue);

  return (
    <motion.div
      key="profile-terminal-card"
      variants={terminalCardOverallVariants} // Aplicar nuevas variantes generales
      initial="hidden"
      animate="visible"
      exit="exit" // Aplicar variante de salida
      className={cn(
        "absolute top-full mt-2 md:mt-3 z-20",
        `left-[${leftOffsetValue}]`, 
        "md:right-auto md:w-auto", 
        "bg-neutral-800/95 backdrop-blur-md",
        "shadow-2xl rounded-lg border border-neutral-700/40",
        "overflow-hidden origin-top flex flex-col text-neutral-200"
      )}
      style={{ 
        width: cardDimensions.width > 0 && isClient
          ? `${Math.min(
              cardDimensions.width, 
              window.innerWidth - currentLeftOffsetPx - 16 
            )}px` 
          : (isClient ? undefined : 'auto'),
        height: (isOpen && cardDimensions.height > 0 && isClient) ? `${cardDimensions.height}px` : 'auto',
        maxHeight: '85vh',
      }}
    >
      <div 
        className="absolute -top-[9px] w-0 h-0" 
        style={{
            left: triangleRelativeOffset, 
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `10px solid rgb(38 38 38 / 1)`, 
        }}
      />
      {/* Envolver la barra de título en un motion.div */}
      <motion.div 
        ref={titleBarRef} 
        variants={titleBarVariants} // Aplicar variantes a la barra de título
        className="flex items-center h-8 sm:h-9 px-3 sm:px-4 bg-neutral-700/80 border-b border-neutral-600/50 flex-shrink-0"
      >
        <MacWindowControls />
        <div className="flex-grow text-center text-xs sm:text-sm font-mono text-neutral-400 select-none truncate px-2">
          {terminalTitle}
        </div>
        <div className="w-12 sm:w-16 flex-shrink-0"></div>
      </motion.div>
      
      {/* Envolver el contenedor de líneas en un motion.div */}
      <motion.div 
        ref={linesContainerRef} 
        variants={linesContainerVariants} // Opcional: variantes para el contenedor general de líneas
        className="p-2.5 sm:p-3 space-y-1 sm:space-y-1.5 overflow-x-auto overflow-y-hidden flex-grow-0" 
      > 
        {linesData.map((line, index) => {
          const textForLine = `${t(line.labelKey)}: ${line.value}${line.valueSuffixKey ? ` ${t(line.valueSuffixKey)}` : ''}`;
          return (
            <TerminalLine // TerminalLine ya es un motion.p con sus propias lineVariants
              key={line.labelKey}
              lineRef={index === 0 ? firstLineRef : undefined} 
              text={textForLine}
              isLast={index === linesData.length - 1 && currentLineIndex >= linesData.length -1}
              startTyping={currentLineIndex >= index}
              onFinished={currentLineIndex === index ? handleLineFinished : undefined}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};