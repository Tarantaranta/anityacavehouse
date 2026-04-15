import { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import Header2026 from '@/components/layout/Header2026';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateBreadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const baseUrl = 'https://anityacavehouse.com';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}/faq`,
      languages: {
        'tr': `${baseUrl}/tr/faq`,
        'en': `${baseUrl}/en/faq`,
        'zh': `${baseUrl}/zh/faq`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${baseUrl}/${locale}/faq`,
    },
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqs = [
    {
      question: t('q1'),
      answer: t('a1'),
    },
    {
      question: t('q2'),
      answer: t('a2'),
    },
    {
      question: t('q3'),
      answer: t('a3'),
    },
    {
      question: t('q4'),
      answer: t('a4'),
    },
    {
      question: t('q5'),
      answer: t('a5'),
    },
    {
      question: t('q6'),
      answer: t('a6'),
    },
    {
      question: t('q7'),
      answer: t('a7'),
    },
    {
      question: t('q8'),
      answer: t('a8'),
    },
    {
      question: t('q9'),
      answer: t('a9'),
    },
    {
      question: t('q10'),
      answer: t('a10'),
    },
  ];

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home') || 'Home', path: `/${locale}` },
    { name: t('title'), path: `/${locale}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header2026 />
      <main id="main-content" className="min-h-screen bg-surface pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-600 mb-4">
              {t('eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-ink mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-line overflow-hidden"
              >
                <summary className="px-6 py-5 cursor-pointer list-none flex items-start justify-between gap-4 hover:bg-neutral-50 transition-colors">
                  <h2 className="text-lg font-medium text-ink flex-1">
                    {faq.question}
                  </h2>
                  <svg
                    className="w-5 h-5 text-neutral-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-neutral-600 mb-4">{t('stillHaveQuestions')}</p>
            <a
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              {t('contactUs')}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
