import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { rooms, getRoomBySlug } from '@/data/rooms';
import {
  Users,
  Maximize,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Back Button */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/rooms" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Tüm Odalar
            </Link>
          </Button>
        </div>
      </div>

      {/* Room Images Gallery */}
      <section className="bg-stone-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Main Image */}
            <div className="relative h-96 md:h-[600px] bg-stone-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                <span className="text-8xl">🏛️</span>
              </div>
              {room.featured && (
                <Badge className="absolute top-4 left-4 bg-amber-700">
                  ⭐ Featured Room
                </Badge>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative h-44 md:h-[290px] bg-stone-200 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                    <span className="text-4xl">📷</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Room Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
                {room.name[locale as keyof typeof room.name]}
              </h1>
              <p className="text-xl text-stone-600">
                {room.shortDescription[locale as keyof typeof room.shortDescription]}
              </p>
            </div>

            <div className="flex gap-6 text-stone-700">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-700" />
                <span>{room.capacity} Kişi</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-amber-700" />
                <span>{room.size}m²</span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
                Açıklama
              </h2>
              <p className="text-stone-700 leading-relaxed text-lg">
                {room.description[locale as keyof typeof room.description]}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-6">
                Oda Olanakları
              </h2>

              {/* House Amenities */}
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Ev Olanakları</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {room.amenities.houseAmenities.map((amenity: string) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Kitchen */}
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Mutfak</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {room.amenities.kitchen.map((amenity: string) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Guest Services */}
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Misafir Hizmetleri</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {room.amenities.guestServices.map((amenity: string) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-amber-200">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-amber-900">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-stone-600">/ gece</span>
                  </div>
                  <p className="text-sm text-stone-500">
                    Vergiler ve kahvaltı dahil
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-lg"
                  >
                    <Link href={`/booking?room=${room.slug}`}>
                      Rezervasyon Yap
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-amber-700 text-amber-900 hover:bg-amber-50"
                  >
                    <Link href="/contact">
                      Bilgi Al
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 space-y-2 text-sm text-stone-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ücretsiz iptal (check-in'den 48 saat öncesine kadar)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>12+ Years Airbnb Superhost güvencesi</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>7/24 müşteri desteği</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Similar Rooms */}
      <section className="bg-stone-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-8">
            Diğer Odalarımız
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms
              .filter((r) => r.id !== room.id)
              .slice(0, 3)
              .map((r) => (
                <Card key={r.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 bg-stone-200">
                    <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                      <span className="text-5xl">🏛️</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold text-amber-900 mb-2">
                      {r.name[locale as keyof typeof r.name]}
                    </h3>
                    <p className="text-stone-600 mb-4 text-sm">
                      {r.shortDescription[locale as keyof typeof r.shortDescription]}
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-amber-900">
                        ${r.pricePerNight}
                      </span>
                      <span className="text-stone-600 text-sm">/ gece</span>
                    </div>
                    <Button asChild className="w-full bg-amber-700 hover:bg-amber-800">
                      <Link href={`/rooms/${r.slug}`}>Detayları Gör</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
