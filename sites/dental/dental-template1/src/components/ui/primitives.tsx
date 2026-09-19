import Link from "next/link";
import type { ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

/** The page's one horizontal rhythm — every section lays out inside this. */
export function Container({
  children,
  className = "",
  wide = false,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  narrow?: boolean;
}) {
  const width = narrow ? "max-w-[880px]" : wide ? "max-w-[1440px]" : "max-w-[1180px]";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${className}`}>
      <span className="h-px w-6 bg-sage" aria-hidden />
      {children}
    </span>
  );
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
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="display-lg mt-5 text-ink">{title}</h2>
      {copy ? (
        <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "dark" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  /** Terracotta is the accent: reserved for the primary action on a view. */
  primary: "bg-terracotta text-white hover:bg-terracotta-deep",
  dark: "bg-ink text-ivory hover:bg-ink/90",
  ghost: "border border-line bg-surface text-ink hover:border-ink/25 hover:bg-surface-2",
  light: "bg-white/95 text-ink hover:bg-white",
};

/**
 * Buttons and links share one look. An internal `href` renders next/link so
 * navigation between pages is client-side; everything else is a real button.
 */
export function CtaButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    size === "lg" ? "px-7 py-4 text-[0.95rem]" : "px-5 py-2.5 text-[0.86rem]"
  } ${VARIANTS[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={base} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/** A star row that reads as "5 out of 5" to a screen reader, not "★★★★★". */
export function Stars({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  const Star = icons.star;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-terracotta text-terracotta" : "text-line"}`}
          strokeWidth={1.2}
          aria-hidden
        />
      ))}
    </span>
  );
}

/**
 * Marks content that is scaffolding rather than practice information. It is
 * deliberately visible: a placeholder that looks like real content is how
 * invented clinical claims reach production.
 */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-6 flex max-w-xl items-start gap-2.5 rounded-xl border border-dashed border-terracotta/40 bg-terracotta/5 px-4 py-3 text-left text-[0.8rem] leading-relaxed text-ink-soft">
      <Icon name="shieldCheck" className="mt-0.5 h-4 w-4 flex-none text-terracotta" />
      <span>{children}</span>
    </p>
  );
}
