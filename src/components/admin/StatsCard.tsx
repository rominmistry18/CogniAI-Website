import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: StatsCardProps) {
  const isPositive = change && change.value >= 0;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              isPositive ? "text-green-400" : "text-red-400"
            )}>
              <span>{isPositive ? "+" : ""}{change.value}%</span>
              <span className="text-slate-500">{change.label}</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", iconBgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
