"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import type { Activity } from "@/data/activities"

interface SelectionSummaryProps {
  selectedActivities: Activity[]
  estimatedTotal: number
  preferredDuration: number | null
  balloonPreference: "premium" | "flexible" | null
  onRemove: (activityId: string) => void
  onDurationChange: (days: number | null) => void
  onBalloonChange: (balloon: "premium" | "flexible" | null) => void
  onSendPlan: () => void
  content: {
    title: string
    selectedLabel: string
    estimatedLabel: string
    emptyNote: string
    sendButton: string
    clarificationNote: string
    contextLabel: string
    durationLabel: string
    balloonLabel: string
    balloonPremium: string
    balloonPremiumPrice: string
    balloonFlexible: string
    balloonFlexiblePrice: string
  }
}

export default function SelectionSummary({
  selectedActivities,
  estimatedTotal,
  preferredDuration,
  balloonPreference,
  onRemove,
  onDurationChange,
  onBalloonChange,
  onSendPlan,
  content,
}: SelectionSummaryProps) {
  if (selectedActivities.length === 0) {
    return (
      <Card className="border-border/30 bg-surface-2/10">
        <CardContent className="py-10 text-center">
          <p className="text-[13px] text-muted-foreground/50 font-light italic">
            {content.emptyNote}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/30 bg-surface shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/20">
          <h3 className="text-lg font-serif text-ink tracking-tight">
            {content.title}
          </h3>
          <div className="text-[12px] text-muted-foreground/60 font-light">
            {selectedActivities.length} {content.selectedLabel}
          </div>
        </div>

        {/* Optional Preferences */}
        <div className="space-y-3">
          <div className="text-[10px] text-muted-foreground/50 font-light uppercase tracking-wider">
            {content.contextLabel}
          </div>

          {/* Duration chips */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-muted-foreground/60 font-light">
              {content.durationLabel}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((days) => (
                <button
                  key={days}
                  onClick={() => onDurationChange(preferredDuration === days ? null : days)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-light transition-all duration-200 ${
                    preferredDuration === days
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "bg-surface-2/50 text-muted-foreground/60 border border-border/30 hover:border-accent/20"
                  }`}
                >
                  {days} day{days > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Balloon chips */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-muted-foreground/60 font-light">
              {content.balloonLabel}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onBalloonChange(balloonPreference === "premium" ? null : "premium")}
                className={`px-3 py-2 rounded-md text-[11px] font-light transition-all duration-200 text-left ${
                  balloonPreference === "premium"
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "bg-surface-2/50 text-muted-foreground/60 border border-border/30 hover:border-accent/20"
                }`}
              >
                <div className="font-medium">{content.balloonPremium}</div>
                <div className="text-[10px] opacity-70">{content.balloonPremiumPrice}</div>
              </button>
              <button
                onClick={() => onBalloonChange(balloonPreference === "flexible" ? null : "flexible")}
                className={`px-3 py-2 rounded-md text-[11px] font-light transition-all duration-200 text-left ${
                  balloonPreference === "flexible"
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "bg-surface-2/50 text-muted-foreground/60 border border-border/30 hover:border-accent/20"
                }`}
              >
                <div className="font-medium">{content.balloonFlexible}</div>
                <div className="text-[10px] opacity-70">{content.balloonFlexiblePrice}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Activities List */}
        <div className="space-y-2">
          {selectedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-3 p-3 bg-surface-2/30 rounded-lg"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-[13px] font-light text-ink">
                  {activity.name}
                </div>
                <div className="text-[10px] text-muted-foreground/50 font-light">
                  {activity.priceNote}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                {activity.price !== null && (
                  <span className="text-[14px] font-serif text-muted-foreground/80">
                    €{activity.price}
                  </span>
                )}
                <button
                  onClick={() => onRemove(activity.id)}
                  className="p-1 rounded-full hover:bg-surface-2/50 transition-colors duration-200"
                  aria-label={`Remove ${activity.name}`}
                >
                  <X className="w-3 h-3 text-muted-foreground/40" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Note */}
        <div className="pt-3 border-t border-border/20 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] text-muted-foreground/60 font-light uppercase tracking-wider">
              {content.estimatedLabel}
            </div>
            <div className="text-2xl font-serif text-muted-foreground/70 tracking-tight">
              €{estimatedTotal}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/50 font-light italic leading-relaxed">
            {content.clarificationNote}
          </p>

          {/* Send Button */}
          <Button
            className="w-full gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 h-11 text-[13px] font-light mt-4"
            onClick={onSendPlan}
          >
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
            {content.sendButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
