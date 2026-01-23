import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { updateLeadSchema } from "@/lib/validations/leads";

// GET - List all leads
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.LEADS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allLeads = await db.lead.findMany({
      include: {
        assignee: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to match expected format
    const leads = allLeads.map((lead) => ({
      ...lead,
      assigneeName: lead.assignee?.name || null,
      assignee: undefined,
    }));

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// PUT - Update lead
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.LEADS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const result = updateLeadSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Get current lead for audit log
    const currentLead = await db.lead.findUnique({
      where: { id },
    });

    if (!currentLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Check assignment permission
    if (result.data.assignedTo !== undefined && !hasPermission(session.user.permissions, PERMISSIONS.LEADS_ASSIGN)) {
      return NextResponse.json({ error: "You don't have permission to assign leads" }, { status: 403 });
    }

    // Update lead
    await db.lead.update({
      where: { id },
      data: result.data,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "lead",
        entityId: id,
        oldValue: JSON.stringify({
          status: currentLead.status,
          assignedTo: currentLead.assignedTo,
          notes: currentLead.notes,
        }),
        newValue: JSON.stringify(result.data),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// DELETE - Delete lead
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.LEADS_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    // Get lead for audit log
    const currentLead = await db.lead.findUnique({
      where: { id },
    });

    if (!currentLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    await db.lead.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "lead",
        entityId: id,
        oldValue: JSON.stringify({
          name: currentLead.name,
          email: currentLead.email,
          company: currentLead.company,
        }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
