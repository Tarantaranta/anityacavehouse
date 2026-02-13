import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Heart, Home, Sparkles, Star, Users } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    {
      icon: Heart,
      title: 'Misafir Memnuniyeti',
      description: 'Her misafirimiz bizim için özel. Mükemmel bir deneyim sunmak için çalışıyoruz.',
    },
    {
      icon: Home,
      title: 'Otantik Deneyim',
      description: 'Kapadokya\'nın gerçek ruhunu yaşatıyoruz, modern konforla birleştirerek.',
    },
    {
      icon: Sparkles,
      title: 'Kalite & Konfor',
      description: 'En yüksek standartlarda hizmet ve konaklama sunuyoruz.',
    },
    {
      icon: Users,
      title: 'Yerel Bağlantı',
      description: 'Bölgenin kültürü ve topluluğuyla güçlü bağlarımız var.',
    },
  ];

  const achievements = [
    { icon: Star, text: '12+ Years Airbnb Superhost', year: '2020-2026' },
    { icon: Award, text: '4.9/5.0 Misafir Puanı', year: '500+ Yorum' },
    { icon: Users, text: '2000+ Mutlu Misafir', year: 'Son 3 yıl' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-stone-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-700 mb-4">
              Kapadokya'nın Kalbinde
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-amber-900 leading-tight">
              Anıtya Cave House Hakkında
            </h1>
            <p className="text-xl text-stone-700 leading-relaxed">
              Geleneksel Kapadokya mimarisini modern lüks ile birleştiren,
              ailece işletilen butik mağara otelimize hoş geldiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900">
              Hikayemiz
            </h2>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                Anıtya Cave House, Kapadokya'nın büyüleyici doğal güzellikleri arasında,
                yüzyıllık kayalara oyulmuş bir mimari harikasıdır. 2015 yılında ailece
                başladığımız bu yolculukta, bölgenin eşsiz kültürel mirasını koruyarak,
                modern konforla harmanlıyoruz.
              </p>
              <p>
                Her odamız, binlerce yıllık volkanik kayaların içine ustalıkla işlenmiştir.
                Doğal taş duvarlar ve geleneksel mimarinin yanı sıra, çağdaş amenities ve
                premium hizmet sunarak, misafirlerimize unutulmaz bir deneyim yaşatıyoruz.
              </p>
              <p>
                Göreme'nin merkezinde yer alan otelimiz, sıcak hava balonlarının gökyüzünü
                süslediği eşsiz manzaraya ev sahipliği yapar. Airbnb Superhost statümüz ve
                yüzlerce beş yıldızlı yorumumuz, misafir memnuniyetine verdiğimiz önemi
                göstermektedir.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-stone-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                <div className="text-center">
                  <span className="text-8xl mb-4 block">🏛️</span>
                  <p className="text-lg">Anıtya Cave House</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-100 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-4">
            Değerlerimiz
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Anıtya Cave House'u özel kılan değerler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-amber-100 hover:border-amber-300 transition-all hover:shadow-xl text-center">
                <CardContent className="p-8">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
            Başarılarımız
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {achievement.text}
                  </h3>
                  <p className="text-amber-100">
                    {achievement.year}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square bg-stone-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                <div className="text-center">
                  <span className="text-8xl mb-4 block">🎈</span>
                  <p className="text-lg">Kapadokya</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-amber-100 rounded-2xl -z-10" />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900">
              Kapadokya'nın Kalbi: Göreme
            </h2>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                UNESCO Dünya Mirası Listesi'nde yer alan Göreme, benzersiz peribacaları,
                yeraltı şehirleri ve tarihi kaya kilise kompleksleriyle ünlüdür.
              </p>
              <p>
                Otelimiz, bu büyüleyici kasabanın merkezinde, tüm önemli noktalara yürüme
                mesafesinde konumlanmıştır. Göreme Açık Hava Müzesi'ne 10 dakika, en iyi
                restaurant ve kafelere 5 dakika mesafedeyiz.
              </p>
              <p>
                Her sabah, odanızın balkonundan veya terasımızdan yüzlerce sıcak hava
                balonunun gökyüzünü süslediği muhteşem manzarayı izleyebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-stone-600 mb-1">Havaalanı</p>
                <p className="text-2xl font-bold text-amber-900">45 dk</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-stone-600 mb-1">Göreme Merkez</p>
                <p className="text-2xl font-bold text-amber-900">5 dk</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-stone-600 mb-1">Açık Hava Müzesi</p>
                <p className="text-2xl font-bold text-amber-900">10 dk</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-stone-600 mb-1">Panoramik Nokta</p>
                <p className="text-2xl font-bold text-amber-900">8 dk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-4">
              Ekibimiz
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Deneyiminizi unutulmaz kılmak için buradayız
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-stone-700 leading-relaxed text-lg mb-8">
              Anıtya Cave House olarak, ailece işlettiğimiz otelimizde misafirlerimize
              kendi evlerinde gibi hissettirmeyi amaçlıyoruz. Yerel bilgimiz, sıcak
              misafirperverliğimiz ve detaylara gösterdiğimiz özen ile size rehberlik
              etmekten mutluluk duyarız.
            </p>
            <p className="text-stone-600 italic">
              "Misafirlerimiz ailemizdendi. Her konuk özel, her anı değerli."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
