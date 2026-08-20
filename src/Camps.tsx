import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import SectionHeader from './components/SectionHeader';
import { Calendar, Users, Target, Trophy, CheckCircle2, ChevronRight, Clock, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const CAMP_DURATIONS = [
  { id: '7-day', name: '7-Day Intensive', duration: '7 Days', months: 'June & July', bestFor: 'Technique Refinement' },
  { id: '10-day', name: '10-Day Elite', duration: '10 Days', months: 'June & July', bestFor: 'Game Strategy' },
  { id: '15-day', name: '15-Day Master', duration: '15 Days', months: 'June & July', bestFor: 'High Performance' },
];

const AGE_GROUPS = [
  { label: '5–8 Years', focus: 'Fundamental Fun' },
  { label: '9–13 Years', focus: 'Skill Development' },
  { label: '14–18 Years', focus: 'Competitive Edge' },
  { label: '18+ Years', focus: 'Elite Mastery' },
];

export default function Camps() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  // Scroll-driven: hero fades out + scales up as you scroll past it
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroScale  = useTransform(scrollYProgress, [0, 0.85], [1, 1.07]);
  // Parallax: image moves up slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <div className="relative bg-[#FBF9F6] min-h-screen overflow-hidden font-sans">
      
      {/* Blended Background - Set to Fixed for better visual depth */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.06] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6]/90 via-transparent to-[#FBF9F6]/90" />
      </div>

      {/* ── SCROLL-DRIVEN HERO (Framer Motion useScroll) ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 pt-28 pb-10 overflow-hidden"
      >
        {/* soft colour blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9BC00]/20 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D62828]/10 rounded-full blur-[100px] pointer-events-none -ml-20" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#D62828]" />
              <span className="text-[#D62828] font-black text-[9px] tracking-[0.4em] uppercase">Summer 2026</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-condensed text-espresso uppercase tracking-tighter leading-[0.88] mb-5">
              Summer<br />
              <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">Elite</span> Camps.
            </h1>
            <p className="text-espresso/65 text-sm md:text-base font-medium max-w-md leading-relaxed mb-7">
              Intensive multi-day volleyball programs for every age group — coached by internationally certified athletes.
            </p>

            {/* quick stat pills */}
            <div className="flex flex-wrap gap-3 mb-7">
              {[
                { n: 'June & July', l: 'Season' },
                { n: '4 Age Groups', l: 'All Levels' },
                { n: '7–15 Days', l: 'Duration' },
              ].map((s) => (
                <div key={s.l} className="px-4 py-2.5 bg-white rounded-xl border border-espresso/5 shadow-sm">
                  <div className="text-sm font-condensed text-[#D62828]">{s.n}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-espresso/40">{s.l}</div>
                </div>
              ))}
            </div>

            <NavLink
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D62828] text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-espresso transition-colors"
            >
              Secure Your Spot <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </motion.div>

          {/* Right: volleyball image — clearly visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Main image with parallax scroll */}
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-1 group"
            >
              <img
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200"
                alt="Volleyball summer camp action"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 bg-[#F9BC00] px-4 py-2 rounded-xl shadow-lg">
                <span className="text-[8px] font-black uppercase tracking-widest text-espresso">🏐 Coach Wilson's Camps</span>
              </div>
            </motion.div>
            {/* decorative blobs */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#D62828] rounded-full -z-10 blur-2xl opacity-25" />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#F9BC00] rounded-full -z-10 blur-2xl opacity-30" />
            {/* second small image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-2 hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400"
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── EXISTING CONTENT ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 relative z-10 pt-8 pb-16"
      >
        <div className="gsap-reveal mb-10">
          <SectionHeader 
            eyebrow="Summer 2026" 
            title="Summer Elite Camps." 
            italicWord="Elite"
            id="camps-heading"
          />
        </div>

        {/* Camp Overview */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif text-espresso leading-tight">Intensive training for <span className="text-[#D62828] italic">future champions.</span></h2>
            <p className="text-espresso/70 text-sm md:text-base font-medium leading-relaxed">
              Our Summer Camps are designed to provide a high-energy, focused environment where players can rapidly improve their skills, build confidence, and forge lasting friendships.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#F9BC00] rounded-xl border border-espresso/5 shadow-sm">
                <Calendar className="w-5 h-5 text-espresso mb-2" />
                <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso mb-0.5">Availability</h4>
                <p className="text-xs font-bold text-espresso/60">June & July 2026</p>
              </div>
              <div className="p-4 bg-[#D62828] rounded-xl border border-espresso/5 shadow-sm text-white">
                <Target className="w-5 h-5 text-[#F9BC00] mb-2" />
                <h4 className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Skill Levels</h4>
                <p className="text-xs font-bold text-white">Beginner & Intermediate</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/10] bg-espresso rounded-[2rem] overflow-hidden rotate-1 shadow-xl relative z-10 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200" 
                alt="Volleyball Summer Camp Action" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#D62828] rounded-full -z-10 blur-2xl opacity-30" />
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-[#F9BC00] rounded-full -z-10 blur-2xl opacity-30" />
          </div>
        </div>

        {/* Duration Options */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-serif text-espresso mb-2">Choose Your Duration</h3>
            <p className="text-espresso/60 text-[9px] font-black uppercase tracking-widest">Multiple options to fit your summer schedule</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {CAMP_DURATIONS.map((camp, idx) => (
              <motion.div 
                key={camp.id}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-[1.5rem] border border-espresso/5 shadow-md group transition-all relative overflow-hidden ${idx === 0 ? 'bg-[#1A1A1A] text-white' : idx === 1 ? 'bg-[#D62828] text-white' : 'bg-[#F9BC00] text-espresso'}`}
              >
                {/* Blurry Background Image */}
                <div className="absolute inset-0 z-0 opacity-10 blur-[2px] pointer-events-none">
                  <img 
                    src={idx === 0 ? "https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=600" : idx === 1 ? "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600" : "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600"} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${idx === 0 ? 'bg-[#1A1A1A]/40' : idx === 1 ? 'bg-[#D62828]/40' : 'bg-[#F9BC00]/40'}`} />
                </div>

                <div className="relative z-10">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${idx === 2 ? 'bg-espresso/10 text-espresso' : 'bg-white/10 text-white'}`}>
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-base font-serif mb-0.5">{camp.name}</h4>
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${idx === 2 ? 'text-espresso/60' : 'text-white/60'}`}>{camp.duration}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className={`flex items-center gap-2 text-[10px] font-medium ${idx === 2 ? 'text-espresso/70' : 'text-white/80'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${idx === 2 ? 'text-espresso' : 'text-white'}`} />
                      {camp.months}
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] font-medium ${idx === 2 ? 'text-espresso/70' : 'text-white/80'}`}>
                      <Star className={`w-3 h-3 ${idx === 2 ? 'text-espresso' : 'text-white'}`} />
                      {camp.bestFor}
                    </div>
                  </div>
                  <NavLink to="/register" className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest transition-colors ${idx === 2 ? 'text-espresso hover:text-espresso/60' : 'text-white hover:text-white/60'}`}>
                    Enroll Now <ChevronRight className="w-3 h-3" />
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Age Groups & Skill Levels */}
        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-[2rem] text-white overflow-hidden relative">
            {/* Blurry Background Image */}
            <div className="absolute inset-0 z-0 opacity-10 blur-[4px] pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1547347298-4074fc3086a0?q=80&w=800" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1A1A1A]/60" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-serif mb-4 text-[#F9BC00]">Age Group Eligibility</h3>
              <div className="grid grid-cols-2 gap-3">
                {AGE_GROUPS.map((group, idx) => (
                  <div key={idx} className="p-3.5 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                    <h5 className="text-sm font-serif mb-0.5">{group.label}</h5>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{group.focus}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D62828]/10 rounded-full blur-3xl -mr-32 -mt-32" />
          </div>

          <div className="bg-[#F3722C] p-6 md:p-8 rounded-[2rem] border border-espresso/5 shadow-xl text-white relative overflow-hidden">
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
              <h3 className="text-xl font-serif mb-4 text-espresso">Benefits of Joining</h3>
              <div className="space-y-3">
                {[
                  { title: 'Technical Mastery', desc: 'Accelerated development of serves, spikes, and defensive play.' },
                  { title: 'Mental Resilience', desc: 'Workshops on court psychology and competitive mindset.' },
                  { title: 'Team Bonding', desc: 'Collaborative drills that build trust and communication skills.' },
                  { title: 'Elite Exposure', desc: 'Feedback from master coaches with international experience.' }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-serif mb-0.5">{benefit.title}</h5>
                      <p className="text-xs text-white/80 leading-snug">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#D62828] p-10 md:p-14 rounded-[3rem] text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-condensed uppercase tracking-tighter mb-4 leading-none">
              Spaces are <span className="#F9BC00 font-serif-italic lowercase italic tracking-normal">filling fast.</span>
            </h2>
            <p className="text-white/80 text-sm font-medium mb-8">
              Our summer camps are our most popular programs. Don't miss your chance to train with Coach Wilson this summer.
            </p>
            <NavLink 
              to="/register" 
              className="inline-block px-8 py-4 bg-espresso text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#F9BC00] transition-all shadow-xl"
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
