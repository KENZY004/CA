import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Calendar, Target, Trophy, CheckCircle2, ChevronRight, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from './components/SEO';

const FALLBACK_CAMPS = [
  { id: 'summer-camp-7day', name: '7-Day Intensive Summer Clinic', duration: '7 Days', months: 'June & July 2026', bestFor: 'Technique Refinement', price: 350 },
  { id: 'summer-camp-10day', name: '10-Day Elite Summer Intensive', duration: '10 Days', months: 'June & July 2026', bestFor: 'Game Strategy & Tactics', price: 480 },
  { id: 'summer-camp-15day', name: '15-Day Masterclass Camp', duration: '15 Days', months: 'June & July 2026', bestFor: 'Competitive Club & High School Prep', price: 650 },
];

export default function Camps() {
  const [camps, setCamps] = useState<any[]>(FALLBACK_CAMPS);
  const campsScrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('/api/camps')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.camps?.length > 0) {
          const uniqueCamps = Array.from(new Map(data.camps.map((c: any) => [c.id, c])).values());
          setCamps(uniqueCamps);
        }
      })
      .catch(() => {
        // Fallback already in state
      });
  }, []);

  return (
    <div className="relative bg-[#FBF9F6] min-h-screen overflow-hidden font-sans pt-32 sm:pt-36 md:pt-40">
      <SEO 
        title="Summer Elite Camps 2026" 
        description="Join Challengers Volleyball Academy Summer Camps in the Bay Area. Intensive 7, 10, and 15-day camps for junior athletes."
      />
      
      {/* Blended Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.05] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6]/90 via-transparent to-[#FBF9F6]/90" />
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10 pb-16 sm:pb-20"
      >
        <div className="gsap-reveal mb-8 sm:mb-10">
          <SectionHeader 
            eyebrow="Summer 2026" 
            title="Summer Elite Camps." 
            italicWord="Elite"
            id="camps-heading"
          />
        </div>

        {/* Camp Overview */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12 sm:mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso leading-tight">
              Intensive training for <span className="text-[#D62828] italic">future champions.</span>
            </h2>
            <p className="text-espresso/75 text-sm sm:text-base font-medium leading-relaxed">
              Our Summer Camps provide a high-energy, structured environment where athletes rapidly improve mechanical precision, court IQ, physical conditioning, and game resilience.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-espresso/5 shadow-md flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-espresso/40 mb-0.5">Availability</h4>
                  <p className="text-sm font-bold text-espresso">June & July 2026</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-espresso/5 shadow-md flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-espresso/40 mb-0.5">Skill Levels</h4>
                  <p className="text-sm font-bold text-espresso">Beginner & Intermediate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 lg:mt-0">
            <div className="aspect-[16/10] max-h-[300px] sm:max-h-[340px] w-full bg-espresso rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200" 
                alt="Volleyball Summer Camp Action" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D62828]/20 rounded-full -z-10 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F9BC00]/20 rounded-full -z-10 blur-2xl" />
          </div>
        </div>

        {/* Camp Cards Section - Unique Admin-Synced Sessions Grid/Carousel */}
        <div className="mb-14 sm:mb-18">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#D62828] text-[10px] font-black uppercase tracking-widest">Summer Sessions</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-condensed font-black uppercase text-espresso mt-1">Available Coaching Sessions</h3>
              <p className="text-espresso/50 text-[10px] font-black uppercase tracking-widest mt-0.5">Official courses &amp; camps · Updated in real-time</p>
            </div>

            {/* Navigation buttons for horizontal scrolling */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button 
                onClick={() => {
                  if (campsScrollRef.current) {
                    campsScrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
                  }
                }}
                className="w-10 h-10 rounded-full bg-white border border-espresso/10 text-espresso flex items-center justify-center hover:bg-[#D62828] hover:text-white transition-all shadow-sm active:scale-95"
                title="Scroll Left"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button 
                onClick={() => {
                  if (campsScrollRef.current) {
                    campsScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
                  }
                }}
                className="w-10 h-10 rounded-full bg-white border border-espresso/10 text-espresso flex items-center justify-center hover:bg-[#D62828] hover:text-white transition-all shadow-sm active:scale-95"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Track - Each course appears exactly once */}
          <div 
            ref={campsScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            {camps.map((camp, idx) => (
              <div 
                key={camp.id || `camp-${idx}`}
                className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] bg-white p-6 sm:p-7 rounded-[2rem] border border-espresso/10 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-[#D62828]/30 relative group overflow-hidden snap-center"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D62828]" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-espresso/60 bg-[#FBF9F6] px-3 py-1 rounded-full border border-espresso/5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#D62828]" />
                      {camp.duration || '2 Hours / Session'}
                    </span>
                    {camp.price !== undefined && (
                      <span className="text-2xl sm:text-3xl font-condensed font-black text-[#D62828]">
                        ${camp.price}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-condensed font-black uppercase text-espresso mb-2 line-clamp-1">
                    {camp.name || camp.title}
                  </h4>
                  
                  <p className="text-xs text-espresso/65 font-medium mb-6 leading-relaxed line-clamp-2 min-h-[32px]">
                    {camp.description || 'Structured daily training clinic focusing on rapid skill acceleration, scrimmages, and conditioning.'}
                  </p>

                  <div className="space-y-2.5 mb-6 pb-5 border-b border-espresso/5">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-espresso/80">
                      <CheckCircle2 className="w-4 h-4 text-[#D62828] shrink-0" />
                      <span className="truncate">{camp.months || camp.schedule || 'June & July 2026'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-espresso/80">
                      <Star className="w-4 h-4 text-[#F9BC00] shrink-0 fill-[#F9BC00]" />
                      <span className="truncate">{camp.bestFor || camp.location || 'Technique & Game Strategy'}</span>
                    </div>
                  </div>
                </div>

                <NavLink 
                  to={`/register?session=${camp.id}`} 
                  className="w-full py-3.5 bg-espresso text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#D62828] transition-all shadow-md active:scale-98"
                >
                  <span>Enroll in Camp</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits of Joining - Clean Matching Palette */}
        <div className="mb-14 sm:mb-18 bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] border border-espresso/5 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-[#D62828] text-[10px] font-black uppercase tracking-widest">Why Attend</span>
            <h3 className="text-2xl sm:text-3xl font-condensed font-black uppercase text-espresso mt-1">
              Benefits of Joining Our Camps
            </h3>
            <p className="text-espresso/60 text-xs sm:text-sm font-medium mt-1">
              Everything your athlete needs to make significant leaps in skill, mindset, and teamwork over the summer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: 'Technical Mastery', desc: 'Accelerated development of serves, spikes, and defensive court positioning.' },
              { title: 'Mental Resilience', desc: 'Workshops on competitive composure, game psychology, and positive focus.' },
              { title: 'Team Bonding', desc: 'Collaborative high-rep drills that build trust, leadership, and communication.' },
              { title: 'Elite Coaching Exposure', desc: 'Direct feedback and biomechanics review from master academy coaches.' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4 items-start p-5 bg-[#FBF9F6] rounded-2xl border border-espresso/5 hover:border-[#D62828]/20 transition-all">
                <div className="w-10 h-10 bg-[#D62828]/10 text-[#D62828] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-base font-serif font-bold text-espresso mb-1">{benefit.title}</h5>
                  <p className="text-xs text-espresso/70 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#D62828] p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[#F9BC00] text-[10px] font-black uppercase tracking-widest mb-2 block">
              Limited Availability
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-black uppercase tracking-tighter mb-4 leading-none text-white">
              Spaces are <span className="text-[#F9BC00] font-serif-italic lowercase italic tracking-normal">filling fast.</span>
            </h2>
            <p className="text-white/85 text-xs sm:text-sm font-medium mb-8 leading-relaxed max-w-md mx-auto">
              Summer camps have capped batch sizes to maintain low coach-to-player ratios. Reserve your spot early.
            </p>
            <NavLink 
              to="/register?session=summer-camp-2026-fremont" 
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-white text-[#D62828] rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#F9BC00] hover:text-espresso transition-all shadow-xl active:scale-95"
            >
              <span>Secure Your Spot</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
          {/* Subtle Sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}

