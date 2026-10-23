import Link from "next/link";
import { business } from "@/config/business";

/**
 * Placeholder mark: a drop beside a pipe elbow, in copper and ivory on navy.
 * Replace with the company's own logo (an SVG in public/ is ideal) — keep the
 * link and its accessible name.
 */
export function LogoMark({ className = "h-10 w-10", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill="#101D32" stroke={dark ? "#F5F3EE" : "#101D32"} strokeOpacity={dark ? 0.25 : 1} />
      <path d="M11 29V18a7 7 0 0 1 7-7h11" fill="none" stroke="#C87948" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M24.5 19.5c0 0 4.5 5 4.5 8a4.5 4.5 0 0 1-9 0c0-3 4.5-8 4.5-8Z"
        fill="none"
        stroke="#F5F3EE"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${business.name}, home`}>
      <LogoMark dark={dark} />
      <span className="leading-none">
        <span className={`block font-display text-[1.2rem] font-extrabold tracking-tight ${dark ? "text-ivory" : "text-navy"}`}>
          {business.shortName}
        </span>
        <span
          className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${dark ? "text-copper-soft" : "text-copper-ink"}`}
        >
          Plumbing Co.
        </span>
      </span>
    </Link>
  );
}
