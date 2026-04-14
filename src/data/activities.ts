// ════════════════════════════════════════════════════════════════════════════
// ACTIVITIES DATA
// Curated Cappadocia experiences for Anitya Cave House guests
// ════════════════════════════════════════════════════════════════════════════

export interface Package {
  id: string
  name: string
  price: number
  priceRange?: string
  type: "Group" | "Private" | "Mixed" | "Signature"
  summary: string
  includes: string[]
  idealFor: string
  highlight?: string
  recommended?: boolean
  pricingNote?: string // Clarify what's included in the displayed price
}

export interface Activity {
  id: string
  name: string
  tagline: string
  description: string
  price: number | null
  priceNote?: string
  duration: string
  included: string[]
  idealFor: string
  image: string
  category: "adventure" | "culture" | "photo" | "nature" | "tour"
}

// ════════════════════════════════════════════════════════════════════════════
// CURATED PACKAGES
// ════════════════════════════════════════════════════════════════════════════

const packagesData = {
  oneDay: [
    {
      id: "group-day",
      price: 170,
      type: "Group" as const,
      recommended: false,
      content: {
        en: {
          name: "Group Day Plan",
          summary: "Classic Cappadocia — trusted group tours, essential highlights",
          includes: [
            "Hot Air Balloon Flight",
            "Red or Green Daily Group Tour",
            "ATV Sunset",
            "Whirling Dervishes",
          ],
          idealFor: "Budget-conscious travelers who enjoy social exploration",
        },
        tr: {
          name: "Grup Günlük Plan",
          summary: "Klasik Kapadokya — güvenilir grup turları, temel deneyimler",
          includes: [
            "Sıcak Hava Balon Uçuşu",
            "Kırmızı veya Yeşil Grup Turu",
            "ATV Gün Batımı",
            "Semazen Gösterisi",
          ],
          idealFor: "bütçesine dikkat eden ve sosyal keşif seven gezginler",
        },
      },
    },
    {
      id: "private-photo",
      price: 330,
      type: "Private" as const,
      recommended: true,
      content: {
        en: {
          name: "Private + Photo",
          summary: "Intimate valley exploration with iconic photo memories",
          includes: [
            "Hot Air Balloon Flight",
            "Red Daily Private Tour",
            "Classic Car Photo Ride",
            "Whirling Dervishes",
          ],
          idealFor: "Couples seeking undivided guide attention and stunning photos",
          highlight: "Most Loved",
        },
        tr: {
          name: "Özel + Fotoğraf",
          summary: "Samimi vadi keşfi ve ikonik fotoğraf anıları",
          includes: [
            "Sıcak Hava Balon Uçuşu",
            "Kırmızı Özel Tur",
            "Klasik Araba Fotoğraf Gezisi",
            "Semazen Gösterisi",
          ],
          idealFor: "özel rehber ilgisi ve çarpıcı fotoğraflar arayan çiftler",
          highlight: "En Sevilen",
        },
      },
    },
    {
      id: "private-dinner",
      price: 345,
      type: "Private" as const,
      recommended: false,
      content: {
        en: {
          name: "Private + Dinner Show",
          summary: "Cultural immersion with evening entertainment",
          includes: [
            "Hot Air Balloon Flight",
            "Red Daily Private Tour",
            "ATV Sunset",
            "Turkish Night Dinner & Show",
          ],
          idealFor: "Culture seekers who want adventure and evening tradition",
        },
        tr: {
          name: "Özel + Akşam Gösterisi",
          summary: "Kültürel deneyim ve akşam eğlencesi",
          includes: [
            "Sıcak Hava Balon Uçuşu",
            "Kırmızı Özel Tur",
            "ATV Gün Batımı",
            "Türk Gecesi Yemek & Gösteri",
          ],
          idealFor: "macera ve gelenek arayan kültür meraklıları",
        },
      },
    },
  ],
  twoDay: [
    {
      id: "group-combo",
      price: 285,
      type: "Group" as const,
      recommended: false,
      content: {
        en: {
          name: "Group Combo",
          summary: "Two full days of curated experiences at excellent value",
          includes: [
            "Day 1: Hot Air Balloon → Red Group Tour → Dervishes",
            "Day 2: Green Group Tour → Turkish Night",
          ],
          idealFor: "Travelers seeking comprehensive coverage without private tours",
        },
        tr: {
          name: "Grup Kombine",
          summary: "İki tam gün özenle seçilmiş deneyimler, mükemmel fiyat",
          includes: [
            "1. Gün: Balon Uçuşu → Kırmızı Grup Turu → Semazen",
            "2. Gün: Yeşil Grup Turu → Türk Gecesi",
          ],
          idealFor: "özel tur olmadan kapsamlı deneyim arayan gezginler",
        },
      },
    },
    {
      id: "private-group-mix",
      price: 445,
      type: "Mixed" as const,
      recommended: true,
      content: {
        en: {
          name: "Private + Group",
          summary: "Best of both — intimacy on Day 1, community on Day 2",
          includes: [
            "Day 1: Hot Air Balloon → Red Private Tour → Photos → Dervishes",
            "Day 2: Green Group Tour → Turkish Night",
          ],
          idealFor: "Guests who value privacy first, social exploration second",
          highlight: "Best for First-Time Visitors",
        },
        tr: {
          name: "Özel + Grup",
          summary: "İkisinin de en iyisi — ilk gün samimiyet, ikinci gün sosyal keşif",
          includes: [
            "1. Gün: Balon Uçuşu → Kırmızı Özel Tur → Fotoğraflar → Semazen",
            "2. Gün: Yeşil Grup Turu → Türk Gecesi",
          ],
          idealFor: "önce mahremiyet, sonra sosyal keşif isteyen misafirler",
          highlight: "İlk Kez Gelenler İçin İdeal",
        },
      },
    },
    {
      id: "private-signature",
      price: 585,
      priceRange: "585–635",
      type: "Signature" as const,
      recommended: false,
      content: {
        en: {
          name: "Signature Edition",
          summary: "Fully private with your choice of culture or adventure finale",
          includes: [
            "Hot Air Balloon → Red + Green Private Tours",
            "Culture Finale: Turkish Night (€585)",
            "Adventure Finale: Jeep Safari (€635)",
            "Your choice - we'll confirm which option"
          ],
          idealFor: "Discerning guests seeking complete guide dedication",
        },
        tr: {
          name: "Seçkin Seri",
          summary: "Tamamen özel, kültür ya da macera finali tercihiniz",
          includes: [
            "Balon Uçuşu → Kırmızı + Yeşil Özel Turlar",
            "Kültür Finali: Türk Gecesi (€585)",
            "Macera Finali: Jeep Safari (€635)",
            "Tercihiniz — hangisini seçtiğinizi birlikte onaylarız"
          ],
          idealFor: "tam rehber özeni arayan seçici misafirler",
        },
      },
    },
  ],
  threeDay: [
    {
      id: "group-trio",
      price: 325,
      type: "Group" as const,
      recommended: false,
      content: {
        en: {
          name: "Group Trio",
          summary: "Extended group journey with a quieter valley finale",
          includes: [
            "Day 1: Hot Air Balloon → Red Group Tour → Dervishes",
            "Day 2: Green Group Tour → Turkish Night",
            "Day 3: Horseback Valley Ride",
          ],
          idealFor: "Value-seekers wanting a slower-paced third day",
        },
        tr: {
          name: "Grup Üçlü",
          summary: "Uzun grup yolculuğu, sakin vadi finali",
          includes: [
            "1. Gün: Balon Uçuşu → Kırmızı Grup Turu → Semazen",
            "2. Gün: Yeşil Grup Turu → Türk Gecesi",
            "3. Gün: Atlı Vadi Gezisi",
          ],
          idealFor: "üçüncü günde daha yavaş tempo isteyen gezginler",
        },
      },
    },
    {
      id: "private-group-adventure",
      price: 545,
      type: "Mixed" as const,
      recommended: false,
      content: {
        en: {
          name: "Private + Adventure",
          summary: "Private start, group camaraderie, adventure finale",
          includes: [
            "Day 1: Hot Air Balloon → Red Private Tour → Photos",
            "Day 2: Green Group Tour → Dervishes",
            "Day 3: Jeep Safari → Turkish Night",
          ],
          idealFor: "Active travelers who enjoy varied daily rhythms",
          highlight: "Adventure-Focused",
        },
        tr: {
          name: "Özel + Macera",
          summary: "Özel başlangıç, grup kaynaşması, macera finali",
          includes: [
            "1. Gün: Balon Uçuşu → Kırmızı Özel Tur → Fotoğraflar",
            "2. Gün: Yeşil Grup Turu → Semazen",
            "3. Gün: Jeep Safari → Türk Gecesi",
          ],
          idealFor: "değişken günlük ritimlerden hoşlanan aktif gezginler",
          highlight: "Macera Odaklı",
        },
      },
    },
    {
      id: "all-private-grand",
      price: 765,
      type: "Signature" as const,
      recommended: true,
      content: {
        en: {
          name: "Grand Private Tour",
          summary: "Complete private immersion across three distinct valleys",
          includes: [
            "Day 1: Hot Air Balloon → Red Private Tour → Photos",
            "Day 2: Green Private Tour → Dervishes",
            "Day 3: Blue Private Tour → Turkish Night",
          ],
          idealFor: "Guests seeking the ultimate Cappadocia journey",
          highlight: "Signature Experience",
        },
        tr: {
          name: "Büyük Özel Tur",
          summary: "Üç farklı vadide tamamen özel deneyim",
          includes: [
            "1. Gün: Balon Uçuşu → Kırmızı Özel Tur → Fotoğraflar",
            "2. Gün: Yeşil Özel Tur → Semazen",
            "3. Gün: Mavi Özel Tur → Türk Gecesi",
          ],
          idealFor: "nihai Kapadokya yolculuğu arayan misafirler",
          highlight: "Seçkin Deneyim",
        },
      },
    },
  ],
}

