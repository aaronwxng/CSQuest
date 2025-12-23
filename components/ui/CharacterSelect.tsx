'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createInitialState, saveGameState } from '@/lib/gameState';

const characters = [
  { id: 'wizard', name: 'Wizard', emoji: '🧙', color: 'from-purple-400 to-purple-600', description: 'Master of code magic' },
  { id: 'knight', name: 'Knight', emoji: '🛡️', color: 'from-blue-400 to-blue-600', description: 'Defender of logic' },
  { id: 'archer', name: 'Archer', emoji: '🏹', color: 'from-green-400 to-green-600', description: 'Precise and fast' },
  { id: 'mage', name: 'Mage', emoji: '🔮', color: 'from-pink-400 to-pink-600', description: 'Powerful spellcaster' },
];

export function CharacterSelect() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (selectedCharacter && username.trim()) {
      // Store character selection
      localStorage.setItem('character', selectedCharacter);
      localStorage.setItem('username', username);
      
      // Initialize game state
      const initialState = createInitialState(username, selectedCharacter);
      saveGameState(initialState);
      
      router.push('/game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Choose Your Character
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select your coding hero and begin your adventure!
        </p>

        {/* Character Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedCharacter(char.id)}
              className={`p-6 rounded-2xl border-4 transition-all duration-200 ${
                selectedCharacter === char.id
                  ? 'border-yellow-400 bg-yellow-50 scale-105 shadow-xl'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className={`text-6xl mb-3 bg-gradient-to-br ${char.color} rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg`}>
                {char.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{char.name}</h3>
              <p className="text-sm text-gray-600">{char.description}</p>
            </button>
          ))}
        </div>

        {/* Username Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Enter Your Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your coder name..."
            className="w-full px-4 py-3 rounded-xl border-4 border-gray-300 focus:border-purple-500 focus:outline-none text-lg"
            maxLength={20}
          />
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selectedCharacter || !username.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl border-4 border-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          🚀 Start Adventure
        </button>
      </div>
    </div>
  );
}

