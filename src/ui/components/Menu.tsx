'use client';

import React from 'react';
import './Menu.css';

interface MenuProps {
  onClose: () => void;
  playerStats: {
    level: number;
    experience: number;
    username: string;
  };
}

export const Menu: React.FC<MenuProps> = ({ onClose, playerStats }) => {
  return (
    <div className="menu-overlay react-ui-overlay" onClick={onClose}>
      <div className="menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h2>Menu</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="menu-body">
          <div className="menu-section">
            <h3>Player Stats</h3>
            <div className="stat-item">
              <span>Username:</span>
              <span>{playerStats.username}</span>
            </div>
            <div className="stat-item">
              <span>Level:</span>
              <span>{playerStats.level}</span>
            </div>
            <div className="stat-item">
              <span>Experience:</span>
              <span>{playerStats.experience}</span>
            </div>
          </div>

          <div className="menu-section">
            <h3>Settings</h3>
            <button className="menu-button">Audio Settings</button>
            <button className="menu-button">Graphics Settings</button>
            <button className="menu-button">Controls</button>
          </div>

          <div className="menu-section">
            <button className="menu-button danger">Exit Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};

