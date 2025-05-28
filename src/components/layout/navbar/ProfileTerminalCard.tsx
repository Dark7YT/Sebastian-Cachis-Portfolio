import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAge } from '../../../hooks/useAge';
import { useTypedText } from '../../../hooks/useTypedText';
import { useResponsive } from '../../../hooks/useResponsive';
import { cn } from '../../../lib/utils';
import { COMPONENT_VARIANTS } from '../../../config/animation.variants';
import type { TerminalCommand, TerminalLineProps } from '../../../types/common.types';

// ✅ INTERFACES OPTIMIZADAS
interface ProfileTerminalCardProps {
  isOpen: boolean;
}

interface TerminalDimensions {
  width: number;
  height: number;
}

interface TerminalState {
  currentLineIndex: number;
  isClient: boolean;
  showContent: boolean;
  headerRendered: boolean;
}

// ✅ CONSTANTES CENTRALIZADAS
const TERMINAL_CONSTANTS = {
  DELAYS: {
    INITIAL_OPEN: 200,        // ✅ REDUCIDO de 600ms
    HEADER_TO_COMMAND: 150,   // ✅ REDUCIDO de 200ms  
    BETWEEN_LINES: 80,        // ✅ REDUCIDO de 100ms
  },
  DIMENSIONS: {
    TITLE_BAR_HEIGHT: 36,
    SINGLE_LINE_HEIGHT: 20,
    LINE_SPACING: 6,
    PADDING_TOP: 20,
    PADDING_BOTTOM: 28,
    MIN_WIDTH_MOBILE: 300,
    MAX_WIDTH_DESKTOP: 420,
    MIN_WIDTH_DESKTOP: 380,
    TRIANGLE_OFFSET: "32px",
    LEFT_OFFSET: "1rem",
  },
  TYPING_SPEEDS: {
    HEADER: 25,    // ✅ MÁS RÁPIDO para header (era 60)
    COMMAND: 35,   // ✅ VELOCIDAD MEDIA para comandos
    OUTPUT: 45,    // ✅ MÁS LENTO para outputs (más realista)
  },
  TIMING_DELAYS: {
    HEADER: 200,   // ✅ REDUCIDO
    COMMAND: 150,  // ✅ REDUCIDO  
    OUTPUT: 100,   // ✅ REDUCIDO
  },
} as const;

// ✅ COMPONENTE TERMINAL LINE OPTIMIZADO
const TerminalLine: React.FC<TerminalLineProps> = React.memo(({ 
  text, 
  isLast = false, 
  startTyping, 
  onFinished, 
  lineRef, 
  isCommand = true, 
  isOutput = false,
  isHeader = false,
  promptUser = "sebastian",
  promptHost = "portfolio",
  delay = 0
}) => {
  const prompt = isCommand ? `➜ ${promptUser}@${promptHost} ` : "";
  const promptSymbol = isCommand ? "$ " : "";
  
  // ✅ VELOCIDADES CENTRALIZADAS
  const typingSpeed = useMemo(() => {
    if (isHeader) return TERMINAL_CONSTANTS.TYPING_SPEEDS.HEADER;
    if (isCommand) return TERMINAL_CONSTANTS.TYPING_SPEEDS.COMMAND;
    return TERMINAL_CONSTANTS.TYPING_SPEEDS.OUTPUT;
  }, [isHeader, isCommand]);

  // ✅ USAR HOOK DE TIPEO INMEDIATAMENTE
  const typedContent = useTypedText(startTyping ? text : '', typingSpeed, delay);
  
  // ✅ ESTADO DEL CURSOR
  const isTypingComplete = typedContent.length === text.length && text.length > 0;
  const cursorIsVisibleAfterTyping = isLast && isTypingComplete;
  const showCursor = startTyping && (typedContent.length < text.length || cursorIsVisibleAfterTyping);

  // ✅ CALLBACK OPTIMIZADO
  const handleFinished = useCallback(() => {
    if (!onFinished || !isTypingComplete) return;

    const delayTime = isHeader 
      ? TERMINAL_CONSTANTS.TIMING_DELAYS.HEADER
      : isCommand 
        ? TERMINAL_CONSTANTS.TIMING_DELAYS.COMMAND 
        : TERMINAL_CONSTANTS.TIMING_DELAYS.OUTPUT;

    const timeout = setTimeout(onFinished, delayTime);
    return () => clearTimeout(timeout);
  }, [onFinished, isHeader, isCommand, isTypingComplete]);

  useEffect(() => {
    if (isTypingComplete) {
      return handleFinished();
    }
  }, [isTypingComplete, handleFinished]);

  // ✅ COMPONENTES ESPECIALIZADOS CON TIPEO

  if (isHeader) {
    return (
      <div
        ref={lineRef as React.RefObject<HTMLDivElement>}
        className="font-mono text-xs text-neutral-500 mb-2 border-b border-neutral-800/30 pb-1.5"
      >
        <span>{typedContent}</span>
        {showCursor && <TerminalCursor />}
      </div>
    );
  }

  if (isOutput) {
    return (
      <p
        ref={lineRef as React.RefObject<HTMLParagraphElement>}
        className="font-mono text-sm leading-relaxed whitespace-nowrap pl-4 font-medium"
      >
        <span className="text-accent-200 font-semibold">{typedContent}</span>
        {showCursor && <TerminalCursor variant="accent" />}
      </p>
    );
  }

  // ✅ COMANDO CON TIPEO
  return (
    <p
      ref={lineRef as React.RefObject<HTMLParagraphElement>}
      className="font-mono text-xs leading-relaxed whitespace-nowrap"
    >
      {startTyping && (
        <>
          <span className="text-accent-400 select-none font-bold">{prompt}</span>
          <span className="text-accent-500 select-none">{promptSymbol}</span>
        </>
      )}
      <span className="text-neutral-300">{typedContent}</span>
      {showCursor && <TerminalCursor variant="accent" />}
    </p>
  );
});

