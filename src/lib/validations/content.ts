import { z } from "zod";

export const updateContentSchema = z.object({
  pageKey: z.string().min(1, "Page key is required"),
  sectionKey: z.string().min(1, "Section key is required"),
  contentData: z.record(z.unknown()),
});

export const settingsSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.unknown(),
  description: z.string().optional(),
});

export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
