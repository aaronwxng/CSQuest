import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { PlayerData } from '../types/GameTypes';

export class PlayerManager {
  private scene: Phaser.Scene;
  private players: Map<string, Player> = new Map();
  private localPlayerId: string | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setLocalPlayerId(playerId: string) {
    this.localPlayerId = playerId;
  }

  addPlayer(playerData: PlayerData, isLocalPlayer: boolean = false): Player {
    // Remove existing player if present
    if (this.players.has(playerData.id)) {
      this.removePlayer(playerData.id);
    }

    const player = new Player(
      this.scene,
      playerData.x,
      playerData.y,
      playerData,
      isLocalPlayer || playerData.id === this.localPlayerId
    );

    this.players.set(playerData.id, player);
    return player;
  }

  removePlayer(playerId: string) {
    const player = this.players.get(playerId);
    if (player) {
      player.destroy();
      this.players.delete(playerId);
    }
  }

  getPlayer(playerId: string): Player | undefined {
    return this.players.get(playerId);
  }

  getLocalPlayer(): Player | undefined {
    if (!this.localPlayerId) return undefined;
    return this.players.get(this.localPlayerId);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  updatePlayerPosition(playerId: string, x: number, y: number) {
    const player = this.players.get(playerId);
    if (player && !player.isLocalPlayer) {
      player.updatePosition(x, y);
    }
  }
}