TerminalLine.displayName = 'TerminalLine';

// ✅ COMPONENTE CURSOR REUTILIZABLE
const TerminalCursor: React.FC<{ variant?: 'default' | 'accent' }> = React.memo(({ variant = 'default' }) => (
  <span 
    className={cn(
      "w-[0.4em] h-[0.9em] inline-block animate-caret-blink ml-0.5 align-middle",
      variant === 'accent' ? "bg-accent-400" : "bg-neutral-400"
    )}
  />
));

TerminalCursor.displayName = 'TerminalCursor';

// ✅ COMPONENTE CONTROLES MAC OPTIMIZADO
const MacWindowControls: React.FC = React.memo(() => (
  <div className="flex space-x-1.5">
    {[
      { color: '#ff5f57', hoverColor: '#ff4136' },
      { color: '#ffbd2e', hoverColor: '#ff9500' },
      { color: '#28ca42', hoverColor: '#00d100' },
    ].map((control, index) => (
      <motion.div
        key={index}
        className="w-3 h-3 rounded-full cursor-pointer"
        style={{ backgroundColor: control.color }}
        whileHover={{ 
          backgroundColor: control.hoverColor,
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      />
    ))}
  </div>
));

MacWindowControls.displayName = 'MacWindowControls';

// ✅ HOOK PERSONALIZADO PARA DIMENSIONES DEL TERMINAL
const useTerminalDimensions = (
  terminalCommands: TerminalCommand[], 
  promptUser: string, 
  promptHost: string,
  isSpanish: boolean
): TerminalDimensions => {
  const { isMobile, width } = useResponsive();

  return useMemo(() => {
    const longestCommand = Math.max(
      ...terminalCommands.map(cmd => 
        `➜ ${promptUser}@${promptHost} $ ${cmd.command}`.length
      )
    );
    const longestOutput = Math.max(
      ...terminalCommands.map(cmd => `    ${cmd.output}`.length)
    );
    const maxContentLength = Math.max(longestCommand, longestOutput);
    
    let baseWidth = maxContentLength * 7;
    
    if (isMobile) {
      baseWidth = Math.min(baseWidth + 48, width - 32);
      baseWidth = Math.max(baseWidth, TERMINAL_CONSTANTS.DIMENSIONS.MIN_WIDTH_MOBILE);
    } else {
      baseWidth = Math.min(baseWidth + 64, TERMINAL_CONSTANTS.DIMENSIONS.MAX_WIDTH_DESKTOP);
      baseWidth = Math.max(baseWidth, TERMINAL_CONSTANTS.DIMENSIONS.MIN_WIDTH_DESKTOP);
    }
    
    if (isSpanish) {
      baseWidth = Math.ceil(baseWidth * 1.1);
    }

    // ✅ CÁLCULO DE ALTURA OPTIMIZADO
    const totalLines = 1 + (terminalCommands.length * 2) + 1;
    const contentHeight = 
      (totalLines * TERMINAL_CONSTANTS.DIMENSIONS.SINGLE_LINE_HEIGHT) + 
      ((totalLines - 1) * TERMINAL_CONSTANTS.DIMENSIONS.LINE_SPACING);
    
    const totalHeight = 
      TERMINAL_CONSTANTS.DIMENSIONS.TITLE_BAR_HEIGHT + 
      TERMINAL_CONSTANTS.DIMENSIONS.PADDING_TOP + 
      contentHeight + 
      TERMINAL_CONSTANTS.DIMENSIONS.PADDING_BOTTOM;

    return { width: baseWidth, height: totalHeight };
  }, [terminalCommands, promptUser, promptHost, isSpanish, isMobile, width]);
};

// ✅ HOOK PERSONALIZADO PARA ESTADO DEL TERMINAL
const useTerminalState = (isOpen: boolean) => {
  const [state, setState] = useState<TerminalState>({
    currentLineIndex: -1,
    isClient: false,
    showContent: false,
    headerRendered: false,
  });

  useEffect(() => {
    setState(prev => ({ ...prev, isClient: true }));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setState({
        currentLineIndex: -1,
        isClient: true,
        showContent: false,
        headerRendered: false,
      });
      
      // ✅ INICIO MÁS RÁPIDO PARA QUE EL TIPEO SE VEA INMEDIATAMENTE
      const timeout = setTimeout(() => {
        setState(prev => ({
          ...prev,
          showContent: true,
          currentLineIndex: 0, // ✅ COMENZAR INMEDIATAMENTE CON HEADER
        }));
      }, 200); // ✅ REDUCIDO DE 600ms a 200ms

      return () => clearTimeout(timeout);
    } else {
      setState(prev => ({
        ...prev,
        currentLineIndex: -1,
        showContent: false,
        headerRendered: false,
      }));
    }
  }, [isOpen]);

  const updateLineIndex = useCallback((updater: (prev: number) => number) => {
    setState(prev => ({
      ...prev,
      currentLineIndex: updater(prev.currentLineIndex),
    }));
  }, []);

  const setHeaderRendered = useCallback((rendered: boolean) => {
    setState(prev => ({ ...prev, headerRendered: rendered }));
  }, []);

  return {
    ...state,
    updateLineIndex,
    setHeaderRendered,
  };
};

// ✅ COMPONENTE PRINCIPAL OPTIMIZADO
export const ProfileTerminalCard: React.FC<ProfileTerminalCardProps> = ({ isOpen }) => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useResponsive();
  const age = useAge('2004-10-07');
  
  const terminalState = useTerminalState(isOpen);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLParagraphElement | null>(null);

  // ✅ COMANDOS MEMOIZADOS
  const terminalCommands = useMemo((): TerminalCommand[] => [
    { 
      command: t('terminal_cmd_who'),
      output: t('terminal_output_name')
    },
    { 
      command: t('terminal_cmd_role'),
      output: t('terminal_output_role')
    },
    { 
      command: t('terminal_cmd_age'),
      output: `${age} ${t('terminal_output_age_suffix')}`
    },
    { 
      command: t('terminal_cmd_location'),
      output: t('terminal_output_location')
    }
  ], [t, age]);

  const promptUser = t('terminal_prompt_user');
  const promptHost = t('terminal_prompt_host');
  const isSpanish = i18n.language === 'es';

  // ✅ DIMENSIONES CALCULADAS
  const cardDimensions = useTerminalDimensions(
    terminalCommands, 
    promptUser, 
    promptHost, 
    isSpanish
  );

  // ✅ HANDLERS OPTIMIZADOS
  const handleLineFinished = useCallback(() => {
    const timeout = setTimeout(() => {
      terminalState.updateLineIndex(prevIndex => {
        const maxIndex = 1 + (terminalCommands.length * 2);
        return prevIndex < maxIndex ? prevIndex + 1 : prevIndex;
      });
    }, TERMINAL_CONSTANTS.DELAYS.BETWEEN_LINES);

    return () => clearTimeout(timeout);
  }, [terminalState.updateLineIndex, terminalCommands.length]);

  const handleHeaderFinished = useCallback(() => {
    terminalState.setHeaderRendered(true);
    const timeout = setTimeout(() => {
      terminalState.updateLineIndex(() => 1);
    }, TERMINAL_CONSTANTS.DELAYS.HEADER_TO_COMMAND);

    return () => clearTimeout(timeout);
  }, [terminalState.setHeaderRendered, terminalState.updateLineIndex]);

  // ✅ DATOS CALCULADOS
  const terminalTitle = isMobile 
    ? t('terminal_terminal_title_mobile')
    : t('terminal_terminal_title');

  const formattedDate = useMemo(() => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString(
      isSpanish ? 'es-ES' : 'en-US', 
      { 
        day: 'numeric',
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  }, [isSpanish]);

  const maxLineIndex = 1 + (terminalCommands.length * 2);
  const allLinesFinished = terminalState.currentLineIndex >= maxLineIndex;

  // ✅ RENDER GUARD
  if (!isOpen) return null;

  return (
    <motion.div
      key="profile-terminal-card"
      variants={COMPONENT_VARIANTS.terminalCard}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute top-full mt-2 md:mt-3 z-profile-card",
        `left-[${TERMINAL_CONSTANTS.DIMENSIONS.LEFT_OFFSET}]`,
        "md:right-auto md:w-auto",
        "bg-neutral-950/98 backdrop-blur-md",
        "shadow-2xl rounded-lg border border-neutral-700/50",
        "overflow-hidden origin-top flex flex-col text-neutral-100",
        "transition-theme-ultra font-mono",
        "ring-1 ring-neutral-600/20 shadow-black/50"
      )}
      style={{
        width: cardDimensions.width > 0 && terminalState.isClient
          ? `${Math.min(cardDimensions.width, window.innerWidth - 12)}px`
          : (terminalState.isClient ? undefined : 'auto'),
        height: (isOpen && cardDimensions.height > 0 && terminalState.isClient) 
          ? `${cardDimensions.height}px` 
          : 'auto',
        maxHeight: '70vh',
      }}
    >
      {/* ✅ TRIÁNGULO INDICADOR */}
      <div
        className="absolute -top-[7px] w-0 h-0"
        style={{
          left: TERMINAL_CONSTANTS.DIMENSIONS.TRIANGLE_OFFSET,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: `8px solid rgb(10 10 10 / 0.98)`,
        }}
      />
      
      {/* ✅ BARRA DE TÍTULO - SIN ANIMACIÓN */}
      <div
        ref={titleBarRef}
        className={cn(
          "flex items-center px-3",
          "h-8 sm:h-9",
          "bg-neutral-800/95 border-b border-neutral-600/50",
          "flex-shrink-0"
        )}
      >
        <MacWindowControls />
        <div className="flex-grow text-center text-xs font-mono text-neutral-300 select-none truncate px-3">
          {terminalTitle}
        </div>
        <div className="w-8 sm:w-10 flex-shrink-0" />
      </div>
      
      {/* ✅ CONTENIDO DEL TERMINAL - SIN FADE IN */}
      <div
        ref={linesContainerRef}
        className={cn(
          "px-3 py-5",
          "space-y-1.5",
          "overflow-x-auto overflow-y-hidden flex-grow-0",
          "bg-neutral-950/25"
        )}
      >
        {/* ✅ HEADER DINÁMICO CON TIPEO INMEDIATO */}
        {terminalState.showContent && terminalState.currentLineIndex >= 0 && !terminalState.headerRendered && (
          <TerminalLine
            text={`${t('terminal_last_login')}: ${formattedDate} ${t('terminal_on')} ${t('terminal_console')}`}
            startTyping={true}
            onFinished={handleHeaderFinished}
            isHeader={true}
            delay={0} // ✅ SIN DELAY para iniciar inmediatamente
          />
        )}

        {/* ✅ HEADER ESTÁTICO (YA RENDERIZADO) */}
        {terminalState.showContent && terminalState.headerRendered && (
          <div className="font-mono text-xs text-neutral-500 mb-2 border-b border-neutral-800/30 pb-1.5">
            {`${t('terminal_last_login')}: ${formattedDate} ${t('terminal_on')} ${t('terminal_console')}`}
          </div>
        )}

        {/* ✅ COMANDOS Y OUTPUTS CON TIPEO SECUENCIAL */}
        {terminalState.showContent && terminalState.headerRendered && 
          terminalCommands.map((cmd, index) => {
            const commandIndex = 1 + (index * 2);
            const outputIndex = commandIndex + 1;
            
            return (
              <React.Fragment key={`command-${index}`}>
                {/* Comando con tipeo */}
                {terminalState.currentLineIndex >= commandIndex && (
                  <TerminalLine
                    lineRef={index === 0 ? firstLineRef : undefined}
                    text={cmd.command}
                    startTyping={true} // ✅ SIEMPRE INICIAR TIPEO
                    onFinished={terminalState.currentLineIndex === commandIndex ? handleLineFinished : undefined}
                    isCommand={true}
                    promptUser={promptUser}
                    promptHost={promptHost}
                    delay={0} // ✅ SIN DELAY ADICIONAL
                  />
                )}
                
                {/* Output con tipeo */}
                {terminalState.currentLineIndex >= outputIndex && (
                  <TerminalLine
                    text={cmd.output}
                    startTyping={true} // ✅ SIEMPRE INICIAR TIPEO
                    onFinished={terminalState.currentLineIndex === outputIndex ? handleLineFinished : undefined}
                    isOutput={true}
                    delay={0} // ✅ SIN DELAY ADICIONAL
                  />
                )}
              </React.Fragment>
            );
          })
        }
        
        {/* ✅ PROMPT FINAL CON TIPEO DE CURSOR */}
        {terminalState.showContent && terminalState.headerRendered && allLinesFinished && (
          <div className="font-mono text-xs">
            <span className="text-accent-400 font-bold">➜ </span>
            <span className="text-accent-400">{promptUser}@{promptHost}</span>
            <span className="text-neutral-500 mx-1">:</span>
            <span className="text-accent-300">~</span>
            <span className="text-accent-500 ml-2">$</span>
            <span className="text-accent-400 ml-2 animate-caret-blink">▋</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};