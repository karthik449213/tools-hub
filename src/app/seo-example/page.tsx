import { Metadata } from 'next';
import Head from 'next/head';

// SEO Metadata export - replaces getStaticProps in App Router
export const metadata: Metadata = {
  title: 'SEO Optimized Page | Tools Hub',
  description:
    'This is a fully SEO-optimized Next.js page with structured data, meta tags, and best practices for search engine visibility.',
  keywords: ['SEO', 'Next.js', 'optimization', 'structured data'],
  authors: [{ name: 'Tools Hub Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolshub.example.com',
    title: 'SEO Optimized Page | Tools Hub',
    description:
      'This is a fully SEO-optimized Next.js page with structured data, meta tags, and best practices for search engine visibility.',
    images: [
      {
        url: 'https://toolshub.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tools Hub Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Optimized Page | Tools Hub',
    description:
      'This is a fully SEO-optimized Next.js page with structured data, meta tags, and best practices for search engine visibility.',
    creator: '@toolshub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function SEOOptimizedPage() {
  // JSON-LD Structured Data for WebSite schema with search action
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tools Hub',
    description:
      'A comprehensive collection of online tools for file conversion, compression, and manipulation.',
    url: 'https://toolshub.example.com',
    sameAs: [
      'https://twitter.com/toolshub',
      'https://github.com/toolshub',
      'https://linkedin.com/company/toolshub',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolshub.example.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Head>
        {/* Canonical tag for duplicate prevention */}
        <link
          rel="canonical"
          href="https://toolshub.example.com"
        />

        {/* Favicon and theme color */}
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <meta
          name="theme-color"
          content="#000000"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        {/* Additional mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        />
      </Head>

      <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              SEO Optimized Next.js Page
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              This page demonstrates best practices for SEO optimization in Next.js, including
              structured data, metadata configuration, and semantic HTML.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
              Get Started
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Features</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <article className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  ✓ Metadata Configuration
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Comprehensive metadata export for title, description, Open Graph tags, and
                  Twitter cards to maximize shareability across platforms.
                </p>
              </article>

              {/* Feature 2 */}
              <article className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  ✓ Structured Data (JSON-LD)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  WebSite schema with SearchAction for enhanced SERP features and improved
                  search engine understanding.
                </p>
              </article>

              {/* Feature 3 */}
              <article className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  ✓ Semantic HTML
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Proper use of semantic elements (main, article, section) for better
                  accessibility and SEO.
                </p>
              </article>

              {/* Feature 4 */}
              <article className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  ✓ Mobile Optimization
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Viewport configuration and responsive design patterns for optimal mobile
                  experience and Core Web Vitals.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to optimize your pages?</h2>
            <p className="text-lg opacity-90 mb-8">
              Use this template as a reference for your own SEO-optimized Next.js pages.
            </p>
            <button className="bg-white text-blue-600 hover:bg-slate-100 font-semibold py-3 px-8 rounded-lg transition duration-200">
              Learn More
            </button>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400 text-center text-sm">
          <p>
            &copy; 2025 Tools Hub. All rights reserved. | SEO-Optimized Next.js Example
          </p>
        </footer>
      </main>
    </>
  );
}
