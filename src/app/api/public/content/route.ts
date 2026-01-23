import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

// GET - Fetch public content for pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("pageKey");
    const sectionKey = searchParams.get("sectionKey");

    if (!pageKey) {
      return NextResponse.json(
        { error: "pageKey is required" },
        { status: 400 }
      );
    }

    // Build query
    const where = sectionKey
      ? { pageKey, sectionKey }
      : { pageKey };

    const content = await db.content.findMany({
      where,
      select: {
        pageKey: true,
        sectionKey: true,
        contentData: true,
        updatedAt: true,
      },
    });

    // Parse contentData JSON
    const parsedContent = content.map((c) => ({
      ...c,
      contentData: JSON.parse(c.contentData),
    }));

    // If requesting specific section, return single object
    if (sectionKey && parsedContent.length === 1) {
      return NextResponse.json({ content: parsedContent[0] });
    }

    return NextResponse.json({ content: parsedContent });
  } catch (error) {
    console.error("Error fetching public content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
