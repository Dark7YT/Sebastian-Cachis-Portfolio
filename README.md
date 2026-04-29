# Sebastian Cachis — Portfolio

Personal portfolio of Sebastian Nicolas Cachis Gonzales, Full Stack Developer focused on fintech architecture. Built with Astro 6, Tailwind CSS v4, GSAP, and deployed on Vercel.

**Live:** https://www.sebas-cachis.dev

---

## Tech stack

| Layer | Tooling |
|---|---|
| Framework | Astro 6.1 (hybrid SSR) |
| Styling | Tailwind CSS v4 — design tokens in CSS |
| Animations | GSAP 3 + ScrollTrigger, Astro View Transitions |
| Icons | astro-icon + lucide + simple-icons (zero emojis) |
| Fonts | Instrument Serif, Inter Variable, JetBrains Mono |
| i18n | Astro native (ES default, EN), auto-detect + toggle |
| Theming | Dual dark/light, auto prefers-color-scheme + toggle |
| Content | Astro Content Collections (Zod schemas) |
| Contact | Resend API + Zod validation + rate limiting |
| Deployment | Vercel (serverless for /api/contact, prerendered pages) |

---

## Local development

```bash
# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local
# Fill in RESEND_API_KEY and CONTACT_TO_EMAIL

# Start dev server
npm run dev
# http://localhost:4321
```

---

## Available commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to ./dist/ |
| `npm run preview` | Preview build locally |
| `npm run check` | Astro type-check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (prod) | Resend API key for contact form |
| `CONTACT_TO_EMAIL` | Yes (prod) | Email address that receives contact messages |
| `CONTACT_FROM_EMAIL` | No | Sender address shown to recipient (defaults to onboarding@resend.dev) |

Set these in your Vercel project dashboard under Settings → Environment Variables.

---

## Content structure

All content is decoupled from presentation and lives in `src/content/`:

```
src/content/
├── experience/          # One .md per role per locale (e.g. grupo-coril-corilone.es.md)
├── projects/            # One .md per project per locale (e.g. corilone.es.md)
└── i18n/                # es.json, en.json — all UI strings
```

**Adding an experience entry:** create `src/content/experience/<slug>.<locale>.md` with frontmatter matching the Zod schema in `src/content.config.ts`. No code changes needed.

**Adding a project:** same pattern in `src/content/projects/`. Set `featured: true` to surface it prominently.

**Changing colors:** edit `src/styles/themes.css` — the `[data-theme="dark"]` and `[data-theme="light"]` blocks each map to one set of CSS variables. The entire site reflects the change.

---

## Adding project images

1. Place screenshots in `src/assets/projects/` (PNG or WebP, 1600px wide recommended).
2. Import the image in the project `.md` body or update `Projects.astro` to import by convention.
3. Use the `ProjectImage` component (`src/components/ui/ProjectImage.astro`) — it outputs AVIF + WebP with lazy loading automatically.

Profile photo goes in `src/assets/profile/sebastian.jpg` — the About section is ready to receive it.

---

## Deployment (Vercel)

1. Push to `main` — Vercel auto-deploys.
2. Set env vars in the Vercel dashboard.
3. Custom domain: add in Vercel → Domains.

The build outputs:
- Prerendered static pages: `/`, `/es/`, `/en/`
- Serverless function: `/api/contact`
- Sitemap: `/sitemap-index.xml`

---

## Project conventions

- **Conventional Commits** — all commits follow the `type(scope): description` format.
- **Zero emojis** — all iconography uses SVG via astro-icon.
- **i18n** — every user-facing string lives in `src/content/i18n/{es,en}.json`. Never hardcode copy in components.
- **Responsive** — mobile-first, tested from 320px to 1920px.
- **Theme** — preference auto-detected from OS, persisted in localStorage, FOUC-free.
