'use client';

import React from 'react';
import Link from 'next/link';

interface GameHUDProps {
  playerStats: {
    level: number;
    experience: number;
    username: string;
    coins?: number;
    health?: number;
    maxHealth?: number;
    mana?: number;
    maxMana?: number;
  };
  onMenuClick: () => void;
  onChallengeClick: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  playerStats,
  onMenuClick,
  onChallengeClick,
}) => {
  const xpToNext = 1000;
  const xpPercentage = Math.min((playerStats.experience % xpToNext) / xpToNext * 100, 100);
  const healthPercentage = playerStats.maxHealth 
    ? Math.min((playerStats.health || 100) / playerStats.maxHealth * 100, 100)
    : 100;
  const manaPercentage = playerStats.maxMana 
    ? Math.min((playerStats.mana || 50) / playerStats.maxMana * 100, 100)
    : 100;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 font-sans">
      {/* Top Left: Character Info (Prodigy Style) */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl border-4 border-white/30 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Character Avatar */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                🧙
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-gray-800">{playerStats.level}</span>
              </div>
            </div>
            
            {/* Player Name */}
            <div className="flex flex-col">
              <div className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                {playerStats.username}
              </div>
              <div className="text-white/90 text-xs">Coder</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right: Stats (Prodigy Style) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
        {/* Health Bar */}
        <div className="bg-white/95 rounded-xl shadow-2xl border-4 border-red-300 p-2 min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">❤️</span>
            <span className="text-red-600 font-bold text-sm">Health</span>
            <span className="ml-auto text-red-600 font-bold text-xs">
              {playerStats.health || 100} / {playerStats.maxHealth || 100}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
            <div 
              className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full transition-all duration-300 shadow-inner"
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
        </div>

        {/* Mana/Energy Bar */}
        <div className="bg-white/95 rounded-xl shadow-2xl border-4 border-blue-300 p-2 min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">⚡</span>
            <span className="text-blue-600 font-bold text-sm">Mana</span>
            <span className="ml-auto text-blue-600 font-bold text-xs">
              {playerStats.mana || 50} / {playerStats.maxMana || 50}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-300 shadow-inner"
              style={{ width: `${manaPercentage}%` }}
            />
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-white/95 rounded-xl shadow-2xl border-4 border-yellow-300 p-2 min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">⭐</span>
            <span className="text-yellow-600 font-bold text-sm">Experience</span>
            <span className="ml-auto text-yellow-600 font-bold text-xs">
              {playerStats.experience % xpToNext} / {xpToNext}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transition-all duration-500 shadow-inner relative"
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Coins */}
        <div className="bg-white/95 rounded-xl shadow-2xl border-4 border-yellow-300 p-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="text-yellow-600 font-bold text-lg">{playerStats.coins || 0}</span>
            <span className="text-gray-600 text-xs ml-1">Coins</span>
          </div>
        </div>
      </div>

      {/* Bottom Center: Action Buttons (Prodigy Style) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 pointer-events-auto flex-wrap justify-center">
        <button
          onClick={onChallengeClick}
          className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl border-4 border-white/50 transition-all duration-200 hover:scale-110 hover:shadow-green-500/50 flex items-center gap-2 text-lg relative group"
        >
          <span className="text-2xl">💻</span>
          <span>Battle</span>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press B or Space
          </span>
        </button>

        <Link
          href="/shop"
          className="bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl border-4 border-white/50 transition-all duration-200 hover:scale-110 hover:shadow-yellow-500/50 flex items-center gap-2 text-lg relative group"
        >
          <span className="text-2xl">🛒</span>
          <span>Shop</span>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press S
          </span>
        </Link>

        <Link
          href="/inventory"
          className="bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl border-4 border-white/50 transition-all duration-200 hover:scale-110 hover:shadow-orange-500/50 flex items-center gap-2 text-lg relative group"
        >
          <span className="text-2xl">🎒</span>
          <span>Inventory</span>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press I
          </span>
        </Link>

        <button
          onClick={onMenuClick}
          className="bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl border-4 border-white/50 transition-all duration-200 hover:scale-110 hover:shadow-purple-500/50 flex items-center gap-2 text-lg relative group"
        >
          <span className="text-2xl">⚙️</span>
          <span>Menu</span>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press M
          </span>
        </button>

        <Link
          href="/map"
          className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl border-4 border-white/50 transition-all duration-200 hover:scale-110 hover:shadow-blue-500/50 flex items-center gap-2 text-lg relative group"
        >
          <span className="text-2xl">🗺️</span>
          <span>Map</span>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Press P or N
          </span>
        </Link>
      </div>
    </div>
  );
};
