"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable, Column, StatusBadge } from "@/components/admin";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users,
  Filter,
  MapPin,
  Briefcase
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

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  status: string;
  createdAt: string;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

export default function CareersPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/careers");
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs);
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    try {
      const response = await fetch(`/api/admin/careers?id=${selectedJob.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to delete job");
        return;
      }

      toast.success("Job deleted");
      setDeleteDialogOpen(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredJobs = statusFilter === "all" 
    ? jobs 
    : jobs.filter(j => j.status === statusFilter);

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Position",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.title}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {row.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {row.location}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (row) => (
        <span className="text-slate-300 capitalize">{row.type.replace("-", " ")}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      header: "Posted",
      sortable: true,
      cell: (row) => (
        <span className="text-slate-400 text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (row: Job) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem 
          onClick={() => router.push(`/admin/careers/${row.id}/edit`)}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push(`/admin/careers/applications?jobId=${row.id}`)}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Users className="w-4 h-4 mr-2" />
          View Applications
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          onClick={() => {
            setSelectedJob(row);
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
    total: jobs.length,
    open: jobs.filter(j => j.status === "open").length,
    draft: jobs.filter(j => j.status === "draft").length,
    closed: jobs.filter(j => j.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers</h1>
          <p className="text-slate-400">Manage job postings and applications</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/careers/applications")}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Applications
          </Button>
          <Button 
            onClick={() => router.push("/admin/careers/new")} 
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Jobs", value: stats.total, color: "text-white" },
          { label: "Open", value: stats.open, color: "text-green-400" },
          { label: "Draft", value: stats.draft, color: "text-slate-400" },
          { label: "Closed", value: stats.closed, color: "text-red-400" },
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
        data={filteredJobs}
        columns={columns}
        searchPlaceholder="Search jobs..."
        searchKey="title"
        emptyMessage="No job postings found"
        actions={actions}
        onRowClick={(row) => router.push(`/admin/careers/${row.id}/edit`)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Job</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete &quot;{selectedJob?.title}&quot;? This will also delete all applications for this position.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteJob}
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
