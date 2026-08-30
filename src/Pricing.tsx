import { motion } from 'motion/react';
import SectionHeader from './components/SectionHeader';
import { Check, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const PLANS = [
  {
    name: 'Single Session',
    price: 45,
    desc: 'Perfect for trying out our coaching style.',
    features: ['1 x 90-minute session', 'Skill assessment', 'Standard equipment', 'No long-term commitment'],
    color: 'bg-[#F9BC00] text-espresso',
    popular: false
  },
  {
    name: 'Monthly Elite',
    price: 180,
    desc: 'Our most popular plan for regular development.',
    features: ['4 x 90-minute sessions', 'Progress tracking', 'Positional focus', 'Priority clinic booking', 'Sibling discount eligible'],
    color: 'bg-[#D62828] text-white',
    popular: true
  },
  {
    name: 'Competition Plus',
    price: 320,
    desc: 'Intensive training for active competitive players.',
    features: ['8 x 90-minute sessions', 'Tactical video review', 'Personal development plan', 'Free camp jersey', '10% discount on all camps'],
    color: 'bg-[#1A1A1A] text-white',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-20 bg-[#FBF9F6] min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <SectionHeader 
          eyebrow="Investment" 
          title="Transparent pricing for elite training."
          italicWord="elite"
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-6 rounded-[2rem] border border-espresso/5 shadow-xl flex flex-col ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-espresso text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md z-10">
                  Most Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-serif mb-1">{plan.name}</h3>
                <p className={`text-xs opacity-60`}>{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-serif">${plan.price}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40`}>
                  {plan.name === 'Single Session' ? '/ Session' : '/ Month'}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-xs font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${plan.name === 'Monthly Elite' ? 'bg-white/20 text-white' : 'bg-espresso/10 text-espresso'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <NavLink
                to={`/register?program=${encodeURIComponent(plan.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all
                  ${plan.name === 'Competition Plus' ? 'bg-[#F9BC00] text-espresso hover:bg-white' : 
                    plan.name === 'Monthly Elite' ? 'bg-white text-espresso hover:bg-espresso hover:text-white' : 
                    'bg-espresso text-white hover:bg-[#D62828]'}
                `}
              >
                Get Started
              </NavLink>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-white p-6 rounded-[1.5rem] border border-espresso/5 flex items-start gap-4 max-w-xl mx-auto shadow-md"
        >
          <div className="w-10 h-10 bg-[#D62828]/10 rounded-xl flex items-center justify-center text-[#D62828] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 text-espresso">Sibling Discount</h4>
            <p className="text-espresso/60 text-xs leading-relaxed">
              Registering more than one child? We offer a <span className="text-[#D62828] font-bold">10% discount</span> on all monthly plans and camp registrations for each additional sibling.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
