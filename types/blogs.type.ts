import type {
  BlogCardInputArraySchema,
  BlogCardInputSchema,
} from "@/schemas/blogs.schema"
import type { z } from "zod"

export type BlogCardInput = z.infer<typeof BlogCardInputSchema>
export type BlogCardInputArray = z.infer<typeof BlogCardInputArraySchema>
