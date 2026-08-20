import { motion } from 'motion/react';

interface ProgramFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProgramFilter({ categories, activeCategory, onCategoryChange }: ProgramFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-20 bg-espresso/5 p-1.5 rounded-[2rem] border border-espresso/5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="group relative px-8 py-3 transition-all duration-300 rounded-full overflow-hidden"
        >
          {/* Background Highlight */}
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-yellow shadow-xl"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          {/* Label */}
          <span className={`relative z-10 text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${
            activeCategory === category 
              ? 'text-espresso'
              : 'text-espresso/40 group-hover:text-espresso'
          }`}>
            {category === 'all' ? 'All Path' : `Age ${category}`}
          </span>
        </button>
      ))}
    </div>
  );
}
