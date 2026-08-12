import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()).optional(),
    image: z.string().optional(),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    status: z.enum(["active", "unavailable"]).default("active"),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    capabilities: z.array(z.string()).optional(),
    featured: z.boolean(),
    order: z.number(),
  }),
})

export const collections = { projects }
