"use client"

import { useState } from "react"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import PackageCard from "./PackageCard"
import SendPlanModal from "./SendPlanModal"
import BalloonSelector from "./BalloonSelector"
import {
  getLocalizedPackages,
  generatePackageWhatsAppLink,
  generatePackageEmailLink
} from "@/data/activities"
import type { Package } from "@/data/activities"

interface CuratedPackagesProps {
  locale?: "en" | "tr" | "zh"
  content: {
    oneDayTitle: string
    twoDayTitle: string
    twoDaySubtitle: string
    threeDayTitle: string
    selectLabel: string
    popularLabel?: string
    effortlessLabel?: string
    recommended: string
    included: string
    perfectIf: string
    confirmNote: string
    pricingNote?: string
    typeGroup: string
    typePrivate: string
    typeMixed: string
    typeSignature: string
    sendModalTitle: string
    sendModalDescription: string
    sendModalDatesLabel: string
    sendModalDatesPlaceholder: string
    sendModalGuestsLabel: string
    sendModalGuestsPlaceholder: string
    sendModalWhatsappButton: string
    sendModalEmailButton: string
    sendModalCancelButton: string
    sendModalValidationError: string
    balloonSelectorLabel: string
    balloonSelectorPremiumLabel: string
    balloonSelectorPremiumSubtext: string
    balloonSelectorFlexibleLabel: string
    balloonSelectorFlexibleSubtext: string
    balloonDetailButton: string
    premiumDetailShort: string
    premiumDetailMiddle: string
    premiumDetailBottom: string
    premiumToggleExplain: string
    flexibleDetailShort: string
    flexibleDetailMiddle: string
    flexibleDetailBottom: string
    flexibleToggleExplain: string
    packagePriceLabel: string
    balloonPriceLabel: string
    depositLabel: string
    currentTotalLabel: string
    remainingBalloonNote: string
    perPerson: string
  }
}

export default function CuratedPackages({ locale = "en", content }: CuratedPackagesProps) {
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [balloonChoice, setBalloonChoice] = useState<"premium" | "flexible">("flexible")

  const packages = getLocalizedPackages(locale)

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg)
    setSendModalOpen(true)
  }

  const handleSendWhatsApp = (dates: string, guests: number) => {
    if (!selectedPackage) return

    const basePrice = selectedPackage.priceRange || selectedPackage.price
    // Package price already includes €50 balloon deposit
    // Premium adds €200 (€250 total - €50 already included)
    // Flexible adds €0 (€50 deposit already included in package price)
    const balloonCost = balloonChoice === "premium" ? 200 : 0
    const totalPrice = typeof basePrice === 'number' ? basePrice + balloonCost : basePrice

    const link = generatePackageWhatsAppLink(
      selectedPackage.name,
      totalPrice,
      { dates, guests },
      balloonChoice,
      locale
    )
    window.open(link, "_blank")
  }

  const handleSendEmail = (dates: string, guests: number) => {
    if (!selectedPackage) return

    const basePrice = selectedPackage.priceRange || selectedPackage.price
    // Package price already includes €50 balloon deposit
    // Premium adds €200 (€250 total - €50 already included)
    // Flexible adds €0 (€50 deposit already included in package price)
    const balloonCost = balloonChoice === "premium" ? 200 : 0
    const totalPrice = typeof basePrice === 'number' ? basePrice + balloonCost : basePrice

    const link = generatePackageEmailLink(
      selectedPackage.name,
      totalPrice,
      { dates, guests },
      balloonChoice,
      locale
    )
    window.location.href = link
  }

  return (
    <Section tone="warm" className="py-28 md:py-36">
      <Container>
        <div className="space-y-16">
          {/* Balloon Selector - Global choice affecting all packages */}
          <Reveal>
            <BalloonSelector
              selected={balloonChoice}
              onChange={setBalloonChoice}
              content={{
                label: content.balloonSelectorLabel,
                premiumLabel: content.balloonSelectorPremiumLabel,
                premiumSubtext: content.balloonSelectorPremiumSubtext,
                flexibleLabel: content.balloonSelectorFlexibleLabel,
                flexibleSubtext: content.balloonSelectorFlexibleSubtext,
                detailButton: content.balloonDetailButton,
                premiumDetailShort: content.premiumDetailShort,
                premiumDetailMiddle: content.premiumDetailMiddle,
                premiumDetailBottom: content.premiumDetailBottom,
                premiumToggleExplain: content.premiumToggleExplain,
                flexibleDetailShort: content.flexibleDetailShort,
                flexibleDetailMiddle: content.flexibleDetailMiddle,
                flexibleDetailBottom: content.flexibleDetailBottom,
                flexibleToggleExplain: content.flexibleToggleExplain,
              }}
            />
          </Reveal>

          <div className="space-y-24">
          {/* 1 Day Packages - Feature Private + Photo */}
          <PackageDayGroup
            title={content.oneDayTitle}
            packages={packages.oneDay}
            selectLabel={content.selectLabel}
            featuredIndex={1} // Private + Photo
            pricingNote={content.pricingNote}
            recommended={content.recommended}
            included={content.included}
            perfectIf={content.perfectIf}
            confirmNote={content.confirmNote}
            typeGroup={content.typeGroup}
            typePrivate={content.typePrivate}
            typeMixed={content.typeMixed}
            typeSignature={content.typeSignature}
            locale={locale}
            onPackageSelect={handlePackageSelect}
            balloonChoice={balloonChoice}
            packagePriceLabel={content.packagePriceLabel}
            balloonPriceLabel={content.balloonPriceLabel}
            depositLabel={content.depositLabel}
            currentTotalLabel={content.currentTotalLabel}
            remainingBalloonNote={content.remainingBalloonNote}
            perPerson={content.perPerson}
          />

          {/* Visual Divider */}
          <div className="flex items-center justify-center py-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-line/40 to-transparent" />
          </div>

          {/* 2 Day Packages - Feature Private + Group Mix */}
          <PackageDayGroup
            title={content.twoDayTitle}
            subtitle={content.twoDaySubtitle}
            packages={packages.twoDay}
            selectLabel={content.selectLabel}
            popularLabel={content.popularLabel}
            featuredIndex={1} // Private + Group
            emphasize
            pricingNote={content.pricingNote}
            recommended={content.recommended}
            included={content.included}
            perfectIf={content.perfectIf}
            confirmNote={content.confirmNote}
            typeGroup={content.typeGroup}
            typePrivate={content.typePrivate}
            typeMixed={content.typeMixed}
            typeSignature={content.typeSignature}
            locale={locale}
            onPackageSelect={handlePackageSelect}
            balloonChoice={balloonChoice}
            packagePriceLabel={content.packagePriceLabel}
            balloonPriceLabel={content.balloonPriceLabel}
            depositLabel={content.depositLabel}
            currentTotalLabel={content.currentTotalLabel}
            remainingBalloonNote={content.remainingBalloonNote}
            perPerson={content.perPerson}
          />

          {/* Visual Divider */}
          <div className="flex items-center justify-center py-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-line/40 to-transparent" />
          </div>

          {/* 3 Day Packages - Feature All-Private Grand */}
          <PackageDayGroup
            title={content.threeDayTitle}
            packages={packages.threeDay}
            selectLabel={content.selectLabel}
            featuredIndex={2} // All-Private Grand
            pricingNote={content.pricingNote}
            recommended={content.recommended}
            included={content.included}
            perfectIf={content.perfectIf}
            confirmNote={content.confirmNote}
            typeGroup={content.typeGroup}
            typePrivate={content.typePrivate}
            typeMixed={content.typeMixed}
            typeSignature={content.typeSignature}
            locale={locale}
            onPackageSelect={handlePackageSelect}
            balloonChoice={balloonChoice}
            packagePriceLabel={content.packagePriceLabel}
            balloonPriceLabel={content.balloonPriceLabel}
            depositLabel={content.depositLabel}
            currentTotalLabel={content.currentTotalLabel}
            remainingBalloonNote={content.remainingBalloonNote}
            perPerson={content.perPerson}
          />
          </div>
        </div>
      </Container>

      {/* Send Plan Modal */}
      <SendPlanModal
        open={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        onSendWhatsApp={handleSendWhatsApp}
        onSendEmail={handleSendEmail}
        content={{
          title: content.sendModalTitle,
          description: content.sendModalDescription,
          datesLabel: content.sendModalDatesLabel,
          datesPlaceholder: content.sendModalDatesPlaceholder,
          guestsLabel: content.sendModalGuestsLabel,
          guestsPlaceholder: content.sendModalGuestsPlaceholder,
          whatsappButton: content.sendModalWhatsappButton,
          emailButton: content.sendModalEmailButton,
          cancelButton: content.sendModalCancelButton,
          validationError: content.sendModalValidationError,
        }}
      />
    </Section>
  )
}

