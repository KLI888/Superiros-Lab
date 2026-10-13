'use client';

import React from 'react';
import Link from 'next/link';
import { LabHeader } from '@/components/LabHeader';
import { LabFooter } from '@/components/LabFooter';
import { ShippedShelf } from '@/components/ShippedShelf';
import { sound } from '@/lib/sound';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
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
          <span className="font-mono-lab">STUDIO PRODUCT CATALOG</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">DELIVERED SOFTWARE</span>
            <span className="text-xs text-(--text-muted) font-sans">Active in Daily Commercial Use</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-(--text-ink) tracking-tight mb-4">
            Production software & quality tools.
          </h1>
          <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed font-normal">
            Every product in this catalog was engineered to solve an active business bottleneck in hospitality or healthcare, or to prevent formatting failures in automated workflows. No mock concepts.
          </p>
        </div>

        {/* Embedded Shipped Shelf */}
        <ShippedShelf />

        {/* Call to build custom tool */}
        <div className="mt-12 p-8 rounded-xl bg-(--bg-card) border border-(--border-rule) flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-(--signal-hot) block mb-1 font-sans">
              CUSTOM SOFTWARE & AUTOMATION
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-(--text-ink) mb-1">
              Need custom software or an automated workflow?
            </h2>
            <p className="text-sm text-(--text-muted) max-w-xl font-normal">
              We design, build, and deploy custom web platforms, mobile tools, and automated pipelines for your team&apos;s specific business operations.
            </p>
          </div>

          <Link
            href="/start"
            onClick={() => sound.playTick()}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-(--signal-hot) hover:brightness-110 rounded-lg transition-all shadow-xs flex items-center gap-2 font-sans"
          >
            Talk to the studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <LabFooter />
    </div>
  );
}
