import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What age groups does Challengers Academy train?",
    answer: "We primarily train athletes between the ages of 10 and 18. Our programs are divided into specific phases (Foundational to Elite) to ensure every player receives coaching tailored to their physical and technical maturity."
  },
  {
    question: "Do you accept absolute beginners?",
    answer: "Yes! Our 'Phase 01: Foundational Mastery' is specifically designed for athletes who are new to the sport. We focus on establishing proper biomechanics and basic ball control before progressing to tactical play."
  },
  {
    question: "What is the typical training schedule?",
    answer: "Most of our training sessions take place in the evenings on weekdays and during the morning/afternoon on weekends. Specific schedules depend on your assigned training phase and location. Registered members receive access to our full digital calendar."
  },
  {
    question: "Where are your training facilities located?",
    answer: "Challengers Academy currently operates in prime athletic facilities across the San Francisco Bay Area, with major hubs in Silicon Valley and the East Bay. We select locations with high-quality flooring and professional-grade nets."
  },
  {
    question: "What equipment do athletes need to bring?",
    answer: "Athletes should come prepared with non-marking indoor court shoes (volleyball-specific preferred), comfortable athletic wear, knee pads, and a reusable water bottle. We provide all professional-grade volleyballs and training equipment."
  },
  {
    question: "How do the Elite training phases work?",
    answer: "Our academy follows a 5-Phase Development Model. Progression is based on merit and skill mastery rather than age alone. Coaches evaluate athletes periodically to determine if they are ready to advance to more complex tactical training."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
              activeIndex === index 
                ? 'bg-white border-espresso/10 shadow-2xl' 
                : 'bg-white/40 border-espresso/5 hover:border-espresso/10 shadow-sm'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-8 py-8 flex items-center justify-between text-left group"
            >
              <span className={`text-lg font-serif transition-colors duration-300 ${
                activeIndex === index ? 'text-crimson' : 'text-espresso'
              }`}>
                {faq.question}
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeIndex === index 
                  ? 'bg-crimson text-white rotate-180' 
                  : 'bg-espresso/5 text-espresso group-hover:bg-espresso/10'
              }`}>
                {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-8 pb-8">
                    <div className="h-px w-12 bg-crimson/20 mb-6" />
                    <p className="text-espresso/60 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
