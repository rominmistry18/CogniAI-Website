"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/skill-library", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const moreLinks = [
  { href: "/security", label: "Security" },
  { href: "/compliance", label: "Compliance" },
  { href: "/support", label: "Support" },
  { href: "/careers", label: "Careers" },
  { href: "/leadership", label: "Leadership" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center group">
              <Logo />
            </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                onBlur={() => setTimeout(() => setShowMore(false), 150)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
              </button>
              
              {showMore && (
                <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg py-2 shadow-lg border border-border">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2 text-sm transition-all ${
                        pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Request Demo
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-border my-2 pt-2">
              <p className="px-4 py-1 text-xs text-muted-foreground uppercase tracking-wider">More</p>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
