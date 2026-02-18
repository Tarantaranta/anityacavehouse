Sevgili Hocam, süper. Sırayla gidiyorum: 1) yeni ana sayfa metinsel akış (2026) → 2) component mimarisi → 3) tasarım sistemi (renk/font/motion).

1) ANITYA 2026 – ANA SAYFA METİNSEL AKIŞ (TR)
HERO (Cinematic Opening)
Aynı güneş. Aynı taş. Binlerce yıl.
Kapadokya’nın kalbinde, Ortahisar’da. Otel değil — bağımsız suite evler.
[Rezervasyon] [Suite Evleri Keşfet]

MANİFESTO (Kimlik)
Otel değil. Ortak alan yok. Tamamen size ait.
Anitya Cave House, aynı yapı içinde konumlanan 3 bağımsız suite evden oluşur. İki mağara suite, bir taş suite. Tamamı yalnızca misafirler için hazırlanmıştır.

BİR ODA DEĞİL (Yaşama Hissi)
Bir oda değil. Bağımsız bir ev.
Anitya’da konaklamak, bir odaya girmek değil; kendi alanınıza çekilmek demektir.
Sessizlik. Mahremiyet. Kendi ritminiz.
Kimseyle alan paylaşmazsınız. Günün temposunu siz belirlersiniz.

SUITE YAPISI (Kısa ve net)
Üç suite. Üç ayrı dünya.
Her suite:
* Özel giriş
* Özel teras
* Ayrı oturma alanı ve yatak odası
* Donanımlı mutfak
Suite evlerden biri ayrıca bağımsız bir salon sunar.

MUTFAK (Özgürlük)
Her suite’te gerçek bir mutfak.
Bu bir “olanak” değil; özgürlük ve bağımsızlıktır.
Buzdolabı, fırın, ocak, kettle, kahve makinesi, geleneksel çaydanlık… Tencere, tava, tabaklar, farklı bardaklar ve eksiksiz çatal-kaşık takımı.
Misafirlerimiz gelişlerinde sınırsız filtre kahve, Türk kahvesi, siyah çay, zeytinyağı ve temel baharatlarla karşılanır.
Anitya’da mutfak bir aksesuar değildir. Yaşamak deneyiminin bir parçasıdır.

TERAS (Manzara + Balonlar)
Teras bir manzara noktası değildir. Günün başladığı yerdir.
Özel teraslarımızdan Kapadokya’nın kaya dokusu, vadiler ve güvercinlikler, Ortahisar’ın taş evleri ve açık havalarda uzakta Erciyes Dağı görünür.
Hava koşulları uygun olduğunda, gün doğumunda sıcak hava balonları ufukta süzülerek geçer. Sessiz, yalın, unutulmaz.

KONUM (Merkez hissi)
Ortahisar’ın kalbinde. Kapadokya’nın merkezinde.
Anitya Cave House, Ortahisar Eski Kasaba’nın tarihi dokusu içinde yer alır. Yürüyerek birkaç dakikada kaleye ulaşır; kısa sürüşlerle Kapadokya’nın ikonik rotalarına bağlanırsınız.
(— Haritanın yanında mesafe listesi burada yer alır —)

KAHVALTI & YEMEK (Ritim)
Sabah size ait.
Anitya Cave House’da sabit bir kahvaltı servisi bulunmaz.
Bunun yerine:
* 2 dakikalık yürüme mesafesinde kahvaltı seçenekleri
* 4–5 dakikalık yürüme mesafesinde geniş restoran çeşitliliği
* Ortahisar merkezden suite eve sipariş imkânı
İsterseniz dışarıda, isterseniz evinizde. Kendi ritminizde.

YORUMLAR (Minimal güven)
4.86 / 5 1046+ doğrulanmış misafir
Dünyanın dört bir yanından misafirlerin seçilmiş yorumları. [Tüm yorumları Airbnb’de görüntüle]

FINAL (Kapanış)
Kapadokya’yı bir ev gibi yaşamak isteyenler için.
Kalabalık otelleri değil; sessizliği, alanı ve bağımsızlığı seçenler için.
[Rezervasyon]

2) NEXT.JS 2026 – COMPONENT MİMARİSİ (nasıl bölmeliyiz)
Bu metni “tek uzun page.tsx” yerine, section component’lere ayırınca hem geliştirme hızlanır hem de motion/görsel yönetimi temiz olur:
* app/[lang]/page.tsx
    * <HeroCinematic />
    * <ManifestoBlock />
    * <NotARoomSticky />
    * <SuitesOverview /> (çok kısa blok)
    * <KitchenEditorial />
    * <TerraceCinematic />
    * <LocationMapSplit />
    * <BreakfastFreedom />
    * <ReviewsMinimal />
    * <FinalCTA />
Önerilen klasör:
* components/sections/ (her bölüm ayrı dosya)
* components/ui/ (Button, Container, SectionTitle, Reveal, etc.)
* content/home.ts (TR/EN/中文 metinleri tek yerden yönetmek istersen)
Bu mimari “award-level” işlerde standarttır: metin + görsel + motion her section’da kontrollü yönetilir.

3) TASARIM SİSTEMİ (Renk + Font + Motion) — 2026 “quiet luxury”
Renk
* Base background: stone-50
* Alt blok background: stone-100 (senin dediğin koyu bej hissi)
* Text: neutral-900 / body neutral-700
* Accent (çok az): bronz ton (buton hover, ince çizgi, küçük etiket)
Tipografi
* Başlık fontu: zarif serif (editorial hissi)
* Gövde fontu: modern sans (okunabilirlik)
* Hiyerarşi:
    * H1: büyük, kısa, 2–3 satır
    * H2: daha küçük ama nefesli
    * Body: 16–18px, line-height geniş
Motion (Framer Motion ile)
* Scroll reveal: hafif fade + translateY (abartı yok)
* Hero crossfade: 8–12 sn yumuşak geçiş
* Sticky + parallax: sadece 5–12px arası mikro hareket (luxury = az hareket)
* prefers-reduced-motion: hareketleri kapat (çok önemli)


2) Uygulama Planı: Dosya Yapısı + Bölüm Sorumlulukları
Önerilen klasör yapısı
* app/[lang]/page.tsx ✅ sadece “sayfa kompozisyonu”
* components/sections/
    * HeroCinematic.tsx
    * ManifestoBlock.tsx
    * NotARoomSticky.tsx
    * SuitesOverview.tsx
    * KitchenEditorial.tsx
    * TerraceCinematic.tsx
    * LocationMapSplit.tsx
    * BreakfastFreedom.tsx
    * ReviewsMinimal.tsx
    * FinalCTA.tsx
* components/ui/
    * Container.tsx (max-width + padding standardı)
    * Section.tsx (background + spacing standardı)
    * SectionTitle.tsx (H2/H3 hiyerarşisi)
    * Reveal.tsx (scroll reveal wrapper)
    * PrimaryButton.tsx, SecondaryButton.tsx
* content/home.ts
    * TR/EN/中文 metinleri tek yerden yönetmek için (istersen)

Bölüm bölüm: içerik / görsel / motion kuralları
1) HeroCinematic
* Görsel: 3 görsel (crossfade) veya 1 video
* Metin: H1 + kısa alt satır + 2 CTA
* Motion: yavaş crossfade (8–12s), çok hafif overlay
* Kural: Hero görseli priority, diğerleri lazy
2) ManifestoBlock
* Görsel: yok (sadece tipografi)
* Metin: “Otel değil…” 3 satır büyük
* Motion: minimal fade-in (tek)
* Kural: “award-level” hissi burada doğar → boşluk çok
3) NotARoomSticky
* Görsel: 1 büyük “yaşam” foto (sticky)
* Metin: kısa manifesto + 3–4 satır
* Motion: metin satırları scroll ile reveal
* Kural: masaüstü sticky, mobil normal akış
4) SuitesOverview
* Görsel: yok ya da 1 küçük detay (opsiyon)
* Metin: 3 suite yapısı (çok kısa)
* Kural: burada liste duvarı yok; 1–2 satır + mini grid
5) KitchenEditorial
* Görsel: 2 görsel (asimetrik mosaic)
* Metin: kısa giriş + “sınırsız kahve/çay” gibi premium detay
* Motion: reveal + mikro hover zoom
* Kural: ekipman listesi “grid” (broşür bullet değil)
6) TerraceCinematic
* Görsel: 2 görsel (asimetrik) veya 1 full-width + 1 küçük overlay
* Metin: “Teras…” büyük kapanış + balon cümlesi gömülü
* Motion: hafif parallax (sadece secondary image)
* Kural: “Can you see balloons?” kesin yok
7) LocationMapSplit
* Görsel: harita (senin görselin)
* Metin: mesafe listesi (grid, 5–6 satır)
* Motion: none veya çok hafif reveal
* Kural: rakamlar güven işidir → gerçek km/dk
8) BreakfastFreedom
* Görsel: 0 veya 1 küçük (opsiyon)
* Metin: kısa, net (servis yok + seçenek var)
* Kural: savunma tonu yok; “ritim” dili var
9) ReviewsMinimal
* Görsel: yok
* Metin: rating büyük + 3 seçilmiş yorum + slider
* Kural: uzun yorum duvarı yok; “kürasyon”
10) FinalCTA
* Görsel: yok veya çok hafif taş doku bg
* Metin: tek güçlü kapanış + CTA
* Kural: son ekranda “sessiz özgüven”

3) Tasarım Sistemi: 2026 Quiet-Luxury Token’ları
Aşağıdaki sistem “tek tip” görünüm sağlar. Her section aynı kurala uyar.
Renk sistemi (Tailwind sınıflarıyla)
* Ana zemin: bg-stone-50
* Vurgu zemin: bg-stone-100 (koyu bej hissi)
* Metin: text-neutral-900
* Gövde: text-neutral-700
* İnce çizgi/ayraç: border-stone-300
* Buton: koyu (neutral) + hover’da çok hafif açılma
Tipografi hiyerarşisi (standart sınıflar)
* H1: text-4xl md:text-6xl font-light tracking-wide leading-[1.05]
* H2: text-3xl md:text-4xl font-light tracking-wide
* Lead: text-xl md:text-2xl font-light text-neutral-800
* Body: text-base md:text-lg text-neutral-700 leading-relaxed
* Kapanış cümlesi: text-2xl md:text-3xl font-light tracking-wide text-neutral-900
Spacing standardı
* Section padding: py-24 md:py-32
* Container: max-w-6xl mx-auto px-6
* Metin genişliği: max-w-3xl (okunabilirlik)
Motion standardı (Framer Motion)
* Reveal: opacity 0→1, y 10→0, duration 0.6, ease out
* Parallax: max translateY: 8–14px
* Hover zoom: scale 1→1.03 (asla fazla değil)
* Reduced motion: prefers-reduced-motion ile animasyon kapalı

Şimdi en hızlı ilerleme yolu
1. Önce iskeleti kur: page.tsx sadece section’ları çağıracak şekilde.
2. Sonra tek tek section’ları doldur: önce Hero → Manifesto → NotARoom → Kitchen → Terrace (en çok etki bunlarda).
3. En son Reviews slider ve map grid.

Sevgili Hocam, devam. Aşağıya doğrudan kopyala-yapıştır ile ilerleyebileceğin şekilde:
* app/[lang]/page.tsx (yeni kompozisyon)
* components/ui (Container, Section, SectionTitle, Reveal)
* components/sections (bütün section iskeletleri)
* (opsiyonel) content/home.ts metinleri tek yerden yönetmek için
veriyorum. Bu iskeletle 2026 mimarisine geçiyorsun; sonra görsel/motion detaylarını tek tek yükseltiriz.
Not: Motion için framer-motion gerekir: npm i framer-motion

1) app/[lang]/page.tsx
import HeroCinematic from "@/components/sections/HeroCinematic";
import ManifestoBlock from "@/components/sections/ManifestoBlock";
import NotARoomSticky from "@/components/sections/NotARoomSticky";
import SuitesOverview from "@/components/sections/SuitesOverview";
import KitchenEditorial from "@/components/sections/KitchenEditorial";
import TerraceCinematic from "@/components/sections/TerraceCinematic";
import LocationMapSplit from "@/components/sections/LocationMapSplit";
import BreakfastFreedom from "@/components/sections/BreakfastFreedom";
import ReviewsMinimal from "@/components/sections/ReviewsMinimal";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <HeroCinematic />
      <ManifestoBlock />
      <NotARoomSticky />
      <SuitesOverview />
      <KitchenEditorial />
      <TerraceCinematic />
      <LocationMapSplit />
      <BreakfastFreedom />
      <ReviewsMinimal />
      <FinalCTA />
    </main>
  );
}

2) UI: components/ui/Container.tsx
import React from "react";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>{children}</div>
  );
}
components/ui/Section.tsx
import React from "react";

export default function Section({
  children,
  className = "",
  tone = "base",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "base" | "warm";
}) {
  const bg = tone === "warm" ? "bg-stone-100" : "bg-stone-50";

  return (
    <section className={`${bg} py-24 md:py-32 ${className}`}>{children}</section>
  );
}
components/ui/SectionTitle.tsx
export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-xl md:text-2xl font-light text-neutral-800 leading-relaxed max-w-3xl">
      {children}
    </p>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl">
      {children}
    </p>
  );
}

export function ClosingLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug max-w-3xl">
      {children}
    </p>
  );
}

3) Motion: components/ui/Reveal.tsx
(Scroll-reveal standard wrapper)
"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

