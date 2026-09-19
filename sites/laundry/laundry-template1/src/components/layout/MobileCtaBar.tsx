"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { contact } from "@/data/site";

/**
 * The phone-sized conversion path. It appears only once the hero's own CTA has
 * scrolled away, so the first screen is not covered by a duplicate of the
 * button already on it.
 */
export default function MobileCtaBar() {
  const { open, isOpen } = useBooking();
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !isOpen ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-line bg-surface text-ink"
              aria-label={`Call ${contact.phone}`}
            >
              <Phone className="h-5 w-5" strokeWidth={1.8} />
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[0.92rem] font-semibold text-white"
            >
              <CalendarDays className="h-4.5 w-4.5" strokeWidth={1.9} />
              Schedule pickup
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
