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
            y: 60, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
};
