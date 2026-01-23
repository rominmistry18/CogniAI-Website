"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Loader2, 
  Check, 
  Trash2, 
  Users, 
  Briefcase, 
  FileText, 
  Info,
  Filter,
  CheckCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const typeFilters = [
  { value: "all", label: "All Types" },
  { value: "lead", label: "Leads" },
  { value: "application", label: "Applications" },
  { value: "content", label: "Content" },
  { value: "system", label: "System" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const fetchNotifications = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(showUnreadOnly && { unreadOnly: "true" }),
      });

      const response = await fetch(`/api/admin/notifications?${params}`);
      if (response.ok) {
        const data = await response.json();
        
        // Filter by type on client side if needed
        let filtered = data.notifications;
        if (typeFilter !== "all") {
          filtered = filtered.filter((n: Notification) => n.type === typeFilter);
        }
        
        setNotifications(filtered);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }, [typeFilter, showUnreadOnly]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (ids: string[]) => {
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => 
          ids.includes(n.id) ? { ...n, isRead: true } : n
        ));
        setSelectedIds(new Set());
        toast.success("Marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        toast.success("All notifications marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const response = await fetch(`/api/admin/notifications?ids=${ids.join(",")}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(n => !ids.includes(n.id)));
        setSelectedIds(new Set());
        toast.success("Notifications deleted");
      }
    } catch (error) {
      toast.error("Failed to delete notifications");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all notifications?")) return;
    
    try {
      const response = await fetch("/api/admin/notifications?deleteAll=true", {
        method: "DELETE",
      });

      if (response.ok) {
        setNotifications([]);
        toast.success("All notifications deleted");
      }
    } catch (error) {
      toast.error("Failed to delete all notifications");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === notifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(notifications.map(n => n.id)));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <Users className="w-5 h-5 text-blue-400" />;
      case "application":
        return <Briefcase className="w-5 h-5 text-green-400" />;
      case "content":
        return <FileText className="w-5 h-5 text-purple-400" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
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
        return "#";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllAsRead}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                {typeFilters.find(f => f.value === typeFilter)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              {typeFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setTypeFilter(filter.value)}
                  className={`text-slate-300 hover:text-white focus:text-white focus:bg-slate-700 ${
                    typeFilter === filter.value ? "bg-slate-700" : ""
                  }`}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Unread Only Toggle */}
          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={showUnreadOnly 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            }
          >
            <Bell className="w-4 h-4 mr-2" />
            Unread Only
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {selectedIds.size} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkAsRead(Array.from(selectedIds))}
              className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              Mark Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(Array.from(selectedIds))}
              className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/40 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Bell className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          <>
            {/* Select All Header */}
            <div className="flex items-center gap-4 p-4 border-b border-slate-700 bg-slate-900/30">
              <input
                type="checkbox"
                checked={selectedIds.size === notifications.length && notifications.length > 0}
                onChange={selectAll}
                className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-slate-400">Select all</span>
            </div>

            {/* Notification Items */}
            <div className="divide-y divide-slate-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-slate-700/30 transition-colors ${
                    !notification.isRead ? "bg-slate-700/20" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(notification.id)}
                    onChange={() => toggleSelect(notification.id)}
                    className="w-4 h-4 mt-1 rounded border-slate-600 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={getNotificationLink(notification)}
                          onClick={() => {
                            if (!notification.isRead) {
                              handleMarkAsRead([notification.id]);
                            }
                          }}
                          className={`font-medium hover:underline ${
                            notification.isRead ? "text-slate-300" : "text-white"
                          }`}
                        >
                          {notification.title}
                        </Link>
                        <p className="text-sm text-slate-400 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete([notification.id])}
                          className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-slate-700">
                <p className="text-sm text-slate-400">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page <= 1}
                    onClick={() => fetchNotifications(pagination.page - 1)}
                    className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchNotifications(pagination.page + 1)}
                    className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Danger Zone */}
      {notifications.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
          <p className="text-slate-400 text-sm mb-4">
            Permanently delete all notifications. This action cannot be undone.
          </p>
          <Button
            variant="outline"
            onClick={handleDeleteAll}
            className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/40 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All Notifications
          </Button>
        </div>
      )}
    </div>
  );
}
