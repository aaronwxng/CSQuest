'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameState, loadGameState, saveGameState } from '@/lib/gameState';
import { availablePets, getPetBonus } from '@/lib/pets';
import { HUD } from '@/components/ui/HUD';

export function Pets() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const state = loadGameState();
    if (state) {
      setGameState(state);
    } else {
      window.location.href = '/character';
    }
  }, []);

  if (!gameState) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">Loading...</div>;
  }

  const handleSelectPet = (petId: string) => {
    const pet = availablePets.find(p => p.id === petId);
    if (!pet) return;

    const newState: GameState = {
      ...gameState,
      activePet: {
        id: pet.id,
        name: pet.name,
        emoji: pet.emoji,
        level: gameState.pets.find(p => p.id === petId)?.level || 1,
        experience: gameState.pets.find(p => p.id === petId)?.experience || 0,
        unlocked: true,
      },
    };

    // Update pets array
    const petIndex = newState.pets.findIndex(p => p.id === petId);
    if (petIndex >= 0) {
      newState.pets[petIndex] = newState.activePet!;
    } else {
      newState.pets.push(newState.activePet!);
    }

    setGameState(newState);
    saveGameState(newState);
    setTimeout(() => saveGameState(newState), 100);
    alert(`Selected ${pet.name} as your companion!`);
  };

  const activePetBonus = getPetBonus(gameState.activePet || null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500">
      <HUD 
        level={gameState.playerStats.level}
        xp={gameState.playerStats.experience}
        xpToNext={1000}
        coins={gameState.playerStats.coins}
        showBackButton
        backHref="/game"
      />
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/game" className="text-2xl hover:scale-110 transition-transform">←</Link>
              <h1 className="text-4xl font-bold text-gray-800">🐾 Pets & Companions</h1>
            </div>
            
            {/* Active Pet */}
            {gameState.activePet && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-4 border-purple-300">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{gameState.activePet.emoji}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">{gameState.activePet.name}</h2>
                    <p className="text-gray-600">Level {gameState.activePet.level}</p>
                    <div className="mt-2 text-sm">
                      <div>⚔️ +{activePetBonus.attack} Attack</div>
                      <div>🛡️ +{activePetBonus.defense} Defense</div>
                      <div>❤️ +{activePetBonus.health} Health</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pet Collection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availablePets.map((pet) => {
              const owned = gameState.pets.some(p => p.id === pet.id);
              const isActive = gameState.activePet?.id === pet.id;
              const petData = gameState.pets.find(p => p.id === pet.id);

              return (
                <div
                  key={pet.id}
                  className={`bg-white rounded-2xl shadow-xl p-6 border-4 ${
                    isActive ? 'border-green-400 bg-green-50' : owned ? 'border-blue-400' : 'border-gray-300 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">{pet.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{pet.description}</p>
                    
                    {owned && petData && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold">Level {petData.level}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(petData.experience % 100) / 100 * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {isActive && (
                      <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold mb-2">
                        ACTIVE
                      </div>
                    )}

                    {owned && !isActive && (
                      <button
                        onClick={() => handleSelectPet(pet.id)}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Select
                      </button>
                    )}

                    {!owned && (
                      <div className="text-gray-500 text-sm font-semibold">
                        🔒 Locked
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

