"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Newspaper, 
  Briefcase,
  Image,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasPermission, PERMISSIONS, type Permission } from "@/lib/auth/permissions";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  permission?: Permission;
}

const navItems: NavItem[] = [
  { 
    title: "Dashboard", 
    href: "/admin", 
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  { 
    title: "Content", 
    href: "/admin/content", 
    icon: FileText,
    permission: PERMISSIONS.CONTENT_VIEW,
  },
  { 
    title: "Leads", 
    href: "/admin/leads", 
    icon: MessageSquare,
    permission: PERMISSIONS.LEADS_VIEW,
  },
  { 
    title: "Users", 
    href: "/admin/users", 
    icon: Users,
    permission: PERMISSIONS.USERS_VIEW,
  },
  { 
    title: "Blog", 
    href: "/admin/blog", 
    icon: Newspaper,
    permission: PERMISSIONS.BLOG_VIEW,
  },
  { 
    title: "Careers", 
    href: "/admin/careers", 
    icon: Briefcase,
    permission: PERMISSIONS.CAREERS_VIEW,
  },
  { 
    title: "Media", 
    href: "/admin/media", 
    icon: Image,
    permission: PERMISSIONS.MEDIA_VIEW,
  },
  { 
    title: "Analytics", 
    href: "/admin/analytics", 
    icon: BarChart3,
    permission: PERMISSIONS.ANALYTICS_VIEW,
  },
  { 
    title: "Settings", 
    href: "/admin/settings", 
    icon: Settings,
    permission: PERMISSIONS.SETTINGS_VIEW,
  },
];

interface BrandingSettings {
  logoUrl?: string;
  logoText?: string;
  companyName?: string;
}

interface AdminSidebarProps {
  permissions: string[];
  branding?: BrandingSettings;
}

export function AdminSidebar({ permissions, branding }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear sessionStorage for edited content sections
      try {
        sessionStorage.removeItem("content_edited_sections");
      } catch (error) {
        console.error("Failed to clear sessionStorage:", error);
      }

      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredNavItems = navItems.filter(item => {
    if (!item.permission) return true;
    return hasPermission(permissions, item.permission);
  });

  return (
    <aside 
      className={cn(
        "h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2">
          {branding?.logoUrl ? (
            <img 
              src={branding.logoUrl} 
              alt={branding.logoText || "Admin"} 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling;
                if (fallback) (fallback as HTMLElement).style.display = "block";
              }}
            />
          ) : null}
          <div className={`relative ${branding?.logoUrl ? "hidden" : ""}`}>
            <Brain className="w-8 h-8 text-primary" />
            <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
          </div>
          {!collapsed && (
            <span className="font-bold text-white">{branding?.companyName || "Cognaium"} Admin</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-slate-800">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-slate-400 hover:text-white hover:bg-slate-800",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
