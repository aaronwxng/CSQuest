// Pet/Companion system

export interface Pet {
  id: string;
  name: string;
  emoji: string;
  description: string;
  level: number;
  experience: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: {
    attack: number;
    defense: number;
    health: number;
  };
  unlocked: boolean;
}

export const availablePets: Pet[] = [
  {
    id: 'code-cat',
    name: 'Code Cat',
    emoji: '🐱',
    description: 'A friendly cat that helps debug your code',
    level: 1,
    experience: 0,
    rarity: 'common',
    stats: { attack: 5, defense: 3, health: 20 },
    unlocked: true, // Starter pet
  },
  {
    id: 'python-snake',
    name: 'Python Snake',
    emoji: '🐍',
    description: 'A powerful Python companion',
    level: 1,
    experience: 0,
    rarity: 'rare',
    stats: { attack: 10, defense: 5, health: 30 },
    unlocked: false,
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    emoji: '🦋',
    description: 'Finds and fixes bugs automatically',
    level: 1,
    experience: 0,
    rarity: 'epic',
    stats: { attack: 15, defense: 10, health: 40 },
    unlocked: false,
  },
  {
    id: 'code-dragon',
    name: 'Code Dragon',
    emoji: '🐉',
    description: 'The ultimate coding companion',
    level: 1,
    experience: 0,
    rarity: 'legendary',
    stats: { attack: 25, defense: 20, health: 60 },
    unlocked: false,
  },
];

export function getPetBonus(pet: Pet | null): { attack: number; defense: number; health: number } {
  if (!pet) return { attack: 0, defense: 0, health: 0 };
  
  // Scale stats by level
  const levelMultiplier = 1 + (pet.level - 1) * 0.2;
  return {
    attack: Math.floor(pet.stats.attack * levelMultiplier),
    defense: Math.floor(pet.stats.defense * levelMultiplier),
    health: Math.floor(pet.stats.health * levelMultiplier),
  };
}

