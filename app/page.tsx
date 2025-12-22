'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [hasCharacter, setHasCharacter] = useState(false);

  useEffect(() => {
    // Check if character is selected
    const character = localStorage.getItem('character');
    const username = localStorage.getItem('username');
    setHasCharacter(!!(character && username));
  }, []);

  const handlePlay = () => {
    if (!hasCharacter) {
      router.push('/character');
    } else {
      router.push('/game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            CSQuest
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-semibold drop-shadow-lg">
            Master Python Through Adventure! 🐍⚔️
          </p>
        </div>

        {/* Play Game Button */}
        <button 
          onClick={handlePlay}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold text-2xl md:text-3xl px-16 py-6 rounded-full shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 hover:scale-110 transform"
        >
          🎮 {hasCharacter ? 'Play Game' : 'Start Adventure'}
        </button>
      </div>
    </div>
  );
}
