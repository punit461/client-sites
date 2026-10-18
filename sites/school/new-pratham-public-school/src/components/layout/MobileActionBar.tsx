"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, whatsappLink } from "@/data/school";

/**
 * The phone-sized conversion path. It appears once the hero's own buttons have
 * scrolled away, so the first screen is not covered by a duplicate of what is
 * already on it.
 */
export default function MobileActionBar() {
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="flex items-center gap-2">
            <a
              href={`tel:${contact.phoneDial}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface text-[0.88rem] font-semibold text-ink"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Call
            </a>
            <a
              href={whatsappLink("Hello New Pratham Public School, I would like to know more about admissions.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-leaf text-[0.88rem] font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              WhatsApp
            </a>
            <Link
              href="/admissions"
              className="inline-flex h-12 flex-[1.3] items-center justify-center gap-2 rounded-full bg-coral text-[0.88rem] font-semibold text-white"
            >
              <GraduationCap className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Admissions
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
