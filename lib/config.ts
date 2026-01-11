import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types"

export const siteConfig: {
  siteName: string
  title: string
  description: string
  locale: string
  type: OpenGraphType
  authors: { name: string }[]
  keywords: string[]
} = {
  siteName: "Thamizhiniyan C S",
  title: "Thamizhiniyan C S | Ethical Hacker - Web Developer",
  description:
    "Hello, everyone. I Thamizhiniyan C S, an Ethical Hacker, Web Developer, and Cyber Security enthusiast currently in my final year of engineering studies.",
  locale: "en_IN",
  type: "website",
  authors: [{ name: "Thamizhiniyan C S" }],
  keywords: ["Thamizhiniyan", "Cyber Security", "Next.js"],
}
