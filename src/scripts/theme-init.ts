const STORAGE_KEY = 'theme';
const VALID = ['dark', 'light', 'system'] as const;
type Mode = (typeof VALID)[number];

function resolveTheme(mode: Mode): 'dark' | 'light' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return mode;
}

function apply(mode: Mode) {
  const resolved = resolveTheme(mode);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.style.colorScheme = resolved;
}

function readMode(): Mode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && (VALID as readonly string[]).includes(raw)) return raw as Mode;
  } catch {
    // localStorage unavailable
  }
  return 'system';
}

const initialMode = readMode();
apply(initialMode);

const media = window.matchMedia('(prefers-color-scheme: light)');
media.addEventListener('change', () => {
  if (readMode() === 'system') apply('system');
});

declare global {
  interface Window {
    __theme: {
      get: () => Mode;
      set: (mode: Mode) => void;
      cycle: () => Mode;
    };
  }
}

window.__theme = {
  get: readMode,
  set(mode: Mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
    apply(mode);
    window.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
  },
  cycle() {
    const order: Mode[] = ['system', 'dark', 'light'];
    const current = readMode();
    const next = order[(order.indexOf(current) + 1) % order.length];
    window.__theme.set(next);
    return next;
  },
};
