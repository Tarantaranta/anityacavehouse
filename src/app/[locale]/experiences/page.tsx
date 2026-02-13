import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sunrise,
  Wine,
  MapPin,
  Camera,
  Tent,
  Mountain,
  Utensils,
  Bike
} from 'lucide-react';

export default function ExperiencesPage() {
  const t = useTranslations('experiences');

  // Placeholder experiences - will be filled with real content later
  const experiences = [
    {
      icon: Sunrise,
      title: 'Sıcak Hava Balonu Turu',
      description: 'Kapadokya\'nın eşsiz manzarasını gün doğumunda kuş bakışı keşfedin.',
      category: 'Macera',
      duration: '3-4 saat',
    },
    {
      icon: Wine,
      title: 'Kapadokya Şarap Tadımı',
      description: 'Bölgenin ünlü şaraplarını tarihi şarap mahzenlerinde tadın.',
      category: 'Gastronomi',
      duration: '2-3 saat',
    },
    {
      icon: MapPin,
      title: 'Yeraltı Şehri Turu',
      description: 'Antik yeraltı şehirlerinin gizemli dünyasını keşfedin.',
      category: 'Tarih',
      duration: '2-3 saat',
    },
    {
      icon: Camera,
      title: 'Fotoğraf Safari',
      description: 'Kapadokya\'nın en fotojenik noktalarında profesyonel fotoğraf turları.',
      category: 'Sanat',
      duration: '4-5 saat',
    },
    {
      icon: Mountain,
      title: 'Vadi Yürüyüşleri',
      description: 'Güvercinlik, Aşk ve İhlara vadilerinde rehberli yürüyüşler.',
      category: 'Doğa',
      duration: '3-4 saat',
    },
    {
      icon: Tent,
      title: 'ATV Safari',
      description: 'Peribacaları arasında heyecan dolu off-road macerası.',
      category: 'Macera',
      duration: '2 saat',
    },
    {
      icon: Utensils,
      title: 'Geleneksel Türk Mutfağı',
      description: 'Yerel ailelerle birlikte geleneksel yemek pişirme deneyimi.',
      category: 'Gastronomi',
      duration: '3-4 saat',
    },
    {
      icon: Bike,
      title: 'Bisiklet Turları',
      description: 'Kapadokya\'nın saklı köşelerini bisikletle keşfedin.',
      category: 'Doğa',
      duration: '3-4 saat',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-stone-100 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge className="bg-amber-700 mb-2 sm:mb-4 text-xs sm:text-sm">
              Unutulmaz Anılar
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-amber-900 leading-tight px-2">
              Kapadokya Deneyimleri
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-700 leading-relaxed px-4">
              Kapadokya'nın büyüsünü keşfetmek için özenle seçilmiş aktiviteler ve turlar.
              Her deneyim, bölgenin eşsiz kültürünü ve doğal güzelliklerini yakından tanımanızı sağlar.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 text-center">
          <p className="text-amber-900 text-base sm:text-lg font-medium">
            🚧 Bu sayfa hazırlanıyor
          </p>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Yakında daha detaylı deneyim içerikleri, fotoğraflar ve rezervasyon bilgileriyle buluşacağız.
          </p>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Experiences Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-3 sm:mb-4 px-2">
            Popüler Deneyimler
          </h2>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto px-4">
            Konaklamanızı daha özel kılacak aktiviteler
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <Card
                key={index}
                className="border-amber-100 hover:border-amber-300 transition-all hover:shadow-xl group"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="bg-amber-100 group-hover:bg-amber-200 transition-colors w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-amber-700" />
                  </div>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {experience.category}
                    </Badge>
                    <span className="text-xs text-stone-500">
                      {experience.duration}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2 sm:mb-3">
                    {experience.title}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    {experience.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold mb-3 sm:mb-4 px-2">
              Deneyimlerinizi Planlayalım
            </h2>
            <p className="text-amber-100 text-base sm:text-lg leading-relaxed px-4">
              Anıtya Cave House olarak, misafirlerimize Kapadokya'daki en iyi deneyimleri
              sunmak için yerel rehberler ve tur operatörleriyle işbirliği yapıyoruz.
              Rezervasyonlarınız için bize ulaşın, size en uygun programı oluşturalım.
            </p>
            <div className="pt-4 sm:pt-6">
              <p className="text-amber-200 font-medium text-sm sm:text-base">
                📧 info@anityacavehouse.com
              </p>
              <p className="text-amber-200 font-medium text-sm sm:text-base mt-2">
                📱 WhatsApp: +90 XXX XXX XX XX
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
