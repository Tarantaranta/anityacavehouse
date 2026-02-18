# Anitya Cave House - 2026 Design Implementation Todo List

**Generated:** 2026-02-16
**Source:** design_new.md (5247 lines)
**Status:** Comprehensive analysis of unimplemented features

---

## 🚨 CRITICAL FIXES (Do These First)

### Immediate Bugs
- [ ] **Remove stray "A" appearing at top of TR page** - Search in app/[lang]/page.tsx, layout.tsx, Header.tsx
- [ ] **Fix "Aynıgüneş" text merging in Hero** - Separate words properly with spaces
- [ ] **Change KITCHEN → MUTFAK labels** in section kickers
- [ ] **Change TERRACE → TERAS labels** in section kickers

---

## 📐 FOUNDATION - Core UI Components

### Base Components (components/ui/)
- [ ] **Container.tsx** - Max-width wrapper with padding standardization
- [ ] **Section.tsx** - Background + spacing + tone system (base/warm)
- [ ] **SectionTitle.tsx** - H2, Lead, Body, ClosingLine components
- [ ] **Reveal.tsx** - Scroll reveal wrapper with blur effect
- [ ] **PrimaryButton.tsx** - Consistent button styling
- [ ] **SecondaryButton.tsx** - Secondary button variant
- [ ] **PageHero.tsx** - Reusable page header (kicker + title + subtitle)

### Advanced UI Components
- [ ] **ImageCard.tsx** - Premium image card with:
  - Multiple aspect ratios (4/5, 16/10, 1/1, 4/3)
  - Editorial variant with hover effects
  - Caption reveal on hover (desktop) / tap (mobile)
  - Shimmer border effect
  - Grain overlay
  - Vignette effect
- [ ] **AsymmetricMediaGrid.tsx** - Two-image editorial layout with reverse option
- [ ] **ScrollCue.tsx** - Animated scroll indicator for hero
- [ ] **DistanceChips.tsx** - Walk/drive time + km chips for location
- [ ] **Magnetic.tsx** - Magnetic button hover effect
- [ ] **Tilt.tsx** - 3D tilt effect for images (desktop only)
- [ ] **Parallax.tsx** - Scroll-linked image drift
- [ ] **BalloonGlow.tsx** - Breathing glow effect for balloon images

---

## 🎨 DESIGN SYSTEM

### Color & Typography Tokens
- [ ] **Update globals.css** with design tokens:
  ```css
  --surface: 250 250 249 (stone-50)
  --surface-2: 245 245 244 (stone-100)
  --ink: 23 23 23 (neutral-900)
  --ink-2: 64 64 64 (neutral-700)
  --line: 214 211 209 (stone-300)
  --accent: 161 128 90 (bronze)
  ```
- [ ] **Update tailwind.config.ts** to use new color tokens
- [ ] **Font system in layout.tsx**:
  - Inter for sans-serif
  - Cormorant Garamond for serif (weights: 300, 400, 500, 600)
- [ ] **Shimmer border CSS** for premium image hover effect

### Motion Standards
- [ ] Scroll reveal: opacity 0→1, y 10→0, duration 0.6s
- [ ] Parallax: max translateY 8-14px
- [ ] Hover zoom: scale 1→1.03
- [ ] Reduced motion: All animations disabled with prefers-reduced-motion

---

## 🏠 HOMEPAGE SECTIONS

### Header & Navigation
- [ ] **Header.tsx** - Premium navigation with:
  - Logo with "A" icon
  - Desktop navigation menu
  - Language switcher (TR/EN/中文)
  - Smart CTA button (transparent on hero, solid on scroll)
  - Mobile drawer menu
  - Scroll-based backdrop blur
- [ ] Add Header to layout.tsx

### Hero Section
- [x] **HeroCinematic.tsx** - ✅ Basic version exists, needs upgrade:
  - [ ] Add crossfade between 3 images (10s interval)
  - [ ] Add hover to pause
  - [ ] Layered parallax (background, content, title)
  - [ ] Cinematic mask (gradient from-black/35 to-black/55)
  - [ ] Stone blur overlay (backdrop-blur-[1.4px])
  - [ ] Fine grain texture
  - [ ] Micro tagline above title
  - [ ] ScrollCue component at bottom
  - [ ] Bottom fade to surface

### TrustBar Section
- [ ] **TrustBar.tsx** - Social proof bar with:
  - "12+ Yıl Superhost • 4.86/5 • 1046+ yorum"
  - Feature chips (Ortak alan yok, Özel teras, etc.)
  - Grid layout with editorial spacing

