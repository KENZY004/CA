import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, CheckCircle2, AlertCircle, Printer, User, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import { useGsapReveal } from './hooks/useGsapReveal';
import SEO from './components/SEO';

interface WaiverFormData {
  participantName: string;
  dob: string;
  age: string;
  gender: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  parentName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  medicalNotes: string;
  signatureDate: string;
  signatureName: string;
  isMinor: boolean;
}

const INITIAL_FORM_DATA: WaiverFormData = {
  participantName: '',
  dob: '',
  age: '',
  gender: '',
  streetAddress: '',
  city: '',
  state: 'CA',
  zip: '',
  parentName: '',
  parentRelationship: 'Parent / Legal Guardian',
  parentPhone: '',
  parentEmail: '',
  emergencyName: '',
  emergencyPhone: '',
  medicalNotes: '',
  signatureDate: new Date().toISOString().split('T')[0],
  signatureName: '',
  isMinor: true,
};

export default function Waiver() {
  const [formData, setFormData] = useState<WaiverFormData>(INITIAL_FORM_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'fill' | 'preview'>('fill');
  useGsapReveal();

  const handleInputChange = (field: keyof WaiverFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  /**
   * Generates a crisp, vector-based, multi-page professional PDF using jsPDF.
   * Works for both populated form data or blank printable template.
   */
  const generateWaiverPDF = (isBlank: boolean = false) => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4', // 210 x 297 mm
      });

      const pageWidth = 210;
      const margin = 14;
      const contentWidth = pageWidth - margin * 2; // 182 mm

      const data = isBlank ? INITIAL_FORM_DATA : formData;

      // ─────────────────────────────────────────────────────────────
      // PAGE 1: HEADER, FILING PARTICIPANT/PARENT DETAILS, CLAUSES 1-3
      // ─────────────────────────────────────────────────────────────
      
      // Top header bar
      doc.setFillColor(193, 39, 45); // Academy Red (#C1272D)
      doc.rect(margin, 10, contentWidth, 3, 'F');

      // Academy Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(7, 26, 45); // Dark Navy/Espresso
      doc.text('CHALLENGERS VOLLEYBALL ACADEMY', margin, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(242, 102, 39); // Orange
      doc.text('ATHLETIC PARTICIPATION AGREEMENT, LIABILITY WAIVER & MEDICAL RELEASE', margin, 23);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Bay Area Locations: Fremont • Tracy • San Leandro  |  Phone: (510) 990-2580  |  Email: info@challengersva.com', margin, 27.5);

      // Horizontal separator line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(margin, 29.5, margin + contentWidth, 29.5);

      // Section A: Participant & Parent/Guardian Details Box
      let currentY = 33;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, currentY, contentWidth, 68, 2, 2, 'FD');

      // Section A Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(7, 26, 45);
      doc.text('SECTION A: PARTICIPANT & PARENT / LEGAL GUARDIAN INFORMATION', margin + 3, currentY + 5);

      // Row 1: Participant Name, DOB, Age, Gender
      let rowY = currentY + 12;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('PARTICIPANT FULL LEGAL NAME:', margin + 3, rowY);
      doc.text('DATE OF BIRTH:', margin + 95, rowY);
      doc.text('AGE:', margin + 140, rowY);
      doc.text('GENDER:', margin + 160, rowY);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.participantName || '________________________________'), margin + 3, rowY + 4.5);
      doc.text(isBlank ? '___/___/____' : (data.dob || '___/___/____'), margin + 95, rowY + 4.5);
      doc.text(isBlank ? '_____' : (data.age || '_____'), margin + 140, rowY + 4.5);
      doc.text(isBlank ? '________' : (data.gender || '________'), margin + 160, rowY + 4.5);

      // Row 2: Parent/Guardian Name, Relationship
      rowY += 12;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('PARENT / LEGAL GUARDIAN FULL NAME (If under 18):', margin + 3, rowY);
      doc.text('RELATIONSHIP TO PARTICIPANT:', margin + 115, rowY);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________________' : (data.parentName || '________________________________________'), margin + 3, rowY + 4.5);
      doc.text(isBlank ? '___________________' : (data.parentRelationship || 'Parent / Guardian'), margin + 115, rowY + 4.5);

      // Row 3: Street Address, City, State, Zip
      rowY += 12;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('RESIDENTIAL STREET ADDRESS:', margin + 3, rowY);
      doc.text('CITY:', margin + 95, rowY);
      doc.text('STATE:', margin + 140, rowY);
      doc.text('ZIP CODE:', margin + 160, rowY);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.streetAddress || '________________________________'), margin + 3, rowY + 4.5);
      doc.text(isBlank ? '______________' : (data.city || '______________'), margin + 95, rowY + 4.5);
      doc.text(isBlank ? 'CA' : (data.state || 'CA'), margin + 140, rowY + 4.5);
      doc.text(isBlank ? '_______' : (data.zip || '_______'), margin + 160, rowY + 4.5);

      // Row 4: Phone, Email
      rowY += 12;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('PRIMARY CONTACT PHONE:', margin + 3, rowY);
      doc.text('PRIMARY EMAIL ADDRESS:', margin + 95, rowY);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________' : (data.parentPhone || '________________________'), margin + 3, rowY + 4.5);
      doc.text(isBlank ? '________________________________' : (data.parentEmail || '________________________________'), margin + 95, rowY + 4.5);

      // Row 5: Emergency Contact & Medical Notes
      rowY += 12;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('EMERGENCY CONTACT NAME & PHONE:', margin + 3, rowY);
      doc.text('KNOWN ALLERGIES / MEDICAL CONDITIONS / NOTES:', margin + 95, rowY);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const emergCombined = isBlank 
        ? '________________________' 
        : `${data.emergencyName || ''} ${data.emergencyPhone ? `(${data.emergencyPhone})` : ''}`.trim() || '________________________';
      doc.text(emergCombined, margin + 3, rowY + 4.5);
      doc.text(isBlank ? 'None reported / ____________________' : (data.medicalNotes || 'None reported'), margin + 95, rowY + 4.5);

      // Section B: Legal Terms (Part 1)
      currentY = 106;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(7, 26, 45);
      doc.text('SECTION B: PARTICIPATION AGREEMENT, ASSUMPTION OF RISK & LIABILITY WAIVER', margin, currentY);

      const clausesPage1 = [
        {
          num: '1. Assumption of Inherent Athletic Risks:',
          text: 'I acknowledge that volleyball training, clinics, camps, scrimmages, and competitive play involve strenuous physical activity, rapid movements, jumping, diving, and ball impacts. I recognize that there are inherent risks of injury, including but not limited to sprains, fractures, concussions, and catastrophic injury. I knowingly and freely assume all such risks, both known and unknown, on behalf of myself and/or my participating minor child.'
        },
        {
          num: '2. Comprehensive Release of Liability & Covenant Not to Sue:',
          text: 'I, for myself, my child, heirs, assigns, and personal representatives, hereby RELEASE, DISCHARGE, AND HOLD HARMLESS Challengers Volleyball Coaching Center (Challengers Volleyball Academy), its directors, officers, coaches, instructors, employees, agents, volunteers, and the owners/lessors of the premises and facilities used for training (collectively "Released Parties"), from any and all claims, demands, losses, or liabilities arising out of injury, disability, death, or loss of property, whether caused by the negligence of the Released Parties or otherwise, to the fullest extent permitted by California law.'
        },
        {
          num: '3. Participant & Parental Responsibilities:',
          text: 'I agree that the participant will comply with all stated safety rules, instructions of the coaching staff, and conduct guidelines. If any unusual or significant hazard is observed during participation, the participant will immediately discontinue training and notify the nearest coach. I certify that the participant is physically fit, healthy, and capable of engaging in rigorous volleyball training.'
        }
      ];

      let textY = currentY + 5;
      clausesPage1.forEach(clause => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(193, 39, 45);
        doc.text(clause.num, margin, textY);
        textY += 3.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(51, 65, 85);
        const lines = doc.splitTextToSize(clause.text, contentWidth);
        doc.text(lines, margin, textY);
        textY += lines.length * 3.3 + 3.5;
      });

      // Page 1 Footer
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, 284, margin + contentWidth, 284);

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('Challengers Volleyball Academy — Official Participation Waiver & Release Agreement', margin, 288);
      doc.text('Page 1 of 2', margin + contentWidth - 14, 288);

      // ─────────────────────────────────────────────────────────────
      // PAGE 2: CLAUSES 4-5, MEDICAL AUTHORIZATION, SIGNATURE BOXES
      // ─────────────────────────────────────────────────────────────
      doc.addPage('a4', 'portrait');

      // Top header bar
      doc.setFillColor(193, 39, 45);
      doc.rect(margin, 10, contentWidth, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(7, 26, 45);
      doc.text('CHALLENGERS VOLLEYBALL ACADEMY — WAIVER & MEDICAL RELEASE (CONTINUED)', margin, 18);

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(margin, 21, margin + contentWidth, 21);

      const clausesPage2 = [
        {
          num: '4. Emergency Medical Authorization & Hold Harmless:',
          text: 'In the event of an injury, accident, or acute illness during any Challengers Volleyball Academy activity, I hereby grant permission to the coaching staff, staff members, or medical personnel to administer first aid, CPR/AED, and to secure professional emergency medical treatment or hospital transport if deemed necessary. I agree to be solely responsible for any and all costs, hospital fees, and medical expenses incurred, and agree to indemnify and hold harmless the Released Parties from any associated financial obligations.'
        },
        {
          num: '5. Consent to Likeness, Photography & Promotional Media Release:',
          text: 'I understand that photographs, digital videos, and audio recordings of participants may be taken during academy training sessions, scrimmages, clinics, and events. I hereby grant Challengers Volleyball Academy the irrevocable right to use, publish, and broadcast such media for promotional, educational, athletic highlight, and website/social media purposes without compensation or prior approval.'
        },
        {
          num: '6. Governing Law & Severability:',
          text: 'This Participation Agreement and Liability Waiver is governed by the laws of the State of California. If any provision or portion of this agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full legal force and effect.'
        }
      ];

      textY = 27;
      clausesPage2.forEach(clause => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(193, 39, 45);
        doc.text(clause.num, margin, textY);
        textY += 3.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(51, 65, 85);
        const lines = doc.splitTextToSize(clause.text, contentWidth);
        doc.text(lines, margin, textY);
        textY += lines.length * 3.3 + 3.5;
      });

      // Section C: Acknowledgment Statement Box
      currentY = textY + 4;
      doc.setFillColor(254, 242, 242); // Soft Red/Orange Background (#FEF2F2)
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(153, 27, 27);
      doc.text('LEGAL ACKNOWLEDGMENT & AFFIRMATION:', margin + 3, currentY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(69, 10, 10);
      const ackText = 'I CERTIFY THAT I AM 18 YEARS OF AGE OR OLDER (OR THE AUTHORIZED LEGAL PARENT/GUARDIAN OF THE MINOR PARTICIPANT). I HAVE CAREFULLY READ THIS WAIVER, FULLY UNDERSTAND ITS TERMS, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT OR DURESS.';
      const ackLines = doc.splitTextToSize(ackText, contentWidth - 6);
      doc.text(ackLines, margin + 3, currentY + 9.5);

      // Section D: Dual Signatures Table
      currentY += 28;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(7, 26, 45);
      doc.text('SECTION C: SIGNATURES & VERIFICATION', margin, currentY);

      // Signature Box 1: Parent/Guardian Signature (Mandatory for minors)
      const sigBoxY = currentY + 4;
      const boxWidth = (contentWidth - 6) / 2;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, sigBoxY, boxWidth, 68, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(193, 39, 45);
      doc.text('PARENT / LEGAL GUARDIAN SIGNATURE', margin + 3, sigBoxY + 5);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('(Mandatory for participants under 18 years old)', margin + 3, sigBoxY + 9);

      // Parent details inside box
      let sigFieldY = sigBoxY + 18;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text('PARENT / GUARDIAN PRINTED NAME:', margin + 3, sigFieldY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.parentName || '________________________________'), margin + 3, sigFieldY + 4.5);

      sigFieldY += 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text('SIGNATURE:', margin + 3, sigFieldY);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.signatureName || data.parentName || '________________________________'), margin + 3, sigFieldY + 5.5);

      sigFieldY += 13;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text('RELATIONSHIP:', margin + 3, sigFieldY);
      doc.text('DATE:', margin + 50, sigFieldY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? 'Parent/Guardian' : (data.parentRelationship || 'Parent/Guardian'), margin + 3, sigFieldY + 4.5);
      doc.text(isBlank ? '___/___/____' : (data.signatureDate || '___/___/____'), margin + 50, sigFieldY + 4.5);

      // Signature Box 2: Participant Signature (if over 18) & Academy Verification
      const box2X = margin + boxWidth + 6;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(box2X, sigBoxY, boxWidth, 68, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(7, 26, 45);
      doc.text('PARTICIPANT SIGNATURE (IF 18+)', box2X + 3, sigBoxY + 5);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('(Required if athlete is 18 years or older)', box2X + 3, sigBoxY + 9);

      let pSigY = sigBoxY + 18;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text('PARTICIPANT PRINTED NAME:', box2X + 3, pSigY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.participantName || '________________________________'), box2X + 3, pSigY + 4.5);

      pSigY += 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text('SIGNATURE:', box2X + 3, pSigY);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(isBlank ? '________________________________' : (data.signatureName || data.participantName || '________________________________'), box2X + 3, pSigY + 5.5);

      pSigY += 13;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text('ACADEMY STAMP / RECEIVED BY:', box2X + 3, pSigY);
      doc.text('DATE RECEIVED:', box2X + 50, pSigY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Challengers Staff', box2X + 3, pSigY + 4.5);
      doc.text(isBlank ? '___/___/____' : (data.signatureDate || '___/___/____'), box2X + 50, pSigY + 4.5);

      // Page 2 Footer
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, 284, margin + contentWidth, 284);

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('Challengers Volleyball Academy — Official Participation Waiver & Release Agreement', margin, 288);
      doc.text('Page 2 of 2', margin + contentWidth - 14, 288);

      const fileName = isBlank 
        ? 'Challengers_Volleyball_Waiver_Blank.pdf' 
        : `Challengers_Waiver_${(data.participantName || 'Participant').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

      doc.save(fileName);
    } catch (error) {
      console.error('Error generating vector PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 pb-20 bg-ivory/50 min-h-screen font-sans">
      <SEO 
        title="Participation & Safety Waiver" 
        description="Official Athletic Participation Agreement, Liability Waiver & Emergency Medical Release for Challengers Volleyball Academy athletes."
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="gsap-reveal mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange" />
            <span className="text-orange font-black text-[10px] tracking-[0.4em] uppercase">Official Document</span>
            <div className="h-px w-10 bg-orange" />
          </div>
          <h1 className="text-4xl md:text-6xl font-condensed font-black text-espresso uppercase tracking-tighter leading-[0.88] mb-4">
            Participation & Safety <span className="text-orange italic">Waiver.</span>
          </h1>
          
          <p className="text-espresso/80 text-base sm:text-lg font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            All players must have a completed participation agreement and liability release on file. You can fill out your information online or download a printable blank document.
          </p>

          {/* Quick Action Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button 
              onClick={() => generateWaiverPDF(false)}
              disabled={isGenerating}
              className="inline-flex items-center gap-3 bg-espresso text-white px-7 sm:px-9 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-orange transition-all shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isGenerating ? 'Generating PDF...' : 'Download Completed PDF'}
            </button>

            <button 
              onClick={() => generateWaiverPDF(true)}
              disabled={isGenerating}
              className="inline-flex items-center gap-3 bg-white border-2 border-espresso/15 text-espresso px-6 sm:px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-espresso hover:text-white transition-all shadow-sm active:scale-95"
            >
              <Printer className="w-4 h-4 text-orange" />
              Download Blank Printable Form
            </button>
          </div>

          {/* Tab Switcher: Fill Online vs View Full Text */}
          <div className="inline-flex bg-white p-1.5 rounded-2xl border border-espresso/10 shadow-sm mb-8">
            <button
              onClick={() => setActiveTab('fill')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'fill' 
                  ? 'bg-orange text-white shadow-md' 
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              1. Fill Filing Details
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'preview' 
                  ? 'bg-orange text-white shadow-md' 
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              2. Review Official Agreement
            </button>
          </div>
        </div>

        {/* ── TAB 1: FILL FORM FIELDS ── */}
        {activeTab === 'fill' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-espresso/10 p-6 sm:p-10 md:p-12 mb-12"
          >
            <div className="flex items-center justify-between border-b border-espresso/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-condensed font-black text-espresso uppercase tracking-tight">
                    Participant & Parent Filing Details
                  </h2>
                  <p className="text-xs text-espresso/60 font-medium">
                    Enter details below to generate your customized PDF with all fields populated.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleReset}
                className="hidden sm:flex items-center gap-2 text-xs font-bold text-espresso/50 hover:text-orange transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Form
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-8">
              {/* Participant Section */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange block mb-4">
                  01. Participant Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Participant Full Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={formData.participantName}
                      onChange={(e) => handleInputChange('participantName', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Date of Birth
                    </label>
                    <input 
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Age & Gender
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-1/2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                      />
                      <select 
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-1/2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-2 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Section */}
              <div className="border-t border-espresso/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange block">
                    02. Parent / Legal Guardian Information
                  </span>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isMinor}
                      onChange={(e) => handleInputChange('isMinor', e.target.checked)}
                      className="rounded border-slate-300 text-orange focus:ring-orange"
                    />
                    <span className="text-xs font-bold text-espresso/70">Participant is under 18 (Minor)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Parent / Guardian Full Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarah Johnson"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Relationship to Participant
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Mother, Father, Guardian"
                      value={formData.parentRelationship}
                      onChange={(e) => handleInputChange('parentRelationship', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Primary Contact Phone *
                    </label>
                    <input 
                      type="tel"
                      placeholder="(510) 000-0000"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Primary Email Address *
                    </label>
                    <input 
                      type="email"
                      placeholder="sarah.johnson@example.com"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Residential Street Address
                    </label>
                    <input 
                      type="text"
                      placeholder="1234 Academy Way"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      City
                    </label>
                    <input 
                      type="text"
                      placeholder="Fremont"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      State
                    </label>
                    <input 
                      type="text"
                      placeholder="CA"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      ZIP Code
                    </label>
                    <input 
                      type="text"
                      placeholder="94538"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Medical Notes */}
              <div className="border-t border-espresso/10 pt-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange block mb-4">
                  03. Emergency Contact & Health Disclosures
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Emergency Contact Name
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Michael Johnson (Uncle)"
                      value={formData.emergencyName}
                      onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input 
                      type="tel"
                      placeholder="(510) 555-0199"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Known Allergies, Medical Conditions, or Special Instructions (if any)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Asthma (carries inhaler), peanut allergy, or None"
                      value={formData.medicalNotes}
                      onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Digital E-Signature */}
              <div className="border-t border-espresso/10 pt-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange block mb-4">
                  04. E-Signature & Date
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Signatory Full Legal Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="Type your full legal name"
                      value={formData.signatureName}
                      onChange={(e) => handleInputChange('signatureName', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-serif italic text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-espresso/70 mb-2">
                      Date Signed
                    </label>
                    <input 
                      type="date"
                      value={formData.signatureDate}
                      onChange={(e) => handleInputChange('signatureDate', e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Download CTA within Form */}
            <div className="mt-10 pt-8 border-t border-espresso/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-espresso/60 font-medium text-center sm:text-left">
                Your entries will be formatted into a clean, aligned 2-page PDF ready for filing.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-5 py-3 rounded-xl border border-espresso/15 text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Review Terms & Clauses
                </button>
                <button
                  onClick={() => generateWaiverPDF(false)}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2.5 bg-orange text-white px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-espresso transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Download Completed PDF'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: FULL OFFICIAL AGREEMENT TEXT & DISPLAY ── */}
        {(activeTab === 'preview' || activeTab === 'fill') && (
          <div className="gsap-reveal max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-espresso/10 overflow-hidden">
              {/* Document Header Banner */}
              <div className="bg-espresso text-white p-6 sm:p-8 text-center relative overflow-hidden">
                <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-orange to-yellow-500 absolute top-0 left-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange block mb-2">
                  Challengers Volleyball Academy
                </span>
                <h2 className="text-2xl sm:text-4xl font-condensed font-black tracking-tight uppercase">
                  Participation Agreement, Liability Waiver & Medical Release
                </h2>
                <p className="text-xs text-white/60 mt-2">
                  Bay Area Training Facilities: Fremont • Tracy • San Leandro | (510) 990-2580
                </p>
              </div>

              <div className="p-6 sm:p-10 md:p-14 space-y-10 text-espresso/80 text-sm leading-relaxed">
                
                {/* Summary Table of Current Information */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-6 text-xs">
                  <h3 className="font-bold text-espresso uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange" />
                    Participant & Guardian Summary
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-slate-600">
                    <div>
                      <span className="font-bold text-slate-900 block">Participant:</span>
                      {formData.participantName || '(Not specified yet)'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Parent / Guardian:</span>
                      {formData.parentName || '(Not specified yet)'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Relationship:</span>
                      {formData.parentRelationship || 'Parent / Legal Guardian'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Contact Phone:</span>
                      {formData.parentPhone || '(Not specified yet)'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Email:</span>
                      {formData.parentEmail || '(Not specified yet)'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Emergency Contact:</span>
                      {formData.emergencyName ? `${formData.emergencyName} (${formData.emergencyPhone})` : '(Not specified yet)'}
                    </div>
                  </div>
                </div>

                {/* Section 1 */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-espresso mb-3 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange shrink-0" />
                    1. Assumption of Inherent Athletic Risks
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    I understand and acknowledge that volleyball coaching, clinics, camps, strength conditioning, and competitive scrimmages organized by Challengers Volleyball Academy involve vigorous physical activities including running, jumping, diving, blocking, and hitting. I recognize that these activities carry inherent risks of bodily injury (including sprains, fractures, concussions, and severe physical trauma). I knowingly, freely, and willingly assume all such risks on behalf of the participant.
                  </p>
                </section>

                {/* Section 2 */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-espresso mb-3 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange shrink-0" />
                    2. Comprehensive Release of Liability & Covenant Not to Sue
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    I hereby release, waive, discharge, and covenant not to sue Challengers Volleyball Academy, Wilson Mathew, its coaches, trainers, owners, employees, contractors, and facility hosts in Fremont, Tracy, and San Leandro from any and all liability, claims, or demands arising out of negligence or accident during volleyball activities, to the maximum extent permitted by California law.
                  </p>
                </section>

                {/* Section 3 */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-espresso mb-3 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange shrink-0" />
                    3. Emergency Medical Authorization & Hold Harmless
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In the event of an injury or acute medical emergency, I hereby grant permission to Challengers Volleyball Academy coaches and authorized staff to administer first aid and secure professional hospital transport and emergency care. I accept full financial responsibility for all medical costs incurred and agree to hold harmless the Released Parties from any associated liability.
                  </p>
                </section>

                {/* Section 4 */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-espresso mb-3 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange shrink-0" />
                    4. Photography & Media Likeness Consent
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    I grant permission for photographs and video recordings taken during training sessions to be used for academy promotional, training highlight, and educational purposes on official academy websites and media channels.
                  </p>
                </section>

                {/* Signature Preview Block */}
                <div className="mt-12 pt-8 border-t border-espresso/15">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border border-slate-200 rounded-2xl p-5 bg-[#F8FAFC]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange block mb-2">
                        Parent / Guardian Signature (Minors &lt; 18)
                      </span>
                      <div className="min-h-[48px] border-b border-slate-300 flex items-end pb-1 font-serif italic text-lg text-slate-800">
                        {formData.signatureName || formData.parentName || '________________________'}
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-2">
                        <span>Printed: {formData.parentName || 'Parent Name'}</span>
                        <span>Date: {formData.signatureDate}</span>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-5 bg-[#F8FAFC]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 block mb-2">
                        Participant Signature (Athletes 18+)
                      </span>
                      <div className="min-h-[48px] border-b border-slate-300 flex items-end pb-1 font-serif italic text-lg text-slate-800">
                        {formData.signatureName || formData.participantName || '________________________'}
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-2">
                        <span>Printed: {formData.participantName || 'Participant Name'}</span>
                        <span>Date: {formData.signatureDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom PDF Download Trigger */}
                <div className="bg-orange/5 p-6 rounded-2xl border border-orange/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-espresso text-sm">Need a hard copy or signed record?</h4>
                    <p className="text-xs text-espresso/70 mt-0.5">
                      Generate your crisp, vector PDF containing all filled information or download a blank copy.
                    </p>
                  </div>
                  <button
                    onClick={() => generateWaiverPDF(false)}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 bg-espresso hover:bg-orange text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shrink-0"
                  >
                    <Download className="w-4 h-4" /> Download Official PDF
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
