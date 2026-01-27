"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}

export function AnimatedInView({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.3
}: AnimatedInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
