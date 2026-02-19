"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";

// ─── Types ───────────────────────────────────────────────────────────────────

type CategoryKey =
  | "all"
  | "adventure"
  | "gastronomy"
  | "history"
  | "art"
  | "nature"
  | "special"
  | "wellness";

interface Experience {
  id: number;
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  duration: string;
  description: string;
  longDescription?: string;
  imageSrc: string;
  highlights: string[];
}

// ─── Labels ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, Record<CategoryKey, string>> = {
  tr: {
    all: "Tümü",
    adventure: "Macera",
    gastronomy: "Gastronomi",
    history: "Tarih",
    art: "Sanat",
    nature: "Doğa",
    special: "Özel",
    wellness: "Wellness",
  },
  en: {
    all: "All",
    adventure: "Adventure",
    gastronomy: "Gastronomy",
    history: "History",
    art: "Art",
    nature: "Nature",
    special: "Special",
    wellness: "Wellness",
  },
  zh: {
    all: "全部",
    adventure: "探险",
    gastronomy: "美食",
    history: "历史",
    art: "艺术",
    nature: "自然",
    special: "定制",
    wellness: "健康",
  },
};

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "adventure",
  "gastronomy",
  "history",
  "art",
  "nature",
  "special",
  "wellness",
];

const GRID_TITLE: Record<string, string> = {
  tr: "Popüler Deneyimler",
  en: "Popular Experiences",
  zh: "热门体验",
};

const CTA_LABEL: Record<string, string> = {
  tr: "Detayları sor →",
  en: "Ask for details →",
  zh: "询问详情 →",
};

const MODAL_CLOSE: Record<string, string> = {
  tr: "Kapat",
  en: "Close",
  zh: "关闭",
};

const MODAL_CONTACT: Record<string, string> = {
  tr: "WhatsApp ile bilgi al",
  en: "Get info on WhatsApp",
  zh: "通过WhatsApp咨询",
};

const MODAL_NAV: Record<string, { prev: string; next: string }> = {
  tr: { prev: "Önceki", next: "Sonraki" },
  en: { prev: "Previous", next: "Next" },
  zh: { prev: "上一个", next: "下一个" },
};

// ─── Experiences data ─────────────────────────────────────────────────────────

