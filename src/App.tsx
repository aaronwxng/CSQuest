import React, { useState, useEffect } from 'react';
import { GameHUD } from './ui/components/GameHUD';
import { ChallengePanel } from './ui/components/ChallengePanel';
import { Menu } from './ui/components/Menu';
import './App.css';

export const App: React.FC = () => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    username: 'Player',
  });

  // Initialize Phaser game when component mounts
  useEffect(() => {
    import('./phaser-init').then((module) => {
      module.initPhaserGame();
    });
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
};

