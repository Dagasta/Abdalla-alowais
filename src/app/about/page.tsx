'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiCheckCircle, FiAward, FiFileText } from 'react-icons/fi';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function AboutPage() {
  const { t, language, isRtl } = useLanguage();

  useEffect(() => {
    document.title = isRtl ? 'من نحن | براند آند مور' : 'About Us | B&M Brand & More';
  }, [isRtl]);

  const milestones = isRtl ? [
    { year: '2015', event: 'تأسيس الشركة في أبوظبي بموجب الترخيص CN-3734050' },
    { year: '2018', event: 'التوسع لتشمل خدمات دبي وإطلاق نافذة عامر دبي' },
    { year: '2020', event: 'إطلاق خدمات تأشيرات المملكة العربية السعودية للمقيمين في الإمارات' },
    { year: '2022', event: 'إطلاق باقة كبار الشخصيات VIP مع مستشار مخصص وتوصيل المستندات' },
    { year: '2024', event: 'تخطي حاجز 5000 معاملة حكومية ناجحة' },
  ] : [
    { year: '2015', event: 'Founded in Abu Dhabi under License CN-3734050' },
    { year: '2018', event: 'Expanded to Dubai with Amer Dubai services desk' },
    { year: '2020', event: 'Launched Saudi Arabia visa services for UAE residents' },
    { year: '2022', event: 'Launched VIP concierge tier with dedicated agents' },
    { year: '2024', event: 'Surpassed 5,000 successfully cleared government transactions' },
  ];

  const values = isRtl ? [
    { title: 'الامتثال القانوني', desc: 'جميع معاملاتنا تسير وفق القوانين واللوائح الإماراتية.' },
    { title: 'الشفافية الكاملة', desc: 'رسوم واضحة، إيصالات رسمية، وبيانات بنكية موثقة لكل معاملة.' },
    { title: 'السرعة والكفاءة', desc: 'إنجاز معظم المعاملات خلال 24 إلى 72 ساعة عمل.' },
  ] : [
    { title: 'Legal Compliance', desc: 'Every transaction follows UAE law and government regulations without exception.' },
    { title: 'Full Transparency', desc: 'Clear fees, official receipts, and verified banking credentials on every file.' },
    { title: 'Speed & Efficiency', desc: 'Most transactions cleared in 24–72 working hours from submission.' },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isRtl ? 'الرئيسية' : 'Home', url: 'https://brandandmore.ae/' },
          { name: isRtl ? 'من نحن' : 'About Us', url: 'https://brandandmore.ae/about' },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              {t('about.heading')}
            </h1>
            <p className="text-xl text-white/75 leading-relaxed">{t('about.subheading')}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-6">
                {isRtl ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-navy-600 dark:text-navy-300 leading-relaxed mb-5">{t('about.body1')}</p>
              <p className="text-navy-600 dark:text-navy-300 leading-relaxed mb-8">{t('about.body2')}</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 bg-navy-50 dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-700">
                  <FiAward className="text-gold-500" size={20} />
                  <span className="text-sm font-semibold text-navy-800 dark:text-white">{t('about.license')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-navy-50 dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-700">
                  <FiFileText className="text-gold-500" size={20} />
                  <span className="text-sm text-navy-700 dark:text-navy-200">{t('about.issued')}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-8">
                {isRtl ? 'مراحل نمونا' : 'Our Journey'}
              </h3>
              <div className="relative space-y-6">
                <div className="absolute start-4 top-0 bottom-0 w-px bg-gold-200 dark:bg-navy-700" aria-hidden="true" />
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-xs font-bold z-10">
                      {i + 1}
                    </div>
                    <div className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-700 rounded-xl p-4 flex-1">
                      <span className="text-gold-600 dark:text-gold-400 font-bold text-sm">{m.year}</span>
                      <p className="text-navy-700 dark:text-navy-200 text-sm mt-1">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy-50 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            {isRtl ? 'قيمنا الجوهرية' : 'Our Core Values'}
          </h2>
          <div className="gold-divider mb-12" />
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-white dark:bg-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700 shadow-card">
                <FiCheckCircle className="text-gold-500 mx-auto mb-3" size={28} />
                <h3 className="font-bold text-navy-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-navy-500 dark:text-navy-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
