import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobApplicationSchema } from "@/lib/validations/careers";
import { notifyNewApplication } from "@/lib/notifications";
import { isFeatureEnabled } from "@/lib/settings";

export async function POST(request: NextRequest) {
  try {
    // Check if careers feature is enabled
    const careersEnabled = await isFeatureEnabled("careers");
    if (!careersEnabled) {
      return NextResponse.json(
        { error: "Careers section is currently disabled" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const result = jobApplicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { jobId, name, email, phone, resumeUrl, coverLetter, linkedinUrl } = result.data;

    // Verify job exists and is open
    const job = await db.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.status !== "open") {
      return NextResponse.json(
        { error: "This position is no longer accepting applications" },
        { status: 400 }
      );
    }

    // Create application
    const application = await db.jobApplication.create({
      data: {
        jobId,
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        resumeUrl: resumeUrl || null,
        coverLetter: coverLetter || null,
        linkedinUrl: linkedinUrl || null,
        status: "new",
      },
    });

    // Notify admin users about the new application
    await notifyNewApplication({
      id: application.id,
      name: application.name,
      email: application.email,
      jobTitle: job.title,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
