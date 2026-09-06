import { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Check, Info, Clock, Users, User, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from './components/SEO';

const OFFICIAL_PACKAGES = [
  {
    id: 'tryout-session',
    name: 'Tryout Session',
    category: 'Assessment',
    students: 'Individual / Group',
    duration: '2 Hours',
    sessions: '1 Session',
    price: 30,
    priceNote: 'one-time',
    desc: 'Perfect introduction to evaluate skills and experience our coaching style.',
    features: [
      'Comprehensive 2-hour court evaluation',
      'Coach skill & mechanics feedback',
      'Placement recommendation',
      'Zero long-term commitment'
    ],
    popular: false,
    color: 'bg-white text-espresso border-espresso/10'
  },
  {
    id: 'gym-training-4',
    name: 'Gym Training (4 Sessions)',
    category: 'Indoor Gym',
    students: 'Group',
    duration: '2 Hours / session',
    sessions: '4 Sessions',
    price: 200,
    priceNote: '/ package',
    desc: 'Core indoor academy training with structured drills, rotations, and scrimmage.',
    features: [
      '4 x 2-hour indoor gym sessions',
      'Technical passing, serving & spiking',
      'Positional rotation & game systems',
      'Active coach mentorship'
    ],
    popular: false,
    color: 'bg-[#F9BC00] text-espresso border-amber-400'
  },
  {
    id: 'gym-training-12',
    name: 'Gym Training (12 Sessions)',
    category: 'Indoor Gym',
    students: 'Group',
    duration: '2 Hours / session',
    sessions: '12 Sessions',
    price: 550,
    priceNote: '/ package',
    desc: 'Our most comprehensive indoor development program for rapid improvement.',
    features: [
      '12 x 2-hour high-intensity gym sessions',
      'Position-specific specialization',
      'Biomechanical jump & spike review',
      'School & club tryout prep',
      'Save $50 compared to 4-session pack'
    ],
    popular: true,
    color: 'bg-[#D62828] text-white border-red-600'
  },
  {
    id: 'open-park-group',
    name: 'Open Park Group Training',
    category: 'Outdoor Park',
    students: 'Group',
    duration: '2 Hours / session',
    sessions: '4 Sessions',
    price: 150,
    priceNote: 'per student',
    desc: 'High-rep outdoor training building endurance, agility, and fundamental skills.',
    features: [
      '4 x 2-hour outdoor park sessions',
      'Full skill development in open air',
      'High repetition passing & defense',
      'Great value group format'
    ],
    popular: false,
    color: 'bg-white text-espresso border-espresso/10'
  },
  {
    id: 'open-park-private',
    name: 'Open Park (Private 1-on-1)',
    category: 'Private Coaching',
    students: '1 Student',
    duration: '1 Hour / session',
    sessions: '4 Sessions',
    price: 360,
    priceNote: '/ package',
    desc: 'Dedicated 1-on-1 coaching customized completely to your personal mechanics.',
    features: [
      '4 x 1-hour private sessions',
      '100% focused one-on-one attention',
      'Targeted weakness elimination',
      'Custom drill progression'
    ],
    popular: false,
    color: 'bg-[#1A1A1A] text-white border-zinc-700'
  },
  {
    id: 'open-park-travel',
    name: 'Open Park (Short Distance Travel)',
    category: 'Private Coaching',
    students: '1 Student',
    duration: '1 Hour / session',
    sessions: '4 Sessions',
    price: 320,
    priceNote: '/ package',
    desc: 'Personalized private coaching at convenient nearby park facilities.',
    features: [
      '4 x 1-hour private sessions',
      'Nearby park location flexibility',
      'Custom technique acceleration',
      'Personalized drill routines'
    ],
    popular: false,
    color: 'bg-white text-espresso border-espresso/10'
  },
  {
    id: 'large-group-training',
    name: 'Large Group Training (13+)',
    category: 'Team / Group',
    students: '13+ Students',
    duration: '2 Hours / session',
    sessions: '4 Sessions',
    price: 120,
    priceNote: 'per student',
    desc: 'Special group pricing for school squads, clubs, and large youth batches.',
    features: [
      '4 x 2-hour team & group sessions',
      'Team tactical & scrimmage dynamics',
      'Communication and court chemistry',
      'Most economical per-student rate'
    ],
    popular: false,
    color: 'bg-white text-espresso border-espresso/10'
  }
];

export default function Pricing() {
  const [filter, setFilter] = useState<'all' | 'gym' | 'park' | 'private'>('all');

  const filtered = OFFICIAL_PACKAGES.filter(pkg => {
    if (filter === 'gym') return pkg.category.includes('Indoor');
    if (filter === 'park') return pkg.category.includes('Outdoor') || pkg.category.includes('Group');
    if (filter === 'private') return pkg.category.includes('Private') || pkg.id === 'tryout-session';
    return true;
  });

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24 bg-[#FBF9F6] min-h-screen font-sans">
      <SEO 
        title="Training Fees & Packages" 
        description="Official training fees for Challengers Volleyball Academy: Gym Training, Open Park Group, Private 1-on-1, and Tryouts."
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <SectionHeader 
          eyebrow="Academy Fees" 
          title="Clear, transparent coaching fees."
          italicWord="transparent"
        />

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 mb-10 flex-wrap">
          {[
            { id: 'all', label: 'All Packages (7)' },
            { id: 'gym', label: 'Gym Training' },
            { id: 'park', label: 'Park & Groups' },
            { id: 'private', label: 'Private & Tryouts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-espresso text-white shadow-md'
                  : 'bg-white text-espresso/70 hover:bg-espresso/10 border border-espresso/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`relative p-6 sm:p-8 rounded-[2rem] border shadow-xl flex flex-col justify-between ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F9BC00] text-espresso px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Most Popular • Best Value
                </div>
              )}
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 bg-black/5 px-3 py-1 rounded-full">
                    {plan.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold opacity-70">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{plan.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-condensed font-black uppercase tracking-tight mb-2">{plan.name}</h3>
                <p className="text-xs opacity-75 mb-6 leading-relaxed min-h-[32px]">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-current/10">
                  <span className="text-4xl sm:text-5xl font-condensed font-black tracking-tighter">${plan.price}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    {plan.priceNote}
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-[11px] font-bold opacity-80">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-orange shrink-0" />
                    <span>Students: <strong>{plan.students}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange shrink-0" />
                    <span>Package: <strong>{plan.sessions}</strong></span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-xs font-medium">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.id === 'gym-training-12' ? 'bg-white/20 text-white' : 'bg-[#D62828]/10 text-[#D62828]'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <NavLink
                to={`/register?session=${plan.id}`}
                className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-98
                  ${plan.id === 'gym-training-12' ? 'bg-white text-[#D62828] hover:bg-[#F9BC00] hover:text-espresso' :
                    plan.id === 'gym-training-4' ? 'bg-espresso text-white hover:bg-[#D62828]' :
                    plan.id === 'open-park-private' ? 'bg-[#F9BC00] text-espresso hover:bg-white' :
                    'bg-espresso text-white hover:bg-[#D62828]'}
                `}
              >
                Enroll in Package <ArrowRight className="w-4 h-4" />
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Official Fee Schedule Table */}
        <div className="mt-16 bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-espresso/5 shadow-xl">
          <div className="mb-6">
            <span className="text-[#D62828] text-[10px] font-black uppercase tracking-widest">Official Schedule</span>
            <h3 className="text-2xl sm:text-3xl font-condensed font-black uppercase text-espresso mt-1">
              Challengers Volleyball Academy Training Fees
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-espresso/10 text-espresso/40 text-[10px] font-black uppercase tracking-widest">
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Students</th>
                  <th className="py-3 px-4">Session Duration</th>
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4 text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/5 font-medium text-espresso/80">
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Gym Training</td>
                  <td className="py-3.5 px-4">Group</td>
                  <td className="py-3.5 px-4">2 hours</td>
                  <td className="py-3.5 px-4">4 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$200</td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors bg-[#D62828]/5">
                  <td className="py-3.5 px-4 font-bold text-espresso flex items-center gap-2">
                    Gym Training
                    <span className="text-[9px] bg-[#D62828] text-white px-2 py-0.5 rounded-full font-bold uppercase">Best Value</span>
                  </td>
                  <td className="py-3.5 px-4">Group</td>
                  <td className="py-3.5 px-4">2 hours</td>
                  <td className="py-3.5 px-4">12 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$550</td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Open Park (Private Coaching)</td>
                  <td className="py-3.5 px-4">1 student</td>
                  <td className="py-3.5 px-4">1 hour</td>
                  <td className="py-3.5 px-4">4 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$360</td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Open Park (Short Distance Travel)</td>
                  <td className="py-3.5 px-4">1 student</td>
                  <td className="py-3.5 px-4">1 hour</td>
                  <td className="py-3.5 px-4">4 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$320</td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Open Park - Group Training</td>
                  <td className="py-3.5 px-4">Group</td>
                  <td className="py-3.5 px-4">2 hours</td>
                  <td className="py-3.5 px-4">4 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$150 <span className="text-[10px] text-espresso/40">/ student</span></td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Large Group Training</td>
                  <td className="py-3.5 px-4">13 or more students</td>
                  <td className="py-3.5 px-4">2 hours</td>
                  <td className="py-3.5 px-4">4 sessions</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$120 <span className="text-[10px] text-espresso/40">/ student</span></td>
                </tr>
                <tr className="hover:bg-[#FBF9F6] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-espresso">Tryout Session</td>
                  <td className="py-3.5 px-4">Individual / Group</td>
                  <td className="py-3.5 px-4">2 hours</td>
                  <td className="py-3.5 px-4">1 session</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#D62828] text-sm">$30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sibling Discount Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-10 bg-white p-6 rounded-[1.5rem] border border-espresso/5 flex items-start gap-4 max-w-xl mx-auto shadow-md"
        >
          <div className="w-10 h-10 bg-[#D62828]/10 rounded-xl flex items-center justify-center text-[#D62828] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 text-espresso">Sibling Discount</h4>
            <p className="text-espresso/60 text-xs leading-relaxed">
              Registering more than one child? We offer a <span className="text-[#D62828] font-bold">10% discount</span> on regular package fees and summer camp registrations for each additional sibling.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

