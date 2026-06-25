import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { skills } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/section-header";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Esmael Hussen" },
      {
        name: "description",
        content:
          "Technologies and tools I work with: React, Next.js, TypeScript, Node, NestJS, PostgreSQL, MongoDB, Docker and more.",
      },
      { property: "og:title", content: "Skills — Esmael Hussen" },
      {
        property: "og:description",
        content: "Frontend, backend, database and tools I use in production.",
      },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Skills & tools"
        title={
          <>
            My <span className="text-gradient-gold">technical toolkit</span>
          </>
        }
        description="A snapshot of the technologies I use daily — from the frontend down to the database."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-strong rounded-3xl p-6 sm:p-8 hover-lift"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{category}</h3>
              <span className="text-xs font-mono text-primary px-2 py-1 rounded-md glass gold-border">
                {items.length} {items.length === 1 ? "skill" : "skills"}
              </span>
            </div>
            <ul className="space-y-5">
              {items.map((s, i) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-mono text-primary">{s.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-glow"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
