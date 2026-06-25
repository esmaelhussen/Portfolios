import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Heart, MapPin, Mail } from "lucide-react";
import { profile, experience, education, interests } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Esmael Hussen" },
      { name: "description", content: profile.longBio },
      { property: "og:title", content: "About — Esmael Hussen" },
      { property: "og:description", content: profile.longBio },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <PageHeader
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
            <Button
              asChild
              className="mt-6 w-full bg-primary text-primary-foreground hover:opacity-90"
            >
              <a href={profile.cvUrl}>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="space-y-14">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-3">Biography</h3>
            <p className="text-muted-foreground leading-relaxed">{profile.longBio}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Outside of work I'm usually building side projects, running trails, or pulling shots
              of espresso. I'm a big believer in calm software — products that respect the user's
              attention and quietly do their job.
            </p>
          </motion.section>

          <section>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Experience
            </h3>
            <ol className="relative border-l border-border ml-2 space-y-8">
              {experience.map((e, i) => (
                <motion.li
                  key={e.role}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="ml-6"
                >
                  <span className="absolute -left-[7px] grid h-3.5 w-3.5 place-items-center rounded-full bg-primary shadow-glow" />
                  <p className="text-xs font-mono text-primary tracking-wider">{e.year}</p>
                  <h4 className="mt-1 font-semibold">
                    {e.role} <span className="text-muted-foreground">· {e.company}</span>
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" /> Education
            </h3>
            {education.map((e) => (
              <div key={e.title} className="glass rounded-2xl p-6 gold-border">
                <p className="text-xs font-mono text-primary tracking-wider">{e.year}</p>
                <h4 className="mt-1 font-semibold">{e.title}</h4>
                <p className="text-sm text-muted-foreground">{e.place}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" /> Personal Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full glass text-sm hover:gold-border hover:text-primary transition"
                >
                  {i}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
