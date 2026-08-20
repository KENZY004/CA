import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROGRAMS } from './data';
import SectionHeader from './components/SectionHeader';
import ProgramCard from './components/ProgramCard';
import ProgramFilter from './components/ProgramFilter';
import { useGsapReveal } from './hooks/useGsapReveal';
import { Package, User, Users, CheckCircle2, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import { useRef, RefObject, useEffect, WheelEvent } from 'react';
import SEO from './components/SEO';

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  useGsapReveal();

  const categories = ['all', '5-10', '11-14', '15-18'];

  const filteredPrograms = activeCategory === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.ageGroups.includes(activeCategory));

  const scrollRef = useRef<HTMLDivElement>(null);
  const programScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (programScrollRef.current) {
      programScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  useEffect(() => {
    const bindWheel = (el: HTMLDivElement | null) => {
      if (!el) return () => {};
      const handler = (e: globalThis.WheelEvent) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          if (
            (e.deltaY > 0 && el.scrollLeft + el.clientWidth < el.scrollWidth - 1) ||
            (e.deltaY < 0 && el.scrollLeft > 0)
          ) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
          }
        }
      };
      el.addEventListener('wheel', handler, { passive: false });
      return () => el.removeEventListener('wheel', handler);
    };

    const cleanup1 = bindWheel(programScrollRef.current);
    const cleanup2 = bindWheel(scrollRef.current);
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  const scroll = (direction: 'left' | 'right', ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-12 md:py-16 min-h-screen overflow-hidden font-sans">
      <SEO 
        title="Training Programs" 
        description="Explore our tiered volleyball training programs for all ages. From fundamentals for kids to elite performance training for advanced athletes."
      />
      
      {/* High-Impact Volleyball Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/volleyball_bg.avif" 
          alt="Volleyball Action" 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Abstract Red/Yellow Blurs */}
        <div className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] bg-[#D62828]/15 blur-[180px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[1000px] h-[1000px] bg-[#F9BC00]/15 blur-[180px] rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Intro */}
        <div className="gsap-reveal mb-12 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#D62828]" />
            <span className="text-[#D62828] font-black text-[10px] tracking-[0.4em] uppercase">Development Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-condensed font-black text-espresso uppercase tracking-tighter leading-[0.85] mb-4">
            The Path to <span className="text-[#D62828] italic">Mastery.</span>
          </h1>
          <p className="text-espresso/60 text-sm font-medium leading-relaxed max-w-xl mx-auto italic">
            Strategic progression tiers designed to transform raw potential into competitive excellence through elite biomechanical coaching.
          </p>
        </div>

        {/* Age Filtering */}
        <div className="gsap-reveal mb-10 flex justify-center">
          <ProgramFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Dynamic Programs Carousel */}
        <div className="relative mb-16 gsap-reveal">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-espresso/40">Tiered Progression</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left', programScrollRef)}
                className="w-10 h-10 rounded-full bg-[#D62828] text-white flex items-center justify-center hover:bg-espresso hover:scale-110 transition-all shadow-md group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right', programScrollRef)}
                className="w-10 h-10 rounded-full bg-[#D62828] text-white flex items-center justify-center hover:bg-espresso hover:scale-110 transition-all shadow-md group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
          
          <div 
            ref={programScrollRef}
            className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory -mx-4 px-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program, idx) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="shrink-0 w-[80vw] md:w-[360px] snap-center"
                >
                  <ProgramCard 
                    program={program}
                    index={idx}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Regular Coaching Packages - Sliding Carousel */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-12 gsap-reveal">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F3722C]/10 rounded-2xl flex items-center justify-center text-[#F3722C]">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-condensed font-black uppercase text-espresso">Regular Coaching Packages</h2>
                <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Our signature progressive training</p>
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="hidden md:flex gap-4">
              <button 
                onClick={() => scroll('left', scrollRef)}
                className="w-16 h-16 rounded-full bg-[#F9BC00] text-espresso flex items-center justify-center hover:bg-espresso hover:text-white hover:scale-110 transition-all shadow-[0_8px_30px_rgb(249,188,0,0.3)] group"
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right', scrollRef)}
                className="w-16 h-16 rounded-full bg-[#F9BC00] text-espresso flex items-center justify-center hover:bg-espresso hover:text-white hover:scale-110 transition-all shadow-[0_8px_30px_rgb(249,188,0,0.3)] group"
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div 
            ref={scrollRef}
            className="relative -mx-4 px-4 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory flex gap-8"
          >
            {[
              { 
                title: 'Package 1: Essential Skills', 
                fee: '$200', 
                sessions: '4 Coaching Sessions', 
                duration: '2 Hours per Session',
                popular: false,
                bgColor: 'bg-[#F9BC00]',
                textColor: 'text-espresso'
              },
              { 
                title: 'Package 2: Competitive Prep', 
                fee: '$550', 
                sessions: '12 Intensive Sessions', 
                duration: '2 Hours per Session',
                popular: true,
                bgColor: 'bg-[#D62828]',
                textColor: 'text-white'
              },
              { 
                title: 'Package 3: Elite Mastery', 
                fee: '$900', 
                sessions: '20 Elite Sessions', 
                duration: '2 Hours per Session',
                popular: false,
                bgColor: 'bg-[#1A1A1A]',
                textColor: 'text-white'
              },
              { 
                title: 'Package 4: Team Dynamic', 
                fee: '$1200', 
                sessions: 'Group Coaching', 
                duration: 'Custom Schedule',
                popular: false,
                bgColor: 'bg-[#F3722C]',
                textColor: 'text-white'
              }
            ].map((pkg, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className={`relative p-12 rounded-[4rem] border border-espresso/5 shadow-2xl transition-all duration-500 shrink-0 w-[85vw] md:w-[450px] snap-center ${pkg.bgColor} ${pkg.textColor}`}
              >
                {pkg.popular && (
                  <div className="absolute top-10 right-10 bg-espresso text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-lg">
                    BEST VALUE
                  </div>
                )}
                <h3 className={`text-3xl font-condensed font-black uppercase tracking-tight mb-8 ${pkg.textColor}`}>{pkg.title}</h3>
                <div className="mb-10 flex items-baseline gap-2">
                  <span className={`text-6xl font-condensed font-black tracking-tighter ${pkg.popular ? 'text-white' : 'text-espresso'}`}>{pkg.fee}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest opacity-60`}>/ package</span>
                </div>
                <ul className="space-y-5 mb-12">
                  {[pkg.sessions, pkg.duration, 'All Skill Levels Welcome', 'Expert Position Coaching'].map((item, i) => (
                    <li key={i} className={`flex items-center gap-4 text-xs font-bold opacity-80`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="/register" 
                  className={`block text-center py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${pkg.popular ? 'bg-white text-espresso hover:bg-espresso hover:text-white' : 'bg-espresso text-white hover:bg-[#D62828]'}`}
                >
                  Enroll Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Specialized Coaching */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          {/* Personal Training */}
          <div className="p-16 rounded-[4rem] bg-[#1A1A1A] text-white border border-espresso/5 shadow-xl gsap-reveal group hover:border-[#F9BC00]/50 transition-all duration-500">
            <div className="w-16 h-16 bg-[#F9BC00] rounded-3xl flex items-center justify-center text-espresso mb-10 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-condensed font-black uppercase tracking-tight text-white mb-6">Personal Training</h3>
            <p className="text-white/70 text-sm font-bold leading-relaxed mb-10 max-w-sm italic">
              One-on-one coaching sessions tailored to your specific goals. Includes customized plans, skill development, and performance analysis.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {['One-on-One', 'Customized Plans', 'Flexible Schedule', 'Performance Analysis'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F9BC00]" />
                  {item}
                </div>
              ))}
            </div>
            <a href="/contact" className="inline-flex items-center gap-4 bg-[#F9BC00] text-espresso px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
              Book a Program <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Team Coaching */}
          <div className="p-16 rounded-[4rem] bg-[#F3722C] text-white border border-espresso/5 shadow-xl gsap-reveal group hover:border-espresso/20 transition-all duration-500">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-condensed font-black uppercase tracking-tight text-white mb-6">Team Coaching</h3>
            <p className="text-white/80 text-sm font-bold leading-relaxed mb-10 max-w-sm italic">
              Professional coaching for School Teams, Club Teams, and Competitive Teams. Training conducted at your location for all ages and skill levels.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {['School Teams', 'Club Teams', 'Competitive Teams', 'All Ages'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  {item}
                </div>
              ))}
            </div>
            <a href="/contact" className="inline-flex items-center gap-4 bg-espresso text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-espresso transition-all shadow-xl">
              Enroll Now <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Summer Camp Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group p-16 md:p-24 rounded-[5rem] bg-[#D62828] text-white text-center relative overflow-hidden shadow-2xl gsap-reveal"
        >
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-10 group-hover:scale-110 transition-transform duration-700">
              <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/20">
                <Users className="w-10 h-10" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-condensed font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Elite Summer <span className="text-[#F9BC00] italic">Intensives</span> 2026
            </h2>
            
            <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
              Transform your game during the off-season with our immersive, pro-level training camps designed for competitive athletes.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/camps" className="px-12 py-6 bg-espresso text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-espresso transition-all shadow-2xl">
                View Camp Details
              </a>
              <div className="hidden sm:flex items-center gap-4 text-white/60">
                <div className="h-px w-8 bg-white/20" />
                <span className="text-[10px] font-black uppercase tracking-widest">Early Enrollment Open</span>
              </div>
            </div>
          </div>
          
          {/* Architectural Ornaments */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-espresso/10 rounded-full blur-[120px]" />
        </motion.div>
      </div>
    </div>
  );
}