### SignatureManifesto Section
- [ ] **SignatureManifesto.tsx** - Two-column manifesto:
  - Left: "Kapadokya'da bir oda değil. Taşın içinde, size ait bir ev."
  - Right: Short description + location tagline

### ManifestoBlock Section
- [x] **ManifestoBlock.tsx** - ✅ Basic version exists
  - [ ] Add Reveal animations
  - [ ] Add left border to paragraph

### NotARoomSticky Section
- [x] **NotARoomSticky.tsx** - ✅ Basic version exists
  - [ ] Ensure sticky behavior on desktop
  - [ ] Update image to correct path
  - [ ] Add label line at bottom
  - [ ] Add Reveal animations for text items

### SuitesOverview Section
- [x] **SuitesOverview.tsx** - ✅ Basic version exists, needs:
  - [ ] **RoomCard.tsx** component with ImageCard integration
  - [ ] Asymmetric 7+5 column grid layout
  - [ ] Editorial offset (second column pt-14)
  - [ ] Three suite cards with proper content

### KitchenEditorial Section
- [x] **KitchenEditorial.tsx** - ✅ Exists with AsymmetricMediaGrid
  - [ ] Verify SectionKicker with n={3}
  - [ ] Update captions to poetic versions:
    - "Kendi ritminiz: taşın içinde bir ev"
    - "Sınırsız kahve, sakin sabahlar"
  - [ ] Ensure lg:col-span-7 + lg:col-span-5 layout
  - [ ] Add Reveal animations to text blocks

### TerraceCinematic Section
- [x] **TerraceCinematic.tsx** - ✅ Exists with basic parallax
  - [ ] Update to AsymmetricMediaGrid with reverse={true}
  - [ ] Verify SectionKicker with n={4}
  - [ ] Update captions to poetic versions:
    - "Kasabanın taş dokusu, vadilerin sessizliği"
    - "Gün doğumu: ufukta balonlar, terasta dinginlik"
  - [ ] Add BalloonGlow to balloon image
  - [ ] Ensure parallax on secondary image

### LocationMapSplit Section
- [ ] **LocationMapSplit.tsx** - Interactive location section:
  - [ ] **InteractiveMap.tsx** - Map with glow pin + lens effect
  - [ ] **SpotList.tsx** - Clickable location list with active state
  - [ ] **SpotRow.tsx** - Individual location with chips + "Haritada aç" link
  - [ ] **data/location.ts** - Location data (address, spots, distances)
  - [ ] SectionKicker with n={5}
  - [ ] Active label updates on map when spot clicked
  - [ ] Google Maps direction links
  - [ ] Distance chips (walk/drive time + km)
  - [ ] Editorial copy about Ortahisar location

### BreakfastFreedom Section
- [ ] **BreakfastFreedom.tsx** - Breakfast philosophy section:
  - [ ] SectionKicker with n={6}
  - [ ] AsymmetricMediaGrid for 2 images:
    - Restaurant options nearby
    - Home coffee/slow morning
  - [ ] Editorial copy about freedom of choice
  - [ ] Closing statement about rhythm
  - [ ] Add breakfast images to /images/breakfast/

### ReviewsMinimal Section
- [ ] **ReviewsMinimal.tsx** - Reviews slider:
  - [ ] Large rating display (4.86/5)
  - [ ] Auto-advancing slider (8s interval)
  - [ ] 4+ curated reviews
  - [ ] Pause on hover
  - [ ] Navigation arrows
  - [ ] Dot indicators
  - [ ] Link to Airbnb reviews
  - [ ] Reduced motion support

### FinalCTA Section
- [ ] **FinalCTA.tsx** - Closing statement:
  - [ ] Large closing message
  - [ ] "Kapadokya'yı bir ev gibi yaşamak isteyenler için"
  - [ ] Primary CTA to booking
  - [ ] Reveal animations

### Footer
- [ ] **Footer.tsx** - Premium footer with:
  - [ ] Brand block with logo + description
  - [ ] Link columns (organized)
  - [ ] Contact information
  - [ ] Social media links
  - [ ] "Independent Suite Homes" tagline
  - [ ] Copyright + "Built with Next.js"
  - [ ] Reservation CTA button

---

## 🔀 LAYOUT & RHYTHM

### Section Rhythm Components
- [ ] **SectionRhythm.tsx**:
  - [ ] SectionKicker (label + optional number + title)
  - [ ] SectionDivider (thin horizontal line between sections)
- [ ] **ChapterDivider.tsx** - Editorial chapter markers (n + label + line)
- [ ] Add SectionDivider between all main sections
- [ ] Add chapter numbers to sections (01, 02, 03, etc.)

