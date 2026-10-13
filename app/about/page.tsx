'use client';

import React from 'react';
import Link from 'next/link';
import { LabHeader } from '@/components/LabHeader';
import { LabFooter } from '@/components/LabFooter';
import { PeopleSection } from '@/components/PeopleSection';
import { sound } from '@/lib/sound';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-paper) text-(--text-ink)">
      <LabHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-sans text-(--text-muted) mb-6 pb-4 border-b border-(--border-rule)">
          <Link
            href="/"
            onClick={() => sound.playTick()}
            className="flex items-center gap-1.5 hover:text-(--text-ink) transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Overview</span>
          </Link>
          <span className="font-mono-lab">STUDIO DOSSIER</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">STUDIO DOSSIER</span>
            <span className="text-xs text-(--text-muted) font-sans">Founded August 2019</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-(--text-ink) tracking-tight mb-4">
            About Superiors Studio.
          </h1>
          <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed font-normal">
            We are an independent software engineering and applied AI studio. We test new model architectures, build automated workflows, and engineer full-stack web and mobile software for real businesses.
          </p>
        </div>

        {/* Embedded People and Facts section */}
        <PeopleSection />

        {/* Deep Dive: Why We Started the Studio */}
        <div className="mt-16 bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-10 shadow-xs">
          <span className="text-xs font-bold text-(--signal-hot) block mb-2 font-sans">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) mb-6">
            Why we combine applied research and client building.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-(--text-ink) leading-relaxed font-normal">
            <p>
              Most technology agencies sell billable hours off a generic template. When generative AI accelerated, agencies rushed to promise autonomous multi-agent pipelines for everything, while academic research labs remained disconnected from daily production uptime.
            </p>
            <p>
              Superiors Studio bridges that gap. We believe the only way to build dependable AI software is to break it ourselves first:
            </p>

            <ul className="space-y-2.5 my-6 text-sm text-(--text-muted)">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-(--text-ink)">No speculative marketing:</strong> If an OCR model fails on low-contrast paper slips, we document the error rate openly rather than glossing over it.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-(--text-ink)">Deterministic foundations:</strong> We isolate generative models strictly to understanding messy human input. All monetary calculations, inventory records, and business decisions run in audited databases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-(--text-ink)">Local hardware empathy:</strong> Real clinics and restaurants don’t run on expensive cloud GPU clusters. We test efficient model quantization on accessible local office hardware.</span>
              </li>
            </ul>

            <p>
              When clients hire us, they are not hiring a layer of non-technical account managers. They work directly with Krushna and our engineering team.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-(--border-rule) flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-(--text-muted) font-sans">
              Have a workflow bottleneck you want to solve?
            </span>
            <Link
              href="/start"
              onClick={() => sound.playTick()}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-(--signal-hot) hover:brightness-110 rounded-lg transition-all shadow-xs flex items-center gap-2 font-sans"
            >
              Talk to the studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      <LabFooter />
    </div>
  );
}
