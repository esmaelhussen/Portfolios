import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Esmael Hussen" },
      {
        name: "description",
        content: "A selection of products, platforms and open-source work I've built.",
      },
      { property: "og:title", content: "Projects — Esmael Hussen" },
      {
        property: "og:description",
        content: "Featured projects across SaaS, web apps, mobile and open source.",
      },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["All", "SaaS", "Web App", "Mobile", "Open Source"] as const;

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, active]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Selected <span className="text-gradient-gold">work</span>
          </>
        }
        description="A curated set of things I've designed, engineered, and shipped."
      />

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-10">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or tech..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 glass border-border focus-visible:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                active === c
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground hover:gold-border",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No projects match your search.
        </div>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative glass rounded-3xl overflow-hidden hover-lift flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded-md glass-strong gold-border text-primary">
                  {p.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                  >
                    <Link to="/projects/$slug" params={{ slug: p.slug }}>
                      View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="outline" className="glass gold-border">
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="icon" variant="outline" className="glass gold-border">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
}
