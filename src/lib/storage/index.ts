/**
 * Storage abstraction layer
 * Supports both local filesystem and AWS S3
 * Automatically uses S3 if configured, falls back to local storage
 */

import { uploadToS3, deleteFromS3, getS3PublicUrl, isS3Configured } from "./s3";
import { writeFile, unlink } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { generateFilename } from "../upload";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "uploads", "media");

// Ensure local upload directory exists
function ensureLocalDir() {
  if (!existsSync(LOCAL_UPLOAD_DIR)) {
    mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
  }
}

export interface UploadResult {
  url: string;
  key: string; // Storage key/path
  storage: "s3" | "local";
}

/**
 * Upload file to storage (S3 or local)
 */
export async function uploadFile(
  file: Buffer,
  originalName: string,
  contentType: string
): Promise<UploadResult> {
  const filename = generateFilename(originalName);

  // Use S3 if configured, otherwise use local storage
  if (isS3Configured()) {
    const { url, key } = await uploadToS3(file, filename, contentType);
    // Return the full key (media/filename) for S3
    return { url, key, storage: "s3" };
  } else {
    // Local storage
    ensureLocalDir();
    const filePath = path.join(LOCAL_UPLOAD_DIR, filename);
    await writeFile(filePath, file);
    const url = `/api/uploads/media/${filename}`;
    // For local storage, key is just the filename
    return { url, key: filename, storage: "local" };
  }
}

/**
 * Delete file from storage (S3 or local)
 */
export async function deleteFile(key: string, storage: "s3" | "local"): Promise<void> {
  if (storage === "s3") {
    await deleteFromS3(key);
  } else {
    // Local storage
    const filePath = path.join(LOCAL_UPLOAD_DIR, key);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(key: string, storage: "s3" | "local"): string {
  if (storage === "s3") {
    return getS3PublicUrl(key);
  } else {
    // Local storage - relative URL
    return `/api/uploads/media/${key}`;
  }
}

/**
 * Check which storage is being used
 */
export function getStorageType(): "s3" | "local" {
  return isS3Configured() ? "s3" : "local";
}
