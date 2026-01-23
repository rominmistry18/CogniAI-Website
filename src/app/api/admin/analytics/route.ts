import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user.permissions, PERMISSIONS.ANALYTICS_VIEW)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Get lead stats
    const totalLeads = await db.lead.count();
    const recentLeads = await db.lead.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });
    const previousLeads = await db.lead.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    });

    // Lead status breakdown
    const leadsByStatusRaw = await db.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // Get blog stats
    const totalPosts = await db.blogPost.count();
    const publishedPosts = await db.blogPost.count({
      where: { status: "published" },
    });

    // Get job stats
    const totalJobs = await db.job.count();
    const openJobs = await db.job.count({
      where: { status: "open" },
    });

    // Get application stats
    const totalApplications = await db.jobApplication.count();
    const recentApplications = await db.jobApplication.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // Application status breakdown
    const applicationsByStatusRaw = await db.jobApplication.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // Get user stats
    const totalUsers = await db.user.count();
    const activeUsers = await db.user.count({
      where: { isActive: true },
    });

    // Recent activity (last 10 audit logs)
    const recentActivityRaw = await db.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    // Transform data
    const leadsByStatus = leadsByStatusRaw.reduce((acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {} as Record<string, number>);

    const applicationsByStatus = applicationsByStatusRaw.reduce((acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {} as Record<string, number>);

    // Calculate lead conversion rate
    const wonLeads = leadsByStatus["won"] || 0;
    const conversionRate = totalLeads > 0 
      ? ((wonLeads / totalLeads) * 100).toFixed(1)
      : "0";

    // Calculate lead growth percentage
    const leadGrowth = previousLeads > 0
      ? (((recentLeads - previousLeads) / previousLeads) * 100).toFixed(1)
      : recentLeads > 0 ? "100" : "0";

    return NextResponse.json({
      overview: {
        leads: {
          total: totalLeads,
          recent: recentLeads,
          growth: parseFloat(leadGrowth),
          conversionRate: parseFloat(conversionRate),
        },
        blog: {
          total: totalPosts,
          published: publishedPosts,
        },
        jobs: {
          total: totalJobs,
          open: openJobs,
        },
        applications: {
          total: totalApplications,
          recent: recentApplications,
        },
        users: {
          total: totalUsers,
          active: activeUsers,
        },
      },
      leadsByStatus,
      applicationsByStatus,
      recentActivity: recentActivityRaw.map(a => ({
        id: a.id,
        user: a.user?.name || "System",
        action: a.action,
        entityType: a.entityType,
        entityId: a.entityId,
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
