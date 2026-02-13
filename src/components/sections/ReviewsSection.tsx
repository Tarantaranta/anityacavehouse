'use client';

import React from 'react';
import { topReviews, airbnbStats } from '@/data/reviews';
import { SuperhostBadge, AirbnbRating, AirbnbLogo } from '@/components/ui/AirbnbBadges';
import { useTranslations } from 'next-intl';

const ReviewCard = ({ review }: { review: typeof topReviews[0] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
            {review.guestName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {review.country} • {review.date}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/30 px-3 py-1 rounded-full">
          <svg className="w-4 h-4 fill-rose-500" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
            {review.rating}.0
          </span>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
        {review.comment}
      </p>

      {/* Airbnb verified badge */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 6.293a1 1 0 00-1.414-1.414L7 8.172 5.707 6.878a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
          <span>Verified Airbnb Guest</span>
        </div>
      </div>
    </div>
  );
};

export default function ReviewsSection() {
  const t = useTranslations('reviews');

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header with Badges */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Airbnb Logo */}
            <div className="flex items-center gap-3">
              <AirbnbLogo className="w-32 h-10" />
              <span className="text-2xl font-light text-gray-400">|</span>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Guest Reviews
              </span>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SuperhostBadge />
              <AirbnbRating
                rating={airbnbStats.overallRating}
                reviewCount={airbnbStats.totalReviews}
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topReviews.slice(0, 9).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA to Airbnb */}
        <div className="text-center">
          <a
            href="https://www.airbnb.com/rooms/2953140"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <AirbnbLogo className="w-24 h-8 brightness-0 invert" />
            <span className="text-lg">{t('viewAllReviews')}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {airbnbStats.totalReviews}+ {t('verifiedGuests')}
          </p>
        </div>
      </div>
    </section>
  );
}
