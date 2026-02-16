import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function ManifestoBlock() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-ink leading-[1.05] max-w-4xl font-serif">
            Otel değil.
            <br />
            Ortak alan yok.
            <br />
            Tamamen size ait.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl border-l border-line pl-6">
            Anitya Cave House, aynı yapı içinde konumlanan ortak alanı olmayan{" "}
            <span className="text-ink">3 bağımsız suite evden</span>{" "}
            oluşur. İki mağara suite, bir taş suite. Tamamı yalnızca misafirler
            için hazırlanmıştır.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
