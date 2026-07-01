'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiZap, FiEye } from 'react-icons/fi';

const ICONS = [FiShield, FiUsers, FiZap, FiEye];

export default function WhyUsSection() {
  const { t, messages } = useLanguage();
  const items = messages.whyUs.items;

  return (
    <section
      id="about-preview"
      className="py-24 bg-navy-50 dark:bg-navy-900"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="why-us-heading" className="section-heading mb-4">{t('whyUs.heading')}</h2>
          <div className="gold-divider mb-5" />
          <p className="section-subheading">{t('whyUs.subheading')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: any, i: number) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center p-8 bg-white dark:bg-navy-800 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-navy-100 dark:border-navy-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-navy-800 dark:bg-navy-700 group-hover:bg-gold-500 flex items-center justify-center text-gold-400 group-hover:text-navy-900 mx-auto mb-5 transition-all duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-navy-900 dark:text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-navy-500 dark:text-navy-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
