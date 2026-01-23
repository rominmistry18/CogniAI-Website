import { requireAuth } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/sonner";
import { getSiteSettings } from "@/lib/settings";

export const metadata = {
  title: "Admin Dashboard | Cognaium",
  description: "Cognaium Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, siteSettings] = await Promise.all([
    requireAuth(),
    getSiteSettings(),
  ]);

  // Extract branding for admin panel
  const branding = {
    logoUrl: siteSettings.admin_logo_url || siteSettings.logo_url || undefined,
    logoText: siteSettings.logo_text || "Cognaium",
    companyName: siteSettings.company_name || "Cognaium",
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar permissions={session.user.permissions} branding={branding} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader user={session.user} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
