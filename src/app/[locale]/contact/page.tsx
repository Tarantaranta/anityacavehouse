import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import ContactCard from "@/components/ui/ContactCard";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { generatePageMetadata } from '@/lib/seo-utils';
import { Locale } from '@/lib/seo-config';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    tr: 'İletişim – Anitya Cave House | Kapadokya Rezervasyon',
    en: 'Contact – Anitya Cave House | Cappadocia Booking',
    zh: '联系我们 – Anitya洞穴之家 | 卡帕多西亚预订',
  };
  const descriptions = {
    tr: 'Anitya Cave House ile iletişime geçin. Rezervasyon, fiyat bilgisi ve sorularınız için.',
    en: 'Contact Anitya Cave House. For reservations, pricing information, and inquiries.',
    zh: '联系Anitya洞穴之家。预订、价格信息和咨询。',
  };
  const l = locale as Locale;
  return generatePageMetadata({
    title: titles[l] || titles.tr,
    description: descriptions[l] || descriptions.tr,
    path: '/contact',
    locale: l,
  });
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 13.92v3z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

export default async function ContactPage({ params }: PageProps) {
  await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* C0 — Hero */}
      <PageHero
        label="Ortahisar · Kapadokya"
        title="İletişim"
        subtitle="Size en uygun suite'i ve ritmi birlikte planlayalım."
        imageSrc="/images/cave-house.avif"
        imageAlt="Ortahisar taş evleri — Anitya Cave House"
      />

      {/* C1 — Contact cards */}
      <SectionShell>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-600 mb-10">
            Ulaşım kanalları
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          <Reveal>
            <ContactCard
              title="Telefon"
              detail="+90 535 494 68 14"
              subDetail="Her gün 08:00 – 22:00"
              href="tel:+905354946814"
              icon={<PhoneIcon />}
            />
          </Reveal>
          <Reveal delayMs={80}>
            <ContactCard
              title="WhatsApp"
              detail="+90 535 494 68 14"
              subDetail="7/24 mesaj gönderebilirsiniz"
              href="https://wa.me/905354946814"
              linkLabel="WhatsApp'tan Yaz →"
              icon={<WhatsAppIcon />}
            />
          </Reveal>
          <Reveal delayMs={160}>
            <ContactCard
              title="E-posta"
              detail="info@anityacavehouse.com"
              subDetail="24 saat içinde yanıt"
              href="mailto:info@anityacavehouse.com"
              icon={<MailIcon />}
            />
          </Reveal>
        </div>
      </SectionShell>

      {/* C2 — İletişim formu */}
      <SectionShell className="pt-0 md:pt-0">
        <Reveal>
          <ContactForm />
        </Reveal>
      </SectionShell>

      {/* C3 — Konum (editoryal) */}
      <SectionShell className="pt-0 md:pt-0 pb-20 md:pb-28">
        <Reveal>
          <div className="bg-white/40 border border-black/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-600 mb-4">
                Konum
              </p>
              <p className="font-serif font-light text-2xl md:text-3xl text-neutral-900 mb-1">
                Anitya Cave House
              </p>
              <p className="text-sm text-neutral-600 mb-5">
                Ortahisar, Kapadokya
              </p>
              <p className="text-neutral-600 leading-relaxed text-sm max-w-[48ch] mb-6">
                Ortahisar Eski Kasaba'nın kalbinde, Kapadokya'nın kaya silüetleri arasında yer alır.
                Nevşehir iline bağlı Ortahisar ilçesi; Ürgüp'e 6 km, Göreme'ye 8 km uzaklıktadır.
                En yakın havalimanı Nevşehir Kapadokya (NAV) — yaklaşık 30 dakika.
              </p>
              <a
                href="https://maps.google.com/?q=Anitya+Cave+House,+Ortahisar,+Nevşehir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-800 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700 transition-all"
              >
                Haritada Aç →
              </a>
            </div>
            <div className="w-full md:w-72 lg:w-96 flex-shrink-0">
              <div className="rounded-xl overflow-hidden aspect-[4/3] border border-black/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12575.0!2d34.9116!3d38.6285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b6a3fffff%3A0x1!2sOrtahisar%2C+Nevşehir!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anitya Cave House konum"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}
