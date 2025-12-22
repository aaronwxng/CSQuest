// Game constants
export const GAME_CONFIG = {
  WIDTH: 1024,
  HEIGHT: 768,
  PLAYER_SPEED: 200,
  TILE_SIZE: 64,
};

export const NETWORK_CONFIG = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3001',
  RECONNECT_DELAY: 1000,
  MAX_RECONNECT_ATTEMPTS: 5,
};

export const COLORS = {
  PLAYER_DEFAULT: 0x3498db,
  GROUND: 0x27ae60,
  BACKGROUND: 0x2c3e50,
};

