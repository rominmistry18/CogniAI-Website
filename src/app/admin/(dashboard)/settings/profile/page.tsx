"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  Shield,
  Calendar,
  Globe,
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Profile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  roleId: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: {
    at: string;
    ipAddress: string | null;
  } | null;
}

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/admin/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
          setName(data.profile.name);
          setEmail(data.profile.email);
          setAvatarUrl(data.profile.avatarUrl || "");
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
          avatarUrl: avatarUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to update profile");
        return;
      }

      if (data.user) {
        setProfile(prev => prev ? { ...prev, ...data.user } : null);
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to change password");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSavingPassword(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role-specific badge styling
  const getRoleBadgeColor = (role: string) => {
    const badgeColors: Record<string, string> = {
      super_admin: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
      admin: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
      editor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      viewer: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
    };
    return badgeColors[role.toLowerCase().replace(" ", "_")] || "bg-slate-500/20 text-slate-400 border border-slate-500/30";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information</p>
        </div>
      </div>

      {/* Top Row - Profile Overview + Account Info (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Overview Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Profile Overview</h2>
          </div>
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarUrl || undefined} alt={name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
              <p className="text-slate-300">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(profile.roleName)}`}>
                  {profile.roleName.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Account Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calendar className="w-3 h-3" />
                Account Created
              </div>
              <p className="text-white text-sm">
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Shield className="w-3 h-3" />
                Role
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(profile.roleName)}`}>
                {profile.roleName.replace("_", " ")}
              </span>
            </div>
            {profile.lastLogin && (
              <>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Calendar className="w-3 h-3" />
                    Last Login
                  </div>
                  <p className="text-white text-sm">
                    {new Date(profile.lastLogin.at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {profile.lastLogin.ipAddress && (
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                      <Globe className="w-3 h-3" />
                      Login IP
                    </div>
                    <p className="text-white text-sm font-mono">{profile.lastLogin.ipAddress}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row - Edit Profile + Change Password (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Edit Profile Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Avatar URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {savingProfile ? (
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
        </div>

        {/* Change Password Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Min 8 chars with uppercase, lowercase & number
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
              variant="outline"
              className="w-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
            >
              {savingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
