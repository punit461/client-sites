"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedService } from "@/store/slices/bookingSlice";

const iconMap: Record<string, string> = {
  soap: "🧴",
  auto_awesome: "✨",
  cleaning_services: "🧹",
  workspace_premium: "🏆",
  shield: "🛡️",
  protect: "🔰",
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const dispatch = useAppDispatch();

  const handleBook = () => {
    dispatch(setSelectedService(service.id));
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
            {iconMap[service.icon] || "🚗"}
          </span>
        </div>
        <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1">
          <span className="text-primary text-xs font-bold">
            {service.duration}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-secondary">
              ₹{service.price}
            </span>
            <span className="text-muted text-sm ml-1">/ wash</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBook}
            className="btn-primary text-sm px-5 py-2.5"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
