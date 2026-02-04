'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/rooms', label: t('rooms') },
    { href: '/gallery', label: t('gallery') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left - Small Logo for Mobile */}
            <Link href="/" className="flex md:hidden items-center">
              <span className="text-xl font-playfair font-bold text-amber-900">Anıtya</span>
            </Link>

            {/* Center - Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-stone-700 hover:text-amber-800 transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button asChild size="sm" className="bg-amber-700 hover:bg-amber-800 hidden md:flex">
                <Link href="/booking">{t('booking')}</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-amber-100">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-800 uppercase tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full bg-amber-700 hover:bg-amber-800">
                  <Link href="/booking">{t('booking')}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo Banner - Full Width Below Navigation */}
      <div className="relative w-full h-20 bg-gradient-to-r from-stone-100 via-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/" className="relative h-full py-2 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Anıtya Cave House Logo"
              width={1200}
              height={80}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
