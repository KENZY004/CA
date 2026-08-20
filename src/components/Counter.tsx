import { useEffect, useState, useRef } from 'react';
import { useInView, motion, useSpring, useTransform } from 'motion/react';

interface CounterProps {
  value: number;
  duration?: number;
}

export default function Counter({ value, duration = 2 }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [count, isInView, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
}
