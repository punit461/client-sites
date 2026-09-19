"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import Reveal, { Stagger, staggerItem } from "@/components/ui/Reveal";
import { features } from "@/data/content";
import { img } from "@/lib/images";

/**
 * Deliberately asymmetric: a tall image column that starts above the grid and
 * runs past it, so the section does not read as another four-by-two card wall.
 */
export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          {/* ------------------------------------------------- left rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Why FreshFold"
              title="Built around the bit you hate"
              copy="Nobody minds clean clothes. People mind the sorting, the waiting and the trip. So we took those out."
            />

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Reveal delay={0.05}>
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
                  <Image
                    src={img.facility}
                    alt="Inside the cleaning facility"
                    fill
                    sizes="(max-width: 1024px) 45vw, 13rem"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="relative mt-8 aspect-3/4 overflow-hidden rounded-2xl">
                  <Image
                    src={img.wardrobe}
                    alt="A wardrobe of cleaned, pressed clothes"
                    fill
                    sizes="(max-width: 1024px) 45vw, 13rem"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* ---------------------------------------------------- grid */}
          <Stagger className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem} className="group">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-sans text-[1.02rem] font-bold tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{feature.copy}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
