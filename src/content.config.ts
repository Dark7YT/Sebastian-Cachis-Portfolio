/**
 * Content Collections — fuente única de contenido dinámico del portafolio.
 *
 * Añadir una entrada: crear un .md en src/content/<collection>/ con el frontmatter
 * del schema. Astro lo expone vía getCollection('<collection>') sin tocar código.
 *
 * Extender schema: añadir campo opcional con default aquí. Entradas previas siguen válidas.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localeSchema = z.enum(['es', 'en']);

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const linkSchema = z.object({
  github: z.string().optional(),
  live: z.string().optional(),
  caseStudy: z.string().optional(),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    locale: localeSchema,
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    start: z.string().regex(/^\d{4}-\d{2}$/, 'Formato YYYY-MM'),
    end: z
      .string()
      .regex(/^\d{4}-\d{2}$/, 'Formato YYYY-MM')
      .optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    logo: z.string().optional(),
    url: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    locale: localeSchema,
    slug: z.string(),
    name: z.string(),
    client: z.string().optional(),
    role: z.string().optional(),
    period: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    nda: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    metrics: z.array(metricSchema).default([]),
    images: z.array(imageSchema).default([]),
    links: linkSchema.default({}),
  }),
});

export const collections = { experience, projects };
