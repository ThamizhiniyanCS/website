import type { SocialSchema, SocialsSchema } from "@/schemas/socials.schema"
import type { z } from "zod"

export type Social = z.infer<typeof SocialSchema>
export type Socials = z.infer<typeof SocialsSchema>
