"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"

interface BalloonDetailModalProps {
  open: boolean
  onClose: () => void
  type: "premium" | "flexible"
  balloonLabel: string
  content: {
    detailShort: string
    detailMiddle: string
    detailBottom: string
    toggleExplain: string
  }
}

export default function BalloonDetailModal({
  open,
  onClose,
  type,
  balloonLabel,
  content,
}: BalloonDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl mx-4" onClose={onClose}>
        <DialogHeader className="pr-8">
          <DialogTitle className="text-2xl md:text-3xl font-serif">
            {balloonLabel}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 px-2">
          {/* Top Short Version */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                type === "premium" ? "text-accent" : "text-muted-foreground/70"
              }`} strokeWidth={2.5} />
              <p className={`text-[15px] font-medium ${
                type === "premium" ? "text-accent" : "text-ink"
              }`}>
                {content.detailShort}
              </p>
            </div>
          </div>

          {/* Middle Box Explanation */}
          <div className={`rounded-xl p-4 space-y-3 ${
            type === "premium"
              ? "bg-accent/5 border border-accent/15"
              : "border border-border/40 bg-surface/30"
          }`}>
            <p className="text-[14px] leading-relaxed text-ink/90 font-light">
              {content.detailMiddle}
            </p>
          </div>

          {/* Bottom Support Sentence */}
          <p className="text-[13px] text-muted-foreground/70 font-light italic leading-relaxed">
            {content.detailBottom}
          </p>

          {/* Toggle Explanation */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-[12px] text-muted-foreground/60 font-light text-center">
              {content.toggleExplain}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
