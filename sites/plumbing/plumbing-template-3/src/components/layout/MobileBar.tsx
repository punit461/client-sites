import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/config/business";

/** Call and Request a Quote, one tap away on phones. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2.5 border-t border-line-cool bg-white/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a href={telHref} className="btn btn-outline min-h-12">
        <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
        Call
      </a>
      <Link href="/request-a-quote/" className="btn btn-teal min-h-12">
        Request a Quote
      </Link>
    </div>
  );
}
