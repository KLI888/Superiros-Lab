# Superiors Lab (v3)

A bespoke AI research, workflow automation, and product engineering lab website for **Superiors Technology**, based in Pune, Maharashtra.

---

## 1. What Makes This Different (Anti-"AI-Generated")

- **Zero "AI Template" tells**: No dark purple glowing bento grids, no fake compiler tags ("SYNTHEX v4.8"), no pill-badge sandwiches, no generic marketing copy.
- **Warm Field Notebook & Playground Aesthetics**: Archival paper ground (`#FAF6EE`), deep ink text (`#181E24`), international signal red (`#D83A1E`), washi tape strips, ink stamps, and an interactive 2D physics bench.
- **Playable Physics Hero**: The 4 lab pillars (Research, Automation, Products, Tools) are physical chunky objects you can drag, throw, and collide in real-time at 60 fps.
- **Honest Content Rule**: Only verified facts. Shows what actually broke in research (e.g. Marathi OCR virama splits, Ollama 8-bit memory swapping) alongside real benchmark data.
- **Interactive Workbench**:
  - Live **PromptDiff** prompt regression inspector.
  - Live **JSON Schema Enforcer** payload cleaner.
  - Interactive moving diagram with step scrubber for WhatsApp table reservation automation.
  - Live Pune local time (Asia/Kolkata).
  - Tactile Web Audio synthesizer (subtle clicks, pops, thuds - 100% offline, zero bandwidth).
  - Global Command Bar (`/` or `⌘K`) and secret lab terminal.
- **Real-Time Art Direction Switcher**: Switch instantly between **Notebook Lab** (recommended), **Playground Lab**, and **Signal Room**.

---

## 2. Setup & Local Development

This application is built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to explore the lab bench.

---

## 3. Content Editing Guide

All site content is strongly typed and centralized in `lib/lab-data.ts`:

- **Experiments**: Edit `LAB_EXPERIMENTS` to add new bench test logs, failure postmortems, or hardware findings.
- **Automations**: Edit `LAB_AUTOMATIONS` to update active production pipelines and step timings.
- **Products & Tools**: Edit `LAB_PRODUCTS` to add shipped web apps or developer tools.
- **Research Notes**: Edit `LAB_NOTES` to publish new field journal write-ups.
- **Studio Facts & Availability**: Edit `LAB_FACTS` in `lib/lab-data.ts` to update founder notes, location, or quarterly client availability.

See `CONTENT-TODO.md` for the full registry of verified items and founder asset placeholders.

---

## 4. Key Pages & Routes

- `/` — The Homepage as Moments (Playable Physics Hero, On the Bench, Shipped Shelf, Lab Notes, Automation in the Wild, The People, Bring Us a Problem, Footer Toy).
- `/start` — Focused 3-minute problem brief wizard ("I run a business" vs "I have an idea").
- `/notes` — Research archive and postmortem manuscript reader.
- `/products` — Complete directory of shipped products and interactive developer tools.
- `/about` — Studio dossier, founding story (Aug 2019), and anti-hype engineering principles.

---

## 5. Verification Checklist

- [x] First screen is playable and communicates "AI research lab," not "services menu"
- [x] Four pillars (Research, Automation, Products, Tools) clearly structured
- [x] Anti-AI tells eliminated (no bento pill clutter, no fake telemetry, characterful typography)
- [x] Smooth 60fps physics simulation optimized for mobile and desktop touch
- [x] Fully accessible with keyboard navigation (`/` or `⌘K`) and reduced-motion fallback
- [x] WCAG AA compliant contrast and zero dead buttons
