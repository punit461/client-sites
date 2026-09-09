"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/data/pricing";
import { fadeUp, staggerContainer, staggerItem } from "@/utils/animations";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-primary-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Transparent{" "}
            <span className="text-gradient-orange"> Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Choose the perfect plan for your vehicle
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={staggerItem}
              className={`relative rounded-3xl bg-white p-8 ${
                plan.popular
                  ? "border-2 border-primary shadow-orange lg:scale-110"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="gradient-orange absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-text-secondary">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-text-primary">
                  ₹
                </span>
                <span className="text-5xl font-bold text-text-primary">
                  {plan.price}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                {plan.period}
              </p>

              <div className="my-6 border-t border-border" />

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <svg
                        className="h-3 w-3 text-white"
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
                    <span className="text-sm text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full py-3 font-semibold transition-colors duration-300 ${
                  plan.popular
                    ? "gradient-orange text-white"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
