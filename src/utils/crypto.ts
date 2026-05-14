// ==========================================
// File: src/utils/crypto.ts
// Purpose: Cryptographic utilities using crypto-js for SHA-256 and simulation helpers.
// ==========================================

import CryptoJS from 'crypto-js';

// Generate a real SHA-256 hash string
export const generateSHA256 = (input: string): string => {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
};

// Compare two hashes
export const compareHashes = (hashA: string, hashB: string): boolean => {
  return hashA.trim().toLowerCase() === hashB.trim().toLowerCase();
};

// Scramble text with random cyber symbols
export const scrambleText = (text: string, progressRatio: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/|?!=";
  return text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' ';
      const charThreshold = index / text.length;
      if (progressRatio >= charThreshold) {
        return char;
      }
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
};

// Generate random fake IP
export const generateRandomIP = (): string => {
  return `192.168.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
};
