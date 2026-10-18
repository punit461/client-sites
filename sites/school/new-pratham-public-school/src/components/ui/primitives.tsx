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
  const width = narrow ? "max-w-[880px]" : wide ? "max-w-[1400px]" : "max-w-[1180px]";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.7,
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
      <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
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
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow className={light ? "text-saffron" : ""}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className={`display-lg mt-4 ${light ? "text-cream" : "text-ink"}`}>{title}</h2>
      {copy ? (
        <p className={`mt-5 text-[1.02rem] leading-relaxed sm:text-lg ${light ? "text-cream/75" : "text-ink-soft"}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "dark" | "ghost" | "light" | "saffron";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  external?: boolean;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  /** Coral is the accent: reserved for the primary action on a view. */
  primary: "bg-coral text-white hover:bg-coral-deep",
  saffron: "bg-saffron text-ink hover:bg-saffron-deep",
  dark: "bg-ink text-cream hover:bg-ink/90",
  ghost: "border border-line bg-surface text-ink hover:border-ink/25 hover:bg-surface-2",
  light: "bg-white/95 text-ink hover:bg-white",
};

/**
 * Buttons and links share one look. An internal `href` renders next/link so
 * navigation between pages is client-side; everything else is a real anchor
 * or button.
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
  external,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    size === "lg" ? "px-7 py-4 text-[0.95rem]" : "px-5 py-2.5 text-[0.86rem]"
  } ${VARIANTS[variant]} ${className}`;

  if (href) {
    const isExternal =
      external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={base}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
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

/** The banner at the top of every inner page: breadcrumb, eyebrow, title, intro. */
export function PageHero({
  eyebrow,
  title,
  copy,
  crumb,
  children,
  tone = "cream",
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  crumb: string;
  children?: ReactNode;
  tone?: "cream" | "ink";
}) {
  const dark = tone === "ink";
  return (
    <section className={`relative overflow-hidden border-b border-line ${dark ? "bg-ink text-cream" : "bg-surface"} py-14 sm:py-20`}>
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full ${dark ? "bg-coral/20" : "bg-saffron-wash"} blur-3xl`}
        aria-hidden
      />
      <Container wide className="relative">
        <nav aria-label="Breadcrumb" className={`mb-6 text-[0.82rem] ${dark ? "text-cream/60" : "text-ink-faint"}`}>
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className={dark ? "hover:text-cream" : "hover:text-ink"}>
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className={dark ? "text-cream" : "text-ink"}>
              {crumb}
            </li>
          </ol>
        </nav>
        <Eyebrow className={dark ? "text-saffron" : ""}>{eyebrow}</Eyebrow>
        <h1 className={`display-xl mt-4 max-w-3xl ${dark ? "text-cream" : "text-ink"}`}>{title}</h1>
        {copy ? (
          <p className={`mt-6 max-w-2xl text-[1.05rem] leading-relaxed ${dark ? "text-cream/75" : "text-ink-soft"}`}>
            {copy}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

/** A small pill used for tags and counts. */
export function Pill({ children, tone = "saffron" }: { children: ReactNode; tone?: "saffron" | "leaf" | "coral" | "ink" }) {
  const tones = {
    saffron: "bg-saffron-wash text-saffron-deep",
    leaf: "bg-leaf-wash text-leaf-deep",
    coral: "bg-coral-wash text-coral-deep",
    ink: "bg-ink text-cream",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
