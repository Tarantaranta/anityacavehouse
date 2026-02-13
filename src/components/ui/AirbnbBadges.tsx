import React from 'react';

export const SuperhostBadge = () => {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-2xl border-2 border-rose-200 dark:border-rose-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <svg
        viewBox="0 0 32 32"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <path
          d="M16 1a3 3 0 0 1 2.56 1.44l.23.37 5.67 10.2c.24.44.67.77 1.17.89l.21.04 11.32 1.66a3 3 0 0 1 1.7 5.02l-.16.18-8.2 7.98a2 2 0 0 0-.52 1.58l.03.23 1.94 11.28a3 3 0 0 1-4.45 3.1l-.2-.12-10.13-5.32a2 2 0 0 0-1.62-.06l-.21.06-10.13 5.32a3 3 0 0 1-4.64-2.98l.01-.22 1.94-11.28a2 2 0 0 0-.45-1.6l-.06-.21-8.2-7.98a3 3 0 0 1 1.54-5.2l.23-.03 11.32-1.66a2 2 0 0 0 1.28-.8l.1-.13 5.67-10.2A3 3 0 0 1 16 1z"
          fill="#FF385C"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          SUPERHOST
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          12+ Years
        </span>
      </div>
    </div>
  );
};

export const AirbnbRating = ({ rating = 4.91, reviewCount = 462 }: { rating?: number; reviewCount?: number }) => {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path
          d="M16 1a3 3 0 0 1 2.56 1.44l.23.37 5.67 10.2c.24.44.67.77 1.17.89l.21.04 11.32 1.66a3 3 0 0 1 1.7 5.02l-.16.18-8.2 7.98a2 2 0 0 0-.52 1.58l.03.23 1.94 11.28a3 3 0 0 1-4.45 3.1l-.2-.12-10.13-5.32a2 2 0 0 0-1.62-.06l-.21.06-10.13 5.32a3 3 0 0 1-4.64-2.98l.01-.22 1.94-11.28a2 2 0 0 0-.45-1.6l-.06-.21-8.2-7.98a3 3 0 0 1 1.54-5.2l.23-.03 11.32-1.66a2 2 0 0 0 1.28-.8l.1-.13 5.67-10.2A3 3 0 0 1 16 1z"
          fill="#FF385C"
        />
      </svg>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {rating}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({reviewCount} reviews)
        </span>
      </div>
    </div>
  );
};

export const AirbnbLogo = ({ className = "w-24 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      aria-label="Airbnb"
    >
      <path
        d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1 0 232.1-123 181.1-263.1z"
        fill="#FF385C"
      />
    </svg>
  );
};
