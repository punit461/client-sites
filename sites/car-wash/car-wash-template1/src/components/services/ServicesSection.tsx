"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceFilter from "./ServiceFilter";
import ServiceCard from "./ServiceCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilter } from "@/store/slices/servicesSlice";

export default function ServicesSection() {
  const { items, activeFilter } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(items.map((s) => s.category))];
    return cats;
  }, [items]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((s) => s.category === activeFilter);
  }, [items, activeFilter]);

  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Our Services"
          title="Premium Car Care Services"
          description="From quick washes to complete detailing, we offer a range of services to keep your vehicle in pristine condition."
        />

        <ServiceFilter
          categories={categories}
          active={activeFilter}
          onChange={(cat) => dispatch(setFilter(cat))}
        />

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
