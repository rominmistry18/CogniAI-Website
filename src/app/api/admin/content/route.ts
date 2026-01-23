import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

// Manual validation function to avoid Zod v4 bundling issues with Turbopack
function validateContentBody(body: unknown): { 
  success: true; 
  data: { pageKey: string; sectionKey: string; contentData: Record<string, unknown> } 
} | { 
  success: false; 
  error: string 
} {
  if (!body || typeof body !== 'object') {
    return { success: false, error: "Request body must be an object" };
  }
  
  const obj = body as Record<string, unknown>;
  
  if (typeof obj.pageKey !== 'string' || obj.pageKey.length === 0) {
    return { success: false, error: "Page key is required" };
  }
  
  if (typeof obj.sectionKey !== 'string' || obj.sectionKey.length === 0) {
    return { success: false, error: "Section key is required" };
  }
  
  if (!obj.contentData || typeof obj.contentData !== 'object') {
    return { success: false, error: "Content data must be an object" };
  }
  
  return {
    success: true,
    data: {
      pageKey: obj.pageKey,
      sectionKey: obj.sectionKey,
      contentData: obj.contentData as Record<string, unknown>
    }
  };
}

// GET - List all content or specific page content
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CONTENT_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("pageKey");

    const allContent = await db.content.findMany({
      where: pageKey ? { pageKey } : undefined,
      orderBy: [
        { pageKey: "asc" },
        { sectionKey: "asc" },
      ],
    });

    // Parse JSON contentData
    const content = allContent.map((c) => ({
      ...c,
      contentData: JSON.parse(c.contentData),
    }));

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST - Create or update content
export async function POST(request: NextRequest) {
  console.log("[Content API] POST request received");
  
  try {
    console.log("[Content API] Step 1: Getting session...");
    const session = await getSession();
    
    if (!session) {
      console.log("[Content API] No session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("[Content API] Session found for user:", session.user.email);

    console.log("[Content API] Step 2: Checking permissions...");
    if (!hasPermission(session.user.permissions, PERMISSIONS.CONTENT_EDIT)) {
      console.log("[Content API] User lacks CONTENT_EDIT permission");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.log("[Content API] Permission check passed");

    if (!session.user.id) {
      console.log("[Content API] Missing user ID in session");
      return NextResponse.json({ error: "Invalid session: missing user ID" }, { status: 401 });
    }

    console.log("[Content API] Step 3: Parsing request body...");
    const body = await request.json();
    console.log("[Content API] Body received:", JSON.stringify(body).substring(0, 200));
    
    const result = validateContentBody(body);

    if (!result.success) {
      console.log("[Content API] Validation failed:", result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    const { pageKey, sectionKey, contentData } = result.data;
    console.log("[Content API] Step 4: Saving content for", pageKey, "/", sectionKey);

    // Find existing content
    console.log("[Content API] Step 5: Finding existing content...");
    const existing = await db.content.findFirst({
      where: { pageKey, sectionKey },
    });
    console.log("[Content API] Existing content:", existing ? "found (id: " + existing.id + ")" : "not found");

    let savedContent;
    
    if (existing) {
      console.log("[Content API] Step 6: Updating existing content...");
      savedContent = await db.content.update({
        where: { id: existing.id },
        data: {
          contentData: JSON.stringify(contentData),
          updatedBy: session.user.id,
        },
      });
      console.log("[Content API] Update successful");
    } else {
      console.log("[Content API] Step 6: Creating new content...");
      savedContent = await db.content.create({
        data: {
          pageKey,
          sectionKey,
          contentData: JSON.stringify(contentData),
          updatedBy: session.user.id,
        },
      });
      console.log("[Content API] Create successful, id:", savedContent.id);
    }

    // Audit log (simplified - don't fail if this errors)
    console.log("[Content API] Step 7: Creating audit log...");
    try {
      await db.auditLog.create({
        data: {
          userId: session.user.id,
          action: existing ? "update" : "create",
          entityType: "content",
          entityId: savedContent.id,
          newValue: JSON.stringify(contentData),
        },
      });
      console.log("[Content API] Audit log created");
    } catch (auditError) {
      console.error("[Content API] Audit log error (non-fatal):", auditError);
    }

    // Revalidate cached pages to reflect content changes immediately
    console.log("[Content API] Step 8: Revalidating cache...");
    try {
      // Always revalidate home page (most content affects it)
      revalidatePath("/");
      
      // Revalidate the specific page if it's not home
      if (pageKey !== "home") {
        revalidatePath(`/${pageKey.replace(/_/g, "-")}`);
      }
      
      // Also revalidate common pages that might use global content
      if (pageKey === "global") {
        revalidatePath("/about");
        revalidatePath("/features");
        revalidatePath("/pricing");
        revalidatePath("/contact");
        revalidatePath("/faq");
        revalidatePath("/careers");
        revalidatePath("/blog");
      }
      
      console.log("[Content API] Cache revalidated for pageKey:", pageKey);
    } catch (revalidateError) {
      console.error("[Content API] Revalidate error (non-fatal):", revalidateError);
    }

    console.log("[Content API] Step 9: Returning success");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Content API] ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("[Content API] Stack:", errorStack);
    return NextResponse.json({ error: `Failed to save content: ${errorMessage}` }, { status: 500 });
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CONTENT_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 });
    }

    // Get content for audit log
    const existing = await db.content.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    await db.content.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "content",
        entityId: id,
        oldValue: existing.contentData,
      },
    });

    // Revalidate cached pages after content deletion
    try {
      revalidatePath("/");
      if (existing.pageKey !== "home") {
        revalidatePath(`/${existing.pageKey.replace(/_/g, "-")}`);
      }
    } catch (revalidateError) {
      console.error("[Content API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
