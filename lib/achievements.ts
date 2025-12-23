// Achievements system

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: {
    type: 'level' | 'battles_won' | 'questions_correct' | 'coins_earned' | 'quests_completed' | 'items_collected';
    value: number;
  };
  reward?: {
    coins?: number;
    experience?: number;
    item?: string;
  };
}

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Reach level 2',
    emoji: '👶',
    requirement: { type: 'level', value: 2 },
    reward: { coins: 50 },
  },
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Win 10 battles',
    emoji: '⚔️',
    requirement: { type: 'battles_won', value: 10 },
    reward: { coins: 100, experience: 200 },
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Answer 50 questions correctly',
    emoji: '📚',
    requirement: { type: 'questions_correct', value: 50 },
    reward: { coins: 150, experience: 300 },
  },
  {
    id: 'rich',
    name: 'Rich Coder',
    description: 'Earn 1000 coins',
    emoji: '💰',
    requirement: { type: 'coins_earned', value: 1000 },
    reward: { coins: 200 },
  },
  {
    id: 'quest-master',
    name: 'Quest Master',
    description: 'Complete 5 quests',
    emoji: '🏆',
    requirement: { type: 'quests_completed', value: 5 },
    reward: { coins: 250, experience: 500 },
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Collect 10 items',
    emoji: '📦',
    requirement: { type: 'items_collected', value: 10 },
    reward: { coins: 100 },
  },
];

