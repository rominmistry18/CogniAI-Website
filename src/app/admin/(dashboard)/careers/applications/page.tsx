"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable, Column, StatusBadge } from "@/components/admin";
import { 
  ArrowLeft,
  MoreHorizontal, 
  Eye,
  Mail,
  ExternalLink,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string | null;
  name: string;
  email: string;
  phone: string | null;
  resumeUrl: string | null;
  coverLetter: string | null;
  linkedinUrl: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobIdFilter = searchParams.get("jobId");

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const url = jobIdFilter 
        ? `/api/admin/applications?jobId=${jobIdFilter}`
        : "/api/admin/applications";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      }
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobIdFilter]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus }),
      });

      if (!response.ok) {
        toast.error("Failed to update status");
        return;
      }

      toast.success("Status updated");
      fetchApplications();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleNotesUpdate = async (notes: string) => {
    if (!selectedApp) return;

    try {
      const response = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedApp.id, notes }),
      });

      if (!response.ok) {
        toast.error("Failed to update notes");
        return;
      }

      toast.success("Notes updated");
      fetchApplications();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredApps = statusFilter === "all" 
    ? applications 
    : applications.filter(a => a.status === statusFilter);

  const columns: Column<Application>[] = [
    {
      key: "name",
      header: "Applicant",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: "jobTitle",
      header: "Position",
      cell: (row) => (
        <span className="text-slate-300">{row.jobTitle || "Unknown"}</span>
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
      key: "createdAt",
      header: "Applied",
      sortable: true,
      cell: (row) => (
        <span className="text-slate-400 text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (row: Application) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem 
          onClick={() => {
            setSelectedApp(row);
            setDetailOpen(true);
          }}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${row.email}`, '_blank')}
          className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </DropdownMenuItem>
        {row.resumeUrl && (
          <DropdownMenuItem 
            onClick={() => window.open(row.resumeUrl!, "_blank")}
            className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Resume
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/careers")}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-slate-400">
            {jobIdFilter ? "Applications for selected position" : "All job applications"}
          </p>
        </div>
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
        {jobIdFilter && (
          <Button
            variant="outline"
            onClick={() => router.push("/admin/careers/applications")}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Show All
          </Button>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredApps}
        columns={columns}
        searchPlaceholder="Search applicants..."
        searchKey="name"
        emptyMessage="No applications found"
        actions={actions}
        onRowClick={(row) => {
          setSelectedApp(row);
          setDetailOpen(true);
        }}
      />

      {/* Application Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              {/* Applicant Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400">Name</Label>
                  <p className="text-white">{selectedApp.name}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Position</Label>
                  <p className="text-white">{selectedApp.jobTitle || "Unknown"}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Email</Label>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedApp.email}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <Label className="text-slate-400">Phone</Label>
                  <p className="text-white">{selectedApp.phone || "Not provided"}</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {selectedApp.resumeUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedApp.resumeUrl!, "_blank")}
                    className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
                )}
                {selectedApp.linkedinUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedApp.linkedinUrl!, "_blank")}
                    className="bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
              </div>

              {/* Cover Letter */}
              {selectedApp.coverLetter && (
                <div>
                  <Label className="text-slate-400">Cover Letter</Label>
                  <div className="mt-2 p-4 bg-slate-900/50 rounded-lg">
                    <p className="text-slate-300 whitespace-pre-wrap">{selectedApp.coverLetter}</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <Label className="text-slate-400">Status</Label>
                <Select
                  value={selectedApp.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedApp.id, value);
                    setSelectedApp({ ...selectedApp, status: value });
                  }}
                >
                  <SelectTrigger className="w-full mt-2 bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {statusOptions.slice(1).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-slate-400">Notes</Label>
                <Textarea
                  defaultValue={selectedApp.notes || ""}
                  onBlur={(e) => handleNotesUpdate(e.target.value)}
                  placeholder="Add internal notes..."
                  className="mt-2 bg-slate-900/50 border-slate-600 text-white"
                  rows={4}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
