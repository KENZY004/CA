import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, X, Download, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function WaiverBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('waiver-banner-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('waiver-banner-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-[100] w-full max-w-[350px]"
        >
          <div className="bg-espresso text-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-orange">Safety First</h4>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Required Document</p>
              </div>
            </div>

            <p className="text-xs font-bold text-white/70 leading-relaxed mb-8 italic">
              All athletes must have a signed waiver before participating in clinics or camps.
            </p>

            <div className="flex flex-col gap-3">
              <NavLink 
                to="/waiver"
                className="flex items-center justify-between w-full bg-white text-espresso px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-orange hover:text-white transition-all group/btn"
              >
                Read & Download Waiver
                <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
              </NavLink>
              
              <button 
                onClick={handleDismiss}
                className="text-center text-[8px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors py-2"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
