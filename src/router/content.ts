import type { IncomingHttpHeaders } from "node:http";
import type {
  MetaJSON,
  MetaJsonArray,
  MetaJSONchild,
} from "@/schemas/meta-json";
import {
  MetaJsonArraySchema,
  MetaJsonChildSchema,
  MetaJsonSchema,
} from "@/schemas/meta-json";
import { onSuccess, ORPCError, os } from "@orpc/server";
import * as z from "zod";

import { CDN_URL } from "@/lib/constants";

export const getMetaJson = os
  .input(
    z.object({
      pathname: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const url = `${CDN_URL}${input.pathname}/meta.json`;

      const response = await fetch(url, {
        // cache: "force-cache",
        // next: {
        //   revalidate: 60,
        // },
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
  });
