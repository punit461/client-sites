"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The site's one entrance animation. Everything uses it, so the page reads as
 * a single system rather than a pile of effects.
 *
 * Under `prefers-reduced-motion` the element is rendered in place. It names
 * the resting values instead of dropping the animation altogether, because the
 * exported HTML has `opacity: 0` baked into the markup — a bare tag would hand
 * a reader who asked for less motion invisible text.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span" | "h2" | "p";
}) {
  const still = useReducedMotion();
  const Tag = motion[as];

  if (still) {
    return (
      <Tag className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const still = useReducedMotion();
  const Tag = motion[as];

  // The exported HTML already carries the hidden variant on every child, so
  // dropping the parent variants would leave them at opacity 0 for good.
  // Resolve straight to "show" instead: rendered in place, never animated.
  if (still) {
    return (
      <Tag className={className} variants={staggerParent} initial={false} animate="show">
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </Tag>
  );
}

/**
 * Word-by-word reveal for the headings that carry a section.
 *
 * Splitting on words rather than characters keeps the text selectable, and the
 * animated copy is hidden from assistive technology behind a plain `sr-only`
 * sentence — a screen reader gets one heading, not a stream of fragments.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const still = useReducedMotion();
  if (still) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: { y: 0, transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * The drifting light behind the dark sections. Two blurred radial blobs on a
 * long, offset loop, which is enough to keep near-black from looking flat
 * without anything moving fast enough to notice.
 *
 * It is decorative, so it disappears entirely under reduced motion rather than
 * sitting still — a static blob adds nothing but a paint cost.
 */
export function Aurora({ className = "" }: { className?: string }) {
  const still = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute -left-[18%] -top-[28%] h-[46rem] w-[46rem] rounded-full bg-ice/12 blur-[130px]"
        animate={still ? undefined : { x: [0, 90, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[14%] top-[22%] h-[38rem] w-[38rem] rounded-full bg-gold/10 blur-[140px]"
        animate={still ? undefined : { x: [0, -70, 0], y: [0, 70, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}

/**
 * A soft light that trails the pointer across a section.
 *
 * Pointer-only on purpose: it listens on the element it decorates and springs
 * back when the pointer leaves, so touch and keyboard users simply never see
 * it. Returns motion values the caller positions, because the glow belongs
 * behind the section's own content rather than on top of it.
 */
export function usePointerGlow(ref: React.RefObject<HTMLElement | null>): {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  enabled: boolean;
} {
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lit = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });
  const opacity = useSpring(lit, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return undefined;

    const onMove = (event: PointerEvent) => {
      // Coarse pointers "move" once on tap; only a real pointer lights it.
      if (event.pointerType !== "mouse") return;
      const box = el.getBoundingClientRect();
      x.set(event.clientX - box.left);
      y.set(event.clientY - box.top);
      lit.set(1);
    };
    const onLeave = () => lit.set(0);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, still, x, y, lit]);

  return { x: sx, y: sy, opacity, enabled: !still };
}

/**
 * A control that leans towards the cursor. Pointer-driven and spring-damped,
 * so touch and keyboard users get an ordinary, stationary button.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.35 });

  if (still) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        x.set((event.clientX - (box.left + box.width / 2)) * strength);
        y.set((event.clientY - (box.top + box.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Turns a 0–1 progress value into a `scaleY` for the timeline's fill line. */
export function useProgressScale(progress: MotionValue<number>) {
  return useTransform(progress, [0, 1], [0, 1]);
}
