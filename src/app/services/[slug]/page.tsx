'use client';

import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import ServicePageClient from '@/components/services/ServicePageClient';

const SERVICES: Record<string, {
  iconKey: string;
  faqs_en: Array<{ q: string; a: string }>;
  faqs_ar: Array<{ q: string; a: string }>;
}> = {
  'uae-visa-extraction': {
    iconKey: 'passport',
    faqs_en: [
      { q: 'How long does UAE residency visa extraction take?', a: 'Standard processing takes 5–7 working days. With our VIP tier, we can reduce turnaround to 48–72 hours via expedited medical clearances and biometrics.' },
      { q: 'Can I apply for a Golden Visa through B&M?', a: 'Yes, we audit eligibility (property ownership, salary thresholds, or credentials) and handle the full submission through ICP and GDRFA channels in Abu Dhabi and Dubai.' },
      { q: 'What documents are typically required?', a: 'Requirements vary by visa type, but generally include a valid passport, Emirates ID, sponsor documents, medical fitness certificate, and attestation letters where applicable.' },
    ],
    faqs_ar: [
      { q: 'كم تستغرق معاملة استخراج الإقامة في الإمارات؟', a: 'تستغرق الإجراءات العادية 5 إلى 7 أيام عمل. مع باقة كبار الشخصيات VIP، نختصر الوقت إلى 48 – 72 ساعة عبر الفحص الطبي والبصمة المسرّعة.' },
      { q: 'هل يمكنني التقديم على الإقامة الذهبية عبر مكتبكم؟', a: 'نعم، نقوم بمراجعة مستنداتك وإثبات استيفاء شروط الترشيح (ملكية عقارية، راتب تنفيذي، أو فئة الكفاءات) ثم نتولى المعاملة الكاملة عبر نظامي ICP وGDRFA.' },
      { q: 'ما هي المستندات المطلوبة بشكل عام؟', a: 'تتفاوت المتطلبات حسب نوع التأشيرة، وتشمل عادةً جواز سفر ساري، بطاقة الهوية الإماراتية، وثائق الكفيل، شهادة اللياقة الطبية، وخطابات التصديق عند الحاجة.' },
    ],
  },
  'saudi-visa-extraction': {
    iconKey: 'plane',
    faqs_en: [
      { q: 'What documents are needed for a Saudi business visit visa?', a: 'You need an official invitation from a Saudi-registered company, trade licenses, attested qualifications, and passport photos. B&M verifies and compiles all documents on your behalf.' },
      { q: 'How long does Saudi visa processing take?', a: 'Saudi business visit visas processed through certified UAE centers typically take 3–5 working days. Urgent VIP processing can reduce this to 24–48 hours.' },
    ],
    faqs_ar: [
      { q: 'ما المستندات المطلوبة لتأشيرة زيارة الأعمال إلى السعودية؟', a: 'تحتاج إلى خطاب دعوة رسمي من شركة سعودية مسجلة، رخصة تجارية، مؤهلات مصدقة، وصور شخصية. نتولى التحقق من الوثائق وتجميعها نيابةً عنك.' },
      { q: 'كم تستغرق معالجة تأشيرة السعودية؟', a: 'تأشيرات الزيارة التجارية عبر مراكز مصرح بها تستغرق 3 إلى 5 أيام عمل. التسريع عبر خدمة VIP يمكن أن يختصر الوقت إلى 24 – 48 ساعة.' },
    ],
  },
  'car-insurance': {
    iconKey: 'car',
    faqs_en: [
      { q: 'Is motor insurance mandatory for vehicle registration renewal in UAE?', a: 'Yes. Both Abu Dhabi and Dubai require valid motor insurance before renewing vehicle registration. B&M obtains and registers your policy directly with the traffic portal.' },
      { q: 'What types of car insurance do you handle?', a: 'We process third-party liability (mandatory minimum), comprehensive collision and theft cover, and commercial fleet policies for businesses.' },
    ],
    faqs_ar: [
      { q: 'هل تأمين المركبة إلزامي لتجديد الترخيص في الإمارات؟', a: 'نعم، يُعدّ التأمين شرطاً إلزامياً لتجديد رخصة المركبة في أبوظبي ودبي. نقوم باستخراج وثيقة التأمين وتسجيلها مباشرة في البوابة المرورية.' },
      { q: 'ما أنواع التأمين التي تتولونها؟', a: 'ننجز التأمين ضد الغير (الحد الأدنى الإلزامي)، التأمين الشامل ضد الحوادث والسرقة، وبوالص الأسطول التجاري للشركات.' },
    ],
  },
  'daman-health-insurance': {
    iconKey: 'heart',
    faqs_en: [
      { q: 'Is health insurance required for UAE residency?', a: 'Yes. The Abu Dhabi DOH mandates valid health insurance for all residents. B&M handles Daman policy issuance, renewals, and uploads the insurance data to the immigration system.' },
      { q: 'What is the Abu Dhabi Basic Plan?', a: "It's an affordable Daman health plan for sponsors, domestic workers, and lower-income categories. B&M registers employees and dependents on this plan with same-day processing." },
    ],
    faqs_ar: [
      { q: 'هل التأمين الصحي مطلوب للإقامة في الإمارات؟', a: 'نعم، تلزم هيئة الصحة في أبوظبي بامتلاك تأمين صحي ساريٍّ لجميع المقيمين. نتولى إصدار بوليصة ضمان وتجديدها ورفع البيانات إلى نظام الهجرة.' },
      { q: 'ما هو برنامج ضمان الأساسي لأبوظبي؟', a: 'هو خطة تأمين صحي اقتصادية مصممة للكفلاء والعمالة المساعدة وأصحاب الدخل المحدود. ننجز تسجيل الموظفين والمعالين على هذه الخطة في نفس اليوم.' },
    ],
  },
  'traffic-violations-clearance': {
    iconKey: 'scale',
    faqs_en: [
      { q: 'Can B&M help reduce or settle traffic fines in Abu Dhabi?', a: 'Yes. We file official fine discount applications, manage black-point transfers, and coordinate vehicle impoundment releases through Abu Dhabi Police and the Judicial Department.' },
      { q: 'What is a travel ban clearance?', a: 'A travel ban may be issued due to outstanding fines, court judgments, or financial disputes. B&M files the required paperwork to lift these blocks from the Judicial Department, ICP, and relevant authorities.' },
    ],
    faqs_ar: [
      { q: 'هل يمكنكم المساعدة في تخفيض وتسوية المخالفات المرورية في أبوظبي؟', a: 'نعم، نتقدم بطلبات التخفيض الرسمية، وننسق نقل النقاط السوداء، ونعمل على فك حجز المركبات عبر شرطة أبوظبي ودائرة القضاء.' },
      { q: 'ما هي إجراءات رفع حظر السفر؟', a: 'قد يُفرض حظر السفر بسبب غرامات متراكمة أو قرارات قضائية أو نزاعات مالية. يتولى مكتبنا رفع الطلبات اللازمة لإزالة هذه القيود لدى دائرة القضاء والهيئة الاتحادية للهوية وجهات ذات صلة.' },
    ],
  },
  'amer-dubai-services': {
    iconKey: 'stamp',
    faqs_en: [
      { q: 'What government services does Amer Dubai cover?', a: "Amer Dubai centers provide immigration services for Dubai residents and companies — entry permits, residency stamping, status changes, visa cancellations, and establishment card management." },
      { q: 'How does B&M handle Amer Dubai transactions?', a: 'We submit all files directly into GDRFA Dubai systems to eliminate data entry errors and ensure your residency or sponsorship file clears without delays.' },
    ],
    faqs_ar: [
      { q: 'ما الخدمات التي يغطيها مركز عامر دبي؟', a: 'تقدم مراكز عامر دبي خدمات هجرة للمقيمين والشركات في دبي — أذونات الدخول، تثبيت الإقامات، تغيير الوضع، إلغاء التأشيرات، وإدارة بطاقات المنشآت.' },
      { q: 'كيف تنجز براند آند مور معاملات عامر دبي؟', a: 'نقدم جميع الملفات مباشرةً عبر أنظمة GDRFA دبي للتخلص من أخطاء الإدخال وضمان إنجاز ملف إقامتك أو كفالتك دون تأخير.' },
    ],
  },
  'vip-services': {
    iconKey: 'crown',
    faqs_en: [
      { q: 'Who is the VIP service tier designed for?', a: 'VIP services are designed for corporate executives, high-net-worth individuals, and businesses that require guaranteed turnaround times and white-glove administrative handling.' },
      { q: 'What does the VIP service include?', a: 'A dedicated liaison agent, door-to-door document courier, expedited medical and biometrics appointments, 24/7 emergency support line, and real-time WhatsApp status updates throughout the process.' },
    ],
    faqs_ar: [
      { q: 'لمن صُمِّمت خدمات كبار الشخصيات VIP؟', a: 'صُمِّمت لكبار المسؤولين التنفيذيين، وأصحاب الثروات الكبيرة، والشركات التي تتطلب معاملاتها ضمانات توقيت قاطعة وأسلوب إداري رفيع المستوى.' },
      { q: 'ماذا تشمل خدمة VIP؟', a: 'مستشار علاقات مخصص، مندوب استلام وتسليم المستندات، مواعيد فحص طبي وبصمة مسرّعة، خط دعم طوارئ على مدار 24 ساعة، وتحديثات فورية عبر واتساب طوال فترة المعاملة.' },
    ],
  },
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = React.use(params);
  const service = SERVICES[slug];
  if (!service) notFound();

  const { t, language, messages } = useLanguage();
  const items = messages.services.items;
  const item = items.find((s: any) => s.slug === slug);
  if (!item) notFound();

  const isAr = language === 'ar';
  const faqs = isAr ? service.faqs_ar : service.faqs_en;

  useEffect(() => {
    document.title = `${item.title} | B&M Brand & More`;
  }, [item.title]);

  return (
    <>
      <ServiceSchema name={item.title} description={item.description} slug={slug} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: isAr ? 'الرئيسية' : 'Home', url: 'https://brandandmore.ae/' },
          { name: isAr ? 'الخدمات' : 'Services', url: 'https://brandandmore.ae/#services' },
          { name: item.title, url: `https://brandandmore.ae/services/${slug}` },
        ]}
      />
      <ServicePageClient
        item={item}
        faqs={faqs}
        slug={slug}
        allItems={items}
      />
    </>
  );
}
