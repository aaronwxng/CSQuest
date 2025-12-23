'use client';

import React from 'react';
import Link from 'next/link';
import './Menu.css';

interface MenuProps {
  onClose: () => void;
  playerStats: {
    level: number;
    experience: number;
    username: string;
    coins?: number;
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
            {playerStats.coins !== undefined && (
              <div className="stat-item">
                <span>Coins:</span>
                <span>🪙 {playerStats.coins}</span>
              </div>
            )}
          </div>

          <div className="menu-section">
            <h3>Game</h3>
            <Link href="/shop" onClick={onClose}>
              <button className="menu-button">🛒 Shop</button>
            </Link>
            <Link href="/inventory" onClick={onClose}>
              <button className="menu-button">🎒 Inventory</button>
            </Link>
            <Link href="/pets" onClick={onClose}>
              <button className="menu-button">🐾 Pets</button>
            </Link>
            <Link href="/npcs" onClick={onClose}>
              <button className="menu-button">👥 NPCs & Quests</button>
            </Link>
            <Link href="/achievements" onClick={onClose}>
              <button className="menu-button">🏆 Achievements</button>
            </Link>
            <Link href="/profile" onClick={onClose}>
              <button className="menu-button">👤 Profile</button>
            </Link>
            <Link href="/map" onClick={onClose}>
              <button className="menu-button">🗺️ World Map</button>
            </Link>
          </div>

          <div className="menu-section">
            <h3>Settings</h3>
            <button className="menu-button">Audio Settings</button>
            <button className="menu-button">Graphics Settings</button>
            <button className="menu-button">Controls</button>
          </div>

          <div className="menu-section">
            <Link href="/">
              <button className="menu-button danger">Exit to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
