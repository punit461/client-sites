"use client";

import { Phone, Siren } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { contact } from "@/data/clinic";

/**
 * Visually distinct, but calm. This panel routes people to a human — it never
 * attempts to assess what is wrong, and it names the one situation that should
 * bypass the practice entirely.
 */
export default function UrgentCare() {
  const { open } = useBooking();

  return (
    <section id="urgent" className="py-10 sm:py-14">
      <Container wide>
        <Reveal>
          <div className="overflow-hidden rounded-[24px] border border-terracotta/30 bg-terracotta/[0.07]">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta/15 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-terracotta-deep">
                  <Siren className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  Urgent care
                </span>

                <h2 className="display-md mt-4 text-ink">Need urgent dental care?</h2>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
                  If you are experiencing significant dental pain or another urgent dental concern,
                  contact the clinic to discuss the appropriate next step.
                </p>
                <p className="mt-3 max-w-xl text-[0.85rem] leading-relaxed text-ink-soft">
                  This website cannot assess a dental problem. If you have facial swelling that is
                  affecting your breathing, swallowing or vision, treat it as a medical emergency
                  and contact your local emergency service.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-terracotta-deep"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Call the clinic
                </a>
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-ink/30"
                >
                  Request an appointment
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
