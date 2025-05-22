import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../../constants/navigation';
import { cn } from '../../../lib/utils';

interface DesktopNavLinksProps {
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
}

export const DesktopNavLinks: React.FC<DesktopNavLinksProps> = React.memo(
  ({ activeSection, onNavLinkClick }) => {
    const { t } = useTranslation();

    return (
      <nav className="hidden md:flex md:space-x-2 lg:space-x-4" aria-label="Main navigation">
        {NAV_LINKS.map(({ id, href, labelKey }: NavLinkType) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              onClick={() => void onNavLinkClick(id)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                isActive
                  ? "bg-sky-100 text-sky-600 dark:bg-sky-700/30 dark:text-sky-400"
                  : "text-slate-700 hover:bg-slate-200/70 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {t(labelKey)}
            </a>
          );
        })}
      </nav>
    );
  }
);