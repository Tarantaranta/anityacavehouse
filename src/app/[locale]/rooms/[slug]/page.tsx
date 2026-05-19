import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Header2026 from '@/components/layout/Header2026';
import { Footer } from '@/components/layout/Footer';
import { rooms, getRoomBySlug } from '@/data/rooms';
import RoomGallery from '@/components/ui/RoomGallery';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';
import { Users, Maximize, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo';
import { Locale, siteConfig } from '@/lib/seo-config';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// ─── Locale-aware UI labels ────────────────────────────────────────────────

const ui = {
  tr: {
    backToSuites: 'Tüm Suitlerimiz',
    description: 'Açıklama',
    amenities: 'Oda Olanakları',
    houseAmenities: 'Ev Olanakları',
    kitchen: 'Mutfak',
    guestServices: 'Misafir Hizmetleri',
    guests: 'kişi',
    bookNow: 'Rezervasyon Yap',
    inquire: 'Bilgi Al',
    superhostTrust: '12+ Yıl Airbnb Superhost güvencesi',
    support: '7/24 misafir desteği',
    otherSuites: 'Diğer Suitlerimiz',
    viewDetails: 'Detayları Gör',
  },
  en: {
    backToSuites: 'All Suites',
    description: 'Description',
    amenities: 'Suite Amenities',
    houseAmenities: 'House Amenities',
    kitchen: 'Kitchen',
    guestServices: 'Guest Services',
    guests: 'guests',
    bookNow: 'Book Now',
    inquire: 'Inquire',
    superhostTrust: '12+ Years Airbnb Superhost trust',
    support: '24/7 guest support',
    otherSuites: 'Other Suites',
    viewDetails: 'View Details',
  },
  zh: {
    backToSuites: '所有套房',
    description: '描述',
    amenities: '套房设施',
    houseAmenities: '房间设施',
    kitchen: '厨房',
    guestServices: '客人服务',
    guests: '人',
    bookNow: '立即预订',
    inquire: '咨询',
    superhostTrust: '12+年Airbnb超赞房东信誉',
    support: '24/7客人支持',
    otherSuites: '其他套房',
    viewDetails: '查看详情',
  },
};

type SupportedLocale = keyof typeof ui;

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) return {};

  const l = locale as 'tr' | 'en' | 'zh';
  const name = room.name[l] || room.name.tr;
  const description = room.shortDescription[l] || room.shortDescription.tr;
  const baseUrl = 'https://anityacavehouse.com';

  return {
    title: `${name} | Anitya Cave House`,
    description: description,
    keywords: locale === 'tr'
      ? `${name}, kapadokya oda, mağara suite, ortahisar konaklama, özel teras`
      : locale === 'en'
      ? `${name}, cappadocia room, cave suite, ortahisar accommodation, private terrace`
      : `${name}, 卡帕多西亚房间, 洞穴套房, 奥塔希萨尔住宿`,

    alternates: {
      canonical: `${baseUrl}/${locale}/rooms/${slug}`,
      languages: {
        'tr': `${baseUrl}/tr/rooms/${slug}`,
        'en': `${baseUrl}/en/rooms/${slug}`,
        'zh': `${baseUrl}/zh/rooms/${slug}`,
        'x-default': `${baseUrl}/en/rooms/${slug}`,
      },
    },

    openGraph: {
      title: name,
      description: description,
      url: `${baseUrl}/${locale}/rooms/${slug}`,
      images: room.images && room.images.length > 0 ? [
        {
          url: `${baseUrl}${room.images[0]}`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ] : [],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: name,
      description: description,
      images: room.images && room.images.length > 0 ? [`${baseUrl}${room.images[0]}`] : [],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const l: SupportedLocale = locale in ui ? (locale as SupportedLocale) : 'tr';
  const c = ui[l];
  const room = getRoomBySlug(slug);

  if (!room) notFound();

  const name = room.name[l];
  const description = room.description[l];
  const shortDesc = room.shortDescription[l];
  const specs = room.specifications;
  const specialNote = room.specialNote[l];

  const houseAmenities = room.amenities.houseAmenities[l];
  const kitchenAmenities = room.amenities.kitchen[l];
  const guestServices = room.amenities.guestServices[l];

  const otherRooms = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  const breadcrumbLabels = {
    tr: { home: 'Ana Sayfa', rooms: 'Suitlerimiz' },
    en: { home: 'Home', rooms: 'Our Suites' },
    zh: { home: '首页', rooms: '我们的套房' },
  };
  const bl = breadcrumbLabels[l] || breadcrumbLabels.tr;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HotelRoom',
            name: name,
            description: description,
            image: room.images,
            occupancy: {
              '@type': 'QuantitativeValue',
              maxValue: room.capacity,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: siteConfig.business.aggregateRating.ratingValue,
              reviewCount: siteConfig.business.aggregateRating.reviewCount,
              bestRating: siteConfig.business.aggregateRating.bestRating,
              worstRating: siteConfig.business.aggregateRating.worstRating,
            },
            amenityFeature: [
              ...houseAmenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
              ...kitchenAmenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
              ...guestServices.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
            ],
          }),
        }}
      />
      <Header2026 />

      {/* ── Back navigation & Breadcrumbs ────────────────────────────────────────────── */}
      <div className="pt-20 bg-surface border-b border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4">
          <Breadcrumbs
            items={[
              { name: bl.home, url: '/' },
              { name: bl.rooms, url: '/rooms' },
              { name: name, url: `/rooms/${slug}` },
            ]}
            locale={l}
          />
        </div>
      </div>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section className="bg-surface-2 py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <RoomGallery images={room.images ?? []} alt={name} />
        </div>
      </section>

      {/* ── Room Details ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left: Room Info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Title + capacity */}
            <Reveal>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-3">
                  {room.subtitle[l]}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-ink leading-tight">
                  {name}
                </h1>
                <p className="mt-3 text-base text-ink-2">{shortDesc}</p>
                <div className="mt-5 flex flex-wrap gap-5 text-sm text-ink-2">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-ink-3" />
                    {room.capacity} {c.guests}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-ink-3" />
                    {room.size}
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-line" />

            {/* Description */}
            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-light text-ink mb-4">
                  {c.description}
                </h2>
                <p className="text-base text-ink-2 leading-relaxed">{description}</p>
              </div>
            </Reveal>

            {/* Specifications */}
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: specs.beds[l] },
                  { label: specs.house[l] },
                  { label: specs.bathrooms[l] },
                  { label: specs.terrace[l] },
                  { label: specs.extraBed[l] },
                  { label: specs.decoration[l] },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/5 bg-white/50 p-4 text-sm text-ink-2 leading-relaxed"
                  >
                    {spec.label}
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="border-t border-line" />

            {/* Amenities */}
            <Reveal>
              <div className="space-y-8">
                <h2 className="text-xl font-serif font-light text-ink">
                  {c.amenities}
                </h2>

                {/* House Amenities */}
                <div>
                  <h3 className="text-sm font-medium text-ink-2 tracking-widest uppercase mb-4">
                    {c.houseAmenities}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {houseAmenities.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-ink-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kitchen */}
                <div>
                  <h3 className="text-sm font-medium text-ink-2 tracking-widest uppercase mb-4">
                    {c.kitchen}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {kitchenAmenities.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-ink-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guest Services */}
                <div>
                  <h3 className="text-sm font-medium text-ink-2 tracking-widest uppercase mb-4">
                    {c.guestServices}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {guestServices.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-ink-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Special Note */}
            {specialNote && (
              <Reveal>
                <div className="rounded-2xl border border-black/5 bg-white/40 p-6 text-sm text-ink-2 leading-relaxed">
                  {specialNote}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm p-6 space-y-5">

              <div className="space-y-3">
                <Link
                  href={`/booking?room=${room.slug}`}
                  className="block w-full text-center rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  {c.bookNow}
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center rounded-full border border-black/10 bg-transparent text-ink px-7 py-3.5 text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  {c.inquire}
                </Link>
              </div>

              <div className="border-t border-line pt-5 space-y-3 text-xs text-ink-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{c.superhostTrust}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{c.support}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Suites ──────────────────────────────────────────────── */}
      <section className="bg-surface-2 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-ink mb-10">
              {c.otherSuites}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {otherRooms.map((r, i) => (
              <Reveal key={r.id} delayMs={i * 80}>
                <div className="rounded-2xl border border-black/5 bg-white/50 overflow-hidden hover:shadow-lg transition-shadow">
                  {r.images && r.images.length > 0 && (
                    <div className="relative h-48">
                      <Image
                        src={r.images[0]}
                        alt={r.name[l]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-light text-ink mb-1">
                      {r.name[l]}
                    </h3>
                    <p className="text-sm text-ink-2 mb-5">
                      {r.shortDescription[l]}
                    </p>
                    <Link
                      href={`/rooms/${r.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-black/10 bg-transparent text-ink px-5 py-2.5 text-sm hover:bg-black/5 transition-colors"
                    >
                      {c.viewDetails}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
