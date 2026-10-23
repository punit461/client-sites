import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "blue" | "dark" | "line" | "line-light";

const cls: Record<Variant, string> = {
  lime: "btn btn-lime",
  blue: "btn btn-blue",
  dark: "btn btn-dark",
  line: "btn btn-line",
  "line-light": "btn btn-line-light",
};

/** A button-styled link. The arrow shifts on hover/focus; tel/mailto get a phone icon. */
export function Button({
  href,
  children,
  variant = "lime",
  icon = "arrow",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "phone" | null;
  className?: string;
}) {
  const inner = (
    <>
      {icon === "phone" ? <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> : null}
      <span>{children}</span>
      {icon === "arrow" ? <ArrowRight className="nudge h-4 w-4" strokeWidth={2.2} aria-hidden="true" /> : null}
    </>
  );
  const c = `group ${cls[variant]} ${className}`;
  return /^(tel:|mailto:|https?:)/.test(href) ? (
    <a href={href} className={c}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={c}>
      {inner}
    </Link>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-display font-semibold ${className}`}>
      <span className="border-b-2 border-current pb-0.5">{children}</span>
      <ArrowRight className="nudge h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
    </Link>
  );
}
