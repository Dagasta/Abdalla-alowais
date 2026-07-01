'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

export default function FloatingButtons() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const waMessage = language === 'ar'
    ? 'مرحباً، أود الاستفسار عن خدمات براند آند مور لتخليص المعاملات.'
    : 'Hello, I would like to inquire about B&M Brand & More transaction services.';

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/971566955355?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-xl transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={28} />
          </motion.a>

          {/* Call — mobile only */}
          <motion.a
            href="tel:+97124911227"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-14 h-14 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-full flex items-center justify-center shadow-xl transition-colors"
            aria-label="Call B&M office"
          >
            <FiPhone size={24} />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
