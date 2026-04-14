"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Users } from "lucide-react"
import type { Package } from "@/data/activities"

interface PackageCardProps {
  package: Package
  selectLabel: string
  featured?: boolean
  popularLabel?: string
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
  onSelect: () => void
  balloonChoice: "premium" | "flexible"
  packagePriceLabel: string
  balloonPriceLabel: string
  depositLabel: string
  currentTotalLabel: string
  remainingBalloonNote: string
  perPerson: string
}

export default function PackageCard({
  package: pkg,
  selectLabel,
  featured,
  popularLabel,
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
  onSelect,
  balloonChoice,
  packagePriceLabel,
  balloonPriceLabel,
  depositLabel,
  currentTotalLabel,
  remainingBalloonNote,
  perPerson
}: PackageCardProps) {
  const handleSelect = () => {
    onSelect()
  }

  const basePrice = pkg.priceRange || pkg.price

  // Package price already includes €50 balloon deposit
  // Premium adds €200 (€250 total - €50 already included)
  // Flexible adds €0 (€50 deposit already included in package price)
  const premiumUpgradeCost = 200
  const flexibleAdditionalCost = 0

  const balloonCost = balloonChoice === "premium" ? premiumUpgradeCost : flexibleAdditionalCost
  const total = typeof basePrice === 'number' ? basePrice + balloonCost : basePrice

  const showPopular = featured && !pkg.recommended

  return (
    <Card
      className={`group relative transition-all duration-500 ${
        pkg.recommended || featured
          ? "border-accent/25 shadow-xl hover:shadow-2xl bg-gradient-to-br from-surface via-surface to-surface-2/50 scale-[1.02]"
          : "border-border/40 hover:border-accent/20 shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Highlight Badges */}
      {(pkg.recommended || pkg.highlight || showPopular) && (
        <div className="absolute -top-3 left-6 flex gap-2">
          {pkg.recommended && (
            <Badge className="bg-accent text-white text-[10px] shadow-lg tracking-wide px-3 py-1">
              <Sparkles className="w-2.5 h-2.5 mr-1.5" />
              {recommended}
            </Badge>
          )}
          {showPopular && popularLabel && (
            <Badge className="bg-ink text-white text-[10px] shadow-lg tracking-wide px-3 py-1">
              <Users className="w-2.5 h-2.5 mr-1.5" />
              {popularLabel}
            </Badge>
          )}
          {pkg.highlight && (
            <Badge variant="outline" className="text-[10px] border-accent/30 text-accent/90 bg-surface/80 backdrop-blur-sm tracking-wide px-3 py-1">
              {pkg.highlight}
            </Badge>
          )}
        </div>
      )}

      <CardHeader className="pt-8 pb-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <CardTitle className="text-xl md:text-2xl font-serif tracking-tight leading-tight">
              {pkg.name}
            </CardTitle>
            <Badge
              variant="outline"
              className={`text-[10px] uppercase tracking-wider font-light border-border/40 ${
                pkg.type === "Signature" ? "border-accent/40 text-accent/90" : "text-muted-foreground/70"
              }`}
            >
              {pkg.type === "Group" ? typeGroup :
               pkg.type === "Private" ? typePrivate :
               pkg.type === "Mixed" ? typeMixed :
               typeSignature}
            </Badge>
          </div>
          <div className="text-right pt-1 space-y-3">
            {/* Pricing Breakdown */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-end gap-2 text-[13px]">
                <span className="text-muted-foreground/70 font-light">{packagePriceLabel}:</span>
                <span className="text-ink font-medium">€{basePrice}</span>
              </div>
              {balloonChoice === "premium" && (
                <div className="flex items-baseline justify-end gap-2 text-[13px]">
                  <span className="text-muted-foreground/70 font-light">
                    {balloonPriceLabel}:
                  </span>
                  <span className="text-ink font-medium">+€{balloonCost}</span>
                </div>
              )}
              {balloonChoice === "flexible" && (
                <div className="flex items-baseline justify-end gap-2 text-[13px]">
                  <span className="text-muted-foreground/70 font-light">
                    {depositLabel}:
                  </span>
                  <span className="text-muted-foreground/60 font-light italic text-[12px]">Included</span>
                </div>
              )}
              <div className="h-px bg-border/40 my-2" />
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-[12px] text-muted-foreground/70 font-light">{currentTotalLabel}:</span>
                <span className="text-2xl md:text-3xl font-serif text-accent tracking-tight">€{total}</span>
              </div>
            </div>

            {/* Balloon note */}
            {balloonChoice === "flexible" && (
              <p className="text-[10px] text-muted-foreground/60 font-light italic leading-relaxed max-w-[180px] ml-auto">
                {remainingBalloonNote}
              </p>
            )}

            <div className="text-[11px] text-muted-foreground/60 font-light mt-1 leading-tight">
              {perPerson}
            </div>
          </div>
        </div>

        <CardDescription className="text-[15px] leading-relaxed font-light text-muted-foreground/80 border-t border-border/30 pt-5">
          {pkg.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-7 pb-7">
        {/* Includes */}
        <div className="space-y-3.5">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
            {included}
          </div>
          <ul className="space-y-2.5 md:space-y-2">
            {pkg.includes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[14px] leading-relaxed">
                <Check
                  className="w-3.5 h-3.5 text-accent/80 shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <span className="text-muted-foreground/85 font-light">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal For */}
        <div className="pt-4 border-t border-border/30 bg-surface-2/20 -mx-6 px-6 py-4 -mb-7 space-y-3">
          <div className="text-[13px] text-muted-foreground/80 font-light leading-relaxed">
            <span className="text-accent/80 font-medium">{perfectIf}</span> {pkg.idealFor.toLowerCase()}
          </div>
          <div className="text-[11px] text-muted-foreground/60 font-light italic leading-relaxed">
            {confirmNote}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          variant={pkg.recommended || featured ? "default" : "outline"}
          className={`w-full group-hover:shadow-md transition-all duration-300 h-12 text-[14px] ${
            pkg.recommended || featured
              ? "font-normal shadow-md"
              : "font-light border-border/50 hover:border-accent/40 hover:bg-accent/5"
          }`}
          onClick={handleSelect}
        >
          {selectLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
