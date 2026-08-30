import { motion } from 'motion/react';

interface ProgramFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProgramFilter({ categories, activeCategory, onCategoryChange }: ProgramFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-full border border-black/10 shadow-lg">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="group relative px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 rounded-full overflow-hidden"
        >
          {/* Active Pill Background */}
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-[#F9BC00] rounded-full shadow-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          {/* Label */}
          <span className={`relative z-10 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${
            activeCategory === category 
              ? 'text-espresso' 
              : 'text-espresso/80 group-hover:text-[#D62828]'
          }`}>
            {category === 'all' ? 'All Programs' : `Age ${category}`}
          </span>
        </button>
      ))}
    </div>
  );
}
