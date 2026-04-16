/**
 * SEO helper — centraliza metadata por página y idioma.
 * Extender aquí propaga a todas las páginas sin tocar el layout.
 */

export type Locale = 'es' | 'en';

export interface SeoProps {
  title?: string;
  description?: string;
  locale: Locale;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = 'Sebastian Cachis';
const SITE_URL = 'https://sebastian-cachis.vercel.app';
const AUTHOR = 'Sebastian Nicolas Cachis Gonzales';
const TWITTER = '@sebastiancachis';

const DEFAULTS: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Portafolio — Sebastian Cachis',
    description:
      'Full Stack Jr. especializado en arquitectura DDD/CQRS y fintech. Lidero CorilOne en producción con Java 17, Spring Boot 3 y Next.js 16.',
  },
  en: {
    title: 'Portfolio — Sebastian Cachis',
    description:
      'Full Stack Jr. specialized in DDD/CQRS architecture and fintech. Leading CorilOne in production with Java 17, Spring Boot 3, and Next.js 16.',
  },
};

export function buildSeo(props: SeoProps) {
  const defaults = DEFAULTS[props.locale];
  const title = props.title ? `${props.title} · ${SITE_NAME}` : defaults.title;
  const description = props.description ?? defaults.description;
  const path = props.path ?? '';
  const canonical = `${SITE_URL}${path}`;
  // SVG placeholder — replace with PNG before production (social crawlers prefer PNG/JPEG)
  const ogImage = props.ogImage ?? `${SITE_URL}/og/default-${props.locale}.svg`;

  return {
    title,
    description,
    canonical,
    ogImage,
    siteName: SITE_NAME,
    author: AUTHOR,
    twitter: TWITTER,
    locale: props.locale,
    noindex: props.noindex ?? false,
    alternates: [
      { hreflang: 'es', href: `${SITE_URL}/es${path.replace(/^\/en|\/es/, '')}` },
      { hreflang: 'en', href: `${SITE_URL}/en${path.replace(/^\/en|\/es/, '')}` },
      { hreflang: 'x-default', href: `${SITE_URL}/es${path.replace(/^\/en|\/es/, '')}` },
    ],
  };
}

export type SeoData = ReturnType<typeof buildSeo>;
