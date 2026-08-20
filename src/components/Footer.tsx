import { NavLink } from 'react-router-dom';
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-espresso text-white pt-32 pb-16 relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      {/* Massive Background Text - Rebound Style */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="text-[25vw] font-serif font-black text-white/[0.03] leading-[0.7] tracking-tighter transform translate-y-[15%]">
          CHALLENGERS
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-yellow rotate-45" aria-hidden="true"></div>
              <span className="text-3xl font-condensed tracking-[0.2em]">CHALLENGERS</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs font-medium">
              We offer top-level volleyball training for players of all levels. Join us to improve your game and reach your goals.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="space-y-6" aria-label="Footer Navigation">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange">Training</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><NavLink to="/programs" className="hover:text-yellow transition-colors">Programs</NavLink></li>
              <li><NavLink to="/performance" className="hover:text-yellow transition-colors">Performance</NavLink></li>
              <li><NavLink to="/camps" className="hover:text-yellow transition-colors">Elite Camps</NavLink></li>
              <li><NavLink to="/waiver" className="hover:text-yellow transition-colors">Safety Waiver</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-yellow transition-colors">Pricing</NavLink></li>
              <li><NavLink to="/about" className="hover:text-yellow transition-colors">Our Story</NavLink></li>
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange">Contact Us</h4>
            <address className="text-sm font-medium leading-relaxed not-italic">
              Performance Academy HQ<br />
              21st Floor, Elite Tower<br />
              123 Spike Avenue, NY<br />
              <a href="mailto:info@challengers.com" className="text-white/60 text-xs hover:text-white transition-colors">info@challengers.com</a>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 id="newsletter-label" className="text-[10px] font-black uppercase tracking-[0.4em] text-orange">Our Newsletter</h4>
            <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Newsletter Email</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="YOUR EMAIL" 
                aria-describedby="newsletter-label"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:bg-white/20 transition-all w-full placeholder:text-white/60 text-white"
              />
              <button 
                className="bg-orange text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-yellow hover:text-espresso transition-all shrink-0 shadow-xl"
                aria-label="Subscribe to newsletter"
              >
                <ArrowUpRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
            © 2026 CHALLENGERS ACADEMY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
            <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors">Terms</NavLink>
            <div className="flex items-center gap-4 ml-4">
              <a href="#" aria-label="Visit Challengers Academy on Instagram">
                <Instagram className="w-4 h-4 hover:text-white cursor-pointer" />
              </a>
              <a href="#" aria-label="Visit Challengers Academy on Twitter">
                <Twitter className="w-4 h-4 hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
