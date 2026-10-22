"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up the first time it scrolls into view. The exported
 * HTML holds the real figure, so it is correct without JavaScript, for search
 * engines, and for anyone who prefers reduced motion.
 */
export default function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const [shown, setShown] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (still) return;
    // Below the fold on load: drop to zero where no one can see it, ready to count.
    if (!inView && !armed.current) {
      armed.current = true;
      setShown(0);
      return;
    }
    if (inView && armed.current) {
      const controls = animate(0, value, {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setShown(Math.round(v * 10 ** decimals) / 10 ** decimals),
      });
      return () => controls.stop();
    }
  }, [inView, still, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shown.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
