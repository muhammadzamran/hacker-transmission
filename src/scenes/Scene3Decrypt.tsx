// ==========================================
// File: src/scenes/Scene3Decrypt.tsx
// Purpose: Scene 3 - Encryption Cracking & Decoding Simulation
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Play, ArrowRight, RefreshCw, Key } from 'lucide-react';
import { playTypingSound, playSuccessSound, playGlitchSound } from '../utils/sounds';
import { scrambleText } from '../utils/crypto';

interface Scene3Props {
  onNext: () => void;
}

const SECRET_PAYLOAD = "PROJECT ARCHIVE: CODENAME TRANSMISSION // SECURED NODE BYPASSED";

export const Scene3Decrypt: React.FC<Scene3Props> = ({ onNext }) => {
  const [displayedText, setDisplayedText] = useState<string>("#############################################################");
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeKeyHash, setActiveKeyHash] = useState<string>("E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855");

  const startDecryption = () => {
    setIsDecrypting(true);
    setIsDecrypted(false);
    setProgress(0);
    playGlitchSound();

    let iteration = 0;
    const totalIterations = 35;

    const timer = setInterval(() => {
      iteration++;
      const currentRatio = iteration / totalIterations;
      setProgress(Math.floor(currentRatio * 100));
      playTypingSound();

      // Scramble key hash randomly while cracking
      const fakeHash = Array.from({ length: 64 }, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join('');
      setActiveKeyHash(fakeHash);

      // Scramble payload string
      const currentScrambled = scrambleText(SECRET_PAYLOAD, currentRatio);
      setDisplayedText(currentScrambled);

      if (iteration >= totalIterations) {
        clearInterval(timer);
        setDisplayedText(SECRET_PAYLOAD);
        setIsDecrypting(false);
        setIsDecrypted(true);
        setActiveKeyHash("9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"); // Static solved hash
        playSuccessSound();
      }
    }, 120);
  };

  useEffect(() => {
    // Awaiting user click
  }, []);

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
            {isDecrypted ? (
              <Unlock className="w-6 h-6 text-[#00FF41] animate-bounce" />
            ) : (
              <Lock className="w-6 h-6 text-red-500 animate-pulse" />
            )}
            <div>
              <span className="text-xs md:text-sm tracking-widest text-[#00FF41] font-bold uppercase block">
                AES-256_DECRYPT // CIPHER BREAKING ENGINE
              </span>
              <span className="text-[10px] text-gray-400">
                STATUS: {isDecrypted ? 'PAYLOAD UNLOCKED SUCCESSFULLY' : 'BRUTE-FORCING CRYPTOGRAPHIC KEYS'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isDecrypting && !isDecrypted && (
              <button
                onClick={startDecryption}
                className="px-5 py-2 bg-[#00FF41] text-black font-extrabold text-xs rounded hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
              >
                <Play className="w-4 h-4 fill-black" />
                <span className="tracking-widest">START DECRYPT</span>
              </button>
            )}
            {isDecrypting && (
              <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 px-3 py-1.5 rounded text-xs text-yellow-400 font-bold animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>CRACKING KEY... {progress}%</span>
              </div>
            )}
            {isDecrypted && (
              <div className="bg-[#00FF41]/20 border border-[#00FF41] px-3 py-1.5 rounded text-xs text-[#00FF41] font-bold animate-pulse">
                DECRYPT COMPLETE
              </div>
            )}
          </div>
        </div>

        {/* Hash Key Brute-Force Tracker */}
        <div className="bg-black/90 border border-[#00FF41]/30 rounded p-4 mb-6 font-mono">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Key className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>ACTIVE HASH KEY:</span>
          </div>
          <div className="text-xs md:text-sm text-yellow-400 break-all select-all text-glow tracking-widest">
            {activeKeyHash}
          </div>
        </div>

        {/* Decryption Screen Studio */}
        <div className="bg-black border border-[#00FF41]/20 rounded-lg p-6 md:p-12 text-center relative my-6 box-glow">
          <div className="absolute top-2 left-2 text-[10px] text-gray-500 font-mono">CIPHER: AES-256-GCM</div>
          <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">INTEGRITY: SHA-256 HMAC</div>

          <h3 className={`text-lg md:text-3xl font-mono font-bold tracking-wider py-8 transition-all duration-100 ${
            isDecrypted ? 'text-[#00FF41] text-glow glitch-text' : 'text-gray-400'
          }`}>
            {displayedText}
          </h3>

          {/* Progress Bar Display */}
          <div className="w-full bg-gray-900 rounded-full h-2.5 mb-2 overflow-hidden border border-[#00FF41]/30">
            <motion.div
              className={`h-full ${isDecrypted ? 'bg-[#00FF41]' : 'bg-yellow-400'}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            ></motion.div>
          </div>

          <div className="text-xs text-gray-400 font-mono mt-4">
            {isDecrypted ? (
              <span className="text-[#00FF41] font-bold tracking-widest">SUCCESS: ENCRYPTED MESSAGE DECODED.</span>
            ) : isDecrypting ? (
              <span className="text-yellow-400 animate-pulse">Running dictionary attack vectors...</span>
            ) : (
              <span>System awaiting brute-force execution command.</span>
            )}
          </div>
        </div>

        {/* Next Stage Footer */}
        {isDecrypted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-4 border-t border-[#00FF41]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping"></span>
              <span>Integrity verification required. Proceed to Hash Lab.</span>
            </div>
            <button
              onClick={() => {
                playSuccessSound();
                onNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            >
              <span>PROCEED: CRYPTOGRAPHY HASH LAB</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
