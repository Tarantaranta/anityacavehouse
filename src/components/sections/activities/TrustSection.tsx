"use client"

import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { Shield, Heart, Clock, Users } from "lucide-react"

interface TrustSectionProps {
  content: {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
}

const icons = [Shield, Heart, Clock, Users]

export default function TrustSection({ content }: TrustSectionProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-5xl mx-auto space-y-16">
          <Reveal>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">
                {content.title}
              </h2>
              <p className="text-muted-foreground/90 font-light max-w-2xl mx-auto leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {content.reasons.map((reason, idx) => {
              const Icon = icons[idx]
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="font-semibold text-ink text-lg">{reason.title}</h3>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed font-light">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
