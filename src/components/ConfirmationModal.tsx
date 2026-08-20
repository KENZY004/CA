import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmationModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-crimson" />,
          bg: 'bg-crimson/10',
          button: 'bg-crimson hover:bg-espresso text-white shadow-crimson/20',
          border: 'border-crimson/20'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
          bg: 'bg-yellow-50',
          button: 'bg-yellow-600 hover:bg-espresso text-white shadow-yellow-600/20',
          border: 'border-yellow-200'
        };
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-espresso" />,
          bg: 'bg-ivory',
          button: 'bg-espresso hover:bg-crimson text-white shadow-espresso/20',
          border: 'border-espresso/10'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-md rounded-[32px] p-8 border border-espresso/10 relative shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-espresso/20 hover:text-espresso transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${styles.border} ${styles.bg}`}>
                {styles.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-espresso mb-3 italic">{title}</h3>
              <p className="text-espresso/60 text-sm leading-relaxed mb-8">{message}</p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 bg-ivory text-espresso py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-espresso/5 transition-all"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 ${styles.button} py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
