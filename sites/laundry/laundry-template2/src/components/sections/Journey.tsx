"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { journey, type Stage } from "@/data/content";

/** useLayoutEffect warns during SSR; this picks the right one per environment. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  return (
    <article className="flex w-[82vw] flex-none flex-col sm:w-[58vw] lg:w-[36vw] xl:w-[30vw]">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[28px] bg-paper-2">
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 36vw"
          className="object-cover"
        />
        <span className="numeral absolute bottom-4 left-5 text-[clamp(3rem,5vw,4.5rem)] text-paper [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {stage.n}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold uppercase leading-none tracking-tight text-ink">
        {stage.title}
      </h3>
      <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">{stage.copy}</p>
      <span className="sr-only">
        Stage {index + 1} of {journey.length}
      </span>
    </article>
  );
}

export default function Journey() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const [distance, setDistance] = useState(0);

  // How far the rail has to travel: its own width minus one screen.
  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const railWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="bg-paper-2/60">
      {/* ---------------------------------------------------- mobile: stacked */}
      <div className="lg:hidden">
        <Container className="py-20">
          <Label>The journey</Label>
          <TextReveal text="Six stages, start to finish." className="type-xl mt-5 max-w-[13ch] text-ink" />

          <div className="mt-12 space-y-12">
            {journey.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 0.04}>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[28px] bg-paper">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="92vw"
                    className="object-cover"
                  />
                  <span className="numeral absolute bottom-4 left-5 text-[3.5rem] text-paper [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                    {stage.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.7rem] font-bold uppercase leading-none tracking-tight text-ink">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-soft">{stage.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* --------------------------------------- desktop: sticky horizontal */}
      {/* The tall outer element is the scroll budget; the sticky inner pane is
          what stays on screen while the rail translates across it. */}
      {/* With reduced motion there is no scroll-driven translation, so the tall
          scroll budget and the sticky pane are dropped and the rail becomes an
          ordinary horizontally-scrollable region — otherwise stages 2-6 would
          sit off-screen with no way to reach them. */}
      <div
        ref={section}
        className="relative hidden lg:block"
        style={still ? undefined : { height: `${journey.length * 46 + 60}vh` }}
      >
        <div
          className={`flex flex-col justify-center overflow-hidden ${
            still ? "" : "sticky top-0 h-screen"
          }`}
        >
          <Container wide className="flex-none pb-10 pt-24">
            <div className="flex items-end justify-between gap-8">
              <div>
                <Label>The journey</Label>
                <h2 className="type-xl mt-5 max-w-[13ch] text-ink">Six stages, start to finish.</h2>
              </div>
              <p className="mb-2 max-w-xs text-[0.9rem] leading-relaxed text-ink-soft">
                Keep scrolling — the rail moves sideways while the page moves down.
              </p>
            </div>
          </Container>

          <div className={`min-h-0 flex-1 pb-8 ${still ? "overflow-x-auto" : ""}`}>
            <motion.div
              ref={track}
              className="flex h-full items-center gap-8 pl-[max(3rem,calc((100vw-1560px)/2+3rem))] pr-12"
              style={still ? undefined : { x }}
            >
              {journey.map((stage, i) => (
                <StageCard key={stage.n} stage={stage} index={i} />
              ))}
            </motion.div>
          </div>

          {/* progress rail — meaningless without the scroll-driven translation */}
          {!still ? (
            <Container wide className="flex-none pb-10">
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-ink/12" aria-hidden>
                <motion.div className="h-full rounded-full bg-ink" style={{ width: railWidth }} />
              </div>
            </Container>
          ) : null}
        </div>
      </div>
    </section>
  );
}
