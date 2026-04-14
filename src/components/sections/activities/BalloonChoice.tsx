"use client"

import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Reveal from "@/components/ui/Reveal"
import { Shield, MapPin, Check, TrendingUp } from "lucide-react"
import { balloonOptions } from "@/data/activities"

interface BalloonChoiceProps {
  content: {
    title: string
    subtitle: string
    premiumLabel: string
    premiumTagline: string
    premiumBalloonName: string
    premiumBalloonTagline: string
    dynamicLabel: string
    dynamicTagline: string
    dynamicBalloonName: string
    dynamicPriceNote: string
    dynamicPriceVaries: string
    dynamicFlexibleNote: string
    dynamicFeature1: string
    dynamicFeature2: string
    dynamicFeature3: string
    dynamicFeature4: string
    depositNote: string
    whyPremium: string
    premiumReason1: string
    premiumReason2: string
    premiumReason3: string
    premiumReason4: string
    premiumNote: string
    perPerson: string
  }
}

export default function BalloonChoice({ content }: BalloonChoiceProps) {
  return (
    <Section className="py-20 md:py-28 bg-gradient-to-b from-surface via-surface-2/30 to-surface">
      <Container>
        <div className="max-w-5xl mx-auto space-y-10">
          <Reveal>
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Balloon - Emphasized */}
            <Reveal delay={0.1}>
              <Card className="relative border-accent/25 shadow-2xl hover:shadow-[0_20px_60px_rgba(161,128,90,0.15)] transition-all duration-700 bg-gradient-to-br from-surface via-surface-2/60 to-surface group">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                <div className="absolute -top-3 left-6">
                  <Badge className="bg-accent text-white text-[10px] tracking-[0.08em] shadow-lg px-4 py-1.5">
                    {content.premiumLabel}
                  </Badge>
                </div>

                <CardHeader className="pb-4 pt-7 relative">
                  <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                    <Shield className="w-7 h-7 text-accent" strokeWidth={2} />
                    <span className="font-serif tracking-tight">{content.premiumBalloonName}</span>
                  </CardTitle>
                  <CardDescription className="text-[13px] uppercase tracking-[0.12em] text-accent/70 font-medium pt-2">
                    {content.premiumBalloonTagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5 relative">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl md:text-5xl font-serif text-accent tracking-tight">
                      €{balloonOptions.premium.price}
                    </div>
                    <span className="text-[14px] font-sans text-muted-foreground/70 font-light">{content.perPerson}</span>
                  </div>

                  {/* Why Premium callout */}
                  <div className="bg-accent/5 border border-accent/15 rounded-xl p-3.5 space-y-2.5">
                    <div className="text-[12px] uppercase tracking-[0.12em] text-accent/80 font-semibold">
                      {content.whyPremium}
                    </div>
                    <ul className="space-y-2.5 text-[14px]">
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-ink/90 font-medium">{content.premiumReason1}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-ink/90 font-medium">{content.premiumReason2}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-ink/90 font-medium">{content.premiumReason3}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-ink/90 font-medium">{content.premiumReason4}</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[13px] text-muted-foreground/70 font-light italic leading-relaxed pt-2">
                    {content.premiumNote}
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            {/* Dynamic Balloon - De-emphasized */}
            <Reveal delay={0.2}>
              <Card className="hover:shadow-md transition-all duration-500 border-border/40 bg-surface-2/20">
                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
                    <MapPin className="w-6 h-6 text-muted-foreground/70" strokeWidth={2} />
                    <span className="font-serif tracking-tight">{content.dynamicBalloonName}</span>
                  </CardTitle>
                  <CardDescription className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground/70 font-medium pt-2">
                    {content.dynamicTagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <div className="text-3xl font-serif text-ink tracking-tight">
                      {content.dynamicPriceVaries}
                    </div>
                    <span className="text-[12px] font-sans text-muted-foreground/70 font-light block leading-relaxed">
                      {content.dynamicPriceNote}
                    </span>
                  </div>

                  {/* Structured middle block - parallel to Premium's feature box */}
                  <div className="border border-border/40 rounded-xl p-3.5 space-y-2.5 bg-surface/30">
                    <ul className="space-y-2.5 text-[14px]">
                      {[content.dynamicFeature1, content.dynamicFeature2, content.dynamicFeature3, content.dynamicFeature4].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-muted-foreground/85 font-light leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[13px] text-muted-foreground/70 font-light italic leading-relaxed pt-2">
                    {content.dynamicFlexibleNote}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <p className="text-center text-[13px] text-muted-foreground/60 font-light italic leading-relaxed max-w-xl mx-auto pt-4">
              {content.depositNote}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
