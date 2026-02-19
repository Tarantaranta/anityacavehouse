'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { rooms } from '@/data/rooms';
import { Users, Maximize2, ArrowRight, Check, ChevronUp, ChevronDown } from 'lucide-react';

const content = {
  tr: {
    hero: {
      eyebrow: 'REZERVASYON',
      title: 'Süitinizi Seçin',
      subtitle:
        "Kapadokya'nın kalbinde, zamanın yavaşladığı bağımsız bir ev.",
    },
    select: 'Suite Seç',
    selected: 'Seçildi',
    capacity: 'kapasite',
    checkIn: 'Giriş Tarihi',
    checkOut: 'Çıkış Tarihi',
    guests: 'Misafir Sayısı',
    person: 'kişi',
    cta: 'Müsaitliği Kontrol Et',
    ctaChecking: 'Kontrol Ediliyor…',
    ctaNote: 'Airbnb takvimi ile gerçek zamanlı kontrol',
    whatsapp: 'WhatsApp ile Rezervasyon Yap',
    whatsappNote: 'Seçtiğiniz tarihler müsait! Rezervasyon için WhatsApp\'tan yazın.',
    whatsappNoteUnavailable: 'Seçtiğiniz tarihler müsait değil. Farklı tarihler deneyin.',
    nights: 'gece',
    noSuiteError: 'Lütfen bir suite seçin',
    noDatesError: 'Lütfen giriş ve çıkış tarihlerini seçin',
    availableLabel: 'Müsait',
    unavailableLabel: 'Dolu',
    checkError: 'Müsaitlik kontrol edilemedi, lütfen tekrar deneyin.',
    panelTitle: 'Tarihleri ve Misafir Sayısını Belirleyin',
    trustLine1: '12+ Yıl Airbnb Superhost',
    trustLine2: '4.86 / 5 — 1046+ Doğrulanmış Yorum',
    totalLabel: 'Toplam:',
    perNight: '/ gece',
  },
  en: {
    hero: {
      eyebrow: 'BOOK YOUR STAY',
      title: 'Choose Your Suite',
      subtitle:
        'An independent home in the heart of Cappadocia, where time slows down.',
    },
    select: 'Select Suite',
    selected: 'Selected',
    capacity: 'capacity',
    checkIn: 'Check-in Date',
    checkOut: 'Check-out Date',
    guests: 'Guests',
    person: 'guest',
    cta: 'Check Availability',
    ctaChecking: 'Checking…',
    ctaNote: 'Real-time check against Airbnb calendar',
    whatsapp: 'Book via WhatsApp',
    whatsappNote: 'These dates are available! Book directly via WhatsApp.',
    whatsappNoteUnavailable: 'These dates are not available. Please try different dates.',
    nights: 'nights',
    noSuiteError: 'Please select a suite',
    noDatesError: 'Please select check-in and check-out dates',
    availableLabel: 'Available',
    unavailableLabel: 'Not Available',
    checkError: 'Could not check availability, please try again.',
    panelTitle: 'Select Dates & Guests',
    trustLine1: '12+ Years Airbnb Superhost',
    trustLine2: '4.86 / 5 — 1046+ Verified Reviews',
    totalLabel: 'Total:',
    perNight: '/ night',
  },
  zh: {
    hero: {
      eyebrow: '预订住宿',
      title: '选择您的套房',
      subtitle:
        '卡帕多西亚心脏地带的独立居所，让时间在此放缓。',
    },
    select: '选择套房',
    selected: '已选择',
    capacity: '容量',
    checkIn: '入住日期',
    checkOut: '退房日期',
    guests: '宾客人数',
    person: '人',
    cta: '查看空房情况',
    ctaChecking: '查询中…',
    ctaNote: '与Airbnb日历实时同步核查',
    whatsapp: '通过WhatsApp预订',
    whatsappNote: '所选日期有空房！请通过WhatsApp联系预订。',
    whatsappNoteUnavailable: '所选日期无空房，请尝试其他日期。',
    nights: '晚',
    noSuiteError: '请选择一个套房',
    noDatesError: '请选择入住和退房日期',
    availableLabel: '有空房',
    unavailableLabel: '已满房',
    checkError: '无法检查空房情况，请重试。',
    panelTitle: '选择日期和宾客人数',
    trustLine1: '12年+ Airbnb超级房东',
    trustLine2: '4.86 / 5 — 1046+ 条已验证评价',
    totalLabel: '总计：',
    perNight: '/ 晚',
  },
};

