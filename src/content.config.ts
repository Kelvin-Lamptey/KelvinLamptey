import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    featured: z.boolean(),
    order: z.number(),
  }),
})

export const collections = { projects }
