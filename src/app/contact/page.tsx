'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
  const { isRtl } = useLanguage();

  useEffect(() => {
    document.title = isRtl ? 'اتصل بنا | براند آند مور' : 'Contact Us | B&M Brand & More';
  }, [isRtl]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isRtl ? 'الرئيسية' : 'Home', url: 'https://brandandmore.ae/' },
          { name: isRtl ? 'اتصل بنا' : 'Contact', url: 'https://brandandmore.ae/contact' },
        ]}
      />
      <div className="pt-24">
        <ContactSection />
      </div>
    </>
  );
}
