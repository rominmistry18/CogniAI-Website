"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  User,
  ExternalLink
} from "lucide-react";
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

interface AdminUser {
  id: string;
  name: string;
}

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch lead
        const leadResponse = await fetch("/api/admin/leads");
        if (leadResponse.ok) {
          const data = await leadResponse.json();
          const foundLead = data.leads.find((l: Lead) => l.id === leadId);
          if (foundLead) {
            setLead(foundLead);
            setStatus(foundLead.status);
            setNotes(foundLead.notes || "");
            setAssignedTo(foundLead.assignedTo);
          } else {
            toast.error("Lead not found");
            router.push("/admin/leads");
          }
        }

        // Fetch users for assignment
        const usersResponse = await fetch("/api/admin/users");
        if (usersResponse.ok) {
          const data = await usersResponse.json();
          setUsers(data.users);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [leadId, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          status,
          notes: notes || null,
          assignedTo,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to save");
        return;
      }

      toast.success("Lead updated successfully");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !lead) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/leads")}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
            <p className="text-slate-400">{lead.email}</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary flex items-center gap-1"
                  >
                    {lead.email}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-white hover:text-primary flex items-center gap-1"
                    >
                      {lead.phone}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                  <Building className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Company</p>
                    <p className="text-white">{lead.company}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Submitted</p>
                  <p className="text-white">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-white">Message</h2>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          {/* Notes */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-white text-lg mb-4 block">Internal Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this lead..."
              className="bg-slate-900/50 border-slate-600 text-white min-h-[150px]"
            />
            <p className="text-xs text-slate-500 mt-2">
              These notes are only visible to team members.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-white mb-3 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <StatusBadge status={option.value} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignment */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-white mb-3 block">Assigned To</Label>
            <Select 
              value={assignedTo || "unassigned"} 
              onValueChange={(v) => setAssignedTo(v === "unassigned" ? null : v)}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="unassigned">
                  <span className="text-slate-400">Unassigned</span>
                </SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-white mb-3 block">Source</Label>
            <p className="text-slate-300 capitalize">{lead.source.replace(/_/g, " ")}</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <Label className="text-white mb-3 block">Quick Actions</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}`, '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              {lead.phone && (
                <Button
                  variant="outline"
                  className="w-full justify-start bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => window.open(`tel:${lead.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
