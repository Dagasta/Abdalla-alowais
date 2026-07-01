'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function TestimonialsSection() {
  const { t, messages } = useLanguage();
  const items = messages.testimonials.items;
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  return (
    <section
      className="py-24 bg-navy-50 dark:bg-navy-900"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="testimonials-heading" className="section-heading mb-4">{t('testimonials.heading')}</h2>
          <div className="gold-divider mb-5" />
          <p className="section-subheading">{t('testimonials.subheading')}</p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-navy-800 rounded-3xl p-8 md:p-12 shadow-card border border-navy-100 dark:border-navy-700 relative overflow-hidden"
              >
                {/* Quote decoration */}
                <div className="absolute top-6 right-8 text-8xl font-serif text-gold-500/10 leading-none select-none" aria-hidden="true">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: items[active].rating }).map((_, i) => (
                    <FiStar key={i} className="text-gold-400 fill-gold-400" size={18} />
                  ))}
                </div>

                <blockquote className="text-navy-700 dark:text-navy-200 text-lg leading-relaxed mb-8 relative z-10">
                  "{items[active].text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy-800 dark:bg-navy-700 flex items-center justify-center text-white font-bold text-lg">
                    {items[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 dark:text-white">{items[active].name}</p>
                    <p className="text-sm text-navy-500 dark:text-navy-400">{items[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-navy-200 dark:border-navy-600 flex items-center justify-center text-navy-600 dark:text-white hover:bg-navy-800 hover:text-white dark:hover:bg-gold-500 dark:hover:text-navy-900 hover:border-transparent transition-all duration-300"
              >
                <FiChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {items.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-gold-500' : 'w-2 bg-navy-200 dark:bg-navy-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-navy-200 dark:border-navy-600 flex items-center justify-center text-navy-600 dark:text-white hover:bg-navy-800 hover:text-white dark:hover:bg-gold-500 dark:hover:text-navy-900 hover:border-transparent transition-all duration-300"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
