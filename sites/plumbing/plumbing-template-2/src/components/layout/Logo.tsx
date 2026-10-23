import Link from "next/link";
import { business } from "@/config/business";

/**
 * Placeholder wordmark: a blue square with a lime flow line, and the name in
 * Space Grotesk. Swap in the company's own logo, keeping the link and label.
 */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="5" fill="#246BFD" />
      <path d="M8 12h11a5 5 0 0 1 5 5v0a5 5 0 0 0 5 5" fill="none" stroke="#C7F36B" strokeWidth="3" strokeLinecap="square" />
      <path d="M8 24h7" stroke="#fff" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" aria-label={`${business.name}, home`} className="flex shrink-0 items-center gap-2.5">
      <Mark />
      <span className="font-display text-[1.3rem] font-bold tracking-[-0.03em] text-white">
        {business.shortName}
        <span className="text-lime">.</span>
      </span>
    </Link>
  );
}
