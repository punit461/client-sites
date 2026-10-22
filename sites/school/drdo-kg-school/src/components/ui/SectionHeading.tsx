import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

/**
 * Eyebrow, heading and optional lead — the opening of nearly every section.
 * `tone="light"` for navy backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  as: H = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal as="header" className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${light ? "text-gold" : "text-gold-ink"}`}>
          <span className={`h-px w-8 ${light ? "bg-gold" : "bg-gold-ink"}`} aria-hidden />
          {eyebrow}
        </p>
      ) : null}
      <H className={`t-h2 mt-5 ${light ? "text-white" : ""}`}>{title}</H>
      {lead ? <p className={`t-lead mt-6 ${light ? "text-white/75" : "text-slate"}`}>{lead}</p> : null}
    </Reveal>
  );
}
