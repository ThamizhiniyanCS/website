import { z } from "zod"

export const MetaJsonChildSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("file"),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    filename: z.string(),
  }),
  z.object({
    type: z.literal("directory"),
    slug: z.string(),
    title: z.string(),
    group: z.boolean().optional(),
  }),
])

export const MetaJsonSchema = z.object({
  root: z.boolean().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  default: z.string().optional(),
  children: z.array(MetaJsonChildSchema),
})

export const MetaJsonArraySchema = z.array(MetaJsonSchema)
