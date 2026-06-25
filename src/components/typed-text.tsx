import { useEffect, useState } from "react";

export function TypedText({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, sub.length + 1);
        setSub(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, sub.length - 1);
        setSub(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [sub, deleting, index, phrases]);

  return (
    <span className={className}>
      {sub}
      <span className="inline-block w-[2px] h-[1em] align-middle bg-primary ml-1 animate-pulse" />
    </span>
  );
}
