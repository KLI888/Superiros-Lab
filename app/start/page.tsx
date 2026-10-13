'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LabHeader } from '@/components/LabHeader';
import { LabFooter } from '@/components/LabFooter';
import { sound } from '@/lib/sound';
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Lightbulb } from 'lucide-react';

function StartBriefContent() {
  const searchParams = useSearchParams();
  const initialDoor = searchParams.get('door') === 'idea' ? 'idea' : 'business';

  const [step, setStep] = useState(1);
  const [door, setDoor] = useState<'business' | 'idea'>(initialDoor);
  const [problemDomain, setProblemDomain] = useState<string>('operations');
  const [engagementType, setEngagementType] = useState<string>('build');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receiptId, setReceiptId] = useState('SL-7291');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nextStep = () => {
    sound.playPop();
    setErrorMsg('');
    if (step === 3 && !description.trim()) {
      setErrorMsg('Please briefly describe the bottleneck or project in 1-2 sentences.');
      return;
    }
    if (step === 4) {
      if (!name.trim() || !email.trim()) {
        setErrorMsg('Please enter your name and an email address.');
        return;
      }
      setReceiptId(`SL-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
      sound.playTick();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    sound.playTick();
    setErrorMsg('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-paper) text-(--text-ink)">
      <LabHeader />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col justify-center">
        
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs font-sans text-(--text-muted) mb-8 pb-4 border-b border-(--border-rule)">
          <Link
            href="/"
            onClick={() => sound.playTick()}
            className="flex items-center gap-1.5 hover:text-(--text-ink) transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Overview</span>
          </Link>

          {!submitted && (
            <span>Step {step} of 4 · 3-Minute Project Brief</span>
          )}
        </div>

        {/* The Brief Card */}
        <div className="bg-(--bg-card) rounded-xl border border-(--border-rule) p-6 sm:p-10 shadow-xs relative">
          <span className="tape-strip -top-3 left-8 w-24" />

          {!submitted ? (
            <div>
              {/* Step 1: The Door */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="lab-stamp mb-2">QUESTION 01</span>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) tracking-tight">
                      Which door best describes your starting point?
                    </h1>
                    <p className="text-xs sm:text-sm text-(--text-muted) mt-1.5 font-normal">
                      This helps us tailor our technical recommendations to your real situation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => { sound.playTick(); setDoor('business'); }}
                      className={`text-left p-5 rounded-xl border transition-all ${
                        door === 'business'
                          ? 'border-(--signal-hot) bg-amber-500/5 ring-1 ring-(--signal-hot)'
                          : 'border-(--border-rule) hover:border-slate-400'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-amber-700 mb-3" />
                      <h2 className="font-display font-bold text-base text-(--text-ink) mb-1">
                        I run a business
                      </h2>
                      <p className="text-xs text-(--text-muted) leading-relaxed font-normal">
                        We have operational friction: dropped reservations, manual spreadsheet entry, or slow paper processing.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => { sound.playTick(); setDoor('idea'); }}
                      className={`text-left p-5 rounded-xl border transition-all ${
                        door === 'idea'
                          ? 'border-(--signal-accent) bg-sky-500/5 ring-1 ring-(--signal-accent)'
                          : 'border-(--border-rule) hover:border-slate-400'
                      }`}
                    >
                      <Lightbulb className="w-6 h-6 text-sky-700 mb-3" />
                      <h2 className="font-display font-bold text-base text-(--text-ink) mb-1">
                        I have an idea
                      </h2>
                      <p className="text-xs text-(--text-muted) leading-relaxed font-normal">
                        I am a founder or product lead wanting to build and launch a new software application, SaaS, or intelligent tool.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Primary Bottleneck / Focus */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="lab-stamp mb-2">QUESTION 02</span>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) tracking-tight">
                      {door === 'business'
                        ? 'Where is the primary operational friction?'
                        : 'What kind of software are we building?'}
                    </h1>
                    <p className="text-xs sm:text-sm text-(--text-muted) mt-1.5 font-normal">
                      Select the closest domain focus.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 font-sans">
                    {(door === 'business'
                      ? [
                          { id: 'operations', title: 'Manual Data Entry & Document Processing', sub: 'Invoices, receipts, complex paper forms, and receipt reconciliation' },
                          { id: 'messaging', title: 'Customer Chat & Inbound Inquiries', sub: 'Slow response times, missed table bookings, dropped service tickets' },
                          { id: 'internal_tool', title: 'Custom Tablet or Web Operations Tool', sub: 'Kitchen display systems, clinic triage tablets, inventory management' },
                          { id: 'other_biz', title: 'General Workflow Automation', sub: 'Connecting disparate tools and databases into smooth automated systems' },
                        ]
                      : [
                          { id: 'saas_mvp', title: 'AI-Native SaaS or Web Application', sub: 'High-speed web platforms with reliable model integration' },
                          { id: 'edge_device', title: 'On-Premise / Private AI Assistant', sub: 'Running compact models on local office machines with zero external data egress' },
                          { id: 'voice_agent', title: 'Natural Low-Latency Conversational Voice', sub: 'Sub-800ms real-time audio systems for fluid dialogue' },
                          { id: 'other_idea', title: 'Specialized Custom System', sub: 'Workflow safety, data normalization, or compliance tools' },
                        ]
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => { sound.playTick(); setProblemDomain(opt.id); }}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          problemDomain === opt.id
                            ? 'border-(--signal-hot) bg-amber-500/5 ring-1 ring-(--signal-hot)'
                            : 'border-(--border-rule) hover:border-slate-400'
                        }`}
                      >
                        <div className="font-display font-bold text-sm text-(--text-ink) mb-0.5">
                          {opt.title}
                        </div>
                        <div className="text-xs text-(--text-muted) font-normal">
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Working Mode & Problem Description */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="lab-stamp mb-2">QUESTION 03</span>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) tracking-tight">
                      Tell us the specific problem.
                    </h1>
                    <p className="text-xs sm:text-sm text-(--text-muted) mt-1.5 font-normal">
                      Specifics beat buzzwords. What is currently breaking or slowing down your team?
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-(--text-ink) mb-2 font-sans">
                      Brief summary (1–3 sentences):
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., We receive 50 scanned supplier receipts daily and staff spend 3 hours re-typing figures into our ledger. We need automated extraction with an easy review screen."
                      className="w-full p-3.5 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs sm:text-sm text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot) font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-(--text-ink) mb-2 font-sans">
                      Preferred engagement type:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                      {[
                        { id: 'build', label: 'Full Build', desc: 'End-to-end software product' },
                        { id: 'automate', label: 'Automation', desc: 'Automated daily workflow' },
                        { id: 'research', label: 'Feasibility Sprint', desc: '2-week technical test' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => { sound.playTick(); setEngagementType(item.id); }}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            engagementType === item.id
                              ? 'border-(--signal-hot) bg-(--bg-paper) font-bold text-(--signal-hot)'
                              : 'border-(--border-rule) text-(--text-muted)'
                          }`}
                        >
                          <div>{item.label}</div>
                          <div className="text-[10px] text-(--text-muted) font-normal">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Submission */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="lab-stamp mb-2">QUESTION 04</span>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) tracking-tight">
                      Where should Krushna reach you?
                    </h1>
                    <p className="text-xs sm:text-sm text-(--text-muted) mt-1.5 font-normal">
                      No automated marketing sequences. You will receive a direct reply from our lead engineer.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 font-sans">
                    <div>
                      <label className="block text-xs font-semibold text-(--text-ink) mb-1.5">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Alex Morgan"
                        className="w-full p-3 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs sm:text-sm text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-(--text-ink) mb-1.5">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., alex@company.com"
                        className="w-full p-3 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs sm:text-sm text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-(--text-ink) mb-1.5">
                        Phone / WhatsApp (optional):
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +1 415 555 2671"
                        className="w-full p-3 rounded-lg border border-(--border-rule) bg-(--bg-paper) text-xs sm:text-sm text-(--text-ink) focus:outline-none focus:ring-1 focus:ring-(--signal-hot)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {errorMsg && (
                <div className="p-3 mt-4 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-800 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-(--border-rule)">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 text-xs font-semibold text-(--text-ink) hover:bg-black/5 rounded-lg transition-colors border border-(--border-rule) font-sans"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-(--signal-hot) hover:brightness-110 rounded-lg transition-all flex items-center gap-2 shadow-xs font-sans"
                >
                  <span>{step === 4 ? 'Submit Project Brief' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="py-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="lab-stamp mb-2">RECEIPT #{receiptId}</span>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-(--text-ink) tracking-tight">
                  Brief received by the studio.
                </h1>
                <p className="text-sm text-(--text-muted) max-w-md mx-auto mt-2 font-normal">
                  Thank you, <strong>{name}</strong>. Krushna Borase reviews all inbound problem briefs directly. We will review your notes and respond to <strong>{email}</strong> within 1 business day.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-(--bg-paper) border border-(--border-rule) max-w-md mx-auto text-left text-xs font-sans space-y-1.5 text-(--text-muted)">
                <div><strong className="text-(--text-ink)">Starting Point:</strong> {door === 'business' ? 'I run a business' : 'I have an idea'}</div>
                <div><strong className="text-(--text-ink)">Focus:</strong> {problemDomain}</div>
                <div><strong className="text-(--text-ink)">Engagement:</strong> {engagementType}</div>
                <div><strong className="text-(--text-ink)">Status:</strong> Staged for founder review</div>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  onClick={() => sound.playTick()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-(--text-ink) bg-(--bg-paper) hover:bg-black/5 rounded-lg border border-(--border-rule) transition-colors font-sans"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Superiors Studio Home</span>
                </Link>
              </div>
            </div>
          )}

        </div>

      </main>

      <LabFooter />
    </div>
  );
}

export default function StartBriefPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-(--bg-paper) p-8 text-center font-sans">Loading brief...</div>}>
      <StartBriefContent />
    </Suspense>
  );
}
