"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import BalloonDetailModal from "./BalloonDetailModal"

interface BalloonSelectorProps {
  selected: "premium" | "flexible"
  onChange: (value: "premium" | "flexible") => void
  content: {
    premiumLabel: string
    premiumSubtext: string
    flexibleLabel: string
    flexibleSubtext: string
    label: string
    detailButton: string
    premiumDetailShort: string
    premiumDetailMiddle: string
    premiumDetailBottom: string
    premiumToggleExplain: string
    flexibleDetailShort: string
    flexibleDetailMiddle: string
    flexibleDetailBottom: string
    flexibleToggleExplain: string
  }
}

export default function BalloonSelector({ selected, onChange, content }: BalloonSelectorProps) {
  const [detailModalOpen, setDetailModalOpen] = useState<"premium" | "flexible" | null>(null)

  const handleDetailClick = (type: "premium" | "flexible", e: React.MouseEvent) => {
    e.stopPropagation()
    setDetailModalOpen(type)
  }

  return (
    <>
      <div className="space-y-6 bg-gradient-to-br from-accent/3 via-surface to-accent/3 border border-accent/10 rounded-2xl p-6 md:p-8">
        {/* Emphasized Label */}
        <div className="text-center space-y-2">
          <p className="text-[15px] md:text-[16px] text-accent font-medium tracking-wide uppercase">
            {content.label}
          </p>
          <div className="w-16 h-1 bg-accent/20 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          {/* Premium Option */}
          <button
            onClick={() => onChange("premium")}
            className={cn(
              "flex-1 transition-all duration-300",
              selected === "premium"
                ? "scale-[1.03]"
                : "opacity-70 hover:opacity-90"
            )}
          >
            <Card className={cn(
              "p-5 md:p-6 transition-all duration-300 cursor-pointer relative",
              selected === "premium"
                ? "border-accent/40 bg-gradient-to-br from-surface via-accent/8 to-surface shadow-xl ring-2 ring-accent/20"
                : "border-border/40 hover:border-accent/25"
            )}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={cn(
                      "text-[16px] md:text-[17px] font-semibold block",
                      selected === "premium" ? "text-accent" : "text-ink"
                    )}>
                      {content.premiumLabel}
                    </span>
                  </div>
                  {selected === "premium" && (
                    <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                    </div>
                  )}
                </div>
                <p className="text-[13px] md:text-[14px] text-muted-foreground/80 font-light leading-relaxed">
                  {content.premiumSubtext}
                </p>

                {/* Detail Button */}
                <div
                  onClick={(e) => handleDetailClick("premium", e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleDetailClick("premium", e as any)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-accent/70 hover:text-accent font-medium transition-colors mt-2 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  {content.detailButton}
                </div>
              </div>
            </Card>
          </button>

          {/* Flexible Option */}
          <button
            onClick={() => onChange("flexible")}
            className={cn(
              "flex-1 transition-all duration-300",
              selected === "flexible"
                ? "scale-[1.03]"
                : "opacity-70 hover:opacity-90"
            )}
          >
            <Card className={cn(
              "p-5 md:p-6 transition-all duration-300 cursor-pointer relative",
              selected === "flexible"
                ? "border-accent/40 bg-gradient-to-br from-surface via-accent/8 to-surface shadow-xl ring-2 ring-accent/20"
                : "border-border/40 hover:border-accent/25"
            )}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={cn(
                      "text-[16px] md:text-[17px] font-semibold block",
                      selected === "flexible" ? "text-accent" : "text-ink"
                    )}>
                      {content.flexibleLabel}
                    </span>
                  </div>
                  {selected === "flexible" && (
                    <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                    </div>
                  )}
                </div>
                <p className="text-[13px] md:text-[14px] text-muted-foreground/80 font-light leading-relaxed">
                  {content.flexibleSubtext}
                </p>

                {/* Detail Button */}
                <div
                  onClick={(e) => handleDetailClick("flexible", e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleDetailClick("flexible", e as any)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-muted-foreground/60 hover:text-ink font-medium transition-colors mt-2 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  {content.detailButton}
                </div>
              </div>
            </Card>
          </button>
        </div>
      </div>

      {/* Detail Modals */}
      <BalloonDetailModal
        open={detailModalOpen === "premium"}
        onClose={() => setDetailModalOpen(null)}
        type="premium"
        balloonLabel={content.premiumLabel}
        content={{
          detailShort: content.premiumDetailShort,
          detailMiddle: content.premiumDetailMiddle,
          detailBottom: content.premiumDetailBottom,
          toggleExplain: content.premiumToggleExplain,
        }}
      />

      <BalloonDetailModal
        open={detailModalOpen === "flexible"}
        onClose={() => setDetailModalOpen(null)}
        type="flexible"
        balloonLabel={content.flexibleLabel}
        content={{
          detailShort: content.flexibleDetailShort,
          detailMiddle: content.flexibleDetailMiddle,
          detailBottom: content.flexibleDetailBottom,
          toggleExplain: content.flexibleToggleExplain,
        }}
      />
    </>
  )
}
