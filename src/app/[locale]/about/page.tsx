import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ef]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-400 mb-6">
          HAKKIMIZDA
        </p>
        <h1 className="font-serif font-light text-4xl md:text-6xl text-stone-900 tracking-wide leading-tight">
          Yaşayan Bir Süreklilik
        </h1>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-stone-200" />

      {/* Main narrative */}
      <article className="max-w-3xl mx-auto px-6 py-20 space-y-16">

        {/* Block 1 — History */}
        <div className="space-y-6">
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Ortahisar, MÖ 1800'lerden bu yana sayısız uygarlığın izini taşır. Hititler, Persler,
            Romalılar, Bizanslılar, Selçuklular ve Osmanlılar bu coğrafyada yaşadı. Kapadokya'nın
            volkanik kayaları, sadece jeolojik değil, insani bir hafızayı da saklar.
          </p>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Anitya Cave House, 400 yılı aşkın geçmişe sahip bu taşın içinde konumlanır.
            Ancak hikâyesi bundan çok daha eskidir.
          </p>
        </div>

        {/* Block 2 — Poetic geology */}
        <div className="border-l-2 border-stone-300 pl-8 space-y-4">
          <p className="font-serif text-xl md:text-2xl font-light text-stone-800 leading-relaxed">
            Kapadokya bir zamanlar denizdi.
          </p>
          <p className="font-serif text-xl md:text-2xl font-light text-stone-800 leading-relaxed">
            Sonra volkanlar yükseldi.
          </p>
          <p className="text-base text-stone-500 leading-relaxed mt-4">
            Rüzgâr, su ve ateş milyonlarca yıl boyunca bu toprağı şekillendirdi.
            Ortaya çıkan kaya kütleleri uzun süre sessizdi. Sahipsizdi.
            Sonra insanlar geldi. Oydu, yerleşti, barındı, üretti, dua etti, bekledi.
          </p>
        </div>

        {/* Block 3 — Kuşaklar */}
        <div className="space-y-6">
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Bu taş, kaç kuşak gördü bilmiyoruz.
            Kaç çocuk burada büyüdü, kaç insan burada uyudu, kaç mevsim geçti — bilmiyoruz.
            Ama biliyoruz ki her dönem, bu kayaya kendi izini bıraktı.
          </p>
        </div>

        {/* Block 4 — Mekanlar */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Salon</p>
            <p className="text-base text-stone-600 leading-relaxed">
              Yüzyıllar önce gündelik yaşamın bir parçasıydı.
              Kayaya oyulmuş raf nişleri, o dönemin izlerini bugün hâlâ fısıldar.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Yatak Odası</p>
            <p className="text-base text-stone-600 leading-relaxed">
              Geçmişte bir ibadet alanıydı.
              Sessizlik, o dönemden bugüne kalan en belirgin miras.
            </p>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px bg-stone-200" />

        {/* Block 5 — Biz kimiz */}
        <div className="space-y-6">
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Biz bir doktor ve bir oyuncuyuz.
            Bu mekânı ilk gördüğümüzde taşın yalnızlığını değil, sürekliliğini hissettik.
            Köyün ustalarıyla birlikte, yapının özgün dokusunu koruyarak restore ettik.
            Eklemekten çok ortaya çıkarmayı tercih ettik.
          </p>
        </div>

        {/* Block 6 — Anitya'nın anlamı */}
        <div className="bg-stone-100 rounded-sm px-8 py-10 space-y-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Anitya</p>
          <p className="font-serif text-2xl md:text-3xl font-light text-stone-800 leading-relaxed">
            Anitya kelimesi "süreksizlik" anlamına gelir.
          </p>
          <div className="space-y-2 text-base text-stone-500 leading-relaxed">
            <p>Hiçbir şey kalıcı değildir.</p>
            <p>Ne uygarlıklar.</p>
            <p>Ne yapılar.</p>
            <p>Ne de biz.</p>
          </div>
        </div>

        {/* Block 7 — Kapanış */}
        <div className="space-y-6">
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Bu mağara bir zamanlar başka bir hayatın parçasıydı.
            Sonra başka bir dönemin.
            Şimdi ise modern dünyanın insanlarını ağırlıyor.
          </p>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            Taş değişmiyor gibi görünür.
            Ama içinden geçen hayat sürekli değişir.
          </p>
          <p className="font-serif text-xl md:text-2xl font-light text-stone-800 leading-relaxed mt-8">
            Anitya, bu akışın küçük bir durağıdır.
          </p>
        </div>

      </article>

      {/* Footer stats bar */}
      <div className="w-full border-t border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="font-serif text-3xl font-light text-stone-900">400+</p>
            <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mt-1">Yıllık taş</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-light text-stone-900">4.9</p>
            <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mt-1">Airbnb puanı</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-light text-stone-900">12+</p>
            <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mt-1">Yıllık Superhost</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-light text-stone-900">3</p>
            <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mt-1">Bağımsız suite</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
