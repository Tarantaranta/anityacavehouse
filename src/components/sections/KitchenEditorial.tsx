import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { SectionKicker } from "@/components/ui/SectionRhythm";

export default function KitchenEditorial() {
  return (
    <Section tone="warm">
      <Container>
        <SectionKicker label="KITCHEN" title="Her suite'te gerçek bir mutfak." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual (bold on desktop) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              {/* Big */}
              <div className="col-span-12 md:col-span-8">
                <ImageCard
                  src="/images/old-site/gallery/08-15.jpg"
                  alt="Anitya fully equipped kitchen"
                  aspect="4/5"
                  caption="Bağımsız mutfak — ev ritmi"
                  priority={false}
                />
              </div>

              {/* Small, offset */}
              <div className="col-span-12 md:col-span-4 md:pt-14">
                <ImageCard
                  src="/images/old-site/gallery/08-16.jpg"
                  alt="Kitchen detail"
                  aspect="1/1"
                  caption="Sınırsız kahve & çay"
                />
              </div>
            </div>
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
                <span className="text-ink">
                  sınırsız filtre kahve, Türk kahvesi ve siyah çay
                </span>
                , zeytinyağı ve temel baharatlarla karşılanırsınız.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl font-serif">
                Anitya'da mutfak bir aksesuar değildir.
                <br />
                Yaşamak deneyiminin bir parçasıdır.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
