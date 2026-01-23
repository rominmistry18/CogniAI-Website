import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { settingsSchema } from "@/lib/validations/content";

// GET - Get all settings or specific setting
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.SETTINGS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const setting = await db.setting.findUnique({
        where: { key },
      });

      if (!setting) {
        return NextResponse.json({ error: "Setting not found" }, { status: 404 });
      }

      return NextResponse.json({ 
        setting: {
          ...setting,
          value: JSON.parse(setting.value),
        }
      });
    }

    const allSettings = await db.setting.findMany();
    
    // Parse JSON values
    const settings = allSettings.map((s) => ({
      ...s,
      value: JSON.parse(s.value),
    }));

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// POST - Create or update setting
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.SETTINGS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { key, value, description } = result.data;
    const valueStr = JSON.stringify(value);

    // Check if setting exists
    const existing = await db.setting.findUnique({
      where: { key },
    });

    if (existing) {
      // Update existing setting
      await db.setting.update({
        where: { key },
        data: {
          value: valueStr,
          description: description || existing.description,
          updatedBy: session.user.id,
        },
      });

      // Audit log
      await db.auditLog.create({
        data: {
          userId: session.user.id,
          action: "update",
          entityType: "setting",
          entityId: key,
          oldValue: JSON.stringify({ value: existing.value }),
          newValue: JSON.stringify({ value: valueStr }),
        },
      });
    } else {
      // Create new setting
      await db.setting.create({
        data: {
          key,
          value: valueStr,
          description,
          updatedBy: session.user.id,
        },
      });

      // Audit log
      await db.auditLog.create({
        data: {
          userId: session.user.id,
          action: "create",
          entityType: "setting",
          entityId: key,
          newValue: JSON.stringify({ value: valueStr }),
        },
      });
    }

    // Revalidate all major pages since settings affect the entire site
    try {
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/features");
      revalidatePath("/pricing");
      revalidatePath("/contact");
      revalidatePath("/faq");
      revalidatePath("/careers");
      revalidatePath("/blog");
      revalidatePath("/leadership");
    } catch (revalidateError) {
      console.error("[Settings API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving setting:", error);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}

// DELETE - Delete setting
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.SETTINGS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    // Get setting for audit log
    const existing = await db.setting.findUnique({
      where: { key },
    });

    if (!existing) {
      return NextResponse.json({ error: "Setting not found" }, { status: 404 });
    }

    await db.setting.delete({
      where: { key },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "setting",
        entityId: key,
        oldValue: JSON.stringify({ value: existing.value }),
      },
    });

    // Revalidate all major pages since settings affect the entire site
    try {
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/features");
      revalidatePath("/pricing");
      revalidatePath("/contact");
      revalidatePath("/faq");
      revalidatePath("/careers");
      revalidatePath("/blog");
      revalidatePath("/leadership");
    } catch (revalidateError) {
      console.error("[Settings API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return NextResponse.json({ error: "Failed to delete setting" }, { status: 500 });
  }
}
