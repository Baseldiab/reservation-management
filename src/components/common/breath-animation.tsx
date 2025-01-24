"use client";

import { motion } from "framer-motion";

// Utils
import { cn } from "@/lib/utils";

interface BreathAnimationProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BreathAnimation({
  className,
  children,
}: BreathAnimationProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1, // Scale the letter up
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      // whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}
