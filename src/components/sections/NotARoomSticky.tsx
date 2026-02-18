import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SectionChapter from "@/components/ui/SectionChapter";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useTranslations } from 'next-intl';

export default function NotARoomSticky() {
  const t = useTranslations('chapters');
  const tRoom = useTranslations('notARoom');
  const tHome = useTranslations('home.exclusivity.features');

  return (
    <Section tone="warm">
      <Container>
        <SectionChapter number="02" label={t('independentHomes')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image col – sticky on desktop */}
          <div className="md:sticky md:top-24">
            <ParallaxImage
              src="/images/anitya-cave-suite/cahop_3qp.avif"
              alt="Anitya suite living atmosphere"
              strength={16}
              className="w-full aspect-[16/9] rounded-2xl"
            />
          </div>

          {/* Text col */}
          <div>
            <Reveal>
              <h2 className="font-light tracking-wide text-ink font-serif">
                <span className="block text-2xl md:text-3xl mb-2">{tRoom('title')}</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl">{tRoom('subtitle')}</span>
              </h2>
            </Reveal>

            <Reveal delayMs={80}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                {tRoom('intro')}
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              <Reveal delayMs={120}>
                <p className="text-xl md:text-2xl font-light text-ink">{tRoom('item1')}</p>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="text-xl md:text-2xl font-light text-ink">{tRoom('item2')}</p>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="text-xl md:text-2xl font-light text-ink">{tRoom('item3')}</p>
              </Reveal>
            </div>

            <Reveal delayMs={260}>
              <p className="mt-12 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                {tRoom('closing')}
              </p>
            </Reveal>

            {/* 3 feature mini cards */}
            <Reveal delayMs={340}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "↗", label: tHome('entrance') },
                  { icon: "◻", label: tHome('terrace') },
                  { icon: "⌂", label: tHome('living') },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-black/5 bg-white/50 p-5"
                  >
                    <span className="block text-xl text-ink-2 mb-2">{card.icon}</span>
                    <span className="text-sm text-ink leading-snug">{card.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
