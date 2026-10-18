"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerItem } from "@/components/ui/Reveal";

/** One child of a <Stagger> list. Server components can use it without becoming client components. */
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
    <Tag variants={staggerItem} className={className}>
      {children}
    </Tag>
  );
}
