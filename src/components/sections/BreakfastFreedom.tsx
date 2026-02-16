import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function BreakfastFreedom() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
            Sabah size ait.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl border-l border-line pl-6">
            Anitya Cave House'da sabit bir kahvaltı servisi bulunmaz. Bunun
            yerine 2 dakikalık yürüme mesafesinde kahvaltı seçenekleri, 4–5
            dakikalık yürüme mesafesinde geniş restoran çeşitliliği ve Ortahisar
            merkezden suite evlere sipariş imkânı vardır.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-ink max-w-3xl font-serif">
            İsterseniz dışarıda, isterseniz evinizde.
            <br />
            Kendi ritminizde.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