// Helper function to get localized package content
function getLocalizedPackage(pkg: any, locale: "en" | "tr" | "zh" = "en") {
  const content = pkg.content?.[locale] || pkg.content?.en || {}
  return {
    id: pkg.id,
    name: content.name || "",
    price: pkg.price,
    priceRange: pkg.priceRange,
    type: pkg.type,
    summary: content.summary || "",
    includes: content.includes || [],
    idealFor: content.idealFor || "",
    highlight: content.highlight,
    recommended: pkg.recommended,
    pricingNote: pkg.pricingNote,
  }
}

// Export localized packages
export function getLocalizedPackages(locale: "en" | "tr" | "zh" = "en") {
  return {
    oneDay: packagesData.oneDay.map(pkg => getLocalizedPackage(pkg, locale)),
    twoDay: packagesData.twoDay.map(pkg => getLocalizedPackage(pkg, locale)),
    threeDay: packagesData.threeDay.map(pkg => getLocalizedPackage(pkg, locale)),
  }
}

// Default export (English) for backward compatibility
export const packages = getLocalizedPackages("en")

// ════════════════════════════════════════════════════════════════════════════
// ADD-ON ACTIVITIES
// Now sourced from unified experiences.ts
// ════════════════════════════════════════════════════════════════════════════

import { experiences, getLocalizedContent } from "./experiences"

