"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Header2026() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // next-intl usePathname returns path WITHOUT locale prefix (e.g. "/blog/...")
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Koyu (solid) header: scroll edildiyse VEYA ana sayfa değilse
  const isDark = scrolled || !isHomePage;

  const NAV = [
    { href: "/" as const, label: t("home") },
    { href: "/rooms" as const, label: t("rooms") },
    { href: "/experiences" as const, label: t("experiences") },
    { href: "/activities" as const, label: t("activities") },
    { href: "/gallery" as const, label: t("gallery") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

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
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        Skip to main content
      </a>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isDark
            ? "backdrop-blur-md bg-surface/80 border-b border-line"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={["flex items-center justify-between transition-all duration-300", isDark ? "h-16" : "h-20"].join(" ")}>
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-34 w-34 flex-shrink-0">
                <Image
                  src="/images/logo.avif"
                  alt="Anitya Cave House Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav lang="en" className="hidden lg:flex items-center gap-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative text-sm whitespace-nowrap transition-colors group",
                    isDark ? "text-ink-2 hover:text-ink" : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  <span className={[
                    "absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300",
                    isDark ? "bg-ink" : "bg-white",
                  ].join(" ")} />
                </Link>
              ))}
            </nav>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="hidden md:flex items-center gap-2">
                <Link className={["text-xs transition-colors", isDark ? "text-ink-2 hover:text-ink" : "text-white/70 hover:text-white"].join(" ")} href={pathname} locale="tr">
                  TR
                </Link>
                <span className={isDark ? "text-line" : "text-white/30"}>•</span>
                <Link className={["text-xs transition-colors", isDark ? "text-ink-2 hover:text-ink" : "text-white/70 hover:text-white"].join(" ")} href={pathname} locale="en">
                  EN
                </Link>
                <span className={isDark ? "text-line" : "text-white/30"}>•</span>
                <Link className={["text-xs transition-colors", isDark ? "text-ink-2 hover:text-ink" : "text-white/70 hover:text-white"].join(" ")} href={pathname} locale="zh">
                  中文
                </Link>
              </div>

              <Link
                href="/booking"
                className={[
                  "hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium whitespace-nowrap transition",
                  isDark
                    ? "bg-ink text-white hover:bg-ink/90"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white/15 backdrop-blur",
                ].join(" ")}
              >
                {t("booking")}
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center rounded-md border border-line bg-surface/70 px-3 py-2 text-sm text-ink hover:bg-surface transition"
                aria-label="Menu"
              >
                ☰
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
                Anitya
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink"
              >
                ✕
              </button>
            </div>

            <nav lang="en" className="mt-6 space-y-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-ink-2 hover:text-ink transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex items-center gap-3">
              <Link className="text-xs text-ink-2 hover:text-ink transition" href={pathname} locale="tr">
                TR
              </Link>
              <Link className="text-xs text-ink-2 hover:text-ink transition" href={pathname} locale="en">
                EN
              </Link>
              <Link className="text-xs text-ink-2 hover:text-ink transition" href={pathname} locale="zh">
                中文
              </Link>
            </div>

            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-ink text-white px-5 py-3 text-sm font-medium hover:bg-ink/90 transition"
            >
              {t("booking")}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
