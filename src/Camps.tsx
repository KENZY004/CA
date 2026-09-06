import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Calendar, Target, Trophy, CheckCircle2, ChevronRight, ChevronLeft, Clock, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from './components/SEO';

const CAMP_DURATIONS = [
  { 
    id: 'summer-camp-7day', 
    name: '7-Day Intensive', 
    duration: '7 DAYS', 
    months: 'June & July', 
    bestFor: 'Technique Refinement' 
  },
  { 
    id: 'summer-camp-10day', 
    name: '10-Day Elite', 
    duration: '10 DAYS', 
    months: 'June & July', 
    bestFor: 'Game Strategy' 
  },
  { 
    id: 'summer-camp-15day', 
    name: '15-Day Master', 
    duration: '15 DAYS', 
    months: 'June & July', 
    bestFor: 'High Performance' 
  },
];

export default function Camps() {
  const [camps, setCamps] = useState<any[]>(CAMP_DURATIONS);
  const campsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/camps')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.camps?.length > 0) {
          const uniqueCamps = Array.from(new Map(data.camps.map((c: any) => [c.id, c])).values());
          setCamps(uniqueCamps.map((c: any, idx: number) => ({
            id: c.id || CAMP_DURATIONS[idx % 3].id,
            name: c.name || CAMP_DURATIONS[idx % 3].name,
            duration: c.duration ? (c.duration.toUpperCase().includes('DAY') ? c.duration.toUpperCase() : `${c.duration.toUpperCase()} DAYS`) : CAMP_DURATIONS[idx % 3].duration,
            months: c.months || CAMP_DURATIONS[idx % 3].months,
            bestFor: c.bestFor || CAMP_DURATIONS[idx % 3].bestFor,
          })));
        }
      })
      .catch(() => {
        // Fallback already in state
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (campsScrollRef.current) {
      const scrollAmount = 340;
      campsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-[#FBF9F6] min-h-screen overflow-hidden font-sans pt-32 sm:pt-36 md:pt-40">
      <SEO 
        title="Summer Elite Camps 2026" 
        description="Join Challengers Volleyball Academy Summer Camps in the Bay Area. Intensive 7, 10, and 15-day camps for junior athletes."
      />
      
      {/* Blended Background - Set to Fixed for better visual depth */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.06] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6]/90 via-transparent to-[#FBF9F6]/90" />
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10 pb-8 sm:pb-12"
      >
        <div className="gsap-reveal mb-6 sm:mb-8">
          <SectionHeader 
            eyebrow="Summer 2026" 
            title="Summer Elite Camps." 
            italicWord="Elite"
            id="camps-heading"
          />
        </div>

        {/* Camp Overview */}
        <div className="grid lg:grid-cols-2 gap-6 items-center mb-8 sm:mb-12">
          <div className="space-y-3.5 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-espresso leading-tight">
              Intensive training for <span className="text-[#D62828] italic">future champions.</span>
            </h2>
            <p className="text-espresso/85 text-xs sm:text-sm font-medium leading-relaxed">
              Our Summer Camps are designed to provide a high-energy, focused environment where players can rapidly improve their skills, build confidence, and forge lasting friendships.
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-4 bg-[#F9BC00] rounded-xl border border-espresso/5 shadow-sm">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-espresso mb-1.5" />
                <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso mb-0.5">Availability</h4>
                <p className="text-xs font-bold text-espresso/70">June & July 2026</p>
              </div>
              <div className="p-3 sm:p-4 bg-[#D62828] rounded-xl border border-espresso/5 shadow-sm text-white">
                <Target className="w-4 sm:w-5 h-4 sm:h-5 text-[#F9BC00] mb-1.5" />
                <h4 className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Skill Levels</h4>
                <p className="text-xs font-bold text-white">Beginner & Intermediate</p>
              </div>
            </div>
          </div>
          <div className="relative mt-4 lg:mt-0">
            <div className="aspect-[16/9] max-h-[260px] sm:max-h-[300px] w-full bg-espresso rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden rotate-1 shadow-xl relative z-10 border-4 border-white mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200" 
                alt="Volleyball Summer Camp Action" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#D62828] rounded-full -z-10 blur-2xl opacity-30" />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#F9BC00] rounded-full -z-10 blur-2xl opacity-30" />
          </div>
        </div>

        {/* Duration Options */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-5 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-serif text-espresso mb-1">Choose Your Duration</h3>
            <p className="text-espresso/60 text-[9px] font-black uppercase tracking-widest">Multiple options to fit your summer schedule</p>
          </div>
          
          <div className="relative">
            {/* Carousel navigation arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm z-20 shadow-md hover:bg-black transition-all active:scale-95"
              title="Scroll Left"
              aria-label="Previous Camp"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#EAB308] text-white flex items-center justify-center shadow-md z-20 hover:bg-[#CA8A04] transition-all active:scale-95"
              title="Scroll Right"
              aria-label="Next Camp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div 
              ref={campsScrollRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {camps.map((camp, idx) => (
                <motion.div 
                  key={camp.id || `camp-${idx}`}
                  whileHover={{ y: -4 }}
                  className={`p-4 sm:p-5 rounded-[1.25rem] sm:rounded-[1.5rem] border border-espresso/5 shadow-md group transition-all relative overflow-hidden ${
                    idx % 3 === 0 
                      ? 'bg-[#1A1A1A] text-white' 
                      : idx % 3 === 1 
                        ? 'bg-[#D62828] text-white' 
                        : 'bg-[#F9BC00] text-espresso'
                  }`}
                >
                  {/* Blurry Background Image */}
                  <div className="absolute inset-0 z-0 opacity-10 blur-[2px] pointer-events-none">
                    <img 
                      src={
                        idx % 3 === 0 
                          ? "https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=600" 
                          : idx % 3 === 1 
                            ? "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600" 
                            : "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600"
                      } 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${
                      idx % 3 === 0 
                        ? 'bg-[#1A1A1A]/40' 
                        : idx % 3 === 1 
                          ? 'bg-[#D62828]/40' 
                          : 'bg-[#F9BC00]/40'
                    }`} />
                  </div>

                  <div className="relative z-10">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform ${
                      idx % 3 === 2 ? 'bg-espresso/10 text-espresso' : 'bg-white/10 text-white'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-base font-serif mb-0.5">{camp.name}</h4>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${
                      idx % 3 === 2 ? 'text-espresso/60' : 'text-white/60'
                    }`}>
                      {camp.duration}
                    </p>
                    <div className="space-y-1 mb-3">
                      <div className={`flex items-center gap-2 text-[10px] font-medium ${
                        idx % 3 === 2 ? 'text-espresso/70' : 'text-white/80'
                      }`}>
                        <CheckCircle2 className={`w-3 h-3 ${idx % 3 === 2 ? 'text-espresso' : 'text-white'}`} />
                        {camp.months}
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] font-medium ${
                        idx % 3 === 2 ? 'text-espresso/70' : 'text-white/80'
                      }`}>
                        <Star className={`w-3 h-3 ${idx % 3 === 2 ? 'text-espresso' : 'text-white'}`} />
                        {camp.bestFor}
                      </div>
                    </div>
                    <NavLink 
                      to={`/register?session=${camp.id}`} 
                      className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest transition-colors ${
                        idx % 3 === 2 ? 'text-espresso hover:text-espresso/60' : 'text-white hover:text-white/60'
                      }`}
                    >
                      Enroll Now <ChevronRight className="w-3 h-3" />
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits of Joining */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-[#F3722C] p-5 sm:p-7 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-espresso/5 shadow-xl text-white relative overflow-hidden">
            {/* Blurry Background Image */}
            <div className="absolute inset-0 z-0 opacity-10 blur-[4px] pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1562552052-c72ceddf93dc?q=80&w=800" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#F3722C]/40" />
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-serif mb-4 text-espresso">Benefits of Joining Our Camps</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  { title: 'Technical Mastery', desc: 'Accelerated development of serves, spikes, and defensive play.' },
                  { title: 'Mental Resilience', desc: 'Workshops on court psychology and competitive mindset.' },
                  { title: 'Team Bonding', desc: 'Collaborative drills that build trust and communication skills.' },
                  { title: 'Elite Exposure', desc: 'Feedback from master coaches with international experience.' }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3.5 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-serif mb-0.5">{benefit.title}</h5>
                      <p className="text-xs text-white/90 leading-snug font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#D62828] p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-condensed uppercase tracking-tighter mb-2 sm:mb-3 leading-none">
              Spaces are <span className="text-[#F9BC00] font-serif-italic lowercase italic tracking-normal">filling fast.</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              Our summer camps are our most popular programs. Don't miss your chance to train with Coach Wilson this summer.
            </p>
            <NavLink 
              to="/register?program=summer-camp-2026-fremont" 
              className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-espresso text-white rounded-full font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-[#F9BC00] hover:text-espresso transition-all shadow-xl active:scale-95"
            >
              Secure Your Spot
            </NavLink>
          </div>
          {/* Abstract Sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}
