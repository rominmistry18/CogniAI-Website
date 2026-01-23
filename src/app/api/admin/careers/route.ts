import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { createJobSchema, updateJobSchema } from "@/lib/validations/careers";

// GET - List all jobs
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CAREERS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const job = await db.job.findUnique({
        where: { id },
      });

      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }

      return NextResponse.json({ job });
    }

    const jobs = await db.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST - Create new job
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CAREERS_CREATE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = createJobSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existing = await db.job.findUnique({
      where: { slug: result.data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A job with this slug already exists" },
        { status: 400 }
      );
    }

    const job = await db.job.create({
      data: result.data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "create",
        entityType: "job",
        entityId: job.id,
        newValue: JSON.stringify({ title: result.data.title, department: result.data.department }),
      },
    });

    // Revalidate careers page to show new job
    try {
      revalidatePath("/careers");
    } catch (revalidateError) {
      console.error("[Careers API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true, id: job.id });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

// PUT - Update job
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CAREERS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const result = updateJobSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Get current job
    const currentJob = await db.job.findUnique({
      where: { id },
    });

    if (!currentJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check slug conflict
    if (result.data.slug) {
      const existing = await db.job.findUnique({
        where: { slug: result.data.slug },
      });

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "A job with this slug already exists" },
          { status: 400 }
        );
      }
    }

    await db.job.update({
      where: { id },
      data: result.data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "job",
        entityId: id,
        oldValue: JSON.stringify({ title: currentJob.title, status: currentJob.status }),
        newValue: JSON.stringify(result.data),
      },
    });

    // Revalidate careers page to reflect changes
    try {
      revalidatePath("/careers");
    } catch (revalidateError) {
      console.error("[Careers API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE - Delete job
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.CAREERS_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const currentJob = await db.job.findUnique({
      where: { id },
    });

    if (!currentJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await db.job.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "job",
        entityId: id,
        oldValue: JSON.stringify({ title: currentJob.title }),
      },
    });

    // Revalidate careers page after deletion
    try {
      revalidatePath("/careers");
    } catch (revalidateError) {
      console.error("[Careers API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
