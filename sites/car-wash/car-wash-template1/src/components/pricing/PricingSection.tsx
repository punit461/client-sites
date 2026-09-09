"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { pricingPlans } from "@/data/pricing";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedService } from "@/store/slices/bookingSlice";

export default function PricingSection() {
  const dispatch = useAppDispatch();

  const handleChoosePlan = (serviceId: string) => {
    dispatch(setSelectedService(serviceId));
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Pricing"
          title="Simple, Transparent Pricing"
          description="Choose the package that fits your needs. No hidden charges, no surprises."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? "glass-card border-primary/40 glow"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />
              )}

              {plan.popular && (
                <div className="text-center pt-4">
                  <span className="bg-primary text-background text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary">
                    ₹{plan.price}
                  </span>
                  <span className="text-muted text-sm">/ session</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-muted text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoosePlan(plan.serviceId)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  Choose {plan.name}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
