import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Hide cursor if touch screen
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const updatePosition = () => {
      // Lerp follower position smoothly
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.2;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x - 16}px, ${followerPos.current.y - 16}px, 0) scale(${isHovering ? 1.8 : 1})`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button, a, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [isHovering]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Small Cursor Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-orange rounded-full pointer-events-none z-[9999] will-change-transform shadow-sm"
      />
      {/* Smooth Ring Follower */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] will-change-transform transition-colors duration-200 border ${
          isHovering ? 'border-orange bg-orange/10' : 'border-orange/60 bg-transparent'
        }`}
      />
    </>
  );
}
