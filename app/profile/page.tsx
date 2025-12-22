'use client';

import { HUD } from '@/components/ui/HUD';
import { ProgressBar } from '@/components/ui/ProgressBar';

// Mock player data - in real app, this would come from an API or database
const playerStats = {
  level: 3,
  xp: 250,
  xpToNext: 500,
  coins: 150,
  accuracy: 85,
  streak: 5,
  totalQuests: 12,
  completedQuests: 8,
  badges: ['First Steps', 'Code Warrior', 'Python Master'],
};

export default function ProfilePage() {
  const xpPercentage = (playerStats.xp / playerStats.xpToNext) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500">
      <HUD 
        level={playerStats.level} 
        xp={playerStats.xp} 
        xpToNext={playerStats.xpToNext} 
        coins={playerStats.coins}
        showBackButton 
        backHref="/town"
      />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              
              {/* Player Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Player Profile</h1>
                <p className="text-gray-600">Level {playerStats.level} Coder</p>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mt-6">
              <ProgressBar 
                current={playerStats.xp} 
                total={playerStats.xpToNext}
                label="Experience"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Accuracy Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{playerStats.accuracy}%</div>
              <div className="text-gray-600 font-semibold">Accuracy</div>
            </div>

            {/* Streak Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{playerStats.streak}</div>
              <div className="text-gray-600 font-semibold">Day Streak</div>
            </div>

            {/* Quests Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="text-4xl mb-2">⚔️</div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {playerStats.completedQuests}/{playerStats.totalQuests}
              </div>
              <div className="text-gray-600 font-semibold">Quests Completed</div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Badges & Achievements</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {playerStats.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 text-center border-2 border-yellow-300"
                >
                  <div className="text-3xl mb-2">🏅</div>
                  <div className="font-bold text-gray-800">{badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

