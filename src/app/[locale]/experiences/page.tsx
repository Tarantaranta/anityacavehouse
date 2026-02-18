import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import ExperiencesGrid from "@/components/sections/ExperiencesGrid";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header2026 />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════════════════
            E0 — EXPERIENCES HERO
            Ana sayfanın devamı: bone zemin, serif başlık, ParallaxImage
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface pt-28 pb-10 md:pt-36 md:pb-12">
          <div className="max-w-6xl mx-auto px-5 md:px-8">

            {/* Eyebrow + H1 + Description */}
            <div className="mb-10 md:mb-14 space-y-4">
              <Reveal>
                <p className="text-xs tracking-[0.18em] uppercase text-ink-2">
                  Ortahisar · Kapadokya
                </p>
              </Reveal>

              <Reveal delayMs={80}>
                <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-ink leading-[1.05]">
                  Kapadokya Deneyimleri
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-[68ch]">
                  Kapadokya'nın büyüsünü keşfetmek için özenle seçilmiş aktiviteler ve
                  rotalar. Her deneyim, bölgenin eşsiz kültürünü ve doğal güzelliklerini
                  yakından tanımanızı sağlar.
                </p>
              </Reveal>
            </div>

            {/* Sinematik hero görsel */}
            <Reveal delayMs={220}>
              <ParallaxImage
                src="/images/cappadocia-ortahisar-castle.avif"
                alt="Kapadokya – Ortahisar manzarası"
                className="w-full aspect-[16/9] rounded-2xl"
                strength={16}
                priority
              />
            </Reveal>

            {/* Badge pills */}
            <Reveal delayMs={300}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "Sakin tempo",
                  "Yerel rehberler",
                  "Özenle seçilmiş rotalar",
                  "Size göre plan",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-black/10 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-neutral-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            E1 + E2 — Kategori filtresi + Editoryal kartlar (Client)
        ══════════════════════════════════════════════════════════════ */}
        <ExperiencesGrid />

        {/* ══════════════════════════════════════════════════════════════
            E3 — MİNİ MANİFESTO
            "Deneyimler, programa değil size uyar."
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface-2 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <div className="rounded-2xl border border-black/5 bg-white/40 p-8 md:p-12">
                <Reveal delayMs={60}>
                  <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-5">
                    Ritim
                  </p>
                </Reveal>

                <Reveal delayMs={120}>
                  <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-ink leading-snug max-w-xl mb-6">
                    Deneyimler, programa değil size uyar.
                  </h2>
                </Reveal>

                <Reveal delayMs={180}>
                  <p className="text-base text-ink-2 leading-relaxed max-w-2xl">
                    Bazı sabahlar erken başlar — balonun sepetiyle birlikte güneşle
                    yükselirsiniz. Bazı günler sadece yürümek, bir vadiyi sessizce
                    dinlemek istersiniz. Bazı akşamlar ise masada uzun süre oturmak,
                    yerel bir şarabı yavaş içmek. Burada her ikisi de mümkün.
                    Konaklamanız boyunca sizin için bir program hazırlayabiliriz —
                    ya da sadece haritayı uzatıp yolunuzu kendiniz çizebilirsiniz.
                  </p>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            E4 — PLANLAMA CTA
            Tek net çıkış: WhatsApp + E-posta
        ══════════════════════════════════════════════════════════════ */}
        <section id="planlama" className="bg-surface py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-6">
                Planlama
              </p>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-ink leading-[1.05] max-w-2xl mb-6">
                Deneyimlerinizi birlikte planlayalım.
              </h2>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-2xl mb-10">
                Anitya Cave House olarak yerel rehberler ve tur operatörleriyle
                yakın ilişkideyiz. Size en uygun programı oluşturmak için bize
                yazın; balondan bisiklete, mahzenden mutfağa kadar her şeyi ayarlayalım.
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp – primary */}
                <a
                  href="https://wa.me/90XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.353-1.497A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.213-3.728.878.944-3.637-.234-.373A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
                  </svg>
                  WhatsApp ile yazın
                </a>

                {/* E-posta – secondary */}
                <a
                  href="mailto:info@anityacavehouse.com"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/50 px-6 py-3 text-sm font-medium hover:bg-white/70 transition-colors text-ink"
                >
                  info@anityacavehouse.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
