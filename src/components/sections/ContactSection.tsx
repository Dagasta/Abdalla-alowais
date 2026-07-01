'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(7, 'Phone number required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS_EN = [
  'UAE Visa Extraction',
  'Saudi Arabia Visa Services',
  'Car Insurance Clearance',
  'Daman Health Insurance',
  'Traffic & Court Clearance',
  'Amer Dubai Services',
  'VIP Priority Services',
];

const SERVICE_OPTIONS_AR = [
  'استخراج تأشيرات الإمارات',
  'خدمات تأشيرات السعودية',
  'تخليص تأمين السيارات',
  'تأمين ضمان الصحي',
  'تخليص المخالفات والقضايا',
  'خدمات عامر دبي',
  'خدمات كبار الشخصيات VIP',
];

export default function ContactSection() {
  const { t, language, messages } = useLanguage();
  const isAr = language === 'ar';
  const serviceOptions = isAr ? SERVICE_OPTIONS_AR : SERVICE_OPTIONS_EN;

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale: language }),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const adcb = messages.contact.bank.adcb;
  const fab = messages.contact.bank.fab;

  return (
    <section id="contact" className="py-24 bg-navy-50 dark:bg-navy-900" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="contact-heading" className="section-heading mb-4">{t('contact.heading')}</h2>
          <div className="gold-divider mb-5" />
          <p className="section-subheading">{t('contact.subheading')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Panel */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Card */}
            <div className="bg-navy-900 dark:bg-navy-800 text-white rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">{isAr ? 'مكاتب براند آند مور' : 'B&M Offices'}</h3>

              {[
                { Icon: FiMapPin, text: t('contact.info.address'), href: '#' },
                { Icon: FiPhone, text: t('contact.info.phone1'), href: `tel:+97124911227` },
                { Icon: FiPhone, text: t('contact.info.phone2'), href: `tel:+971566955355` },
                { Icon: FiMail, text: t('contact.info.email'), href: `mailto:${t('contact.info.email')}` },
                { Icon: FiClock, text: t('contact.info.hours'), href: undefined },
              ].map(({ Icon, text, href }, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold-400" size={18} />
                  </div>
                  <div className="text-sm leading-relaxed text-navy-200">
                    {href ? (
                      <a href={href} className="hover:text-gold-300 transition-colors">{text}</a>
                    ) : (
                      <span className="text-navy-300">{text}</span>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/971566955355"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-colors"
              >
                <FaWhatsapp size={22} />
                {isAr ? 'راسلنا على واتساب' : 'Chat on WhatsApp'}
              </a>
            </div>

            {/* Bank Details */}
            <div className="bg-white dark:bg-navy-800 rounded-3xl p-6 border border-navy-100 dark:border-navy-700 shadow-card">
              <h3 className="font-bold text-navy-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                🏦 {t('contact.bank.heading')}
              </h3>
              <p className="text-sm text-navy-500 dark:text-navy-300 mb-5">{t('contact.bank.subheading')}</p>

              {[
                { label: 'ADCB', data: adcb },
                { label: 'FAB', data: fab },
              ].map(({ label, data }) => (
                <div key={label} className="mb-4 p-4 bg-navy-50 dark:bg-navy-900 rounded-xl text-sm space-y-1">
                  <p className="font-semibold text-navy-900 dark:text-white">{data.bank}</p>
                  <p className="text-navy-500 dark:text-navy-300">
                    {isAr ? 'رقم الحساب' : 'Account'}: <span className="font-mono">{data.account}</span>
                  </p>
                  <p className="text-navy-500 dark:text-navy-300">
                    IBAN: <span className="font-mono">{data.iban}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-navy-800 rounded-3xl p-8 shadow-card border border-navy-100 dark:border-navy-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-6">
                {isAr ? 'طلب تسعيرة لتخليص معاملة' : 'Request a Transaction Quote'}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="formName" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      id="formName"
                      {...register('name')}
                      className="input-field"
                      placeholder={isAr ? 'أحمد محمد' : 'John Smith'}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="formEmail" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="formEmail"
                      type="email"
                      {...register('email')}
                      className="input-field"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="formPhone" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
                      {t('contact.form.phone')} *
                    </label>
                    <input
                      id="formPhone"
                      type="tel"
                      {...register('phone')}
                      className="input-field"
                      placeholder="+971 50 000 0000"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="formService" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
                      {t('contact.form.service')}
                    </label>
                    <select id="formService" {...register('service')} className="input-field">
                      <option value="">{isAr ? 'اختر الخدمة' : 'Select a service'}</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="formMessage" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="formMessage"
                    rows={4}
                    {...register('message')}
                    className="input-field resize-none"
                    placeholder={isAr ? 'يرجى وصف معاملتك...' : 'Please describe your transaction...'}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-red-500 text-xs flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 text-sm"
                  >
                    <FiCheckCircle size={18} />
                    {t('contact.form.success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm"
                  >
                    <FiAlertCircle size={18} />
                    {t('contact.form.error')}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      {t('contact.form.sending')}
                    </span>
                  ) : (
                    <><FiSend size={18} /> {t('contact.form.submit')}</>
                  )}
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div className="mt-6 rounded-3xl overflow-hidden shadow-card border border-navy-100 dark:border-navy-700 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.5794503732007!2d54.37943567605963!3d24.465363478187857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e66299b8288fb%3A0xc07a4a9c687e35b7!2sMuroor%20Rd%20-%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1719739500000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isAr ? 'موقع مكتب براند آند مور' : 'B&M Office Location'}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
