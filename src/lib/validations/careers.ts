import { z } from "zod";

export const jobTypeEnum = z.enum(["full-time", "part-time", "contract", "internship"]);
export const jobStatusEnum = z.enum(["draft", "open", "closed"]);
export const applicationStatusEnum = z.enum(["new", "reviewing", "interview", "offer", "hired", "rejected"]);

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  type: jobTypeEnum,
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  salary: z.string().optional(),
  status: jobStatusEnum.default("draft"),
});

export const updateJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only")
    .optional(),
  department: z.string().min(2, "Department is required").optional(),
  location: z.string().min(2, "Location is required").optional(),
  type: jobTypeEnum.optional(),
  description: z.string().min(50, "Description must be at least 50 characters").optional(),
  requirements: z.string().min(20, "Requirements must be at least 20 characters").optional(),
  salary: z.string().nullable().optional(),
  status: jobStatusEnum.optional(),
});

// Public job application schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  resumeUrl: z.string().url("Please provide a valid resume URL").optional(),
  coverLetter: z.string().optional(),
  linkedinUrl: z.string().url("Please provide a valid LinkedIn URL").optional(),
});

export const updateApplicationSchema = z.object({
  status: applicationStatusEnum.optional(),
  notes: z.string().nullable().optional(),
});

export type JobType = z.infer<typeof jobTypeEnum>;
export type JobStatus = z.infer<typeof jobStatusEnum>;
export type ApplicationStatus = z.infer<typeof applicationStatusEnum>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
