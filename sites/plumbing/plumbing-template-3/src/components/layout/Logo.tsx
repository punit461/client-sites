import Link from "next/link";
import { business } from "@/config/business";

/**
 * Placeholder mark: two flowing lines in a soft square — water through a pipe
 * bend. Replace with the company's own logo, keeping the link and its label.
 */
export function Mark({ className = "h-10 w-10", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill={light ? "#F3EBDD" : "#164E4A"} />
      <path d="M9 15c5 0 6 5 11 5s6-5 11-5" fill="none" stroke={light ? "#164E4A" : "#F3EBDD"} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 24c5 0 6 5 11 5s6-5 11-5" fill="none" stroke="#C86F52" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label={`${business.name}, home`} className="flex shrink-0 items-center gap-2.5">
      <Mark light={light} />
      <span className={`font-display text-[1.25rem] font-extrabold tracking-[-0.03em] ${light ? "text-white" : "text-teal"}`}>
        Clear<span className={light ? "text-sage" : "text-clay"}>Flow</span>
      </span>
    </Link>
  );
}
