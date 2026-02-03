# Anitya Cave House - Eski Website Dosyaları

Bu klasör, Anitya Cave House otelinin eski WordPress sitesinden çıkarılmış tüm içerikleri içermektedir. Next.js projesi için referans olarak kullanılabilir.

## Site Bilgileri

- **Site Adı:** Anitya CaveHouse
- **URL:** https://www.anityacavehouse.com
- **Admin Email:** info@anityacavehouse.com
- **Eski Platform:** WordPress
- **Kullanılan Tema:** Soho Hotel (v3.2.2 by quitenicestuff)
- **Tema Özellikleri:** Otel ve konaklama sağlayıcıları için premium tema

## Klasör Yapısı

```
anitya_old_website_files/
├── README.md                 # Bu dosya
├── images/
│   ├── logo/                 # Logo dosyaları (26 adet)
│   ├── rooms/                # Oda fotoğrafları (21 adet)
│   ├── slider/               # Ana sayfa slider resimleri (73 adet)
│   │   └── revslider/        # Revolution Slider içerikleri
│   ├── gallery/              # Genel galeri resimleri (109 adet)
│   └── other/                # Diğer resimler
├── content/                  # Sayfa içerikleri (varsa)
├── theme/                    # Tema dosyaları
│   ├── style.css            # Ana stil dosyası
│   └── screenshot.png       # Tema önizleme
└── data/                    # Veri dosyaları
    ├── anityaca_wp142.sql   # WordPress veritabanı yedeği (4.7 MB)
    ├── site_data.json       # Çıkarılmış site bilgileri
    └── images.json          # Resim dosyaları listesi
```

## Resim Dosyaları

### Logo Dosyaları (`images/logo/`)
- anityalogo*.png/jpg - Farklı boyut ve varyasyonlarda logo dosyaları
- Kullanım: Header, footer, favicon için

### Oda Fotoğrafları (`images/rooms/`)
- `cavesuit1.jpg`, `cavesuit2.jpg` - Cave Suite odası
- `DSC_*.jpg` - Profesyonel çekimler
- `cave.jpg` - Mağara oda görünümü

### Slider Resimleri (`images/slider/revslider/`)
- Ana sayfa slider için yüksek çözünürlüklü görseller
- Orijinal dosyalar: 01.jpg, 09.jpg, 11.jpg vb.

### Galeri (`images/gallery/`)
- Genel otel ve çevre fotoğrafları
- Kapadokya manzaraları

## Eski Site Özellikleri (Referans)

### WordPress Pluginleri
1. **Soho Hotel Booking** - Rezervasyon sistemi
2. **Revolution Slider** - Ana sayfa slider
3. **WPBakery Page Builder (JS Composer)** - Sayfa düzenleyici
4. **Contact Form 7** - İletişim formu
5. **Newsletter** - E-posta bülteni

### Tema Bileşenleri
- 6 farklı header tasarımı
- Dinamik footer widget alanları
- Responsive tasarım
- Özel oda/konaklama post tipi
- Misafir sınıfı (guest class) post tipi
- Testimonials (müşteri yorumları)

## Next.js Projesi İçin Öneriler

### Gerekli Sayfalar
1. Ana Sayfa (Hero slider, özellikler, odalar özeti)
2. Odalar/Konaklama sayfası
3. Galeri
4. Hakkımızda
5. İletişim
6. Rezervasyon

### Gerekli Bileşenler
- Header (logo, navigasyon, dil seçimi)
- Footer (iletişim bilgileri, sosyal medya, copyright)
- Room Card (oda önizleme kartı)
- Image Gallery/Lightbox
- Booking Form
- Contact Form
- Testimonial Slider

### Önerilen Teknolojiler
- **Styling:** Tailwind CSS
- **Animasyonlar:** Framer Motion
- **Galeri:** React Photo Album / Lightgallery
- **Slider:** Swiper.js veya Embla Carousel
- **Form:** React Hook Form
- **CMS:** Sanity, Strapi veya Contentful (opsiyonel)

## Veritabanı Yedeği

`data/anityaca_wp142.sql` dosyası tam WordPress veritabanı yedeğini içerir (4.7 MB). Bu dosyada:
- Tüm sayfa ve yazı içerikleri (`wp_posts` tablosu)
- Site ayarları (`wp_options` tablosu)
- Oda bilgileri (`shb_accommodation` post tipi)
- Tema ayarları (`sohohotel_data` option)
- Eski rezervasyon kayıtları (`wp_booking` tablosu)

**SQL dosyasından veri çıkarmak için:** Dosyayı MySQL'e import edebilir veya metin editörüyle inceleyebilirsiniz.

## Notlar

- **Rezervasyon Sistemi:** Eski site Soho Hotel Booking kullanıyordu. Yeni site için farklı bir çözüm (ör: Booking.com widget, özel API) gerekebilir.
- **İletişim Bilgileri:** `info@anityacavehouse.com` (SQL dosyasından)

## Orijinal Dosya Konumu

Tüm WordPress dosyaları hala `../website/` klasöründe mevcut. Gerekirse oradan ek dosyalar çıkarılabilir.

---

*Bu dosya Anitya Cave House web sitesi yenileme projesi için hazırlanmıştır.*
