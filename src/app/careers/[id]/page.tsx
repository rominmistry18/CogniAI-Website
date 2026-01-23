"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string | null;
  description: string;
  requirements: string;
  benefits: string | null;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplication, setShowApplication] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    coverLetter: "",
  });

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/public/jobs/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Job not found");
        }
        
        setJob(data.job);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load job");
      } finally {
        setLoading(false);
      }
    }
    
    fetchJob();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/public/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: params.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "This position may no longer be available."}</p>
          <Link href="/careers">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold">Application Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for applying to {job.title}. We&apos;ll review your application and get back to you soon.
          </p>
          <Link href="/careers">
            <Button variant="outline" className="w-full">
              View More Opportunities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={job.title}
        description={`${job.department} · ${job.location}`}
      />
      
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all positions
          </Link>
          
          {/* Job Meta */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Role</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
            </div>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Benefits</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap">{job.benefits}</p>
              </div>
            </div>
          )}

          {/* Apply Button / Form */}
          {!showApplication ? (
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowApplication(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Apply for this Position
              </Button>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Apply for {job.title}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Letter</label>
                  <Textarea
                    placeholder="Tell us why you'd be a great fit..."
                    rows={5}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                {formError && (
                  <p className="text-red-500 text-sm">{formError}</p>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplication(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
