import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from 'next-intl';

export default function SuitesOverview() {
  const t = useTranslations('suites');

  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
            {t('title')}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="border-l border-line pl-6">
              <p className="text-base md:text-lg text-ink-2 leading-relaxed">
                {t('description')}
              </p>
            </div>
            <div className="border-l border-line pl-6">
              <p className="text-base md:text-lg text-ink-2 leading-relaxed">
                {t('detail')}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
