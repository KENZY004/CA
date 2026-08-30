import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll('.gsap-reveal');
      
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { 
            y: 24, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
};
