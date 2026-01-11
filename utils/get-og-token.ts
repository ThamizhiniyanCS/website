import { createHmac } from "node:crypto"
import { env } from "@/env"

export default function getOgToken(
  title: string,
  description: string,
  subdomain: string,
  route: string
): string {
  const hmac = createHmac("sha256", env.OG_SECRET)
  hmac.update(JSON.stringify({ title, description, subdomain, route }))
  const token = hmac.digest("hex")
  return token
}