// Get activities for a specific locale
export function getIndividualActivities(locale: "en" | "tr" | "zh" = "en"): Activity[] {
  return experiences
    .filter((exp) => exp.bookable === true)
    .map((exp) => {
      const content = getLocalizedContent(exp, locale)
      return {
        id: exp.id,
        name: content.title,
        tagline: content.tagline,
        description: content.description,
        price: exp.pricing?.price ?? null,
        priceNote: exp.pricing?.priceNote ?? "",
        duration: exp.duration,
        included: exp.pricing?.included ?? [],
        idealFor: content.idealFor ?? "",
        image: exp.image,
        category: exp.category as Activity["category"],
      }
    })
}

// Default export (English) for backward compatibility
export const individualActivities: Activity[] = getIndividualActivities("en")

// Legacy add-on activities (kept for package reference)
export const addOnActivities: Activity[] = [
  { id: "atv", name: "ATV Sunset", price: 35, category: "adventure" } as Activity,
  { id: "dervishes", name: "Whirling Dervishes", price: 20, category: "culture" } as Activity,
  { id: "turkish-night", name: "Turkish Night", price: 50, category: "culture" } as Activity,
  { id: "classic-car", name: "Classic Car Photos", price: 100, category: "photo" } as Activity,
  { id: "jeep-safari", name: "Jeep Safari", price: 100, category: "adventure" } as Activity,
  { id: "blue-tour", name: "Blue Tour", price: 180, category: "nature" } as Activity,
]

// ════════════════════════════════════════════════════════════════════════════
// BALLOON OPTIONS
// ════════════════════════════════════════════════════════════════════════════

export const balloonOptions = {
  premium: {
    id: "premium",
    name: "Premium Balloon",
    price: 250,
    features: [
      "Trusted, established operators",
      "Fixed price — no surprises",
      "Predictable service quality",
      "Peace of mind guarantee",
    ],
    recommended: true,
  },
  flexible: {
    id: "flexible",
    name: "Flexible Price Balloon",
    price: null, // confirmed later
    features: [
      "Price varies with demand",
      "Operator confirmed closer to date",
      "Often lower price possible",
      "Flexible budget option",
    ],
    recommended: false,
  },
}

