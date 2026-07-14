"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordFadeProps {
  text: string;
  className?: string;
  delay?: number;
}

export const WordFade: FC<WordFadeProps> = ({ 
  text, 
  className, 
  delay = 0.1 
}) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap gap-x-1.5 md:gap-x-2.5", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
