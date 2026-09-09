"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const benefits = [
  {
    icon: "💎",
    title: "Premium Products",
    description: "We use only top-tier, professional-grade cleaning products.",
  },
  {
    icon: "👨‍🔧",
    title: "Trained Professionals",
    description: "Our team is certified and continuously trained in latest techniques.",
  },
  {
    icon: "🌿",
    title: "Eco-Friendly Cleaning",
    description: "Biodegradable products and water-efficient processes.",
  },
  {
    icon: "⚡",
    title: "Fast Service",
    description: "Quick turnaround without compromising on quality.",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description: "Premium service at competitive and transparent prices.",
  },
  {
    icon: "🏆",
    title: "100% Satisfaction",
    description: "We're not happy until you're completely satisfied.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Why Choose Us"
          title="The ShinePro Difference"
          description="We go above and beyond to deliver an exceptional car care experience every single time."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-7 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
