'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '@/components/ui/Logo';

const services = [
  { slug: 'uae-visa-extraction', key: 0 },
  { slug: 'saudi-visa-extraction', key: 1 },
  { slug: 'car-insurance', key: 2 },
  { slug: 'daman-health-insurance', key: 3 },
  { slug: 'traffic-violations-clearance', key: 4 },
  { slug: 'amer-dubai-services', key: 5 },
  { slug: 'vip-services', key: 6 },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white" role="contentinfo">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo white />
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-5">{t('footer.tagline')}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
              {t('footer.license')}
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: FiFacebook, href: '#', label: 'Facebook' },
                { Icon: FiInstagram, href: '#', label: 'Instagram' },
                { Icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                { Icon: FiTwitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-navy-800 hover:bg-gold-500 flex items-center justify-center text-navy-300 hover:text-navy-900 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold mb-5 pb-2 border-b border-navy-700 text-sm uppercase tracking-wider">
              {t('footer.links.services')}
            </h3>
            <ul className="space-y-3">
              {services.map(({ slug, key }) => {
                return (
                  <li key={slug}>
                    <Link
                      href={`/services/${slug}`}
                      className="text-navy-300 hover:text-gold-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {t(`services.items[${key}].title`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-5 pb-2 border-b border-navy-700 text-sm uppercase tracking-wider">
              {t('footer.links.company')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/about`, label: language === 'ar' ? 'من نحن' : 'About Us' },
                { href: `/blog`, label: language === 'ar' ? 'المدونة' : 'Insights' },
                { href: `/contact`, label: language === 'ar' ? 'اتصل بنا' : 'Contact' },
                { href: `/services/vip-services`, label: language === 'ar' ? 'خدمات VIP' : 'VIP Services' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-navy-300 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-5 pb-2 border-b border-navy-700 text-sm uppercase tracking-wider">
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-navy-300">
                <FiMapPin className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
                <span>{t('contact.info.address')}</span>
              </li>
              <li>
                <a
                  href="tel:+97124911227"
                  className="flex gap-3 text-sm text-navy-300 hover:text-gold-400 transition-colors"
                >
                  <FiPhone className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>{t('contact.info.phone1')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/971566955355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-sm text-navy-300 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>{t('contact.info.phone2')}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@brandandmore.ae"
                  className="flex gap-3 text-sm text-navy-300 hover:text-gold-400 transition-colors"
                >
                  <FiMail className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>{t('contact.info.email')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-400 text-xs">
            &copy; {year} B&M – Brand &amp; More. {t('footer.rights')}
          </p>
          <p className="text-navy-500 text-xs">
            {t('footer.license')} | Abu Dhabi, UAE
          </p>
        </div>
      </div>
    </footer>
  );
}
