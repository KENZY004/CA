import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "18638459913";
  const message = encodeURIComponent("Hi Challengers Volleyball Academy! I'd like to inquire about coaching sessions.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white text-espresso px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with a Coach
      </div>
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}
