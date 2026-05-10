import { z } from "zod"

export const SocialSchema = z.object({
  title: z.string(),
  href: z.string(),
  logo: z.object({
    alt: z.string(),
    src: z.object({
      light: z.string(),
      dark: z.string(),
    }),
  }),
})

export const SocialsSchema = z.array(SocialSchema)
