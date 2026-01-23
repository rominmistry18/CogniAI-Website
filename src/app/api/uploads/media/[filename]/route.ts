import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getStorageType, getPublicUrl } from "@/lib/storage";
import { db } from "@/db";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "uploads", "media");

// GET - Serve media files (public access)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Security: Prevent directory traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const storageType = getStorageType();

    // Check if file exists in database
    // For S3, filename is stored as "media/filename", for local it's just "filename"
    const media = await db.media.findFirst({
      where: storageType === "s3" 
        ? { filename: `media/${filename}` }
        : { filename },
    });

    if (!media) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // If using S3, redirect to S3 public URL
    if (storageType === "s3") {
      // The filename in database is the S3 key (media/filename)
      const key = media.filename;
      const s3Url = getPublicUrl(key, "s3");
      return NextResponse.redirect(s3Url);
    }

    // Local storage: serve file directly
    const filePath = path.join(LOCAL_UPLOAD_DIR, filename);

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read file
    const fileBuffer = await readFile(filePath);

    // Determine content type from extension or database
    const ext = path.extname(filename).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
    };

    const contentType = contentTypeMap[ext] || media.type || "application/octet-stream";

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 });
  }
}