### Page Structure
- [ ] Update app/[lang]/page.tsx with proper section flow:
  ```
  <HeroCinematic />
  <TrustBar />
  <SignatureManifesto />
  <SectionDivider />
  <NotARoomSticky />
  <SectionDivider />
  <SuitesOverview />
  <SectionDivider />
  <KitchenEditorial />
  <SectionDivider />
  <TerraceCinematic />
  <SectionDivider />
  <LocationMapSplit />
  <SectionDivider />
  <BreakfastFreedom />
  <SectionDivider />
  <ReviewsMinimal />
  <FinalCTA />
  ```

---

## 🎭 PREMIUM INTERACTION LAYER

### Scroll & Progress
- [ ] **ScrollProgress.tsx** - Thin progress bar at top (z-[90])
- [ ] **SmoothScroll.tsx** - Lenis smooth scroll integration:
  - [ ] Install: `npm i lenis`
  - [ ] Configure with proper duration and multipliers
  - [ ] Reduced motion check
- [ ] **SoftSnap.tsx** - Gentle section snapping (not CSS snap)

### Navigation Enhancement
- [ ] **SectionSpy.tsx** - Right-side mini index:
  - [ ] Shows current section (01 Suites, 02 Kitchen, etc.)
  - [ ] Click to navigate
  - [ ] Auto-updates on scroll
  - [ ] Hidden on mobile
  - [ ] Add IDs to all sections
- [ ] **StickyBookingCTA.tsx** - Mobile bottom sticky CTA:
  - [ ] "Rezervasyon Yap" primary button
  - [ ] "Suite'ler" secondary button
  - [ ] Only visible on mobile
  - [ ] Add body padding-bottom on mobile (76px)

### Advanced Interactions
- [ ] **CursorHalo.tsx** - Subtle cursor glow (desktop only)
- [ ] **AmbientToggle.tsx** - Optional ambient sound:
  - [ ] Add /public/audio/ambient.mp3
  - [ ] Toggle button (bottom left)
  - [ ] LocalStorage persistence
  - [ ] Volume 0.12, loop enabled

---

## 🖼️ GALLERY PAGE

### Gallery Components
- [ ] **GalleryStaggerGrid.tsx** - Masonry-style grid:
  - [ ] Deterministic 12-column pattern (no layout shift)
  - [ ] Varying aspect ratios per position
  - [ ] Uses ImageCard with editorial variant
- [ ] **app/[lang]/gallery/page.tsx**:
  - [ ] PageHero with gallery title
  - [ ] GalleryStaggerGrid with curated images
  - [ ] Image data with captions
  - [ ] Add gallery images to /images/gallery/

---

## 🏨 ROOMS PAGE

### Room Components
- [ ] **RoomCard.tsx** - Suite card component:
  - [ ] ImageCard integration
  - [ ] Title + subtitle
  - [ ] 3 bullet points
  - [ ] "View details" link
  - [ ] Hover reveal animations
- [ ] **CompareSuites.tsx** - Comparison table:
  - [ ] SectionKicker with n={3}
  - [ ] Feature comparison grid
  - [ ] All 3 suites (Anitya, Şırahane, Dublex)
  - [ ] Features: Type, Entrance, Terrace, Kitchen, Living+Bedroom, Salon
- [ ] **app/[lang]/rooms/page.tsx**:
  - [ ] PageHero
  - [ ] SuitesOverview with editorial grid
  - [ ] CompareSuites table
  - [ ] Add room images to /images/rooms/

---

## 🌄 EXPERIENCES PAGE

### Experience Components
- [ ] **ExperienceCard.tsx** - Experience card:
  - [ ] ImageCard with editorial variant
  - [ ] Title + subtitle
  - [ ] 3 bullet points
  - [ ] "Explore" link
- [ ] **app/[lang]/experiences/page.tsx**:
  - [ ] PageHero with experiences title
  - [ ] SectionKicker for "Curated Routes"
  - [ ] Asymmetric 7+5 grid layout
  - [ ] Three experiences:
    - Gün Doğumu & Balon
    - Vadiler & Gün Batımı
    - UNESCO Mirası
  - [ ] Add experience images to /images/experiences/

---

## 🌍 INTERNATIONALIZATION

### Translation Files
- [x] **messages/tr-2026.json** - ✅ Basic structure exists
  - [ ] Complete all sections (not just hero)
- [x] **messages/en-2026.json** - ✅ Basic structure exists
  - [ ] Complete all sections
- [x] **messages/zh-2026.json** - ✅ Basic structure exists
  - [ ] Complete all sections
