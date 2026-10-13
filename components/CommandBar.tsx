'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sound } from '@/lib/sound';
import { Terminal, X, ArrowRight, CornerDownLeft } from 'lucide-react';

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandBar({ isOpen, onClose }: CommandBarProps) {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SUPERIORS LAB OS v3.2 [Global Lab]',
    'Type "help" for commands, or select a destination below:',
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        sound.playPop();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;
    sound.playTick();

    const newLogs = [...terminalLogs, `$ ${inputVal}`];

    switch (cmd) {
      case 'help':
        newLogs.push('Available commands: bench, automations, shelf, notes, about, start, founder, technologies, clear');
        break;
      case 'bench':
      case 'research':
        router.push('/#bench');
        onClose();
        break;
      case 'automations':
        router.push('/#automations');
        onClose();
        break;
      case 'shelf':
      case 'products':
        router.push('/#shelf');
        onClose();
        break;
      case 'notes':
      case 'journal':
        router.push('/notes');
        onClose();
        break;
      case 'about':
        router.push('/about');
        onClose();
        break;
      case 'start':
      case 'contact':
        router.push('/start');
        onClose();
        break;
      case 'founder':
        newLogs.push('Founder & Systems Lead: Krushna Borase (founded Superiors Technology in August 2019).');
        break;
      case 'technologies':
      case 'stack':
        newLogs.push('Technologies: Next.js, React, Flutter, Node.js, Django, n8n, local LLMs, PostgreSQL.');
        break;
      case 'location':
      case 'time':
        newLogs.push('Presence: Global studio operating across timezones. Standard: UTC.');
        break;
      case 'clear':
        setTerminalLogs(['Console cleared. Type "help" or select a destination.']);
        setInputVal('');
        return;
      default:
        newLogs.push(`Unrecognized command "${cmd}". Type "help" for a list.`);
    }

    setTerminalLogs(newLogs);
    setInputVal('');
  };

  const quickLinks = [
    { label: '01. Research Bench (OCR & Quantization)', href: '/#bench' },
    { label: '02. Production Automations (Guest Booking Flow)', href: '/#automations' },
    { label: '03. Delivered Products & Quality Tools', href: '/#shelf' },
    { label: '04. Studio Research Notes & Postmortems', href: '/notes' },
    { label: '05. About Founder Krushna Borase', href: '/about' },
    { label: '06. Talk to the Studio (/start brief)', href: '/start' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-(--bg-card) border border-(--border-rule) rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono-lab text-xs animate-in fade-in zoom-in-95 duration-150">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border-rule) bg-black/5 text-(--text-ink)">
          <div className="flex items-center gap-2 font-bold font-sans">
            <Terminal className="w-4 h-4 text-(--signal-hot)" />
            <span>SUPERIORS LAB COMMAND PALETTE</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-black/10 rounded transition-colors text-(--text-muted) hover:text-(--text-ink)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input box */}
        <form onSubmit={handleCommand} className="flex items-center border-b border-(--border-rule) px-4 py-2.5 bg-(--bg-paper)">
          <span className="text-(--signal-hot) font-bold mr-2">&gt;</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command ('help', 'bench', 'start') or jump below..."
            className="w-full bg-transparent text-(--text-ink) focus:outline-none placeholder:text-slate-400 text-xs font-sans"
          />
          <button type="submit" className="p-1 text-(--text-muted) hover:text-(--text-ink)">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Console Log Output */}
        <div className="p-4 max-h-48 overflow-y-auto bg-black/2 space-y-1 text-(--text-muted) border-b border-(--border-rule)">
          {terminalLogs.map((log, i) => (
            <div key={i} className={log.startsWith('$') ? 'text-(--text-ink) font-bold' : log.includes('Founder') || log.includes('v3.2') ? 'text-(--signal-hot)' : ''}>
              {log}
            </div>
          ))}
        </div>

        {/* Quick Destinations */}
        <div className="p-3 bg-(--bg-card)">
          <span className="text-[10px] text-(--text-muted) uppercase tracking-wider block mb-2 px-1 font-sans">
            Direct Jump:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans">
            {quickLinks.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  sound.playTick();
                  router.push(item.href);
                  onClose();
                }}
                className="text-left px-2.5 py-1.5 rounded hover:bg-(--bg-paper) hover:text-(--signal-hot) text-(--text-ink) transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
