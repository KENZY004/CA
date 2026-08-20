import { motion } from 'motion/react';

export default function RotatingBadge() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-400 uppercase font-black text-[10px] tracking-[0.15em]">
          <path
            id="curve"
            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="transparent"
          />
          <text>
            <textPath xlinkHref="#curve" startOffset="0%">
              CHALLENGERS ACADEMY • ELITE PERFORMANCE • EST. 2024 •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)] border-2 border-espresso/20 relative z-10"
      >
        <motion.div 
          animate={{ rotate: 45 }}
          whileHover={{ rotate: 135 }}
          transition={{ duration: 0.6 }}
          className="w-5 h-5 bg-espresso flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-yellow-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
