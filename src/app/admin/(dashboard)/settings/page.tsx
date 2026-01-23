"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Loader2, 
  Globe, 
  Search as SearchIcon,
  Bell,
  Mail,
  Palette,
  Shield,
  ImageIcon,
  ExternalLink
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";

interface Settings {
  [key: string]: {
    value: unknown;
    description?: string;
  };
}

// Default settings configuration
const defaultSettings = {
  // Branding Settings
  logo_url: { value: "", description: "Logo image URL (leave empty for default SVG)" },
  logo_text: { value: "Cognaium", description: "Logo text displayed next to the logo" },
  logo_tagline: { value: "by MedinovAI", description: "Tagline displayed below the logo text" },
  favicon_url: { value: "", description: "Favicon URL (must be .ico, .png, or .svg)" },
  admin_logo_url: { value: "", description: "Admin panel logo URL" },

  // SEO Settings
  site_title: { value: "Cognaium - AI-Powered Talent Management", description: "Main website title" },
  site_description: { value: "Transform your workforce with AI-powered skills mapping and talent management.", description: "Meta description" },
  site_keywords: { value: "AI, talent management, skills mapping, HR tech", description: "Meta keywords" },
  og_image: { value: "", description: "Default Open Graph image URL (1200x630px recommended)" },

  // Company Info
  company_name: { value: "Cognaium", description: "Company name" },
  company_email: { value: "hello@cognaium.com", description: "Main contact email" },
  company_phone: { value: "", description: "Contact phone number" },
  company_address: { value: "", description: "Company address" },

  // Social Links
  social_linkedin: { value: "", description: "LinkedIn URL" },
  social_twitter: { value: "", description: "Twitter/X URL" },
  social_github: { value: "", description: "GitHub URL" },

  // Features
  enable_blog: { value: true, description: "Enable blog section" },
  enable_careers: { value: true, description: "Enable careers section" },
  enable_contact_form: { value: true, description: "Enable contact form" },
  maintenance_mode: { value: false, description: "Put site in maintenance mode" },

  // Notifications
  notify_new_leads: { value: true, description: "Email notification for new leads" },
  notify_new_applications: { value: true, description: "Email notification for job applications" },
  notification_email: { value: "", description: "Email address for notifications" },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const data = await response.json();
          
          // Merge fetched settings with defaults
          const merged: Settings = {};
          for (const [key, defaultValue] of Object.entries(defaultSettings)) {
            const fetched = data.settings.find((s: { key: string }) => s.key === key);
            merged[key] = fetched 
              ? { value: fetched.value, description: defaultValue.description }
              : defaultValue;
          }
          setSettings(merged);
        }
      } catch (error) {
        toast.error("Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const updateSetting = (key: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const saveSetting = async (key: string) => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value: settings[key].value,
          description: settings[key].description,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to save setting");
        return;
      }

      toast.success("Setting saved");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const saveAllSettings = async () => {
    setSaving(true);
    try {
      for (const [key, setting] of Object.entries(settings)) {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
            value: setting.value,
            description: setting.description,
          }),
        });
      }
      toast.success("All settings saved");
    } catch (error) {
      toast.error("Failed to save some settings");
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
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">Manage your website configuration</p>
        </div>
        <Button
          onClick={saveAllSettings}
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
              Save All
            </>
          )}
        </Button>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Link
          href="/admin/settings/audit"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <Shield className="w-4 h-4" />
          View Audit Log
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger 
            value="branding" 
            className="!text-white data-[state=active]:bg-primary data-[state=active]:!text-white"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger 
            value="seo" 
            className="!text-white data-[state=active]:bg-primary data-[state=active]:!text-white"
          >
            <SearchIcon className="w-4 h-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger 
            value="company"
            className="!text-white data-[state=active]:bg-primary data-[state=active]:!text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger 
            value="features"
            className="!text-white data-[state=active]:bg-primary data-[state=active]:!text-white"
          >
            <Palette className="w-4 h-4 mr-2" />
            Features
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="!text-white data-[state=active]:bg-primary data-[state=active]:!text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Branding Settings */}
        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logo Settings */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Logo Settings</h2>
              
              <div className="space-y-2">
                <Label className="text-slate-300">Logo Image URL</Label>
                <Input
                  value={settings.logo_url?.value as string || ""}
                  onChange={(e) => updateSetting("logo_url", e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500">
                  Leave empty to use default SVG logo. Recommended: PNG or SVG, 200x50px
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Logo Text</Label>
                <Input
                  value={settings.logo_text?.value as string || "Cognaium"}
                  onChange={(e) => updateSetting("logo_text", e.target.value)}
                  placeholder="Cognaium"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Logo Tagline</Label>
                <Input
                  value={settings.logo_tagline?.value as string || "by MedinovAI"}
                  onChange={(e) => updateSetting("logo_tagline", e.target.value)}
                  placeholder="by MedinovAI"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Logo Preview */}
              <div className="pt-4 border-t border-slate-700">
                <Label className="text-slate-300 mb-3 block">Preview</Label>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <div className="flex items-center gap-2">
                    {settings.logo_url?.value ? (
                      <img 
                        src={settings.logo_url.value as string} 
                        alt="Logo preview" 
                        className="h-10 w-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                      >
                        <defs>
                          <linearGradient id="logo-gradient-preview" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#002F6C" />
                            <stop offset="50%" stopColor="#007ACC" />
                            <stop offset="100%" stopColor="#00C9D1" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M75 25C65 15 50 10 35 15C20 20 10 35 10 50C10 65 20 80 35 85C50 90 65 85 75 75L65 65C60 70 50 75 40 70C30 65 25 55 25 50C25 45 30 35 40 30C50 25 60 30 65 35L75 25Z"
                          fill="url(#logo-gradient-preview)"
                        />
                      </svg>
                    )}
                    <div className="flex flex-col leading-none">
                      <span className="text-xl font-bold tracking-tight text-[#002F6C]">
                        {(settings.logo_text?.value as string) || "Cognaium"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#007ACC] uppercase tracking-wider">
                        {(settings.logo_tagline?.value as string) || "by MedinovAI"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favicon & OG Image Settings */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Favicon & Social Image</h2>
              
              <div className="space-y-2">
                <Label className="text-slate-300">Favicon URL</Label>
                <Input
                  value={settings.favicon_url?.value as string || ""}
                  onChange={(e) => updateSetting("favicon_url", e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500">
                  Browser tab icon. Recommended: .ico, .png, or .svg, 32x32px
                </p>
                {settings.favicon_url?.value && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-400">Preview:</span>
                    <img 
                      src={settings.favicon_url.value as string} 
                      alt="Favicon preview" 
                      className="w-6 h-6"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">OG Image URL (Social Sharing)</Label>
                <Input
                  value={settings.og_image?.value as string || ""}
                  onChange={(e) => updateSetting("og_image", e.target.value)}
                  placeholder="https://example.com/og-image.png"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500">
                  Image shown when sharing on social media. Recommended: 1200x630px PNG or JPG
                </p>
                {settings.og_image?.value && (
                  <div className="mt-2">
                    <span className="text-xs text-slate-400 block mb-2">Preview:</span>
                    <img 
                      src={settings.og_image.value as string} 
                      alt="OG image preview" 
                      className="w-full max-w-xs rounded-lg border border-slate-600"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Admin Panel Logo URL</Label>
                <Input
                  value={settings.admin_logo_url?.value as string || ""}
                  onChange={(e) => updateSetting("admin_logo_url", e.target.value)}
                  placeholder="https://example.com/admin-logo.png"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500">
                  Custom logo for admin panel sidebar. Leave empty to use default.
                </p>
              </div>
            </div>
          </div>

          {/* Helpful Tips */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Tips for Branding Assets
            </h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• <strong>Logo:</strong> Use a transparent PNG or SVG for best results</li>
              <li>• <strong>Favicon:</strong> Upload a 32x32 or 48x48 pixel .ico or .png file</li>
              <li>• <strong>OG Image:</strong> Create a 1200x630px image for optimal social sharing</li>
              <li>• <strong>Hosting:</strong> Upload images to the Media library or use an external CDN</li>
            </ul>
          </div>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Site Title</Label>
              <Input
                value={settings.site_title?.value as string || ""}
                onChange={(e) => updateSetting("site_title", e.target.value)}
                placeholder="Your Website Title"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Meta Description</Label>
              <Textarea
                value={settings.site_description?.value as string || ""}
                onChange={(e) => updateSetting("site_description", e.target.value)}
                placeholder="Brief description of your website"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                rows={3}
              />
              <p className="text-xs text-slate-500">
                Recommended: 150-160 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Keywords</Label>
              <Input
                value={settings.site_keywords?.value as string || ""}
                onChange={(e) => updateSetting("site_keywords", e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Company Name</Label>
                <Input
                  value={settings.company_name?.value as string || ""}
                  onChange={(e) => updateSetting("company_name", e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Contact Email</Label>
                <Input
                  type="email"
                  value={settings.company_email?.value as string || ""}
                  onChange={(e) => updateSetting("company_email", e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Phone Number</Label>
                <Input
                  value={settings.company_phone?.value as string || ""}
                  onChange={(e) => updateSetting("company_phone", e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Address</Label>
                <Input
                  value={settings.company_address?.value as string || ""}
                  onChange={(e) => updateSetting("company_address", e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Social Links</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">LinkedIn</Label>
                <Input
                  value={settings.social_linkedin?.value as string || ""}
                  onChange={(e) => updateSetting("social_linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Twitter/X</Label>
                <Input
                  value={settings.social_twitter?.value as string || ""}
                  onChange={(e) => updateSetting("social_twitter", e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">GitHub</Label>
                <Input
                  value={settings.social_github?.value as string || ""}
                  onChange={(e) => updateSetting("social_github", e.target.value)}
                  placeholder="https://github.com/..."
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Features Settings */}
        <TabsContent value="features" className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Feature Toggles</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Blog Section</p>
                  <p className="text-sm text-slate-500">Enable the blog on your website</p>
                </div>
                <Switch
                  checked={settings.enable_blog?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("enable_blog", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Careers Section</p>
                  <p className="text-sm text-slate-500">Enable job postings on your website</p>
                </div>
                <Switch
                  checked={settings.enable_careers?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("enable_careers", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Contact Form</p>
                  <p className="text-sm text-slate-500">Allow visitors to submit contact requests</p>
                </div>
                <Switch
                  checked={settings.enable_contact_form?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("enable_contact_form", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                <div>
                  <p className="font-medium text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    Maintenance Mode
                  </p>
                  <p className="text-sm text-slate-500">Show maintenance page to visitors</p>
                </div>
                <Switch
                  checked={settings.maintenance_mode?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("maintenance_mode", checked)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Email Notifications</h2>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Notification Email</Label>
              <Input
                type="email"
                value={settings.notification_email?.value as string || ""}
                onChange={(e) => updateSetting("notification_email", e.target.value)}
                placeholder="notifications@company.com"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500">
                This email will receive all notifications
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">New Lead Notifications</p>
                  <p className="text-sm text-slate-500">Get notified when someone submits a contact form</p>
                </div>
                <Switch
                  checked={settings.notify_new_leads?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("notify_new_leads", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">Job Application Notifications</p>
                  <p className="text-sm text-slate-500">Get notified when someone applies for a job</p>
                </div>
                <Switch
                  checked={settings.notify_new_applications?.value as boolean}
                  onCheckedChange={(checked) => updateSetting("notify_new_applications", checked)}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
