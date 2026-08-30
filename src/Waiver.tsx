import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { domToCanvas } from 'modern-screenshot';
import jsPDF from 'jspdf';
import { useGsapReveal } from './hooks/useGsapReveal';

export default function Waiver() {
  const waiverRef = useRef<HTMLDivElement>(null);
  useGsapReveal();

  const handleDownload = async () => {
    if (!waiverRef.current) return;
    
    try {
      const canvas = await domToCanvas(waiverRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Challengers_Volleyball_Waiver.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 pb-16 bg-ivory/50 min-h-screen font-sans">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="gsap-reveal mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-orange" />
            <span className="text-orange font-black text-[10px] tracking-[0.4em] uppercase">Safety First</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-condensed font-black text-espresso uppercase tracking-tighter leading-[0.85] mb-4">
            Participation <span className="text-orange italic">Waiver.</span>
          </h1>
          
          <div className="bg-orange/5 p-6 rounded-2xl border border-orange/10 max-w-2xl mx-auto mb-10">
            <p className="text-orange font-black text-[10px] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" /> Legal Notice
            </p>
            <p className="text-espresso/80 text-xs font-bold leading-relaxed italic">
              "This waiver template should be reviewed and approved by a qualified California attorney before being used."
            </p>
          </div>

          <p className="text-espresso/85 text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Please review our athletic participation agreement and liability release carefully. All participants must have a signed waiver on file.
          </p>
          
          <button 
            onClick={handleDownload}
            className="inline-flex items-center gap-3 bg-espresso text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange transition-all shadow-xl"
          >
            <Download className="w-4 h-4" /> Download Official PDF
          </button>
        </div>

        {/* Waiver Content Card */}
        <div className="gsap-reveal max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-espresso/5 overflow-hidden"
          >
            <div className="p-5 sm:p-8 md:p-16">
              <div 
                ref={waiverRef}
                className="prose prose-sm max-w-none text-espresso/80 leading-relaxed"
              >
                {/* Official Header for PDF */}
                <div className="text-center mb-12 border-b border-espresso/10 pb-8">
                  <h2 className="text-3xl font-condensed font-black text-espresso uppercase tracking-tight mb-2">
                    Liability Waiver & Release
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-espresso/40">
                    Challengers Volleyball Coaching Center
                  </p>
                </div>

                <div className="space-y-8 text-sm">
                  <section>
                    <h3 className="text-lg font-bold text-espresso mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange" />
                      1. Risk Assumption & Liability
                    </h3>
                    <p>
                      I understand that observation of or physical activity in, including but not limited to hitting, passing, jumping and blocking can be a dangerous activity and that, by participating in those activities like (“Volleyball Coaching”), I am taking a risk that my child may be injured.
                    </p>
                    <p>
                      I hereby assume all the risk described above, even if the Challengers Volleyball Coaching Center like Clinics, Camps and training activites organized by Wilson Mathew Challengers Volleyball Coaching Center program at any Gym, School, Park or facility in California. Any of the aforementioned Parties, Owners, Members, Coaches, Employees or Agents, through negligence or otherwise, are deemed liable.
                    </p>
                    <p>
                      I hereby release, waive, discharge covenant not to sue Challengers Volleyball Coaching Center, California or any of the aforementioned Parties’ Owners, Members, Coaches, Employees or Agents (individually and together herein referred to as “Released Parties”).
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-espresso mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange" />
                      2. Consent to Use of Likeness
                    </h3>
                    <p>
                      I understand and agree that photographs, Videos and other recordings of participants may be taken, and that such pictures or videos of me and/or my child may be used for promotional purposes.
                    </p>
                    <p>
                      I hereby consent to the publication and use of my and/or my child’s name or likeness for the purpose for the promotion, publicity, advertising, or other manner or media by the city or any other representative authorized to act on behalf of the aforementioned entities. I agree that the actual material involved is and shall continue to the property of the city and that neither I, nor my child, shall have any right of review or approval regarding the use of me and/or my child’s likeness in such material.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-espresso mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange" />
                      3. Participant Responsibility
                    </h3>
                    <p>
                      Owners and tenants of premises used to conduct the Volleyball Activities, from any and all liability arising out of my or my child’s observation of and participation in the Volleyball Activities and/or event, even if the liability arises out of negligence that may not be foreseeable at this time.
                    </p>
                    <p>
                      I understand that by signing this Waiver and Release, I expressly and willingly agree to assume complete responsibility for any risk of injury or damages that may arise from the related activity. On behalf of myself, my children, heirs, assigns and next of kin, I waive all claims for damages, injuries, and death sustained to me, my children or my property, that I may have against the above-named Released Parties, any of its owners, employees or representatives relating to such activity.
                    </p>
                    <p>
                      I understand that the activities that I or my child will participate in are inherently dangerous and may cause serious injuries, including body injury, damage to personal property and/or death.
                    </p>
                  </section>

                  <section className="bg-espresso/5 p-8 rounded-3xl border border-espresso/10 italic">
                    <h3 className="text-lg font-bold text-espresso mb-4 flex items-center gap-2 not-italic">
                      <CheckCircle2 className="w-5 h-5 text-orange" />
                      4. Medical Release & Indemnification
                    </h3>
                    <p className="font-bold">
                      *HOLD HARMLESS MEDICAL RELEASE DUE TO THE NATURE OF ACTIVITY, IT I UNDERSTOOD THAT I RELEASE THERE LEASED PARTIES (DEFINED ABOVE) FROM ALL LIABILITY OF ANY SORT, AND THAT THEY BE HELD HARMLESS AND INDEMENIFIED FOR ANY ACCIDENT OR INJURIES SUSTAINED BY ME/MY CHILDREN WHILE INVOLVED IN THE VOLLEYBALL ACTIVITY.
                    </p>
                  </section>

                  {/* Signatures Section */}
                  <div className="mt-16 pt-12 border-t border-espresso/10 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="border-b border-espresso/40 pb-2">
                          <span className="text-[8px] font-black uppercase text-espresso/40">Participant Name</span>
                        </div>
                        <div className="border-b border-espresso/40 pb-2">
                          <span className="text-[8px] font-black uppercase text-espresso/40">Address</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border-b border-espresso/40 pb-2">
                            <span className="text-[8px] font-black uppercase text-espresso/40">City</span>
                          </div>
                          <div className="border-b border-espresso/40 pb-2">
                            <span className="text-[8px] font-black uppercase text-espresso/40">State</span>
                          </div>
                          <div className="border-b border-espresso/40 pb-2">
                            <span className="text-[8px] font-black uppercase text-espresso/40">Zip</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="border-b border-espresso/40 pb-2">
                          <span className="text-[8px] font-black uppercase text-espresso/40">Age</span>
                        </div>
                        <div className="border-b border-espresso/40 pb-2">
                          <span className="text-[8px] font-black uppercase text-espresso/40">Phone Number</span>
                        </div>
                        <div className="border-b border-espresso/40 pb-2">
                          <span className="text-[8px] font-black uppercase text-espresso/40">Emergency Contact (Name & Phone)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                      <div className="border-b-2 border-espresso pb-2">
                        <span className="text-[8px] font-black uppercase text-espresso/60">Player Signature (if over 18)</span>
                      </div>
                      <div className="border-b-2 border-espresso pb-2">
                        <span className="text-[8px] font-black uppercase text-espresso/60">Parent/Guardian Signature (if under 18)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
