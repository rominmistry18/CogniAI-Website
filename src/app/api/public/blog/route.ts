import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

// GET - Fetch all published blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const where = {
      status: "published" as const,
    };

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: {
          publishedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          tags: true,
          publishedAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      db.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
