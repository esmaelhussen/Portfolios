import { useState, useEffect, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("top");
  const navigatingToSectionRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : prefersDark ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = ["top", "about", "skills", "projects", "contact"];
    const NAV_OFFSET = 112;
    const CLICK_SCROLL_OFFSET = 88;
    const TARGET_SNAP_DISTANCE = 6;
    let ticking = false;

    const updateActiveSection = () => {
      const navigatingTo = navigatingToSectionRef.current;
      if (navigatingTo) {
        const target = document.getElementById(navigatingTo);
        if (target) {
          const targetY = Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY - CLICK_SCROLL_OFFSET,
          );
          const distanceToTarget = Math.abs(window.scrollY - targetY);

          if (distanceToTarget > TARGET_SNAP_DISTANCE) {
            setActiveSection(navigatingTo);
            return;
          }
        }

        navigatingToSectionRef.current = null;
      }

      const scrollPosition = window.scrollY + NAV_OFFSET;
      const orderedSections = sectionIds
        .map((id) => {
          const section = document.getElementById(id);
          return section ? { id, top: section.getBoundingClientRect().top + window.scrollY } : null;
        })
        .filter((section): section is { id: string; top: number } => section !== null)
        .sort((a, b) => a.top - b.top);

      if (orderedSections.length === 0) {
        setActiveSection("top");
        return;
      }

      let currentSection = orderedSections[0].id;

      for (const section of orderedSections) {
        if (scrollPosition >= section.top) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) => (previous === currentSection ? previous : currentSection));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.replace("#", "");
    navigatingToSectionRef.current = id;
    setActiveSection(id);
    setOpen(false);

    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }

    if (window.history.pushState) {
      window.history.pushState(null, "", href);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b shadow-elegant" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 gold-border group-hover:bg-primary/20 transition">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Esmael<span className="text-gradient-gold">.dev</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => {
                const active = activeSection === l.href.replace("#", "");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(event) => handleNavClick(event, l.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all",
                      active
                        ? "glass-strong text-primary gold-border shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_20%,transparent)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                    )}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-primary/10 gold-border"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <button
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              className="grid h-10 w-10 place-items-center rounded-lg glass transition-colors hover:bg-accent/50"
              aria-label="Toggle color theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-lg glass"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass-strong border-t"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <button
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
              >
                <span>{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(event) => handleNavClick(event, l.href)}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                    activeSection === l.href.replace("#", "")
                      ? "glass-strong text-primary gold-border shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_20%,transparent)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
