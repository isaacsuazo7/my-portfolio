import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const jobSchema = z.object({
  date: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  range: z.string(),
  url: z.string().url(),
});

const featuredSchema = z.object({
  date: z.string(),
  title: z.string(),
  cover: z.string(),
  github: z.string().optional(),
  external: z.string().optional(),
  tech: z.array(z.string()),
});

const blogSchema = z.object({
  date: z.string(),
  title: z.string(),
  external: z.string().url(),
  description: z.string(),
  platform: z.string(),
  topics: z.array(z.string()),
  readTime: z.string().optional(),
});

const jobsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs/en' }),
  schema: jobSchema,
});

const jobsEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs/es' }),
  schema: jobSchema,
});

const featuredEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects/featured/en' }),
  schema: featuredSchema,
});

const featuredEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects/featured/es' }),
  schema: featuredSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog/en' }),
  schema: blogSchema,
});

const blogEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog/es' }),
  schema: blogSchema,
});

export const collections = {
  'jobs-en': jobsEn,
  'jobs-es': jobsEs,
  'featured-en': featuredEn,
  'featured-es': featuredEs,
  'blog-en': blogEn,
  'blog-es': blogEs,
};
