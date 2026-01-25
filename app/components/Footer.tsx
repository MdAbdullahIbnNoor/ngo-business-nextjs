"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // If the URL starts with /admin, don't render anything
  if (pathname.startsWith('/admin')) {
    return null;
  }


  return (
    <footer className="bg-secondary/30 border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                NGO<span className="text-primary">Site</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering communities and building sustainable futures through education, healthcare, and economic development.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Programs</Link>
              </li>
              <li>
                <Link href="/impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Impact Stories</Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Volunteer</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="shrink-0 text-primary" />
                <span>123 Hope Street, Community City, NY 10012</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="shrink-0 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="shrink-0 text-primary" />
                <span>contact@ngosite.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest updates and news.
            </p>
            <div className="flex flex-col gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NGO Site. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}