import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NAV_LINKS, type NavLink as NavLinkType } from '../../constants/navigation'; 
import { FlagText } from '../ui/FlagText';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Dark7YT', icon: Github, ariaLabelKey: 'footer_github_aria' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastian-nicolas-cachis-gonzales-667b23308/', icon: Linkedin, ariaLabelKey: 'footer_linkedin_aria' },
  { name: 'Twitter', href: 'https://x.com/Dark7YT', icon: Twitter, ariaLabelKey: 'footer_twitter_aria' },
  { name: 'Email', href: 'mailto:sebastianjae21@gmail.com', icon: Mail, ariaLabelKey: 'footer_email_aria' },
];

const portfolioTechStack = [
  { 
    name: 'React', 
    href: 'https://react.dev/',
    className: 'bg-gradient-to-br from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white' 
  },
  { 
    name: 'TypeScript', 
    href: 'https://www.typescriptlang.org/docs/',
    className: 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white' 
  },
  { 
    name: 'Tailwind CSS', 
    href: 'https://tailwindcss.com/docs',
    className: 'bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white' 
  },
  {
    name: 'Vite', 
    href: 'https://vitejs.dev/guide/',
    className: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white' 
  }, 
  {
    name: 'Framer Motion', 
    href: 'https://www.framer.com/motion/',
    className: 'bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 hover:from-pink-600 hover:via-purple-700 hover:to-fuchsia-700 text-white'
  }
];


export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2, when: "beforeChildren", staggerChildren: 0.1 } 
    },
  };

  const columnContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const iconItemVariants = { 
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({ 
      opacity: 1, scale: 1, 
      transition: { delay: prefersReducedMotion ? 0 : i * 0.05, type: "spring", stiffness: 200, damping: 12 }
    }),
  };

  const iconHoverEffect = prefersReducedMotion ? {} : { 
    y: -3, scale: 1.15, 
    transition: { type: 'spring', stiffness: 300, damping: 8 }
  };


  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        "py-12 md:py-16 px-4 sm:px-6 lg:px-8",
        "bg-slate-100 dark:bg-neutral-950", 
        "border-t border-slate-200 dark:border-neutral-800", 
        "text-slate-700 dark:text-neutral-400 text-sm" 
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] lg:grid-cols-[2.5fr_1fr_1.5fr] gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 text-left md:text-left">
          
          <motion.div variants={columnContentVariants} className="space-y-4 md:pr-6 lg:pr-8"> 
            <h2 className="text-xl font-montserrat font-bold text-slate-800 dark:text-neutral-100">
              Sebastian Cachis
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
              {t('footer_bio_placeholder')} 
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(link.ariaLabelKey, link.name)}
                  custom={index}
                  variants={iconItemVariants} 
                  initial="hidden"
                  animate="visible"
                  whileHover={iconHoverEffect}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-500 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={columnContentVariants} className="space-y-4">
            <h3 className="text-base font-montserrat font-semibold text-slate-800 dark:text-neutral-200">
              {t('footer_quick_links')}
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {NAV_LINKS.map((link: NavLinkType, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  aria-label={t(link.labelKey)} 
                  title={t(link.labelKey)} 
                  custom={index + socialLinks.length} 
                  variants={iconItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={iconHoverEffect}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full text-slate-500 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-800 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={columnContentVariants} className="space-y-4">
            <h3 className="text-base font-montserrat font-semibold text-slate-800 dark:text-neutral-200">
              {t('footer_technologies_used')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolioTechStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 rounded-full transition-transform duration-150 ease-out",
                    tech.className,
                    "!text-white", // <-- fuerza el color blanco
                    !prefersReducedMotion && "hover:scale-105"
                  )}
                  title={tech.name}
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={columnContentVariants} className="pt-8 border-t border-slate-200/80 dark:border-neutral-700/80">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs">
            <p className="text-slate-600 dark:text-neutral-600 mb-2 sm:mb-0">
              © {currentYear} Sebastian Cachis. {t('footer_rights_reserved')}
            </p>
            <p className="text-slate-600 dark:text-neutral-600">
              {t('footer_built_with')} 
              <span className="text-red-600 animate-pulse"> <FlagText 
                  countryCode="PE" 
                  flagSize="sm"
                  textClassName="text-neutral-200"
                />
        </span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};