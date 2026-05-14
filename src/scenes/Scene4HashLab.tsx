// ==========================================
// File: src/scenes/Scene4HashLab.tsx
// Purpose: Scene 4 - Interactive Cryptography Hash Lab
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Copy, Check, ArrowRight, Key, AlertTriangle, ShieldCheck } from 'lucide-react';
import { generateSHA256, compareHashes } from '../utils/crypto';
import { playTypingSound, playSuccessSound } from '../utils/sounds';

interface Scene4Props {
  onNext: () => void;
}

const TARGET_EXPECTED_HASH = "805625D5AD51C05B608221808D5B1E51EE7BCE90EEFFBEFFCE1C18A5179B4D63"; // SHA256 of TRANSMISSION_CONFIRMED

export const Scene4HashLab: React.FC<Scene4Props> = ({ onNext }) => {
  const [inputText, setInputText] = useState<string>("TRANSMISSION_CONFIRMED");
  const [generatedHash, setGeneratedHash] = useState<string>("");
  const [targetHash] = useState<string>(TARGET_EXPECTED_HASH);
  const [isMatch, setIsMatch] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const output = generateSHA256(inputText).toUpperCase();
    setGeneratedHash(output);
    const matched = compareHashes(output, targetHash);
    setIsMatch(matched);
  }, [inputText, targetHash]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    playTypingSound();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center p-4 md:p-6 text-left"
    >
      <div className="w-full bg-[#030d04]/95 border-2 border-[#00FF41]/40 rounded-lg p-6 box-glow relative overflow-hidden crt-overlay">
        {/* Animated Scanner Radar Line */}
        <div className="scanner-line"></div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#00FF41]/30 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#00FF41] animate-pulse" />
            <div>
              <span className="text-xs md:text-sm tracking-widest text-[#00FF41] font-bold uppercase block">
                HASHLAB_V2 // INTERACTIVE CRYPTOGRAPHY
              </span>
              <span className="text-[10px] text-gray-400">ALGORITHM: SHA-256 (SECURE CRYPTOGRAPHIC ONE-WAY HASH)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isMatch ? (
              <div className="flex items-center gap-1.5 bg-[#00FF41]/20 border border-[#00FF41] px-3 py-1.5 rounded text-xs text-[#00FF41] font-bold animate-pulse">
                <ShieldCheck className="w-4 h-4" />
                <span>INTEGRITY VERIFIED // MATCH</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500 px-3 py-1.5 rounded text-xs text-red-500 font-bold rgb-shift animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>MISMATCH // CORRUPT CHECKSUM</span>
              </div>
            )}
          </div>
        </div>

        {/* Studio Inputs & Outputs */}
        <div className="space-y-6 font-mono">
          {/* Target Expected Hash */}
          <div className="bg-black/90 border border-gray-800 rounded p-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>TARGET EXPECTED CHECKSUM (MAINFRAME LOCK):</span>
              <span className="text-yellow-400 font-bold">REQUIRED</span>
            </div>
            <div className="text-xs md:text-sm text-yellow-400 break-all select-all font-mono tracking-widest">
              {targetHash}
            </div>
          </div>

          {/* User Input String */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-[#00FF41]" />
              <span>Input Decrypted String (Modify to test hash avalanche effect):</span>
            </label>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type string to generate SHA-256..."
              className="w-full bg-black border-2 border-[#00FF41]/40 focus:border-[#00FF41] rounded px-4 py-3 text-[#00FF41] font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#00FF41] box-glow"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Tip: The correct verification string is <code className="text-[#00FF41] font-bold">TRANSMISSION_CONFIRMED</code>.
            </p>
          </div>

          {/* Real-time Generated Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                LIVE GENERATED SHA-256 OUTPUT:
              </label>
              <button
                onClick={handleCopy}
                className="text-xs flex items-center gap-1.5 bg-black/60 hover:bg-[#00FF41] hover:text-black text-[#00FF41] border border-[#00FF41]/30 px-3 py-1 rounded transition-all cursor-pointer font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY HASH'}</span>
              </button>
            </div>

            <div className={`p-4 rounded border-2 tracking-widest text-xs md:text-sm break-all font-mono select-all transition-all ${
              isMatch 
                ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41] text-glow' 
                : 'bg-red-500/10 border-red-500 text-red-500 text-glow-red'
            }`}>
              {generatedHash || 'Awaiting input...'}
            </div>
          </div>
        </div>

        {/* Next Stage Footer */}
        {isMatch && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-4 border-t border-[#00FF41]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping"></span>
              <span>Cryptographic hash validated. Gateway ready for Supabase Authentication.</span>
            </div>
            <button
              onClick={() => {
                playSuccessSound();
                onNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            >
              <span>PROCEED: SUPABASE AUTHENTICATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
