import { Phone } from "lucide-react";
import Link from "next/link";
import { telHref } from "@/config/business";

/** Call and quote, always one tap away on small screens. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={telHref} className="btn btn-outline min-h-12 bg-white">
          <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          Call
        </a>
        <Link href="/request-a-quote/" className="btn btn-primary min-h-12">
          Request Quote
        </Link>
      </div>
    </div>
  );
}
