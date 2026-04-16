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
    title: 'Sebastian Cachis — Desarrollador Full Stack',
    description:
      'Desarrollador Full Stack especializado en Next.js, Spring Boot y arquitectura de software preparada para escalar. Experiencia en sector financiero con DDD, CQRS y microservicios.',
  },
  en: {
    title: 'Sebastian Cachis — Full Stack Developer',
    description:
      'Full Stack Developer specialized in Next.js, Spring Boot, and scalable software architecture. Financial sector experience with DDD, CQRS, and microservices.',
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
