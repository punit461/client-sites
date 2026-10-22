import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** The button styles, as classes, so forms and links share them. */
export const buttonStyles = {
  base: "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-6 py-3 text-[0.94rem] font-semibold tracking-wide transition duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60",
  primary: "bg-navy text-white hover:bg-blue",
  gold: "bg-gold text-navy-deep hover:bg-gold-hover",
  light: "bg-white text-navy hover:bg-ivory",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  outlineLight: "border border-white/35 text-white hover:border-white hover:bg-white hover:text-navy",
} as const;

type Variant = Exclude<keyof typeof buttonStyles, "base">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `${buttonStyles.base} ${buttonStyles[variant]} ${className}`;
  const icon = arrow ? <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden /> : null;

  if (external)
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

/** An understated text link with an arrow, for "View programme", "Read more". */
export function TextLink({
  href,
  children,
  className = "",
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const external = href.startsWith("http");
  const cls = `group inline-flex items-center gap-2 text-sm font-semibold tracking-wide ${
    tone === "light" ? "text-white" : "text-navy"
  } ${className}`;
  const inner = (
    <>
      <span className={`border-b pb-0.5 transition-colors ${tone === "light" ? "border-gold/60 group-hover:border-gold" : "border-gold-ink/40 group-hover:border-navy"}`}>
        {children}
      </span>
      {external ? (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      ) : (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
