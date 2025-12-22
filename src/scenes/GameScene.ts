import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Create ground tiles texture first
    const groundGraphics = this.add.graphics();
    groundGraphics.fillStyle(0x27ae60, 1);
    groundGraphics.fillRect(0, 0, 64, 64);
    groundGraphics.generateTexture('ground', 64, 64);
    groundGraphics.destroy();

    // Add ground tiles (with depth 0 - background layer)
    for (let x = 0; x < 1024; x += 64) {
      for (let y = 0; y < 768; y += 64) {
        const tile = this.add.image(x + 32, y + 32, 'ground');
        tile.setDepth(0);
      }
    }

    // Create player texture
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x3498db, 1);
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('player', 32, 32);
    playerGraphics.destroy();

    // Create the player sprite with the generated texture
    this.player = this.physics.add.sprite(512, 384, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10); // Ensure player is above ground tiles
    this.player.setTint(0x3498db); // Ensure color is applied

    // Set up input
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys('W,S,A,D') as {
      W: Phaser.Input.Keyboard.Key;
      A: Phaser.Input.Keyboard.Key;
      S: Phaser.Input.Keyboard.Key;
      D: Phaser.Input.Keyboard.Key;
    };
  }

  update() {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    // Handle movement input
    if (this.cursors.left!.isDown || this.wasd.A.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right!.isDown || this.wasd.D.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up!.isDown || this.wasd.W.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down!.isDown || this.wasd.S.isDown) {
      velocityY = speed;
    }

    this.player.setVelocity(velocityX, velocityY);
  }
}

