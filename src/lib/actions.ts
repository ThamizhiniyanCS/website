"use server";

import type { MetaJSON } from "./types";
import { CDN_URL } from "./constants";

export async function getMetaJSON(pathname: string): Promise<MetaJSON | false> {
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
      return false;
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching meta.json:", err);
    return false;
  }
}