// ════════════════════════════════════════════════════════════════════════════
// WHATSAPP CONFIG
// ════════════════════════════════════════════════════════════════════════════

export const WHATSAPP_NUMBER = "+905354946814"

export function generateWhatsAppLink(plan: {
  days: number
  style: string
  balloon: string
  activities: string[]
  total: number
  isDynamic: boolean
}): string {
  const activitySection = plan.activities.length > 0
    ? `\n✨ Activities:\n${plan.activities.map((a) => `   • ${a}`).join("\n")}\n`
    : ""

  const message = `Hello! We'd like to plan activities for our stay at Anitya Cave House.

📅 Duration: ${plan.days} day${plan.days > 1 ? "s" : ""}
🎯 Style: ${plan.style}
🎈 Balloon: ${plan.balloon}${activitySection}
💰 Estimated: €${plan.total}${plan.isDynamic ? " + balloon (confirmed 1 day before)" : ""} per person

📆 Our dates: [Please fill in]
👥 Guests: [Please fill in]

This is our initial plan. We'd love to refine the details together!`

  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}

export function generatePackageWhatsAppLink(
  packageName: string,
  price: number | string,
  contactInfo: {
    dates: string
    guests: number
  },
  balloonChoice?: "premium" | "flexible",
  locale: "en" | "tr" | "zh" = "en"
): string {
  const balloonText = {
    en: balloonChoice === "premium"
      ? "🎈 Balloon: Premium Balloon (€250 fixed)"
      : "🎈 Balloon: Flexible Price Balloon (€50 deposit + remaining confirmed 1 day before)",
    tr: balloonChoice === "premium"
      ? "🎈 Balon: Premium Balon (Sabit €250)"
      : "🎈 Balon: Esnek Fiyatlı Balon (€50 depozito + kalan 1 gün önce onaylanır)",
    zh: balloonChoice === "premium"
      ? "🎈 气球：高级气球（固定€250）"
      : "🎈 气球：灵活价格气球（€50押金+剩余部分在1天前确认）"
  }

  const messages = {
    en: `Hello! We'd like to arrange the "${packageName}" package during our stay at Anitya Cave House.

📦 Package: ${packageName}
💰 Indicated total: €${price} per person
${balloonChoice ? balloonText.en : ""}

📅 Our dates: ${contactInfo.dates}
👥 Number of guests: ${contactInfo.guests}

Could you help us confirm the final breakdown and availability?

Thank you!`,
    tr: `Merhaba! Anitya Cave House'daki konaklamımız için "${packageName}" paketini ayarlamak istiyoruz.

📦 Paket: ${packageName}
💰 Belirtilen toplam: Kişi başı €${price}
${balloonChoice ? balloonText.tr : ""}

📅 Tarihlerimiz: ${contactInfo.dates}
👥 Misafir sayısı: ${contactInfo.guests}

Bize nihai dökümü ve müsaitliği onaylamada yardımcı olabilir misiniz?

Teşekkürler!`,
    zh: `您好！我们想在Anitya Cave House住宿期间安排"${packageName}"套餐。

📦 套餐：${packageName}
💰 标示总价：每人€${price}
${balloonChoice ? balloonText.zh : ""}

📅 我们的日期：${contactInfo.dates}
👥 客人人数：${contactInfo.guests}

您能帮我们确认最终明细和可用性吗？

谢谢！`
  }

  const message = messages[locale] || messages.en
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}

