import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export default function GalleryPage() {
  // Gallery categories
  const categories = [
    { id: 'all', label: 'Tümü', count: 24 },
    { id: 'rooms', label: 'Odalar', count: 12 },
    { id: 'views', label: 'Manzaralar', count: 8 },
    { id: 'facilities', label: 'Genel Alanlar', count: 4 },
  ];

  // Placeholder images - will be replaced with real images
  const placeholderImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    category: i < 6 ? 'rooms' : i < 10 ? 'views' : 'facilities',
    icon: i < 6 ? '🛏️' : i < 10 ? '🎈' : '☕',
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-amber-700 mb-4">
              Fotoğraf Galerisi
            </Badge>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              Galeri
            </h1>
            <p className="text-lg text-stone-700">
              Anitya Cave House'un büyüleyici atmosferini, eşsiz odalarını ve
              Kapadokya'nın muhteşem manzaralarını keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="data-[state=active]:bg-amber-700">
                {cat.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {cat.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderImages.map((img) => (
                <Card
                  key={img.id}
                  className="aspect-square bg-stone-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all group border-amber-100 hover:border-amber-300"
                >
                  <div className="h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                    {img.icon}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderImages
                .filter((img) => img.category === 'rooms')
                .map((img) => (
                  <Card
                    key={img.id}
                    className="aspect-square bg-stone-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all group border-amber-100 hover:border-amber-300"
                  >
                    <div className="h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {img.icon}
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="views" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderImages
                .filter((img) => img.category === 'views')
                .map((img) => (
                  <Card
                    key={img.id}
                    className="aspect-square bg-stone-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all group border-amber-100 hover:border-amber-300"
                  >
                    <div className="h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {img.icon}
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderImages
                .filter((img) => img.category === 'facilities')
                .map((img) => (
                  <Card
                    key={img.id}
                    className="aspect-square bg-stone-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all group border-amber-100 hover:border-amber-300"
                  >
                    <div className="h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {img.icon}
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-playfair font-bold text-amber-900 mb-3">
            Daha Fazla Fotoğraf İçin
          </h3>
          <p className="text-stone-700 mb-6">
            Instagram sayfamızdan güncel fotoğraflarımızı ve misafirlerimizin paylaşımlarını görüntüleyebilirsiniz.
          </p>
          <a
            href="https://instagram.com/anityacavehouse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram'da Takip Edin
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
