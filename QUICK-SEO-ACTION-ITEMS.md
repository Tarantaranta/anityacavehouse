# ⚡ QUICK SEO ACTION ITEMS (Öncelikli Yapılacaklar)

**Status:** Yapılmaya Hazır
**Süre:** 2-4 hafta, 10-15 saat

---

## 🔴 WEEK 1: CRITICAL FIXES (Must Do)

### 1️⃣ Homepage H1 Tag (30 min)
**File:** `/src/app/[locale]/page.tsx`
**Issue:** Hiç H1 yok
**Fix:**
```jsx
// Şu anki:
<HeroCinematic2026 />

// Değişen:
<HeroCinematic2026>
  <h1 className="sr-only">
    {locale === 'tr' ? 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Mağara ve Taş Suite Evler'
      : locale === 'en' ? 'Anitya Cave House – Independent Cave & Stone Suites in Ortahisar, Cappadocia'
      : 'Anitya洞穴之家 – 卡帕多西亚奥塔希萨尔独立洞穴和石头套房'}
  </h1>
</HeroCinematic2026>
```
**Impact:** +5% organic visibility

---

### 2️⃣ About Page H2/H3 Semantic Fix (45 min)
**File:** `/src/app/[locale]/about/page.tsx`
**Issue:** Block başlıklar `<p>` tag'i ile styling yapılmış
**Fix:**
```jsx
// BEFORE (line 159):
<div className="space-y-6 mb-14">
  {c.block1.map((para, i) => (
    <Reveal key={i} delayMs={i * 80}>
      <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
        {para}
      </p>
    </Reveal>
  ))}
</div>

// AFTER: Block başlıkları ekle
<Reveal>
  <h2 className="font-serif text-3xl text-neutral-800 mb-6">
    Tarihimiz
  </h2>
</Reveal>
<div className="space-y-6 mb-14">
  {c.block1.map((para, i) => (
    <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
      {para}
    </p>
  ))}
</div>
```
**Impact:** +3% CTR (heading extraction)

---

### 3️⃣ Blog Post Internal Linking (1 hour)
**File:** `/src/app/[locale]/blog/[slug]/page.tsx` (tüm blog posts)
**Issue:** Blog yazıları birbirlerine bağlı değil
**Fix:**
```jsx
// Blog post sonunda, CTA öncesinde ekle:
<section className="border-t border-neutral-200 py-12 mt-14 mb-14">
  <Reveal>
    <h3 className="font-serif text-2xl text-neutral-800 mb-8">
      {locale === 'tr' ? 'Diğer Kapadokya Yazıları'
        : locale === 'en' ? 'More Cappadocia Stories'
        : '更多卡帕多西亚故事'}
    </h3>
  </Reveal>
  <div className="grid md:grid-cols-2 gap-6">
    {relatedPosts.map((post) => (
      <Reveal key={post.slug}>
        <Link href={`/blog/${post.slug}`} className="group">
          <h4 className="font-serif text-lg text-neutral-800 group-hover:text-neutral-600">
            {post.title}
          </h4>
          <p className="text-sm text-neutral-600 mt-2">
            {post.excerpt}
          </p>
        </Link>
      </Reveal>
    ))}
  </div>
</section>
```
**Impact:** +3-5% blog traffic, improved SEO crawl

---

### 4️⃣ AggregateRating Schema (30 min)
**File:** `/src/app/[locale]/rooms/page.tsx`
**Issue:** 1046+ reviews ama rating schema yok
**Fix:**
```jsx
// pages/[locale]/rooms/page.tsx sonunda ekle:
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Anitya Cave House",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.86",
      "ratingCount": "1046",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ortahisar",
      "addressCountry": "TR"
    }
  })}
</script>
```
**Impact:** +15-20% SERP CTR (rating stars show in search)

---

## 🟡 WEEK 2-3: HIGH PRIORITY (2-3 gün)

### 5️⃣ FAQ Page Create (2 hours)
**New File:** `/src/app/[locale]/faq/page.tsx`
**Content:** 15-20 Q&A
**Schema:** FAQPage + Question/Answer
**URLs:**
- /tr/faq
- /en/faq
- /zh/faq

**Example Questions:**
1. "Odalar gerçekten bağımsız mı?"
2. "WiFi, mutfak var mı?"
3. "Çocuklar için uygun mu?"
4. "Sıcak hava balonu turuna nasıl katılabilirim?"
5. "Kapadokya'da ne mevsimde gelmeli?"

