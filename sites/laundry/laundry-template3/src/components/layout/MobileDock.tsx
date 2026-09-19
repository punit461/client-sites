"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarPlus, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { contact } from "@/data/site";

/**
 * The phone-only action bar. It appears once the hero is behind you, so the
 * hero's own buttons are never competing with a duplicate of themselves, and
 * it carries the safe-area inset so it clears an iPhone's home indicator.
 */
export default function MobileDock() {
  const { open, isOpen } = useBooking();
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !isOpen ? (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-[80] lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={still ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={still ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="panel flex items-center gap-2 rounded-full p-2">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${contact.phone}`}
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/12 text-mist transition hover:border-ice/60 hover:text-ice"
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden />
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/12 text-mist transition hover:border-ice/60 hover:text-ice"
            >
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ice text-[0.92rem] font-semibold text-night transition hover:bg-ice-deep"
            >
              <CalendarPlus className="h-[18px] w-[18px]" aria-hidden />
              Book a collection
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
