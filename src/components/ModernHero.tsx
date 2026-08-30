import React from 'react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Play, Trophy, Target, Users } from 'lucide-react';
import { ASSETS } from '../assets/images';

export default function ModernHero() {
  return (
    <section className="relative min-h-[calc(100vh-104px)] lg:h-[calc(100vh-104px)] flex items-center overflow-hidden bg-white mt-[104px]">
      {/* ── Background Atmospheric Color Shading & Ambient Glow ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Red/Orange glow top-left */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #C1272D 0%, #F26627 60%, transparent 80%)' }}
        />
        {/* Soft Rainbow/Blue glow bottom-left matching the floor splash */}
        <div 
          className="absolute -bottom-20 left-10 w-[480px] h-72 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(ellipse at center, #0066cc 0%, #00cc66 40%, #ffcc00 70%, transparent 90%)' }}
        />
        {/* Radial highlight behind emblem */}
        <div 
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C1272D 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Artwork Image with Wide Seamless Gradient Mask ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.25) 16%, rgba(0,0,0,0.7) 32%, rgba(0,0,0,1) 50%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.25) 16%, rgba(0,0,0,0.7) 32%, rgba(0,0,0,1) 50%)',
        }}
      >
        <img
          src={ASSETS.HERO.BACKGROUND}
          alt="Challengers Volleyball Academy"
          loading="eager"
          className="h-full w-auto max-w-none object-contain object-right"
          style={{
            maxHeight: 'calc(100vh - 104px)',
          }}
        />
      </div>

      {/* ── Strong White Shading from Initial Left Phase Blending into Image ── */}
      <div 
        className="absolute inset-y-0 left-0 w-3/5 lg:w-[55%] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.75) 58%, rgba(255,255,255,0.25) 80%, transparent 100%)',
        }}
      />

      {/* ── Interactive Content Layer (Left Zone) ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-20 flex flex-col justify-center py-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg lg:max-w-xl flex flex-col items-start text-left"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C1272D]/20 bg-white/90 shadow-sm text-[#C1272D] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C1272D] animate-pulse" />
            Challengers Volleyball Academy
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-condensed font-black leading-[0.9] tracking-tighter text-[#1a1a2e] mb-3 sm:mb-4 uppercase">
            TRAIN HARD <br />
            <span className="text-[#C1272D] drop-shadow-[0_4px_24px_rgba(193,39,45,0.25)]">
              PLAY BETTER
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#1a1a2e]/90 text-xs sm:text-sm font-bold tracking-wider uppercase leading-relaxed mb-6 sm:mb-7 max-w-md">
            Real coaching. Real improvement. <br className="hidden sm:inline" />
            For kids and adults of all skill levels.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <NavLink
              to="/register"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C1272D] hover:bg-[#a01e24] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-[0_8px_25px_rgba(193,39,45,0.35)] hover:shadow-[0_12px_32px_rgba(193,39,45,0.5)] active:scale-95 group"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NavLink>

            <NavLink
              to="/about"
              className="inline-flex items-center gap-3 text-[#1a1a2e] hover:text-[#C1272D] font-black text-xs uppercase tracking-widest py-2 transition-colors group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#1a1a2e]/20 bg-white flex items-center justify-center group-hover:border-[#C1272D] group-hover:bg-[#C1272D]/5 transition-all shadow-sm">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="border-b border-transparent group-hover:border-[#C1272D]">About us</span>
            </NavLink>
          </div>

          {/* Bottom 3 Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
            <div className="bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl p-3 sm:p-3.5 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C1272D]/10 text-[#C1272D] flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#1a1a2e] leading-tight">Expert Coaching</h4>
                <p className="text-[10px] font-bold text-[#1a1a2e]/75 leading-tight truncate">Learn from the best</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl p-3 sm:p-3.5 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C1272D]/10 text-[#C1272D] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#1a1a2e] leading-tight">All Skill Levels</h4>
                <p className="text-[10px] font-bold text-[#1a1a2e]/75 leading-tight truncate">Kids to Adults</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl p-3 sm:p-3.5 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C1272D]/10 text-[#C1272D] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#1a1a2e] leading-tight">Stronger Together</h4>
                <p className="text-[10px] font-bold text-[#1a1a2e]/75 leading-tight truncate">Build Confidence</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
