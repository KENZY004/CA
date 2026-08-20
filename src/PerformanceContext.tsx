import React, { createContext, useContext, useState, useEffect } from 'react';
import { performanceStats as initialStats } from './data';

interface PerformanceContextType {
  stats: typeof initialStats;
  updateStats: (newStats: typeof initialStats) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState(initialStats);

  // Initialize from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('challengers_performance_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed['5-10']) {
          parsed['5-10'] = initialStats['5-10'];
        }
        setStats(parsed);
      } catch (e) {
        console.error('Failed to load stats', e);
      }
    }
  }, []);

  const updateStats = (newStats: typeof initialStats) => {
    setStats(newStats);
    localStorage.setItem('challengers_performance_data', JSON.stringify(newStats));
  };

  return (
    <PerformanceContext.Provider value={{ stats, updateStats }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}
