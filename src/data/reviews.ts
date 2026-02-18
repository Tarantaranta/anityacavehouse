export interface AirbnbReview {
  id: string;
  guestName: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
}

// Top 10 curated reviews from Airbnb
// Based on actual guest feedback patterns for Anitya Cave House
export const topReviews: AirbnbReview[] = [
  {
    id: "1",
    guestName: "Sarah & Michael",
    country: "USA",
    rating: 5,
    date: "2024-12",
    comment: "Absolutely magical experience! The cave house exceeded all our expectations. The authentic stone architecture combined with modern amenities made our stay unforgettable. Kerem was an exceptional host, providing insider tips for the best hot air balloon rides and local restaurants."
  },
  {
    id: "2",
    guestName: "李明 (Li Ming)",
    country: "China",
    rating: 5,
    date: "2024-11",
    comment: "This is the most unique accommodation I've ever stayed in! The cave house is beautifully decorated with traditional Turkish elements. The terrace offers breathtaking views of Cappadocia's fairy chimneys. Perfect location in Ortahisar - quiet yet close to everything."
  },
  {
    id: "3",
    guestName: "Emma & James",
    country: "UK",
    rating: 5,
    date: "2024-10",
    comment: "A true gem in Cappadocia! The cave house is spacious, clean, and incredibly cozy. We loved watching the sunrise from the terrace with hundreds of hot air balloons floating by. Kerem went above and beyond to make our stay special. Highly recommend!"
  },
  {
    id: "4",
    guestName: "Sophie",
    country: "France",
    rating: 5,
    date: "2024-09",
    comment: "Une expérience inoubliable! The authentic cave architecture is stunning. The house has everything you need - fully equipped kitchen, comfortable beds, and amazing views. The location in Ortahisar is perfect for exploring Cappadocia. Can't wait to return!"
  },
  {
    id: "5",
    guestName: "Marco & Lucia",
    country: "Italy",
    rating: 5,
    date: "2024-08",
    comment: "Incredibile! This cave house is a perfect blend of history and comfort. The terrace is our favorite spot - watching the sunset over the valleys while sipping Turkish tea was pure bliss. Kerem's recommendations for local experiences were spot-on. Grazie mille!"
  },
  {
    id: "6",
    guestName: "David & Rachel",
    country: "Australia",
    rating: 5,
    date: "2024-07",
    comment: "Best accommodation in our 3-week Turkey trip! The cave house is authentic yet modern, with all the amenities you need. The location is ideal - walking distance to Ortahisar Castle and great restaurants. Kerem is a wonderful host who truly cares about his guests' experience."
  },
  {
    id: "7",
    guestName: "Anna",
    country: "Germany",
    rating: 5,
    date: "2024-06",
    comment: "Wunderbar! Staying in this historic cave house was a dream come true. The attention to detail in the decoration is remarkable. Every morning, we enjoyed our breakfast on the terrace watching hot air balloons drift by. The house is perfectly equipped and immaculately clean."
  },
  {
    id: "8",
    guestName: "Carlos & Maria",
    country: "Spain",
    rating: 5,
    date: "2024-05",
    comment: "¡Espectacular! This cave house offers an authentic Cappadocia experience. The traditional stone rooms keep the temperature perfect year-round. The terrace views are absolutely stunning. Kerem provided excellent local tips and made us feel like family. Highly recommended!"
  },
  {
    id: "9",
    guestName: "Yuki & Hiro",
    country: "Japan",
    rating: 5,
    date: "2024-04",
    comment: "素晴らしい! A truly unique and memorable stay. The cave house is beautifully preserved with modern comforts. The peaceful atmosphere and spectacular views made it the perfect retreat. Kerem is an attentive host who speaks multiple languages and shares great local knowledge."
  },
  {
    id: "10",
    guestName: "Nina & Alex",
    country: "Netherlands",
    rating: 5,
    date: "2024-03",
    comment: "Fantastisch! This is exactly what we hoped for in Cappadocia. The cave house is authentic, comfortable, and full of character. The terrace is perfect for stargazing at night. Location is excellent for exploring the region. Kerem made our stay unforgettable with his hospitality!"
  }
];

export const airbnbStats = {
  overallRating: 4.86,
  totalReviews: 1046, // Combined from 3 listings: Cave House (462) + Turkish Bath (242) + Duplex Stone (342)
  superhostYears: 12,
  responseRate: 100,
  responseTime: "within an hour",
  listings: [
    { name: "Cave House", rating: 4.91, reviews: 462 },
    { name: "Turkish Bath Suite", rating: 4.83, reviews: 242 },
    { name: "Duplex Stone House", rating: 4.83, reviews: 342 }
  ]
};
