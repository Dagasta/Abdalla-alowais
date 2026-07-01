'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function BlogPage() {
  const { t, isRtl, messages } = useLanguage();
  const posts = messages.blog.posts;
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;

  useEffect(() => {
    document.title = isRtl ? 'المدونة والمستجدات | براند آند مور' : 'Insights & News | B&M Brand & More';
  }, [isRtl]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isRtl ? 'الرئيسية' : 'Home', url: 'https://brandandmore.ae/' },
          { name: isRtl ? 'المدونة' : 'Blog', url: 'https://brandandmore.ae/blog' },
        ]}
      />

      <section className="pt-32 pb-16 bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{t('blog.heading')}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{t('blog.subheading')}</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-700 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-52 bg-gradient-to-br from-navy-700 to-navy-900 relative flex items-center justify-center">
                  <span className="text-6xl font-serif text-white/10 font-bold">{post.category.charAt(0)}</span>
                  <div className="absolute bottom-4 start-4">
                    <span className="px-3 py-1 bg-gold-500/80 text-navy-900 text-xs font-bold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 text-xs text-navy-400 mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={12} /> {post.date}</span>
                  </div>
                  <h2 className="font-bold text-navy-900 dark:text-white text-lg mb-3 leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-navy-500 dark:text-navy-300 leading-relaxed mb-5">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-gold-400 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors"
                  >
                    {t('blog.readMore')} <ArrowIcon size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
