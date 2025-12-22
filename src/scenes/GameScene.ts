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

  preload() {
    // Load the male walk cycle spritesheet
    // Image dimensions: 576 x 256 pixels
    // 9 frames per row: 576 / 9 = 64 pixels per frame width
    // 4 rows: 256 / 4 = 64 pixels per frame height
    const FRAME_WIDTH = 64;   // Width of each frame in pixels (576 / 9 = 64)
    const FRAME_HEIGHT = 64;  // Height of each frame in pixels (256 / 4 = 64)
    
    this.load.spritesheet('player-walk', '/game/assets/player/male_walkcycle.png', {
      frameWidth: FRAME_WIDTH,
      frameHeight: FRAME_HEIGHT,
    });
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

    // Create the player sprite using the walk cycle spritesheet
    this.player = this.physics.add.sprite(512, 384, 'player-walk');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10); // Ensure player is above ground tiles

    // Create walk animations from the spritesheet
    // Image: 576 x 256 pixels, frameWidth: 64, frameHeight: 64
    // Layout: 9 frames per row, 4 rows (one direction per row)
    // 
    // Row 0 (up): frames 0-8
    // Row 1 (left): frames 9-17
    // Row 2 (down): frames 18-26
    // Row 3 (right): frames 27-35
    
    const FRAMES_PER_ROW = 9; // 9 frames per row
    const FRAMES_PER_DIRECTION = 9; // Each direction has 9 frames
    
    // Calculate frame ranges for 4-row layout (up, left, down, right)
    const walkUpStart = 0; // Row 0: frames 0-8 (up)
    const walkLeftStart = FRAMES_PER_ROW; // Row 1: frames 9-17 (left)
    const walkDownStart = FRAMES_PER_ROW * 2; // Row 2: frames 18-26 (down)
    const walkRightStart = FRAMES_PER_ROW * 3; // Row 3: frames 27-35 (right)
    
    // Walk up (Row 0: frames 0-8)
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player-walk', { 
        start: walkUpStart, 
        end: walkUpStart + FRAMES_PER_DIRECTION - 1 
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Walk left (Row 1: frames 9-17)
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player-walk', { 
        start: walkLeftStart, 
        end: walkLeftStart + FRAMES_PER_DIRECTION - 1 
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Walk down (Row 2: frames 18-26)
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player-walk', { 
        start: walkDownStart, 
        end: walkDownStart + FRAMES_PER_DIRECTION - 1 
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Walk right (Row 3: frames 27-35)
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player-walk', { 
        start: walkRightStart, 
        end: walkRightStart + FRAMES_PER_DIRECTION - 1 
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Set default animation
    this.player.play('walk-down');

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
    let currentAnim = 'walk-down';

    // Handle movement input
    if (this.cursors.left!.isDown || this.wasd.A.isDown) {
      velocityX = -speed;
      currentAnim = 'walk-left';
    } else if (this.cursors.right!.isDown || this.wasd.D.isDown) {
      velocityX = speed;
      currentAnim = 'walk-right';
    }

    if (this.cursors.up!.isDown || this.wasd.W.isDown) {
      velocityY = -speed;
      currentAnim = 'walk-up';
    } else if (this.cursors.down!.isDown || this.wasd.S.isDown) {
      velocityY = speed;
      currentAnim = 'walk-down';
    }

    // Apply velocity
    this.player.setVelocity(velocityX, velocityY);

    // Play appropriate animation based on movement direction
    if (velocityX !== 0 || velocityY !== 0) {
      // Only change animation if it's different from current
      if (this.player.anims.currentAnim?.key !== currentAnim) {
        this.player.play(currentAnim);
      }
    } else {
      // Not moving - stop animation on current frame
      this.player.anims.stop();
    }
  }
}

