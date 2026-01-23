// File upload utilities
// This module provides utilities for handling file uploads
// In a real implementation, this would integrate with a cloud storage service like Cloudflare R2, AWS S3, or Vercel Blob

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export interface FileMetadata {
  filename: string;
  originalName: string;
  type: string;
  size: number;
  url: string;
}

// Allowed file types
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ALL_ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

// Max file sizes
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Validate a file before upload
 */
export function validateFile(
  file: File,
  options: {
    allowedTypes?: string[];
    maxSize?: number;
  } = {}
): { valid: boolean; error?: string } {
  const { allowedTypes = ALL_ALLOWED_TYPES, maxSize = MAX_IMAGE_SIZE } = options;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size ${formatFileSize(file.size)} exceeds maximum ${formatFileSize(maxSize)}`,
    };
  }

  return { valid: true };
}

/**
 * Generate a unique filename
 */
export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop() || "";
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase()
    .slice(0, 50);
  
  return `${baseName}-${timestamp}-${random}.${extension}`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get file type category
 */
export function getFileCategory(type: string): "image" | "document" | "other" {
  if (ALLOWED_IMAGE_TYPES.includes(type)) return "image";
  if (ALLOWED_DOCUMENT_TYPES.includes(type)) return "document";
  return "other";
}

/**
 * Convert file to base64 (for client-side preview)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Upload file to storage (placeholder implementation)
 * In production, this would upload to Cloudflare R2, AWS S3, Vercel Blob, etc.
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate unique filename
    const filename = generateFilename(file.name);

    // In a real implementation, you would upload to cloud storage here
    // For now, we'll simulate a successful upload with a placeholder URL
    
    // Example: Using Vercel Blob
    // const { url } = await put(filename, file, { access: 'public' });
    
    // Example: Using Cloudflare R2
    // await r2Client.upload(filename, file);
    // const url = `${process.env.R2_PUBLIC_URL}/${filename}`;

    // Placeholder URL for development
    const url = `/uploads/${filename}`;

    return {
      success: true,
      url,
      filename,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: "Failed to upload file",
    };
  }
}

/**
 * Delete file from storage (placeholder implementation)
 */
export async function deleteFile(filename: string): Promise<boolean> {
  try {
    // In a real implementation, you would delete from cloud storage here
    // Example: await r2Client.delete(filename);
    
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}
