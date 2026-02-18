import Header2026 from '@/components/layout/Header2026';
import { Footer } from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import BookingWidget from './BookingWidget';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const titles = {
    tr: 'Rezervasyon — Anitya Cave House',
    en: 'Book Your Stay — Anitya Cave House',
    zh: '预订住宿 — Anitya Cave House',
  };
  const descriptions = {
    tr: 'Kapadokya Ortahisar\'da Anitya Cave House suitlerinizi rezerve edin. Airbnb Superhost, 4.86/5 puan, 1046+ yorum.',
    en: 'Book your stay at Anitya Cave House in Ortahisar, Cappadocia. Airbnb Superhost, 4.86/5 rating, 1046+ reviews.',
    zh: '预订卡帕多西亚奥塔希萨尔Anitya Cave House。Airbnb超级房东，评分4.86/5，1046+条评价。',
  };

  return {
    title: titles[locale as keyof typeof titles] ?? titles.en,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.en,
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <SmoothScrollProvider>
      <Header2026 />
      <main className="pt-20">
        <BookingWidget locale={locale} />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
