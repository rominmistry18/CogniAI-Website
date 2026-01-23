import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { isFeatureEnabled } from "@/lib/settings";

// GET - Fetch single job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if careers feature is enabled
    const careersEnabled = await isFeatureEnabled("careers");
    if (!careersEnabled) {
      return NextResponse.json(
        { error: "Careers section is currently disabled" },
        { status: 404 }
      );
    }

    const { id } = await params;

    const job = await db.job.findFirst({
      where: {
        id,
        status: "open",
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        salary: true,
        description: true,
        requirements: true,
        benefits: true,
        createdAt: true,
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}
