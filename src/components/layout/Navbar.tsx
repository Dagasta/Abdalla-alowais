'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiGlobe, FiSun, FiMoon } from 'react-icons/fi';
import { clsx } from 'clsx';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const altLocale = language === 'ar' ? 'en' : 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navLinks = [
    { href: '/#services', label: t('nav.services') },
    { href: '/#about-preview', label: t('nav.about') },
    { href: '/#contact', label: t('nav.contact') },
    { href: '/#blog', label: t('nav.blog') },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-card border-b border-navy-100/50 dark:border-navy-700/50 py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo scrolled={scrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition-colors duration-200 hover:text-gold-500 relative group',
                  scrolled ? 'text-navy-700 dark:text-white' : 'text-white'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                scrolled
                  ? 'text-navy-600 hover:bg-navy-100 dark:text-white dark:hover:bg-navy-700'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(altLocale)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all border',
                scrolled
                  ? 'text-navy-700 border-navy-200 hover:border-gold-400 dark:text-white dark:border-navy-600'
                  : 'text-white border-white/30 hover:border-white/60'
              )}
              aria-label="Switch language"
            >
              <FiGlobe size={15} />
              {altLocale === 'ar' ? 'عربي' : 'EN'}
            </button>

            {/* CTA Call */}
            <a
              href="tel:+97124911227"
              className="btn-gold text-sm px-5 py-2.5"
              aria-label="Call B&M office"
            >
              <FiPhone size={15} />
              {t('nav.callNow')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx(
              'lg:hidden p-2 rounded-lg',
              scrolled ? 'text-navy-800 dark:text-white' : 'text-white'
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-700 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-navy-800 dark:text-white font-medium py-2 hover:text-gold-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-navy-100 dark:border-navy-700">
                <a href="tel:+97124911227" className="btn-primary w-full justify-center">
                  <FiPhone size={16} /> {t('nav.callNow')}
                </a>
                <button
                  onClick={() => {
                    setLanguage(altLocale);
                    setIsOpen(false);
                  }}
                  className="btn-outline w-full justify-center"
                >
                  <FiGlobe size={16} />
                  {altLocale === 'ar' ? 'عربي' : 'English'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
