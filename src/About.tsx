import { motion } from 'motion/react';
import { ASSETS } from './assets/images';
import { useGsapReveal } from './hooks/useGsapReveal';
import SEO from './components/SEO';
import CoachesSection from './components/CoachesSection';
import FAQSection from './components/FAQSection';
import { Shield, Users, Trophy } from 'lucide-react';
import { AAULogo, FIVBLogo, NFHSLogo, USAVLogo } from './components/CredibilityLogos';

const GRID_ITEMS = [
  { type: 'color', bg: '#D62828',  radius: '50% 50% 0 50%' },
  { type: 'img',   src: ASSETS.HERO.ACTION_CARD_1, radius: '50% 50% 0 0' },
  { type: 'color', bg: '#F9BC00',  radius: '50%' },
  { type: 'img',   src: ASSETS.JOURNEY.STEP_1, radius: '0 0 0 50%' },
  { type: 'color', bg: '#F3722C',  radius: '0 50% 50% 0' },
  { type: 'color', bg: '#EAE3D5',  radius: '0 50% 50% 50%' },
  { type: 'img',   src: ASSETS.HERO.ACTION_CARD_2, radius: '50% 50% 0 50%' },
  { type: 'color', bg: '#C1272D',  radius: '50% 0 0 50%' },
  { type: 'color', bg: '#F5F0E6',  radius: '0 50% 50% 0' },
  { type: 'img',   src: ASSETS.HERO.ACTION_CARD_3, radius: '50%' },
  { type: 'color', bg: '#F9BC00',  radius: '50% 0 50% 50%' },
  { type: 'img',   src: ASSETS.HERO.ACTION_CARD_4, radius: '50% 0 0 0' },
];

