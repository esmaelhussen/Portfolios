import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-32 border-t bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold">
              {profile.name.split(" ")[0]}
              <span className="text-gradient-gold">.dev</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {profile.tagline}. Available for freelance and full-time roles.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/80 mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition">About</a></li>
              <li><a href="/projects" className="hover:text-primary transition">Projects</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/80 mb-3">Connect</p>
            <div className="flex gap-2">
              {[
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: profile.twitter, icon: Twitter, label: "Twitter" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg glass hover:bg-primary/10 hover:text-primary transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. Crafted with love.</p>
          <p>Built with React, TanStack & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
