"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft,
  Activity, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface AuditLog {
  id: string;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const actionColors: Record<string, string> = {
  create: "bg-green-500/10 text-green-400",
  update: "bg-blue-500/10 text-blue-400",
  delete: "bg-red-500/10 text-red-400",
  login: "bg-purple-500/10 text-purple-400",
  logout: "bg-slate-500/10 text-slate-400",
};

const entityTypes = [
  { value: "all", label: "All Types" },
  { value: "user", label: "Users" },
  { value: "lead", label: "Leads" },
  { value: "blog_post", label: "Blog Posts" },
  { value: "job", label: "Jobs" },
  { value: "job_application", label: "Applications" },
  { value: "content", label: "Content" },
  { value: "media", label: "Media" },
  { value: "setting", label: "Settings" },
  { value: "session", label: "Sessions" },
];

const actions = [
  { value: "all", label: "All Actions" },
  { value: "create", label: "Create" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
  { value: "login", label: "Login" },
  { value: "logout", label: "Logout" },
];

export default function AuditLogPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [entityTypeFilter, setEntityTypeFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const fetchLogs = async (page = 1) => {
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50" });
      if (entityTypeFilter !== "all") params.append("entityType", entityTypeFilter);
      if (actionFilter !== "all") params.append("action", actionFilter);

      const response = await fetch(`/api/admin/audit?${params}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error("Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [entityTypeFilter, actionFilter]);

  const formatAction = (action: string, entityType: string) => {
    const actionMap: Record<string, string> = {
      create: "Created",
      update: "Updated",
      delete: "Deleted",
      login: "Logged in",
      logout: "Logged out",
    };
    const entityMap: Record<string, string> = {
      user: "user",
      lead: "lead",
      blog_post: "blog post",
      job: "job",
      job_application: "application",
      content: "content",
      media: "media file",
      setting: "setting",
      session: "",
    };
    
    const actionText = actionMap[action] || action;
    const entityText = entityMap[entityType] || entityType;
    
    return entityText ? `${actionText} ${entityText}` : actionText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/settings")}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
          <p className="text-slate-400">Track all changes made in the admin panel</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {entityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {actions.map((action) => (
              <SelectItem key={action.value} value={action.value}>
                {action.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logs */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No audit logs found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 hover:bg-slate-700/50 cursor-pointer"
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white">
                        {log.userName || "System"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action] || "bg-slate-500/10 text-slate-400"}`}>
                        {formatAction(log.action, log.entityType)}
                      </span>
                      {log.entityId && (
                        <span className="text-xs text-slate-500 font-mono">
                          {log.entityId.slice(0, 8)}...
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                      {log.userEmail && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.userEmail}
                        </span>
                      )}
                      {log.ipAddress && (
                        <span className="hidden sm:inline">{log.ipAddress}</span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {expandedLog === log.id && (log.oldValue || log.newValue) && (
                      <div className="mt-4 p-4 bg-slate-900/50 rounded-lg space-y-3">
                        {log.oldValue && Object.keys(log.oldValue).length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-1">Previous Value:</p>
                            <pre className="text-xs text-slate-300 overflow-x-auto">
                              {JSON.stringify(log.oldValue, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.newValue && Object.keys(log.newValue).length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-1">New Value:</p>
                            <pre className="text-xs text-slate-300 overflow-x-auto">
                              {JSON.stringify(log.newValue, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchLogs(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-slate-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchLogs(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
