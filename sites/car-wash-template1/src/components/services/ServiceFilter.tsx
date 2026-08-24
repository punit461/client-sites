"use client";

import { motion } from "framer-motion";

interface ServiceFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function ServiceFilter({
  categories,
  active,
  onChange,
}: ServiceFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-primary text-background shadow-lg shadow-primary/20"
              : "glass-card text-muted hover:text-secondary hover:border-primary/30"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </motion.button>
      ))}
    </div>
  );
}
