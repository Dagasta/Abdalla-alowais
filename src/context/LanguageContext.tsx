'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enMessages from '../../messages/en.json';
import arMessages from '../../messages/ar.json';

type Language = 'en' | 'ar';
type Messages = typeof enMessages;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to resolve nested object keys (e.g. "hero.title1")
function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null) return path;
    // Handle array check (for services.items.X.title etc)
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, key, index] = arrayMatch;
      current = current[key]?.[parseInt(index)];
    } else {
      current = current[part];
    }
  }
  return typeof current === 'string' ? current : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bm-language') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    } else {
      // Default to Arabic or English based on browser settings, but default to 'en'
      const browserLang = navigator.language.split('-')[0];
      setLanguageState(browserLang === 'ar' ? 'ar' : 'en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bm-language', lang);
  };

  const isRtl = language === 'ar';
  const messages = isRtl ? (arMessages as any) : (enMessages as any);

  // Update HTML dir and lang attributes on change
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const t = (key: string): string => {
    return getNestedValue(messages, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
