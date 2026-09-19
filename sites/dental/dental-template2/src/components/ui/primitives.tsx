import Link from "next/link";
import type { ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

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
  const width = narrow ? "max-w-[860px]" : wide ? "max-w-[1440px]" : "max-w-[1180px]";
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

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 text-forest ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  copy,
  align = "left",
  className = "",
}: {
  label?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {label ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Label>{label}</Label>
        </div>
      ) : null}
      <h2 className="display-lg mt-4 text-ink">{title}</h2>
      {copy ? <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{copy}</p> : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "coral" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  /** Forest carries primary actions; coral is for the rare true highlight. */
  primary: "bg-forest text-paper hover:bg-forest-deep",
  coral: "bg-coral text-white hover:bg-coral-deep",
  ghost: "border border-line bg-surface text-ink hover:border-forest/40",
  light: "bg-white text-ink hover:bg-surface-2",
};

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

export function Stars({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  const Star = icons.star;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-coral text-coral" : "text-line"}`}
          strokeWidth={1.2}
          aria-hidden
        />
      ))}
    </span>
  );
}

/** Breadcrumbs as a real nav landmark, not decoration. */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[0.82rem] text-ink-faint">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {crumb.label}
              </span>
            )}
            {i < trail.length - 1 ? <span aria-hidden>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Marks content that is scaffolding rather than clinic information. It is
 * deliberately visible: a placeholder that looks like real content is how
 * invented clinical claims reach production.
 */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-dashed border-coral/45 bg-coral/[0.07] px-4 py-3 text-left text-[0.8rem] leading-relaxed text-ink-soft">
      <Icon name="shieldCheck" className="mt-0.5 h-4 w-4 flex-none text-coral-deep" />
      <span>{children}</span>
    </p>
  );
}
