'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiFileText, FiNavigation, FiShield, FiHeart,
  FiAlertCircle, FiBookOpen, FiStar, FiArrowRight, FiArrowLeft
} from 'react-icons/fi';

const ICON_MAP: Record<string, React.ReactNode> = {
  passport: <FiFileText size={26} />,
  plane: <FiNavigation size={26} />,
  car: <FiShield size={26} />,
  heart: <FiHeart size={26} />,
  scale: <FiAlertCircle size={26} />,
  stamp: <FiBookOpen size={26} />,
  crown: <FiStar size={26} />,
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ServicesSection() {
  const { t, isRtl, messages } = useLanguage();
  const items = messages.services.items;

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;

  return (
    <section
      id="services"
      className="py-24 bg-white dark:bg-navy-950"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-300 text-sm font-semibold rounded-full mb-4 border border-gold-200 dark:border-gold-500/20">
            {isRtl ? 'ما نقدمه' : 'What We Offer'}
          </span>
          <h2 id="services-heading" className="section-heading mb-4">
            {t('services.heading')}
          </h2>
          <div className="gold-divider mb-5" />
          <p className="section-subheading">{t('services.subheading')}</p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {items.map((item: any, i: number) => (
            <motion.div key={item.slug} variants={cardVariants}>
              <Link
                href={`/services/${item.slug}`}
                className="group flex flex-col h-full p-6 bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-700 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-400 relative overflow-hidden"
              >
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-gold-400 flex items-center justify-center mb-5 group-hover:bg-navy-800 group-hover:text-gold-400 dark:group-hover:bg-gold-500/10 transition-all duration-300">
                  {ICON_MAP[item.icon] ?? <FiFileText size={26} />}
                </div>

                {/* Content */}
                <h3 className="text-navy-900 dark:text-white font-semibold text-lg mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-navy-500 dark:text-navy-300 text-sm leading-relaxed flex-1 mb-5">
                  {item.description}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-gold-400 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                  {t('services.learnMore')}
                  <ArrowIcon
                    size={16}
                    className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
