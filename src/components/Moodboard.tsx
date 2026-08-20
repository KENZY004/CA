import { motion } from 'motion/react';
import { PROGRAMS } from '../data';
import { ASSETS } from '../assets/images';
import OptimizedImage from './OptimizedImage';

const assets = [
  { type: 'image', src: PROGRAMS[0].image, label: 'Technical Mastery' },
  { type: 'image', src: PROGRAMS[1].image, label: 'Team Spirit' },
  { type: 'image', src: PROGRAMS[2].image, label: 'Elite Focus' },
  { type: 'image', src: ASSETS.HERO.ACTION_CARD_4, label: 'Action Shot' },
  { type: 'doodle', color: 'bg-orange', label: 'Victory' },
  { type: 'mockup', label: 'Player Stats', value: '+4" Vertical' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    rotate: i % 2 === 0 ? -2 : 2,
    scale: 0.95,
    y: 20,
  }),
  visible: (i: number) => ({
    opacity: 1,
    rotate: (i % 2 === 0 ? -1 : 1) * (1 + (i % 3) * 0.5),
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  }),
};

export default function Moodboard() {
  const getSpans = (i: number) => {
    const spans = [
      "lg:col-span-2 lg:row-span-2", // Item 0
      "lg:col-span-1 lg:row-span-1", // Item 1
      "lg:col-span-1 lg:row-span-2", // Item 2
      "lg:col-span-1 lg:row-span-1", // Item 3
      "lg:col-span-2 lg:row-span-1", // Item 4
      "lg:col-span-1 lg:row-span-1", // Item 5
    ];
    return spans[i % spans.length];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
        {assets.map((asset, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={itemVariants}
            className={`relative group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${getSpans(i)}`}
          >
            {asset.type === 'image' && (
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 transition-transform group-hover:scale-[1.01] duration-500">
                <OptimizedImage 
                  src={asset.src} 
                  alt={asset.label} 
                  className="w-full h-full" 
                  imgClassName="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-espresso/20 group-hover:bg-espresso/0 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-white/20">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso">{asset.label}</span>
                </div>
              </div>
            )}
            
            {asset.type === 'doodle' && (
              <div className={`${asset.color} w-full h-full rounded-[2.5rem] flex items-center justify-center shadow-lg relative transition-transform group-hover:rotate-3 duration-500 border-2 border-white/10`}>
                 <svg className="w-1/3 h-1/3 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                 </svg>
                 <div className="absolute -bottom-2 -right-2 bg-espresso text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] rotate-6 shadow-xl border border-white/10">
                   {asset.label}
                 </div>
              </div>
            )}

            {asset.type === 'mockup' && (
              <div className="bg-espresso text-white w-full h-full rounded-[2.5rem] p-10 flex flex-col justify-between shadow-lg border border-white/5 transition-transform group-hover:-translate-y-1 duration-500">
                <div className="text-[10px] font-black opacity-40 tracking-[0.3em] uppercase">{asset.label}</div>
                <div className="text-5xl font-condensed font-black text-yellow tracking-tighter">{asset.value}</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black tracking-widest opacity-30">
                    <span>PROGRESS</span>
                    <span>85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-yellow"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-1/4 -left-20 w-80 h-80 text-orange/10 rotate-12" viewBox="0 0 200 200">
          <path d="M10,100 Q50,150 150,50 T190,100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-1/4 -right-20 w-80 h-80 text-orange/10 -rotate-12" viewBox="0 0 200 200">
          <path d="M10,100 Q150,50 190,100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </motion.div>
  );
}
