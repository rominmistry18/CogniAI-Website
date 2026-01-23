import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";
import { createBlogPostSchema, updateBlogPostSchema } from "@/lib/validations/blog";

// GET - List all blog posts
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.BLOG_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Get single post
      const post = await db.blogPost.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json({ 
        post: {
          ...post,
          authorName: post.author.name,
          tags: JSON.parse(post.tags),
          author: undefined,
        }
      });
    }

    // Get all posts
    const allPosts = await db.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const posts = allPosts.map((post) => ({
      ...post,
      authorName: post.author.name,
      tags: JSON.parse(post.tags),
      author: undefined,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.BLOG_CREATE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = createBlogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { title, slug, content, excerpt, coverImage, tags, status } = result.data;

    // Check if slug already exists
    const existing = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Determine published date
    const publishedAt = status === "published" ? new Date() : null;

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        authorId: session.user.id,
        status,
        tags: JSON.stringify(tags || []),
        publishedAt,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "create",
        entityType: "blog_post",
        entityId: post.id,
        newValue: JSON.stringify({ title, slug, status }),
      },
    });

    // Revalidate blog pages to reflect new post
    try {
      revalidatePath("/blog");
      if (status === "published") {
        revalidatePath(`/blog/${slug}`);
      }
    } catch (revalidateError) {
      console.error("[Blog API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true, id: post.id });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

// PUT - Update blog post
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.BLOG_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const result = updateBlogPostSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Get current post for audit log
    const currentPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if new slug conflicts with another post
    if (result.data.slug) {
      const existing = await db.blogPost.findUnique({
        where: { slug: result.data.slug },
      });

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Check publish permission
    if (result.data.status === "published" && !hasPermission(session.user.permissions, PERMISSIONS.BLOG_PUBLISH)) {
      return NextResponse.json({ error: "You don't have permission to publish posts" }, { status: 403 });
    }

    // Handle publish date
    let publishedAt = currentPost.publishedAt;
    if (result.data.status === "published" && !publishedAt) {
      publishedAt = new Date();
    }

    // Prepare update data
    const dataToUpdate: Record<string, unknown> = { ...result.data, publishedAt };
    if (result.data.tags) {
      dataToUpdate.tags = JSON.stringify(result.data.tags);
    }

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: dataToUpdate,
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "update",
        entityType: "blog_post",
        entityId: id,
        oldValue: JSON.stringify({ title: currentPost.title, status: currentPost.status }),
        newValue: JSON.stringify(result.data),
      },
    });

    // Revalidate blog pages to reflect updated post
    try {
      revalidatePath("/blog");
      // Revalidate both old and new slug if changed
      revalidatePath(`/blog/${currentPost.slug}`);
      if (updatedPost.slug !== currentPost.slug) {
        revalidatePath(`/blog/${updatedPost.slug}`);
      }
    } catch (revalidateError) {
      console.error("[Blog API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE - Delete blog post
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.BLOG_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Get post for audit log
    const currentPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.blogPost.delete({
      where: { id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: session.user.id,
        action: "delete",
        entityType: "blog_post",
        entityId: id,
        oldValue: JSON.stringify({ title: currentPost.title, slug: currentPost.slug }),
      },
    });

    // Revalidate blog pages after deletion
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${currentPost.slug}`);
    } catch (revalidateError) {
      console.error("[Blog API] Revalidate error (non-fatal):", revalidateError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
