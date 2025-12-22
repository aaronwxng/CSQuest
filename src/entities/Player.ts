import Phaser from 'phaser';
import { PlayerData } from '../types/GameTypes';

export class Player extends Phaser.Physics.Arcade.Sprite {
  public playerData: PlayerData;
  public username: string;
  public isLocalPlayer: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    playerData: PlayerData,
    isLocalPlayer: boolean = false
  ) {
    super(scene, x, y, 'player');
    this.playerData = playerData;
    this.username = playerData.username;
    this.isLocalPlayer = isLocalPlayer;

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set physics properties
    this.setCollideWorldBounds(true);
    this.body!.setSize(32, 32);

    // Create player visual based on data
    this.createPlayerVisual();

    // Add username label
    if (!isLocalPlayer) {
      this.createUsernameLabel();
    }
  }

  private createPlayerVisual() {
    // Create a colored rectangle for the player
    // You can replace this with actual sprites later
    if (!this.scene.textures.exists(`player_${this.playerData.id}`)) {
      const graphics = this.scene.add.graphics();
      const color = this.playerData.color || 0x3498db;
      graphics.fillStyle(color, 1);
      graphics.fillRect(0, 0, 32, 32);
      graphics.generateTexture(`player_${this.playerData.id}`, 32, 32);
      graphics.destroy();
    }

    this.setTexture(`player_${this.playerData.id}`);
  }

  private createUsernameLabel() {
    const label = this.scene.add.text(0, -25, this.username, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial',
      backgroundColor: '#000000',
      padding: { x: 4, y: 2 },
    });
    label.setOrigin(0.5);
    label.setDepth(1000);

    // Make label follow player
    this.scene.events.on('update', () => {
      label.setPosition(this.x, this.y - 25);
    });

    // Store reference for cleanup
    (this as any).usernameLabel = label;
  }

  updatePosition(x: number, y: number) {
    this.playerData.x = x;
    this.playerData.y = y;
    
    // Smooth interpolation for remote players
    if (!this.isLocalPlayer) {
      this.scene.tweens.add({
        targets: this,
        x: x,
        y: y,
        duration: 100,
        ease: 'Power2',
      });
    } else {
      this.setPosition(x, y);
    }
  }

  destroy() {
    if ((this as any).usernameLabel) {
      (this as any).usernameLabel.destroy();
    }
    super.destroy();
  }
}

