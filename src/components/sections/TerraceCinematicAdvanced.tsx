import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SectionChapter from "@/components/ui/SectionChapter";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useTranslations } from 'next-intl';

export default function TerraceCinematicAdvanced() {
  const t = useTranslations('chapters');
  const tT = useTranslations('terrace');

  return (
    <Section tone="base">
      <Container>
        <SectionChapter number="04" label={t('terrace')} />
        <SectionKicker label={tT('label')} title={tT('sectionTitle')} />

        {/* Main image – full width 16:9 */}
        <ParallaxImage
          src="/images/terrace/cappadocia-balloon-terrace.avif"
          alt="Cappadocia hot air balloons from terrace"
          strength={20}
          className="w-full aspect-[16/9] rounded-2xl"
        />

        {/* 2-column support images */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ParallaxImage
            src="/images/terrace/cave-house-hot-air-balloon.avif?v=2"
            alt="Cave house with hot air balloon view"
            strength={16}
            className="w-full aspect-[16/9] rounded-2xl"
          />
          <ParallaxImage
            src="/images/terrace/cappadocia-hot-air-balloon.avif"
            alt="Hot air balloons at sunrise"
            strength={16}
            className="w-full aspect-[16/9] rounded-2xl"
          />
        </div>

        {/* Text block below images */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-[68ch]">
                {tT('p1')}
              </p>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-[68ch]">
                {tT('p2')}{" "}
                <span className="text-ink font-medium">{tT('p2Highlight')}</span>{" "}
                {tT('p2End')}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delayMs={200}>
              <p className="text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug font-serif italic max-w-[52ch]">
                {tT('closing')}
                <br />
                <span className="text-accent not-italic">{tT('closingEmphasis')}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
