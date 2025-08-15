import * as z from "zod";

// Infering types from schemas
export type MetaJSON = z.infer<typeof MetaJsonSchema>;
export type MetaJSONchild = z.infer<typeof MetaJsonChildSchema>;
export type MetaJsonArray = z.infer<typeof MetaJsonArraySchema>;
export type TocItem = z.infer<typeof TocItemSchema>;

export const MetaJsonChildSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("file"),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    filename: z.string(),
  }),
  z.object({
    type: z.literal("directory"),
    slug: z.string(),
    title: z.string(),
    group: z.boolean().optional(),
  }),
]);

export const MetaJsonSchema = z.object({
  root: z.boolean().optional(),
  slug: z.string(),
  title: z.string(),
  default: z.string().optional(),
  children: z.array(MetaJsonChildSchema),
});

export const MetaJsonArraySchema = z.array(MetaJsonSchema);

export const TocItemSchema = z.object({
  title: z.any().optional(),
  url: z.string(),
  depth: z.number(),
});
