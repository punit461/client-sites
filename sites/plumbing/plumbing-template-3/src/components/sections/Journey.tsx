"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { FLOW } from "@/components/motion/Motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

const steps: { title: string; body: string; icon: IconName }[] = [
  { title: "Tell us what's happening", body: "Call, or send a quote request describing the problem. Photos help.", icon: "message" },
  { title: "Request a service visit", body: "We get in touch to talk it through and agree a time. It's booked only when we confirm it with you.", icon: "calendar" },
  { title: "Review the assessment and estimate", body: "We explain what we found, your options, and the price for each.", icon: "file" },
  { title: "Approve the work and receive service", body: "Nothing starts until you say yes. We finish, test, and tidy up.", icon: "check" },
];

/**
 * Horizontal timeline on wide screens, vertical on narrow ones. As the section
 * enters the viewport the connecting line flows along and each step's marker
 * fills in turn.
 */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const on = still || inView;

  return (
    <section aria-labelledby="journey-title" className="section-y bg-white">
      <div className="shell">
        <SectionHead
          id="journey-title"
          eyebrow="How it works"
          title="Four calm steps from problem to fixed."
          lead={
            <>
              Sending a request starts a conversation — <strong className="font-semibold text-teal">it doesn&apos;t confirm an appointment.</strong> We
              always agree visit times with you directly.
            </>
          }
        />
        <ol ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* The flowing line: vertical on narrow screens, horizontal on wide. */}
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-line-cool lg:top-6 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-6 w-px origin-top bg-teal lg:hidden"
            initial={false}
            animate={{ scaleY: on ? 1 : 0 }}
            transition={{ duration: still ? 0 : 1.1, ease: FLOW }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-teal lg:block"
            initial={false}
            animate={{ scaleX: on ? 1 : 0 }}
            transition={{ duration: still ? 0 : 1.1, ease: FLOW }}
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              <motion.span
                className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-teal font-display font-bold"
                initial={false}
                animate={on ? { backgroundColor: "#164E4A", color: "#FFFFFF", scale: 1 } : { backgroundColor: "#FFFFFF", color: "#164E4A", scale: 0.85 }}
                transition={{ duration: still ? 0 : 0.4, delay: still ? 0 : 0.15 + i * 0.22, ease: FLOW }}
              >
                {i + 1}
              </motion.span>
              <div className="pt-2 lg:mt-6 lg:pt-0">
                <Icon name={s.icon} className="hidden h-6 w-6 text-clay lg:mx-auto lg:block" />
                <h3 className="t-h3 lg:mt-3">{s.title}</h3>
                <p className="mt-2 text-muted lg:mx-auto lg:max-w-[15rem]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
