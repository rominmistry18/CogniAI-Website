import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { verifyEmailConnection, sendNotificationEmail } from "@/lib/email";

// POST - Test email connection and optionally send a test email
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.SETTINGS_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { action } = body;

    // Verify SMTP connection
    if (action === "verify") {
      const result = await verifyEmailConnection();
      return NextResponse.json(result);
    }

    // Send test email
    if (action === "send_test") {
      const { email } = body;
      
      if (!email) {
        return NextResponse.json(
          { error: "Email address is required" },
          { status: 400 }
        );
      }

      // First verify connection
      const verifyResult = await verifyEmailConnection();
      if (!verifyResult.success) {
        return NextResponse.json({
          success: false,
          error: `SMTP connection failed: ${verifyResult.error}`,
        });
      }

      // Send test notification
      const result = await sendNotificationEmail(
        "Test Email - Notification System",
        "Test Email Successful!",
        `
          This is a test email from your Cognaium admin panel.<br><br>
          <strong>SMTP Configuration:</strong><br>
          Server: ${process.env.SMTP_SERVER}<br>
          Port: ${process.env.SMTP_PORT}<br>
          Sender: ${process.env.EMAIL_SENDER_ADDRESS}<br><br>
          If you received this email, your notification system is working correctly!
        `
      );

      if (result) {
        return NextResponse.json({
          success: true,
          message: `Test email sent successfully to the notification email configured in settings`,
        });
      } else {
        return NextResponse.json({
          success: false,
          error: "Failed to send test email. Check if notification_email is configured in Settings -> Notifications",
        });
      }
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'verify' or 'send_test'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { 
        error: "Failed to test email", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

// GET - Get email configuration status (no credentials exposed)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.SETTINGS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const config = {
      enabled: process.env.EMAIL_ENABLE_NOTIFICATIONS === "true",
      configured: !!(
        process.env.SMTP_SERVER &&
        process.env.SMTP_USERNAME &&
        process.env.SMTP_PASSWORD
      ),
      server: process.env.SMTP_SERVER ? `${process.env.SMTP_SERVER}:${process.env.SMTP_PORT}` : "Not configured",
      senderName: process.env.EMAIL_SENDER_NAME || "Cognaium",
      senderAddress: process.env.EMAIL_SENDER_ADDRESS || "Not configured",
      timeout: process.env.EMAIL_TIMEOUT_SECONDS || "30",
      retryAttempts: process.env.EMAIL_RETRY_ATTEMPTS || "3",
    };

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Get email config error:", error);
    return NextResponse.json(
      { error: "Failed to get email configuration" },
      { status: 500 }
    );
  }
}
