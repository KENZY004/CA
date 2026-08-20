/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import WhatsAppFAB from './components/WhatsAppFAB';
import { PerformanceProvider } from './PerformanceContext';

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Programs = lazy(() => import('./Programs'));
const Camps = lazy(() => import('./Camps'));
const Gallery = lazy(() => import('./Gallery'));
const Pricing = lazy(() => import('./Pricing'));
const Locations = lazy(() => import('./Locations'));
const Contact = lazy(() => import('./Contact'));
const Register = lazy(() => import('./Register'));
const Admin = lazy(() => import('./Admin'));
const Privacy = lazy(() => import('./Privacy'));
const Terms = lazy(() => import('./Terms'));
const Performance = lazy(() => import('./Performance'));
const Waiver = lazy(() => import('./Waiver'));
const Login = lazy(() => import('./Login'));

function Loading() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function SmoothScroll() {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Use GSAP's ticker for Lenis
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Reset scroll to top instantly on route change
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <PerformanceProvider>
        <SmoothScroll />
        <CustomCursor />
        <Navigation />
        <WhatsAppFAB />
        <main className="min-h-screen">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/camps" element={<Camps />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/join" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/waiver" element={<Waiver />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </PerformanceProvider>
    </Router>
  );
}
