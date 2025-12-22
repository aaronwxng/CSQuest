'use client';

import Link from 'next/link';

interface WorldMapProps {
  playerLevel: number;
}

const areas = [
  { id: 'forest', name: 'Python Forest', emoji: '🌲', level: 1, unlocked: true, color: 'from-green-400 to-green-600' },
  { id: 'desert', name: 'Syntax Desert', emoji: '🏜️', level: 2, unlocked: true, color: 'from-yellow-400 to-orange-600' },
  { id: 'ocean', name: 'Data Ocean', emoji: '🌊', level: 3, unlocked: true, color: 'from-blue-400 to-blue-600' },
  { id: 'mountain', name: 'Algorithm Mountain', emoji: '⛰️', level: 4, unlocked: false, color: 'from-gray-400 to-gray-600' },
  { id: 'volcano', name: 'Code Volcano', emoji: '🌋', level: 5, unlocked: false, color: 'from-red-400 to-red-600' },
];

export function WorldMap({ playerLevel }: WorldMapProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-2xl">
          🗺️ World Map
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={area.unlocked ? `/area/${area.id}` : '#'}
              className={`relative bg-white rounded-2xl shadow-2xl p-6 text-center transition-all duration-300 ${
                area.unlocked 
                  ? 'hover:scale-105 cursor-pointer border-4 border-white' 
                  : 'opacity-60 cursor-not-allowed border-4 border-gray-400'
              }`}
            >
              {!area.unlocked && (
                <div className="absolute inset-0 bg-gray-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">🔒</div>
                </div>
              )}
              
              <div className={`text-8xl mb-4 bg-gradient-to-br ${area.color} rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg`}>
                {area.emoji}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{area.name}</h2>
              <p className="text-gray-600 text-sm">Level {area.level}+</p>
              
              {area.unlocked && (
                <div className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg font-bold">
                  Enter
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/game"
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl shadow-xl hover:bg-purple-50 transition-all duration-200 inline-block"
          >
            ← Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
}

