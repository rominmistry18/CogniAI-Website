import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";
import { z } from "zod";

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  avatarUrl: z.string().url("Please enter a valid URL").nullable().optional(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// GET - Get current user's profile
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get last login from audit logs
    const lastLogin = await db.auditLog.findFirst({
      where: {
        userId: session.user.id,
        action: "login",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        createdAt: true,
        ipAddress: true,
      },
    });

    return NextResponse.json({
      profile: {
        ...user,
        roleName: user.role.name,
        lastLogin: lastLogin ? {
          at: lastLogin.createdAt,
          ipAddress: lastLogin.ipAddress,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// PUT - Update profile (name, email, avatarUrl)
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, avatarUrl } = result.data;

    // Check if email is being changed to an existing email
    if (email && email.toLowerCase() !== session.user.email.toLowerCase()) {
      const existing = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Get current data for audit log
    const currentUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, name: true, avatarUrl: true },
    });

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email: email.toLowerCase() }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "profile",
        entityId: session.user.id,
        oldValue: JSON.stringify(currentUser),
        newValue: JSON.stringify({ name, email, avatarUrl }),
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// POST - Change password
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = changePasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = result.data;

    // Get current user with password hash
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password and update
    const newPasswordHash = await hashPassword(newPassword);
    
    await db.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newPasswordHash },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "password",
        entityId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
