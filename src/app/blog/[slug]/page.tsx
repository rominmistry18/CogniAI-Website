import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Metadata } from "next";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string | null;
  publishedAt: Date | null;
  author: {
    name: string;
  } | null;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await db.blogPost.findFirst({
      where: {
        slug,
        status: "published",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
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
    });
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Parse tags if they exist
  let tags: string[] = [];
  if (post.tags) {
    try {
      tags = JSON.parse(post.tags);
    } catch {
      tags = post.tags.split(",").map((t) => t.trim());
    }
  }

  return (
    <main className="min-h-screen pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-12 bg-muted">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div 
            className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Posts
          </Link>
        </div>
      </article>
    </main>
  );
}
