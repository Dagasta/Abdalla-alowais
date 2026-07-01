'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function VipBanner() {
  const { t, language, isRtl } = useLanguage();
  const features = t('vipBanner.features') as unknown as string[];
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;

  // Since t returns the raw string path if it fails, or the resolved string/array.
  // LanguageContext t resolves it. Let's make sure it handles arrays safely:
  const rawFeatures = typeof features === 'object' && Array.isArray(features)
    ? features
    : [
        isRtl ? 'مستشار علاقات مخصص للشركات' : 'Dedicated corporate liaison agent',
        isRtl ? 'مندوب آمن لاستلام وتسليم المستندات' : 'Secure door-to-door document courier',
        isRtl ? 'مواعيد طبية وبصمة سريعة الحجز' : 'Fast-track medical & biometrics appointments',
        isRtl ? 'تحديثات فورية عبر واتساب' : 'Real-time WhatsApp status updates'
      ];

  return (
    <section
      className="py-24 bg-navy-950 relative overflow-hidden"
      aria-labelledby="vip-heading"
    >
      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-400/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-300 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              {t('vipBanner.badge')}
            </span>

            <h2 id="vip-heading" className="text-4xl font-serif font-bold text-white mb-6 leading-tight">
              {t('vipBanner.heading')}
            </h2>
            <p className="text-navy-300 text-lg leading-relaxed mb-8">{t('vipBanner.body')}</p>

            <ul className="space-y-4 mb-10">
              {rawFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-white/85"
                >
                  <FiCheckCircle className="text-gold-400 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-sm">{f}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/services/vip-services"
              className="inline-flex items-center gap-2 btn-gold text-base px-8 py-4 shadow-gold-lg group"
            >
              {t('vipBanner.cta')}
              <ArrowIcon size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Premium Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative p-8 rounded-3xl border border-gold-500/25 bg-gradient-to-br from-navy-900/80 to-navy-950/80 backdrop-blur-lg shadow-2xl overflow-hidden">
              {/* Gold shimmer line at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient" />

              {/* VIP Crown decoration */}
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-gold-500/5 border border-gold-500/10 flex items-center justify-center">
                <span className="text-4xl" role="img" aria-label="Crown">👑</span>
              </div>

              <div className="mb-8">
                <span className="text-gold-400 text-xs uppercase tracking-widest font-bold block mb-2">
                  {language === 'ar' ? 'باقة فاخرة' : 'Premium Tier'}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'ar' ? 'خدمات كبار الشخصيات VIP' : 'VIP Concierge Services'}
                </h3>
                <p className="text-navy-400 text-sm">
                  {language === 'ar' ? 'معدل إنجاز أسرع بمرتين' : '2× faster turnaround guaranteed'}
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['24/7 Support', 'Door to Door', 'Fast Track', 'Priority Desk'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="block w-full text-center py-4 bg-gold-gradient text-navy-900 font-bold rounded-xl hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {language === 'ar' ? 'طلب خدمة VIP' : 'Request VIP Service'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
