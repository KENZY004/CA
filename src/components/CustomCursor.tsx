import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide cursor if touch device
    if (typeof window === 'undefined' || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    let rafId: number;

    const updatePosition = () => {
      // Smooth lerp for outer ring
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.18;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x - 16}px, ${followerPos.current.y - 16}px, 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button, a, input, textarea, select, [role="button"]')) {
        if (followerRef.current) {
          followerRef.current.style.transform += ' scale(1.6)';
          followerRef.current.classList.add('border-orange', 'bg-orange/10');
          followerRef.current.classList.remove('border-orange/60');
        }
      } else {
        if (followerRef.current) {
          followerRef.current.classList.remove('border-orange', 'bg-orange/10');
          followerRef.current.classList.add('border-orange/60');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Center cursor dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-orange rounded-full pointer-events-none z-[9999] will-change-transform shadow-sm"
      />
      {/* Smooth ring follower */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] will-change-transform transition-[border-color,background-color] duration-150 border border-orange/60 bg-transparent"
      />
    </>
  );
}
