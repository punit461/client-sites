"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Categories" },
  { href: "/projects", label: "All projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * A client component only so the current page can be marked — server
 * components have no access to the pathname. The category ids come in as a
 * prop rather than by importing the manifest, which would ship the whole
 * project list to the browser just to highlight one link.
 */
export default function SiteHeader({
  title,
  categoryIds,
}: {
  title: string;
  categoryIds: string[];
}) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  // A category page is a child of the dashboard, so "Categories" stays lit.
  const onCategoryPage = categoryIds.includes(segment);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" || onCategoryPage : pathname.startsWith(href);

  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
          {title}
        </Link>

        <nav className="nav" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
