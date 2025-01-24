"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface RevealAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealAnimation({
  children,
  className = "",
  delay = 0,
}: RevealAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
        }}
        className={"w-full"}
      >
        {children}
      </motion.div>
    </div>
  );
}