- [ ] **Merge 2026 content** into main tr.json, en.json, zh.json files

### Multilingual Components
- [x] **HeroCinematic2026.tsx** - ✅ Uses useTranslations
- [ ] Update all section components to use useTranslations:
  - [ ] ManifestoBlock
  - [ ] NotARoomSticky
  - [ ] SuitesOverview
  - [ ] KitchenEditorial
  - [ ] TerraceCinematic
  - [ ] LocationMapSplit
  - [ ] BreakfastFreedom
  - [ ] ReviewsMinimal
  - [ ] FinalCTA

---

## 🔧 SEO & METADATA

### Metadata Configuration
- [ ] **app/[lang]/layout.tsx** - Generate metadata per locale:
  - [ ] Dynamic title per language
  - [ ] Dynamic description per language
  - [ ] OpenGraph configuration
  - [ ] Twitter card configuration
  - [ ] Alternate language links (hreflang)
  - [ ] Canonical URLs
- [ ] **public/og.jpg** - OG image (1200×630):
  - [ ] Stone texture background
  - [ ] Minimal logo
  - [ ] "Ortahisar • Independent Suite Homes" text

---

## 📱 RESPONSIVE & MOBILE

### Mobile Optimizations
- [ ] Mobile drawer menu in Header
- [ ] Tap-to-reveal captions on ImageCard (mobile)
- [ ] StickyBookingCTA (mobile only)
- [ ] Hide SectionSpy on mobile
- [ ] Hide AmbientToggle on mobile
- [ ] Hide CursorHalo on mobile
- [ ] Responsive grid layouts (all sections)
- [ ] Mobile-friendly touch interactions

### Body Padding
- [ ] Add mobile body padding-bottom (76px) for sticky CTA

---

## ⚡ PERFORMANCE

### Image Optimization
- [ ] Verify Next.js Image component usage everywhere
- [ ] Add proper `sizes` attribute to all images
- [ ] Priority flag on hero images only
- [ ] Lazy loading on below-fold images
- [ ] AVIF format support in next.config.ts
- [ ] Consider blur placeholders (blurDataURL)

### Loading Strategy
- [ ] Hero images: priority={true}
- [ ] First fold: preload
- [ ] Rest: lazy load
- [ ] Font display: swap

---

## 🎨 VISUAL POLISH

### Premium Effects (Already Implemented)
- [x] CustomCursor with mix-blend-difference - ✅ Exists (bug fixed)

### Effects To Implement
- [ ] Integrate Tilt into ImageCard (editorial variant)
- [ ] Integrate Parallax into ImageCard
- [ ] Shimmer border on hover (CSS + ImageCard)
- [ ] Grain texture on editorial images
- [ ] Cinematic vignettes
- [ ] Magnetic effect on all CTA buttons
- [ ] Scroll-linked parallax on hero background

---

## 📊 DATA & CONTENT

### Data Files
- [ ] **data/location.ts** - Location data:
  - [ ] ANITYA_ADDRESS constant
  - [ ] locationSpotsTR array with all spots
  - [ ] Distance/time data (walk/drive/km)
  - [ ] Google Maps query strings
- [ ] **Review data** for ReviewsMinimal
- [ ] **Room data** for suite cards
- [ ] **Experience data** for experiences page

### Content Completion
- [ ] All section text in TR
- [ ] All section text in EN
- [ ] All section text in ZH
- [ ] Image alt text (all languages)
- [ ] Button text (all languages)
- [ ] Form labels (all languages)

---

## 🖼️ ASSETS NEEDED

