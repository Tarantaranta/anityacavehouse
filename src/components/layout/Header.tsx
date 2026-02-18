'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

// We can't use Editable here directly because of client/server component boundary
// So we'll keep Header simple for now - users can edit header elements via CSS

export function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/rooms', label: t('rooms') },
    { href: '/experiences', label: t('experiences') },
    { href: '/gallery', label: t('gallery') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-[100] w-full border-b border-white/10" id="main-header">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left (flex-1 for equal spacing) */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center" id="header-logo">
              <Image
                src="/images/header-logo.avif"
                alt="Anitya Cave House Logo"
                width={1200}
                height={912}
                className="h-24 md:h-28 w-auto drop-shadow-lg"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-6" id="header-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-gold transition-colors drop-shadow-lg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section (flex-1 for equal spacing) */}
          <div className="flex-1 flex items-center justify-end space-x-3" id="header-actions">
            <LanguageSwitcher />
            <Button asChild className="bg-gold hover:bg-gold/90 text-white hidden md:inline-flex shadow-lg">
              <Link href="/booking">{t('booking')}</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
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
          <div className="lg:hidden py-4 space-y-3 border-t border-white/10 bg-black/80 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-white/90 hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 md:hidden">
              <Button asChild className="w-full bg-gold hover:bg-gold/90 text-white">
                <Link href="/booking">{t('booking')}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
