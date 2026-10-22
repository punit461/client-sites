"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "./Reveal";

/** An image frame that wipes open from one side as it enters the viewport. */
export default function ClipReveal({
  children,
  className,
  from = "left",
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "bottom";
}) {
  const still = useReducedMotion();
  // Name the resting value: hydration would otherwise keep the clipped style the export baked in.
  if (still)
    return (
      <motion.div className={className} initial={false} animate={{ clipPath: "inset(0 0% 0 0)" }}>
        {children}
      </motion.div>
    );
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
