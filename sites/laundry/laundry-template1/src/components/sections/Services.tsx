"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export default function Services() {
  const { open } = useBooking();

  return (
    <section id="services" className="py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="What we do"
          title="Everything your wardrobe needs"
          copy="Four services, one pickup. Mix them freely in a single bag — we sort it at the facility."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={staggerItem}
              className="group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-5/4 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />

                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/92 text-accent shadow-sm backdrop-blur">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>

                <span className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1 text-[0.72rem] font-bold text-ink backdrop-blur">
                  From {service.from}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[1.32rem] text-ink">{service.name}</h3>
                <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
                  {service.blurb}
                </p>

                <button
                  type="button"
                  onClick={() => open(service.id)}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-[0.85rem] font-semibold text-accent-dark transition-colors hover:text-accent"
                >
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
