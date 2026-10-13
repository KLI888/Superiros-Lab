import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Superiors Lab — Applied AI Research, Workflow Automation & Product Studio',
  description: 'An applied AI research, workflow automation, and product engineering studio building intelligent software for real businesses.',
  openGraph: {
    title: 'Superiors Lab — Applied AI Research, Automation & Product Studio',
    description: 'An applied AI research, workflow automation, and product engineering studio building intelligent software for real businesses.',
    type: 'website',
    siteName: 'Superiors Lab',
  },
  twitter: {
    card: 'summary',
    title: 'Superiors Lab — Applied AI Research & Product Studio',
    description: 'An applied AI research, workflow automation, and product engineering studio building intelligent software for real businesses.',
  },
  keywords: [
    'Superiors Lab',
    'Applied AI Research',
    'Workflow Automation',
    'AI Product Studio',
    'Business Process Automation',
    'Custom Software Engineering',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: 'Superiors Lab',
    alternateName: 'Superiors Technology',
    url: 'https://superiors.in',
    foundingDate: '2019-08-01',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'India',
    },
    description:
      'An applied AI research and engineering studio that designs, automates, and builds intelligent software for business operations and modern digital products.',
    knowsAbout: [
      'Artificial Intelligence',
      'Workflow Automation',
      'Language Processing',
      'Full-Stack Product Engineering',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen selection:bg-amber-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
