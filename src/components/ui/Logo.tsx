'use client';

import { clsx } from 'clsx';

interface LogoProps {
  scrolled?: boolean;
  white?: boolean;
}

export default function Logo({ scrolled = false, white = false }: LogoProps) {
  const isPrimaryWhite = white || !scrolled;
  const primaryColor = isPrimaryWhite ? '#FFFFFF' : 'currentColor';
  const textColorClass = isPrimaryWhite ? 'text-white' : 'text-navy-900 dark:text-white';
  const accentColor = '#C5A880'; // B&M Gold
  const taglineColor = isPrimaryWhite ? 'text-white/60' : 'text-navy-500 dark:text-navy-300';
  const licenseColor = isPrimaryWhite ? 'text-white/40' : 'text-navy-400 dark:text-navy-400';

  return (
    <div className={clsx("flex items-center gap-3 select-none transition-colors duration-300", textColorClass)}>
      {/* Icon Mark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0"
        aria-hidden="true"
      >
        <g transform="translate(-40, -30)">
          {/* Elegant outer gold crescent / circle */}
          <path
            d="M 90,30 A 50,50 0 1,0 90,130"
            fill="none"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 90,130 A 50,50 0 0,0 120,45"
            fill="none"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="160 20"
          />

          {/* Stylized Arabic-English Monogram (Merging B, M, and curves) */}
          {/* The Navy Blue / White Loop (forming 'B' and Arabic 'ب' swoop) */}
          <path
            d="M 60,110 L 60,50 C 60,50 85,45 85,65 C 85,80 65,75 85,90 C 100,100 80,115 65,115"
            fill="none"
            stroke={primaryColor}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Dot for Arabic 'B' (ب) */}
          <circle cx="75" cy="122" r="4.5" fill={primaryColor} />

          {/* The Gold Loop (forming 'M', Arabic 'م', and falcon wing) */}
          <path
            d="M 85,95 C 95,95 102,80 102,68 C 102,50 82,50 82,65 C 82,75 95,90 115,105 C 122,110 130,100 135,90"
            fill="none"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Accent dot */}
          <circle cx="102" cy="60" r="3.5" fill={accentColor} />
        </g>
      </svg>

      {/* Divider */}
      <div className="w-px h-8 bg-gold-500/40 self-center flex-shrink-0" />

      {/* Text Stack */}
      <div className="flex flex-col justify-center leading-none text-start">
        {/* Top: English Brand Name */}
        <span className="font-serif text-sm md:text-base font-extrabold tracking-wide flex items-center gap-1 leading-tight">
          B<span className="text-gold-500 font-sans">&amp;</span>M <span className="font-sans font-bold text-xs md:text-sm tracking-widest">BRAND &amp; MORE</span>
        </span>
        {/* Middle: Arabic Brand Name */}
        <span className="font-cairo text-xs md:text-sm font-bold text-gold-500/90 leading-normal mt-0.5">
          براند آند مور لتخليص المعاملات
        </span>
        {/* Bottom: Subtitle & License */}
        <div className="flex items-center gap-1.5 mt-0.5 text-[8px] md:text-[9px] uppercase tracking-wider font-sans font-semibold opacity-60">
          <span className={taglineColor}>Transaction Following</span>
          <span className="text-gold-500">•</span>
          <span className={licenseColor}>LIC. CN-3734050</span>
        </div>
      </div>
    </div>
  );
}
