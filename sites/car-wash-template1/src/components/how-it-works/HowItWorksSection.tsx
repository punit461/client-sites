"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description: "Browse our range of premium car care services and pick what suits your needs.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Book Your Slot",
    description: "Select your preferred date, time, and location. We come to you!",
    icon: "📅",
  },
  {
    number: "03",
    title: "We Clean Your Car",
    description: "Our trained professionals work their magic with premium products.",
    icon: "🧽",
  },
  {
    number: "04",
    title: "Drive Away Fresh",
    description: "Enjoy your spotlessly clean, fresh-smelling vehicle. Simple as that!",
    icon: "🚗",
  },
];

export default function HowItWorksSection() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <Container>
        <SectionHeading
          subtitle="How It Works"
          title="4 Simple Steps to a Cleaner Car"
          description="Our streamlined process makes getting your car detailed easier than ever."
        />

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 origin-left"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-card border border-border flex items-center justify-center group hover:border-primary/40 transition-colors">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="text-primary font-black text-sm tracking-widest mb-2">
                  STEP {step.number}
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
