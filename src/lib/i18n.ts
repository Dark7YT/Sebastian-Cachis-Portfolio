/**
 * i18n — diccionarios tipados y utilidades de ruteo por locale.
 * Añadir un idioma: crear content/i18n/<code>.json con las mismas claves,
 * importarlo aquí y añadirlo a `locales` y `dictionaries`.
 */

import es from '@content/i18n/es.json';
import en from '@content/i18n/en.json';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

/**
 * Devuelve el diccionario completo para un locale.
 * Uso en Astro: `const t = useTranslations(locale); t.nav.about;`
 */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Construye la ruta equivalente en otro locale (para el toggle de idioma).
 * `/es/about` + 'en'  →  `/en/about`
 */
export function alternatePath(currentPath: string, targetLocale: Locale): string {
  const stripped = currentPath.replace(/^\/(es|en)(?=\/|$)/, '') || '/';
  return `/${targetLocale}${stripped === '/' ? '' : stripped}` || `/${targetLocale}`;
}

/**
 * Extrae el locale desde Astro.currentLocale o el pathname.
 * Fallback: defaultLocale.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(es|en)(\/|$)/);
  return match && isLocale(match[1]) ? match[1] : defaultLocale;
}
