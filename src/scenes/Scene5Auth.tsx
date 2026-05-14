// ==========================================
// File: src/scenes/Scene5Auth.tsx
// Purpose: Scene 5 - Mainframe Authentication (Supabase Gateway)
// ==========================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle, ArrowRight, Server, CheckCircle2, RefreshCw } from 'lucide-react';
import { supabase, hasValidSupabaseKeys } from '../lib/supabaseClient';
import { playTypingSound, playSuccessSound, playErrorSound, playGlitchSound } from '../utils/sounds';

interface Scene5Props {
  onNext: () => void;
  onAuthSuccess: (email: string) => void;
}

export const Scene5Auth: React.FC<Scene5Props> = ({ onNext, onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('Zamran.qaxi@gmail.com');
  const [password, setPassword] = useState<string>('hackerpass123');
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isGranted, setIsGranted] = useState<boolean>(false);

  const [useMockMode, setUseMockMode] = useState<boolean>(!hasValidSupabaseKeys());

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    playGlitchSound();

    // Multi-stage verification loading screen sequence
    setLoadingStep('Verifying identity credentials...');

    const runSequence = async (authAction: () => Promise<string>) => {
      setTimeout(() => {
        setLoadingStep('Accessing secure node database...');
        playTypingSound();

        setTimeout(async () => {
          setLoadingStep('Establishing encrypted session token...');
          playTypingSound();

          try {
            const resolvedEmail = await authAction();
            setIsGranted(true);
            setLoadingStep('');
            playSuccessSound();
            onAuthSuccess(resolvedEmail);
          } catch (err: unknown) {
            setLoadingStep('');
            playErrorSound();
            if (err instanceof Error) {
              setErrorMsg(`${err.message} (Tip: Switch to Simulated Auth Mode above to bypass)`);
            } else {
              setErrorMsg('Authentication failure. Server unreachable.');
            }
          }
        }, 800);
      }, 800);
    };

    if (useMockMode) {
      runSequence(async () => email);
    } else {
      if (isLoginMode) {
        runSequence(async () => {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          return data.user?.email || email;
        });
      } else {
        runSequence(async () => {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          return data.user?.email || email;
        });
      }
    }
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
            <Server className="w-6 h-6 text-[#00FF41] animate-pulse" />
            <div>
              <span className="text-xs md:text-sm tracking-widest text-[#00FF41] font-bold uppercase block">
                SYS_AUTH // MAINFRAME GATEWAY PROTOCOL
              </span>
              <span className="text-[10px] text-gray-400">AUTHENTICATION ENGINE: SUPABASE SECURE CLOUD</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 text-xs bg-black/80 p-1.5 rounded border border-[#00FF41]/30 font-mono">
            <span className="text-gray-400 text-[10px]">ENGINE:</span>
            <button
              type="button"
              onClick={() => { setUseMockMode(false); playTypingSound(); }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                !useMockMode ? 'bg-[#00FF41] text-black shadow-[0_0_10px_#00FF41]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Real Supabase
            </button>
            <button
              type="button"
              onClick={() => { setUseMockMode(true); playTypingSound(); }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                useMockMode ? 'bg-yellow-400 text-black shadow-[0_0_10px_yellow]' : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              Simulated Mode
            </button>
          </div>
        </div>

        {/* Loading Verification Screen overlay */}
        {loadingStep ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 px-6 bg-black border border-yellow-500/40 rounded-lg text-center space-y-6 box-glow my-6 font-mono"
          >
            <div className="w-16 h-16 bg-yellow-500/10 border-2 border-yellow-400 rounded-full flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 animate-pulse tracking-widest">
                AUTHENTICATING NODE...
              </h3>
              <p className="text-white text-sm tracking-wide text-glow">{loadingStep}</p>
            </div>
          </motion.div>
        ) : isGranted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 px-6 bg-black border border-[#00FF41] rounded-lg text-center space-y-6 box-glow my-6 font-mono"
          >
            <div className="w-16 h-16 bg-[#00FF41]/20 border-2 border-[#00FF41] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#00FF41]" />
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-widest text-glow text-[#00FF41] glitch-text">
                ACCESS GRANTED
              </h2>
              <p className="text-gray-300 text-xs mt-2 tracking-widest font-mono">
                SECURE HANDSHAKE VERIFIED FOR OPERATOR: <span className="text-white font-bold">{email}</span>
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  playSuccessSound();
                  onNext();
                }}
                className="px-8 py-3.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white hover:scale-105 transition-all inline-flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.7)]"
              >
                <span>PROCEED: FINAL REVEAL</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-lg mx-auto bg-black/90 p-6 rounded-lg border border-[#00FF41]/30 font-mono">
            <div className="flex items-center justify-center gap-6 border-b border-[#00FF41]/20 pb-4 mb-4">
              <button
                type="button"
                onClick={() => { setIsLoginMode(true); setErrorMsg(''); playTypingSound(); }}
                className={`text-xs font-bold uppercase tracking-widest pb-1.5 transition-all cursor-pointer ${
                  isLoginMode ? 'text-[#00FF41] border-b-2 border-[#00FF41] text-glow' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                MAINFRAME LOGIN
              </button>
              <button
                type="button"
                onClick={() => { setIsLoginMode(false); setErrorMsg(''); playTypingSound(); }}
                className={`text-xs font-bold uppercase tracking-widest pb-1.5 transition-all cursor-pointer ${
                  !isLoginMode ? 'text-[#00FF41] border-b-2 border-[#00FF41] text-glow' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                NEW OPERATOR SIGNUP
              </button>
            </div>

            {useMockMode && (
              <div className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 p-3 rounded text-[11px] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Simulated Mode Active. Any email & password combination will grant instant access.</span>
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-300 uppercase tracking-widest mb-1 font-bold">
                OPERATOR EMAIL IDENTIFIER:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); playTypingSound(); }}
                className="w-full bg-black border border-[#00FF41]/40 focus:border-[#00FF41] rounded px-4 py-2.5 text-[#00FF41] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00FF41] box-glow"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 uppercase tracking-widest mb-1 font-bold">
                MASTER SECURE PASSKEY:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); playTypingSound(); }}
                className="w-full bg-black border border-[#00FF41]/40 focus:border-[#00FF41] rounded px-4 py-2.5 text-[#00FF41] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00FF41] box-glow"
              />
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded text-xs font-bold rgb-shift">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.5)] tracking-widest"
            >
              {isLoginMode ? (
                <>
                  <LogIn className="w-4 h-4 fill-black" />
                  <span>AUTHORIZE LOGIN & ENTER</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>CREATE USER CERTIFICATE & ENTER</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};
