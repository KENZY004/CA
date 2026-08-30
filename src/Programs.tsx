import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  const scroll = (direction: 'left' | 'right', ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-32 sm:pt-36 md:pt-40 pb-10 sm:pb-12 min-h-screen overflow-hidden font-sans">
      <SEO 
        title="Training Programs" 
        description="We have training programs for all ages and skill levels — from complete beginners to players looking to compete seriously. Based in the Bay Area."
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
        <div className="gsap-reveal mb-8 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#D62828]" />
            <span className="text-[#D62828] font-black text-[9px] tracking-[0.35em] uppercase">Development Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-condensed font-black text-espresso uppercase tracking-tighter leading-[0.85] mb-3">
            Find the right <span className="text-[#D62828] italic">program for you.</span>
          </h1>
          <p className="text-espresso/85 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto italic">
            Whether your child is picking up a volleyball for the first time or training to compete, we have a program that fits.
          </p>
        </div>

        {/* Age Filtering */}
        <div className="gsap-reveal mb-6 flex justify-center">
          <ProgramFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Dynamic Programs Carousel */}
        <div className="relative mb-10 sm:mb-12 gsap-reveal">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-espresso/40">Our Programs</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left', programScrollRef)}
                className="w-9 h-9 rounded-full bg-[#D62828] text-white flex items-center justify-center hover:bg-espresso hover:scale-105 transition-all shadow-md group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right', programScrollRef)}
                className="w-9 h-9 rounded-full bg-[#D62828] text-white flex items-center justify-center hover:bg-espresso hover:scale-105 transition-all shadow-md group"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
          
          <div 
            ref={programScrollRef}
            className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory -mx-4 px-4"
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
                  className="shrink-0 w-[78vw] sm:w-[320px] md:w-[340px] snap-center"
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
        <div className="mb-10 sm:mb-14">
          <div className="flex items-end justify-between mb-8 gsap-reveal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F3722C]/10 rounded-xl flex items-center justify-center text-[#F3722C]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-condensed font-black uppercase text-espresso">Regular Coaching Packages</h2>
                <p className="text-espresso/40 text-[9px] font-black uppercase tracking-widest">Our regular coaching programs</p>
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="hidden md:flex gap-3">
              <button 
                onClick={() => scroll('left', scrollRef)}
                className="w-12 h-12 rounded-full bg-[#F9BC00] text-espresso flex items-center justify-center hover:bg-espresso hover:text-white hover:scale-105 transition-all shadow-md group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right', scrollRef)}
                className="w-12 h-12 rounded-full bg-[#F9BC00] text-espresso flex items-center justify-center hover:bg-espresso hover:text-white hover:scale-105 transition-all shadow-md group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div 
            ref={scrollRef}
            className="relative -mx-4 px-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory flex gap-6"
          >
            {[
              { 
                title: 'Starter Pack', 
                fee: '$200', 
                sessions: '4 Coaching Sessions', 
                duration: '2 Hours per Session',
                popular: false,
                bgColor: 'bg-[#F9BC00]',
                textColor: 'text-espresso'
              },
              { 
                title: 'Get Serious', 
                fee: '$550', 
                sessions: '12 Intensive Sessions', 
                duration: '2 Hours per Session',
                popular: true,
                bgColor: 'bg-[#D62828]',
                textColor: 'text-white'
              },
              { 
                title: 'All In', 
                fee: '$900', 
                sessions: '20 Training Sessions', 
                duration: '2 Hours per Session',
                popular: false,
                bgColor: 'bg-[#1A1A1A]',
                textColor: 'text-white'
              },
              { 
                title: 'Team Package', 
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
                whileHover={{ y: -6 }}
                className={`relative p-5 sm:p-7 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-espresso/5 shadow-xl transition-all duration-500 shrink-0 w-[80vw] sm:w-[340px] md:w-[380px] snap-center ${pkg.bgColor} ${pkg.textColor}`}
              >
                {pkg.popular && (
                  <div className="absolute top-5 sm:top-7 right-5 sm:top-7 bg-espresso text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                    BEST VALUE
                  </div>
                )}
                <h3 className={`text-xl sm:text-2xl font-condensed font-black uppercase tracking-tight mb-4 sm:mb-6 ${pkg.textColor}`}>{pkg.title}</h3>
                <div className="mb-6 sm:mb-8 flex items-baseline gap-2">
                  <span className={`text-3xl sm:text-5xl font-condensed font-black tracking-tighter ${pkg.textColor}`}>{pkg.fee}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${pkg.bgColor === 'bg-[#F9BC00]' ? 'text-espresso/70' : 'text-white/70'}`}>/ package</span>
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[pkg.sessions, pkg.duration, 'All Skill Levels Welcome', 'Expert Position Coaching'].map((item, i) => (
                    <li key={i} className={`flex items-center gap-3 text-xs font-bold ${pkg.bgColor === 'bg-[#F9BC00]' ? 'text-espresso/90' : 'text-white/90'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <NavLink 
                  to={`/register?program=${encodeURIComponent(pkg.title.toLowerCase().replace(/\s+/g, '-'))}`}
                  className={`block text-center py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] transition-all shadow-md active:scale-95 ${
                    pkg.bgColor === 'bg-[#F9BC00]' 
                      ? 'bg-espresso text-white hover:bg-[#D62828]' 
                      : 'bg-white text-espresso hover:bg-[#F9BC00] hover:text-espresso'
                  }`}
                >
                  Enroll Now
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Specialized Coaching */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10 sm:mb-16">
          {/* Personal Training */}
          <div className="p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-[#1A1A1A] text-white border border-espresso/5 shadow-xl gsap-reveal group hover:border-[#F9BC00]/50 transition-all duration-500">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#F9BC00] rounded-xl sm:rounded-2xl flex items-center justify-center text-espresso mb-4 sm:mb-6 group-hover:scale-105 transition-transform">
              <User className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <h3 className="text-xl sm:text-3xl font-condensed font-black uppercase tracking-tight text-white mb-3 sm:mb-4">Personal Training</h3>
            <p className="text-white/70 text-xs sm:text-sm font-bold leading-relaxed mb-5 sm:mb-7 max-w-sm italic">
              Just you and the coach. Sessions are planned around your specific weaknesses and goals. Good for players who want faster results.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {['One-on-One', 'Customized Plans', 'Flexible Schedule', 'Performance Analysis'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F9BC00]" />
                  {item}
                </div>
              ))}
            </div>
            <a href="/contact" className="inline-flex items-center gap-3 bg-[#F9BC00] text-espresso px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
              Book a Program <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Team Coaching */}
          <div className="p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-[#F3722C] text-white border border-espresso/5 shadow-xl gsap-reveal group hover:border-espresso/20 transition-all duration-500">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-105 transition-transform">
              <Users className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <h3 className="text-xl sm:text-3xl font-condensed font-black uppercase tracking-tight text-white mb-3 sm:mb-4">Team Coaching</h3>
            <p className="text-white/80 text-xs sm:text-sm font-bold leading-relaxed mb-5 sm:mb-7 max-w-sm italic">
              We coach school teams, club teams, and competitive squads — either at your gym or ours. Works for all age groups.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {['School Teams', 'Club Teams', 'Competitive Teams', 'All Ages'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  {item}
                </div>
              ))}
            </div>
            <a href="/contact" className="inline-flex items-center gap-3 bg-espresso text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-espresso transition-all shadow-xl">
              Enroll Now <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Summer Camp Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] bg-[#D62828] text-white text-center relative overflow-hidden shadow-2xl gsap-reveal"
        >
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-700">
              <div className="bg-white/20 backdrop-blur-xl p-3.5 sm:p-4 rounded-full border border-white/20">
                <Users className="w-6 sm:w-8 h-6 sm:h-8" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-condensed font-black uppercase tracking-tighter mb-3 sm:mb-5 leading-[0.9]">
              Summer <span className="text-[#F9BC00] italic">Intensives</span> 2026
            </h2>
            
            <p className="text-white/80 text-xs sm:text-base font-medium max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Summer is the best time to get serious. Our intensive camps give players more time on the court, focused coaching, and a real jump in skill.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
              <a href="/camps" className="px-7 sm:px-10 py-3.5 sm:py-4 bg-espresso text-white rounded-xl font-black uppercase tracking-[0.15em] text-[9px] sm:text-[10px] hover:bg-white hover:text-espresso transition-all shadow-xl">
                View Camp Details
              </a>
              <div className="hidden sm:flex items-center gap-3 text-white/60">
                <div className="h-px w-6 bg-white/20" />
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
