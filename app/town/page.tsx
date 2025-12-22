'use client';

import { useRouter } from 'next/navigation';
import { HUD } from '@/components/ui/HUD';
import { QuestCard } from '@/components/ui/QuestCard';

// Mock quest data - in real app, this would come from an API or database
const quests = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Learn the fundamentals of Python programming. Perfect for beginners!',
    difficulty: 1 as const,
    locked: false,
    completed: false,
  },
  {
    id: 'loops-and-conditions',
    title: 'Loops & Conditions',
    description: 'Master if statements, for loops, and while loops.',
    difficulty: 2 as const,
    locked: false,
    completed: false,
  },
  {
    id: 'functions',
    title: 'Functions & Modules',
    description: 'Learn how to write reusable code with functions.',
    difficulty: 3 as const,
    locked: false,
    completed: true,
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Explore lists, dictionaries, and tuples.',
    difficulty: 4 as const,
    locked: true,
    completed: false,
  },
  {
    id: 'object-oriented',
    title: 'Object-Oriented Programming',
    description: 'Master classes, objects, and inheritance.',
    difficulty: 5 as const,
    locked: true,
    completed: false,
  },
];

export default function TownPage() {
  const router = useRouter();

  const handleStartQuest = (questId: string) => {
    router.push(`/quest/${questId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-purple-600">
      <HUD level={3} xp={250} xpToNext={500} coins={150} showBackButton backHref="/" />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Town Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              🏘️ Coding Town
            </h1>
            <p className="text-xl text-white/90 font-semibold drop-shadow-lg">
              Choose a quest to begin your coding adventure!
            </p>
          </div>

          {/* Quest Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                title={quest.title}
                description={quest.description}
                difficulty={quest.difficulty}
                locked={quest.locked}
                completed={quest.completed}
                questId={quest.id}
                onStart={() => handleStartQuest(quest.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
