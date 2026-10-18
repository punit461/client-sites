"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerItem } from "./Reveal";

/** One child of `<Stagger>`, so server components can build staggered lists. */
export default function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}
