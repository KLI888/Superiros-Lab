'use client';

import React from 'react';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { ArrowRight, Building2, Lightbulb } from 'lucide-react';

export function BringAProblem() {
  return (
    <section id="start" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) lab-grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">START A CONVERSATION</span>
            <span className="text-xs text-(--text-muted) font-sans">Two Simple Ways In</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
            Talk to the studio about your problem.
          </h2>
          <p className="text-sm sm:text-base text-(--text-muted) mt-2 font-normal">
            We don’t pitch generic retainers. We look at where your business loses time or where your software breaks, and we build the solution. Choose your starting door below:
          </p>
        </div>

        {/* The Two Doors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Door 1: I run a business */}
          <Link
            href="/start?door=business"
            onClick={() => sound.playPop()}
            className="group p-6 sm:p-8 rounded-xl border border-(--border-rule) bg-(--bg-card) hover:border-(--signal-hot) transition-all shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <span className="tape-strip -top-3 left-6 w-20" />

            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>

              <span className="text-xs text-(--signal-hot) font-bold block mb-1 font-sans">
                DOOR 01 · OPERATIONS & AUTOMATION
              </span>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-(--text-ink) mb-3">
                &ldquo;I run a business&rdquo;
              </h3>

              <p className="text-sm text-(--text-muted) leading-relaxed mb-6 font-normal">
                You have operational bottlenecks: team members copying data between messages and spreadsheets, missed customer inquiries, or slow paper-based intake.
              </p>
            </div>

            <div className="pt-4 border-t border-(--border-rule) flex items-center justify-between text-xs font-semibold text-(--text-ink) group-hover:text-(--signal-hot) transition-colors font-sans">
              <span>Open 3-minute operational brief</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Door 2: I have an idea */}
          <Link
            href="/start?door=idea"
            onClick={() => sound.playPop()}
            className="group p-6 sm:p-8 rounded-xl border border-(--border-rule) bg-(--bg-card) hover:border-(--signal-accent) transition-all shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <span className="tape-strip -top-3 right-6 w-20" />

            <div>
              <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-700 mb-6 group-hover:scale-105 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>

              <span className="text-xs text-(--signal-accent) font-bold block mb-1 font-sans">
                DOOR 02 · NEW PRODUCTS & SOFTWARE
              </span>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-(--text-ink) mb-3">
                &ldquo;I have an idea&rdquo;
              </h3>

              <p className="text-sm text-(--text-muted) leading-relaxed mb-6 font-normal">
                You are a founder or product leader wanting to prototype, test, and launch a real web application, mobile tablet tool, or intelligent internal system.
              </p>
            </div>

            <div className="pt-4 border-t border-(--border-rule) flex items-center justify-between text-xs font-semibold text-(--text-ink) group-hover:text-(--signal-accent) transition-colors font-sans">
              <span>Open 3-minute product brief</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* Ways of working together */}
        <div className="p-6 sm:p-8 rounded-xl bg-(--bg-card) border border-(--border-rule)">
          <span className="text-xs text-(--text-muted) block mb-4 font-semibold font-sans">
            HOW WE PARTNER WITH TEAMS:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div>
              <strong className="font-display text-(--text-ink) block text-sm mb-1">
                01. Full-Stack Product Build
              </strong>
              <p className="text-(--text-muted) leading-relaxed font-normal">
                End-to-end design and engineering of custom web, tablet, or mobile software from scratch with strict reliability targets.
              </p>
            </div>

            <div>
              <strong className="font-display text-(--text-ink) block text-sm mb-1">
                02. Workflow Automation
              </strong>
              <p className="text-(--text-muted) leading-relaxed font-normal">
                Connecting customer messaging, scheduling, and document extraction directly into your existing databases and operations.
              </p>
            </div>

            <div>
              <strong className="font-display text-(--text-ink) block text-sm mb-1">
                03. Technical Feasibility Sprints
              </strong>
              <p className="text-(--text-muted) leading-relaxed font-normal">
                A 2-week rigorous investigation into model feasibility, local hardware speed, or data privacy before committing large budgets.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
