import {
  MetaJsonArraySchema,
  MetaJsonChildSchema,
  MetaJsonSchema,
} from "@/schemas/meta-json.schema"
import { z } from "zod"

export type MetaJSON = z.infer<typeof MetaJsonSchema>
export type MetaJsonChild = z.infer<typeof MetaJsonChildSchema>
export type MetaJsonArray = z.infer<typeof MetaJsonArraySchema>
