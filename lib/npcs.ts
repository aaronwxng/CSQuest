// NPCs and Quests system

export interface Quest {
  id: string;
  title: string;
  description: string;
  npcId: string;
  requirements: {
    level?: number;
    completedQuests?: string[];
  };
  rewards: {
    experience: number;
    coins: number;
    items?: string[];
  };
  questions: string[]; // Question IDs
  completed: boolean;
}

export interface NPC {
  id: string;
  name: string;
  emoji: string;
  description: string;
  location: string;
  dialogue: {
    greeting: string;
    questAvailable: string;
    questCompleted: string;
    default: string;
  };
  quests: string[]; // Quest IDs
}

export const npcs: NPC[] = [
  {
    id: 'professor-python',
    name: 'Professor Python',
    emoji: '👨‍🏫',
    description: 'A wise teacher who knows all about Python',
    location: 'Python Forest',
    dialogue: {
      greeting: 'Hello! Ready to learn Python?',
      questAvailable: 'I have a quest for you! Complete it to earn rewards.',
      questCompleted: 'Excellent work! Here are your rewards.',
      default: 'Keep practicing and you\'ll become a great coder!',
    },
    quests: ['quest-1', 'quest-2'],
  },
  {
    id: 'code-warrior',
    name: 'Code Warrior',
    emoji: '⚔️',
    description: 'A battle-hardened coder',
    location: 'Syntax Desert',
    dialogue: {
      greeting: 'Ready for a challenge?',
      questAvailable: 'Defeat these coding challenges!',
      questCompleted: 'You\'ve proven yourself!',
      default: 'Train hard and fight well!',
    },
    quests: ['quest-3'],
  },
];

export const quests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Python Basics',
    description: 'Answer 3 basic Python questions correctly',
    npcId: 'professor-python',
    requirements: { level: 1 },
    rewards: { experience: 200, coins: 50 },
    questions: ['mc-1', 'mc-2', 'fill-1'],
    completed: false,
  },
  {
    id: 'quest-2',
    title: 'String Mastery',
    description: 'Master string operations in Python',
    npcId: 'professor-python',
    requirements: { level: 2, completedQuests: ['quest-1'] },
    rewards: { experience: 300, coins: 75 },
    questions: ['mc-2', 'fill-1'],
    completed: false,
  },
  {
    id: 'quest-3',
    title: 'Battle Challenge',
    description: 'Win 3 battles in a row',
    npcId: 'code-warrior',
    requirements: { level: 3 },
    rewards: { experience: 500, coins: 100, items: ['iron-sword'] },
    questions: [],
    completed: false,
  },
];