function PackageDayGroup({
  title,
  subtitle,
  packages,
  selectLabel,
  popularLabel,
  featuredIndex,
  emphasize = false,
  pricingNote,
  recommended,
  included,
  perfectIf,
  confirmNote,
  typeGroup,
  typePrivate,
  typeMixed,
  typeSignature,
  locale = "en",
  onPackageSelect,
  balloonChoice,
  packagePriceLabel,
  balloonPriceLabel,
  depositLabel,
  currentTotalLabel,
  remainingBalloonNote,
  perPerson,
}: {
  title: string
  subtitle?: string
  packages: any[]
  selectLabel: string
  popularLabel?: string
  featuredIndex?: number
  emphasize?: boolean
  pricingNote?: string
  recommended: string
  included: string
  perfectIf: string
  confirmNote: string
  typeGroup: string
  typePrivate: string
  typeMixed: string
  typeSignature: string
  locale?: "en" | "tr" | "zh"
  onPackageSelect: (pkg: Package) => void
  balloonChoice: "premium" | "flexible"
  packagePriceLabel: string
  balloonPriceLabel: string
  depositLabel: string
  currentTotalLabel: string
  remainingBalloonNote: string
  perPerson: string
}) {
  return (
    <div className="space-y-12">
      <Reveal>
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className={`font-serif text-ink tracking-tight ${
            emphasize ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-4xl"
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] text-accent/70 font-medium italic tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
      </Reveal>

      <div className={`grid gap-8 ${
        packages.length === 3
          ? "md:grid-cols-2 lg:grid-cols-3"
          : "md:grid-cols-2 max-w-4xl mx-auto"
      }`}>
        {packages.map((pkg, idx) => (
          <Reveal key={pkg.id} delay={idx * 0.1}>
            <PackageCard
              package={pkg}
              selectLabel={selectLabel}
              featured={idx === featuredIndex}
              popularLabel={popularLabel}
              pricingNote={pricingNote}
              recommended={recommended}
              included={included}
              perfectIf={perfectIf}
              confirmNote={confirmNote}
              typeGroup={typeGroup}
              typePrivate={typePrivate}
              typeMixed={typeMixed}
              typeSignature={typeSignature}
              locale={locale}
              onSelect={() => onPackageSelect(pkg)}
              balloonChoice={balloonChoice}
              packagePriceLabel={packagePriceLabel}
              balloonPriceLabel={balloonPriceLabel}
              depositLabel={depositLabel}
              currentTotalLabel={currentTotalLabel}
              remainingBalloonNote={remainingBalloonNote}
              perPerson={perPerson}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
