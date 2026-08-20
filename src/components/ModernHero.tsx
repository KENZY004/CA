import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { ASSETS } from '../assets/images';

export default function ModernHero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

  const marqueeText = "ELITE VOLLEYBALL COACHING • PROFESSIONAL TRAINING • CHAMPIONS BORN HERE • TEAM SPIRIT • EXCELLENCE IN EVERY SPIKE • ";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* ── Top Announcement Marquee ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-3 bg-espresso/5 border-b border-espresso/5 z-30">
        <motion.div
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[10px] font-black text-espresso/40 uppercase tracking-[0.4em]">
              Now Accepting New Athletes for Winter Season 2024 • Professional Coaching • Private Sessions Available •&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── FULL-SCREEN Background Image ── */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={ASSETS.HERO.BACKGROUND}
          alt="Challengers Volleyball Academy"
          loading="eager"
          className="w-full h-full"
          style={{
            objectFit: 'contain',
            /* Push the logo fully into the right side of the screen */
            objectPosition: 'right center',
            /* Boost vibrancy */
            filter: 'brightness(1.12) contrast(1.18) saturate(1.55) drop-shadow(0 4px 24px rgba(0,0,0,0.12))',
          }}
        />
      </motion.div>

      {/* ── Left gradient panel — gives text a clean, unobstructed zone ── */}
      {/* This covers the left ~58% fading to transparent, keeping logo fully clear */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #ffffff 0%, #ffffff 28%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0.4) 48%, transparent 55%)',
        }}
      />

      {/* ── Content (text sits above gradient, well clear of the logo) ── */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        className="relative z-20 flex-1 flex flex-col justify-center pl-10 md:pl-20 pr-4 pt-24 pb-40 max-w-[50%]"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start text-left"
        >
          {/* Eyebrow pill */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block mb-6 px-5 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-[11px] font-black uppercase tracking-[0.35em]"
          >
            Challengers Volleyball Academy
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-[6.5rem] font-condensed font-black leading-[0.85] mb-8 uppercase tracking-tighter text-espresso">
            UNLEASH <br />
            <span className="text-orange drop-shadow-[0_2px_12px_rgba(242,102,39,0.45)]">YOUR POWER</span>
          </h1>

          <p className="max-w-sm text-espresso/70 text-sm md:text-base font-bold uppercase tracking-[0.22em] leading-relaxed mb-12">
            Experience the highest level of volleyball coaching.{' '}
            <br className="hidden md:block" />
            From fundamentals to elite performance.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <NavLink
              to="/register"
              className="group relative bg-orange text-white px-12 py-6 rounded-full font-black text-sm tracking-widest uppercase overflow-hidden shadow-[0_16px_40px_rgba(242,102,39,0.4)] transition-all hover:scale-105 active:scale-95 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Join the Academy
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-crimson translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </NavLink>

            <NavLink
              to="/about"
              className="group flex items-center gap-4 text-espresso font-black text-sm tracking-widest uppercase hover:text-orange transition-colors"
            >
              <div className="w-14 h-14 rounded-full border-2 border-espresso/15 flex items-center justify-center group-hover:border-orange group-hover:bg-orange/5 transition-all">
                <Play className="w-5 h-5 fill-current ml-1" />
              </div>
              <span className="border-b-2 border-transparent group-hover:border-orange transition-all">Our Legacy</span>
            </NavLink>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom Marquee ── */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden border-y border-espresso/5 py-6 bg-white/60 backdrop-blur-md z-20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-condensed font-black text-espresso/10 uppercase tracking-tighter">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-20"
      >
        <div className="w-px h-12 bg-espresso" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-90 mt-4 origin-left">Scroll</span>
      </motion.div>
    </section>
  );
}
