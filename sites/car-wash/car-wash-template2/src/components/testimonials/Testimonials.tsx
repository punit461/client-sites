"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { fadeUp } from "@/utils/animations";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = testimonials[activeIndex];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            What Our{" "}
            <span className="text-gradient-orange"> Customers Say</span>
          </h2>
        </motion.div>

        <div
          className="relative mx-auto mt-16 max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-3xl bg-primary-light p-8 text-center md:p-12"
            >
              <span className="pointer-events-none select-none text-8xl font-serif text-primary/20">
                &ldquo;
              </span>

              <p className="mx-auto mt-4 max-w-2xl text-lg italic leading-relaxed text-text-primary md:text-xl">
                {current.review}
              </p>

              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < current.rating ? "text-primary" : "text-primary/30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-text-primary">
                    {current.name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {current.vehicle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-lg transition-colors duration-300 hover:bg-primary hover:text-white md:-left-16"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-lg transition-colors duration-300 hover:bg-primary hover:text-white md:-right-16"
          >
            ›
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                i === activeIndex ? "bg-primary" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
