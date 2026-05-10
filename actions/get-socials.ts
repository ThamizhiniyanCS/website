"use server"

import { SocialsSchema } from "@/schemas/socials.schema"

import type { Socials } from "@/types/socials.type"

import { fetchFromCDN } from "./lib/fetch-cdn"

export default async function getSocials(): Promise<Socials | undefined> {
  return fetchFromCDN("socials.json", SocialsSchema)
}
