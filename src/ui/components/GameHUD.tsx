import React from 'react';
import './GameHUD.css';

interface GameHUDProps {
  playerStats: {
    level: number;
    experience: number;
    username: string;
  };
  onMenuClick: () => void;
  onChallengeClick: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  playerStats,
  onMenuClick,
  onChallengeClick,
}) => {
  return (
    <div className="game-hud react-ui-overlay">
      <div className="hud-top">
        <div className="player-info">
          <div className="player-name">{playerStats.username}</div>
          <div className="player-level">Level {playerStats.level}</div>
        </div>
        <div className="experience-bar">
          <div className="exp-label">XP: {playerStats.experience}</div>
          <div className="exp-bar-container">
            <div
              className="exp-bar-fill"
              style={{ width: `${(playerStats.experience % 1000) / 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="hud-bottom">
        <button className="hud-button" onClick={onChallengeClick}>
          💻 Challenges
        </button>
        <button className="hud-button" onClick={onMenuClick}>
          ⚙️ Menu
        </button>
      </div>
    </div>
  );
};

