"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, MessageCircle } from "lucide-react"

interface SendPlanModalProps {
  open: boolean
  onClose: () => void
  onSendWhatsApp: (dates: string, guests: number) => void
  onSendEmail: (dates: string, guests: number) => void
  content: {
    title: string
    description: string
    datesLabel: string
    datesPlaceholder: string
    guestsLabel: string
    guestsPlaceholder: string
    whatsappButton: string
    emailButton: string
    cancelButton: string
    validationError: string
  }
}

export default function SendPlanModal({
  open,
  onClose,
  onSendWhatsApp,
  onSendEmail,
  content,
}: SendPlanModalProps) {
  const [dates, setDates] = useState("")
  const [guests, setGuests] = useState<number | "">("")
  const [error, setError] = useState("")

  const handleSubmit = (method: "whatsapp" | "email") => {
    // Validation
    if (!dates.trim() || !guests || guests < 1) {
      setError(content.validationError)
      return
    }

    setError("")

    if (method === "whatsapp") {
      onSendWhatsApp(dates, Number(guests))
    } else {
      onSendEmail(dates, Number(guests))
    }

    // Reset and close
    setDates("")
    setGuests("")
    onClose()
  }

  const handleClose = () => {
    setDates("")
    setGuests("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-xl mx-4">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-2xl md:text-3xl font-serif">{content.title}</DialogTitle>
          <DialogDescription className="text-[14px] md:text-[15px] text-muted-foreground/80 pt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 px-2">
          {/* Dates Input */}
          <div className="space-y-2">
            <Label htmlFor="dates" className="text-[13px] font-medium">
              {content.datesLabel}
            </Label>
            <Input
              id="dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder={content.datesPlaceholder}
              className="font-light"
            />
          </div>

          {/* Guests Input */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-[13px] font-medium">
              {content.guestsLabel}
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value ? Number(e.target.value) : "")}
              placeholder={content.guestsPlaceholder}
              className="font-light"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-[13px] text-red-500 font-light">{error}</p>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => handleSubmit("whatsapp")}
              className="w-full gap-2"
              size="lg"
            >
              <MessageCircle className="w-4 h-4" />
              {content.whatsappButton}
            </Button>

            <Button
              onClick={() => handleSubmit("email")}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <Mail className="w-4 h-4" />
              {content.emailButton}
            </Button>

            <Button
              onClick={handleClose}
              variant="ghost"
              className="w-full text-muted-foreground"
              size="sm"
            >
              {content.cancelButton}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
