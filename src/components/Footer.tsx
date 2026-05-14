// ==========================================
// File: src/components/Footer.tsx
// Purpose: Displays project creator info and footer links.
// ==========================================

import React from 'react';
import { Mail, ShieldAlert, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-[#00FF41]/30 py-8 px-4 text-center text-xs tracking-wider relative z-20 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-left">
          <ShieldAlert className="w-5 h-5 text-[#00FF41] animate-pulse" />
          <div>
            <p className="font-bold uppercase tracking-widest text-[#00FF41]">Hacker Transmission</p>
            <p className="text-gray-400 text-[10px]">Cinematic Cyber Simulation</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-300">
            Built by <span className="text-[#00FF41] font-bold">Muhammad Zamran</span>
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://github.com/muhammadzamran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-[#00FF41] transition-colors"
            >
              <Code className="w-4 h-4 text-[#00FF41]" />
              <span className="underline">github.com/muhammadzamran</span>
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="mailto:Zamran.qaxi@gmail.com"
              className="flex items-center gap-1 text-gray-400 hover:text-[#00FF41] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#00FF41]" />
              <span className="underline">Zamran.qaxi@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="text-right text-[10px] text-gray-500 hidden md:block">
          <p>SYS.VER: 1.0.4</p>
          <p className="text-[#00FF41]/60">SHA-256 SECURED</p>
        </div>
      </div>
      <div className="mt-8 text-gray-600 text-[10px] max-w-xl mx-auto border-t border-gray-900 pt-4">
        <p>Disclaimer: This is a beginner-friendly web application for simulation & educational purposes.</p>
      </div>
    </footer>
  );
};
