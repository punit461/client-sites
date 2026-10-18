import Link from "next/link";
import { MessageCircle, Phone, School } from "lucide-react";
import { contact, whatsappLink } from "@/data/site";

/**
 * On a phone the three things a parent wants are one thumb away. The footer
 * reserves space for this bar so it never covers the last line of the page.
 */
export default function MobileCtaBar() {
  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.72rem] font-semibold";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <a href={contact.phoneHref} className={`${item} text-navy`}>
        <Phone className="h-5 w-5" aria-hidden />
        Call
      </a>
      <a href={whatsappLink("Hello, I would like to know about admissions at Little Angels Modern High School.")} target="_blank" rel="noopener noreferrer" className={`${item} text-[#1a8a4a]`}>
        <MessageCircle className="h-5 w-5" aria-hidden />
        WhatsApp
      </a>
      <Link href="/admissions/" className={`${item} bg-gold-bright text-navy-dark`}>
        <School className="h-5 w-5" aria-hidden />
        Admissions
      </Link>
    </nav>
  );
}
