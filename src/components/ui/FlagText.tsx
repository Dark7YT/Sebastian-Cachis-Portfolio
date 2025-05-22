import React from 'react';
import { cn } from '../../lib/utils'; 

interface FlagTextProps {
  countryCode: 'PE';
  textClassName?: string;
  flagSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PeruFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 900 600"
    className={cn("inline-block", className)}
    aria-hidden="true"
  >
    <rect width="300" height="600" fill="#D91023"/>
    <rect x="300" width="300" height="600" fill="#FFFFFF"/> 
    <rect x="600" width="300" height="600" fill="#D91023"/> 
  </svg>
);


export const FlagText: React.FC<FlagTextProps> = ({
  countryCode,
  flagSize = 'sm',
  className,
}) => {
  let flagComponent = null;
  let flagSizeClass = '';

  switch (flagSize) {
    case 'lg':
      flagSizeClass = 'w-6 h-4';
      break;
    case 'md':
      flagSizeClass = 'w-[1.125rem] h-3';
      break;
    case 'sm':
    default:
      flagSizeClass = 'w-3 h-2';
      break;
  }

  if (countryCode === 'PE') {
    flagComponent = <PeruFlagIcon className={flagSizeClass} />;
  }

  return (
    <span className={cn("inline-flex items-center space-x-1.5 sm:space-x-2", className)}>
      {flagComponent}
    </span>
  );
};