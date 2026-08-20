import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Program } from '../types';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface ProgramCardProps {
  program: Program;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-[1.5rem] overflow-hidden border border-espresso/5 hover:border-orange/20 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-md"
      role="article"
      aria-labelledby={`program-title-${program.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Age Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md border border-white/20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso">
              Ages {program.ageRange}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-crimson font-condensed text-xs font-black tracking-widest uppercase">
              Phase 0{index + 1}
            </span>
            <div className="h-px flex-1 bg-espresso/5" />
          </div>
          
          <h3 id={`program-title-${program.id}`} className="text-2xl font-condensed font-black text-espresso uppercase tracking-tight mb-2.5 leading-none">
            {program.title}
          </h3>
          
          <p className="text-espresso/70 text-xs font-bold leading-relaxed mb-5 italic">
            {program.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-6">
            {program.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-yellow/10 px-2.5 py-1 rounded-md border border-yellow/20">
                <div className="w-1 h-1 rounded-full bg-crimson" />
                <span className="text-[9px] font-black text-espresso/60 uppercase tracking-wider">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <NavLink 
          to="/register" 
          className="relative inline-flex items-center justify-between w-full bg-espresso text-white px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-yellow translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 group-hover/btn:text-espresso transition-colors">Enroll for Phase 0{index + 1}</span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:text-espresso transition-all" />
        </NavLink>
      </div>
    </motion.div>
  );

};

export default ProgramCard;
