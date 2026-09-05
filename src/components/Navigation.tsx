import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { label: 'Programs', path: '/programs', hasArrow: true },
  { label: 'Performance', path: '/performance', hasArrow: true },
  { label: 'Waiver', path: '/waiver' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Camps', path: '/camps' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60]" aria-label="Site header">

        {/* ── Announcement Bar ── */}
        <div className="w-full bg-[#0f0f1a] border-b border-white/5 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-9">
            {/* Ticker left */}
            <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
              <span className="text-[#FFD700] text-[9px] sm:text-[10px] font-black uppercase tracking-widest shrink-0 flex items-center gap-1">
                ⚡ UPCOMING SEASON
              </span>
              <div className="overflow-hidden flex-1">
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                  className="flex whitespace-nowrap"
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mr-8">
                      • WEEKEND BATCHES AVAILABLE &nbsp;• FREMONT &nbsp;• TRACY &nbsp;• SAN LEANDRO &nbsp;
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Social icons right */}
            <div className="hidden sm:flex items-center gap-4 ml-4 shrink-0">
              <a 
                href="https://www.instagram.com/challengers_volleyball_academy" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1CFx15eApf/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://youtube.com/@challengersflorida?si=v4WMitdB1xMj9Q44" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Navbar ── */}
        <nav className="w-full bg-[#1a1a2e] border-b border-white/8 shadow-lg" aria-label="Main navigation">
          <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-[68px]">

            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Challengers Academy Home"
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/academy_logo.png"
                  alt="Challengers Volleyball Academy Logo"
                  className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-0 leading-none">
                <span className="text-white font-condensed text-[15px] font-black tracking-[0.18em] uppercase leading-none">
                  CHALLENGERS
                </span>
                <span className="text-[#C1272D] font-condensed text-[10px] font-black tracking-[0.25em] uppercase leading-none mt-0.5">
                  ACADEMY
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-200 rounded',
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  {link.label}
                  {link.hasArrow && <ChevronDown className="w-3 h-3 opacity-60" />}
                </NavLink>
              ))}
            </div>

            {/* Enroll Now + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <NavLink
                to="/register"
                className="hidden sm:flex items-center gap-2 bg-[#C1272D] hover:bg-[#a01e24] text-white px-6 py-2.5 rounded text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-[0_4px_20px_rgba(193,39,45,0.4)] group"
              >
                Enroll Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </NavLink>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded text-white hover:bg-white/20 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#1a1a2e]/98 backdrop-blur-3xl" />

            <div className="relative h-full flex flex-col p-8 pt-[110px]">
              <div className="space-y-6">
                <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Academy Navigation</span>
                <div className="flex flex-col gap-4">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          cn(
                            'group flex items-center justify-between py-3 border-b border-white/8 text-4xl font-condensed font-black uppercase tracking-tighter',
                            isActive ? 'text-white' : 'text-white/30 hover:text-white'
                          )
                        }
                      >
                        {link.label}
                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C1272D]" />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <NavLink
                  to="/register"
                  className="flex items-center justify-center gap-3 w-full bg-[#C1272D] text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl active:scale-[0.98] transition-transform"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
