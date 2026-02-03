import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              İletişim
            </h1>
            <p className="text-lg text-stone-700">
              Size yardımcı olmaktan mutluluk duyarız. Sorularınız için bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-6">
                İletişim Bilgileri
              </h2>
              <p className="text-stone-600 mb-8">
                Kapadokya'nın kalbinde, Göreme'de sizleri bekliyoruz.
                Rezervasyon, sorularınız veya özel talepleriniz için 7/24 ulaşabilirsiniz.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <Card className="border-amber-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">Adres</h3>
                      <p className="text-stone-600">
                        Göreme, Nevşehir<br />
                        Kapadokya, Turkey
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="border-amber-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">Telefon</h3>
                      <a
                        href="tel:+905363021102"
                        className="text-stone-600 hover:text-amber-700 transition-colors"
                      >
                        +90 536 302 11 02
                      </a>
                      <p className="text-sm text-stone-500 mt-1">7/24 WhatsApp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-amber-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">E-posta</h3>
                      <a
                        href="mailto:info@anityacavehouse.com"
                        className="text-stone-600 hover:text-amber-700 transition-colors"
                      >
                        info@anityacavehouse.com
                      </a>
                      <p className="text-sm text-stone-500 mt-1">24 saat içinde yanıt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="border-amber-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">Çalışma Saatleri</h3>
                      <p className="text-stone-600">
                        Check-in: 14:00<br />
                        Check-out: 11:00
                      </p>
                      <p className="text-sm text-stone-500 mt-1">Resepsiyon 7/24 açık</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-4">Sosyal Medya</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/anityacavehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/anityacavehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/905363021102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-amber-900">
                Bize Mesaj Gönderin
              </CardTitle>
              <CardDescription>
                Formu doldurun, en kısa sürede size geri dönelim.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Ad
                    </label>
                    <Input placeholder="Adınız" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Soyad
                    </label>
                    <Input placeholder="Soyadınız" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    E-posta
                  </label>
                  <Input type="email" placeholder="ornek@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Telefon
                  </label>
                  <Input type="tel" placeholder="+90 5XX XXX XX XX" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Konu
                  </label>
                  <Input placeholder="Rezervasyon, Bilgi vb." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Mesajınız
                  </label>
                  <textarea
                    className="w-full min-h-[150px] px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  Mesaj Gönder
                </Button>

                <p className="text-xs text-center text-stone-500">
                  Formu göndererek, verilerinizin KVKK kapsamında işlenmesini kabul ediyorsunuz.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-8 text-center">
            Konumumuz
          </h2>
          <div className="aspect-video bg-stone-200 rounded-lg overflow-hidden">
            {/* Google Maps embed will be added here */}
            <div className="h-full flex items-center justify-center text-stone-400">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Göreme, Kapadokya</p>
                <p className="text-sm">Google Maps entegrasyonu eklenecek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
