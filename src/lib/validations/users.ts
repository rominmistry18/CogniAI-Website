import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  roleId: z.enum(["super_admin", "admin", "editor", "viewer"]),
});

export const updateUserSchema = z.object({
  email: z.string().email("Please enter a valid email address").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  roleId: z.enum(["super_admin", "admin", "editor", "viewer"]).optional(),
  isActive: z.boolean().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
