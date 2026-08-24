"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, serviceCategories } from "@/data/services";
import { Service } from "@/types";
import { staggerContainer, fadeUp } from "@/utils/animations";

const iconMap: Record<string, { label: string; paths: string }> = {
  LocalCarWash: {
    label: "Car Wash",
    paths: "M5 13l4 4L19 5M3 12l2 2c1.1-1.1 2.6-1.8 4.2-1.8.6 0 1.2.1 1.7.3l2.1-2.1c-.5-.3-1.1-.4-1.8-.4-2.2 0-4.2 1.1-5.4 2.8L3 12zm18-2l-2-2-4 4",
  },
  WaterDrop: {
    label: "Water Drop",
    paths: "M12 2C12 2 5 9 5 13.5C5 17.09 8.13 20 12 20C15.87 20 19 17.09 19 13.5C19 9 12 2 12 2Z",
  },
  Chair: {
    label: "Interior",
    paths: "M5 11V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V11M4 11H20V13C20 15.21 18.21 17 16 17H8C5.79 17 4 15.21 4 13V11Z",
  },
  AutoAwesome: {
    label: "Detailing",
    paths: "M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z",
  },
  Shield: {
    label: "Protection",
    paths: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10.99 14L7.99 11L9.4 9.59L10.99 11.17L16.59 5.58L18 7L10.99 14Z",
  },
  Security: {
    label: "Secure",
    paths: "M12 1C8.676 1 6 3.676 6 7V9H4V21H20V9H18V7C18 3.676 15.324 1 12 1ZM10 7C10 5.896 10.896 5 12 5C13.104 5 14 5.896 14 7V9H10V7ZM8 11H16V19H8V11Z",
  },
};

function ServiceIcon({ iconName }: { iconName: string }) {
  const icon = iconMap[iconName] ?? iconMap.LocalCarWash;
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-accent shadow-orange-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon.paths} />
      </svg>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter(
          (s: Service) => s.category === activeFilter,
        );

  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Premium Car Care{" "}
            <span className="text-gradient-orange">Services</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 flex justify-center gap-3 overflow-x-auto pb-2"
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                activeFilter === cat.id
                  ? "bg-primary text-white"
                  : "bg-primary-light text-text-primary hover:bg-primary/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="wait">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-orange"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary/5 to-primary-accent/5">
                  <ServiceIcon iconName={service.icon} />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {service.name}
                    </h3>
                    <span className="whitespace-nowrap rounded-full bg-primary-light px-3 py-1 text-xs font-medium uppercase text-primary">
                      {service.category}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-text-secondary">
                    {service.description}
                  </p>

                  <div className="my-4 border-t border-border" />

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ₹{service.price}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {service.duration}
                    </span>
                  </div>

                  <button className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-primary-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
