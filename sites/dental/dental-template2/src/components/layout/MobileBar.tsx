"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contact } from "@/data/group";
import { locations } from "@/data/locations";

/** Book · Call · Directions — the three things a patient needs on a phone. */
export default function MobileBar() {
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    locations[0].mapsQuery,
  )}`;

  return (
    <AnimatePresence>
      {show ? (
        <motion.nav
          aria-label="Quick actions"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <ul className="flex items-center gap-2">
            <li className="flex-1">
              <Link
                href="/book"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-[0.88rem] font-semibold text-paper"
              >
                <CalendarDays className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Book
              </Link>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneDial}`}
                aria-label="Call us"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink"
              >
                <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
              </a>
            </li>
            <li>
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                aria-label="Get directions"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink"
              >
                <Navigation className="h-4.5 w-4.5" strokeWidth={1.8} />
              </a>
            </li>
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
