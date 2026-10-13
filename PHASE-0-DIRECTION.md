# Superiors Lab — Phase 0: Direction & Architecture Document

## 0. Current Build & Anti-"AI-Generated" Audit

We audited the generic startup patterns previously identified in the prompt:
1. **Banned Pattern 1 (Dark purple gradient + orange glow)**: Eliminated. Replaced with warm archival drafting paper (`#FAF6EE`), deep ink-blue/charcoal typography (`#181E24`), and punchy vermilion/international orange accent (`#D83A1E`).
2. **Banned Pattern 2 (Inter / Geist / Space Grotesk defaults)**: Eliminated. Selected characterful display face **Bricolage Grotesque**, editorial lab serif **Fraunces**, and tabular monospace **DM Mono**.
3. **Banned Pattern 3 (Uniform bento grids & pill chips)**: Eliminated. Metadata rendered unboxed with subtle typographic `·` separators. Asymmetrical broken grid rhythm, hand-drawn tape strips, stamps, and physical card margins.
4. **Banned Pattern 4 (Fake status flags & mock telemetry tickers)**: Eliminated. Strictly zero fake telemetry ("ONLINE // LATENCY 12ms", "SYNTHEX v4.8"). Only real lab metrics (420 thermal scans, 18.4 tok/s, 740ms first packet).
5. **Banned Pattern 5 (Services brochure layout)**: Replaced by the 4 Lab Pillars (Research, Automation, Products, Tools) and a playable physics-driven hero bench.

---

## 1. Art Direction Options Mapped in the Prototype

The app includes an **interactive live Art Direction switcher** in the header so the founder can inspect all three directions in real time:

- **Option A: Field Notebook Lab (Warm Paper & Ink)**
  - Palette: Ground `#FAF6EE`, Ink `#181E24`, Muted `#576574`, Hot Signal `#D83A1E`.
  - Materials: Draft paper grid, washi tape strips, ink stamps, pinned note cards.
  - Typography: Fraunces (editorial serif) + Bricolage Grotesque + DM Mono.
- **Option B: Playground Lab (Geometric & Reactive)**
  - Palette: Ground `#F8FAF9`, Saturated flat accents, chunky physics cards.
  - Materials: High-contrast buttons, reactive cursor tracking mascot.
- **Option C: Signal Room (Dark Instrument Aesthetic)**
  - Palette: Deep charcoal `#0B0E14`, Emerald signal `#10B981`, Sky blue `#38BDF8`.
  - Materials: Oscilloscope waveforms, instrument grid, high-contrast dark room.

**Founder Recommendation Selected**: **A's physical materials (Field Notebook) blended with B's interactive physics & character**.

---

## 2. Headline Options Drafted for Founder Review

1. **Option 1 (Recommended)**:
   > "We research, break, and ship AI things in Pune."
   *Subline:* "A small lab running experiments on local models, automating real businesses, and building software that doesn't hallucinate when it counts."

2. **Option 2 (Pragmatic / Technical)**:
   > "Less hype, more benchmark logs. A small AI lab in Pune."
   *Subline:* "We test open models against real Indian languages, automate operational bottlenecks, and ship fast products."

3. **Option 3 (Direct & Directing)**:
   > "We test what works before your business bets on it."
   *Subline:* "From edge model quantization to zero-wait WhatsApp pipelines. Built and verified in Pune since 2019."

---

## 3. Playable Hero Physics Spike & Performance Budget

- **Engine**: Lightweight 2D canvas physics simulation running directly in the browser with `requestAnimationFrame`.
- **Performance**: 60 fps on mid-range Android devices, no heavy 500KB physics library bundle.
- **Touch & Accessibility**: Supports pointer drag, velocity throwing, mobile touch and gyroscope/tilt, plus a 1-click "Reset Bench" button and keyboard/reduced-motion accessible static view.
- **Total JS Budget**: Built within standard Next.js 15 bundle with zero extra runtime bloat.
