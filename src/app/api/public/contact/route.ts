import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactFormSchema } from "@/lib/validations/leads";
import { notifyNewLead } from "@/lib/notifications";
import { isFeatureEnabled } from "@/lib/settings";

// Rate limiting map (simple in-memory implementation)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check if contact form is enabled
    const contactEnabled = await isFeatureEnabled("contact_form");
    if (!contactEnabled) {
      return NextResponse.json(
        { error: "Contact form is currently disabled" },
        { status: 403 }
      );
    }

    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, company, phone, message } = result.data;

    // Create lead
    const lead = await db.lead.create({
      data: {
        name,
        email: email.toLowerCase(),
        company: company || null,
        phone: phone || null,
        message,
        source: "contact_form",
        status: "new",
      },
    });

    // Notify admin users about the new lead (in-app + email)
    await notifyNewLead({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      message: lead.message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 }
    );
  }
}
