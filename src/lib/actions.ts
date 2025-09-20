"use server";

import {
  MetaJsonArraySchema,
  MetaJsonChildSchema,
  MetaJsonSchema,
} from "@/schemas/meta-json";
import * as z from "zod";

import { CDN_URL } from "./constants";
import type { MetaJSON } from "./types";

export async function getMetaJSON(
  pathname: string,
): Promise<MetaJSON | undefined> {
  try {
    const url = `${CDN_URL}${pathname}/meta.json`;

    const response = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.log(`[-] meta.json not found at ${url}`);
      return undefined;
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching meta.json:", err);
    return undefined;
  }
}
