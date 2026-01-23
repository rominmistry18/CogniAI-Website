import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";

// GET - Fetch user's notifications
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const where = {
      userId: session.user.id,
      ...(unreadOnly && { isRead: false }),
    };

    // Get total count
    const total = await db.notification.count({ where });

    // Get notifications
    const notifications = await db.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get unread count
    const unreadCount = await db.notification.count({
      where: {
        userId: session.user.id,
        isRead: false,
      },
    });

    return NextResponse.json({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// PUT - Mark notification(s) as read
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ids, markAllRead } = body;

    if (markAllRead) {
      // Mark all notifications as read for this user
      await db.notification.updateMany({
        where: {
          userId: session.user.id,
          isRead: false,
        },
        data: { isRead: true },
      });

      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Notification IDs are required" }, { status: 400 });
    }

    // Mark specific notifications as read (only if they belong to the user)
    await db.notification.updateMany({
      where: {
        id: { in: ids },
        userId: session.user.id,
      },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}

// DELETE - Delete notification(s)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");
    const deleteAll = searchParams.get("deleteAll") === "true";

    if (deleteAll) {
      // Delete all notifications for this user
      await db.notification.deleteMany({
        where: { userId: session.user.id },
      });

      return NextResponse.json({ success: true, message: "All notifications deleted" });
    }

    if (!ids) {
      return NextResponse.json({ error: "Notification IDs are required" }, { status: 400 });
    }

    const idArray = ids.split(",");

    // Delete specific notifications (only if they belong to the user)
    await db.notification.deleteMany({
      where: {
        id: { in: idArray },
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    return NextResponse.json({ error: "Failed to delete notifications" }, { status: 500 });
  }
}
