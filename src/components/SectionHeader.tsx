import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  ctaLabel?: string;
  ctaPath?: string;
  dark?: boolean;
  className?: string;
  headingClassName?: string;
  id?: string;
}

export default function SectionHeader({ eyebrow, title, italicWord, ctaLabel, ctaPath, dark, className, headingClassName, id }: SectionHeaderProps) {
  const parts = title.split(italicWord || '');

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12 mb-12 sm:mb-16 relative ${dark ? 'text-white' : 'text-espresso'} ${className || ''}`}>
      {/* Decorative Squiggle */}
      <svg className={`absolute -top-16 -left-16 w-32 h-32 opacity-10 ${dark ? 'text-white' : 'text-orange'} hidden xl:block`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M10,50 Q30,10 50,50 T90,50" strokeLinecap="round" strokeDasharray="1 2" />
      </svg>

      <div className="max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <div className={`w-8 sm:w-12 h-px ${dark ? 'bg-white/30' : 'bg-orange/30'}`} />
          <span className={`${dark ? 'text-white/60' : 'text-orange'} font-black text-[10px] sm:text-[11px] tracking-[0.5em] uppercase`}>{eyebrow}</span>
        </motion.div>
        
        <motion.h2 
          id={id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={headingClassName || "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-condensed leading-[0.9] uppercase tracking-tight"}
        >
          {parts[0]}
          {italicWord && <span className={`${dark ? 'text-orange italic' : 'text-crimson italic'} font-serif-italic normal-case tracking-normal lowercase ml-2 mr-2`}>{italicWord}</span>}
          {parts[1]}
        </motion.h2>
      </div>

      {ctaLabel && ctaPath && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:mb-4"
        >
          <NavLink 
            to={ctaPath}
            className={`group relative flex flex-col items-center justify-center w-32 h-32 rounded-full border transition-all duration-500
              ${dark ? 'border-white/10 text-white hover:bg-white hover:text-espresso' : 'border-espresso/10 text-espresso hover:bg-espresso hover:text-white'}
            `}
          >
            <div className="flex flex-col items-center text-center leading-[1.1]">
              {ctaLabel.split(' ').map((word, i) => (
                <span key={i} className="text-[11px] font-black uppercase tracking-widest block">{word}</span>
              ))}
            </div>
            <ArrowUpRight className="w-4 h-4 mt-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            
            {/* Animated Ring */}
            <div className={`absolute inset-0 rounded-full border border-dashed opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 animate-spin-slow ${dark ? 'border-white' : 'border-espresso'}`} />
          </NavLink>
        </motion.div>
      )}
    </div>
  );
}
