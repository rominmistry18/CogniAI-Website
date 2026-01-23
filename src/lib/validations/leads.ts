import { z } from "zod";

export const leadStatusEnum = z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]);

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("contact_form"),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  company: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  status: leadStatusEnum.optional(),
  assignedTo: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

// Public contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LeadStatus = z.infer<typeof leadStatusEnum>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
