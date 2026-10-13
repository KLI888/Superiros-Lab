'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { Volume2, VolumeX, Terminal, ArrowUp, Palette } from 'lucide-react';

interface LabFooterProps {
  onOpenTerminal?: () => void;
  currentTheme?: string;
  onThemeChange?: (theme: 'notebook' | 'playground' | 'signal') => void;
}

export function LabFooter({ onOpenTerminal, currentTheme = 'notebook', onThemeChange }: LabFooterProps) {
  const [soundActive, setSoundActive] = useState(() => sound.enabled);
  const [utcTime, setUtcTime] = useState('');
  const [eggFired, setEggFired] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const handleEasterEgg = () => {
    sound.playPop();
    setEggFired(true);
    setTimeout(() => setEggFired(false), 3000);
    if (onOpenTerminal) {
      onOpenTerminal();
    }
  };

  const scrollToTop = () => {
    sound.playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-(--border-rule) bg-(--bg-paper) py-12 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row: Brand, availability note, quick links, toys */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-(--border-rule) items-start">
          
          <div className="md:col-span-5">
            <Link
              href="/"
              onClick={() => sound.playTick()}
              className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-(--text-ink) block mb-3 hover:opacity-90 transition-opacity"
            >
              Superiors<span className="text-(--signal-hot)">.</span>Lab
            </Link>
            <p className="text-xs sm:text-sm text-(--text-muted) max-w-sm mb-4 font-normal">
              An applied AI research, workflow automation, and custom software studio building reliable digital systems for real businesses.
            </p>

            {/* Availability Note */}
            <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-(--bg-card) border border-(--border-rule) text-xs font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-(--text-ink) font-semibold">Availability:</span>
              <span className="text-(--text-muted)">Booking builds for Q2 2026</span>
            </div>
          </div>

          {/* Middle 4 cols: Quick navigation links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <span className="text-(--text-ink) font-bold block mb-2 font-display">WHAT WE DO</span>
              <ul className="space-y-1.5 text-(--text-muted)">
                <li><Link href="/#bench" className="hover:text-(--text-ink)">01. Research Bench</Link></li>
                <li><Link href="/#automations" className="hover:text-(--text-ink)">02. Automations</Link></li>
                <li><Link href="/#shelf" className="hover:text-(--text-ink)">03. Launched Products</Link></li>
                <li><Link href="/#shelf" className="hover:text-(--text-ink)">04. Quality Tools</Link></li>
              </ul>
            </div>
            <div>
              <span className="text-(--text-ink) font-bold block mb-2 font-display">THE STUDIO</span>
              <ul className="space-y-1.5 text-(--text-muted)">
                <li><Link href="/notes" className="hover:text-(--text-ink)">Studio Journal</Link></li>
                <li><Link href="/products" className="hover:text-(--text-ink)">All Products</Link></li>
                <li><Link href="/about" className="hover:text-(--text-ink)">About the Studio</Link></li>
                <li><Link href="/start" className="text-(--signal-hot) font-bold hover:underline">Start a Brief</Link></li>
              </ul>
            </div>
          </div>

          {/* Right 3 cols: Toy controls */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-3 text-xs font-sans">
            <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-rule) text-left w-full sm:w-auto">
              <span className="text-[10px] text-(--text-muted) block">LAB BENCH TIME</span>
              <span className="font-display font-bold text-sm text-(--text-ink) tabular-nums">
                {utcTime || '12:00:00 UTC'}
              </span>
            </div>

            {/* Theme switcher in footer */}
            {onThemeChange && (
              <div className="flex items-center p-0.5 rounded-lg border border-(--border-rule) bg-(--bg-card) text-xs">
                <button
                  type="button"
                  onClick={() => { sound.playPop(); onThemeChange('notebook'); }}
                  className={`px-2 py-1 rounded transition-colors ${currentTheme === 'notebook' ? 'bg-black/5 text-slate-900 font-bold' : 'text-(--text-muted)'}`}
                >
                  Notebook
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playPop(); onThemeChange('playground'); }}
                  className={`px-2 py-1 rounded transition-colors ${currentTheme === 'playground' ? 'bg-black/5 text-slate-900 font-bold' : 'text-(--text-muted)'}`}
                >
                  Playground
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playPop(); onThemeChange('signal'); }}
                  className={`px-2 py-1 rounded transition-colors ${currentTheme === 'signal' ? 'bg-black/5 text-slate-900 font-bold' : 'text-(--text-muted)'}`}
                >
                  Signal
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="px-3 py-1.5 rounded-lg border border-(--border-rule) bg-(--bg-card) hover:bg-black/5 flex items-center gap-1.5 text-(--text-muted) transition-colors"
                title="Toggle Web Audio"
              >
                {soundActive ? <Volume2 className="w-3.5 h-3.5 text-(--signal-hot)" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>Sound: {soundActive ? 'On' : 'Off'}</span>
              </button>

              {/* Secret Studio Terminal Trigger */}
              <button
                type="button"
                onClick={handleEasterEgg}
                className="p-1.5 rounded-lg border border-(--border-rule) bg-(--bg-card) hover:border-(--signal-hot) text-(--text-muted) transition-colors"
                title="Studio Terminal"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>

              {/* Back to top */}
              <button
                type="button"
                onClick={scrollToTop}
                className="p-1.5 rounded-lg border border-(--border-rule) bg-(--bg-card) hover:bg-black/5 text-(--text-muted) transition-colors"
                title="Back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {eggFired && (
              <span className="text-[11px] text-(--signal-hot) font-bold animate-bounce font-sans">
                ★ Terminal opened.
              </span>
            )}
          </div>

        </div>

        {/* Bottom copyright & clean refined footer text */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-(--text-muted)">
          <div>
            © 2019–{new Date().getFullYear()} Superiors Technology. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Research</span>
            <span aria-hidden="true">·</span>
            <span>Automation</span>
            <span aria-hidden="true">·</span>
            <span>Software</span>
            <span aria-hidden="true">·</span>
            <span className="text-(--text-ink) font-medium">Applied Systems</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
