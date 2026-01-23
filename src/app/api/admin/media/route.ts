import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { validateFile } from "@/lib/upload";
import { uploadFile, deleteFile, getStorageType } from "@/lib/storage";

// GET - List all media
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.MEDIA_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const media = await db.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ media });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

// POST - Upload new media
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.MEDIA_UPLOAD)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    const validation = validateFile(file as unknown as { type: string; size: number } & File);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to storage (S3 or local)
    const storageType = getStorageType();
    const { url, key } = await uploadFile(buffer, file.name, file.type);

    // For database, store the key as filename
    // For S3: key is "media/filename", for local: key is "filename"
    const dbFilename = storageType === "s3" ? key : key;

    // Save to database
    const media = await db.media.create({
      data: {
        filename: dbFilename,
        originalName: file.name,
        url,
        type: file.type,
        size: file.size,
        uploadedBy: session.user.id,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "create",
        entityType: "media",
        entityId: media.id,
        newValue: JSON.stringify({ filename: key, originalName: file.name, type: file.type, storage: storageType }),
      },
    });

    return NextResponse.json({
      success: true,
      media: {
        id: media.id,
        filename: key,
        originalName: file.name,
        url,
        type: file.type,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}

// DELETE - Delete media
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.MEDIA_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    // Get media for audit log
    const currentMedia = await db.media.findUnique({
      where: { id },
    });

    if (!currentMedia) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Determine storage type from URL
    const storageType = currentMedia.url.startsWith("http") ? "s3" : "local";

    // Delete file from storage (S3 or local)
    try {
      await deleteFile(currentMedia.filename, storageType);
    } catch (error) {
      console.error("Error deleting file from storage:", error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await db.media.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "media",
        entityId: id,
        oldValue: JSON.stringify({ filename: currentMedia.filename }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
