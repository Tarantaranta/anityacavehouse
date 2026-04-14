"use client"

import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { Sparkles, Clock, MessageCircle, Heart } from "lucide-react"

interface HowItWorksProps {
  content: {
    title: string
    subtitle: string
    steps: Array<{
      title: string
      description: string
    }>
  }
}

const icons = [Sparkles, Clock, MessageCircle, Heart]

export default function HowItWorks({ content }: HowItWorksProps) {
  return (
    <Section tone="warm" className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">
                {content.title}
              </h2>
              <p className="text-muted-foreground/90 font-light">{content.subtitle}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {content.steps.map((step, idx) => {
              const Icon = icons[idx]
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed font-light">
                      {step.description}
                    </p>
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
