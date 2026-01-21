"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Calendar, Send } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "demo",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "demo",
      message: ""
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Send className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Message Sent!</h2>
          <p className="text-muted-foreground">
            Thank you for reaching out. A member of the CogniAI team will contact you shortly to discuss your request.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
            Send another message
          </Button>
          <Link href="/" className="block text-sm text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Let&apos;s Start a
              <span className="gradient-text block">Conversation</span>
            </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Request a demo, ask questions, or discuss how CogniAI by MedinovAI can transform your workforce development.
              </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
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
                    <label className="block text-sm font-medium mb-2">Work Email *</label>
                    <Input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">I&apos;m interested in *</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "demo", label: "Product Demo" },
                      { value: "pricing", label: "Pricing" },
                      { value: "enterprise", label: "Enterprise" },
                      { value: "support", label: "Support" },
                      { value: "other", label: "Other" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: option.value })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.subject === option.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-background/50 text-muted-foreground hover:bg-background/80"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    required
                    placeholder="Tell us about your needs..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:hello@cogniai.us" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">hello@cogniai.us</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">Schedule a Demo</h3>
                    <p className="text-sm text-muted-foreground">30-minute personalized walkthrough</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  See the platform in action with a personalized demo tailored to your organization&apos;s needs.
                </p>
                <Button variant="outline" className="w-full">
                  Book a Time
                </Button>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant answers from our support team through live chat.
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
