"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Plus, Check } from "lucide-react"
import type { Activity } from "@/data/activities"
import Image from "next/image"

interface ActivityCardProps {
  activity: Activity
  isSelected: boolean
  onToggleSelect: () => void
  onViewDetails: () => void
  detailsLabel: string
  addLabel: string
  selectedLabel: string
}

export default function ActivityCard({
  activity,
  isSelected,
  onToggleSelect,
  onViewDetails,
  detailsLabel,
  addLabel,
  selectedLabel,
}: ActivityCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md border-border/30 hover:border-accent/20">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/0 to-transparent" />
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-serif text-ink tracking-tight leading-tight">
            {activity.name}
          </h3>
          <p className="text-[12px] text-muted-foreground/60 font-light italic leading-relaxed">
            {activity.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {activity.price !== null ? (
            <>
              <span className="text-xl font-serif text-accent tracking-tight">
                €{activity.price}
              </span>
              <span className="text-[10px] text-muted-foreground/50 font-light">
                {activity.priceNote}
              </span>
            </>
          ) : (
            <span className="text-[12px] text-muted-foreground/70 font-light">
              {activity.priceNote}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-[12px] font-light border-border/40 hover:border-accent/30 hover:bg-accent/5"
            onClick={onViewDetails}
          >
            {detailsLabel}
          </Button>
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className={`flex-1 h-9 text-[12px] transition-all duration-300 ${
              isSelected
                ? "bg-accent hover:bg-accent/90"
                : "font-light border-border/40 hover:border-accent/30 hover:bg-accent/5"
            }`}
            onClick={onToggleSelect}
          >
            {isSelected ? (
              <>
                <Check className="w-3 h-3 mr-1.5" strokeWidth={2.5} />
                {selectedLabel}
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1.5" strokeWidth={2} />
                {addLabel}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
