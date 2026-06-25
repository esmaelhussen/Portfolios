import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Sparkles, ExternalLink } from "lucide-react";
import { profile, projects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ParticlesBg } from "@/components/particles-bg";
import { TypedText } from "@/components/typed-text";
import { SectionHeader } from "@/components/section-header";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role}` },
      { name: "description", content: profile.bio },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.bio },
    ],
  }),
  component: HomePage,
});

const socials = [
  { href: profile.github, icon: Github, label: "GitHub" },
  { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: profile.twitter, icon: Twitter, label: "Twitter" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <ParticlesBg />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass gold-border text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Available for new projects</span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Hi, I'm <span className="text-gradient-gold">{profile.name.split(" ")[0]}</span>
                <br />
                <span className="text-foreground/90">a </span>
                <TypedText
                  phrases={profile.typingPhrases}
                  className="text-gradient-gold"
                />
              </h1>

              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto">
                {profile.bio}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90 shadow-glow">
                  <Link to="/projects">
                    View Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass gold-border">
                  <Link to="/contact">Contact Me</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                  <a href={profile.cvUrl}>
                    <Download className="mr-1 h-4 w-4" /> Download CV
                  </a>
                </Button>
              </div>


              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Find me</span>
                <div className="h-px flex-1 max-w-[60px] bg-border" />
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg glass hover:bg-primary/10 hover:text-primary hover:gold-border transition"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 sm:p-6 text-center hover-lift"
              >
                <p className="text-3xl sm:text-4xl font-bold text-gradient-gold font-display">
                  {s.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured work"
            title={<>Selected <span className="text-gradient-gold">projects</span></>}
            description="A peek at the products and platforms I've built recently. Hover for details."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative"
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="block glass rounded-3xl overflow-hidden hover-lift h-full flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded-md glass-strong gold-border text-primary">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass-strong gold-border text-primary opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="text-[11px] font-medium px-2 py-1 rounded-md text-muted-foreground">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <Button asChild size="lg" variant="outline" className="glass gold-border hover:bg-primary/10">
              <Link to="/projects">
                Browse all projects <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
