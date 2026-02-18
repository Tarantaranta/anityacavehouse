import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from 'next-intl';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-ink leading-[1.05] max-w-4xl font-serif">
            {t('title')}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl">
            {t('description')}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12">
            <a
              href="/tr/booking"
              className="inline-flex items-center justify-center rounded-md bg-ink text-white px-7 py-3 text-sm md:text-base font-medium hover:bg-ink/90 transition"
            >
              {t('cta')}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
