"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function NewJobPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: "",
    salary: "",
    status: "draft",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (status: string) => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to create job");
        return;
      }

      toast.success(status === "open" ? "Job posted!" : "Draft saved");
      router.push("/admin/careers");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/careers")}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">New Job Posting</h1>
            <p className="text-slate-400">Create a new job listing</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={saving || !formData.title}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit("open")}
            disabled={saving || !formData.title || !formData.description}
            className="bg-primary hover:bg-primary/90"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Job Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  title: e.target.value,
                  slug: formData.slug || generateSlug(e.target.value),
                })}
                placeholder="e.g., Senior Software Engineer"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">URL Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                placeholder="senior-software-engineer"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Department</Label>
              <Input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g., Engineering"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Remote, San Francisco, CA"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Employment Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Salary Range (Optional)</Label>
              <Input
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g., $120k - $180k"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Job Details</h2>
          
          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what the ideal candidate looks like..."
              className="bg-slate-900/50 border-slate-600 text-white min-h-[200px]"
            />
            <p className="text-xs text-slate-500">Supports Markdown formatting</p>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Requirements</Label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="List the required qualifications, skills, and experience..."
              className="bg-slate-900/50 border-slate-600 text-white min-h-[150px]"
            />
            <p className="text-xs text-slate-500">Supports Markdown formatting</p>
          </div>
        </div>
      </div>
    </div>
  );
}