const EXPERIENCES: Record<string, Experience[]> = {
  tr: [
    {
      id: 1,
      title: "Sıcak Hava Balonu Turu",
      categoryKey: "adventure",
      duration: "3–4 saat",
      description:
        "Kapadokya'nın eşsiz peribacalarının üzerinde gün doğumuyla birlikte süzülün. Bölgenin kadim dokusunu hiç olmadığı kadar yakından hissedin.",
      longDescription:
        "Gökyüzünde Gerçeküstü Bir Rüya\n\nKapadokya'da sabah, güneşten önce uyanır. Siz özel aracınızla otelinizden alınıp kalkış alanına doğru yola çıkarken, vadilerin o derin ve mistik sessizliğine sadece balonların ateşleme sesleri eşlik eder.\n\nMilyonlarca yıllık jeolojik bir mirasın, volkanik tüflerin ve rüzgârın bir heykeltıraş gibi işlediği eşsiz peribacalarının üzerinde, gün doğumuyla birlikte usulca süzülmeye hazır mısınız?\n\nBu sıradan bir uçuş değil; Kapadokya'nın kadim dokusunu, vadilerin kıvrımlarını ve Erciyes Dağı'nın heybetini hiç olmadığı kadar yakından ve gökyüzünün en ayrıcalıklı locasından hissetme anıdır. Sepetin yeryüzüyle bağı kesildiği an, zaman adeta durur. Altınızda kızıla, sarıya ve pembeye boyanan vadiler uyanırken, siz usta pilotlarımızın kusursuz rotasında rüzgârla adeta dans edeceksiniz. Hayatınız boyunca unutamayacağınız, her bir karesi tablo güzelliğinde olan bu eşsiz görsel şölene en ön sıradan şahitlik edin.\n\nYere indiğinizde ise şampanya kadehleriyle taçlandırılmış bir kutlama sizi bekliyor olacak. Kendinize bu ayrıcalığı hediye edin ve bulutların üzerindeki yerinizi ayırtın.\n\nFiyat ve rezervasyon bilgisi için WhatsApp ya da telefonla ulaşın.",
      imageSrc: "/images/activities/balloon.avif",
      highlights: ["Gün doğumu", "Kuş bakışı manzara"],
    },
    {
      id: 2,
      title: "Kapadokya Şarap Tadımı",
      categoryKey: "gastronomy",
      duration: "2–3 saat",
      description:
        "Bölgenin volkanik toprağında yetişen üzümlerden damıtılan şarapları tarihi bir mahzende keşfedin. Yerel üretici hikâyeleriyle süslü bir tadım deneyimi.",
      longDescription:
        "Kadehte Saklı Kadim Miras\n\nKapadokya'nın kalbinde, milyonlarca yıl önce yanardağların püskürttüğü lavlarla zenginleşen volkanik topraklarda yetişen üzümlerin büyüleyici yolculuğuna davetlisiniz. Hititlerden ve Asur Ticaret Kolonileri'nden bugüne, M.Ö. 3000'li yıllara kadar uzanan binlerce yıllık köklü bir bağcılık ve şarapçılık geleneğini barındıran bu mistik coğrafyada, sıradan bir tadım değil; adeta zamanda bir yolculuk yaşayacaksınız.\n\nTaşın doğal serinliğini ve hafızasını koruyan tarihi mağara mahzenlerimizde özgün bir atmosfer sunuyoruz. Kapadokya'nın mineral bakımından zengin toprağından beslenen Emir ve Dimrit gibi yerel üzümlerin yanı sıra, Öküzgözü ve Kalecik Karası gibi nadide türlerden özenle üretilmiş butik şarapları kadehinizde keşfedeceksiniz.\n\nBu tadım sırasında, yalnızca şarabın zengin aromasını hissetmekle kalmayacak; her bir yudumda şarabı bir sanata dönüştüren yerel üreticilerin tutku dolu hikâyelerini ve toprağın gizemini uzmanlarımızdan dinleyeceksiniz. Yöresel peynirler, kuru meyveler ve özel atıştırmalıklarla eşleştirilmiş bu tadım deneyimi, Kapadokya tatilinizin en sofistike anılarından biri olacak.\n\nFiyat ve rezervasyon bilgisi için WhatsApp ya da telefonla ulaşın.",
      imageSrc: "/images/activities/sarap-tadim.avif",
      highlights: ["Yerel mahzen", "Volkanik toprak bağları"],
    },
    {
      id: 3,
      title: "Yeraltı Şehri Turu",
      categoryKey: "history",
      duration: "2–3 saat",
      description:
        "Derinkuyu ve Kaymaklı'nın katmanlı derinliklerine inin. Binlerce yıl önce oyulmuş bu gizemli dünya, sizi zamanın dışına taşır.",
      longDescription:
        "Zamanın Altında\n\nMilyonlarca yıl önce püsküren yanardağların bıraktığı yumuşak volkanik tüf, burada hem bir malzeme hem de bir sığınak oldu. Kapadokya'nın yeraltı şehirleri, yüzyıllar boyunca insan zekâsının ve hayatta kalma içgüdüsünün en çarpıcı kanıtı olarak derinlere oyuldu. Derinkuyu, sekiz kata ulaşan derinliğiyle on binlerce insanı aylarca barındırabilecek büyüklükte bir yeraltı kentidir.\n\nBu turu bir müze ziyareti olarak düşünmeyin. Dar koridorlardan geçerken, büyük taş kapıların içeriden kapandığını hayal edin. Havalandırma kuyularının taze havayı en derine taşıdığını fark edin. Yüzlerce metre aşağıda mutfakların, şırahanelerin, kiliselerin ve okulların varlığını hissedin. Uzman rehberimiz, bu dünyanın yalnızca taşını değil, ruhunu da size anlatacak.\n\nKaymaklı ve Derinkuyu, birbirinden bağımsız iki şehir gibi görünse de her ikisi de aynı kadim geleneğin ürünüdür: toprağın içine çekilmek, saklanmak, yaşamaya devam etmek.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/yeralti-sehri.avif",
      highlights: ["Rehberli keşif", "8 kat derinlik"],
    },
    {
      id: 4,
      title: "Fotoğraf Safari",
      categoryKey: "art",
      duration: "4–5 saat",
      description:
        "Kapadokya'nın en fotojenik vadilerinde, altın ışık ve uzun gölgelerle dolu saatlerde rehberli bir görsel yolculuğa çıkın.",
      longDescription:
        "Işığı Takip Et\n\nKapadokya'da ışık, bir manzara değil; bir malzemedir. Sabahın erken saatlerinde ya da gün batımına yakın, vadilerin üzerinde uzanan altın sarısı ışık peribacalarına derinlik verir, kayaları neredeyse canlı kılar. Bu anlar kısa sürer ve nerede duracağınızı bilmezseniz çoğu kez kaçırılır.\n\nFotoğraf safarimiz, Kapadokya'nın en az bilinen ama en fotojenik noktalarına yönelik özel bir keşiftir. Rehberimiz, yılların deneyimiyle şekillenmiş rotalar üzerinde sizi yönlendirirken; ışığın nasıl değiştiğini, gölgelerin nereden uzadığını ve hangi açıların sadece anın içinde yaşadığını öğretecek.\n\nDSLR ya da akıllı telefon — doğru zamanda, doğru noktada olmanız yeterli. Geri kalan her şeyi bu toprak size sunacak.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/foto-safari.avif",
      highlights: ["Altın saat ışığı", "Gizli rotalar"],
    },
    {
      id: 5,
      title: "Vadi Yürüyüşleri",
      categoryKey: "nature",
      duration: "3–4 saat",
      description:
        "Güvercinlik, Aşk ve İhlara vadilerinde sessizce yürüyün. Her vadinin kendi rengi, kokusu ve sesi var. Rehbersiz imkânsız anlatılan sırları öğrenin.",
      longDescription:
        "Vadiyi Dinlemek\n\nGüvercinlik Vadisi'nin kremsi beyaz kayaları güneşte parlar; binlerce yıl önce oyulmuş güvercin yuvalarıyla işlenmiş bu kaya cepheleri, Kapadokya'nın ilk sakinlerinin doğayla kurduğu diyalogdur. Aşk Vadisi'nde yürüdüğünüzde, peribacalarının tanınan siluetleri arasında aslında bir tarihin de içinden geçersiniz. İhlara ise farklıdır: kuru bir plato ortasında derin bir kanyonun içinden geçen diri bir nehir, yanı başında yüzyıllar boyu sürüp gelen bir yaşam.\n\nBu vadileri bir günde tamamlamak mümkün değil. Her biri kendi ritmine sahip, her biri ayrı bir anlatı. Rehberimiz, bu anlatıları size aktarırken yalnızca tarih değil, toprağın kendisi de konuşur.\n\nYürüyüş sezonuna, gruba ve beklentilerinize göre özel rota seçenekleri sunuyoruz. Nefesinizi zorlamayacak bir tempoda, manzarayı doya doya yaşayacaksınız.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/vadi-yuruyusu.avif",
      highlights: ["Rehberli yürüyüş", "3 farklı vadi"],
    },
    {
      id: 6,
      title: "ATV Safari",
      categoryKey: "adventure",
      duration: "2 saat",
      description:
        "Peribacaları arasında patikaları izleyerek gün batımına doğru tırmanın. Hız değil; özgürlük hissi ön planda.",
      longDescription:
        "Toprağa Yakın\n\nKapadokya'nın açık hava müzesi, yürüyerek ve bazen de atın sırtında keşfedilir. Ama bazı rotalar, ancak dört tekerlekle ulaşılabilecek noktalara götürür: peribacaları arasındaki kayalık geçitler, platoların ucundaki manzara noktaları, tur otobüslerinin hiç uğramadığı vadiler.\n\nATV safarimiz hız için değil; o özgürlük duygusu için tasarlandı. Uzman rehberimiz eşliğinde, gökyüzü kızarırken Kapadokya'nın çorak güzelliğinin içinde ilerleyeceksiniz. Her dönemeç, yeni bir çerçeve sunar.\n\nDeneyim gerektirmez, temel bir brifing yeterlidir. Araçlar düzenli olarak bakım görür; güvenlik ekipmanları dahildir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/atv-turu.avif",
      highlights: ["Off-road patikalar", "Gün batımı"],
    },
    {
      id: 7,
      title: "Geleneksel Türk Mutfağı",
      categoryKey: "gastronomy",
      duration: "3–4 saat",
      description:
        "Yerel bir mutfakta taze malzemelerle geleneksel yemekler pişirin. Tarif değil; el hafızası ve aile sırrı öğreneceksiniz.",
      longDescription:
        "Elin Hafızası\n\nKapadokya'nın sofra kültürü, bir restoranın menüsünde değil; anne ellerinde ve büyük annenin ocağında saklıdır. Bu mutfak deneyimi, bir yemek kitabının tarifi değil — nesilden nesile taşınan el hafızasıdır. Hamurun ne zaman doğru kıvama geldiğini elle hissedecek, baharatın ne zaman yeterli olduğunu burnunuzla anlayacaksınız.\n\nYerel ev sahibimizin mutfağında, Kapadokya'nın mevsimsel malzemeleriyle menüyü birlikte belirleyip pişiriyor, ardından sofrada birlikte yiyor ve sohbet ediyoruz. Çayın demlendiği, hamurun açıldığı, baharatın öğütüldüğü o sıcak mutfak atmosferi; tatilde en çok özlenecek anlardan biri olacak.\n\nÇocuklu aileler, çiftler ve küçük gruplar için uygundur.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/geleneksek-turk-mutfagi.avif",
      highlights: ["Ev mutfağı", "Yöresel tarifler"],
    },
    {
      id: 8,
      title: "Bisiklet Turları",
      categoryKey: "nature",
      duration: "3–4 saat",
      description:
        "Kapadokya'nın sakin köy yollarında ve vadileri boyunca uzanan patikalarda bisikletle ilerleyin. Tempo kendinize ait.",
      longDescription:
        "Kendi Temponda\n\nKapadokya'yı yavaş görmek istiyorsanız, en iyi yol bisiklettir. Motorun gürültüsü olmadan, yalnızca tekerleğin toprakla konuştuğu o sessiz ilerlemeyle; köylerin arasından, bağların kenarından, vadiyi kesen patikalardan süzülürsünüz.\n\nRotalar hem yeni başlayanlara hem de deneyimli bisikletçilere uyacak şekilde planlanabilir. Düz köy yolları, orta zorlukta vadi geçitleri ya da daha zorlu platolar — seçim sizin. Güzergah üzerinde durulacak noktalar ve yerel detaylar konusunda rehberimiz sizi yönlendirirken; pedallama kararı tamamen size aittir.\n\nBisikletler iyi bakımlı ve konforlu; kask ve temel güvenlik ekipmanları dahildir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/bisiklet-turu.avif",
      highlights: ["Kendi temponda", "Köy rotaları"],
    },
    {
      id: 9,
      title: "Sema Töreni",
      categoryKey: "art",
      duration: "1 saat",
      description:
        "Sema, Mevlevi geleneğinin yaşayan bir duasıdır. Dönen beyaz etekler ve ney nefesi arasında, zamanın durduğu bir ana tanıklık edersiniz.",
      longDescription:
        "Sonsuzluğa Dönmek\n\nSema, bir gösteri değildir. Mevlevi geleneğinde bu ritüel, bir insanın Tanrı'ya yönelişini, benliğini aşma çabasını ve evrenle bütünleşme arzusunu simgeler. Beyaz tennureler dönerken, ney'in o derin nefesi mekânı doldururken; yalnızca bir dans değil, bir dua seyrediyorsunuzdur.\n\nKapadokya, bu geleneğin yaşayan bir parçasıdır. Ortaçağ'dan bu yana Anadolu'nun manevi coğrafyasında kök salmış Mevlevilik burada da yaşatılmaktadır. Gerçek bir törene tanıklık etmek — kuralları, ritmi ve derin sessizlikleriyle — seyahatin en sarsıcı anlarından biri olabilir.\n\nTören öncesinde kısa bir bilgilendirme yapılır: Sema'nın anlamı, ayakların ve ellerin dili, müziğin katmanları açıklanır. Bu ön bilgi olmadan izlemek ile anlayarak izlemek arasındaki fark derindir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/whirling-dervishes.avif",
      highlights: ["Mevlevi geleneği", "Canlı müzik"],
    },
    {
      id: 10,
      title: "Türk Gecesi",
      categoryKey: "art",
      duration: "3 saat",
      description:
        "Yerel müzisyenler ve renkli halk dansları eşliğinde bir Anadolu gecesine adım atın. Sofra, müzik ve dans — üçü bir arada.",
      longDescription:
        "Anadolu'nun Gecesi\n\nBir Anadolu gecesi, yalnızca müzik ve yemekten ibaret değildir. Davulun ritmi, bağlamanın teli, zeybek dansçısının adımları — bunların hepsinin arka planında, nesiller boyu akan bir kültürün nabzı vardır. Türk Gecesi, bu nabzı doğrudan hissedebileceğiniz bir ortamda sunuyor.\n\nCanlı müzisyenler ve dans gruplarıyla dolu bu gece boyunca, Anadolu'nun farklı bölgelerinden yansımalar göreceksiniz: Karadenizli bir horon'dan Ege'nin zeybek ritmine, doğunun halay zincirinden Orta Anadolu'nun çöğür sesine. Sofrada yöresel mezeler, ana yemekler ve tatlılar sıralanırken, gece kendiliğinden akar.\n\nBu deneyim, Türk kültürüyle olan en canlı ve sıcak karşılaşmalardan biridir — seyircisi değil, bir parçası olduğunuzu hissedersiniz.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/turkish-night.avif",
      highlights: ["Halk dansları", "Yerel lezzetler"],
    },
    {
      id: 11,
      title: "Kızıl Tur (Kuzey Kapadokya)",
      categoryKey: "history",
      duration: "6–7 saat",
      description:
        "Kuzey Kapadokya'nın ikonik noktalarını tek bir günde keşfedin: Göreme Açık Hava Müzesi, Paşabağ, Devrent Vadisi ve Avanos. Bölgenin taş belleği, adım adım açılır.",
      longDescription:
        "Kuzey'in Tarihi\n\nKızıl Tur, Kapadokya'ya ilk kez gelenler için adeta bir pusula niteliğindedir. Bölgenin en tanınan mekânları — Göreme Açık Hava Müzesi, Paşabağ'ın mantar peribacaları, at siluetleriyle ün kazanmış Devrent Vadisi ve çömlek geleneğiyle Avanos — tek bir günde, birbirini tamamlayan bir anlatı içinde sunulur.\n\nGöreme Açık Hava Müzesi, Hristiyanlığın Kapadokya'da bıraktığı görsel mirasın en yoğun toplandığı yerdir. Bizans fresklerinin korunduğu onlarca kaya kilisesi, 10. ve 13. yüzyıllar arasında bu vadide yaşayan bir toplumun ruhunu aktarır. Paşabağ ise peribacalarının en dramatik formlarını bir arada sunar — bazıları üç başlıdır, bazıları içi oyulmuş yaşam alanlarına dönüştürülmüştür.\n\nÖğleden sonra Avanos'ta seramik ustasının çarkında şekillenen kil, bu günün son öğretisidir: bu toprak, bugün de yaratmaya devam ediyor.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/red-tour.avif",
      highlights: ["Göreme Müzesi", "Peribacaları"],
    },
    {
      id: 12,
      title: "Yeşil Tur (Güney Kapadokya)",
      categoryKey: "nature",
      duration: "6–8 saat",
      description:
        "Derinkuyu Yeraltı Şehri, Ihlara Vadisi ve Selime Katedrali'nin sessizliğine dalın. Güney Kapadokya'nın en derin tabakalarını keşfetmek için bir gün yeterli değil — ama başlamak için ideal.",
      longDescription:
        "Güney'in Derinliği\n\nKapadokya'nın güney bölgesi, kuzeye kıyasla daha sessiz ve daha az tanınandır. Ama bu sessizlik, boşluktan değil; derinlikten kaynaklanır. Yeşil Tur, bu derinliği üç farklı katmanda sunar.\n\nDerinkuyu Yeraltı Şehri'nde yerin sekiz kat altına inerken, ne kadar derinlerde olduğunuzu bir an unutursunuz — çünkü hayat orada da tam kurulmuş. Ihlara Vadisi'nde ise tersine, gökyüzü kaybolmaz; ama çevrenizi derin kanyon duvarları sarar. İçinde bir nehir, iki yanında düzinelerce kaya kilisesi, üstünde sonsuz bir Kapadokya semâsı. Gün Selime Katedrali'nde kapanır: insanın kayayı ne denli büyük ölçekte işleyebileceğini gösteren bu yapı, bir Hristiyan manastır kompleksinin izlerini taşır.\n\nHer durak kendi içinde bir gün sürebilirdi. Ama bir arada, birbirini tamamlayan bu üçlü, Güney Kapadokya'nın özünü yaşatır.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/green-tour.avif",
      highlights: ["Ihlara Vadisi", "Yeraltı şehri"],
    },
    {
      id: 13,
      title: "Mavi Tur (Gizli Vadiler & Ihlara)",
      categoryKey: "nature",
      duration: "6–7 saat",
      description:
        "Kapadokya'nın en sakin koridorlarından geçerek gizli vadileri, kaya kiliselerini ve Ihlara'nın berrak nehrini bulun. Sessizlik, burada bir hediye.",
      longDescription:
        "Sessizliğin Rotası\n\nMavi Tur, Kapadokya'da kalabalıktan uzak, daha kişisel bir keşif arayanlar için tasarlanmıştır. Güzergah, bölgenin turistik merkezlerini kasıtlı olarak dışarıda bırakarak; henüz tur otobüslerinin uğramadığı vadilere, az bilinen kaya kiliselerine ve Ihlara Nehri'nin berraklığına yönelir.\n\nBu turda zaman daha yavaş akar. Bir vadinin ortasında durur, dinler, bakar; devam etmek için acele etmezsiniz. Rehberimiz, size tarihin yalnızca bilinen yüzünü değil; arka planını, detayını ve fısıltısını da sunar. Köyde çay içmek, bir çobanla konuşmak ya da nehir kenarında öğle yemeği yemek bu turun olağan parçalarıdır.\n\nMavi Tur, bir macera programı değil; Kapadokya'yla gerçek bir tanışmadır.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/blue-tour.avif",
      highlights: ["Gizli vadiler", "Kaya kiliseleri"],
    },
    {
      id: 14,
      title: "Özel Tur",
      categoryKey: "special",
      duration: "Size göre",
      description:
        "Kapadokya'yı kendi ritminizde, kendi seçtiğiniz rotayla keşfedin. Rehber, araç ve program tamamen size özel tasarlanır.",
      longDescription:
        "Tamamen Size Özel\n\nBazı seyahatler, önceden belirlenmiş bir programın içine sığmaz. Belki bir vadide saatler geçirmek istiyorsunuzdur, belki bir köyde beklenmedik bir öğleden sonra yaşamak. Belki çocuklarınızla yavaş yürümek, belki bir çift olarak balonun altında yalnız kalmak istiyorsunuzdur.\n\nÖzel turumuzu başlatmadan önce sizi dinliyoruz. Nereye gitmek istediğinizi, neyi merak ettiğinizi, günün hangi anlarını saklamak istediğinizi. Buna göre rehberinizi, aracınızı ve rotanızı belirliyoruz. Yolda planlar değişirse, bu sorun olmaz — çünkü program sizsiniz.\n\nDil seçeneği, özel kameraman eşliği, çocuklu aile uyarlaması veya balon sonrası sabah programı gibi ek düzenlemeler de yapılabilir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/private-tour.avif",
      highlights: ["Özel rehber", "Esnek program"],
    },
    {
      id: 15,
      title: "Atlı Doğa Turu",
      categoryKey: "adventure",
      duration: "2–3 saat",
      description:
        "Peribacaları arasında atın sırtında süzülerek geçin. Bu kadim toprakları, onları ilk geçenlerle aynı yoldan hissedin.",
      longDescription:
        "Kadim Bir Yol\n\nAt, Kapadokya'nın bu topraklarıyla köklü bir bağa sahiptir. Bölgenin eski adı 'Güzel Atlar Ülkesi' anlamına gelir — ve bu coğrafyanın vadilerinden, yaylalarından, peribacalarının arasından geçmek için at sırtı hâlâ en doğal yol olabilir.\n\nTuru başlamadan önce deneyim düzeyinize göre bir at seçilir ve kısa bir brifing yapılır. Deneyimli biniciler için daha zorlu rotalar, yeni başlayanlar için yavaş tempolu ve rehber eşliğinde patikalar mevcuttur. Her iki durumda da vadi manzaraları, kayalık geçitler ve açık platolar sizi karşılar.\n\nAtın adımlarını hissederek ilerlemek, yürümekten farklı bir duygu yaratır: daha yüksek, daha serbest ve bu topraklarla daha derin bir bağ.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/horseback-riding.avif",
      highlights: ["Peribacası rotası", "Her seviyeye uygun"],
    },
    {
      id: 16,
      title: "Jeep Safari",
      categoryKey: "adventure",
      duration: "2–3 saat",
      description:
        "4×4 araçlarla Kapadokya'nın engebeli arazilerini ve gizli noktalarını keşfedin. Ulaşılması güç vadiler, bu yolla yakın olur.",
      longDescription:
        "Engebeli Güzellik\n\nKapadokya'nın bazı noktaları, asfalt yollardan ulaşılamaz. Vadilerin en derin köşeleri, plato kenarlarındaki görünmez seyirtepler, yaz kış açık kalan ama tur güzergahlarına girmeyen patikalar — bunlara ulaşmanın yolu, 4×4'tür.\n\nJeep safarimiz, sizi bu gizli noktalara taşır. Güçlü araçlar, deneyimli şoförler ve yolun ortasında durulabilen özgürlük. Manzara açıldığında sadece devam etmek zorunda değilsiniz; inerek çevre alabilir, oturabilir, bekleyebilirsiniz.\n\nGün doğumu veya gün batımı başlangıçlı seçenekler mevcuttur. Küçük gruplar ve aileler için önerilir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/jeep-safari.avif",
      highlights: ["Off-road keşif", "Gizli noktalar"],
    },
    {
      id: 17,
      title: "Gün Doğumu / Batımı Panorama Transferi",
      categoryKey: "nature",
      duration: "1–2 saat",
      description:
        "Kapadokya'nın en iyi manzara noktalarına gün doğumu ya da gün batımında ulaşın. Işık ve toprak, bu anlarda bir araya gelir.",
      longDescription:
        "Işığın Dönüşümü\n\nKapadokya'nın ışığı, günün belirli saatlerinde tamamen değişir. Sabahın erken saatlerinde vadiler hâlâ gölge içindeyken, yüksek kayalar ve platolar güneşin ilk ışığını tutar; bu ilk altın gölge dakikalar içinde yayılır ve peribacaları adeta ısınır. Gün batımında ise bu süreç tersine işler: kaya renkleri kızıla, mora ve ardından gri tonlara bürünür.\n\nPanorama transferi, bu ışık dönüşümünü en iyi görebileceğiniz noktaya, doğru zamanda ulaşmanızı sağlar. Otel transferi dahil; güzergah üzerindeki en iyi seyirtepler belirlenmiş ve araç bekleme süreniz hesaba katılmış şekilde düzenlenir.\n\nBalonların henüz kalkış yaptığı, vadilerin giderek aydınlandığı bir sabah — ya da günün yorgunluğunun yerini sihirli bir ışık şölenine bıraktığı bir akşam. Her ikisi de farklı, her ikisi de olağanüstü.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/balloon-2.avif",
      highlights: ["Panoramik seyirtepe", "Sihirli ışık"],
    },
    {
      id: 18,
      title: "Çömlek Atölyesi (Avanos)",
      categoryKey: "art",
      duration: "2 saat",
      description:
        "Kızılırmak kıyısındaki Avanos'ta, çömlek ustasının ellerini izleyin, ardından kili kendiniz şekillendirin. Pişirme, sabır ve el bitirir.",
      longDescription:
        "Kil ve Sabır\n\nAvanos'un kil geleneği, Kızılırmak'ın kırmızı topraklarında kök salmıştır. Nehir, yüzyıllar boyunca bu toprağı taşıyıp işlenmeye hazır hale getirmiş; Avanos ise bu toprağa biçim vermeyi bir gelenek haline getirmiştir. Bugün şehrin hâlâ aktif olan atölyelerinde, nesil aktaran ustalar kili çarkta şekillendirmeye devam etmektedir.\n\nAtölye deneyimimiz, sizi bu geleneğin içine alır. Önce ustanın ellerini izleyeceksiniz — bu bir ders değil, bir gözlemdir. Sonra kili elinize alacak, çarkı çevirdikçe neye dönüştüğünü göreceksiniz. Kil, sabırsız ellere direnir; ama bir kez ritmi yakaladığınızda, şekillenmek ister.\n\nYapılan eserler fırınlanabilir ve adresinize gönderilebilir. Çay ve atölye sonrası Avanos gezisi için zaman ayrılmaktadır.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/pottery.avif",
      highlights: ["Usta eşliğinde", "Kendi eserinizi yapın"],
    },
    {
      id: 19,
      title: "Türk Hamamı Deneyimi",
      categoryKey: "wellness",
      duration: "1–2 saat",
      description:
        "Tarihi bir hamamda köpük, buhar ve sıcaklıkla arının. Gövde değil; zihin de dinlenir — bu, bir ritüeldir.",
      longDescription:
        "Temizliğin Ötesi\n\nTürk hamamı, bir banyo değildir. Tarihsel kökleri Anadolu, Roma ve Bizans geleneğine uzanan bu yapı, bedenin arınmasını bir ritüele dönüştürmüştür. Merkez kubbeden süzülen loş ışık, mermer döşemenin ısısı, buhar ve köpük — bunların hepsi bir arada, gündelik yaşamın yoğunluğundan çıkıp başka bir zaman dilimine geçmenizi sağlar.\n\nKese ve köpük masajı, kasların derinlemesine gevşemesini ve derideki ölü hücrelerin arınmasını sağlar. Uygulama sonrasında hem bedenin hem de zihnin farklı hissettiği bir hafiflik gelir. Sözle anlatması güç olan bu duygu, yaşandığında tanıdık gelir.\n\nTarihi bir hamam yapısında, deneyimli tellaklar eşliğinde gerçekleştirilen bu deneyim, Kapadokya turununuzun en sakin ve en arındırıcı anı olabilir.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc: "/images/activities/turkish-hammam.avif",
      highlights: ["Geleneksel kese", "Tam rahatlama"],
    },
    {
      id: 20,
      title: "Klasik Araç & Balon Fotoğraf Çekimi",
      categoryKey: "art",
      duration: "2–3 saat",
      description:
        "Kapadokya'nın kadim göğünde bir balonun altında, tarihin içinden fırlamış bir araçla çekilmiş kareler — sadece bir fotoğraf değil, bir şiir.",
      longDescription:
        "Zamanın Dışında\n\nBir 1950'ler klasik otomobili, peribacaları arasında duruyor. Arka planda balon gökyüzünde süzülüyor. Işık tam yerinde, çerçeve hazır — bu görsel, Kapadokya'nın kadim dokusunu yirminci yüzyılın ortasıyla birleştiren, zamanı atlayan bir kompozisyondur.\n\nBu fotoğraf çekimi deneyimi, profesyonel sonuçlar için tasarlanmış ama katı değil. Belirlenen noktalarda araç ve balon birlikte konumlandırılır; ışığın en iyi olduğu saatlerde çekim yapılır. İster bir çift olarak, ister aile olarak, ister yalnız — her biri farklı bir hikâye anlatır.\n\nKonumlar önceden belirlenir; styling önerisi sunulur; deneyimli bir fotoğrafçı eşliğinde çekim gerçekleştirilebilir. Günün sonunda elinizde yalnızca tatil fotoğrafları değil; yıllar sonra da bakıldığında aynı duyguyu veren kareler olur.\n\nTur programı ve rezervasyon bilgisi için WhatsApp ya da e-posta ile ulaşın.",
      imageSrc:
        "/images/activities/Vintage%20Classic%20Car%20%26%20Balloon%20Photoshoot.avif",
      highlights: ["Klasik otomobil", "Balon eşliğinde"],
    },
  ],

  en: [
    {
      id: 1,
      title: "Hot Air Balloon Ride",
      categoryKey: "adventure",
      duration: "3–4 hours",
      description:
        "Drift above Cappadocia's extraordinary fairy chimneys at sunrise. Feel the ancient landscape in a way that nothing else can offer.",
      longDescription:
        "A Surreal Dream in the Sky\n\nCappadocia's morning wakes before the sun. As your private vehicle collects you from your hotel and carries you toward the launch site, only the sound of the balloons' burners accompanies you through the valleys' deep and mystical silence.\n\nAre you ready to drift gently with the rising sun above fairy chimneys — unique formations sculpted by volcanic tuff and the wind over millions of years of geological heritage?\n\nThis is no ordinary flight; it is the moment you feel Cappadocia's ancient fabric, the curves of its valleys and the grandeur of Mount Erciyes from the most privileged vantage point in the sky, closer than ever before. The instant the basket loses its connection to the earth, time seems to stand still. As the valleys beneath you awaken in shades of crimson, gold and rose, you will dance with the wind along our master pilots' flawless route. Witness this extraordinary visual feast — where every frame is as beautiful as a painting — from the front row.\n\nUpon landing, a celebration crowned with champagne awaits you. Gift yourself this privilege and reserve your place above the clouds.\n\nFor pricing and reservation details, please reach us via WhatsApp or phone.",
      imageSrc: "/images/activities/balloon.avif",
      highlights: ["Sunrise flight", "Bird's-eye panorama"],
    },
    {
      id: 2,
      title: "Cappadocia Wine Tasting",
      categoryKey: "gastronomy",
      duration: "2–3 hours",
      description:
        "Discover wines crafted from grapes grown in the region's volcanic soil, tasted in a historic cellar with stories from local producers.",
      longDescription:
        "An Ancient Heritage Hidden in the Glass\n\nYou are invited on a mesmerising journey through the grapes grown in Cappadocia's heartland — soils enriched millions of years ago by the very lava of volcanoes. This mystical geography, which holds a deep-rooted winemaking tradition stretching back to the Hittites and Assyrian Trade Colonies, to the third millennium BC, offers not a simple tasting — but a voyage through time.\n\nIn our historic cave cellars — preserving the stone's natural coolness and memory — we offer a distinctive atmosphere for our guests. You will discover boutique wines crafted with meticulous care from local varieties such as Emir and Dimrit, nurtured by Cappadocia's mineral-rich volcanic soil, as well as rare varieties like Öküzgözü and Kalecik Karası.\n\nDuring this tasting, you will not merely sense the wines' rich, complex aromas; with every sip you will hear the passionate stories of local producers who have transformed winemaking into an art form. This tasting experience — paired with regional cheeses, dried fruits and specially curated bites — will become one of the most memorable moments of your Cappadocia stay.\n\nSurrender yourself to the region's millennia-long palate memory, and savour Cappadocia's soul — in a candlelit cave cellar, glass in hand.\n\nFor pricing and reservation details, please reach us via WhatsApp or phone.",
      imageSrc: "/images/activities/sarap-tadim.avif",
      highlights: ["Historic cellar", "Volcanic vineyard"],
    },
    {
      id: 3,
      title: "Underground City Tour",
      categoryKey: "history",
      duration: "2–3 hours",
      description:
        "Descend into the layered depths of Derinkuyu and Kaymaklı. This mysterious world, carved thousands of years ago, transports you beyond time.",
      longDescription:
        "Beneath Time\n\nMillions of years ago, the soft volcanic tuff left by erupting volcanoes became both a material and a shelter here. Cappadocia's underground cities were carved deep into the earth as the most remarkable proof of human ingenuity and the survival instinct across centuries. Derinkuyu, reaching eight floors in depth, is large enough to shelter tens of thousands of people for months.\n\nDon't think of this tour as a museum visit. As you pass through narrow corridors, imagine the great stone doors closing from the inside. Notice how the ventilation shafts carry fresh air to the deepest levels. Feel the presence of kitchens, wine presses, churches and schools hundreds of metres below. Our expert guide will tell you not just the stone of this world, but its soul.\n\nKaymaklı and Derinkuyu may appear to be two independent cities, but both are products of the same ancient tradition: to be drawn into the earth, to hide, to carry on living.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/yeralti-sehri.avif",
      highlights: ["Guided exploration", "8 levels deep"],
    },
    {
      id: 4,
      title: "Photography Safari",
      categoryKey: "art",
      duration: "4–5 hours",
      description:
        "A guided visual journey through Cappadocia's most photogenic valleys during golden hour — long shadows, warm light, hidden angles.",
      longDescription:
        "Follow the Light\n\nIn Cappadocia, light is not a landscape — it is a material. In the early morning or near sunset, the golden light stretching across the valleys gives depth to the fairy chimneys, making the rocks almost alive. These moments are brief, and without knowing where to stand, they are often missed.\n\nOur photography safari is a dedicated exploration of Cappadocia's least-known yet most photogenic spots. Your guide, with routes shaped by years of experience, will lead you while teaching you how the light shifts, where shadows lengthen, and which angles exist only in that instant.\n\nDSLR or smartphone — all that's needed is being in the right place at the right time. This land will offer you everything else.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/foto-safari.avif",
      highlights: ["Golden hour light", "Hidden routes"],
    },
    {
      id: 5,
      title: "Valley Hikes",
      categoryKey: "nature",
      duration: "3–4 hours",
      description:
        "Walk silently through Pigeon, Love and Ihlara valleys. Each has its own colour, scent and sound. Learn the secrets impossible to describe without a guide.",
      longDescription:
        "Listening to the Valley\n\nThe creamy white rocks of Pigeon Valley shimmer in the sun; these cliff faces, carved with dovecotes thousands of years ago, are a dialogue between Cappadocia's earliest inhabitants and nature. Walking through Love Valley, you pass not only between the familiar silhouettes of fairy chimneys — you pass through a piece of history itself. Ihlara is different: in the middle of a dry plateau, a lively river flows through a deep canyon, with centuries of life continuing alongside.\n\nIt is not possible to complete all these valleys in a single day. Each has its own rhythm, each its own narrative. As your guide shares these stories, not just history speaks — the earth itself joins the conversation.\n\nWe offer tailored route options based on the hiking season, group size and your expectations. At a pace that won't strain your breath, you will absorb the scenery fully.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/vadi-yuruyusu.avif",
      highlights: ["Guided walk", "3 distinct valleys"],
    },
    {
      id: 6,
      title: "ATV Safari",
      categoryKey: "adventure",
      duration: "2 hours",
      description:
        "Follow the trails between fairy chimneys toward sunset. Not about speed — it's the feeling of freedom that leads the way.",
      longDescription:
        "Close to the Earth\n\nCappadocia's open-air museum is explored on foot, and sometimes on horseback. But some routes lead to places only reachable on four wheels: rocky passes between fairy chimneys, viewpoints at the edges of plateaus, valleys never visited by tour buses.\n\nOur ATV safari is designed not for speed, but for that feeling of freedom. With your expert guide, as the sky turns crimson, you will advance through the stark beauty of Cappadocia. Every bend offers a new frame.\n\nNo experience required — a basic briefing is sufficient. Vehicles are regularly maintained; safety equipment is included.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/atv-turu.avif",
      highlights: ["Off-road trails", "Sunset views"],
    },
    {
      id: 7,
      title: "Traditional Turkish Cooking",
      categoryKey: "gastronomy",
      duration: "3–4 hours",
      description:
        "Cook traditional dishes with fresh local ingredients in a family kitchen. You won't learn a recipe — you'll learn muscle memory and family secrets.",
      longDescription:
        "The Hands' Memory\n\nCappadocia's food culture is not found in a restaurant menu — it lives in a mother's hands and a grandmother's stove. This cooking experience is not a recipe from a cookbook — it is the muscle memory passed from generation to generation. You will feel with your hands when the dough has reached the right consistency, and sense with your nose when the seasoning is sufficient.\n\nIn our local host's kitchen, we determine the menu together using Cappadocia's seasonal and regional ingredients, then cook, sit at the table together and share conversation. That warm kitchen atmosphere where tea is brewing, dough is being rolled and spices are ground — it will be one of the most fondly remembered moments of your holiday.\n\nSuitable for families with children, couples and small groups.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/geleneksek-turk-mutfagi.avif",
      highlights: ["Home kitchen", "Regional recipes"],
    },
    {
      id: 8,
      title: "Cycling Tours",
      categoryKey: "nature",
      duration: "3–4 hours",
      description:
        "Cycle along Cappadocia's quiet village roads and valley trails. Set your own tempo — the landscape does the rest.",
      longDescription:
        "At Your Own Pace\n\nIf you want to see Cappadocia slowly, the best way is by bicycle. Without the noise of a motor, with only the quiet progress of a wheel in conversation with the earth — you glide through villages, along the edges of vineyards, on paths that cut across the valley.\n\nRoutes can be planned to suit both beginners and experienced cyclists. Flat village roads, moderate valley crossings or more demanding plateaus — the choice is yours. While your guide directs you on points to stop and local details along the route, the decision of when to pedal is entirely yours.\n\nBicycles are well-maintained and comfortable; helmets and basic safety equipment are included.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/bisiklet-turu.avif",
      highlights: ["Your own pace", "Village routes"],
    },
    {
      id: 9,
      title: "Whirling Dervishes Ceremony",
      categoryKey: "art",
      duration: "1 hour",
      description:
        "Sema is a living prayer of the Mevlevi tradition. Between spinning white robes and the breath of the ney, you witness a moment where time stands still.",
      longDescription:
        "Turning Toward Eternity\n\nSema is not a performance. In the Mevlevi tradition, this ritual represents a person's turning toward God, the effort to transcend the self, and the desire to unite with the universe. As the white robes spin and the deep breath of the ney fills the space — you are not watching a dance, but a prayer.\n\nCappadocia is a living part of this tradition. Sufism, rooted in Anatolia's spiritual geography since the Middle Ages, is kept alive here too. Witnessing a genuine ceremony — with its rules, rhythm and profound silences — can be one of the most deeply moving experiences of a journey.\n\nBefore the ceremony, a brief introduction is offered: the meaning of Sema, the language of feet and hands, the layers of the music are explained. The difference between watching without understanding and watching with understanding is profound.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/whirling-dervishes.avif",
      highlights: ["Mevlevi tradition", "Live music"],
    },
    {
      id: 10,
      title: "Turkish Night",
      categoryKey: "art",
      duration: "3 hours",
      description:
        "Step into an Anatolian night accompanied by local musicians and colourful folk dances. Table, music and dance — all three together.",
      longDescription:
        "An Anatolian Night\n\nAn Anatolian night is not merely music and food. The rhythm of the drum, the string of the saz, the steps of the zeybek dancer — behind all of these is the pulse of a culture flowing across generations. Turkish Night presents this pulse in an environment where you can feel it directly.\n\nThroughout this evening filled with live musicians and dance groups, you will see reflections from different regions of Anatolia: from the horon of the Black Sea coast to the zeybek rhythm of the Aegean, from the halay chain of the east to the sound of the çöğür in Central Anatolia. As local mezes, main courses and desserts are served at the table, the night unfolds naturally.\n\nThis experience is one of the liveliest and warmest encounters with Turkish culture — you feel not a spectator, but a part of it.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/turkish-night.avif",
      highlights: ["Folk dances", "Local flavours"],
    },
    {
      id: 11,
      title: "Red Tour (North Cappadocia)",
      categoryKey: "history",
      duration: "6–7 hours",
      description:
        "Explore North Cappadocia's iconic sites in a single day: Göreme Open Air Museum, Paşabağ, Devrent Valley and Avanos. The stone memory of the region unfolds step by step.",
      longDescription:
        "The North's History\n\nThe Red Tour serves as a compass for those visiting Cappadocia for the first time. The region's most celebrated sites — Göreme Open Air Museum, the mushroom-shaped fairy chimneys of Paşabağ, Devrent Valley famous for its horse-shaped formations, and Avanos with its pottery tradition — are presented in a single day, within a narrative where each complements the next.\n\nGöreme Open Air Museum is where the visual heritage left by Christianity in Cappadocia is most densely concentrated. Dozens of rock-cut churches preserving Byzantine frescoes convey the spirit of a community that lived in this valley between the 10th and 13th centuries. Paşabağ presents the most dramatic forms of fairy chimneys together — some three-headed, some hollowed out into living spaces.\n\nIn the afternoon, in Avanos, clay being shaped on a pottery master's wheel is the day's final lesson: this earth is still creating, even today.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/red-tour.avif",
      highlights: ["Göreme Museum", "Fairy chimneys"],
    },
    {
      id: 12,
      title: "Green Tour (South Cappadocia)",
      categoryKey: "nature",
      duration: "6–8 hours",
      description:
        "Dive into the silence of Derinkuyu Underground City, Ihlara Valley and Selime Cathedral. One day isn't enough to explore South Cappadocia's deepest layers — but it's the perfect start.",
      longDescription:
        "The Depth of the South\n\nThe southern region of Cappadocia is quieter and less well-known compared to the north. But this quietness comes not from emptiness — it comes from depth. The Green Tour presents this depth in three distinct layers.\n\nDescending eight floors below ground in Derinkuyu Underground City, you momentarily forget how deep you are — because life was fully established there too. In Ihlara Valley, by contrast, the sky never disappears; but deep canyon walls surround you. A river within, dozens of rock-cut churches on either side, an endless Cappadocian sky above. The day closes at Selime Cathedral: this structure, showing the scale to which humans can work stone, carries traces of a Christian monastery complex.\n\nEach stop could fill a day on its own. But together, this complementary trio brings the essence of South Cappadocia to life within a single day.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/green-tour.avif",
      highlights: ["Ihlara Valley", "Underground city"],
    },
    {
      id: 13,
      title: "Blue Tour (Hidden Valleys & Ihlara)",
      categoryKey: "nature",
      duration: "6–7 hours",
      description:
        "Pass through Cappadocia's quietest corridors to find hidden valleys, rock-cut churches and the clear river of Ihlara. Silence is a gift here.",
      longDescription:
        "The Route of Silence\n\nThe Blue Tour is designed for those seeking a more personal exploration away from the crowds in Cappadocia. The route deliberately bypasses the region's tourist centres, turning instead toward valleys not yet visited by tour buses, lesser-known rock-cut churches, and the clarity of the Ihlara River.\n\nOn this tour, time flows more slowly. You stop in the middle of a valley, listen, look — there is no rush to move on. Your guide offers not just the known face of history, but its background, its detail and its whisper. Drinking tea in a village, talking with a shepherd, or having lunch by the riverbank are ordinary parts of this tour.\n\nThe Blue Tour is not an adventure itinerary — it is a genuine introduction to Cappadocia.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/blue-tour.avif",
      highlights: ["Hidden valleys", "Rock-cut churches"],
    },
    {
      id: 14,
      title: "Private Custom Tour",
      categoryKey: "special",
      duration: "Tailored to you",
      description:
        "Discover Cappadocia at your own rhythm, on your own chosen route. Guide, vehicle and program are designed entirely for you.",
      longDescription:
        "Entirely Yours\n\nSome journeys don't fit inside a pre-determined itinerary. Perhaps you want to spend hours in a single valley, or live an unexpected afternoon in a village. Perhaps you want to walk slowly with your children, or be alone as a couple beneath a balloon.\n\nBefore starting your private tour, we listen to you. Where you want to go, what you're curious about, which moments of the day you want to keep. We determine your guide, vehicle and route accordingly. If plans change along the way, that's no problem — because the schedule is you.\n\nAdditional arrangements such as language preference, private photographer accompaniment, family adaptation for children, or a morning programme following a balloon ride can also be made.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/private-tour.avif",
      highlights: ["Private guide", "Flexible itinerary"],
    },
    {
      id: 15,
      title: "Horseback Riding",
      categoryKey: "adventure",
      duration: "2–3 hours",
      description:
        "Drift between the fairy chimneys on horseback. Feel these ancient lands the same way as those who first crossed them.",
      longDescription:
        "An Ancient Path\n\nThe horse has a deep-rooted connection with Cappadocia's lands. The region's ancient name means 'Land of Beautiful Horses' — and passing through its valleys, plateaus and between its fairy chimneys on horseback may still be the most natural way.\n\nBefore the tour begins, a horse is selected according to your level of experience and a short briefing is given. More challenging routes exist for experienced riders, while slower-paced, guided paths are available for beginners. In both cases, valley vistas, rocky passes and open plateaus await.\n\nMoving forward while feeling the horse's footsteps creates a different sensation from walking: higher, more free, and a deeper connection with these lands.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/horseback-riding.avif",
      highlights: ["Fairy chimney route", "All levels welcome"],
    },
    {
      id: 16,
      title: "Jeep Safari",
      categoryKey: "adventure",
      duration: "2–3 hours",
      description:
        "Explore Cappadocia's rugged terrain and hidden spots in 4×4 vehicles. The hard-to-reach valleys become accessible this way.",
      longDescription:
        "Rugged Beauty\n\nSome of Cappadocia's points are unreachable from paved roads. The deepest corners of valleys, invisible viewpoints at plateau edges, paths open year-round but never entering tour itineraries — the way to reach these is by 4×4.\n\nOur jeep safari takes you to these hidden points. Powerful vehicles, experienced drivers and the freedom to stop anywhere along the route. When the scenery emerges, you don't have to simply drive on — you can get out, take in the surroundings, sit, linger.\n\nOptions with sunrise or sunset start times are available. Recommended for small groups and families.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/jeep-safari.avif",
      highlights: ["Off-road adventure", "Hidden spots"],
    },
    {
      id: 17,
      title: "Sunrise / Sunset Panorama Transfer",
      categoryKey: "nature",
      duration: "1–2 hours",
      description:
        "Reach Cappadocia's finest viewpoints at sunrise or sunset. Light and earth come together in these moments.",
      longDescription:
        "The Transformation of Light\n\nCappadocia's light changes completely at certain hours of the day. In the early morning, while valleys are still in shadow, the high rocks and plateaus catch the first rays of sunlight; this initial golden haze spreads within minutes and the fairy chimneys seem to warm. At sunset, this process reverses: the colours of the rock take on shades of crimson, purple and then grey.\n\nThe panorama transfer ensures you reach the point where you can best witness this transformation of light, at the right moment. Hotel pickup is included; the best viewpoints along the route are selected and your vehicle waiting time is factored in.\n\nA morning when balloons have just launched and valleys are gradually brightening — or an evening when the day's weariness gives way to a magical light spectacle. Both are different, both extraordinary.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/balloon-2.avif",
      highlights: ["Panoramic viewpoints", "Magical light"],
    },
    {
      id: 18,
      title: "Pottery Workshop (Avanos)",
      categoryKey: "art",
      duration: "2 hours",
      description:
        "In Avanos by the Red River, watch the hands of a pottery master, then shape the clay yourself. Firing, patience and hands complete the rest.",
      longDescription:
        "Clay and Patience\n\nAvanos's clay tradition is rooted in the red soils of the Kızılırmak River. The river has carried and prepared this earth across centuries; Avanos has made shaping this earth into a tradition. In the town's still-active workshops today, masters passing knowledge between generations continue to shape clay on the wheel.\n\nOur workshop experience draws you into this tradition. First you will watch the master's hands — not a lesson, but an observation. Then you will take the clay in your own hands, seeing what it becomes as you turn the wheel. Clay resists impatient hands; but once you find the rhythm, it wants to take shape.\n\nFinished pieces can be fired and sent to your address. Time is set aside for tea and an Avanos stroll after the workshop.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/pottery.avif",
      highlights: ["With a master", "Create your own piece"],
    },
    {
      id: 19,
      title: "Turkish Hammam Experience",
      categoryKey: "wellness",
      duration: "1–2 hours",
      description:
        "Cleanse with foam, steam and warmth in a historic hammam. Not just the body — the mind also rests. This is a ritual.",
      longDescription:
        "Beyond Cleanliness\n\nThe Turkish hammam is not a bathhouse. This institution, with historical roots reaching back through Anatolian, Roman and Byzantine traditions, has transformed the cleansing of the body into a ritual. The dim light filtering through the central dome, the warmth of the marble floor, steam and foam — all together, they allow you to step out of the intensity of daily life and into another dimension of time.\n\nThe kese scrub and foam massage allow the muscles to relax deeply and the skin's dead cells to be cleansed. After the treatment comes a lightness — where both the body and mind feel different. This sensation, difficult to describe in words, feels familiar once experienced.\n\nTaking place in a historic hammam building with experienced attendants, this experience may be the calmest and most cleansing moment of your Cappadocia journey.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc: "/images/activities/turkish-hammam.avif",
      highlights: ["Traditional kese scrub", "Complete relaxation"],
    },
    {
      id: 20,
      title: "Vintage Classic Car & Balloon Photoshoot",
      categoryKey: "art",
      duration: "2–3 hours",
      description:
        "Beneath a balloon drifting over Cappadocia's ancient sky, beside a car stepped out of history — not just a photograph, but a poem.",
      longDescription:
        "Outside of Time\n\nA classic car from the 1950s stands among the fairy chimneys. In the background, a balloon drifts across the sky. The light is exactly right, the frame is set — this image is a composition that leaps across time, merging Cappadocia's ancient fabric with the mid-twentieth century.\n\nThis photoshoot experience is designed for professional results but is never rigid. At selected locations, the car and balloon are positioned together; shooting takes place during the hours of best light. Whether as a couple, a family or alone — each tells a different story.\n\nLocations are determined in advance; styling suggestions are provided; the shoot can take place with an experienced photographer of your preference. At the end of the day, you will have in hand not just holiday photographs, but frames that evoke the same feeling years later.\n\nFor tour schedules and reservation details, reach us via WhatsApp or email.",
      imageSrc:
        "/images/activities/Vintage%20Classic%20Car%20%26%20Balloon%20Photoshoot.avif",
      highlights: ["Vintage automobile", "Balloon backdrop"],
    },
  ],

  zh: [
    {
      id: 1,
      title: "热气球之旅",
      categoryKey: "adventure",
      duration: "3–4小时",
      description:
        "在日出时分飘浮于卡帕多西亚独特的仙烟囱之上，以前所未有的方式感受这片古老大地的神奇。",
      longDescription:
        "天空中的超现实梦境\n\n卡帕多西亚的清晨，比太阳更早苏醒。当专属车辆接您离开酒店，驶向起飞场地时，山谷深邃神秘的寂静中，只有气球点火的声音相伴。\n\n您是否准备好，随着日出，轻柔地飘浮在那些历经数百万年地质演变、由火山凝灰岩与风共同雕刻而成的独特仙烟囱之上？\n\n这不是一次普通的飞行；这是您从天空中最尊贵的包厢，比任何时候都更近地感受卡帕多西亚古老纹理、山谷曲线与埃尔吉亚斯山雄姿的时刻。当吊篮与大地的联系切断的瞬间，时间仿佛静止。脚下的山谷在深红、金黄与玫瑰色中逐渐苏醒，您将随着我们专业飞行员的完美航线与风共舞。请在最前排见证这场无与伦比的视觉盛宴。\n\n降落后，一场以香槟庆祝的喜悦时刻正等待着您。将这份特权送给自己，预订您在云端之上的位置。\n\n如需最新价格及预订详情，请通过WhatsApp或电话与我们联系。",
      imageSrc: "/images/activities/balloon.avif",
      highlights: ["日出飞行", "鸟瞰全景"],
    },
    {
      id: 2,
      title: "卡帕多西亚品酒",
      categoryKey: "gastronomy",
      duration: "2–3小时",
      description:
        "在历史悠久的酒窖中品尝由该地区火山土壤中生长的葡萄酿制的美酒，聆听本地酿酒师的故事。",
      longDescription:
        "藏于杯中的千年遗产\n\n诚邀您踏上一段迷人的旅程，探索生长于卡帕多西亚心脏地带的葡萄——这片土地的火山土壤，历经数百万年的熔岩馈赠而变得无比丰饶。这片神秘的地理，蕴藏着从赫梯人和亚述贸易殖民地延续至今、追溯至公元前3000年的深厚酿酒传统，带给您的不是一次普通的品酒——而是一段穿越时空的旅程。\n\n我们的历史洞窟酒窖保存着石头天然的清凉与记忆，为宾客提供独特的氛围。您将在此探索由卡帕多西亚矿物质丰富的土壤滋养的特色本地品种——艾米尔和迪姆里特，以及珍稀品种厄库兹古祖和卡雷吉克卡拉斯。\n\n在这场品酒体验中，您不仅将感受葡萄酒丰富复杂的香气；每一口都将聆听本地酿酒师将酿酒升华为艺术的激情故事。这场与地方奶酪、干果和特选美食相搭配的品酒体验，将成为您卡帕多西亚之旅最难忘的记忆之一。\n\n如需最新价格及预订详情，请通过WhatsApp或电话与我们联系。",
      imageSrc: "/images/activities/sarap-tadim.avif",
      highlights: ["历史酒窖", "火山葡萄园"],
    },
    {
      id: 3,
      title: "地下城市之旅",
      categoryKey: "history",
      duration: "2–3小时",
      description:
        "深入德林库尤和卡伊马克勒的层层地底。这个数千年前雕凿而成的神秘世界，将带您穿越时空。",
      longDescription:
        "时光之下\n\n数百万年前，火山喷发留下的柔软火山凝灰岩，在这里既是建筑材料，也是庇护所。卡帕多西亚的地下城市，作为人类智慧与生存本能最震撼人心的见证，被凿入大地深处。德林库尤深达八层，规模之大足以容纳数万人在地下生活数月。\n\n不要把这次旅程当作博物馆参观。当您穿过狭窄的走廊时，想象那些大石门从内部关闭的场景。感受通风竖井如何将新鲜空气输送到最深处。在地下数百米处，感知厨房、榨酒坊、教堂和学校的存在。我们专业的向导将向您讲述这个世界不只是它的石头，更是它的灵魂。\n\n卡伊马克勒和德林库尤看似两座独立的城市，但两者都是同一古老传统的产物：深入大地，藏匿于此，继续生存。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/yeralti-sehri.avif",
      highlights: ["向导探索", "8层深处"],
    },
    {
      id: 4,
      title: "摄影探索之旅",
      categoryKey: "art",
      duration: "4–5小时",
      description:
        "在黄金时段，跟随向导穿越卡帕多西亚最上镜的山谷——长长的阴影、温暖的光线、隐秘的角度。",
      longDescription:
        "追寻光线\n\n在卡帕多西亚，光线不是风景——而是一种素材。清晨或日落前后，漫过山谷的金色光芒赋予仙烟囱以深度，让岩石几乎栩栩如生。这些时刻转瞬即逝，如果不知道该站在哪里，往往就会错过。\n\n我们的摄影探索之旅，是专为卡帕多西亚鲜为人知却最上镜的地点而设计的私人探索。我们的向导凭借多年经验精心设计的路线引领您，教您光线如何变化、阴影从哪里延伸，以及哪些角度只存在于那一瞬间。\n\n单反相机或智能手机——您所需要的只是在正确的时间出现在正确的地点。其余的一切，这片土地会为您呈现。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/foto-safari.avif",
      highlights: ["黄金时光", "隐秘路线"],
    },
    {
      id: 5,
      title: "山谷徒步",
      categoryKey: "nature",
      duration: "3–4小时",
      description:
        "静静地穿越鸽子谷、爱之谷和伊赫拉拉谷。每个山谷都有自己的色彩、香气和声音。",
      longDescription:
        "倾听山谷\n\n鸽子谷奶白色的岩石在阳光下闪闪发光；这些数千年前雕凿满鸽巢的岩壁，是卡帕多西亚最早居民与自然对话的见证。穿行于爱之谷时，您不只是走过那些熟悉的仙烟囱轮廓之间——您也在穿越一段历史。伊赫拉拉则截然不同：在干旱高原的中央，一条生机勃勃的河流流过深邃的峡谷，身旁是延续了数个世纪的生活印记。\n\n一天之内游遍这些山谷是不可能的。每一处都有自己的节奏，每一处都有独属的故事。当向导分享这些叙事时，不只是历史在说话——大地本身也加入了对话。\n\n我们根据徒步季节、团队规模和您的期望提供定制路线选择。在不会让您气喘吁吁的节奏下，您将充分沉浸于这片风景之中。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/vadi-yuruyusu.avif",
      highlights: ["向导陪同", "3条不同山谷"],
    },
    {
      id: 6,
      title: "ATV越野探险",
      categoryKey: "adventure",
      duration: "2小时",
      description:
        "沿着仙烟囱之间的小径驶向日落。不在于速度——自由的感觉才是主角。",
      longDescription:
        "贴近大地\n\n卡帕多西亚的露天博物馆，靠双脚、有时靠马背来探索。但有些路线，只能通过四个轮子才能抵达：仙烟囱之间的岩石通道、高原边缘的观景点、旅游大巴从未涉足的山谷。\n\n我们的ATV探险，不是为了速度，而是为了那种自由感。在专业向导的陪同下，当天空渐渐变红，您将穿行于卡帕多西亚粗犷的美丽之中。每一个转弯，都呈现一幅新的画面。\n\n无需经验——基础说明即可。车辆定期维护保养，安全装备全程配备。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/atv-turu.avif",
      highlights: ["越野小径", "日落美景"],
    },
    {
      id: 7,
      title: "传统土耳其烹饪",
      categoryKey: "gastronomy",
      duration: "3–4小时",
      description:
        "在家庭厨房里用新鲜本地食材烹制传统菜肴。您学到的不只是食谱——而是手艺和家传秘方。",
      longDescription:
        "双手的记忆\n\n卡帕多西亚的饮食文化，不藏于餐厅菜单中——而在母亲的双手和祖母的灶台里。这堂烹饪体验不是食谱书上的配方——而是代代相传的手艺记忆。您将用双手感受面团何时揉到恰当的质地，用鼻子感知调料何时已经足够。\n\n在我们本地主人的厨房里，我们一起用卡帕多西亚的时令和地方食材决定菜单，然后共同烹制，围坐餐桌，分享交流。茶水在沸腾、面饼在擀开、香料在研磨的那温暖厨房氛围——将成为您假期中最难忘的时光之一。\n\n适合带孩子的家庭、情侣和小型团体。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/geleneksek-turk-mutfagi.avif",
      highlights: ["家庭厨房", "地区特色菜谱"],
    },
    {
      id: 8,
      title: "骑行之旅",
      categoryKey: "nature",
      duration: "3–4小时",
      description:
        "沿着卡帕多西亚宁静的村庄道路和山谷小径骑行。按自己的节奏出发——风景会为您做好其余的一切。",
      longDescription:
        "随心而行\n\n如果您想慢慢地观看卡帕多西亚，最好的方式是骑自行车。没有引擎的噪音，只有车轮与土地悄然对话的静谧前行——您穿越村庄、沿着葡萄园边缘、走过横穿山谷的小径。\n\n路线可根据初学者和有经验的骑行者量身定制。平坦的乡村道路、中等难度的山谷穿越，或更具挑战性的高原——选择权在您手中。向导会为您指引沿途的停留点和当地细节，而何时踩下踏板，完全由您决定。\n\n自行车保养良好、舒适安全；头盔和基本安全装备均已包含。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/bisiklet-turu.avif",
      highlights: ["自定节奏", "乡村路线"],
    },
    {
      id: 9,
      title: "旋转托钵僧仪式",
      categoryKey: "art",
      duration: "1小时",
      description:
        "旋转托钵僧仪式是梅夫列维传统中的一场活生生的祈祷。在旋转的白袍与奈伊笛声之间，您见证时间静止的瞬间。",
      longDescription:
        "转向永恒\n\n旋转托钵僧仪式不是一场表演。在梅夫列维传统中，这一仪式象征着一个人转向真主、超越自我的努力，以及与宇宙合一的渴望。当白色长袍旋转，奈伊笛深沉的呼吸充满空间——您目睹的不是舞蹈，而是一场祈祷。\n\n卡帕多西亚是这一传统的活态组成部分。苏菲主义自中世纪以来深植于安纳托利亚的精神地理中，在这里依然生生不息。亲历一场真正的仪式——带着它的规则、节奏和深沉的静默——可能是旅途中最震撼心灵的体验之一。\n\n仪式前会有简短介绍：旋转仪式的含义、脚和手的语言、音乐的层次都会得到解释。在懂得与不懂得之间观看，差别是深刻的。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/whirling-dervishes.avif",
      highlights: ["梅夫列维传统", "现场音乐"],
    },
    {
      id: 10,
      title: "土耳其之夜",
      categoryKey: "art",
      duration: "3小时",
      description:
        "踏入一个充满当地音乐家与多彩民间舞蹈的安纳托利亚之夜。餐桌、音乐与舞蹈——三者合一。",
      longDescription:
        "安纳托利亚之夜\n\n安纳托利亚的夜晚，不仅仅是音乐和美食。鼓的节拍、萨孜琴的弦音、泽贝克舞者的脚步——这一切背后，是跨越世代流淌的文化脉搏。土耳其之夜将这份脉搏呈现于您可以直接感受的氛围之中。\n\n在这个充满现场音乐家和舞蹈团的夜晚，您将看到来自安纳托利亚各地区的风情：从黑海海岸的霍伦舞到爱琴海的泽贝克节奏，从东部的哈拉伊圆圈舞到中安纳托利亚的柴古尔声音。桌上摆满地方小食、主菜和甜点，夜晚在自然流淌中展开。\n\n这一体验是与土耳其文化最生动、最温暖的相遇之一——您感受到的不是旁观者，而是其中的一部分。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/turkish-night.avif",
      highlights: ["民间舞蹈", "当地美食"],
    },
    {
      id: 11,
      title: "红色之旅（北卡帕多西亚）",
      categoryKey: "history",
      duration: "6–7小时",
      description:
        "一天之内探索北卡帕多西亚的标志性景点：格雷梅露天博物馆、帕沙巴格、德夫伦特山谷和阿瓦诺斯。",
      longDescription:
        "北方的历史\n\n红色之旅对于初次到访卡帕多西亚的人来说，堪称一张指南针。该地区最著名的景点——格雷梅露天博物馆、帕沙巴格蘑菇形仙烟囱、以马形岩石著名的德夫伦特山谷，以及以陶器传统闻名的阿瓦诺斯——在一天之内呈现，每一处都在相互衬托中构成完整叙事。\n\n格雷梅露天博物馆是基督教在卡帕多西亚留下的视觉遗产最为密集的地方。数十座保存着拜占庭壁画的岩凿教堂，传递着10至13世纪间在此山谷生活的社区的灵魂。帕沙巴格集中展示了仙烟囱最戏剧性的形态——有的三头并立，有的被掏空成为居住空间。\n\n下午在阿瓦诺斯，陶艺大师转轮上被塑造的陶土，是这一天最后的启示：这片土地，至今仍在创造。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/red-tour.avif",
      highlights: ["格雷梅博物馆", "仙烟囱"],
    },
    {
      id: 12,
      title: "绿色之旅（南卡帕多西亚）",
      categoryKey: "nature",
      duration: "6–8小时",
      description:
        "沉浸于德林库尤地下城、伊赫拉拉河谷和塞利梅大教堂的宁静中。一天不足以探索南卡帕多西亚最深的层次——但这是完美的开始。",
      longDescription:
        "南方的深度\n\n卡帕多西亚的南部地区相比北部更为宁静，也鲜为人知。但这份宁静并非来自空旷——而是来自深度。绿色之旅以三个不同的层次展现这份深度。\n\n在德林库尤地下城深入地下八层时，您会短暂忘记自己身处何处——因为那里的生活曾经完整而真实地存在。在伊赫拉拉谷，情形则相反，天空从未消失；但深邃的峡谷壁将您围绕。谷内一条河流，两侧数十座岩凿教堂，头顶无尽的卡帕多西亚天空。这一天在塞利梅大教堂画上句点：这座建筑展示了人类能够以多大规模雕凿岩石，保留着一处基督教修道院建筑群的痕迹。\n\n每一处景点都可以独自填满一整天。但汇聚在一起，这三处相互补充的景点，在一天之内呈现了南卡帕多西亚的精华。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/green-tour.avif",
      highlights: ["伊赫拉拉河谷", "地下城市"],
    },
    {
      id: 13,
      title: "蓝色之旅（隐秘山谷与伊赫拉拉）",
      categoryKey: "nature",
      duration: "6–7小时",
      description:
        "穿越卡帕多西亚最宁静的走廊，发现隐秘山谷、岩石教堂和伊赫拉拉清澈的河流。沉默，在这里是一份礼物。",
      longDescription:
        "沉默之路\n\n蓝色之旅专为那些希望在卡帕多西亚远离人群、寻求更私人探索的旅行者而设计。路线刻意绕开该地区的旅游中心，转而前往尚未被旅游大巴涉足的山谷、鲜为人知的岩凿教堂，以及伊赫拉拉河的清澈水域。\n\n在这次旅途中，时间流淌得更慢。您在山谷中央停下，倾听，凝望——不必急于前行。我们的向导不只告诉您历史已知的一面，还有它的背景、细节和低语。在村庄里喝茶、与牧羊人交谈，或在河边享用午餐，都是这次旅途的寻常组成部分。\n\n蓝色之旅不是一次探险行程——而是与卡帕多西亚真正的相识。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/blue-tour.avif",
      highlights: ["隐秘山谷", "岩凿教堂"],
    },
    {
      id: 14,
      title: "私人定制之旅",
      categoryKey: "special",
      duration: "量身定制",
      description:
        "按照自己的节奏，沿着自己选择的路线探索卡帕多西亚。向导、车辆和行程完全为您量身定制。",
      longDescription:
        "完全属于您\n\n有些旅程无法装入预先设定的行程之中。也许您想在某个山谷里消磨数小时，或在某个村庄度过一个意外的下午。也许您想和孩子们慢慢散步，或作为情侣在气球下享受独处时光。\n\n在开始您的私人定制之旅之前，我们会先倾听您。您想去哪里、对什么充满好奇、希望珍藏这一天的哪些时刻。我们据此为您确定向导、车辆和路线。若途中计划有所改变，完全没有问题——因为行程就是您自己。\n\n语言选择、私人摄影师随行、带孩子家庭的定制调整，或热气球飞行后的上午安排等额外服务，均可按需安排。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/private-tour.avif",
      highlights: ["私人向导", "灵活行程"],
    },
    {
      id: 15,
      title: "骑马游览",
      categoryKey: "adventure",
      duration: "2–3小时",
      description:
        "骑着马穿行于仙烟囱之间。以第一批穿越者同样的方式感受这片古老大地。",
      longDescription:
        "古老之路\n\n马与卡帕多西亚这片土地有着深厚的渊源。该地区古代的名字意为\"俊马之国\"——如今，骑马穿越它的山谷、高原和仙烟囱之间，或许仍是最自然的方式。\n\n旅程开始前，会根据您的骑术水平为您选择适合的马匹，并进行简短的说明。经验丰富的骑手可选择更具挑战性的路线，初学者则有节奏较慢、向导全程陪同的小径。两种情况下，山谷景色、岩石通道和开阔高原都将迎接您的到来。\n\n感受马蹄步伐的律动向前行进，创造出一种与步行截然不同的感觉：更高、更自由，与这片土地更深的连接。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/horseback-riding.avif",
      highlights: ["仙烟囱路线", "适合各级骑手"],
    },
    {
      id: 16,
      title: "吉普越野探险",
      categoryKey: "adventure",
      duration: "2–3小时",
      description:
        "乘坐四驱越野车探索卡帕多西亚崎岖的地形和隐秘之处。那些难以到达的山谷，由此变得触手可及。",
      longDescription:
        "崎岖之美\n\n卡帕多西亚的某些地点，从铺装道路无法抵达。山谷最深的角落、高原边缘隐秘的观景台、全年开放却从未出现在旅游线路中的小径——抵达这些地方的方式，只有四驱越野车。\n\n我们的吉普探险将带您前往这些隐秘之处。强劲的车辆、经验丰富的司机，以及随时可以停车的自由。当风景乍现时，您不必继续前行——可以下车环顾四周、静静坐下、慢慢等待。\n\n提供日出或日落出发的选项。推荐小团体和家庭参加。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/jeep-safari.avif",
      highlights: ["越野探险", "隐秘景点"],
    },
    {
      id: 17,
      title: "日出 / 日落全景接送",
      categoryKey: "nature",
      duration: "1–2小时",
      description:
        "在日出或日落时分抵达卡帕多西亚最美的观景点。光与大地，在这些时刻融为一体。",
      longDescription:
        "光的蜕变\n\n卡帕多西亚的光线在一天中的特定时刻完全改变。清晨，山谷仍在阴影中时，高耸的岩石和高原捕捉到第一缕阳光；这最初的金色光晕在数分钟内蔓延，仙烟囱仿佛在被温暖。日落时分，这一过程反转：岩石的颜色先变为深红，再变为紫色，最终归于灰色调。\n\n全景接送服务确保您在恰当的时刻抵达最佳观赏这一光线蜕变的地点。包含酒店接送；沿途最佳观景点已经预先选定，您的车辆等待时间已纳入安排。\n\n热气球刚刚起飞、山谷逐渐明亮的清晨——或是一天的疲惫让位于神奇光影盛宴的傍晚。两者各有不同，两者皆是非凡。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/balloon-2.avif",
      highlights: ["全景观景台", "神奇光线"],
    },
    {
      id: 18,
      title: "陶艺工坊（阿瓦诺斯）",
      categoryKey: "art",
      duration: "2小时",
      description:
        "在红河边的阿瓦诺斯，观看陶艺大师的双手，然后亲自塑造陶土。烧制、耐心与双手完成其余的一切。",
      longDescription:
        "陶土与耐心\n\n阿瓦诺斯的陶艺传统，根植于克孜勒河的红色土壤。这条河流数百年来搬运并备就这片土地；阿瓦诺斯将塑造这片土地变成了一种传统。如今，小镇仍在运作的工坊里，在代代相传的大师们的手中，陶土在转轮上继续被塑造成型。\n\n我们的工坊体验将您带入这一传统之中。首先您将观看大师的双手——这不是一堂课，而是一次观察。然后您将亲手拿起陶土，看着转轮转动，看它变成什么。陶土抗拒急躁的双手；但一旦找到节奏，它便想要成形。\n\n完成的作品可以烧制并寄送到您的地址。工坊结束后，留有时间喝茶和游览阿瓦诺斯。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/pottery.avif",
      highlights: ["大师指导", "亲手创作"],
    },
    {
      id: 19,
      title: "土耳其浴室体验",
      categoryKey: "wellness",
      duration: "1–2小时",
      description:
        "在历史悠久的土耳其浴室中，用泡沫、蒸汽和温暖净化身心。不仅是身体——思绪也得到休息。这是一种仪式。",
      longDescription:
        "超越洁净\n\n土耳其浴室不是一个普通的澡堂。这一场所的历史根源延伸至安纳托利亚、罗马和拜占庭传统，它将净化身体升华为一种仪式。穿过中央圆顶散落而下的柔和光线、大理石地板的温热、蒸汽与泡沫——这一切共同作用，让您脱离日常生活的紧张，进入另一个时间维度。\n\n搓澡巾按摩和泡沫推拿使肌肉深度放松，去除皮肤的老化角质。护理结束后，身体和心灵都会感受到一种难以言说的轻盈。这种感觉难以用语言形容，但一旦体验过便会感到熟悉。\n\n在经验丰富的浴室服务员陪同下，于历史悠久的浴室建筑中进行这一体验，或许是您卡帕多西亚之旅中最宁静、最净化身心的时刻。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc: "/images/activities/turkish-hammam.avif",
      highlights: ["传统搓澡", "彻底放松"],
    },
    {
      id: 20,
      title: "复古经典车与热气球摄影",
      categoryKey: "art",
      duration: "2–3小时",
      description:
        "在卡帕多西亚古老天空中漂浮的气球下，伴着一辆从历史中走出的经典老车——不只是一张照片，而是一首诗。",
      longDescription:
        "时光之外\n\n一辆1950年代的经典老车，静立于仙烟囱之间。背景中，热气球在天空中漂浮。光线恰到好处，画面已然成型——这幅图像是一个跨越时光的构图，将卡帕多西亚的古老纹理与二十世纪中叶融为一体。\n\n这次摄影体验以专业成果为目标，却从不刻板。在选定的地点，车辆与气球共同就位；在光线最佳的时段进行拍摄。无论是作为情侣、家庭还是独自一人——每一张都讲述不同的故事。\n\n地点事先确定；提供造型建议；可根据您的偏好与经验丰富的摄影师合作完成拍摄。当天结束时，您手中拥有的不只是假期照片，而是多年后再次翻看仍能触动同样情感的画面。\n\n如需旅游行程及预订信息，请通过WhatsApp或电子邮件与我们联系。",
      imageSrc:
        "/images/activities/Vintage%20Classic%20Car%20%26%20Balloon%20Photoshoot.avif",
      highlights: ["复古经典车", "热气球背景"],
    },
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ExperiencesGrid({ locale = "tr" }: { locale?: string }) {
  const [selectedKey, setSelectedKey] = useState<CategoryKey>("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const labels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.tr;
  const experiences = EXPERIENCES[locale] ?? EXPERIENCES.tr;
  const gridTitle = GRID_TITLE[locale] ?? GRID_TITLE.tr;
  const ctaLabel = CTA_LABEL[locale] ?? CTA_LABEL.tr;
  const modalClose = MODAL_CLOSE[locale] ?? MODAL_CLOSE.tr;
  const modalContact = MODAL_CONTACT[locale] ?? MODAL_CONTACT.tr;
  const modalNav = MODAL_NAV[locale] ?? MODAL_NAV.tr;

  const filtered =
    selectedKey === "all"
      ? experiences
      : experiences.filter((e) => e.categoryKey === selectedKey);

  // Keyboard navigation for modal
  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowRight")
        setModalIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));
      if (e.key === "ArrowLeft")
        setModalIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, filtered.length]);

  // Body scroll lock when modal is open
  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalIndex]);

  return (
    <>
      {/* ── E1: Category Filter ──────────────────────────────────────── */}
      <section className="bg-surface pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap gap-2.5">
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selectedKey === key
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-black/10 bg-white/50 text-neutral-700 hover:bg-white/80",
                ].join(" ")}
              >
                {labels[key]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── E2: Experience Cards ─────────────────────────────────────── */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-ink mb-10 md:mb-12">
              {gridTitle}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {filtered.map((exp, i) => (
              <Reveal key={exp.id} delayMs={i * 70}>
                <article
                  className="rounded-2xl border border-black/5 bg-white/45 overflow-hidden group cursor-pointer"
                  onClick={() => setModalIndex(i)}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] bg-stone-200 overflow-hidden">
                    <ParallaxImage
                      src={exp.imageSrc}
                      alt={exp.title}
                      className="absolute inset-0 w-full h-full"
                      strength={12}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category + Duration */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-xs tracking-[0.12em] uppercase text-neutral-500">
                        {labels[exp.categoryKey]}
                      </span>
                      <span className="text-neutral-300 select-none">·</span>
                      <span className="text-xs text-neutral-500">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-serif font-light tracking-tight text-ink mb-3 leading-snug">
                      {exp.title}
                    </h3>

                    {/* Short description — always shown on card */}
                    <p className="text-sm text-neutral-700 leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Highlight pills */}
                    {exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs text-neutral-600"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href="#planlama"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-neutral-500 hover:text-ink transition-colors"
                    >
                      {ctaLabel}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalIndex !== null && (() => {
          const exp = filtered[modalIndex];
          if (!exp) return null;
          const hasPrev = filtered.length > 1;
          const hasNext = filtered.length > 1;
          return (
            <motion.div
              key="modal-backdrop"
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setModalIndex(null)}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                const dy = e.changedTouches[0].clientY - touchStartY.current;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                  if (dx > 0)
                    setModalIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
                  else
                    setModalIndex((i) => i !== null ? (i + 1) % filtered.length : 0);
                }
              }}
            >
              <motion.div
                className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-white sm:rounded-2xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setModalIndex(null)}
                  aria-label={modalClose}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth={2} strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Modal image */}
                <div className="relative w-full aspect-[16/9] bg-stone-200 overflow-hidden sm:rounded-t-2xl">
                  <ParallaxImage
                    src={exp.imageSrc}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full"
                    strength={8}
                  />
                  {/* Prev / Next arrows on image */}
                  {hasPrev && (
                    <button
                      type="button"
                      aria-label={modalNav.prev}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {hasNext && (
                    <button
                      type="button"
                      aria-label={modalNav.next}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalIndex((i) => i !== null ? (i + 1) % filtered.length : 0);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>

                {/* Modal content */}
                <div className="p-6 md:p-8">
                  {/* Category + Duration + Counter */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs tracking-[0.12em] uppercase text-neutral-500">
                      {labels[exp.categoryKey as CategoryKey]}
                    </span>
                    <span className="text-neutral-300 select-none">·</span>
                    <span className="text-xs text-neutral-500">{exp.duration}</span>
                    <span className="ml-auto text-xs text-neutral-400 tabular-nums">
                      {modalIndex + 1} / {filtered.length}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-ink mb-6 leading-snug">
                    {exp.title}
                  </h2>

                  {/* Description paragraphs */}
                  <div className="space-y-4 mb-8">
                    {(exp.longDescription ?? exp.description)
                      .split("\n\n")
                      .map((para: string, idx: number) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? "text-base font-medium text-ink leading-relaxed"
                              : "text-sm text-neutral-700 leading-relaxed"
                          }
                        >
                          {para}
                        </p>
                      ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/905444946814"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.353-1.497A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.213-3.728.878.944-3.637-.234-.373A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
                    </svg>
                    {modalContact}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
