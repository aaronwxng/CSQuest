'use client';

import Link from 'next/link';

interface HUDProps {
  level?: number;
  xp?: number;
  xpToNext?: number;
  coins?: number;
  showBackButton?: boolean;
  backHref?: string;
}

export function HUD({ 
  level = 1, 
  xp = 0, 
  xpToNext = 100, 
  coins = 0,
  showBackButton = false,
  backHref = '/'
}: HUDProps) {
  const xpPercentage = Math.min((xp / xpToNext) * 100, 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-purple-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo / Back Button */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link 
              href={backHref}
              className="text-white hover:text-yellow-200 transition-colors text-xl font-bold"
            >
              ← Back
            </Link>
          )}
          <Link href="/" className="text-white text-2xl font-bold hover:text-yellow-200 transition-colors">
            CSQuest
          </Link>
        </div>

        {/* Right: Player Stats */}
        <div className="flex items-center gap-6">
          {/* Level - Clickable to Profile */}
          <Link href="/profile">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
              <span className="text-yellow-300 font-bold text-lg">Lv.{level}</span>
            </div>
          </Link>

          {/* XP Bar */}
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm min-w-[200px]">
            <span className="text-white text-sm font-semibold">XP</span>
            <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <span className="text-white text-xs font-semibold">{xp}/{xpToNext}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
            <span className="text-yellow-300 text-xl">🪙</span>
            <span className="text-white font-bold text-lg">{coins}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

