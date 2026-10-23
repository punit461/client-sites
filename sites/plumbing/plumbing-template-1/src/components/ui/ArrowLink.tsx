import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "dark" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "btn btn-primary",
  dark: "btn btn-dark",
  outline: "btn btn-outline",
  "outline-light": "btn btn-outline-light",
};

/** A button-styled link with the small arrow that moves on hover. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "phone" | null;
  className?: string;
}) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
  const content = (
    <>
      {icon === "phone" ? <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} /> : null}
      <span>{children}</span>
      {icon === "arrow" ? <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} /> : null}
    </>
  );
  const cls = `group ${variants[variant]} ${className}`;
  return external ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** A quiet text link with an arrow, for "Learn more" style actions. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-semibold ${className}`}>
      <span className="link-underline">{children}</span>
      <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} />
    </Link>
  );
}
