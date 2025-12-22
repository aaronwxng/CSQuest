import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { PlayerData } from '../src/types/GameTypes';

const app = express();
const httpServer = createServer(app);

// Configure CORS
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Store game state
const gameState = {
  players: new Map<string, PlayerData>(),
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('joinGame', (username: string, callback) => {
    const playerId = uuidv4();
    const playerData: PlayerData = {
      id: playerId,
      x: 512,
      y: 384,
      username: username || `Player_${playerId.slice(0, 6)}`,
      color: Math.floor(Math.random() * 0xffffff),
      level: 1,
      experience: 0,
    };

    // Store player
    gameState.players.set(playerId, playerData);
    socket.data.playerId = playerId;

    // Send player their ID
    callback(playerId);

    // Send current players list to the new player
    socket.emit('playersList', Array.from(gameState.players.values()));

    // Notify other players
    socket.broadcast.emit('playerJoined', playerData);

    console.log(`Player joined: ${playerData.username} (${playerId})`);
  });

  socket.on('move', (x: number, y: number) => {
    const playerId = socket.data.playerId;
    if (!playerId || !gameState.players.has(playerId)) return;

    const player = gameState.players.get(playerId)!;
    player.x = x;
    player.y = y;

    // Broadcast movement to other players
    socket.broadcast.emit('playerMoved', {
      id: playerId,
      x,
      y,
    });
  });

  socket.on('interact', (targetId: string, action: string) => {
    const playerId = socket.data.playerId;
    console.log(`Player ${playerId} interacted with ${targetId}: ${action}`);
    // Handle interactions (NPCs, objects, etc.)
  });

  socket.on('submitCode', (challengeId: string, code: string) => {
    const playerId = socket.data.playerId;
    console.log(`Player ${playerId} submitted code for challenge ${challengeId}`);
    // Handle code submission and validation
  });

  socket.on('disconnect', () => {
    const playerId = socket.data.playerId;
    if (playerId && gameState.players.has(playerId)) {
      const player = gameState.players.get(playerId);
      console.log(`Player left: ${player?.username} (${playerId})`);

      // Remove player from game state
      gameState.players.delete(playerId);

      // Notify other players
      socket.broadcast.emit('playerLeft', playerId);
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

