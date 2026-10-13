'use client';

import React, { useState, useEffect } from 'react';
import { LAB_FACTS } from '@/lib/lab-data';
import { Globe, Clock, Check } from 'lucide-react';

export function PeopleSection() {
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const start = performance.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      setUptimeSeconds(elapsed);

      const now = new Date();
      setUtcTime(
        now.toUTCString().slice(17, 25) + ' UTC'
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUptime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <section id="people" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">THE STUDIO & PEOPLE</span>
            <span className="text-xs text-(--text-muted) font-sans">Founded August 2019</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
            An independent studio that builds things properly.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Cols: The Story & How We Work */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-(--text-ink) leading-relaxed">
            <p className="font-serif-lab text-lg sm:text-xl text-(--text-ink) leading-snug">
              Superiors Technology was founded in August 2019 by <strong>Krushna Borase</strong>. We are a tight-knit software and applied AI studio, not an agency running a 40-person sales roster.
            </p>

            <p className="text-(--text-muted) font-normal">
              We spent years building and deploying software across high-velocity operational sectors—hospitality dining rooms, medical outpatient queues, and high-frequency document workflows. When the recent wave of LLMs arrived, we saw two extremes: inflated agency hype on one side, and generic chatbots that break on real-world edge cases on the other.
            </p>

            <p className="text-(--text-muted) font-normal">
              Superiors Studio exists to do the unglamorous groundwork: testing whether local language models can run securely on local clinic hardware, finding out why OCR fails on thermal receipts, and linking reliable workflows to battle-tested relational databases.
            </p>

            {/* Core Operating Principles */}
            <div className="pt-4 border-t border-(--border-rule)">
              <h3 className="font-display font-bold text-base text-(--text-ink) mb-4">
                How we work
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule)">
                  <span className="font-bold text-xs text-(--signal-hot) block mb-1 font-sans">
                    01. Real Conditions
                  </span>
                  <p className="text-xs text-(--text-muted) leading-relaxed font-normal">
                    We test on local hardware, variable mobile connections, and real crumpled documents, not just cloud simulators.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule)">
                  <span className="font-bold text-xs text-(--signal-hot) block mb-1 font-sans">
                    02. Dependable Systems
                  </span>
                  <p className="text-xs text-(--text-muted) leading-relaxed font-normal">
                    We use AI for unstructured extraction, but reliable databases and deterministic code for business rules.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-rule)">
                  <span className="font-bold text-xs text-(--signal-hot) block mb-1 font-sans">
                    03. Focused Sprints
                  </span>
                  <p className="text-xs text-(--text-muted) leading-relaxed font-normal">
                    We never juggle twenty concurrent client requests. We take 2 to 3 serious builds and ship them cleanly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Lab Details Card & Neutral Lab Clock */}
          <div className="lg:col-span-5 bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-7 shadow-xs relative">
            <span className="tape-strip -top-3 right-6 w-24" />

            <div className="flex items-center justify-between pb-4 border-b border-(--border-rule) mb-5">
              <div>
                <span className="text-xs text-(--text-muted) block font-sans">PRESENCE</span>
                <div className="flex items-center gap-1.5 font-display font-bold text-base text-(--text-ink)">
                  <Globe className="w-4 h-4 text-(--signal-hot)" />
                  <span>Global Studio</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-(--text-muted) block font-sans">LAB BENCH CLOCK</span>
                <div className="font-display font-bold text-sm sm:text-base text-(--signal-hot) tabular-nums">
                  {utcTime || '12:00:00 UTC'}
                </div>
              </div>
            </div>

            {/* Facts list */}
            <div className="space-y-3 text-xs text-(--text-ink) mb-6 font-sans">
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-(--text-muted)">Entity:</span>
                <span className="font-bold">{LAB_FACTS.legalName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-(--text-muted)">Founded:</span>
                <span className="font-bold">August 2019</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-(--text-muted)">Founder & Lead:</span>
                <span className="font-bold">{LAB_FACTS.founder}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-(--text-muted)">Current Capacity:</span>
                <span className="font-bold text-emerald-700">Open for Q2 2026 engagements</span>
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="pt-4 border-t border-(--border-rule)">
              <span className="text-xs text-(--text-muted) block mb-2 font-semibold font-sans">
                Core Capabilities:
              </span>
              <p className="text-xs text-(--text-muted) leading-relaxed font-sans">
                Web platforms · Mobile & tablet apps · Workflow automations · Local language models · High-reliability databases
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
