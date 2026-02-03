'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle, Calendar, Copy, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface SyncResult {
  roomId: string;
  roomName: string;
  success: boolean;
  blockedDatesCount?: number;
  blockedDates?: any[];
  lastSynced?: string;
  error?: string;
}

export default function CalendarAdminPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<SyncResult[] | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/calendar/sync');
      const data = await response.json();

      if (data.success) {
        setSyncResults(data.rooms);
        setLastSync(data.syncedAt);
      } else {
        alert('Senkronizasyon başarısız oldu: ' + data.error);
      }
    } catch (error) {
      console.error('Sync error:', error);
      alert('Senkronizasyon sırasında bir hata oluştu');
    } finally {
      setSyncing(false);
    }
  };

  const getExportUrl = (roomId: string) => {
    return `${window.location.origin}/api/calendar/export/${roomId}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('URL kopyalandı!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              Takvim Yönetimi
            </h1>
            <p className="text-lg text-stone-700 mb-6">
              Airbnb ve diğer platformlarla takvim senkronizasyonu
            </p>

            <div className="flex gap-4">
              <Button
                onClick={handleSync}
                disabled={syncing}
                size="lg"
                className="bg-amber-700 hover:bg-amber-800"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Senkronize Ediliyor...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Takvimleri Senkronize Et
                  </>
                )}
              </Button>

              {lastSync && (
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Son Senkronizasyon: {format(new Date(lastSync), 'PPp', { locale: tr })}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sync Results */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Info Card */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="h-5 w-5" />
                Takvim Entegrasyonu Nasıl Çalışır?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Airbnb → Bizim Site (İçe Aktarma)</h3>
                <p className="text-sm">
                  Airbnb'deki rezervasyonlar otomatik olarak sitemize aktarılır ve bu tarihler bloke edilir.
                  "Takvimleri Senkronize Et" butonuna basarak manuel olarak güncelleyebilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Bizim Site → Airbnb (Dışa Aktarma)</h3>
                <p className="text-sm">
                  Sitemizden yapılan rezervasyonları Airbnb'ye aktarmak için aşağıdaki export URL'lerini
                  Airbnb panel'inizde "Başka bir web sitesine bağlanın" bölümüne ekleyin.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Export URLs */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
              Airbnb'ye Aktarılacak Takvim URL'leri
            </h2>
            <p className="text-stone-600 mb-6">
              Bu URL'leri Airbnb'ye ekleyerek sitemizden yapılan rezervasyonları Airbnb'ye senkronize edebilirsiniz.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {['1', '2', '3'].map((roomId) => {
                const exportUrl = typeof window !== 'undefined' ? getExportUrl(roomId) : '';
                const roomNames = {
                  '1': 'Deluxe Cave Suite',
                  '2': 'Standard Cave Room',
                  '3': 'Family Cave Suite',
                };

                return (
                  <Card key={roomId} className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg">{roomNames[roomId as keyof typeof roomNames]}</CardTitle>
                      <CardDescription>Oda #{roomId} - Export URL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-stone-100 p-3 rounded-md text-xs font-mono break-all">
                        {exportUrl || 'URL yükleniyor...'}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(exportUrl)}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Kopyala
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(exportUrl, '_blank')}
                          className="flex-1"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Test Et
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sync Results */}
          {syncResults && (
            <div>
              <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
                Senkronizasyon Sonuçları
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {syncResults.map((result) => (
                  <Card
                    key={result.roomId}
                    className={result.success ? 'border-green-300' : 'border-red-300'}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {result.success ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        {result.roomName}
                      </CardTitle>
                      <CardDescription>Oda #{result.roomId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result.success ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-stone-600">Bloke Tarihler:</span>
                            <Badge variant="secondary">{result.blockedDatesCount}</Badge>
                          </div>

                          {result.blockedDates && result.blockedDates.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-semibold text-stone-700">
                                Yaklaşan Rezervasyonlar:
                              </p>
                              {result.blockedDates.slice(0, 3).map((date, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs bg-amber-50 p-2 rounded border border-amber-200"
                                >
                                  <div className="font-medium text-amber-900">
                                    {format(new Date(date.start), 'dd MMM', { locale: tr })} -{' '}
                                    {format(new Date(date.end), 'dd MMM yyyy', { locale: tr })}
                                  </div>
                                  <div className="text-stone-600">{date.summary}</div>
                                </div>
                              ))}
                              {result.blockedDates.length > 3 && (
                                <p className="text-xs text-stone-500 text-center">
                                  +{result.blockedDates.length - 3} daha...
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-red-600">
                          <p className="font-medium mb-2">Hata:</p>
                          <p className="text-xs">{result.error}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
