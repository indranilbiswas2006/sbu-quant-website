"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroFadeProps {
  children: ReactNode;
  className?: string;
}

export function HeroFade({ children, className }: HeroFadeProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
