import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  projectsCollection,
};
