"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable, Column, StatusBadge } from "@/components/admin";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  ExternalLink,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  authorId: string;
  authorName: string | null;
  status: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    if (!selectedPost) return;

    try {
      const response = await fetch(`/api/admin/blog?id=${selectedPost.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to delete post");
        return;
      }

      toast.success("Post deleted");
      setDeleteDialogOpen(false);
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredPosts = statusFilter === "all" 
    ? posts 
    : posts.filter(p => p.status === statusFilter);

  const columns: Column<BlogPost>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium text-white line-clamp-1">{row.title}</p>
          <p className="text-xs text-slate-500">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      cell: (row) => (
        <span className="text-slate-300">{row.authorName || "Unknown"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "tags",
      header: "Tags",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {(row.tags || []).length > 2 && (
            <span className="text-xs text-slate-500">
              +{row.tags.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      cell: (row) => (
        <span className="text-slate-400 text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (row: BlogPost) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem 
          onClick={() => router.push(`/admin/blog/${row.id}/edit`)}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        {row.status === "published" && (
          <DropdownMenuItem 
            onClick={() => window.open(`/blog/${row.slug}`, "_blank")}
            className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Live
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          onClick={() => {
            setSelectedPost(row);
            setDeleteDialogOpen(true);
          }}
          className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-slate-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === "published").length,
    draft: posts.filter(p => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-slate-400">Create and manage blog content</p>
        </div>
        <Button 
          onClick={() => router.push("/admin/blog/new")} 
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Posts", value: stats.total, color: "text-white" },
          { label: "Published", value: stats.published, color: "text-green-400" },
          { label: "Drafts", value: stats.draft, color: "text-slate-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredPosts}
        columns={columns}
        searchPlaceholder="Search posts..."
        searchKey="title"
        emptyMessage="No blog posts found"
        actions={actions}
        onRowClick={(row) => router.push(`/admin/blog/${row.id}/edit`)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Post</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete &quot;{selectedPost?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
