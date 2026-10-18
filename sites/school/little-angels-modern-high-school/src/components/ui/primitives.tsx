import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
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
      className={`mx-auto w-full ${wide ? "max-w-[1400px]" : "max-w-[1200px]"} px-4 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
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

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${onDark ? "!text-gold-bright" : ""}`}>
      <span className={`h-px w-6 ${onDark ? "bg-gold-bright/60" : "bg-gold/60"}`} aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  onDark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className={`display-lg mt-4 ${onDark ? "text-white" : "text-ink"}`}>{title}</h2>
      {copy ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${onDark ? "text-white/75" : "text-ink-soft"}`}>
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
  variant?: "primary" | "gold" | "ghost" | "light" | "outlineLight";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-navy text-white hover:bg-navy-dark shadow-[0_12px_30px_-14px_rgba(28,42,94,0.8)]",
  gold: "bg-gold-bright text-navy-dark hover:bg-gold hover:text-white shadow-[0_12px_30px_-14px_rgba(176,141,44,0.9)]",
  ghost: "border border-line bg-surface text-ink hover:border-ink/25 hover:bg-surface-2",
  light: "bg-white text-navy hover:bg-gold-soft",
  outlineLight: "border border-white/40 text-white hover:bg-white/10",
};

/**
 * Buttons and links share one look. An internal `href` ("/…") goes through
 * next/link so basePath is applied; anything else (tel:, wa.me, a form) is a
 * plain anchor, opened in a new tab when it leaves the site.
 */
export function CtaButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${
    size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm"
  } ${VARIANTS[variant]} ${className}`;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
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
  return (
    <button type={type} onClick={onClick} className={base} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/**
 * A photo from public/images that fills its (positioned) parent. Goes through
 * asset() because next/image does not add basePath to local files.
 */
export function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return <Image src={asset(src)} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
}

/** The school crest. The source file has a white ground, so it always sits on a white disc. */
export function Crest({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/5 ${className}`}>
      <Image src={asset("/images/logo.jpg")} alt="" fill sizes="96px" className="scale-[1.32] object-contain" />
    </span>
  );
}

/** Title band at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark text-white">
      <Photo src={image} alt={imageAlt} priority sizes="100vw" className="object-cover opacity-35" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-navy-dark via-navy-dark/85 to-navy-dark/30" aria-hidden />
      <Container className="relative py-20 sm:py-28">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="display-xl mt-5 max-w-3xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{copy}</p>
      </Container>
    </section>
  );
}