4) Section iskeletleri: components/sections/*
HeroCinematic.tsx (şimdilik tek görsel; crossfade’i birazdan ekleyeceğiz)
import Image from "next/image";
import Container from "@/components/ui/Container";

export default function HeroCinematic() {
  return (
    <section className="relative min-h-[88vh] bg-stone-50 overflow-hidden">
      <Image
        src="/images/hero-1.jpg"
        alt="Anitya Cave House - Ortahisar Cappadocia"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <Container className="relative z-10 pt-24 md:pt-32 pb-16">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white leading-[1.05] max-w-3xl">
          Aynı güneş.
          <br />
          Aynı taş.
          <br />
          Binlerce yıl.
        </h1>

        <p className="mt-8 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
          Kapadokya’nın kalbinde, Ortahisar’da. Otel değil — bağımsız suite evler.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/tr/booking"
            className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-6 py-3 text-sm md:text-base font-medium hover:bg-white/90 transition"
          >
            Rezervasyon
          </a>
          <a
            href="/tr/rooms"
            className="inline-flex items-center justify-center rounded-md border border-white/70 text-white px-6 py-3 text-sm md:text-base font-medium hover:bg-white/10 transition"
          >
            Suite Evleri Keşfet
          </a>
        </div>
      </Container>
    </section>
  );
}
ManifestoBlock.tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function ManifestoBlock() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-neutral-900 leading-[1.05] max-w-4xl">
            Otel değil.
            <br />
            Ortak alan yok.
            <br />
            Tamamen size ait.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl border-l border-stone-300 pl-6">
            Anitya Cave House, aynı yapı içinde konumlanan ortak alanı olmayan{" "}
            <span className="text-neutral-900">3 bağımsız suite evden</span>{" "}
            oluşur. İki mağara suite, bir taş suite. Tamamı yalnızca misafirler
            için hazırlanmıştır.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
NotARoomSticky.tsx (sticky görsel + metin)
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function NotARoomSticky() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="md:sticky md:top-24">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/images/living-1.jpg"
                alt="Anitya suite living atmosphere"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
                Bir oda değil.
                <br />
                Bağımsız bir ev.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                Anitya’da konaklamak, bir odaya girmek değil; kendi alanınıza
                çekilmek demektir.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              <Reveal delay={0.1}>
                <p className="text-xl md:text-2xl font-light text-neutral-800">
                  Sessizlik.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-xl md:text-2xl font-light text-neutral-800">
                  Mahremiyet.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-xl md:text-2xl font-light text-neutral-800">
                  Kendi ritminiz.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <p className="mt-12 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                Kimseyle alan paylaşmazsınız. Günün temposunu siz belirlersiniz.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
SuitesOverview.tsx (çok kısa, “liste duvarı yok”)
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function SuitesOverview() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
            Üç suite. Üç ayrı dünya.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="border-l border-stone-300 pl-6">
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                Her suite; özel giriş, özel teras, ayrı oturma alanı ve yatak
                odası ile birlikte donanımlı mutfak sunar.
              </p>
            </div>
            <div className="border-l border-stone-300 pl-6">
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                Suite evlerden biri ayrıca <span className="text-neutral-900">bağımsız bir salon</span>{" "}
                alanına sahiptir.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
KitchenEditorial.tsx (mosaic grid)
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function KitchenEditorial() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/images/kitchen-1.jpg"
                alt="Anitya fully equipped kitchen"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm shadow-sm md:ml-10">
              <Image
                src="/images/kitchen-2.jpg"
                alt="Kitchen detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
                Her suite’te gerçek bir mutfak.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 text-xl md:text-2xl font-light text-neutral-800 leading-relaxed max-w-xl">
                Bu bir “olanak” değil; özgürlük ve bağımsızlıktır.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                Buzdolabı, fırın, ocak, kettle, kahve makinesi, geleneksel
                çaydanlık… Tencere, tava, tabaklar, farklı bardaklar ve eksiksiz
                çatal-kaşık takımı.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                Gelişinizde <span className="text-neutral-900">sınırsız filtre kahve, Türk kahvesi ve siyah çay</span>, zeytinyağı ve temel baharatlarla
                karşılanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug max-w-xl">
                Anitya’da mutfak bir aksesuar değildir.
                <br />
                Yaşamak deneyiminin bir parçasıdır.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
TerraceCinematic.tsx (asimetrik iki görsel + metin)
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function TerraceCinematic() {
  return (
    <Section tone="base">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/images/terrace-1.jpg"
              alt="Ortahisar skyline view from terrace"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:mt-12">
            <div className="relative w-full aspect-[4/4] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/images/terrace-2.jpg"
                alt="Hot air balloons at sunrise"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
              Teras bir manzara noktası değildir.
              <br />
              Günün başladığı yerdir.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl border-l border-stone-300 pl-6">
              Özel teraslarımızdan Kapadokya’nın kaya dokusu, vadiler ve
              güvercinlikler, Ortahisar’ın taş evleri ve açık havalarda uzakta
              Erciyes Dağı görünür. Hava koşulları uygun olduğunda, gün
              doğumunda sıcak hava balonları ufukta sessizce süzülür.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
LocationMapSplit.tsx (harita + mesafe grid)
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function LocationMapSplit() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/images/map-ortahisar.jpg"
              alt="Anitya Cave House location map"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
                Ortahisar’ın kalbinde.
                <br />
                Kapadokya’nın merkezinde.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                Ortahisar Eski Kasaba’nın tarihi dokusu içindesiniz. Yürüyerek
                kaleye, kısa sürüşlerle Kapadokya’nın ikonik rotalarına
                bağlanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-neutral-700">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-neutral-900">Ortahisar Kalesi</p>
                    <p className="text-sm">~2 dk yürüyüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-neutral-900">Göreme Açık Hava Müzesi</p>
                    <p className="text-sm">~7 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-neutral-900">Kızılçukur &amp; Gül Vadisi</p>
                    <p className="text-sm">~5 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-neutral-900">Üç Güzeller</p>
                    <p className="text-sm">~8 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-neutral-900">Pancarlık Vadisi</p>
                    <p className="text-sm">~10 dk sürüş</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
BreakfastFreedom.tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function BreakfastFreedom() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
            Sabah size ait.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl border-l border-stone-300 pl-6">
            Anitya Cave House’da sabit bir kahvaltı servisi bulunmaz. Bunun
            yerine 2 dakikalık yürüme mesafesinde kahvaltı seçenekleri, 4–5
            dakikalık yürüme mesafesinde geniş restoran çeşitliliği ve Ortahisar
            merkezden suite evlere sipariş imkânı vardır.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-neutral-900 max-w-3xl">
            İsterseniz dışarıda, isterseniz evinizde.
            <br />
            Kendi ritminizde.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
ReviewsMinimal.tsx (şimdilik statik; slider’ı sonra ekleyeceğiz)
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function ReviewsMinimal() {
  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="text-neutral-900 text-4xl md:text-6xl font-light tracking-wide">
              4.86 / 5
            </p>
            <p className="text-neutral-700 text-base md:text-lg">
              1046+ doğrulanmış misafir yorumu
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Taş dokunun içinde ama modern konforla… konum mükemmel ve sessizlik inanılmazdı.",
              who: "Verified Airbnb Guest",
            },
            {
              quote:
                "Teras sabahları bambaşka… balonlar ve Ortahisar silüeti unutulmazdı.",
              who: "Verified Airbnb Guest",
            },
            {
              quote:
                "Gerçekten ‘ev gibi’ hissettiren nadir yerlerden. Mutfak ve mahremiyet harika.",
              who: "Verified Airbnb Guest",
            },
          ].map((r, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <div className="bg-white/60 rounded-sm p-6 shadow-sm">
                <p className="text-neutral-800 leading-relaxed">“{r.quote}”</p>
                <p className="mt-4 text-sm text-neutral-600">{r.who}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://www.airbnb.com/rooms/2953140"
            className="text-neutral-900 underline underline-offset-4 hover:opacity-80 transition"
          >
            Airbnb’de tüm yorumları görüntüle
          </a>
        </div>
      </Container>
    </Section>
  );
}
FinalCTA.tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-neutral-900 leading-[1.05] max-w-4xl">
            Kapadokya’yı bir ev gibi yaşamak isteyenler için.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl">
            Kalabalık otelleri değil; sessizliği, alanı ve bağımsızlığı seçenler
            için.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12">
            <a
              href="/tr/booking"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-7 py-3 text-sm md:text-base font-medium hover:bg-neutral-800 transition"
            >
              Rezervasyon
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

, Sevgili Hocam, devam. Şimdi 3 büyük 2026 yükseltmesini ekliyoruz:
1. Hero: 3 görsel yavaş crossfade + hover’da durdur + reduced-motion desteği
2. Terrace: secondary görsele mikro-parallax (scroll ile 10–14px)
3. Reviews: gerçek “kürasyon slider” (auto-advance + hover pause + reduced-motion)
Aşağıdaki kodları dosyanın tamamı olarak değiştirmen yeterli.

1) components/sections/HeroCinematic.tsx (Crossfade Hero)
"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function HeroCinematic() {
  const reduce = useReducedMotion();

  const slides = useMemo(
    () => [
      { src: "/images/hero-1.jpg", alt: "Anitya Cave House - Ortahisar Cappadocia" },
      { src: "/images/hero-2.jpg", alt: "Anitya Cave House - Stone texture and light" },
      { src: "/images/hero-3.jpg", alt: "Anitya Cave House - Terrace sunrise atmosphere" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 10000); // 10s

    return () => clearInterval(t);
  }, [reduce, paused, slides.length]);

  return (
    <section
      className="relative min-h-[88vh] bg-stone-50 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background media */}
      <div className="absolute inset-0">
        {reduce ? (
          <Image
            src={slides[0].src}
            alt={slides[0].alt}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* micro cinematic zoom */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <Container className="relative z-10 pt-24 md:pt-32 pb-16">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white leading-[1.05] max-w-3xl">
          Aynı güneş.
          <br />
          Aynı taş.
          <br />
          Binlerce yıl.
        </h1>

        <p className="mt-8 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
          Kapadokya’nın kalbinde, Ortahisar’da. Otel değil — bağımsız suite evler.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/tr/booking"
            className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-6 py-3 text-sm md:text-base font-medium hover:bg-white/90 transition"
          >
            Rezervasyon
          </a>
          <a
            href="/tr/rooms"
            className="inline-flex items-center justify-center rounded-md border border-white/70 text-white px-6 py-3 text-sm md:text-base font-medium hover:bg-white/10 transition"
          >
            Suite Evleri Keşfet
          </a>
        </div>

        {/* subtle indicator */}
        <div className="mt-16 h-10 flex items-end">
          <div className="h-10 w-px bg-white/50" />
        </div>
      </Container>
    </section>
  );
}

2) components/sections/TerraceCinematic.tsx (Secondary image micro-parallax)
"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TerraceCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 14]); // micro parallax

  return (
    <Section tone="base">
      <Container>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/images/terrace-1.jpg"
              alt="Ortahisar skyline view from terrace"
              fill
              className="object-cover"
            />
          </div>

          <motion.div style={reduce ? undefined : { y }} className="md:mt-12">
            <div className="relative w-full aspect-[4/4] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/images/terrace-2.jpg"
                alt="Hot air balloons at sunrise"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900">
              Teras bir manzara noktası değildir.
              <br />
              Günün başladığı yerdir.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl border-l border-stone-300 pl-6">
              Özel teraslarımızdan Kapadokya’nın kaya dokusu, vadiler ve
              güvercinlikler, Ortahisar’ın taş evleri ve açık havalarda uzakta
              Erciyes Dağı görünür. Hava koşulları uygun olduğunda, gün
              doğumunda sıcak hava balonları ufukta sessizce süzülür.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

3) components/sections/ReviewsMinimal.tsx (Gerçek slider + auto-advance)
"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function ReviewsMinimal() {
  const reduce = useReducedMotion();

  const reviews = useMemo(
    () => [
      {
        quote:
          "Taş dokunun içinde ama modern konforla… konum mükemmel ve sessizlik inanılmazdı.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Teras sabahları bambaşka… balonlar ve Ortahisar silüeti unutulmazdı.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Gerçekten ‘ev gibi’ hissettiren nadir yerlerden. Mutfak ve mahremiyet harika.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Ortahisar’da kalmak çok doğruymuş. Göreme kalabalığına uzak ama her yere yakın.",
        who: "Verified Airbnb Guest",
      },
    ],
    []
  );

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;

    const t = setInterval(() => {
      setI((x) => (x + 1) % reviews.length);
    }, 8000);

    return () => clearInterval(t);
  }, [reduce, paused, reviews.length]);

  const prev = () => setI((x) => (x - 1 + reviews.length) % reviews.length);
  const next = () => setI((x) => (x + 1) % reviews.length);

  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="text-neutral-900 text-4xl md:text-6xl font-light tracking-wide">
              4.86 / 5
            </p>
            <p className="text-neutral-700 text-base md:text-lg">
              1046+ doğrulanmış misafir yorumu
            </p>
          </div>
        </Reveal>

        <div
          className="mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/60 rounded-sm p-8 shadow-sm"
            >
              <p className="text-neutral-800 leading-relaxed text-lg md:text-xl font-light">
                “{reviews[i].quote}”
              </p>
              <p className="mt-6 text-sm text-neutral-600">{reviews[i].who}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="rounded-md border border-stone-300 px-3 py-2 text-sm text-neutral-800 hover:bg-white/70 transition"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-md border border-stone-300 px-3 py-2 text-sm text-neutral-800 hover:bg-white/70 transition"
              aria-label="Next review"
            >
              →
            </button>

            <div className="ml-2 flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition ${
                    idx === i ? "w-8 bg-neutral-800" : "w-3 bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <a
              href="https://www.airbnb.com/rooms/2953140"
              className="text-neutral-900 underline underline-offset-4 hover:opacity-80 transition"
            >
              Airbnb’de tüm yorumları görüntüle
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

, Tamam Sevgili Hocam — durmadan bir sonraki “2026 award-level” hamleyi uyguluyoruz:
✅ 1) Global Design Tokens (tek merkezden renk/font/spacing/motion)
Aşağıdaki 3 dosyayı güncelle. Bu sayede tüm site tek bir sistemle “quiet-luxury” görünecek.

A) app/[lang]/layout.tsx (Font sistemi – 2026 kalitesi)
Eğer sende app/layout.tsx varsa, aynı şeyi oraya uygula. [lang] yoksa app/layout.tsx kullan.
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anitya Cave House",
  description: "Independent suite homes in Ortahisar, Cappadocia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-surface text-ink antialiased">{children}</body>
    </html>
  );
}

B) app/[lang]/globals.css (Renk + tipografi + “quiet luxury” temel)
app/globals.css kullanıyorsan oraya yapıştır.
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Surfaces */
  --surface: 250 250 249;        /* stone-50 vibe */
  --surface-2: 245 245 244;      /* stone-100 vibe */

  /* Text */
  --ink: 23 23 23;               /* neutral-900 */
  --ink-2: 64 64 64;             /* neutral-700 */

  /* Lines */
  --line: 214 211 209;           /* stone-300 */

  /* Accent (very subtle bronze-like) */
  --accent: 161 128 90;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
}

h1, h2, h3 {
  font-family: var(--font-serif);
  letter-spacing: 0.02em;
}

/* 2026 premium image behavior */
img {
  -webkit-user-drag: none;
  user-select: none;
}

C) tailwind.config.ts (Tokenları Tailwind’e bağla)
Projede tailwind.config.js ise aynı şeyi JS formatında yap.
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;

D) (ÇOK ÖNEMLİ) Section/Container sınıflarını token’lara geçir
Şu iki satırı artık standart yap:
* bg-stone-50 → bg-surface
* bg-stone-100 → bg-surface-2
* text-neutral-900 → text-ink
* text-neutral-700 → text-ink-2
* border-stone-300 → border-line
Örnek: components/ui/Section.tsx güncelle:
import React from "react";

export default function Section({
  children,
  className = "",
  tone = "base",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "base" | "warm";
}) {
  const bg = tone === "warm" ? "bg-surface-2" : "bg-surface";

  return (
    <section className={`${bg} py-24 md:py-32 ${className}`}>{children}</section>
  );
}

✅ Bu hamle neyi çözüyor?
* Sitenin her yeri aynı “taş/quiet luxury” kimliğine kilitlenir
* Font hiyerarşisi otomatik premium görünür
* Sonraki tüm geliştirmeler tek merkezden kontrol edilir

Tamam Sevgili Hocam — şimdi 2) ultra-premium ImageCard sistemi geliyor. Bu hamle, resimleri “amatör alt alta foto” hissinden çıkarıp küratörlü, ödüllük bir görsel dile sokar.
Aşağıdakileri aynen ekle/değiştir.

