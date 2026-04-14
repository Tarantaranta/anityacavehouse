"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Check, Plus } from "lucide-react"
import type { Activity } from "@/data/activities"
import Image from "next/image"

interface ActivityModalProps {
  activity: Activity | null
  open: boolean
  onClose: () => void
  isSelected: boolean
  onToggleSelect: () => void
  addLabel: string
  selectedLabel: string
  includedLabel: string
  durationLabel: string
  idealForLabel: string
}

export default function ActivityModal({
  activity,
  open,
  onClose,
  isSelected,
  onToggleSelect,
  addLabel,
  selectedLabel,
  includedLabel,
  durationLabel,
  idealForLabel,
}: ActivityModalProps) {
  if (!activity) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl mx-4" onClose={onClose}>
        {/* Image */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-t-xl bg-surface-2">
          <Image
            src={activity.image}
            alt={activity.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />

          {/* Category Badge */}
          <Badge
            variant="outline"
            className="absolute top-4 left-4 text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-sm border-border/30"
          >
            {activity.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-7 space-y-6">
          {/* Header */}
          <DialogHeader>
            <DialogTitle>{activity.name}</DialogTitle>
            <DialogDescription>{activity.tagline}</DialogDescription>
          </DialogHeader>

          {/* Description */}
          <p className="text-[14px] text-muted-foreground/75 font-light leading-relaxed">
            {activity.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            {/* Duration */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 font-light uppercase tracking-wider">
                <Clock className="w-3 h-3" strokeWidth={2} />
                {durationLabel}
              </div>
              <div className="text-[13px] text-ink font-light">
                {activity.duration}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <div className="text-[11px] text-muted-foreground/60 font-light uppercase tracking-wider">
                Price
              </div>
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
                  <span className="text-[13px] text-muted-foreground/70 font-light">
                    {activity.priceNote}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Included */}
          <div className="space-y-3 pt-3 border-t border-border/20">
            <div className="text-[11px] text-muted-foreground/60 font-light uppercase tracking-wider">
              {includedLabel}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activity.included.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[12px] leading-relaxed">
                  <Check
                    className="w-3 h-3 text-accent/70 shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span className="text-muted-foreground/75 font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div className="bg-surface-2/20 -mx-7 px-7 py-4 border-t border-border/20">
            <div className="text-[11px] text-muted-foreground/60 font-light uppercase tracking-wider mb-2">
              {idealForLabel}
            </div>
            <p className="text-[13px] text-muted-foreground/70 font-light leading-relaxed">
              {activity.idealFor}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-1">
            <Button
              variant={isSelected ? "default" : "outline"}
              className={`w-full h-11 text-[13px] transition-all duration-300 ${
                isSelected
                  ? "bg-accent hover:bg-accent/90"
                  : "font-light border-border/40 hover:border-accent/30 hover:bg-accent/5"
              }`}
              onClick={onToggleSelect}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-2" strokeWidth={2.5} />
                  {selectedLabel}
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 mr-2" strokeWidth={2} />
                  {addLabel}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
