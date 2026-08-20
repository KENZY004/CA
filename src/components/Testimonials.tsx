import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-32 bg-espresso overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-crimson/5 skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-orange font-condensed text-[10px] tracking-[0.4em] uppercase">Student Success</div>
              <h2 className="text-5xl md:text-7xl font-condensed text-white uppercase leading-tight">
                Hear from our <br />
                <span className="font-serif-italic normal-case text-orange italic">Players.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-medium max-w-md">
                Real feedback from athletes who have dedicated themselves to the standard of excellence.
              </p>
              
              <div className="flex gap-4 pt-8">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all group"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full h-[400px] flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl relative"
                >
                  <Quote className="absolute top-10 right-10 w-12 h-12 text-white/5" />
                  
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange/30 p-1 bg-white/10">
                      <img 
                        src={current.avatar} 
                        alt={current.name} 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{current.name}</h4>
                      <p className="text-orange font-condensed text-xs uppercase tracking-widest">{current.role}</p>
                    </div>
                  </div>

                  <p className="text-white/90 text-xl md:text-2xl font-serif italic leading-relaxed">
                    "{current.content}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-12">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={`h-1.5 transition-all rounded-full ${
                      i === currentIndex ? 'w-8 bg-orange' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
