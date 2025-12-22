import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';

let phaserGame: Phaser.Game | null = null;

export function initPhaserGame() {
  // Wait a bit for React to render the container
  setTimeout(() => {
    const container = document.getElementById('game-container');
    if (!container || phaserGame) {
      return;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      parent: 'game-container',
      backgroundColor: '#2c3e50',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    phaserGame = new Phaser.Game(config);
  }, 100);
}

export function getPhaserGame(): Phaser.Game | null {
  return phaserGame;
}

