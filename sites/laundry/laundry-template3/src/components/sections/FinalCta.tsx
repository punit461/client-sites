"use client";

import { ArrowRight, Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingProvider";
import { Aurora, Magnetic, WordReveal } from "@/components/motion";
import { Container } from "@/components/ui/primitives";
import { contact } from "@/data/site";
import { img } from "@/lib/images";

const ASSURANCES = [
  { icon: Truck, label: "Collection tonight if you book before 4 PM" },
  { icon: Clock, label: "Back within 24 hours on Signature and above" },
  { icon: ShieldCheck, label: "Insured door to door, every garment" },
] as const;

export default function FinalCta() {
  const { open } = useBooking();

  return (
    <section className="relative isolate overflow-hidden bg-night">
      <Image
        src={img.finalCta}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/85 to-night" aria-hidden />
      <Aurora className="-z-10" />

      <Container className="relative py-28 text-center sm:py-36">
        <WordReveal
          text="Give us the laundry. Keep the evening."
          className="display-xl mx-auto max-w-[14ch] font-semibold text-mist"
        />

        <p className="mx-auto mt-7 max-w-lg text-[1.05rem] leading-relaxed text-mist-soft">
          Book a first collection in about a minute. Nothing is charged until the bag is weighed,
          and there is no membership to commit to on the way in.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={() => open()}
              className="group inline-flex items-center gap-2 rounded-full bg-ice px-9 py-4 text-[1rem] font-semibold text-night transition hover:bg-ice-deep"
            >
              Book a collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-[0.95rem] font-semibold text-mist transition hover:border-ice/60 hover:bg-white/5"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {contact.phone}
          </a>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
          {ASSURANCES.map(({ icon: Glyph, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 rounded-panel border border-line bg-deep/60 px-5 py-6"
            >
              <Glyph className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-[0.85rem] leading-snug text-mist-soft">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