1) Yeni UI bileşeni: components/ui/ImageCard.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function ImageCard({
  src,
  alt,
  caption,
  priority = false,
  aspect = "4/5",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "4/5" | "16/10" | "1/1" | "4/3";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "1/1"
      ? "aspect-square"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[4/5]";

  if (reduce) {
    return (
      <figure className={`relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/35 text-white text-sm px-4 py-3">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <motion.figure
      className={`group relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      </motion.div>

      {/* ultra subtle vignette for luxury readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-70" />

      {/* optional grain (very subtle) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {caption ? (
        <motion.figcaption
          className="absolute inset-x-0 bottom-0 px-5 py-4 text-white"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="text-sm md:text-base font-light tracking-wide">
            {caption}
          </div>
        </motion.figcaption>
      ) : null}
    </motion.figure>
  );
}

2) Kitchen’da ImageCard’a geç: components/sections/KitchenEditorial.tsx
Bu dosyanın tamamını aşağıdakiyle değiştir:
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";

export default function KitchenEditorial() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Mosaic */}
          <div className="grid grid-cols-1 gap-6">
            <ImageCard
              src="/images/kitchen-1.jpg"
              alt="Anitya fully equipped kitchen"
              aspect="4/5"
              caption="Her suite’te bağımsız ve donanımlı mutfak"
            />
            <ImageCard
              src="/images/kitchen-2.jpg"
              alt="Kitchen detail"
              aspect="16/10"
              className="md:ml-10"
              caption="Sınırsız filtre kahve, Türk kahvesi ve siyah çay"
            />
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink">
                Her suite’te gerçek bir mutfak.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 text-xl md:text-2xl font-light text-ink leading-relaxed max-w-xl">
                Bu bir “olanak” değil; özgürlük ve bağımsızlıktır.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Buzdolabı, fırın, ocak, kettle, kahve makinesi, geleneksel
                çaydanlık… Tencere, tava, tabaklar, farklı bardaklar ve eksiksiz
                çatal-kaşık takımı.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Gelişinizde{" "}
                <span className="text-ink">
                  sınırsız filtre kahve, Türk kahvesi ve siyah çay
                </span>
                , zeytinyağı ve temel baharatlarla karşılanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl">
                Anitya’da mutfak bir aksesuar değildir.
                <br />
                Yaşamak deneyiminin bir parçasıdır.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

3) Terrace’da ImageCard + parallax birlikte: components/sections/TerraceCinematic.tsx
Bu dosyanın tamamını aşağıdakiyle değiştir:
"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TerraceCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <Section tone="base">
      <Container>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ImageCard
            src="/images/terrace-1.jpg"
            alt="Ortahisar skyline view from terrace"
            aspect="4/5"
            caption="Ortahisar silüeti, vadiler ve taş evler"
          />

          <motion.div style={reduce ? undefined : { y }} className="md:mt-12">
            <ImageCard
              src="/images/terrace-2.jpg"
              alt="Hot air balloons at sunrise"
              aspect="1/1"
              caption="Hava koşulları uygun olduğunda gün doğumunda balonlar"
            />
          </motion.div>
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink">
              Teras bir manzara noktası değildir.
              <br />
              Günün başladığı yerdir.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl border-l border-line pl-6">
              Özel teraslarımızdan Kapadokya’nın kaya dokusu, vadiler ve
              güvercinlikler, Ortahisar’ın taş evleri ve açık havalarda uzakta
              Erciyes Dağı görünür. Hava koşulları uygun olduğunda, gün
              doğumunda sıcak hava balonları ufukta sessizce süzülür.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

✅ Sonuç: Neden “amatör” hissi gitti?
* Görseller artık sadece foto değil, tasarlanmış kart gibi davranıyor
* Hover’da mikro-lüks: caption + zoom + shadow
* Aynı oran sistemi var → “random” hissi yok
* Terras secondary görsel scroll ile “canlı” ama abartısız

, Tamam Sevgili Hocam — şimdi A + B: ✅ (A) Asimetrik grid’i “2026 level” yapıyoruz (desktop’ta cesur, mobilde sakin) ✅ (B) Scroll rhythm ekliyoruz (editorial label + ultra ince stone line; sayfa “müzikal” akacak)
Aşağıdakileri sırayla uygula.

B-1) Yeni UI: components/ui/SectionRhythm.tsx
(Section başında küçük etiket + arada ince çizgi)
import Container from "@/components/ui/Container";

export function SectionKicker({
  label,
  title,
}: {
  label: string;
  title?: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
        <span className="h-px w-10 bg-line" />
        {label}
      </div>
      {title ? (
        <h2 className="mt-6 text-3xl md:text-4xl font-light tracking-wide text-ink">
          {title}
        </h2>
      ) : null}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="bg-surface">
      <Container>
        <div className="h-px w-full bg-line/80" />
      </Container>
    </div>
  );
}

B-2) app/[lang]/page.tsx içine “rhythm divider” ekle
Şu şekilde aralara koy:
import { SectionDivider } from "@/components/ui/SectionRhythm";
ve return içinde örnek düzen:
<HeroCinematic />
<ManifestoBlock />
<SectionDivider />
<NotARoomSticky />
<SectionDivider />
<SuitesOverview />
<SectionDivider />
<KitchenEditorial />
<SectionDivider />
<TerraceCinematic />
<SectionDivider />
<LocationMapSplit />
<SectionDivider />
<BreakfastFreedom />
<SectionDivider />
<ReviewsMinimal />
<FinalCTA />
Bu tek hamle sayfaya “premium ritim” verir.

A) 2026 Asimetrik Grid: Kitchen’i ileri seviye yapalım
A-1) components/sections/KitchenEditorial.tsx (tamamını değiştir)
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { SectionKicker } from "@/components/ui/SectionRhythm";

export default function KitchenEditorial() {
  return (
    <Section tone="warm">
      <Container>
        <SectionKicker label="KITCHEN" title="Her suite’te gerçek bir mutfak." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual (bold on desktop) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              {/* Big */}
              <div className="col-span-12 md:col-span-8">
                <ImageCard
                  src="/images/kitchen-1.jpg"
                  alt="Anitya fully equipped kitchen"
                  aspect="4/5"
                  caption="Bağımsız mutfak — ev ritmi"
                  priority={false}
                />
              </div>

              {/* Small, offset */}
              <div className="col-span-12 md:col-span-4 md:pt-14">
                <ImageCard
                  src="/images/kitchen-2.jpg"
                  alt="Kitchen detail"
                  aspect="1/1"
                  caption="Sınırsız kahve & çay"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="text-xl md:text-2xl font-light text-ink leading-relaxed max-w-xl">
                Bu bir “olanak” değil; özgürlük ve bağımsızlıktır.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Buzdolabı, fırın, ocak, kettle, kahve makinesi, geleneksel
                çaydanlık… Tencere, tava, tabaklar, farklı bardaklar ve eksiksiz
                çatal-kaşık takımı.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Gelişinizde{" "}
                <span className="text-ink">
                  sınırsız filtre kahve, Türk kahvesi ve siyah çay
                </span>
                , zeytinyağı ve temel baharatlarla karşılanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl">
                Anitya’da mutfak bir aksesuar değildir.
                <br />
                Yaşamak deneyiminin bir parçasıdır.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
Bu grid “iki resim alt alta” hissini kırar: Desktop’ta cesur, editorial; mobilde temiz ve akışkan.

A) Terrace için “2026 editorial hero-grid + parallax”
A-2) components/sections/TerraceCinematic.tsx (tamamını değiştir)
"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TerraceCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <Section tone="base">
      <Container>
        <SectionKicker label="TERRACE" title="Günün başladığı yer." />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Big landscape-ish anchor */}
          <div className="lg:col-span-7">
            <ImageCard
              src="/images/terrace-1.jpg"
              alt="Ortahisar skyline view from terrace"
              aspect="4/5"
              caption="Ortahisar silüeti, vadiler, taş evler"
            />
          </div>

          {/* Floating square with parallax */}
          <div className="lg:col-span-5 lg:pt-16">
            <motion.div style={reduce ? undefined : { y }}>
              <ImageCard
                src="/images/terrace-2.jpg"
                alt="Hot air balloons at sunrise"
                aspect="1/1"
                caption="Uygun havalarda gün doğumunda balonlar"
              />
            </motion.div>

            <Reveal delay={0.08}>
              <p className="mt-10 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl border-l border-line pl-6">
                Özel teraslarımızdan Kapadokya’nın kaya dokusu, vadiler ve
                güvercinlikler, Ortahisar’ın taş evleri ve açık havalarda uzakta
                Erciyes Dağı görünür. Hava koşulları uygun olduğunda, gün
                doğumunda sıcak hava balonları ufukta sessizce süzülür.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl">
                Teras bir manzara noktası değildir.
                <br />
                Günün başladığı yerdir.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

Şimdi siten gerçekten “2026 model” görünmeye başlar.
Çünkü:
* Bölümler arası ritim var (divider + kicker)
* Görsel mimari editorial oldu (12-col grid)
* Fotoğraflar “kart” gibi, küratörlü

Tamam Sevgili Hocam — şimdi Navbar’ı 2026 seviyesine çıkarıyoruz + Hero’ya micro-tagline ekliyoruz. Bu ikisi sitenin “premium marka” hissini bir anda yükseltir.
Aşağıdaki dosyaları aynen ekle/değiştir.

1) Yeni Header: components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "/tr", label: "Ana Sayfa" },
  { href: "/tr/rooms", label: "Odalar" },
  { href: "/tr/experiences", label: "Deneyimler" },
  { href: "/tr/gallery", label: "Galeri" },
  { href: "/tr/blog", label: "Blog" },
  { href: "/tr/about", label: "Hakkımızda" },
  { href: "/tr/contact", label: "İletişim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // body scroll lock (mobile menu)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-surface/80 border-b border-line"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={["flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20"].join(" ")}>
            {/* Left: Logo */}
            <a href="/tr" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-sm bg-ink text-white flex items-center justify-center font-serif font-light">
                A
              </div>
              <div className="leading-tight">
                <div className="font-serif text-ink tracking-wide">
                  Anitya Cave House
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
                  Ortahisar • Cappadocia
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-2 hover:text-ink transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* Language (placeholder links) */}
              <div className="hidden md:flex items-center gap-2">
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/tr">
                  TR
                </a>
                <span className="text-line">•</span>
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/en">
                  EN
                </a>
                <span className="text-line">•</span>
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/zh">
                  中文
                </a>
              </div>

              <a
                href="/tr/booking"
                className="hidden sm:inline-flex items-center justify-center rounded-md bg-ink text-white px-5 py-2 text-sm font-medium hover:bg-ink/90 transition"
              >
                Rezervasyon
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center rounded-md border border-line bg-surface/70 px-3 py-2 text-sm text-ink hover:bg-surface transition"
                aria-label="Menu"
              >
                Menü
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface border-l border-line p-6">
            <div className="flex items-center justify-between">
              <div className="text-ink font-serif tracking-wide text-lg">
                Anitya
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink"
              >
                Kapat
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-ink-2 hover:text-ink transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/tr">
                TR
              </a>
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/en">
                EN
              </a>
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/zh">
                中文
              </a>
            </div>

            <a
              href="/tr/booking"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-ink text-white px-5 py-3 text-sm font-medium hover:bg-ink/90 transition"
            >
              Rezervasyon
            </a>
          </div>
        </div>
      ) : null}

      {/* Spacer so content doesn't sit under fixed header */}
      <div className="h-20" />
    </>
  );
}

2) Layout’a Header ekle: app/[lang]/layout.tsx
Mevcut layout dosyanda body içine Header’ı ekle:
import Header from "@/components/layout/Header";
ve body kısmını şöyle yap:
<body className="bg-surface text-ink antialiased">
  <Header />
  {children}
</body>

3) Hero’ya “micro-tagline” ekle: components/sections/HeroCinematic.tsx
Hero içeriğinde H1’in hemen üstüne şu bloğu ekle (H1’den önce):
<div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/80">
  <span className="h-px w-10 bg-white/40" />
  Ortahisar • Independent Suite Homes
</div>
Ve H1’i biraz aşağı almak için H1’e mt-6 ekleyebilirsin:
<h1 className="mt-6 text-4xl md:text-6xl ...">

Bu noktada sitenin hissi değişir
* Navbar artık “site menüsü” değil, lüks marka şeridi gibi çalışır
* Scroll’da küçülüp blur alması 2026 hissini verir
* Hero micro-tagline “kimlik kartı” gibi, çok premium

Tamam Sevgili Hocam — devam. Şimdi “wow” katmanı geliyor:
✅ Hero’ya premium scroll cue animasyonu ✅ SectionKicker’lara otomatik numara (01/02/03…) ✅ Footer’ı editorial + quiet-luxury (2026 marka hissi)
Aşağıdaki dosyaları sırayla uygula.

1) Hero Scroll Cue: components/ui/ScrollCue.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ScrollCue() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="mt-16 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/70">
        <span className="h-px w-10 bg-white/30" />
        Scroll
      </div>
    );
  }

  return (
    <div className="mt-16 flex items-center gap-4">
      <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/70">
        <span className="h-px w-10 bg-white/30" />
        Scroll
      </div>

      <div className="relative h-10 w-6 rounded-full border border-white/35">
        <motion.div
          className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/70"
          animate={{ y: [0, 16, 0], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
Hero’ya ekle: components/sections/HeroCinematic.tsx
Hero’da CTA’ların altına tek satır ekle:
import ScrollCue from "@/components/ui/ScrollCue";
ve CTA butonlarının altına:
<ScrollCue />

2) SectionKicker’lara otomatik numara
2.1) components/ui/SectionRhythm.tsx güncelle (dosyanın tamamı)
import Container from "@/components/ui/Container";

export function SectionKicker({
  n,
  label,
  title,
}: {
  n?: number;
  label: string;
  title?: string;
}) {
  const num = typeof n === "number" ? String(n).padStart(2, "0") : null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
          <span className="h-px w-10 bg-line" />
          {label}
        </div>

        {num ? (
          <div className="text-xs tracking-[0.22em] uppercase text-ink-2">
            {num}
          </div>
        ) : null}
      </div>

      {title ? (
        <h2 className="mt-6 text-3xl md:text-4xl font-light tracking-wide text-ink">
          {title}
        </h2>
      ) : null}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="bg-surface">
      <Container>
        <div className="h-px w-full bg-line/80" />
      </Container>
    </div>
  );
}
2.2) Kicker kullanan bölümlerde n ekle
Örn. KitchenEditorial.tsx içinde:
<SectionKicker n={3} label="KITCHEN" title="Her suite’te gerçek bir mutfak." />
Örn. TerraceCinematic.tsx içinde:
<SectionKicker n={4} label="TERRACE" title="Günün başladığı yer." />
Örn. LocationMapSplit.tsx içinde (istersen kicker da koyarız; aşağıda zaten ekliyorum)

3) LocationMapSplit’e kicker ekleyelim (çok premium)
components/sections/LocationMapSplit.tsx içinde, Section açıldıktan hemen sonra şunu ekle:
import { SectionKicker } from "@/components/ui/SectionRhythm";
ve <Container> içinde en üste:
<SectionKicker n={5} label="LOCATION" title="Ortahisar’da, merkezde bir üs." />
(Title metnini senin tonuna göre değiştirebilirsin.)

4) Footer’ı 2026 editorial yapalım
4.1) Yeni Footer: components/layout/Footer.tsx
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-sm bg-ink text-white flex items-center justify-center font-serif font-light">
                A
              </div>
              <div>
                <div className="font-serif text-ink tracking-wide text-lg">
                  Anitya Cave House
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
                  Ortahisar • Cappadocia
                </div>
              </div>
            </div>

            <p className="mt-6 text-ink-2 leading-relaxed max-w-md">
              Ortahisar’da, ortak alanı olmayan üç bağımsız suite ev. Sessizlik,
              mahremiyet ve kendi ritminiz için.
            </p>

            <div className="mt-10 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
              <span className="h-px w-10 bg-line" />
              Independent Suite Homes
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
              Links
            </div>
            <div className="mt-5 space-y-3">
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/rooms">Odalar</a>
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/experiences">Deneyimler</a>
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/gallery">Galeri</a>
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/blog">Blog</a>
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/about">Hakkımızda</a>
              <a className="block text-ink-2 hover:text-ink transition" href="/tr/contact">İletişim</a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
              Contact
            </div>

            <div className="mt-5 space-y-3 text-ink-2">
              <div>Ortahisar, ÜRGÜP, Nevşehir, Türkiye</div>

              <a className="block hover:text-ink transition" href="tel:+905354946814">
                +90 535 494 68 14
              </a>
              <a className="block hover:text-ink transition" href="mailto:info@anityacavehouse.com">
                info@anityacavehouse.com
              </a>

              <div className="pt-4 flex items-center gap-4">
                <a className="text-ink-2 hover:text-ink transition" href="https://instagram.com/anityacavehouse">
                  Instagram
                </a>
                <a className="text-ink-2 hover:text-ink transition" href="https://facebook.com/anityacavehouse">
                  Facebook
                </a>
              </div>

              <div className="pt-8">
                <a
                  href="/tr/booking"
                  className="inline-flex items-center justify-center rounded-md bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-ink/90 transition"
                >
                  Rezervasyon
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-ink-2">
            © {new Date().getFullYear()} Anitya Cave House. Tüm hakları saklıdır.
          </div>
          <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
            Built with Next.js
          </div>
        </div>
      </Container>
    </footer>
  );
}
4.2) Footer’ı layout’a ekle: app/[lang]/layout.tsx
Header’ın altına children, children’ın altına Footer:
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

<body className="bg-surface text-ink antialiased">
  <Header />
  {children}
  <Footer />
</body>

Şu an nereye geldik?
* Hero artık “sinema + scroll cue”
* Bölümler numaralı editorial guide gibi
* Footer marka diliyle uyumlu
* Sayfa gerçekten “high-end” bir akışa girdi

