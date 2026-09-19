"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, SectionHeading, Stars } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/content";

/**
 * A native scroll-snap rail rather than a JS carousel: swipe, trackpad, arrow
 * keys and the scrollbar all work without being reimplemented, and autoplay is
 * just a periodic scrollBy that stops the moment anyone interacts.
 */
export default function Testimonials() {
  const rail = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const scrollToCard = useCallback((i: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const next = (i + dir + testimonials.length) % testimonials.length;
        scrollToCard(next);
        return next;
      });
    },
    [scrollToCard],
  );

  // Autoplay, off for reduced motion and while the user is in the rail.
  useEffect(() => {
    if (still || paused) return undefined;
    const id = window.setInterval(() => step(1), 5200);
    return () => window.clearInterval(id);
  }, [still, paused, step]);

  // Keep the dots in step when the rail is scrolled by hand.
  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const mid = el.scrollLeft + el.clientWidth / 2;
        const nearest = cards.reduce(
          (best, card, i) =>
            Math.abs(card.offsetLeft - el.offsetLeft + card.clientWidth / 2 - mid) < best.d
              ? { i, d: Math.abs(card.offsetLeft - el.offsetLeft + card.clientWidth / 2 - mid) }
              : best,
          { i: 0, d: Infinity },
        );
        setIndex(nearest.i);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      aria-label="Customer reviews"
      className="overflow-hidden py-20 sm:py-28"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Reviews"
            title="What people actually say"
            copy="Collected after delivery, published unedited."
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent hover:text-accent"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent hover:text-accent"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <Reveal>
        <div
          ref={rail}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(3rem,calc((100vw-1440px)/2+3rem))]"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              className="flex w-[min(21rem,82vw)] flex-none snap-start flex-col rounded-[22px] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
              whileHover={still ? undefined : { y: -6 }}
            >
              <Quote className="h-7 w-7 text-accent/25" strokeWidth={1.6} aria-hidden />

              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>

              <Stars rating={t.rating} className="mt-5" />

              <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <Image
                  src={t.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 flex-none rounded-full object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[0.9rem] font-semibold text-ink">{t.name}</span>
                  <span className="block truncate text-[0.76rem] text-ink-faint">
                    {t.location} · {t.service}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Reveal>

      <Container wide>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => {
                setIndex(i);
                scrollToCard(i);
              }}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-accent" : "w-1.5 bg-line hover:bg-ink-faint"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
