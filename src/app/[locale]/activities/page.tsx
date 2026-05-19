"use client"

import { useTranslations, useLocale } from "next-intl"
import Header2026 from "@/components/layout/Header2026"
import { Footer } from "@/components/layout/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Reveal from "@/components/ui/Reveal"

// Note: This is a client component, metadata should be moved to a layout or separate metadata file
// For now, keeping it as client component

// Activity sections
import ActivitiesHero from "@/components/sections/activities/ActivitiesHero"
import HowItWorks from "@/components/sections/activities/HowItWorks"
import BalloonChoice from "@/components/sections/activities/BalloonChoice"
import CuratedPackages from "@/components/sections/activities/CuratedPackages"
import IndividualActivities from "@/components/sections/activities/IndividualActivities"
import TrustSection from "@/components/sections/activities/TrustSection"
import ActivitiesContact from "@/components/sections/activities/ActivitiesContact"

export default function ActivitiesPage() {
  const t = useTranslations("activities")
  const locale = useLocale() as "en" | "tr" | "zh"

  // Scroll to packages section when explore is clicked
  const handleExploreClick = () => {
    const packagesSection = document.getElementById('curated-packages')
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Scroll to individual activities section
  const handleIndividualActivitiesClick = () => {
    const individualSection = document.getElementById('individual-activities')
    if (individualSection) {
      individualSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header2026 />

      <main className="flex-1">
        {/* Hero - Guide to primary path */}
        <ActivitiesHero
          onExploreClick={handleExploreClick}
          onIndividualActivitiesClick={handleIndividualActivitiesClick}
          content={{
            eyebrow: t("hero.eyebrow"),
            title: t("hero.title"),
            titleAccent: t("hero.titleAccent"),
            subtitle: t("hero.subtitle"),
            exploreButton: t("hero.exploreButton"),
            individualActivitiesButton: t("hero.individualActivitiesButton"),
            badges: [t("hero.badge1"), t("hero.badge2"), t("hero.badge3")],
          }}
        />

        {/* How It Works - Build trust early */}
        <HowItWorks
          content={{
            title: t("howItWorks.title"),
            subtitle: t("howItWorks.subtitle"),
            steps: [
              {
                title: t("howItWorks.step1Title"),
                description: t("howItWorks.step1Description"),
              },
              {
                title: t("howItWorks.step2Title"),
                description: t("howItWorks.step2Description"),
              },
              {
                title: t("howItWorks.step3Title"),
                description: t("howItWorks.step3Description"),
              },
              {
                title: t("howItWorks.step4Title"),
                description: t("howItWorks.step4Description"),
              },
            ],
          }}
        />

        {/* PRIMARY PATH: Curated Packages - Show value first */}
        <div id="curated-packages">
          <CuratedPackages
            locale={locale}
            content={{
              oneDayTitle: t("packages.oneDayTitle"),
              twoDayTitle: t("packages.twoDayTitle"),
              twoDaySubtitle: t("packages.twoDaySubtitle"),
              threeDayTitle: t("packages.threeDayTitle"),
              selectLabel: t("packages.selectLabel"),
              popularLabel: t("packages.popularLabel"),
              effortlessLabel: t("packages.effortlessLabel"),
              recommended: t("packages.recommended"),
              included: t("packages.included"),
              perfectIf: t("packages.perfectIf"),
              confirmNote: t("packages.confirmNote"),
              pricingNote: t("packages.pricingNote"),
              typeGroup: t("packages.typeGroup"),
              typePrivate: t("packages.typePrivate"),
              typeMixed: t("packages.typeMixed"),
              typeSignature: t("packages.typeSignature"),
              sendModalTitle: t("individual.sendModalTitle"),
              sendModalDescription: t("individual.sendModalDescription"),
              sendModalDatesLabel: t("individual.sendModalDatesLabel"),
              sendModalDatesPlaceholder: t("individual.sendModalDatesPlaceholder"),
              sendModalGuestsLabel: t("individual.sendModalGuestsLabel"),
              sendModalGuestsPlaceholder: t("individual.sendModalGuestsPlaceholder"),
              sendModalWhatsappButton: t("individual.sendModalWhatsappButton"),
              sendModalEmailButton: t("individual.sendModalEmailButton"),
              sendModalCancelButton: t("individual.sendModalCancelButton"),
              sendModalValidationError: t("individual.sendModalValidationError"),
              balloonSelectorLabel: t("packages.balloonSelectorLabel"),
              balloonSelectorPremiumLabel: t("packages.balloonSelectorPremiumLabel"),
              balloonSelectorPremiumSubtext: t("packages.balloonSelectorPremiumSubtext"),
              balloonSelectorFlexibleLabel: t("packages.balloonSelectorFlexibleLabel"),
              balloonSelectorFlexibleSubtext: t("packages.balloonSelectorFlexibleSubtext"),
              balloonDetailButton: t("packages.balloonDetailButton"),
              premiumDetailShort: t("packages.premiumDetailShort"),
              premiumDetailMiddle: t("packages.premiumDetailMiddle"),
              premiumDetailBottom: t("packages.premiumDetailBottom"),
              premiumToggleExplain: t("packages.premiumToggleExplain"),
              flexibleDetailShort: t("packages.flexibleDetailShort"),
              flexibleDetailMiddle: t("packages.flexibleDetailMiddle"),
              flexibleDetailBottom: t("packages.flexibleDetailBottom"),
              flexibleToggleExplain: t("packages.flexibleToggleExplain"),
              packagePriceLabel: t("packages.packagePriceLabel"),
              balloonPriceLabel: t("packages.balloonPriceLabel"),
              depositLabel: t("packages.depositLabel"),
              currentTotalLabel: t("packages.currentTotalLabel"),
              remainingBalloonNote: t("packages.remainingBalloonNote"),
              perPerson: t("packages.perPerson"),
            }}
          />
        </div>

        {/* Balloon Choice - After seeing value, easier decision */}
        <BalloonChoice
          content={{
            title: t("balloon.title"),
            subtitle: t("balloon.subtitle"),
            premiumLabel: t("balloon.premiumLabel"),
            premiumTagline: t("balloon.premiumTagline"),
            premiumBalloonName: t("balloon.premiumBalloonName"),
            premiumBalloonTagline: t("balloon.premiumBalloonTagline"),
            dynamicLabel: t("balloon.dynamicLabel"),
            dynamicTagline: t("balloon.dynamicTagline"),
            dynamicBalloonName: t("balloon.dynamicBalloonName"),
            dynamicPriceNote: t("balloon.dynamicPriceNote"),
            dynamicPriceVaries: t("balloon.dynamicPriceVaries"),
            dynamicFlexibleNote: t("balloon.dynamicFlexibleNote"),
            dynamicFeature1: t("balloon.dynamicFeature1"),
            dynamicFeature2: t("balloon.dynamicFeature2"),
            dynamicFeature3: t("balloon.dynamicFeature3"),
            dynamicFeature4: t("balloon.dynamicFeature4"),
            depositNote: t("balloon.depositNote"),
            whyPremium: t("balloon.whyPremium"),
            premiumReason1: t("balloon.premiumReason1"),
            premiumReason2: t("balloon.premiumReason2"),
            premiumReason3: t("balloon.premiumReason3"),
            premiumReason4: t("balloon.premiumReason4"),
            premiumNote: t("balloon.premiumNote"),
            perPerson: t("balloon.perPerson"),
          }}
        />

        {/* Visual Divider */}
        <div className="flex items-center justify-center py-16">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-line/30 to-transparent" />
        </div>

        {/* Individual Activities - Optional flexible path */}
        <div id="individual-activities">
          <IndividualActivities
          locale={locale}
          content={{
            title: t("individual.title"),
            subtitle: t("individual.subtitle"),
            detailsLabel: t("individual.detailsLabel"),
            addLabel: t("individual.addLabel"),
            selectedLabel: t("individual.selectedLabel"),
            includedLabel: t("individual.includedLabel"),
            durationLabel: t("individual.durationLabel"),
            idealForLabel: t("individual.idealForLabel"),
            summaryTitle: t("individual.summaryTitle"),
            summarySelectedLabel: t("individual.summarySelectedLabel"),
            summaryEstimatedLabel: t("individual.summaryEstimatedLabel"),
            summaryEmptyNote: t("individual.summaryEmptyNote"),
            summarySendButton: t("individual.summarySendButton"),
            summaryClarificationNote: t("individual.summaryClarificationNote"),
            summaryContextLabel: t("individual.summaryContextLabel"),
            summaryBalloonLabel: t("individual.summaryBalloonLabel"),
            summaryBalloonPremium: t("individual.summaryBalloonPremium"),
            summaryBalloonPremiumPrice: t("individual.summaryBalloonPremiumPrice"),
            summaryBalloonFlexible: t("individual.summaryBalloonFlexible"),
            summaryBalloonFlexiblePrice: t("individual.summaryBalloonFlexiblePrice"),
            sendModalTitle: t("individual.sendModalTitle"),
            sendModalDescription: t("individual.sendModalDescription"),
            sendModalDatesLabel: t("individual.sendModalDatesLabel"),
            sendModalDatesPlaceholder: t("individual.sendModalDatesPlaceholder"),
            sendModalGuestsLabel: t("individual.sendModalGuestsLabel"),
            sendModalGuestsPlaceholder: t("individual.sendModalGuestsPlaceholder"),
            sendModalWhatsappButton: t("individual.sendModalWhatsappButton"),
            sendModalEmailButton: t("individual.sendModalEmailButton"),
            sendModalCancelButton: t("individual.sendModalCancelButton"),
            sendModalValidationError: t("individual.sendModalValidationError"),
          }}
        />
        </div>

        {/* Why Book Through Us - Reinforce trust */}
        <TrustSection
          content={{
            title: t("trust.title"),
            subtitle: t("trust.subtitle"),
            reasons: [
              {
                title: t("trust.reason1Title"),
                description: t("trust.reason1Description"),
              },
              {
                title: t("trust.reason2Title"),
                description: t("trust.reason2Description"),
              },
              {
                title: t("trust.reason3Title"),
                description: t("trust.reason3Description"),
              },
              {
                title: t("trust.reason4Title"),
                description: t("trust.reason4Description"),
              },
            ],
          }}
        />

        {/* Important Notes - Transparency builds trust */}
        <Section tone="warm" className="py-20 md:py-28">
          <Container>
            <div className="max-w-3xl mx-auto space-y-10">
              <Reveal>
                <div className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">
                    {t("notes.title")}
                  </h2>
                  <p className="text-muted-foreground/90 font-light">{t("notes.subtitle")}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <Accordion type="multiple" defaultValue={["balloon-pricing"]}>
                  <AccordionItem value="balloon-pricing">
                    <AccordionTrigger>{t("notes.balloonTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.balloonContent")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="private-pricing">
                    <AccordionTrigger>{t("notes.privateTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.privateContent")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tour-includes">
                    <AccordionTrigger>{t("notes.includesTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.includesContent")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment">
                    <AccordionTrigger>{t("notes.paymentTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.paymentContent")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cancellation">
                    <AccordionTrigger>{t("notes.cancellationTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.cancellationContent")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="blue-swap">
                    <AccordionTrigger>{t("notes.blueSwapTitle")}</AccordionTrigger>
                    <AccordionContent>{t("notes.blueSwapContent")}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Contact / Send Selection - Low-pressure next step */}
        <ActivitiesContact
          content={{
            title: t("contact.title"),
            description: t("contact.description"),
            button: t("contact.button"),
            note: t("contact.note"),
            message: t("contact.message"),
          }}
        />
      </main>

      <Footer />
    </div>
  )
}
