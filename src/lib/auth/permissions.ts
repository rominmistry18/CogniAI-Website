// Role-based permissions for the admin panel

export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",
  
  // Content Management
  CONTENT_VIEW: "content:view",
  CONTENT_EDIT: "content:edit",
  CONTENT_DELETE: "content:delete",
  
  // Lead Management
  LEADS_VIEW: "leads:view",
  LEADS_EDIT: "leads:edit",
  LEADS_DELETE: "leads:delete",
  LEADS_ASSIGN: "leads:assign",
  
  // User Management
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
  
  // Blog Management
  BLOG_VIEW: "blog:view",
  BLOG_CREATE: "blog:create",
  BLOG_EDIT: "blog:edit",
  BLOG_DELETE: "blog:delete",
  BLOG_PUBLISH: "blog:publish",
  
  // Careers Management
  CAREERS_VIEW: "careers:view",
  CAREERS_CREATE: "careers:create",
  CAREERS_EDIT: "careers:edit",
  CAREERS_DELETE: "careers:delete",
  APPLICATIONS_VIEW: "applications:view",
  APPLICATIONS_EDIT: "applications:edit",
  
  // Media Management
  MEDIA_VIEW: "media:view",
  MEDIA_UPLOAD: "media:upload",
  MEDIA_DELETE: "media:delete",
  
  // Settings
  SETTINGS_VIEW: "settings:view",
  SETTINGS_EDIT: "settings:edit",
  
  // Analytics
  ANALYTICS_VIEW: "analytics:view",
  
  // Audit Logs
  AUDIT_VIEW: "audit:view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Default role configurations
export const ROLE_PERMISSIONS = {
  super_admin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.LEADS_VIEW,
    PERMISSIONS.LEADS_EDIT,
    PERMISSIONS.LEADS_DELETE,
    PERMISSIONS.LEADS_ASSIGN,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.BLOG_DELETE,
    PERMISSIONS.BLOG_PUBLISH,
    PERMISSIONS.CAREERS_VIEW,
    PERMISSIONS.CAREERS_CREATE,
    PERMISSIONS.CAREERS_EDIT,
    PERMISSIONS.CAREERS_DELETE,
    PERMISSIONS.APPLICATIONS_VIEW,
    PERMISSIONS.APPLICATIONS_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.AUDIT_VIEW,
  ],
  editor: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.LEADS_VIEW,
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.BLOG_DELETE,
    PERMISSIONS.BLOG_PUBLISH,
    PERMISSIONS.CAREERS_VIEW,
    PERMISSIONS.CAREERS_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  viewer: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.LEADS_VIEW,
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.CAREERS_VIEW,
    PERMISSIONS.APPLICATIONS_VIEW,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
} as const;

export type RoleName = keyof typeof ROLE_PERMISSIONS;

// Helper function to check if a role has a permission
export function hasPermission(permissions: string[], permission: Permission): boolean {
  return permissions.includes(permission);
}

// Helper function to check if a role has any of the permissions
export function hasAnyPermission(permissions: string[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(p => permissions.includes(p));
}

// Helper function to check if a role has all of the permissions
export function hasAllPermissions(permissions: string[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(p => permissions.includes(p));
}
