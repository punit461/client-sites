"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navigation, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "@/data/site";

/**
 * On a phone, what a parent most often wants is to call or to find the gate.
 * The bar appears only once the hero's own buttons have scrolled away.
 */
export default function MobileCtaBar() {
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
      {show ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={contact.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface text-[0.92rem] font-bold text-ink"
            >
              <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden />
              Directions
            </a>
            <a
              href={contact.phoneHref}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[0.92rem] font-bold text-white"
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
              Call school
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
