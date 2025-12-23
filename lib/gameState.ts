// Game state management with save/load functionality

export interface PlayerStats {
  level: number;
  experience: number;
  username: string;
  coins: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  character?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'cosmetic';
  emoji: string;
  description: string;
  price: number;
  stats?: {
    attack?: number;
    defense?: number;
    health?: number;
    mana?: number;
  };
  quantity?: number; // For consumables
}

export interface Pet {
  id: string;
  name: string;
  emoji: string;
  level: number;
  experience: number;
  unlocked: boolean;
}

export interface GameState {
  playerStats: PlayerStats;
  inventory: InventoryItem[];
  equipped: {
    weapon?: InventoryItem;
    armor?: InventoryItem;
  };
  achievements: string[];
  completedQuests: string[];
  activePet?: Pet;
  pets: Pet[];
  stats: {
    battlesWon: number;
    questionsCorrect: number;
    coinsEarned: number;
    itemsCollected: number;
  };
}

const STORAGE_KEY = 'csquest_game_state';

export function saveGameState(state: GameState): void {
  try {
    // Also save username and character separately for easy access
    if (state.playerStats.username) {
      localStorage.setItem('username', state.playerStats.username);
    }
    if (state.playerStats.character) {
      localStorage.setItem('character', state.playerStats.character);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Force sync
    localStorage.setItem(STORAGE_KEY + '_backup', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function loadGameState(): GameState | null {
  try {
    // Try main save first
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Try backup
      saved = localStorage.getItem(STORAGE_KEY + '_backup');
    }
    if (saved) {
      const state = JSON.parse(saved) as GameState;
      // Ensure username and character are synced
      if (state.playerStats.username) {
        localStorage.setItem('username', state.playerStats.username);
      }
      if (state.playerStats.character) {
        localStorage.setItem('character', state.playerStats.character);
      }
      return state;
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }
  return null;
}

export function createInitialState(username: string, character: string): GameState {
  return {
    playerStats: {
      level: 1,
      experience: 0,
      username,
      coins: 150,
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      character,
    },
    inventory: [],
    equipped: {},
    achievements: [],
    completedQuests: [],
    activePet: {
      id: 'code-cat',
      name: 'Code Cat',
      emoji: '🐱',
      level: 1,
      experience: 0,
      unlocked: true,
    },
    pets: [{
      id: 'code-cat',
      name: 'Code Cat',
      emoji: '🐱',
      level: 1,
      experience: 0,
      unlocked: true,
    }],
    stats: {
      battlesWon: 0,
      questionsCorrect: 0,
      coinsEarned: 0,
      itemsCollected: 0,
    },
  };
}

export function getDefaultState(): GameState {
  return createInitialState('Player', 'wizard');
}

