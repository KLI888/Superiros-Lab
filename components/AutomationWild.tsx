'use client';

import React, { useState, useEffect } from 'react';
import { LAB_AUTOMATIONS } from '@/lib/lab-data';
import { sound } from '@/lib/sound';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';

export function AutomationWild() {
  const [selectedAutoIdx, setSelectedAutoIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const auto = LAB_AUTOMATIONS[selectedAutoIdx];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= auto.steps.length ? 1 : prev + 1));
      sound.playTick();
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, auto.steps.length]);

  return (
    <section id="automations" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) lab-grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="lab-stamp">PRODUCTION WORKFLOWS</span>
              <span className="text-xs text-(--text-muted) font-sans">Running Live Daily</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
              Automations in the wild.
            </h2>
            <p className="text-sm sm:text-base text-(--text-muted) max-w-xl mt-2 font-normal">
              Real businesses run on dependable, automated workflows. Here is an actual system operating continuously without human intervention.
            </p>
          </div>

          {/* Workflow Domain Selector */}
          <div className="flex items-center gap-2 bg-black/5 p-1 rounded-lg text-xs font-sans">
            {LAB_AUTOMATIONS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedAutoIdx(idx);
                  setActiveStep(1);
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  selectedAutoIdx === idx
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-(--text-muted) hover:text-(--text-ink)'
                }`}
              >
                {item.domain}
              </button>
            ))}
          </div>
        </div>

        {/* The Moving Workflow Diagram Box */}
        <div className="bg-(--bg-card) rounded-xl border border-(--border-rule) p-5 sm:p-8 shadow-xs mb-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-(--border-rule) mb-8">
            <div>
              <span className="text-xs text-(--signal-hot) font-semibold block mb-1 font-sans">
                {auto.domain} · Verified Live Workflow
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-(--text-ink)">
                {auto.title}
              </h3>
            </div>

            {/* Play/Pause controls */}
            <div className="flex items-center gap-2 text-xs font-sans">
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setIsPlaying(!isPlaying);
                }}
                className="px-3 py-1.5 rounded-lg border border-(--border-rule) flex items-center gap-1.5 hover:bg-black/5 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setActiveStep(1);
                }}
                className="p-1.5 rounded-lg border border-(--border-rule) hover:bg-black/5 transition-colors"
                title="Restart flow"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Step Strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative mb-8">
            {auto.steps.map((st) => {
              const isCurrent = activeStep === st.number;
              const isPassed = activeStep > st.number;

              return (
                <div
                  key={st.number}
                  onClick={() => {
                    sound.playTick();
                    setActiveStep(st.number);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all relative ${
                    isCurrent
                      ? 'border-(--signal-hot) bg-amber-500/5 ring-1 ring-(--signal-hot)'
                      : isPassed
                      ? 'border-emerald-600/30 bg-emerald-500/5'
                      : 'border-(--border-rule) bg-black/1 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-sans mb-2">
                    <span className={`font-bold ${isCurrent ? 'text-(--signal-hot)' : isPassed ? 'text-emerald-700' : 'text-(--text-muted)'}`}>
                      Step 0{st.number}
                    </span>
                    <span className="text-[11px] text-(--text-muted)">
                      {st.timeMs}ms
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-(--text-ink) mb-1.5">
                    {st.title}
                  </h4>

                  <p className="text-xs text-(--text-muted) leading-relaxed mb-3 font-normal">
                    {st.description}
                  </p>

                  <div className="text-[11px] text-slate-500 border-t border-(--border-rule) pt-2 flex items-center justify-between font-sans">
                    <span>{st.engine}</span>
                    {isPassed ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-(--signal-hot) animate-ping" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real Before vs After Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-(--border-rule)">
            
            <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
              <span className="text-xs font-bold text-rose-800 block mb-1 font-sans">
                BEFORE (THE MANUAL BOTTLENECK)
              </span>
              <p className="text-xs sm:text-sm text-(--text-ink) leading-relaxed">
                {auto.before}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-800 block mb-1 font-sans">
                AFTER (THE AUTOMATED OUTCOME)
              </span>
              <p className="text-xs sm:text-sm text-(--text-ink) leading-relaxed">
                {auto.after}
              </p>
            </div>

          </div>

          {/* Volume and Technologies Strip */}
          <div className="mt-6 pt-4 border-t border-(--border-rule) flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-(--text-muted)">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-(--text-ink)">Weekly Volume:</span>
              <span>{auto.throughput}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-(--text-ink) font-semibold">How it&apos;s made:</span>
              <span>{auto.technologies.join(' · ')}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
