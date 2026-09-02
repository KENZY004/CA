import React, { useRef } from 'react';
import { motion, useTransform, MotionValue, useScroll, useSpring } from 'motion/react';

interface TextRevealProps {
  text: string;
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, start + (1.2 / total));
  
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight text-espresso inline-block tracking-tight"
    >
      {word}
    </motion.span>
  );
};

export default function TextReveal({ text }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-32 sm:py-44 md:py-52 px-6">
      <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 text-center">
        {words.map((word, i) => (
          <Word 
            key={i} 
            word={word} 
            index={i} 
            total={words.length} 
            progress={smoothProgress} 
          />
        ))}
      </div>
    </div>
  );
}
