import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What age groups do you train?",
    answer: "We mostly work with kids and teens between 10 and 18 years old. We split players into groups based on their skill level — not just their age — so everyone gets coaching that actually fits where they are."
  },
  {
    question: "Can my child join if they've never played before?",
    answer: "Absolutely. We have a beginner group specifically for players who are just starting out. We go over the basics — how to pass, how to position, how to move — before anything more advanced."
  },
  {
    question: "When are the training sessions?",
    answer: "We typically train on weekday evenings and weekend mornings. The exact schedule depends on which group you're in and which location you pick. Once you register, we'll share the full schedule with you."
  },
  {
    question: "Where are you located?",
    answer: "We currently run sessions in Fremont, Tracy, and San Leandro in the Bay Area. We always make sure to book gyms with good flooring and proper nets."
  },
  {
    question: "What should my child bring to practice?",
    answer: "Indoor court shoes (non-marking soles), comfortable workout clothes, knee pads, and a water bottle. We have all the volleyballs and other training gear — you don't need to bring any of that."
  },
  {
    question: "How does moving up to a higher level work?",
    answer: "We have 5 training levels. Players move up when they're genuinely ready — our coaches assess each player regularly and let families know when it's time to step up. It's always based on skill, not just how long they've been attending."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-2.5 sm:space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              activeIndex === index 
                ? 'bg-white border-espresso/10 shadow-md' 
                : 'bg-white/60 border-espresso/5 hover:border-espresso/10 shadow-xs'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left group"
            >
              <span className={`text-sm sm:text-base font-serif transition-colors duration-300 ${
                activeIndex === index ? 'text-crimson' : 'text-espresso'
              }`}>
                {faq.question}
              </span>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-3 ${
                activeIndex === index 
                  ? 'bg-crimson text-white rotate-180' 
                  : 'bg-espresso/5 text-espresso group-hover:bg-espresso/10'
              }`}>
                {activeIndex === index ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0">
                    <div className="h-px w-8 bg-crimson/20 mb-3" />
                    <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed font-normal">
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
