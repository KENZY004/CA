import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import SectionHeader from './components/SectionHeader';
import SEO from './components/SEO';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simple demo auth
    setTimeout(() => {
      if (password === 'admin123') {
        localStorage.setItem('challengers_auth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid administrative credentials. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="relative py-24 md:py-32 bg-ivory min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <SEO 
        title="Admin Login" 
        description="Administrative access for Challengers Volleyball Academy staff."
      />
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-20 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px]" />
           <div className="absolute bottom-20 left-0 w-96 h-96 bg-espresso/5 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="mb-12 text-center">
            <SectionHeader 
              eyebrow="Staff Portal" 
              title="Admin access only."
              italicWord="Admin"
              id="admin-login-header"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] shadow-2xl border border-espresso/5 p-10 md:p-12"
          >
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-espresso rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-condensed font-black uppercase text-espresso">Administrative Login</h3>
              <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Access Key</label>
                <div className="relative">
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-ivory border border-espresso/5 rounded-2xl py-5 px-6 outline-none focus:border-orange transition-all font-medium text-sm text-center tracking-[0.5em]"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-espresso transition-all shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Authorize Access"}
                <LogIn className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-espresso/5 flex justify-center">
              <NavLink to="/" className="text-[10px] font-black uppercase tracking-widest text-espresso/40 hover:text-orange transition-colors flex items-center gap-2">
                <ArrowLeft className="w-3 h-3" /> Back to Academy
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

