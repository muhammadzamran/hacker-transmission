// ==========================================
// File: src/scenes/Scene1Boot.tsx
// Purpose: Scene 1 - System Boot Sequence (Hacker Terminal Intro)
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, ArrowRight, ShieldAlert } from 'lucide-react';
import { playStaticSound, playTypingSound, playSuccessSound, playGlitchSound } from '../utils/sounds';

interface Scene1Props {
  onNext: () => void;
}

const BOOT_MESSAGES = [
  "Initializing system...",
  "Loading encrypted kernel v4.12.0...",
  "Establishing secure handshake...",
  "Connecting to unknown source...",
  "Bypassing firewall PROT-X9...",
  "Decrypting secure node transmission...",
  "ACCESS GRANTED"
];

export const Scene1Boot: React.FC<Scene1Props> = ({ onNext }) => {
  const [bootStarted, setBootStarted] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [typedCharIndex, setTypedCharIndex] = useState<number>(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState<string>('');
  const [bootFinished, setBootFinished] = useState<boolean>(false);

  const handleStart = () => {
    setBootStarted(true);
    playStaticSound(2.5);
  };

  useEffect(() => {
    if (!bootStarted || bootFinished) return;

    if (currentLineIndex < BOOT_MESSAGES.length) {
      const fullLine = BOOT_MESSAGES[currentLineIndex];

      if (typedCharIndex < fullLine.length) {
        const timer = setTimeout(() => {
          setCurrentLineText(prev => prev + fullLine[typedCharIndex]);
          playTypingSound();
          setTypedCharIndex(prev => prev + 1);
        }, Math.random() * 30 + 20); // random typing speed

        return () => clearTimeout(timer);
      } else {
        // Line finished typing
        const timer = setTimeout(() => {
          setDisplayedLines(prev => [...prev, fullLine]);
          setCurrentLineText('');
          setTypedCharIndex(0);
          setCurrentLineIndex(prev => prev + 1);

          // If last line was "ACCESS GRANTED"
          if (currentLineIndex === BOOT_MESSAGES.length - 1) {
            setBootFinished(true);
            playSuccessSound();
          } else {
            if (Math.random() > 0.5) playGlitchSound();
          }
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [bootStarted, currentLineIndex, typedCharIndex, bootFinished]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center p-4 md:p-6 text-left"
    >
      <div className="w-full bg-[#030d04]/95 border-2 border-[#00FF41]/40 rounded-lg p-6 box-glow relative overflow-hidden crt-overlay">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#00FF41]/30 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#00FF41] animate-pulse" />
            <span className="text-xs md:text-sm tracking-widest text-[#00FF41] font-bold uppercase">
              ROOT@TRANSMISSION:~# SYSTEM BOOT
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-red-500 font-bold rgb-shift">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>SECURE SYSTEM LINK</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="min-h-[280px] font-mono text-sm space-y-3">
          {!bootStarted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold tracking-widest text-[#00FF41] glitch-text">
                  HACKER TRANSMISSION
                </h2>
                <p className="text-gray-400 text-xs max-w-md mx-auto">
                  You are entering a live hacker system simulation. Click below to initiate secure system boot sequence.
                </p>
              </div>

              <button
                onClick={handleStart}
                className="px-8 py-3 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white hover:scale-105 transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.7)]"
              >
                <Play className="w-5 h-5 fill-black" />
                <span className="tracking-widest">INITIALIZE BOOT</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-[#00FF41]">
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 font-mono ${
                    line === 'ACCESS GRANTED' ? 'text-xl font-bold text-white text-glow glitch-text py-2' : 'text-[#00FF41]/80'
                  }`}
                >
                  <span className="text-[#00FF41] font-bold">&gt;</span>
                  <span>{line}</span>
                </motion.div>
              ))}

              {!bootFinished && (
                <div className="flex items-center gap-2 text-[#00FF41] font-mono pt-1 text-glow">
                  <span className="font-bold">&gt;</span>
                  <span>{currentLineText}</span>
                  <span className="w-2.5 h-4 bg-[#00FF41] animate-pulse inline-block"></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Next Button */}
        {bootFinished && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-4 border-t border-[#00FF41]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping"></span>
              <span>System boot verified. Network nodes mapped.</span>
            </div>
            <button
              onClick={() => {
                playSuccessSound();
                onNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            >
              <span>PROCEED: PACKET SIMULATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
