"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function AnimatedInView({
  children,
  className,
  delay = 0,
  y = 24
}: AnimatedInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
