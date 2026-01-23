import { z } from "zod";

export const blogStatusEnum = z.enum(["draft", "published", "archived"]);

export const createBlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z.string().max(300, "Excerpt must be less than 300 characters").optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  status: blogStatusEnum.default("draft"),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only")
    .optional(),
  content: z.string().min(50, "Content must be at least 50 characters").optional(),
  excerpt: z.string().max(300, "Excerpt must be less than 300 characters").nullable().optional(),
  coverImage: z.string().url().nullable().optional(),
  tags: z.array(z.string()).optional(),
  status: blogStatusEnum.optional(),
});

export type BlogStatus = z.infer<typeof blogStatusEnum>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
