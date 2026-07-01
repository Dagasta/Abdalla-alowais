import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cairo } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import FooterWrapper from '@/components/layout/FooterWrapper';
import FloatingButtonsWrapper from '@/components/layout/FloatingButtonsWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brandandmore.ae'),
  title: {
    default: 'B&M Brand & More | Government Transaction Services UAE',
    template: '%s | B&M Brand & More',
  },
  description:
    'B&M Brand & More (License CN-3734050) delivers fast, compliant government transaction clearance across Abu Dhabi & Dubai — visas, insurance, traffic fines, Amer Dubai, and VIP services.',
  keywords: [
    'UAE visa extraction Abu Dhabi',
    'Amer Dubai transaction services',
    'traffic fine clearance Abu Dhabi',
    'Saudi visa extraction',
    'Daman health insurance',
    'car insurance Abu Dhabi',
    'government transactions UAE',
    'B&M Brand More',
    'تخليص معاملات أبوظبي',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'B&M – Brand & More',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BMBrandMore',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white dark:bg-navy-950 antialiased">
        <LanguageProvider>
          <NavbarWrapper />
          <main className="flex-1">{children}</main>
          <FooterWrapper />
          <FloatingButtonsWrapper />
        </LanguageProvider>
      </body>
    </html>
  );
}
