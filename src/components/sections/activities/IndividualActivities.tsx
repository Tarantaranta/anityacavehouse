"use client"

import { useState } from "react"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import ActivityCard from "./ActivityCard"
import ActivityModal from "./ActivityModal"
import SelectionSummary from "./SelectionSummary"
import SendPlanModal from "./SendPlanModal"
import {
  getIndividualActivities,
  generateIndividualActivitiesWhatsAppLink,
  generateIndividualActivitiesEmailLink
} from "@/data/activities"
import type { Activity } from "@/data/activities"

interface IndividualActivitiesProps {
  locale?: "en" | "tr" | "zh"
  content: {
    title: string
    subtitle: string
    detailsLabel: string
    addLabel: string
    selectedLabel: string
    includedLabel: string
    durationLabel: string
    idealForLabel: string
    summaryTitle: string
    summarySelectedLabel: string
    summaryEstimatedLabel: string
    summaryEmptyNote: string
    summarySendButton: string
    summaryClarificationNote: string
    summaryContextLabel: string
    summaryBalloonLabel: string
    summaryBalloonPremium: string
    summaryBalloonPremiumPrice: string
    summaryBalloonFlexible: string
    summaryBalloonFlexiblePrice: string
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
  }
}

export default function IndividualActivities({ locale = "en", content }: IndividualActivitiesProps) {
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([])
  const [modalActivity, setModalActivity] = useState<Activity | null>(null)
  const [preferredDuration, setPreferredDuration] = useState<number | null>(null)
  const [balloonPreference, setBalloonPreference] = useState<"premium" | "flexible" | null>(null)
  const [sendModalOpen, setSendModalOpen] = useState(false)

  const individualActivities = getIndividualActivities(locale)
  const selectedActivities = individualActivities.filter((a) =>
    selectedActivityIds.includes(a.id)
  )

  const estimatedTotal = selectedActivities.reduce((sum, activity) => {
    return sum + (activity.price || 0)
  }, 0)

  const toggleActivity = (activityId: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    )
  }

  const handleSendPlan = () => {
    if (selectedActivityIds.length === 0) return
    setSendModalOpen(true)
  }

  const handleSendWhatsApp = (dates: string, guests: number) => {
    const link = generateIndividualActivitiesWhatsAppLink(
      selectedActivityIds,
      estimatedTotal,
      { dates, guests },
      {
        duration: preferredDuration || undefined,
        balloon: balloonPreference || undefined,
      }
    )
    window.open(link, "_blank")
  }

  const handleSendEmail = (dates: string, guests: number) => {
    const link = generateIndividualActivitiesEmailLink(
      selectedActivityIds,
      estimatedTotal,
      { dates, guests },
      {
        duration: preferredDuration || undefined,
        balloon: balloonPreference || undefined,
      }
    )
    window.location.href = link
  }

  return (
    <Section tone="warm" className="py-20 md:py-28">
      <Container>
        <div className="space-y-12">
          {/* Header - Softer, more optional */}
          <Reveal>
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-[15px] text-muted-foreground/70 font-light leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </Reveal>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualActivities.map((activity, idx) => (
              <Reveal key={activity.id} delay={idx * 0.05}>
                <ActivityCard
                  activity={activity}
                  isSelected={selectedActivityIds.includes(activity.id)}
                  onToggleSelect={() => toggleActivity(activity.id)}
                  onViewDetails={() => setModalActivity(activity)}
                  detailsLabel={content.detailsLabel}
                  addLabel={content.addLabel}
                  selectedLabel={content.selectedLabel}
                />
              </Reveal>
            ))}
          </div>

          {/* Selection Summary */}
          <Reveal delay={0.2}>
            <div className="max-w-xl mx-auto pt-6">
              <SelectionSummary
                selectedActivities={selectedActivities}
                estimatedTotal={estimatedTotal}
                preferredDuration={preferredDuration}
                balloonPreference={balloonPreference}
                onRemove={toggleActivity}
                onDurationChange={setPreferredDuration}
                onBalloonChange={setBalloonPreference}
                onSendPlan={handleSendPlan}
                content={{
                  title: content.summaryTitle,
                  selectedLabel: content.summarySelectedLabel,
                  estimatedLabel: content.summaryEstimatedLabel,
                  emptyNote: content.summaryEmptyNote,
                  sendButton: content.summarySendButton,
                  clarificationNote: content.summaryClarificationNote,
                  contextLabel: content.summaryContextLabel,
                  durationLabel: content.durationLabel,
                  balloonLabel: content.summaryBalloonLabel,
                  balloonPremium: content.summaryBalloonPremium,
                  balloonPremiumPrice: content.summaryBalloonPremiumPrice,
                  balloonFlexible: content.summaryBalloonFlexible,
                  balloonFlexiblePrice: content.summaryBalloonFlexiblePrice,
                }}
              />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Activity Modal */}
      <ActivityModal
        activity={modalActivity}
        open={modalActivity !== null}
        onClose={() => setModalActivity(null)}
        isSelected={modalActivity ? selectedActivityIds.includes(modalActivity.id) : false}
        onToggleSelect={() => {
          if (modalActivity) {
            toggleActivity(modalActivity.id)
          }
        }}
        addLabel={content.addLabel}
        selectedLabel={content.selectedLabel}
        includedLabel={content.includedLabel}
        durationLabel={content.durationLabel}
        idealForLabel={content.idealForLabel}
      />

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
