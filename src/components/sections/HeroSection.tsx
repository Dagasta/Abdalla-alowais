'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FiArrowDown, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const TYPING_STRINGS_EN = [
  'Government Transactions',
  'UAE Visa Extraction',
  'Traffic Fine Clearance',
  'Amer Dubai Services',
  'VIP Priority Services',
];

const TYPING_STRINGS_AR = [
  'تخليص المعاملات الحكومية',
  'استخراج تأشيرات الإمارات',
  'تسوية المخالفات المرورية',
  'خدمات عامر دبي',
  'خدمات كبار الشخصيات',
];

function TypewriterText({ strings }: { strings: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = strings[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText === target) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % strings.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? target.substring(0, currentText.length - 1)
            : target.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, strings]);

  return (
    <span className="text-gold-400 font-bold whitespace-nowrap">
      {currentText}
      <span className="inline-block w-0.5 h-[0.9em] bg-gold-400 ms-1 animate-pulse" />
    </span>
  );
}

export default function HeroSection() {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const strings = isAr ? TYPING_STRINGS_AR : TYPING_STRINGS_EN;
  const { ref, inView } = useInView({ triggerOnce: true });

  const stats = [
    { value: 5000, suffix: '+', label: t('hero.stat1Label') },
    { value: 100, suffix: '%', label: t('hero.stat2Label') },
    { value: 24, suffix: '/7', label: t('hero.stat3Label') },
    { value: 2, suffix: '', label: t('hero.stat4Label') },
  ];

  const waMessage = isAr
    ? 'مرحباً، أود الاستفسار عن خدمات براند آند مور لتخليص المعاملات.'
    : 'Hello, I would like to inquire about B&M Brand & More transaction services.';

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-gradient"
      aria-label="Hero section"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/8 opacity-50" />
        <div className="blob absolute bottom-1/4 -right-32 w-80 h-80 bg-navy-400/10 opacity-30"
          style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-700/5"
          style={{ animationDelay: '4s' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium">{t('hero.badge')}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.15] mb-6">
              {t('hero.title1')}{' '}
              <br className="hidden md:block" />
              <TypewriterText strings={strings} />
            </h1>

            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold text-base px-7 py-3.5 shadow-gold-lg"
              >
                {t('hero.cta1')}
              </motion.a>
              <motion.a
                href="tel:+97124911227"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <FiPhone size={18} /> {t('hero.cta2')}
              </motion.a>
              <motion.a
                href={`https://wa.me/971566955355?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <FaWhatsapp size={20} className="text-green-400" /> {t('hero.cta3')}
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            ref={ref}
          >
            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Gold accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gold-gradient" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-navy-600/50 flex items-center justify-center">
                  <span className="text-gold-400 font-serif text-sm font-bold">B&M</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Brand &amp; More</p>
                  <p className="text-white/50 text-xs">Transaction Following</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center p-4 bg-white/5 rounded-2xl border border-white/5"
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {inView ? (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          suffix={stat.suffix}
                          enableScrollSpy={false}
                        />
                      ) : '0'}
                    </div>
                    <div className="text-white/50 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* License badge */}
              <div className="mt-6 p-3 bg-gold-500/10 border border-gold-500/20 rounded-xl text-center">
                <p className="text-gold-300 text-xs font-medium">
                  ✓ Abu Dhabi DED Registered · License CN-3734050
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#services" aria-label="Scroll to services" className="text-white/40 hover:text-white/80 transition-colors">
            <FiArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
