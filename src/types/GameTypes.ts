// Game entity types
export interface PlayerData {
  id: string;
  x: number;
  y: number;
  username: string;
  color?: number;
  level?: number;
  experience?: number;
}

export interface NPCData {
  id: string;
  x: number;
  y: number;
  type: string;
  dialogue?: string[];
}

// Multiplayer event types
export interface ServerToClientEvents {
  playerJoined: (player: PlayerData) => void;
  playerLeft: (playerId: string) => void;
  playerMoved: (data: { id: string; x: number; y: number }) => void;
  playersList: (players: PlayerData[]) => void;
  gameState: (state: any) => void;
}

export interface ClientToServerEvents {
  joinGame: (username: string, callback: (playerId: string) => void) => void;
  move: (x: number, y: number) => void;
  interact: (targetId: string, action: string) => void;
  submitCode: (challengeId: string, code: string) => void;
}

// Educational coding challenge types
export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  templateCode: string;
  testCases: TestCase[];
  reward: {
    experience: number;
    items?: string[];
  };
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  description?: string;
}

export interface ChallengeSubmission {
  challengeId: string;
  code: string;
  playerId: string;
}

