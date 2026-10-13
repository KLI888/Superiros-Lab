'use client';

import React, { useState } from 'react';
import { LAB_NOTES } from '@/lib/lab-data';
import { sound } from '@/lib/sound';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function LabNotesSection() {
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(LAB_NOTES[0].id);

  const toggleNote = (id: string) => {
    sound.playPop();
    setExpandedNoteId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="notes" className="py-16 sm:py-24 border-b border-(--border-rule) bg-(--bg-paper) lab-grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="lab-stamp">FIELD JOURNAL</span>
            <span className="text-xs text-(--text-muted) font-sans">Research Findings & Postmortems</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-(--text-ink) tracking-tight">
            Studio notes: honest findings & what broke.
          </h2>
          <p className="text-sm sm:text-base text-(--text-muted) max-w-2xl mt-2 font-normal">
            We write down our findings, failures, and architectural decisions. Real observations from high-velocity production systems, not recycled thought leadership.
          </p>
        </div>

        {/* Pinned Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {LAB_NOTES.map((note) => {
            const isExpanded = expandedNoteId === note.id;

            return (
              <article
                key={note.id}
                className={`bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 relative transition-all shadow-xs ${
                  isExpanded ? 'ring-2 ring-(--signal-hot)/30 shadow-md' : 'hover:border-slate-400'
                }`}
              >
                {/* Pin mark */}
                <div className="absolute -top-3 left-6 w-3 h-3 rounded-full bg-(--signal-hot) shadow-xs flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>

                {/* Metadata as unboxed text */}
                <div className="flex items-center gap-2 text-xs font-mono-lab text-(--text-muted) mb-3 pt-1">
                  <span>{note.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-(--signal-hot) font-medium font-sans">{note.category}</span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-(--text-ink) leading-snug mb-3">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-(--text-muted) leading-relaxed mb-4 font-normal">
                  {note.summary}
                </p>

                {/* Core takeaway callout */}
                <div className="p-3.5 rounded-lg bg-black/2 border border-(--border-rule) text-xs mb-4 font-sans">
                  <span className="font-bold text-(--text-ink) block mb-1">
                    KEY TAKEAWAY:
                  </span>
                  <p className="text-(--text-muted) leading-relaxed italic">
                    &ldquo;{note.takeaway}&rdquo;
                  </p>
                </div>

                {/* Expandable full note content */}
                {isExpanded && (
                  <div className="pt-4 border-t border-(--border-rule) space-y-2.5 text-xs sm:text-sm text-(--text-ink) leading-relaxed font-normal">
                    {note.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleNote(note.id)}
                  className="mt-4 pt-2 w-full flex items-center justify-between text-xs font-semibold text-(--signal-hot) hover:underline border-t border-(--border-rule) font-sans"
                >
                  <span>{isExpanded ? 'Collapse Field Note' : 'Read Full Field Note'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
