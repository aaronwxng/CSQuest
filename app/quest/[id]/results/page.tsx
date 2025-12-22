'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { HUD } from '@/components/ui/HUD';

export default function QuestResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '5');
  const percentage = Math.round((score / total) * 100);
  
  // Calculate rewards
  const xpGained = score * 50; // 50 XP per correct answer
  const coinsGained = score * 10; // 10 coins per correct answer

  const getPerformanceMessage = () => {
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect Score!', color: 'from-yellow-400 to-yellow-600' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent!', color: 'from-green-400 to-green-600' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good Job!', color: 'from-blue-400 to-blue-600' };
    return { emoji: '💪', message: 'Keep Practicing!', color: 'from-orange-400 to-orange-600' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <HUD level={3} xp={250} xpToNext={500} coins={150} showBackButton backHref="/town" />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* Performance Header */}
            <div className={`text-8xl mb-4 bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}>
              {performance.emoji}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{performance.message}</h1>
            <p className="text-2xl text-gray-600 mb-8">
              You scored <span className="font-bold text-purple-600">{score}/{total}</span>
            </p>

            {/* Score Circle */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 88} ${2 * Math.PI * 88}`}
                    className="text-purple-600 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-purple-600">{percentage}%</span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Rewards Earned</h2>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-purple-600">+{xpGained} XP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🪙</div>
                  <div className="text-2xl font-bold text-yellow-600">+{coinsGained} Coins</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Retry Quest
              </button>
              <button
                onClick={() => router.push('/town')}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Back to Town
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

