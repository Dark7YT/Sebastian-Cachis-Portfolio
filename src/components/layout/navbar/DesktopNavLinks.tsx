import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '../../../constants/navigation';
import { cn } from '../../../lib/utils';

interface DesktopNavLinksProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
}

export const DesktopNavLinks: React.FC<DesktopNavLinksProps> = ({
  activeSection,
  onNavLinkClick
}) => {
  const { t } = useTranslation();

  // ✅ FUNCIÓN para manejar clicks
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavLinkClick(sectionId);
  };

  return (
    <div className="flex space-x-1">
      {NAV_LINKS.map(({ id, href, labelKey }) => {
        const isActive = activeSection === id;
        
        return (
          <a
            key={id}
            href={href}
            onClick={(e) => handleClick(e, id)}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              "transition-smooth",
              
              isActive ? [
                "bg-accent-100 text-accent-700 shadow-sm",
                "dark:bg-accent-900/30 dark:text-accent-400"
              ] : [
                "text-secondary hover:text-accent-700 hover:bg-accent-100",
                "dark:hover:text-accent-300 dark:hover:bg-accent-900/30",
                "hover:shadow-md hover:scale-105"
              ]
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {t(labelKey)}
          </a>
        );
      })}
    </div>
  );
};