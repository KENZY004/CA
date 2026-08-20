import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, Shield, User, Search, Package, Calendar, Download, Loader2, Info, FileText } from 'lucide-react';
import SectionHeader from './components/SectionHeader';
import confetti from 'canvas-confetti';
import { domToCanvas } from 'modern-screenshot';
import jsPDF from 'jspdf';

const PROGRAMS_DATA = [
  { 
    id: 'reg-p1', 
    category: 'Regular Coaching', 
    title: 'Package 1 (4 Sessions)', 
    fee: 200, 
    sessions: 4, 
    duration: '2 Hours/Session',
    coach: 'Wilson Mathew',
    schedule: 'Weekends (Sat/Sun)',
    eligibility: 'Beginners to Intermediate',
    description: 'Perfect for athletes starting their journey or looking to solidify fundamentals.'
  },
  { 
    id: 'reg-p2', 
    category: 'Regular Coaching', 
    title: 'Package 2 (12 Sessions)', 
    fee: 550, 
    sessions: 12, 
    duration: '2 Hours/Session',
    coach: 'Wilson Mathew',
    schedule: '3 Days/Week',
    eligibility: 'Intermediate to Advanced',
    description: 'Intensive training focusing on position-specific mastery and game strategy.'
  },
  { 
    id: 'personal', 
    category: 'Personal Training', 
    title: 'One-on-One Coaching', 
    fee: 100, 
    sessions: 1, 
    duration: 'Customized',
    coach: 'Specialist Coaches',
    schedule: 'Flexible / By Appointment',
    eligibility: 'All Skill Levels',
    description: 'Custom-tailored drills to focus on your specific areas of improvement.'
  },
  { 
    id: 'camp-7', 
    category: 'Summer Camp', 
    title: '7-Day Intensive Camp', 
    fee: 350, 
    sessions: 7, 
    duration: 'Half-Day',
    coach: 'Wilson Mathew & Team',
    schedule: 'Mon-Sun',
    eligibility: 'Age 5-18',
    description: 'A focused week of volleyball mastery, fun, and competitive play.'
  }
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS_DATA[0] | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    dob: '',
    primaryEmail: '',
    secondaryEmail: '',
    primaryPhone: '',
    secondaryPhone: '',
    schoolName: '',
    currentGrade: '',
    medicalConditions: '',
    tshirtSize: 'M',
    waiverAccepted: false
  });

  const filteredPrograms = PROGRAMS_DATA.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleDownloadPDF = async () => {
    if (!formRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await domToCanvas(formRef.current, { scale: 2, backgroundColor: '#FFFFFF' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Registration_${formData.studentName || 'Form'}.pdf`);
    } catch (error) {
      console.error('PDF Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const [leadId, setLeadId] = useState<string | null>(null);

  const handleLeadSubmit = async () => {
    if (!selectedProgram) return;
    setIsProcessing(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          programId: selectedProgram.id,
          fee: selectedProgram.fee
        }),
      });
      const data = await response.json();
      if (data.success) {
        setLeadId(data.leadId);
        nextStep();
      } else {
        alert(data.message || 'Failed to capture registration details.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadId) return;
    
    setIsProcessing(true);
    try {
      // 1. Create Payment Intent
      const intentRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      const intentData = await intentRes.json();
      
      if (!intentData.clientSecret) throw new Error('Payment failed to initialize');

      // 2. Verify Payment (In a real app with Stripe Elements, this would happen after Stripe.confirmPayment)
      // Since we're using a simplified custom form, we'll call our verification endpoint
      const verifyRes = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentIntentId: intentData.clientSecret, // In mock mode, this is fine
          leadId 
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ea580c', '#ffffff', '#1B1B1D']
        });
        nextStep();
      } else {
        alert('Payment verification failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please check your credentials.');
    } finally {
      setIsProcessing(false);
    }
  };

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
        className="container mx-auto px-4 max-w-4xl relative z-10"
      >
        <div className="mb-12">
          <SectionHeader 
            eyebrow={`Step ${step} of 6`} 
            title="Academy Enrollment."
            italicWord="Enrollment"
            id="enroll-heading"
          />
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-espresso/5 -z-10 rounded-full" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-orange -z-10 rounded-full" 
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / 5) * 100}%` }}
          />
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500
                ${step >= s ? 'bg-orange text-white shadow-lg scale-110' : 'bg-white border-2 border-espresso/5 text-espresso/20'}
              `}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-espresso/5 relative overflow-hidden min-h-[600px] flex flex-col">
          <div className="bg-orange/10 px-8 py-3 border-b border-orange/10 flex items-center justify-center gap-3">
            <Shield className="w-3 h-3 text-orange" />
            <p className="text-[10px] font-black uppercase tracking-widest text-orange text-center">
              Notice: All enrollment fees are NON-REFUNDABLE.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: SEARCH & SELECT */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12 flex-grow">
                <div className="mb-8">
                  <h3 className="text-3xl font-condensed font-black uppercase text-espresso">Search Programs</h3>
                  <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Find your perfect training path</p>
                </div>
                <div className="relative mb-8">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-espresso/30 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder="Search programs, camps, or coaching types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-ivory/50 border border-espresso/5 rounded-2xl py-6 pl-16 pr-6 outline-none focus:border-orange transition-all font-Archivo font-bold"
                  />
                </div>
                <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredPrograms.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProgram(p)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between group
                        ${selectedProgram?.id === p.id ? 'border-orange bg-orange/5 shadow-inner' : 'border-espresso/5 hover:border-orange/20 bg-white'}
                      `}
                    >
                      <div className="flex gap-6 items-center">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedProgram?.id === p.id ? 'bg-orange text-white' : 'bg-ivory text-espresso/20'}`}>
                            <Package className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-orange mb-1 block">{p.category}</span>
                            <h4 className="font-serif text-xl text-espresso group-hover:text-orange transition-colors">{p.title}</h4>
                            <div className="flex gap-4 mt-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-espresso/30 flex items-center gap-1">
                                <CreditCard className="w-3 h-3" /> ${p.fee}
                              </span>
                            </div>
                         </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedProgram?.id === p.id ? 'bg-orange text-white' : 'bg-ivory text-espresso/10'}`}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-end">
                  <button onClick={nextStep} disabled={!selectedProgram} className="bg-espresso text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-orange transition-all shadow-xl disabled:opacity-20">
                    Program Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PROGRAM INFO */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12 flex-grow">
                <div className="mb-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange">
                    <Info className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-condensed font-black uppercase text-espresso">Program Information</h3>
                    <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Review your selection</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="p-8 bg-ivory/50 rounded-3xl border border-espresso/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-orange mb-6">Program Highlights</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-espresso/5">
                        <span className="text-[10px] font-black text-espresso/40 uppercase">Coach</span>
                        <span className="text-xs font-bold text-espresso">{selectedProgram?.coach}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-espresso/5">
                        <span className="text-[10px] font-black text-espresso/40 uppercase">Schedule</span>
                        <span className="text-xs font-bold text-espresso">{selectedProgram?.schedule}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-espresso/5">
                        <span className="text-[10px] font-black text-espresso/40 uppercase">Eligibility</span>
                        <span className="text-xs font-bold text-espresso">{selectedProgram?.eligibility}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 bg-espresso text-white rounded-3xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-orange mb-6">Description</h4>
                    <p className="text-xs font-bold leading-relaxed text-white/70 italic">
                      {selectedProgram?.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-espresso/5 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-espresso/40 hover:text-espresso flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={nextStep} className="bg-espresso text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-orange transition-all shadow-xl">
                    Accept Waiver <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: WAIVER */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12 flex-grow flex flex-col">
                <div className="mb-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-condensed font-black uppercase text-espresso">Liability Waiver</h3>
                    <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Safety & Compliance</p>
                  </div>
                </div>
                <div className="flex-grow bg-ivory/50 border border-espresso/5 p-8 rounded-3xl overflow-y-auto max-h-[300px] mb-10 text-[11px] font-bold text-espresso/60 leading-relaxed custom-scrollbar italic">
                  <p className="mb-4">"This waiver template should be reviewed and approved by a qualified California attorney before being used."</p>
                  <p className="mb-4">I, the undersigned, understand that volleyball training involves physical activity and inherent risks. I voluntarily assume all risks on behalf of the participant.</p>
                  <p className="mb-4">I release Challengers Coaching Academy from any liability related to injury or loss during training sessions.</p>
                  <p>All student information collected will remain confidential and only be used for academy operations. It will never be sold or shared with third parties.</p>
                </div>
                <label className="flex items-center gap-6 group cursor-pointer mb-12">
                  <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${formData.waiverAccepted ? 'bg-orange border-orange text-white' : 'border-espresso/10 group-hover:border-orange/30'}`}>
                    {formData.waiverAccepted && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={formData.waiverAccepted} onChange={e => setFormData({...formData, waiverAccepted: e.target.checked})} />
                  <span className="text-xs font-black uppercase tracking-widest text-espresso/80">I Have Read and Accept the Terms</span>
                </label>
                <div className="mt-auto pt-8 border-t border-espresso/5 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-espresso/40 hover:text-espresso flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={nextStep} disabled={!formData.waiverAccepted} className="bg-espresso text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-orange transition-all shadow-xl disabled:opacity-20">
                    Student Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: STUDENT FORM */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12 flex-grow overflow-y-auto custom-scrollbar" ref={formRef}>
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-condensed font-black uppercase text-espresso">Registration Form</h3>
                      <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Complete student profile</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-ivory border border-espresso/5 text-espresso px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange hover:text-white transition-all shadow-sm"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />} Download PDF
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Student Full Name</label>
                    <input required className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Parent Full Name</label>
                    <input required className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Date of Birth</label>
                    <input required type="date" className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Primary Email</label>
                    <input required type="email" className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.primaryEmail} onChange={e => setFormData({...formData, primaryEmail: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Primary Phone</label>
                    <input required type="tel" className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.primaryPhone} onChange={e => setFormData({...formData, primaryPhone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Secondary Phone (Optional)</label>
                    <input type="tel" className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.secondaryPhone} onChange={e => setFormData({...formData, secondaryPhone: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">School Name</label>
                    <input required className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs" value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">T-Shirt Size</label>
                    <select className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs appearance-none" value={formData.tshirtSize} onChange={e => setFormData({...formData, tshirtSize: e.target.value})}>
                      <option>S</option><option>M</option><option>L</option><option>XL</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 mb-10">
                  <label className="text-[9px] font-black uppercase tracking-widest text-espresso/40 ml-2">Medical Conditions / Allergies (Optional)</label>
                  <textarea className="w-full bg-ivory border-espresso/5 rounded-xl py-4 px-6 outline-none focus:border-orange font-bold text-xs h-24 resize-none" value={formData.medicalConditions} onChange={e => setFormData({...formData, medicalConditions: e.target.value})} />
                </div>

                <div className="mt-auto pt-8 border-t border-espresso/5 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-espresso/40 hover:text-espresso flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={handleLeadSubmit} 
                    disabled={!formData.studentName || !formData.parentName || !formData.primaryEmail || isProcessing} 
                    className="bg-espresso text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-orange transition-all shadow-xl disabled:opacity-20"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Payment'} {!isProcessing && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PAYMENT */}
            {step === 5 && (
              <motion.form key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handlePaymentSubmit} className="p-8 md:p-12 flex-grow flex flex-col">
                <div className="mb-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-condensed font-black uppercase text-espresso">Checkout</h3>
                    <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest">Secure Stripe Integration</p>
                  </div>
                </div>
                <div className="bg-espresso p-10 rounded-[2.5rem] text-white mb-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange">Enrollment Fee</span>
                      <h4 className="text-2xl font-serif mt-1">{selectedProgram?.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Total</span>
                      <div className="text-4xl font-condensed font-black text-orange">${selectedProgram?.fee}</div>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">"Enrollment fees are non-refundable as they reserve your spot in the program."</p>
                  </div>
                </div>
                <div className="space-y-6 mb-10">
                   <div className="p-6 bg-ivory/50 rounded-2xl border border-espresso/5 flex items-center gap-4">
                      <Shield className="w-5 h-5 text-orange" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Encrypted Transaction Processing</span>
                   </div>
                </div>
                <div className="mt-auto pt-8 border-t border-espresso/5 flex justify-between">
                  <button type="button" onClick={prevStep} className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-espresso/40 hover:text-espresso flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button type="submit" disabled={isProcessing} className="bg-espresso text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-orange transition-all shadow-xl disabled:opacity-50">
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay Now'} {!isProcessing && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 6: CONFIRMATION */}
            {step === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-16 md:p-24 text-center flex-grow flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-orange/10 rounded-full flex items-center justify-center text-orange mb-10">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h2 className="text-5xl font-condensed uppercase tracking-tighter text-espresso mb-6">Confirmed!</h2>
                <p className="text-espresso/60 text-lg font-medium max-w-lg mb-10 leading-relaxed italic">
                  Success! <span className="text-espresso font-bold">{formData.studentName}</span> is now enrolled in <span className="text-espresso font-bold">{selectedProgram?.title}</span>.
                </p>
                <div className="p-8 bg-ivory rounded-3xl border border-espresso/5 w-full max-w-md text-left mb-10">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-orange mb-4">Quick Links</h5>
                   <div className="space-y-4">
                      <a href="/performance" className="flex items-center justify-between p-4 bg-white rounded-xl border border-espresso/5 hover:border-orange transition-all group">
                         <span className="text-[10px] font-black uppercase tracking-widest text-espresso/60">View Performance Stats</span>
                         <ChevronRight className="w-4 h-4 text-orange" />
                      </a>
                   </div>
                </div>
                <button onClick={() => window.location.href = '/'} className="bg-espresso text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-orange transition-all shadow-2xl">
                  Return to Academy
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
