"use client"

import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Reveal from "@/components/ui/Reveal"
import { Sparkles, ArrowRight } from "lucide-react"

interface ActivitiesHeroProps {
  onExploreClick: () => void
  onIndividualActivitiesClick?: () => void
  content: {
    eyebrow: string
    title: string
    titleAccent: string
    subtitle: string
    exploreButton: string
    individualActivitiesButton?: string
    badges: string[]
  }
}

export default function ActivitiesHero({
  onExploreClick,
  onIndividualActivitiesClick,
  content,
}: ActivitiesHeroProps) {
  return (
    <Section className="pt-32 md:pt-40 pb-20 md:pb-24 relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-surface pointer-events-none" />

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <Reveal>
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="text-[10px] tracking-[0.25em] uppercase font-light border-accent/20 text-accent/80 px-4 py-1.5"
              >
                {content.eyebrow}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-ink leading-[1.12] tracking-[-0.02em]">
                {content.title}
                <br />
                <span className="text-accent font-light italic">{content.titleAccent}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground/80 leading-[1.7] max-w-2xl mx-auto font-light">
                {content.subtitle}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="pt-4 flex flex-col items-center gap-4">
              {/* Primary CTA - Packages */}
              <Button
                size="lg"
                onClick={onExploreClick}
                className="gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 h-14 text-[15px] font-normal group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" strokeWidth={2} />
                {content.exploreButton}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </Button>

              {/* Secondary CTA - Individual Activities */}
              {content.individualActivitiesButton && onIndividualActivitiesClick && (
                <button
                  onClick={onIndividualActivitiesClick}
                  className="text-[14px] text-muted-foreground/80 hover:text-accent transition-colors duration-200 font-light flex items-center gap-1.5 group"
                >
                  {content.individualActivitiesButton}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex items-center justify-center gap-8 text-[13px] text-muted-foreground/70 pt-5 border-t border-line/20 max-w-lg mx-auto mt-5">
              {content.badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  <span className="font-light">{badge}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Subtle divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-line/30 to-transparent" />
      </Container>
    </Section>
  )
}
