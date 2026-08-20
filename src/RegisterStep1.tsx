import { useState, useEffect, type FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Phone, Mail, Calendar, ChevronRight, Loader2, Users, Download, FileText } from 'lucide-react';
import SectionHeader from './components/SectionHeader';
import { PROGRAMS } from './data';
import { domToCanvas } from 'modern-screenshot';
import jsPDF from 'jspdf';

export default function RegisterStep1() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<Record<string, { filled: number, capacity: number }>>({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    parentName: '',
    phone: '',
    email: '',
    programId: '',
    batch: 'Morning (8AM - 10AM)',
    source: ''
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/availability');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setAvailability(data.availability);
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      }
    };
    fetchAvailability();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        navigate(`/reserve/${data.leadId}`);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!formRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await domToCanvas(formRef.current, {
        scale: 2,
        backgroundColor: '#FFFFFF',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Challengers_Registration_Form.pdf');
    } catch (error) {
      console.error('PDF Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedProgramAvailability = formData.programId ? availability[formData.programId] : null;
  const spotsLeft = selectedProgramAvailability ? selectedProgramAvailability.capacity - selectedProgramAvailability.filled : null;

  return (
    <div className="relative pt-32 pb-24 bg-ivory/50 min-h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1592656670411-b91990822650?q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.03] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/40 to-ivory/80" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-3xl relative z-10"
      >
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader 
            eyebrow="Step 1 of 2" 
            title="Tell us about you."
            italicWord="about"
            id="join-heading"
          />
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-white border border-espresso/10 text-espresso px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Download Form (PDF)
          </button>
        </div>

        <div ref={formRef} className="bg-white rounded-[28px] shadow-2xl border border-espresso/5 overflow-hidden">
          <div className="bg-espresso text-white p-6 px-10 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Interest Form</span>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Enrollment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-espresso/20 w-5 h-5" />
                  <input 
                    required
                    placeholder="Athlete's Name"
                    className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-orange transition-all font-Archivo font-bold"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Age</label>
                <input 
                  required
                  type="number"
                  placeholder="e.g. 14"
                  className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 px-8 outline-none focus:border-orange transition-all font-Archivo font-bold"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Parent / Guardian Name (if minor)</label>
              <input 
                placeholder="Name"
                className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 px-8 outline-none focus:border-orange transition-all font-Archivo font-bold"
                value={formData.parentName}
                onChange={e => setFormData({...formData, parentName: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-espresso/20 w-5 h-5" />
                  <input 
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-orange transition-all font-Archivo font-bold"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-espresso/20 w-5 h-5" />
                  <input 
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-orange transition-all font-Archivo font-bold"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Program Selected</label>
                <select 
                  required
                  className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 px-8 outline-none focus:border-orange transition-all font-Archivo font-bold appearance-none"
                  value={formData.programId}
                  onChange={e => setFormData({...formData, programId: e.target.value})}
                >
                  <option value="">Select Program</option>
                  {PROGRAMS.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
                {spotsLeft !== null && (
                  <p className={`text-[10px] font-black uppercase tracking-widest ml-2 flex items-center gap-2 ${spotsLeft < 5 ? 'text-red-500' : 'text-green-600'}`}>
                    <Users className="w-3 h-3" />
                    {spotsLeft <= 0 ? 'Waitlist Only' : `Only ${spotsLeft} spots left in this program`}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">Preferred Batch</label>
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-espresso/20 w-5 h-5" />
                  <select 
                    className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-orange transition-all font-Archivo font-bold appearance-none"
                    value={formData.batch}
                    onChange={e => setFormData({...formData, batch: e.target.value})}
                  >
                    <option>Morning (8AM - 10AM)</option>
                    <option>Afternoon (4PM - 6PM)</option>
                    <option>Evening (6PM - 8PM)</option>
                    <option>Weekend Intensive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40 ml-2 font-Archivo">How did you hear about us?</label>
              <input 
                placeholder="e.g. Social Media, Friend, Search"
                className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-5 px-8 outline-none focus:border-orange transition-all font-Archivo font-bold"
                value={formData.source}
                onChange={e => setFormData({...formData, source: e.target.value})}
              />
            </div>

            <div className="pt-8 border-t border-espresso/5">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-espresso text-white py-6 rounded-2xl font-Archivo font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange transition-all shadow-xl hover:shadow-orange/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Next Step: Reserve Spot
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] font-Archivo font-bold text-espresso/40 mt-6 uppercase tracking-widest">
                No payment required at this step
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
