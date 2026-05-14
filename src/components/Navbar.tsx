// ==========================================
// File: src/components/Navbar.tsx
// Purpose: Header navigation bar with scene quick-jumps and sound controls.
// ==========================================

import React, { useState } from 'react';
import { Volume2, VolumeX, Radio, Terminal } from 'lucide-react';
import { toggleSound, isSoundEnabled, playTypingSound } from '../utils/sounds';

interface NavbarProps {
  currentScene: number;
  setScene: (scene: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScene, setScene }) => {
  const [sound, setSound] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSound(newState);
    if (newState) playTypingSound();
  };

  const scenes = [
    { id: 1, name: '01: BOOT' },
    { id: 2, name: '02: PACKETS' },
    { id: 3, name: '03: DECRYPT' },
    { id: 4, name: '04: HASHLAB' },
    { id: 5, name: '05: AUTH' },
    { id: 6, name: '06: FINALE' },
  ];

  return (
    <header className="w-full bg-[#030d04]/90 backdrop-blur border-b border-[#00FF41]/30 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00FF41]/10 border border-[#00FF41] rounded flex items-center justify-center animate-pulse">
            <Terminal className="w-5 h-5 text-[#00FF41]" />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base text-[#00FF41] tracking-wider flex items-center gap-2 glitch-text">
              HACKER TRANSMISSION
              <span className="text-[10px] bg-[#00FF41] text-black px-1.5 py-0.5 rounded font-extrabold animate-pulse">LIVE</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest">BY MUHAMMAD ZAMRAN</p>
          </div>
        </div>

        {/* Middle: Scene Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 bg-black p-1 rounded border border-[#00FF41]/30 font-mono">
          {scenes.map((sc) => {
            const isActive = currentScene === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  playTypingSound();
                  setScene(sc.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs rounded transition-all cursor-pointer tracking-wider ${
                  isActive
                    ? 'bg-[#00FF41] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,65,0.7)]'
                    : 'text-gray-400 hover:text-[#00FF41] hover:bg-[#00FF41]/10'
                }`}
              >
                {sc.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Status */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#00FF41]/10 border border-[#00FF41]/40 text-[#00FF41] hover:bg-[#00FF41]/20 transition-all cursor-pointer font-bold"
            title="Toggle Sound Effects"
          >
            {sound ? <Volume2 className="w-4 h-4 text-[#00FF41]" /> : <VolumeX className="w-4 h-4 text-red-500" />}
            <span className="hidden sm:inline">{sound ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-[#00FF41]">
            <Radio className="w-4 h-4 animate-spin text-[#00FF41]" />
            <span className="hidden lg:inline text-gray-400 font-bold tracking-widest">SECURE LINK</span>
          </div>
        </div>
      </div>
    </header>
  );
};