interface Props {
  locale: string;
}

export default function BookingWidget({ locale }: Props) {
  const lang = (locale === 'en' || locale === 'zh') ? locale : 'tr';
  const c = content[lang];

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable' | 'error'>('idle');

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);

  const resetAvailability = () => setAvailability('idle');

  // Night count calculation
  const nightCount =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const handleCTA = async () => {
    if (!selectedRoom) {
      setError(c.noSuiteError);
      document.getElementById('suite-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!checkIn || !checkOut) {
      setError(c.noDatesError);
      return;
    }
    setError('');
    setAvailability('checking');
    try {
      const res = await fetch(
        `/api/calendar/availability?roomId=${selectedRoom}&checkIn=${checkIn}&checkOut=${checkOut}`
      );
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setAvailability(data.isAvailable ? 'available' : 'unavailable');
    } catch {
      setAvailability('error');
    }
  };

  const buildWhatsAppMessage = () => {
    if (!selectedRoomData) return '';
    const name = selectedRoomData.name[lang as 'tr' | 'en' | 'zh'];
    const messages = {
      tr: `Merhaba, ${name} için ${checkIn} - ${checkOut} tarihleri arasında ${guests} kişi için rezervasyon yapmak istiyorum.`,
      en: `Hello, I would like to make a reservation for ${name} from ${checkIn} to ${checkOut} for ${guests} guest(s).`,
      zh: `您好，我想预订 ${name}，入住日期 ${checkIn}，退房日期 ${checkOut}，共 ${guests} 位宾客。`,
    };
    return encodeURIComponent(messages[lang as 'tr' | 'en' | 'zh']);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cappadocia-ortahisar-castle.avif"
            alt="Anitya Cave House"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-light">
              {c.hero.eyebrow}
            </p>
            <h1 className="font-serif font-light text-white leading-[1.1] mb-4">
              {c.hero.title}
            </h1>
            <p className="text-white/60 font-light text-lg max-w-md leading-relaxed">
              {c.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────────────────────── */}
      <div className="bg-stone-900 text-white/70 text-xs tracking-[0.2em] uppercase py-3 px-6 flex items-center justify-center gap-8 font-light">
        <span>★ {c.trustLine2}</span>
        <span className="text-white/30 hidden sm:inline">·</span>
        <span className="hidden sm:inline">{c.trustLine1}</span>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">

          {/* Left: Suite Selection */}
          <div id="suite-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              {rooms.map((room, i) => {
                const isSelected = selectedRoom === room.id;
                const roomName = room.name[lang as 'tr' | 'en' | 'zh'];
                const roomDesc = room.shortDescription[lang as 'tr' | 'en' | 'zh'];

                return (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                    onClick={() => {
                      setSelectedRoom(room.id);
                      setError('');
                      resetAvailability();
                      if (guests > room.capacity) setGuests(room.capacity);
                    }}
                    className={[
                      'w-full text-left group overflow-hidden rounded-sm transition-all duration-500',
                      'border focus:outline-none',
                      isSelected
                        ? 'border-stone-800 shadow-[0_4px_32px_rgba(0,0,0,0.12)]'
                        : 'border-line hover:border-stone-400',
                    ].join(' ')}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative sm:w-52 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
                        <Image
                          src={room.images[0]}
                          alt={roomName}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 208px"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                              <Check className="w-5 h-5 text-stone-900" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light mb-1">
                                {room.subtitle[lang as 'tr' | 'en' | 'zh']}
                              </p>
                              <h3 className="font-serif font-light text-ink text-2xl leading-tight">
                                {roomName}
                              </h3>
                            </div>
                            {isSelected && (
                              <span className="flex-shrink-0 text-xs tracking-widest uppercase text-stone-500 border border-stone-300 px-3 py-1 rounded-full">
                                {c.selected}
                              </span>
                            )}
                          </div>
                          <p className="text-ink-2 font-light text-sm leading-relaxed mb-4">
                            {roomDesc}
                          </p>
                        </div>

                        <div className="flex items-center gap-5 text-xs text-stone-500 font-light">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {room.capacity} {c.person}
                          </span>
                          <span className="text-stone-300">·</span>
                          <span className="flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5" />
                            {room.size}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Booking Panel (sticky) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="border border-line rounded-sm bg-white shadow-soft overflow-hidden">
              {/* Panel Header */}
              <div className="bg-stone-900 text-white px-6 py-5">
                <p className="text-xs tracking-[0.25em] uppercase font-light text-white/60 mb-1">
                  {selectedRoomData
                    ? selectedRoomData.name[lang as 'tr' | 'en' | 'zh']
                    : c.hero.eyebrow}
                </p>
                <h3 className="font-serif font-light text-2xl leading-tight">
                  {c.panelTitle}
                </h3>
              </div>

              <div className="p-6 space-y-5">
                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 font-light mb-2">
                      {c.checkIn}
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && e.target.value >= checkOut) setCheckOut('');
                        setError('');
                        resetAvailability();
                      }}
                      className="w-full border border-line rounded-sm px-3 py-2.5 text-sm text-ink bg-surface focus:outline-none focus:border-stone-500 transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 font-light mb-2">
                      {c.checkOut}
                    </label>
                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setError('');
                        resetAvailability();
                      }}
                      className="w-full border border-line rounded-sm px-3 py-2.5 text-sm text-ink bg-surface focus:outline-none focus:border-stone-500 transition-colors font-light"
                    />
                  </div>
                </div>

                {/* Night count */}
                {nightCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-stone-400 font-light tracking-widest uppercase py-1"
                  >
                    {nightCount} {c.nights}
                  </motion.div>
                )}

                {/* Guest Count */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-stone-500 font-light mb-2">
                    {c.guests}
                  </label>
                  <div className="flex items-center border border-line rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="px-4 py-3 text-stone-500 hover:bg-stone-50 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center py-3 text-sm font-light text-ink">
                      {guests} {c.person}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setGuests((g) =>
                          Math.min(g + 1, selectedRoomData?.capacity ?? 6)
                        )
                      }
                      className="px-4 py-3 text-stone-500 hover:bg-stone-50 transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                  {selectedRoomData && (
                    <p className="text-xs text-stone-400 font-light mt-1.5 text-right">
                      max {selectedRoomData.capacity} {c.person}
                    </p>
                  )}
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-500 font-light"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Divider */}
                <div className="h-px bg-line" />

                {/* Availability result */}
                <AnimatePresence>
                  {(availability === 'available' || availability === 'unavailable' || availability === 'error') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {availability === 'available' && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4 mb-4">
                          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 mb-2">
                            <Check className="w-3.5 h-3.5" /> {c.availableLabel}
                          </p>
                          <p className="text-xs text-emerald-600 font-light leading-relaxed mb-3">
                            {c.whatsappNote}
                          </p>
                          <a
                            href={`https://wa.me/905444946814?text=${buildWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fbd5a] text-white text-xs tracking-widest uppercase font-medium py-3 px-4 rounded-sm transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {c.whatsapp}
                          </a>
                        </div>
                      )}
                      {availability === 'unavailable' && (
                        <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-4">
                          <p className="text-xs font-semibold text-red-600 mb-1">✕ {c.unavailableLabel}</p>
                          <p className="text-xs text-red-500 font-light leading-relaxed">
                            {c.whatsappNoteUnavailable}
                          </p>
                        </div>
                      )}
                      {availability === 'error' && (
                        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-sm p-3 mb-4">
                          {c.checkError}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleCTA}
                  disabled={availability === 'checking'}
                  className="w-full bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white text-xs tracking-[0.2em] uppercase py-4 px-6 flex items-center justify-center gap-2 transition-colors duration-300 rounded-sm group"
                >
                  {availability === 'checking' ? c.ctaChecking : c.cta}
                  {availability !== 'checking' && (
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>

                <p className="text-center text-xs text-stone-400 font-light tracking-wide">
                  {c.ctaNote}
                </p>
              </div>
            </div>

            {/* Trust signals below panel */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-400 font-light">
              <span>★★★★★</span>
              <span className="text-stone-300">·</span>
              <span>{c.trustLine2}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
