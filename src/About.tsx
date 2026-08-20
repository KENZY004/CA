import { motion } from 'motion/react';
import { ASSETS } from './assets/images';
import SectionHeader from './components/SectionHeader';
import { useGsapReveal } from './hooks/useGsapReveal';
import SEO from './components/SEO';
import CoachesSection from './components/CoachesSection';
import FAQSection from './components/FAQSection';
import { Shield, Users, Trophy } from 'lucide-react';

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
        description="Learn about the mission, coaches, and philosophy of Challengers Volleyball Academy. We are dedicated to developing elite athletes through disciplined training."
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
      <section className="relative overflow-hidden pt-28 pb-16" style={{ zIndex: 1 }}>
        {/* subtle bleed blobs */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#F9BC00]/15 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-[#D62828]/10 rounded-full blur-[80px] -ml-20 pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#D62828]" />
              <span className="text-[#D62828] font-black text-[10px] tracking-[0.4em] uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-condensed text-espresso uppercase tracking-tighter leading-[0.88] mb-5">
              Building a<br />
              <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">legacy of excellence.</span>
            </h1>
            <p className="text-espresso/60 text-sm md:text-base font-medium max-w-lg leading-relaxed mb-8">
              Challengers Volleyball Academy was founded with one purpose — to give every athlete the tools, environment, and mentorship they need to reach the highest levels of the game.
            </p>
            {/* quick stats row */}
            <div className="flex flex-wrap gap-4">
              {[
                { n: '500+', l: 'Athletes Trained' },
                { n: '30+', l: 'Years Experience' },
                { n: 'FIVB L2', l: 'Certified Coach' },
              ].map((s) => (
                <div key={s.l} className="px-5 py-3 bg-white rounded-2xl border border-espresso/5 shadow-sm">
                  <div className="text-xl font-condensed text-[#D62828]">{s.n}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-espresso/40">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right: colourful circular grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-3 md:gap-4">
            {GRID_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: 'backOut' }}
                className="aspect-square overflow-hidden shadow-md"
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

      <div className="container mx-auto px-4 py-12" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── FOUNDER STORY ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">

          {/* sticky left: portrait + quick cards */}
          <div className="space-y-5 sticky top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5] relative group border-4 border-white/80"
            >
              <img
                src={ASSETS.ABOUT.COACH_PORTRAIT}
                alt="Coach Wilson Mathew"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
              <div className="absolute bottom-7 left-7">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#F9BC00] mb-1">Founder & Head Coach</p>
                <h3 className="text-2xl font-serif text-white">Wilson Mathew</h3>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#F9BC00]/90 rounded-2xl border border-espresso/5 shadow-md backdrop-blur-sm">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso mb-2">Our Vision</h4>
                <p className="text-xs font-bold text-espresso/70 leading-relaxed italic">
                  "To be the premier academy in California where every athlete transforms their passion into elite performance."
                </p>
              </div>
              <div className="p-5 bg-[#D62828]/90 text-white rounded-2xl shadow-md backdrop-blur-sm">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#F9BC00] mb-2">Our Mission</h4>
                <p className="text-xs font-bold text-white/70 leading-relaxed italic">
                  "Empowering youth through technical mastery, mental resilience, and life-long character building."
                </p>
              </div>
            </div>
          </div>

          {/* right: narrative */}
          <div className="space-y-10">
            <div className="gsap-reveal">
              <h2 className="text-4xl md:text-5xl font-condensed uppercase tracking-tighter mb-5">
                Meet Our Founder –{' '}
                <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">Coach Wilson</span>
              </h2>
              <p className="text-lg font-serif text-espresso/75 leading-relaxed italic mb-8">
                "Volleyball isn't just a game; it's a blueprint for life. I founded Challengers Academy to pass on the discipline, resilience, and joy I've found in over three decades on the court."
              </p>

              <div className="space-y-5 text-espresso/70 font-medium leading-relaxed text-sm">
                {/* Journey card — orange accent */}
                <div className="p-6 bg-[#F3722C]/15 rounded-2xl border-l-4 border-[#F3722C] backdrop-blur-sm">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-[#F3722C] mb-3">The Journey</h4>
                  <p>
                    Wilson Mathew's journey began at G.V. Raja Sports School, Kerala's premier sports institution. His initial excellence in track and field — winning multiple state championships in Shot Put, Discus, and High Jump — laid the physical foundation for his transition to volleyball.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-5 bg-white/80 rounded-2xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso/40 mb-3">Elite Training</h4>
                    <p className="text-xs">
                      Selected for the Sports Authority of India (SAI), Wilson completed five years of advanced volleyball training under elite national coaches, representing his state, university, and Indian Railways.
                    </p>
                  </div>
                  <div className="p-5 bg-white/80 rounded-2xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso/40 mb-3">Professional Excellence</h4>
                    <p className="text-xs">
                      A Junior India National camp selection and a recent MVP honor at the Jimmy George National Tournament in Dallas (2026) highlight a career defined by longevity and peak performance.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white/80 rounded-2xl border border-espresso/5 shadow-sm backdrop-blur-sm">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-espresso/40 mb-3">Coaching Philosophy</h4>
                  <p className="text-xs">
                    Wilson holds FIVB Level 1 and 2 International Coaching Certifications. His philosophy focuses on technical mastery, game intelligence, and character building, ensuring every athlete reaches their full potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-10 space-y-8 gsap-reveal">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#D62828] via-[#F9BC00] to-[#F3722C]/30" />
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
                  <div className="absolute -left-10 top-1 w-6 h-6 bg-white border-2 border-[#D62828] rounded-full flex items-center justify-center shadow-sm z-10">
                    <div className="w-2 h-2 bg-[#D62828] rounded-full" />
                  </div>
                  <div className="text-[9px] font-black text-[#D62828] tracking-widest uppercase mb-0.5">{m.year}</div>
                  <h4 className="text-base font-serif text-espresso mb-1">{m.event}</h4>
                  <p className="text-xs text-espresso/55 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Vision / Mission repeat */}
            <div className="grid grid-cols-2 gap-5 gsap-reveal">
              <div className="p-7 bg-[#F9BC00] rounded-[1.75rem] border border-espresso/5 shadow-md relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-base font-serif text-espresso mb-2 relative z-10">Vision</h3>
                <p className="text-xs text-espresso/70 leading-relaxed italic relative z-10">
                  "To build a community where every athlete discovers the champion within through discipline and elite coaching."
                </p>
              </div>
              <div className="p-7 bg-[#D62828] text-white rounded-[1.75rem] shadow-md relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-base font-serif mb-2 relative z-10">Mission</h3>
                <p className="text-xs text-white/70 leading-relaxed italic relative z-10">
                  "Empowering youth through technical mastery, mental resilience, and the relentless pursuit of excellence."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── VALUES ────────────────────────────────────────── */}
        <div className="mb-16 gsap-reveal">
          <div className="text-center mb-8">
            <p className="text-[#D62828] font-black text-[10px] tracking-[0.4em] uppercase mb-2">Core Values</p>
            <h2 className="text-3xl md:text-5xl font-condensed text-espresso uppercase tracking-tighter">What we stand for.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Integrity',  desc: 'We uphold the highest standards of sportsmanship and honesty.',        bg: 'bg-[#1A1A1A]',  text: 'text-white', iconBg: 'bg-white/10 text-white' },
              { icon: Users,  title: 'Community',  desc: 'Building a supportive network for athletes and their families.',        bg: 'bg-[#F9BC00]',  text: 'text-espresso', iconBg: 'bg-espresso/10 text-espresso' },
              { icon: Trophy, title: 'Excellence', desc: 'Striving for perfection in every drill and every game.',                bg: 'bg-[#D62828]',  text: 'text-white', iconBg: 'bg-white/10 text-white' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-[2rem] shadow-md border border-espresso/5 group transition-all ${item.bg} ${item.text} backdrop-blur-sm`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${item.iconBg}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pinned Coaches Section */}
        <div className="-mx-4 md:-mx-8 lg:-mx-16 my-16">
          <CoachesSection />
        </div>

        {/* FAQ */}
        <div className="gsap-reveal mb-16">
          <SectionHeader
            eyebrow="Common Inquiries"
            title="Everything you need to know."
            italicWord="know"
            id="faq-header"
          />
          <FAQSection />
        </div>

        {/* ── CREDIBILITY ─────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-14 border border-espresso/5 shadow-md relative overflow-hidden gsap-reveal">
          {/* colourful top border strip */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D62828] via-[#F9BC00] to-[#F3722C] rounded-t-[2.5rem]" />

          <div className="text-center mb-10">
            <p className="text-[#D62828] font-black text-[10px] tracking-[0.4em] uppercase mb-2">Credibility</p>
            <h2 className="text-3xl md:text-5xl font-condensed text-espresso uppercase tracking-tighter">
              A legacy of athletic <span className="text-[#D62828] font-serif-italic normal-case italic tracking-normal">excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'AAU Member',     icon: 'AAU',  color: '#D62828', bg: 'bg-[#D62828]/10' },
              { label: 'FIVB Level 2',   icon: 'FIVB', color: '#F9BC00', bg: 'bg-[#F9BC00]/20' },
              { label: 'NFHS Certified', icon: 'NFHS', color: '#F3722C', bg: 'bg-[#F3722C]/10' },
              { label: 'USA Volleyball', icon: 'USAV', color: '#1B1B1D', bg: 'bg-espresso/5'    },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 p-5 bg-[#FBF9F6] rounded-2xl border border-espresso/5 shadow-sm"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center font-black text-base border-2`}
                  style={{ color: item.color, borderColor: `${item.color}44` }}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-espresso/50 text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
