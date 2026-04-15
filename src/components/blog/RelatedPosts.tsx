import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

interface RelatedPostsProps {
  currentSlug: string;
  locale: string;
}

// Blog posts database - buraya tüm blog yazıları eklenecek
const BLOG_POSTS: Record<string, BlogPost> = {
  'ortahisar-da-sabah-tas-ve-isik': {
    slug: 'ortahisar-da-sabah-tas-ve-isik',
    title: 'Ortahisar\'da Sabah: Taş ve Işık',
    excerpt: 'Sabahın ilk ışıklarıyla Ortahisar\'ın taş dokusunu keşfedin.',
    image: '/images/blog/ortahisar-morning.jpg',
  },
  'guvercin-vadisi-gun-batimi-yuruyus-rehberi': {
    slug: 'guvercin-vadisi-gun-batimi-yuruyus-rehberi',
    title: 'Güvercinlik Vadisi Gün Batımı Yürüyüş Rehberi',
    excerpt: 'Kapadokya\'nın en büyüleyici vadisinde gün batımı deneyimi.',
    image: '/images/blog/pigeon-valley.jpg',
  },
  'kapadokya-mutfagi-testi-kebabindan-pottery-sofralar': {
    slug: 'kapadokya-mutfagi-testi-kebabindan-pottery-sofralar',
    title: 'Kapadokya Mutfağı: Testi Kebabından Pottery Sofralara',
    excerpt: 'Bölgenin zengin mutfak kültürünü keşfedin.',
    image: '/images/blog/cappadocia-cuisine.jpg',
  },
  'tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras': {
    slug: 'tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras',
    title: 'Tüf Taşının Hikayesi: Milyonlarca Yıllık Bir Miras',
    excerpt: 'Kapadokya\'yı oluşturan jeolojik süreçlerin hikayesi.',
    image: '/images/blog/tufa-stone.jpg',
  },
  'kapadokyada-sicak-hava-balonu-pratik-her-sey': {
    slug: 'kapadokyada-sicak-hava-balonu-pratik-her-sey',
    title: 'Kapadokya\'da Sıcak Hava Balonu: Pratik Her Şey',
    excerpt: 'Balon turu için bilmeniz gereken her şey.',
    image: '/images/blog/hot-air-balloon.jpg',
  },
  'teras-sabahlari-balonlar-ve-sessizlik': {
    slug: 'teras-sabahlari-balonlar-ve-sessizlik',
    title: 'Teras Sabahları: Balonlar ve Sessizlik',
    excerpt: 'Anitya Cave House teraslarından balon manzarası.',
    image: '/images/blog/terrace-morning.jpg',
  },
};

export default function RelatedPosts({ currentSlug, locale }: RelatedPostsProps) {
  const t = useTranslations('blog');

  // Get all posts except current
  const allPosts = Object.values(BLOG_POSTS).filter(post => post.slug !== currentSlug);

  // Randomly select 3 related posts
  const relatedPosts = allPosts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-line">
      <h2 className="text-2xl md:text-3xl font-serif text-ink mb-8">
        {t('relatedPosts') || 'İlgili Yazılar'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-lg border border-line overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-stone-200 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-medium text-ink mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
