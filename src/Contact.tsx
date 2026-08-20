import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useGsapReveal } from './hooks/useGsapReveal';
import SEO from './components/SEO';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  useGsapReveal();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        className="container mx-auto px-4 relative z-10"
      >
        <div className="gsap-reveal mb-10">
          <SectionHeader 
            eyebrow="Get in Touch" 
            title="Ready to spike your skills?"
            italicWord="spike"
            id="contact-header"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-12 items-start">
          {/* Contact Info */}
          <div className="space-y-12 gsap-reveal">
            <div>
              <h2 className="text-5xl md:text-7xl font-condensed uppercase tracking-tighter mb-6 leading-tight text-espresso">Let's start a <br /><span className="text-[#D62828] italic">conversation.</span></h2>
              <p className="text-xl font-medium text-espresso/60 leading-relaxed max-w-xl">
                Have questions about our programs, camps, or schedule? We're here to help you find the perfect fit for your athlete.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: '+1 (510) 555-0123', sub: 'Mon-Fri 9am - 6pm', color: 'bg-[#F9BC00]' },
                { icon: Mail, label: 'Email', value: 'hello@challengerscoaching.com', sub: 'Response within 24 hours', color: 'bg-[#D62828]' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+1 863-845-9913', sub: 'Fastest for quick questions', color: 'bg-[#1A1A1A]' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 items-center p-6 bg-white rounded-3xl border border-espresso/5 shadow-xl group transition-all"
                >
                  <div className={`w-14 h-14 ${item.color} ${idx === 0 ? 'text-espresso' : 'text-white'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-espresso/40 mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-espresso">{item.value}</p>
                    <p className="text-xs font-medium text-espresso/30 uppercase tracking-widest">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-espresso/5 relative overflow-hidden group gsap-reveal">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9BC00]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="w-24 h-24 bg-[#D62828]/10 rounded-full flex items-center justify-center mx-auto text-[#D62828]">
                  <Send className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif text-espresso mb-4">Message Sent!</h3>
                  <p className="text-espresso/60 font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. We've received your message and our team will get back to you shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#D62828] font-black uppercase tracking-widest text-[10px] hover:text-espresso transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Full Name</label>
                    <input 
                      required
                      className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-5 px-6 transition-all rounded-2xl font-medium"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Email Address</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-5 px-6 transition-all rounded-2xl font-medium"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Subject</label>
                  <select className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-5 px-6 transition-all rounded-2xl font-medium appearance-none">
                    <option>General Inquiry</option>
                    <option>Program Registration</option>
                    <option>Summer Camp Questions</option>
                    <option>Private Coaching Request</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-[#FBF9F6] border border-espresso/5 focus:border-[#F9BC00] outline-none py-5 px-6 transition-all rounded-2xl font-medium resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" className="w-full bg-espresso text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#D62828] transition-all shadow-xl hover:shadow-[#D62828]/20">
                  Send Message
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
