import Link from "next/link";
import { business } from "@/config/business";

/**
 * Wordmark: a half-red, half-white star on the blue tile, after the star in the
 * logo on the company's vans, and the name in Space Grotesk. Swap in the
 * company's own logo file when it supplies one, keeping the link and label.
 */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="5" fill="#246BFD" />
      <path d="M18 7l2.65 7.36 7.81.24-6.18 4.79 2.19 7.51L18 22.5l-6.47 4.4 2.19-7.51-6.18-4.79 7.81-.24Z" fill="#fff" />
      <path d="M18 7l-2.65 7.36-7.81.24 6.18 4.79-2.19 7.51L18 22.5Z" fill="#E5383B" />
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
