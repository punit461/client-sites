"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Moves its child a little slower than the page. The child should be larger
 * than the frame (the wrapper adds 12% of headroom) so no edge ever shows.
 */
export default function Parallax({ children, className, strength = 10 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? "relative"}`}>
      <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={still ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
