"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingProvider";
import { Stagger, staggerItem, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { bento, type BentoItem } from "@/data/content";

/**
 * Card footprints inside the 6-column bento at lg and up. The set is chosen so
 * the rows fill exactly: 3+2+1, then 1+2 under the tall card, then a full-width
 * banner — no half-empty row at the end.
 */
const SPANS: Record<BentoItem["span"], string> = {
  wide: "lg:col-span-6",
  lg: "lg:col-span-3 lg:row-span-2",
  md: "lg:col-span-2",
  sm: "lg:col-span-1",
};

const HEIGHTS: Record<BentoItem["span"], string> = {
  wide: "min-h-[20rem] lg:min-h-[21rem]",
  lg: "min-h-[22rem] lg:min-h-[30rem]",
  md: "min-h-[18rem] lg:min-h-[14.5rem]",
  sm: "min-h-[16rem] lg:min-h-[14.5rem]",
};

export default function BentoServices() {
  const { open } = useBooking();

  return (
    <section id="services" className="bg-paper pb-24 sm:pb-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <div>
            <Label>Services</Label>
            <TextReveal
              text="Everything, one bag."
              className="type-xl mt-5 max-w-[12ch] text-ink"
            />
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
            Mix as many of these as you like in a single pickup. Sorting is our problem, not yours.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {bento.map((item) => (
            <motion.article
              key={item.id}
              variants={staggerItem}
              className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-[28px] bg-ink p-6 ${SPANS[item.span]} ${HEIGHTS[item.span]}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 40vw"
                className="-z-20 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              {/* Gradient deepens on hover — the "gradient overlay" interaction. */}
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                aria-hidden
              />

              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-paper/12 text-paper backdrop-blur transition-all duration-300 group-hover:bg-lime group-hover:text-ink">
                <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>

              <span className="label absolute left-6 top-6 text-lime">{item.from}</span>

              {/* Text lifts slightly on hover — the "text movement". */}
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <h3
                  className={`font-display font-bold uppercase leading-none tracking-tight text-paper ${
                    item.span === "lg" || item.span === "wide"
                      ? "text-[clamp(1.8rem,3vw,2.75rem)]"
                      : "text-[1.45rem]"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`mt-3 text-[0.88rem] leading-relaxed text-paper/65 ${
                    item.span === "lg" || item.span === "wide" ? "max-w-sm" : "max-w-xs"
                  }`}
                >
                  {item.copy}
                </p>

                <button
                  type="button"
                  onClick={() => open()}
                  className="label mt-5 inline-flex items-center gap-1.5 text-paper underline-offset-4 transition hover:text-lime hover:underline"
                >
                  Book this
                </button>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