export default function About() {
  useGsapReveal();

  return (
    <div className="relative bg-white min-h-screen overflow-hidden font-sans">
      <SEO
        title="About Us"
        description="Coach Wilson Mathew founded Challengers Academy after 30+ years of playing and coaching volleyball. Meet the team behind the training."
      />

      {/* ── WATERCOLOR BACKGROUND (full page) ─────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=90&w=2560"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.22, mixBlendMode: 'multiply' }}
        />
        {/* soft white veil so text remains legible */}
        <div className="absolute inset-0 bg-white/55" />
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8" style={{ zIndex: 1 }}>
        {/* subtle bleed blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F9BC00]/15 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D62828]/10 rounded-full blur-[70px] -ml-16 pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-10">

          {/* left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#D62828]" />
              <span className="text-[#D62828] font-black text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase">Our Story</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-condensed text-espresso uppercase tracking-tighter leading-[0.9] md:leading-[0.88] mb-3 sm:mb-4">
              Building a<br />
              <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">legacy of excellence.</span>
            </h1>
            <p className="text-espresso/85 text-xs sm:text-sm font-medium max-w-lg leading-relaxed mb-4 sm:mb-6">
              Challengers Volleyball Academy was started with a simple idea — give every player the right coaching, a good environment, and the support they need to get better.
            </p>
            {/* quick stats row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {[
                { n: '500+', l: 'Athletes Trained' },
                { n: '30+', l: 'Years Experience' },
                { n: 'FIVB L2', l: 'Certified Coach' },
              ].map((s) => (
                <div key={s.l} className="px-3.5 sm:px-4 py-2 bg-white rounded-xl border border-espresso/5 shadow-sm">
                  <div className="text-base sm:text-lg font-condensed text-[#D62828]">{s.n}</div>
                  <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-espresso/40">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right: colourful circular grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-2.5 md:gap-3 mt-4 lg:mt-0 max-w-md lg:max-w-none mx-auto w-full">
            {GRID_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: 'backOut' }}
                className="aspect-square overflow-hidden shadow-sm"
                style={{
                  borderRadius: item.radius,
                  background: item.type === 'color' ? item.bg : undefined,
                }}
              >
                {item.type === 'img' && (
                  <img src={item.src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4 sm:py-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── FOUNDER STORY ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-8 sm:mb-12">

          {/* sticky left: Bauhaus arch portrait + geometric vision & mission */}
          <div className="space-y-3 sticky top-24 max-w-sm mx-auto lg:max-w-none w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-3.5 sm:p-4 rounded-3xl border border-espresso/5 shadow-md backdrop-blur-sm relative overflow-hidden"
            >
              {/* Arch Silhouette Portrait */}
              <div 
                className="w-full aspect-[4/3.8] sm:aspect-[4/3.6] overflow-hidden shadow-inner relative group border-2 border-espresso/5 bg-[#EAE3D5]"
                style={{ borderRadius: '10rem 10rem 1.5rem 1.5rem' }}
              >
                <img
                  src={ASSETS.ABOUT.COACH_PORTRAIT}
                  alt="Coach Wilson Mathew"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70" />
                
                {/* Overlay Name & Tag in Arch */}
                <div className="absolute bottom-3 left-4 right-4 text-center">
                  <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F9BC00] block mb-0.5">
                    Founder & Head Coach
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white leading-none">
                    Wilson Mathew
                  </h3>
                </div>
              </div>

              {/* Sub-cred strip */}
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 bg-espresso/5 rounded-full text-[9px] font-mono font-bold text-espresso/70 uppercase tracking-wider">
                  30+ Yrs Exp • Junior India National • FIVB L1 & L2
                </span>
              </div>
            </motion.div>

            {/* Geometric Vision & Mission matching hero shape motifs */}
            <div className="grid grid-cols-2 gap-2.5">
              <div 
                className="p-3.5 bg-[#F9BC00] text-espresso shadow-sm flex flex-col justify-between"
                style={{ borderRadius: '0 1.75rem 1.75rem 0' }}
              >
                <h4 className="text-[8px] font-black uppercase tracking-widest text-espresso/70 mb-1">Our Vision</h4>
                <p className="text-[10px] sm:text-[11px] font-bold text-espresso leading-snug italic">
                  "The premier volleyball program in CA — where players genuinely improve."
                </p>
              </div>
              <div 
                className="p-3.5 bg-[#D62828] text-white shadow-sm flex flex-col justify-between"
                style={{ borderRadius: '1.75rem 0 0 1.75rem' }}
              >
                <h4 className="text-[8px] font-black uppercase tracking-widest text-[#F9BC00] mb-1">Our Mission</h4>
                <p className="text-[10px] sm:text-[11px] font-bold text-white leading-snug italic">
                  "Build discipline, confidence, and character that lasts."
                </p>
              </div>
            </div>
          </div>

          {/* right: narrative */}
          <div className="space-y-4 sm:space-y-5">
            <div className="gsap-reveal">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-condensed uppercase tracking-tighter mb-2 sm:mb-3">
                Meet Our Founder –{' '}
                <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">Coach Wilson</span>
              </h2>
              <p className="text-sm sm:text-base font-serif text-espresso/75 leading-relaxed italic mb-3 sm:mb-4">
                "Volleyball has given me everything. I started this academy because I wanted to pass that on — the discipline, the teamwork, and the joy of getting better every single day."
              </p>

              <div className="space-y-2.5 sm:space-y-3 text-espresso/70 font-medium leading-relaxed text-xs">
                {/* Journey card — orange accent */}
                <div className="p-3 sm:p-3.5 bg-[#F3722C]/15 rounded-xl border-l-4 border-[#F3722C] backdrop-blur-sm">
                  <h4 className="text-[8px] font-black uppercase tracking-widest text-[#F3722C] mb-1">The Journey</h4>
                  <p className="text-[11px] leading-relaxed">
                    Wilson Mathew grew up at G.V. Raja Sports School in Kerala. He started in track and field — winning state championships in Shot Put, Discus, and High Jump — before switching to volleyball, where he found his real calling.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 sm:p-3 bg-white/80 rounded-xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-espresso/40 mb-1">Elite Training</h4>
                    <p className="text-[11px] leading-relaxed">
                      Selected for SAI with five years under top national coaches, representing state, university, and Indian Railways.
                    </p>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white/80 rounded-xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-espresso/40 mb-1">Professional Honors</h4>
                    <p className="text-[11px] leading-relaxed">
                      Junior India National camp & MVP at Jimmy George National Tournament in Dallas (2026).
                    </p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 bg-white/80 rounded-xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                  <h4 className="text-[8px] font-black uppercase tracking-widest text-espresso/40 mb-1">Coaching Philosophy</h4>
                  <p className="text-[11px] leading-relaxed">
                    Wilson holds FIVB Level 1 & 2 coaching certifications. He believes good coaching helps players think better, compete confidently, and grow as people.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-3.5 sm:space-y-4 gsap-reveal">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#D62828] via-[#F9BC00] to-[#F3722C]/30" />
              {[
                { year: 'Early Career', event: 'Track & Field Excellence',        desc: 'National Silver Medalist in Shot Put and State Champion in multiple disciplines.' },
                { year: 'Development', event: 'SAI Elite Training',               desc: "Selected for India's premier Sports Authority, completing 5 years of advanced volleyball training." },
                { year: 'Competitive', event: 'National & University Representative', desc: 'Represented Indian Railways and state university teams at the highest competitive levels.' },
                { year: '2024',        event: 'Founded Challengers Academy',      desc: 'Established the academy in Florida, bringing international standards to youth development.' },
                { year: '2026',        event: 'MVP Award & California Expansion', desc: 'MVP at Jimmy George National Tournament; expanded operations to the SF Bay Area.' },
              ].map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative"
                >
                  <div className="absolute -left-6 sm:-left-8 top-0.5 w-4 sm:w-5 h-4 sm:h-5 bg-white border-2 border-[#D62828] rounded-full flex items-center justify-center shadow-sm z-10">
                    <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#D62828] rounded-full" />
                  </div>
                  <div className="text-[8px] font-black text-[#D62828] tracking-widest uppercase mb-0.5">{m.year}</div>
                  <h4 className="text-xs sm:text-sm font-serif text-espresso mb-0.5">{m.event}</h4>
                  <p className="text-[11px] text-espresso/60 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUES ────────────────────────────────────────── */}
        <div className="mb-8 sm:mb-12 gsap-reveal">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-[#D62828] font-black text-[9px] tracking-[0.4em] uppercase mb-1">Core Values</p>
            <h2 className="text-2xl md:text-4xl font-condensed text-espresso uppercase tracking-tighter">What we stand for.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Shield, title: 'Honesty',     desc: 'We tell players where they actually stand and what they need to work on. No fluff.',  bg: 'bg-[#1A1A1A]',  text: 'text-white', iconBg: 'bg-white/10 text-white' },
              { icon: Users,  title: 'Community',  desc: 'We\'re a tight-knit group. Parents, kids, and coaches all know each other by name.',       bg: 'bg-[#F9BC00]',  text: 'text-espresso', iconBg: 'bg-espresso/10 text-espresso' },
              { icon: Trophy, title: 'Hard Work',  desc: 'We don\'t promise shortcuts. We promise that if you put in the effort, you will improve.', bg: 'bg-[#D62828]',  text: 'text-white', iconBg: 'bg-white/10 text-white' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-4 sm:p-5 rounded-xl shadow-sm border border-espresso/5 group transition-all ${item.bg} ${item.text} backdrop-blur-sm`}
              >
                <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${item.iconBg}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-serif mb-1.5">{item.title}</h3>
                <p className="text-xs opacity-75 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pinned Coaches Section */}
        <div className="-mx-4 md:-mx-8 lg:-mx-16 my-6 sm:my-10">
          <CoachesSection />
        </div>

        {/* FAQ */}
        <div className="gsap-reveal mb-8 sm:mb-12">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-[#D62828] font-black text-[9px] tracking-[0.4em] uppercase mb-1">Common Inquiries</p>
            <h2 className="text-2xl md:text-4xl font-condensed text-espresso uppercase tracking-tighter">
              Everything you need to <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">know.</span>
            </h2>
          </div>
          <FAQSection />
        </div>

        {/* ── CREDIBILITY ─────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-espresso/5 shadow-sm relative overflow-hidden gsap-reveal">
          {/* colourful top border strip */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D62828] via-[#F9BC00] to-[#F3722C] rounded-t-2xl sm:rounded-t-3xl" />

          <div className="text-center mb-4 sm:mb-6">
            <p className="text-[#D62828] font-black text-[9px] tracking-[0.4em] uppercase mb-1">Credibility</p>
            <h2 className="text-2xl md:text-4xl font-condensed text-espresso uppercase tracking-tighter">
              A legacy of athletic <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'AAU Member',     Logo: AAULogo,  sub: 'Junior Olympic Volleyball' },
              { label: 'FIVB Certified', Logo: FIVBLogo, sub: 'Level 1 & 2 International' },
              { label: 'NFHS Certified', Logo: NFHSLogo, sub: 'High School Coaching' },
              { label: 'USA Volleyball', Logo: USAVLogo, sub: 'National Governing Body' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center justify-center p-4 sm:p-5 bg-[#FBF9F6] rounded-2xl border border-espresso/5 shadow-sm group hover:bg-white hover:border-espresso/15 transition-all"
              >
                <div className="w-full h-12 sm:h-14 flex items-center justify-center mb-2 px-1 group-hover:scale-105 transition-transform">
                  <item.Logo className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-espresso text-center">{item.label}</span>
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-espresso/45 text-center mt-0.5">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
