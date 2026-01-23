import { requireAuth } from "@/lib/auth/session";
import { StatsCard } from "@/components/admin";
import { db } from "@/db";
import { 
  Users, 
  MessageSquare, 
  Newspaper, 
  Briefcase,
  TrendingUp,
  Eye,
  FileText,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Fetch real stats from database
async function getDashboardStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Get lead stats
  const totalLeads = await db.lead.count();
  const recentLeads = await db.lead.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  });
  const previousLeads = await db.lead.count({
    where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
  });
  const leadsChange = previousLeads > 0 
    ? Math.round(((recentLeads - previousLeads) / previousLeads) * 100)
    : recentLeads > 0 ? 100 : 0;

  // Get user stats
  const totalUsers = await db.user.count();

  // Get blog stats
  const totalPosts = await db.blogPost.count();
  const recentPosts = await db.blogPost.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  });
  const previousPosts = await db.blogPost.count({
    where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
  });
  const postsChange = previousPosts > 0 
    ? Math.round(((recentPosts - previousPosts) / previousPosts) * 100)
    : recentPosts > 0 ? 100 : 0;

  // Get job stats
  const openJobs = await db.job.count({
    where: { status: "open" },
  });
  const recentJobs = await db.job.count({
    where: { status: "open", createdAt: { gte: thirtyDaysAgo } },
  });
  const previousJobs = await db.job.count({
    where: { status: "open", createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
  });
  const jobsChange = previousJobs > 0 
    ? Math.round(((recentJobs - previousJobs) / previousJobs) * 100)
    : recentJobs > 0 ? 100 : 0;

  return {
    totalLeads,
    leadsChange,
    totalUsers,
    blogPosts: totalPosts,
    postsChange,
    openJobs,
    jobsChange,
  };
}

// Fetch recent activity from audit logs
async function getRecentActivity() {
  const recentLogs = await db.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return recentLogs.map((log) => {
    // Determine the activity details based on entity type and action
    let action = "";
    let detail = "";
    let icon = "FileText";
    let color = "text-green-400";

    switch (log.entityType) {
      case "lead":
        icon = "MessageSquare";
        color = "text-blue-400";
        action = log.action === "create" ? "New lead submitted" : `Lead ${log.action}d`;
        try {
          const data = log.newValue ? JSON.parse(log.newValue) : {};
          detail = data.name || data.company || `Lead #${log.entityId.slice(0, 8)}`;
        } catch {
          detail = `Lead #${log.entityId.slice(0, 8)}`;
        }
        break;
      case "blog_post":
        icon = "Newspaper";
        color = "text-purple-400";
        action = log.action === "create" ? "Blog post created" : 
                 log.action === "update" ? "Blog post updated" : "Blog post deleted";
        try {
          const data = log.newValue ? JSON.parse(log.newValue) : log.oldValue ? JSON.parse(log.oldValue) : {};
          detail = data.title || `Post #${log.entityId.slice(0, 8)}`;
        } catch {
          detail = `Post #${log.entityId.slice(0, 8)}`;
        }
        break;
      case "job":
        icon = "Briefcase";
        color = "text-orange-400";
        action = log.action === "create" ? "New job posted" : `Job ${log.action}d`;
        try {
          const data = log.newValue ? JSON.parse(log.newValue) : log.oldValue ? JSON.parse(log.oldValue) : {};
          detail = data.title || `Job #${log.entityId.slice(0, 8)}`;
        } catch {
          detail = `Job #${log.entityId.slice(0, 8)}`;
        }
        break;
      case "content":
        icon = "FileText";
        color = "text-green-400";
        action = log.action === "create" ? "Content created" : "Content updated";
        detail = `${log.entityId} section`;
        break;
      case "setting":
        icon = "FileText";
        color = "text-cyan-400";
        action = "Settings updated";
        detail = log.entityId;
        break;
      default:
        action = `${log.entityType} ${log.action}d`;
        detail = log.entityId.slice(0, 8);
    }

    // Calculate relative time
    const now = new Date();
    const logTime = new Date(log.createdAt);
    const diffMs = now.getTime() - logTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let time = "";
    if (diffMins < 1) time = "Just now";
    else if (diffMins < 60) time = `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    else if (diffHours < 24) time = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    else if (diffDays === 1) time = "Yesterday";
    else time = `${diffDays} days ago`;

    return { action, detail, time, icon, color };
  });
}

export default async function AdminDashboard() {
  const session = await requireAuth();

  // Fetch real stats from database
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {session.user.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white" asChild>
            <Link href="/admin/blog/new">
              <Newspaper className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/admin/leads">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Leads
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads}
          change={{ value: stats.leadsChange, label: "vs last month" }}
          icon={MessageSquare}
          iconColor="text-blue-400"
          iconBgColor="bg-blue-400/10"
        />
        <StatsCard
          title="Team Members"
          value={stats.totalUsers}
          icon={Users}
          iconColor="text-green-400"
          iconBgColor="bg-green-400/10"
        />
        <StatsCard
          title="Blog Posts"
          value={stats.blogPosts}
          change={{ value: stats.postsChange, label: "vs last month" }}
          icon={Newspaper}
          iconColor="text-purple-400"
          iconBgColor="bg-purple-400/10"
        />
        <StatsCard
          title="Open Positions"
          value={stats.openJobs}
          change={{ value: stats.jobsChange, label: "vs last month" }}
          icon={Briefcase}
          iconColor="text-orange-400"
          iconBgColor="bg-orange-400/10"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/admin/content"
              className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-primary transition-colors group"
            >
              <div className="p-2 bg-blue-400/10 rounded-lg group-hover:bg-blue-400/20 transition-colors">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">Edit Content</p>
                <p className="text-xs text-slate-500">Update pages</p>
              </div>
            </Link>
            <Link 
              href="/admin/leads"
              className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-primary transition-colors group"
            >
              <div className="p-2 bg-green-400/10 rounded-lg group-hover:bg-green-400/20 transition-colors">
                <MessageSquare className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">View Leads</p>
                <p className="text-xs text-slate-500">Manage inquiries</p>
              </div>
            </Link>
            <Link 
              href="/admin/blog/new"
              className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-primary transition-colors group"
            >
              <div className="p-2 bg-purple-400/10 rounded-lg group-hover:bg-purple-400/20 transition-colors">
                <Newspaper className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">Write Post</p>
                <p className="text-xs text-slate-500">Create blog post</p>
              </div>
            </Link>
            <Link 
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-primary transition-colors group"
            >
              <div className="p-2 bg-orange-400/10 rounded-lg group-hover:bg-orange-400/20 transition-colors">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-white">Analytics</p>
                <p className="text-xs text-slate-500">View metrics</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivitySection />
      </div>

      {/* Page Views Chart Placeholder */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Page Views</h2>
            <p className="text-sm text-slate-400">Last 30 days</p>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-400">Analytics integration coming soon</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-500">Connect Google Analytics or Plausible to see page views</p>
        </div>
      </div>
    </div>
  );
}

// Icon mapping for dynamic icons
const iconComponents: Record<string, React.ElementType> = {
  MessageSquare,
  Newspaper,
  Briefcase,
  FileText,
  Users,
};

// Recent Activity Section Component
async function RecentActivitySection() {
  const activities = await getRecentActivity();

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const IconComponent = iconComponents[activity.icon] || FileText;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-slate-900/50 rounded-lg">
                  <IconComponent className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.detail}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500">No recent activity</p>
          </div>
        )}
      </div>
      <Link href="/admin/settings/audit">
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          View all activity
        </Button>
      </Link>
    </div>
  );
}
