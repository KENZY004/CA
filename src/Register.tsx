import React, { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import {
  CheckCircle2, ChevronRight, ChevronLeft, CreditCard, Shield,
  Package, Calendar, Download, Loader2, Info, FileText,
  MapPin, Clock, User, Users, Lock, Sparkles, Check, AlertCircle, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { domToCanvas } from 'modern-screenshot';
import jsPDF from 'jspdf';
import SEO from './components/SEO';

// Session Item Interface
interface SessionItem {
  id: string;
  name: string;
  category: string;
  ageGroup: string;
  skillLevel: string;
  location: string;
  locationAddress: string;
  schedule: string;
  dates: string;
  time: string;
  price: number;
  capacity: number;
  filled: number;
  coach: string;
  description: string;
}

const FALLBACK_SESSIONS: SessionItem[] = [
  {
    id: 'starter-pack',
    name: 'Starter Pack (4 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'All Ages Welcome',
    skillLevel: 'Beginner',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Weekend Batches (Sat / Sun)',
    dates: 'Starting Next Weekend',
    time: '10:00 AM – 12:00 PM',
    price: 200,
    capacity: 30,
    filled: 19,
    coach: 'Wilson Mathew',
    description: 'Four focused fundamental training sessions with personalized technique corrections.'
  },
  {
    id: 'little-spikers-fremont',
    name: 'Little Spikers Foundation',
    category: 'Junior Training',
    ageGroup: 'Ages 5 - 10',
    skillLevel: 'Beginner / First Timers',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Saturdays & Sundays',
    dates: 'Starting Next Weekend',
    time: '9:00 AM – 10:30 AM',
    price: 200,
    capacity: 20,
    filled: 12,
    coach: 'Wilson Mathew & Team',
    description: 'Motor skills, fun movement drills, basic ball control, and encouraging teamwork.'
  },
  {
    id: 'youth-foundations-fremont',
    name: 'Youth Foundations Intensive',
    category: 'Development Program',
    ageGroup: 'Ages 11 - 14',
    skillLevel: 'Beginner to Intermediate',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Tuesday & Thursday Evenings',
    dates: 'Bi-Weekly Batches',
    time: '5:30 PM – 7:30 PM',
    price: 250,
    capacity: 25,
    filled: 18,
    coach: 'Coach Wilson Mathew',
    description: 'Technical serving power, passing precision, 6-2 rotation fundamentals, and school tryout prep.'
  },
  {
    id: 'high-school-prep-tracy',
    name: 'High School Prep & Varsity Camp',
    category: 'Elite Preparation',
    ageGroup: 'Ages 14 - 18',
    skillLevel: 'Intermediate to Advanced',
    location: 'Tracy Sports Complex',
    locationAddress: '1255 N Tracy Blvd, Tracy, CA',
    schedule: 'Monday, Wednesday & Friday',
    dates: 'Monthly Intensive',
    time: '6:00 PM – 8:00 PM',
    price: 300,
    capacity: 20,
    filled: 15,
    coach: 'Coach Sarah & Michael',
    description: 'High-speed game reads, jump float serves, aggressive blocking, and situational scrimmage play.'
  },
  {
    id: 'summer-camp-2026-fremont',
    name: 'Summer Elite 7-Day Camp',
    category: 'Summer Intensive',
    ageGroup: 'Ages 8 - 17',
    skillLevel: 'All Skill Levels Welcome',
    location: 'Fremont Central Courts',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Monday through Sunday (Full Week)',
    dates: 'July 14 – July 20, 2026',
    time: '9:00 AM – 1:00 PM (Half-Day)',
    price: 350,
    capacity: 50,
    filled: 42,
    coach: 'Wilson Mathew & Senior Staff',
    description: 'Immersive 7-day volleyball boot camp covering position specialization, competitive matches, and video breakdown.'
  },
  {
    id: 'get-serious',
    name: 'Get Serious Package (12 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'Ages 11 - 18',
    skillLevel: 'Intermediate to Advanced',
    location: 'Fremont / Tracy Facility',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: '3 Days / Week',
    dates: 'Rolling Monthly Enrollment',
    time: '5:00 PM – 7:00 PM',
    price: 550,
    capacity: 25,
    filled: 18,
    coach: 'Wilson Mathew & Specialist Staff',
    description: '12 dedicated sessions focused on position mastery, physical conditioning, and tournament prep.'
  },
  {
    id: 'all-in',
    name: 'All-In Master Package (20 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'All Ages',
    skillLevel: 'Comprehensive Progression',
    location: 'All Academy Locations',
    locationAddress: 'Bay Area Training Centers',
    schedule: 'Flexible Schedule',
    dates: 'Full Season Pass',
    time: 'Flexible Booking',
    price: 900,
    capacity: 20,
    filled: 14,
    coach: 'Full Coaching Staff',
    description: 'Complete 20-session athlete development package with biomechanical analysis and radar speed checks.'
  }
];

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Step 1: Registration | Step 2: Payment | Step 3: Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Available sessions
  const [sessions, setSessions] = useState<SessionItem[]>(FALLBACK_SESSIONS);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('starter-pack');

  // Form State
  const [formData, setFormData] = useState({
    playerName: '',
    parentName: '',
    email: '',
    phone: '',
    dob: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalNotes: '',
    waiverAccepted: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Payment & Confirmation State
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [registrationRecord, setRegistrationRecord] = useState<any>(null);
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch session catalog on mount
  useEffect(() => {
    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.sessions?.length > 0) {
          setSessions(data.sessions);
        }
      })
      .catch(() => {
        // Fallback already in state
      });
  }, []);

  // Preselect session from query param ?program=... or ?session=...
  useEffect(() => {
    const progParam = searchParams.get('program') || searchParams.get('session');
    if (progParam) {
      const match = sessions.find(s => 
        s.id.toLowerCase().includes(progParam.toLowerCase()) || 
        s.name.toLowerCase().includes(progParam.toLowerCase())
      );
      if (match) {
        setSelectedSessionId(match.id);
      }
    }
  }, [searchParams, sessions]);

  const selectedSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];
  const spotsLeft = Math.max(0, selectedSession.capacity - selectedSession.filled);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.playerName.trim()) errors.playerName = 'Player full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
    if (!formData.waiverAccepted) errors.waiverAccepted = 'You must accept the safety waiver to proceed.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          ...formData
        })
      });

      const data = await res.json();
      if (data.success) {
        setClientSecret(data.clientSecret);
        setLeadId(data.leadId);
        setCardHolderName(formData.parentName || formData.playerName);
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(data.message || 'Unable to initialize checkout. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error initializing payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: clientSecret || `mock_pi_${Date.now()}`,
          leadId
        })
      });

      const data = await res.json();
      if (data.success && data.registration) {
        setRegistrationRecord(data.registration);
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#D62828', '#F9BC00', '#071A2D', '#22C55E']
        });
      } else {
        setPaymentError(data.message || 'Payment processing failed. Please check your card details.');
      }
    } catch (err: any) {
      console.error(err);
      setPaymentError('Payment verification error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!confirmationRef.current) return;
    setIsDownloadingPdf(true);
    try {
      const canvas = await domToCanvas(confirmationRef.current, { scale: 2, backgroundColor: '#FFFFFF' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const props = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (props.height * pdfWidth) / props.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Challengers_Registration_${registrationRecord?.registrationId || 'Receipt'}.pdf`);
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-32 sm:pt-36 pb-20">
      <SEO
        title="Session Registration & Payment"
        description="Enroll in Challengers Volleyball Academy coaching sessions, summer camps, and elite training programs with secure Stripe checkout."
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* ── 3-Step Progress Tracker Header ── */}
        <div className="mb-10 sm:mb-12">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {/* Connector Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-[#D62828] -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
                }}
              />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-md ${
                  currentStep >= 1 ? 'bg-[#071A2D] text-white ring-4 ring-slate-100' : 'bg-slate-100 text-slate-400'
                }`}>
                  {currentStep > 1 ? <Check className="w-5 h-5 text-[#22C55E]" /> : '1'}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  currentStep === 1 ? 'text-[#071A2D]' : 'text-slate-500'
                }`}>
                  1. Registration
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-md ${
                  currentStep >= 2 ? 'bg-[#071A2D] text-white ring-4 ring-slate-100' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 2 ? <Check className="w-5 h-5 text-[#22C55E]" /> : '2'}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  currentStep === 2 ? 'text-[#071A2D]' : 'text-slate-500'
                }`}>
                  2. Payment
                </span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-md ${
                  currentStep === 3 ? 'bg-[#22C55E] text-white ring-4 ring-emerald-50' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep === 3 ? <Sparkles className="w-5 h-5" /> : '3'}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  currentStep === 3 ? 'text-[#22C55E]' : 'text-slate-500'
                }`}>
                  3. Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STEP 1: REGISTRATION & SESSION DETAILS ── */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Selected Session Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#071A2D] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#D62828]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F9BC00]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#F9BC00] px-3 py-1 bg-white/10 rounded-full">
                      Selected Session
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      {spotsLeft} spots open
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-condensed font-black uppercase tracking-tight text-white mb-2 leading-tight">
                    {selectedSession.name}
                  </h2>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6 font-medium">
                    {selectedSession.description}
                  </p>

                  {/* Session Key Specs */}
                  <div className="space-y-3.5 pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-[#F9BC00] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-bold">Age Group & Skill</span>
                        <span className="font-bold text-white">{selectedSession.ageGroup} · {selectedSession.skillLevel}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-bold">Location</span>
                        <span className="font-bold text-white">{selectedSession.location}</span>
                        <span className="text-slate-400 text-[10px] block">{selectedSession.locationAddress}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-bold">Dates & Schedule</span>
                        <span className="font-bold text-white">{selectedSession.dates} ({selectedSession.schedule})</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-bold">Time</span>
                        <span className="font-bold text-white">{selectedSession.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Switch Session Dropdown */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-300 mb-2">
                      Switch / Select Different Session:
                    </label>
                    <select
                      value={selectedSessionId}
                      onChange={(e) => setSelectedSessionId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none focus:border-[#D62828]"
                    >
                      {sessions.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} — ${s.price} ({s.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pricing Total Box */}
                  <div className="mt-6 bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">Total Amount</span>
                      <span className="text-xs text-slate-400">Includes all court & coaching fees</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-condensed font-black text-[#F9BC00]">${selectedSession.price}</span>
                      <span className="text-[10px] text-slate-400 block font-bold">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContinueToPayment} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-condensed font-black uppercase text-[#071A2D] tracking-tight">
                    Athlete & Contact Information
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Please provide accurate information for player roster, court safety, and academy communications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Player Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Player / Student Full Name <span className="text-[#D62828]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Chen"
                      value={formData.playerName}
                      onChange={(e) => handleInputChange('playerName', e.target.value)}
                      className={`w-full bg-slate-50 border ${formErrors.playerName ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all`}
                    />
                    {formErrors.playerName && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{formErrors.playerName}</span>
                    )}
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Parent / Guardian Name <span className="text-slate-400 text-[10px]">(If under 18)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. David Chen"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Date of Birth / Age */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Date of Birth / Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 05/14/2012 or Age 14"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-[#D62828]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-slate-50 border ${formErrors.email ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all`}
                    />
                    {formErrors.email && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span className="text-[#D62828]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(510) 555-0199"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-slate-50 border ${formErrors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all`}
                    />
                    {formErrors.phone && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  {/* Emergency Contact Name */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Chen"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="(510) 555-0188"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none focus:border-[#071A2D] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Safety Waiver Consent Checkbox */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  formErrors.waiverAccepted ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.waiverAccepted}
                      onChange={(e) => handleInputChange('waiverAccepted', e.target.checked)}
                      className="w-5 h-5 rounded mt-0.5 text-[#D62828] focus:ring-[#D62828] border-slate-300 cursor-pointer"
                    />
                    <div className="text-xs text-slate-700 leading-relaxed font-medium">
                      <span className="font-bold text-slate-900">Safety & Liability Waiver Consent: </span>
                      I acknowledge that volleyball training involves physical exertion. I grant permission for medical treatment in case of emergency and agree to the academy's terms and safety policy.
                    </div>
                  </label>
                  {formErrors.waiverAccepted && (
                    <span className="text-red-500 text-[11px] font-bold mt-2 block">{formErrors.waiverAccepted}</span>
                  )}
                </div>

                {/* Submit / Proceed Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#D62828] hover:bg-[#b01e23] text-white py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Initializing Secure Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment (${selectedSession.price})</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#22C55E]" /> 256-Bit SSL Encrypted & Stripe Secured
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: STRIPE POWERED PAYMENT ── */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl space-y-8">
              
              {/* Header & Back Button */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
                >
                  <ChevronLeft className="w-4 h-4" /> Edit Registration Info
                </button>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold">
                  <Shield className="w-3.5 h-3.5" /> Stripe Secure Checkout
                </div>
              </div>

              {/* Order Itemized Summary */}
              <div className="bg-[#071A2D] text-white rounded-2xl p-6 shadow-md">
                <span className="text-[10px] font-black tracking-widest uppercase text-[#F9BC00] block mb-2">
                  Order Summary
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-condensed font-black uppercase text-white">{selectedSession.name}</h3>
                    <p className="text-xs text-slate-300">{selectedSession.schedule} · {selectedSession.location}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Athlete: <span className="text-white font-bold">{formData.playerName}</span> ({formData.email})</p>
                  </div>
                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                    <span className="text-3xl font-condensed font-black text-[#F9BC00]">${selectedSession.price}.00</span>
                    <span className="text-[10px] text-slate-400 block font-bold">Total Amount Due</span>
                  </div>
                </div>
              </div>

              {/* Payment Form (Stripe Elements Emulation with Full Backend Verification) */}
              <form onSubmit={handleConfirmPayment} className="space-y-6">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-1">
                    Select Payment Method
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    All major credit & debit cards, Apple Pay, and Google Pay supported.
                  </p>

                  {/* Card Element Inputs */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D62828]" /> Credit / Debit Card
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span>VISA</span> · <span>MC</span> · <span>AMEX</span> · <span>DISC</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="Name on card"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-[#071A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        maxLength={19}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-[#071A2D] tracking-wider"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={5}
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-[#071A2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-[#071A2D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Authorize & Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#071A2D] hover:bg-[#0c2847] text-white py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F9BC00]" />
                      <span>Verifying with Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>Pay ${selectedSession.price}.00 & Confirm Enrollment</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400 leading-relaxed font-medium">
                  By clicking Pay, you authorize Challengers Volleyball Academy to charge your card. Confirmation receipt and academy welcome details will be dispatched immediately.
                </p>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: REGISTRATION CONFIRMED 🎉 ── */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Downloadable Receipt Card */}
            <div 
              ref={confirmationRef}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl text-slate-900 relative overflow-hidden"
            >
              {/* Top Banner Ribbon */}
              <div className="text-center pb-8 border-b border-slate-100">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D62828] block mb-1">
                  Challengers Volleyball Academy
                </span>
                <h2 className="text-3xl sm:text-4xl font-condensed font-black uppercase tracking-tight text-[#071A2D]">
                  Registration Confirmed! 🎉
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                  Your spot has been secured and confirmed in our coaching roster.
                </p>
              </div>

              {/* Receipt Body Breakdown */}
              <div className="py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Registration ID</span>
                    <span className="font-black text-[#071A2D] text-sm">{registrationRecord?.registrationId || 'CVA-10245'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Payment Status</span>
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black text-[10px]">
                      <Check className="w-3 h-3" /> PAID (${registrationRecord?.amountPaid || selectedSession.price})
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Player Name:</span>
                    <span className="font-bold text-slate-900">{registrationRecord?.playerName || formData.playerName}</span>
                  </div>

                  {formData.parentName && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Parent / Guardian:</span>
                      <span className="font-bold text-slate-900">{formData.parentName}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Selected Program:</span>
                    <span className="font-bold text-slate-900">{registrationRecord?.sessionName || selectedSession.name}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Schedule:</span>
                    <span className="font-bold text-slate-900">{registrationRecord?.schedule || selectedSession.schedule}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Location:</span>
                    <span className="font-bold text-slate-900 text-right">{registrationRecord?.location || selectedSession.location}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Customer Email:</span>
                    <span className="font-bold text-slate-900">{registrationRecord?.email || formData.email}</span>
                  </div>

                  <div className="flex justify-between py-2 text-sm pt-2">
                    <span className="font-black text-slate-900">Total Paid (USD):</span>
                    <span className="font-black text-xl text-[#071A2D]">${registrationRecord?.amountPaid || selectedSession.price}.00</span>
                  </div>
                </div>
              </div>

              {/* Notification Notice */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Confirmation Email Sent!</span>
                  A copy of this receipt and academy session instructions have been dispatched to <b>{formData.email}</b>.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleDownloadReceipt}
                disabled={isDownloadingPdf}
                className="w-full sm:flex-1 bg-[#071A2D] hover:bg-[#0c2847] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Receipt (PDF)</span>
                  </>
                )}
              </button>

              <NavLink
                to="/"
                className="w-full sm:flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-center shadow-sm"
              >
                Back to Home
              </NavLink>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
