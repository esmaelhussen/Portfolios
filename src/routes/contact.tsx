import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Esmael Hussen" },
      {
        name: "description",
        content: "Get in touch about freelance work, full-time roles, or just to say hi.",
      },
      { property: "og:title", content: "Contact — Esmael Hussen" },
      {
        property: "og:description",
        content: "Reach out via the form, email, or social channels.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const info = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: "+251 930 67 09 90", href: "tel:+251930670990" },
  { icon: MapPin, label: "Location", value: profile.location },
];

const socials = [
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Twitter, label: "Twitter", href: profile.twitter },
];

function ContactPage() {
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

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Let's build <span className="text-gradient-gold">something great</span>
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
            {info.map(({ icon: Icon, label, value, href }) => {
              const Wrap = href ? "a" : "div";
              return (
                <Wrap
                  key={label}
                  {...(href ? { href } : {})}
                  className="flex items-center gap-4 glass rounded-2xl p-5 hover-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 gold-border shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="font-medium truncate">{value}</p>
                  </div>
                </Wrap>
              );
            })}
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Follow me</p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
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

          <div className="rounded-2xl overflow-hidden glass-strong h-64">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Addis+Ababa,Ethiopia&output=embed"
              className="w-full h-full grayscale-[40%] contrast-[1.1] opacity-90"
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
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What's this about?" {...form.register("subject")} />
            {form.formState.errors.subject && (
              <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Tell me about your project..."
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
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
  );
}
