import { Wrench, Clock, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export const metadata = {
  title: "Maintenance Mode",
  description: "We're currently performing maintenance. Please check back soon.",
};

export default async function MaintenancePage() {
  const settings = await getSiteSettings();
  
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-12 h-12 text-primary" />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 font-heading">
          Under Maintenance
        </h1>
        
        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          We&apos;re currently performing scheduled maintenance to improve your experience. 
          We&apos;ll be back online shortly.
        </p>
        
        {/* Status Card */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>Please check back soon</span>
          </div>
        </div>
        
        {/* Contact Info */}
        {settings.company_email && (
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Need urgent assistance?</p>
            <a 
              href={`mailto:${settings.company_email}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              {settings.company_email}
            </a>
          </div>
        )}
        
        {/* Company Name */}
        <p className="mt-12 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {settings.company_name || "Cognaium"}. All rights reserved.
        </p>
      </div>
    </main>
  );
}
