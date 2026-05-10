import { z } from "zod"

export const BlogCardInputSchema = z.object({
  path: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.coerce.date().optional(),
})

export const BlogCardInputArraySchema = z.array(BlogCardInputSchema)
