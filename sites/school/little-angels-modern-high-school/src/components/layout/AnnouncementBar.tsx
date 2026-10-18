import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { admissions } from "@/data/site";

/** The one thing every visitor should see first while admissions are open. */
export default function AnnouncementBar() {
  if (!admissions.open) return null;
  return (
    <div className="bg-navy-dark text-white">
      <Link
        href="/admissions/"
        className="mx-auto flex max-w-[1400px] items-center justify-center gap-2 px-4 py-2.5 text-center text-[0.8rem] font-medium sm:text-sm"
      >
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold-bright motion-safe:animate-pulse" aria-hidden />
        <span>{admissions.label}</span>
        <span className="hidden items-center gap-1 font-semibold text-gold-bright sm:inline-flex">
          Enquire now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </Link>
    </div>
  );
}
