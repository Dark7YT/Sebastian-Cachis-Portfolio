/**
 * i18n client — manages language switching without page navigation.
 *
 * Both locale dictionaries are imported at build time and bundled into one JS
 * file. On locale change, all [data-i18n] text nodes and [data-locale-block]
 * visibility are updated in one synchronous pass.
 *
 * Exposed on window.__i18n for use by LanguageToggle and ContactForm.
 */
import esRaw from '@content/i18n/es.json';
import enRaw from '@content/i18n/en.json';

export type Locale = 'es' | 'en';

// ---------------------------------------------------------------------------
// Flatten nested JSON → dot-notation lookup
// { hero: { eyebrow: "x" }, about: { body: ["p1","p2"] } }
// → { "hero.eyebrow": "x", "about.body.0": "p1", ... }
// ---------------------------------------------------------------------------
function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'string') {
          acc[`${key}.${i}`] = item;
        } else if (item && typeof item === 'object') {
          Object.assign(acc, flatten(item as Record<string, unknown>, `${key}.${i}`));
        }
      });
    } else if (v !== null && typeof v === 'object') {
      Object.assign(acc, flatten(v as Record<string, unknown>, key));
    } else {
      acc[key] = String(v ?? '');
    }
    return acc;
  }, {});
}

const dicts: Record<Locale, Record<string, string>> = {
  es: flatten(esRaw as Record<string, unknown>),
  en: flatten(enRaw as Record<string, unknown>),
};

// ---------------------------------------------------------------------------
// Core: apply a locale to the DOM
// ---------------------------------------------------------------------------
function applyLocale(locale: Locale) {
  const dict = dicts[locale];

  // 0. Page title
  const pageTitle = dict['meta.title'];
  if (pageTitle) document.title = pageTitle;

  // 1. Static text nodes
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const val = dict[el.dataset.i18n!];
    if (val !== undefined) el.textContent = val;
  });

  // 2. Aria-label attributes
  document.querySelectorAll<HTMLElement>('[data-i18n-label]').forEach((el) => {
    const val = dict[el.dataset.i18nLabel!];
    if (val !== undefined) el.setAttribute('aria-label', val);
  });

  // 2b. href attributes (for links whose target changes per locale, e.g. CV PDF)
  document.querySelectorAll<HTMLElement>('[data-i18n-href]').forEach((el) => {
    const val = dict[el.dataset.i18nHref!];
    if (val !== undefined) el.setAttribute('href', val);
  });

  // 3. Content-collection blocks (Experience / Projects entries)
  document.querySelectorAll<HTMLElement>('[data-locale-block]').forEach((el) => {
    el.hidden = el.dataset.localeBlock !== locale;
  });

  // 4. HTML root
  document.documentElement.lang = locale;
  document.documentElement.dataset.lang = locale;

  // 5. Contact form locale (used by /api/contact)
  document.querySelector<HTMLElement>('[data-contact-form]')?.setAttribute('data-locale', locale);

  // 6. Theme toggle labels (stored as JSON in data attribute)
  const themeLabels = {
    dark: dict['toggles.theme.dark'],
    light: dict['toggles.theme.light'],
    system: dict['toggles.theme.system'],
  };
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.dataset.themeLabels = JSON.stringify(themeLabels);
    const mode = window.__theme?.get?.() ?? 'system';
    const label = btn.querySelector<HTMLElement>('[data-theme-label]');
    if (label) label.textContent = themeLabels[mode as keyof typeof themeLabels] ?? mode;
  });

  // 7. Notify GSAP to refresh ScrollTrigger (visibility changed)
  document.dispatchEvent(new CustomEvent('i18n:locale-changed', { detail: { locale } }));
}

// ---------------------------------------------------------------------------
// Locale resolution
// ---------------------------------------------------------------------------
export function getLocale(): Locale {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'es' || stored === 'en') return stored;
    const cookie = document.cookie.match(/(?:^|;\s*)lang=(es|en)/)?.[1] as Locale | undefined;
    if (cookie) return cookie;
    return navigator.language?.startsWith('es') ? 'es' : 'en';
  } catch {
    return 'es';
  }
}

export function setLocale(locale: Locale) {
  try {
    localStorage.setItem('lang', locale);
    document.cookie = `lang=${locale}; path=/; max-age=31536000; samesite=lax`;
  } catch { /* storage unavailable */ }
  applyLocale(locale);
}

// ---------------------------------------------------------------------------
// Public API + type declarations
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    __i18n: {
      getLocale: () => Locale;
      setLocale: (locale: Locale) => void;
      /** Look up a translation key in the current locale */
      t: (key: string) => string;
    };
  }
}

window.__i18n = {
  getLocale,
  setLocale,
  t: (key: string) => {
    const locale = getLocale();
    return dicts[locale][key] ?? dicts.es[key] ?? key;
  },
};

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
function init() {
  applyLocale(getLocale());
}

// Run immediately (modules are deferred — DOM is ready) and on SPA transitions
init();
document.addEventListener('astro:page-load', init);
