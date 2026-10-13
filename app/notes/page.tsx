'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LabHeader } from '@/components/LabHeader';
import { LabFooter } from '@/components/LabFooter';
import { LAB_NOTES } from '@/lib/lab-data';
import { sound } from '@/lib/sound';
import { ArrowLeft } from 'lucide-react';

export default function NotesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNoteId, setSelectedNoteId] = useState<string>(LAB_NOTES[0].id);

  const categories = ['All', 'Postmortem', 'Field Findings', 'Architecture'];

  const filteredNotes = activeCategory === 'All'
    ? LAB_NOTES
    : LAB_NOTES.filter((n) => n.category === activeCategory);

  const currentNote = LAB_NOTES.find((n) => n.id === selectedNoteId) || LAB_NOTES[0];

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-paper) text-(--text-ink)">
      <LabHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb / Top row */}
        <div className="flex items-center justify-between text-xs font-sans text-(--text-muted) mb-6 pb-4 border-b border-(--border-rule)">
          <Link
            href="/"
            onClick={() => sound.playTick()}
            className="flex items-center gap-1.5 hover:text-(--text-ink) transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio Overview</span>
          </Link>
          <span className="font-mono-lab">STUDIO RESEARCH ARCHIVE</span>
        </div>

        {/* Notes Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="lab-stamp">FIELD JOURNAL</span>
            <span className="text-xs text-(--text-muted) font-sans">Verified Engineering Observations</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-(--text-ink) tracking-tight mb-4">
            Studio notes & architectural postmortems.
          </h1>
          <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed font-normal">
            Written for founders and engineering teams. No recycled marketing platitudes—only what broke during production runs, how we fixed it, and the metrics we recorded.
          </p>
        </div>

        {/* Filter categories as unboxed tabs */}
        <div className="flex items-center gap-2 mb-8 text-xs font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { sound.playTick(); setActiveCategory(cat); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeCategory === cat
                  ? 'border-(--signal-hot) bg-(--bg-card) font-bold text-(--signal-hot)'
                  : 'border-(--border-rule) text-(--text-muted) hover:text-(--text-ink)'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Note List */}
          <div className="lg:col-span-5 space-y-4">
            {filteredNotes.map((note) => {
              const isSelected = note.id === selectedNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedNoteId(note.id);
                  }}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-(--signal-hot) bg-(--bg-card) shadow-xs'
                      : 'border-(--border-rule) bg-(--bg-card)/60 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono-lab text-(--text-muted) mb-2">
                    <span>{note.date}</span>
                    <span>·</span>
                    <span className="text-(--signal-hot) font-medium font-sans">{note.category}</span>
                  </div>

                  <h2 className="font-display font-bold text-base text-(--text-ink) leading-snug mb-2">
                    {note.title}
                  </h2>

                  <p className="text-xs text-(--text-muted) line-clamp-2 font-normal">
                    {note.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Note Full Manuscript */}
          <div className="lg:col-span-7 bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-10 shadow-xs relative">
            <span className="tape-strip -top-3 right-8 w-24" />

            <div className="flex items-center gap-3 text-xs font-sans text-(--text-muted) pb-4 border-b border-(--border-rule) mb-6">
              <span className="font-mono-lab">{currentNote.date}</span>
              <span>/</span>
              <span>{currentNote.readTime} read</span>
              <span>/</span>
              <span className="text-(--signal-hot) font-bold">{currentNote.category}</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) leading-tight mb-6">
              {currentNote.title}
            </h2>

            {/* Core Takeaway Box */}
            <div className="p-4 rounded-lg bg-black/3 border border-(--border-rule) mb-8 font-sans">
              <span className="text-xs font-bold text-(--signal-hot) block mb-1">
                SUMMARY & ESSENTIAL LESSON:
              </span>
              <p className="text-sm font-medium text-(--text-ink) leading-relaxed">
                {currentNote.takeaway}
              </p>
            </div>

            {/* Manuscript paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-(--text-ink) leading-relaxed font-normal">
              {currentNote.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-(--border-rule) flex items-center justify-between text-xs font-sans text-(--text-muted)">
              <span>Superiors Studio Field Journal</span>
              <Link
                href="/start"
                onClick={() => sound.playTick()}
                className="text-(--signal-hot) font-semibold hover:underline"
              >
                Discuss this research →
              </Link>
            </div>
          </div>

        </div>

      </main>

      <LabFooter />
    </div>
  );
}
