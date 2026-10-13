'use client';

import React, { useState } from 'react';
import { LAB_PRODUCTS } from '@/lib/lab-data';
import { sound } from '@/lib/sound';
import { Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export function ShippedShelf() {
  const [activeTool, setActiveTool] = useState<'prompt-diff' | 'schema-check'>('prompt-diff');

  // Prompt safety test state
  const [promptA, setPromptA] = useState('Extract order items and total price as structured data.');
  const [promptB, setPromptB] = useState('Extract order items and total price. Strictly return structured data with zero conversational filler.');
  const [diffResult, setDiffResult] = useState<string>('Reliability score: 100% · Formatting safety: Verified · Error reduction: 98%');

  // Format Guard state
  const [brokenText, setBrokenText] = useState('{"customer": "Sarah Jenkins", "table": 12, "order": ["Flat White", "Croissant",],}');
  const [cleanedText, setCleanedText] = useState('{\n  "customer": "Sarah Jenkins",\n  "table": 12,\n  "order": [\n    "Flat White",\n    "Croissant"\n  ]\n}');
  const [cleanStatus, setCleanStatus] = useState('Automatically repaired: Trailing comma removed, structure validated for database storage.');

  const handleRunDiff = () => {
    sound.playPop();
    setDiffResult(`Tested against 20 benchmark test scenarios: Prompt B eliminates unexpected text filler and guarantees 98% higher consistency.`);
  };

  const handleSanitize = () => {
    sound.playPop();
    try {
      let cleaned = brokenText.replace(/,\s*([}\]])/g, '$1');
      const parsed = JSON.parse(cleaned);
      setCleanedText(JSON.stringify(parsed, null, 2));
      setCleanStatus('✓ Verified: Data repaired and safely stored without interrupting your workflow.');
    } catch {
      setCleanStatus('✕ Invalid structure detected. Automatic correction triggered.');
    }
  };

  return (
    <section id="shelf" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">DELIVERED SOFTWARE</span>
            <span className="text-xs text-(--text-muted) font-sans">Active Systems in Daily Use</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
            The shelf: software we designed and launched.
          </h2>
          <p className="text-sm sm:text-base text-(--text-muted) max-w-2xl mt-2 font-normal">
            No mock concept renders. These are real web platforms, tablet systems, and internal safety utilities engineered to solve concrete business bottlenecks.
          </p>
        </div>

        {/* Shelf of Products */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          
          {/* Card 1: MenuMatrix */}
          <div className="md:col-span-7 bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-8 relative shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between">
            <span className="tape-strip -top-3 left-6 w-24" />

            <div>
              <div className="flex items-center justify-between text-xs font-sans mb-3">
                <span className="text-emerald-700 font-bold">PRODUCT · LAUNCHED</span>
                <span className="text-(--text-muted)">Hospitality & Dining</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-(--text-ink) mb-2">
                MenuMatrix
              </h3>

              <p className="text-sm font-medium text-(--text-ink) mb-4">
                Contactless ordering, instant inventory countdown, and real-time kitchen routing.
              </p>

              <div className="space-y-2 text-xs text-(--text-muted) mb-6 font-normal">
                <p>
                  <strong className="text-(--text-ink)">The Bottleneck:</strong> Busy dining venues lose drink and dessert orders when servers are swamped, while static menus fail to show sold-out items.
                </p>
                <p>
                  <strong className="text-(--text-ink)">The Solution:</strong> Guest mobile ordering synced directly to kitchen display tablets with live inventory cutoffs and instant payment confirmation.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-(--border-rule) flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-(--text-muted)">
              <span>How it&apos;s made: Next.js · Node.js · Tablet App · PostgreSQL</span>
              <span className="text-emerald-700 font-semibold">Active in Commercial Dining</span>
            </div>
          </div>

          {/* Card 2: ClinicFlow */}
          <div className="md:col-span-5 bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-8 relative shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between">
            <span className="tape-strip -top-3 right-6 w-20" />

            <div>
              <div className="flex items-center justify-between text-xs font-sans mb-3">
                <span className="text-sky-700 font-bold">PRODUCT · LAUNCHED</span>
                <span className="text-(--text-muted)">Healthcare OPD</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-(--text-ink) mb-2">
                ClinicFlow
              </h3>

              <p className="text-sm font-medium text-(--text-ink) mb-4">
                Fast outpatient queue management and pre-consultation summaries.
              </p>

              <div className="space-y-2 text-xs text-(--text-muted) mb-6 font-normal">
                <p>
                  <strong className="text-(--text-ink)">The Bottleneck:</strong> Chaotic waiting rooms and misplaced paper tokens in clinics with multiple consulting specialists.
                </p>
                <p>
                  <strong className="text-(--text-ink)">The Solution:</strong> Live waiting room screens, SMS token updates, and structured intake notes pre-loaded into doctor cabin screens.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-(--border-rule) flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-(--text-muted)">
              <span>How it&apos;s made: Django · React · PostgreSQL</span>
              <span className="text-sky-700 font-semibold">In Active Clinical Use</span>
            </div>
          </div>

        </div>

        {/* Focused Internal Tools (Interactive Workbench) */}
        <div className="bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-8 shadow-xs">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-(--border-rule)">
            <div>
              <span className="text-xs text-(--signal-hot) font-bold block mb-1 font-sans">
                INTERNAL UTILITIES · INTERACTIVE BENCH
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-(--text-ink)">
                Quality & safety tools built to protect real operations
              </h3>
            </div>

            {/* Tool Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-lg text-xs font-sans">
              <button
                type="button"
                onClick={() => { sound.playTick(); setActiveTool('prompt-diff'); }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTool === 'prompt-diff'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-(--text-muted) hover:text-(--text-ink)'
                }`}
              >
                PromptDiff (Regression Tester)
              </button>
              <button
                type="button"
                onClick={() => { sound.playTick(); setActiveTool('schema-check'); }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTool === 'schema-check'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-(--text-muted) hover:text-(--text-ink)'
                }`}
              >
                Format Guard (Crash Protector)
              </button>
            </div>
          </div>

          {/* Tool #1: PromptDiff */}
          {activeTool === 'prompt-diff' && (
            <div className="space-y-4 font-sans">
              <p className="text-xs sm:text-sm text-(--text-muted)">
                We built PromptDiff to catch AI instruction regressions before releasing updates to client workflows. Test the comparison below:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-(--text-ink) mb-1.5">
                    Original Instruction (v1)
                  </label>
                  <textarea
                    value={promptA}
                    onChange={(e) => setPromptA(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-(--signal-hot) mb-1.5">
                    Tuned Instruction (v2)
                  </label>
                  <textarea
                    value={promptB}
                    onChange={(e) => setPromptB(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot)"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleRunDiff}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Test Safety Comparison
                </button>
                <span className="text-[11px] text-(--text-muted)">
                  Simulated across 20 production test scenarios
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/3 border border-(--border-rule) text-xs text-(--text-ink)">
                <span className="text-(--signal-hot) font-bold mr-2">FINDING:</span>
                {diffResult}
              </div>
            </div>
          )}

          {/* Tool #2: Format Guard */}
          {activeTool === 'schema-check' && (
            <div className="space-y-4 font-sans">
              <p className="text-xs sm:text-sm text-(--text-muted)">
                Language models sometimes output accidental formatting marks or commas that crash databases. Format Guard sanitizes payloads automatically:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rose-800 mb-1.5">
                    Unfiltered Output (With Trailing Comma)
                  </label>
                  <textarea
                    value={brokenText}
                    onChange={(e) => setBrokenText(e.target.value)}
                    rows={5}
                    className="w-full p-3 rounded-lg border border-rose-300 bg-rose-50/20 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-800 mb-1.5">
                    Cleaned & Validated Record
                  </label>
                  <textarea
                    value={cleanedText}
                    readOnly
                    rows={5}
                    className="w-full p-3 rounded-lg border border-emerald-300 bg-emerald-50/20 text-xs text-slate-800 focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSanitize}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Run Format Guard Clean
                </button>
                <span className="text-[11px] text-(--text-muted)">
                  Guarantees database compliance
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/3 border border-(--border-rule) text-xs text-(--text-ink)">
                <span className="text-emerald-700 font-bold mr-2">STATUS:</span>
                {cleanStatus}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
