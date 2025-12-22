// Dynamic imports to avoid SSR issues with Phaser
let phaserGame: any = null;

export async function initPhaserGame() {
  // Only run on client side
  if (typeof window === 'undefined') {
    return;
  }

  // Dynamically import Phaser and GameScene only on client
  const Phaser = (await import('phaser')).default;
  const { GameScene } = await import('./scenes/GameScene');

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
          gravity: { x: 0, y: 0 },
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

