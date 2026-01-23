"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Trash2, 
  Search,
  Image as ImageIcon,
  FileText,
  Grid,
  List,
  X,
  Copy,
  Check,
  Loader2
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        setMedia(data.media);
      }
    } catch (error) {
      toast.error("Failed to fetch media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);

    for (const file of acceptedFiles) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || `Failed to upload ${file.name}`);
        } else {
          toast.success(`Uploaded ${file.name}`);
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    fetchMedia();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleDelete = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(`/api/admin/media?id=${selectedMedia.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete media");
        return;
      }

      toast.success("Media deleted");
      setDeleteDialogOpen(false);
      setSelectedMedia(null);
      fetchMedia();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("URL copied to clipboard");
  };

  const filteredMedia = media.filter((item) =>
    item.originalName.toLowerCase().includes(search.toLowerCase())
  );

  const isImage = (type: string) => type.startsWith("image/");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-slate-400">Upload and manage images and documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-slate-700 hover:border-slate-600",
          uploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          ) : (
            <Upload className="w-10 h-10 text-slate-500" />
          )}
          <div>
            <p className="text-white font-medium">
              {uploading ? "Uploading..." : isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              or click to browse (max 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <Input
          type="search"
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pl-10"
        />
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No media files found</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedMedia(item);
                setDetailDialogOpen(true);
              }}
              className="group relative bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
            >
              <div className="aspect-square flex items-center justify-center bg-slate-900/50">
                {isImage(item.type) ? (
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : (
                  <FileText className="w-12 h-12 text-slate-500" />
                )}
              </div>
              <div className="p-2">
                <p className="text-sm text-white truncate">{item.originalName}</p>
                <p className="text-xs text-slate-500">{formatFileSize(item.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(item);
                  setDeleteDialogOpen(true);
                }}
                className="absolute top-2 right-2 p-1.5 bg-red-600/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-400 font-medium">File</th>
                <th className="text-left p-4 text-slate-400 font-medium">Type</th>
                <th className="text-left p-4 text-slate-400 font-medium">Size</th>
                <th className="text-left p-4 text-slate-400 font-medium">Date</th>
                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedia.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedMedia(item);
                    setDetailDialogOpen(true);
                  }}
                  className="border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900/50 rounded flex items-center justify-center">
                        {isImage(item.type) ? (
                          <ImageIcon className="w-5 h-5 text-slate-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <span className="text-white">{item.originalName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{item.type}</td>
                  <td className="p-4 text-slate-400">{formatFileSize(item.size)}</td>
                  <td className="p-4 text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMedia(item);
                        setDeleteDialogOpen(true);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Media Details</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="aspect-video bg-slate-900/50 rounded-lg overflow-hidden flex items-center justify-center">
                {isImage(selectedMedia.type) ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.originalName}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <FileText className="w-20 h-20 text-slate-500" />
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">File Name</p>
                  <p className="text-white">{selectedMedia.originalName}</p>
                </div>
                <div>
                  <p className="text-slate-400">Type</p>
                  <p className="text-white">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="text-slate-400">Size</p>
                  <p className="text-white">{formatFileSize(selectedMedia.size)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Uploaded</p>
                  <p className="text-white">
                    {new Date(selectedMedia.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* URL */}
              <div>
                <p className="text-slate-400 text-sm mb-2">URL</p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={selectedMedia.url}
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(selectedMedia.url)}
                    className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDetailDialogOpen(false)}
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDetailDialogOpen(false);
                    setDeleteDialogOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Media</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete &quot;{selectedMedia?.originalName}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
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