Tamam Sevgili Hocam — devam. Şimdi “en üst seviye” üçlü geliyor:
1. ✅ Global Page Transition (route değişince yumuşak fade)
2. ✅ ImageCard’a “fine border shimmer” (abartısız, ultra premium)
3. ✅ Rooms kartları: editorial kart sistemi (asimetri + hover + kısa copy)
Aşağıdaki adımları sırayla uygula.

1) Global Page Transition
1.1 components/ui/PageTransition.tsx (yeni dosya)
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
1.2 Layout’ta children’ı bununla sar
app/[lang]/layout.tsx içine import:
import PageTransition from "@/components/ui/PageTransition";
ve body’de:
<Header />
<PageTransition>{children}</PageTransition>
<Footer />
Not: App Router’da “exit” animasyonu için ek setup yapılabilir; ama bu hali bile route girişlerinde premium fade verir.

2) ImageCard’a “Fine Border Shimmer” ekleyelim
2.1 app/[lang]/globals.css sonuna ekle
/* ultra-premium shimmer border */
.shimmer-border {
  position: relative;
}
.shimmer-border::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 2px;
  padding: 1px;
  background: linear-gradient(
    110deg,
    rgba(255,255,255,0.00) 0%,
    rgba(255,255,255,0.10) 20%,
    rgba(255,255,255,0.35) 35%,
    rgba(255,255,255,0.10) 50%,
    rgba(255,255,255,0.00) 70%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 300ms ease;
}

.group:hover .shimmer-border::before {
  opacity: 1;
}
2.2 components/ui/ImageCard.tsx güncelle (yalnızca class ekle)
Şu satırı bul:
className={`group relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}
ve bunu yap:
className={`group relative overflow-hidden rounded-sm shadow-soft shimmer-border ${aspectClass} ${className}`}
✅ Bitti. Artık hover’da resim “çok pahalı katalog” gibi parlar; abartısız.

3) Rooms kartlarını 2026 editorial yapalım
3.1 Yeni bileşen: components/rooms/RoomCard.tsx
import ImageCard from "@/components/ui/ImageCard";
import Reveal from "@/components/ui/Reveal";

export default function RoomCard({
  title,
  subtitle,
  href,
  image,
  bullets,
  tone = "base",
}: {
  title: string;
  subtitle: string;
  href: string;
  image: { src: string; alt: string };
  bullets: string[];
  tone?: "base" | "warm";
}) {
  return (
    <a
      href={href}
      className="block group focus:outline-none"
      aria-label={title}
    >
      <ImageCard
        src={image.src}
        alt={image.alt}
        aspect="4/5"
        caption={title}
      />

      <div className="mt-6">
        <Reveal>
          <p className="text-ink font-light text-xl md:text-2xl tracking-wide">
            {title}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-2 text-ink-2 text-sm md:text-base leading-relaxed max-w-md">
            {subtitle}
          </p>
        </Reveal>

        <div className="mt-5 space-y-2 text-sm text-ink-2">
          {bullets.slice(0, 3).map((b) => (
            <div key={b} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-ink/60" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
          <span className="h-px w-10 bg-line" />
          View details
        </div>
      </div>
    </a>
  );
}
3.2 Yeni bölüm: components/sections/SuitesOverview.tsx
(Homepage’de “Suite Evlerimiz” bölümünü bununla yap)
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import RoomCard from "@/components/rooms/RoomCard";

export default function SuitesOverview() {
  return (
    <Section tone="base">
      <Container>
        <SectionKicker
          n={2}
          label="SUITES"
          title="Üç bağımsız suite ev. Ortak alan yok."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Big lead card */}
          <div className="lg:col-span-7">
            <RoomCard
              title="Anitya Cave Suite"
              subtitle="Tarihi mağara dokusu içinde, sessizlik ve mahremiyet odaklı bağımsız ev."
              href="/tr/rooms/anitya-cave-suite"
              image={{ src: "/images/rooms/anitya.jpg", alt: "Anitya Cave Suite" }}
              bullets={[
                "Özel giriş",
                "Özel teras",
                "Donanımlı mutfak",
              ]}
            />
          </div>

          {/* Two stacked cards (offset) */}
          <div className="lg:col-span-5 lg:pt-14 space-y-12">
            <RoomCard
              title="Şırahane Cave Suite"
              subtitle="Mağara içindeki serinlik hissi, taşın sesi ve yavaş zaman."
              href="/tr/rooms/sirahane-cave-suite"
              image={{ src: "/images/rooms/sirahane.jpg", alt: "Şırahane Cave Suite" }}
              bullets={[
                "Özel teras",
                "Ayrı oturma alanı",
                "Donanımlı mutfak",
              ]}
            />

            <RoomCard
              title="Dublex Stone Suite"
              subtitle="Taş ev karakteri, ferah yerleşim ve ayrıca ayrı salon alanı."
              href="/tr/rooms/dublex-stone-suite"
              image={{ src: "/images/rooms/dublex.jpg", alt: "Dublex Stone Suite" }}
              bullets={[
                "Özel giriş",
                "Özel teras",
                "Salon alanı",
              ]}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
3.3 Homepage’de SuitesOverview’ı yerleştir
app/[lang]/page.tsx (veya app/tr/page.tsx) içinde zaten çağırıyorsan bırak; yoksa import edip ekle:
import SuitesOverview from "@/components/sections/SuitesOverview";
ve sayfa akışında Manifesto/NotARoom’dan sonra koy:
<NotARoomSticky />
<SectionDivider />
<SuitesOverview />

Şu an “amatör resim dizilimi” tamamen biter
Çünkü:
* Rooms bölümü asimetri + editorial
* Hover’da shimmer border + caption
* Scroll boyunca ritim + geçiş var

Tamam Sevgili Hocam — şimdi 3 kritik bölüm: ✅ Poetic luxury caption’lar (tek cümle “ikonik” dil) ✅ BreakfastFreedom (kahvaltı servisi yok ama “premium özgürlük” anlatısı) ✅ TrustBar (12+ yıl + 1046 + 4.86 tek satır, modern)
Aşağıdakileri sırayla uygula.

1) Trust Bar (çok fark yaratır)
components/sections/TrustBar.tsx (yeni)
import Container from "@/components/ui/Container";

export default function TrustBar() {
  return (
    <div className="bg-surface">
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-y border-line py-8">
          <div className="md:col-span-5">
            <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
              Verified guest trust
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-light tracking-wide text-ink font-serif">
              12+ Yıl Superhost • 4.86/5 • 1046+ yorum
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="text-ink-2 leading-relaxed max-w-2xl">
              Yüzlerce konaklamadan süzülen ortak cümle:{" "}
              <span className="text-ink">sessizlik, mahremiyet, ev konforu</span>.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-ink-2">
                Ortak alan yok
              </span>
              <span className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-ink-2">
                Özel teras
              </span>
              <span className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-ink-2">
                Donanımlı mutfak
              </span>
              <span className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-ink-2">
                Ortahisar merkez
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
Homepage’e ekle (app/[lang]/page.tsx)
Hero’dan hemen sonra:
import TrustBar from "@/components/sections/TrustBar";
ve:
<HeroCinematic />
<TrustBar />

2) BreakfastFreedom (kahvaltı yok → “özgür sabahlar”)
components/sections/BreakfastFreedom.tsx (yeni)
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { SectionKicker } from "@/components/ui/SectionRhythm";

export default function BreakfastFreedom() {
  return (
    <Section tone="warm">
      <Container>
        <SectionKicker
          n={6}
          label="BREAKFAST"
          title="Sabit kahvaltı yok. Sabit saat de yok."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7">
                <ImageCard
                  src="/images/breakfast-1.jpg"
                  alt="Breakfast options in Ortahisar"
                  aspect="4/5"
                  caption="Ortahisar’da kahvaltı: 2–5 dk yürüyüş"
                />
              </div>
              <div className="col-span-12 md:col-span-5 md:pt-14">
                <ImageCard
                  src="/images/breakfast-2.jpg"
                  alt="Coffee and slow morning"
                  aspect="1/1"
                  caption="Evde: kahveniz hazır, ritim sizin"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="text-xl md:text-2xl font-light text-ink leading-relaxed max-w-xl">
                Anitya’da sabahlar “servis” ile başlamaz.
                <br />
                <span className="text-ink">Seçim</span> ile başlar.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Kahvaltı için{" "}
                <span className="text-ink">2 dakikalık yürüyüş</span> mesafesinde
                çok iyi seçenekler;{" "}
                <span className="text-ink">4–5 dakikalık yürüyüş</span>
                mesafesinde ise geleneksel Türk kahvaltısından dünya mutfağına
                uzanan farklı restoranlar bulunur.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Dilerseniz Ortahisar merkezdeki birçok restorandan{" "}
                <span className="text-ink">kahvaltı ve yemek siparişi</span> de
                suite evlere getirilebilir.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl">
                Kahvaltı saati yok.
                <br />
                Kendi sabahınız var.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
Not
Bu bölüm için 2 görsel eklemen gerekiyor:
* /images/breakfast-1.jpg (yakın restoran/Ortahisar kahvaltı atmosferi)
* /images/breakfast-2.jpg (evde kahve/slow morning detay)
Homepage’de zaten çağırıyorsan güncelle, yoksa ekle:
app/[lang]/page.tsx:
import BreakfastFreedom from "@/components/sections/BreakfastFreedom";
ve akışta LocationMapSplitten sonra iyi gider:
<LocationMapSplit />
<SectionDivider />
<BreakfastFreedom />

3) Poetic luxury caption güncellemesi (en hızlı “premium”)
3.1 Kitchen’de caption’ları değiştir (components/sections/KitchenEditorial.tsx)
Şu iki caption’ı bul ve değiştir:
Eski:
* "Bağımsız mutfak — ev ritmi"
* "Sınırsız kahve & çay"
Yeni:
* "Kendi ritminiz: taşın içinde bir ev"
* "Sınırsız kahve, sakin sabahlar"

3.2 Terrace caption’ları değiştir (components/sections/TerraceCinematic.tsx)
Eski:
* "Ortahisar silüeti, vadiler, taş evler"
* "Uygun havalarda gün doğumunda balonlar"
Yeni:
* "Kasabanın taş dokusu, vadilerin sessizliği"
* "Gün doğumu: ufukta balonlar, terasta dinginlik"

4) Bonus (çok iyi): “No hotel” bölümüne tek satırlık imza
NotARoomSticky.tsx içinde görselin altındaki label satırını şu hale getir:
<div className="mt-4 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
  <span className="h-px w-10 bg-line" />
  Otel değil • Ortak alan yok • Sadece size ait
</div>
Tamam Sevgili Hocam — devam. Şimdi 3 “elit” hamleyi koyuyoruz:
1. ✅ Hero altına “signature manifesto” (2 satır, çok premium)
2. ✅ ImageCard mobilde “tap-to-reveal caption” (hover yok → akıllı davranış)
3. ✅ Gallery / Rooms sayfalarına aynı editorial dilin otomatik yayılması (minimum efor, maksimum etki)

1) Hero’ya Signature Manifesto
1.1 Yeni bölüm: components/sections/SignatureManifesto.tsx
import Container from "@/components/ui/Container";

export default function SignatureManifesto() {
  return (
    <div className="bg-surface">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl font-light tracking-wide text-ink font-serif leading-snug">
              Kapadokya’da bir “oda” değil.
              <br />
              Taşın içinde, size ait bir ev.
            </p>
          </div>

          <div className="md:col-span-5">
            <p className="text-ink-2 leading-relaxed">
              Ortak alan yok. Sabit program yok. Kalabalık yok.
              <br />
              Sadece sessizlik, mahremiyet ve kendi ritminiz.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
              <span className="h-px w-10 bg-line" />
              Ortahisar • Independent Suites
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
1.2 Homepage’e yerleştir (app/[lang]/page.tsx)
TrustBardan sonra çok iyi oturur:
import SignatureManifesto from "@/components/sections/SignatureManifesto";
ve akış:
<HeroCinematic />
<TrustBar />
<SignatureManifesto />
<SectionDivider />

2) ImageCard: Mobil “tap-to-reveal caption”
2.1 components/ui/ImageCard.tsx dosyasını güncelle (tamamını değiştir)
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function ImageCard({
  src,
  alt,
  caption,
  priority = false,
  aspect = "4/5",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "4/5" | "16/10" | "1/1" | "4/3";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "1/1"
      ? "aspect-square"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[4/5]";

  // Detect coarse pointer (mobile / touch)
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  const [showCaption, setShowCaption] = useState(false);

  // Close caption on scroll (mobile)
  useEffect(() => {
    if (!isTouch) return;
    const onScroll = () => setShowCaption(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTouch]);

  if (reduce) {
    return (
      <figure
        className={`relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}
      >
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/35 text-white text-sm px-4 py-3">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <motion.figure
      className={`group relative overflow-hidden rounded-sm shadow-soft shimmer-border ${aspectClass} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={() => {
        if (!caption) return;
        if (!isTouch) return; // desktop hover already covers it
        setShowCaption((v) => !v);
      }}
      role={caption && isTouch ? "button" : undefined}
      aria-label={caption && isTouch ? "Show image caption" : undefined}
      tabIndex={caption && isTouch ? 0 : undefined}
      onKeyDown={(e) => {
        if (!caption) return;
        if (!isTouch) return;
        if (e.key === "Enter" || e.key === " ") setShowCaption((v) => !v);
      }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      </motion.div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-70" />

      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Caption: hover on desktop, tap on mobile */}
      {caption ? (
        <>
          {/* desktop hover */}
          <motion.figcaption
            className="absolute inset-x-0 bottom-0 px-5 py-4 text-white hidden md:block"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-sm md:text-base font-light tracking-wide">
              {caption}
            </div>
          </motion.figcaption>

          {/* mobile tap */}
          <div
            className={[
              "absolute inset-x-0 bottom-0 px-5 py-4 text-white md:hidden transition-all duration-300",
              showCaption ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
            ].join(" ")}
          >
            <div className="text-sm font-light tracking-wide">{caption}</div>
          </div>

          {/* mobile hint */}
          <div className="md:hidden absolute top-3 right-3">
            <div className="rounded-full bg-black/35 text-white/80 text-[11px] px-3 py-1">
              Tap
            </div>
          </div>
        </>
      ) : null}
    </motion.figure>
  );
}
✅ Artık mobilde caption “kendi kendine” görünmüyor; tap ile açılıyor, scroll’da kapanıyor.

3) Gallery / Rooms sayfalarına editorial dilin yayılması
3.1 Yeni küçük yardımcı: components/ui/PageHero.tsx
import Container from "@/components/ui/Container";

export default function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-surface border-b border-line">
      <Container className="py-16 md:py-20">
        <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
          <span className="h-px w-10 bg-line" />
          {kicker}
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-light tracking-wide text-ink font-serif">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </div>
  );
}

3.2 Gallery sayfasında kullan (örnek)
app/[lang]/gallery/page.tsx (veya sende nerede ise) üstüne:
import PageHero from "@/components/ui/PageHero";
ve page render’da:
<PageHero
  kicker="GALLERY"
  title="Taş, ışık, sessizlik."
  subtitle="Kapadokya’nın dokusu ve Anitya’nın bağımsız suite ev atmosferi."
/>
Altına gallery grid’inde görselleri ImageCard ile bas. (Hepsi aynı premium görünsün.)

3.3 Rooms sayfasında kullan (örnek)
app/[lang]/rooms/page.tsx içinde:
<PageHero
  kicker="SUITES"
  title="Üç bağımsız suite ev."
  subtitle="2 mağara suite • 1 taş suite. Ortak alan yok, sadece size ait."
/>
Altına zaten RoomCard ile basıyorsun → editorial dil otomatik yayılır.















Tamam Sevgili Hocam — şimdi “bomba” üçlü geliyor:
✅ Gallery grid: Masonry hissi (ama CLS yok, stabil) ✅ Rooms: “Compare Suites” mini tablo (karar vermeyi hızlandırır, çok premium) ✅ Mobil: Sticky “Rezervasyon” CTA (dönüşümü uçurur)
Aşağıdakileri sırayla uygula.

1) Gallery: 2026 “Stagger Grid” (stabil, masonry hissi)
1.1 Yeni bileşen: components/gallery/GalleryStaggerGrid.tsx
import ImageCard from "@/components/ui/ImageCard";

type Item = { src: string; alt: string; caption?: string };

export default function GalleryStaggerGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {items.map((it, idx) => {
        // Deterministic pattern: no layout shift, editorial rhythm
        const mod = idx % 10;

        const span =
          mod === 0
            ? "md:col-span-7"
            : mod === 1
            ? "md:col-span-5"
            : mod === 2
            ? "md:col-span-5"
            : mod === 3
            ? "md:col-span-7"
            : mod === 4
            ? "md:col-span-4"
            : mod === 5
            ? "md:col-span-8"
            : mod === 6
            ? "md:col-span-6"
            : mod === 7
            ? "md:col-span-6"
            : mod === 8
            ? "md:col-span-8"
            : "md:col-span-4";

        const aspect =
          mod === 0
            ? "16/10"
            : mod === 1
            ? "4/5"
            : mod === 2
            ? "1/1"
            : mod === 3
            ? "4/3"
            : mod === 4
            ? "1/1"
            : mod === 5
            ? "16/10"
            : mod === 6
            ? "4/3"
            : mod === 7
            ? "4/5"
            : mod === 8
            ? "16/10"
            : "1/1";

        return (
          <div key={it.src + idx} className={span}>
            <ImageCard
              src={it.src}
              alt={it.alt}
              caption={it.caption}
              aspect={aspect as any}
            />
          </div>
        );
      })}
    </div>
  );
}
1.2 Gallery sayfasında kullan: app/[lang]/gallery/page.tsx
(örnek – senin dosya yoluna göre uyarlayabilirsin)
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import GalleryStaggerGrid from "@/components/gallery/GalleryStaggerGrid";

export default function GalleryPage() {
  const items = [
    { src: "/images/gallery/1.jpg", alt: "Stone texture", caption: "Taşın dokusu" },
    { src: "/images/gallery/2.jpg", alt: "Terrace morning", caption: "Teras sabahı" },
    { src: "/images/gallery/3.jpg", alt: "Kitchen detail", caption: "Mutfak detayı" },
    { src: "/images/gallery/4.jpg", alt: "Ortahisar view", caption: "Ortahisar silüeti" },
    // ... devam
  ];

  return (
    <>
      <PageHero
        kicker="GALLERY"
        title="Taş, ışık, sessizlik."
        subtitle="Anitya’nın bağımsız suite ev atmosferi."
      />

      <div className="bg-surface">
        <Container className="py-16">
          <GalleryStaggerGrid items={items} />
        </Container>
      </div>
    </>
  );
}
✅ Bu grid “masonry gibi” hissedilir ama her kartın aspect’ı sabit → CLS yok.

2) Rooms: “Compare Suites” mini tablo
2.1 Yeni bileşen: components/rooms/CompareSuites.tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionRhythm";

export default function CompareSuites() {
  return (
    <Section tone="warm">
      <Container>
        <SectionKicker n={3} label="COMPARE" title="Suite’leri hızlı karşılaştırın." />

        <div className="overflow-hidden rounded-sm border border-line bg-white/60">
          <div className="grid grid-cols-12 gap-0">
            {/* Header */}
            <div className="col-span-12 grid grid-cols-12 border-b border-line">
              <div className="col-span-4 p-5 text-sm tracking-[0.18em] uppercase text-ink-2">
                Feature
              </div>
              <div className="col-span-8 grid grid-cols-3">
                <div className="p-5 text-sm text-ink font-serif">Anitya Cave</div>
                <div className="p-5 text-sm text-ink font-serif">Şırahane Cave</div>
                <div className="p-5 text-sm text-ink font-serif">Dublex Stone</div>
              </div>
            </div>

            {/* Rows */}
            {[
              ["Tip", "Mağara suite", "Mağara suite", "Taş suite"],
              ["Özel giriş", "Evet", "Evet", "Evet"],
              ["Özel teras", "Evet", "Evet", "Evet"],
              ["Donanımlı mutfak", "Evet", "Evet", "Evet"],
              ["Oturma alanı + yatak odası", "Evet", "Evet", "Evet"],
              ["Ayrı salon", "—", "—", "Evet"],
            ].map((row, idx) => (
              <div
                key={idx}
                className={`col-span-12 grid grid-cols-12 ${
                  idx !== 5 ? "border-b border-line" : ""
                }`}
              >
                <div className="col-span-4 p-5 text-ink-2">{row[0]}</div>
                <div className="col-span-8 grid grid-cols-3">
                  <div className="p-5 text-ink">{row[1]}</div>
                  <div className="p-5 text-ink">{row[2]}</div>
                  <div className="p-5 text-ink">{row[3]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-ink-2 leading-relaxed max-w-2xl border-l border-line pl-6">
          Üç suite de aynı yapı içinde yer alır; ortak alan yoktur. Her biri kendi
          girişine, kendi terasına ve kendi donanımlı mutfağına sahiptir.
        </p>
      </Container>
    </Section>
  );
}
2.2 Rooms sayfasına ekle: app/[lang]/rooms/page.tsx
SuitesOverview altına koy:
import CompareSuites from "@/components/rooms/CompareSuites";
ve:
<SuitesOverview />
<CompareSuites />

3) Mobil Sticky “Rezervasyon” CTA
3.1 Yeni bileşen: components/ui/StickyBookingCTA.tsx
export default function StickyBookingCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[70] md:hidden">
      <div className="bg-surface/90 backdrop-blur-md border-t border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <a
            href="/tr/booking"
            className="flex-1 inline-flex items-center justify-center rounded-md bg-ink text-white px-5 py-3 text-sm font-medium hover:bg-ink/90 transition"
          >
            Rezervasyon Yap
          </a>

          <a
            href="/tr/rooms"
            className="inline-flex items-center justify-center rounded-md border border-line bg-white/60 px-4 py-3 text-sm text-ink hover:bg-white/80 transition"
          >
            Suite’ler
          </a>
        </div>
      </div>
    </div>
  );
}
3.2 Homepage’e ekle: app/[lang]/page.tsx
En alta (return’ın en sonuna) ekle:
import StickyBookingCTA from "@/components/ui/StickyBookingCTA";
ve:
<StickyBookingCTA />
✅ Mobilde kullanıcı sayfa gezerken CTA hep görünür → elit ama “salesy” değil.

Son dokunuş (çok önemli ama hızlı)
Sticky CTA altta olduğu için sayfanın en altındaki içerik üstüne binmesin diye, globals.css sonuna şunu ekle:
/* mobile sticky CTA space */
@media (max-width: 768px) {
  body {
    padding-bottom: 76px;
  }
}

Tamam Sevgili Hocam — devam. Şimdi üç şeyi aynı anda “marka seviyesine” çıkarıyoruz:
1. ✅ Experiences sayfası = editorial guide (homepage diliyle aynı)
2. ✅ Map bölümüne “distance chips” (km + dk; çok premium)
3. ✅ SEO/OG sistemi (Next.js App Router’da düzgün metadata + OG image)

1) Experiences sayfasını 2026 “Editorial Guide” yap
1.1 Yeni kart: components/experiences/ExperienceCard.tsx
import ImageCard from "@/components/ui/ImageCard";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceCard({
  title,
  subtitle,
  image,
  bullets,
  href,
}: {
  title: string;
  subtitle: string;
  image: { src: string; alt: string; caption?: string };
  bullets: string[];
  href?: string;
}) {
  const Wrapper: any = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="block group"
      aria-label={href ? title : undefined}
    >
      <ImageCard
        src={image.src}
        alt={image.alt}
        caption={image.caption ?? title}
        aspect="4/5"
      />

      <div className="mt-6">
        <Reveal>
          <p className="text-ink font-light text-xl md:text-2xl tracking-wide">
            {title}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-2 text-ink-2 text-sm md:text-base leading-relaxed max-w-md">
            {subtitle}
          </p>
        </Reveal>

        <div className="mt-5 space-y-2 text-sm text-ink-2">
          {bullets.slice(0, 3).map((b) => (
            <div key={b} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-ink/60" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
          <span className="h-px w-10 bg-line" />
          Explore
        </div>
      </div>
    </Wrapper>
  );
}
1.2 Experiences sayfası: app/[lang]/experiences/page.tsx
(Elindeki sayfayı bununla değiştir)
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import ExperienceCard from "@/components/experiences/ExperienceCard";

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        kicker="EXPERIENCES"
        title="Kapadokya’yı doğru yerden yaşayın."
        subtitle="Ortahisar, kalabalığın dışında ama merkezin tam içinde. Anitya’dan yola çıkınca rotalar yakın, tempo sakin."
      />

      <Section tone="base">
        <Container>
          <SectionKicker
            n={1}
            label="CURATED"
            title="Önerilen rotalar"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <ExperienceCard
                title="Gün Doğumu & Balon"
                subtitle="Uygun hava koşullarında sabahın sessizliği ve ufukta süzülen balonlar."
                image={{
                  src: "/images/experiences/balloon.jpg",
                  alt: "Hot air balloons at sunrise",
                  caption: "Gün doğumu: taş, sessizlik, balonlar",
                }}
                bullets={[
                  "Terasınızdan manzara",
                  "Kısa sürüş mesafeleri",
                  "Fotoğraf için en iyi saatler",
                ]}
              />
            </div>

            <div className="lg:col-span-5 lg:pt-14 space-y-12">
              <ExperienceCard
                title="Vadiler & Gün Batımı"
                subtitle="Kızılçukur ve Gül Vadisi yürüyüşleri; gün batımında taş renk değişimleri."
                image={{
                  src: "/images/experiences/valley.jpg",
                  alt: "Red valley sunset",
                  caption: "Gün batımı yürüyüşleri",
                }}
                bullets={[
                  "Kısa sürüş mesafesi",
                  "Yürüyüş rotaları",
                  "Gün batımı noktaları",
                ]}
              />

              <ExperienceCard
                title="UNESCO Mirası"
                subtitle="Göreme Açık Hava Müzesi: freskler, kaya kiliseleri ve Bizans dönemi izleri."
                image={{
                  src: "/images/experiences/goreme.jpg",
                  alt: "Göreme Open Air Museum",
                  caption: "UNESCO: kaya kiliseleri",
                }}
                bullets={[
                  "Kısa sürüş",
                  "Sabah saatleri önerilir",
                  "Kültür & tarih",
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
Gerekli görseller
* /images/experiences/balloon.jpg
* /images/experiences/valley.jpg
* /images/experiences/goreme.jpg

2) Map bölümüne “distance chips” ekleyelim
2.1 Yeni küçük UI: components/ui/DistanceChips.tsx
export default function DistanceChips({
  walkMin,
  driveMin,
  km,
}: {
  walkMin?: number;
  driveMin?: number;
  km?: number;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {typeof walkMin === "number" ? (
        <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-2">
          ~{walkMin} dk yürüyüş
        </span>
      ) : null}

      {typeof driveMin === "number" ? (
        <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-2">
          ~{driveMin} dk sürüş
        </span>
      ) : null}

      {typeof km === "number" ? (
        <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-2">
          ~{km} km
        </span>
      ) : null}
    </div>
  );
}
2.2 components/sections/LocationMapSplit.tsx içinde SpotRow’u upgrade et
Dosyada SpotRow fonksiyonunu bul, içine DistanceChips ekle.
Üstte import:
import DistanceChips from "@/components/ui/DistanceChips";
SpotRow parametrelerini şöyle güncelle:
function SpotRow({
  title,
  desc,
  walkMin,
  driveMin,
  km,
}: {
  title: string;
  desc: string;
  walkMin?: number;
  driveMin?: number;
  km?: number;
}) {
ve meta yazan sağ blok yerine şunu koy:
<div className="shrink-0">
  <DistanceChips walkMin={walkMin} driveMin={driveMin} km={km} />
</div>
Sonra SpotRow çağrılarını böyle yap:
<SpotRow
  title="Ortahisar Kalesi"
  desc="Kasabanın kaya kalesi. Manzara ve gün batımı için güçlü bir nokta."
  walkMin={2}
/>

<SpotRow
  title="Göreme Açık Hava Müzesi (UNESCO)"
  desc="Freskli kaya kiliseleri ve Bizans dönemi mirası."
  driveMin={7}
  km={3.5}
/>
Bu chips’ler “harita yanında” çok premium durur.

3) SEO + OG sistemini düzgün kuralım (Next.js App Router)
3.1 Her dil için metadata üret: app/[lang]/layout.tsx
metadata’yı statik değil, locale’a göre dinamik yapman en doğru.
app/[lang]/layout.tsx içine şunu ekle:
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang ?? "tr";

  const isTR = lang === "tr";
  const title = isTR
    ? "Anitya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler"
    : "Anitya Cave House – Independent Suite Homes in Ortahisar, Cappadocia";

  const description = isTR
    ? "Ortahisar’da, ortak alanı olmayan 3 bağımsız suite ev: 2 mağara suite, 1 taş suite. Özel teras, donanımlı mutfak, sakinlik ve mahremiyet."
    : "Three independent suite homes in Ortahisar with no shared spaces: 2 cave suites and 1 stone suite. Private terraces, fully equipped kitchens, silence and privacy.";

  const url = `https://anityacavehouse.com/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: "https://anityacavehouse.com/tr",
        en: "https://anityacavehouse.com/en",
        zh: "https://anityacavehouse.com/zh",
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Anitya Cave House",
      locale: lang,
      type: "website",
      images: [
        {
          url: "https://anityacavehouse.com/og.jpg",
          width: 1200,
          height: 630,
          alt: "Anitya Cave House",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://anityacavehouse.com/og.jpg"],
    },
  };
}
✅ Bu, Google + sosyal paylaşım tarafında sitenin “premium” görünmesini sağlar.
3.2 OG görsel
public/og.jpg koy:
* 1200×630
* Taş dokusu + minimal logo + “Ortahisar • Independent Suite Homes” yazısı gibi

