import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from 'next-intl';

export default function ManifestoBlock() {
  const t = useTranslations('manifesto');

  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-ink leading-[1.05] max-w-4xl font-serif">
            {t('title')}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl border-l border-line pl-6">
            {t('intro')}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
