/**
 * i18n middleware — required when `i18n.routing: 'manual'`.
 *
 * Language detection and locale routing are handled by:
 *   - src/pages/index.astro        → client-side redirect from root
 *   - src/pages/[locale]/index.astro → generates /es/ and /en/ at build time
 *
 * This middleware simply passes all requests through. If you need
 * server-side locale negotiation in the future, add it here.
 */
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((_context, next) => next());
