"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container, PlaceholderNote, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { evidence } from "@/data/clinic";

/**
 * The before/after comparison, switched OFF by default.
 *
 * Clinical before/after imagery requires the practice's own cases and explicit
 * patient consent for publication. Filling this with stock photography would
 * imply treatment results that never happened, so with
 * `evidence.beforeAfterEnabled` false the section renders the brief for the
 * practice instead of a fabricated comparison.
 */
export interface CasePair {
  id: string;
  category: "Whitening" | "Aligners" | "Restorative" | "Cosmetic";
  label: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

/** Populate only with consented clinical photography from this practice. */
export const cases: CasePair[] = [];

function Comparison({ pair }: { pair: CasePair }) {
  const [value, setValue] = useState(50);

  return (
    <div className="group relative aspect-4/3 w-full select-none overflow-hidden rounded-[22px] bg-surface-2 sm:aspect-16/10">
      <Image src={pair.after.src} alt={pair.after.alt} fill sizes="(max-width: 1024px) 92vw, 70vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image src={pair.before.src} alt={pair.before.alt} fill sizes="(max-width: 1024px) 92vw, 70vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-sage-deep px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_14px_rgba(0,0,0,0.35)]"
        style={{ left: `${value}%` }}
        aria-hidden
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          <MoveHorizontal className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>

      {/* A real range input: dragging, arrow keys and screen-reader output all
          come free from the native control. */}
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
  const live = evidence.beforeAfterEnabled && cases.length > 0;

  return (
    <section className="bg-surface-2/60 py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Results"
          title="Before and after"
          align="center"
          copy={
            live
              ? "Cases from this practice, published with patient consent."
              : "Where this practice's own consented case photography will sit."
          }
        />

        {live ? (
          <>
            <Reveal>
              <div className="mx-auto mt-12 max-w-4xl">
                <Comparison pair={cases[0]} />
              </div>
            </Reveal>
            <p className="mt-5 text-center text-[0.8rem] text-ink-faint">
              Images shown with appropriate patient consent. Individual results vary.
            </p>
          </>
        ) : (
          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl rounded-[22px] border border-dashed border-line bg-surface p-8 text-center sm:p-12">
              <p className="font-display text-[1.4rem] text-ink">
                This section is intentionally empty.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
                A before/after gallery has to show this practice&rsquo;s own cases. Stock
                photography here would imply results that did not happen, so the comparison slider
                stays switched off until real case images are supplied.
              </p>
            </div>
            <PlaceholderNote>
              To enable: add consented case photography to{" "}
              <code className="rounded bg-surface-2 px-1 py-0.5 text-[0.75rem]">cases</code> in this
              file and set{" "}
              <code className="rounded bg-surface-2 px-1 py-0.5 text-[0.75rem]">
                evidence.beforeAfterEnabled
              </code>{" "}
              to true. Written consent for publication must be on file for every image, and the
              consent notice below the gallery must stay.
            </PlaceholderNote>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
