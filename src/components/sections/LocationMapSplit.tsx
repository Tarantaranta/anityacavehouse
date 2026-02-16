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
              src="/images/old-site/gallery/26160501_kasaba11.jpg"
              alt="Anitya Cave House location map"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
                Ortahisar'ın kalbinde.
                <br />
                Kapadokya'nın merkezinde.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Ortahisar Eski Kasaba'nın tarihi dokusu içindesiniz. Yürüyerek
                kaleye, kısa sürüşlerle Kapadokya'nın ikonik rotalarına
                bağlanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-ink-2">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-ink">Ortahisar Kalesi</p>
                    <p className="text-sm">~2 dk yürüyüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-ink">Göreme Açık Hava Müzesi</p>
                    <p className="text-sm">~7 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-ink">Kızılçukur & Gül Vadisi</p>
                    <p className="text-sm">~5 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-ink">Üç Güzeller</p>
                    <p className="text-sm">~8 dk sürüş</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  <div>
                    <p className="text-ink">Pancarlık Vadisi</p>
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
