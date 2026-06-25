import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Lightbulb, AlertTriangle, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: p
        ? [
            { title: `${p.title} — Alex Mercer` },
            { name: "description", content: p.description },
            { property: "og:title", content: p.title },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [{ title: "Project — Alex Mercer" }],
    };
  },
  notFoundComponent: () => (
    <div className="pt-40 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary">← Back to projects</Link>
    </div>
  ),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <span className="text-xs font-mono tracking-wider uppercase px-2 py-1 rounded-md glass gold-border text-primary">
          {p.category}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {p.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{p.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 shadow-glow">
            <a href={p.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Visit Live Site
            </a>
          </Button>
          <Button asChild variant="outline" className="glass gold-border">
            <a href={p.githubUrl} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" /> View Repository
            </a>
          </Button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative mt-10 rounded-3xl overflow-hidden glass-strong p-2"
      >
        <img
          src={p.image}
          alt={p.title}
          width={1200}
          height={700}
          className="w-full aspect-[16/9] object-cover rounded-2xl"
        />
      </motion.div>

      <div className="mt-12 grid md:grid-cols-[1fr_280px] gap-10">
        <article className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{p.longDescription}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Key Features
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm glass rounded-xl p-3">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {p.gallery.map((src, i) => (
                <div key={src + i} className="rounded-2xl overflow-hidden glass p-1.5">
                  <img
                    src={src}
                    alt={`${p.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5">
              <AlertTriangle className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-semibold mb-1.5">Challenges</h3>
              <p className="text-sm text-muted-foreground">{p.challenges}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <Lightbulb className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-semibold mb-1.5">Solutions</h3>
              <p className="text-sm text-muted-foreground">{p.solutions}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-semibold mb-1.5">Lessons</h3>
              <p className="text-sm text-muted-foreground">{p.lessons}</p>
            </div>
          </div>
        </article>

        <aside className="md:sticky md:top-28 self-start space-y-6">
          <div className="glass-strong rounded-2xl p-6 gold-border">
            <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-3">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary gold-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