**Impact:** +10-15% organic (FAQ CTR +0.5-1%)

---

### 6️⃣ Blog Category Archive Pages (1.5 hours)
**New Files:**
- `/src/app/[locale]/blog/kategori/ortahisar/page.tsx`
- `/src/app/[locale]/blog/kategori/rotalar/page.tsx`
- `/src/app/[locale]/blog/kategori/yemek/page.tsx`

**Content:** Category-filtered blog posts + description
**Schema:** CollectionPage

**Impact:** +5-8% discovery traffic

---

### 7️⃣ Experiences/Ortahisar Guide Page (2 hours)
**New File:** `/src/app/[locale]/ortahisar-guide/page.tsx`
**Content:**
- Local attractions (8-10)
- Restaurants (5-7)
- Walking routes (3-5)
- Best time to visit

**Schema:** LocalBusiness + place + geo

**Impact:** +8-12% long-tail organic

---

## 🟢 MONTH 2: MEDIUM PRIORITY (Gelecek)

### 8️⃣ ARIA Attributes (1.5 hours)
```jsx
// Navigation ekle:
<button
  aria-label="Toggle navigation menu"
  aria-expanded={open}
  aria-controls="mobile-menu"
  onClick={() => setOpen(!open)}
>
  {/* hamburger icon */}
</button>

// Links ekle:
<Link
  href="/rooms"
  aria-current={pathname === '/rooms' ? 'page' : undefined}
>
  Rooms
</Link>
```

---

### 9️⃣ Review Showcase Page (1 hour)
**New File:** `/src/app/[locale]/reviews/page.tsx`
**Content:** Top 30 Airbnb reviews showcase
**Schema:** Review + AggregateRating

---

## 📊 IMPLEMENTATION PRIORITY MATRIX

```
Impact vs. Effort Grid:

HIGH IMPACT / LOW EFFORT (DO FIRST):
✅ H1 on homepage (30 min, +5%)
✅ Blog internal links (1 hour, +3-5%)
✅ AggregateRating schema (30 min, +15-20% CTR)

HIGH IMPACT / MEDIUM EFFORT (DO SECOND):
✅ FAQ page (2 hours, +10-15%)
✅ Blog categories (1.5 hours, +5-8%)
✅ Ortahisar guide (2 hours, +8-12%)

MEDIUM IMPACT / LOW EFFORT (DO THIRD):
✅ Semantic H2/H3 (45 min, +3% CTR)
✅ ARIA attributes (1.5 hours, accessibility)
```

---

## ✅ VERIFICATION CHECKLIST

### After Each Change:
- [ ] Run `npm run build` (no errors)
- [ ] Test in mobile (Chrome DevTools)
- [ ] Test with schema validator (schema.org)
- [ ] Check Google PageSpeed Insights
- [ ] Verify links working (404 check)

### After All Changes:
- [ ] Full site build successful
- [ ] Mobile Friendly Test passing
- [ ] Schema Validator: No errors
- [ ] PageSpeed: 90+ (mobile & desktop)
- [ ] Test in Google Search Console (preview)

---

## 🚀 DEPLOYMENT

```bash
# 1. Local test
npm run build
npm run dev

# 2. Deploy to production
git add .
git commit -m "SEO: Add H1, internal links, FAQ, schemas"
git push origin main

# 3. Vercel auto-deploys
# 4. Submit sitemap to Google Search Console
# 5. Monitor in Analytics
```

---

## 📈 EXPECTED RESULTS TIMELINE

| When | What | Expected Lift |
|------|------|---------------|
| **Week 1** | Deploy critical fixes | Pages indexed, schema live |
| **Week 2-3** | FAQ + category pages | Ranking improvements start |
| **Month 1** | All changes live + links built | +15-25% organic traffic |
| **Month 3** | Content authority builds | +50-100% organic |
| **Month 6** | Established authority | +150-200% organic |

---

## 📞 SUPPORT FILES

- 📄 **SEO-CONTENT-ON-PAGE-ANALYSIS.md** → Detailed analysis
- 📄 **SEO-FINAL-REPORT.md** → Technical SEO overview
- 📄 **QUICK-SEO-ACTION-ITEMS.md** → This file

---

**Created:** April 14, 2026
**Status:** Ready to implement
**Estimated Time:** 10-15 hours (2-3 weeks part-time)

