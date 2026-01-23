"use client";

import { useEffect, useState } from "react";
import { hasPermission, hasAnyPermission, type Permission } from "@/lib/auth/permissions";

interface RoleGuardProps {
  children: React.ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
}: RoleGuardProps) {
  const [userPermissions, setUserPermissions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setUserPermissions(data.user.permissions);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  if (loading || !userPermissions) {
    return null;
  }

  // Check single permission
  if (permission) {
    if (!hasPermission(userPermissions, permission)) {
      return <>{fallback}</>;
    }
    return <>{children}</>;
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    if (requireAll) {
      const hasAll = permissions.every(p => hasPermission(userPermissions, p));
      if (!hasAll) {
        return <>{fallback}</>;
      }
    } else {
      if (!hasAnyPermission(userPermissions, permissions)) {
        return <>{fallback}</>;
      }
    }
  }

  return <>{children}</>;
}
