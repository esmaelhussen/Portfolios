import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary px-3 py-1 rounded-full glass gold-border mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">{description}</p>
      )}
      {children}
    </motion.div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="pt-32 pb-12 sm:pt-40 sm:pb-16 text-center px-4">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}
