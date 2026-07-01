'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi';

export default function BlogPreview() {
  const { t, isRtl, messages } = useLanguage();
  const posts = messages.blog.posts;
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;

  return (
    <section id="blog" className="py-24 bg-white dark:bg-navy-950" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 id="blog-heading" className="section-heading mb-3">{t('blog.heading')}</h2>
            <div className="gold-divider" style={{ marginLeft: 0, marginRight: 0 }} />
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 transition-colors flex-shrink-0"
          >
            {isRtl ? 'جميع المقالات' : 'View All Articles'}
            <ArrowIcon size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-700 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient image placeholder */}
              <div className="h-48 bg-gradient-to-br from-navy-700 to-navy-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-7xl font-serif font-bold text-white">{post.category.charAt(0)}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-gold-500/80 text-navy-900 text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-navy-400 dark:text-navy-400 mb-3">
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><FiTag size={12} /> {post.category}</span>
                </div>
                <h3 className="font-bold text-navy-900 dark:text-white text-lg leading-snug mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-navy-500 dark:text-navy-300 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-gold-400 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors"
                >
                  {t('blog.readMore')} <ArrowIcon size={14} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
