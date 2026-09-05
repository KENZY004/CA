import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, LogOut, RefreshCcw } from 'lucide-react';

interface Props {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onLogout: () => void;
  onExtend: () => void;
}

export default function SessionTimeoutModal({ timeoutMinutes = 30, warningMinutes = 5, onLogout, onExtend }: Props) {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(warningMinutes * 60);
  const lastActivityRef = useRef<number>(Date.now());
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetActivity = () => {
    lastActivityRef.current = Date.now();
    if (showWarning) return;
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      setCountdown(warningMinutes * 60);
    }, (timeoutMinutes - warningMinutes) * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetActivity, { passive: true }));
    resetActivity();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetActivity));
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  useEffect(() => {
    if (showWarning) {
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            onLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [showWarning]);

  const handleExtend = () => {
    setShowWarning(false);
    setCountdown(warningMinutes * 60);
    onExtend();
    resetActivity();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
          >
            <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-orange" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-espresso mb-2">Session Expiring</h3>
            <p className="text-espresso/60 text-sm mb-6">
              You've been inactive. You'll be logged out in
            </p>
            <div className="text-5xl font-black text-orange mb-8 font-mono tabular-nums">
              {formatTime(countdown)}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onLogout}
                className="flex-1 py-3 rounded-2xl border-2 border-espresso/10 text-espresso/60 text-xs font-black uppercase tracking-widest hover:border-red-300 hover:text-red-500 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
              <button
                onClick={handleExtend}
                className="flex-1 py-3 rounded-2xl bg-orange text-white text-xs font-black uppercase tracking-widest hover:bg-espresso transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Stay Logged In
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
