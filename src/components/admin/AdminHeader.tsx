"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell, Search, ChevronDown, Check, ExternalLink, Users, Briefcase, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { WEBSITE_BASE_URL } from "@/lib/config/app";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  entityType: string | null;
  entityId: string | null;
  isRead: boolean;
  createdAt: string;
}

interface AdminHeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string | null;
    roleName: string;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/notifications?limit=5");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <Users className="w-4 h-4 text-blue-400" />;
      case "application":
        return <Briefcase className="w-4 h-4 text-green-400" />;
      case "content":
        return <FileText className="w-4 h-4 text-purple-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNotificationLink = (notification: Notification): string => {
    switch (notification.entityType) {
      case "lead":
        return "/admin/leads";
      case "job_application":
        return "/admin/careers";
      case "content":
        return "/admin/content";
      default:
        return "/admin/notifications";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Get role-specific color styling
  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      super_admin: "text-amber-400",
      admin: "text-purple-400",
      editor: "text-blue-400",
      viewer: "text-slate-400",
    };
    return roleColors[role.toLowerCase()] || "text-slate-400";
  };

  const getRoleBadgeColor = (role: string) => {
    const badgeColors: Record<string, string> = {
      super_admin: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      editor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      viewer: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };
    return badgeColors[role.toLowerCase()] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

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

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pl-10 w-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-800 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            align="end" 
            className="w-80 p-0 bg-slate-800 border-slate-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary hover:text-primary/80 hover:bg-slate-700 h-auto py-1 px-2"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notification List */}
            <ScrollArea className="h-[300px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-slate-400">
                  <Bell className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={getNotificationLink(notification)}
                      onClick={() => {
                        if (!notification.isRead) {
                          handleMarkAsRead(notification.id);
                        }
                        setIsNotificationOpen(false);
                      }}
                      className={`flex gap-3 p-4 hover:bg-slate-700/50 transition-colors ${
                        !notification.isRead ? "bg-slate-700/30" : ""
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium truncate ${
                            notification.isRead ? "text-slate-300" : "text-white"
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <span className="flex-shrink-0 w-2 h-2 mt-1.5 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700">
              <Link
                href="/admin/notifications"
                onClick={() => setIsNotificationOpen(false)}
                className="flex items-center justify-center gap-2 text-sm text-white hover:text-primary transition-colors"
              >
                View all notifications
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-medium rounded-full border capitalize ${getRoleBadgeColor(user.roleName)}`}>
                  {user.roleName.replace("_", " ")}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
            <DropdownMenuLabel className="text-white">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-300 font-normal">{user.email}</p>
              <span className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${getRoleBadgeColor(user.roleName)}`}>
                {user.roleName.replace("_", " ")}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem asChild className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700">
              <Link href="/admin/settings/profile">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700">
              <a href={WEBSITE_BASE_URL} target="_blank" rel="noopener noreferrer">View Website</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-slate-700"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
