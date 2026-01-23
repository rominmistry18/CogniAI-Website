import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

// GET - List audit logs
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.AUDIT_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const entityType = searchParams.get("entityType");
    const action = searchParams.get("action");
    const userId = searchParams.get("userId");

    const skip = (page - 1) * limit;

    // Build where conditions
    const where: Record<string, unknown> = {};
    if (entityType) where.entityType = entityType;
    if (action) where.action = action;
    if (userId) where.userId = userId;

    // Get total count
    const total = await db.auditLog.count({ where });

    // Get logs with user info
    const logs = await db.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Transform logs
    const transformedLogs = logs.map((log) => ({
      id: log.id,
      userId: log.userId,
      userName: log.user?.name || null,
      userEmail: log.user?.email || null,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      oldValue: log.oldValue ? JSON.parse(log.oldValue) : null,
      newValue: log.newValue ? JSON.parse(log.newValue) : null,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({
      logs: transformedLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
