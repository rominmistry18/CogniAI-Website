import { cookies } from "next/headers";
import { db } from "@/db";
import { redirect } from "next/navigation";
import type { Permission } from "./permissions";
import { hasPermission } from "./permissions";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  roleId: string;
  roleName: string;
  permissions: string[];
  isActive: boolean;
}

export interface SessionData {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  user: SessionUser;
}

/**
 * Get the current session from cookies
 * Returns null if no valid session exists
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await db.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!session || !session.user.isActive) {
      return null;
    }

    // Parse permissions from JSON string
    const permissions = JSON.parse(session.user.role.permissions) as string[];

    return {
      id: session.id,
      userId: session.userId,
      token: session.token,
      expiresAt: session.expiresAt,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        avatarUrl: session.user.avatarUrl,
        roleId: session.user.roleId,
        roleName: session.user.role.name,
        permissions,
        isActive: session.user.isActive,
      },
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Require authentication - redirects to login if no session
 */
export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }
  
  return session;
}

/**
 * Require specific permission - redirects to dashboard if unauthorized
 */
export async function requirePermission(permission: Permission): Promise<SessionData> {
  const session = await requireAuth();
  
  if (!hasPermission(session.user.permissions, permission)) {
    redirect("/admin?error=unauthorized");
  }
  
  return session;
}

/**
 * Generate a secure random token
 */
export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Create a new session for a user
 */
export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await db.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  // Set the session cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

/**
 * Delete the current session
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.session.deleteMany({
      where: { token },
    });
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}

/**
 * Delete all sessions for a user
 */
export async function deleteAllUserSessions(userId: string): Promise<void> {
  await db.session.deleteMany({
    where: { userId },
  });
}
