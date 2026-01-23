"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  roleId: string;
  isActive: boolean;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    name: "",
    avatarUrl: null,
    roleId: "viewer",
    isActive: true,
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/admin/users");
        if (response.ok) {
          const data = await response.json();
          const user = data.users.find((u: User) => u.id === userId);
          if (user) {
            setFormData(user);
          } else {
            toast.error("User not found");
            router.push("/admin/users");
          }
        }
      } catch (error) {
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          email: formData.email,
          name: formData.name,
          roleId: formData.roleId,
          isActive: formData.isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to update user");
        return;
      }

      toast.success("User updated successfully");
      router.push("/admin/users");
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

  const initials = formData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/users")}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit User</h1>
          <p className="text-slate-400">Update user details and permissions</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={formData.avatarUrl || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{formData.name}</p>
              <p className="text-sm text-slate-400">{formData.email}</p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="text-slate-300">Full Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-900/50 border-slate-600 text-white"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-slate-300">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-900/50 border-slate-600 text-white"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label className="text-slate-300">Role</Label>
            <Select
              value={formData.roleId}
              onValueChange={(value) => setFormData({ ...formData, roleId: value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              This determines what the user can access and modify.
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Active Status</Label>
              <p className="text-xs text-slate-500">
                Inactive users cannot log in to the admin panel.
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/users")}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
