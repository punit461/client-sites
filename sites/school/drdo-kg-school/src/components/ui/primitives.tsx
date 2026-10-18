import type { ReactNode } from "react";
import { isPending, type Text } from "@/data/pending";
import { icons, type IconName } from "@/lib/icons";

/** The page's one horizontal rhythm — every section is laid out inside this. */
export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-[1440px]" : "max-w-[1160px]"} px-4 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.9,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/**
 * Renders a data field: finished text as-is, a `pending` value as a highlighted
 * note of what still has to come from the school.
 */
export function Copy({ value }: { value: Text }) {
  if (!isPending(value)) return <>{value}</>;
  return <mark className="todo">{value.pending}</mark>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display-lg mt-2 text-teal-dark">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{copy}</p> : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "outline-light";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark shadow-[0_10px_28px_-12px_rgba(201,79,50,0.75)]",
  ghost: "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-2",
  "outline-light": "border-2 border-white/90 text-white hover:bg-white/15",
};

/** Every button on this site goes somewhere: a section, a phone call or a map. */
export function CtaButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 ${
    size === "lg" ? "px-7 py-3.5 text-[1rem]" : "px-5 py-2.5 text-sm"
  } ${VARIANTS[variant]} ${className}`;

  return (
    <a
      href={href}
      className={base}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** A star row that reads as "4.2 out of 5" to a screen reader, not "★★★★☆". */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const Star = icons.star;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= Math.round(rating) ? "fill-sun text-sun" : "text-white/40"}`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </span>
  );
}
