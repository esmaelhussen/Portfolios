import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, SendHorizonal, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { profile, projects, skills } from "@/lib/portfolio-data";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What services do you offer?",
  "Show me your latest projects",
  "What technologies do you use?",
  "How can I contact you?",
];

function getAssistantReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("service") || normalized.includes("help") || normalized.includes("offer")) {
    return `Esmael helps businesses build polished web apps, dashboards, and full-stack products. His focus includes React, Next.js, Node.js, and thoughtful UI/UX. If you want, I can also point you to a specific project or stack.`;
  }

  if (normalized.includes("project") || normalized.includes("work") || normalized.includes("portfolio")) {
    const latestProjects = projects.slice(0, 3).map((project) => project.title).join(", ");
    return `Here are a few recent projects: ${latestProjects}. They range from ecommerce platforms to stock management and admin dashboards.`;
  }

  if (normalized.includes("tech") || normalized.includes("technology") || normalized.includes("stack") || normalized.includes("skill")) {
    const techList = Object.entries(skills)
      .flatMap(([category, items]) => items.map((item) => `${item.name} (${category})`))
      .slice(0, 10)
      .join(", ");
    return `His strongest stack includes ${techList}. He is especially comfortable with React, Next.js, TypeScript, Node.js, and Tailwind CSS.`;
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("reach")) {
    return `You can reach Esmael at ${profile.email}. He is also available on GitHub and LinkedIn through the links in the site footer.`;
  }

  if (normalized.includes("experience") || normalized.includes("year") || normalized.includes("background")) {
    return `Esmael is a full-stack developer with experience building modern applications and shipping production-ready projects across frontend, backend, and databases.`;
  }

  if (normalized.includes("location") || normalized.includes("where")) {
    return `He is based in ${profile.location}.`;
  }

  return `I can help with questions about Esmael's services, experience, projects, technologies, and contact details. Try one of the suggested prompts or ask something more specific.`;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: `Hi! I’m ${profile.name.split(" ")[0]}'s assistant. Ask me anything about his work, projects, skills, or how to get in touch.`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getAssistantReply(trimmed),
      };
      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 700);
  };

  const promptChips = useMemo(() => quickQuestions, []);

  return (
    <div className="fixed bottom-4 right-4 z-60">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-primary/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Answers questions about Esmael</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex max-h-105 flex-col gap-3 overflow-y-auto bg-background/70 px-4 py-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === "assistant" ? "mr-auto max-w-[90%]" : "ml-auto max-w-[90%]"}
                >
                  <div
                    className={message.role === "assistant"
                      ? "rounded-2xl rounded-tl-md bg-secondary px-3 py-2 text-sm text-foreground"
                      : "rounded-2xl rounded-tr-md bg-primary px-3 py-2 text-sm text-primary-foreground"}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto max-w-[90%]">
                  <div className="rounded-2xl rounded-tl-md bg-secondary px-3 py-2 text-sm text-foreground">
                    Thinking...
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {promptChips.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setInput(prompt);
                    }}
                    className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border bg-background/90 p-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, or contact..."
                  className="flex-1 bg-transparent px-2 py-1 text-sm outline-none"
                />
                <Button type="submit" size="icon" className="rounded-full">
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </div>
  );
}
