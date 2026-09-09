"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const features = [
  "Professional Equipment",
  "Eco-Friendly Products",
  "Experienced Team",
  "Premium Finish",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-card">
                <Image
                  src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop"
                  alt="Professional car detailing service"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 md:right-6 glass-card rounded-2xl p-5 glow-sm"
            >
              <p className="text-3xl font-bold text-primary">8+</p>
              <p className="text-muted text-sm">Years of Excellence</p>
            </motion.div>

            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-primary/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionHeading
              subtitle="About Us"
              title="We Don't Just Wash Cars. We Restore Them."
              description="At ShinePro, we believe every vehicle deserves meticulous care. Founded in 2016, we've grown from a small car wash to the city's most trusted name in premium car care."
              align="left"
            />

            <p className="text-muted leading-relaxed mb-8">
              Our team of trained professionals uses only premium, eco-friendly
              products and state-of-the-art equipment to deliver results that
              exceed expectations. From a quick exterior wash to full ceramic
              coating, we treat every car as if it were our own.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-secondary text-sm font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary font-semibold"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
