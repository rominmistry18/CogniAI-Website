"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable, Column, StatusBadge } from "@/components/admin";
import { 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  UserPlus,
  Mail,
  Phone,
  Building,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  status: string;
  assignedTo: string | null;
  assigneeName: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
      }
    } catch (error) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to update status");
        return;
      }

      toast.success("Status updated");
      fetchLeads();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;

    try {
      const response = await fetch(`/api/admin/leads?id=${selectedLead.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to delete lead");
        return;
      }

      toast.success("Lead deleted");
      setDeleteDialogOpen(false);
      setSelectedLead(null);
      fetchLeads();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredLeads = statusFilter === "all" 
    ? leads 
    : leads.filter(l => l.status === statusFilter);

  const columns: Column<Lead>[] = [
    {
      key: "name",
      header: "Contact",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Mail className="w-3 h-3" />
            <span>{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      cell: (row) => (
        row.company ? (
          <div className="flex items-center gap-2 text-slate-300">
            <Building className="w-4 h-4 text-slate-500" />
            {row.company}
          </div>
        ) : (
          <span className="text-slate-500">—</span>
        )
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Select
          value={row.status}
          onValueChange={(value) => handleStatusChange(row.id, value)}
        >
          <SelectTrigger className="w-32 h-8 bg-transparent border-0 p-0">
            <StatusBadge status={row.status} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {statusOptions.slice(1).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <StatusBadge status={option.value} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "source",
      header: "Source",
      cell: (row) => (
        <span className="text-slate-400 text-sm capitalize">
          {row.source.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      cell: (row) => (
        <span className="text-slate-400 text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (row: Lead) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem 
          onClick={() => router.push(`/admin/leads/${row.id}`)}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </DropdownMenuItem>
        {row.phone && (
          <DropdownMenuItem 
            onClick={() => window.open(`tel:${row.phone}`)}
            className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${row.email}`, '_blank')}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          onClick={() => {
            setSelectedLead(row);
            setDeleteDialogOpen(true);
          }}
          className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-slate-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    qualified: leads.filter(l => l.status === "qualified").length,
    won: leads.filter(l => l.status === "won").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-slate-400">Manage your contact form submissions and leads</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: stats.total, color: "text-white" },
          { label: "New", value: stats.new, color: "text-blue-400" },
          { label: "Qualified", value: stats.qualified, color: "text-purple-400" },
          { label: "Won", value: stats.won, color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredLeads}
        columns={columns}
        searchPlaceholder="Search leads..."
        searchKey="name"
        emptyMessage="No leads found"
        actions={actions}
        onRowClick={(row) => router.push(`/admin/leads/${row.id}`)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Lead</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete the lead from {selectedLead?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteLead}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
