import React, { useRef } from 'react';
import { motion, useTransform, MotionValue, useScroll } from 'motion/react';

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
  const end = start + (1 / total);
  
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="text-4xl md:text-6xl font-serif leading-tight text-espresso"
    >
      {word}
    </motion.span>
  );
};

export default function TextReveal({ text }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-24 px-4">
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
        {words.map((word, i) => (
          <Word 
            key={i} 
            word={word} 
            index={i} 
            total={words.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </div>
  );
}
