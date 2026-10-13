'use client';

import React, { useState } from 'react';
import { LAB_EXPERIMENTS } from '@/lib/lab-data';
import { sound } from '@/lib/sound';
import { AlertCircle, CheckCircle2, Check, ArrowRight } from 'lucide-react';

export function BenchExperiments() {
  const [selectedExpId, setSelectedExpId] = useState<string>(LAB_EXPERIMENTS[0].id);
  const [interactiveMode, setInteractiveMode] = useState<'raw' | 'ocr' | 'vision'>('vision');
  const [quantMode, setQuantMode] = useState<'8bit' | '4bit_awq'>('4bit_awq');
  const [latencyPipeline, setLatencyPipeline] = useState<'legacy_rest' | 'streaming_ws'>('streaming_ws');

  const selectedExp = LAB_EXPERIMENTS.find((e) => e.id === selectedExpId) || LAB_EXPERIMENTS[0];

  return (
    <section id="bench" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="lab-stamp">PROVING WHAT WORKS</span>
            <span className="text-xs text-(--text-muted) font-sans">
              Verified Testing & Honest Findings
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
            Testing what breaks before businesses bet on it.
          </h2>
          <p className="text-sm sm:text-base text-(--text-muted) max-w-2xl mt-2 font-normal">
            Before we recommend a system or build software for a client, we stress-test it rigorously. Here are our active tests, genuine failures, and working findings.
          </p>
        </div>

        {/* Experiment Selector Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedExpId(exp.id);
                }}
                className={`text-left p-4 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-(--signal-hot) bg-(--bg-card) shadow-xs'
                    : 'border-(--border-rule) bg-(--bg-card)/60 hover:border-slate-400'
                }`}
              >
                {isSelected && (
                  <span className="tape-strip -top-3 left-4 w-16" />
                )}

                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-(--signal-hot) font-semibold">{exp.category}</span>
                  <span className="text-(--text-muted)">{exp.startDate} · {exp.status}</span>
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-(--text-ink) leading-snug line-clamp-2">
                  {exp.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Experiment Detailed Card */}
        <div className="bg-(--bg-card) rounded-xl border border-(--border-rule) p-5 sm:p-8 shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Cols: Context, Failure Note, Finding */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-sans">
                  <span className="font-bold text-(--text-ink)">{selectedExp.category}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-(--text-muted)">Status: {selectedExp.status}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-emerald-700 font-semibold">Verified in Production</span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-(--text-ink) mb-4">
                  {selectedExp.title}
                </h3>

                <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed mb-6 font-normal">
                  {selectedExp.summary}
                </p>

                {/* What Failed First */}
                <div className="p-4 rounded-lg bg-amber-500/8 border border-amber-500/25 mb-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1 font-sans">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>WHAT FAILED INITIALLY:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-(--text-ink) leading-relaxed">
                    {selectedExp.failureNote}
                  </p>
                </div>

                {/* The Working Finding */}
                <div className="p-4 rounded-lg bg-emerald-500/8 border border-emerald-500/25 mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WHAT WORKED IN PRODUCTION:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-(--text-ink) leading-relaxed">
                    {selectedExp.finding}
                  </p>
                </div>
              </div>

              {/* Technologies as clean unboxed text */}
              <div className="pt-4 border-t border-(--border-rule) flex flex-wrap items-center gap-2 text-xs text-(--text-muted) font-sans">
                <span className="text-(--text-ink) font-semibold">Technologies:</span>
                {selectedExp.technologies.map((item, idx) => (
                  <span key={item}>
                    {item}
                    {idx < selectedExp.technologies.length - 1 && <span className="ml-2 text-slate-300">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Visual Outcome Demonstration */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-black/2 rounded-lg p-5 border border-(--border-rule)">
              
              <div>
                <div className="flex items-center justify-between text-xs font-sans text-(--text-muted) mb-3">
                  <span className="font-semibold text-(--text-ink)">LIVE OUTCOME COMPARISON</span>
                  <span className="text-(--signal-hot) font-medium">Interactive</span>
                </div>

                {/* Interactive Simulator: Document OCR */}
                {selectedExp.id === 'exp-ocr-marathi' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 p-1 rounded-md bg-(--bg-paper) border border-(--border-rule) text-xs font-sans">
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setInteractiveMode('raw'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${interactiveMode === 'raw' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Sample Slip
                      </button>
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setInteractiveMode('ocr'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${interactiveMode === 'ocr' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Standard Reader
                      </button>
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setInteractiveMode('vision'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${interactiveMode === 'vision' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Superiors System
                      </button>
                    </div>

                    <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule) text-xs min-h-[170px] overflow-auto">
                      {interactiveMode === 'raw' && (
                        <div className="text-slate-700 space-y-2">
                          <p className="font-bold text-(--text-ink)">[Scanned Receipt: Degraded Paper Slip]</p>
                          <div className="p-2.5 bg-black/3 rounded border border-dashed border-slate-300 space-y-1 font-sans">
                            <div className="flex justify-between"><span>Espresso (2)</span><span>$8.00</span></div>
                            <div className="flex justify-between"><span>Artisan Pastry (1)</span><span>$6.50</span></div>
                            <div className="border-t border-slate-200 pt-1 flex justify-between font-bold">
                              <span>Total Amount:</span><span>$14.50</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-amber-700">
                            * Paper crease and low-contrast ink make numbers hard for traditional software to read.
                          </p>
                        </div>
                      )}

                      {interactiveMode === 'ocr' && (
                        <div className="text-rose-700 space-y-2">
                          <p className="font-bold text-rose-800">[Standard OCR: 41% Error Rate]</p>
                          <div className="p-2.5 bg-rose-50 rounded border border-rose-200 space-y-1">
                            <div className="flex justify-between text-rose-700"><span>Espresso (?)</span><span>$8.OO (Misread)</span></div>
                            <div className="flex justify-between text-rose-700"><span>Artisan... (?)</span><span>$?.?? (Missing)</span></div>
                            <div className="border-t border-rose-200 pt-1 flex justify-between font-bold text-rose-900">
                              <span>Total:</span><span>[Unreadable]</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-rose-800">
                            ✕ Failed: Numeric zeros read as letter &quot;O&quot;; subtotals failed verification.
                          </p>
                        </div>
                      )}

                      {interactiveMode === 'vision' && (
                        <div className="text-emerald-800 space-y-2">
                          <p className="font-bold text-emerald-900">[Superiors Verification: 100% Validated]</p>
                          <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 space-y-1 font-sans">
                            <div className="flex justify-between font-medium"><span>Espresso (Qty: 2)</span><span>$8.00</span></div>
                            <div className="flex justify-between font-medium"><span>Artisan Pastry (Qty: 1)</span><span>$6.50</span></div>
                            <div className="border-t border-emerald-200 pt-1 flex justify-between font-bold text-emerald-900">
                              <span>Verified Total:</span><span>$14.50 (Match)</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-emerald-800">
                            ✓ Formatted directly into your accounting database without manual re-typing.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Interactive Simulator: On-Premise AI */}
                {selectedExp.id === 'exp-edge-mac-mini' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 p-1 rounded-md bg-(--bg-paper) border border-(--border-rule) text-xs font-sans">
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setQuantMode('8bit'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${quantMode === '8bit' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Standard Setup (Freezes)
                      </button>
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setQuantMode('4bit_awq'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${quantMode === '4bit_awq' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Superiors Tuning (Smooth)
                      </button>
                    </div>

                    <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule) text-xs min-h-[170px] flex flex-col justify-between">
                      {quantMode === '8bit' ? (
                        <div className="space-y-2 text-rose-700">
                          <div className="flex justify-between">
                            <span>Hardware Memory Usage:</span>
                            <span className="font-bold">91% (Overloaded)</span>
                          </div>
                          <div className="w-full bg-rose-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full w-[91%]" />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                            <span>Response: Noticeable 4s delays</span>
                            <span>Condition: Fan spinning loudly</span>
                          </div>
                          <p className="text-[11px] text-rose-800 pt-2 border-t border-slate-200">
                            ✕ System stalls during peak operating hours when multiple staff enter notes.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-emerald-800">
                          <div className="flex justify-between">
                            <span>Hardware Memory Usage:</span>
                            <span className="font-bold">30% (Optimal)</span>
                          </div>
                          <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full w-[30%]" />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                            <span>Response: 18 words / second</span>
                            <span>Condition: Cool and completely silent</span>
                          </div>
                          <p className="text-[11px] text-emerald-800 pt-2 border-t border-slate-200">
                            ✓ Steady performance all day on a compact local office machine. Zero patient data leaves the office.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Interactive Simulator: Voice Agent */}
                {selectedExp.id === 'exp-voice-latency' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 p-1 rounded-md bg-(--bg-paper) border border-(--border-rule) text-xs font-sans">
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setLatencyPipeline('legacy_rest'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${latencyPipeline === 'legacy_rest' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Traditional Web Bot
                      </button>
                      <button
                        type="button"
                        onClick={() => { sound.playTick(); setLatencyPipeline('streaming_ws'); }}
                        className={`flex-1 py-1 rounded text-center transition-colors ${latencyPipeline === 'streaming_ws' ? 'bg-(--bg-card) text-(--text-ink) font-bold shadow-xs' : 'text-(--text-muted)'}`}
                      >
                        Superiors Real-Time Voice
                      </button>
                    </div>

                    <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule) text-xs min-h-[170px] flex flex-col justify-between">
                      {latencyPipeline === 'legacy_rest' ? (
                        <div className="space-y-1.5 text-slate-700">
                          <div className="flex justify-between text-[11px]">
                            <span>1. Waiting for user to stop:</span>
                            <span className="text-rose-600 font-bold">850ms</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span>2. Thinking & generating text:</span>
                            <span className="text-rose-600 font-bold">920ms</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span>3. Rendering audio file:</span>
                            <span className="text-rose-600 font-bold">680ms</span>
                          </div>
                          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-rose-800">
                            <span>Awkward silence:</span>
                            <span>2.45 seconds (Callers hang up)</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 text-slate-700">
                          <div className="flex justify-between text-[11px]">
                            <span>1. Real-time phrase recognition:</span>
                            <span className="text-emerald-700 font-bold">180ms</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span>2. Instant first sentence ready:</span>
                            <span className="text-emerald-700 font-bold">220ms</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span>3. Audio streaming begins:</span>
                            <span className="text-emerald-700 font-bold">340ms</span>
                          </div>
                          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-800">
                            <span>Time to first spoken word:</span>
                            <span>0.74 seconds (Natural dialogue)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Benchmark Numbers */}
              <div className="mt-5 pt-4 border-t border-(--border-rule) grid grid-cols-3 gap-2 text-center">
                {selectedExp.metrics.map((m) => (
                  <div key={m.label} className="p-2.5 rounded bg-(--bg-card) border border-(--border-rule)">
                    <div className="font-display font-bold text-base sm:text-lg text-(--text-ink)">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-(--text-muted) truncate font-sans">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
