'use client';

interface QuestCardProps {
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  locked?: boolean;
  completed?: boolean;
  onStart?: () => void;
  questId: string;
}

export function QuestCard({ 
  title, 
  description, 
  difficulty, 
  locked = false, 
  completed = false,
  onStart,
  questId
}: QuestCardProps) {
  const stars = '⭐'.repeat(difficulty);
  const difficultyColors = {
    1: 'from-green-400 to-green-600',
    2: 'from-blue-400 to-blue-600',
    3: 'from-yellow-400 to-yellow-600',
    4: 'from-orange-400 to-orange-600',
    5: 'from-red-400 to-red-600',
  };

  return (
    <div className={`
      relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-300
      ${locked ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl cursor-pointer'}
      ${completed ? 'ring-4 ring-green-400' : ''}
    `}>
      {/* Difficulty Badge */}
      <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${difficultyColors[difficulty]} text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg`}>
        {stars}
      </div>

      {/* Locked Overlay */}
      {locked && (
        <div className="absolute inset-0 bg-gray-900/50 rounded-2xl flex items-center justify-center">
          <div className="text-white text-4xl font-bold">🔒</div>
        </div>
      )}

      {/* Completed Badge */}
      {completed && !locked && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          ✓ Completed
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        
        {!locked && (
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {completed ? 'Retry Quest' : 'Start Quest'}
          </button>
        )}
      </div>
    </div>
  );
}