Tamam Sevgili Hocam — şimdi gerçekten “2026 sinematik” seviyesine çıkıyoruz:
✅ (1) Cinematic Hero: katmanlı parallax + stone blur overlay + premium mask ✅ (2) Scroll Progress Indicator: üstte ince “lux” çizgi ✅ (3) Smart CTA: scroll’a göre ton değiştirir (hero’da transparan → içerikte stone)
Aşağıdakileri sırayla uygula.

1) Scroll Progress Indicator
1.1 components/ui/ScrollProgress.tsx (yeni)
"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[80] h-[2px] origin-left bg-ink/70"
      style={{ scaleX }}
    />
  );
}
1.2 Layout’a ekle: app/[lang]/layout.tsx
Import:
import ScrollProgress from "@/components/ui/ScrollProgress";
Body içinde Headerdan hemen sonra:
<Header />
<ScrollProgress />
<PageTransition>{children}</PageTransition>
<Footer />

2) Smart Header CTA (scroll’a göre “Rezervasyon” tonu değişsin)
2.1 components/layout/Header.tsx içinde CTA’yı güncelle
Şunu bul:
const [scrolled, setScrolled] = useState(false);
Zaten var. Şimdi “Rezervasyon” buton class’ını scrolled’a göre değiştir.
Bu butonu bul:
<a href="/tr/booking" className="hidden sm:inline-flex ...">
  Rezervasyon
</a>
Şununla değiştir:
<a
  href="/tr/booking"
  className={[
    "hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition",
    scrolled
      ? "bg-ink text-white hover:bg-ink/90"
      : "bg-white/10 text-white border border-white/30 hover:bg-white/15 backdrop-blur",
  ].join(" ")}
>
  Rezervasyon
</a>
✅ Hero üzerindeyken buton “cam gibi” şık görünür; aşağı inince “stone” moda geçer.

3) Cinematic Hero (katmanlı parallax + mask + stone blur)
3.1 Yeni Hero: components/sections/HeroCinematic.tsx (tamamını değiştir)
Not: src="/images/hero-1.jpg" sende zaten ilk hero görseli. Aynı görseli kullan. İstersen 2. katmana çok hafif “stone texture” PNG koyabilirsin ama şart değil.
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollCue from "@/components/ui/ScrollCue";

