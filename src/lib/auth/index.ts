import bcrypt from "bcrypt";
import { db } from "@/db";
import { createSession, deleteSession, generateId } from "./session";
import { ROLE_PERMISSIONS } from "./permissions";

const SALT_ROUNDS = 12;

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Authenticate a user with email and password
 */
export async function authenticate(
  email: string, 
  password: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Find user by email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Check if user is active
    if (!user.isActive) {
      return { success: false, error: "Your account has been deactivated" };
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // Create session
    await createSession(user.id);

    // Log the login
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: "login",
        entityType: "session",
        entityId: user.id,
        ipAddress,
        userAgent,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "An error occurred during authentication" };
  }
}

/**
 * Log out the current user
 */
export async function logout(userId?: string, ipAddress?: string, userAgent?: string): Promise<void> {
  if (userId) {
    await db.auditLog.create({
      data: {
        userId,
        action: "logout",
        entityType: "session",
        entityId: userId,
        ipAddress,
        userAgent,
      },
    });
  }
  
  await deleteSession();
}

/**
 * Initialize default roles in the database
 */
export async function initializeRoles(): Promise<void> {
  const roleEntries = Object.entries(ROLE_PERMISSIONS);

  for (const [roleName, permissions] of roleEntries) {
    const existing = await db.role.findUnique({
      where: { id: roleName },
    });

    if (!existing) {
      await db.role.create({
        data: {
          id: roleName,
          name: roleName.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          permissions: JSON.stringify(permissions),
        },
      });
    }
  }
}

/**
 * Create the first super admin user (for initial setup)
 */
export async function createInitialAdmin(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if any admin users exist
    const existingAdmins = await db.user.findFirst();

    if (existingAdmins) {
      return { success: false, error: "Admin user already exists" };
    }

    // Ensure roles are initialized
    await initializeRoles();

    // Create the admin user
    const passwordHash = await hashPassword(password);

    await db.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        roleId: "super_admin",
        isActive: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating initial admin:", error);
    return { success: false, error: "Failed to create admin user" };
  }
}

// Re-export session utilities
export * from "./session";
export * from "./permissions";
