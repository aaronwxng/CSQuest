'use client';

import { useEffect, useState } from 'react';
import { GameHUD } from '@/src/ui/components/GameHUD';
import { ChallengePanel } from '@/src/ui/components/ChallengePanel';
import { Menu } from '@/src/ui/components/Menu';
import '@/src/App.css';

export default function GamePage() {
  const [showChallenge, setShowChallenge] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    username: 'Player',
  });

  // Initialize Phaser game when component mounts (client-side only)
  useEffect(() => {
    // Dynamically import Phaser only on client side
    import('@/src/phaser-init').then((module) => {
      module.initPhaserGame();
    });

    // Cleanup on unmount
    return () => {
      // Cleanup Phaser game if needed
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        gameContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="app-container">
      {/* Phaser game canvas container */}
      <div id="game-container"></div>

      {/* React UI Overlays */}
      <GameHUD
        playerStats={playerStats}
        onMenuClick={() => setShowMenu(true)}
        onChallengeClick={() => setShowChallenge(true)}
      />

      {showChallenge && (
        <ChallengePanel
          onClose={() => setShowChallenge(false)}
          onSubmit={(code) => {
            console.log('Code submitted:', code);
            // Handle code submission
          }}
        />
      )}

      {showMenu && (
        <Menu
          onClose={() => setShowMenu(false)}
          playerStats={playerStats}
        />
      )}
    </div>
  );
}

