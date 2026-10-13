'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '@/lib/sound';

interface LabHeaderProps {
  currentTheme?: string;
  onThemeChange?: (theme: 'notebook' | 'playground' | 'signal') => void;
  onOpenTerminal?: () => void;
}

export function LabHeader({ currentTheme = 'notebook', onThemeChange, onOpenTerminal }: LabHeaderProps) {
  const pathname = usePathname();
  const [soundOn, setSoundOn] = useState(() => sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundOn(newState);
  };

  const navLinks = [
    { label: 'Research', href: '/#bench' },
    { label: 'Automations', href: '/#automations' },
    { label: 'Products', href: '/#shelf' },
    { label: 'Journal', href: '/#notes' },
    { label: 'About', href: '/#people' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-(--bg-paper)/95 border-b border-(--border-rule) transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Pure Typographic Wordmark (Superiors.Lab) */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            onClick={() => sound.playTick()}
            className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-(--text-ink) hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Superiors<span className="text-(--signal-hot)">.</span>Lab
          </Link>
        </div>

        {/* Zone 2: Clean, airy navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-(--text-muted)">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => sound.playTick()}
                className={`transition-colors whitespace-nowrap hover:text-(--text-ink) ${
                  isActive ? 'text-(--text-ink) font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Balanced actions (Never overflows) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Subtle Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={soundOn ? 'Sound effects enabled' : 'Sound effects muted'}
            aria-label="Toggle interaction sound"
            className="p-2 rounded-lg text-(--text-muted) hover:text-(--text-ink) hover:bg-black/5 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-(--signal-hot)" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>

          {/* Primary Action Button: Compact & Guaranteed in-viewport */}
          <Link
            href="/start"
            onClick={() => sound.playTick()}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-(--signal-hot) hover:brightness-110 active:scale-98 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0"
          >
            Talk to us
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-(--text-muted) hover:text-(--text-ink) hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-(--border-rule) bg-(--bg-paper) px-4 py-4 space-y-3 font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-medium text-(--text-ink) hover:text-(--signal-hot) transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-(--border-rule)">
            <Link
              href="/start"
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(false);
              }}
              className="block w-full py-2.5 text-center text-xs font-semibold text-white bg-(--signal-hot) rounded-lg shadow-xs"
            >
              Start a project brief
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
