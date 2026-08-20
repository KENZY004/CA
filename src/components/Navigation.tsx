import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Activity, Shield, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { label: 'Programs', path: '/programs' },
  { label: 'Performance', path: '/performance' },
  { label: 'Waiver', path: '/waiver' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Camps', path: '/camps' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  // Smart Hide-on-Scroll and Style Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Toggle scrolled state for visual style
    setIsScrolled(latest > 50);

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center p-4 sm:p-6 pointer-events-none"
        aria-label="Main navigation"
      >
        <motion.div 
          variants={{
            visible: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: -100, opacity: 0, scale: 0.95 }
          }}
          animate={hidden && !isOpen ? "hidden" : "visible"}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full max-w-[1100px] backdrop-blur-2xl border rounded-full p-2 flex items-center justify-between pointer-events-auto transition-all duration-500",
            isScrolled 
              ? "bg-[#C1272D]/90 border-white/10 shadow-[0_20px_50px_rgba(193,39,45,0.2)] py-2" 
              : "bg-[#C1272D]/70 border-white/20 shadow-none py-3"
          )}
        >
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 group px-4 py-1" aria-label="Challengers Academy Home">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-xl rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 shadow-lg" />
                <span className="relative text-[#C1272D] font-black text-xs leading-none select-none">C</span>
              </div>
              <div className="flex flex-col gap-0">
                <span className="text-white font-condensed text-[13px] font-black tracking-[0.2em] leading-none uppercase">
                  CHALLENGERS
                </span>
                <span className="text-white/60 font-condensed text-[9px] font-bold tracking-[0.3em] leading-none uppercase">
                  ACADEMY
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  cn(
                    "relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-full",
                    isActive 
                      ? "text-[#C1272D] bg-white shadow-md" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/register"
              className="hidden sm:flex bg-white text-[#C1272D] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest items-center gap-2 hover:bg-orange hover:text-white transition-all shadow-lg active:scale-95 group"
            >
              Enroll Now
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </NavLink>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
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
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#C1272D]/95 backdrop-blur-3xl" />
            
            <div className="relative h-full flex flex-col p-10 pt-36">
              <div className="space-y-8">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Academy Navigation</span>
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) => 
                          cn(
                            "group flex items-center justify-between py-2 text-5xl font-condensed font-black uppercase tracking-tighter italic",
                            isActive ? "text-white" : "text-white/30 hover:text-white"
                          )
                        }
                      >
                        {link.label}
                        <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/20">Elite Training</span>
                  <span className="text-white text-sm font-bold italic">National Tier</span>
                </div>
                <div className="space-y-1 text-right">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/20">Athletes</span>
                  <span className="text-white text-sm font-bold italic">1.2k+ Active</span>
                </div>
              </div>

              <div className="mt-auto">
                <NavLink
                  to="/register"
                  className="flex items-center justify-center w-full bg-white text-[#C1272D] py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-[0.98] transition-transform"
                >
                  Join the Squad
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
