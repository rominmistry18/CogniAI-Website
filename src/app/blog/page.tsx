import { PageHeader } from "@/components/PageHeader";
import { db } from "@/db";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageContent } from "@/lib/content";
import { isFeatureEnabled } from "@/lib/settings";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string | null;
  publishedAt: Date | null;
  author: {
    name: string;
  } | null;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        publishedAt: "desc",
      },
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
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
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

export default async function BlogPage() {
  // Check if blog feature is enabled
  const blogEnabled = await isFeatureEnabled("blog");
  if (!blogEnabled) {
    notFound();
  }

  const [posts, content] = await Promise.all([
    getBlogPosts(),
    getPageContent("blog")
  ]);

  const headerContent = content.header as { title?: string; subtitle?: string } || {};
  const emptyStateContent = content.empty_state as { title?: string; subtitle?: string; buttonText?: string; buttonLink?: string } || {};

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={headerContent.title || "Insights & Resources"} 
        description={headerContent.subtitle || "Expert perspectives on AI, talent management, and the future of work."}
      />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all"
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                          </div>
                        )}
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Read More */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Tag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{emptyStateContent.title || "No Posts Yet"}</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                {emptyStateContent.subtitle || "We're working on creating valuable content. Check back soon for insights on AI and talent management."}
              </p>
              <Link href={emptyStateContent.buttonLink || "/"}>
                <Button variant="outline">
                  {emptyStateContent.buttonText || "Back to Home"}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
