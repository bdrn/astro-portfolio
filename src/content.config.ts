import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const project = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    slug: z.string(),
    githubURL: z.string(),
    liveURL: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.string().date(),
    tags: z.array(z.string()),
    image: z.string(),
  }),
});

export const collections = { project, blog };
