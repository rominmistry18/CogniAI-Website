import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { isFeatureEnabled } from "@/lib/settings";

// GET - Fetch all published/open jobs
export async function GET(request: NextRequest) {
  try {
    // Check if careers feature is enabled
    const careersEnabled = await isFeatureEnabled("careers");
    if (!careersEnabled) {
      return NextResponse.json(
        { error: "Careers section is currently disabled" },
        { status: 404 }
      );
    }

    const jobs = await db.job.findMany({
      where: {
        status: "open",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        description: true,
        requirements: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
