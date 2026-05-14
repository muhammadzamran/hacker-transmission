// ==========================================
// File: src/scenes/Scene6Final.tsx
// Purpose: Scene 6 - Final Cinematic Reveal & System Core Gateway
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Terminal, Award, RotateCcw, Code } from 'lucide-react';
import { playSuccessSound, playGlitchSound, playStaticSound } from '../utils/sounds';

interface Scene6Props {
  userEmail: string;
  onRestart: () => void;
}

export const Scene6Final: React.FC<Scene6Props> = ({ userEmail, onRestart }) => {
  const [glitchExplosion, setGlitchExplosion] = useState<boolean>(true);

  useEffect(() => {
    playGlitchSound();
    playStaticSound(2);
    const timer = setTimeout(() => {
      setGlitchExplosion(false);
      playSuccessSound();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center p-4 md:p-6 text-left"
    >
      <div className="w-full bg-[#030d04]/95 border-2 border-red-500 rounded-lg p-6 md:p-8 box-glow-red relative overflow-hidden crt-overlay">
        {/* Animated Scanner Radar Line */}
        <div className="scanner-line"></div>

        {/* Glitch Explosion overlay */}
        {glitchExplosion ? (
          <div className="py-24 text-center space-y-6 bg-red-500/20 rounded border border-red-500 animate-pulse">
            <h2 className="text-4xl md:text-6xl font-extrabold text-red-500 tracking-widest glitch-text rgb-shift">
              SYSTEM BREACH WARNING
            </h2>
            <p className="text-white text-lg font-mono text-glow">
              BYPASSING ROOT ARCHITECTURE // DECRYPTING CORE PAYLOAD...
            </p>
          </div>
        ) : (
          <div>
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-red-500/40 pb-4 mb-6 font-mono">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-red-500 animate-pulse" />
                <div>
                  <span className="text-xs md:text-sm tracking-widest text-red-500 font-bold uppercase block rgb-shift">
                    SYS_FINALE // MAINFRAME ROOT COMPROMISED
                  </span>
                  <span className="text-[10px] text-gray-400">TUNNEL STATUS: SECURED ENCRYPTED CONNECTION</span>
                </div>
              </div>
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded border border-red-500 text-xs font-bold animate-pulse rgb-shift">
                <span>TARGET ACQUIRED</span>
              </div>
            </div>

            {/* Cinematic Reveal Box */}
            <div className="py-12 px-6 bg-black border-2 border-red-500 rounded-lg text-center space-y-6 box-glow-red relative">
              <div className="absolute top-2 left-2 text-[10px] text-gray-500 font-mono">LAT/LONG: 31.5497° N, 74.3436° E</div>
              <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">IP: 127.0.0.1 (LOCALHOST)</div>
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,0,0,0.7)]"
              >
                <Award className="w-10 h-10 text-red-500 animate-bounce" />
              </motion.div>

              <div className="space-y-2 font-mono">
                <p className="text-xs tracking-widest text-gray-400 uppercase font-bold">OPERATOR IDENTITY RECORD:</p>
                <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-wider text-glow text-white">
                  {userEmail}
                </h2>
              </div>

              <div className="pt-2">
                <div className="inline-block px-8 py-4 bg-red-500 text-black font-extrabold text-xl md:text-4xl tracking-widest rounded shadow-[0_0_30px_rgba(255,0,0,0.8)] animate-pulse glitch-text">
                  ACCESS GRANTED TO SYSTEM CORE
                </div>
              </div>

              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed pt-2 font-mono tracking-wide">
                Transmission complete. All cryptographic logs have been sealed. The simulation is now complete.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    playSuccessSound();
                    onRestart();
                  }}
                  className="px-8 py-3 bg-red-500/20 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black font-extrabold rounded flex items-center gap-3 mx-auto transition-all cursor-pointer shadow-[0_0_20px_rgba(255,0,0,0.4)] tracking-widest font-mono"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RESTART SIMULATION</span>
                </button>
              </div>
            </div>

            {/* Run using CMD instructions */}
            <div className="mt-10 bg-black border border-red-500/30 rounded-lg p-6 text-xs text-gray-300 space-y-4 font-mono">
              <div className="flex items-center gap-2 text-red-500 font-bold text-sm border-b border-red-500/20 pb-2 rgb-shift">
                <Terminal className="w-5 h-5" />
                <span>HOW TO RUN THIS PROJECT USING CMD (STEP-BY-STEP)</span>
              </div>

              <ol className="space-y-3 list-decimal list-inside text-gray-300 tracking-wide">
                <li>
                  <span className="text-[#00FF41] font-bold">Open Command Prompt (CMD) or Terminal</span> and navigate to your desired directory:
                  <div className="bg-[#030d04] p-2.5 rounded border border-[#00FF41]/30 text-white mt-1 select-all font-mono">
                    cd path/to/your/folder
                  </div>
                </li>
                <li>
                  <span className="text-[#00FF41] font-bold">Clone or Unpack</span> the project files into the directory.
                </li>
                <li>
                  <span className="text-[#00FF41] font-bold">Install Dependencies</span> using Node Package Manager (npm):
                  <div className="bg-[#030d04] p-2.5 rounded border border-[#00FF41]/30 text-white mt-1 select-all font-mono">
                    npm install
                  </div>
                </li>
                <li>
                  <span className="text-[#00FF41] font-bold">Run Development Server:</span> Start Vite dev server:
                  <div className="bg-[#030d04] p-2.5 rounded border border-[#00FF41]/30 text-white mt-1 select-all font-mono">
                    npm run dev
                  </div>
                </li>
                <li>
                  <span className="text-[#00FF41] font-bold">Access Application:</span> Open your browser and go to the local URL shown in the terminal (usually <code className="text-[#00FF41]">http://localhost:5173</code>).
                </li>
                <li>
                  <span className="text-[#00FF41] font-bold">Build for Production:</span> To create production-ready static files:
                  <div className="bg-[#030d04] p-2.5 rounded border border-[#00FF41]/30 text-white mt-1 select-all font-mono">
                    npm run build
                  </div>
                </li>
              </ol>

              <div className="pt-4 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-red-500" />
                  <span>React + Vite + Tailwind CSS + Framer Motion + Supabase</span>
                </div>
                <div>Built by Muhammad Zamran</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
