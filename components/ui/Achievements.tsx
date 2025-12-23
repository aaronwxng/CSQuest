'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameState, loadGameState } from '@/lib/gameState';
import { achievements } from '@/lib/achievements';
import { HUD } from '@/components/ui/HUD';

export function Achievements() {
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

  const checkAchievement = (achievement: typeof achievements[0]): { unlocked: boolean; progress: number; max: number } => {
    const unlocked = gameState.achievements.includes(achievement.id);
    let progress = 0;
    let max = achievement.requirement.value;

    switch (achievement.requirement.type) {
      case 'level':
        progress = gameState.playerStats.level;
        break;
      case 'battles_won':
        progress = gameState.stats.battlesWon;
        break;
      case 'questions_correct':
        progress = gameState.stats.questionsCorrect;
        break;
      case 'coins_earned':
        progress = gameState.stats.coinsEarned;
        break;
      case 'quests_completed':
        progress = gameState.completedQuests.length;
        break;
      case 'items_collected':
        progress = gameState.stats.itemsCollected;
        break;
    }

    return { unlocked, progress, max };
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/game" className="text-2xl hover:scale-110 transition-transform">←</Link>
            <h1 className="text-4xl font-bold text-white">🏆 Achievements</h1>
            <div className="ml-auto text-white text-lg">
              {gameState.achievements.length} / {achievements.length} Unlocked
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const { unlocked, progress, max } = checkAchievement(achievement);
              const percentage = Math.min((progress / max) * 100, 100);

              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-2xl shadow-xl p-6 border-4 ${
                    unlocked ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-6xl ${unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{achievement.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      
                      {!unlocked && (
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{progress} / {max}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {unlocked && (
                        <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-sm font-bold">
                          ✓ UNLOCKED
                        </div>
                      )}
                    </div>
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

