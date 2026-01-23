"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin";
import { 
  MessageSquare, 
  Newspaper, 
  Briefcase, 
  Users,
  TrendingUp,
  PieChart,
  Clock,
  Activity
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface Analytics {
  overview: {
    leads: {
      total: number;
      recent: number;
      growth: number;
      conversionRate: number;
    };
    blog: {
      total: number;
      published: number;
    };
    jobs: {
      total: number;
      open: number;
    };
    applications: {
      total: number;
      recent: number;
    };
    users: {
      total: number;
      active: number;
    };
  };
  leadsByStatus: Record<string, number>;
  applicationsByStatus: Record<string, number>;
  recentActivity: {
    id: string;
    user: string;
    action: string;
    entityType: string;
    entityId: string | null;
    createdAt: string;
  }[];
}

const LEAD_STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6",
  contacted: "#F59E0B",
  qualified: "#8B5CF6",
  proposal: "#6366F1",
  won: "#10B981",
  lost: "#EF4444",
};

const APP_STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6",
  reviewing: "#F59E0B",
  interview: "#8B5CF6",
  offer: "#6366F1",
  hired: "#10B981",
  rejected: "#EF4444",
};

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/admin/analytics");
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        toast.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const leadStatusData = Object.entries(analytics.leadsByStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: LEAD_STATUS_COLORS[status] || "#64748B",
  }));

  const applicationStatusData = Object.entries(analytics.applicationsByStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: APP_STATUS_COLORS[status] || "#64748B",
  }));

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
      job: "job posting",
      job_application: "application",
      content: "content",
      media: "media",
      session: "",
    };
    
    const actionText = actionMap[action] || action;
    const entityText = entityMap[entityType] || entityType;
    
    return entityText ? `${actionText} ${entityText}` : actionText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400">Overview of your platform metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={analytics.overview.leads.total}
          change={{ 
            value: analytics.overview.leads.growth, 
            label: "vs last month" 
          }}
          icon={MessageSquare}
          iconColor="text-blue-400"
          iconBgColor="bg-blue-400/10"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${analytics.overview.leads.conversionRate}%`}
          icon={TrendingUp}
          iconColor="text-green-400"
          iconBgColor="bg-green-400/10"
        />
        <StatsCard
          title="Applications"
          value={analytics.overview.applications.total}
          change={{ 
            value: analytics.overview.applications.recent, 
            label: "this month" 
          }}
          icon={Briefcase}
          iconColor="text-orange-400"
          iconBgColor="bg-orange-400/10"
        />
        <StatsCard
          title="Team Members"
          value={analytics.overview.users.active}
          icon={Users}
          iconColor="text-purple-400"
          iconBgColor="bg-purple-400/10"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Leads by Status</h2>
          </div>
          {leadStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={leadStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leadStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#94A3B8" }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: "#94A3B8" }}>{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-500">
              No lead data available
            </div>
          )}
        </div>

        {/* Application Status Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Applications by Status</h2>
          </div>
          {applicationStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: "#94A3B8" }}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis 
                  tick={{ fill: "#94A3B8" }}
                  axisLine={{ stroke: "#334155" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#94A3B8" }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-500">
              No application data available
            </div>
          )}
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Newspaper className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{analytics.overview.blog.total}</span>
          </div>
          <h3 className="text-slate-400">Total Blog Posts</h3>
          <p className="text-sm text-slate-500 mt-1">
            {analytics.overview.blog.published} published
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="w-8 h-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">{analytics.overview.jobs.total}</span>
          </div>
          <h3 className="text-slate-400">Job Postings</h3>
          <p className="text-sm text-slate-500 mt-1">
            {analytics.overview.jobs.open} currently open
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{analytics.overview.leads.recent}</span>
          </div>
          <h3 className="text-slate-400">New Leads (30 days)</h3>
          <p className="text-sm text-slate-500 mt-1">
            {analytics.overview.leads.total} total leads
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        {analytics.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {analytics.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-slate-400">
                      {formatAction(activity.action, activity.entityType)}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
}
