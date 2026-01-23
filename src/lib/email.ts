import nodemailer from "nodemailer";
import { db } from "@/db";

// Email configuration from environment variables
const emailConfig = {
  host: process.env.SMTP_SERVER || "",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
  senderName: process.env.EMAIL_SENDER_NAME || "Cognaium",
  senderAddress: process.env.EMAIL_SENDER_ADDRESS || "",
  enabled: process.env.EMAIL_ENABLE_NOTIFICATIONS === "true",
  timeout: parseInt(process.env.EMAIL_TIMEOUT_SECONDS || "30", 10) * 1000,
  retryAttempts: parseInt(process.env.EMAIL_RETRY_ATTEMPTS || "3", 10),
};

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!emailConfig.enabled) {
    console.log("[Email] Email notifications are disabled");
    return null;
  }

  if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass) {
    console.error("[Email] SMTP credentials not configured");
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
      connectionTimeout: emailConfig.timeout,
      greetingTimeout: emailConfig.timeout,
      socketTimeout: emailConfig.timeout,
    });
  }

  return transporter;
}

/**
 * Get the notification email from settings database
 */
async function getNotificationEmail(): Promise<string | null> {
  try {
    const setting = await db.setting.findUnique({
      where: { key: "notification_email" },
    });
    
    if (setting?.value) {
      try {
        const parsed = JSON.parse(setting.value);
        return typeof parsed === "string" && parsed.length > 0 ? parsed : null;
      } catch {
        return setting.value.length > 0 ? setting.value : null;
      }
    }
    return null;
  } catch (error) {
    console.error("[Email] Failed to get notification email:", error);
    return null;
  }
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using SMTP
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  const transport = getTransporter();
  
  if (!transport) {
    return false;
  }

  const from = emailConfig.senderAddress 
    ? `"${emailConfig.senderName}" <${emailConfig.senderAddress}>`
    : emailConfig.senderName;

  let attempts = 0;
  const maxAttempts = emailConfig.retryAttempts;

  while (attempts < maxAttempts) {
    try {
      await transport.sendMail({
        from,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML for text version
      });
      
      console.log(`[Email] Sent successfully to ${to}: ${subject}`);
      return true;
    } catch (error) {
      attempts++;
      console.error(`[Email] Attempt ${attempts}/${maxAttempts} failed:`, error);
      
      if (attempts < maxAttempts) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  console.error(`[Email] Failed to send after ${maxAttempts} attempts`);
  return false;
}

/**
 * Send notification email to admin(s)
 */
export async function sendNotificationEmail(
  subject: string,
  title: string,
  message: string,
  entityType?: string,
  entityId?: string
): Promise<boolean> {
  const notificationEmail = await getNotificationEmail();
  
  if (!notificationEmail) {
    console.log("[Email] No notification email configured in settings");
    return false;
  }

  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  
  // Build entity link if applicable
  let entityLink = "";
  if (entityType && entityId) {
    switch (entityType) {
      case "lead":
        entityLink = `${adminUrl}/admin/leads/${entityId}`;
        break;
      case "job_application":
        entityLink = `${adminUrl}/admin/careers/applications`;
        break;
      default:
        entityLink = `${adminUrl}/admin`;
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #002F6C 0%, #007ACC 100%); padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Cognaium Notification</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
          <h2 style="color: #1a1a1a; margin: 0 0 16px; font-size: 20px;">${title}</h2>
          <p style="color: #4a4a4a; margin: 0 0 24px; line-height: 1.6; font-size: 16px;">
            ${message}
          </p>
          
          ${entityLink ? `
            <a href="${entityLink}" style="display: inline-block; background: #007ACC; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              View Details
            </a>
          ` : ''}
        </div>
        
        <!-- Footer -->
        <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            This is an automated notification from your Cognaium admin panel.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: notificationEmail,
    subject: `[Cognaium] ${subject}`,
    html,
  });
}

/**
 * Send email notification for new lead
 */
export async function sendLeadNotificationEmail(lead: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
}): Promise<boolean> {
  const subject = "New Contact Form Submission";
  const title = "New Lead Received";
  const message = `
    <strong>Name:</strong> ${lead.name}<br>
    <strong>Email:</strong> ${lead.email}<br>
    ${lead.company ? `<strong>Company:</strong> ${lead.company}<br>` : ''}
    ${lead.message ? `<strong>Message:</strong><br>${lead.message}` : ''}
  `;

  return sendNotificationEmail(subject, title, message, "lead", lead.id);
}

/**
 * Send email notification for new job application
 */
export async function sendApplicationNotificationEmail(application: {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
}): Promise<boolean> {
  const subject = `New Application: ${application.jobTitle}`;
  const title = "New Job Application Received";
  const message = `
    <strong>Applicant:</strong> ${application.name}<br>
    <strong>Email:</strong> ${application.email}<br>
    <strong>Position:</strong> ${application.jobTitle}
  `;

  return sendNotificationEmail(subject, title, message, "job_application", application.id);
}

/**
 * Verify SMTP connection
 */
export async function verifyEmailConnection(): Promise<{ success: boolean; error?: string }> {
  const transport = getTransporter();
  
  if (!transport) {
    return { 
      success: false, 
      error: "Email is disabled or SMTP not configured" 
    };
  }

  try {
    await transport.verify();
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
