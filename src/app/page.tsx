'use client';

import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import VipBanner from '@/components/sections/VipBanner';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import BlogPreview from '@/components/sections/BlogPreview';
import { LocalBusinessSchema } from '@/components/seo/JsonLd';

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <VipBanner />
      <TestimonialsSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
