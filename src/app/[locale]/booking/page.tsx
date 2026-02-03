'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { rooms } from '@/data/rooms';
import { CalendarDays, Users, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const preSelectedRoom = searchParams.get('room');

  const [selectedRoom, setSelectedRoom] = useState(preSelectedRoom || '');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState('2');
  const [step, setStep] = useState(1); // 1: Dates, 2: Details, 3: Payment

  const selectedRoomData = rooms.find(r => r.slug === selectedRoom);
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = selectedRoomData && nights > 0 ? selectedRoomData.pricePerNight * nights : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              Rezervasyon
            </h1>
            <p className="text-lg text-stone-700">
              Kapadokya'da unutulmaz bir deneyim için rezervasyonunuzu tamamlayın.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Tarih & Oda', icon: CalendarDays },
              { num: 2, label: 'Bilgileriniz', icon: Users },
              { num: 3, label: 'Ödeme', icon: CreditCard },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= s.num
                          ? 'bg-amber-700 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`hidden sm:block font-medium ${
                        step >= s.num ? 'text-amber-900' : 'text-stone-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        step > s.num ? 'bg-amber-700' : 'bg-stone-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Date & Room Selection */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">Tarih ve Oda Seçimi</CardTitle>
                  <CardDescription>Konaklama tarihlerinizi ve odanızı seçin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Room Selection */}
                  <div className="space-y-2">
                    <Label>Oda Seçimi</Label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bir oda seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.slug}>
                            {room.name.tr} - ${room.pricePerNight}/gece
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Giriş Tarihi</Label>
                      <div className="border rounded-lg p-4">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          locale={tr}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Çıkış Tarihi</Label>
                      <div className="border rounded-lg p-4">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => !checkIn || date <= checkIn}
                          locale={tr}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-2">
                    <Label>Misafir Sayısı</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Kişi
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full bg-amber-700 hover:bg-amber-800"
                    size="lg"
                    disabled={!selectedRoom || !checkIn || !checkOut}
                    onClick={() => setStep(2)}
                  >
                    Devam Et
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Guest Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">İletişim Bilgileri</CardTitle>
                  <CardDescription>Rezervasyon için bilgilerinizi girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ad</Label>
                      <Input placeholder="Adınız" />
                    </div>
                    <div className="space-y-2">
                      <Label>Soyad</Label>
                      <Input placeholder="Soyadınız" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>E-posta</Label>
                    <Input type="email" placeholder="ornek@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Telefon</Label>
                    <Input type="tel" placeholder="+90 5XX XXX XX XX" />
                  </div>

                  <div className="space-y-2">
                    <Label>Ülke</Label>
                    <Select defaultValue="tr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkiye</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="cn">China</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Özel İstekler (Opsiyonel)</Label>
                    <Textarea
                      placeholder="Erken check-in, özel yemek talebi vb."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Geri
                    </Button>
                    <Button
                      className="flex-1 bg-amber-700 hover:bg-amber-800"
                      size="lg"
                      onClick={() => setStep(3)}
                    >
                      Devam Et
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">Ödeme</CardTitle>
                  <CardDescription>Güvenli ödeme seçenekleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Options */}
                  <div className="space-y-4">
                    <div className="border-2 border-amber-200 rounded-lg p-6 bg-amber-50">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900 mb-2">
                            Airbnb ile Rezervasyon (Önerilen)
                          </h3>
                          <p className="text-sm text-stone-600 mb-4">
                            Güvenli ödeme ve Airbnb garantisi ile rezervasyon yapın.
                            Yurtdışı misafirlerimiz için önerilir.
                          </p>
                          <Button
                            className="w-full bg-[#FF5A5F] hover:bg-[#FF385C] text-white"
                            size="lg"
                          >
                            Airbnb ile Devam Et
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-stone-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900 mb-2">
                            Kredi Kartı ile Ödeme (Türkiye)
                          </h3>
                          <p className="text-sm text-stone-600 mb-4">
                            iyzico güvenli ödeme sistemi ile 3D Secure ödeme.
                            Sadece Türkiye kartları için.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                            disabled
                          >
                            Yakında Aktif Olacak
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-stone-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 p-3 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900 mb-2">
                            Manuel Rezervasyon
                          </h3>
                          <p className="text-sm text-stone-600 mb-4">
                            Bize ulaşın, rezervasyonunuzu manuel olarak oluşturalım.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                          >
                            İletişime Geç
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(2)}
                  >
                    Geri
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-amber-200">
              <CardHeader>
                <CardTitle className="font-playfair">Rezervasyon Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedRoomData && (
                  <>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">
                        {selectedRoomData.name.tr}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {selectedRoomData.shortDescription.tr}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-3 text-sm">
                      {checkIn && (
                        <div className="flex justify-between">
                          <span className="text-stone-600">Giriş:</span>
                          <span className="font-medium">
                            {format(checkIn, 'dd MMMM yyyy', { locale: tr })}
                          </span>
                        </div>
                      )}
                      {checkOut && (
                        <div className="flex justify-between">
                          <span className="text-stone-600">Çıkış:</span>
                          <span className="font-medium">
                            {format(checkOut, 'dd MMMM yyyy', { locale: tr })}
                          </span>
                        </div>
                      )}
                      {nights > 0 && (
                        <div className="flex justify-between">
                          <span className="text-stone-600">Gece Sayısı:</span>
                          <span className="font-medium">{nights} gece</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-stone-600">Misafir:</span>
                        <span className="font-medium">{guests} kişi</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      {nights > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-600">
                            ${selectedRoomData.pricePerNight} × {nights} gece
                          </span>
                          <span className="font-medium">${totalPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Kahvaltı:</span>
                        <span className="text-green-600 font-medium">Dahil</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Vergiler:</span>
                        <span className="text-green-600 font-medium">Dahil</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-semibold">Toplam:</span>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-900">
                          ${totalPrice}
                        </div>
                        {nights > 0 && (
                          <div className="text-sm text-stone-500">
                            ~${Math.round(totalPrice / nights)} / gece
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-medium text-green-900">
                            Ücretsiz İptal
                          </p>
                          <p className="text-green-700">
                            Check-in'den 48 saat öncesine kadar
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
