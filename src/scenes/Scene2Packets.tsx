// ==========================================
// File: src/scenes/Scene2Packets.tsx
// Purpose: Scene 2 - Live Network Packet Hacking Simulation
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Play, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { playTypingSound, playSuccessSound, playGlitchSound } from '../utils/sounds';
import { generateRandomIP } from '../utils/crypto';

interface PacketLog {
  id: number;
  timestamp: string;
  ip: string;
  status: string;
  payload: string;
}

interface Scene2Props {
  onNext: () => void;
}

const FAKE_LOG_MESSAGES = [
  "Packet received from ",
  "Firewall bypassed on port 443",
  "SSL Tunnel established",
  "Intrusion vector detected at ",
  "Payload injected successfully into node",
  "Data stream intercepted from "
];

export const Scene2Packets: React.FC<Scene2Props> = ({ onNext }) => {
  const [logs, setLogs] = useState<PacketLog[]>([]);
  const [isIntercepting, setIsIntercepting] = useState<boolean>(false);
  const [captureComplete, setCaptureComplete] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const startPacketCapture = () => {
    setIsIntercepting(true);
    setLogs([]);
    setProgress(0);
    setCaptureComplete(false);
    playGlitchSound();

    let counter = 0;
    const maxIntervals = 20;

    const interval = setInterval(() => {
      counter++;
      setProgress(Math.floor((counter / maxIntervals) * 100));
      playTypingSound();

      const ip = generateRandomIP();
      const randMsg = FAKE_LOG_MESSAGES[Math.floor(Math.random() * FAKE_LOG_MESSAGES.length)];
      const text = randMsg.includes('from') || randMsg.includes('detected at') ? `${randMsg}${ip}` : randMsg;
      
      const newLog: PacketLog = {
        id: counter,
        timestamp: new Date().toISOString().substring(11, 23),
        ip,
        status: Math.random() > 0.2 ? 'OK_INTRUDE' : 'WARN_BYPASS',
        payload: text,
      };

      setLogs(prev => [newLog, ...prev.slice(0, 8)]); // keep last 9

      if (counter >= maxIntervals) {
        clearInterval(interval);
        setIsIntercepting(false);
        setCaptureComplete(true);
        playSuccessSound();
      }
    }, 300);
  };

  useEffect(() => {
    // Optionally trigger on mount or button click
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
            <Network className="w-6 h-6 text-[#00FF41] animate-spin" />
            <div>
              <span className="text-xs md:text-sm tracking-widest text-[#00FF41] font-bold uppercase block">
                INTRUSION_SIM // NETWORK PACKET CAPTURE
              </span>
              <span className="text-[10px] text-gray-400">ACTIVE PROBE: MULTI-THREADED IP SNIFFER</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isIntercepting && !captureComplete && (
              <button
                onClick={startPacketCapture}
                className="px-5 py-2 bg-[#00FF41] text-black font-extrabold text-xs rounded hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
              >
                <Play className="w-4 h-4 fill-black" />
                <span className="tracking-widest">START INTRUSION</span>
              </button>
            )}
            {isIntercepting && (
              <div className="flex items-center gap-2 bg-[#00FF41]/20 border border-[#00FF41] px-3 py-1.5 rounded text-xs text-[#00FF41] font-bold animate-pulse">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>SNIFFING PACKETS... {progress}%</span>
              </div>
            )}
            {captureComplete && (
              <div className="bg-red-500/20 border border-red-500 px-3 py-1.5 rounded text-xs text-red-500 font-bold rgb-shift animate-pulse">
                FIREWALL BYPASSED // TUNNEL SECURED
              </div>
            )}
          </div>
        </div>

        {/* Flowing Network Lines Animation Box */}
        <div className="w-full bg-black/80 border border-[#00FF41]/20 rounded p-4 mb-6 relative overflow-hidden flex items-center justify-around h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent animate-pulse"></div>
          <span className="text-xs font-mono text-gray-500 z-10">LOCAL HOST [127.0.0.1]</span>
          <div className="flex-grow mx-4 relative h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ left: '-20%' }}
              animate={{ left: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-24 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"
            ></motion.div>
          </div>
          <span className="text-xs font-mono text-[#00FF41] z-10 font-bold">TARGET MAINFRAME [SECURE]</span>
        </div>

        {/* Terminal Feed Table */}
        <div className="border border-[#00FF41]/30 rounded bg-black/90 min-h-[300px] font-mono text-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00FF41]/20 border-b border-[#00FF41]/30 text-gray-300">
                <th className="p-2.5">ID</th>
                <th className="p-2.5">TIMESTAMP</th>
                <th className="p-2.5">IP SOURCE</th>
                <th className="p-2.5">STATUS</th>
                <th className="p-2.5">PAYLOAD DATA</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && !isIntercepting && (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-gray-500">
                    Awaiting network command. Click "START INTRUSION" to sniff data packets.
                  </td>
                </tr>
              )}
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-[#00FF41]/10 hover:bg-[#00FF41]/10 transition-colors text-gray-300"
                  >
                    <td className="p-2.5 text-[#00FF41] font-bold">{log.id}</td>
                    <td className="p-2.5 text-gray-500">{log.timestamp}</td>
                    <td className="p-2.5 text-yellow-400 font-mono">{log.ip}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'OK_INTRUDE' ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-white font-mono tracking-wide text-glow">{log.payload}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Next Stage Footer */}
        {captureComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-4 border-t border-[#00FF41]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-xs text-red-500 font-mono rgb-shift flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Encrypted transmission intercepted. Decryption required.</span>
            </div>
            <button
              onClick={() => {
                playSuccessSound();
                onNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00FF41] text-black font-extrabold rounded hover:bg-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            >
              <span>PROCEED: DECRYPTION SEQUENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
