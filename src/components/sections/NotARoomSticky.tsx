import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function NotARoomSticky() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="md:sticky md:top-24">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/images/old-site/gallery/cahop_2qp111111.jpg"
                alt="Anitya suite living atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
                Bir oda değil.
                <br />
                Bağımsız bir ev.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Anitya'da konaklamak, bir odaya girmek değil; kendi alanınıza
                çekilmek demektir.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              <Reveal delay={0.1}>
                <p className="text-xl md:text-2xl font-light text-ink">
                  Sessizlik.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-xl md:text-2xl font-light text-ink">
                  Mahremiyet.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-xl md:text-2xl font-light text-ink">
                  Kendi ritminiz.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <p className="mt-12 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Kimseyle alan paylaşmazsınız. Günün temposunu siz belirlersiniz.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
