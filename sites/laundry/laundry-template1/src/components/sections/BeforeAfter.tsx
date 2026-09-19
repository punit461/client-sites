"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { img } from "@/lib/images";

const PAIRS = [
  {
    id: "press",
    label: "A basket of washing, before and after",
    before: { src: img.beforeWrinkled, alt: "A basket of crumpled, unwashed clothes" },
    after: { src: img.afterPressed, alt: "The same clothes washed, pressed and folded" },
  },
] as const;

/**
 * A comparison slider built on a real range input. Dragging it works because
 * that is what a range input does; so do arrow keys, Home/End and a screen
 * reader announcing a percentage — none of which a div with pointer handlers
 * would give us.
 */
function Comparison({ pair }: { pair: (typeof PAIRS)[number] }) {
  const [value, setValue] = useState(50);

  return (
    <div className="group relative aspect-4/3 w-full select-none overflow-hidden rounded-[26px] bg-surface-2 shadow-[var(--shadow-lift)] sm:aspect-16/10">
      {/* after — the full frame, uncovered as the handle moves right */}
      <Image
        src={pair.after.src}
        alt={pair.after.alt}
        fill
        sizes="(max-width: 1024px) 92vw, 70vw"
        className="object-cover"
      />

      {/* before — clipped from the left, so "before" really is on the left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={pair.before.src}
          alt={pair.before.alt}
          fill
          sizes="(max-width: 1024px) 92vw, 70vw"
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white">
        After
      </span>

      {/* the seam and its grip */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_14px_rgba(0,0,0,0.35)]"
        style={{ left: `${value}%` }}
        aria-hidden
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform duration-200 group-hover:scale-110">
          <MoveHorizontal className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={pair.label}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="The difference"
            title="Drag it. That is the whole pitch."
            copy="One basket of washing, photographed on the way in and on the way back out. Drag the handle to see the difference."
          />

          <Reveal>
            {PAIRS.map((pair) => (
              <Comparison key={pair.id} pair={pair} />
            ))}
            <p className="mt-4 text-center text-xs text-ink-faint">
              Drag the handle, or focus it and use the arrow keys.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
