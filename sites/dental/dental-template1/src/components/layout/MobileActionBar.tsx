"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { contact } from "@/data/clinic";

/**
 * The phone-sized conversion path. It appears once the hero's own buttons have
 * scrolled away, so the first screen is not covered by a duplicate of what is
 * already on it, and hides while the booking dialog is open.
 */
export default function MobileActionBar() {
  const { open, isOpen } = useBooking();
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
      {show && !isOpen ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${contact.phoneDial}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface text-[0.9rem] font-semibold text-ink"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Call
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-terracotta text-[0.9rem] font-semibold text-white"
            >
              <CalendarDays className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Book appointment
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
