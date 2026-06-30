import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Send,
  Sparkles,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { profile, projects, experience, education, interests, skills } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ParticlesBg } from "@/components/particles-bg";
import { TypedText } from "@/components/typed-text";
import { SectionHeader } from "@/components/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

const categories = ["All", "SaaS", "Web App", "Mobile", "Open Source"] as const;
const PROJECTS_PER_PAGE = 6;

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

function HomePage() {
  const [displayedProjects, setDisplayedProjects] = useState(PROJECTS_PER_PAGE);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdvgrpw";

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent!", {
        description: `Thanks ${values.name.split(" ")[0]} — I'll get back to you within 24 hours.`,
      });
      form.reset();
    } catch {
      toast.error("Couldn't send message", {
        description: "Please try again, or email me directly.",
      });
    }
  };

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

  const visibleProjects = filtered.slice(0, displayedProjects);
  const hasMore = displayedProjects < filtered.length;

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProjects((prev) => prev + PROJECTS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return (
    <div id="top" className="w-full">
      {/* Hero Section */}
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
                <TypedText phrases={profile.typingPhrases} />
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {profile.bio}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:opacity-90"
                  asChild
                >
                  <a href="#projects">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="glass gold-border" asChild>
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </a>
                </Button>
              </div>

              <motion.div
                className="mt-12 flex justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {socials.map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full glass gold-border hover:bg-primary/10 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 sm:p-6 text-center hover-lift">
                <p className="text-3xl sm:text-4xl font-bold text-gradient-gold font-display">
                  {s.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured work"
            title={
              <>
                Selected <span className="text-gradient-gold">projects</span>
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDisplayedProjects(PROJECTS_PER_PAGE);
                }}
                className="pl-9 glass border-border focus-visible:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActive(c);
                    setDisplayedProjects(PROJECTS_PER_PAGE);
                  }}
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
            <>
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((p, i) => (
                  <motion.article
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative glass rounded-3xl overflow-hidden hover-lift flex flex-col"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
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
                          <a href={p.liveUrl} target="_blank" rel="noreferrer">
                            View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button asChild size="icon" variant="outline" className="glass gold-border">
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live demo"
                          >
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

              {/* Infinite scroll trigger */}
              <div ref={observerTarget} className="mt-12 text-center">
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center gap-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                    <div
                      className="h-2 w-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </motion.div>
                )}
                {hasMore && !isLoading && (
                  <p className="text-muted-foreground text-sm">Scroll to load more projects...</p>
                )}
                {!hasMore && filtered.length > 0 && (
                  <p className="text-muted-foreground text-sm">No more projects to load</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="About me"
            title={
              <>
                The story <span className="text-gradient-gold">behind the code</span>
              </>
            }
            description="A short version of how I got here, what I work on, and what I care about."
          />

          <div className="grid lg:grid-cols-[0.85fr_1.5fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <div className="glass-strong gold-border rounded-3xl p-6">
                <p className="text-xs font-mono tracking-wider uppercase text-primary">
                  Available for work
                </p>
                <h2 className="mt-3 text-2xl font-display font-bold">{profile.name}</h2>
                <p className="mt-2 text-muted-foreground">{profile.role}</p>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {profile.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" /> {profile.email}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="text-muted-foreground leading-relaxed">{profile.longBio}</p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" /> Experience
                </h3>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 glass rounded-2xl"
                    >
                      <p className="text-xs font-mono text-primary">{exp.year}</p>
                      <h4 className="font-bold mt-1">{exp.role}</h4>
                      <p className="text-sm text-primary">{exp.company}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" /> Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 glass rounded-2xl"
                    >
                      <p className="text-xs font-mono text-primary">{edu.year}</p>
                      <h4 className="font-bold mt-1">{edu.title}</h4>
                      <p className="text-sm text-primary">{edu.place}</p>
                      {edu.cgpa && (
                        <p className="text-sm text-primary font-medium">CGPA: {edu.cgpa}</p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Skills"
            title={
              <>
                Technologies I <span className="text-gradient-gold">love working with</span>
              </>
            }
            description="A comprehensive list of technologies and tools I work with daily."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, categorySkills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="glass-strong rounded-3xl p-8"
              >
                <h3 className="font-display font-bold text-lg mb-6 text-gradient-gold">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                    >
                      <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                        <span className="font-medium text-sm">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Beyond Code"
            title={
              <>
                Things I'm <span className="text-gradient-gold">passionate about</span>
              </>
            }
          />

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.map((interest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 glass rounded-2xl"
              >
                <Heart className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium">{interest}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-32 mb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get in touch"
            title={
              <>
                Let’s build <span className="text-gradient-gold">something great</span>
              </>
            }
            description="Have a project in mind, a role to discuss, or just want to say hi? Drop me a line."
          />

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 glass rounded-2xl p-5 hover-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 gold-border shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 glass rounded-2xl p-5 hover-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 gold-border shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="font-medium truncate">{profile.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 glass rounded-2xl p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 gold-border shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Location
                    </p>
                    <p className="font-medium truncate">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Follow me
                </p>
                <div className="flex gap-2">
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
              </div>

              <div className="rounded-2xl overflow-hidden glass-strong h-56">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Addis+Ababa,Ethiopia&output=embed"
                  className="w-full h-full grayscale-40 contrast-[1.1] opacity-90"
                  loading="lazy"
                />
              </div>
            </motion.aside>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="glass-strong rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <div>
                <p className="text-xs font-mono tracking-wider uppercase text-primary">
                  Available for work
                </p>
                <h3 className="mt-3 text-2xl font-display font-bold">
                  Ready to build something great?
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  I’m available for freelance work, full-time opportunities, and collaborative
                  projects.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="home-name">Name</Label>
                  <Input id="home-name" placeholder="Your name" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home-email">Email</Label>
                  <Input
                    id="home-email"
                    type="email"
                    placeholder="you@example.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-subject">Subject</Label>
                <Input
                  id="home-subject"
                  placeholder="What's this about?"
                  {...form.register("subject")}
                />
                {form.formState.errors.subject && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-message">Message</Label>
                <Textarea
                  id="home-message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:opacity-90 shadow-glow"
              >
                {form.formState.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