### Images
- [ ] Hero images (3 for crossfade): `/images/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- [ ] Kitchen images: `/images/kitchen/main.jpg`, `/images/kitchen/detail.jpg`
- [ ] Terrace images: `/images/terrace/skyline.jpg`, `/images/terrace/balloons.jpg`
- [ ] Breakfast images: `/images/breakfast/1.jpg`, `/images/breakfast/2.jpg`
- [ ] Location map: `/images/location/map-tr.jpg` (also EN, ZH versions)
- [ ] Room images: `/images/rooms/anitya.jpg`, `sirahane.jpg`, `dublex.jpg`
- [ ] Experience images: `/images/experiences/balloon.jpg`, `valley.jpg`, `goreme.jpg`
- [ ] Gallery images: `/images/gallery/1.jpg` through `/images/gallery/N.jpg`
- [ ] OG image: `/public/og.jpg`

### Audio
- [ ] Ambient sound: `/public/audio/ambient.mp3` (royalty-free, minimal)

---

## 🔄 MIGRATION & REFACTORING

### Component Refactoring
- [ ] Replace all instances of:
  - `bg-stone-50` → `bg-surface`
  - `bg-stone-100` → `bg-surface-2`
  - `text-neutral-900` → `text-ink`
  - `text-neutral-700` → `text-ink-2`
  - `border-stone-300` → `border-line`
- [ ] Ensure all sections use new Section component
- [ ] Ensure all titles use SectionTitle components
- [ ] Ensure all images use ImageCard component

### Code Cleanup
- [ ] Remove old HeroCinematicTR (if separate from HeroCinematic2026)
- [ ] Remove old AsymmetricMediaGrid (if using items array instead of primary/secondary)
- [ ] Remove unused image paths
- [ ] Clean up commented code
- [ ] Verify all imports

---

## 🧪 TESTING & QA

### Functionality Tests
- [ ] Smooth scroll works on all browsers
- [ ] Image lazy loading works correctly
- [ ] Section spy updates correctly
- [ ] Reviews slider auto-advances and pauses
- [ ] Location map interaction works
- [ ] Mobile menu opens/closes correctly
- [ ] Language switcher works
- [ ] All internal links work
- [ ] All external links open in new tab

### Responsive Tests
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Laptop (1024px)
- [ ] Desktop (1440px)
- [ ] Large Desktop (1920px+)

### Accessibility Tests
- [ ] prefers-reduced-motion respected everywhere
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] ARIA labels on interactive elements
- [ ] Color contrast passes WCAG AA

### Browser Tests
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## 🚀 DEPLOYMENT PREP

### Configuration
- [ ] Environment variables set
- [ ] next.config.ts optimized for production
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Redirects configured (if needed)
- [ ] 404 page styled

### Optimization
- [ ] Bundle size analysis
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals optimized
- [ ] Image optimization verified
- [ ] Font optimization verified

---

## 📝 DOCUMENTATION

### Code Documentation
- [ ] Component prop types documented
- [ ] Complex functions commented
- [ ] README.md updated with:
  - Setup instructions
  - Development commands
  - Deployment instructions
  - Design system overview
  - Component library

### Content Documentation
- [ ] Content editing guide
- [ ] Image upload guide
- [ ] Translation guide

---

## ✨ FINAL POLISH

### "2026 Award Level" Checklist
- [ ] All sections have editorial rhythm
- [ ] Scroll feels cinematic (Lenis + parallax + snap)
- [ ] Images have depth (tilt + parallax + hover)
- [ ] Typography is consistent (serif headings, sans body)
- [ ] Colors use design tokens consistently
- [ ] Motion is subtle and purposeful
- [ ] Mobile experience is polished
- [ ] Loading is fast (<2s FCP)
- [ ] No layout shift (CLS = 0)
- [ ] Animations respect reduced-motion
- [ ] Every detail feels intentional

### Pre-Launch Checklist
- [ ] All critical bugs fixed
- [ ] All sections have content
- [ ] All images are optimized
- [ ] All links work
- [ ] All forms work (if any)
- [ ] Analytics configured
- [ ] SEO metadata complete
- [ ] Social sharing works
- [ ] Legal pages complete (privacy, terms)
- [ ] Contact information accurate
- [ ] Booking flow tested

---

## 📊 ESTIMATED EFFORT

**Total Items:** ~200+ tasks
**Effort Breakdown:**
- Foundation (UI Components): 20-30 hours
- Homepage Sections: 30-40 hours
- Other Pages: 15-20 hours
- Premium Interactions: 10-15 hours
- Polish & Testing: 15-20 hours
- **Total: 90-125 hours**

---

## 🎯 PRIORITY ORDER

### Phase 1: Foundation (Week 1)
1. Fix critical bugs (A, text merging, labels)
2. Create base UI components (Container, Section, Reveal)
3. Set up design tokens and global styles
4. Create Header and Footer

### Phase 2: Core Sections (Week 2-3)
1. Upgrade Hero with crossfade
2. Complete all homepage sections
3. Implement SectionRhythm system
4. Add ScrollProgress and smooth scroll

### Phase 3: Premium Features (Week 4)
1. Add Magnetic buttons
2. Implement Tilt and Parallax
3. Add SectionSpy
4. Create Reviews slider
5. Build interactive Location map

### Phase 4: Pages & Content (Week 5)
1. Build Rooms page
2. Build Gallery page
3. Build Experiences page
4. Complete all translations

### Phase 5: Polish & Launch (Week 6)
1. Add all premium interactions
2. Optimize performance
3. Complete testing
4. Final QA and deployment

---

**Last Updated:** 2026-02-16
**Document Version:** 1.0
**Next Review:** After Phase 1 completion
