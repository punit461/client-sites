import Link from "next/link";
import { business } from "@/config/business";

/**
 * A faceted blue diamond on navy, after the diamond on the company's van.
 * Replace with the company's own logo file when it supplies one — keep the
 * link and its accessible name.
 */
export function LogoMark({ className = "h-10 w-10", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill="#101D32" stroke={dark ? "#F5F3EE" : "#101D32"} strokeOpacity={dark ? 0.25 : 1} />
      <path d="M14 11h12l5 6H9Z" fill="#8EC3F0" />
      <path d="M9 17h22L20 31Z" fill="#2F7BD0" />
      <path
        d="M14 11h12l5 6-11 14L9 17Zm-5 6h22M14 11l2.5 6L20 11l3.5 6L26 11M16.5 17 20 31l3.5-14"
        fill="none"
        stroke="#F5F3EE"
        strokeWidth="1.1"
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
          Plumbing of Texas
        </span>
      </span>
    </Link>
  );
}
