import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useGsapReveal } from './hooks/useGsapReveal';
import SEO from './components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  useGsapReveal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again or reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-12 md:py-16 bg-[#FBF9F6] min-h-screen overflow-hidden font-sans">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Challengers Volleyball Academy. Reach out for enrollment, trial sessions, or any inquiries about our elite training programs."
      />
      
      {/* Blended Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.05] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6]/80 via-transparent to-[#FBF9F6]/80" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 pt-24 sm:pt-28 md:pt-32"
      >
        {/* Balanced Section Header */}
        <div className="gsap-reveal mb-8 sm:mb-12">
          <SectionHeader 
            eyebrow="Get in Touch" 
            title="Ready to spike your skills?"
            italicWord="spike"
            headingClassName="text-3xl sm:text-5xl md:text-6xl font-condensed uppercase tracking-tight leading-tight"
            id="contact-header"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 gsap-reveal">
            {[
              { icon: Phone, label: 'Phone', value: '+1 (510) 555-0123', sub: 'Mon-Fri 9am - 6pm', color: 'bg-[#F9BC00]' },
              { icon: Mail, label: 'Email', value: 'hello@challengerscoaching.com', sub: 'Response within 24 hours', color: 'bg-[#D62828]' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+1 863-845-9913', sub: 'Fastest for quick questions', color: 'bg-[#1A1A1A]' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 6 }}
                className="flex gap-4 sm:gap-5 items-center p-4 sm:p-5 bg-white rounded-2xl border border-espresso/5 shadow-md group transition-all"
              >
                <div className={`w-12 h-12 ${item.color} ${idx === 0 ? 'text-espresso' : 'text-white'} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-espresso/40 mb-0.5">{item.label}</p>
                  <p className="text-sm sm:text-base font-bold text-espresso">{item.value}</p>
                  <p className="text-[10px] font-medium text-espresso/40 uppercase tracking-wider">{item.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Academy Locations Quick Info */}
            <div className="p-5 bg-[#FBF9F6] rounded-2xl border border-espresso/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-espresso mb-1">Bay Area Training Locations</h4>
              <p className="text-xs text-espresso/60 leading-relaxed font-medium">
                Serving Fremont, Tracy, San Leandro, and surrounding communities with indoor gym and outdoor park training.
              </p>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-xl border border-espresso/5 relative overflow-hidden group gsap-reveal">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9BC00]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12 space-y-6 sm:space-y-8"
              >
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-[#D62828]/10 rounded-full flex items-center justify-center mx-auto text-[#D62828]">
                  <Send className="w-8 sm:w-12 h-8 sm:h-12" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-4xl font-serif text-espresso mb-3 sm:mb-4">Message Sent!</h3>
                  <p className="text-espresso/60 font-medium leading-relaxed max-w-sm mx-auto text-xs sm:text-sm">
                    Thank you for reaching out. We've received your message and our team will get back to you shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#D62828] font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:text-espresso transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8 relative z-10">
                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                    {errorMsg}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Full Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-3.5 sm:py-5 px-4 sm:px-6 transition-all rounded-xl sm:rounded-2xl font-medium text-sm"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Email Address</label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-3.5 sm:py-5 px-4 sm:px-6 transition-all rounded-xl sm:rounded-2xl font-medium text-sm"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-3.5 sm:py-5 px-4 sm:px-6 transition-all rounded-xl sm:rounded-2xl font-medium text-sm appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Program Registration</option>
                    <option>Summer Camp Questions</option>
                    <option>Private Coaching Request</option>
                  </select>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-3.5 sm:py-5 px-4 sm:px-6 transition-all rounded-xl sm:rounded-2xl font-medium text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-espresso text-white py-4 sm:py-6 rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#D62828] disabled:opacity-50 transition-all shadow-xl hover:shadow-[#D62828]/20"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