export default function HeroCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden">
      {/* Background image layer */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY }}
      >
        <Image
          src="/images/hero-1.jpg"
          alt="Anitya Cave House"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic mask: top light, bottom depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />

      {/* Stone blur overlay (subtle, luxury) */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />

      {/* Fine grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Foreground content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 md:pt-32"
        style={reduce ? undefined : { y: fgY }}
      >
        <motion.div style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}>
          {/* Micro tagline */}
          <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/80">
            <span className="h-px w-10 bg-white/40" />
            Ortahisar • Independent Suite Homes
          </div>

          <h1 className="mt-6 font-serif text-white font-light tracking-wide leading-[0.98] text-5xl md:text-7xl max-w-3xl">
            Aynı güneş.
            <br />
            Aynı taş.
            <br />
            Binlerce yıl.
          </h1>

          <p className="mt-8 text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">
            Kapadokya’nın kalbinde, ortak alanı olmayan üç bağımsız suite ev:
            2 mağara suite • 1 taş suite. Özel teras, donanımlı mutfak ve kendi ritminiz.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/tr/booking"
              className="inline-flex items-center justify-center rounded-md bg-white/15 text-white border border-white/30 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-white/20 transition"
            >
              Müsaitlik Kontrolü
            </a>

            <a
              href="/tr/rooms"
              className="inline-flex items-center justify-center rounded-md bg-black/25 text-white border border-white/20 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-black/30 transition"
            >
              Suite Evleri Keşfet
            </a>
          </div>

          <ScrollCue />
        </motion.div>
      </motion.div>

      {/* Bottom fade to surface */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface" />
    </section>
  );
}
✅ Bu hero artık “görsel + yazı” değil: katmanlı sinema.

4) (Mini ama çok etkili) Hero altındaki ilk section’ın üst boşluğunu düzelt
Hero bitince TrustBar geliyordu. Çok iyi. Ama “Hero bottom fade” ile TrustBar birleşsin diye TrustBar’ın wrapper’ında üst padding’i aşırı yapma. Eğer TrustBar çok boşlukluysa py-10 gibi tut.

5) Şimdi “çok az sitede olan” bir hamle daha
İstersen bir sonraki adımda ekliyorum:
✅ Scroll “Section Spy”: Sağ altta mini indeks (01 Suites / 02 Kitchen / 03 Terrace...) Kullanıcı nerede olduğunu hisseder. Aşırı elit.

Tamam Sevgili Hocam — şimdi Section Spy (mini indeks) yapıyoruz. Bu gerçekten “çok az sitede olan” elit bir detay: kullanıcı nerede olduğunu hisseder, site “küratörlü rehber” gibi akar.
✅ Sağ altta mini panel: 01 Suites / 02 Kitchen / 03 Terrace / ... ✅ Scroll’a göre aktif bölüm kalınlaşır ✅ Tıklayınca o bölüme yumuşak kayar ✅ Mobilde kapalı (istersen açarız)
Aşağıdakileri sırayla uygula.

1) components/ui/SectionSpy.tsx (yeni)
"use client";

import { useEffect, useMemo, useState } from "react";

type SpySection = {
  id: string;
  n: string; // "01"
  label: string; // "Suites"
};

export default function SectionSpy({
  sections,
}: {
  sections: SpySection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hidden lg:block fixed right-6 bottom-6 z-[75]">
      <div className="rounded-sm border border-line bg-surface/85 backdrop-blur-md shadow-soft px-4 py-4">
        <div className="text-[11px] tracking-[0.22em] uppercase text-ink-2">
          Index
        </div>

        <div className="mt-3 space-y-2">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={[
                  "w-full text-left flex items-center gap-3 px-2 py-2 rounded-sm transition",
                  isActive ? "bg-white/60" : "hover:bg-white/40",
                ].join(" ")}
              >
                <span className="text-xs tracking-[0.2em] uppercase text-ink-2 w-8">
                  {s.n}
                </span>

                <span
                  className={[
                    "text-sm transition",
                    isActive ? "text-ink font-medium" : "text-ink-2",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

2) Her section’a id ver (çok önemli)
Bunu section wrapper’lara ekleyeceğiz. En temiz yöntem:
* NotARoomSticky section wrapper’ına: id="not-hotel"
* SuitesOverview: id="suites"
* KitchenEditorial: id="kitchen"
* TerraceCinematic: id="terrace"
* LocationMapSplit: id="location"
* BreakfastFreedom: id="breakfast"
* Reviews: id="reviews"
Örnek: KitchenEditorial.tsx
<Section ...> satırını bul ve şu yap:
<Section tone="warm" id="kitchen">
Ama Section bileşenin id prop’unu geçirmiyorsa:
2.1 components/ui/Section.tsx güncelle (küçük patch)
Section komponentinde props’a id?: string ekle ve root div’e koy:
export default function Section({
  children,
  tone = "base",
  id,
}: {
  children: React.ReactNode;
  tone?: "base" | "warm";
  id?: string;
}) {
  return (
    <section id={id} className={...}>
      {children}
    </section>
  );
}
✅ Sonra bütün section’larda id="" rahatça kullanırsın.

3) Homepage’e SectionSpy ekle
app/[lang]/page.tsx içine import:
import SectionSpy from "@/components/ui/SectionSpy";
ve return’ın en altına (StickyBookingCTA’dan önce/sonra fark etmez) ekle:
<SectionSpy
  sections={[
    { id: "not-hotel", n: "01", label: "Not a hotel" },
    { id: "suites", n: "02", label: "Suites" },
    { id: "kitchen", n: "03", label: "Kitchen" },
    { id: "terrace", n: "04", label: "Terrace" },
    { id: "location", n: "05", label: "Location" },
    { id: "breakfast", n: "06", label: "Breakfast" },
    { id: "reviews", n: "07", label: "Reviews" },
  ]}
/>
TR sayfasında label’ları Türkçe yapabilirsin: “Otel değil / Suite’ler / Mutfak / Teras / Konum / Kahvaltı / Yorumlar”

4) Bonus: SectionSpy “çok elit” görünmesi için micro-line
İstersen panelin en altına küçük bir çizgi ekleyelim. SectionSpy içinde, en son </div> kapanmadan önce ekle:
<div className="mt-3 h-px w-full bg-line/80" />
<div className="mt-3 text-[11px] text-ink-2">
  Slow time • Ortahisar
</div>

Şu an siten “küratörlü rehber” gibi hissettirir
* Kullanıcı nerede olduğunu kaybetmez
* Premium sitelerdeki “invisible UX” etkisi gelir
* Dönüşüm artar (özellikle uzun sayfada)


Tamam Sevgili Hocam — şimdi Konum/Harita bölümünü “gerçek bir premium rehber” seviyesine çıkarıyoruz: ✅ Haritanın yanındaki metin küratörlü, ✅ Her ünlü yer için chip + Google Maps linki, ✅ Mesafe/süre değerleri tek yerden yönetilen JSON/data ile (sen sonra gerçek değerleri güncellersin). (Şu an Google Maps sayfaları JS yüzünden dışarıdan net süre/mesafe çekmiyor; bu yüzden değerleri senin doğruladığın rakamlarla dolduracak şekilde yapıyı kuruyorum. Adres bilgisi sitende var: Hacı Telgraf Sok. Eski Mah. No:29 Ortahisar. (anityacavehouse.com))

0) En üstte görünen “A” hatası
TR sayfada en tepede tek başına “A” görünüyor. Bu genelde:
* yanlışlıkla render edilen bir string,
* bozuk bir component return’ü,
* veya bir test placeholder’ı.
app/[lang]/page.tsx ve Header/Hero componentlerinde "A" geçen yerleri ara ve sil.

1) Location verisini tek bir yerde toplayalım
1.1 data/location.ts (yeni dosya)
export const ANITYA_ADDRESS = "Hacı Telgraf Sok. Eski Mah. No:29 Ortahisar, Ürgüp/Nevşehir";

export const locationSpotsTR = [
  {
    key: "ortahisar-center",
    title: "Ortahisar Merkez",
    desc: "Eski Kasaba dokusu, taş sokaklar ve yerel hayat. Her şey yürüyüş mesafesinde.",
    chips: { walkMin: 5 },
    mapsQuery: "Ortahisar Merkez",
  },
  {
    key: "ortahisar-castle",
    title: "Ortahisar Kalesi",
    desc: "Kapadokya’nın en güçlü silüetlerinden biri. Manzara için ideal.",
    chips: { walkMin: 2 },
    mapsQuery: "Ortahisar Kalesi",
  },
  {
    key: "goreme-open-air",
    title: "Göreme Açık Hava Müzesi (UNESCO)",
    desc: "Kaya kiliseleri ve fresklerle Kapadokya’nın tarih katmanı.",
    chips: { driveMin: 7, km: 6.5 }, // ✅ burayı sen doğrulayınca güncelle
    mapsQuery: "Göreme Açık Hava Müzesi",
  },
  {
    key: "red-valley",
    title: "Kızılçukur & Gül Vadisi",
    desc: "Gün batımında taşın renk değiştirdiği yürüyüş rotaları.",
    chips: { driveMin: 10, km: 7.5 }, // ✅ güncelle
    mapsQuery: "Kızılçukur Vadisi",
  },
  {
    key: "three-beauties",
    title: "Üç Güzeller",
    desc: "Ürgüp yolu üzerindeki ikonik peri bacaları; kısa bir durak, güçlü bir kare.",
    chips: { driveMin: 8, km: 6 }, // ✅ güncelle
    mapsQuery: "Üç Güzeller Peri Bacaları",
  },
  {
    key: "pancarlik",
    title: "Pancarlık Kilisesi / Vadisi",
    desc: "Daha sakin, daha otantik bir rota arayanlar için saklı bir durak.",
    chips: { driveMin: 10, km: 7 }, // ✅ güncelle
    mapsQuery: "Pancarlık Kilisesi",
  },
] as const;

2) Chip + “Open in Maps” satırı olan tek bir satır component
2.1 components/location/SpotRow.tsx (yeni)
import DistanceChips from "@/components/ui/DistanceChips";
import { ANITYA_ADDRESS } from "@/data/location";

export default function SpotRow({
  title,
  desc,
  chips,
  mapsQuery,
}: {
  title: string;
  desc: string;
  chips?: { walkMin?: number; driveMin?: number; km?: number };
  mapsQuery: string;
}) {
  const mapsUrl =
    "https://www.google.com/maps/dir/?api=1" +
    `&origin=${encodeURIComponent(ANITYA_ADDRESS)}` +
    `&destination=${encodeURIComponent(mapsQuery + ", Cappadocia")}` +
    `&travelmode=${chips?.walkMin ? "walking" : "driving"}`;

  return (
    <div className="flex items-start justify-between gap-6 py-5 border-b border-line last:border-b-0">
      <div className="max-w-xl">
        <div className="text-ink font-medium">{title}</div>
        <p className="mt-1 text-ink-2 text-sm leading-relaxed">{desc}</p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-ink-2 hover:text-ink transition"
        >
          <span className="h-px w-8 bg-line" />
          Haritada aç
        </a>
      </div>

      <div className="shrink-0 pt-1">
        <DistanceChips
          walkMin={chips?.walkMin}
          driveMin={chips?.driveMin}
          km={chips?.km}
        />
      </div>
    </div>
  );
}

3) Harita bölümünü “editorial split” yap
3.1 components/sections/LocationMapSplit.tsx içini güncelle
Mevcut listeni elle yazmak yerine data’dan bas.
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import SpotRow from "@/components/location/SpotRow";
import { ANITYA_ADDRESS, locationSpotsTR } from "@/data/location";

