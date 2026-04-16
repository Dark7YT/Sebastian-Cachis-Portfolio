// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sebastian-cachis.vercel.app',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: true,
  }),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-PE', en: 'en-US' },
      },
    }),
    icon({
      include: {
        lucide: [
          'sun',
          'moon',
          'monitor',
          'menu',
          'x',
          'languages',
          'arrow-right',
          'arrow-up-right',
          'arrow-down',
          'mail',
          'phone',
          'map-pin',
          'github',
          'linkedin',
          'file-text',
          'external-link',
          'check',
          'sparkles',
          'zap',
          'layers',
          'database',
          'code-2',
          'cloud',
          'lock',
        ],
        'simple-icons': [
          'react',
          'nextdotjs',
          'astro',
          'tailwindcss',
          'typescript',
          'javascript',
          'nodedotjs',
          'spring',
          'openjdk',
          'python',
          'postgresql',
          'apachekafka',
          'rabbitmq',
          'amazonwebservices',
          'docker',
          'git',
          'github',
          'linkedin',
          'resend',
        ],
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: 'manual',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
