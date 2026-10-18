import Link from "next/link";
import { school } from "@/data/school";

/**
 * The school's mark: an open book under a rising star, in the coral of the
 * building. Drawn inline so it needs no image request and scales crisply.
 */
export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="13" fill="#e4572e" />
      <path
        d="M10 31.5V16.8c4.6-1.9 9.3-1.6 14 .9 4.7-2.5 9.4-2.8 14-.9v14.7c-4.6-1.9-9.3-1.6-14 .9-4.7-2.5-9.4-2.8-14-.9Z"
        fill="#fff"
      />
      <path d="M24 17.7v14.7" stroke="#e4572e" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="m24 6.5 1.7 3.5 3.8.5-2.8 2.7.7 3.8L24 15.2 20.6 17l.7-3.8-2.8-2.7 3.8-.5Z"
        fill="#f4b740"
      />
    </svg>
  );
}

export default function Wordmark({
  className = "",
  light = false,
  compact = false,
}: {
  className?: string;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label={`${school.name} — home`}>
      <Mark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1rem] font-semibold tracking-[-0.01em] sm:text-[1.2rem] ${light ? "text-cream" : "text-ink"}`}>
          {school.name}
        </span>
        <span className={`mt-1 hidden text-[0.6rem] font-bold uppercase tracking-[0.2em] sm:block ${light ? "text-cream/55" : "text-ink-faint"}`}>
          {school.affiliation} · {school.affiliationNumber}
        </span>
      </span>
    </Link>
  );
}