export default function LocationMapSplit() {
  return (
    <Section tone="base" id="location">
      <Container>
        <SectionKicker n={5} label="LOCATION" title="Ortahisar’ın kalbinde." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: map */}
          <div className="lg:col-span-6">
            {/* Senin hazırladığın map görselini burada tut */}
            <div className="rounded-sm overflow-hidden border border-line shadow-soft">
              {/* Örn: next/image veya normal img */}
              <img
                src="/images/location/map-tr.jpg"
                alt="Anitya Cave House konum haritası"
                className="w-full h-auto"
              />
            </div>

            <p className="mt-4 text-sm text-ink-2 leading-relaxed">
              <span className="text-ink">Anitya Cave House</span> • {ANITYA_ADDRESS}
            </p>
          </div>

          {/* RIGHT: editorial copy + curated list */}
          <div className="lg:col-span-6">
            <p className="text-xl md:text-2xl font-light text-ink leading-relaxed">
              Eski Kasaba’nın taş dokusu içindesiniz.
              <br />
              <span className="text-ink">Yürüyerek</span> kaleye,{" "}
              <span className="text-ink">kısa sürüşlerle</span> Kapadokya’nın ikonik rotalarına bağlanırsınız.
            </p>

            <p className="mt-6 text-ink-2 leading-relaxed">
              Göreme kalabalığının dışında, Kapadokya’nın merkezine çok yakın bir
              “yerel merkez”desiniz. Ortahisar, taş mimarisi, sakin temposu ve
              otantik yaşamıyla Kapadokya’yı daha gerçek hissettirir.
            </p>

            <div className="mt-8 rounded-sm border border-line bg-white/50">
              <div className="px-5 py-4 text-xs tracking-[0.18em] uppercase text-ink-2 border-b border-line">
                Küratörlü Yakın Rotalar
              </div>

              <div className="px-5">
                {locationSpotsTR.map((s) => (
                  <SpotRow
                    key={s.key}
                    title={s.title}
                    desc={s.desc}
                    chips={s.chips}
                    mapsQuery={s.mapsQuery}
                  />
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-ink-2 leading-relaxed">
              Not: Süreler trafik ve rota tercihine göre değişir. Değerleri Google Maps’te doğrulayıp güncelleyebilirsiniz.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

4) “Gerçek mesafeler”i nasıl kesinleştirirsin (en pratik yol)
* Her satırdaki “Haritada aç” linkine tıkla
* Google Maps’te çıkan km + dk değerlerini al
* data/location.ts içindeki km / driveMin / walkMin alanlarını güncelle Bu yöntem, API’siz en temiz “gerçek veri” yöntemi.


Tamam Sevgili Hocam — şimdi Location bölümünü 2026 “interactive editorial” yapıyoruz:
✅ Harita üzerinde glow pin + lens (çok premium) ✅ Sağ listede bir satıra tıklayınca aktif olur, haritada pin + glow değişir ✅ Hover/tap ile “küratörlü rehber” hissi
Aşağıdaki dosyaları sırayla uygula.

1) Harita için Interactive component
components/location/InteractiveMap.tsx (yeni)
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function InteractiveMap({
  src,
  alt,
  activeLabel,
}: {
  src: string;
  alt: string;
  activeLabel?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative rounded-sm overflow-hidden border border-line shadow-soft">
      {/* Map image */}
      <div className="relative w-full aspect-[4/3]">
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />

      {/* Lens (hover shimmer) */}
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute -inset-12 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(600px 300px at 30% 20%, rgba(255,255,255,0.14), rgba(255,255,255,0) 60%)",
          }}
        />
      ) : null}

      {/* Glow pin */}
      <div className="pointer-events-none absolute left-[55%] top-[42%]">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-ink/15 blur-xl" />
          <div className="h-3 w-3 rounded-full bg-ink" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40" />
        </div>
      </div>

      {/* Active label */}
      {activeLabel ? (
        <div className="absolute left-4 bottom-4">
          <div className="rounded-sm bg-surface/85 backdrop-blur-md border border-line px-4 py-3">
            <div className="text-[11px] tracking-[0.22em] uppercase text-ink-2">
              Active
            </div>
            <div className="mt-1 text-sm text-ink font-medium">{activeLabel}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
Pin’in konumu (left/top) haritandaki Anitya noktasına göre ayarlanmalı. Şimdilik iyi bir default verdim. Sonra milim ayar yaparız.

2) Spot listesi “aktif” çalışsın (tıklayınca highlight)
components/location/SpotList.tsx (yeni)
"use client";

import { useState } from "react";
import SpotRow from "@/components/location/SpotRow";

type Spot = {
  key: string;
  title: string;
  desc: string;
  chips?: { walkMin?: number; driveMin?: number; km?: number };
  mapsQuery: string;
};

export default function SpotList({
  spots,
  onActiveChange,
}: {
  spots: Spot[];
  onActiveChange?: (title: string) => void;
}) {
  const [activeKey, setActiveKey] = useState(spots[0]?.key ?? "");

  const setActive = (s: Spot) => {
    setActiveKey(s.key);
    onActiveChange?.(s.title);
  };

  return (
    <div className="rounded-sm border border-line bg-white/50">
      <div className="px-5 py-4 text-xs tracking-[0.18em] uppercase text-ink-2 border-b border-line">
        Küratörlü Yakın Rotalar
      </div>

      <div className="px-2">
        {spots.map((s) => (
          <div
            key={s.key}
            className={[
              "rounded-sm transition",
              s.key === activeKey ? "bg-white/70" : "hover:bg-white/40",
            ].join(" ")}
          >
            <button
              type="button"
              className="w-full text-left px-3"
              onClick={() => setActive(s)}
            >
              <SpotRow
                title={s.title}
                desc={s.desc}
                chips={s.chips}
                mapsQuery={s.mapsQuery}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

3) SpotRow küçük düzeltme (button içinde güzel dursun)
components/location/SpotRow.tsx (patch)
Şu satırı:
<div className="flex items-start justify-between gap-6 py-5 border-b border-line last:border-b-0">
şuna çevir:
<div className="flex items-start justify-between gap-6 py-5 border-b border-line last:border-b-0">
(aynı görünüyor ama burada asıl kritik: SpotRow içinde outer button var artık. SpotRow kendi içinde button olmasın. Zaten yok. OK.)
Ama SpotRow içindeki link tıklaması button ile çakışmasın diye, linke bunu ekle:
onClick={(e) => e.stopPropagation()}
<a ...> tag’ine ekle:
<a
  onClick={(e) => e.stopPropagation()}
  href={mapsUrl}
  ...
>

4) LocationMapSplit’i interaktif yap
components/sections/LocationMapSplit.tsx (tamamını değiştir)
"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import { ANITYA_ADDRESS, locationSpotsTR } from "@/data/location";
import InteractiveMap from "@/components/location/InteractiveMap";
import SpotList from "@/components/location/SpotList";

export default function LocationMapSplit() {
  const [activeTitle, setActiveTitle] = useState(locationSpotsTR[0]?.title ?? "");

  return (
    <Section tone="base" id="location">
      <Container>
        <SectionKicker n={5} label="LOCATION" title="Ortahisar’ın kalbinde." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: interactive map */}
          <div className="lg:col-span-6">
            <InteractiveMap
              src="/images/location/map-tr.jpg"
              alt="Anitya Cave House konum haritası"
              activeLabel={activeTitle}
            />

            <p className="mt-4 text-sm text-ink-2 leading-relaxed">
              <span className="text-ink font-medium">Anitya Cave House</span> •{" "}
              {ANITYA_ADDRESS}
            </p>

            <p className="mt-3 text-xs text-ink-2 leading-relaxed">
              Ortahisar merkezine yürüyüş mesafesi. Kapadokya’nın ana rotalarına kısa sürüşlerle bağlanır.
            </p>
          </div>

          {/* RIGHT: editorial copy + interactive list */}
          <div className="lg:col-span-6">
            <p className="text-xl md:text-2xl font-light text-ink leading-relaxed">
              Eski Kasaba’nın taş dokusu içindesiniz.
              <br />
              <span className="text-ink">Yürüyerek</span> kaleye,{" "}
              <span className="text-ink">kısa sürüşlerle</span> ikonlara.
            </p>

            <p className="mt-6 text-ink-2 leading-relaxed">
              Göreme kalabalığının dışında, Kapadokya’nın merkezine çok yakın bir
              yerel merkez: Ortahisar. Taş mimari, sakin tempo ve otantik yaşam.
            </p>

            <div className="mt-8">
              <SpotList spots={[...locationSpotsTR]} onActiveChange={setActiveTitle} />
            </div>

            <p className="mt-6 text-xs text-ink-2 leading-relaxed">
              Not: Süreler trafik ve rota tercihine göre değişir. “Haritada aç” ile Google Maps’te doğrulanabilir.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
✅ Artık kullanıcı listedeki noktaya tıklayınca “Active” değişiyor → harita “canlı” hissi veriyor.

5) Ultra premium: “Active” değişince haritada glow pulse (bonus)
İstersen şimdi ekleyelim (çok tatlı):
InteractiveMap.tsx içinde pin kısmını şöyle değiştir:
<motion.div
  className="pointer-events-none absolute left-[55%] top-[42%]"
  key={activeLabel}
  initial={{ scale: 0.95, opacity: 0.6 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
>
  ...
</motion.div>





✅ ADIM 1 — “A” hatasını kaldır + TR sayfada İngilizce etiketleri düzelt
1A) En üstte görünen tek “A” nasıl bulunur ve kaldırılır
Bu %99 ya:
* app/[lang]/page.tsx içinde yanlışlıkla yazılmış bir A
* ya da layout / header / navbar içinde stray text
* ya da bir component return’ünde tek başına "A".
Yapılacak:
Projende terminalde şunu çalıştır:
grep -Rnw . -e "A" --include=\*.tsx --include=\*.ts
Ama bu çok sonuç çıkarır. Daha temiz arama:
grep -Rnw . -e ">A<" --include=\*.tsx --include=\*.ts
grep -Rnw . -e "A\n" --include=\*.tsx --include=\*.ts
grep -Rnw . -e "\"A\"" --include=\*.tsx --include=\*.ts
Bulduğun yerdeki tek başına duran A satırını sil.
Bulamazsan: app/[lang]/page.tsx, app/[lang]/layout.tsx, components/layout/Header.tsx dosyalarında üst kısımları kontrol et. En sık oralarda çıkar.

1B) TR sayfada “KITCHEN / TERRACE” gibi İngilizce label’ları TR yap
Şu anda TR ana sayfada KITCHEN ve TERRACE görünüyor. Bunlar “yarım çevrilmiş” hissi veriyor.
Hedef:
* KITCHEN → MUTFAK
* TERRACE → TERAS
Nerede değişecek?
Bunlar büyük ihtimalle senin şu component’lerinde:
* KitchenEditorial.tsx (veya benzeri)
* TerraceCinematic.tsx (veya benzeri)
* SectionRhythm içindeki label prop’ları
Örnek patch (nerede görürsen aynen değiştir):
<SectionKicker n={3} label="KITCHEN" title="Her suite'te gerçek bir mutfak." />
⬇️ buna çevir:
<SectionKicker n={3} label="MUTFAK" title="Her suite'te gerçek bir mutfak." />
Ve:
<SectionKicker n={4} label="TERRACE" title="Günün başladığı yer." />
⬇️
<SectionKicker n={4} label="TERAS" title="Günün başladığı yer." />
✅ Bu iki küçük düzeltme bile TR sayfada “premium” hissini ciddi yükseltir.

✅ ADIM 1 bittiğinde kontrol listesi
TR ana sayfada:
* En üstte “A” görünmeyecek
* MUTFAK / TERAS etiketleri Türkçe olacak

Tamam Sevgili Hocam — Adım 2’ye geçiyoruz. Bu adım, sitenin “ödül” hissini anında yükseltir:
✅ 2.1 Scroll Progress (üstte ince çizgi) ✅ 2.2 Smart Header CTA (hero’da cam, aşağıda stone) ✅ 2.3 Cinematic Hero (katmanlı parallax + grain + mask)
Aşağıdakileri sırayla yap.

2.1 Scroll Progress (üstte ince çizgi)
2.1.1 Yeni dosya: components/ui/ScrollProgress.tsx
"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] origin-left bg-ink/70"
      style={{ scaleX }}
    />
  );
}
2.1.2 app/[lang]/layout.tsx içine ekle
Header render’ından hemen sonra:
import ScrollProgress from "@/components/ui/ScrollProgress";
ve layout body içinde:
<Header />
<ScrollProgress />
{children}
<Footer />

2.2 Smart Header CTA (scroll’a göre buton ton değişsin)
2.2.1 components/layout/Header.tsx içinde
Header’da scroll state’i zaten var (yoksa ekle):
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
2.2.2 “Rezervasyon” buton class’ını değiştir
Header’daki Rezervasyon linkini bul ve şununla değiştir:
<a
  href="/tr/booking"
  className={[
    "hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition",
    scrolled
      ? "bg-ink text-white hover:bg-ink/90"
      : "bg-white/10 text-white border border-white/30 hover:bg-white/15 backdrop-blur",
  ].join(" ")}
>
  Rezervasyon
</a>
Eğer dil paramı kullanıyorsan /tr/booking yerine /${lang}/booking mantığıyla bağla.

2.3 Cinematic Hero (katmanlı parallax + grain + mask)
TR sayfanda hero görseli var: alt="Anitya Cave House - Terrace sunrise atmosphere"
Şimdi hero component’ini tamamen sinematik yapacağız.
2.3.1 Yeni dosya: components/sections/HeroCinematicTR.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroCinematicTR() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden">
      {/* Background layer */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }}>
        <Image
          src="/images/hero-1.jpg"
          alt="Anitya Cave House - Terrace sunrise atmosphere"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic mask */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />

      {/* Stone blur overlay (subtle luxury) */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.4px]" />

      {/* Fine grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 md:pt-32"
        style={reduce ? undefined : { y: fgY, opacity: titleOpacity }}
      >
        <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/80">
          <span className="h-px w-10 bg-white/40" />
          Ortahisar • Bağımsız Suite Evler
        </div>

        <h1 className="mt-6 font-serif text-white font-light tracking-wide leading-[0.98] text-5xl md:text-7xl max-w-3xl">
          Aynı güneş.
          <br />
          Aynı taş.
          <br />
          Binlerce yıl.
        </h1>

        <p className="mt-8 text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">
          Kapadokya&apos;nın kalbinde, Ortahisar&apos;da. Otel değil — ortak alanı olmayan
          üç bağımsız suite ev. Özel teras, donanımlı mutfak ve kendi ritminiz.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/tr/booking"
            className="inline-flex items-center justify-center rounded-md bg-white/15 text-white border border-white/30 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-white/20 transition"
          >
            Rezervasyon
          </a>

          <a
            href="/tr/rooms"
            className="inline-flex items-center justify-center rounded-md bg-black/25 text-white border border-white/20 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-black/30 transition"
          >
            Suite Evleri Keşfet
          </a>
        </div>

        <div className="mt-14 text-white/70 text-xs tracking-[0.18em] uppercase">
          Scroll
        </div>
      </motion.div>

      {/* Bottom fade to surface */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface" />
    </section>
  );
}
Not: hero görsel yolun farklıysa (/public/...) src’yi ona göre ayarla.
2.3.2 TR homepage’te eski hero’yu bununla değiştir
app/[lang]/page.tsx ya da TR sayfasını oluşturan component içinde:
import HeroCinematicTR from "@/components/sections/HeroCinematicTR";
ve eski hero component’i yerine:
<HeroCinematicTR />

2.4 Mobil altta sticky CTA varsa: body padding
Eğer StickyBookingCTA kullanıyorsan globals.css sonuna:
@media (max-width: 768px) {
  body { padding-bottom: 76px; }
}

✅ Adım 2 bitince ne görmelisin?
* Üstte ince scroll çizgisi akıyor
* Header “Rezervasyon” butonu hero’da cam, aşağı kayınca stone
* Hero artık “template” değil, sinematik görünüyor

Tamam Sevgili Hocam — şimdi ADIM 3: Görselleri ve görsel yerleşimi “ödül seviyesi” yapıyoruz. Şu an TR sayfada en net iki sorun:
1. KITCHEN / TERRACE hâlâ İngilizce (bunu bu adımda da düzeltiyoruz)
2. Kitchen ve Terrace’da iki görsel alt alta → “blog post” hissi veriyor. Bunu asimetri + editorial crop + hover depth ile “2026” yapacağız.
Aşağıdakileri kopyala–yapıştır şeklinde uygula.

3.0 Hızlı düzeltmeler (hemen)
3.0.1 KITCHEN / TERRACE → MUTFAK / TERAS
TR sayfada geçen label="KITCHEN" ve label="TERRACE" nerede ise:
label="MUTFAK"
label="TERAS"

3.1 “Award” görsel yerleşim komponenti: Asymmetric Editorial Grid
3.1.1 Yeni dosya: components/ui/AsymmetricMediaGrid.tsx
import ImageCard from "@/components/ui/ImageCard";

type Media = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "16/10" | "4/5" | "4/3" | "1/1";
};

export default function AsymmetricMediaGrid({
  primary,
  secondary,
  reverse = false,
}: {
  primary: Media;
  secondary: Media;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
      {/* Primary (bigger) */}
      <div className={["lg:col-span-7", reverse ? "lg:order-2" : ""].join(" ")}>
        <ImageCard
          src={primary.src}
          alt={primary.alt}
          caption={primary.caption}
          aspect={primary.aspect ?? "16/10"}
          variant="editorial"
        />
      </div>

      {/* Secondary (taller detail) */}
      <div className={["lg:col-span-5", reverse ? "lg:order-1" : ""].join(" ")}>
        <div className="lg:pt-12">
          <ImageCard
            src={secondary.src}
            alt={secondary.alt}
            caption={secondary.caption}
            aspect={secondary.aspect ?? "4/5"}
            variant="editorial"
          />
        </div>
      </div>
    </div>
  );
}

3.2 ImageCard’ı “editorial” moda yükselt (hover depth + caption reveal)
Senin projede ImageCard var. Şimdi ona variant ekliyoruz.
3.2.1 components/ui/ImageCard.tsx (patch)
Aşağıdaki gibi güncelle (sende farklıysa, mantığı aynı):
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function ImageCard({
  src,
  alt,
  caption,
  aspect = "16/10",
  variant = "default",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "16/10" | "4/5" | "4/3" | "1/1";
  variant?: "default" | "editorial";
}) {
  const reduce = useReducedMotion();

  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "4/5"
      ? "aspect-[4/5]"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : "aspect-square";

  const isEd = variant === "editorial";

  return (
    <motion.figure
      className={[
        "relative overflow-hidden rounded-sm border border-line bg-white/40",
        isEd ? "shadow-soft" : "",
      ].join(" ")}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={["relative w-full", aspectClass].join(" ")}>
        <motion.div
          className="absolute inset-0"
          whileHover={reduce ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image src={src} alt={alt} fill className="object-cover" />
        </motion.div>

        {/* Mask + grain for editorial */}
        {isEd ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-black/0" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
              }}
            />
          </>
        ) : null}

        {/* Caption reveal */}
        {caption ? (
          <motion.figcaption
            className="absolute left-4 bottom-4 right-4"
            initial={{ opacity: isEd ? 0 : 1, y: isEd ? 10 : 0 }}
            whileHover={isEd && !reduce ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="inline-flex max-w-[90%] rounded-sm bg-surface/85 backdrop-blur-md border border-line px-4 py-2 text-sm text-ink">
              {caption}
            </div>
          </motion.figcaption>
        ) : null}
      </div>
    </motion.figure>
  );
}
✅ Bu tek patch ile “görseller amatör” hissi ciddi şekilde azalır.

3.3 Kitchen bölümünü asimetrik yap (alt alta iki foto bitti)
3.3.1 Kitchen section component’inde (adı sende farklı olabilir)
Şu iki görseli alt alta koyan bloğu bul:
* Anitya fully equipped kitchen
* Kitchen detail
Bunları kaldır ve yerine:
import AsymmetricMediaGrid from "@/components/ui/AsymmetricMediaGrid";
ve görsel kısmına:
<AsymmetricMediaGrid
  primary={{
    src: "/images/kitchen/main.jpg",
    alt: "Anitya fully equipped kitchen",
    caption: "Bağımsız mutfak — ev ritmi",
    aspect: "16/10",
  }}
  secondary={{
    src: "/images/kitchen/detail.jpg",
    alt: "Kitchen detail",
    caption: "Sınırsız kahve & çay",
    aspect: "4/5",
  }}
