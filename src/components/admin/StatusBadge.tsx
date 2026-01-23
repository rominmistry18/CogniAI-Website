import { cn } from "@/lib/utils";

type StatusType = 
  | "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"  // Lead statuses
  | "draft" | "published" | "archived" | "open" | "closed"  // Blog/Job statuses
  | "reviewing" | "interview" | "offer" | "hired" | "rejected";  // Application statuses

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<StatusType, { bg: string; text: string; label?: string }> = {
  // Lead statuses
  new: { bg: "bg-blue-500/10", text: "text-blue-400", label: "New" },
  contacted: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Contacted" },
  qualified: { bg: "bg-purple-500/10", text: "text-purple-400", label: "Qualified" },
  proposal: { bg: "bg-indigo-500/10", text: "text-indigo-400", label: "Proposal" },
  won: { bg: "bg-green-500/10", text: "text-green-400", label: "Won" },
  lost: { bg: "bg-red-500/10", text: "text-red-400", label: "Lost" },
  
  // Blog/Job statuses
  draft: { bg: "bg-slate-500/10", text: "text-slate-400", label: "Draft" },
  published: { bg: "bg-green-500/10", text: "text-green-400", label: "Published" },
  archived: { bg: "bg-orange-500/10", text: "text-orange-400", label: "Archived" },
  open: { bg: "bg-green-500/10", text: "text-green-400", label: "Open" },
  closed: { bg: "bg-red-500/10", text: "text-red-400", label: "Closed" },
  
  // Application statuses
  reviewing: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Reviewing" },
  interview: { bg: "bg-purple-500/10", text: "text-purple-400", label: "Interview" },
  offer: { bg: "bg-indigo-500/10", text: "text-indigo-400", label: "Offer" },
  hired: { bg: "bg-green-500/10", text: "text-green-400", label: "Hired" },
  rejected: { bg: "bg-red-500/10", text: "text-red-400", label: "Rejected" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status as StatusType] || { 
    bg: "bg-slate-500/10", 
    text: "text-slate-400",
    label: status.charAt(0).toUpperCase() + status.slice(1)
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      {style.label || status}
    </span>
  );
}
