// ==========================================
// File: src/App.tsx
// Purpose: Master Cinematic Controller & State Manager for Hacker Transmission.
// ==========================================

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Scene1Boot } from './scenes/Scene1Boot';
import { Scene2Packets } from './scenes/Scene2Packets';
import { Scene3Decrypt } from './scenes/Scene3Decrypt';
import { Scene4HashLab } from './scenes/Scene4HashLab';
import { Scene5Auth } from './scenes/Scene5Auth';
import { Scene6Final } from './scenes/Scene6Final';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string>('Zamran.qaxi@gmail.com');

  const goToNextScene = () => {
    if (currentScene < 6) {
      setCurrentScene(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (email: string) => {
    setAuthenticatedEmail(email);
  };

  const restartSimulation = () => {
    setCurrentScene(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col justify-between selection:bg-[#00FF41] selection:text-black">
      {/* Top Navbar */}
      <Navbar currentScene={currentScene} setScene={setCurrentScene} />

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-2 md:p-6 my-4">
        <AnimatePresence mode="wait">
          {currentScene === 1 && <Scene1Boot key="scene1" onNext={goToNextScene} />}
          {currentScene === 2 && <Scene2Packets key="scene2" onNext={goToNextScene} />}
          {currentScene === 3 && <Scene3Decrypt key="scene3" onNext={goToNextScene} />}
          {currentScene === 4 && <Scene4HashLab key="scene4" onNext={goToNextScene} />}
          {currentScene === 5 && (
            <Scene5Auth key="scene5" onNext={goToNextScene} onAuthSuccess={handleAuthSuccess} />
          )}
          {currentScene === 6 && (
            <Scene6Final key="scene6" userEmail={authenticatedEmail} onRestart={restartSimulation} />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export default App;