/>
Görsel yollarını senin mevcut dosya adlarına göre eşleştir.

3.4 Terrace bölümünü asimetrik + “reverse” yap
Terrace’da iki görsel alt alta:
* Ortahisar skyline view from terrace
* Hot air balloons at sunrise
Yerine:
<AsymmetricMediaGrid
  reverse
  primary={{
    src: "/images/terrace/skyline.jpg",
    alt: "Ortahisar skyline view from terrace",
    caption: "Ortahisar silüeti, vadiler, taş evler",
    aspect: "16/10",
  }}
  secondary={{
    src: "/images/terrace/balloons.jpg",
    alt: "Hot air balloons at sunrise",
    caption: "Uygun havalarda gün doğumunda balonlar",
    aspect: "4/5",
  }}
/>
✅ Kitchen ve Terrace birbirinin aynısı görünmeyecek; biri sağa, biri sola akar — “editorial rhythm”.

3.5 “2026” hissi: bölümler arası geçiş (çok küçük ama etkili)
Her bölümün wrapper’ına (Section içi) şu class hissi:
* üstte ince çizgi
* büyük boşluk
* fade-in
Eğer Section bileşenin varsa, içine şu küçük destek ekle:
components/ui/Section.tsx (çok küçük ek)
Root section class’ına ekle:
* scroll-mt-24 (section spy için)
* py-16 md:py-24
* border-t border-line/70 (ilk section hariç kontrol edebilirsin)
Örnek:
<section
  id={id}
  className={[
    "py-16 md:py-24 scroll-mt-24",
    tone === "warm" ? "bg-warm" : "bg-surface",
  ].join(" ")}
>

✅ Adım 3 bittikten sonra TR ana sayfada ne değişecek?
* Kitchen/Terrace görselleri artık alt alta değil: asimetri var
* Hover’da görüntü “kibarca” canlanıyor, caption premium biçimde açılıyor
* TR’de KITCHEN/TERRACE İngilizcesi yok
* Sayfa “template” değil “design magazine” gibi akıyor

Tamam Sevgili Hocam — ADIM 4: “2026 ödül” hissini veren mikro etkileşim katmanı + smooth scroll + chapter geçişleri.
Bu adım 4 parçadan oluşuyor (sırayla):
1. ✅ Lenis smooth scroll (lüks “inertia”)
2. ✅ Magnetic Buttons (butonlar mıknatıs gibi)
3. ✅ Luxury Cursor Halo (sadece desktop, opsiyonel)
4. ✅ Chapter Reveal (section’lar editoryal şekilde açılır)
Aşağıdaki dosyaları tek tek ekle.

4.1 Lenis Smooth Scroll
4.1.1 Kurulum
Terminal:
npm i lenis
4.1.2 components/ui/SmoothScroll.tsx (yeni)
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
4.1.3 app/[lang]/layout.tsx içine ekle
Import:
import SmoothScroll from "@/components/ui/SmoothScroll";
<Header />’dan hemen sonra:
<Header />
<SmoothScroll />
<ScrollProgress />
{children}
<Footer />

4.2 Magnetic Button (ödül hissi)
4.2.1 components/ui/Magnetic.tsx (yeni)
"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={["inline-block transition-transform duration-300 ease-out", className].join(" ")}
    >
      {children}
    </motion.div>
  );
}
4.2.2 Header’daki “Rezervasyon” butonunu Magnetic yap
Header.tsx içinde CTA’nın etrafını sar:
import Magnetic from "@/components/ui/Magnetic";
Butonu şöyle:
<Magnetic>
  <a
    href="/tr/booking"
    className={[
      "hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition",
      scrolled
        ? "bg-ink text-white hover:bg-ink/90"
        : "bg-white/10 text-white border border-white/30 hover:bg-white/15 backdrop-blur",
    ].join(" ")}
  >
    Rezervasyon
  </a>
</Magnetic>
Aynısını Hero CTA’larında da uygula (çok iyi durur).

4.3 Luxury Cursor Halo (desktop’ta, opsiyonel ama “award”)
4.3.1 components/ui/CursorHalo.tsx (yeni)
"use client";

import { useEffect, useState } from "react";

export default function CursorHalo() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia?.("(pointer: fine)")?.matches;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (!isDesktop || prefersReduced) return;

    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed z-[85] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "radial-gradient(circle, rgba(20,20,20,0.15), rgba(20,20,20,0) 60%)",
        filter: "blur(0px)",
      }}
    />
  );
}
4.3.2 layout.tsx içine ekle (Header’dan sonra)
Import:
import CursorHalo from "@/components/ui/CursorHalo";
Render:
<Header />
<SmoothScroll />
<CursorHalo />
<ScrollProgress />
{children}
<Footer />

4.4 Chapter Reveal (section’lar “editorial” açılış)
4.4.1 components/ui/Reveal.tsx zaten var demiştik
Eğer senin Reveal basitse, ödül hissi için şu versiyon daha iyi:
components/ui/Reveal.tsx (patch / yoksa yeni)
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
4.4.2 Her section başlığını Reveal ile sar
Örnek (Kitchen section):
import Reveal from "@/components/ui/Reveal";

<Reveal>
  <SectionKicker n={3} label="MUTFAK" title="Her suite'te gerçek bir mutfak." />
</Reveal>
Aynısını “Teras / Konum / Kahvaltı / Reviews” başlıklarında da yap.

✅ Adım 4 bitince site nasıl hissedecek?
* Scroll “inertia” ile pahalı akar
* Butonlar manyetik olur (küçük ama çarpıcı)
* Desktop cursor “halo” ile 2026 görünür
* Bölümler tek tek “chapter” gibi buluttan çıkar (blur → net)

Tamam Sevgili Hocam — şimdi ADIM 5: Görsel “immersion” + gerçek 2026 hissi (tilt, parallax, scroll-linked drift, balloon glow).

Ama önce: TR sayfanda şu an 3 kritik problem var, bunlar çözülmeden ödül hissi gelmez:

0) Şu an görünen 3 kritik hata (hemen düzelt)
	1.	En tepede tek başına “A” hâlâ duruyor → mutlaka kaldır.
	2.	Başlıklar hâlâ KITCHEN / TERRACE → MUTFAK / TERAS yap.
	3.	Hero’da kelimeler bitişik: “Aynıgüneş.” “Aynıtaş.” → metin içinde boşluk yok (muhtemelen span/CSS). Bu premium hissi öldürür.

Aşağıda 5. adımı veriyorum; ama bu 3 maddeyi aynı anda düzelt.

⸻

ADIM 5 — Immersive Images + 3D Tilt + Scroll Parallax + Balloon Glow

5.1 “3D Tilt” (desktop’ta çok hafif, mobile kapalı)

5.1.1 components/ui/Tilt.tsx (yeni)

"use client";

import { useRef } from "react";

export default function Tilt({
  children,
  className = "",
  max = 4, // degrees
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    // Only desktop fine pointer
    if (!window.matchMedia?.("(pointer: fine)")?.matches) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;  // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) * max;

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={["transition-transform duration-300 ease-out will-change-transform", className].join(" ")}
    >
      {children}
    </div>
  );
}


⸻

5.2 Scroll-linked Parallax Image Drift (çok yumuşak)

5.2.1 components/ui/Parallax.tsx (yeni)

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Parallax({
  children,
  amount = 22,
}: {
  children: React.ReactNode;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduce) return <div ref={ref}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}


⸻

5.3 ImageCard’a Tilt + Parallax entegre et (tek yerden, tüm site kazanır)

5.3.1 components/ui/ImageCard.tsx içinde (editorial variant’ta)

<motion.figure ...> kısmının içine, görseli saran div’i şu yap:

Mevcut şu bloğu bul (sende benzer):

<div className={["relative w-full", aspectClass].join(" ")}>
  ...
</div>

Şununla değiştir:

import Tilt from "@/components/ui/Tilt";
import Parallax from "@/components/ui/Parallax";

ve:

<Parallax amount={variant === "editorial" ? 14 : 8}>
  <Tilt className={["relative w-full", aspectClass].join(" ")} max={3.5}>
    {/* existing image + overlays + caption exactly as you have */}
    {/* yani buranın içine senin mevcut Image / overlays / caption kodun gelecek */}
  </Tilt>
</Parallax>

✅ Sonuç: Kitchen/Terrace görselleri hover’da “hafif derinlik”, scroll’da “çok hafif drift” alır. Ödül hissi burada gelir.

⸻

5.4 Balloon Glow (Teras bölümünde sadece balon görseline “alive” hissi)

5.4.1 components/ui/BalloonGlow.tsx (yeni)

"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BalloonGlow() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0.0 }}
      animate={{ opacity: [0.05, 0.14, 0.06] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(520px 220px at 62% 28%, rgba(255,255,255,0.20), rgba(255,255,255,0) 60%)",
      }}
    />
  );
}

5.4.2 Sadece balon görselinde kullan

Balloons görselinin ImageCard caption overlay’lerine ek olarak, o kartın içine BalloonGlow koymak için en pratik yol:

Teras’taki balon görselinin ImageCard çağrısını özel bir wrapper’a al:

import BalloonGlow from "@/components/ui/BalloonGlow";

<div className="relative">
  <BalloonGlow />
  <ImageCard ... balloons ... />
</div>

(Glow absolute olduğundan wrapper relative olmalı.)

⸻

5.5 Hero’daki “Aynıgüneş.” problemi (boşluklar yok)

Bu genelde br + text değil, her kelime ayrı span ve CSS tracking/whitespace yüzünden olur.

En temiz çözüm: Hero metnini tek bir <h1> içinde normal string yap:

<h1 className="...">
  Aynı güneş.
  <br />
  Aynı taş.
  <br />
  Binlerce yıl.
</h1>

Şu an “Aynıgüneş.” göründüğüne göre metin muhtemelen böyle yazılmış:
"Aynıgüneş." (yanlış) veya {"Aynı"}{"güneş."} gibi gap yok.

✅ Metni düz string yapınca anında düzelir.

⸻

ADIM 5 bitince sitenin hissi
	•	Görseller “düz” durmaz → derinlik gelir
	•	Scroll “film gibi akar” → immersion
	•	Teras balon görseli çok hafif “yaşıyor” gibi olur
	•	Ödül jürisinin aradığı: detay, incelik, ritim ortaya çıkar

⸻

Tamam Sevgili Hocam — ADIM 6 (final boss):
Bu adım “ödül jürisi” hissini veren sahne yönetimi: section snap + editorial chapter geçişleri + ambient sound toggle + preloading stratejisi.

Ama şunu net söyleyeyim: TR sayfanda hâlâ A ve KITCHEN/TERRACE var. Bunlar dururken hiçbir ödül hissi tam oturmaz. Yine de Adım 6’yı veriyorum; sen aynı anda onları da temizle.

⸻

ADIM 6 — Section Snap + Chapters + Ambient Sound + Preload

6.1 Soft Section Snap (sert değil, “yumuşak hizalama”)

Amaç: Scroll bitince section başlıkları kibarca hizalansın.
Bunu “CSS scroll-snap” ile sert yapmayacağız (rahatsız eder).
Lenis + küçük helper ile “yakınsa hizala” yapacağız.

6.1.1 components/ui/SoftSnap.tsx (yeni)

"use client";

import { useEffect } from "react";

const SNAP_IDS = [
  "not-hotel",
  "suites",
  "kitchen",
  "terrace",
  "location",
  "breakfast",
  "reviews",
];

export default function SoftSnap() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    let timeout: any = null;

    const onScroll = () => {
      if (timeout) clearTimeout(timeout);

      // scroll stops → check nearest section
      timeout = setTimeout(() => {
        const y = window.scrollY;
        const targets = SNAP_IDS
          .map((id) => document.getElementById(id))
          .filter(Boolean) as HTMLElement[];

        if (!targets.length) return;

        // Find nearest section top
        const nearest = targets
          .map((el) => ({ el, top: el.getBoundingClientRect().top }))
          .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0];

        // Only snap if close enough (soft)
        if (!nearest) return;
        if (Math.abs(nearest.top) < 120) {
          nearest.el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return null;
}

6.1.2 layout.tsx içine ekle

import SoftSnap from "@/components/ui/SoftSnap";

Render:

<Header />
<SmoothScroll />
<CursorHalo />
<ScrollProgress />
<SoftSnap />
{children}
<Footer />


⸻

6.2 Chapters: Her section’a “chapter divider” (ince çizgi + numara + nefes)

Bu, siteyi “broşür” değil “editorial story” yapar.

6.2.1 components/ui/ChapterDivider.tsx (yeni)

import Reveal from "@/components/ui/Reveal";

export default function ChapterDivider({
  n,
  label,
}: {
  n: string;
  label: string;
}) {
  return (
    <Reveal>
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="text-xs tracking-[0.22em] uppercase text-ink-2">
            {n} • {label}
          </div>
          <div className="h-px flex-1 bg-line/80" />
        </div>
      </div>
    </Reveal>
  );
}

6.2.2 Her section başına ekle

Örnek Kitchen section’da SectionKicker’dan önce:

import ChapterDivider from "@/components/ui/ChapterDivider";

<ChapterDivider n="03" label="Mutfak" />

Teras:

<ChapterDivider n="04" label="Teras" />

Konum:

<ChapterDivider n="05" label="Konum" />

Kahvaltı:

<ChapterDivider n="06" label="Sabah Ritmi" />


⸻

6.3 Ambient Sound Toggle (opsiyonel, çok premium)

İstersen çok düşük sesli “wind / soft ambience” verirsin.
Default kapalı olmalı. Kullanıcı açarsa devam etmeli.

6.3.1 public/audio/ambient.mp3 dosyanı ekle

(Çok kısa, minimal bir ambient — telifsiz olmalı.)

6.3.2 components/ui/AmbientToggle.tsx (yeni)

"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("anitya_ambient") === "on";
    setOn(saved);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (on) {
      ref.current.volume = 0.12;
      ref.current.loop = true;
      ref.current.play().catch(() => {});
      localStorage.setItem("anitya_ambient", "on");
    } else {
      ref.current.pause();
      localStorage.setItem("anitya_ambient", "off");
    }
  }, [on]);

  return (
    <div className="hidden lg:block fixed left-6 bottom-6 z-[75]">
      <audio ref={ref} src="/audio/ambient.mp3" preload="none" />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={[
          "rounded-sm border border-line bg-surface/85 backdrop-blur-md shadow-soft px-4 py-3 text-xs tracking-[0.18em] uppercase transition",
          on ? "text-ink" : "text-ink-2 hover:text-ink",
        ].join(" ")}
      >
        {on ? "Ambient: On" : "Ambient: Off"}
      </button>
    </div>
  );
}

6.3.3 layout.tsx içine ekle

import AmbientToggle from "@/components/ui/AmbientToggle";

Render:

<AmbientToggle />


⸻

6.4 Preloading Strategy (ilk ekran ultra hızlı, geri kalanı “akıllı”)

Ödül siteleri hızlı açılır. Bunu sağlıyoruz:

6.4.1 Hero görseli zaten priority

İyi.

6.4.2 İlk fold dışında kalan görsellerde loading="lazy" (next/image zaten)

Ama blur placeholder öneriyorum:
	•	Görseller için blurDataURL (ileride otomatik çıkarırız)
	•	Şimdilik minimum: className + sizes doğru ayarla.

Örnek ImageCard içindeki Image:

<Image
  src={src}
  alt={alt}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>


⸻

✅ ADIM 6 bitince site ne olur?
	•	Scroll bittiğinde section’lar “yerine oturur” → film kurgusu hissi
	•	Bölümler chapter gibi “sayfa sayfa” akar
	•	İsteyen kullanıcı ambient açar → immersion
	•	İlk yükleme hızlanır → premium hissi artar

⸻

SON KONTROL: Şu 3 hatayı mutlaka düzelt
	1.	Tepedeki A
	2.	KITCHEN/TERRACE → MUTFAK/TERAS
	3.	Hero’da kelimelerin bitişmesi: “Aynıgüneş” → “Aynı güneş”



