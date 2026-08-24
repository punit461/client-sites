"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 gradient-orange relative overflow-hidden text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/10 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-white/15 rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-white/10 rounded-full" />
      <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-white/20 rounded-full" />
      <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-white/10 rounded-full" />

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          Ready to Give Your Car
          <br />
          the Shine It Deserves?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-white/80 text-lg mt-4"
        >
          Book your premium car wash today.
        </motion.p>

        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <a
            href="#booking"
            className="inline-block bg-white text-primary font-semibold rounded-full px-8 py-4 text-lg hover:scale-105 transition shadow-lg mt-8"
          >
            Book a Wash
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
