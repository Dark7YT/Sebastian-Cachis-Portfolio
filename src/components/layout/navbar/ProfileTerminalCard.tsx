import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
}> = ({ text, isLast = false, startTyping, onFinished }) => {
  const prompt = "$ ";
  const textToType = startTyping ? text : '';
  const typedContent = useTypedText(textToType, 40, 0);

  const showCursor = startTyping && (typedContent.length < text.length || (isLast && typedContent.length === text.length));

  useEffect(() => {
    if (startTyping && typedContent.length === text.length && onFinished) {
      onFinished();
    }
  }, [typedContent, text, startTyping, onFinished]);

  return (
    <p className="font-mono text-xs sm:text-sm leading-relaxed whitespace-nowrap">
      {startTyping && <span className="text-emerald-400 select-none">{prompt}</span>}
      <span className="text-neutral-200">{typedContent}</span>
      {showCursor && <span className="bg-emerald-400 w-[0.5em] h-[1em] inline-block animate-pulse ml-0.5 align-middle"></span>}
    </p>
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
  const [cardWidth, setCardWidth] = useState(0);
  const linesContainerRef = useRef<HTMLDivElement>(null);

  const linesData = [
    { labelKey: "terminal_name", value: "Sebastian Cachis" },
    { labelKey: "terminal_career", value: t('terminal_software_engineer')},
    { labelKey: "terminal_age", value: age, valueSuffixKey: "terminal_years_old" },
    { labelKey: "terminal_location", value: t('terminal_city_country')},
    { labelKey: "terminal_status", value: t('terminal_availability')},
    { labelKey: "terminal_interests", value: t('terminal_tech_art_music')},
  ];

  useEffect(() => {
    if (isOpen && linesContainerRef.current) {
      let currentCalculatedWidth = 0;
      const tempSpan = document.createElement('span');
      tempSpan.style.fontFamily = "'Source Code Pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace"; // Font-mono de Tailwind
      tempSpan.style.fontSize = window.innerWidth < 640 ? '0.75rem' : '0.875rem';
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
      const horizontalPadding = window.innerWidth < 640 ? 12 * 2 : 16 * 2;
      setCardWidth(currentCalculatedWidth + horizontalPadding + 10); 
    }
  }, [isOpen, linesData, t]);

  useEffect(() => {
    if (isOpen) {
      setCurrentLineIndex(0);
    } else {
      setCurrentLineIndex(-1);
    }
  }, [isOpen]);

  const handleLineFinished = () => {
    setCurrentLineIndex(prevIndex => prevIndex < linesData.length -1 ? prevIndex + 1 : prevIndex);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };
  
  if (!isOpen) return null;

  const terminalTitle = "sebas -- zsh";

  return (
    <motion.div
      key="profile-terminal-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={cn(
        "absolute top-full mt-2 md:mt-3",
        "md:left-1/2 md:-translate-x-1/2",
        "left-4 right-4 md:left-auto md:right-auto",
        "bg-neutral-800/95 backdrop-blur-md",
        "shadow-2xl rounded-lg border border-neutral-700/40",
        "overflow-hidden origin-top flex flex-col text-neutral-200"
      )}
      style={{ 
        width: cardWidth > 0 ? `${Math.min(cardWidth, window.innerWidth - 32)}px` : undefined,
        minHeight: '210px', 
        maxHeight: '80vh',
      }}
    >
      <div 
        className="hidden md:block absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `10px solid rgb(38 38 38 / 1)`, 
        }}
      />
      <div className="flex items-center h-8 sm:h-9 px-3 sm:px-4 bg-neutral-700/80 border-b border-neutral-600/50 flex-shrink-0">
        <MacWindowControls />
        <div className="flex-grow text-center text-xs sm:text-sm font-mono text-neutral-400 select-none truncate px-2">
          {terminalTitle}
        </div>
        <div className="w-12 sm:w-16 flex-shrink-0"></div> 
      </div>
      
      <div ref={linesContainerRef} className="p-3 sm:p-4 space-y-1.5 overflow-x-hidden flex-grow"> 
        {linesData.map((line, index) => {
          const textForLine = `${t(line.labelKey)}: ${line.value}${line.valueSuffixKey ? ` ${t(line.valueSuffixKey)}` : ''}`;
          return (
            <TerminalLine
              key={line.labelKey}
              text={textForLine}
              isLast={index === linesData.length - 1 && currentLineIndex >= linesData.length -1}
              startTyping={currentLineIndex >= index}
              onFinished={currentLineIndex === index ? handleLineFinished : undefined}
            />
          );
        })}
      </div>
    </motion.div>
  );
};