import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const site = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml}',
    base: './src/content/site',
  }),
  schema: z.object({
    handle: z.string(),
    name: z.string(),
    role: z.string(),
    portrait: z.string(),
    portraitAlt: z.string(),
    bio: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    facebookUrl: z.string().url(),
    instagramUrl: z.string().url(),
    gtmId: z.string(),
    googleSiteVerification: z.string().optional(),
    copyrightYear: z.number().int(),
    siteDescription: z.string(),
  }),
});

const series = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/series',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    dateRange: z.string(),
    technique: z.string(),
    worksSummary: z.string(),
    cover: z.string(),
    order: z.number().int(),
    draft: z.boolean().default(false),
    description: z.string(),
  }),
});

const works = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/works',
  }),
  schema: z.object({
    title: z.string(),
    technique: z.string(),
    year: z.number().int(),
    image: z.string(),
    orientation: z.enum(['portrait', 'landscape']),
    order: z.number().int(),
  }),
});

const exhibitions = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/exhibitions',
  }),
  schema: z.object({
    title: z.string(),
    thumb: z.string(),
    fullImage: z.string(),
    order: z.number().int(),
    year: z.number().int().optional(),
  }),
});

export const collections = { site, series, works, exhibitions };
