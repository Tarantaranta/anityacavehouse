"use client"

import { useState } from "react"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Reveal from "@/components/ui/Reveal"
import { Shield, Check, MessageCircle, Info } from "lucide-react"
import { addOnActivities, generateWhatsAppLink } from "@/data/activities"

interface PlanBuilderProps {
  content: {
    title: string
    subtitle: string
    daysLabel: string
    styleLabel: string
    balloonLabel: string
    activitiesLabel: string
    summaryTitle: string
    estimatedLabel: string
    estimateNote: string
    sendButton: string
    styleGroup: string
    stylePrivate: string
    styleMixed: string
    premiumBalloon: string
    dynamicBalloon: string
    durationLabel: string
    balloonTypeLabel: string
    activitiesCountLabel: string
    day: string
    days: string
  }
}

export default function PlanBuilder({ content }: PlanBuilderProps) {
  const [days, setDays] = useState(2)
  const [packageStyle, setPackageStyle] = useState<"group" | "private" | "mixed">("private")
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [balloonType, setBalloonType] = useState<"premium" | "dynamic">("premium")

  const balloonPrice = balloonType === "premium" ? 250 : 0
  const activitiesTotal = selectedActivities.reduce((sum, id) => {
    const activity = addOnActivities.find((a) => a.id === id)
    return sum + (activity?.price || 0)
  }, 0)
  const estimatedTotal = balloonPrice + activitiesTotal

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleSendPlan = () => {
    const activityNames = selectedActivities
      .map((id) => addOnActivities.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[]

    const link = generateWhatsAppLink({
      days,
      style: packageStyle.charAt(0).toUpperCase() + packageStyle.slice(1),
      balloon: balloonType === "premium" ? content.premiumBalloon : content.dynamicBalloon,
      activities: activityNames,
      total: estimatedTotal,
      isDynamic: balloonType === "dynamic",
    })

    window.open(link, "_blank")
  }

  return (
    <Section tone="warm" className="py-28 md:py-36">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex items-center justify-center gap-2 text-[13px] text-accent/70 pt-2">
                <Info className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="font-light italic">A planning tool — we'll refine details together</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="shadow-xl border-border/40 overflow-hidden">
              <CardContent className="space-y-12 pt-12 pb-10">
                {/* Days Selection */}
                <div className="space-y-5">
                  <label className="text-[13px] font-medium text-ink/80 uppercase tracking-[0.1em]">
                    {content.daysLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`py-5 rounded-xl border-2 transition-all duration-300 font-light text-[15px] ${
                          days === d
                            ? "border-accent bg-accent/5 text-accent shadow-sm scale-[1.02]"
                            : "border-border/50 hover:border-accent/30 hover:bg-surface-2/50"
                        }`}
                      >
                        {d} {d === 1 ? content.day : content.days}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Style */}
                <div className="space-y-5">
                  <label className="text-[13px] font-medium text-ink/80 uppercase tracking-[0.1em]">
                    {content.styleLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "group", label: content.styleGroup },
                      { value: "private", label: content.stylePrivate },
                      { value: "mixed", label: content.styleMixed },
                    ].map((style) => (
                      <button
                        key={style.value}
                        onClick={() => setPackageStyle(style.value as any)}
                        className={`py-5 rounded-xl border-2 transition-all duration-300 font-light text-[15px] ${
                          packageStyle === style.value
                            ? "border-accent bg-accent/5 text-accent shadow-sm scale-[1.02]"
                            : "border-border/50 hover:border-accent/30 hover:bg-surface-2/50"
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Balloon Type */}
                <div className="space-y-5">
                  <label className="text-[13px] font-medium text-ink/80 uppercase tracking-[0.1em]">
                    {content.balloonLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-5">
                    <button
                      onClick={() => setBalloonType("premium")}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        balloonType === "premium"
                          ? "border-accent bg-gradient-to-br from-accent/5 to-accent/10 shadow-md scale-[1.02]"
                          : "border-border/50 hover:border-accent/30 hover:bg-surface-2/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-accent" strokeWidth={2} />
                        <span className="font-medium text-ink text-[15px]">{content.premiumBalloon}</span>
                        <Badge className="bg-accent/15 text-accent text-[9px] border-0 ml-auto px-2 py-0.5 tracking-wide">
                          Recommended
                        </Badge>
                      </div>
                      <div className="text-[12px] text-muted-foreground/70 font-light">
                        €250 · Fixed · Trusted
                      </div>
                    </button>
                    <button
                      onClick={() => setBalloonType("dynamic")}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        balloonType === "dynamic"
                          ? "border-accent bg-accent/5 shadow-md scale-[1.02]"
                          : "border-border/50 hover:border-accent/30 hover:bg-surface-2/50"
                      }`}
                    >
                      <div className="font-medium text-ink mb-3 text-[15px]">{content.dynamicBalloon}</div>
                      <div className="text-[12px] text-muted-foreground/70 font-light">
                        Price TBD · Flexible
                      </div>
                    </button>
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-5">
                  <label className="text-[13px] font-medium text-ink/80 uppercase tracking-[0.1em]">
                    {content.activitiesLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {addOnActivities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedActivities.includes(activity.id)
                            ? "border-accent bg-accent/5 shadow-sm scale-[1.02]"
                            : "border-border/50 hover:border-accent/30 hover:bg-surface-2/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-medium text-ink text-[14px]">{activity.name}</span>
                          <span className="text-[13px] text-muted-foreground/70 font-light">
                            €{activity.price}
                          </span>
                        </div>
                        {selectedActivities.includes(activity.id) && (
                          <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t-2 border-border/40 pt-10 space-y-8 bg-surface-2/30 -mx-8 px-8 pb-2 rounded-b-2xl">
                  <h3 className="font-semibold text-ink uppercase tracking-[0.12em] text-[13px]">
                    {content.summaryTitle}
                  </h3>
                  <div className="space-y-4 text-[14px]">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground/70 font-light">
                        {content.durationLabel}:
                      </span>
                      <span className="text-ink font-medium">
                        {days} {days === 1 ? content.day : content.days}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground/70 font-light">
                        {content.styleLabel}:
                      </span>
                      <span className="text-ink font-medium capitalize">{packageStyle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground/70 font-light">
                        {content.balloonTypeLabel}:
                      </span>
                      <span className="text-ink font-medium capitalize">{balloonType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground/70 font-light">
                        {content.activitiesCountLabel}:
                      </span>
                      <span className="text-ink font-medium">{selectedActivities.length}</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-border/40 pt-8 flex items-end justify-between">
                    <div>
                      <div className="text-[12px] text-muted-foreground/70 font-light uppercase tracking-[0.1em] mb-2">
                        {content.estimatedLabel}
                      </div>
                      {balloonType === "dynamic" && (
                        <div className="text-[11px] text-muted-foreground/60 font-light italic">
                          + balloon (TBD)
                        </div>
                      )}
                    </div>
                    <div className="text-5xl md:text-6xl font-serif text-accent tracking-tight">
                      €{estimatedTotal}
                      {balloonType === "dynamic" && <span className="text-2xl align-super">+</span>}
                    </div>
                  </div>

                  <p className="text-[12px] text-muted-foreground/60 font-light italic pt-3 leading-relaxed">
                    {content.estimateNote}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-10">
                <Button
                  className="w-full gap-3 shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-[15px] font-normal"
                  size="lg"
                  onClick={handleSendPlan}
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                  {content.sendButton}
                </Button>
              </CardFooter>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
