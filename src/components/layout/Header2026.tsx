"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "/tr", label: "Ana Sayfa" },
  { href: "/tr/rooms", label: "Odalar" },
  { href: "/tr/experiences", label: "Deneyimler" },
  { href: "/tr/gallery", label: "Galeri" },
  { href: "/tr/about", label: "Hakkımızda" },
  { href: "/tr/contact", label: "İletişim" },
];

export default function Header2026() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // body scroll lock (mobile menu)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-surface/80 border-b border-line"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={["flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20"].join(" ")}>
            {/* Left: Logo */}
            <a href="/tr" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-sm bg-ink text-white flex items-center justify-center font-serif font-light">
                A
              </div>
              <div className="leading-tight">
                <div className="font-serif text-ink tracking-wide">
                  Anıtya Cave House
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-ink-2">
                  Ortahisar • Cappadocia
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-2 hover:text-ink transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* Language (placeholder links) */}
              <div className="hidden md:flex items-center gap-2">
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/tr">
                  TR
                </a>
                <span className="text-line">•</span>
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/en">
                  EN
                </a>
                <span className="text-line">•</span>
                <a className="text-xs text-ink-2 hover:text-ink transition" href="/zh">
                  中文
                </a>
              </div>

              <a
                href="/tr/booking"
                className={[
                  "hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition",
                  scrolled
                    ? "bg-ink text-white hover:bg-ink/90"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white/15 backdrop-blur",
                ].join(" ")}
              >
                Rezervasyon
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center rounded-md border border-line bg-surface/70 px-3 py-2 text-sm text-ink hover:bg-surface transition"
                aria-label="Menu"
              >
                Menü
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface border-l border-line p-6">
            <div className="flex items-center justify-between">
              <div className="text-ink font-serif tracking-wide text-lg">
                Anıtya
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink"
              >
                Kapat
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-ink-2 hover:text-ink transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/tr">
                TR
              </a>
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/en">
                EN
              </a>
              <a className="text-xs text-ink-2 hover:text-ink transition" href="/zh">
                中文
              </a>
            </div>

            <a
              href="/tr/booking"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-ink text-white px-5 py-3 text-sm font-medium hover:bg-ink/90 transition"
            >
              Rezervasyon
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
