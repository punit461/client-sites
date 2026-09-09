"use client";

import { motion } from "framer-motion";
import { fadeLeft } from "@/utils/animations";

const features = [
  "Professional Equipment",
  "Eco-Friendly Products",
  "Experienced Team",
  "Premium Finish",
];

export default function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column — Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-24 w-24 text-primary/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a.75.75 0 00.75-.75V11.25a3 3 0 00-3-3h-1.5l-1.72-4.575A1.5 1.5 0 0014.25 2H9.75a1.5 1.5 0 00-1.41.975L6.62 7.5H3.75a3 3 0 00-3 3v6.375c0 .621.504 1.125 1.125 1.125h2.25"
                    />
                  </svg>
                  <div className="absolute top-1/3 left-1/4 h-16 w-16 rounded-full bg-primary/5" />
                  <div className="absolute bottom-1/4 right-1/3 h-10 w-10 rounded-lg bg-primary-accent/10" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-primary/30" />
          </motion.div>

          {/* Right Column — Content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                About Us
              </span>
              <h2 className="mt-3 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                We Don&apos;t Just Wash Cars.{" "}
                <span className="text-gradient-orange">We Restore Them.</span>
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-text-secondary">
              With over 8 years of experience, we&apos;ve perfected the art of
              car care. Our team of professionals uses the latest equipment and
              eco-friendly products to deliver exceptional results every time.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-3.5 w-3.5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
