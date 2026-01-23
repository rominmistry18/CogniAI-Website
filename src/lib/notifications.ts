import { db } from "@/db";
import { sendLeadNotificationEmail, sendApplicationNotificationEmail } from "./email";

// Notification types
export type NotificationType = "lead" | "application" | "content" | "system";

/**
 * Get a notification setting value
 */
async function getNotificationSetting(key: string): Promise<boolean> {
  try {
    const setting = await db.setting.findUnique({
      where: { key },
    });
    if (setting?.value) {
      try {
        return JSON.parse(setting.value) === true;
      } catch {
        return setting.value === "true";
      }
    }
    // Default to true if not set
    return true;
  } catch {
    return true;
  }
}

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
}

/**
 * Create a notification for a specific user
 */
export async function createNotification({
  userId,
  type,
  title,
  message,
  entityType,
  entityId,
}: CreateNotificationParams): Promise<void> {
  try {
    await db.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        entityType,
        entityId,
      },
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
    // Don't throw - notifications are non-critical
  }
}

/**
 * Create notifications for all admin users
 */
export async function notifyAdmins(
  type: NotificationType,
  title: string,
  message: string,
  entityType?: string,
  entityId?: string
): Promise<void> {
  try {
    // Get all active admin users (super_admin, admin roles)
    const adminUsers = await db.user.findMany({
      where: {
        isActive: true,
        roleId: {
          in: ["super_admin", "admin"],
        },
      },
      select: { id: true },
    });

    // Create notifications for all admins
    await Promise.all(
      adminUsers.map((user) =>
        createNotification({
          userId: user.id,
          type,
          title,
          message,
          entityType,
          entityId,
        })
      )
    );
  } catch (error) {
    console.error("Failed to notify admins:", error);
  }
}

/**
 * Notify admins about a new lead/contact form submission
 */
export async function notifyNewLead(lead: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
}): Promise<void> {
  // Check if lead notifications are enabled
  const isEnabled = await getNotificationSetting("notify_new_leads");
  if (!isEnabled) {
    return;
  }

  const title = "New Contact Form Submission";
  const message = lead.company
    ? `${lead.name} from ${lead.company} submitted a contact form`
    : `${lead.name} (${lead.email}) submitted a contact form`;

  // Create in-app notification
  await notifyAdmins("lead", title, message, "lead", lead.id);
  
  // Send email notification
  await sendLeadNotificationEmail(lead);
}

/**
 * Notify admins about a new job application
 */
export async function notifyNewApplication(application: {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
}): Promise<void> {
  // Check if application notifications are enabled
  const isEnabled = await getNotificationSetting("notify_new_applications");
  if (!isEnabled) {
    return;
  }

  const title = "New Job Application";
  const message = `${application.name} applied for ${application.jobTitle}`;

  // Create in-app notification
  await notifyAdmins("application", title, message, "job_application", application.id);
  
  // Send email notification
  await sendApplicationNotificationEmail(application);
}

/**
 * Notify a specific user about content changes
 */
export async function notifyContentChange(
  userId: string,
  pageKey: string,
  sectionKey: string
): Promise<void> {
  const title = "Content Updated";
  const message = `Content for ${pageKey}/${sectionKey} has been updated`;

  await createNotification({
    userId,
    type: "content",
    title,
    message,
    entityType: "content",
    entityId: `${pageKey}:${sectionKey}`,
  });
}

/**
 * Send a system notification to all admins
 */
export async function notifySystem(title: string, message: string): Promise<void> {
  await notifyAdmins("system", title, message);
}

/**
 * Get unread notification count for a user
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    return await db.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  } catch (error) {
    console.error("Failed to get unread count:", error);
    return 0;
  }
}
