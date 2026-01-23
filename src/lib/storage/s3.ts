/**
 * AWS S3 Storage Utility
 * Handles file uploads, deletions, and URL generation for S3
 * Reads configuration from environment variables
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 Configuration from environment variables
const S3_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  region: process.env.AWS_REGION || process.env.AWS_S3_REGION || "us-east-1",
  bucket: process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET || "",
  publicUrl: process.env.AWS_S3_PUBLIC_URL || "", // Optional: Custom CDN URL
};

// Check if S3 is configured
export function isS3Configured(): boolean {
  return !!(
    S3_CONFIG.accessKeyId &&
    S3_CONFIG.secretAccessKey &&
    S3_CONFIG.bucket
  );
}

// Initialize S3 client
let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    if (!isS3Configured()) {
      throw new Error("S3 is not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET_NAME in .env");
    }

    s3Client = new S3Client({
      region: S3_CONFIG.region,
      credentials: {
        accessKeyId: S3_CONFIG.accessKeyId,
        secretAccessKey: S3_CONFIG.secretAccessKey,
      },
    });
  }

  return s3Client;
}

/**
 * Upload file to S3
 */
export async function uploadToS3(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  const client = getS3Client();
  const key = `media/${filename}`;

  const command = new PutObjectCommand({
    Bucket: S3_CONFIG.bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
    // Make file publicly readable
    ACL: "public-read",
  });

  await client.send(command);

  // Generate public URL
  let url: string;
  if (S3_CONFIG.publicUrl) {
    // Use custom CDN URL if provided
    url = `${S3_CONFIG.publicUrl}/${key}`;
  } else {
    // Use standard S3 public URL
    url = `https://${S3_CONFIG.bucket}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;
  }

  return { url, key };
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(key: string): Promise<void> {
  const client = getS3Client();

  const command = new DeleteObjectCommand({
    Bucket: S3_CONFIG.bucket,
    Key: key,
  });

  await client.send(command);
}

/**
 * Get public URL for a file
 */
export function getS3PublicUrl(key: string): string {
  if (S3_CONFIG.publicUrl) {
    return `${S3_CONFIG.publicUrl}/${key}`;
  }
  return `https://${S3_CONFIG.bucket}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;
}

/**
 * Generate a presigned URL (for private files, if needed in future)
 */
export async function getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const client = getS3Client();

  const command = new GetObjectCommand({
    Bucket: S3_CONFIG.bucket,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}
