"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Item, SNAP, Stagger } from "@/components/motion/Motion";
import { SectionHead } from "@/components/ui/SectionHead";

const steps = [
  { title: "Choose your plumbing service", body: "Pick the problem closest to yours — or tell us it's something else." },
  { title: "Tell us about the issue", body: "What's happening, where, and how urgent. Photos help us prepare." },
  { title: "Arrange a visit or assessment", body: "We call to talk it through and agree a time. It's booked when we confirm it with you." },
  { title: "Review the estimate, approve the work", body: "You get the price in writing. Nothing starts until you say yes." },
];

export function HowItWorks() {
  const still = useReducedMotion();
  return (
    <section aria-labelledby="how-title" className="section-y grid-lines-ink bg-off">
      <div className="shell">
        <SectionHead
          id="how-title"
          label="How it works"
          title="Four steps. No surprises."
          lead="Sending a request starts a conversation — it isn't a confirmed appointment. We always confirm visit times with you directly."
        />
        <div className="relative mt-14">
          {/* The connecting line draws left to right as the steps arrive. */}
          <motion.span
            aria-hidden="true"
            className="absolute top-8 right-0 left-0 hidden h-[3px] origin-left bg-charcoal lg:block"
            initial={still ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.9, ease: SNAP }}
          />
          <Stagger as="ol" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Item key={s.title} className="relative">
                <span
                  className={`relative z-10 grid h-16 w-16 place-items-center rounded-[var(--radius-box)] font-display text-2xl font-bold ${
                    i === steps.length - 1 ? "bg-lime text-charcoal" : "bg-charcoal text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="mt-5 rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white p-6">
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
