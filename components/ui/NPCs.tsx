'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameState, loadGameState, saveGameState } from '@/lib/gameState';
import { npcs, quests, Quest } from '@/lib/npcs';
import { HUD } from '@/components/ui/HUD';

export function NPCs() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedNPC, setSelectedNPC] = useState<string | null>(null);

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

  const npc = selectedNPC ? npcs.find(n => n.id === selectedNPC) : null;
  const npcQuests = npc ? quests.filter(q => q.npcId === npc.id) : [];

  const canStartQuest = (quest: Quest) => {
    if (quest.completed) return false;
    if (quest.requirements.level && gameState.playerStats.level < quest.requirements.level) return false;
    if (quest.requirements.completedQuests) {
      return quest.requirements.completedQuests.every(id => gameState.completedQuests.includes(id));
    }
    return true;
  };

  const handleStartQuest = (questId: string) => {
    // Navigate to quest page
    window.location.href = `/quest/${questId}`;
  };

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
          <div className="flex items-center gap-4 mb-6">
            <Link href="/game" className="text-2xl hover:scale-110 transition-transform">←</Link>
            <h1 className="text-4xl font-bold text-white">👥 NPCs & Quests</h1>
          </div>

          {!selectedNPC ? (
            <div className="grid md:grid-cols-2 gap-6">
              {npcs.map((npc) => (
                <div
                  key={npc.id}
                  className="bg-white rounded-2xl shadow-2xl p-6 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setSelectedNPC(npc.id)}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">{npc.emoji}</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{npc.name}</h2>
                    <p className="text-gray-600 mb-2">{npc.description}</p>
                    <p className="text-sm text-gray-500">📍 {npc.location}</p>
                    <p className="text-sm text-blue-600 mt-4">Click to talk →</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedNPC(null)}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ←
                </button>
                <div className="text-6xl">{npc!.emoji}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{npc!.name}</h2>
                  <p className="text-gray-600">{npc!.location}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
                <p className="text-lg text-gray-800">{npc!.dialogue.greeting}</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Available Quests</h3>
              <div className="space-y-4">
                {npcQuests.map((quest) => {
                  const canStart = canStartQuest(quest);
                  const completed = gameState.completedQuests.includes(quest.id);

                  return (
                    <div
                      key={quest.id}
                      className={`border-4 rounded-xl p-6 ${
                        completed ? 'border-green-400 bg-green-50' : canStart ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{quest.title}</h4>
                          <p className="text-gray-600 mb-4">{quest.description}</p>
                          <div className="text-sm text-gray-500 mb-2">
                            <div>⭐ +{quest.rewards.experience} XP</div>
                            <div>🪙 +{quest.rewards.coins} Coins</div>
                          </div>
                          {!canStart && !completed && (
                            <div className="text-red-600 text-sm">
                              Requirements: Level {quest.requirements.level || 1}+
                            </div>
                          )}
                        </div>
                        <div>
                          {completed ? (
                            <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold">
                              ✓ Completed
                            </div>
                          ) : canStart ? (
                            <button
                              onClick={() => handleStartQuest(quest.id)}
                              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg"
                            >
                              Start Quest
                            </button>
                          ) : (
                            <div className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold">
                              🔒 Locked
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

