import { Phone } from "lucide-react";
import Link from "next/link";
import { telHref } from "@/config/business";

/** Call and estimate, one tap away on phones. */
export function MobileBar() {
  return (
    <div className="dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rule-dark bg-charcoal p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={telHref} className="btn btn-line-light min-h-12">
        <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        Call now
      </a>
      <Link href="/request-a-quote/" className="btn btn-lime min-h-12">
        Get an Estimate
      </Link>
    </div>
  );
}
