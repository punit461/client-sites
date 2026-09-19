"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Truck } from "lucide-react";
import { brand } from "@/data/site";

/**
 * Scrolls away with the page rather than sticking — it is an offer, not
 * navigation, and a permanently pinned strip eats a phone's viewport.
 */
export default function AnnouncementBar() {
  const still = useReducedMotion();
  if (!brand.announcement) return null;

  return (
    <div className="relative z-40 bg-ink text-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2.5 px-4 py-2.5 text-center">
        <motion.span
          className="flex-none text-accent"
          animate={still ? undefined : { x: [-2, 2, -2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Truck className="h-4 w-4" strokeWidth={1.8} />
        </motion.span>

        <p className="text-[0.76rem] font-medium tracking-wide sm:text-[0.82rem]">
          {brand.announcement}
        </p>

        <motion.span
          className="flex-none text-accent"
          animate={still ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
        </motion.span>
      </div>
    </div>
  );
}
