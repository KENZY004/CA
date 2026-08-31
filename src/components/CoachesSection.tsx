import { motion } from 'motion/react';
import { ASSETS } from '../assets/images';

const COACH_SECTIONS = [
  {
    id: 'section1',
    number: '01',
    role: 'FOUNDER & HEAD COACH',
    name: 'Wilson Mathew',
    description: 'I started this academy because I believe every player deserves a real coach — someone who shows up, pays attention, and helps them get better in a real way. Over 30 years on the court taught me everything I know.',
    image: ASSETS.ABOUT.COACH_PORTRAIT,
    bgTexture: ASSETS.HERO.ACTION_CARD_4,
    stats: 'FIVB Level 1 & 2 • Junior India National • 30+ Yrs Exp',
    statPills: [
      { label: 'Athletes Mentored', value: '500+' },
      { label: 'National Honor', value: 'MVP 2026' }
    ]
  },
  {
    id: 'section2',
    number: '02',
    role: 'DEFENSE & LIBERO SPECIALIST',
    name: 'Sarah Jenkins',
    description: 'Stanford-trained and NCAA D1 experienced — Sarah brings sharp defensive skills and a training style that pushes players to react faster, move smarter, and compete at a higher level.',
    image: ASSETS.ABOUT.COACH_SARAH,
    bgTexture: ASSETS.HERO.ACTION_CARD_2,
    stats: 'NCAA Division I • USAV CAP I Certified',
    statPills: [
      { label: 'Stanford Alumna', value: 'NCAA D1' },
      { label: 'Specialty', value: 'Libero / Defense' }
    ]
  },
  {
    id: 'section3',
    number: '03',
    role: 'SETTING & OFFENSE COORDINATOR',
    name: 'Michael Chen',
    description: 'Michael spent 15+ years playing professional volleyball across Asia. He now puts all of that experience into coaching setters and offense — helping players read the court and make smarter decisions.',
    image: ASSETS.ABOUT.COACH_MICHAEL,
    bgTexture: ASSETS.HERO.ACTION_CARD_3,
    stats: 'FIVB Level 1 • Former Pro Player (Asia)',
    statPills: [
      { label: 'Pro Experience', value: '15+ Years' },
      { label: 'Focus', value: 'Setting & Offense' }
    ]
  },
  {
    id: 'section4',
    number: '04',
    role: 'YOUTH DEVELOPMENT COACH',
    name: 'Elena Rodriguez',
    description: 'Elena works with our youngest players and loves it. She makes practice fun while building the right habits from day one — footwork, ball control, and a love for the game.',
    image: ASSETS.ABOUT.COACH_ELENA,
    bgTexture: ASSETS.HERO.ACTION_CARD_1,
    stats: 'NFHS Certified • 10+ Years Club Coaching',
    statPills: [
      { label: 'Club Coaching', value: '10+ Years' },
      { label: 'Focus', value: 'Youth Foundations' }
    ]
  }
];

export default function CoachesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2]">
      {/* ── Aesthetic Sports Header (Light) ── */}
      <div className="py-8 sm:py-10 text-center bg-[#F3EFE6] text-espresso relative z-10 border-t border-b border-espresso/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D62828]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center justify-center gap-3 mb-1.5">
            <div className="h-px w-6 sm:w-8 bg-[#D62828]" />
            <span className="text-[#D62828] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase">
              Challengers Coaching Staff
            </span>
            <div className="h-px w-6 sm:w-8 bg-[#D62828]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-black uppercase tracking-tight text-espresso mt-0.5">
            MEET OUR <span className="font-serif-italic lowercase italic text-[#D62828]">coaches.</span>
          </h2>
          <p className="text-espresso/70 text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-medium tracking-wide">
            Scroll to meet the people who coach our players every week.
          </p>
        </div>
      </div>

      {/* ── Uniform Aesthetic Pinned Full-Screen Sections (Light Theme) ── */}
      <div className="relative">
        {COACH_SECTIONS.map((section, index) => {
          return (
            <div
              key={section.id}
              id={section.id}
              className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAF8F5] border-b border-espresso/10"
              style={{ zIndex: index + 1 }}
            >
              {/* Subtle Atmospheric Ambient Background Texture */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={section.bgTexture}
                  alt=""
                  className="w-full h-full object-cover opacity-[0.04] mix-blend-multiply scale-105 filter blur-[1px]"
                />
                {/* Refined subtle ambient glows */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#F9BC00]/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#D62828]/5 blur-[100px] pointer-events-none" />
              </div>

              {/* Pin Wrapper Content */}
              <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">

                {/* LEFT TEXT BOX */}
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-[54%] text-left pt-6 sm:pt-10 md:pt-0"
                >
                  {/* Number & Role Badge */}
                  <div className="mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-widest bg-white text-espresso border border-espresso/10 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                      <span>{section.number} — {section.role}</span>
                    </span>
                  </div>

                  {/* Coach Name */}
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-condensed font-black uppercase tracking-tight text-espresso mb-2 sm:mb-3 leading-none">
                    {section.name}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-espresso/75 text-xs sm:text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-wide font-sans mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                    "{section.description}"
                  </p>

                  {/* Credentials & Stat Pills Row */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/90 border border-espresso/10 text-espresso/90 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider shadow-sm">
                      {section.stats}
                    </div>
                    {section.statPills.map((s, i) => (
                      <div
                        key={i}
                        className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-white border border-espresso/10 text-espresso shadow-sm"
                      >
                        <div className="text-xs sm:text-sm font-black font-condensed text-[#D62828]">
                          {s.value}
                        </div>
                        <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-espresso/50">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* RIGHT FLOATING IMAGE CARD (Bauhaus Arch Silhouette) */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-auto flex justify-center md:justify-end pb-6 sm:pb-10 md:pb-0 shrink-0"
                >
                  <div 
                    className="relative w-[180px] sm:w-[260px] md:w-[340px] lg:w-[380px] aspect-[4/4.5] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-3 border-white group bg-[#EAE3D5]"
                    style={{ borderRadius: '10rem 10rem 2rem 2rem' }}
                  >
                    <img
                      src={section.image}
                      alt={section.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />

                    {/* Card Bottom Label */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 flex items-center justify-between shadow-lg">
                      <div>
                        <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#D62828] block">
                          Challengers Staff
                        </span>
                        <span className="text-xs sm:text-sm font-black text-espresso font-condensed uppercase tracking-wider">
                          {section.name}
                        </span>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#D62828] text-white flex items-center justify-center font-black text-[11px] sm:text-xs shadow-sm">
                        {section.number}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Down Indicator */}
              {index < COACH_SECTIONS.length - 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none opacity-60">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-espresso/60">
                    Scroll
                  </span>
                  <div className="w-2 h-2 border-b-2 border-r-2 border-espresso/60 rotate-45 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
