'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { FiCalendar, FiArrowLeft, FiArrowRight, FiClock, FiUser, FiTag } from 'react-icons/fi';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

interface PostContent {
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  date_en: string;
  date_ar: string;
  readTime_en: string;
  readTime_ar: string;
  content_en: React.ReactNode;
  content_ar: React.ReactNode;
}

const POSTS: Record<string, PostContent> = {
  'uae-golden-visa-2026': {
    title_en: 'New UAE Golden Visa Eligibility Guidelines 2026',
    title_ar: 'المنهجية الجديدة لتأشيرة الإقامة الذهبية في الإمارات 2026',
    category_en: 'Immigration',
    category_ar: 'الهجرة والإقامة',
    date_en: 'June 2026',
    date_ar: 'يونيو 2026',
    readTime_en: '5 min read',
    readTime_ar: 'قراءة في 5 دقائق',
    content_en: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          The UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) has revised eligibility criteria for the 10-year residency Golden Visa. This guide breaks down the updated pathways for professionals, investors, and outstanding talents.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. Executive & Skilled Professionals Pathway</h3>
        <p className="text-navy-600 dark:text-navy-300">
          First-tier skilled professionals now face simplified documentation but stricter payroll verification. To qualify, you must:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>Hold a valid employment contract in the UAE.</li>
          <li>Be classified in the first or second occupational level according to Ministry of Human Resources and Emiratisation (MOHRE).</li>
          <li>Hold a Bachelor’s degree or equivalent.</li>
          <li>Have a monthly salary of not less than AED 30,000 (basic salary plus allowances, verified by wage protection system).</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. Real Estate Investors</h3>
        <p className="text-navy-600 dark:text-navy-300">
          Property investment remains one of the most popular avenues. Real estate owners can secure 10-year residency if they:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>Own a property or group of properties valued at no less than AED 2,000,000.</li>
          <li>For mortgaged properties, a minimum of AED 2,000,000 equity must be paid up, or bank-issued NOC files must be compiled.</li>
        </ul>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">💡 Professional Submission Tip:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            Applying through ICP or GDRFA without a prior qualification audit can lead to rejection. B&M handles the pre-approval check, degree attestation filing, and medical fit certificates to ensure your Golden Visa is cleared smoothly.
          </p>
        </div>
      </div>
    ),
    content_ar: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          أصدرت الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ ضوابط محدثة للحصول على الإقامة الذهبية لمدة 10 سنوات. نوضح في هذا الدليل التعديلات الأخيرة للخبراء والمستثمرين وأصحاب الكفاءات المتميزة.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. فئة المهنيين وأصحاب التخصصات</h3>
        <p className="text-navy-600 dark:text-navy-300">
          تم تحديث مسار الموظفين ذوي المهارات العالية من خلال متطلبات تحقق دقيقة للرواتب:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>عقد عمل ساري المفعول في دولة الإمارات.</li>
          <li>أن يكون الموظف مصنفاً في المستوى المهني الأول أو الثاني وفقاً لوزارة الموارد البشرية والتوطين.</li>
          <li>شهادة بكالوريوس أو ما يعادلها مصدقة بالكامل.</li>
          <li>راتب شهري لا يقل عن 30,000 درهم إماراتي (أساسي بالإضافة للبدلات، مثبت عبر نظام حماية الأجور).</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. المستثمر العقاري</h3>
        <p className="text-navy-600 dark:text-navy-300">
          لا يزال الاستثمار العقاري من أكثر المسارات طلباً. يمكن للملاك الحصول على الإقامة عند استيفاء:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>امتلاك عقار أو مجموعة عقارات بقيمة إجمالية لا تقل عن 2,000,000 درهم إماراتي.</li>
          <li>للعقارات المرهونة، يجب دفع ما لا يقل عن مليوني درهم من قيمة العقار أو تقديم خطاب عدم ممانعة رسمي من البنك الممول.</li>
        </ul>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">💡 نصيحة الخبراء لتخليص المعاملة:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            تقديم طلبات الإقامة الذهبية مباشرة عبر المنصات دون مراجعة مسبقة للمستندات والشهادات قد يعرض الطلب للرفض. يتولى فريق براند آند مور مراجعة استحقاقك وتصديق شهادتك وإنهاء الفحص الطبي لضمان الموافقة السريعة.
          </p>
        </div>
      </div>
    ),
  },
  'abu-dhabi-traffic-fine-reduction': {
    title_en: 'How to Apply for Abu Dhabi Traffic Fine Reductions',
    title_ar: 'كيفية التقديم على تخفيض وتقسيط المخالفات المرورية في أبوظبي',
    category_en: 'Traffic Law',
    category_ar: 'قانون المرور',
    date_en: 'May 2026',
    date_ar: 'مايو 2026',
    readTime_en: '4 min read',
    readTime_ar: 'قراءة في 4 دقائق',
    content_en: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          Accumulated traffic fines can delay vehicle registration renewal and lead to travel restrictions in the UAE. Under Abu Dhabi Traffic Police directives, multiple schemes exist to reduce and installment-settle these fines.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. Early Payment Discounts</h3>
        <p className="text-navy-600 dark:text-navy-300">
          The Abu Dhabi Police offers a tiered early payment program:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li><strong>35% Discount:</strong> Applied if the fine is paid within 60 days of committing the violation.</li>
          <li><strong>25% Discount:</strong> Applied if paid between 60 days and 1 year after the violation.</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. Interest-Free Installment Plans</h3>
        <p className="text-navy-600 dark:text-navy-300">
          Fines can be split over 12 months with 0% interest through partner banks (ADCB, FAB, Abu Dhabi Islamic Bank, and Emirates NBD). To qualify, the total fine amount must exceed a minimum threshold (typically AED 5,000 for installments).
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">3. Black Point Transfer and Impoundment Releases</h3>
        <p className="text-navy-600 dark:text-navy-300">
          Severe infractions carry black points and vehicle impoundment. Points must be transferred to the driving license before vehicle license renewal.
        </p>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">⚠️ Crucial Warning on Judicial Blocks:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            If fines escalate to a court case or a travel ban is placed on your passport, online payments are blocked. B&M drafts and submits direct petitions to the Abu Dhabi Judicial Department to clear court blocks and lift travel bans.
          </p>
        </div>
      </div>
    ),
    content_ar: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          تراكم المخالفات المرورية قد يعيق تجديد ترخيص المركبة ويفرض قيوداً على السفر داخل الدولة. نوضح في هذا الدليل التسهيلات الرسمية المتاحة لتسوية وتخفيض المخالفات في أبوظبي.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. خصم السداد المبكر</h3>
        <p className="text-navy-600 dark:text-navy-300">
          توفر شرطة أبوظبي خصومات تشجيعية عند السداد السريع:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li><strong>خصم 35%:</strong> عند دفع المخالفة خلال 60 يوماً من تاريخ ارتكابها.</li>
          <li><strong>خصم 25%:</strong> عند الدفع بعد مرور 60 يوماً وحتى عام كامل.</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. تقسيط المخالفات بدون فوائد</h3>
        <p className="text-navy-600 dark:text-navy-300">
          يمكن تقسيط الغرامات على 12 شهراً بدون فوائد عبر البنوك المعتمدة (أبوظبي التجاري، أبوظبي الأول، أبوظبي الإسلامي، والإمارات دبي الوطني). يجب ألا يقل مجموع المخالفات المراد تقسيطها عن 5,000 درهم إماراتي.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">3. نقل النقاط السوداء وفك حجز المركبات</h3>
        <p className="text-navy-600 dark:text-navy-300">
          المخالفات الجسيمة تترتب عليها نقاط سوداء وحجز للمركبة. يجب مراجعة قيود النقاط قبل الشروع في تجديد ملكية السيارة.
        </p>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">⚠️ تنبيه هام حول القيود القضائية:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            في حال تحول المخالفات إلى قضية مرورية أو فرض منع سفر على جواز سفرك، سيتعذر السداد إلكترونياً. يتدخل مكتب براند آند مور لتقديم التماسات لدائرة القضاء في أبوظبي لرفع الحظر وفك القيود القضائية عن ملفك.
          </p>
        </div>
      </div>
    ),
  },
  'saudi-visa-tips-uae-expats': {
    title_en: 'Saudi Arabia Visit Visa Filing Tips for UAE Expats',
    title_ar: 'إرشادات الحصول على تأشيرة زيارة السعودية للمقيمين في الإمارات',
    category_en: 'Trade',
    category_ar: 'التبادل التجاري',
    date_en: 'April 2026',
    date_ar: 'أبريل 2026',
    readTime_en: '3 min read',
    readTime_ar: 'قراءة في 3 دقائق',
    content_en: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          With the expanding trade channels between the UAE and Saudi Arabia, more UAE residents are traveling for business. Preparing the correct documentation prevents lengthy delays at embassy-approved centers.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. Saudi Business Visit Visa Requirements</h3>
        <p className="text-navy-600 dark:text-navy-300">
          The business visit visa is designed for representatives of UAE companies visiting partners or attending business meetings in KSA. To apply, you need:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>An official electronic Letter of Invitation (LOI) issued by the Saudi Ministry of Foreign Affairs (MOFA), sponsored by a Saudi-registered company.</li>
          <li>A NOC letter from your UAE employer, attested by the UAE Chamber of Commerce.</li>
          <li>A copy of your UAE residency visa (valid for at least 3 months).</li>
          <li>A valid passport (valid for at least 6 months).</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. The E-Visa for GCC Residents</h3>
        <p className="text-navy-600 dark:text-navy-300">
          Certain professional categories (managers, engineers, doctors) can apply for a tourist/business e-visa online. However, if your residency profession is outside the approved list, you must apply for a traditional sticker visa.
        </p>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">💡 Professional Submission Tip:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            Attestation errors on NOCs are the number one cause of visa rejections. B&M audits your company trade licenses, drafts correct NOC templates, arranges Chamber attestation, and processes submissions directly via the Tasheel/Saudi Visa centers in the UAE.
          </p>
        </div>
      </div>
    ),
    content_ar: (
      <div className="space-y-6">
        <p className="lead text-lg font-medium text-navy-800 dark:text-white leading-relaxed">
          مع تنامي العلاقات التجارية بين الإمارات والسعودية، يزداد سفر المقيمين لإنجاز معاملات تجارية. نلخص في هذا الدليل إرشادات تحضير المستندات لتفادي التأخير لدى الجهات المعتمدة.
        </p>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">1. متطلبات تأشيرة زيارة الأعمال السعودية</h3>
        <p className="text-navy-600 dark:text-navy-300">
          تستهدف هذه التأشيرة ممثلي الشركات الإماراتية لزيارة شركاء أو حضور اجتماعات عمل في المملكة. المستندات المطلوبة:
        </p>
        <ul className="list-disc list-inside space-y-2 text-navy-600 dark:text-navy-300 ps-4">
          <li>خطاب دعوة إلكتروني رسمي صادر عن وزارة الخارجية السعودية (MOFA) برعاية شركة سعودية مسجلة.</li>
          <li>خطاب عدم ممانعة (NOC) من جهة العمل في الإمارات، مصدقاً من الغرفة التجارية.</li>
          <li>نسخة من الإقامة الإماراتية سارية المفعول (3 أشهر كحد أدنى).</li>
          <li>جواز سفر ساري المفعول (6 أشهر كحد أدنى).</li>
        </ul>

        <h3 className="text-xl font-bold text-navy-900 dark:text-white">2. التأشيرة الإلكترونية لمقيمي الخليج</h3>
        <p className="text-navy-600 dark:text-navy-300">
          تستطيع فئات مهنية محددة (مدراء، مهندسون، أطباء) التقديم مباشرة عبر الإنترنت لتأشيرة إلكترونية سريعة. إذا كانت مهنتك خارج القوائم المعتمدة، فيتعين تقديم طلب تأشيرة ملصق تقليدي.
        </p>

        <div className="p-5 bg-gold-500/10 border border-gold-500/20 rounded-2xl">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-1">💡 نصيحة لتخليص التأشيرة سريعاً:</p>
          <p className="text-sm text-navy-700 dark:text-navy-200">
            أخطاء صياغة خطاب عدم الممانعة وعدم تصديقه من الغرفة التجارية تتسبب في رفض التأشيرة. يتولى مكتبنا مراجعة الرخص التجارية وصياغة الخطابات وإنهاء تصديقات الغرفة التجارية، ثم تقديم المعاملة لدى مراكز التأشيرات السعودية المعتمدة.
          </p>
        </div>
      </div>
    ),
  },
};

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = React.use(params);
  const post = POSTS[slug];
  if (!post) notFound();

  const { language, isRtl } = useLanguage();
  const title = language === 'ar' ? post.title_ar : post.title_en;
  const category = language === 'ar' ? post.category_ar : post.category_en;
  const date = language === 'ar' ? post.date_ar : post.date_en;
  const readTime = language === 'ar' ? post.readTime_ar : post.readTime_en;
  const content = language === 'ar' ? post.content_ar : post.content_en;

  const ArrowBack = isRtl ? FiArrowRight : FiArrowLeft;

  useEffect(() => {
    document.title = `${title} | B&M Brand & More`;
  }, [title]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isRtl ? 'الرئيسية' : 'Home', url: 'https://brandandmore.ae/' },
          { name: isRtl ? 'المدونة' : 'Blog', url: 'https://brandandmore.ae/blog' },
          { name: title, url: `https://brandandmore.ae/blog/${slug}` },
        ]}
      />

      <article className="pt-32 pb-24 bg-white dark:bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-gold-500 mb-8 transition-colors"
          >
            <ArrowBack size={16} />
            {isRtl ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-navy-100 dark:border-navy-800">
            <div className="flex flex-wrap gap-4 items-center text-xs text-navy-400 dark:text-navy-400 mb-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-full font-semibold">
                <FiTag size={12} /> {category}
              </span>
              <span className="flex items-center gap-1"><FiCalendar size={12} /> {date}</span>
              <span className="flex items-center gap-1"><FiClock size={12} /> {readTime}</span>
              <span className="flex items-center gap-1"><FiUser size={12} /> {isRtl ? 'بواسطة براند آند مور' : 'By B&M Specialists'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 dark:text-white leading-tight">
              {title}
            </h1>
          </header>

          {/* Body */}
          <div className="prose prose-navy dark:prose-invert max-w-none">
            {content}
          </div>

          {/* CTA widget */}
          <div className="mt-12 p-8 bg-navy-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-navy-800 shadow-xl">
            <div>
              <h3 className="font-bold text-xl text-white mb-2">
                {isRtl ? 'هل تحتاج إلى استشارة عاجلة؟' : 'Need urgent regulatory assistance?'}
              </h3>
              <p className="text-navy-300 text-sm">
                {isRtl ? 'اتصل بخبراء براند آند مور الآن لتوضيح الشروط والرسوم.' : 'Call B&M specialists now to clarify fees and requirements.'}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <a href="tel:+97124911227" className="btn-gold justify-center flex-1 md:flex-initial py-3 px-6 text-sm">
                {isRtl ? 'اتصل بنا' : 'Call Now'}
              </a>
              <Link href="/contact" className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white text-sm font-semibold rounded-xl text-center flex-1 md:flex-initial transition-colors">
                {isRtl ? 'طلب تسعيرة' : 'Get Quote'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
