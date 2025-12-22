import { io, Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  PlayerData,
} from '../types/GameTypes';

export class NetworkManager {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private isConnected: boolean = false;
  private playerId: string | null = null;

  constructor(serverUrl: string = 'http://localhost:3001') {
    this.socket = io(serverUrl, {
      transports: ['websocket'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  joinGame(username: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinGame', username, (playerId: string) => {
        this.playerId = playerId;
        resolve(playerId);
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        if (!this.playerId) {
          reject(new Error('Failed to join game'));
        }
      }, 5000);
    });
  }

  sendMove(x: number, y: number) {
    if (this.isConnected) {
      this.socket.emit('move', x, y);
    }
  }

  sendInteract(targetId: string, action: string) {
    if (this.isConnected) {
      this.socket.emit('interact', targetId, action);
    }
  }

  submitCode(challengeId: string, code: string) {
    if (this.isConnected) {
      this.socket.emit('submitCode', challengeId, code);
    }
  }

  onPlayerJoined(callback: (player: PlayerData) => void) {
    this.socket.on('playerJoined', callback);
  }

  onPlayerLeft(callback: (playerId: string) => void) {
    this.socket.on('playerLeft', callback);
  }

  onPlayerMoved(callback: (data: { id: string; x: number; y: number }) => void) {
    this.socket.on('playerMoved', callback);
  }

  onPlayersList(callback: (players: PlayerData[]) => void) {
    this.socket.on('playersList', callback);
  }

  getSocket() {
    return this.socket;
  }

  getPlayerId(): string | null {
    return this.playerId;
  }

  isSocketConnected(): boolean {
    return this.isConnected;
  }

  disconnect() {
    this.socket.disconnect();
  }
}

