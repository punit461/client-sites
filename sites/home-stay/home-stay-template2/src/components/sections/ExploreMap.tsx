"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Container, Icon, Label } from "@/components/ui";
import { placeKinds, places } from "@/data/stay";

const KIND_ICON: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  Waterfall: "compass",
  Viewpoint: "mountainSnow",
  "Coffee estate": "coffee",
  Food: "utensils",
  Adventure: "bike",
  Culture: "sparkles",
};

/**
 * A stylised map, not a real one: hand-placed pins over a drawn landscape.
 * Selecting a pin shows the place beside it. No tile provider, no API key, and
 * nothing that drops a third-party cookie before anyone has agreed to it.
 */
export default function ExploreMap() {
  const still = useReducedMotion();
  const [kind, setKind] = useState<string>("All");
  const [active, setActive] = useState(0);

  const visible = kind === "All" ? places : places.filter((p) => p.kind === kind);
  const current = visible[Math.min(active, visible.length - 1)] ?? places[0];

  return (
    <section id="explore" className="bg-brown py-24 text-cream sm:py-32">
      <Container wide>
        <div className="max-w-2xl">
          <Label className="text-yellow">Explore</Label>
          <h2 className="display-lg mt-5 text-cream">
            Everything worth <span className="hand text-yellow">the drive</span>.
          </h2>
        </div>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Kinds of place">
          {placeKinds.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              aria-controls="explore-panel"
              onClick={() => {
                setKind(k);
                setActive(0);
              }}
              className={`flex-none rounded-full border px-4 py-2 text-[0.82rem] font-medium transition ${
                kind === k
                  ? "border-yellow bg-yellow text-brown"
                  : "border-cream/20 text-cream/75 hover:border-cream/45"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div
          id="explore-panel"
          role="tabpanel"
          aria-label={`${kind} places near the house`}
          className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 [&>*]:min-w-0"
        >
          {/* ------------------------------------------------ the map */}
          <div className="relative aspect-4/3 overflow-hidden rounded-[32px] border border-cream/12 bg-[#2f231c]">
            {/* drawn landscape */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 25%, rgba(143,168,139,0.3), transparent 40%), radial-gradient(circle at 72% 62%, rgba(156,195,213,0.22), transparent 42%), radial-gradient(circle at 48% 88%, rgba(232,184,75,0.16), transparent 40%)",
              }}
              aria-hidden
            />
            <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden>
              <path d="M0 48 Q22 34 42 44 T78 38 T100 46" stroke="#f6eddd" strokeWidth="0.5" fill="none" />
              <path d="M0 62 Q28 56 50 64 T100 58" stroke="#f6eddd" strokeWidth="0.4" fill="none" />
              <path d="M14 0 Q20 26 12 48 T18 75" stroke="#f6eddd" strokeWidth="0.35" fill="none" />
            </svg>

            {/* the property itself */}
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-brown shadow-lg">
                <Icon name="tent" className="h-5 w-5" />
              </span>
              <span className="hand mt-1.5 text-[1.05rem] text-cream">you are here</span>
            </span>

            {visible.map((place, i) => (
              <button
                key={place.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${place.name}, ${place.distance} away`}
                aria-pressed={current.name === place.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${place.x}%`, top: `${place.y}%` }}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                    current.name === place.name
                      ? "scale-110 bg-yellow text-brown ring-4 ring-yellow/25"
                      : "bg-cream/15 text-cream backdrop-blur hover:bg-cream/30"
                  }`}
                >
                  <Icon name={KIND_ICON[place.kind]} className="h-4 w-4" />
                </span>
              </button>
            ))}

            <p className="absolute inset-x-0 bottom-4 text-center text-[0.72rem] text-cream/40">
              Illustrative map — distances are real, positions are not to scale.
            </p>
          </div>

          {/* ------------------------------------------------ detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-[26px] bg-[#2f231c]">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
              </div>

              <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-[0.74rem] text-cream/70">
                <Icon name={KIND_ICON[current.kind]} className="h-3.5 w-3.5" />
                {current.kind}
              </span>

              <h3 className="mt-3 font-display text-[1.7rem] font-bold tracking-tight text-cream">
                {current.name}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/65">{current.copy}</p>

              <dl className="mt-5 flex gap-8 border-t border-cream/12 pt-5 text-[0.86rem]">
                <div>
                  <dt className="label text-cream/45">Distance</dt>
                  <dd className="mt-1 text-cream">{current.distance}</dd>
                </div>
                <div>
                  <dt className="label text-cream/45">Drive</dt>
                  <dd className="mt-1 text-cream">{current.time}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
