import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { rooms } from '@/data/rooms';
import { Users, Maximize, Euro } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RoomsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = useTranslations('rooms');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              Odalarımız
            </h1>
            <p className="text-lg text-stone-700">
              Kapadokya'nın eşsiz mağara mimarisinde, modern konforun tadını çıkarın.
              Her odamız özenle tasarlanmış ve size unutulmaz bir deneyim sunmak için hazırlanmıştır.
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden border-amber-100 hover:border-amber-300 transition-all hover:shadow-xl group">
              {/* Room Image */}
              <div className="relative h-64 bg-stone-200 overflow-hidden">
                {room.featured && (
                  <Badge className="absolute top-4 left-4 z-10 bg-amber-700">
                    Featured
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[1]" />
                {/* Placeholder image - will be replaced with actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 bg-stone-100">
                  <span className="text-6xl">🏛️</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-amber-900">
                  {room.name[locale as keyof typeof room.name]}
                </CardTitle>
                <CardDescription className="text-stone-600">
                  {room.shortDescription[locale as keyof typeof room.shortDescription]}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Room Info */}
                <div className="flex gap-4 text-sm text-stone-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} Kişi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{room.size}m²</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-900">
                    ${room.pricePerNight}
                  </span>
                  <span className="text-stone-600">/ gece</span>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity === 'wifi' && '📶 WiFi'}
                      {amenity === 'breakfast' && '🍳 Kahvaltı'}
                      {amenity === 'king-bed' && '🛏️ King Yatak'}
                      {amenity === 'double-bed' && '🛏️ Çift Kişilik'}
                      {amenity === 'jacuzzi' && '🛁 Jakuzi'}
                      {amenity === 'balcony' && '🏞️ Balkon'}
                    </Badge>
                  ))}
                  {room.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{room.amenities.length - 4} daha
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/rooms/${room.slug}`}>Detaylar</Link>
                </Button>
                <Button asChild className="flex-1 bg-amber-700 hover:bg-amber-800">
                  <Link href={`/booking?room=${room.slug}`}>Rezervasyon</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold">
            Hangi Odayı Seçeceğinize Karar Veremediniz Mi?
          </h2>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            Size en uygun odayı bulmak için ekibimiz yardımcı olmaktan mutluluk duyar.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-amber-900 hover:bg-amber-50">
            <Link href="/contact">Bize Ulaşın</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
