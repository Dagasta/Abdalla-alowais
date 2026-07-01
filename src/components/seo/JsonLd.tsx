export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'B&M – Brand & More Transaction Following',
    alternateName: 'براند آند مور لتخليص المعاملات',
    url: 'https://brandandmore.ae',
    logo: 'https://brandandmore.ae/logo.png',
    image: 'https://brandandmore.ae/og-image.jpg',
    telephone: '+97124911227',
    email: 'info@brandandmore.ae',
    priceRange: '$$',
    description:
      'B&M Brand & More (License CN-3734050) delivers UAE visa extraction, Saudi visa services, car insurance, Daman health insurance, traffic fine clearance, Amer Dubai services, and VIP transaction processing in Abu Dhabi and Dubai.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Muroor Road, Area 4',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4654,
      longitude: 54.3794,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Government & Business Transaction Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE Visa Extraction' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Saudi Arabia Visa Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Insurance Clearance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Daman Health Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Traffic & Court Clearance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Amer Dubai Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VIP Priority Services' } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name,
    description,
    url: `https://brandandmore.ae/services/${slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'B&M – Brand & More',
      telephone: '+97124911227',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
    },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
