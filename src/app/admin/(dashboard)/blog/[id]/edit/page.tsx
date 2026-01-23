"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, Eye, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  status: string;
  tags: string[];
  publishedAt: string | null;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    status: "draft",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/admin/blog?id=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.post.title,
            slug: data.post.slug,
            content: data.post.content,
            excerpt: data.post.excerpt || "",
            coverImage: data.post.coverImage || "",
            status: data.post.status,
            tags: data.post.tags || [],
          });
        } else {
          toast.error("Post not found");
          router.push("/admin/blog");
        }
      } catch (error) {
        toast.error("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId, router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (status?: string) => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: postId,
          ...formData, 
          status: status || formData.status,
          excerpt: formData.excerpt || null,
          coverImage: formData.coverImage || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to update post");
        return;
      }

      toast.success("Post updated successfully");
      if (status) {
        setFormData({ ...formData, status });
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/blog")}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Post</h1>
            <p className="text-slate-400">{formData.title || "Untitled"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {formData.status === "published" && (
            <Button
              variant="outline"
              onClick={() => window.open(`/blog/${formData.slug}`, "_blank")}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => handleSubmit()}
            disabled={saving || !formData.title || !formData.content}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          {formData.status !== "published" && (
            <Button
              onClick={() => handleSubmit("published")}
              disabled={saving || !formData.title || !formData.content || !formData.slug}
              className="bg-primary hover:bg-primary/90"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Publish
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title..."
                className="bg-slate-900/50 border-slate-600 text-white text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Slug</Label>
              <div className="flex items-center">
                <span className="text-slate-500 mr-2">/blog/</span>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                  placeholder="post-url-slug"
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-slate-300 mb-3 block">Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your post content here... (Markdown supported)"
              className="bg-slate-900/50 border-slate-600 text-white min-h-[400px] font-mono"
            />
            <p className="text-xs text-slate-500 mt-2">
              Supports Markdown formatting
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-slate-300 mb-3 block">Excerpt</Label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of your post (max 300 characters)"
              maxLength={300}
              className="bg-slate-900/50 border-slate-600 text-white"
              rows={3}
            />
            <p className="text-xs text-slate-500 mt-2">
              {formData.excerpt.length}/300 characters
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-slate-300 mb-3 block">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-slate-300 mb-3 block">Cover Image</Label>
            <Input
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            {formData.coverImage && (
              <div className="mt-3 relative aspect-video bg-slate-900/50 rounded-lg overflow-hidden">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-slate-300 mb-3 block">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag..."
                className="bg-slate-900/50 border-slate-600 text-white"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
