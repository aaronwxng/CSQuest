import Phaser from 'phaser';

/**
 * EXAMPLE: How to load and use player animations
 * 
 * This is an example file showing how to load player animation files
 * from the /public/game/assets/player/ directory
 */

export class GameSceneWithAnimations extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'GameSceneWithAnimations' });
  }

  // Preload runs before create() - use this to load assets
  preload() {
    // Option 1: Load individual animation frames
    // Put your frames in: public/game/assets/player/walk/
    this.load.image('player-walk-1', '/game/assets/player/walk/frame1.png');
    this.load.image('player-walk-2', '/game/assets/player/walk/frame2.png');
    this.load.image('player-walk-3', '/game/assets/player/walk/frame3.png');
    this.load.image('player-walk-4', '/game/assets/player/walk/frame4.png');

    // Option 2: Load a spritesheet (recommended for animations)
    // Put your spritesheet in: public/game/assets/player/
    this.load.spritesheet('player-walk', '/game/assets/player/walk-spritesheet.png', {
      frameWidth: 32,  // Width of each frame
      frameHeight: 32, // Height of each frame
    });

    // Load idle animation
    this.load.spritesheet('player-idle', '/game/assets/player/idle-spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Load other animations
    this.load.spritesheet('player-run', '/game/assets/player/run-spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // Create player sprite
    this.player = this.physics.add.sprite(512, 384, 'player-idle');
    this.player.setCollideWorldBounds(true);

    // Create animations from spritesheets
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player-walk', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, // Loop forever
    });

    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player-walk', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player-walk', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player-walk', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player-idle', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    // Set default animation
    this.player.play('idle');

    // Set up input
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    let currentAnim = 'idle';

    // Handle movement and animations
    if (this.cursors.left!.isDown) {
      velocityX = -speed;
      currentAnim = 'walk-left';
    } else if (this.cursors.right!.isDown) {
      velocityX = speed;
      currentAnim = 'walk-right';
    }

    if (this.cursors.up!.isDown) {
      velocityY = -speed;
      currentAnim = 'walk-up';
    } else if (this.cursors.down!.isDown) {
      velocityY = speed;
      currentAnim = 'walk-down';
    }

    // Apply velocity
    this.player.setVelocity(velocityX, velocityY);

    // Play appropriate animation
    if (velocityX !== 0 || velocityY !== 0) {
      if (this.player.anims.currentAnim?.key !== currentAnim) {
        this.player.play(currentAnim);
      }
    } else {
      // Not moving - play idle animation
      if (this.player.anims.currentAnim?.key !== 'idle') {
        this.player.play('idle');
      }
    }
  }
}

