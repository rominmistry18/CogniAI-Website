import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { updateApplicationSchema } from "@/lib/validations/careers";

// GET - List all applications
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.APPLICATIONS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const allApplications = await db.jobApplication.findMany({
      where: jobId ? { jobId } : undefined,
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to match expected format
    const applications = allApplications.map((app) => ({
      ...app,
      jobTitle: app.job.title,
      job: undefined,
    }));

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

// PUT - Update application status
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.APPLICATIONS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const result = updateApplicationSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Get current application
    const currentApp = await db.jobApplication.findUnique({
      where: { id },
    });

    if (!currentApp) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    await db.jobApplication.update({
      where: { id },
      data: result.data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "job_application",
        entityId: id,
        oldValue: JSON.stringify({ status: currentApp.status }),
        newValue: JSON.stringify(result.data),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
