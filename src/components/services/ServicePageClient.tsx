'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiChevronDown, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

interface ServiceItem {
  slug: string;
  title: string;
  description: string;
}

interface Props {
  locale: string;
  item: ServiceItem;
  faqs: Array<{ q: string; a: string }>;
  slug: string;
  allItems: ServiceItem[];
}

export default function ServicePageClient({ item, faqs, slug, allItems }: Omit<Props, 'locale'>) {
  const { language, isRtl } = useLanguage();
  const isAr = language === 'ar';
  const ArrowBack = isAr ? FiArrowRight : FiArrowLeft;
  const ArrowNext = isAr ? FiArrowLeft : FiArrowRight;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waMessage = isAr
    ? `مرحباً، أود الاستفسار عن خدمة: ${item.title}`
    : `Hello, I'd like to enquire about your service: ${item.title}`;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-300 transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-gold-300 transition-colors">
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <span>/</span>
            <span className="text-gold-300">{item.title}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-white max-w-3xl mb-4 leading-tight"
          >
            {item.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/75 max-w-2xl"
          >
            {item.description}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">
                  {isAr ? 'نظرة عامة على الخدمة' : 'Service Overview'}
                </h2>
                <p className="text-navy-600 dark:text-navy-300 leading-relaxed">
                  {isAr
                    ? `تتولى شركة براند آند مور لتخليص المعاملات (ترخيص CN-3734050) تقديم خدمة ${item.title} باحترافية كاملة من خلال قنوات حكومية معتمدة في أبوظبي ودبي. يضمن فريقنا من المتخصصين ثنائيي اللغة إنهاء معاملتك بسرعة وشفافية وامتثال تام للأنظمة.`
                    : `B&M Brand & More (License CN-3734050) delivers ${item.title} services with full professionalism through official government channels in Abu Dhabi and Dubai. Our bilingual specialist team ensures your transaction is completed with speed, transparency, and full regulatory compliance.`
                  }
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">
                  {isAr ? 'ما الذي نقدمه' : 'What We Cover'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    isAr ? 'تعامل مباشر مع الجهات الحكومية' : 'Direct government department liaison',
                    isAr ? 'تدقيق وإعداد المستندات' : 'Full document verification & preparation',
                    isAr ? 'متابعة فورية ومستمرة' : 'Real-time transaction tracking',
                    isAr ? 'توصيل المستندات (باقة VIP)' : 'Document courier (VIP tier)',
                    isAr ? 'فريق ثنائي اللغة عربي/إنجليزي' : 'Bilingual Arabic/English team',
                    isAr ? 'شفافية كاملة في الرسوم' : 'Full fee transparency',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-navy-50 dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-700">
                      <FiCheckCircle className="text-gold-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-navy-700 dark:text-navy-200 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">
                  {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-navy-100 dark:border-navy-700 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left rtl:text-right bg-white dark:bg-navy-900 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                        aria-expanded={openFaq === i}
                      >
                        <span className="font-semibold text-navy-900 dark:text-white text-sm pr-4">{faq.q}</span>
                        <FiChevronDown
                          className={`flex-shrink-0 text-navy-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                          size={20}
                        />
                      </button>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-2 text-sm text-navy-600 dark:text-navy-300 leading-relaxed bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-700">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Widget */}
              <div className="bg-navy-900 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2 text-white">
                  {isAr ? 'ابدأ معاملتك اليوم' : 'Start Your Transaction Today'}
                </h3>
                <p className="text-navy-300 text-sm mb-5">
                  {isAr ? 'تحدث مع خبرائنا الآن للحصول على تقدير فوري.' : 'Talk to our specialists now for an instant estimate.'}
                </p>
                <div className="space-y-3">
                  <a href="tel:+97124911227" className="flex items-center justify-center gap-2 w-full btn-gold py-3">
                    <FiPhone size={16} />
                    {isAr ? 'اتصل الآن' : 'Call Now'}
                  </a>
                  <a
                    href={`https://wa.me/971566955355?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    <FaWhatsapp size={18} />
                    {isAr ? 'واتساب' : 'WhatsApp'}
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    {isAr ? 'اطلب تسعيرة' : 'Get a Quote'}
                  </Link>
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-700 rounded-2xl p-6">
                <h3 className="font-bold text-navy-900 dark:text-white text-sm uppercase tracking-wide mb-4">
                  {isAr ? 'خدماتنا الأخرى' : 'Other Services'}
                </h3>
                <nav className="space-y-2" aria-label="Other services navigation">
                  {allItems.filter((s) => s.slug !== slug).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex items-center justify-between px-4 py-3 text-sm rounded-xl bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-navy-200 hover:bg-navy-800 hover:text-white dark:hover:bg-gold-500/10 dark:hover:text-gold-300 transition-all duration-200"
                    >
                      {s.title}
                      <ArrowNext size={14} />
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="py-8 bg-navy-50 dark:bg-navy-900 border-t border-navy-100 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 dark:text-navy-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
            <ArrowBack size={16} />
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </>
  );
}
