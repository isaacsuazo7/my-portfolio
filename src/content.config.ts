import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    range: z.string(),
    url: z.string().url(),
  }),
});

const featured = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects/featured' }),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    cover: z.string(),
    github: z.string().optional(),
    external: z.string().optional(),
    tech: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects/other' }),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    github: z.string().optional(),
    external: z.string().optional(),
    tech: z.array(z.string()),
    showInProjects: z.boolean().default(true),
  }),
});

export const collections = { jobs, featured, projects };
