import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "teal" | "light" | "outline" | "outline-light";
const cls: Record<Variant, string> = {
  teal: "btn btn-teal",
  light: "btn btn-light",
  outline: "btn btn-outline",
  "outline-light": "btn btn-outline-light",
};

/** A button-styled link. tel:/mailto: get a phone icon; others an arrow that moves on hover. */
export function Button({
  href,
  children,
  variant = "teal",
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
      {icon === "phone" ? <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} /> : null}
      <span>{children}</span>
      {icon === "arrow" ? <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} /> : null}
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

/** A quiet text link: "Explore Service →". */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-semibold text-teal ${className}`}>
      <span className="underline-draw">{children}</span>
      <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} />
    </Link>
  );
}
