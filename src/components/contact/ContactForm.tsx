'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      checkIn: (form.elements.namedItem('checkIn') as HTMLInputElement).value,
      checkOut: (form.elements.namedItem('checkOut') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || 'Bir hata oluştu.');
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setErrorMsg('Bağlantı hatası. Lütfen tekrar deneyin.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 border border-black/5 rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-serif font-light text-2xl text-neutral-900 mb-2">Mesajınız iletildi</h3>
          <p className="text-sm text-neutral-600 mb-6">En kısa sürede size geri döneceğiz.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs uppercase tracking-[0.18em] text-neutral-600 underline underline-offset-4 hover:text-neutral-800 transition-colors"
          >
            Yeni mesaj gönder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-[0.22em] text-neutral-600 mb-3">
        Mesaj gönderin
      </p>
      <h2 className="font-serif font-light text-3xl md:text-4xl text-neutral-900 mb-10">
        Size geri dönelim
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              Ad Soyad <span className="text-neutral-400 normal-case">(zorunlu)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Adınız Soyadınız"
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white/60 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              E-posta <span className="text-neutral-400 normal-case">(zorunlu)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="ornek@email.com"
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white/60 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="checkIn" className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              Giriş tarihi <span className="text-neutral-400 normal-case">(opsiyonel)</span>
            </label>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white/60 text-neutral-700 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="checkOut" className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              Çıkış tarihi <span className="text-neutral-400 normal-case">(opsiyonel)</span>
            </label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white/60 text-neutral-700 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-neutral-600">
            Mesajınız <span className="text-neutral-400 normal-case">(zorunlu)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Planlarınızı, sorularınızı veya özel taleplerinizi yazın…"
            className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white/60 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-neutral-400 transition-colors resize-none"
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3.5 rounded-full bg-neutral-900 text-white text-sm tracking-wide hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {status === 'loading' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
          </button>
          <p className="text-xs text-neutral-400">
            Verileriniz KVKK kapsamında işlenir ve üçüncü taraflarla paylaşılmaz.
          </p>
        </div>
      </form>
    </div>
  );
}
