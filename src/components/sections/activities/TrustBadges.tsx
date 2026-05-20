/**
 * Trust Badges Component for Activities Page
 * Displays Airbnb Superhost credentials and social proof
 */

'use client';

import React from 'react';
import { Star, Users, Award, Shield } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

interface TrustBadgesProps {
  content: {
    superhostYears: string;
    totalGuests: string;
    rating: string;
    totalReviews: string;
  };
}

export function TrustBadges({ content }: TrustBadgesProps) {
  const badges = [
    {
      icon: Award,
      title: 'Airbnb Superhost',
      subtitle: content.superhostYears,
      color: 'text-amber-600',
    },
    {
      icon: Users,
      title: content.totalGuests,
      subtitle: 'Mutlu Misafir',
      color: 'text-blue-600',
    },
    {
      icon: Star,
      title: content.rating,
      subtitle: `${content.totalReviews} Değerlendirme`,
      color: 'text-amber-500',
    },
    {
      icon: Shield,
      title: 'Güvenilir',
      subtitle: 'Partnerler',
      color: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <Reveal key={index} delayMs={index * 80}>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 border border-black/5 hover:shadow-md transition-shadow">
              <Icon className={`h-6 w-6 mb-2 ${badge.color}`} strokeWidth={1.5} />
              <p className="text-base font-semibold text-ink">{badge.title}</p>
              <p className="text-xs text-ink-2 mt-1">{badge.subtitle}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default TrustBadges;
