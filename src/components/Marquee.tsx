import React from 'react';
import { motion } from 'motion/react';

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
  textClassName?: string;
}

export default function Marquee({ text, speed = 20, className = "", textClassName = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-espresso py-4 border-y border-white/10 ${className}`}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex gap-12"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`text-2xl md:text-4xl font-condensed font-black text-white uppercase tracking-widest ${textClassName}`}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
