import { Footer } from '@/components/layout/Footer';
import Header2026 from '@/components/layout/Header2026';
import HeroCinematic2026 from '@/components/sections/HeroCinematic2026';
import TrustBar from '@/components/sections/TrustBar';
import SignatureManifesto from '@/components/sections/SignatureManifesto';
import ManifestoBlock from '@/components/sections/ManifestoBlock';
import NotARoomSticky from '@/components/sections/NotARoomSticky';
import SuitesOverview from '@/components/sections/SuitesOverview';
import KitchenEditorialAdvanced from '@/components/sections/KitchenEditorialAdvanced';
import TerraceCinematicAdvanced from '@/components/sections/TerraceCinematicAdvanced';
import LocationMapSplit from '@/components/sections/LocationMapSplit';
import BreakfastFreedom from '@/components/sections/BreakfastFreedom';
import ReviewsMinimal from '@/components/sections/ReviewsMinimal';
import FinalCTA from '@/components/sections/FinalCTA';
import { SectionDivider } from '@/components/ui/SectionRhythm';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import PreloadImages from '@/components/ui/PreloadImages';

export default function HomePage() {
  // Preload critical above-the-fold images
  const criticalImages = [
    '/images/cappadocia-cave-house.avif', // Hero image
    '/images/cappadocia-cave-house-kitchen.avif', // Kitchen section
    '/images/cappadocia-ortahisar-castle.avif', // Terrace section
  ];

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col">
        <PreloadImages images={criticalImages} />
        <Header2026 />

        <main>
          <HeroCinematic2026 />
          <TrustBar />
          <SignatureManifesto />
          <SectionDivider />
          <ManifestoBlock />
          <SectionDivider />
          <NotARoomSticky />
          <SectionDivider />
          <SuitesOverview />
          <SectionDivider />
          <KitchenEditorialAdvanced />
          <SectionDivider />
          <TerraceCinematicAdvanced />
          <SectionDivider />
          <LocationMapSplit />
          <SectionDivider />
          <BreakfastFreedom />
          <SectionDivider />
          <ReviewsMinimal />
          <FinalCTA />
        </main>

        <Footer />

      </div>
    </SmoothScrollProvider>
  );
}
