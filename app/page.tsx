'use client';

import React, { useState, useEffect } from 'react';
import { LabHeader } from '@/components/LabHeader';
import { PlayableHero } from '@/components/PlayableHero';
import { BenchExperiments } from '@/components/BenchExperiments';
import { AutomationWild } from '@/components/AutomationWild';
import { ShippedShelf } from '@/components/ShippedShelf';
import { LabNotesSection } from '@/components/LabNotesSection';
import { PeopleSection } from '@/components/PeopleSection';
import { BringAProblem } from '@/components/BringAProblem';
import { LabFooter } from '@/components/LabFooter';
import { CommandBar } from '@/components/CommandBar';

export default function HomePage() {
  const [currentTheme, setCurrentTheme] = useState<'notebook' | 'playground' | 'signal'>('notebook');
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    // Apply data-theme to document element
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (newTheme: 'notebook' | 'playground' | 'signal') => {
    setCurrentTheme(newTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-paper) text-(--text-ink) transition-colors selection:bg-amber-200 selection:text-slate-900">
      
      {/* Top 3-Zone Navigation with Audio & Direction Controls */}
      <LabHeader
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        {/* Moment 1: Entry — The Playable Hero Physics Scene */}
        <PlayableHero />

        {/* Moment 2: On The Bench — Experiments, Failures & Benchmarks */}
        <BenchExperiments />

        {/* Moment 3: Shelf of Shipped Things & Live Developer Tools */}
        <ShippedShelf />

        {/* Moment 4: Lab Notes — Research Findings & Postmortems */}
        <LabNotesSection />

        {/* Moment 5: Automation in the Wild — Moving Workflow Diagram */}
        <AutomationWild />

        {/* Moment 6: The People — Studio Facts & Lab Clock */}
        <PeopleSection />

        {/* Moment 7: Bring Us A Problem — Two Doors In */}
        <BringAProblem />
      </main>

      {/* Moment 8: Footer as a Toy — Availability, Sound & Easter Egg */}
      <LabFooter
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Global Command Bar & Terminal Overlay (/ or Cmd+K) */}
      <CommandBar
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

    </div>
  );
}