export function generatePackageEmailLink(
  packageName: string,
  price: number | string,
  contactInfo: {
    dates: string
    guests: number
  },
  balloonChoice?: "premium" | "flexible",
  locale: "en" | "tr" | "zh" = "en"
): string {
  const subjects = {
    en: `Package Inquiry: ${packageName} - Anitya Cave House`,
    tr: `Paket Talebi: ${packageName} - Anitya Cave House`,
    zh: `套餐咨询：${packageName} - Anitya Cave House`
  }

  const balloonText = {
    en: balloonChoice === "premium"
      ? "Balloon: Premium Balloon (€250 fixed)"
      : "Balloon: Flexible Price Balloon (€50 deposit + remaining confirmed 1 day before)",
    tr: balloonChoice === "premium"
      ? "Balon: Premium Balon (Sabit €250)"
      : "Balon: Esnek Fiyatlı Balon (€50 depozito + kalan 1 gün önce onaylanır)",
    zh: balloonChoice === "premium"
      ? "气球：高级气球（固定€250）"
      : "气球：灵活价格气球（€50押金+剩余部分在1天前确认）"
  }

  const bodies = {
    en: `Hello!

We'd like to arrange the "${packageName}" package during our stay at Anitya Cave House.

Package: ${packageName}
Indicated total: €${price} per person
${balloonChoice ? balloonText.en : ""}

Our dates: ${contactInfo.dates}
Number of guests: ${contactInfo.guests}

Could you help us confirm the final breakdown and availability?

Thank you!`,
    tr: `Merhaba!

Anitya Cave House'daki konaklamımız için "${packageName}" paketini ayarlamak istiyoruz.

Paket: ${packageName}
Belirtilen toplam: Kişi başı €${price}
${balloonChoice ? balloonText.tr : ""}

Tarihlerimiz: ${contactInfo.dates}
Misafir sayısı: ${contactInfo.guests}

Bize nihai dökümü ve müsaitliği onaylamada yardımcı olabilir misiniz?

Teşekkürler!`,
    zh: `您好！

我们想在Anitya Cave House住宿期间安排"${packageName}"套餐。

套餐：${packageName}
标示总价：每人€${price}
${balloonChoice ? balloonText.zh : ""}

我们的日期：${contactInfo.dates}
客人人数：${contactInfo.guests}

您能帮我们确认最终明细和可用性吗？

谢谢！`
  }

  const subject = subjects[locale] || subjects.en
  const body = bodies[locale] || bodies.en

  return `mailto:info@anityacavehouse.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function generateIndividualActivitiesWhatsAppLink(
  selectedActivityIds: string[],
  estimatedTotal: number,
  contactInfo: {
    dates: string
    guests: number
  },
  preferences?: {
    duration?: number
    balloon?: "premium" | "flexible"
  }
): string {
  const activities = selectedActivityIds
    .map((id) => {
      const activity = individualActivities.find((a) => a.id === id)
      return activity ? `   • ${activity.name}` : null
    })
    .filter(Boolean)
    .join("\n")

  const preferencesSection = preferences && (preferences.duration || preferences.balloon)
    ? `\n💭 Optional Planning Context:\n${preferences.duration ? `   • Preferred duration: ${preferences.duration} day${preferences.duration > 1 ? "s" : ""}\n` : ""}${preferences.balloon ? `   • Balloon preference: ${preferences.balloon === "premium" ? "Premium Balloon (€250 fixed)" : "Flexible Price Balloon (€50 deposit · remaining confirmed 1 day before)"}\n` : ""}`
    : ""

  const message = `Hello! We'd like to arrange individual activities during our stay at Anitya Cave House.

✨ Selected Activities:
${activities}${preferencesSection}

💰 Selected items estimate: €${estimatedTotal} per person

📅 Our dates: ${contactInfo.dates}
👥 Number of guests: ${contactInfo.guests}

This is our initial selection. We'd love to confirm timing, availability, and final pricing with you.

Thank you!`

  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}

export function generateIndividualActivitiesEmailLink(
  selectedActivityIds: string[],
  estimatedTotal: number,
  contactInfo: {
    dates: string
    guests: number
  },
  preferences?: {
    duration?: number
    balloon?: "premium" | "flexible"
  }
): string {
  const activities = selectedActivityIds
    .map((id) => {
      const activity = individualActivities.find((a) => a.id === id)
      return activity ? `• ${activity.name}` : null
    })
    .filter(Boolean)
    .join("\n")

  const preferencesSection = preferences && (preferences.duration || preferences.balloon)
    ? `\n\nOptional Planning Context:\n${preferences.duration ? `• Preferred duration: ${preferences.duration} day${preferences.duration > 1 ? "s" : ""}\n` : ""}${preferences.balloon ? `• Balloon preference: ${preferences.balloon === "premium" ? "Premium Balloon (€250 fixed)" : "Flexible Price Balloon (€50 deposit · remaining confirmed 1 day before)"}\n` : ""}`
    : ""

  const subject = "Individual Activities Inquiry - Anitya Cave House"

  const body = `Hello!

We'd like to arrange individual activities during our stay at Anitya Cave House.

Selected Activities:
${activities}${preferencesSection}

Selected items estimate: €${estimatedTotal} per person

Our dates: ${contactInfo.dates}
Number of guests: ${contactInfo.guests}

This is our initial selection. We'd love to confirm timing, availability, and final pricing with you.

Thank you!`

  return `mailto:info@anityacavehouse.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
