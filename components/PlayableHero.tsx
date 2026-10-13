'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowDownRight, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface PillarBody {
  id: string;
  name: string;
  type: 'Research' | 'Automation' | 'Products' | 'Tools';
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  borderColor: string;
  rotation: number;
  vRot: number;
  highlight: string;
  summary: string;
}

const VALUE_PROPOSITIONS = [
  {
    id: 1,
    title: 'We build applied AI automations and software that remove manual busywork.',
    subline: 'An independent engineering studio that turns messy, repetitive operations into smooth automated systems, and builds custom software teams actually enjoy using.',
  },
  {
    id: 2,
    title: 'Less hype, more working software. An applied AI studio.',
    subline: 'We test what actually works, automate operational bottlenecks, and build reliable web and mobile applications for growing businesses.',
  },
  {
    id: 3,
    title: 'We build the intelligent systems your business actually needs.',
    subline: 'From hands-free customer scheduling to private on-premise AI assistants. Designed, tested, and delivered by experienced engineers since 2019.',
  },
];

export function PlayableHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeHeadlineIdx, setActiveHeadlineIdx] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState<PillarBody | null>(null);
  const [lastCollisionMsg, setLastCollisionMsg] = useState<string>('Drag & toss any block to explore how the studio works');
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [gravity, setGravity] = useState<number>(0.28);

  const bodiesRef = useRef<PillarBody[]>([]);
  const isDraggingRef = useRef<boolean>(false);
  const draggedBodyRef = useRef<PillarBody | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastMousePosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Initialize pillar bodies with clean human descriptions
  const initBodies = useCallback((width: number, height: number) => {
    const isMobile = width < 640;
    const bW = isMobile ? 120 : 155;
    const bH = isMobile ? 65 : 78;

    bodiesRef.current = [
      {
        id: 'p-research',
        name: '01. Research',
        type: 'Research',
        x: width * 0.15,
        y: height * 0.25,
        vx: 1.5,
        vy: 0,
        width: bW,
        height: bH,
        color: '#FAF4E8',
        borderColor: '#D83A1E',
        rotation: -0.06,
        vRot: 0.005,
        highlight: 'Real Verification',
        summary: 'Testing models against complex handwriting, messy documents, and real-world network conditions.',
      },
      {
        id: 'p-automation',
        name: '02. Automation',
        type: 'Automation',
        x: width * 0.4,
        y: height * 0.18,
        vx: -1.2,
        vy: 0.8,
        width: bW + 10,
        height: bH,
        color: '#F0F9FF',
        borderColor: '#0284C7',
        rotation: 0.05,
        vRot: -0.004,
        highlight: 'Zero-Wait Workflows',
        summary: 'Automated customer booking, data organization, and dispatch flows that handle daily business traffic.',
      },
      {
        id: 'p-products',
        name: '03. Products',
        type: 'Products',
        x: width * 0.65,
        y: height * 0.3,
        vx: 0.8,
        vy: -1.0,
        width: bW,
        height: bH,
        color: '#F4FBF4',
        borderColor: '#16A34A',
        rotation: -0.04,
        vRot: 0.003,
        highlight: 'Full-Stack Apps',
        summary: 'Custom web platforms, tablet ordering tools, and clinic queue systems built for daily operations.',
      },
      {
        id: 'p-tools',
        name: '04. Tools',
        type: 'Tools',
        x: width * 0.82,
        y: height * 0.15,
        vx: -1.4,
        vy: 0.5,
        width: bW - 10,
        height: bH,
        color: '#FFF8F1',
        borderColor: '#EA580C',
        rotation: 0.07,
        vRot: -0.006,
        highlight: 'Safety & Quality',
        summary: 'Precision utilities that test prompt accuracy and protect automated workflows from formatting errors.',
      },
    ];
  }, []);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Physics simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (bodiesRef.current.length === 0) {
        initBodies(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (!containerRef.current) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle framing line
      ctx.strokeStyle = 'rgba(24, 30, 36, 0.06)';
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, width - 16, height - 16);

      const bodies = bodiesRef.current;

      // Update positions
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (draggedBodyRef.current === b) continue;

        b.vy += gravity;
        b.vx *= 0.985;
        b.vy *= 0.985;
        b.vRot *= 0.97;

        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vRot;

        const halfW = b.width / 2;
        const halfH = b.height / 2;

        if (b.x - halfW < 0) {
          b.x = halfW;
          b.vx = -b.vx * 0.65;
          sound.playThud(Math.abs(b.vx));
        } else if (b.x + halfW > width) {
          b.x = width - halfW;
          b.vx = -b.vx * 0.65;
          sound.playThud(Math.abs(b.vx));
        }

        if (b.y - halfH < 0) {
          b.y = halfH;
          b.vy = -b.vy * 0.65;
          sound.playThud(Math.abs(b.vy));
        } else if (b.y + halfH > height - 10) {
          b.y = height - 10 - halfH;
          b.vy = -b.vy * 0.55;
          b.vx *= 0.85;
          if (Math.abs(b.vy) > 0.4) {
            sound.playThud(Math.abs(b.vy));
          }
        }
      }

      // Check Body-to-Body collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const minDistX = (b1.width + b2.width) / 2;
          const minDistY = (b1.height + b2.height) / 2;

          if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
            const overlapX = minDistX - Math.abs(dx);
            const overlapY = minDistY - Math.abs(dy);

            if (overlapX < overlapY) {
              const signX = dx > 0 ? 1 : -1;
              if (draggedBodyRef.current !== b1) b1.x -= overlapX * 0.5 * signX;
              if (draggedBodyRef.current !== b2) b2.x += overlapX * 0.5 * signX;
              const tempVx = b1.vx;
              b1.vx = b2.vx * 0.7;
              b2.vx = tempVx * 0.7;
            } else {
              const signY = dy > 0 ? 1 : -1;
              if (draggedBodyRef.current !== b1) b1.y -= overlapY * 0.5 * signY;
              if (draggedBodyRef.current !== b2) b2.y += overlapY * 0.5 * signY;
              const tempVy = b1.vy;
              b1.vy = b2.vy * 0.7;
              b2.vy = tempVy * 0.7;
            }

            b1.vRot = (Math.random() - 0.5) * 0.04;
            b2.vRot = (Math.random() - 0.5) * 0.04;

            sound.playThud(Math.abs(b1.vx - b2.vx) + Math.abs(b1.vy - b2.vy));
            setLastCollisionMsg(`${b1.type} ↔ ${b2.type} connected`);
          }
        }
      }

      // Render bodies
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);

        const isHovered = selectedPillar?.id === b.id;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(-b.width / 2 + 3, -b.height / 2 + 4, b.width, b.height);

        // Body fill
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.width / 2, -b.height / 2, b.width, b.height);

        // Tape accent
        ctx.fillStyle = 'rgba(245, 230, 195, 0.85)';
        ctx.fillRect(-b.width / 2 + 6, -b.height / 2 - 4, 34, 10);

        // Border
        ctx.strokeStyle = isHovered ? b.borderColor : 'rgba(24, 30, 36, 0.22)';
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.strokeRect(-b.width / 2, -b.height / 2, b.width, b.height);

        // Text title
        ctx.fillStyle = '#181E24';
        ctx.font = 'bold 13px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(b.name, -b.width / 2 + 10, -b.height / 2 + 24);

        // Subtitle (human-readable)
        ctx.fillStyle = '#475569';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.fillText(b.highlight.slice(0, 20), -b.width / 2 + 10, -b.height / 2 + 42);

        // Indicator dot
        ctx.fillStyle = b.borderColor;
        ctx.beginPath();
        ctx.arc(b.width / 2 - 14, -b.height / 2 + 20, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [initBodies, gravity, selectedPillar]);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bodies = bodiesRef.current;
    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i];
      if (
        x >= b.x - b.width / 2 &&
        x <= b.x + b.width / 2 &&
        y >= b.y - b.height / 2 &&
        y <= b.y + b.height / 2
      ) {
        isDraggingRef.current = true;
        draggedBodyRef.current = b;
        dragOffsetRef.current = { x: x - b.x, y: y - b.y };
        lastMousePosRef.current = { x, y, time: performance.now() };
        b.vx = 0;
        b.vy = 0;
        setSelectedPillar(b);
        sound.playPop();
        setLastCollisionMsg(`Exploring: ${b.name}`);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        break;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !draggedBodyRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const b = draggedBodyRef.current;
    b.x = x - dragOffsetRef.current.x;
    b.y = y - dragOffsetRef.current.y;

    const now = performance.now();
    const dt = Math.max(now - lastMousePosRef.current.time, 1);
    b.vx = ((x - lastMousePosRef.current.x) / dt) * 12;
    b.vy = ((y - lastMousePosRef.current.y) / dt) * 12;

    lastMousePosRef.current = { x, y, time: now };
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      draggedBodyRef.current = null;
      sound.playTick();
    }
  };

  const handleResetBench = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      initBodies(rect.width, rect.height);
      sound.playPop();
      setSelectedPillar(null);
      setLastCollisionMsg('Reset. Drag blocks to test physics.');
    }
  };

  const handleToggleZeroG = () => {
    setGravity((prev) => (prev === 0 ? 0.28 : 0));
    sound.playPop();
  };

  const currentProp = VALUE_PROPOSITIONS[activeHeadlineIdx];

  return (
    <section className="relative pt-8 pb-14 sm:pb-20 border-b border-(--border-rule) lab-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar: Neutral global mark & headline option reviewer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="lab-stamp">STUDIO OVERVIEW</span>
            <span className="text-xs text-(--text-muted) font-sans hidden sm:inline">
              Applied AI & Custom Software · Founded 2019
            </span>
          </div>

          {/* Proposition option switcher for review */}
          <div className="flex items-center gap-1.5 text-xs bg-black/5 p-1 rounded-lg font-sans">
            <span className="text-(--text-muted) px-2">Statement Option:</span>
            {VALUE_PROPOSITIONS.map((opt, i) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setActiveHeadlineIdx(i);
                }}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  activeHeadlineIdx === i
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-(--text-muted) hover:text-(--text-ink)'
                }`}
              >
                #{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Hero: Left Human Narrative, Right Interactive Physics Bench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Clear Value Proposition in Human Terms */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-(--text-ink) leading-[1.12] mb-5 text-balance">
                {currentProp.title}
              </h1>

              <p className="text-base sm:text-lg text-(--text-muted) leading-relaxed mb-6 font-normal max-w-xl">
                {currentProp.subline}
              </p>

              {/* The 4 Pillars in clean human outcomes */}
              <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-(--border-rule)">
                <div>
                  <span className="block text-xs font-semibold text-(--signal-hot) font-sans">01. Research</span>
                  <span className="text-xs text-(--text-muted)">Testing what actually works before companies invest</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-(--signal-accent) font-sans">02. Automation</span>
                  <span className="text-xs text-(--text-muted)">Hands-free customer booking and operations</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-emerald-600 font-sans">03. Products</span>
                  <span className="text-xs text-(--text-muted)">Fast web platforms and tablet workplace tools</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-amber-600 font-sans">04. Tools</span>
                  <span className="text-xs text-(--text-muted)">Safety guards that stop AI formatting errors</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/start"
                onClick={() => sound.playTick()}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-(--signal-hot) hover:brightness-110 active:scale-98 rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                Talk to the studio
                <ArrowDownRight className="w-4 h-4" />
              </Link>
              <Link
                href="#bench"
                onClick={() => sound.playTick()}
                className="px-4 py-2.5 text-sm font-medium text-(--text-ink) hover:bg-black/5 rounded-lg border border-(--border-rule) transition-colors"
              >
                See verified results
              </Link>
            </div>
          </div>

          {/* Right Column: Playable Physics Bench */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              ref={containerRef}
              className="relative w-full h-[360px] sm:h-[420px] rounded-xl border border-(--border-rule) bg-(--bg-card) overflow-hidden shadow-xs flex flex-col"
            >
              {/* Bench header toolbar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-(--border-rule) bg-black/2 text-xs font-sans text-(--text-muted) select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-(--signal-hot)" />
                  <span className="font-semibold text-(--text-ink)">HOW WE WORK</span>
                  <span className="hidden sm:inline">· Grab & Toss blocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleZeroG}
                    className="hover:text-(--text-ink) px-1.5 py-0.5 rounded transition-colors"
                    title="Toggle zero gravity"
                  >
                    {gravity === 0 ? 'Gravity: Off' : 'Gravity: On'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetBench}
                    className="p-1 hover:text-(--text-ink) rounded transition-colors"
                    title="Reset positions"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* The Physics Canvas */}
              <div className="relative flex-1 cursor-grab active:cursor-grabbing">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="w-full h-full touch-none block"
                />

                {/* Live specimen info bubble when a pillar is touched or collided */}
                {selectedPillar && (
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-(--bg-paper)/95 border border-(--border-rule) shadow-md backdrop-blur-sm transition-all text-xs font-sans">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-(--text-ink) font-display text-sm">
                        {selectedPillar.name}
                      </span>
                      <span className="font-semibold text-(--signal-hot)">
                        {selectedPillar.highlight}
                      </span>
                    </div>
                    <p className="text-(--text-muted) leading-relaxed">
                      {selectedPillar.summary}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom bench ticker */}
              <div className="px-3 py-1.5 border-t border-(--border-rule) bg-black/2 flex items-center justify-between text-xs font-sans text-(--text-muted)">
                <span className="truncate">{lastCollisionMsg}</span>
                <span className="shrink-0 text-slate-400">Interactive Canvas</span>
              </div>
            </div>

            <p className="text-xs text-(--text-muted) mt-2.5 text-right font-sans">
              Drag, toss, or collide blocks to see what we do
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
