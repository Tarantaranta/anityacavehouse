import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SectionChapter from "@/components/ui/SectionChapter";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useTranslations } from 'next-intl';

export default function KitchenEditorialAdvanced() {
  const t = useTranslations('chapters');
  const tK = useTranslations('kitchen');

  return (
    <Section tone="warm">
      <Container>
        <SectionChapter number="03" label={t('kitchen')} />
        <SectionKicker label={tK('label')} title={tK('title')} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visuals col */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary – 16:9 */}
            <ParallaxImage
              src="/images/kitchen/cave-house-kitchen.jpg"
              alt="Anitya fully equipped kitchen"
              strength={14}
              className="w-full aspect-[16/9] rounded-2xl"
            />

            {/* Support – 16:9 below */}
            <ParallaxImage
              src="/images/kitchen/cave-suit-kitchen.avif"
              alt="Kitchen detail"
              strength={12}
              className="w-full aspect-[16/9] rounded-2xl"
            />

            {/* Caption badge */}
            <p className="text-xs text-neutral-500 tracking-wide">
              {tK('primaryCaption')}
            </p>
          </div>

          {/* Copy col */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="text-xl md:text-2xl font-light text-ink leading-relaxed max-w-xl">
                {tK('lead')}
              </p>
            </Reveal>

            <Reveal delayMs={80}>
              <ul className="mt-8 grid gap-2 md:grid-cols-2 text-base text-ink-2 leading-relaxed">
                <li>{tK('item1')}</li>
                <li>{tK('item2')}</li>
                <li>{tK('item3')}</li>
                <li>{tK('item4')}</li>
                <li>{tK('item5')}</li>
                <li>{tK('item6')}</li>
              </ul>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                {tK('p2')}
              </p>
            </Reveal>

            <Reveal delayMs={220}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl font-serif">
                {tK('closing')}
                <br />
                <span className="text-accent">{tK('closingEmphasis')}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
