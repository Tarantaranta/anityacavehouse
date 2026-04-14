"use client"

import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/button"
import Reveal from "@/components/ui/Reveal"
import { MessageCircle } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/data/activities"

interface ActivitiesContactProps {
  content: {
    title: string
    description: string
    button: string
    note: string
    message: string
  }
}

export default function ActivitiesContact({ content }: ActivitiesContactProps) {
  const handleContact = () => {
    const link = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(content.message)}`
    window.open(link, "_blank")
  }

  return (
    <Section className="py-28 md:py-36 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-30 pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <Reveal>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground/80 leading-[1.8] font-light max-w-2xl mx-auto">
                {content.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Button
              size="lg"
              className="gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 h-14 text-[15px] font-normal"
              onClick={handleContact}
            >
              <MessageCircle className="w-5 h-5" strokeWidth={2} />
              {content.button}
            </Button>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[13px] text-muted-foreground/60 font-light italic leading-relaxed max-w-md mx-auto">
              {content.note}
            </p>
          </Reveal>
        </div>

        {/* Subtle bottom divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-line/20 to-transparent" />
      </Container>
    </Section>
  )
}
