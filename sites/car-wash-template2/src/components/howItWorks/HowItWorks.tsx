"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/animations";

const steps = [
  {
    number: 1,
    title: "Choose Your Service",
    description:
      "Browse our range of premium car care services and pick the one that suits your needs.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Book Your Slot",
    description:
      "Select your preferred date and time. We'll confirm your booking instantly.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "We Clean Your Car",
    description:
      "Sit back and relax while our professionals work their magic on your vehicle.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Drive Away Fresh",
    description:
      "Drive away with a spotless, gleaming car that looks brand new.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a.75.75 0 00.75-.75V11.25a3 3 0 00-3-3h-1.5l-1.72-4.575A1.5 1.5 0 0013.1 2.25H10.9a1.5 1.5 0 00-1.43 1.025L7.75 7.875H6a3 3 0 00-3 3v5.625c0 .621.504 1.125 1.125 1.125h14.25" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const desktopInView = useInView(desktopRef, { once: true, margin: "-80px" });
  const mobileInView = useInView(mobileRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-primary-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Simple Steps to a{" "}
            <span className="text-gradient-orange">Cleaner Car</span>
          </h2>
        </motion.div>

        {/* Desktop layout */}
        <motion.div
          ref={desktopRef}
          variants={staggerContainer}
          initial="hidden"
          animate={desktopInView ? "visible" : "hidden"}
          className="relative hidden lg:grid lg:grid-cols-4 lg:gap-8"
        >
          {/* Connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 gradient-orange flex h-16 w-16 items-center justify-center rounded-full text-white shadow-orange">
                {step.icon}
              </div>
              <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-text-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile layout */}
        <motion.div
          ref={mobileRef}
          variants={staggerContainer}
          initial="hidden"
          animate={mobileInView ? "visible" : "hidden"}
          className="space-y-0 lg:hidden"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex gap-4"
            >
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 gradient-orange flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-orange">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-primary/10 min-h-[2rem]" />
                )}
              </div>

              {/* Right: content */}
              <div className="pt-1 pb-8">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
