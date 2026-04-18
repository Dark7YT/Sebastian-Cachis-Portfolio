const SITE_URL = 'https://sebastian-cachis.vercel.app';
const SITE_NAME = 'Sebastian Cachis';
const AUTHOR = 'Sebastian Nicolas Cachis Gonzales';
const TWITTER = '@sebastiancachis';

export interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function buildSeo(props: SeoProps = {}) {
  const title = props.title ?? 'Portafolio — Sebastian Cachis';
  const description =
    props.description ??
    'Full Stack Jr. especializado en arquitectura DDD/CQRS y fintech. Lidero CorilOne en producción con Java 17, Spring Boot 3 y Next.js 16.';
  const canonical = `${SITE_URL}/`;
  const ogImage = props.ogImage ?? `${SITE_URL}/og/default-es.svg`;

  return {
    title,
    description,
    canonical,
    ogImage,
    siteName: SITE_NAME,
    author: AUTHOR,
    twitter: TWITTER,
    noindex: props.noindex ?? false,
  };
}

export type SeoData = ReturnType<typeof buildSeo>;
