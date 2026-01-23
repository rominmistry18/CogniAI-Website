import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession, generateId, hashPassword } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { createUserSchema, updateUserSchema } from "@/lib/validations/users";

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.USERS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allUsers = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        roleId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: {
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
    const users = allUsers.map((user) => ({
      ...user,
      roleName: user.role.name,
      role: undefined,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.USERS_CREATE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = createUserSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, name, roleId } = result.data;

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        roleId,
        isActive: true,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "create",
        entityType: "user",
        entityId: user.id,
        newValue: JSON.stringify({ email, name, roleId }),
      },
    });

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email, name, roleId } 
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.USERS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const result = updateUserSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Get current user data for audit log
    const currentUser = await db.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if trying to update email to an existing email
    if (result.data.email) {
      const existing = await db.user.findUnique({
        where: { email: result.data.email.toLowerCase() },
      });

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Update user
    await db.user.update({
      where: { id },
      data: {
        ...result.data,
        email: result.data.email?.toLowerCase(),
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "user",
        entityId: id,
        oldValue: JSON.stringify({ 
          email: currentUser.email, 
          name: currentUser.name, 
          roleId: currentUser.roleId,
          isActive: currentUser.isActive 
        }),
        newValue: JSON.stringify(result.data),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.USERS_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Get user data for audit log
    const currentUser = await db.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user
    await db.user.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "user",
        entityId: id,
        oldValue: JSON.stringify({ 
          email: currentUser.email, 
          name: currentUser.name, 
          roleId: currentUser.roleId 
        }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
