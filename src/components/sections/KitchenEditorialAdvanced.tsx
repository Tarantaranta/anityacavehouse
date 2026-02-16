import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import AsymmetricMediaGrid from "@/components/ui/AsymmetricMediaGrid";
import { SectionKicker } from "@/components/ui/SectionRhythm";

export default function KitchenEditorialAdvanced() {
  return (
    <Section tone="warm">
      <Container>
        <SectionKicker label="MUTFAK" title="Her suite'te gerçek bir mutfak." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual - Asymmetric Grid */}
          <div className="lg:col-span-7">
            <AsymmetricMediaGrid
              primary={{
                src: "/images/cappadocia-cave-house-kitchen.avif",
                alt: "Anitya fully equipped kitchen",
                caption: "Donanımlı mutfak — ev ritmi",
                aspect: "16/10",
              }}
              secondary={{
                src: "/images/cave-house-kitchen.avif",
                alt: "Kitchen detail",
                caption: "Sınırsız filtre kahve & Türk kahvesi",
                aspect: "4/5",
              }}
            />
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="text-xl md:text-2xl font-light text-ink leading-relaxed max-w-xl">
                Bu bir "olanak" değil; özgürlük ve bağımsızlıktır.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Buzdolabı, fırın, ocak, kettle, kahve makinesi, geleneksel
                çaydanlık… Tencere, tava, tabaklar, farklı bardaklar ve eksiksiz
                çatal-kaşık takımı.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                Gelişinizde{" "}
                <span className="text-ink font-medium">
                  sınırsız filtre kahve, Türk kahvesi ve siyah çay
                </span>
                , zeytinyağı ve temel baharatlarla karşılanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl font-serif">
                Anitya'da mutfak bir aksesuar değildir.
                <br />
                <span className="text-accent">Yaşamak deneyiminin bir parçasıdır.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
